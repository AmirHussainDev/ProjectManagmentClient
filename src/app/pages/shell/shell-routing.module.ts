import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';
import { AppPermissions } from '../../services/app.constants';

const routes: Routes = [
  {
    path: '', component: ShellComponent,
    children: [
      {
        path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { name: 'Dashboard' }
      },
      {
        path: 'team', loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
        data: { name: 'Team' }
      },
      {
        path: 'sites', loadChildren: () => import('./sites/sites.module').then(m => m.ProjectsModule),
        data: { name: 'Projects' }
      },
      {
        path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
        data: { name: 'Task' }
      },
      {
        path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
        data: { name: 'Project' }
      }
      ,
      {
        path: 'inventory', loadChildren: () => import('./inventory-management/inventory-management.module').then(m => m.InventoryManagementModule),
        data: { name: 'Inventory' }
      },
      {
        path: 'employee', loadChildren: () => import('./employee-management/employee-management.module').then(m => m.EmployeeManagementModule),
        data: { name: 'Employee' }
      }

    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {
}
