import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent  implements  OnInit {
  currentDate: Date = new Date();
  supervisorData: any[] = []; // Data for supervisor's table
  supervisorUsers: any[] = []; // List of users belonging to supervisor

  constructor() { }

  ngOnInit(): void {
    // Initialize table data for supervisor
    this.initializeSupervisorTableData();

    // Fetch users belonging to supervisor
    this.fetchSupervisorUsers();
  }

  signIn(): void {
    // Implement sign-in functionality
    console.log('Signed In');
  }

  signOut(): void {
    // Implement sign-out functionality
    console.log('Signed Out');
  }

  initializeSupervisorTableData(): void {
    // Initialize table data for supervisor
    const startDate = new Date('2024-01-01'); // Example start date
    const endDate = new Date('2024-01-31'); // Example end date

    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push({ date: currentDate });
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    this.supervisorData = dates;
  }

  fetchSupervisorUsers(): void {
    // Fetch users belonging to supervisor (current user)
    // Replace this with actual API call to fetch users
    this.supervisorUsers = [
      { name: 'User 1', data: this.generateUserData() },
      { name: 'User 2', data: this.generateUserData() },
      // Add more users as needed
    ];
  }

  generateUserData(): any[] {
    // Generate dummy user data for demonstration
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push({ date: currentDate });
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return dates;
  }
}