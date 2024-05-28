import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee, SubOrganization } from '../../../services/app.interfact';
import { AppService } from '../../../services/app.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../team/users/users.interface';
import { AppPermissions } from '../../../services/app.constants';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit, OnDestroy {
  listOfColumn = [
   
    {
      title: 'Employee',
      compare: (a: Employee, b: Employee) => a.employee - b.employee,
      priority: false
    },
    {
      title: 'Position',
      compare: (a: Employee, b: Employee) => a.position.localeCompare(b.position),
      priority: false
    },
    {
      title: 'Supervisor',
      compare: (a: Employee, b: Employee) => a.supervisor - b.supervisor,
      priority: 2
    },
    {
      title: 'Salary',
      compare: (a: Employee, b: Employee) => a.salary - b.salary,
      priority: 3
    },
    {
      title: 'Overtime',
      compare: (a: Employee, b: Employee) => a.salary - b.salary,
      priority: 3
    },
    {
      title: 'Signout Required',
      compare: (a: Employee, b: Employee) => a.salary - b.salary,
      priority: 3
    },
    {
      title: 'Working Hours',
      compare: (a: Employee, b: Employee) => a.workingHours - b.workingHours,
      priority: 3
    },
    {
      title: 'Action',
      compare: (a: Employee, b: Employee) => (a.id || 0) - (b.id || 0),
      priority: 3
    }
  ];
  listOfData: Employee[] = [
  ];

  users: User[] = []
  visible = false;
  EmployeeRoles: any[];
  subOrganizations: SubOrganization[];
  subOrgSubscription: Subscription;
  appPermissions=AppPermissions;
  constructor(
    private appService: AppService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      this.populateEmployeeData();
    });
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.userService.getOrganizationUsers()
  }

  ngOnDestroy(): void {
    if (this.subOrgSubscription) {
      this.subOrgSubscription.unsubscribe()
    }
  }

  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateEmployeeData();
    }
  }

  async populateEmployeeData() {
    this.listOfData = await this.appService.getOrganizationEmployees(),
      //   this.EmployeeRoles = await this.appService.getRoles();
      // this.subOrganizations = await this.appService.getSubOrganizations();
      this.updateEditCache();
  }

  editCache: { [key: string]: { edit: boolean; data: Employee } } = {};
  startEdit(id: any): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  async saveEdit(id: number) {
    const index = this.listOfData.findIndex(item => item.id === id);
    await this.appService.updateEmployee({...this.editCache[id].data
    });
    this.editCache[id].edit = false;
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.populateEmployeeData();
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
