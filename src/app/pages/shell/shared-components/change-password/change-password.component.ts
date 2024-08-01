import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  readonly data = inject(NZ_MODAL_DATA);
updating=false;
passwordVisible=false;
autoCompletePassword='';
  constructor(private fb: FormBuilder, private modal: NzModalRef,private userService:UserService,    private notification: NzNotificationService,
    ) { }

  ngOnInit(): void {
  console.log(this.data)
    this.changePasswordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*]).+$/)
      ]],
      changePassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*]).+$/)
      ]]
    }, { validators: this.passwordsMatchValidator() });
  }
  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const changePassword = control.get('changePassword')?.value;
  
      return password && changePassword && password !== changePassword ? { passwordsMismatch: true } : null;
    };
  }
  async onSubmit() {
    try{
      if (this.changePasswordForm.valid) {
        this.updating=true;
              await this.userService.createPassword({
                id:this.data.user.id,
                password:this.changePasswordForm.getRawValue().password
              })
              this.notification.create(
                'success',
                'Password changed successfully','')
              console.log('Form Submitted', this.changePasswordForm.value);
              this.modal.close(this.changePasswordForm.value);
        
            } else {
              console.log('Form is invalid');
            }
        
    }catch(err){

    }finally{
      this.updating=false;
    }
  }

  onCancel(): void {
    this.modal.destroy();
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get changePassword() {
    return this.changePasswordForm.get('changePassword');
  }

  get passwordsMismatch() {
    return this.changePasswordForm.hasError('passwordsMismatch');
  }
}
