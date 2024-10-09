import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task-request/task.component';
import { TaskRoutingModule } from './task-routing.module';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { NgxPrintModule } from 'ngx-print';
import { SaleRequestComponent } from './sale-request/sale-request.component';
import { ListingComponent } from './listing.component';
import { BoardComponent } from './board/board.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerDrawerComponent } from './customers/create-customer-drawer/create-customer-drawer.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkLogComponent } from './work-log/work-log.component';
import { ReportComponent } from './report/report.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    ListingComponent,
    TaskComponent,
    SaleRequestComponent,
    BoardComponent,
    CustomersComponent,
    CreateCustomerDrawerComponent,
    WorkLogComponent,
    ReportComponent
  ],
  imports: [
    TaskRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NgxPrintModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    HighchartsChartModule
  ], providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: NZ_ICONS, useValue: icons }]
  
})
export class TaskModule { }
