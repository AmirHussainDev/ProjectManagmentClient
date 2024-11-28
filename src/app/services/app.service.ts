import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { Worklog, ContractDetails, Employee, EmployeePayments, Expense, Organization, OwnerPayment, TaskItem, TaskOrder, Role, RoleCreateObj, SaleOrder, Site, SiteDetails, Client } from './app.interfact';
import { UserService } from './user.service';
import { Customer, CustomerCreateObj } from '../pages/shell/task/customers/customers.interface';
import { MediaMatcher } from '@angular/cdk/layout';
interface KeyValue {
  key: string;
  value: any;
}

interface DataObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = environment.apiUrl;
  sites = new Subject<any[]>();
  currentSite = new Subject<any>();
  currentSiteId = 0;
  currentSubOrgId = 0;
  currentSubOrg: Client;
  user_permissions = [];

  currentClient = new BehaviorSubject<Client>({ id: 0, projectDescription: '', projectDuration: 0, projectBudget: 0, contact: '', organization_id: 0, name: '' });
  currentOrganization = new Subject<Organization>();
  organization: Organization;
  constructor(private http: HttpClient, private userService: UserService, private media: MediaMatcher) { }
  header: HttpHeaders = new HttpHeaders({
    'accept': 'application/json'
  });

  isMobile(): boolean {
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    const isMobile = this.media && this.media.matchMedia('(max-width: 600px)');
    return isMobile?.matches || viewHeight > viewWidth;
  }
  getAndSetProjects() {
    const organization_id = localStorage.getItem('organization_id');
    return this.http.get(`${this.apiUrl}/sites/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
  }

  setProjects(sites: any) {
    this.sites.next(sites);
  }

  setCurrentSite(site: any) {
    this.currentSite.next(site);
  }

  setClient(item: Client) {
    this.currentSubOrgId = item.id;
    this.currentSubOrg = item;
    this.currentClient.next(item);
  }
  setCurrentOrganization(item: Organization) {
    this.organization = item;
    this.currentOrganization.next(item);
  }
  getNumberOfDays(startDate: Date, endDate: Date, includeWeekends: boolean = false): number {
    // Copy the start date so we don't modify the original
    let currentDate = new Date(startDate);
    const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    let count = 0;

    for (let i = 0; i <= daysBetween; i++) {
      // Check if weekends should be included and if the current day is a weekend (Saturday or Sunday)
      if (!includeWeekends && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
        // Skip weekends
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        continue;
      }

      count++;
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return count;
  }
  async getClient(setDefault = false): Promise<Client[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/organizations/${organization_id}`).toPromise();
      const clients = response as Client[]
      if (clients && clients.length && setDefault && localStorage.getItem('selectedOrganzation')) {
        const client = clients.find((sub) => sub.id == JSON.parse(localStorage.getItem('selectedOrganzation') || '{}').id || 0)
        this.setClient(client || { id: 0, name: '', projectDescription: '', projectDuration: 0, projectBudget: 0, contact: '', organization_id: (organization_id || 0) as number })
      } else if (clients && clients.length && setDefault && localStorage.getItem('client_id')) {
        const client = clients.find((sub) => sub.id == parseInt(localStorage.getItem('client_id') || '0') || 0)
        this.setClient(client || { id: 0, name: '', projectDescription: '', projectDuration: 0, projectBudget: 0, contact: '', organization_id: (organization_id || 0) as number })
      }
      return clients;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  getCurrencies() {
    try {
      const rates = JSON.parse(localStorage.getItem('currency') || '{}');
      return rates;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching currency rates:', error);
      throw error;
    }
  }


  async createRole(userObj: RoleCreateObj): Promise<Role> {
    try {
      const response = await this.http.post(`${this.apiUrl}/role-permissions`, userObj).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async updateRole(roleObj: any): Promise<Role> {
    try {
      const response = await this.http.put(`${this.apiUrl}/role-permissions`, roleObj).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }
  async updateClient(body: any): Promise<Role> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      body = { ...body, organization_id }

      const response = await this.http.put(`${this.apiUrl}/organizations/client`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization project:', error);
      throw error;
    }
  }

  async createClient(body: any): Promise<Role> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      body = { ...body, organization_id }

      const response = await this.http.post(`${this.apiUrl}/organizations/client`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization project:', error);
      throw error;
    }
  }
  async createProject(obj: any, file: File): Promise<Role> {
    try {
      const body = new FormData();
      body.append('name', obj.name)
      body.append('contact_no', obj.contact_no)
      body.append('email', obj.email)
      body.append('address', obj.address)
      body.append('file', file)
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${this.apiUrl}/organizations/project/${organization_id}/${this.currentSubOrgId}`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization project:', error);
      throw error;
    }
  }

  async updateProject(roleObj: any, file: File): Promise<Role> {
    try {
      const body = new FormData();
      body.append('name', roleObj.name)
      body.append('description', roleObj.description)
      if (file && typeof file !== 'string') {
        body.append('file', file)
      }
      const organization_id = localStorage.getItem('organization_id');

      const response = await this.http.put(`${this.apiUrl}/organizations/project/${organization_id}/${roleObj.id}`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error updating organization project:', error);
      throw error;
    }
  }


  async getClientProjects(): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/organizations/project/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  async getProjectItems(projectId: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/organizations/project-items/${organization_id}/${projectId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async addProjectItem(projectId: any, name: string): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${this.apiUrl}/organizations/project-item/${organization_id}/${projectId}`, { name }, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  async getProjects(): Promise<Site[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as Site[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async getRolesAndPermissions(): Promise<Role[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/role-permissions/${organization_id}`, { headers: this.header }).toPromise()
      return response as Role[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async getOrganizationCustomers(): Promise<Customer[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/customers/${organization_id}/${this.currentSubOrgId}`).toPromise();
      return response as Customer[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }



  async createCustomer(userObj: CustomerCreateObj): Promise<Customer> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const body = {
        ...userObj,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/Customers`, body).toPromise();
      return response as Customer;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }


  async updateCustomer(userObj: any): Promise<Customer> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.put(`${this.apiUrl}/customers`, userObj).toPromise();
      return response as Customer;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }


  async getRoles(): Promise<Role[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/role-permissions/roles/${organization_id}`, { headers: this.header }).toPromise()
      return response as Role[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async getAndSetUserDefaultClient() {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const client_id = this.currentSubOrgId;
      const response = await this.http.get(`${this.apiUrl}/organizations/${organization_id}/${client_id}`, { headers: this.header }).toPromise()
      let client = response as Client
      if (client) {
        const selectedOrg = localStorage.getItem('selectedOrganzation')
        if (selectedOrg) {
          client = JSON.parse(selectedOrg);
        }
        this.currentClient.next(client);
        this.currentSubOrgId = client.id;

      }
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }

  }

  async addSaleRequest(po: { details: any, products: TaskItem[] }): Promise<any[]> {
    try {
      po.details = {
        ...po.details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/task/sale`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async updateSaleRequest(po: { details: TaskOrder, products: TaskItem[] }): Promise<any[]> {
    try {
      const response = await this.http.put(`${this.apiUrl}/task/sale`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async AddTask(po: { details: any }): Promise<any[]> {
    try {
      po.details = {
        ...po.details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/task`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async updateTaskRequest(po: TaskOrder): Promise<any[]> {
    try {
      const response = await this.http.put(`${this.apiUrl}/task`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async retireveTaskByState(params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/task-request-by-filter/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async retireveSaleByState(params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/sale-request-by-filter/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async retireveSaleByCustomer(customerId: string): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/sale-request-by-customer/${organization_id}/${this.currentSubOrgId}/${customerId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retireveTaskById(id: any): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/task-request-by-id/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async retireveSaleById(id: any): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/sale-request-by-id/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async getInventoryByClient(currentSubOrgId: number): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/inventory/${organization_id}/${currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async getProjectStatsByClient(currentSubOrgId: number): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/projectStats/${organization_id}/${currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as any;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async getInventory(currentOrganizationId = 0): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/inventory/${organization_id}/${currentOrganizationId || this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async getInventoryBySiteId(siteId = 0): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/inventory/${organization_id}/${this.currentSubOrgId}/${siteId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async getInventoryItemDetails(name: string): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/inventory-item-details/${organization_id}/${this.currentSubOrgId}?name=${name}`, {
        headers: this.header,

      }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  async addInventory(body: any): Promise<any[]> {
    try {
      body = {
        ...body,
        organization_id: localStorage.getItem('organization_id'),
        client_id: this.currentSubOrgId
      }
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${this.apiUrl}/task/inventory`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  findObjectDifferences(obj1: any = {}, obj2: any = {}): any {
    const diffs: any = {};

    // Iterate through properties of obj1
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        // Check if the property exists in obj2 and its value is different
        if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
          // Add the property and its value from obj1 to the differences object
          diffs[key] = obj1[key];
        }
      }
    }

    // Iterate through properties of obj2
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        // Check if the property exists in obj1 and its value is different
        if (!obj1.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
          // Add the property and its value from obj2 to the differences object
          diffs[key] = obj2[key];
        }
      }
    }

    return diffs;
  }


  areArraysDifferent(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return true;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].key !== arr2[i].key || arr1[i].value !== arr2[i].value) {
        return true;
      }
    }

    return false;
  }

  sortDataArray(dataArray: DataObject[], sortDefinition: KeyValue[]): DataObject[] {
    return dataArray.sort((a, b) => {
      for (const sort of sortDefinition) {
        const key = sort.key;
        const order = sort.value;

        let aValue = a[key];
        let bValue = b[key];

        // Convert date strings to Date objects
        if (typeof aValue === 'string' && !isNaN(Date.parse(aValue))) {
          aValue = new Date(aValue);
        }
        if (typeof bValue === 'string' && !isNaN(Date.parse(bValue))) {
          bValue = new Date(bValue);
        }

        if (order === 'ascend') {
          if (aValue > bValue) return 1;
          if (aValue < bValue) return -1;
        } else if (order === 'descend') {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
        }
      }
      return 0;
    });
  }

  async createContract(details: any): Promise<any[]> {
    try {
      const response = await this.http.post(`${this.apiUrl}/sites/contractors`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }


  async retireveContracts(site_id: number, params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/sites/contracts/${organization_id}/${this.currentSubOrgId}/${site_id}`, { headers: this.header, params }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retireveContractById(siteId: any, id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/sites/contract/${organization_id}/${siteId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateContractRequest(details: TaskOrder): Promise<any[]> {
    try {
      const response = await this.http.put(`${this.apiUrl}/sites/contract`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async createSite(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/Projects`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }



  async retireveProjects(params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/contractors/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retireveSiteById(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retireveSiteStatisticsById(id: any): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiUrl}/Projects/${id}/statistics`, { headers: this.header }).toPromise()
      return response as any;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching site statistics', error);
      throw error;
    }
  }

  async retireveAllSiteStatistics(clientId: number): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/statistics/all/${organization_id}/${clientId || this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as any;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching site statistics', error);
      throw error;
    }
  }

  async updateSiteRequest(details: SiteDetails): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.put(`${this.apiUrl}/Projects/${organization_id}/${this.currentSubOrgId}/${details.id}`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async saveSiteExpense(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/Projects/expenses`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async retrieveExpensesBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/expenses/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async updateSiteExpense(details: Expense) {
    try {
      const response = await this.http.put(`${this.apiUrl}/Projects/expenses`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }

  }

  async saveSiteOwnerPayment(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/Projects/ownerpayment`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async retrieveOwnerPaymentsBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/ownerpayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateSiteOwnerPayment(details: OwnerPayment) {
    try {
      const response = await this.http.put(`${this.apiUrl}/Projects/ownerpayment`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }

  }
  async retrieveContractorsPaymentsBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/contractorspayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retrieveContractPaymentsBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/contractorspayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  async saveSiteContractorWorkLog(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: details.userId || this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/task/taskWorklog`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async retrieveWorkLogByTaskId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/task/taskWorklog/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async saveSiteContractorPayment(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/Projects/contractpayment`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting task request', error);
      throw error;
    }
  }

  async retrieveSiteContractPaymentBySiteId(id: any, contract_id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Projects/contractpayment/${organization_id}/${this.currentSubOrgId}/${id}/${contract_id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async createEmployee(userObj: any): Promise<Role> {
    try {
      const body = {
        ...userObj,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/employee`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async getOrganizationEmployees() {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/employee/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as Employee[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async getEmployeeDetail(UserId: number, clientId: number) {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/employee/${organization_id}/${clientId}/${UserId}`, { headers: this.header }).toPromise()
      return response as Employee;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateEmployee(roleObj: any): Promise<Role> {
    try {
      const response = await this.http.put(`${this.apiUrl}/employee`, roleObj).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async getCurrentDateWorklog(userId: number): Promise<Worklog> {
    try {
      const organization_id = localStorage.getItem('organization_id');

      const response = await this.http.get(`${this.apiUrl}/employee/worklog/currentDayWorklog/${organization_id}/${this.currentSubOrgId}/${userId}`, { headers: this.header }).toPromise()
      return response as Worklog;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async getCurrentAddTaskWorklog(employeeId: number): Promise<Worklog[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/employee/worklog/currentAddTaskWorklog/${organization_id}/${this.currentSubOrgId}/${employeeId}`, { headers: this.header }).toPromise()
      return response as Worklog[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async getCurrentEmployeeSubordinates(userId: number): Promise<Employee[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/employee/currentEmployeeSubordinates/${organization_id}/${this.currentSubOrgId}/${userId}`, { headers: this.header }).toPromise()
      return response as Employee[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }


  async createWorklog(userObj: Worklog): Promise<Worklog> {
    try {
      const body = {
        ...userObj,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/employee/worklog`, body).toPromise();
      return response as Worklog;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async payAddTaskWorklogs(id: number): Promise<Worklog> {
    try {
      const organization_id = localStorage.getItem('organization_id');

      const response = await this.http.put(`${this.apiUrl}/employee/payemployee/${organization_id}/${this.currentSubOrgId}/${id}`, {}).toPromise();
      return response as Worklog;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  } async updateWorklog(roleObj: Worklog): Promise<Worklog> {
    try {
      const response = await this.http.put(`${this.apiUrl}/employee/worklog`, roleObj).toPromise();
      return response as Worklog;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }



  async getEmployeePaymentsDetail(clientId: number = 0): Promise<{ paymentObject: any, employee: Employee, worklog: any[] }[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/payments/employees/${organization_id}/${clientId || this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as { paymentObject: any, employee: Employee, worklog: any[] }[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async getClientExpenseSummary(clientId: number = 0): Promise<{
    expense: any,
  }> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http
        .get(`${this.apiUrl}/payments/client/expense/${organization_id}/${clientId || this.currentSubOrgId}`, {
          headers: this.header,
        })
        .toPromise();

      return response as {
        expense: any,
      };
    } catch (error) {
      console.error('Error fetching project budget detail:', error);
      throw error;
    }
  }
  async getClientsExpenseSummary(): Promise<[{
    expense: any,
    name: any,
    budget: any,
    currency:any,
  }]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http
        .get(`${this.apiUrl}/payments/client/expense/all/${organization_id}/0`, {
          headers: this.header,
        })
        .toPromise();

      return response as [{
        expense: any,
        name: any,
        budget: any,
        currency:any,
      }];
    } catch (error) {
      console.error('Error fetching project budget detail:', error);
      throw error;
    }
  }


  async getClientBudgetRecievingDetails(clientId: number = 0): Promise<{
    summary: any,
    details: any[],
  }> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http
        .get(`${this.apiUrl}/payments/client/${organization_id}/${clientId || this.currentSubOrgId}`, {
          headers: this.header,
        })
        .toPromise();

      return response as {
        summary: any,
        details: any[],
      };
    } catch (error) {
      console.error('Error fetching project budget detail:', error);
      throw error;
    }
  }

  async createClientPayment(userObj: any): Promise<any> {
    try {
      const orgId = parseInt(localStorage.getItem('organization_id') || '0')
      const body = {
        ...userObj,
        organization: orgId,
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/payments/client/${orgId}/${this.currentSubOrgId}`, body).toPromise();
      return response;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async createPayment(userObj: any): Promise<any> {
    try {
      const body = {
        ...userObj,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        client: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/payments`, body).toPromise();
      return response;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async getPayments(employeeId: number) {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/payments/employee/${organization_id}/${this.currentSubOrgId}/${employeeId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  convertCurrency(value: number, sourceCurrency: string, targetCurrency: string): number {
    // Retrieve the exchange rates from local storage
    const currencyRates = JSON.parse(localStorage.getItem('currency') || '{}');
  
    // Validate if the required currencies exist in the rates
    if (!currencyRates[sourceCurrency]) {
      throw new Error(`Exchange rate for source currency "${sourceCurrency}" not found.`);
    }
    if (!currencyRates[targetCurrency]) {
      throw new Error(`Exchange rate for target currency "${targetCurrency}" not found.`);
    }
  
    // Calculate the converted value
    const sourceRate = currencyRates[sourceCurrency];
    const targetRate = currencyRates[targetCurrency];
    const convertedValue = (value / sourceRate) * targetRate;
  
    // Return the converted value
    return convertedValue;
  }
}
