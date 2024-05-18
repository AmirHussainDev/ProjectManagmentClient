import{D as h,Ha as y,Ka as p,Ua as m,b as d,c as l,z as g}from"./chunk-TX4IRKG2.js";import{a,b as i,g as o}from"./chunk-MON7YFGF.js";var S={production:!1,apiUrl:"/api",allowMixedContent:!0};var z=(()=>{let n=class n{constructor(e,r){this.router=e,this.http=r,this.loggedInUser={}}logout(){localStorage.setItem("user","{}"),localStorage.setItem("token",""),this.router.navigate(["/login"])}getUserDetails(){if(localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")||"{}"))return this.loggedInUser=JSON.parse(localStorage.getItem("user")||"{}"),this.loggedInUser}getOrganizationUsers(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id"),r=yield this.http.get(`/api/users/${e}`).toPromise();return this.users=r,r}catch(e){throw console.error("Error fetching organization users:",e),e}})}createUser(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.post("/api/users",e).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}updateUser(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.put("/api/users",e).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}};n.\u0275fac=function(r){return new(r||n)(h(m),h(p))},n.\u0275prov=g({token:n,factory:n.\u0275fac,providedIn:"root"});let c=n;return c})();var q=(()=>{let n=class n{constructor(e,r){this.http=e,this.userService=r,this.apiUrl=S.apiUrl,this.sites=new d,this.currentSite=new d,this.currentSiteId=0,this.currentSubOrgId=0,this.currentSubOrganization=new l({id:0,organization_id:0,name:""}),this.header=new y({accept:"application/json"})}getAndSetSites(){let e=localStorage.getItem("organization_id");return this.http.get(`/api/sites/${e}/${this.currentSubOrgId}`,{headers:this.header}).toPromise()}setSites(e){this.sites.next(e)}setCurrentSite(e){this.currentSite.next(e)}setSubOrganization(e){this.currentSubOrgId=e.id,this.currentSubOrganization.next(e)}getSubOrganizations(e=!1){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id"),s=yield this.http.get(`/api/organizations/${r}`).toPromise();if(s&&s.length&&e&&localStorage.getItem("sub_organization_id")){let u=s.find(w=>w.id==(localStorage.getItem("sub_organization_id")||0));this.setSubOrganization(u||{id:0,name:"",organization_id:r||0})}return s}catch(r){throw console.error("Error fetching organization users:",r),r}})}createRole(e){return o(this,null,function*(){try{return yield this.http.post("/api/role-permissions",e).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}updateRole(e){return o(this,null,function*(){try{return yield this.http.put("/api/role-permissions",e).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}createVendor(e,r){return o(this,null,function*(){try{let t=new FormData;t.append("name",e),t.append("file",r);let s=localStorage.getItem("organization_id");return yield this.http.post(`/api/organizations/vendor/${s}`,t).toPromise()}catch(t){throw console.error("Error creating organization vendor:",t),t}})}updateVendor(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.put(`/api/organizations/vendor/${r}/${e.id}`,e).toPromise()}catch(r){throw console.error("Error updating organization vendor:",r),r}})}getVendors(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id");return yield this.http.get(`/api/organizations/vendor/${e}`,{headers:this.header}).toPromise()}catch(e){throw console.error("Error fetching roles",e),e}})}getVendorItems(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/organizations/vendor-items/${r}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}addVendorItem(e,r){return o(this,null,function*(){try{let t=localStorage.getItem("organization_id");return yield this.http.post(`/api/organizations/vendor-item/${t}/${e}`,{name:r},{headers:this.header}).toPromise()}catch(t){throw console.error("Error fetching roles",t),t}})}getSites(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/${e}/${this.currentSubOrgId}`,{headers:this.header}).toPromise()}catch(e){throw console.error("Error fetching roles",e),e}})}getRolesAndPermissions(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id");return yield this.http.get(`/api/role-permissions/${e}`,{headers:this.header}).toPromise()}catch(e){throw console.error("Error fetching roles",e),e}})}getOrganizationCustomers(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id");return yield this.http.get(`/api/customers/${e}/${this.currentSubOrgId}`).toPromise()}catch(e){throw console.error("Error fetching organization users:",e),e}})}createCustomer(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id"),t=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:this.currentSubOrgId,created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/Customers",t).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}updateCustomer(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.put("/api/customers",e).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}getRoles(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id");return yield this.http.get(`/api/role-permissions/roles/${e}`,{headers:this.header}).toPromise()}catch(e){throw console.error("Error fetching roles",e),e}})}getAndSetUserDefaultSubOrganization(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id"),r=localStorage.getItem("sub_organization_id"),s=yield this.http.get(`/api/organizations/${e}/${r}`,{headers:this.header}).toPromise();this.currentSubOrganization.next(s),this.currentSubOrgId=s.id}catch(e){throw console.error("Error fetching roles",e),e}})}addSaleRequest(e){return o(this,null,function*(){try{return yield this.http.post("/api/inventory-purchase/sale",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}updateSaleRequest(e){return o(this,null,function*(){try{return yield this.http.put("/api/inventory-purchase/sale",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}addPurchaseRequest(e){return o(this,null,function*(){try{return yield this.http.post("/api/inventory-purchase",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}updatePurchaseRequest(e){return o(this,null,function*(){try{return yield this.http.put("/api/inventory-purchase",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retirevePOByState(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/purchase-request-by-filter/${r}/${this.currentSubOrgId}`,{headers:this.header,params:e}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}retireveSaleByState(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/sale-request-by-filter/${r}/${this.currentSubOrgId}`,{headers:this.header,params:e}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}retirevePOById(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/purchase-request-by-id/${r}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}retireveSaleById(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/sale-request-by-id/${r}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}getInventoryBySubOrganization(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/inventory/${r}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}getInventory(e=0){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/inventory/${r}/${e||this.currentSubOrgId}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}getInventoryBySiteId(e=0){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/inventory/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}getInventoryItemDetails(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/inventory-purchase/inventory-item-details/${r}/${this.currentSubOrgId}?name=${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}addInventory(e){return o(this,null,function*(){try{e=i(a({},e),{organization_id:localStorage.getItem("organization_id"),sub_organization_id:this.currentSubOrgId});let r=localStorage.getItem("organization_id");return yield this.http.post("/api/inventory-purchase/inventory",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}findObjectDifferences(e,r){let t={};for(let s in e)e.hasOwnProperty(s)&&r.hasOwnProperty(s)&&e[s]!==r[s]&&(t[s]=e[s]);for(let s in r)r.hasOwnProperty(s)&&(!e.hasOwnProperty(s)||e[s]!==r[s])&&(t[s]=r[s]);return t}createContract(e){return o(this,null,function*(){try{return yield this.http.post("/api/sites/contractors",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retireveContracts(e,r){return o(this,null,function*(){try{let t=localStorage.getItem("organization_id");return yield this.http.get(`/api/sites/contracts/${t}/${this.currentSubOrgId}/${e}`,{headers:this.header,params:r}).toPromise()}catch(t){throw console.error("Error fetching roles",t),t}})}retireveContractById(e,r){return o(this,null,function*(){try{let t=localStorage.getItem("organization_id");return yield this.http.get(`/api/sites/contract/${t}/${e}/${r}`,{headers:this.header}).toPromise()}catch(t){throw console.error("Error fetching roles",t),t}})}updateContractRequest(e){return o(this,null,function*(){try{return yield this.http.put("/api/sites/contract",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}createSite(e){return o(this,null,function*(){try{let r=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:this.currentSubOrgId,created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/Sites",r,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retireveSites(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/contractors/${r}/${this.currentSubOrgId}`,{headers:this.header,params:e}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}retireveSiteById(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}updateSiteRequest(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.put(`/api/Sites/${r}/${this.currentSubOrgId}/${e.id}`,e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}saveSiteExpense(e){return o(this,null,function*(){try{let r=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:this.currentSubOrgId,created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/Sites/expenses",r,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retrieveExpensesBySiteId(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/expenses/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}updateSiteExpense(e){return o(this,null,function*(){try{return yield this.http.put("/api/Sites/expenses",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}saveSiteOwnerPayment(e){return o(this,null,function*(){try{let r=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:this.currentSubOrgId,created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/Sites/ownerpayment",r,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retrieveOwnerPaymentsBySiteId(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/ownerpayment/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}updateSiteOwnerPayment(e){return o(this,null,function*(){try{return yield this.http.put("/api/Sites/ownerpayment",e,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retrieveContractorsPaymentsBySiteId(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/contractorspayment/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}retrieveContractPaymentsBySiteId(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/contractorspayment/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching roles",r),r}})}saveSiteContractorWorkLog(e){return o(this,null,function*(){try{let r=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:this.currentSubOrgId,created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/Sites/contractworklog",r,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retrieveSiteContractWorkLogBySiteId(e,r){return o(this,null,function*(){try{let t=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/contractworklog/${t}/${this.currentSubOrgId}/${e}/${r}`,{headers:this.header}).toPromise()}catch(t){throw console.error("Error fetching roles",t),t}})}saveSiteContractorPayment(e){return o(this,null,function*(){try{let r=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:this.currentSubOrgId,created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/Sites/contractpayment",r,{headers:this.header}).toPromise()}catch(r){throw console.error("Error posting purchase request",r),r}})}retrieveSiteContractPaymentBySiteId(e,r){return o(this,null,function*(){try{let t=localStorage.getItem("organization_id");return yield this.http.get(`/api/Sites/contractpayment/${t}/${this.currentSubOrgId}/${e}/${r}`,{headers:this.header}).toPromise()}catch(t){throw console.error("Error fetching roles",t),t}})}createEmployee(e){return o(this,null,function*(){try{let r=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:localStorage.getItem("sub_organization_id"),created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/employee",r).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}getOrganizationEmployees(){return o(this,null,function*(){try{let e=localStorage.getItem("organization_id");return yield this.http.get(`/api/employee/${e}/${this.currentSubOrgId}`,{headers:this.header}).toPromise()}catch(e){throw console.error("Error fetching roles",e),e}})}getEmployeeDetail(e,r){return o(this,null,function*(){try{let t=localStorage.getItem("organization_id");return yield this.http.get(`/api/employee/${t}/${r}/${e}`,{headers:this.header}).toPromise()}catch(t){throw console.error("Error fetching roles",t),t}})}updateEmployee(e){return o(this,null,function*(){try{return yield this.http.put("/api/employee",e).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}getCurrentDateAttendance(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/employee/attendance/currentDayAttendance/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}getCurrentUserAttendance(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/employee/attendance/currentEmployeeAttendance/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}getCurrentEmployeeSubordinates(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/employee/currentEmployeeSubordinates/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}createAttendance(e){return o(this,null,function*(){try{let r=i(a({},e),{created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/employee/attendance",r).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}updateAttendance(e){return o(this,null,function*(){try{return yield this.http.put("/api/employee/attendance",e).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}getEmployeePaymentsDetail(e=0){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/payments/employees/${r}/${e||this.currentSubOrgId}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}createPayment(e){return o(this,null,function*(){try{let r=i(a({},e),{organization:parseInt(localStorage.getItem("organization_id")||"0"),subOrganization:localStorage.getItem("sub_organization_id"),created_by:this.userService.loggedInUser.id});return yield this.http.post("/api/payments",r).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}getPayments(e){return o(this,null,function*(){try{let r=localStorage.getItem("organization_id");return yield this.http.get(`/api/payments/employee/${r}/${this.currentSubOrgId}/${e}`,{headers:this.header}).toPromise()}catch(r){throw console.error("Error fetching organization users:",r),r}})}};n.\u0275fac=function(r){return new(r||n)(h(p),h(z))},n.\u0275prov=g({token:n,factory:n.\u0275fac,providedIn:"root"});let c=n;return c})();export{S as a,z as b,q as c};
