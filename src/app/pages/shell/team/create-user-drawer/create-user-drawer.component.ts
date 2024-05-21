import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { User, UserCreateObj } from '../users/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { RoleObj, SubOrganization } from '../../../../services/app.interfact';

@Component({
  selector: 'app-create-user-drawer',
  templateUrl: './create-user-drawer.component.html',
  styleUrl: './create-user-drawer.component.css'
})
export class CreateUserDrawerComponent implements OnInit {
  @Input() visible = false;
  @Input() users: User[] = [];
  @Input() userRoles: RoleObj[] = [];
  @Input() subOrganizations: SubOrganization[] = [];
  
  @Output() closeDrawer = new EventEmitter<boolean>();
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      reports_to: [0, [Validators.required]],
      role: [null, [Validators.required]],
      sub_organization_id: [null, [Validators.required]],
      organization_id: [parseInt(localStorage.getItem('organization_id') || '0')],
      password: ['p@ssw0rD']
    });
  }

  ngOnInit(): void {
  }
  close(): void {
    this.closeDrawer.emit(false);
  }

  async addUser() {
    console.log(this.userForm);
    await this.userService.createUser(this.userForm.value as UserCreateObj)
    this.closeDrawer.emit(true);
  }
  objectKeys(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key: key, value: obj[key] }));
  }
}
