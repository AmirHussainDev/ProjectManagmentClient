import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { ContractDetails, PurchaseItem, PurchaseOrder, Role, RoleCreateObj, SaleOrder, Site, SiteDetails, SubOrganization } from './app.interfact';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  apiUrl = environment.apiUrl;
  sites = new Subject<any[]>();
  currentSite = new Subject<any>();
  currentSiteId = 0;
  currentSubOrgId = 0;
  currentSubOrganization = new BehaviorSubject<SubOrganization>({ id: 0, organization_id: 0, name: '' });
  constructor(private http: HttpClient,private userService:UserService) { }
  header: HttpHeaders = new HttpHeaders({
    'accept': 'application/json'
  });

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

  async getSubOrganizations(setDefault = false): Promise<SubOrganization[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/organizations/${organization_id}`).toPromise();
      const subOrgs = response as SubOrganization[]
      if (subOrgs && subOrgs.length && setDefault && localStorage.getItem('sub_organization_id')) {
        const subOrg = subOrgs.find((sub) => sub.id == (localStorage.getItem('sub_organization_id') || 0))
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
      const sub_organization_id = localStorage.getItem('sub_organization_id');
      const response = await this.http.get(`/api/organizations/${organization_id}/${sub_organization_id}`, { headers: this.header }).toPromise()
      const subOrg = response as SubOrganization
      this.currentSubOrganization.next(subOrg);
      this.currentSubOrgId = subOrg.id;
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }

  }

  async addSaleRequest(po: { details: SaleOrder, products: PurchaseItem[] }): Promise<any[]> {
    try {
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

  async addPurchaseRequest(po: { details: PurchaseOrder, products: PurchaseItem[] }): Promise<any[]> {
    try {
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
  async retirevePOById(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/inventory-purchase/purchase-request-by-id/${organization_id}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async retireveSaleById(id: any): Promise<any[]> {
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/inventory-purchase/sale-request-by-id/${organization_id}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }
  async getInventoryBySubOrganization(currentSubOrgId:number): Promise<any[]> {
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
  async getInventory(currentOrganizationId=0): Promise<any[]> {
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
      const response = await this.http.post(`/api/contractors`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }


  async retireveContracts(params: HttpParams): Promise<any[]> {
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

  async retireveContractById(id:any): Promise<any[]>{
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.get(`/api/contractors/contract/${organization_id}/${id}`, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      // Handle error appropriately, such as logging or throwing
      console.error('Error fetching roles', error);
      throw error;
    }
  }

  async updateContractRequest(details: PurchaseOrder): Promise<any[]>{
    try {
      const response = await this.http.put(`/api/contractors/contract`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

  async createSite(details: any): Promise<any[]> {
    try {
      const body={...details,
        organization : parseInt(localStorage.getItem('organization_id')||'0'),
        subOrganization:this.currentSubOrgId,
        created_by:this.userService.loggedInUser.id
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

  async retireveSiteById(id:any): Promise<any[]>{
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

  async updateSiteRequest(details: SiteDetails): Promise<any[]>{
    try {
      const organization_id = localStorage.getItem('organization_id');
      const response = await this.http.put(`/api/Sites/${organization_id}/${this.currentSubOrgId}/${details.id}`, details, { headers: this.header }).toPromise()
      return response as any[];
    } catch (error) {
      console.error('Error posting purchase request', error);
      throw error;
    }
  }

}
