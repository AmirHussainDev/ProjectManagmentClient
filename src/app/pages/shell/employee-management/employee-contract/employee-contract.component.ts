import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeForm, RoleObj, SubOrganization } from '../../../../services/app.interfact';
import { User, UserCreateObj } from '../../team/users/users.interface';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-employee-contract',
  templateUrl: './employee-contract.component.html',
  styleUrl: './employee-contract.component.css'
})
export class EmployeeContractComponent implements OnInit {
  @Input() visible = false;
  @Input() users: User[] = [];
  @Input() userRoles: RoleObj[] = [];
  @Input() subOrganizations: SubOrganization[] = [];

  @Output() closeDrawer = new EventEmitter<boolean>();
  employeeForm: FormGroup<EmployeeForm>;
  constructor(
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      employee: [0, [Validators.required]],
      position: ['', [Validators.required]],
      salary: [0, [Validators.required]],
      overtime: [false, [Validators.required]],
      siginout_required: [false, [Validators.required]],
      organization: [parseInt(localStorage.getItem('organization_id') || '0')],
      subOrganization: [0],
      supervisor: [0, [Validators.required]],
      details: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  close(): void {
    this.closeDrawer.emit(false);
  }

  async addUser() {
    console.log(this.employeeForm);
    await this.appService.createEmployee(this.employeeForm.value as UserCreateObj)
    this.closeDrawer.emit(true);
  }
  objectKeys(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key: key, value: obj[key] }));
  }
}
