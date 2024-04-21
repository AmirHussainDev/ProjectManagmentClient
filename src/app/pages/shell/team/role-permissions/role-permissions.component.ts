import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Role, RoleCreateObj } from '../../../../services/app.interfact';
import { AppService } from '../../../../services/app.service';
import { DefaultPermissions, PermissionName, AppPermissions } from '../../../../services/app.constants';

@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.css'
})
export class RolePermissionsComponent implements OnInit {
  isModalVisible = false;
  addRoleForm: FormGroup;
  roles: Role[];
  defuaultpermissions = DefaultPermissions;

  permissionNames = PermissionName;
  appPermissions = AppPermissions;

  rolePermissions: any = {};
  constructor(private fb: FormBuilder, private appService: AppService) {
    this.addRoleForm = this.fb.group({
      role_name: ['', [Validators.required]],
      organization_id: [localStorage.getItem('organization_id')],
      role_permissions: [DefaultPermissions]
    })
  }
  ngOnInit(): void {
    this.getAndSetRolesPermission()
  }
  async getAndSetRolesPermission() {
    this.roles = await this.appService.getRolesAndPermissions();
    this.updateEditCache();
  }
  handleCancel() { this.isModalVisible = false; }
  showModal() {
    this.isModalVisible = true;
  }
  async handleOk() {
    await this.appService.createRole(this.addRoleForm.value as RoleCreateObj)
    this.isModalVisible = false;
    this.getAndSetRolesPermission();
  }

  editCache: { [key: string]: { edit: boolean; data: Role } } = {};

  startEdit(id: any): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: any): void {
    const index = this.roles.findIndex(item => item.id.toString() === id);
    this.editCache[id] = {
      data: { ...this.roles[index] },
      edit: false
    };
  }

  async saveEdit(id: any) {
    const index = this.roles.findIndex(item => item.id.toString() === id);
    await this.appService.updateRole({
      id,
      role_permissions: this.editCache[id].data.role_permissions,
      role_name: this.editCache[id].data.role_name,
    });
    this.editCache[id].edit = false;
    Object.assign(this.roles[index], this.editCache[id].data);
  }

  updateEditCache(): void {
    this.roles.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

}
