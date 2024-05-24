import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from '../shared-components/change-password/change-password.component';
import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[ChangePasswordComponent]
})
export class SharedModule { }
