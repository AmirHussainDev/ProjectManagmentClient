import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from '../shared-components/change-password/change-password.component';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HasPermissionDirective } from '../../../directives/permissions.directive';
import { PdfGeneratorService } from '../../../services/pdf-generator.service';
import { SelectModalControlComponent } from '../components/select-modal-control/select-modal-control.component';



@NgModule({
  declarations: [ChangePasswordComponent,
    HasPermissionDirective,
    SelectModalControlComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    PdfGeneratorService,
  ],
  exports:[ChangePasswordComponent,HasPermissionDirective,SelectModalControlComponent],

})
export class SharedModule { }
