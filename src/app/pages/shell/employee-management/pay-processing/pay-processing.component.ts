import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { Employee } from '../../../../services/app.interfact';
import { EmployeeManagementService } from '../employee-management.service';
import { AppPermissions } from '../../../../services/app.constants';

@Component({
  selector: 'app-pay-processing',
  templateUrl: './pay-processing.component.html',
  styleUrl: './pay-processing.component.css'
})
export class PayProcessingComponent implements OnInit, OnDestroy {
  selectedEmployee: { paymentObject: any, employee: Employee , worklog:any[]};
  paymentData: { paymentObject: any, employee: Employee , worklog:any[]}[]
  currentOrganizationId: number;
  constructor(
    private appService: AppService,
    private employeeManagementService: EmployeeManagementService
  ) { }
  isMobile=this.appService.isMobile
  appPermissions=AppPermissions;
  clientSubscription: Subscription;
  activeHourlyRateHistory: boolean;
  activeAdvanceHistory: boolean;
  today: Date = new Date();
  amountPayment = 0;
  advanceAmount = 0;
  paymentDescription = '';
  advancePayment = true;
  disablePayment = false;
  payments:any[]=[];
  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe((change) => {

      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.setEmployeePayments(change.id);
        this.currentOrganizationId =change.id
      }
    });

  }

  ngOnDestroy(): void {
    this.clientSubscription ? this.clientSubscription.unsubscribe : null;
  }

  async setEmployeePayments(clientId: number) {
    this.paymentData = await this.appService.getEmployeePaymentsDetail(clientId)
  }


  visible = false;

  open(employee: { paymentObject: any, employee: Employee,worklog:any[] }): void {
    this.selectedEmployee = employee;
    this.visible = true;
    this.activeHourlyRateHistory = false;
    this.activeAdvanceHistory = false;
    this.amountPayment = 0;

    this.advanceAmount = 0;
    this.disablePayment = false
  }

  close(): void {
    this.visible = false;
  }
  

  async createPayment() {
    const object = {
      payment_type: 'salary',
      employee: this.selectedEmployee.employee.id,
      payment_description: this.paymentDescription,
      amount: this.amountPayment,
      balance: (this.selectedEmployee.paymentObject.balance + this.selectedEmployee.paymentObject.totalAmount - this.amountPayment)
    }
    await this.appService.createPayment(object)
    this.visible=false;
    this.paymentData = await this.appService.getEmployeePaymentsDetail()
  }

  async getEmployeePayments(event:boolean) {
    if(event){
      this.payments=[]
      this.payments= await this.appService.getPayments(this.selectedEmployee.employee.id);
   
    }
  }
}
