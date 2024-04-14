import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  organization_id = 0;
  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  constructor(private fb: NonNullableFormBuilder, private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.organization_id = parseInt(localStorage.getItem('organization_id') || '');
    }
  }
  async submitForm() {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const saltOrRounds = 20;
      const password = this.validateForm.value.password || '';
      const username = this.validateForm.value.username || '';
      this.http.post<any>(`/api/auth/login`,
        {
          organization_id: this.organization_id,
          username,
          password
        }
      ).toPromise().then((data: any) => {
        if (isPlatformBrowser(this.platformId) && data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('sub_organization_id', JSON.stringify(data.user.sub_organization_id));
          this.router.navigate(['/']);
        }
      });;
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
