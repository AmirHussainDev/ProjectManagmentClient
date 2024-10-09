import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  ContractPayment, Client } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-contractor-payments',
  templateUrl: './contractor-payments.component.html',
  styleUrl: './contractor-payments.component.css'
})
export class ContractorPaymentsComponent implements OnInit {
  @Input() site_id: number;
  total=0;
  listOfColumn :any[] = [
    {
      title: 'Contractor',
      compare: (a: ContractPayment, b: ContractPayment) => a.contractor - b.contractor,
      priority: 1,
      with:'30%'
    },
    {
      title: 'Title',
      compare: (a: ContractPayment, b: ContractPayment) => a.title.localeCompare(b.title),
      priority: 2,
      with:'30%'
    },
    {
      title: 'Amount',
      compare: (a: ContractPayment, b: ContractPayment) => a.amount - b.amount,
      priority: 2,
      with:'20%'
    },
    {
      title: '+Work-Payment',
      compare: (a: ContractPayment, b: ContractPayment) => a.amount - b.amount,
      priority: 3,
      with:'20%'
    }
  ];
  listOfData: ContractPayment[] = [
  ];

  visible = false;
  constructor(
    private appService: AppService,) {
  }


  ngOnInit(): void {
    this.populateContractPaymentData();
  }



  open(id: number): void {
    this.visible = true;
  }


  async populateContractPaymentData() {
    this.listOfData = await this.appService.retrieveContractPaymentsBySiteId(this.site_id)
    this.total = this.listOfData.reduce((sum, payment) => {
      return sum + (parseInt(payment.amount.toString(), 0));
    }, 0);
  }

}
