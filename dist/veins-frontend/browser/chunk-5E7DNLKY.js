import{a as _t}from"./chunk-NGE6N3H6.js";import{a as dt}from"./chunk-2Q5GSG3T.js";import{a as ut,b as G,d as gt}from"./chunk-HCYCBEDS.js";import{a as j,d as Se}from"./chunk-7HYNQYBZ.js";import{$ as re,$a as Ce,A as m,Ab as De,B as u,Ba as ce,E as I,Fa as me,Fb as Re,Ga as ue,Ia as A,Ib as Le,Jb as q,Lb as Ae,Mb as je,N as F,Na as de,Nb as He,O as s,P as b,Qb as Ue,Rb as Be,Sb as We,Sc as mt,Ta as _e,Tb as qe,U as h,Ua as ge,Ub as Ge,V as l,Vb as Je,W as ne,X as x,Xa as fe,Y as ie,Z as J,Za as he,_ as oe,_a as ze,a as Y,aa as ae,ab as xe,ba as se,bb as be,ca as r,da as p,db as Q,e as M,ea as f,eb as ve,ec as Qe,f as K,fa as le,fb as ye,fc as Ze,ga as pe,gb as we,gc as $e,ha as C,hb as H,hc as Xe,ia as d,ja as c,jb as Oe,jc as Ye,kb as Me,lb as Pe,lc as Ke,mb as U,mc as et,na as E,nb as B,oa as _,ob as W,oc as tt,p as ee,pb as Te,pc as nt,qa as P,qb as ke,qc as it,rc as ot,sa as N,sc as rt,ta as D,tb as Ve,ua as R,ub as Ie,uc as at,v as te,va as g,vb as Fe,w as k,wa as L,wc as st,x as V,xb as Ee,xc as lt,yb as Z,yc as pt,zb as Ne,zc as ct}from"./chunk-UBOYTWID.js";function Vt(t,a){if(t&1){let e=C();r(0,"nz-list-item",7),d("click",function(){let o=m(e).$implicit,z=c(3);return u(z.setSubOrganization(o))}),r(1,"nz-list-item-meta",8)(2,"nz-list-item-meta-title"),_(3),p()()()}if(t&2){let e=a.$implicit;s(),l("nzAvatar",e.filename?e.filename:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"),s(2),P(" ",e.name," ")}}function It(t,a){t&1&&f(0,"nz-list-empty")}function Ft(t,a){if(t&1&&(le(0),r(1,"nz-list",6),ae(2,Vt,4,2,"nz-list-item",9,re),h(4,It,1,0,"nz-list-empty"),p(),pe()),t&2){let e=c(2);s(),l("nzLoading",e.loading),s(),se(e.data),s(2),oe(4,e.data.length===0?4:-1)}}function Et(t,a){if(t&1&&f(0,"img",16),t&2){let e=c(3),i;l("src",(i=e.addOrgForm.get("filename"))==null?null:i.value,F)}}function Nt(t,a){if(t&1){let e=C();r(0,"nz-form",10)(1,"nz-form-item")(2,"nz-form-label",11),_(3,"Organization Name"),p(),r(4,"nz-form-control",12),f(5,"input",13),p()(),r(6,"nz-form-item")(7,"nz-form-label",11),_(8,"Organization Image"),p(),r(9,"nz-form-control",12)(10,"section")(11,"button",14),d("click",function(){m(e);let n=c(2);return u(n.compressFile())}),_(12,"Upload"),p(),r(13,"div"),h(14,Et,1,1,"img",15),p()()()()()}if(t&2){let e=c(2),i;l("formGroup",e.addOrgForm),s(14),l("ngIf",(i=e.addOrgForm.get("filename"))==null?null:i.value)}}function Dt(t,a){if(t&1){let e=C();r(0,"nz-drawer",2),d("nzOnClose",function(){m(e);let n=c();return u(n.close())}),h(1,Ft,5,2,"ng-container",3),r(2,"nz-modal",4),R("nzVisibleChange",function(n){m(e);let o=c();return D(o.isModalVisible,n)||(o.isModalVisible=n),u(n)}),d("nzOnCancel",function(){m(e);let n=c();return u(n.handleCancel())})("nzOnOk",function(){m(e);let n=c();return u(n.handleOk())}),h(3,Nt,15,2,"nz-form",5),p()()}if(t&2){let e=c(),i=E(2);l("nzClosable",!1)("nzVisible",e.visible)("nzTitle",i),s(2),N("nzVisible",e.isModalVisible)}}function Rt(t,a){if(t&1){let e=C();r(0,"div")(1,"button",19),d("click",function(){m(e);let n=c(2);return u(n.showModal())}),_(2,"+"),p()()}}function Lt(t,a){if(t&1&&(r(0,"div",17)(1,"h4"),_(2,"Organizations"),p(),h(3,Rt,3,0,"div",18),p()),t&2){let e=c();s(3),l("appHasPermission",e.appPermissions.CreateOrganization)}}var ft=(()=>{let a=class a{constructor(i,n,o){this.appService=i,this.fb=n,this.imageCompress=o,this.loading=!1,this.data=[],this.visible=!1,this.closeDrawer=new te,this.appPermissions=j,this.isModalVisible=!1,this.apiUrl=ve.apiUrl,this.beforeUpload=(z,v)=>new K(O=>{let y=z.type==="image/jpeg"||z.type==="image/png";if(!y){this.msg.error("You can only upload JPG file!"),O.complete();return}let w=z.size/1024/1024<2;if(!w){this.msg.error("Image must smaller than 2MB!"),O.complete();return}O.next(y&&w),O.complete()}),this.addOrgForm=this.fb.group({name:["",[Z.required]],filename:["",[Z.required]]})}ngOnInit(){this.getAndSetSubOrganizations()}close(){this.closeDrawer.emit(!0)}handleCancel(){this.isModalVisible=!1}showModal(){this.isModalVisible=!0}handleOk(){return M(this,null,function*(){yield this.appService.createSubOrganization(this.addOrgForm.getRawValue()),this.isModalVisible=!1,this.getAndSetSubOrganizations()})}compressFile(){return this.imageCompress.uploadFile().then(({image:i,orientation:n,fileName:o})=>{console.warn("File Name:",o),console.warn(`Original: ${i.substring(0,50)}... (${i.length} characters)`),console.warn("Size in bytes was:",this.imageCompress.byteCount(i)),this.imageCompress.compressFile(i,n,50,80,800,800).then(z=>{console.warn(`Compressed: ${z.substring(0,50)}... (${z.length} characters)`),console.warn("Size in bytes is now:",this.imageCompress.byteCount(z)),this.addOrgForm.patchValue({filename:z})})})}b64toBlob(i,n="",o=512){for(i=i.replace(/[^A-Za-z0-9+/=]/g,"");i.length%4!==0;)i+="=";let z=atob(i),v=[];for(let y=0;y<z.length;y+=o){let w=z.slice(y,y+o),X=new Array(w.length);for(let T=0;T<w.length;T++)X[T]=w.charCodeAt(T);let St=new Uint8Array(X);v.push(St)}return new Blob(v,{type:n})}getBase64(i,n){let o=new FileReader;o.addEventListener("load",()=>n(o.result.toString())),o.readAsDataURL(i)}handleChange(i){this.getBase64(i.file.originFileObj,n=>{this.loading=!1,this.avatarUrl=n})}getAndSetSubOrganizations(){return M(this,null,function*(){this.loading=!0,this.data=yield this.appService.getSubOrganizations(!0),this.loading=!1})}setSubOrganization(i){this.appService.setSubOrganization(i),localStorage.setItem("selectedOrganzation",JSON.stringify(i)),this.closeDrawer.emit(!0)}};a.\u0275fac=function(n){return new(n||a)(b(H),b(q),b(dt))},a.\u0275cmp=k({type:a,selectors:[["app-organization-selector"]],inputs:{visible:"visible"},outputs:{closeDrawer:"closeDrawer"},decls:3,vars:1,consts:[["nzPlacement","right",3,"nzClosable","nzVisible","nzTitle","nzOnClose",4,"appHasPermission"],["organization",""],["nzPlacement","right",3,"nzClosable","nzVisible","nzTitle","nzOnClose"],[4,"nzDrawerContent"],["nzTitle","Add Organization",3,"nzVisible","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],["nzItemLayout","horizontal",3,"nzLoading"],["nz-button","","nzType","text",3,"click"],["nzDescription","",3,"nzAvatar"],["nz-button","","nzType","text"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input Organization name"],["nz-input","","formControlName","name"],[3,"click"],["style","width: 100px;height: 100px;","alt","",3,"src",4,"ngIf"],["alt","",2,"width","100px","height","100px",3,"src"],[1,"flex","space-between","center"],[4,"appHasPermission"],["nz-button","","nzType","primary",3,"click"]],template:function(n,o){n&1&&h(0,Dt,4,4,"nz-drawer",0)(1,Lt,4,1,"ng-template",null,1,ce),n&2&&l("appHasPermission",o.appPermissions.SwitchOrganization)},dependencies:[A,Ee,Ne,De,Re,Le,W,U,B,Ze,Qe,Xe,$e,Ye,et,Ke,He,pt,lt,ct,st,at,Fe,Ie,G]});let t=a;return t})();function jt(t,a){if(t&1&&(r(0,"span",19),_(1),p()),t&2){let e=c();s(),P(" ",e.organization?e.organization.name:"VEINS"," ")}}function Ht(t,a){if(t&1){let e=C();r(0,"span",20),d("click",function(){m(e);let n=c();return u(n.isCollapsed=!n.isCollapsed)}),p()}if(t&2){let e=c();J(!e.isCollapsed&&e.isMobile()?"lightFont":"darkFont"),l("nzType",e.isCollapsed?"menu-unfold":"menu-fold")}}var Ut=()=>["/"],S=()=>({tracingId:123});function Bt(t,a){if(t&1){let e=C();r(0,"li",21),f(1,"span",22),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Dashboard "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.length==0),s(3),l("routerLink",g(4,Ut))("state",g(5,S))}}var Wt=()=>["/purchase/customers"],ht=()=>["/purchase/sales"],zt=t=>({status:t});function qt(t,a){if(t&1){let e=C();r(0,"ul",9)(1,"li",21),f(2,"span",23),r(3,"span")(4,"a",24),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(5," Customers "),p()()(),r(6,"li",21),f(7,"span",25),r(8,"span")(9,"a",26),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(10," Quotes "),p()()(),r(11,"li",21),f(12,"span",27),r(13,"span")(14,"a",26),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(15," Sale Invoices "),p()()()()}if(t&2){let e=c();s(),x("selected-route",e.currentRoutes.indexOf("customers")>-1),s(3),l("routerLink",g(11,Wt)),s(2),x("selected-route",e.currentRoutes.indexOf("sales")>-1&&(e.currentRoutes.indexOf("status="+e.saleState.Quote)>-1||e.currentRoutes.join("").indexOf("SALE=")>-1)),s(3),l("routerLink",g(12,ht))("queryParams",L(13,zt,e.saleState.Quote)),s(2),x("selected-route",e.currentRoutes.indexOf("sales")>-1&&(e.currentRoutes.indexOf("status="+e.saleState.Invoiced)>-1||e.currentRoutes.join("").indexOf("INVOICE=")>-1)),s(3),l("routerLink",g(15,ht))("queryParams",L(16,zt,e.saleState.Invoiced))}}var Gt=()=>["/vendor"];function Jt(t,a){if(t&1){let e=C();r(0,"li",21),f(1,"span",28),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Vendors "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.indexOf("vendor")>-1),s(3),l("routerLink",g(4,Gt))("state",g(5,S))}}var Qt=()=>["/purchase"];function Zt(t,a){if(t&1){let e=C();r(0,"li",21),f(1,"span",29),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Purchase Invoices "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.indexOf("customers")==-1&&e.currentRoutes.indexOf("purchase")>-1&&e.currentRoutes.indexOf("sales")==-1&&e.currentRoutes.indexOf("sale")==-1&&e.currentRoutes.indexOf("sales?status="+e.saleState.Quote)==-1&&e.currentRoutes.indexOf("sales?status="+e.saleState.Invoiced)==-1),s(3),l("routerLink",g(4,Qt))("state",g(5,S))}}var $t=()=>["/inventory"];function Xt(t,a){if(t&1){let e=C();r(0,"li",21),f(1,"span",30),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Inventory "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.indexOf("inventory")>-1),s(3),l("routerLink",g(4,$t))("state",g(5,S))}}var Yt=()=>["/sites"];function Kt(t,a){if(t&1){let e=C();r(0,"li",13),f(1,"span",31),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Sites "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.indexOf("sites")>-1),s(3),l("routerLink",g(4,Yt))("state",g(5,S))}}var en=()=>["/employee","pay-processing"];function tn(t,a){if(t&1){let e=C();r(0,"li",13),f(1,"span",16),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Payments "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.indexOf("pay-processing")>-1),s(3),l("routerLink",g(4,en))("state",g(5,S))}}var nn=()=>["/team"];function on(t,a){if(t&1){let e=C();r(0,"li",13),f(1,"span",32),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Users "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.indexOf("team")>-1&&e.currentRoutes.indexOf("roles")==-1),s(3),l("routerLink",g(4,nn))("state",g(5,S))}}var rn=()=>["/team/roles"];function an(t,a){if(t&1){let e=C();r(0,"li",13),f(1,"span",33),r(2,"span")(3,"a",15),d("click",function(){m(e);let n=c();return u(n.isMobile()?n.isCollapsed=!0:null)}),_(4," Permissions "),p()()()}if(t&2){let e=c();x("selected-route",e.currentRoutes.indexOf("team")>-1&&e.currentRoutes.indexOf("roles")>-1),s(3),l("routerLink",g(4,rn))("state",g(5,S))}}function sn(t,a){t&1&&(r(0,"nz-footer"),_(1,"Veins system \xA92024 Implement By SA3"),p())}function ln(t,a){if(t&1){let e=C();r(0,"span",48),d("click",function(){m(e);let n=c(2);return u(n.isCollapsed=!n.isCollapsed)}),p()}if(t&2){let e=c(2);l("nzType",e.isCollapsed?"menu-unfold":"menu-fold")}}function pn(t,a){t&1&&f(0,"span",43)}function cn(t,a){if(t&1){let e=C();r(0,"app-organization-selector",49),d("closeDrawer",function(){m(e);let n=c(2);return u(n.toggleOrganizations())}),p()}if(t&2){let e=c(2);l("visible",e.showOrganizations)}}function mn(t,a){if(t&1){let e=C();r(0,"nz-layout",34)(1,"nz-header")(2,"div",35)(3,"span",36),h(4,ln,1,1,"span",37),p(),r(5,"span",4)(6,"span")(7,"button",38),d("click",function(){m(e);let n=c();return u(n.toggleOrganizations())}),_(8),h(9,pn,1,0,"span",39),p(),h(10,cn,1,1,"app-organization-selector",40),p(),r(11,"button",41),f(12,"nz-avatar",42)(13,"span",43),p(),r(14,"nz-dropdown-menu",null,44)(16,"ul",45)(17,"li",46),d("click",function(){m(e);let n=c();return u(n.logout())}),_(18,"Logout "),p(),r(19,"li",46),d("click",function(){m(e);let n=c();return u(n.openChangePasswordModal())}),_(20,"Change Password"),p()()()()()(),r(21,"nz-content",47),f(22,"router-outlet"),p()()}if(t&2){let e=E(15),i=c();l("ngClass",i.isMobile()?"height-greater-than-width":""),s(4),l("ngIf",i.isMobile()),s(),ne("width",i.isMobile()?"100%":"auto"),s(3),P(" ",i.currentSubOrganization==null?null:i.currentSubOrganization.name," "),s(),l("appHasPermission",i.appPermissions.SwitchOrganization),s(),l("appHasPermission",i.appPermissions.SwitchOrganization),s(),l("nzDropdownMenu",e),s(),l("nzText",i.getUserInitials(i.loggedInUser.name))}}var un=()=>["/employee"],dn=t=>["/employee",t,"attendance"],Ct=(()=>{let a=class a{constructor(i,n,o,z,v,O,y,w){this.userService=i,this.appService=n,this.fb=o,this.media=z,this.router=v,this.route=O,this.modal=y,this.titleService=w,this.isCollapsed=!1,this.isMobileDevice=!0,this.loggedInUser={},this.sites=[],this.site={},this.showOrganizations=!1,this.currentRoutes=[],this.saleState=Se,this.appPermissions=j,this.isMobile=this.appService.isMobile,this.siteForm=this.fb.group({site:[]})}ngOnInit(){this.loggedInUser=this.userService.getUserDetails(),this.organization=this.appService.organization,this.titleService.setTitle(this.organization.name),this.setFavicon(this.organization.icon),this.setSitesData(),this.onSiteChange(),this.extractRoutePath(this.router.url),this.router.events.pipe(ee(i=>i instanceof he)).subscribe(i=>{this.currentUrl=i.url,this.extractRoutePath(this.currentUrl)})}setFavicon(i){let n=document.querySelector("link[rel*='icon']")||document.createElement("link");n.type="image/png",n.rel="shortcut icon",n.href=i,document.getElementsByTagName("head")[0].appendChild(n)}extractRoutePath(i){i=i.replace(/(https?:\/\/[^\/]+)?\/?/,""),this.currentRoutes=i.split(/[/?]/).filter(n=>n),console.log(this.currentRoutes)}toggleOrganizations(){this.showOrganizations=!this.showOrganizations}onSiteChange(){this.siteSubscription=this.siteForm.valueChanges.subscribe(i=>{this.setCurrentSite(i.site)}),this.subOrgSubscription=this.appService.currentSubOrganization.subscribe(i=>{i&&i.id>0&&this.currentOrganizationId!=i.id&&(this.currentSubOrganization=i,this.currentOrganizationId=i.id)})}setSitesData(){return M(this,null,function*(){let i=yield this.appService.getAndSetSites(),n=i&&i.length?i.map(o=>Y({label:o.name},o)):[];this.sites=[...n],this.appService.setSites(this.sites),this.siteForm.patchValue({site:this.sites[0]}),this.setCurrentSite(void 0)})}setCurrentSite(i){this.appService.setCurrentSite(i||this.sites[0])}logout(){this.userService.logout()}ngOnDestroy(){this.siteSubscription&&this.siteSubscription.unsubscribe(),this.subOrgSubscription&&this.subOrgSubscription.unsubscribe()}getUserInitials(i){return i.trim().split(" ").map(z=>z.charAt(0)).join("").toUpperCase()}openChangePasswordModal(){this.modal.create({nzTitle:"Change Password ("+this.userService.loggedInUser.name+")",nzContent:ut,nzFooter:null,nzData:{user:this.userService.loggedInUser}}).afterClose.subscribe(n=>{n&&console.log("Password changed",n)})}};a.\u0275fac=function(n){return new(n||a)(b(ye),b(H),b(q),b(we),b(xe),b(ze),b(Ve),b(fe))},a.\u0275cmp=k({type:a,selectors:[["app-shell"]],decls:36,vars:35,consts:[[1,"app-shell"],[2,"height","100%"],["nzCollapsible","",1,"appbackground",3,"nzCollapsed","nzTrigger","nzWidth","nzCollapsedWidth","nzCollapsedChange"],[2,"display","flow-root"],[1,"flex","center","space-between"],["alt","",3,"src"],["class","heading",4,"ngIf"],["class","trigger","nz-icon","",3,"nzType","class","click",4,"ngIf"],[1,"sideMenuItems"],["nz-menu","","nzTheme","dark","nzMode","inline"],["nz-menu-item","",3,"selected-route",4,"appHasPermission"],["nz-menu","","nzTheme","dark","nzMode","inline",4,"appHasPermission"],["nz-menu-item","","style","margin-top: 12px;",3,"selected-route",4,"appHasPermission"],["nz-menu-item","",2,"margin-top","12px"],["nz-icon","","nzType","profile","size","",2,"font-size","18px"],[1,"nav-link",3,"routerLink","state","click"],["nz-icon","","nzType","schedule","size","",2,"font-size","18px"],[4,"ngIf"],["class","appbackground",3,"ngClass",4,"ngIf"],[1,"heading"],["nz-icon","",1,"trigger",3,"nzType","click"],["nz-menu-item",""],["nz-icon","","nzType","bar-chart",2,"font-size","18px"],["nz-icon","","nzType","user-switch",2,"font-size","18px"],[1,"nav-link",3,"routerLink","click"],["nz-icon","","nzType","file-text",2,"font-size","18px"],[1,"nav-link",3,"routerLink","queryParams","click"],["nz-icon","","nzType","file-done",2,"font-size","18px"],["nz-icon","","nzType","profile",2,"font-size","18px"],["nz-icon","","nzType","pull-request",2,"font-size","18px"],["nz-icon","","nzType","appstore",2,"font-size","18px"],["nz-icon","","nzType","build","size","",2,"font-size","18px"],["nz-icon","","nzType","team","size","",2,"font-size","18px"],["nz-icon","","nzType","sliders","size","",2,"font-size","18px"],[1,"appbackground",3,"ngClass"],[1,"flex","space-between","center",2,"flex-wrap","wrap"],[1,"flex","center"],["class","trigger","nz-icon","","style","font-size: 18px;",3,"nzType","click",4,"ngIf"],["nz-button","",1,"header-button",3,"click"],["nz-icon","","style","font-size: 18px;","nzType","down",4,"appHasPermission"],[3,"visible","closeDrawer",4,"appHasPermission"],["nz-button","","nzType","text","nz-dropdown","",1,"userbtn",3,"nzDropdownMenu"],[2,"background-color","#f56a00","margin-right","5px",3,"nzText"],["nz-icon","","nzType","down",2,"font-size","18px"],["menu1","nzDropdownMenu"],["nz-menu",""],["nz-menu-item","","nz-button","","nzType","text",3,"click"],[1,"content-main"],["nz-icon","",1,"trigger",2,"font-size","18px",3,"nzType","click"],[3,"visible","closeDrawer"]],template:function(n,o){n&1&&(r(0,"div",0)(1,"nz-layout",1)(2,"nz-sider",2),R("nzCollapsedChange",function(v){return D(o.isCollapsed,v)||(o.isCollapsed=v),v}),r(3,"span",3)(4,"div")(5,"span",4),f(6,"img",5),h(7,jt,2,1,"span",6),p(),h(8,Ht,1,3,"span",7),p()(),r(9,"div",8)(10,"ul",9),h(11,Bt,5,6,"li",10),p(),h(12,qt,16,18,"ul",11),r(13,"ul",9),h(14,Jt,5,6,"li",10)(15,Zt,5,6,"li",10)(16,Xt,5,6,"li",10),p(),r(17,"ul",9),h(18,Kt,5,6,"li",12),p(),r(19,"ul",9)(20,"li",13),f(21,"span",14),r(22,"span")(23,"a",15),d("click",function(){return o.isMobile()?o.isCollapsed=!0:null}),_(24," Employee "),p()()(),r(25,"li",13),f(26,"span",16),r(27,"span")(28,"a",15),d("click",function(){return o.isMobile()?o.isCollapsed=!0:null}),_(29," Attendance "),p()()(),h(30,tn,5,6,"li",12),p(),r(31,"ul",9),h(32,on,5,6,"li",12)(33,an,5,6,"li",12),p()(),h(34,sn,2,0,"nz-footer",17),p(),h(35,mn,23,9,"nz-layout",18),p()()),n&2&&(s(2),N("nzCollapsed",o.isCollapsed),l("nzTrigger",null)("nzWidth",!o.isCollapsed&&o.isMobile()?"100%":"200px")("nzCollapsedWidth",65),s(2),ie((o.isCollapsed,"padding-left:12px")),J(o.isCollapsed?"logo flex center space-around":"logo flex center space-between"),s(2),l("src",o.organization?o.organization.icon:"../../../assets/veins-ico.png",F),s(),l("ngIf",!o.isCollapsed),s(),l("ngIf",!o.isCollapsed&&o.isMobile()),s(3),l("appHasPermission",o.appPermissions.MainDashboardView),s(),l("appHasPermission",o.appPermissions.ManageSales),s(2),l("appHasPermission",o.appPermissions.ViewVendors),s(),l("appHasPermission",o.appPermissions.InventoryUpdates),s(),l("appHasPermission",o.appPermissions.InventoryUpdates),s(2),l("appHasPermission",o.appPermissions.ManageSites),s(2),x("selected-route",o.currentRoutes.indexOf("employee")>-1&&o.currentRoutes.indexOf("attendance")===-1&&o.currentRoutes.indexOf("pay-processing")===-1),s(3),l("routerLink",g(30,un))("state",g(31,S)),s(2),x("selected-route",o.currentRoutes.indexOf("attendance")>-1),s(3),l("routerLink",L(32,dn,o.loggedInUser.id))("state",g(34,S)),s(2),l("appHasPermission",o.appPermissions.ManagePayments),s(2),l("appHasPermission",o.appPermissions.ManageUsers),s(),l("appHasPermission",o.appPermissions.ManagePermissions),s(),l("ngIf",!o.isCollapsed),s(),l("ngIf",!o.isMobile()||o.isCollapsed&&o.isMobile()))},dependencies:[ue,A,Ce,be,Ue,W,U,B,Pe,We,Be,qe,Je,Ge,rt,it,tt,nt,ot,G,ft],styles:[".trigger[_ngcontent-%COMP%]{font-size:18px;line-height:50px;padding:0 16px;margin-top:3px;cursor:pointer;transition:color .3s}.ant-layout-header[_ngcontent-%COMP%]{line-height:42px;height:42px;border-bottom:.1px solid #80808017}.header-text[_ngcontent-%COMP%]{letter-spacing:2px;text-transform:uppercase;margin:auto}.logo[_ngcontent-%COMP%]{height:32px;margin-top:5px;margin-bottom:5px!important;padding-left:24px}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:24px;width:24px}.sideMenuItems[_ngcontent-%COMP%]{overflow:auto;height:calc(100% - 56px);background:#21263c}.ant-menu-inline[_ngcontent-%COMP%]{background:inherit!important}  .ant-menu-submenu-title{margin-bottom:0!important;margin-top:0!important;padding-top:5px;padding-bottom:5px}.ant-menu-item[_ngcontent-%COMP%]:hover, .ant-menu-submenu[_ngcontent-%COMP%]:hover{background:#343434;color:#c9c6c6}.ant-menu-item[_ngcontent-%COMP%], .ant-menu-submenu[_ngcontent-%COMP%]{margin:0 8px!important;width:auto!important;border-radius:8px;padding-left:12px!important;font-size:12px!important;height:32px}.ant-menu-item-selected[_ngcontent-%COMP%]{background:inherit!important}.selected-route[_ngcontent-%COMP%]{background:#bb86fc!important}ul[_ngcontent-%COMP%]{padding-top:5px;padding-bottom:5px}.height-greater-than-width[_ngcontent-%COMP%]   .ant-layout-header[_ngcontent-%COMP%]{height:auto!important;line-height:22px;padding-bottom:5px}@media (max-width: 600px){.sideMenuItems[_ngcontent-%COMP%]{overflow:auto;height:calc(100% - 72px)}.ant-layout-header[_ngcontent-%COMP%]{height:72px;line-height:22px}  .ant-menu-submenu-title{margin-bottom:0!important;margin-top:0!important;min-height:60px;padding-top:10px}.selected-route[_ngcontent-%COMP%]{background:#bb86fc!important}.ant-menu-item[_ngcontent-%COMP%], .ant-menu-submenu[_ngcontent-%COMP%]{border-bottom:1px solid #343434;margin:0!important;font-size:16px!important;min-height:60px;padding-top:10px;padding-left:20px!important;border-radius:0!important}.anticon[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{line-height:1;font-size:16px!important}.trigger[_ngcontent-%COMP%]{line-height:33px;margin-top:3px}.logo[_ngcontent-%COMP%]{margin-top:20px!important;margin-bottom:20px!important;margin:0;padding-left:24px}}.trigger[_ngcontent-%COMP%]:hover{color:#1890ff}nz-header[_ngcontent-%COMP%]{padding:0}nz-content[_ngcontent-%COMP%]{background:#fff;padding:6px;overflow:auto}nz-breadcrumb[_ngcontent-%COMP%]{margin:16px 0}.inner-content[_ngcontent-%COMP%]{padding:24px;min-height:360px}nz-footer[_ngcontent-%COMP%]{padding:5px;color:#fff;font-size:9px;background:inherit;position:absolute;bottom:0;width:100%}.app-shell[_ngcontent-%COMP%], app-shell[_ngcontent-%COMP%]{width:100%!important}.userbtn[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px;padding:0!important;color:#fff}.full-width[_ngcontent-%COMP%]{width:100%!important}.nav-link[_ngcontent-%COMP%]{color:#fff}.lightFont[_ngcontent-%COMP%]{color:#fff!important}.heading[_ngcontent-%COMP%]{font-family:revert;color:#fff;font-weight:800;font-size:16px;white-space:pre;letter-spacing:.4em}"]});let t=a;return t})();var _n=[{path:"",component:Ct,children:[{path:"",loadChildren:()=>import("./chunk-EGMRUFVC.js").then(t=>t.DashboardModule),data:{name:"Dashboard"}},{path:"team",loadChildren:()=>import("./chunk-4OEKU674.js").then(t=>t.TeamModule),data:{name:"Team"}},{path:"sites",loadChildren:()=>import("./chunk-QBWCL2MM.js").then(t=>t.SitesModule),data:{name:"Sites"}},{path:"purchase",loadChildren:()=>import("./chunk-RZK7H3YL.js").then(t=>t.PurchaseModule),data:{name:"Purchase"}},{path:"vendor",loadChildren:()=>import("./chunk-6VAISOQQ.js").then(t=>t.VendorModule),data:{name:"Vendor"}},{path:"inventory",loadChildren:()=>import("./chunk-GCFV234J.js").then(t=>t.InventoryManagementModule),data:{name:"Inventory"}},{path:"employee",loadChildren:()=>import("./chunk-7KM5KML2.js").then(t=>t.EmployeeManagementModule),data:{name:"Employee"}}]}],xt=(()=>{let a=class a{};a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=V({type:a}),a.\u0275inj=I({imports:[Q.forChild(_n),Q]});let t=a;return t})();me(_t);var bt=Oe,fn=Object.keys(bt).map(t=>bt[t]),fi=(()=>{let a=class a{};a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=V({type:a}),a.\u0275inj=I({providers:[{provide:ke,useValue:Te},{provide:Me,useValue:fn}],imports:[de,Ae,_e,ge,je,xt,mt,gt]});let t=a;return t})();export{fi as a};