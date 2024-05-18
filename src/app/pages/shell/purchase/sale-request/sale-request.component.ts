import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { SaleStateNames, SaleStates } from '../../../../services/app.constants';
import { Customer } from '../customers/customers.interface';

interface TreeNode {
  title: string;
  key: any;
  children?: TreeNode[];
}

interface Item {
  item_name: string;
  vendor_id: number;
  vendor_name: string;
  latest_unit_price: string;
  qty: string;
  total: string;
}

@Component({
  selector: 'app-sale-request',
  templateUrl: './sale-request.component.html',
  styleUrls: ['./sale-request.component.css']
})
export class SaleRequestComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  vendorItems: any[] = [];
  nodes: TreeNode[];
  expandableKey: string[];
  discountTotal: number = 0;
  SaleRequestTotal: number = 0;
  loading = false;
  SaleStates = SaleStates;
  stateNames = SaleStateNames
  listOfData: Customer[] = [
  ];
  defaultItemValues = {
    id: 0,
    name: '',
    qty: 0,
    SaleRequest_id: 0,
    discount: 0,
    total: 0,
    date_created: new Date(),
    isCustom: false,
    vendor_id: 0,
    max_qty: 0,
    min_unit_price: 0,
    unit_price: 0,
    return_details: [],
    actualQty: 0
  }
  currentSubOrganizationSubscription: Subscription;
  previousSaleRequestDetails: any;
  SaleRequestDetails: FormGroup<SaleDetails>;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private msg: NzMessageService,
    private modal: NzModalService) {
    this.SaleRequestDetails = this.fb.group({
      id: new FormControl(),
      subject: new FormControl(),
      items: this.fb.array<FormGroup<SaleItemControl>>([]),
      state: new FormControl(SaleStates.Draft),
      notes: new FormControl(),
      items_discount_total: new FormControl(0),
      overall_discount_total: new FormControl(0),
      item_cost: new FormControl(0),
      amount_paid: new FormControl(0),
      payment_history: this.fb.array<FormGroup<PaymentHistory>>([]),
      additional_cost: new FormControl(0),
      overall_discount: new FormControl(0),
      created_by: new FormControl(0),
      shipment_charges: new FormControl(0),
      total: new FormControl(0),
      balance: new FormControl(0),
      vendor_id: new FormControl(0),
      organization_id: new FormControl(0),
      sub_organization_id: new FormControl(0),
      invoice_date: new FormControl(new Date()),
      due_date: new FormControl(new Date()),
      customer: new FormControl(0),
      attachment: new FormControl(false),
      new_customer: new FormControl(),
      terms: new FormControl('')
    });
  }
  submitForm() { }
  ngOnInit(): void {
    this.appService.getOrganizationCustomers().then(resp => {
      this.listOfData = resp;
    });

    this.route.queryParams.subscribe(params => {
      // Use this queryParams object to load data
      this.SaleRequestDetails.reset({ state: SaleStates.Draft, id: 0 });
      this.SaleRequestDetails.enable();
      this.SaleRequestDetails.updateValueAndValidity();
      this.SaleRequestDetails.controls['id'].setValue(params['SALE'] || 0);
      this.setSaleRequestRequestDetails();
    });

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
      this.currentSubOrganizationSubscription = this.appService.currentSubOrganization.subscribe(async (resp) => {
        this.SaleRequestDetails.controls['sub_organization_id'].setValue(resp.id);
        this.vendorItems = await this.appService.getInventory()
        this.nodes = this.transformToNodeStructure(this.vendorItems)
        this.expandableKey = this.nodes.map(res => res.key);
      });
      this.SaleRequestDetails.controls['created_by'].setValue(this.userService.loggedInUser.id);
    }
    this.disableAndEnableSpecificControls()
    this.loading = false;
  }

  onItemChange(index: number) {
    const itemGroup = this.SaleRequestDetails.controls.items.controls[index] as FormGroup<SaleItemControl>
    const itemName = itemGroup.controls.selected_item.value.item_name
    const maxQty = itemGroup.controls.selected_item.value.qty;
    const minUnitPrice = itemGroup.controls.selected_item.value.latest_unit_price;
    const vendor_id = itemGroup.controls.selected_item.value.vendor_id;
    itemGroup.controls.name.setValue(itemName);
    itemGroup.controls.vendor_id.setValue(vendor_id);
    itemGroup.controls.name.setValue(itemName);
    itemGroup.controls.max_qty.setValue(maxQty);
    itemGroup.controls.min_unit_price.setValue(minUnitPrice);
    itemGroup.controls.qty.setValidators([Validators.max(maxQty)]);
    itemGroup.controls.unit_price.setValidators([Validators.min(minUnitPrice)]);
    itemGroup.updateValueAndValidity();
  }

  async getExistingSaleRequest() {
    const response = await this.appService.retireveSaleById(this.SaleRequestDetails.controls['id'].value)
    if (response && response.length) {

      this.SaleRequestDetails.patchValue({
        id: response[0].id,
        subject: response[0].subject,
        state: response[0].state,
        notes: response[0].notes,
        items_discount_total: response[0].items_discount_total,
        due_date: new Date(response[0].due_date),
        invoice_date: new Date(response[0].invoice_date),
        overall_discount_total: response[0].overall_discount_total,
        item_cost: response[0].item_cost,
        amount_paid: response[0].amount_paid,
        additional_cost: response[0].additional_cost,
        created_by: response[0].created_by,
        shipment_charges: response[0].shipment_charges,
        total: response[0].total,
        balance: response[0].balance,
        vendor_id: response[0].vendor_id,
        organization_id: response[0].organization_id,
        sub_organization_id: response[0].sub_organization_id,
      })

      const items = response[0].items || [];
      const paymentHistory = response[0].payment_history || [];
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
      name: new FormControl(object.name),
      selected_item: new FormControl(object.name),
      qty: new FormControl(object.qty),
      actualQty: new FormControl(object.actualQty),
      vendor_id: new FormControl(object.vendor_id),
      unit_price: new FormControl(object.unit_price),
      discount: new FormControl(object.discount),
      total: new FormControl(object.total),
      date_created: new FormControl(object.date_created),
      min_unit_price: new FormControl(object.min_unit_price),
      max_qty: new FormControl(object.max_qty),
      return_details: this.getReturnItemsFormArray(object.return_details || []),
      returned_now: new FormControl(false)
    }) as FormGroup<SaleItemControl>
  }

  getPaymentHistoryItemFormGroup(object: any) {
    return this.fb.group({
      notes: new FormControl(object.notes),
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
      date_created: new FormControl(object.date_created),
      max_qty: new FormControl(object.max_qty),
      returnAmount: new FormControl(object.returnAmount)
    }) as FormGroup<SaleItemReturnControl>
  }
  addRow(objectValue = this.defaultItemValues): void {

    this.SaleRequestDetails.controls.items.push(this.getItemFormGroup(objectValue));
  }

  addPaymentControlRow() {
    this.addPaymentRow({
      notes: '',
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
    const discountTotal = itemsArrayValue.reduce((total: any, product: any) => total + (product.unit_price * product.discount / 100), 0);
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
    return totalReturnAmount;
  }
  calculateOverAllDiscountAndTotal() {
    if (this.loading) {
      return
    }

    const SaleRequestValue = this.SaleRequestDetails.getRawValue();
    const overallDiscount = SaleRequestValue.item_cost * (SaleRequestValue.overall_discount / 100)
    this.SaleRequestDetails.controls.overall_discount_total.setValue(overallDiscount);
    this.SaleRequestDetails.controls.total.setValue(SaleRequestValue.item_cost - overallDiscount);
    this.calculateBalance()
  }
  removeProduct(index: number): void {
    (this.SaleRequestDetails.get('items') as FormArray).removeAt(index);
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
      const returnAmount = (unit_price - ((unit_price * charge) / 100)) * qty
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
    const item = itemsArray.at(index);

    if (item) {
      const total = (item.get('unit_price')?.value ?? (100 - item.get('discount')?.value ?? 0) / 100) * (item.get('qty')?.value ?? 0);
      item.patchValue({ total: total });

      this.calculateTotal();
    }
  }



  onPriceChange(index: number): void {
    if (this.loading) {
      return
    }
    const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
    const item = itemsArray.at(index);

    if (item) {
      const total = (item.get('unit_price')?.value ?? 0 * (100 - item.get('discount')?.value ?? 0) / 100) * (item.get('qty')?.value ?? 0);
      item.patchValue({ total: total });

      this.calculateTotal();
    }
  }

  onDiscountChange(index: number): void {
    if (this.loading) {
      return;
    }

    const itemsArray = this.SaleRequestDetails.get('items') as FormArray;
    const item = itemsArray.at(index);

    if (item) {
      const unitPrice = item.get('unit_price')?.value ?? 0;
      const discountPercentage = item.get('discount')?.value ?? 0;
      const qty = item.get('qty')?.value ?? 0;

      // Calculate the total after applying the discount
      const total = unitPrice * (1 - discountPercentage / 100) * qty;

      // Update the 'total' form control with the calculated total value
      item.patchValue({ total: total });

      // Recalculate the total of all items
      this.calculateTotal();
    }
  }



  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.vendorItems.some(pro => !value || pro.name === value.trim())) {
      this.vendorItems = [...this.vendorItems, { name: input.value }];
    }
  }

  async submitRequest() {
    const response: any = await this.appService.addSaleRequest({
      details: {
        ...this.SaleRequestDetails.value as SaleOrder,
        state: SaleStates.PaymentConfirmation
      },
      products: this.SaleRequestDetails.controls['items'].value as any
    })
    if (response) {
      this.notification.create(
        'success',
        'Sale request - ' + response['id'],
        'Sale request submitted successfly. Please check for invoice and update later'
      ).onClose.subscribe((resp) => {
        this.router.navigate(['purchase', 'sales'])
      });
    }
  }

  async cancelPaymentDetails() {
    this.modal.confirm({
      nzTitle: 'Cancel PO ' + this.SaleRequestDetails.get('id')?.value,
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
            this.router.navigate(['purchase', 'sales'])
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
        this.router.navigate(['purchase', 'sales'])
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
        this.router.navigate(['purchase', 'sales'])
      });
    }
  }

  printCard() {
    let printContents = this.content.nativeElement.innerHTML;
    let popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            /* Define print styles here */
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
      popupWin.print();

      // popupWin.document.close();
    }
  }
  generatePDF() {
    const element = this.content.nativeElement;
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('your-component.pdf');
    });
  }

  disableAndEnableSpecificControls() {
    const stateControl = this.SaleRequestDetails.get('state');

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
      this.SaleRequestDetails.patchValue({
        attachment: file
      })
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {

    this.getBase64(info.file!.originFileObj!, (img: string) => {
      this.loading = false;
    });
  }

  transformToNodeStructure(items: Item[]): TreeNode[] {
    const vendorMap = new Map<number, TreeNode>(); // Map to store vendors and their items

    // Iterate over items to group them by vendor_id
    items.forEach(item => {
      // Check if the vendor exists in the map
      if (vendorMap.has(item.vendor_id)) {
        // If exists, push the item to the vendor's children array
        const vendorNode = vendorMap.get(item.vendor_id);
        if (!vendorNode || !vendorNode.children) {
          vendorNode ? vendorNode.children = [] : null;
        }
        if (vendorNode?.children) {
          vendorNode?.children.push({
            title: item.item_name,
            key: item
          });
        }
      } else {
        // If vendor does not exist, create a new vendor node and add the item as its child
        const vendorNode: TreeNode = {
          title: item.vendor_name,
          key: `vendor-${item.vendor_id}`,
          children: [{
            title: item.item_name,
            key: item
          }]
        };
        vendorMap.set(item.vendor_id, vendorNode);
      }
    });

    // Convert vendorMap values to array and return
    return Array.from(vendorMap.values());
  }

}
