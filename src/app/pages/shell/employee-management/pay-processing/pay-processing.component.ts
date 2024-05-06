import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../services/app.service';
import { Employee } from '../../../../services/app.interfact';

@Component({
  selector: 'app-pay-processing',
  templateUrl: './pay-processing.component.html',
  styleUrl: './pay-processing.component.css'
})
export class PayProcessingComponent implements OnInit, OnDestroy {
  selectedEmployee:{paymentObject:any,employee:Employee};
  paymentData: {paymentObject:any,employee:Employee}[]
  constructor( private appService:AppService){}
  subOrganizationSubscription:Subscription;
  activeSalaryHistory:boolean;
  today:Date=new Date();
  ngOnInit(): void {
    this.subOrganizationSubscription = this.appService.currentSubOrganization.subscribe((change) => {

        if (change && change.id > 0) {
          this.setEmployeePayments(change.id);
        }
      })
  }

  ngOnDestroy(): void {
    this.subOrganizationSubscription? this.subOrganizationSubscription.unsubscribe:null;
  }

  async setEmployeePayments(subOrgId:number){
    this.paymentData  = await this.appService.getEmployeePaymentsDetail( subOrgId)
  }


  visible = false;

  open(employee:{paymentObject:any,employee:Employee}): void {
    this.selectedEmployee=employee;
    this.visible = true;
    this.activeSalaryHistory=false;
  }

  close(): void {
    this.visible = false;
  }
}
