import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase-request/purchase.component';
import { SaleRequestComponent } from './sale-request/sale-request.component';
import { ListingComponent } from './listing.component';
import { SaleListingComponent } from './sale-listing/sale-listing.component';
import { CustomersComponent } from './customers/customers.component';
import { AppPermissions } from '../../../services/app.constants';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: { name: ' ' },
    children: [
      {
        path: '', component: ListingComponent,
        data: { name: ' ' , permission:AppPermissions.InventoryUpdates},
        canActivate:[AuthGuard],
        children:[
          {
            path: 'purchase', component: PurchaseComponent,
            data: { name: ' ' , permission:AppPermissions.AddPurchaseRequest},
            canActivate:[AuthGuard]
          },
        ]
      },
      {
        path: 'sales', component: SaleListingComponent,
        data: { name: ' ' , permission:AppPermissions.ManageSales},
        canActivate:[AuthGuard],
        children: [{
          path: 'sale', component: SaleRequestComponent,
          data: { name: ' ' , permission:AppPermissions.AddSales},
          canActivate:[AuthGuard]
        }]
      },
      {
        path: 'sale', component: SaleRequestComponent,
        data: { name: ' ' }
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
export class PurchaseRoutingModule {
}
