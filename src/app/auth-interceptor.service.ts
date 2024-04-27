import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from your authentication service
    const accessToken = localStorage.getItem('token')?.toString();

    // Clone the request and add the Bearer token to the headers
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass on the cloned request instead of the original request
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Handle successful response
          // console.log('Successful Response:', event);
        }
      }, (error) => {
        // Handle error response
        switch (error.status) {
          case 401:
            this.userService.logout()
            break;
          case 500:
            break;
          case 600:
            break;
        }

        console.error('Error Response:', error);
      })


    );
  }
}
