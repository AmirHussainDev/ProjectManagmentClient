import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { UserService } from '../services/user.service';
import { AppPermissions } from '../services/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private userService:UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      if(this.userService.loggedInUser.is_admin){
        return true;
      }
      const requiredPermission = route.data['permission'];
      if (requiredPermission && !this.userService.hasPermission(requiredPermission)) {
        // Redirect to not authorized page
        if(requiredPermission==AppPermissions.MainDashboardView){
          this.router.navigate(['/employee']);

        }else{
          this.router.navigate(['/']);

        }
        return false;
      }
      return true;
      return true;
    } else {
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
  }
}
