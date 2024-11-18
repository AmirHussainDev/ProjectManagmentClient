import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task-request/task.component';
import { SaleRequestComponent } from './sale-request/sale-request.component';
import { ListingComponent } from './listing.component';
import { BoardComponent } from './board/board.component';
import { CustomersComponent } from './customers/customers.component';
import { AppPermissions } from '../../../services/app.constants';
import { AuthGuard } from '../../../guards/auth.guard';
import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    data: { name: ' ' },
    children: [
      {
        path: 'list', component: ListingComponent,
        data: { name: ' ' , permission:AppPermissions.ViewTasks},
        canActivate:[AuthGuard],
        children:[
          {
            path: 'task', component: TaskComponent,
            data: { name: ' ' , permission:AppPermissions.ViewTasks},
            canActivate:[AuthGuard],
            canDeactivate: [CanDeactivateGuard],
          },
        ]
      },
      {
        path: 'board', component: BoardComponent,
        data: { name: ' ' , permission:AppPermissions.ViewProjectBoard},
        canActivate:[AuthGuard],
        children: [{
          path: 'task', component: TaskComponent,
          data: { name: ' ' , permission:AppPermissions.ViewTasks},
          canActivate:[AuthGuard],
          canDeactivate: [CanDeactivateGuard],
        },]
      },{
        path: 'report', component: ReportComponent,
        data: { name: ' ' , permission:AppPermissions.ViewProjectBoard},
        canActivate:[AuthGuard],
        children: [{
          path: 'task', component: TaskComponent,
          data: { name: ' ' , permission:AppPermissions.AddUpdateTask},
          canActivate:[AuthGuard],
          canDeactivate: [CanDeactivateGuard],
        },]
      },
      {
        path: 'sale', component: SaleRequestComponent,
        data: { name: ' ' },
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'customers', component: CustomersComponent,
        data: { name: ' ' }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {
}
