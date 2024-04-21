import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesComponent } from './sites.component';
import { SitesRoutingModule } from './sites-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../../auth-interceptor.service';
import { SiteComponent } from './site/site.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { OwnerPaymentsComponent } from './owner-payments/owner-payments.component';
import { ContractorPaymentsComponent } from './contractor-payments/contractor-payments.component';
import { SiteContractorsComponent } from './site-contractors/site-contractors.component';
import { CreateContractComponent } from './create-contract/create-contract.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])




@NgModule({
  declarations: [
    SitesComponent,
    SiteComponent,
    ExpensesComponent,
    OwnerPaymentsComponent,
    ContractorPaymentsComponent,
    SiteContractorsComponent,
    CreateContractComponent,
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ], providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: NZ_ICONS, useValue: icons },
  ]
})
export class SitesModule { }
