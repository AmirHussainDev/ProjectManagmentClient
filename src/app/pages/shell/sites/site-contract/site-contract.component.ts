import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subscription, Observable, Observer } from 'rxjs';
import { ItemControl, ContractDetails } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../team/users/users.interface';
import { ContractStateNames, ContractStates, ContractorType, ContractorTypeName } from '../../../../services/app.constants';

@Component({
  selector: 'app-site-contract',
  templateUrl: './site-contract.component.html',
  styleUrl: './site-contract.component.css'
})
export class SiteContractComponent {
  isActive = false;
  contractorType = ContractorType;
  contractorTypeName = ContractorTypeName;
  @ViewChild('content', { static: false }) content: ElementRef;
  projects: any[] = [];
  projectItems: { name: string }[] = [];
  discountTotal: number = 0;
  contractTotal: number = 0;
  loading = false;
  contractStates = ContractStates;
  stateNames = ContractStateNames;
  site_id = 0;
  listOfData: User[] = [
  ];
  defaultItemValues = {
    id: 0,
    name: '',
    qty: 0,
    contract_id: 0,
    discount: 0,
    total: 0,
    date_created: new Date(),
    isCustom: false,
    unit_price: 0
  }
  currentClientSubscription: Subscription;
  previousContractDetails: any;
  contractDetails: FormGroup<ContractDetails> = new FormGroup({
    id: new FormControl(),
    contractor: new FormControl(),
    title: new FormControl(),
    details: new FormControl(),
    contract_type: new FormControl(),
    state: new FormControl(this.contractStates.Draft),
    with_material: new FormControl(0),
    amount_per_unit: new FormControl(0),
    created_by: new FormControl(0),
    site: new FormControl(0),
    total: new FormControl(0),
    organization: new FormControl(0),
    client: new FormControl(0),
    contract_start_date: new FormControl(new Date()),
    contract_end_date: new FormControl(new Date()),
    attachment: new FormControl(),
    terms: new FormControl(''),
    no_of_hours: new FormControl(0, [Validators.required]),
    include_weekends: new FormControl()
  })
  sites: any[];
  siteForm: any;
  
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private msg: NzMessageService,
    private modal: NzModalService) {
    this.contractDetails = this.fb.group({
      id: new FormControl(),
      contractor: new FormControl(null,[Validators.required]),
      title: new FormControl('',[Validators.required]),
      details: new FormControl(''),
      contract_type: new FormControl(this.contractorType.DurationBased,[Validators.required]),
      state: new FormControl(this.contractStates.Draft),
      with_material: new FormControl(0),
      amount_per_unit: new FormControl(0),
      created_by: new FormControl(0),
      site: new FormControl(0),
      total: new FormControl(0,[Validators.required]),
      organization: new FormControl(0),
      client: new FormControl(0),
      contract_start_date: new FormControl(new Date()),
      contract_end_date: new FormControl(new Date()),
      attachment: new FormControl(),
      terms: new FormControl(''),
      no_of_hours: new FormControl(0, [Validators.required]),
      include_weekends: new FormControl()
    });
  }
  submitForm() { }
  ngOnInit(): void {
    this.loadAndUsers();
    this.setSitesData()
    this.route.paramMap.subscribe(paramMap => {
      // Use this queryParams object to load data
      if (!paramMap.get('contractId')) {
        this.contractDetails.reset({ state: this.contractStates.Draft, id: 0 });
        this.contractDetails.enable();
        this.contractDetails.updateValueAndValidity();
      }
      this.site_id = parseInt(paramMap.get('siteId')?.toString() || '0');
      this.contractDetails.controls['id'].setValue(paramMap.get('contractId') !== 'new' ? paramMap.get('contractId') : 0);
      this.contractDetails.controls['site'].setValue(paramMap.get('siteId') || 0);
      this.setContractRequestDetails();
    });

  }
  setNoOfDays() {
    const no_of_hours = this.appService.getNumberOfDays(
      this.contractDetails.get('contract_start_date')?.value || new Date(),
      this.contractDetails.get('contract_end_date')?.value || new Date(),
      this.contractDetails.get('include_weekends')?.value)
      this.contractDetails.patchValue({
        no_of_hours
      });
      this.setAmountPerUnit();
  }
  setAmountPerUnit(){
    this.contractDetails.patchValue({
      amount_per_unit:      (this.contractDetails.get('total')?.value/this.contractDetails.get('no_of_hours')?.value)
    })
  }
  onTypeChange() {
    if(!this.loading){
      this.contractDetails.patchValue({
        no_of_hours: 0,
        amount_per_unit: 0,
        total: 0,
      })
  
    }
  }
  async setSitesData() {
    const resp: any = await this.appService.getAndSetSites();
    const sitesData = resp && resp.length ? resp.map((site: any) => { return { label: site.name, ...site } }) : [];
    this.sites = [...sitesData];
  }

  async setContractRequestDetails() {
    this.loading = true;
    if (this.contractDetails.controls['id'].value) {
      await this.getExistingContract();
    } else {
      this.contractDetails.controls['organization'].setValue(parseInt(localStorage.getItem('organization_id') || ''))
      this.currentClientSubscription = this.appService.currentClient.subscribe(resp => {
        this.contractDetails.controls['client'].setValue(resp.id);
      });
      this.contractDetails.controls['created_by'].setValue(this.userService.loggedInUser.id);
    }
    this.disableAndEnableSpecificControls()
    this.loading = false;
  }

  async getExistingContract() {
    const response: any = await this.appService.retireveContractById(this.contractDetails.controls['site'].value, this.contractDetails.controls['id'].value)
    if (response) {
      this.contractDetails.patchValue({
        id: response.id,
        title: response.title,
        details: response.details,
        state: response.state,
        created_by: response.created_by,
        total: response.total,
        organization: response.organization_id,
        client: response.client_id,
        contractor: Number(response.contractor || 0),
        contract_type: response.contract_type,
        with_material: response.with_material,
        amount_per_unit: response.amount_per_unit,
        site: response.site_id,
        contract_start_date: response.contract_start_date,
        contract_end_date: response.contract_end_date,
        attachment: response.attachment,
        terms: response.terms,
        no_of_hours: response.no_of_hours,
        include_weekends: response.include_weekends
      },{emitEvent:false})
    }

    this.previousContractDetails = this.contractDetails.getRawValue() as any;

  }

  async loadAndUsers() {
    this.listOfData = await this.userService.getOrganizationUsers();
    this.listOfData = this.listOfData.filter(user => user.is_contractor)
  }
  async submitRequest() {
    const response: any = await this.appService.createContract({
      ...this.contractDetails.value as ContractDetails,
      state: this.contractStates.PendingApproval
    } as any)
    if (response) {
      this.notification.create(
        'success',
        'Contract Order - ' + response['id'],
        'Contract order submitted successfly. Please check for invoice and update later'
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/'])
      });
    }
  }

  async cancelPaymentDetails() {
    // this.modal.confirm({
    //   nzTitle: 'Cancel PO ' + this.contractDetails.get('id')?.value,
    //   nzContent: '<h4> Are you sure cancel this contract order.</h4>',
    //   nzOkText: 'Yes',
    //   nzOkType: 'primary',
    //   nzOkDanger: true,
    //   nzOnOk: async () => {
    //     const body = {
    //       id: this.previousContractDetails.id
    //     }
    //     console.log(body)

    //     const response: any = await this.appService.updateContractRequest({
    //       details: {
    //         id: this.previousContractDetails.id,
    //         state: this.contractStates.Cancelled
    //       } as any, products: []
    //     })
    //     if (response) {
    //       this.notification.create(
    //         'success',
    //         'Contract Order - ' + this.previousContractDetails.id,
    //         'Contract order invoice cancelled successfly.',
    //       ).onClose.subscribe((resp) => {
    //         this.router.navigate(['/'])
    //       });
    //     }

    //   },
    //   nzCancelText: 'No',
    //   nzOnCancel: () => console.log('Cancel')
    // });

  }

  async confirmInvoiceDetails() {
    const detailsDifference: any = this.appService.findObjectDifferences(this.previousContractDetails, this.contractDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previousContractDetails.id,
      ...detailsDifference
    }

    const response: any = await this.appService.updateContractRequest({
      ...body,
      state: this.contractStates.Approved
    })
    if (response) {
      this.notification.create(
        'success',
        'Contract Order - ' + this.previousContractDetails.id,
        'Contract order invoice submitted successfly. Please proceed next for payment details',
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/'])
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
      // const pdf = new jspdf.jsPDF();
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.save('your-component.pdf');
    });
  }

  disableAndEnableSpecificControls() {
    const stateControl = this.contractDetails.get('state');
    if (stateControl && stateControl.value !== this.contractStates.Draft && stateControl.value !== this.contractStates.PendingApproval) {
      console.log(this.contractDetails);
      Object.keys(this.contractDetails.controls).forEach(controlName => {
        const control = this.contractDetails.get(controlName);
        if (control &&
          ((controlName !== 'attachment' &&
            controlName !== 'terms' &&
            stateControl.value === this.contractStates.PendingApproval)
            ||
            stateControl.value === this.contractStates.Completed)

        ) {
          control.disable();
        }
      });

      console.log(this.contractDetails);
      this.contractDetails.updateValueAndValidity();
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
      this.contractDetails.patchValue({
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
}
