import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { AmmountRecievedForm, Client, Employee } from '../../../../services/app.interfact';
import { EmployeeManagementService } from '../employee-management.service';
import { AppPermissions } from '../../../../services/app.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.css'
})
export class PaymentSummaryComponent implements OnInit, OnDestroy {
  selectedEmployee: { paymentObject: any, employee: Employee, worklog: any[] };
  paymentData: { paymentObject: any, employee: Employee, worklog: any[] }[]
  currentClientId: number;
  isOkLoading: boolean;
  totalBudgetPKR: number;
  totalExpense: number;
  totalProfit: number;
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

  projectBudgetSummary = [{
    client:'Client',
    currency:'PKR',
    budgetPKR:0,
    budget: 1000,
    expense: 7000,
    profit: 3000
  }]
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
  addAmmountRecievedModal() {
    this.showAddAmountRecieved = true;
    if (this.addAmmountRecievedForm.touched && this.addAmmountRecievedForm.pristine) {
      this.addAmmountRecievedForm.reset();

    }
  }

  async handleRecieveAmountOk() {
    try {
      this.isOkLoading = true;
      await this.addAmmountRecieved()
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
    this.projectBudgetSummary=[]
    const details = await this.appService.getClientsExpenseSummary()
    if (details) {
      details.forEach(response => this.projectBudgetSummary.push({
        client:response.name,
        expense: response.expense || 0,
        currency:response.currency|| 'PKR',
        budget: response.budget || 0,
        budgetPKR: this.appService.convertCurrency(response.budget || 0,response.currency,'PKR'),
        profit: (this.currentClinet.projectBudget || 0 - response.expense || 0)
      })
      )
    }
    this.calculateTotals()
  }
  calculateTotals() {
    this.totalBudgetPKR = this.projectBudgetSummary.reduce((sum, client) => sum + Number(client.budgetPKR||0), 0);
    this.totalExpense = this.projectBudgetSummary.reduce((sum, client) => sum + Number(client.expense||0), 0);
    this.totalProfit = this.projectBudgetSummary.reduce((sum, client) => sum + Number(client.profit||0), 0);
  }


  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe((change) => {

      if (change && change.id > 0 && this.currentClientId != change.id) {
        this.setEmployeePayments(change.id);
        this.currentClientId = change.id;
        this.currentClinet = change;
        // this.getAmmountRecievedDetails();
      }
    });
    this.getExpenseSummary();

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
