import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { SubOrganization } from '../../../services/app.interfact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppPermissions } from '../../../services/app.constants';



@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;

  isModalVisible = false;
  drawerVisible = false;
  selectedVendor: any = {};
  addVendorForm: FormGroup;
  appPermissions = AppPermissions;
  listOfColumn = [

    {
      title: 'Name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Contact No',
      compare: (a: any, b: any) => a.contact_no.localeCompare(b.contact_no),
      priority: false
    },
    {
      title: 'Address',
      compare: (a: any, b: any) => a.address.localeCompare(b.address),
      priority: false
    },
    {
      title: 'Email',
      compare: (a: any, b: any) => a.email.localeCompare(b.email),
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
  vendorRoles: any[];
  subOrganizations: SubOrganization[];
  loading: boolean;
  avatarUrl: string;
  msg: any;
  currentSubOrganizationSubscription: Subscription;
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: any[] = [];
  newItem: boolean;
  editableItem: any;
  constructor(private appService: AppService,
    private fb: FormBuilder
  ) {
    this.addVendorForm = this.fb.group({
      name: ['', [Validators.required]],
      id: [0],
      contact_no: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      file: ['', [Validators.required]]
    })
  }

  showModal(isNew = true) {
    this.newItem = isNew;
    if (this.newItem) {
      this.addVendorForm.reset();
      this.avatarUrl = '';
    }
    this.isModalVisible = true;
  }

  async handleOk() {
    this.isModalVisible = false;
    this.newItem ? await this.appService.createVendor(this.addVendorForm.value, this.addVendorForm.value.file) :
      await this.appService.updateVendor(this.addVendorForm.value,
        this.addVendorForm.value.file)
    this.isModalVisible = false;
    this.populateVendorData();
  }

  handleCancel() { this.isModalVisible = false; }

  ngOnInit(): void {
    this.currentSubOrganizationSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0) {
        this.populateVendorData();

      }
    });
  }
  ngOnDestroy(): void {
    if (this.currentSubOrganizationSubscription) {
      this.currentSubOrganizationSubscription.unsubscribe()
    }
  }


  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateVendorData();
    }
  }

  async populateVendorData() {
    this.listOfData = await this.appService.getVendors(),
      this.listOfDisplayData = this.listOfData
    this.updateEditCache();
  }


  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  startEdit(id: string): void {
    this.editableItem = this.editCache[id].data;
    // this.editCache[id].edit = true;
    this.addVendorForm = this.fb.group({
      name: [this.editableItem.name, [Validators.required]],
      contact_no: [this.editableItem.contact_no, [Validators.required]],
      email: [this.editableItem.email, [Validators.required]],
      address: [this.editableItem.address, [Validators.required]],
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
    // await this.appService.updateVendor({
    //   id,
    //   ...this.editCache[id].data,
    //   organization_id: this.editCache[id].data.organization_id,
    //   role_id: this.editCache[id].data.role_id,
    //   reports_to: this.editCache[id].data.reports_to,
    //   name: this.editCache[id].data.name
    // });
    this.editCache[id].edit = false;
    Object.assign(this.listOfDisplayData[index], this.editCache[id].data);
    this.populateVendorData();
  }

  updateEditCache(): void {
    this.listOfDisplayData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  viewDetails(vendor: any) {
    this.selectedVendor = vendor;
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
      this.addVendorForm.patchValue({
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
