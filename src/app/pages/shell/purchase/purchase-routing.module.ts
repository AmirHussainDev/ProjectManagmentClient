import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase-request/purchase.component';
import { SaleRequestComponent } from './sale-request/sale-request.component';
import { ListingComponent } from './listing.component';
import { SaleListingComponent } from './sale-listing/sale-listing.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {
    path: '',
    data: { name: ' ' },
    children: [
      {
        path: '', component: ListingComponent,
        data: { name: ' ' },
        children:[
          {
            path: 'purchase', component: PurchaseComponent,
            data: { name: ' ' }
          },
        ]
      },
      {
        path: 'sales', component: SaleListingComponent,
        data: { name: ' ' },
        children: [{
          path: 'sale', component: SaleRequestComponent,
          data: { name: ' ' }
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
