import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { AmmountRecievedForm, Client, Employee } from '../../../../services/app.interfact';
import { EmployeeManagementService } from '../employee-management.service';
import { AppPermissions } from '../../../../services/app.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay-processing',
  templateUrl: './pay-processing.component.html',
  styleUrl: './pay-processing.component.css'
})
export class PayProcessingComponent implements OnInit, OnDestroy {
  selectedEmployee: { paymentObject: any, employee: Employee, worklog: any[] };
  paymentData: { paymentObject: any, employee: Employee, worklog: any[] }[]
  currentClientId: number;
  isOkLoading: boolean;
  totalAmount: number;
  totalPaid: number;
  totalBalance: number;
  latestDate: string | null;
  addingAmountRecieved: boolean;
  constructor(
    private appService: AppService,
    private employeeManagementService: EmployeeManagementService
  ) { }
  isMobile = this.appService.isMobile
  appPermissions = AppPermissions;
  clientSubscription: Subscription;
  activeHourlyRateHistory: boolean;
  activeAdvanceHistory: boolean;
  today: Date = new Date();
  amountPayment = 0;
  advanceAmount = 0;
  paymentDescription = '';
  advancePayment = true;
  disablePayment = false;
  payments: any[] = [];
  budegetExpanded = false;
  employeeExpanded = false;
  showAddAmountRecieved = false;
  addAmmountRecievedForm: FormGroup<AmmountRecievedForm>;
  currentClinet: Client;

  projectBudgetSummary = {
    budget: 1000,
    budgetPKR: 1000,
    expense: 7000,
    profit: 3000
  }
  projectBudgetDetail = {
    summary: {
      budget: '10000',
      recieved: '7000',
      recieving_date: new Date(),
      balance: '3000'
    },
    details: [{
      recieved: '2000',
      recieving_date: new Date(),
    },
    {
      recieved: '3000',
      recieving_date: new Date(),
    },
    {
      recieved: '2000',
      recieving_date: new Date(),
    }]

  }
  addAmmountRecievedModal(amountRecieved = true, employee?: { paymentObject: any, employee: Employee, worklog: any[] }) {
    this.showAddAmountRecieved = true;
    if (this.addAmmountRecievedForm.touched && this.addAmmountRecievedForm.pristine) {
      this.addAmmountRecievedForm.reset();
    }
    this.addingAmountRecieved = amountRecieved;
    if (!amountRecieved && employee) {
      this.selectedEmployee = employee;
    }
  }
closeModal(){
  this.showAddAmountRecieved=false;
  this.isOkLoading = false;
  this.addingAmountRecieved=false;

}
  async handleRecieveAmountOk() {
    try {
      this.isOkLoading = true;
      if (this.addingAmountRecieved) {
        await this.addAmmountRecieved()
      
      } else {
         this.amountPayment=this.addAmmountRecievedForm.value.amount;
         this.paymentDescription=this.addAmmountRecievedForm.value.note;
       
        await this.createPayment()
      } 
      this.showAddAmountRecieved = false;
      this.addAmmountRecievedForm.reset()
    } catch (err) {

    } finally {
      this.showAddAmountRecieved = false;
      this.isOkLoading = false;
    }
  }
  async addAmmountRecieved() {
    await this.appService.createClientPayment(this.addAmmountRecievedForm.value)
  }

  async getAmmountRecievedDetails() {
    const response = await this.appService.getClientBudgetRecievingDetails()
    if (response) {
      response.summary.budget = this.currentClinet.projectBudget
      response.summary.balance = this.currentClinet.projectBudget - response.summary.recieved
      this.projectBudgetDetail = response;
    }
  }

  async getExpenseSummary() {
    const response = await this.appService.getClientExpenseSummary()
    if (response) {
      const totalPKR = this.appService.convertCurrency(this.currentClinet.projectBudget || 0, this.currentClinet.currency || 'PKR', 'PKR')
      this.projectBudgetSummary.expense = response.expense || 0;
      this.projectBudgetSummary.budgetPKR = totalPKR
      this.projectBudgetSummary.budget = this.currentClinet.projectBudget || 0;
      this.projectBudgetSummary.profit = (totalPKR || 0 - response.expense || 0);
    }
  }


  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe((change) => {

      if (change && change.id > 0 && this.currentClientId != change.id) {
        this.setEmployeePayments(change.id);
        this.currentClientId = change.id;
        this.currentClinet = change;
        this.getAmmountRecievedDetails();
        this.getExpenseSummary();
      }
    });
    this.addAmmountRecievedForm = new FormGroup({
      id: new FormControl(0),
      amount: new FormControl(0, [Validators.required]),
      recieving_date: new FormControl(new Date(), [Validators.required]),
      note: new FormControl(),
    }) as FormGroup<AmmountRecievedForm>

  }

  ngOnDestroy(): void {
    this.clientSubscription ? this.clientSubscription.unsubscribe : null;
  }

  async setEmployeePayments(clientId: number) {
    this.paymentData = await this.appService.getEmployeePaymentsDetail(clientId)
    this.calculateTotals()
  }

  calculateTotals() {
    this.totalAmount = 0;
    this.totalPaid = 0;
    this.totalBalance = 0;

    let latestTimestamp = 0;

    this.paymentData.forEach((row) => {
      const totalAmount = Number(row.paymentObject?.totalAmount || 0);
      const totalPaid = Number(row.paymentObject?.totalPaid || 0);
      const balance = Number(row.paymentObject?.balance || 0);
      const date = row.paymentObject?.date ? new Date(row.paymentObject.date) : null;

      this.totalAmount += Number(totalAmount||0);
      this.totalPaid += Number(totalPaid);
      this.totalBalance += Number(balance);

      if (date) {
        const timestamp = date.getTime();
        if (timestamp > latestTimestamp) {
          latestTimestamp = timestamp;
        }
      }
    });

    this.latestDate = latestTimestamp
      ? new Date(latestTimestamp).toISOString()
      : null;
  }

  visible = false;

  open(employee: { paymentObject: any, employee: Employee, worklog: any[] }): void {
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
    this.visible = false;
    this.paymentData = await this.appService.getEmployeePaymentsDetail()
  }

  async getEmployeePayments(event: boolean) {
    if (event) {
      this.payments = []
      this.payments = await this.appService.getPayments(this.selectedEmployee.employee.id);

    }
  }
}
