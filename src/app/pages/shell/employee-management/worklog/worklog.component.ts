import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Worklog, Employee, EmployeePayments } from '../../../../services/app.interfact';
import { Subscription } from 'rxjs';
import { EmployeeManagementService } from '../employee-management.service';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrl: './worklog.component.css'
})
export class WorklogComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  supervisorUsers: any[] = []; // List of users belonging to supervisor
  signInTime: Date;
  signOutTime: Date;
  employee: Employee;
  currentUserId: number;
  currentDateWorklogIndex = 0;
  clientSubscription: Subscription;
  latitude: number;
  longitude: number;
  currentOrganizationId: number;
  isVisible = false;
  constructor(
    private route: ActivatedRoute,

    private router: Router,
    private appService: AppService,
    private employeeManagementService: EmployeeManagementService
  ) { }

  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe((change) => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.currentOrganizationId = change.id
        this.route.paramMap.subscribe(paramMap => {
          // Use this queryParams object to load data
          if (change && change.id > 0 && paramMap.get('userId')) {
            this.currentUserId = parseInt(paramMap.get('userId') || '0')
            this.setCurrentUserDetails(change.id);
          }
        })
      }
    })

    this.sunscribeToGeoLocation();
  }

  handleOk() {
    this.isVisible = false;
    // window.location.reload()
  }
  sunscribeToGeoLocation() {
    setTimeout(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.longitude = position.coords.longitude
            this.latitude = position.coords.latitude
          },
          (error) => {
            console.error(`Error occurred: ${error.message}`);
            this.isVisible = true;
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            }
            this.router.navigate(['employee']);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        this.router.navigate(['employee'])
      }
    }, 2000)
  }

  async setCurrentUserDetails(clientId: number) {
    this.employee = await this.appService.getEmployeeDetail(this.currentUserId, clientId)
    if (this.employee && this.employee.id) {
      this.getCurrentDayWorklog(this.employee.id);
    }
    this.fetchSupervisorUsers();
  }

  async getCurrentDayWorklog(userId: number) {
    const response: Worklog = await this.appService.getCurrentDateWorklog(userId)
    this.processCurentDayWorklog(response)
  }
  processCurentDayWorklog(response: Worklog) {
    if (response) {
      this.currentDateWorklogIndex = response.id

      if (response.sign_in) {
        this.signInTime = new Date(response.sign_in)
      }

      if (response.sign_out) {
        this.signOutTime = new Date(response.sign_out)
      }
    } else {
      this.currentDateWorklogIndex = 0
    }
  }

  async signIn() {
    const response: Worklog = await this.appService.createWorklog({
      employee: this.employee.id,
      sign_in: new Date(),
      sign_in_corrd: this.latitude + ',' + this.longitude
    } as any)
    this.processCurentDayWorklog(response)
  }

  async signOut() {

    const hours_worked = Math.round(this.employeeManagementService.getDifferenceInHours(this.signInTime, new Date()))
    const salaryPerHour = this.employeeManagementService.calculateHourlyRate(
      this.employee.salary,
      new Date(),
      8,true
    )
    const amount = (salaryPerHour * this.employeeManagementService.calculateWorkingHours(this.employee, hours_worked));
    const response: Worklog = await this.appService.updateWorklog({
      id: this.currentDateWorklogIndex,
      sign_out: new Date(),
      sign_out_corrd: this.latitude + ',' + this.longitude,
      hours_worked,
      amount
    } as any)
    this.processCurentDayWorklog(response)
  }



  async fetchSupervisorUsers() {
    this.supervisorUsers = [
    ];
    if (this.employee && this.employee.id) {
      this.supervisorUsers.push({ employee: this.employee, isSupervisor: false },)
    }
    const subordinates: Employee[] = await this.appService.getCurrentEmployeeSubordinates(this.currentUserId)

    if (subordinates && subordinates.length) {
      this.supervisorUsers = [...this.supervisorUsers,
      ...subordinates.map((employee) => ({ employee, isSupervisor: true }))
      ]
    }
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
  ngOnDestroy() {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
  }
}

