import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../../../services/app.service';
import { EmployeePayments, Attendance, Employee } from '../../../../../services/app.interfact';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrl: './attendance-details.component.css'
})
export class AttendanceDetailsComponent implements OnInit {

  @Input() employee: Employee;
  @Input() isSupervisor: boolean;
  supervisorData: any[] = []; // Data for supervisor's table

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.getCurrentUserAttance();
  }

  async getCurrentUserAttance() {
    const attendance: { lastPayment: EmployeePayments, attendances: Attendance[] } = await this.appService.getCurrentUserAttendance(this.employee.id)
    if (attendance) {
      this.initializeSupervisorTableData(attendance.lastPayment, attendance.attendances);

    }
    this.updateEditCache();
  }

  initializeSupervisorTableData(lastPayment: EmployeePayments, attendances: Attendance[]): void {
    // Initialize table data for supervisor
    const currentDate = new Date();
    const lastPaymentDate = lastPayment ? new Date(lastPayment.date_created) : null;
    const attendanceDates = attendances.map(a => new Date(a.date_created));

    let startDate: Date;

    // Determine the start date based on the last payment date and attendance dates
    if (lastPaymentDate && lastPaymentDate >= new Date(Math.min(...attendanceDates.map(date => date.getTime())))) {
      startDate = lastPaymentDate;
    } else if (attendanceDates && attendanceDates.length) {
      startDate = new Date(Math.min(...attendanceDates.map(date => date.getTime())));
    } else {
      startDate = new Date(this.employee.date_created);
    }

    // Generate an array of dates from the start date to the current date
    const datesArray = [];
    let currentDateIterator = new Date(startDate);
    let index = 0;
    while (currentDateIterator <= currentDate) {
      const attendanceObj = attendances.find(a => {
        const attendanceDate = new Date(a.date_created);
        attendanceDate.setHours(0, 0, 0, 0);
        currentDateIterator.setHours(0, 0, 0, 0);
        return attendanceDate.getTime() === currentDateIterator.getTime();
      });
      datesArray.push({ id: index, date: new Date(currentDateIterator), attendanceObj: attendanceObj ? attendanceObj : {} });
      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
      index++;
    }

    this.supervisorData = datesArray;
  }

  editCache: { [key: string]: { edit: boolean; data: { date: Date, attendanceObj: Attendance } } } = {};
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.supervisorData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.supervisorData[index] },
      edit: false
    };
  }

  async saveEdit(id: any) {
    const index = this.supervisorData.findIndex(item => item.id === id);
    if (this.editCache[id].data.attendanceObj.id) {
      await this.appService.updateAttendance({
        id: this.editCache[id].data.attendanceObj.id,
        sign_in: this.editCache[id].data.attendanceObj.sign_in,
        sign_out: this.editCache[id].data.attendanceObj.sign_out,
        hours_worked: this.editCache[id].data.attendanceObj.hours_worked,
        approved_hours: this.editCache[id].data.attendanceObj.approved_hours,
        amount: this.editCache[id].data.attendanceObj.approved_hours,
      } as Attendance);
    } else {
      await this.appService.createAttendance({
        sign_in: this.editCache[id].data.attendanceObj.sign_in,
        sign_out: this.editCache[id].data.attendanceObj.sign_out,
        hours_worked: this.editCache[id].data.attendanceObj.hours_worked,
        approved_hours: this.editCache[id].data.attendanceObj.approved_hours,
        amount: this.editCache[id].data.attendanceObj.approved_hours,
      } as Attendance);
    }
    this.editCache[id].edit = false;
    Object.assign(this.supervisorData[index], this.editCache[id].data);
    this.getCurrentUserAttance();
  }

  updateEditCache(): void {
    this.supervisorData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
