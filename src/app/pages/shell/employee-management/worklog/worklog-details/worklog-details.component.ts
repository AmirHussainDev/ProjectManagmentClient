import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../../../services/app.service';
import { EmployeePayments, Worklog, Employee } from '../../../../../services/app.interfact';
import { EmployeeManagementService } from '../../employee-management.service';
import { AppPermissions } from '../../../../../services/app.constants';

@Component({
  selector: 'app-worklog-details',
  templateUrl: './worklog-details.component.html',
  styleUrl: './worklog-details.component.css'
})
export class WorklogDetailsComponent implements OnInit {

  @Input() employee: Employee;
  @Input() worklog: any[];
  appPermissions=AppPermissions;
  WorklogData: any[] = []; // Data for Worklog's table
  latitude: number;
  longitude: number;
  totalAmount=0;
  balanceAmount=0;
  constructor(private appService: AppService, private employeeManagementService: EmployeeManagementService) {

  }

  ngOnInit(): void {
    this.getCurrentUserWorklog();
    // this.sunscribeToGeoLocation();
    console.log(this.worklog)
  }

  sunscribeToGeoLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {

          this.latitude = position.coords.latitude,
            this.longitude = position.coords.longitude
        }
      );
    }
  }

  async getCurrentUserWorklog() {
    const worklog: any[] = await this.appService.getCurrentAddUpdateTaskWorklog(this.employee.employee.id)
    if (worklog) {
      this.initializeWorklogTableData(worklog);

    }
    this.updateEditCache();
  }

  initializeWorklogTableData( worklogs: Worklog[]): void {
    this.WorklogData = worklogs;
    this.totalAmount=this.WorklogData.reduce((accumulator, currentValue) => {
      return accumulator + (Number(currentValue.approved_hours||currentValue.no_of_hours)||0)*this.employee.salary;
  }, 0);

  this.balanceAmount==this.WorklogData.filter(log=>!log.paid).reduce((accumulator, currentValue) => {
    return accumulator + (Number(currentValue.approved_hours||currentValue.no_of_hours)||0)*this.employee.salary;
}, 0);
  }

  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.WorklogData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.WorklogData[index] },
      edit: false
    };
  }
  claculateAndSetAmount(id: number) {
    setTimeout(()=>{
      this.totalAmount=this.WorklogData.reduce((accumulator, currentValue,curr_index) => {
        return accumulator + (Number((currentValue.id==id?this.editCache[id].data.approved_hours:currentValue.approved_hours)||currentValue.no_of_hours)||0)*this.employee.salary;
    }, 0);
    this.balanceAmount==this.WorklogData.filter(log=>!log.paid).reduce((accumulator, currentValue,curr_index) => {
      return accumulator + (Number((currentValue.id==id?this.editCache[id].data.approved_hours:currentValue.approved_hours)||currentValue.no_of_hours)||0)*this.employee.salary;
  }, 0);
    },100)
    

  }

  signIn(index: number) {
    this.editCache[index].data.sign_in_corrd = this.latitude + ',' + this.longitude
  }

  signOut(index: number) {
    this.editCache[index].data.sign_out_corrd = this.latitude + ',' + this.longitude
    this.editCache[index].data.hours_worked =
      Math.round(this.employeeManagementService.getDifferenceInHours(this.editCache[index].data.sign_in, this.editCache[index].data.sign_out))
    const salaryPerHour = this.employeeManagementService.calculateHourlyRate(
      this.employee.salary,
      this.editCache[index].data.date,
       8,
      true
    )
    this.editCache[index].data.amount = (salaryPerHour *
      this.employeeManagementService.calculateWorkingHours(this.employee, (this.editCache[index].data.approved_hours || this.editCache[index].data.hours_worked)));
  }

  async saveEdit(id: any) {
    const index = this.WorklogData.findIndex(item => item.id === id);
    if (this.editCache[id].data.id) {
      await this.appService.updateWorklog({
        id,
        approved_hours: this.editCache[id].data.approved_hours,
      } as Worklog);
    } 
    this.editCache[id].edit = false;
    Object.assign(this.WorklogData[index], this.editCache[id].data);
    this.getCurrentUserWorklog();
  }
  async completeEmployeePayment() {
      await this.appService.payAddUpdateTaskWorklogs(
  this.employee.employee.id) 
    this.getCurrentUserWorklog();
      
  }
  updateEditCache(): void {
    this.WorklogData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
