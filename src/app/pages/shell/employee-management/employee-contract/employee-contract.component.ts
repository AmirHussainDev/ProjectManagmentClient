import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeForm, RoleObj, Client } from '../../../../services/app.interfact';
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
  @Input() clients: Client[] = [];
  @Input() editableItem: any = {};
  @Input() isNew: boolean = true;
  @Output() closeDrawer = new EventEmitter<boolean>();
  employeeForm: FormGroup<EmployeeForm>;
  constructor(
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      id: [0, []],
      employee: [0, [Validators.required]],
      position: ['', [Validators.required]],
      isHourlyRateHourly: [false],
      salary: [0, [Validators.required]],
      // overtime: [false],
      // siginout_required: [false],
      organization: [parseInt(localStorage.getItem('organization_id') || '0')],
      client: [this.appService.currentSubOrgId],
      // supervisor: [0, [Validators.required]],
      details: ['', [Validators.required]],
      // workingHours: [8, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.isNew) {
      this.employeeForm.reset();
    } {
      this.employeeForm = this.fb.group({
        id: [this.editableItem.id],
        employee: [this.editableItem.employee, [Validators.required]],
        position: [this.editableItem.position, [Validators.required]],
        isHourlyRateHourly: [this.editableItem.isHourlyRateHourly],
        salary: [this.editableItem.salary, [Validators.required]],
        // overtime: [this.editableItem.overtime],
        // siginout_required: [this.editableItem.siginout_required],
        organization: [parseInt(localStorage.getItem('organization_id') || '0')],
        client: [this.editableItem.client],
        // supervisor: [this.editableItem.supervisor, [Validators.required]],
        details: [this.editableItem.details, [Validators.required]],
        // workingHours: [this.editableItem.workingHours, [Validators.required]]
      });
    }
  }
  close(): void {
    this.closeDrawer.emit(false);
  }

  async addUser() {
    console.log(this.employeeForm);
    this.isNew ?
      await this.appService.createEmployee(
        {
        position: this.employeeForm.value.position,
        employee: this.employeeForm.value.employee,
        // supervisor: this.employeeForm.value.supervisor,
        salary: this.employeeForm.value.salary,
        // overtime: this.employeeForm.value.overtime,
        isHourlyRateHourly: this.employeeForm.value.isHourlyRateHourly,
        // workingHours: this.employeeForm.value.workingHours,
        // siginout_required: this.employeeForm.value.siginout_required,
        details: this.employeeForm.value.details,
      } as any) :
      await this.appService.updateEmployee({
        id: this.editableItem.id,
        position: this.employeeForm.value.position,
        employee: this.employeeForm.value.employee,
        // supervisor: this.employeeForm.value.supervisor,
        salary: this.employeeForm.value.salary,
        // overtime: this.employeeForm.value.overtime,
        isHourlyRateHourly: this.employeeForm.value.isHourlyRateHourly,
        // workingHours: this.employeeForm.value.workingHours,
        // siginout_required: this.employeeForm.value.siginout_required,
        details: this.employeeForm.value.details,
      });
    this.closeDrawer.emit(true);
  }
  objectKeys(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key: key, value: obj[key] }));
  }
}
