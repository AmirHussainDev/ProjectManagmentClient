import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management.component';
import { EmployeeContractComponent } from './employee-contract/employee-contract.component';
import { WorklogComponent } from './worklog/worklog.component';
import { PayProcessingComponent } from './pay-processing/pay-processing.component';
import { AppPermissions } from '../../../services/app.constants';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: EmployeeManagementComponent,
    data: { name: 'All Employee' },
  },
  {
    path: 'pay-processing', component: PayProcessingComponent,
    data: { name: 'Payment' , permission:AppPermissions.AddUpdatePayments},
    canActivate:[AuthGuard]
  },
  {
    path: ':employeeId', component: EmployeeContractComponent,
    data: { name: 'Employee' }
    },
  {
    path: ':userId/worklog', component: WorklogComponent,
    data: { name: 'Worklog' }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule {
}
