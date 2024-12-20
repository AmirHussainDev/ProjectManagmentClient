import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subscription, Observable, Observer } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../team/users/users.interface';
import { AppPermissions, SiteStateNames, SiteStates, ProjectsGraphKeys } from '../../../../services/app.constants';
import { SiteDetails } from '../../../../services/app.interfact';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: ElementRef;
  projects: any[] = [];
  isActive = false;
  projectItems: { name: string }[] = [];
  discountTotal: number = 0;
  siteTotal: number = 0;
  loading = false;
  siteStates = SiteStates;
  stateNames = SiteStateNames;
  site_id = 0;
  permissions = AppPermissions;

  isHighcharts = typeof Highcharts === 'object';
  title = 'UnivHighCharts';
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {};
  sitesGraphKeys: any = ProjectsGraphKeys
  listOfData: User[] = [
  ];
  defaultItemValues = {
    id: 0,
    name: '',
    qty: 0,
    discount: 0,
    total: 0,
    date_created: new Date(),
    isCustom: false,
    unit_price: 0
  }
  currentClientSubscription: Subscription;
  previoussiteDetails: any;
  siteDetails: FormGroup<SiteDetails> = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    budget: new FormControl(),
    site_supervisors: new FormControl(),
    owner: new FormControl(),
    contact_no: new FormControl(),
    state: new FormControl(this.siteStates.Draft),
    address: new FormControl(),
    site_start_date: new FormControl(new Date()),
    site_end_date: new FormControl(new Date()),
    details: new FormControl(),
    created_by: new FormControl(0),
    total: new FormControl(0),
    organization: new FormControl(0),
    client: new FormControl(0)
  })
  sites: any[];
  siteForm: any;
  showChart: boolean;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private msg: NzMessageService,
    private modal: NzModalService) {
    this.chartOptions = {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent', // Set chart background color to transparent
        height: 300 // Set the height of the chart
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Site expenses',
        align: 'left',
        style: {
          fontSize: '12px', // Title font size
          fontWeight: 'bold' // Title font weight
        }
      },
      subtitle: {
        text:
          '',
        align: 'left',
        style: {
          fontSize: '12px' // Subtitle font size
        }
      },
      xAxis: {
        categories: [''],
        labels: {
          style: {
            fontSize: '11px' // X-axis labels font size
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          style: {
            fontSize: '12px' // Y-axis title font size
          }
        },
        labels: {
          style: {
            fontSize: '11px' // Y-axis labels font size
          }
        }
      },
      tooltip: {
        valueSuffix: ' ',
        style: {
          fontSize: '11px' // Tooltip font size
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: []
    };

    this.siteDetails = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      budget: new FormControl(0, [Validators.required]),
      owner: new FormControl(null, [Validators.required]),
      site_supervisors: new FormControl(null, [Validators.required]),
      contact_no: new FormControl(),
      state: new FormControl(this.siteStates.Draft),
      address: new FormControl(),
      site_start_date: new FormControl(new Date()),
      site_end_date: new FormControl(new Date()),
      details: new FormControl(),
      created_by: new FormControl(0),
      total: new FormControl(0),
      organization: new FormControl(0),
      client: new FormControl(0)
    });
  }
  submitForm() { }

  ngOnInit(): void {
    this.loadAndUsers();
    this.setProjectsData()
    this.route.paramMap.subscribe(paramMap => {
      // Use this queryParams object to load data
      if (!paramMap.get('siteId')) {
        this.siteDetails.reset({ state: this.siteStates.Draft, id: 0 });
        this.siteDetails.enable();
        this.siteDetails.updateValueAndValidity();

      }
      this.siteDetails.controls['id'].setValue(paramMap.get('siteId') !== 'new' ? paramMap.get('siteId') : 0);
      this.site_id = this.siteDetails.controls['id'].value;
      this.setSiteDetails();
      this.loadStatistics();
    });

  }
  async loadStatistics() {

    this.showChart = false;
    const serdata: {} = await this.appService.retireveSiteStatisticsById(this.site_id)
    // Iterate through the data to organize it by project name
    // Initialize an empty object to store series data
    const series: any[] = []
    Object.entries(serdata).forEach((key) => {
      if (key[0] !== 'siteId' && key[0] !== 'siteName') {
        series.push({
          name: this.sitesGraphKeys[key[0]],
          data: [key[1]]
        })
      }

    });

    // Convert seriesData object into an array


    this.showChart = true;
    // Assign the series to your chartOptions
    this.chartOptions.series = series as any;
  }
  ngOnDestroy(): void {

  }
  async setProjectsData() {
    const resp: any = await this.appService.getAndSetProjects();
    const sitesData = resp && resp.length ? resp.map((site: any) => { return { label: site.name, ...site } }) : [];
    this.sites = [...sitesData];
  }

  async setSiteDetails() {
    this.loading = true;
    if (this.siteDetails.controls['id'].value) {
      await this.getExistingsite();
    }
    this.disableAndEnableSpecificControls()
    this.loading = false;
  }

  async getExistingsite() {
    const response: any = await this.appService.retireveSiteById(this.siteDetails.controls['id'].value)
    if (response) {
      this.siteDetails.patchValue({
        id: response.id,
        state: response.state,
        created_by: response.created_by,
        total: response.total,
        organization: response.organization_id,
        client: response.client_id,
        owner: response.owner,
        site_supervisors: JSON.parse(response.site_supervisors||'[]'),
        site_start_date: response.site_start_date,
        site_end_date: response.site_end_date,
        name: response.name,
        budget: response.budget,
        contact_no: response.contact_no,
        address: response.address,
        details: response.details,
      })
    }

    this.previoussiteDetails = this.siteDetails.getRawValue() as any;

  }

  async loadAndUsers() {
    this.listOfData = await this.userService.getOrganizationUsers();
  }
  async submitRequest() {
    const response: any = await this.appService.createSite({
      ...{
        ...this.siteDetails.value,
        site_supervisors: JSON.stringify(this.siteDetails.value.site_supervisors || []),
      } as unknown as SiteDetails,
      state: this.siteStates.PendingApproval
    } as any)
    if (response) {
      this.notification.create(
        'success',
        'site Order - ' + response['id'],
        'site order submitted successfly. Please check for invoice and update later'
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/'])
      });
    }
  }

  async cancelPaymentDetails() {
    // this.modal.confirm({
    //   nzTitle: 'Cancel TASK ' + this.siteDetails.get('id')?.value,
    //   nzContent: '<h4> Are you sure cancel this site order.</h4>',
    //   nzOkText: 'Yes',
    //   nzOkType: 'primary',
    //   nzOkDanger: true,
    //   nzOnOk: async () => {
    //     const body = {
    //       id: this.previoussiteDetails.id
    //     }
    //     console.log(body)

    //     const response: any = await this.appService.updatesiteRequest({
    //       details: {
    //         id: this.previoussiteDetails.id,
    //         state: siteStates.Cancelled
    //       } as any, products: []
    //     })
    //     if (response) {
    //       this.notification.create(
    //         'success',
    //         'site Order - ' + this.previoussiteDetails.id,
    //         'site order invoice cancelled successfly.',
    //       ).onClose.subscribe((resp) => {
    //         this.router.navigate(['/'])
    //       });
    //     }

    //   },
    //   nzCancelText: 'No',
    //   nzOnCancel: () => console.log('Cancel')
    // });

  }

  async approveDetails() {
    const detailsDifference: any = this.appService.findObjectDifferences(this.previoussiteDetails, this.siteDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previoussiteDetails.id,
      ...detailsDifference
    }

    const response: any = await this.appService.updateSiteRequest(
      {
        ...body,
        site_supervisors: JSON.stringify(body.site_supervisors || []),
        state: this.siteStates.Approved
      })
    if (response) {
      this.notification.create(
        'success',
        'site Order - ' + this.previoussiteDetails.id,
        'site order invoice submitted successfly. Please proceed next for payment details',
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/'])
      });
    }
  }

  async completeSiteWork() {
    const detailsDifference: any = this.appService.findObjectDifferences(this.previoussiteDetails, this.siteDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previoussiteDetails.id,
      ...detailsDifference
    }

    const response: any = await this.appService.updateSiteRequest({
      ...body,
      state: this.siteStates.Completed
    })
    if (response) {
      this.notification.create(
        'success',
        'site - ' + this.previoussiteDetails.id,
        'site work completed successfly',
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
    const stateControl = this.siteDetails.get('state');
    if (stateControl && stateControl.value !== this.siteStates.Draft && stateControl && stateControl.value !== this.siteStates.PendingApproval) {
      console.log(this.siteDetails);
      Object.keys(this.siteDetails.controls).forEach(controlName => {
        const control = this.siteDetails.get(controlName);
        if (control &&
          ((controlName !== 'attachment' &&
            controlName !== 'terms' &&
            stateControl.value === this.siteStates.PendingApproval)
            ||
            stateControl.value === this.siteStates.Completed
            ||
            stateControl.value === this.siteStates.Approved)

        ) {
          control.disable();
        }
      });

      console.log(this.siteDetails);
      this.siteDetails.updateValueAndValidity();
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
