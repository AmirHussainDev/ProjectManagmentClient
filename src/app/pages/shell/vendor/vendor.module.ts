import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { VendorRoutingModule } from '../vendor/vendor-routing.module';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])



@NgModule({
  declarations: [
    VendorComponent,
    VendorDetailsComponent,
    VendorAddComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ], providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: NZ_ICONS, useValue: icons }]
})
export class VendorModule { }
