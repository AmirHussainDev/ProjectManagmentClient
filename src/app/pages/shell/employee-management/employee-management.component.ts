import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee, Client } from '../../../services/app.interfact';
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
      compare: (a: any, b: any) => a.employeeName.localeCompare(b.employeeName),
      priority: 1
    },
    {
      title: 'Position',
      compare: (a: any, b: any) => a.position.localeCompare(b.position),
      priority: 2
    },
    // {
    //   title: 'HourlyRate',
    //   compare: (a: any, b: any) => a.salary - b.salary,
    //   priority: 3
    // },
    // {
    //   title: 'Overtime',
    //   compare: (a: any, b: any) => a.overtime - b.overtime,
    //   priority: 4
    // },
    // {
    //   title: 'Signout Required',
    //   compare: (a: any, b: any) => a.siginout_required - b.siginout_required,
    //   priority: 5
    // },
    // {
    //   title: 'Working Hours',
    //   compare: (a: any, b: any) => a.workingHours - b.workingHours,
    //   priority: 6
    // },
    {
      title: 'Action',
      compare: (a: any, b: any) => (a.id || 0) - (b.id || 0),
      priority: 5
    }
  ];
  listOfData: Employee[] = [
  ];

  users: User[] = []
  visible = false;
  EmployeeRoles: any[];
  clients: Client[];
  clientSubscription: Subscription;
  appPermissions = AppPermissions;
  currentOrganizationId: number;
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: Employee[] = [];
  isNew: boolean;
  editableItem: Employee;
  loggedInUser: User;
  constructor(
    private appService: AppService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.loggedInUser = this.userService.loggedInUser;
    this.getUsers();
    if(this.loggedInUser.is_admin){
      this.listOfColumn.push(
        {
          title: 'HourlyRate',
          compare: (a: Employee, b: Employee) => a.salary - b.salary,
          priority: 3
        },)

        this.listOfColumn = this.listOfColumn.sort((a, b) => a.priority - b.priority);
      }

  }
  async getUsers() {
    this.users = await this.userService.getOrganizationUsers()
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.populateEmployeeData();
        this.currentOrganizationId = change.id
      }
    });

  }

  ngOnDestroy(): void {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe()
    }
  }

  open(isNew = true): void {
    this.visible = true;
    this.isNew = isNew;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateEmployeeData();
    }
  }

  async populateEmployeeData() {
    this.listOfData = await this.appService.getOrganizationEmployees(),
      this.listOfDisplayData = this.listOfData;
    //   this.EmployeeRoles = await this.appService.getRoles();
    // this.clients = await this.appService.getClient();
    this.updateEditCache();
  }

  editCache: { [key: string]: { edit: boolean; data: Employee } } = {};
  startEdit(id: any): void {
    // this.editCache[id].edit = true;
    this.editableItem = this.editCache[id].data;
    // this.editCache[id].edit = true;

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
    await this.appService.updateEmployee({
      id: this.editCache[id].data.id,
      position: this.editCache[id].data.position,
      employee: this.editCache[id].data.employee,
      // supervisor: this.editCache[id].data.supervisor,
      salary: this.editCache[id].data.salary,
      // overtime: this.editCache[id].data.overtime,
      // isHourlyRateHourly: this.editCache[id].data.isHourlyRateHourly,
      // workingHours: this.editCache[id].data.workingHours,
      // siginout_required: this.editCache[id].data.siginout_required,
      details: this.editCache[id].data.details,
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


  search(): void {
    this.searchVisible = false;
    if (this.searchValue) {
      this.listOfDisplayData = this.listOfData.filter((item: any) => (item.employeeName && item.employeeName.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) || (item.supervisorName && item.supervisorName.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)

    } else {
      this.listOfDisplayData = this.listOfData
    }
  }
}
