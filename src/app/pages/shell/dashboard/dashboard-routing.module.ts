import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../../guards/auth.guard';
import { AppPermissions } from '../../../services/app.constants';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    data:{name:'Purchase Requests',permission:AppPermissions.MainDashboardView},
    canActivate:[AuthGuard]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
