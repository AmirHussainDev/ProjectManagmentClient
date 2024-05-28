import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { Employee } from '../../../../services/app.interfact';
import { MediaMatcher } from '@angular/cdk/layout';
import { EmployeeManagementService } from '../employee-management.service';
import { AppPermissions } from '../../../../services/app.constants';

@Component({
  selector: 'app-pay-processing',
  templateUrl: './pay-processing.component.html',
  styleUrl: './pay-processing.component.css'
})
export class PayProcessingComponent implements OnInit, OnDestroy {
  selectedEmployee: { paymentObject: any, employee: Employee };
  paymentData: { paymentObject: any, employee: Employee }[]
  constructor(
    private appService: AppService,
    private media: MediaMatcher,
    private employeeManagementService: EmployeeManagementService
  ) { }
  appPermissions=AppPermissions;
  subOrganizationSubscription: Subscription;
  activeSalaryHistory: boolean;
  activeAdvanceHistory: boolean;
  today: Date = new Date();
  amountPayment = 0;
  advanceAmount = 0;
  paymentNotes = '';
  advancePayment = true;
  disablePayment = false;
  payments:any[]=[];
  ngOnInit(): void {
    this.subOrganizationSubscription = this.appService.currentSubOrganization.subscribe((change) => {

      if (change && change.id > 0) {
        this.setEmployeePayments(change.id);
      }
    });

  }

  ngOnDestroy(): void {
    this.subOrganizationSubscription ? this.subOrganizationSubscription.unsubscribe : null;
  }

  async setEmployeePayments(subOrgId: number) {
    this.paymentData = await this.appService.getEmployeePaymentsDetail(subOrgId)
  }


  visible = false;

  open(employee: { paymentObject: any, employee: Employee }): void {
    this.selectedEmployee = employee;
    this.visible = true;
    this.activeSalaryHistory = false;
    this.activeAdvanceHistory = false;
    this.amountPayment = 0;

    this.advanceAmount = 0;
    this.disablePayment = this.selectedEmployee?.paymentObject.minDateCreated && this.employeeManagementService.isDateInLastOrCurrentMonth(this.selectedEmployee?.paymentObject.minDateCreated)
  }

  close(): void {
    this.visible = false;
  }
  isMobile(): boolean {
    const isMobile = this.media.matchMedia('(max-width: 600px)');
    return isMobile.matches;
  }

  async createPayment() {
    const object = {
      payment_type: 'salary',
      employee: this.selectedEmployee.employee.id,
      payment_notes: this.paymentNotes,
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
