import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeManagementComponent } from './employee-management.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { PayProcessingComponent } from './pay-processing/pay-processing.component';
import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { UsernamePipe } from '../../../pipes/username.pipe';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { EmployeeContractComponent } from './employee-contract/employee-contract.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])





@NgModule({
  declarations: [
    EmployeeManagementComponent,
    AttendanceComponent,
    PayProcessingComponent,
    EmployeeContractComponent
    
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    UsernamePipe
],
  imports: [
    EmployeeManagementRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    UsernamePipe
  ]
})
export class EmployeeManagementModule { }
