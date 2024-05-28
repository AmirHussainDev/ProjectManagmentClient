import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase-request/purchase.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { NgxPrintModule } from 'ngx-print';
import { SaleRequestComponent } from './sale-request/sale-request.component';
import { ListingComponent } from './listing.component';
import { SaleListingComponent } from './sale-listing/sale-listing.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerDrawerComponent } from './customers/create-customer-drawer/create-customer-drawer.component';
import { SharedModule } from '../shared/shared.module';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])



@NgModule({
  declarations: [
    ListingComponent,
    PurchaseComponent,
    SaleRequestComponent,
    SaleListingComponent,
    CustomersComponent,
    CreateCustomerDrawerComponent,
  ],
  imports: [
    PurchaseRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NgxPrintModule,
    FormsModule,
    SharedModule
  ], providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: NZ_ICONS, useValue: icons }]
  
})
export class PurchaseModule { }
