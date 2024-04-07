import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { InventoryManagementComponent } from './inventory-management.component';



@NgModule({
  declarations: [InventoryManagementComponent],
  imports: [
    InventoryManagementRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NgxPrintModule,
    FormsModule
  ]
})
export class InventoryManagementModule { }
