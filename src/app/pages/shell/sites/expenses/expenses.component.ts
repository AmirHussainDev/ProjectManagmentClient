import { Component, Input, OnInit } from '@angular/core';
import { Expense, ExpenseForm, SubOrganization } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  addExpenseForm: FormGroup<ExpenseForm>;
  vendorItems: any[] = [];
  @Input() site_id:number;

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
      compare: (a: Expense, b: Expense) => (a.is_paid ? 1 : 0) - (b.is_paid ? 1 : 0),
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
  isVisible = false;
  isOkLoading = false;

  ExpenseRoles: any[];
  users: any[];
  subOrganizations: SubOrganization[];
  constructor(
    private appService: AppService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.addExpenseForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      is_general: new FormControl(),
      quantity: new FormControl(),
      amount: new FormControl(),
      refered_by: new FormControl(),
      purchase_id: new FormControl(),
      is_paid: new FormControl(),
      site: new FormControl(),
      organization: new FormControl(),
      subOrganization: new FormControl(),
      createdBy: new FormControl(),
    }) as FormGroup<ExpenseForm>
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
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
    this.users= await this.userService.getOrganizationUsers();
    this.ExpenseRoles = await this.appService.getRoles();
    this.subOrganizations = await this.appService.getSubOrganizations();
    this.vendorItems = await this.appService.getInventoryBySiteId(this.site_id)
    this.ExpenseRoles = this.ExpenseRoles.map(role => ({ key: role.role_name, value: role.id }))
    this.subOrganizations = this.subOrganizations.map(sub => ({ ...sub, key: sub.name as string, value: sub.id as number })) as SubOrganization[]
    // this.mapExpenseData();
    this.updateEditCache();
  }

  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.vendorItems.some(pro => !value || pro.name === value.trim())) {
      this.vendorItems = [...this.vendorItems, { name: input.value }];
    }
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
