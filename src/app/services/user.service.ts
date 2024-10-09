import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserCreateObj, UserUpdateObj } from '../pages/shell/team/users/users.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Client } from './app.interfact';
import { AppService } from './app.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[]
  loggedInUser: any = {}
  appurl=  environment.apiUrl
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '{}')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }
  logout() {
    localStorage.setItem('user', '{}')
    localStorage.setItem('token', '')
    localStorage.setItem('token', '')
    localStorage.removeItem('selectedOrganzation')
    localStorage.removeItem('client_id')
    localStorage.setItem('redirectUrl',this.router.url)
    this.router.navigate(['/login']);
  }

  getUserDetails(): any {
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '{}')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
      return this.loggedInUser
    }
  }

  async getOrganizationUsers(): Promise<User[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.appurl}/users/${organization_id}`).toPromise();
      this.users = response as User[];
      return response as User[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async createPassword(userObj:any): Promise<User> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.put(`${this.appurl}/users/password`, {...userObj,organization_id}).toPromise();
      return response as User;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async createUser(userObj: UserCreateObj): Promise<User> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${this.appurl}/users`, userObj).toPromise();
      return response as User;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }


  async updateUser(userObj: any,userId:number): Promise<User> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.put(`${this.appurl}/users`, {...userObj,id:userId}).toPromise();
      return response as User;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  hasPermission(permission: string): boolean {
    return this.loggedInUser && this.loggedInUser.role_permissions&& this.loggedInUser.role_permissions[permission];
  }

  userHasPermission(permission: string, user:any): boolean {
    return user && user.role && user.role.role_permissions&& user.role.role_permissions[permission];
  }

}
