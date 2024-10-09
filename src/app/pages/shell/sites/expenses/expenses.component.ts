import { Component, Input, OnInit } from '@angular/core';
import { Expense, ExpenseForm, Client } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ExportSheetService } from '../../../../services/export-sheet.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  addExpenseForm: FormGroup<ExpenseForm>;
  projectItems: any[] = [];
  @Input() site_id: number;
  @Input() state: number;
  

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
      title: 'Quantity',
      compare: (a: Expense, b: Expense) => a.quantity - b.quantity,
      priority: 2
    },
    {
      title: 'Unit Price',
      compare: (a: Expense, b: Expense) => (a.unit_price || 0) - (b.unit_price || 0),
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

  total=0;
  ExpenseRoles: any[];
  users: any[];
  clients: Client[];
  displayControlColumns=[{value:'project_name',
  name:'Project Name'},
  {value:'name',
  name:'Item'}]
  constructor(
    private appService: AppService,
    private userService: UserService,
    private fb: FormBuilder,
  private exportSheetService:ExportSheetService) {
    this.addExpenseForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      is_general: new FormControl(true),
      quantity: new FormControl(0, [Validators.required]),
      amount: new FormControl({ value: 0, disabled: true }),
      refered_by: new FormControl(0),
      task_id: new FormControl(0),
      is_paid: new FormControl(0),
      site: new FormControl(this.site_id),
      note: new FormControl(),
      unit_price: new FormControl(0, [Validators.required]),
    }) as FormGroup<ExpenseForm>
  }


  showModal(): void {
    this.isVisible = true;
  }

  export(): void {
    const data = this.listOfData ;
    this.exportSheetService.exportDataToXLSX(data, 'Expenses-'+this.site_id);
  }
  async handleOk() {
    try {
      this.isOkLoading = true;
      this.isVisible = false;
      await this.addExpense()
      this.isVisible = false;
      this.addExpenseForm.reset()
    } catch (err) {

    } finally {
      this.isOkLoading = false;
      this.populateExpenseData();

    }
  }
  async addExpense() {
    this.clients = await this.appService.saveSiteExpense({ ...this.addExpenseForm.getRawValue(), site: this.site_id });
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
    this.listOfData = await this.appService.retrieveExpensesBySiteId(this.site_id)
    this.users = await this.userService.getOrganizationUsers();
    this.ExpenseRoles = await this.appService.getRoles();
    this.clients = await this.appService.getClient();
    this.projectItems = await this.appService.getInventory()
    this.ExpenseRoles = this.ExpenseRoles.map(role => ({ key: role.role_name, value: role.id }))
    this.clients = this.clients.map(sub => ({ ...sub, key: sub.name as string, value: sub.id as number })) as Client[]
    // this.mapExpenseData();
    this.updateEditCache();
    this.total = this.listOfData.reduce((sum, payment) => {
      return sum + (parseInt(payment.amount.toString(), 0));
    }, 0);
  }

  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.projectItems.some(pro => !value || pro.name === value.trim())) {
      this.projectItems = [...this.projectItems, { name: input.value, isCustom: true }];
      input.value = ''
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
  //     data.task_id = reportToExpense?.refered_by || 0;
  //     data.is_paid = reportToExpense?.is_paid || false;
  //     data.site = reportToExpense?.site || 0;
  //     data.organization = reportToExpense?.organization || 0;
  //     data.client = reportToExpense?.client || 0;
  //     data.created_by = reportToExpense?.created_by || 0;
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
   await this.appService.updateSiteExpense(this.editCache[id].data)
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

  onExpenseNameChange(event: any) {
    const selectedItem = this.projectItems.find(pro => pro.name === event.trim())
    if (selectedItem.isCustom) {
      this.addExpenseForm.controls.is_general.setValue(true)
      this.addExpenseForm.controls.is_paid.enable()
      this.addExpenseForm.controls.unit_price.enable()

      this.addExpenseForm.controls.is_paid.setValue(false)
      this.addExpenseForm.controls.quantity.setValue(0)
      this.addExpenseForm.controls.amount.setValue(0)
      this.addExpenseForm.controls.task_id?.setValue(0);
      this.addExpenseForm.controls.unit_price?.setValue(0);

    } else {
      this.addExpenseForm.controls.is_general.setValue(false)
      this.addExpenseForm.controls.is_paid.setValue(true)
      this.addExpenseForm.controls.quantity.setValue(0)
      this.addExpenseForm.controls.amount.setValue(0)
      this.addExpenseForm.controls.is_paid.disable()
      this.addExpenseForm.controls.task_id?.setValue(selectedItem.task_id);
      this.addExpenseForm.controls.unit_price?.setValue(selectedItem.unit_price);
      this.addExpenseForm.controls.unit_price.disable()

    }
  }

  onQuantityChange() {
    if (!this.addExpenseForm.controls.is_general.value) {
      const selectedItem = this.projectItems.find(pro => pro.name === this.addExpenseForm.controls.name.value)
      this.addExpenseForm.patchValue({ amount: this.addExpenseForm.controls.quantity.value * parseFloat(selectedItem.unit_price) })
    } else {
      this.onUnitPriceChange()
    }
  }

  onUnitPriceChange() {
    if (this.addExpenseForm.controls.is_general.value) {
      this.addExpenseForm.patchValue({ amount: this.addExpenseForm.controls.quantity.value * this.addExpenseForm.controls.unit_price.value })
    }
  }

  onItemQuantityChange(id: number) {
    setTimeout(()=>{
      this.editCache[id].data.amount = this.editCache[id].data.quantity * (parseFloat(this.editCache[id].data.unit_price?.toString() || '0') || 0)
    })
  }
}
