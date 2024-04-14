import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase-request/purchase.component';
import { SaleRequestComponent } from './sale-request/sale-request.component';
import { ListingComponent } from './listing.component';

const routes: Routes = [
  {
    path: '', component: ListingComponent,
    data:{name:' '}
  },
  {
    path: 'sale', component: SaleRequestComponent,
    data:{name:' '}
  },
  {
    path: 'purchase', component: PurchaseComponent,
    data:{name:' '}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule {
}
