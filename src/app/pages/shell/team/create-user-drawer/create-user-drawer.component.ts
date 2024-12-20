import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { User, UserCreateObj, UserUpdateObj } from '../users/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { RoleObj, Client } from '../../../../services/app.interfact';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-user-drawer',
  templateUrl: './create-user-drawer.component.html',
  styleUrl: './create-user-drawer.component.css'
})
export class CreateUserDrawerComponent implements OnInit {
  @Input() visible = false;
  @Input() users: User[] = [];
  @Input() userRoles: RoleObj[] = [];
  @Input() clients: Client[] = [];
  @Input() isEdit: boolean=false;
  @Input() selectedUser: User;
  
  @Output() closeDrawer = new EventEmitter<boolean>();
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      reports_to: [0, [Validators.required]],
      role: [null, [Validators.required]],
      client_id: [null, [Validators.required]],
      organization_id: [parseInt(localStorage.getItem('organization_id') || '0')],
      password: ['p@ssw0rD'],
      email: [''],
      contact_no: ['', [Validators.required]],
      address: [''],
      is_admin: [false],
      is_client: [false],
      is_employee: [false]
    });
  }

  ngOnInit(): void {
    if(this.isEdit){
      this.userForm = this.fb.group({
        name: [this.selectedUser.name, [Validators.required]],
        reports_to: [this.selectedUser.reports_to, [Validators.required]],
        role: [this.selectedUser.role_id, [Validators.required]],
        client_id: [this.selectedUser.client_id, [Validators.required]],
        organization_id: [parseInt(localStorage.getItem('organization_id') || '0')],
        email: [this.selectedUser.email],
        contact_no: [this.selectedUser.contact_no, [Validators.required]],
        address: [this.selectedUser.address],
        is_admin: [this.selectedUser.is_admin],
        is_client: [this.selectedUser.is_client],
        is_employee: [this.selectedUser.is_employee]
      });
    }
  }
  close(): void {
    this.closeDrawer.emit(false);
  }

  async addUser() {
    if(this.isEdit){
      console.log(this.userForm);
      await this.userService.updateUser(this.userForm.value as UserUpdateObj,this.selectedUser.id)
      this.notification.create('success','User details update successfully','')
      this.closeDrawer.emit(true);  
    }else{
      console.log(this.userForm);
      await this.userService.createUser(this.userForm.value as UserCreateObj)
      this.notification.create('success','User created successfully','')
      this.closeDrawer.emit(true);  
    }
  }

  async deleteUser(){
      await this.userService.updateUser({ deleted: true ,...this.userForm.value} as unknown as UserUpdateObj,this.selectedUser.id)
      this.notification.create('success','User deleted successfully','')
      this.closeDrawer.emit(true);  
  }

  
  objectKeys(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key: key, value: obj[key] }));
  }
}
