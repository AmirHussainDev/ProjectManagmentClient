import{a as He}from"./chunk-NGE6N3H6.js";import{a as Ae,b as Ue,c as Be}from"./chunk-V5HHRK7K.js";import{a as se,d as ae}from"./chunk-MI2CZ2YP.js";import{$ as l,$a as T,Ba as Y,Cb as Ce,Da as $,Eb as xe,Fb as ze,Ha as G,Ib as be,Ic as je,Jb as Se,K as s,Kb as ve,L as z,Lb as ye,Mb as we,Na as K,Nb as Me,Oa as ee,Q as h,R as p,S as L,Sa as te,T as x,Ta as ne,U as j,Ua as ie,V,Va as oe,W as A,Wa as re,X as U,Y as H,Ya as E,Yb as Oe,Z as B,Zb as Pe,_ as o,_a as le,aa as g,ba as W,bb as pe,ca as q,cb as ce,da as C,db as me,ea as m,eb as I,ec as ke,fa as c,fb as ue,fc as Te,gb as de,gc as Ie,hb as _e,hc as Ve,ib as fe,ic as Ee,ja as Q,jb as ge,k as N,ka as d,kc as Fe,ma as P,mb as he,mc as De,nc as Ne,oa as Z,oc as Re,pa as X,pc as Le,q as R,qa as J,r as w,ra as u,s as M,sa as k,v as _,w as f,z as O}from"./chunk-HDWWHYKZ.js";import{a as D,g as y}from"./chunk-MON7YFGF.js";function et(e,r){if(e&1){let t=C();o(0,"nz-list-item",3),m("click",function(){let a=_(t).$implicit,S=c(2);return f(S.setSubOrganization(a))}),o(1,"nz-list-item-meta",4)(2,"nz-list-item-meta-title"),d(3),l()()()}if(e&2){let t=r.$implicit;s(3),P(" ",t.name," ")}}function tt(e,r){e&1&&g(0,"nz-list-empty")}function nt(e,r){if(e&1&&(W(0),o(1,"nz-list",2),H(2,et,4,1,"nz-list-item",5,U),h(4,tt,1,0,"nz-list-empty"),l(),q()),e&2){let t=c();s(),p("nzLoading",t.loading),s(),B(t.data),s(2),A(4,t.data.length===0?4:-1)}}var We=(()=>{let r=class r{constructor(i){this.appService=i,this.loading=!1,this.data=[],this.visible=!1,this.closeDrawer=new R}ngOnInit(){this.getAndSetSubOrganizations()}close(){this.closeDrawer.emit(!0)}getAndSetSubOrganizations(){return y(this,null,function*(){this.loading=!0,this.data=yield this.appService.getSubOrganizations(!0),this.loading=!1})}setSubOrganization(i){this.appService.setSubOrganization(i),this.closeDrawer.emit(!0)}};r.\u0275fac=function(n){return new(n||r)(z(T))},r.\u0275cmp=w({type:r,selectors:[["app-organization-selector"]],inputs:{visible:"visible"},outputs:{closeDrawer:"closeDrawer"},decls:2,vars:2,consts:[["nzPlacement","right","nzTitle","Organizations",3,"nzClosable","nzVisible","nzOnClose"],[4,"nzDrawerContent"],["nzItemLayout","horizontal",3,"nzLoading"],["nz-button","","nzType","text",3,"click"],["nzAvatar","https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png","nzDescription",""],["nz-button","","nzType","text"]],template:function(n,a){n&1&&(o(0,"nz-drawer",0),m("nzOnClose",function(){return a.close()}),h(1,nt,5,2,"ng-container",1),l()),n&2&&p("nzClosable",!1)("nzVisible",a.visible)},dependencies:[I,Pe,Oe,Re,Ne,Le,De,Fe]});let e=r;return e})();function ot(e,r){e&1&&(o(0,"span",19),d(1," VEINS "),l())}function rt(e,r){if(e&1){let t=C();o(0,"span",20),m("click",function(){_(t);let n=c();return f(n.isCollapsed=!n.isCollapsed)}),l()}if(e&2){let t=c();V(!t.isCollapsed&&t.isMobile()?"lightFont":"darkFont"),p("nzType",t.isCollapsed?"menu-unfold":"menu-fold")}}var st=()=>["/"],b=()=>({tracingId:123});function at(e,r){if(e&1){let t=C();o(0,"li",21),g(1,"span",22),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Dashboard "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.length==0),s(3),p("routerLink",u(4,st))("state",u(5,b))}}var lt=()=>["/purchase/customers"],qe=()=>["/purchase/sales"],Qe=e=>({status:e});function pt(e,r){if(e&1){let t=C();o(0,"ul",9)(1,"li",21),g(2,"span",23),o(3,"span")(4,"a",24),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(5," Customers "),l()()(),o(6,"li",21),g(7,"span",25),o(8,"span")(9,"a",26),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(10," Quotes "),l()()(),o(11,"li",21),g(12,"span",27),o(13,"span")(14,"a",26),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(15," Sale Invoices "),l()()()()}if(e&2){let t=c();s(),x("selected-route",t.currentRoutes.indexOf("customers")>-1),s(3),p("routerLink",u(11,lt)),s(2),x("selected-route",t.currentRoutes.indexOf("sales")>-1&&(t.currentRoutes.indexOf("status="+t.saleState.Quote)>-1||t.currentRoutes.join("").indexOf("SALE=")>-1)),s(3),p("routerLink",u(12,qe))("queryParams",k(13,Qe,t.saleState.Quote)),s(2),x("selected-route",t.currentRoutes.indexOf("sales")>-1&&(t.currentRoutes.indexOf("status="+t.saleState.Invoiced)>-1||t.currentRoutes.join("").indexOf("INVOICE=")>-1)),s(3),p("routerLink",u(15,qe))("queryParams",k(16,Qe,t.saleState.Invoiced))}}var ct=()=>["/purchase"];function mt(e,r){if(e&1){let t=C();o(0,"li",21),g(1,"span",28),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Purchase Invoices "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.indexOf("customers")==-1&&t.currentRoutes.indexOf("purchase")>-1&&t.currentRoutes.indexOf("sales")==-1&&t.currentRoutes.indexOf("sale")==-1&&t.currentRoutes.indexOf("sales?status="+t.saleState.Quote)==-1&&t.currentRoutes.indexOf("sales?status="+t.saleState.Invoiced)==-1),s(3),p("routerLink",u(4,ct))("state",u(5,b))}}var ut=()=>["/inventory"];function dt(e,r){if(e&1){let t=C();o(0,"li",21),g(1,"span",29),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Inventory "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.indexOf("inventory")>-1),s(3),p("routerLink",u(4,ut))("state",u(5,b))}}var _t=()=>["/vendor"];function ft(e,r){if(e&1){let t=C();o(0,"li",21),g(1,"span",30),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Vendors "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.indexOf("vendor")>-1),s(3),p("routerLink",u(4,_t))("state",u(5,b))}}var gt=()=>["/sites"];function ht(e,r){if(e&1){let t=C();o(0,"li",13),g(1,"span",31),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Sites "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.indexOf("sites")>-1),s(3),p("routerLink",u(4,gt))("state",u(5,b))}}var Ct=()=>["/employee","pay-processing"];function xt(e,r){if(e&1){let t=C();o(0,"li",13),g(1,"span",16),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Payments "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.indexOf("pay-processing")>-1),s(3),p("routerLink",u(4,Ct))("state",u(5,b))}}var zt=()=>["/team"];function bt(e,r){if(e&1){let t=C();o(0,"li",13),g(1,"span",32),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Users "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.indexOf("team")>-1&&t.currentRoutes.indexOf("roles")==-1),s(3),p("routerLink",u(4,zt))("state",u(5,b))}}var St=()=>["/team/roles"];function vt(e,r){if(e&1){let t=C();o(0,"li",13),g(1,"span",33),o(2,"span")(3,"a",15),m("click",function(){_(t);let n=c();return f(n.isMobile()?n.isCollapsed=!0:null)}),d(4," Permissions "),l()()()}if(e&2){let t=c();x("selected-route",t.currentRoutes.indexOf("team")>-1&&t.currentRoutes.indexOf("roles")>-1),s(3),p("routerLink",u(4,St))("state",u(5,b))}}function yt(e,r){e&1&&(o(0,"nz-footer"),d(1,"Veins system \xA92024 Implement By SA3"),l())}function wt(e,r){if(e&1){let t=C();o(0,"span",47),m("click",function(){_(t);let n=c(2);return f(n.isCollapsed=!n.isCollapsed)}),l()}if(e&2){let t=c(2);p("nzType",t.isCollapsed?"menu-unfold":"menu-fold")}}function Mt(e,r){if(e&1){let t=C();o(0,"nz-layout",34)(1,"nz-header")(2,"div",35)(3,"span",36),h(4,wt,1,1,"span",37),l(),o(5,"span",4)(6,"span")(7,"button",38),m("click",function(){_(t);let n=c();return f(n.toggleOrganizations())}),d(8),g(9,"span",39),l(),o(10,"app-organization-selector",40),m("closeDrawer",function(){_(t);let n=c();return f(n.toggleOrganizations())}),l()(),o(11,"button",41),g(12,"nz-avatar",42)(13,"span",39),l(),o(14,"nz-dropdown-menu",null,43)(16,"ul",44)(17,"li",45),m("click",function(){_(t);let n=c();return f(n.logout())}),d(18,"Logout "),l(),o(19,"li",45),m("click",function(){_(t);let n=c();return f(n.openChangePasswordModal())}),d(20,"Change Password"),l()()()()()(),o(21,"nz-content",46),g(22,"router-outlet"),l()()}if(e&2){let t=Q(15),i=c();s(4),p("ngIf",i.isMobile()),s(),L("width",i.isMobile()?"100%":"auto"),s(3),P(" ",i.currentSubOrganization.name," "),s(2),p("visible",i.showOrganizations),s(),p("nzDropdownMenu",t),s(),p("nzText",i.getUserInitials(i.loggedInUser.name))}}var Ot=()=>["/employee"],Pt=e=>["/employee",e,"attendance"],Ze=(()=>{let r=class r{constructor(i,n,a,S,v,Ye,$e){this.userService=i,this.appService=n,this.fb=a,this.media=S,this.router=v,this.route=Ye,this.modal=$e,this.isCollapsed=!1,this.isMobileDevice=!0,this.loggedInUser={},this.sites=[],this.site={},this.showOrganizations=!1,this.currentRoutes=[],this.saleState=ae,this.appPermissions=se,this.siteForm=this.fb.group({site:[]})}ngOnInit(){this.loggedInUser=this.userService.getUserDetails(),this.setSitesData(),this.onSiteChange(),this.extractRoutePath(this.router.url),this.router.events.pipe(N(i=>i instanceof te)).subscribe(i=>{this.currentUrl=i.url,this.extractRoutePath(this.currentUrl)})}extractRoutePath(i){i=i.replace(/(https?:\/\/[^\/]+)?\/?/,""),this.currentRoutes=i.split(/[/?]/).filter(n=>n),console.log(this.currentRoutes)}toggleOrganizations(){this.showOrganizations=!this.showOrganizations}onSiteChange(){this.siteSubscription=this.siteForm.valueChanges.subscribe(i=>{this.setCurrentSite(i.site)}),this.subOrgSubscription=this.appService.currentSubOrganization.subscribe(i=>{this.currentSubOrganization=i})}setSitesData(){return y(this,null,function*(){let i=yield this.appService.getAndSetSites(),n=i&&i.length?i.map(a=>D({label:a.name},a)):[];this.sites=[...n],this.appService.setSites(this.sites),this.siteForm.patchValue({site:this.sites[0]}),this.setCurrentSite(void 0)})}setCurrentSite(i){this.appService.setCurrentSite(i||this.sites[0])}logout(){this.userService.logout()}ngOnDestroy(){this.siteSubscription&&this.siteSubscription.unsubscribe(),this.subOrgSubscription&&this.subOrgSubscription.unsubscribe()}getUserInitials(i){return i.trim().split(" ").map(S=>S.charAt(0)).join("").toUpperCase()}isMobile(){return this.media.matchMedia("(max-width: 600px)").matches}openChangePasswordModal(){this.modal.create({nzTitle:"Change Password ("+this.userService.loggedInUser.name+")",nzContent:Ae,nzFooter:null,nzData:{user:this.userService.loggedInUser}}).afterClose.subscribe(n=>{n&&console.log("Password changed",n)})}};r.\u0275fac=function(n){return new(n||r)(z(le),z(T),z(Ce),z(_e),z(oe),z(ne),z(he))},r.\u0275cmp=w({type:r,selectors:[["app-shell"]],decls:36,vars:34,consts:[[1,"app-shell"],[2,"height","100%"],["nzCollapsible","",1,"appbackground",3,"nzCollapsed","nzTrigger","nzWidth","nzCollapsedWidth","nzCollapsedChange"],[2,"display","flow-root"],[1,"flex","center","space-between"],["src","../../../assets/veins-ico.png","alt",""],["class","heading",4,"ngIf"],["class","trigger","nz-icon","",3,"nzType","class","click",4,"ngIf"],[1,"sideMenuItems"],["nz-menu","","nzTheme","dark","nzMode","inline"],["nz-menu-item","",3,"selected-route",4,"appHasPermission"],["nz-menu","","nzTheme","dark","nzMode","inline",4,"appHasPermission"],["nz-menu-item","","style","margin-top: 12px;",3,"selected-route",4,"appHasPermission"],["nz-menu-item","",2,"margin-top","12px"],["nz-icon","","nzType","profile","size","",2,"font-size","18px"],[1,"nav-link",3,"routerLink","state","click"],["nz-icon","","nzType","schedule","size","",2,"font-size","18px"],[4,"ngIf"],["class","appbackground",4,"ngIf"],[1,"heading"],["nz-icon","",1,"trigger",3,"nzType","click"],["nz-menu-item",""],["nz-icon","","nzType","bar-chart",2,"font-size","18px"],["nz-icon","","nzType","user-switch",2,"font-size","18px"],[1,"nav-link",3,"routerLink","click"],["nz-icon","","nzType","file-text",2,"font-size","18px"],[1,"nav-link",3,"routerLink","queryParams","click"],["nz-icon","","nzType","file-done",2,"font-size","18px"],["nz-icon","","nzType","pull-request",2,"font-size","18px"],["nz-icon","","nzType","appstore",2,"font-size","18px"],["nz-icon","","nzType","profile",2,"font-size","18px"],["nz-icon","","nzType","build","size","",2,"font-size","18px"],["nz-icon","","nzType","team","size","",2,"font-size","18px"],["nz-icon","","nzType","sliders","size","",2,"font-size","18px"],[1,"appbackground"],[1,"flex","space-between","center",2,"flex-wrap","wrap"],[1,"flex","center"],["class","trigger","nz-icon","","style","font-size: 18px;",3,"nzType","click",4,"ngIf"],["nz-button","",1,"header-button",3,"click"],["nz-icon","","nzType","down",2,"font-size","18px"],[3,"visible","closeDrawer"],["nz-button","","nzType","text","nz-dropdown","",1,"userbtn",3,"nzDropdownMenu"],[2,"background-color","#f56a00","margin-right","5px",3,"nzText"],["menu1","nzDropdownMenu"],["nz-menu",""],["nz-menu-item","","nz-button","","nzType","text",3,"click"],[1,"content-main"],["nz-icon","",1,"trigger",2,"font-size","18px",3,"nzType","click"]],template:function(n,a){n&1&&(o(0,"div",0)(1,"nz-layout",1)(2,"nz-sider",2),J("nzCollapsedChange",function(v){return X(a.isCollapsed,v)||(a.isCollapsed=v),v}),o(3,"span",3)(4,"div")(5,"span",4),g(6,"img",5),h(7,ot,2,0,"span",6),l(),h(8,rt,1,3,"span",7),l()(),o(9,"div",8)(10,"ul",9),h(11,at,5,6,"li",10),l(),h(12,pt,16,18,"ul",11),o(13,"ul",9),h(14,mt,5,6,"li",10)(15,dt,5,6,"li",10)(16,ft,5,6,"li",10),l(),o(17,"ul",9),h(18,ht,5,6,"li",12),l(),o(19,"ul",9)(20,"li",13),g(21,"span",14),o(22,"span")(23,"a",15),m("click",function(){return a.isMobile()?a.isCollapsed=!0:null}),d(24," Employee "),l()()(),o(25,"li",13),g(26,"span",16),o(27,"span")(28,"a",15),m("click",function(){return a.isMobile()?a.isCollapsed=!0:null}),d(29," Attendance "),l()()(),h(30,xt,5,6,"li",12),l(),o(31,"ul",9),h(32,bt,5,6,"li",12)(33,vt,5,6,"li",12),l()(),h(34,yt,2,0,"nz-footer",17),l(),h(35,Mt,23,7,"nz-layout",18),l()()),n&2&&(s(2),Z("nzCollapsed",a.isCollapsed),p("nzTrigger",null)("nzWidth",!a.isCollapsed&&a.isMobile()?"100%":"200px")("nzCollapsedWidth",65),s(2),j((a.isCollapsed,"padding-left:12px")),V(a.isCollapsed?"logo flex center space-around":"logo flex center space-between"),s(3),p("ngIf",!a.isCollapsed),s(),p("ngIf",!a.isCollapsed&&a.isMobile()),s(3),p("appHasPermission",a.appPermissions.MainDashboardView),s(),p("appHasPermission",a.appPermissions.ManageSales),s(2),p("appHasPermission",a.appPermissions.InventoryUpdates),s(),p("appHasPermission",a.appPermissions.InventoryUpdates),s(),p("appHasPermission",a.appPermissions.ViewVendors),s(2),p("appHasPermission",a.appPermissions.ManageSites),s(2),x("selected-route",a.currentRoutes.indexOf("employee")>-1&&a.currentRoutes.indexOf("attendance")===-1&&a.currentRoutes.indexOf("pay-processing")===-1),s(3),p("routerLink",u(29,Ot))("state",u(30,b)),s(2),x("selected-route",a.currentRoutes.indexOf("attendance")>-1),s(3),p("routerLink",k(31,Pt,a.loggedInUser.id))("state",u(33,b)),s(2),p("appHasPermission",a.appPermissions.ManagePayments),s(2),p("appHasPermission",a.appPermissions.ManageUsers),s(),p("appHasPermission",a.appPermissions.ManagePermissions),s(),p("ngIf",!a.isCollapsed),s(),p("ngIf",!a.isMobile()||a.isCollapsed&&a.isMobile()))},dependencies:[$,ie,re,be,de,I,ue,me,ve,Se,ye,Me,we,Ee,Ie,ke,Te,Ve,Ue,We],styles:[".trigger[_ngcontent-%COMP%]{font-size:18px;line-height:50px;padding:0 16px;margin-top:3px;cursor:pointer;transition:color .3s}.ant-layout-header[_ngcontent-%COMP%]{line-height:42px;height:42px;border-bottom:.1px solid #80808017}.header-text[_ngcontent-%COMP%]{letter-spacing:2px;text-transform:uppercase;margin:auto}.logo[_ngcontent-%COMP%]{height:32px;margin-top:5px;margin-bottom:5px!important;padding-left:24px}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:24px;width:24px}.sideMenuItems[_ngcontent-%COMP%]{overflow:auto;height:calc(100% - 56px);background:#21263c}.ant-menu-inline[_ngcontent-%COMP%]{background:inherit!important}  .ant-menu-submenu-title{margin-bottom:0!important;margin-top:0!important;padding-top:5px;padding-bottom:5px}.ant-menu-item[_ngcontent-%COMP%]:hover, .ant-menu-submenu[_ngcontent-%COMP%]:hover{background:#343434;color:#c9c6c6}.ant-menu-item[_ngcontent-%COMP%], .ant-menu-submenu[_ngcontent-%COMP%]{margin:0 8px!important;width:auto!important;border-radius:8px;padding-left:12px!important;font-size:12px!important;height:32px}.ant-menu-item-selected[_ngcontent-%COMP%]{background:inherit!important}.selected-route[_ngcontent-%COMP%]{background:#bb86fc!important}ul[_ngcontent-%COMP%]{margin-top:10px}@media (max-width: 600px){.sideMenuItems[_ngcontent-%COMP%]{overflow:auto;height:calc(100% - 72px)}.ant-layout-header[_ngcontent-%COMP%]{height:72px;line-height:22px}  .ant-menu-submenu-title{margin-bottom:0!important;margin-top:0!important;min-height:60px;padding-top:10px}.selected-route[_ngcontent-%COMP%]{background:#bb86fc!important}.ant-menu-item[_ngcontent-%COMP%], .ant-menu-submenu[_ngcontent-%COMP%]{border-bottom:1px solid #343434;margin:0!important;font-size:16px!important;min-height:60px;padding-top:10px;padding-left:20px!important;border-radius:0!important}.anticon[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{line-height:1;font-size:16px!important}.trigger[_ngcontent-%COMP%]{line-height:33px;margin-top:3px}.logo[_ngcontent-%COMP%]{margin-top:20px!important;margin-bottom:20px!important;margin:0;padding-left:24px}}.trigger[_ngcontent-%COMP%]:hover{color:#1890ff}nz-header[_ngcontent-%COMP%]{padding:0}nz-content[_ngcontent-%COMP%]{background:#fff;padding:6px;overflow:auto}nz-breadcrumb[_ngcontent-%COMP%]{margin:16px 0}.inner-content[_ngcontent-%COMP%]{padding:24px;min-height:360px}nz-footer[_ngcontent-%COMP%]{padding:5px;color:#fff;font-size:9px;background:inherit;position:absolute;bottom:0;width:100%}.app-shell[_ngcontent-%COMP%], app-shell[_ngcontent-%COMP%]{width:100%!important}.userbtn[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px;padding:0!important;color:#fff}.full-width[_ngcontent-%COMP%]{width:100%!important}.nav-link[_ngcontent-%COMP%]{color:#fff}.lightFont[_ngcontent-%COMP%]{color:#fff!important}.heading[_ngcontent-%COMP%]{font-family:revert;color:#fff;font-weight:800;font-size:16px;white-space:pre;letter-spacing:.4em}"]});let e=r;return e})();var kt=[{path:"",component:Ze,children:[{path:"",loadChildren:()=>import("./chunk-ILYHZEDC.js").then(e=>e.DashboardModule),data:{name:"Dashboard"}},{path:"team",loadChildren:()=>import("./chunk-JH2DNXHE.js").then(e=>e.TeamModule),data:{name:"Team"}},{path:"sites",loadChildren:()=>import("./chunk-6PEI2OK7.js").then(e=>e.SitesModule),data:{name:"Sites"}},{path:"purchase",loadChildren:()=>import("./chunk-UYTFOYH4.js").then(e=>e.PurchaseModule),data:{name:"Purchase"}},{path:"vendor",loadChildren:()=>import("./chunk-UFDPMDFZ.js").then(e=>e.VendorModule),data:{name:"Vendor"}},{path:"inventory",loadChildren:()=>import("./chunk-UYAFU2NX.js").then(e=>e.InventoryManagementModule),data:{name:"Inventory"}},{path:"employee",loadChildren:()=>import("./chunk-ZEOVYKGN.js").then(e=>e.EmployeeManagementModule),data:{name:"Employee"}}]}],Xe=(()=>{let r=class r{};r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=M({type:r}),r.\u0275inj=O({imports:[E.forChild(kt),E]});let e=r;return e})();Y(He);var Je=pe,It=Object.keys(Je).map(e=>Je[e]),kn=(()=>{let r=class r{};r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=M({type:r}),r.\u0275inj=O({providers:[{provide:ge,useValue:fe},{provide:ce,useValue:It}],imports:[G,xe,K,ee,ze,Xe,je,Be]});let e=r;return e})();export{kn as a};
