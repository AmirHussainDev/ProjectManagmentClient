import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { Attendance, ContractDetails, Employee, EmployeePayments, Expense, Organization, OwnerPayment, PurchaseItem, PurchaseOrder, Role, RoleCreateObj, SaleOrder, Site, SiteDetails, SubOrganization } from './app.interfact';
import { UserService } from './user.service';
import { Customer, CustomerCreateObj } from '../pages/shell/purchase/customers/customers.interface';
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
  currentSubOrg :SubOrganization;
  user_permissions = [];

  currentSubOrganization = new BehaviorSubject<SubOrganization>({ id: 0, organization_id: 0, name: '' });
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
  getAndSetSites() {
    const organization_id = localStorage.getItem('organization_id');
    return this.http.get(`${this.apiUrl}/sites/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
  }

  setSites(sites: any) {
    this.sites.next(sites);
  }

  setCurrentSite(site: any) {
    this.currentSite.next(site);
  }

  setSubOrganization(item: SubOrganization) {
    this.currentSubOrgId = item.id;
    this.currentSubOrg=item;
    this.currentSubOrganization.next(item);
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
  async getSubOrganizations(setDefault = false): Promise<SubOrganization[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/organizations/${organization_id}`).toPromise();
      const subOrgs = response as SubOrganization[]
      if (subOrgs && subOrgs.length && setDefault && localStorage.getItem('selectedOrganzation')) {
        const subOrg = subOrgs.find((sub) => sub.id == JSON.parse(localStorage.getItem('selectedOrganzation') || '{}').id || 0)
        this.setSubOrganization(subOrg || { id: 0, name: '', organization_id: (organization_id || 0) as number })
      } else if (subOrgs && subOrgs.length && setDefault && localStorage.getItem('sub_organization_id')) {
        const subOrg = subOrgs.find((sub) => sub.id == parseInt(localStorage.getItem('sub_organization_id') || '0') || 0)
        this.setSubOrganization(subOrg || { id: 0, name: '', organization_id: (organization_id || 0) as number })
      }
      return subOrgs;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
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
  async updateSubOrganization(body: any): Promise<Role> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      body = { ...body, organization_id }

      const response = await this.http.put(`${this.apiUrl}/organizations/subOrg`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization vendor:', error);
      throw error;
    }
  }

  async createSubOrganization(body: any): Promise<Role> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      body = { ...body, organization_id }

      const response = await this.http.post(`${this.apiUrl}/organizations/subOrg`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization vendor:', error);
      throw error;
    }
  }
  async createVendor(obj: any, file: File): Promise<Role> {
    try {
      const body = new FormData();
      body.append('name', obj.name)
      body.append('contact_no', obj.contact_no)
      body.append('email', obj.email)
      body.append('address', obj.address)
      body.append('file', file)
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${this.apiUrl}/organizations/vendor/${organization_id}`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization vendor:', error);
      throw error;
    }
  }

  async updateVendor(roleObj: any, file: File): Promise<Role> {
    try {
      const body = new FormData();
      body.append('name', roleObj.name)
      body.append('contact_no', roleObj.contact_no)
      body.append('email', roleObj.email)
      body.append('address', roleObj.address)
      if (file) {
        body.append('file', file)
      }
      const organization_id = localStorage.getItem('organization_id');

      const response = await this.http.put(`${this.apiUrl}/organizations/vendor/${organization_id}/${roleObj.id}`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error updating organization vendor:', error);
      throw error;
    }
  }


  async getVendors(): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/organizations/vendor/${organization_id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  async getVendorItems(vendorId: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/organizations/vendor-items/${organization_id}/${vendorId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async addVendorItem(vendorId: any, name: string): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${this.apiUrl}/organizations/vendor-item/${organization_id}/${vendorId}`, { name }, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  async getSites(): Promise<Site[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Sites/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
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
        subOrganization: this.currentSubOrgId,
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

  async getAndSetUserDefaultSubOrganization() {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const sub_organization_id = this.currentSubOrgId;
      const response = await this.http.get(`${this.apiUrl}/organizations/${organization_id}/${sub_organization_id}`, { headers: this.header }).toPromise()
      let subOrg = response as SubOrganization
      if (subOrg) {
        const selectedOrg = localStorage.getItem('selectedOrganzation')
        if (selectedOrg) {
          subOrg = JSON.parse(selectedOrg);
        }
        this.currentSubOrganization.next(subOrg);
        this.currentSubOrgId = subOrg.id;

      }
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }

  }

  async addSaleRequest(po: { details: any, products: PurchaseItem[] }): Promise<any[]> {
    try {
      po.details = {
        ...po.details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        subOrganization: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/inventory-purchase/sale`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async updateSaleRequest(po: { details: PurchaseOrder, products: PurchaseItem[] }): Promise<any[]> {
    try {
      const response = await this.http.put(`${this.apiUrl}/inventory-purchase/sale`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async addPurchaseRequest(po: { details: any, products: PurchaseItem[] }): Promise<any[]> {
    try {
      po.details = {
        ...po.details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        subOrganization: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/inventory-purchase`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async updatePurchaseRequest(po: { details: PurchaseOrder, products: PurchaseItem[] }): Promise<any[]> {
    try {
      const response = await this.http.put(`${this.apiUrl}/inventory-purchase`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retirevePOByState(params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/purchase-request-by-filter/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
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
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/sale-request-by-filter/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
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
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/sale-request-by-customer/${organization_id}/${this.currentSubOrgId}/${customerId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retirevePOById(id: any): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/purchase-request-by-id/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/sale-request-by-id/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async getInventoryBySubOrganization(currentSubOrgId: number): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/inventory/${organization_id}/${currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async getInventoryStatsBySubOrganization(currentSubOrgId: number): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/inventoryStats/${organization_id}/${currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/inventory/${organization_id}/${currentOrganizationId || this.currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/inventory/${organization_id}/${this.currentSubOrgId}/${siteId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`${this.apiUrl}/inventory-purchase/inventory-item-details/${organization_id}/${this.currentSubOrgId}?name=${name}`, {
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
        sub_organization_id: this.currentSubOrgId
      }
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`${this.apiUrl}/inventory-purchase/inventory`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  findObjectDifferences(obj1: any={}, obj2: any={}): any {
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
      console.error('Error posting purchase request', error);
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

  async updateContractRequest(details: PurchaseOrder): Promise<any[]> {
    try {
      const response = await this.http.put(`${this.apiUrl}/sites/contract`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async createSite(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        subOrganization: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/Sites`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }



  async retireveSites(params: HttpParams): Promise<any[]> {
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
      const response = await this.http.get(`${this.apiUrl}/Sites/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retireveSiteStatisticsById(id: any): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiUrl}/Sites/${id}/statistics`, { headers: this.header }).toPromise()
      return response as any;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching site statistics', error);
      throw error;
    }
  }

  async retireveAllSiteStatistics(subOrgId: number): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Sites/statistics/all/${organization_id}/${subOrgId || this.currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.put(`${this.apiUrl}/Sites/${organization_id}/${this.currentSubOrgId}/${details.id}`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async saveSiteExpense(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        subOrganization: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/Sites/expenses`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveExpensesBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Sites/expenses/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async updateSiteExpense(details: Expense) {
    try {
      const response = await this.http.put(`${this.apiUrl}/Sites/expenses`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }

  }

  async saveSiteOwnerPayment(details: any): Promise<any[]> {
    try {
      const body = {
        ...details,
        organization: parseInt(localStorage.getItem('organization_id') || '0'),
        subOrganization: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id
      }
      const response = await this.http.post(`${this.apiUrl}/Sites/ownerpayment`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveOwnerPaymentsBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Sites/ownerpayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateSiteOwnerPayment(details: OwnerPayment) {
    try {
      const response = await this.http.put(`${this.apiUrl}/Sites/ownerpayment`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }

  }
  async retrieveContractorsPaymentsBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Sites/contractorspayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`${this.apiUrl}/Sites/contractorspayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
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
        subOrganization: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/Sites/contractworklog`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveSiteContractWorkLogBySiteId(id: any, contract_id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Sites/contractworklog/${organization_id}/${this.currentSubOrgId}/${id}/${contract_id}`, { headers: this.header }).toPromise()
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
        subOrganization: this.currentSubOrgId,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/Sites/contractpayment`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveSiteContractPaymentBySiteId(id: any, contract_id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/Sites/contractpayment/${organization_id}/${this.currentSubOrgId}/${id}/${contract_id}`, { headers: this.header }).toPromise()
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
        subOrganization: this.currentSubOrgId,
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

  async getEmployeeDetail(UserId: number, subOrgId: number) {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/employee/${organization_id}/${subOrgId}/${UserId}`, { headers: this.header }).toPromise()
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

  async getCurrentDateAttendance(userId: number): Promise<Attendance> {
    try {
      const organization_id = localStorage.getItem('organization_id');

      const response = await this.http.get(`${this.apiUrl}/employee/attendance/currentDayAttendance/${organization_id}/${this.currentSubOrgId}/${userId}`, { headers: this.header }).toPromise()
      return response as Attendance;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async getCurrentUserAttendance(employeeId: number): Promise<{ lastPayment: EmployeePayments, attendances: Attendance[] }> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/employee/attendance/currentEmployeeAttendance/${organization_id}/${this.currentSubOrgId}/${employeeId}`, { headers: this.header }).toPromise()
      return response as { lastPayment: EmployeePayments, attendances: Attendance[] };
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


  async createAttendance(userObj: Attendance): Promise<Attendance> {
    try {
      const body = {
        ...userObj,
        created_by: this.userService.loggedInUser.id,
      }
      const response = await this.http.post(`${this.apiUrl}/employee/attendance`, body).toPromise();
      return response as Attendance;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async updateAttendance(roleObj: Attendance): Promise<Attendance> {
    try {
      const response = await this.http.put(`${this.apiUrl}/employee/attendance`, roleObj).toPromise();
      return response as Attendance;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }



  async getEmployeePaymentsDetail(subOrgId: number = 0): Promise<{ paymentObject: any, employee: Employee }[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`${this.apiUrl}/payments/employees/${organization_id}/${subOrgId || this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as { paymentObject: any, employee: Employee }[];
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
        subOrganization: this.currentSubOrgId,
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
}
