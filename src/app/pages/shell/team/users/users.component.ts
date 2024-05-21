import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from './users.interface';
import { AppService } from '../../../../services/app.service';
import { SubOrganization } from '../../../../services/app.interfact';



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
    }
  ];
  listOfData: User[] = [
  ];

  visible = false;
  userRoles: any[];
  subOrganizations: SubOrganization[];
  constructor(private userService: UserService,
    private appService: AppService) {

  }

  ngOnInit(): void {
    this.populateUserData();
  }



  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateUserData();
    }
  }

  async populateUserData() {
    this.listOfData = await this.userService.getOrganizationUsers(),
      this.userRoles = await this.appService.getRoles();
    this.subOrganizations = await this.appService.getSubOrganizations();

    this.userRoles = this.userRoles.map(role => ({ key: role.role_name, value: role.id }))
    this.subOrganizations = this.subOrganizations.map(sub => ({ ...sub, key: sub.name as string, value: sub.id as number })) as SubOrganization[]
    this.mapUserData();
    this.updateEditCache();
  }

  mapUserData() {

    console.log('userRoles', this.userRoles)
    this.listOfData = this.listOfData.map(data => {
      const roleName = '';
      const currentRole = this.userRoles.find(role => (data.role.id === role.value))
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
  editCache: { [key: string]: { edit: boolean; data: User } } = {};
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  async saveEdit(id: string) {
    const index = this.listOfData.findIndex(item => item.id === id);
    await this.userService.updateUser({
      id,
      organization_id: this.editCache[id].data.organization_id,
      role_id: this.editCache[id].data.role_id,
      reports_to: this.editCache[id].data.reports_to,
      name: this.editCache[id].data.name
    });
    this.editCache[id].edit = false;
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.populateUserData();
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

}
