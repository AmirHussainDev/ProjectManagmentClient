import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  appurl=environment.apiUrl
  organization_id = 0;
  showErrorMessage = false;
  passwordVisible=false;
  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  constructor(private fb: NonNullableFormBuilder,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private appService: AppService) {
    if (isPlatformBrowser(this.platformId)) {
      this.organization_id = parseInt(localStorage.getItem('organization_id') || '');
    }
  }
  async submitForm() {
    this.showErrorMessage = false;
    try {
      if (this.validateForm.valid) {

        console.log('submit', this.validateForm.value);
        const saltOrRounds = 20;
        const password = this.validateForm.value.password || '';
        const username = this.validateForm.value.username || '';
        const data: any = await this.http.post<any>(`${this.appurl}/auth/login`,
          {
            organization_id: this.organization_id,
            username,
            password
          }
        ).toPromise()
        if (isPlatformBrowser(this.platformId) && data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('permissions', JSON.stringify(data.user.role_permissions));
          localStorage.setItem('client_id', JSON.stringify(data.user.client_id));
          const lastUrl=localStorage.getItem('redirectUrl')
          this.router.navigateByUrl(lastUrl&&lastUrl?.indexOf('login')==-1?lastUrl:'/');
        }

      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
            this.showErrorMessage = true;
          }
        });
      }

    } catch (err) {
      this.showErrorMessage = true;
    }
  }

}
