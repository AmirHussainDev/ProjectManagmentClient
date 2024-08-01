import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from './users.interface';
import { AppService } from '../../../../services/app.service';
import { SubOrganization } from '../../../../services/app.interfact';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from '../../shared-components/change-password/change-password.component';
import { AppPermissions } from '../../../../services/app.constants';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  listOfColumn = [
    {
      title: 'Name',
      compare: (a: User, b: User) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Reports To',
      compare: (a: User, b: User) => a.reports_to - b.reports_to,
      priority: 2
    },
    {
      title: 'Role Name',
      compare: (a: User, b: User) => a.role_id - b.role_id,
      priority: 3
    },
    {
      title: 'Sub Organization',
      compare: (a: User, b: User) => a.sub_organization_id - b.sub_organization_id,
      priority: 3
    },
    {
      title: 'Action',
      compare: (a: User, b: User) => a.role_id - b.role_id,
      priority: 3
    },
    {
      title: '',
      compare: (a: User, b: User) => a.role_id - b.role_id,
      priority: 3
    }
  ];
  listOfData: User[] = [
  ];

  visible = false;
  isEdit = false;
  userRoles: any[];
  selectedUser: User;
  subOrganizations: SubOrganization[];
  appPermissions = AppPermissions;
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: User[];
  constructor(private userService: UserService,
    private appService: AppService,
    private modal: NzModalService) {

  }

  ngOnInit(): void {
    this.populateUserData();
  }



  open(isEdit = false): void {
    this.visible = true;
    this.isEdit = isEdit;
  }

  close(refresh = false): void {
    this.visible = false;
    this.isEdit = false;
    if (refresh) {
      this.populateUserData();
    }
  }

  async populateUserData() {
    this.listOfData = await this.userService.getOrganizationUsers();
    this.userRoles = await this.appService.getRoles();
    this.subOrganizations = await this.appService.getSubOrganizations();

    this.userRoles = this.userRoles.map(role => ({ key: role.role_name, value: role.id }))
    this.subOrganizations = this.subOrganizations.map(sub => ({ ...sub, key: sub.name as string, value: sub.id as number })) as SubOrganization[]
    this.mapUserData();
    this.listOfDisplayData = this.listOfData;

  }

  mapUserData() {

    console.log('userRoles', this.userRoles)
    this.listOfData = this.listOfData.map(data => {
      const roleName = '';
      const currentRole = this.userRoles.find(role => (data.role?.id === role.value))
      const reportToUser = this.listOfData.find(user => user.id == data.reports_to)
      data.reports_to = reportToUser?.id;
      data.role_id = currentRole?.value;
      const subOrg = this.subOrganizations.find(sub => sub.id === parseInt(data.sub_organization_id.toString()))
      data.sub_organization_id = subOrg?.id as number;
      return {
        ...data,
        sub_organization: subOrg?.name,
        roleName: currentRole?.key, reportTo: this.listOfData.find(user => user.id == data.reports_to)?.name
      }
    }
    )
  }
  startEdit(id: any): void {
    this.open(true);
    this.selectedUser = this.listOfData[id];
  }

  openChangePasswordModal(index: number): void {
    const modal = this.modal.create({
      nzTitle: 'Change Password (' + this.listOfData[index].name + ')',
      nzContent: ChangePasswordComponent,
      nzFooter: null,
      nzData: {
        user: this.listOfData[index]
      }
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        console.log('Password changed', result);
      }
      this.searchValue = ''
      this.search();
    });
  }

  search(): void {
    this.searchVisible = false;
    if (this.searchValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) => (
        JSON.stringify(item).toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1
      ))
    } else {
      this.listOfDisplayData = this.listOfData
    }
  }
}
