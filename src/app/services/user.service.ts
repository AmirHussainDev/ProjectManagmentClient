import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserCreateObj, UserUpdateObj } from '../pages/shell/team/users/users.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubOrganization } from './app.interfact';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }
  logout() {
    localStorage.setItem('user', '{}')
    localStorage.setItem('token', '')
    this.router.navigate(['/login']);
  }

  loggedInUser: any = {}
  getUserDetails(): any {
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '{}')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
      return this.loggedInUser
    }
  }
  
  async getOrganizationUsers(): Promise<User[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${environment.apiUrl}/users/${organization_id}`).toPromise();
      return response as User[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }


  async createUser(userObj:UserCreateObj): Promise<User> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${environment.apiUrl}/users`,userObj).toPromise();
      return response as User;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }


  async updateUser(userObj:any): Promise<User> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.put(`${environment.apiUrl}/users`,userObj).toPromise();
      return response as User;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

}
