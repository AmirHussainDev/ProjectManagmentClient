import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from '../shared-components/change-password/change-password.component';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HasPermissionDirective } from '../../../directives/permissions.directive';
import { PdfGeneratorService } from '../../../services/pdf-generator.service';
import { SelectModalControlComponent } from '../components/select-modal-control/select-modal-control.component';
import { UserHasPermissionDirective } from '../../../directives/filterUserBasedOnPermission.directive';
import { ExportSheetService } from '../../../services/export-sheet.service';
import { AngularEditorModule } from '@kylepairish/angular-editor';



@NgModule({
  declarations: [ChangePasswordComponent,
    HasPermissionDirective,
    UserHasPermissionDirective,
    SelectModalControlComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ],
  providers:[
    PdfGeneratorService,
    ExportSheetService
  ],
  exports:[ChangePasswordComponent,HasPermissionDirective,UserHasPermissionDirective,SelectModalControlComponent],

})
export class SharedModule { }
