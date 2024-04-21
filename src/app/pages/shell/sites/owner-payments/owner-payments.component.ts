import { Component, OnInit } from '@angular/core';
import { Expense, SubOrganization } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-owner-payments',
  templateUrl: './owner-payments.component.html',
  styleUrl: './owner-payments.component.css'
})
export class OwnerPaymentsComponent implements  OnInit {

  listOfColumn = [
    {
      title: 'Reference By',
      compare: (a: Expense, b: Expense) => a.refered_by - b.refered_by,
      priority: 3
    },
    {
      title: 'Name',
      compare: (a: Expense, b: Expense) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Quanitity',
      compare: (a: Expense, b: Expense) => a.quantity - b.quantity,
      priority: 2
    },
    {
      title: 'Amount',
      compare: (a: Expense, b: Expense) => a.amount - b.amount,
      priority: 2
    },
    {
      title: 'Paid',
      compare: (a: Expense, b: Expense) => (a.is_paid?1: 0 )- (b.is_paid?1 : 0),
      priority: 2
    },
    {
      title: 'Action',
      compare: (a: Expense, b: Expense) => a.refered_by - b.refered_by,
      priority: 3
    }
  ];
  listOfData: Expense[] = [
  ];

  visible = false;
  ExpenseRoles: any[];
  subOrganizations: SubOrganization[];
  constructor(
    private appService: AppService) {

  }

  ngOnInit(): void {
    this.populateExpenseData();
  }



  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateExpenseData();
    }
  }

  async populateExpenseData() {
    this.listOfData = [{
      id: 1,
      name: 'Item',
      is_general: false,
      quantity: 10,
      amount: 1000,
      refered_by: 1,
      purchase_id: 36,
      is_paid: true,
      site: 11,
      organization: 1,
      subOrganization: 1,
      createdBy: 1
    },
    {
      id: 1,
      name: 'Item',
      is_general: false,
      quantity: 10,
      amount: 1000,
      refered_by: 1,
      purchase_id: 36,
      is_paid: true,
      site: 11,
      organization: 1,
      subOrganization: 1,
      createdBy: 1
    },
    {
      id: 1,
      name: 'Item',
      is_general: false,
      quantity: 10,
      amount: 1000,
      refered_by: 1,
      purchase_id: 36,
      is_paid: true,
      site: 11,
      organization: 1,
      subOrganization: 1,
      createdBy: 1
    }],
      this.ExpenseRoles = await this.appService.getRoles();
    this.subOrganizations = await this.appService.getSubOrganizations();

    this.ExpenseRoles = this.ExpenseRoles.map(role => ({ key: role.role_name, value: role.id }))
    this.subOrganizations = this.subOrganizations.map(sub => ({ ...sub, key: sub.name as string, value: sub.id as number })) as SubOrganization[]
    // this.mapExpenseData();
    this.updateEditCache();
  }

  // mapExpenseData() {
  //   console.log('ExpenseRoles', this.ExpenseRoles)
  //   this.listOfData = this.listOfData.map(data => {
  //     const reportToExpense = this.listOfData.find(Expense => Expense.id == data.reports_to)
  //     data.id = reportToExpense?.id || 0;
  //     data.amount = reportToExpense?.amount || 0;
  //     data.name = reportToExpense?.name || '';
  //     data.quantity = reportToExpense?.quantity || 0;
  //     data.is_general = reportToExpense?.is_general || false;
  //     data.refered_by = reportToExpense?.refered_by || 0;
  //     data.purchase_id = reportToExpense?.refered_by || 0;
  //     data.is_paid = reportToExpense?.is_paid || false;
  //     data.site = reportToExpense?.site || 0;
  //     data.organization = reportToExpense?.organization || 0;
  //     data.subOrganization = reportToExpense?.subOrganization || 0;
  //     data.createdBy = reportToExpense?.createdBy || 0;
  //   }
  //   )
  // }
  editCache: { [key: string]: { edit: boolean; data: Expense } } = {};
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
    // await this.appService.updateExpense({
    //   id,
    //   organization_id: this.editCache[id].data.organization_id,
    //   role_id: this.editCache[id].data.role_id,
    //   reports_to: this.editCache[id].data.reports_to,
    //   name: this.editCache[id].data.name
    // });
    this.editCache[id].edit = false;
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.populateExpenseData();
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
