import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { Attendance, ContractDetails, Employee, EmployeePayments, Expense, Organization, OwnerPayment, PurchaseItem, PurchaseOrder, Role, RoleCreateObj, SaleOrder, Site, SiteDetails, SubOrganization } from './app.interfact';
import { UserService } from './user.service';
import { Customer, CustomerCreateObj } from '../pages/shell/purchase/customers/customers.interface';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = environment.apiUrl;
  sites = new Subject<any[]>();
  currentSite = new Subject<any>();
  currentSiteId = 0;
  currentSubOrgId = 0;
  user_permissions=[];
  
  currentSubOrganization = new BehaviorSubject<SubOrganization>({ id: 0, organization_id: 0, name: '' });
  currentOrganization = new Subject<Organization>();
  organization: Organization;
  constructor(private http: HttpClient, private userService: UserService,    private media: MediaMatcher   ) { }
  header: HttpHeaders = new HttpHeaders({
    'accept': 'application/json'
  });
  isMobile(): boolean {
    const viewWidth = window.innerWidth;
  const viewHeight = window.innerHeight;

    const isMobile = this.media.matchMedia('(max-width: 600px)');
    return isMobile.matches || viewHeight>viewWidth;
  }
  getAndSetSites() {
    const organization_id = localStorage.getItem('organization_id');
    return this.http.get(`/api/sites/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
  }

  setSites(sites: any) {
    this.sites.next(sites);
  }

  setCurrentSite(site: any) {
    this.currentSite.next(site);
  }

  setSubOrganization(item: SubOrganization) {
    this.currentSubOrgId = item.id;
    this.currentSubOrganization.next(item);
  }
  setCurrentOrganization(item: Organization) {
    this.organization = item;
    this.currentOrganization.next(item);
  }
  
  async getSubOrganizations(setDefault = false): Promise<SubOrganization[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/organizations/${organization_id}`).toPromise();
      const subOrgs = response as SubOrganization[]
      if (subOrgs && subOrgs.length && setDefault && localStorage.getItem('selectedOrganzation')) {
        const subOrg = subOrgs.find((sub) => sub.id == JSON.parse(localStorage.getItem('selectedOrganzation')||'{}').id || 0)
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
      const response = await this.http.post(`/api/role-permissions`, userObj).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async updateRole(roleObj: any): Promise<Role> {
    try {
      const response = await this.http.put(`/api/role-permissions`, roleObj).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }
  async createSubOrganization(body:any): Promise<Role> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      body={...body,organization_id }

      const response = await this.http.post(`/api/organizations/subOrg`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization vendor:', error);
      throw error;
    }
  }
  async createVendor(name: string, file: File): Promise<Role> {
    try {
      const body = new FormData();
      body.append('name', name)
      body.append('file', file)
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.post(`/api/organizations/vendor/${organization_id}`, body).toPromise();
      return response as Role;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error creating organization vendor:', error);
      throw error;
    }
  }

  async updateVendor(roleObj: any): Promise<Role> {
    try {
      const organization_id = localStorage.getItem('organization_id');

      const response = await this.http.put(`/api/organizations/vendor/${organization_id}/${roleObj.id}`, roleObj).toPromise();
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
      const response = await this.http.get(`/api/organizations/vendor/${organization_id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/organizations/vendor-items/${organization_id}/${vendorId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/organizations/vendor-item/${organization_id}/${vendorId}`, { name }, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/Sites/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/role-permissions/${organization_id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/customers/${organization_id}/${this.currentSubOrgId}`).toPromise();
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
      const response = await this.http.post(`/api/Customers`, body).toPromise();
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
      const response = await this.http.put(`/api/customers`, userObj).toPromise();
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
      const response = await this.http.get(`/api/role-permissions/roles/${organization_id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/organizations/${organization_id}/${sub_organization_id}`, { headers: this.header }).toPromise()
      let subOrg = response as SubOrganization
     const selectedOrg=localStorage.getItem('selectedOrganzation')
     if(selectedOrg){
      subOrg= JSON.parse(selectedOrg);
     }
     this.currentSubOrganization.next(subOrg);
     this.currentSubOrgId = subOrg.id;
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
      const response = await this.http.post(`/api/inventory-purchase/sale`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async updateSaleRequest(po: { details: PurchaseOrder, products: PurchaseItem[] }): Promise<any[]> {
    try {
      const response = await this.http.put(`/api/inventory-purchase/sale`, po, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/inventory-purchase`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async updatePurchaseRequest(po: { details: PurchaseOrder, products: PurchaseItem[] }): Promise<any[]> {
    try {
      const response = await this.http.put(`/api/inventory-purchase`, po, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retirevePOByState(params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/inventory-purchase/purchase-request-by-filter/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/sale-request-by-filter/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/sale-request-by-customer/${organization_id}/${this.currentSubOrgId}/${customerId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/purchase-request-by-id/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response ;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async retireveSaleById(id: any): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/inventory-purchase/sale-request-by-id/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/inventory/${organization_id}/${currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/inventoryStats/${organization_id}/${currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/inventory/${organization_id}/${currentOrganizationId || this.currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/inventory/${organization_id}/${this.currentSubOrgId}/${siteId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/inventory-purchase/inventory-item-details/${organization_id}/${this.currentSubOrgId}?name=${name}`, {
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
      const response = await this.http.post(`/api/inventory-purchase/inventory`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }


  findObjectDifferences(obj1: any, obj2: any): any {
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

  async createContract(details: any): Promise<any[]> {
    try {
      const response = await this.http.post(`/api/sites/contractors`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }


  async retireveContracts(site_id: number, params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/sites/contracts/${organization_id}/${this.currentSubOrgId}/${site_id}`, { headers: this.header, params }).toPromise()
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
      const response = await this.http.get(`/api/sites/contract/${organization_id}/${siteId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateContractRequest(details: PurchaseOrder): Promise<any[]> {
    try {
      const response = await this.http.put(`/api/sites/contract`, details, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/Sites`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }



  async retireveSites(params: HttpParams): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/contractors/${organization_id}/${this.currentSubOrgId}`, { headers: this.header, params }).toPromise()
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
      const response = await this.http.get(`/api/Sites/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async retireveSiteStatisticsById(id: any): Promise<any> {
    try {
      const response = await this.http.get(`/api/Sites/${id}/statistics`, { headers: this.header }).toPromise()
      return response as any;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching site statistics', error);
      throw error;
    }
  }

  async retireveAllSiteStatistics(subOrgId:number): Promise<any> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/Sites/statistics/all/${organization_id}/${subOrgId||this.currentSubOrgId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.put(`/api/Sites/${organization_id}/${this.currentSubOrgId}/${details.id}`, details, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/Sites/expenses`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveExpensesBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/Sites/expenses/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async updateSiteExpense(details: Expense) {
    try {
      const response = await this.http.put(`/api/Sites/expenses`, details, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/Sites/ownerpayment`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveOwnerPaymentsBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/Sites/ownerpayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateSiteOwnerPayment(details: OwnerPayment) {
    try {
      const response = await this.http.put(`/api/Sites/ownerpayment`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }

  }
  async retrieveContractorsPaymentsBySiteId(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/Sites/contractorspayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/Sites/contractorspayment/${organization_id}/${this.currentSubOrgId}/${id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/Sites/contractworklog`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveSiteContractWorkLogBySiteId(id: any, contract_id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/Sites/contractworklog/${organization_id}/${this.currentSubOrgId}/${id}/${contract_id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/Sites/contractpayment`, body, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async retrieveSiteContractPaymentBySiteId(id: any, contract_id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/Sites/contractpayment/${organization_id}/${this.currentSubOrgId}/${id}/${contract_id}`, { headers: this.header }).toPromise()
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
      const response = await this.http.post(`/api/employee`, body).toPromise();
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
      const response = await this.http.get(`/api/employee/${organization_id}/${this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response as Employee[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async getEmployeeDetail(UserId: number,subOrgId:number) {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/employee/${organization_id}/${subOrgId}/${UserId}`, { headers: this.header }).toPromise()
      return response as Employee;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateEmployee(roleObj: any): Promise<Role> {
    try {
      const response = await this.http.put(`/api/employee`, roleObj).toPromise();
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

      const response = await this.http.get(`/api/employee/attendance/currentDayAttendance/${organization_id}/${this.currentSubOrgId}/${userId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/employee/attendance/currentEmployeeAttendance/${organization_id}/${this.currentSubOrgId}/${employeeId}`, { headers: this.header }).toPromise()
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
      const response = await this.http.get(`/api/employee/currentEmployeeSubordinates/${organization_id}/${this.currentSubOrgId}/${userId}`, { headers: this.header }).toPromise()
      return response  as Employee[];
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
      const response = await this.http.post(`/api/employee/attendance`, body).toPromise();
      return response as Attendance;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  async updateAttendance(roleObj: Attendance): Promise<Attendance> {
    try {
      const response = await this.http.put(`/api/employee/attendance`, roleObj).toPromise();
      return response as Attendance;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

  

  async getEmployeePaymentsDetail(subOrgId: number=0): Promise<{paymentObject:any,employee:Employee}[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/payments/employees/${organization_id}/${subOrgId|| this.currentSubOrgId}`, { headers: this.header }).toPromise()
      return response  as {paymentObject:any,employee:Employee}[];
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
      const response = await this.http.post(`/api/payments`, body).toPromise();
      return response ;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }

 async getPayments(employeeId:number){
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/payments/employee/${organization_id}/${this.currentSubOrgId}/${employeeId}`, { headers: this.header }).toPromise()
      return response  as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching organization users:', error);
      throw error;
    }
  }
}
