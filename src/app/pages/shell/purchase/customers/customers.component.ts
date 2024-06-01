import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from './customers.interface';
import { AppService } from '../../../../services/app.service';
import { SubOrganization } from '../../../../services/app.interfact';
import { Subscription } from 'rxjs';
import { AppPermissions, SaleStateNames, SaleStates } from '../../../../services/app.constants';
import { PdfGeneratorService } from '../../../../services/pdf-generator.service';
import { UserService } from '../../../../services/user.service';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit, OnDestroy {
  currentOrganizationId = 0;
  expandSet = new Set<number>();
  onExpandChange(index: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(index);
      this.listOfData[index].expand = true;
      if (!this.listOfData[index].details) {
        this.retireveCustomerOrders(index);
      }
    } else {
      this.expandSet.delete(index);
      this.listOfData[index].expand = false;

    }
  }
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
      compare: (a: Customer, b: Customer) => a.address.localeCompare(b.address),
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
  states=SaleStates;
  stateNames=SaleStateNames;
  visible = false;
  subOrgSubscription: Subscription;
  appPermissions = AppPermissions;
  constructor(private appService: AppService,
    private pdfGeneratorService:PdfGeneratorService,
    private userService:UserService) {

  }

  ngOnInit(): void {
    this.subOrgSubscription = this.appService.currentSubOrganization.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {

        this.populateCustomerData();
      }
    });
  }

  printCard(index:any) {
    this.makePdf('print',index)
  }
  generatePDF(index:any) {
    this.makePdf('download',index)
  }

  makePdf(action:string,index:any){
    const customer=this.listOfData[index]
    this.pdfGeneratorService.invoice={
      type:'customer',
      status:'',
      invoiceDetailLabel: 'Client/Vendor Ledger',
      personName: customer.name,
      address: customer.address||'',
      contactNo: customer.contact_no,
      terms: '',
      email: '',
      additionalDetails: ' ',
      items:(customer.details as any),
      total:0,
      items_discount_total:0,
      invoice_date: new Date(),
      created_by: this.userService.loggedInUser,
      subject:' Ledger'
    }
    this.pdfGeneratorService.generatePDF(action)
    return;

  }


  ngOnDestroy(): void {
    this.subOrgSubscription ? this.subOrgSubscription.unsubscribe() : null;
  }

  async retireveCustomerOrders(index: number) {
    this.listOfData[index].loading = true;
    const details = await this.appService.retireveSaleByCustomer(this.listOfData[index].id)
    this.listOfData[index].details = details;
    this.listOfData[index].loading = false;
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
  startEdit(id: any): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(index: any): void {
    this.editCache[index] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  async saveEdit(id: any) {
    const index = this.listOfData.findIndex(item => item.id === id);
    await this.appService.updateCustomer({
      id,
      contact_no: this.editCache[id].data.contact_no,
      address: this.editCache[id].data.address,
      account_no: this.editCache[id].data.account_no,
      name: this.editCache[id].data.name
    });
    this.editCache[index].edit = false;
    Object.assign(this.listOfData[index], this.editCache[index].data);
    this.populateCustomerData();
  }

  updateEditCache(): void {
    this.listOfData.forEach((item, index) => {
      this.editCache[index] = {
        edit: false,
        data: { ...item }
      };
    });
  }

}
