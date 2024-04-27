import { Component, Input, OnInit } from '@angular/core';
import { OwnerPayment, OwnerPaymentForm, SubOrganization } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-owner-payments',
  templateUrl: './owner-payments.component.html',
  styleUrl: './owner-payments.component.css'
})
export class OwnerPaymentsComponent implements OnInit {
  addOwnerPaymentForm: FormGroup<OwnerPaymentForm>;
  vendorItems: any[] = [];
  @Input() site_id: number;

  listOfColumn = [
    {
      title: 'Name',
      compare: (a: OwnerPayment, b: OwnerPayment) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Amount',
      compare: (a: OwnerPayment, b: OwnerPayment) => a.amount - b.amount,
      priority: 2
    },
    {
      title: 'Paid',
      compare: (a: OwnerPayment, b: OwnerPayment) => (a.is_paid ? 1 : 0) - (b.is_paid ? 1 : 0),
      priority: 2
    },
    {
      title: 'Action',
      compare: (a: OwnerPayment, b: OwnerPayment) => a.amount - b.amount,
      priority: 3
    }
  ];
  listOfData: OwnerPayment[] = [
  ];

  visible = false;
  isVisible = false;
  isOkLoading = false;

  OwnerPaymentRoles: any[];
  users: any[];
  subOrganizations: SubOrganization[];
  constructor(
    private appService: AppService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.addOwnerPaymentForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(0 , [Validators.required]),
      is_paid: new FormControl(0),
      site: new FormControl(this.site_id),
      note: new FormControl(),
    }) as FormGroup<OwnerPaymentForm>
  }


  showModal(): void {
    this.isVisible = true;
  }

  async handleOk() {
    try {
      this.isOkLoading = true;
      await this.addOwnerPayment()
      this.isVisible = false;
      this.addOwnerPaymentForm.reset()
    } catch (err) {

    } finally {
      this.isOkLoading = false;
      this.populateOwnerPaymentData();

    }
  }
  async addOwnerPayment() {
    this.subOrganizations = await this.appService.saveSiteOwnerPayment({ ...this.addOwnerPaymentForm.getRawValue(), site: this.site_id });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.populateOwnerPaymentData();
  }



  open(): void {
    this.visible = true;
  }

  close(refresh = false): void {
    this.visible = false;
    if (refresh) {
      this.populateOwnerPaymentData();
    }
  }

  async populateOwnerPaymentData() {
    this.listOfData = await this.appService.retrieveOwnerPaymentsBySiteId(this.site_id)
    this.users = await this.userService.getOrganizationUsers();
    this.OwnerPaymentRoles = await this.appService.getRoles();
    this.subOrganizations = await this.appService.getSubOrganizations();
    this.vendorItems = await this.appService.getInventoryBySiteId(this.site_id)
    this.OwnerPaymentRoles = this.OwnerPaymentRoles.map(role => ({ key: role.role_name, value: role.id }))
    this.subOrganizations = this.subOrganizations.map(sub => ({ ...sub, key: sub.name as string, value: sub.id as number })) as SubOrganization[]
    // this.mapOwnerPaymentData();
    this.updateEditCache();
  }

  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (!this.vendorItems.some(pro => !value || pro.name === value.trim())) {
      this.vendorItems = [...this.vendorItems, { name: input.value, isCustom: true }];
      input.value = ''
    }
  }

  // mapOwnerPaymentData() {
  //   console.log('OwnerPaymentRoles', this.OwnerPaymentRoles)
  //   this.listOfData = this.listOfData.map(data => {
  //     const reportToOwnerPayment = this.listOfData.find(OwnerPayment => OwnerPayment.id == data.reports_to)
  //     data.id = reportToOwnerPayment?.id || 0;
  //     data.amount = reportToOwnerPayment?.amount || 0;
  //     data.name = reportToOwnerPayment?.name || '';
  //     data.quantity = reportToOwnerPayment?.quantity || 0;
  //     data.is_general = reportToOwnerPayment?.is_general || false;
  //     data.refered_by = reportToOwnerPayment?.refered_by || 0;
  //     data.purchase_id = reportToOwnerPayment?.refered_by || 0;
  //     data.is_paid = reportToOwnerPayment?.is_paid || false;
  //     data.site = reportToOwnerPayment?.site || 0;
  //     data.organization = reportToOwnerPayment?.organization || 0;
  //     data.subOrganization = reportToOwnerPayment?.subOrganization || 0;
  //     data.created_by = reportToOwnerPayment?.created_by || 0;
  //   }
  //   )
  // }
  editCache: { [key: string]: { edit: boolean; data: OwnerPayment } } = {};
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
    // await this.appService.updateOwnerPayment({
    //   id,
    //   organization_id: this.editCache[id].data.organization_id,
    //   role_id: this.editCache[id].data.role_id,
    //   reports_to: this.editCache[id].data.reports_to,
    //   name: this.editCache[id].data.name
    // });
    this.editCache[id].edit = false;
    Object.assign(this.listOfData[index], this.editCache[id].data);
   await this.appService.updateSiteOwnerPayment(this.editCache[id].data)
    this.populateOwnerPaymentData();
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
