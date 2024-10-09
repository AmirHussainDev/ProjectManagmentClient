import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from './customers.interface';
import { AppService } from '../../../../services/app.service';
import { Client } from '../../../../services/app.interfact';
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
  searchVisible: boolean;
  searchValue: any;
  listOfDisplayData: any[]=[];
  onExpandChange(index: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(index);
      this.listOfDisplayData[index].expand = true;
      if (!this.listOfDisplayData[index].details) {
        this.retireveCustomerOrders(index);
      }
    } else {
      this.expandSet.delete(index);
      this.listOfDisplayData[index].expand = false;

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
      priority: 4
    },
    {
      title: 'Action',
      compare: (a: Customer, b: Customer) => a.account_no - b.account_no,
      priority: 5
    }
  ];
  listOfData: Customer[] = [
  ];
  states=SaleStates;
  stateNames=SaleStateNames;
  visible = false;
  clientSubscription: Subscription;
  appPermissions = AppPermissions;
  constructor(private appService: AppService,
    private pdfGeneratorService:PdfGeneratorService,
    private userService:UserService) {

  }

  ngOnInit(): void {
    this.clientSubscription = this.appService.currentClient.subscribe(change => {
      if (change && change.id > 0 && this.currentOrganizationId != change.id) {
        this.currentOrganizationId = change.id
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
      invoiceDetailLabel: 'Client/Project Ledger',
      personName: customer.name,
      address: customer.address||'',
      contactNo: customer.contact_no,
      date_created:new Date(),
      terms: '',
      email: '',
      additionalDetails: ' ',
      created_by: this.userService.loggedInUser,
      title:' Ledger'
    }
    this.pdfGeneratorService.generatePDF(action)
    return;

  }


  ngOnDestroy(): void {
    this.clientSubscription ? this.clientSubscription.unsubscribe() : null;
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
    this.listOfData = await this.appService.getOrganizationCustomers();
    this.listOfDisplayData= this.listOfData 
      this.updateEditCache();
  }

  editCache: { [key: string]: { edit: boolean; data: Customer } } = {};
  startEdit(id: any): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(index: any): void {
    this.editCache[index] = {
      data: { ...this.listOfDisplayData[index] },
      edit: false
    };
  }

  async saveEdit(id: any) {
    const index = this.listOfDisplayData.findIndex(item => item.id === id);
    await this.appService.updateCustomer({
      id,
      contact_no: this.editCache[id].data.contact_no,
      address: this.editCache[id].data.address,
      account_no: this.editCache[id].data.account_no,
      name: this.editCache[id].data.name
    });
    this.editCache[id].edit = false;
    Object.assign(this.listOfDisplayData[index], this.editCache[id].data);
    this.populateCustomerData();
  }

  updateEditCache(): void {
    this.listOfDisplayData.forEach((item, index) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  search(): void {
    this.searchVisible = false;
    if(this.searchValue){
      this.listOfDisplayData = this.listOfData.filter((item:any) => (item.name&&item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1));
      console.log(this.listOfDisplayData)
  
    }else{
      this.listOfDisplayData = this.listOfData
    }
  }
}
