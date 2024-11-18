import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import _ from 'lodash'
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from '../../../../services/app.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../team/users/users.interface';
import { ItemControl, SaleDetails, SaleOrder, SaleItemControl, SaleItemReturnControl, PaymentHistory } from '../../../../services/app.interfact';
import { RestrictNavigationMessage, SaleStateNames, SaleStates } from '../../../../services/app.constants';
import { Customer } from '../customers/customers.interface';
import { PdfGeneratorService } from '../../../../services/pdf-generator.service';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';

interface TreeNode {
  title: string;
  key: any;
  isLeaf: boolean;
  children?: TreeNode[];
}

interface Item {
  item_name: string;
  project_id: number;
  project_name: string;
  latest_unit_price: string;
  qty: string;
  total: string;
}

@Component({
  selector: 'app-sale-request',
  templateUrl: './sale-request.component.html',
  styleUrls: ['./sale-request.component.css']
})
export class SaleRequestComponent implements OnInit, OnDestroy, CanDeactivateGuard {
  @ViewChild('content', { static: false }) content: ElementRef;
  projectItems: any[] = [];
  nodes: TreeNode[];
  expandableKey: string[] = [];
  discountTotal: number = 0;
  SaleRequestTotal: number = 0;
  loading = false;
  SaleStates = SaleStates;
  stateNames = SaleStateNames
  listOfData: Customer[] = [
  ];
  displayControlColumns = [{
    value: 'project_name',
    name: 'Project Name'
  },
  {
    value: 'name',
    name: 'Item'
  }]
  defaultItemValues = {
    id: 0,
    name: '',
    qty: 0,
    SaleRequest_id: 0,
    discount: 0,
    total: 0,
    date_created: new Date(),
    isCustom: false,
    project: {},
    max_qty: 0,
    min_unit_price: 0,
    unit_price: 0,
    return_details: [],
    actualQty: 0
  }
  currentClientSubscription: Subscription;
  previousSaleRequestDetails: any;
  SaleRequestDetails: FormGroup<SaleDetails>;
  isSpinning = false;
  currentOrganizationId: number;
  fileList: NzUploadFile[] = []
  returningItem: boolean;
  created_by_users: User[] = [];
  routeSubscription: Subscription;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private msg: NzMessageService,
    private modal: NzModalService,
    private pdfGeneratorService: PdfGeneratorService,
    private imageCompress: NgxImageCompressService
  ) {

    this.SaleRequestDetails = this.fb.group({
      id: new FormControl(),
      sale_no: new FormControl(),
      title: new FormControl(null, [Validators.required]),
      items: this.fb.array<FormGroup<SaleItemControl>>([]),
      state: new FormControl(SaleStates.Draft),
      description: new FormControl(),
      items_discount_total: new FormControl(0),
      overall_discount_total: new FormControl(0),
      item_cost: new FormControl(0),
      amount_paid: new FormControl(0),
      date_created: new FormControl(new Date()),
      created_by: new FormControl({ value: this.userService.loggedInUser.id, disabled: true }),
      payment_history: this.fb.array<FormGroup<PaymentHistory>>([]),
      additional_cost: new FormControl(0),
      overall_discount: new FormControl(0),
      shipment_charges: new FormControl(0),
      total: new FormControl(0),
      balance: new FormControl(0),
      organization_id: new FormControl(0),
      client_id: new FormControl(0),
      invoice_date: new FormControl(new Date()),
      due_date: new FormControl(new Date()),
      customer: new FormControl(0, [Validators.required]),
      attachment: new FormControl(false),
      new_customer: new FormControl(),
      terms: new FormControl('')
    });
  }
  submitForm() { }

  canDeactivate(): boolean {
    if (this.shouldConfirmNavigation()) {
      return confirm(RestrictNavigationMessage);
    }
    return true;
  }

  private shouldConfirmNavigation(): boolean {
    // Your logic to determine if the confirmation is needed
    return (this.SaleRequestDetails.dirty || this.SaleRequestDetails.touched);
  }

  ngOnDestroy(): void {
    this.routeSubscription ? this.routeSubscription.unsubscribe() : null;
  }

  ngOnInit(): void {

    this.currentClientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.currentOrganizationId = change.id
        this.appService.getOrganizationCustomers().then(resp => {
          this.listOfData = resp;
        });

        this.routeSubscription = this.route.queryParams.subscribe(async (params) => {
          // Use this queryParams object to load data
          if (this.SaleRequestDetails.dirty || this.SaleRequestDetails.touched) {
            const confirmNavigation = confirm(RestrictNavigationMessage);
            if (!confirmNavigation) {
              return;
            }
          }

          this.isSpinning = true;
          let id = 0
          if (!params['SALE'] || params['SALE'] === 'new') {
          } else {
            id = params['SALE']
          }
          this.SaleRequestDetails.enable();
          this.clearItems();
          this.created_by_users = [this.userService.loggedInUser]

          this.SaleRequestDetails.reset({
            state: SaleStates.Draft,
            created_by: this.userService.loggedInUser.id,
            date_created: new Date(),
            id: 0, items: [], payment_history: []
          });
          this.SaleRequestDetails.updateValueAndValidity();
          this.SaleRequestDetails.controls['id'].setValue(id || 0);
          await this.setSaleRequestRequestDetails();
          setTimeout(() => {
            this.isSpinning = false;
          }, 1000)
        });
        this.SaleRequestDetails.controls['client_id'].setValue(change.id);

      }
    });
  }

  clearItems() {
    while ((this.SaleRequestDetails.get('items') as FormArray).value.length !== 0) {
      this.SaleRequestDetails.controls.items.removeAt(0)
    }
    while ((this.SaleRequestDetails.get('payment_history') as FormArray).value.length !== 0) {
      this.SaleRequestDetails.controls.payment_history.removeAt(0)
    }
  }

  close() {
    this.router.navigate(['/', 'task', 'sales'], {
      queryParams: {
        'SALE': null,
      },
      queryParamsHandling: 'merge'
    })
  }

  getReturnItemFormGroup(form: FormGroup) {
    return form.get('return_details') as FormArray
  }
  hasReturnItemFormGroup(form: FormGroup): boolean {
    const formcontrols = form.controls['return_details'] as any
    return !!formcontrols['controls']?.length
  }

  async setSaleRequestRequestDetails() {
    this.loading = true;
    if (this.SaleRequestDetails.controls['id'].value) {
      await this.getExistingSaleRequest();
    } else {
      this.SaleRequestDetails.controls['organization_id'].setValue(parseInt(localStorage.getItem('organization_id') || ''))
      this.nodes = this.transformToNodeStructure(this.projectItems)
      this.expandableKey = this.nodes.map(res => res.key) || [];
      this.SaleRequestDetails.controls['created_by'].setValue(this.userService.loggedInUser.id);
    }
    if (this.SaleRequestDetails.controls.state.value == this.SaleStates.Draft) {
      this.projectItems = await this.appService.getInventory()
      this.SaleRequestDetails.controls.items.controls.forEach((item, index) => {
        const selected_item = this.projectItems.find(inItem => inItem.name === item.controls.name.value);
        item.patchValue({ selected_item });
        setTimeout(() => {
          this.onItemChange(selected_item, index)
        }, 500)
      })
    }
    this.disableAndEnableSpecificControls()
    this.loading = false;
  }

  onItemChange(item: any, index: number) {
    const itemGroup = this.SaleRequestDetails.controls.items.controls[index] as FormGroup<SaleItemControl>
    if (itemGroup.controls.selected_item.value) {
      const itemName = itemGroup.controls.selected_item.value.item_name
      const maxQty = itemGroup.controls.selected_item.value.qty;
      const minUnitPrice = itemGroup.controls.selected_item.value.avg_unit_price;
      const project = item.project ? item.project : itemGroup.controls.selected_item.value.project_id;
      itemGroup.controls.name.setValue(itemName);
      itemGroup.controls.project.setValue(project);
      itemGroup.controls.name.setValue(itemName);
      itemGroup.controls.max_qty.setValue(maxQty);
      itemGroup.controls.min_unit_price.setValue(minUnitPrice);
      itemGroup.controls.qty.setValidators([Validators.max(maxQty)]);
      itemGroup.controls.unit_price.setValidators([Validators.min(minUnitPrice)]);
      itemGroup.updateValueAndValidity();
    }
  }

  async getExistingSaleRequest() {
    const response = await this.appService.retireveSaleById(this.SaleRequestDetails.controls['id'].value)
    if (response && response) {
      this.created_by_users = [response.created_by]
      this.SaleRequestDetails.patchValue({
        id: response.id,
        title: response.title,
        state: response.state,
        sale_no: response.sale_no,
        description: response.description,
        customer: response.customer.id,
        items_discount_total: response.items_discount_total,
        due_date: new Date(response.due_date),
        date_created: new Date(response.date_created),
        invoice_date: new Date(response.invoice_date),
        overall_discount_total: response.overall_discount_total,
        item_cost: response.item_cost,
        amount_paid: response.amount_paid,
        additional_cost: response.additional_cost,
        created_by: response.created_by.id,
        shipment_charges: response.shipment_charges,
        total: response.total,
        balance: response.balance,
        organization_id: response.organization_id,
        client_id: response.client_id,
        attachment: response.attachment,
      })
      if (response.attachment && response.attachment.length) {
        this.fileList = response.attachment.map((file: any) => (
          {
            name: 'image.png',
            status: 'done',
            url: file,
            message: '',
            thumbUrl: file
          }
        ))
      } else {
        this.fileList = []
      }
      const items = response.items || [];
      const paymentHistory = response.payment_history || [];
      items.forEach((item: any) => {
        this.addRow(item)
      });
      paymentHistory.forEach((payment_history: any) => {
        this.addPaymentRow(payment_history)
      });
    }

    this.previousSaleRequestDetails = this.SaleRequestDetails.getRawValue() as any;

  }

  getItemFormGroup(object = this.defaultItemValues) {
    return this.fb.group({
      id: new FormControl(object.id),
      sale_id: new FormControl(object.SaleRequest_id),
      name: new FormControl(object.name, [Validators.required]),
      selected_item: new FormControl(object.name),
      qty: new FormControl(object.qty, [Validators.required]),
      actualQty: new FormControl(object.actualQty),
      project: new FormControl(object.project),
      unit_price: new FormControl(object.unit_price, [Validators.required]),
      discount: new FormControl(object.discount),
      total: new FormControl(object.total),
      isCustom: new FormControl(object.isCustom),
      date_created: new FormControl(new Date(object.date_created)),
      min_unit_price: new FormControl(object.min_unit_price),
      max_qty: new FormControl(object.max_qty),
      return_details: this.getReturnItemsFormArray(object.return_details || []),
      returned_now: new FormControl(false)
    }) as FormGroup<SaleItemControl>
  }

  getPaymentHistoryItemFormGroup(object: any) {
    return this.fb.group({
      description: new FormControl(object.description),
      total: new FormControl(object.total),
      date_created: new FormControl(new Date(object.date_created)),
      added_by: new FormControl(object.added_by)
    }) as FormGroup<PaymentHistory>
  }

  getReturnItemsFormArray(array: any[] = []): FormArray {
    const formArray = this.fb.array([] as FormGroup<SaleItemReturnControl>[]);
    array.forEach((item: any) => {
      const formGroup = this.getReturnItemForm(item) as FormGroup<SaleItemReturnControl>;
      formArray.push(formGroup);

    })
    return formArray
  }
  getReturnItemForm(object: any): FormGroup<SaleItemReturnControl> {
    return this.fb.group({
      reason: new FormControl(object.reason),
      qty: new FormControl(object.qty),
      unit_price: new FormControl(object.unit_price),
      charge: new FormControl(object.charge),
      date_created: new FormControl(object.date_created || new Date()),
      max_qty: new FormControl(object.max_qty),
      returnAmount: new FormControl(object.returnAmount)
    }) as FormGroup<SaleItemReturnControl>
  }
  addRow(objectValue = this.defaultItemValues): void {

    this.SaleRequestDetails.controls.items.push(this.getItemFormGroup(objectValue));
  }

  addPaymentControlRow() {
    this.addPaymentRow({
      description: '',
      total: 0,
      date_created: new Date(),
      added_by: this.userService.loggedInUser.id
    })
  }
  addPaymentRow(objectValue: any): void {

    this.SaleRequestDetails.controls.payment_history.push(this.getPaymentHistoryItemFormGroup(objectValue));
  }

  addProductRow(): void {
    (this.SaleRequestDetails.controls['items'] as FormArray).push(this.getItemFormGroup());
  }

  calculateBalance() {
    if (this.loading) {
      return
    }

    const detailsvalues = this.SaleRequestDetails.getRawValue();
    let amount_paid = 0
    detailsvalues.payment_history.forEach(hist => {
      amount_paid += (hist.total * 1);
    });
    this.SaleRequestDetails.get('amount_paid')?.setValue(amount_paid);
    this.SaleRequestDetails.controls.balance.setValue(this.SaleRequestDetails.get('total')?.value - amount_paid);
  }

  calculateTotal(): void {
    const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
    const itemsArrayValue = itemsArray.getRawValue()
    const discountTotal = itemsArrayValue.reduce((total: any, product: any) => total + (product.qty * product.unit_price * product.discount / 100), 0);
    const itemCost = itemsArrayValue.reduce((total: any, product: any) => total + ((product.unit_price * (100 - product.discount) / 100) * product.qty), 0);
    const returnAmount = this.sumReturnAmount(itemsArrayValue);
    this.SaleRequestDetails.patchValue({
      items_discount_total: discountTotal,
      item_cost: (itemCost - returnAmount)
    });
    this.calculateOverAllDiscountAndTotal();
  }

  sumReturnAmount(items: any[]): number {
    let totalReturnAmount = 0;
    items.forEach(item => {
      (item.return_details as any[]).forEach(returnDetail => {
        totalReturnAmount += returnDetail.returnAmount;
      });
    });
    return totalReturnAmount * -1;
  }
  calculateOverAllDiscountAndTotal() {
    if (this.loading) {
      return
    }

    const SaleRequestValue = this.SaleRequestDetails.getRawValue();
    const overallDiscount = SaleRequestValue.item_cost * (SaleRequestValue.overall_discount / 100)
    this.SaleRequestDetails.controls.overall_discount_total.setValue(overallDiscount);
    this.SaleRequestDetails.controls.total.setValue(SaleRequestValue.item_cost + Number(SaleRequestValue.shipment_charges || '0') + Number(SaleRequestValue.additional_cost || '0') - overallDiscount);
    this.calculateBalance()
  }
  removeProduct(index: number): void {
    (this.SaleRequestDetails.get('items') as FormArray).removeAt(index);
    this.calculateTotal();
  }
  removePayments(index: number): void {
    (this.SaleRequestDetails.get('payment_history') as FormArray).removeAt(index);
    this.calculateTotal();
  }

  returnProduct(index: number): void {
    const itemsArray = this.SaleRequestDetails.get('items') as FormArray<FormGroup<SaleItemControl>>;
    const item = itemsArray.at(index).get('return_details') as FormArray<FormGroup<SaleItemReturnControl>>;
    const unit_price = itemsArray.at(index).get('unit_price')?.value || 0
    itemsArray.at(index).get('returned_now')?.setValue(true);
    const discount = itemsArray.at(index).get('discount')?.value || 0
    if (item.controls) {
      item.push(this.getReturnItemForm({
        unit_price:
          unit_price - (unit_price * discount / 100)
      }))
      this.returningItem = true;
    }

  }

  calculateCharge(itemindex: number, discountIndex: number): void {
    if (this.loading) {
      return
    }

    const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
    const item = itemsArray.at(itemindex).get('return_details') as FormArray<FormGroup<SaleItemReturnControl>>;

    if (item?.controls) {
      const returnItem = item?.controls;
      const unit_price = returnItem[discountIndex].get('unit_price')?.value || 0;
      const charge = returnItem[discountIndex].get('charge')?.value || 0;
      const qty = returnItem[discountIndex].get('qty')?.value || 0;
      const returnAmount = (unit_price - ((unit_price * charge) / 100)) * qty * -1
      returnItem[discountIndex].get('returnAmount')?.setValue(returnAmount);
      this.calculateTotal()
    }

  }

  onReturnPriceChange(index: number): void {
    if (this.loading) {
      return
    }
  }


  onQuantityChange(index: number): void {
    if (this.loading) {
      return
    }
    const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
    const item = itemsArray.at(index) as FormGroup;

    if (item) {
      this.setItemTotal(item)
      this.calculateTotal();
    }
  }



  onPriceChange(index: number): void {
    if (this.loading) {
      return
    }
    const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
    const item = itemsArray.at(index) as FormGroup;

    if (item) {
      this.setItemTotal(item)

      this.calculateTotal();
    }
  }

  onDiscountChange(index: number): void {
    if (this.loading) {
      return;
    }

    const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
    const item = itemsArray.at(index) as FormGroup;

    if (item) {
      this.setItemTotal(item)

      // Recalculate the total of all items
      this.calculateTotal();
    }
  }

  setItemTotal(item: FormGroup) {
    if (item) {
      const unitPrice = item.get('unit_price')?.value ?? 0;
      const discountPercentage = item.get('discount')?.value ?? 0;
      const qty = item.get('qty')?.value ?? 0;

      // Calculate the total after applying the discount
      const total = unitPrice * (1 - discountPercentage / 100) * qty;

      // Update the 'total' form control with the calculated total value
      item.patchValue({ total: total });
    }
  }


  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.projectItems.some(pro => !value || pro.name === value.trim())) {
      this.projectItems = [...this.projectItems, { name: input.value }];
    }
  }

  async submitRequest(save = false) {
    const response: any = await this.appService.addSaleRequest({
      details: {
        ...this.SaleRequestDetails.value as SaleOrder,
        state: save ? SaleStates.Draft : SaleStates.PaymentConfirmation
      },
      products: this.SaleRequestDetails.controls['items'].value as any
    });
    if (response) {
      this.notification.create(
        'success',
        'Sale request - ' + response['sale_no'],
        `Sale request ${save ? 'saved' : 'submitted'} successfly. Please check for invoice and update later`
      ).onClose.subscribe((resp) => {
        this.router.navigate(['task', 'sales'])
      });
    }
  }

  async cancelPaymentDetails() {
    this.modal.confirm({
      nzTitle: 'Cancel TASK ' + this.SaleRequestDetails.get('id')?.value,
      nzContent: '<h4> Are you sure cancel this SaleRequest order.</h4>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: async () => {
        const body = {
          id: this.previousSaleRequestDetails.id
        }
        console.log(body)

        const response: any = await this.appService.updateSaleRequest({
          details: {
            id: this.previousSaleRequestDetails.id,
            state: SaleStates.Cancelled
          } as any, products: []
        })
        if (response) {
          this.notification.create(
            'success',
            'SaleRequest Order - ' + this.previousSaleRequestDetails.sale_no,
            'SaleRequest order invoice cancelled successfly.',
          ).onClose.subscribe((resp) => {
            this.router.navigate(['task', 'sales'])
          });
        }

      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });

  }
  async confirmPaymentDetails(save = false) {
    if (!save && (!this.SaleRequestDetails.value.amount_paid || Number(this.SaleRequestDetails.value.amount_paid) !== Number(this.SaleRequestDetails.get('total')?.value))) {
      this.notification.create(
        'error',
        'Balance exists',
        `Your payment have balance of PKR ${this.SaleRequestDetails.get('total')?.value - this.SaleRequestDetails.value.amount_paid}. Please clear it first.`
      )
      return;
    }
    const detailsDifference: any = this.appService.findObjectDifferences(this.previousSaleRequestDetails, this.SaleRequestDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previousSaleRequestDetails.id,
      ...detailsDifference
    }
    console.log(body)

    const response: any = await this.appService.updateSaleRequest({
      details: {
        ...{ ..._.omit(body, 'items') } as any,
        state: !save ? SaleStates.Invoiced : body.state
      }, products: detailsDifference.items.map((item: any) => ({
        id: item.id,
        return_details: item.return_details
      })

      )
    })
    if (response) {
      this.notification.create(
        'success',
        'SaleRequest Order - ' + this.previousSaleRequestDetails.sale_no,
        'SaleRequest order invoice submitted successfly. Please proceed next for payment details',
      ).onClose.subscribe((resp) => {
        this.router.navigate(['task', 'sales'])
      });
    }
  }

  async confirmInvoiceDetails() {

    const detailsDifference: any = this.appService.findObjectDifferences(this.previousSaleRequestDetails, this.SaleRequestDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previousSaleRequestDetails.id,
      ...detailsDifference
    }

    if (Object.keys(detailsDifference).length <= 1) {
      this.notification.create(
        'error',
        'Invoice Updates',
        `Please update invoice details before confirmation.`
      )
      return
    }

    const response: any = await this.appService.updateSaleRequest({
      details: {
        ...{ ..._.omit(body, 'items') } as any,
        state: SaleStates.PaymentConfirmation
      }, products: detailsDifference.items.map((resp: any) => _.omit(resp, 'SaleRequest_id'))
    })
    if (response) {
      this.notification.create(
        'success',
        'SaleRequest Order - ' + this.previousSaleRequestDetails.sale_no,
        'SaleRequest order invoice submitted successfly. Please proceed next for payment details',
      ).onClose.subscribe((resp) => {
        this.router.navigate(['task', 'sales'])
      });
    }
  }

  printCard() {
    this.makePdf('print')
  }
  generatePDF() {
    this.makePdf('download')
  }

  makePdf(action: string) {
    const details = this.SaleRequestDetails.getRawValue()
    this.pdfGeneratorService.invoice = {
      ...details,
      type: 'Sale',
      status: this.stateNames[details.state],
      invoiceDetailLabel: 'Sale Details',
      personName: details.customer.name,
      address: details.customer.address || '',
      contactNo: details.customer.contact_no || '',
      terms: details.terms,
      email: details.customer.email || '',
      additionalDetails: details.description || '',
      created_by:this.created_by_users[0],
    }
    this.pdfGeneratorService.generatePDF(action)
    return;

  }
  disableAndEnableSpecificControls() {
    const stateControl = this.SaleRequestDetails.get('state');
    if (stateControl && stateControl.value == this.SaleStates.Draft) {
      this.SaleRequestDetails.controls.created_by.disable()
      this.SaleRequestDetails.controls.date_created.disable()
    }
    if (stateControl && stateControl.value !== this.SaleStates.Draft) {
      const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
      Object.keys(this.SaleRequestDetails.controls).forEach(controlName => {
        const control = this.SaleRequestDetails.get(controlName);

        if (control && (
          (controlName !== 'attachment' &&
            controlName !== 'amount_paid' &&
            controlName !== 'shipment_charges' &&
            controlName !== 'additional_cost' &&
            stateControl.value === this.SaleStates.PaymentConfirmation)
          || stateControl.value === this.SaleStates.Invoiced || stateControl.value === this.SaleStates.Cancelled)
        ) {
          control.disable();
        }
      });

      this.SaleRequestDetails.updateValueAndValidity();

      console.log(this.SaleRequestDetails);

    }
  }
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }


  transformToNodeStructure(items: Item[]): TreeNode[] {
    const projectMap = new Map<string, TreeNode>(); // Map to store projects and their items

    // Iterate over items to group them by project_id
    items.forEach(item => {
      // Check if the project exists in the map
      if (projectMap.has(item.project_name)) {
        // If exists, push the item to the project's children array
        const projectNode = projectMap.get(item.project_name);
        if (!projectNode || !projectNode.children) {
          projectNode ? projectNode.children = [] : null;
        }
        if (projectNode?.children) {
          projectNode?.children.push({
            title: item.item_name,
            key: item,
            isLeaf: true
          });
        }
      } else {
        // If project does not exist, create a new project node and add the item as its child
        const projectNode: TreeNode = {
          title: item.project_name,
          key: `project-${item.project_name}`,
          children: [{
            title: item.item_name,
            key: item,
            isLeaf: true
          }],
          isLeaf: false
        };
        projectMap.set(item.project_name, projectNode);
      }
    });

    // Convert projectMap values to array and return
    return Array.from(projectMap.values());
  }

  handleChange(info: {
    file: NzUploadFile,
    type?: any, fileList?: NzUploadFile[]
  }) {
    this.getBase64(info.file!.originFileObj!, async (img: string) => {
      this.loading = false;
      if (info['type'] === 'error') {
        const orientation = await this.imageCompress.getOrientation(info.file.originFileObj || new File([], ''))
        this.imageCompress
          .compressFile(img,
            orientation
            , 50, 80, 800, 800)
          .then((result: DataUrl) => {
            console.warn(
              `Compressed: ${result.substring(0, 50)}... (${result.length
              } characters)`
            );
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );


            info.fileList?.forEach(fileItem => {

              if (fileItem.uid == info.file.uid) {
                fileItem.name = 'image.png';
                fileItem.status = 'done';
                fileItem.url = result;
                fileItem['message'] = '';
                fileItem.thumbUrl = result;
              }

            })
            Object.assign(this.fileList, info.fileList)

            this.SaleRequestDetails.patchValue({
              attachment: info.fileList?.map(fileItem => fileItem.url)
            })
          });
      }
    });


  }

  previewImage: string | undefined = '';
  previewVisible = false;


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {

      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });


  handlePreview = async (file: NzUploadFile): Promise<void> => {
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  donwnloadFile = (file: NzUploadFile): void => {
    console.log(file)
    const src = `${file.url}`;
    const link = document.createElement("a")
    link.href = src
    link.download = file.filename || ''
    link.click()

    link.remove()
  }

}
