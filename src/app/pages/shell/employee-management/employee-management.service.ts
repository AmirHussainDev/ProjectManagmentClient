import { Injectable } from '@angular/core';
import { Employee } from '../../../services/app.interfact';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  constructor() { }

  calculateHourlyRate(salary: number, date: Date, workingHours: number, isSalaryHourly = true): number {
    if (!isSalaryHourly) {
      const year = date.getFullYear();
      const month = date.getMonth();
      // Get the number of days in the provided month
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
      // Find the number of working days in the provided month, excluding Sundays
      let workingDays = 0;
      for (let day = 1; day <= lastDayOfMonth; day++) {
        const currentDate = new Date(year, month, day);
        if (currentDate.getDay() !== 0) { // Check if it's not a Sunday (0 is Sunday)
          workingDays++;
        }
      }
      // Calculate hourly rate
      const workingHoursPerDay = workingHours; // Assuming 8 hours of work per day
      const hourlyRate = salary / (workingDays * workingHoursPerDay);
      return hourlyRate;
    } else {
      const workingHoursPerDay = workingHours; // Assuming 8 hours of work per day
      const hourlyRate = salary * workingHoursPerDay;
      return hourlyRate;
    }
  }

  isDateInLastOrCurrentMonth(date: Date): boolean {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const targetMonth = date.getMonth();
    const targetYear = date.getFullYear();

    // Check if the date is in the last month or the current month
    if (
      (currentYear === targetYear && currentMonth === targetMonth) || // Current month
      (currentYear === targetYear && currentMonth - 1 === targetMonth) || // Last month
      (currentYear - 1 === targetYear && currentMonth === 0 && targetMonth === 11) // Last month of last year
    ) {
      return true;
    } else {
      return false;
    }
  }

  getDifferenceInHours(date1: Date, date2: Date): number {
    // Get the time components of the dates
    const time1 = new Date(date1).getHours() * 3600 + new Date(date1).getMinutes() * 60 + new Date(date1).getSeconds();
    const time2 = new Date(date2).getHours() * 3600 + new Date(date2).getMinutes() * 60 + new Date(date2).getSeconds();

    // Calculate the difference in seconds
    const diffInSeconds = Math.abs(time2 - time1);

    // Convert seconds to hours
    const hours = diffInSeconds / 3600;

    return isNaN(hours) ? 0 : hours;
  }

  calculateWorkingHours(employee: Employee, hoursWorked: number): number {
    const overtime = employee.overtime;
    const signInOutRequired = employee.siginout_required;
    const workingHours = employee.workingHours;

    if (overtime) {
      return hoursWorked;
    } else if (!signInOutRequired) {
      return hoursWorked == 0 ? 0 : (workingHours);
    } else {
      return hoursWorked > workingHours ? (workingHours || 8) : hoursWorked;
    }
  }


}
