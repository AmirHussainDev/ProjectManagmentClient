import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { provideRouter } from '@angular/router';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell.component';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NullToStringPipe } from '../../pipes/nullToString.pipe';
import { ShellRoutingModule } from './shell-routing.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { OrganizationSelectorComponent } from './components/organization-selector/organization-selector.component';
import { AuthInterceptor } from '../../auth-interceptor.service';
import { UsernamePipe } from '../../pipes/username.pipe';
import { EmployeeContractComponent } from './employee-management/employee-contract/employee-contract.component';
import { HasPermissionDirective } from '../../directives/permissions.directive';
import { SharedModule } from './shared/shared.module';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    ShellComponent,
    NullToStringPipe,
    BreadcrumbComponent,
    OrganizationSelectorComponent,
    HasPermissionDirective,
    ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    ShellRoutingModule,
    NgZorroAntdModule,
    SharedModule
  ],
  exports:[HasPermissionDirective],
  providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: NZ_ICONS, useValue: icons },
]
})
export class ShellModule { }
