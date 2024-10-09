import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Client } from '../../../services/app.interfact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppPermissions } from '../../../services/app.constants';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;

  isModalVisible = false;
  drawerVisible = false;
  selectedProject: any = {};
  addProjectForm: FormGroup;
  appPermissions = AppPermissions;
  listOfColumn = [

    {
      title: 'Name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Description',
      compare: (a: any, b: any) => a.description.localeCompare(b.description),
      priority: false
    },
    {
      title: 'Action',
      compare: (a: any, b: any) => a.role_id - b.role_id,
      priority: false
    }
  ];
  listOfData: any[] = [
  ];

  visible = false;
  projectRoles: any[];
  clients: Client[];
  loading: boolean;
  avatarUrl: string;
  msg: any;
  currentClientSubscription: Subscription;
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: any[] = [];
  newItem: boolean;
  editableItem: any;
  constructor(private appService: AppService,
    private fb: FormBuilder
  ) {
    this.addProjectForm = this.fb.group({
      name: ['', [Validators.required]],
      id: [0],
      description: ['', [Validators.required]],
      file: ['', [Validators.required]]
    })
  }

  showModal(isNew = true) {
    this.newItem = isNew;
    if (this.newItem) {
      this.addProjectForm.reset();
      this.avatarUrl = '';
    }
    this.isModalVisible = true;
  }

  async handleOk() {
    this.isModalVisible = false;
    this.newItem ? await this.appService.createProject(this.addProjectForm.value, this.addProjectForm.value.file) :
      await this.appService.updateProject(this.addProjectForm.value,
        this.addProjectForm.value.file)
    this.isModalVisible = false;
    this.populateProjectData();
  }

  handleCancel() { this.isModalVisible = false; }

  ngOnInit(): void {
    this.currentClientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0) {
        this.populateProjectData();

      }
    });
  }
  ngOnDestroy(): void {
    if (this.currentClientSubscription) {
      this.currentClientSubscription.unsubscribe()
    }
  }


  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateProjectData();
    }
  }

  async populateProjectData() {
    this.listOfData = await this.appService.getProjects(),
      this.listOfDisplayData = this.listOfData
    this.updateEditCache();
  }


  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  startEdit(id: string): void {
    this.editableItem = this.editCache[id].data;
    // this.editCache[id].edit = true;
    this.addProjectForm = this.fb.group({
      name: [this.editableItem.name, [Validators.required]],
      description: [this.editableItem.description, [Validators.required]],
      file: [null, [Validators.required]],
      id: [this.editableItem.id]
    })
    this.avatarUrl = 'api/images/' + this.editableItem.filename
  }

  cancelEdit(id: string): void {
    const index = this.listOfDisplayData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfDisplayData[index] },
      edit: false
    };
  }

  async saveEdit(id: string) {
    const index = this.listOfDisplayData.findIndex(item => item.id === id);
    // await this.appService.updateProject({
    //   id,
    //   ...this.editCache[id].data,
    //   organization_id: this.editCache[id].data.organization_id,
    //   role_id: this.editCache[id].data.role_id,
    //   reports_to: this.editCache[id].data.reports_to,
    //   name: this.editCache[id].data.name
    // });
    this.editCache[id].edit = false;
    Object.assign(this.listOfDisplayData[index], this.editCache[id].data);
    this.populateProjectData();
  }

  updateEditCache(): void {
    this.listOfDisplayData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  viewDetails(project: any) {
    this.selectedProject = project;
    this.drawerVisible = true;
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
      this.addProjectForm.patchValue({
        file
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
      this.avatarUrl = img;
    });
  }


  search(): void {
    this.searchVisible = false;
    if (this.searchValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) => (item.name && item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)

    } else {
      this.listOfDisplayData = this.listOfData
    }
  }
}
