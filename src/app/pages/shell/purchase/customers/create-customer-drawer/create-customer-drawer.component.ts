import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { Customer, CustomerCreateObj } from '../customers.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleObj, SubOrganization } from '../../../../../services/app.interfact';
import { AppService } from '../../../../../services/app.service';

@Component({
  selector: 'app-create-customer-drawer',
  templateUrl: './create-customer-drawer.component.html',
  styleUrl: './create-customer-drawer.component.css'
})
export class CreateCustomerDrawerComponent implements OnInit {
  @Input() visible = false;
  @Input() customers: Customer[] = [];
  @Output() closeDrawer = new EventEmitter<boolean>();
  customerForm: FormGroup;
  constructor(
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      account_no: [0, [Validators.required]],
      contact_no: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  close(): void {
    this.closeDrawer.emit(false);
  }

  async addCustomer() {
    console.log(this.customerForm);
    await this.appService.createCustomer(this.customerForm.value as CustomerCreateObj)
    this.closeDrawer.emit(true);
  }
  objectKeys(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key: key, value: obj[key] }));
  }
}
