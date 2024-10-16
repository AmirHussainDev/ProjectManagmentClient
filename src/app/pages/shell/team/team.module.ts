import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRoutingModule } from './team-routing.module';
import { UsersComponent } from './users/users.component';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { CreateUserDrawerComponent } from './create-user-drawer/create-user-drawer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../../auth-interceptor.service';
import { SharedModule } from '../shared/shared.module';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])




@NgModule({
  declarations: [
    UsersComponent,
    CreateUserDrawerComponent,
    RolePermissionsComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ], providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ]
})
export class TeamModule { }
