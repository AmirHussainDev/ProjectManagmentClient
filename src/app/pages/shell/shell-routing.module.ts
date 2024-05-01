import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

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
        path: 'sites', loadChildren: () => import('./sites/sites.module').then(m => m.SitesModule),
        data: { name: 'Sites' }
      },
      {
        path: 'purchase', loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule),
        data: { name: 'Purchase' }
      },
      {
        path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule),
        data: { name: 'Vendor' }
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
