import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { ProjectRoutingModule } from '../project/project-routing.module';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { SharedModule } from '../shared/shared.module';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectAddComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ], providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: NZ_ICONS, useValue: icons }]
})
export class ProjectModule { }
