import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../../../../services/app.service';
import { ItemControl, PurchaseDetails, PurchaseItem, PurchaseOrder } from '../../../../services/app.interfact';
import { Observable, Observer, Subscription } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { User } from '../../team/users/users.interface';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import _ from 'lodash'
import { NzModalService } from 'ng-zorro-antd/modal';
import { InvoiceStateNames, POStates } from '../../../../services/app.constants';
import { PdfGeneratorService } from '../../../../services/pdf-generator.service';
import { DataUrl, NgxImageCompressService, UploadResponse } from 'ngx-image-compress';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  vendors: any[] = [];
  vendorItems: { name: string,isCustom?:boolean}[] = [];
  discountTotal: number = 0;
  purchaseTotal: number = 0;
  loading = false;
  POStates = POStates;
  stateNames = InvoiceStateNames
  listOfData: User[] = [
  ];
  defaultItemValues = {
    id: 0,
    name: '',
    qty: 0,
    purchase_id: 0,
    discount: 0,
    total: 0,
    date_created: new Date(),
    isCustom: false,
    unit_price: 0
  }
  isSpinning = false;
  currentSubOrganizationSubscription: Subscription;
  previousPurchaseDetails: any;
  purchaseDetails: FormGroup<PurchaseDetails> = new FormGroup({
    id: new FormControl(),
    purchase_no: new FormControl(),
    subject: new FormControl(),
    isSiteBased: new FormControl(),
    site_ids: new FormControl(),
    items: this.fb.array([]),
    selectedVendor: new FormControl(),
    state: new FormControl(POStates.Draft),
    notes: new FormControl(),
    items_discount_total: new FormControl(0),
    overall_discount_total: new FormControl(0),
    item_cost: new FormControl(0),
    amount_paid: new FormControl(0),
    additional_cost: new FormControl(0),
    created_by: new FormControl(0),
    shipment_charges: new FormControl(0),
    total: new FormControl(0),
    balance: new FormControl(0),
    vendor: new FormControl(0),
    organization_id: new FormControl(0),
    sub_organization_id: new FormControl(0),
    invoice_date: new FormControl(new Date()),
    due_date: new FormControl(new Date()),
    sales_person: new FormControl(0),
    attachment: new FormControl(),
    terms: new FormControl(''),
    overall_discount: new FormControl(0)
  })
  sites: any[];
  subOrgSubscription: Subscription;
  currentOrganizationId: number;
  fileList: NzUploadFile[] = []
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
    this.purchaseDetails = this.fb.group({
      id: new FormControl(),
      subject: new FormControl(null, [Validators.required]),
      isSiteBased: new FormControl(),
      purchase_no: new FormControl(),
      site_ids: new FormControl(),
      items: this.fb.array([]),
      selectedVendor: new FormControl(null, [Validators.required]),
      state: new FormControl(POStates.Draft),
      notes: new FormControl(),
      items_discount_total: new FormControl(0),
      overall_discount_total: new FormControl(0),
      item_cost: new FormControl(0),
      amount_paid: new FormControl(0),
      additional_cost: new FormControl(0),
      overall_discount: new FormControl(0),
      created_by: new FormControl(0),
      shipment_charges: new FormControl(0),
      total: new FormControl(0),
      balance: new FormControl(0),
      vendor: new FormControl(0),
      organization_id: new FormControl(0),
      sub_organization_id: new FormControl(0),
      invoice_date: new FormControl(new Date()),
      due_date: new FormControl(new Date()),
      sales_person: new FormControl(0),
      attachment: new FormControl(),
      terms: new FormControl('')
    });
  }
  submitForm() { }
  ngOnInit(): void {
    this.currentSubOrganizationSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.currentOrganizationId = change.id
        this.setUpPurchaseForm()

      }
    });
  }
  close() {
    this.router.navigate(['/', 'purchase'], {
      queryParams: {
        'PO': null,
      },
      queryParamsHandling: 'merge'
    })
  }
  async setUpPurchaseForm() {
    await this.loadSitesVendorsAndUsers();
    this.route.queryParams.subscribe(async (params) => {
      // Use this queryParams object to load data
      this.isSpinning = true;
      let id = 0
      if (!params['PO'] || params['PO'] === 'new') {
        this.purchaseDetails.enable();
        this.purchaseDetails.updateValueAndValidity();
      } else {
        id = params['PO']
      }
      this.purchaseDetails.reset({ state: POStates.Draft, id: 0 });
      this.clearItems();
      this.purchaseDetails.controls['id'].setValue(id || 0);

      await this.setPurchaseRequestDetails();

      setTimeout(async () => {
        this.isSpinning = false;

      }, 1000)
    });


  }
  clearItems() {
    while ((this.purchaseDetails.get('items') as FormArray).value?.length !== 0) {
      this.purchaseDetails.controls.items.removeAt(0)
    }
  }
  async setSitesData() {
    const resp: any = await this.appService.getAndSetSites();
    const sitesData = resp && resp.length ? resp.map((site: any) => { return { label: site.name, ...site } }) : [];
    this.sites = [...sitesData];
  }


  async setPurchaseRequestDetails() {
    this.loading = true;
    if (this.purchaseDetails.controls['id'].value) {
      await this.getExistingPurchase();
    } else {
      this.purchaseDetails.controls['sub_organization_id'].setValue(this.appService.currentSubOrgId);
      this.purchaseDetails.controls['organization_id'].setValue(parseInt(localStorage.getItem('organization_id') || ''))
      this.purchaseDetails.controls['created_by'].setValue(this.userService.loggedInUser.id);

    }
    this.disableAndEnableSpecificControls()
    this.loading = false;
  }

  async getExistingPurchase() {
    const response = await this.appService.retirevePOById(this.purchaseDetails.controls['id'].value)
    if (response) {

      this.purchaseDetails.patchValue({
        id: response.id,
        purchase_no: response.purchase_no,
        subject: response.subject,
        selectedVendor: response.selectedVendor,
        state: response.state,
        isSiteBased: response.isSiteBased,
        notes: response.notes,
        sales_person: response.sales_person,
        items_discount_total: response.items_discount_total,
        overall_discount_total: response.overall_discount_total,
        item_cost: response.item_cost,
        amount_paid: response.amount_paid,
        additional_cost: response.additional_cost,
        created_by: response.created_by,
        shipment_charges: response.shipment_charges,
        total: response.total,
        balance: response.balance,
        vendor: response.vendor?.id,
        invoice_date: response.invoice_date,
        due_date: response.due_date,
        organization_id: response.organization_id,
        sub_organization_id: response.sub_organization_id,
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
      }
      this.purchaseDetails.controls.selectedVendor.setValue(this.vendors.find(ven => ven.id == this.purchaseDetails.controls.vendor.value));
      if (response.isSiteBased) {
        const selectedSites = JSON.parse(response.site_ids || '[]')

        this.purchaseDetails.controls.site_ids.setValue(
          this.sites.filter(site => selectedSites?.indexOf(site.id) > -1)?.map((site: any) => site.id)
        )
      }
      const items = response.items || [];
      items.forEach((item: any) => {
        this.addRow(item)
      });
      this.vendorItems = await this.appService.getVendorItems(this.purchaseDetails.controls.selectedVendor.value?.id)
      this.purchaseDetails.controls['items'].controls.forEach(
        (item: any) => {
          let vendoritem: any = this.vendorItems.find(vi => vi.name === item.controls.name.value)
          if (!vendoritem) {
            vendoritem = { name: item.controls.name.value }
            this.vendorItems.push(vendoritem)
          }
          item.controls.name.setValue(vendoritem.name);
        }
      )
    }

    this.previousPurchaseDetails = this.purchaseDetails.getRawValue() as any;

  }

  async loadSitesVendorsAndUsers() {
    this.vendors = await this.appService.getVendors()
    this.listOfData = await this.userService.getOrganizationUsers();
    await this.setSitesData();
  }

  async onVendorSelect() {
    this.isSpinning ? null : this.clearItems();
    if (this.purchaseDetails.controls.selectedVendor.value && !this.loading) {
      this.addRow();
      this.vendorItems = await this.appService.getVendorItems(this.purchaseDetails.controls.selectedVendor.value?.id)
      this.purchaseDetails.controls['vendor'].setValue(this.purchaseDetails.controls.selectedVendor.value?.id)
    } else {
      this.purchaseDetails.controls['vendor'].setValue(0)
    }

  }

  getItemFormGroup(object = this.defaultItemValues) {
    return this.fb.group({
      id: new FormControl(object.id),
      purchase_id: new FormControl(object.purchase_id),
      name: new FormControl(object.name),
      qty: new FormControl(object.qty),
      unit_price: new FormControl(object.unit_price),
      discount: new FormControl(object.discount),
      total: new FormControl(object.total),
      date_created: new FormControl(object.date_created),
      isCustom: new FormControl(object.isCustom)
    }) as FormGroup<ItemControl>
  }
  addRow(objectValue = this.defaultItemValues): void {

    this.purchaseDetails.controls.items.push(this.getItemFormGroup(objectValue));
  }
  addProductRow(): void {
    (this.purchaseDetails.controls['items'] as FormArray).push(this.getItemFormGroup());
  }
  onProductChange(name: string,index:number){
    ((this.purchaseDetails.controls['items']as FormArray).controls[index] as FormGroup).patchValue({isCustom:this.vendorItems.find(item=>item.name===name)?.isCustom})
  }
  calculateBalance() {
    if (this.loading) {
      return
    }
    const amount_paid = this.purchaseDetails.value.amount_paid;
    this.purchaseDetails.controls.balance.setValue(this.purchaseDetails.get('total')?.value - amount_paid);
  }

  calculateTotal(): void {
    const itemsArray = this.purchaseDetails.get('items') as FormArray;

    const discountTotal = itemsArray.value.reduce((total: any, product: any) => total + (product.unit_price * product.discount / 100), 0);
    const itemCost = itemsArray.value.reduce((total: any, product: any) => total + ((product.unit_price * (100 - product.discount) / 100) * product.qty), 0);

    this.purchaseDetails.patchValue({
      items_discount_total: discountTotal,
      item_cost: itemCost
    });
    this.calculateOverAllDiscountAndTotal();
  }
  calculateOverAllDiscountAndTotal() {
    if (this.loading) {
      return
    }
    const overallDiscount = this.purchaseDetails.value.item_cost * (this.purchaseDetails.value.overall_discount / 100)
    this.purchaseDetails.controls.overall_discount_total.setValue(overallDiscount);
    this.purchaseDetails.controls.total.setValue(this.purchaseDetails.value.item_cost - overallDiscount);
    this.purchaseDetails.controls.balance.setValue(this.purchaseDetails.value.item_cost - overallDiscount);
  }
  removeProduct(index: number): void {
    (this.purchaseDetails.get('items') as FormArray).removeAt(index);
    this.calculateTotal();
  }

  onQuantityChange(index: number): void {
    if (this.loading) {
      return
    }
    const itemsArray = this.purchaseDetails.get('items') as FormArray;
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
    const itemsArray = this.purchaseDetails.get('items') as FormArray;
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

    const itemsArray = this.purchaseDetails.get('items') as FormArray;
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
      this.vendorItems = [...this.vendorItems, { name: input.value,isCustom:true }];
    }
  }

  async submitRequest() {
    const response: any = await this.appService.addPurchaseRequest({
      details: {
        ...this.purchaseDetails.getRawValue() as PurchaseOrder,
        state: POStates.PendingInvoice,
        site_ids: JSON.stringify(this.purchaseDetails.value.site_ids)
      }, products: this.purchaseDetails.controls['items'].value
    })
    if (response) {
      this.notification.create(
        'success',
        'Purchase Order - ' + response['purchase_no'],
        'Purchase order submitted successfly. Please check for invoice and update later'
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/purchase'])
      });
    }
  }

  async cancelPaymentDetails() {
    this.modal.confirm({
      nzTitle: 'Cancel PO ' + this.purchaseDetails.get('id')?.value,
      nzContent: '<h4> Are you sure cancel this purchase order.</h4>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: async () => {
        const body = {
          id: this.previousPurchaseDetails.id
        }
        console.log(body)

        const response: any = await this.appService.updatePurchaseRequest({
          details: {
            id: this.previousPurchaseDetails.id,
            state: POStates.Cancelled
          } as any, products: []
        })
        if (response) {
          this.notification.create(
            'success',
            'Purchase Order - ' + this.previousPurchaseDetails.purchase_no,
            'Purchase order invoice cancelled successfly.',
          ).onClose.subscribe((resp) => {
            this.router.navigate(['/purchase'])
          });
        }

      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });

  }
  async confirmPaymentDetails(save = false) {
    if (!save && !this.purchaseDetails.value.amount_paid || Number(this.purchaseDetails.value.amount_paid) !== Number(this.purchaseDetails.get('total')?.value)) {
      this.notification.create(
        'error',
        'Balance exists',
        `Your payment have balance of PKR ${this.purchaseDetails.get('total')?.value - this.purchaseDetails.value.amount_paid}. Please clear it first.`
      )
      return;
    }
    const detailsDifference: any = this.appService.findObjectDifferences(this.previousPurchaseDetails, this.purchaseDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previousPurchaseDetails.id,
      ...detailsDifference
    }
    console.log(body)

    const response: any = await this.appService.updatePurchaseRequest({
      details: {
        ...{ ..._.omit(body, 'items') } as any,
        state: save ? POStates.PaymentProcessing : POStates.Completed
      }, products: []
    })
    if (response) {
      this.notification.create(
        'success',
        'Purchase Order - ' + this.previousPurchaseDetails.purchase_no,
        'Purchase order invoice submitted successfly. Please proceed next for payment details',
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/purchase'])
      });
    }
  }

  async confirmInvoiceDetails() {

    const detailsDifference: any = this.appService.findObjectDifferences(this.previousPurchaseDetails, this.purchaseDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previousPurchaseDetails.id,
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

    const response: any = await this.appService.updatePurchaseRequest({
      details: {
        ...{ ..._.omit(body, 'items') } as any,
        state: POStates.PaymentProcessing
      }, products: detailsDifference.items.map((resp: any) => _.omit(resp, 'purchase_id'))
    })
    if (response) {
      this.notification.create(
        'success',
        'Purchase Order - ' + this.previousPurchaseDetails.purchase_no,
        'Purchase order invoice submitted successfly. Please proceed next for payment details',
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/purchase'])
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
    const details = this.purchaseDetails.getRawValue()
    this.pdfGeneratorService.invoice = {
      ...details,
      type: 'purchase',
      status: this.stateNames[details.state],
      invoiceDetailLabel: 'Purchase Details',
      personName: details.vendor.name,
      address: details.vendor.address || '',
      contactNo: details.vendor.contact_no || '',
      terms: details.terms,
      email: details.vendor.email || '',
      additionalDetails: details.notes || '',
    }
    this.pdfGeneratorService.generatePDF(action)
    return;

  }

  disableAndEnableSpecificControls() {
    const stateControl = this.purchaseDetails.get('state');

    if (stateControl && stateControl.value !== this.POStates.Draft) {
      const itemsArray = this.purchaseDetails.get('items') as FormArray;
      if (stateControl.value === this.POStates.PendingInvoice) {
        for (let i = 0; i < itemsArray.length; i++) {
          const itemGroup = itemsArray.at(i) as FormGroup;
          const qtyControl = itemGroup.get('qty');
          const unitPriceControl = itemGroup.get('unit_price');
          const discountControl = itemGroup.get('discount');

          const nameControl = itemGroup.get('name');

          if (nameControl && qtyControl && unitPriceControl && discountControl) {
            nameControl.disable();
            qtyControl.enable();
            unitPriceControl.enable();
            discountControl.enable();
            itemGroup.updateValueAndValidity();
          } else {
            console.error('One or more controls are missing in the item group.');
          }
        }
      }
      console.log(this.purchaseDetails);
      Object.keys(this.purchaseDetails.controls).forEach(controlName => {
        const control = this.purchaseDetails.get(controlName);
        if (control &&
          controlName !== 'notes' &&
          controlName !== 'invoice_date' &&
          controlName !== 'due_date' &&
          controlName !== 'attachment' &&
          controlName !== 'terms' &&
          controlName !== 'items' &&
          controlName !== 'discount_total' &&
          controlName !== 'item_cost' &&
          controlName !== 'shipment_charges' &&
          controlName !== 'additional_cost' &&
          controlName !== 'overall_discount_total' &&
          controlName !== 'items_discount_total' &&
          controlName !== 'total' &&
          controlName !== 'overall_discount'
          && stateControl.value === this.POStates.PendingInvoice
        ) {
          console.log(controlName)
          control.disable();
        }
        if (control && (
          (controlName !== 'attachment' &&
            controlName !== 'amount_paid' &&

            stateControl.value === this.POStates.PaymentProcessing)
          || stateControl.value === this.POStates.Completed || stateControl.value === this.POStates.Cancelled)
        ) {
          control.disable();
        }
      });

      console.log(this.purchaseDetails);
      this.purchaseDetails.updateValueAndValidity();
    }
  }
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
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

            this.purchaseDetails.patchValue({
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
