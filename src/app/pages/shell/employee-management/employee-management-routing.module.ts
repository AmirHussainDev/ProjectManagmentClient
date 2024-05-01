import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management.component';
import { EmployeeContractComponent } from './employee-contract/employee-contract.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { PayProcessingComponent } from './pay-processing/pay-processing.component';

const routes: Routes = [
  {
    path: '', component: EmployeeManagementComponent,
    data: { name: 'All Employee' }
  },
  {
    path: ':employeeId', component: EmployeeContractComponent,
    data: { name: 'Employee' }
  },
  {
    path: ':userId/attendance', component: AttendanceComponent,
    data: { name: 'Attendance' }
  },

  {
    path: ':employeeId/pay-processing', component: PayProcessingComponent,
    data: { name: 'Payment' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule {
}
