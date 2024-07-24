import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubOrganization } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';
import { AppPermissions } from '../../../../services/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DataUrl, NgxImageCompressService, UploadResponse } from 'ngx-image-compress';

@Component({
  selector: 'app-organization-selector',
  templateUrl: './organization-selector.component.html',
  styleUrl: './organization-selector.component.css'
})
export class OrganizationSelectorComponent implements OnInit {
  loading = false;
  data: SubOrganization[] = []
  @Input() visible = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  appPermissions=AppPermissions
  isModalVisible = false;
  addOrgForm: FormGroup;
  avatarUrl: string;
  msg: any;
  apiUrl = environment.apiUrl;
  constructor(private appService: AppService,
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService
    ) {
    this.addOrgForm = this.fb.group({
      name: ['', [Validators.required]],
      filename: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getAndSetSubOrganizations();
  }

  getUserInitials(name: string): string {
    const nameArray = name.trim().split(' '); // Split the name into an array of words
    const initials = nameArray.map(word => word.charAt(0)); // Extract the first character of each word
    return initials.join('').toUpperCase(); // Join the characters and convert to uppercase
  }
  
  close() {
    this.closeDrawer.emit(true);
  }
  handleCancel() { this.isModalVisible = false; }
  
  showModal() {
    this.isModalVisible = true;
  }

  async handleOk() {
    await this.appService.createSubOrganization(this.addOrgForm.getRawValue())
    this.isModalVisible = false;
    this.getAndSetSubOrganizations();
  }

  compressFile() {
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation, fileName }: UploadResponse) => {
        console.warn('File Name:', fileName);
        console.warn(
          `Original: ${image.substring(0, 50)}... (${image.length} characters)`
        );
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

   /*| Parameter   | Type   | Description                                                                       |
   | ----------- | ------ | --------------------------------------------------------------------------------- |
   | image       | string | DataUrl (string) representing the image                                           |
   | orientation | number | EXIF Orientation value using the DOC_ORIENTATION enum value                       |
   | ratio       | number | Maximum scale factor as a percentage (optional, default: 50) <sup>[1](#fn1)</sup> |
   | quality     | number | JPEG quality factor as a percentage (optional, default: 50) <sup>[2](#fn2)</sup>  |
   | maxwidth    | number | Maximum width in pixels if you need to resize (optional, default: 0 - no resize)  |
   | maxheight   | number | Maximum height in pixels if you need to resize (optional, default: 0 - no resize) |
   */
  
        this.imageCompress
          .compressFile(image, orientation, 50, 80,800,800)
          .then((result: DataUrl) => {
            console.warn(
              `Compressed: ${result.substring(0, 50)}... (${
                result.length
              } characters)`
            );
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );
            this.addOrgForm.patchValue({
              filename:result
            })
          });
      });
  }

  b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
    // Remove any whitespace (newlines, spaces) and non-base64 characters
    b64Data = b64Data.replace(/[^A-Za-z0-9+/=]/g, '');
  
    // Ensure the base64 string is correctly padded
    while (b64Data.length % 4 !== 0) {
      b64Data += '=';
    }
  
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
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
    this.avatarUrl = img;
  });
}

  async getAndSetSubOrganizations() {
    this.loading = true;
    this.data = await this.appService.getSubOrganizations(true);
    this.loading = false;
  }

  setSubOrganization(item: SubOrganization) {
    this.appService.setSubOrganization(item);
    localStorage.setItem('selectedOrganzation',JSON.stringify(item))
    this.closeDrawer.emit(true)
  }
}
