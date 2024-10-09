import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContractorPaymentForm, ContractorPayment, Client } from '../../../../../services/app.interfact';
import { AppService } from '../../../../../services/app.service';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-contract-payment',
  templateUrl: './contract-payment.component.html',
  styleUrl: './contract-payment.component.css'
})
export class ContractPaymentComponent implements OnInit {
  @Input() contractDetails: any
  addContractorPaymentForm: FormGroup<ContractorPaymentForm>;
  projectItems: any[] = [];
  @Input() site_id: number;
  date: Date;
  balance = 0;
  total = 0;
  listOfColumn = [
    {
      title: 'Note',
      compare: (a: ContractorPayment, b: ContractorPayment) => a.note.localeCompare(b.note),
      priority: false
    },
    {
      title: 'Amount',
      compare: (a: ContractorPayment, b: ContractorPayment) => a.amount - b.amount,
      priority: 2
    },
    // {
    //   title: 'Action',
    //   compare: (a: ContractorPayment, b: ContractorPayment) => a.amount - b.amount,
    //   priority: 3
    // }
  ];
  listOfData: ContractorPayment[] = [
  ];

  visible = false;
  isVisible = false;
  isOkLoading = false;

  ContractorPaymentRoles: any[];
  users: any[];
  clients: Client[];
  constructor(
    private appService: AppService,
    private userService: UserService,
    private fb: FormBuilder) {

  }


  async showModal() {
    this.setTotalAndBalance();
    this.isVisible = true;
  }

  async setTotalAndBalance() {
    const totalPaid = this.listOfData.reduce((sum, payment) => {
      return sum + (parseInt(payment.amount.toString(), 0));
    }, 0);
    const contractorPayment = await this.appService.retrieveWorkLogByTaskId(this.site_id)
    this.total = contractorPayment.reduce((sum, payment) => {
      return sum + (parseInt(payment.amount.toString(), 0));
    }, 0);
    this.balance = this.total - totalPaid;
  }

  async handleOk() {
    try {
      this.isOkLoading = true;
      await this.addContractorPayment()
      this.isVisible = false;
      this.addContractorPaymentForm.reset()
    } catch (err) {

    } finally {
      this.isOkLoading = false;
      this.populateContractorPaymentData();

    }
  }
  async addContractorPayment() {
    this.clients = await this.appService.saveSiteContractorPayment({ ...this.addContractorPaymentForm.getRawValue(), site: this.site_id });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.addContractorPaymentForm = new FormGroup({
      id: new FormControl(0),
      amount: new FormControl(0, [Validators.required]),
      note: new FormControl(),
      contract: new FormControl(this.contractDetails.id),
      site: new FormControl(this.site_id),
    }) as FormGroup<ContractorPaymentForm>

    this.populateContractorPaymentData();
  }



  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateContractorPaymentData();
    }
  }

  async populateContractorPaymentData() {
    this.listOfData = await this.appService.retrieveSiteContractPaymentBySiteId(this.site_id, this.contractDetails.id)
    this.updateEditCache();
    this.setTotalAndBalance();
  }

  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.projectItems.some(pro => !value || pro.name === value.trim())) {
      this.projectItems = [...this.projectItems, { name: input.value, isCustom: true }];
      input.value = ''
    }
  }
  // onChange(event: Date[]) {
  //   if (event && event.length > 1) {
  //     const no_of_hours = this.getNumberOfDays(event[0], event[1], this.contractDetails.includeWeekends)
  //     this.addContractorPaymentForm.patchValue({
  //       work_from: event[0], work_to: event[1],
  //       no_of_hours, amount: no_of_hours * this.contractDetails.amount_per_day
  //     });
  //   }
  // }
  getNumberOfDays(startDate: Date, endDate: Date, includeWeekends: boolean = false): number {
    // Copy the start date so we don't modify the original
    let currentDate = new Date(startDate);
    const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    let count = 0;

    for (let i = 0; i <= daysBetween; i++) {
      // Check if weekends should be included and if the current day is a weekend (Saturday or Sunday)
      if (!includeWeekends && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
        // Skip weekends
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        continue;
      }

      count++;
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return count;
  }
  editCache: { [key: string]: { edit: boolean; data: ContractorPayment } } = {};
  startEdit(id: number): void {
    this.editCache[id].edit = true;
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

    this.editCache[id].edit = false;
    Object.assign(this.listOfData[index], this.editCache[id].data);
    // await this.appService.updateSiteContractorPayment(this.editCache[id].data)
    this.populateContractorPaymentData();
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
}
