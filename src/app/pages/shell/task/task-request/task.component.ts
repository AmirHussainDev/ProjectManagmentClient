import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from '../../../../services/app.service';
import { Employee, ItemControl, PaymentHistory, TaskDetails, TaskItem, TaskOrder } from '../../../../services/app.interfact';
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
import { TaskStateNames, TaskStates, RestrictNavigationMessage, TaskTypeColors, TaskTypes, TaskStatesConnectivity, TaskSeverity, TaskSeverityColors } from '../../../../services/app.constants';
import { PdfGeneratorService } from '../../../../services/pdf-generator.service';
import { DataUrl, NgxImageCompressService, UploadResponse } from 'ngx-image-compress';
import { CanComponentDeactivate } from '../../../../guards/can-deactivate.guard';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('content', { static: false }) content: ElementRef;
  projects: any[] = [];
  projectItems: { name: string, isCustom?: boolean }[] = [];
  discountTotal: number = 0;
  taskTotal: number = 0;
  loading = false;
  taskTypes=TaskTypes;
  taskTypeIcons=TaskTypeColors;
  taskSeverity=TaskSeverity;
  taskSeverityColors=TaskSeverityColors;
  TaskStates = TaskStates;
  stateNames = TaskStateNames;
  taskStatesConnectivity=TaskStatesConnectivity;
  listOfData: any[] = [
  ];
  defaultItemValues = {
    id: 0,
    name: '',
    qty: 0,
    task_id: 0,
    discount: 0,
    total: 0,
    date_created: new Date(),
    isCustom: false,
    unit_price: 0
  }
  isSpinning = false;
  currentClientSubscription: Subscription;
  previousTaskDetails: any;
  taskDetails: FormGroup<TaskDetails> = new FormGroup({
    id: new FormControl(),
    task_no: new FormControl(),
    title: new FormControl(),
    // items: this.fb.array([]),
    // selectedProject: new FormControl(),
    type:new FormControl(2),
    state: new FormControl(TaskStates.Backlog),
    description: new FormControl(),
    severity:new FormControl(1),
    // items_discount_total: new FormControl(0),
    // overall_discount_total: new FormControl(0),
    // item_cost: new FormControl(0),
    // payment_history: this.fb.array<FormGroup<PaymentHistory>>([]),
    // amount_paid: new FormControl(0),
    // additional_cost: new FormControl(0),
    created_by: new FormControl(0),
    date_created: new FormControl(new Date()),
    // shipment_charges: new FormControl(0),
    // total: new FormControl(0),
    // balance: new FormControl(0),
    // project: new FormControl(0),
    organization_id: new FormControl(0),
    client_id: new FormControl(0),
    // invoice_date: new FormControl(new Date()),
    start_date:new FormControl(new Date()),
    due_date: new FormControl(new Date()),
    assignee: new FormControl(0),
    comments: new FormControl(),
    terms: new FormControl('')
    })
  sites: any[];
  clientSubscription: Subscription;
  routerSubscription: Subscription;
  currentOrganizationId: number;
  fileList: NzUploadFile[] = [];
  displayControlColumns = [
    {
      value: 'name',
      name: 'Item'
    }]
  created_by_users: User[];
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
    this.taskDetails = this.fb.group({
      id: new FormControl(),
      title: new FormControl(null, [Validators.required]),
      task_no: new FormControl(),
      type:new FormControl(2),
      severity:new FormControl(2),
      state: new FormControl(TaskStates.Backlog),
      description: new FormControl(),
      created_by: new FormControl(0),
      date_created: new FormControl(new Date()),
      organization_id: new FormControl(0),
      client_id: new FormControl(0),
      start_date:new FormControl(new Date()),
      due_date: new FormControl(new Date()),
      assignee: new FormControl(0),
      comments: new FormControl(),
      terms: new FormControl('')
    });
    this.taskDetails.controls.type.setValue(Object.keys(this.taskTypes).find(key=>Number(key)===Number(2)))
this.taskDetails.controls.severity.setValue(Object.keys(this.taskSeverity).find(key=>Number(key)===Number(1)))

  }
  submitForm() { }
  ngOnInit(): void {
    this.currentClientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
          this.currentOrganizationId = change.id
          this.setUpTaskForm();
      }
    });
  }
  ngOnDestroy(): void {
    this.routerSubscription ? this.routerSubscription.unsubscribe() : null;
  }

  canDeactivate(): boolean {
    if (this.shouldConfirmNavigation()) {
      return confirm(RestrictNavigationMessage);
    }
    return true;
  }

  private shouldConfirmNavigation(): boolean {
    // Your logic to determine if the confirmation is needed
    return  (this.taskDetails.dirty  || this.taskDetails.touched);
  }


  close() {
    this.router.navigate(['/', 'task',location.href.indexOf('board')>-1?'board':location.href.indexOf('report')>-1?'report':'list'], {
      queryParams: {
        'TASK': null,
      },
      queryParamsHandling: 'merge'
    })
  }
  async setUpTaskForm() {
    await this.loadProjectsProjectsAndUsers();
    this.routerSubscription = this.route.queryParams.subscribe(async (params) => {
      if (this.taskDetails.dirty || this.taskDetails.touched) {
        const confirmNavigation = confirm(RestrictNavigationMessage);
       if(!confirmNavigation){
        return;
       } 
      }
      // Use this queryParams object to load data
      this.isSpinning = true;
      let id = 0
      if (!params['TASK'] || params['TASK'] === 'new') {
        this.taskDetails.enable();
        this.taskDetails.updateValueAndValidity();
      } else {
        id = params['TASK']
      }
      this.created_by_users = [this.userService.loggedInUser]

      this.taskDetails.controls['id'].setValue(id || 0);

      await this.setTaskRequestDetails();

      setTimeout(async () => {
        this.isSpinning = false;

      }, 1000)
    });


  }
 
  async setProjectsData() {
    const resp: any = await this.appService.getAndSetProjects();
    const sitesData = resp && resp.length ? resp.map((site: any) => { return { label: site.name, ...site } }) : [];
    this.sites = [...sitesData];
  }


  async setTaskRequestDetails() {
    this.loading = true;
    if (this.taskDetails.controls['id'].value) {
      await this.getExistingTask();
    } else {
      this.taskDetails.controls['client_id'].setValue(this.appService.currentSubOrgId);
      this.taskDetails.controls['organization_id'].setValue(parseInt(localStorage.getItem('organization_id') || ''))
      this.taskDetails.controls['created_by'].setValue(this.userService.loggedInUser.id);

    }
    this.disableAndEnableSpecificControls()
    this.loading = false;
  }

  async getExistingTask() {
    const response = await this.appService.retireveTaskById(this.taskDetails.controls['id'].value)
    if (response) {
      this.created_by_users = [response.created_by]

      this.taskDetails.patchValue({
        id: response.id,
        task_no: response.task_no,
        title: response.title,
        state: response.state,
        type:  response.type,
        severity:response.severity,
        description: response.description,
        assignee: response.assignee,
        created_by: response.created_by.id,
        date_created: new Date(response.date_created),
        start_date:response.start_date,
        due_date: response.due_date,
        organization_id: response.organization_id,
        client_id: response.client_id,
        comments: response.comments,
      })
      if (response.comments && response.comments.length) {
        this.fileList = response.comments.map((file: any) => (
          {
            name: 'image.png',
            status: 'done',
            url: file,
            message: '',
            thumbUrl: file
          }
        ))
      }
    }
this.taskDetails.controls.type.setValue(Object.keys(this.taskTypes).find(key=>Number(key)===Number(response.type)))
this.taskDetails.controls.severity.setValue(Object.keys(this.taskSeverity).find(key=>Number(key)===Number(response.severity)))
// this.taskDetails.controls.state.setValue(Object.keys(this.TaskStates).find((key:any)=>Number(((this.TaskStates)as any )[key])===Number(response.state)))
    this.previousTaskDetails = this.taskDetails.getRawValue() as any;

  }



  async loadProjectsProjectsAndUsers() {
    // this.projects = await this.appService.getProjects()
    this.listOfData = await this.appService.getOrganizationEmployees();
    // await this.setProjectsData();
  }



  getItemFormGroup(object = this.defaultItemValues) {
    return this.fb.group({
      id: new FormControl(object.id),
      task_id: new FormControl(object.task_id),
      name: new FormControl(object.name, [Validators.required]),
      qty: new FormControl(object.qty, [Validators.required]),
      unit_price: new FormControl(object.unit_price),
      discount: new FormControl(object.discount),
      total: new FormControl(object.total),
      date_created: new FormControl(object.date_created),
      isCustom: new FormControl(object.isCustom)
    }) as FormGroup<ItemControl>
  }
  async submitRequest() {
    const response: any = await this.appService.AddUpdateTask({
      details: {
        ...this.taskDetails.getRawValue() as TaskOrder,
        state: TaskStates.Backlog,
      }
    })
    if (response) {
      this.notification.create(
        'success',
        'Task Order - ' + response['task_no'],
        'Task order submitted successfly. Please check for invoice and update later'
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/task',location.href.indexOf('board')>-1?'board':'list'])
      });
    }
  }

  async updateDetails() {

    const detailsDifference: any = this.appService.findObjectDifferences(this.previousTaskDetails, this.taskDetails.getRawValue())
    console.log(detailsDifference)
    const body = {
      id: this.previousTaskDetails.id,
      ...detailsDifference
    }

    if (Object.keys(detailsDifference).length <= 1) {
      this.notification.create(
        'error',
        'Task Updated',
        `Please update missing details before submission.`
      )
      return
    }

    const response: any = await this.appService.updateTaskRequest( body )
    if (response) {
      this.notification.create(
        'success',
        'Task - ' + this.previousTaskDetails.task_no,
        'Task updated successfly.',
      ).onClose.subscribe((resp) => {
        this.router.navigate(['/task',location.href.indexOf('board')>-1?'board':'list'])
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
    const details = this.taskDetails.getRawValue()
    this.pdfGeneratorService.invoice = {
      ...details,
      type: this.taskTypes[details.type],
      status: this.stateNames[details.state],
      invoiceDetailLabel: 'Task Details',
      personName: details.assignee.name,
      address: details.assignee.address || '',
      contactNo: details.assignee.contact_no || '',
      terms: details.terms,
      email: details.assignee.email || '',
      additionalDetails: details.description || '',
      created_by:this.created_by_users[0]
    }
    this.pdfGeneratorService.generatePDF(action)
    return;

  }

  disableAndEnableSpecificControls() {
    const stateControl = this.taskDetails.get('state');
    if (stateControl && stateControl.value == this.TaskStates.InProgress) {
      this.taskDetails.controls.created_by.disable()
      this.taskDetails.controls.date_created.disable()
    }
    if (stateControl && stateControl.value !== this.TaskStates.Backlog) {
      console.log(this.taskDetails);
      Object.keys(this.taskDetails.controls).forEach(controlName => {
        const control = this.taskDetails.get(controlName);
        if (control &&
          controlName !== 'description' &&
          controlName !== 'invoice_date' &&
          controlName !== 'due_date' &&   
          controlName !== 'start_date' &&
        
          controlName !== 'comments' &&
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
          && stateControl.value === this.TaskStates.InProgress
        ) {
          console.log(controlName)
          control.disable();
        }
        if (control && (
          (controlName !== 'comments' &&
            controlName !== 'amount_paid' &&

            stateControl.value === this.TaskStates.Completed)
          || stateControl.value === this.TaskStates.Completed || stateControl.value === this.TaskStates.Completed)
        ) {
          control.disable();
        }
      });

      console.log(this.taskDetails);
      this.taskDetails.updateValueAndValidity();
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

            this.taskDetails.patchValue({
              comments: info.fileList?.map(fileItem => fileItem.url)
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
