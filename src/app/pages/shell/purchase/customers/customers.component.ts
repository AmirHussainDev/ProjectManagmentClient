import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from './customers.interface';
import { AppService } from '../../../../services/app.service';
import { SubOrganization } from '../../../../services/app.interfact';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit, OnDestroy {
  currentOrganizationId =0;
  listOfColumn = [
    {
      title: 'Name',
      compare: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Contact No',
      compare: (a: Customer, b: Customer) => a.contact_no - b.contact_no,
      priority: 2
    },
    {
      title: 'Address',
      compare: (a: Customer, b: Customer) => a.address - b.address,
      priority: 3
    },
    {
      title: 'Account No',
      compare: (a: Customer, b: Customer) => a.account_no - b.account_no,
      priority: 3
    },
    {
      title: 'Action',
      compare: (a: Customer, b: Customer) => a.account_no - b.account_no,
      priority: 3
    }
  ];
  listOfData: Customer[] = [
  ];

  visible = false;
  subOrgSubscription:Subscription;
  constructor( private appService: AppService) {

  }

  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
   
    this.populateCustomerData();
      }});
  }

  ngOnDestroy(): void {
    this.subOrgSubscription?this.subOrgSubscription.unsubscribe():null;
  }


  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateCustomerData();
    }
  }

  async populateCustomerData() {
    this.listOfData = await this.appService.getOrganizationCustomers(),
    this.updateEditCache();
  }

  editCache: { [key: string]: { edit: boolean; data: Customer } } = {};
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  async saveEdit(id: string) {
    const index = this.listOfData.findIndex(item => item.id === id);
    await this.appService.updateCustomer({
      id,
      contact_no: this.editCache[id].data.contact_no,
      address: this.editCache[id].data.address,
      account_no: this.editCache[id].data.account_no,
      name: this.editCache[id].data.name
    });
    this.editCache[id].edit = false;
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.populateCustomerData();
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
