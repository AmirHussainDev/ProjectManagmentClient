import{a as vt}from"./chunk-NGE6N3H6.js";import{a as bt}from"./chunk-ICQOAD57.js";import{a as xt,b as J,f as St}from"./chunk-TFSPKEVB.js";import{a as B,d as Oe}from"./chunk-62EMLTDR.js";import{$c as dt,Ab as K,Ac as Qe,Bb as Pe,Ca as F,Cb as Te,D as ie,Da as m,Ea as me,F as k,Fa as v,G as V,Ha as D,Ia as j,J as u,Ja as R,K as _,Kb as Ie,Kc as Ye,Lb as L,Lc as Xe,Ma as z,Mc as et,N,Na as $,Nb as ke,Nc as tt,Ob as Ve,Pb as U,Pc as it,Qa as de,Qb as H,Rb as q,Rc as nt,Sa as ue,Sb as W,Sc as ot,Ta as _e,Tb as Ne,Tc as rt,Ub as Ee,Uc as at,Vc as st,Wc as lt,Xb as Fe,Xc as pt,Y as E,Yb as De,Yc as ct,Z as s,Zb as je,_ as x,_c as mt,a as X,ab as ge,ac as Re,bb as fe,bd as ut,cc as b,cd as _t,db as A,dc as Ae,dd as gt,ec as Be,ed as ft,f as T,fd as ht,ga as h,gd as Ct,h as ee,hb as he,ia as p,ib as Ce,ja as ne,jc as Le,ka as y,la as oe,ma as Z,mc as Ue,na as re,nc as G,oa as ae,ob as ze,pa as se,pb as xe,pc as He,qa as le,qc as qe,ra as r,rc as We,sa as l,sb as be,ta as g,u as te,ua as pe,ub as ve,va as ce,vb as Se,vc as Ge,wa as C,wb as we,wc as Je,xa as f,xb as ye,xc as Ze,ya as c,yb as Me,yc as $e,yd as zt,zc as Ke}from"./chunk-ALEK3DEW.js";function At(n,a){if(n&1){let e=C();r(0,"nz-list-item",7),f("click",function(){let o=u(e).$implicit,d=c(3);return _(d.setClient(o))}),r(1,"nz-list-item-meta",8)(2,"nz-list-item-meta-title"),m(3),r(4,"b"),m(5),l(),m(6," \xA0 "),r(7,"b"),m(8),de(9,"currency"),l()(),r(10,"nz-list-item-meta-description"),m(11),l()(),r(12,"ul",9)(13,"nz-list-item-action")(14,"span",10),f("click",function(){let o=u(e).$implicit,d=c(3);return _(d.showModal(!1,o.id))}),l()()()()}if(n&2){let e=a.$implicit;s(),p("nzAvatar",e.filename?e.filename:"A"),s(2),v(" ",e.name," "),s(2),v("",e.projectDuration," hours"),s(3),me(ue(9,5,e.projectBudget,"PKR ")),s(3),v(" ",e.projectDescription," ")}}function Bt(n,a){n&1&&g(0,"nz-list-empty")}function Lt(n,a){if(n&1&&(pe(0),r(1,"nz-list",6),se(2,At,15,8,"nz-list-item",11,ae),h(4,Bt,1,0,"nz-list-empty"),l(),ce()),n&2){let e=c(2);s(),p("nzLoading",e.loading),s(),le(e.data),s(2),re(4,e.data.length===0?4:-1)}}function Ut(n,a){if(n&1&&g(0,"img",23),n&2){let e=c(3),t;p("src",(t=e.addOrgForm.get("filename"))==null?null:t.value,E)}}function Ht(n,a){if(n&1){let e=C();r(0,"nz-form",12)(1,"nz-form-item")(2,"nz-form-label",13),m(3,"Client Name"),l(),r(4,"nz-form-control",14),g(5,"input",15),l()(),r(6,"nz-form-item")(7,"nz-form-label",13),m(8,"Contact"),l(),r(9,"nz-form-control",14),g(10,"input",16),l()(),r(11,"nz-form-item")(12,"nz-form-label",13),m(13,"Project Description"),l(),r(14,"nz-form-control",17),g(15,"textarea",18),l()(),r(16,"nz-form-item")(17,"nz-form-label",13),m(18,"Project Duration in Hours"),l(),r(19,"nz-form-control",17),g(20,"nz-input-number",19),l()(),r(21,"nz-form-item")(22,"nz-form-label",13),m(23,"Project Budget"),l(),r(24,"nz-form-control",17),g(25,"nz-input-number",20),l()(),r(26,"nz-form-item")(27,"nz-form-label",13),m(28,"Client Image"),l(),r(29,"nz-form-control",14)(30,"section")(31,"button",21),f("click",function(){u(e);let i=c(2);return _(i.compressFile())}),m(32,"Upload"),l(),r(33,"div"),h(34,Ut,1,1,"img",22),l()()()()()}if(n&2){let e=c(2),t;p("formGroup",e.addOrgForm),s(20),p("nzMin",1)("nzMax",10)("nzStep",1),s(5),p("nzMin",1)("nzMax",10)("nzStep",1),s(9),p("ngIf",(t=e.addOrgForm.get("filename"))==null?null:t.value)}}function qt(n,a){if(n&1){let e=C();r(0,"nz-drawer",2),f("nzOnClose",function(){u(e);let i=c();return _(i.close())}),h(1,Lt,5,2,"ng-container",3),r(2,"nz-modal",4),R("nzVisibleChange",function(i){u(e);let o=c();return j(o.isModalVisible,i)||(o.isModalVisible=i),_(i)}),f("nzOnCancel",function(){u(e);let i=c();return _(i.handleCancel())})("nzOnOk",function(){u(e);let i=c();return _(i.handleOk())}),h(3,Ht,35,8,"nz-form",5),l()()}if(n&2){let e=c(),t=F(2);p("nzClosable",!1)("nzVisible",e.visible)("nzTitle",t),s(2),D("nzVisible",e.isModalVisible),p("nzTitle",e.newItem?"Add Client":"Edit Client")}}function Wt(n,a){if(n&1){let e=C();r(0,"div")(1,"button",26),f("click",function(){u(e);let i=c(2);return _(i.showModal())}),m(2,"+"),l()()}}function Gt(n,a){if(n&1&&(r(0,"div",24)(1,"h4"),m(2,"Clients"),l(),h(3,Wt,3,0,"div",25),l()),n&2){let e=c();s(3),p("appHasPermission",e.appPermissions.AddClients)}}var wt=(()=>{let a=class a{constructor(t,i,o){this.appService=t,this.fb=i,this.imageCompress=o,this.loading=!1,this.data=[],this.visible=!1,this.closeDrawer=new ie,this.appPermissions=B,this.isModalVisible=!1,this.apiUrl=Pe.apiUrl,this.beforeUpload=(d,S)=>new ee(O=>{let w=d.type==="image/jpeg"||d.type==="image/png";if(!w){this.msg.error("You can only upload JPG file!"),O.complete();return}let M=d.size/1024/1024<2;if(!M){this.msg.error("Image must smaller than 2MB!"),O.complete();return}O.next(w&&M),O.complete()}),this.addOrgForm=this.fb.group({name:["",[b.required]],contact:["",[b.required]],filename:["",[b.required]],projectDescription:["",[b.required]],projectDuration:[0,b.required],projectBudget:[0,b.required],id:[""]})}ngOnInit(){this.getAndSetClient()}getUserInitials(t){return t.trim().split(" ").map(d=>d.charAt(0)).join("").toUpperCase()}close(){this.closeDrawer.emit(!0)}handleCancel(){this.isModalVisible=!1}showModal(t=!0,i=0){if(this.newItem=t,this.newItem&&(this.addOrgForm.reset(),this.avatarUrl=""),i){let o=this.data.find(d=>d.id==i)||{name:"",filename:"",projectDescription:"",projectDuration:0,projectBudget:0,contact:""};this.addOrgForm=this.fb.group({name:[o.name,[b.required]],filename:[o.filename,[b.required]],contact:[o.contact,[b.required]],projectDescription:[o.projectDescription,[b.required]],projectDuration:[o.projectDuration,[b.required]],projectBudget:[o.projectBudget,[b.required]],id:[i]}),this.avatarUrl=o.filename||""}this.isModalVisible=!0}handleOk(){return T(this,null,function*(){this.newItem?yield this.appService.createClient(this.addOrgForm.getRawValue()):yield this.appService.updateClient(this.addOrgForm.getRawValue()),this.isModalVisible=!1,this.getAndSetClient()})}compressFile(){return this.imageCompress.uploadFile().then(({image:t,orientation:i,fileName:o})=>{console.warn("File Name:",o),console.warn(`Original: ${t.substring(0,50)}... (${t.length} characters)`),console.warn("Size in bytes was:",this.imageCompress.byteCount(t)),this.imageCompress.compressFile(t,i,50,80,800,800).then(d=>{console.warn(`Compressed: ${d.substring(0,50)}... (${d.length} characters)`),console.warn("Size in bytes is now:",this.imageCompress.byteCount(d)),this.addOrgForm.patchValue({filename:d})})})}b64toBlob(t,i="",o=512){for(t=t.replace(/[^A-Za-z0-9+/=]/g,"");t.length%4!==0;)t+="=";let d=atob(t),S=[];for(let w=0;w<d.length;w+=o){let M=d.slice(w,w+o),Y=new Array(M.length);for(let I=0;I<M.length;I++)Y[I]=M.charCodeAt(I);let Tt=new Uint8Array(Y);S.push(Tt)}return new Blob(S,{type:i})}getBase64(t,i){let o=new FileReader;o.addEventListener("load",()=>i(o.result.toString())),o.readAsDataURL(t)}handleChange(t){this.getBase64(t.file.originFileObj,i=>{this.loading=!1,this.avatarUrl=i})}getAndSetClient(){return T(this,null,function*(){this.loading=!0,this.data=yield this.appService.getClient(!0),this.loading=!1})}setClient(t){this.appService.setClient(t),localStorage.setItem("selectedOrganzation",JSON.stringify(t)),this.closeDrawer.emit(!0)}};a.\u0275fac=function(i){return new(i||a)(x(L),x(G),x(bt))},a.\u0275cmp=k({type:a,selectors:[["app-organization-selector"]],inputs:{visible:"visible"},outputs:{closeDrawer:"closeDrawer"},decls:3,vars:1,consts:[["nzPlacement","right",3,"nzClosable","nzVisible","nzTitle","nzOnClose",4,"appHasPermission"],["organization",""],["nzPlacement","right",3,"nzClosable","nzVisible","nzTitle","nzOnClose"],[4,"nzDrawerContent"],[3,"nzVisible","nzTitle","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],["nzItemLayout","horizontal",3,"nzLoading"],["nz-button","","nzType","text",1,"selectedItem",2,"padding","4px",3,"click"],[3,"nzAvatar"],["nz-list-item-actions","",2,"border","0px !important"],["nz-icon","","nzType","edit","nzTheme","outline",3,"click"],["nz-button","","nzType","text","style","padding: 4px;","class","selectedItem"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input Organization name"],["nz-input","","formControlName","name"],["nz-input","","formControlName","contact"],["nzHasFeedback","","nzErrorTip","Please input project name and details"],["rows","5","nz-input","","formControlName","projectDescription"],["formControlName","projectDuration",3,"nzMin","nzMax","nzStep"],["formControlName","projectBudget","nzPrefix","Rs.",3,"nzMin","nzMax","nzStep"],[3,"click"],["style","width: 100px;height: 100px;","alt","",3,"src",4,"ngIf"],["alt","",2,"width","100px","height","100px",3,"src"],[1,"flex","space-between","center"],[4,"appHasPermission"],["nz-button","","nzType","primary",3,"click"]],template:function(i,o){i&1&&h(0,qt,4,5,"nz-drawer",0)(1,Gt,4,1,"ng-template",null,1,_e),i&2&&p("appHasPermission",o.appPermissions.SwitchClients)},dependencies:[A,Re,Ae,Be,Le,Ue,W,H,q,U,Xe,Ye,tt,et,it,ot,nt,We,rt,ht,ft,Ct,ut,mt,dt,gt,_t,je,De,J,he]});let n=a;return n})();function Zt(n,a){if(n&1&&(r(0,"span",18),m(1),l()),n&2){let e=c();s(),v(" ",e.organization?e.organization.name:"VEINS"," ")}}function $t(n,a){if(n&1){let e=C();r(0,"span",19),f("click",function(){u(e);let i=c();return _(i.isCollapsed=!i.isCollapsed)}),l()}if(n&2){let e=c();Z(!e.isCollapsed&&e.isMobile()?"lightFont":"darkFont"),p("nzType",e.isCollapsed?"menu-unfold":"menu-fold")}}var Kt=()=>["/"],P=()=>({tracingId:123});function Qt(n,a){if(n&1){let e=C();r(0,"li",20),g(1,"span",21),r(2,"span")(3,"a",14),f("click",function(){u(e);let i=c();return _(i.isMobile()?i.isCollapsed=!0:null)}),m(4),l()()()}if(n&2){let e=c();y("selected-route",e.currentRoutes.length==0),s(3),p("routerLink",z(5,Kt))("state",z(6,P)),s(),v(" ",e.isCollapsed?"":"Dashboard"," ")}}var Yt=()=>["/task/list"];function Xt(n,a){if(n&1){let e=C();r(0,"li",20),g(1,"span",24),r(2,"span")(3,"a",14),f("click",function(){u(e);let i=c(2);return _(i.isMobile()?i.isCollapsed=!0:null)}),m(4," Tasks "),l()()()}if(n&2){let e=c(2);y("selected-route",e.currentRoutes.indexOf("customers")==-1&&e.currentRoutes.indexOf("list")>-1&&e.currentRoutes.indexOf("sales")==-1&&e.currentRoutes.indexOf("sale")==-1&&e.currentRoutes.indexOf("sales?status="+e.saleState.Quote)==-1&&e.currentRoutes.indexOf("sales?status="+e.saleState.Invoiced)==-1),s(3),p("routerLink",z(4,Yt))("state",z(5,P))}}var ei=()=>["/task/board"],yt=n=>({status:n}),ti=()=>["/task/report"];function ii(n,a){if(n&1){let e=C();r(0,"ul",9)(1,"li",20),g(2,"span",22),r(3,"span")(4,"a",23),f("click",function(){u(e);let i=c();return _(i.isMobile()?i.isCollapsed=!0:null)}),m(5),l()()(),h(6,Xt,5,6,"li",10),r(7,"li",20),g(8,"span",22),r(9,"span")(10,"a",23),f("click",function(){u(e);let i=c();return _(i.isMobile()?i.isCollapsed=!0:null)}),m(11),l()()()()}if(n&2){let e=c();s(),y("selected-route",e.currentRoutes.indexOf("board")>-1&&(e.currentRoutes.indexOf("status="+e.saleState.Invoiced)>-1||e.currentRoutes.join("").indexOf("INVOICE=")>-1)),s(3),p("routerLink",z(11,ei))("queryParams",$(12,yt,e.saleState.Invoiced)),s(),v(" ",e.isCollapsed?"":"Board"," "),s(),p("appHasPermission",e.appPermissions.ProjectBorardView),s(),y("selected-route",e.currentRoutes.indexOf("report")>-1),s(3),p("routerLink",z(14,ti))("queryParams",$(15,yt,e.saleState.Invoiced)),s(),v(" ",e.isCollapsed?"":"Timeline"," ")}}var ni=()=>["/employee","pay-processing"];function oi(n,a){if(n&1){let e=C();r(0,"li",12),g(1,"span",25),r(2,"span")(3,"a",14),f("click",function(){u(e);let i=c();return _(i.isMobile()?i.isCollapsed=!0:null)}),m(4," Payments "),l()()()}if(n&2){let e=c();y("selected-route",e.currentRoutes.indexOf("pay-processing")>-1),s(3),p("routerLink",z(4,ni))("state",z(5,P))}}var ri=()=>["/team"];function ai(n,a){if(n&1){let e=C();r(0,"li",12),g(1,"span",26),r(2,"span")(3,"a",14),f("click",function(){u(e);let i=c();return _(i.isMobile()?i.isCollapsed=!0:null)}),m(4," Users "),l()()()}if(n&2){let e=c();y("selected-route",e.currentRoutes.indexOf("team")>-1&&e.currentRoutes.indexOf("roles")==-1),s(3),p("routerLink",z(4,ri))("state",z(5,P))}}var si=()=>["/team/roles"];function li(n,a){if(n&1){let e=C();r(0,"li",12),g(1,"span",27),r(2,"span")(3,"a",14),f("click",function(){u(e);let i=c();return _(i.isMobile()?i.isCollapsed=!0:null)}),m(4," Permissions "),l()()()}if(n&2){let e=c();y("selected-route",e.currentRoutes.indexOf("team")>-1&&e.currentRoutes.indexOf("roles")>-1),s(3),p("routerLink",z(4,si))("state",z(5,P))}}function pi(n,a){n&1&&(r(0,"nz-footer"),m(1,"Eleware system \xA92024 Implement By SA3"),l())}function ci(n,a){if(n&1){let e=C();r(0,"span",43),f("click",function(){u(e);let i=c(2);return _(i.isCollapsed=!i.isCollapsed)}),l()}if(n&2){let e=c(2);p("nzType",e.isCollapsed?"menu-unfold":"menu-fold")}}function mi(n,a){n&1&&g(0,"span",44)}function di(n,a){if(n&1){let e=C();r(0,"app-organization-selector",45),f("closeDrawer",function(){u(e);let i=c(2);return _(i.toggleClients())}),l()}if(n&2){let e=c(2);p("visible",e.showClients)}}function ui(n,a){if(n&1){let e=C();r(0,"nz-layout",28)(1,"nz-header")(2,"div",29)(3,"span",30),h(4,ci,1,1,"span",31),l(),r(5,"span",4)(6,"span")(7,"button",32),f("click",function(){u(e);let i=c();return _(i.toggleClients())}),g(8,"nz-avatar",33),m(9),h(10,mi,1,0,"span",34),l(),h(11,di,1,1,"app-organization-selector",35),l(),r(12,"button",36),g(13,"nz-avatar",37)(14,"span",38),l(),r(15,"nz-dropdown-menu",null,39)(17,"ul",40)(18,"li",41),f("click",function(){u(e);let i=c();return _(i.logout())}),m(19,"Logout "),l(),r(20,"li",41),f("click",function(){u(e);let i=c();return _(i.openChangePasswordModal())}),m(21,"Change Password"),l()()()()()(),r(22,"nz-content",42),g(23,"router-outlet"),l()()}if(n&2){let e=F(16),t=c();p("ngClass",t.isMobile()?"height-greater-than-width":""),s(4),p("ngIf",t.isMobile()||!t.isMobile()&&t.isCollapsed),s(),ne("width",t.isMobile()?"100%":"auto"),s(3),p("nzSrc",t.currentClient==null?null:t.currentClient.filename),s(),v(" ",t.currentClient==null?null:t.currentClient.name," "),s(),p("appHasPermission",t.appPermissions.SwitchClients),s(),p("appHasPermission",t.appPermissions.SwitchClients),s(),p("nzDropdownMenu",e),s(),p("nzText",t.getUserInitials(t.loggedInUser.name))}}var _i=()=>["/employee"],Mt=(()=>{let a=class a{constructor(t,i,o,d,S,O,w,M){this.userService=t,this.appService=i,this.fb=o,this.media=d,this.router=S,this.route=O,this.modal=w,this.titleService=M,this.isCollapsed=!1,this.isMobileDevice=!0,this.loggedInUser={},this.sites=[],this.site={},this.showClients=!1,this.currentRoutes=[],this.saleState=Oe,this.appPermissions=B,this.initialLoaded=!0,this.isMobile=this.appService.isMobile,this.siteForm=this.fb.group({site:[]})}ngOnInit(){this.isMobile()&&(this.isCollapsed=!0),this.loggedInUser=this.userService.getUserDetails(),this.appService.getClient(!0),this.organization=this.appService.organization,this.titleService.setTitle(this.organization.name),this.setFavicon(this.organization.icon),this.setProjectsData(),this.onSiteChange(),this.extractRoutePath(this.router.url),this.router.events.pipe(te(i=>i instanceof ve)).subscribe(i=>{this.currentUrl=i.url,this.extractRoutePath(this.currentUrl)})}setFavicon(t){let i=document.querySelector("link[rel*='icon']")||document.createElement("link");i.type="image/png",i.rel="shortcut icon",i.href=t,document.getElementsByTagName("head")[0].appendChild(i)}extractRoutePath(t){t=t.replace(/(https?:\/\/[^\/]+)?\/?/,""),this.currentRoutes=t.split(/[/?]/).filter(i=>i),console.log(this.currentRoutes)}toggleClients(){this.showClients=!this.showClients}onSiteChange(){this.siteSubscription=this.siteForm.valueChanges.subscribe(t=>{this.setCurrentSite(t.site)}),this.clientSubscription=this.appService.currentClient.subscribe(t=>{t&&t.id>0&&this.currentOrganizationId!=t.id&&(this.currentClient=t,this.currentOrganizationId=t.id)})}setProjectsData(){return T(this,null,function*(){let t=yield this.appService.getAndSetProjects(),i=t&&t.length?t.map(o=>X({label:o.name},o)):[];this.sites=[...i],this.appService.setProjects(this.sites),this.siteForm.patchValue({site:this.sites[0]}),this.setCurrentSite(void 0)})}setCurrentSite(t){this.appService.setCurrentSite(t||this.sites[0])}logout(){this.userService.logout(),this.appService.setClient({id:0,name:""})}ngOnDestroy(){this.siteSubscription&&this.siteSubscription.unsubscribe(),this.clientSubscription&&this.clientSubscription.unsubscribe()}getUserInitials(t){return t.trim().split(" ").map(d=>d.charAt(0)).join("").toUpperCase()}openChangePasswordModal(){this.modal.create({nzTitle:"Change Password ("+this.userService.loggedInUser.name+")",nzContent:xt,nzFooter:null,nzData:{user:this.userService.loggedInUser}}).afterClose.subscribe(i=>{i&&console.log("Password changed",i)})}};a.\u0275fac=function(i){return new(i||a)(x(Te),x(L),x(G),x(Ie),x(ye),x(Se),x(Fe),x(be))},a.\u0275cmp=k({type:a,selectors:[["app-shell"]],decls:25,vars:24,consts:[[1,"app-shell"],[2,"height","100%"],["nzCollapsible","",1,"appbackground",3,"nzCollapsed","nzTrigger","nzWidth","nzCollapsedWidth","nzCollapsedChange"],[2,"display","flow-root"],[1,"flex","center","space-between"],["alt","",3,"src"],["class","heading",4,"ngIf"],["class","trigger","nz-icon","",3,"nzType","class","click",4,"ngIf"],[1,"sideMenuItems"],["nz-menu","","nzTheme","dark","nzMode","inline"],["nz-menu-item","",3,"selected-route",4,"appHasPermission"],["nz-menu","","nzTheme","dark","nzMode","inline",4,"appHasPermission"],["nz-menu-item","",2,"margin-top","12px"],["nz-icon","","nzType","profile","size","",2,"font-size","18px"],[1,"nav-link",3,"routerLink","state","click"],["nz-menu-item","","style","margin-top: 12px;",3,"selected-route",4,"appHasPermission"],[4,"ngIf"],["class","appbackground",3,"ngClass",4,"ngIf"],[1,"heading"],["nz-icon","",1,"trigger",3,"nzType","click"],["nz-menu-item",""],["nz-icon","","nzType","bar-chart",2,"font-size","18px"],["nz-icon","","nzType","file-done",2,"font-size","18px"],[1,"nav-link",3,"routerLink","queryParams","click"],["nz-icon","","nzType","pull-request",2,"font-size","18px"],["nz-icon","","nzType","schedule","size","",2,"font-size","18px"],["nz-icon","","nzType","team","size","",2,"font-size","18px"],["nz-icon","","nzType","sliders","size","",2,"font-size","18px"],[1,"appbackground",3,"ngClass"],[1,"flex","space-between","center",2,"flex-wrap","wrap"],[1,"flex","center"],["class","trigger","nz-icon","","style","font-size: 18px;",3,"nzType","click",4,"ngIf"],["nz-button","",1,"header-button",2,"color","#836d89","font-size","12px",3,"click"],[2,"width","24px","height","24px","margin-right","5px",3,"nzSrc"],["nz-icon","","style","font-size: 12px;","nzType","down",4,"appHasPermission"],[3,"visible","closeDrawer",4,"appHasPermission"],["nz-button","","nzType","text","nz-dropdown","",1,"userbtn",3,"nzDropdownMenu"],[2,"background-color","#BB86FC","font-size","12px","margin-right","5px",3,"nzText"],["nz-icon","","nzType","down",2,"font-size","12px","color","black"],["menu1","nzDropdownMenu"],["nz-menu",""],["nz-menu-item","","nz-button","","nzType","text",3,"click"],[1,"content-main"],["nz-icon","",1,"trigger",2,"font-size","18px",3,"nzType","click"],["nz-icon","","nzType","down",2,"font-size","12px"],[3,"visible","closeDrawer"]],template:function(i,o){i&1&&(r(0,"div",0)(1,"nz-layout",1)(2,"nz-sider",2),R("nzCollapsedChange",function(S){return j(o.isCollapsed,S)||(o.isCollapsed=S),S}),r(3,"span",3)(4,"div")(5,"span",4),g(6,"img",5),h(7,Zt,2,1,"span",6),l(),h(8,$t,1,3,"span",7),l()(),r(9,"div",8)(10,"ul",9),h(11,Qt,5,7,"li",10),l(),h(12,ii,12,17,"ul",11),r(13,"ul",9)(14,"li",12),g(15,"span",13),r(16,"span")(17,"a",14),f("click",function(){return o.isMobile()?o.isCollapsed=!0:null}),m(18," Employee "),l()()(),h(19,oi,5,6,"li",15),l(),r(20,"ul",9),h(21,ai,5,6,"li",15)(22,li,5,6,"li",15),l()(),h(23,pi,2,0,"nz-footer",16),l(),h(24,ui,24,10,"nz-layout",17),l()()),i&2&&(s(2),D("nzCollapsed",o.isCollapsed),p("nzTrigger",null)("nzWidth",!o.isCollapsed&&o.isMobile()?"100%":"200px")("nzCollapsedWidth",65),s(2),oe((o.isCollapsed,"padding-left:12px")),Z(o.isCollapsed?"logo flex center space-around":"logo flex center space-between"),s(2),p("src",o.organization?o.organization.icon:"../../../assets/veins-ico.png",E),s(),p("ngIf",!o.isCollapsed),s(),p("ngIf",!o.isCollapsed&&o.isMobile()),s(3),p("appHasPermission",o.appPermissions.MainDashboard),s(),p("appHasPermission",o.appPermissions.AddUpdateTask),s(2),y("selected-route",o.currentRoutes.indexOf("employee")>-1&&o.currentRoutes.indexOf("worklog")===-1&&o.currentRoutes.indexOf("pay-processing")===-1),s(3),p("routerLink",z(22,_i))("state",z(23,P)),s(2),p("appHasPermission",o.appPermissions.AddUpdatePayments),s(2),p("appHasPermission",o.appPermissions.ViewUsers),s(),p("appHasPermission",o.appPermissions.UpdatePermissions),s(),p("ngIf",!o.isCollapsed),s(),p("ngIf",!o.isMobile()||o.isCollapsed&&o.isMobile()))},dependencies:[fe,A,we,Me,Ge,W,H,q,U,Ze,Je,$e,Qe,Ke,ct,lt,at,st,pt,J,wt],styles:[".trigger[_ngcontent-%COMP%]{font-size:18px;line-height:50px;padding:0 16px;margin-top:3px;cursor:pointer;transition:color .3s}.ant-layout-header[_ngcontent-%COMP%]{line-height:42px;height:42px;border-bottom:.1px solid #80808017}.header-text[_ngcontent-%COMP%]{letter-spacing:2px;text-transform:uppercase;margin:auto}.logo[_ngcontent-%COMP%]{height:32px;margin-top:5px;margin-bottom:5px!important;padding-left:24px}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:24px;width:24px}.sideMenuItems[_ngcontent-%COMP%]{overflow:auto;height:calc(100% - 56px);background:#21263c}.ant-menu-inline[_ngcontent-%COMP%]{background:inherit!important}  .ant-menu-submenu-title{margin-bottom:0!important;margin-top:0!important;padding-top:5px;padding-bottom:5px}.ant-menu-item[_ngcontent-%COMP%]:hover, .ant-menu-submenu[_ngcontent-%COMP%]:hover{background:#343434;color:#c9c6c6}.ant-menu-item[_ngcontent-%COMP%], .ant-menu-submenu[_ngcontent-%COMP%]{margin:0 8px!important;width:auto!important;border-radius:8px;padding-left:12px!important;font-size:12px!important;height:32px}.ant-menu-item-selected[_ngcontent-%COMP%]{background:inherit!important}.selected-route[_ngcontent-%COMP%]{background:#bb86fc!important}ul[_ngcontent-%COMP%]{padding-top:5px;padding-bottom:5px}.height-greater-than-width[_ngcontent-%COMP%]   .ant-layout-header[_ngcontent-%COMP%]{height:auto!important;line-height:22px;padding-bottom:5px}@media (max-width: 600px){.sideMenuItems[_ngcontent-%COMP%]{overflow:auto;height:calc(100% - 72px)}.ant-layout-header[_ngcontent-%COMP%]{height:72px;line-height:22px}  .ant-menu-submenu-title{margin-bottom:0!important;margin-top:0!important;min-height:60px;padding-top:10px}.selected-route[_ngcontent-%COMP%]{background:#bb86fc!important}.ant-menu-item[_ngcontent-%COMP%], .ant-menu-submenu[_ngcontent-%COMP%]{border-bottom:1px solid #343434;margin:0!important;font-size:16px!important;min-height:60px;padding-top:10px;padding-left:20px!important;border-radius:0!important}.anticon[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{line-height:1;font-size:16px!important}.trigger[_ngcontent-%COMP%]{line-height:33px;margin-top:3px}.logo[_ngcontent-%COMP%]{margin-top:20px!important;margin-bottom:20px!important;margin:0;padding-left:24px}}.trigger[_ngcontent-%COMP%]:hover{color:#1890ff}nz-header[_ngcontent-%COMP%]{padding:0}nz-content[_ngcontent-%COMP%]{background:#fff;padding:6px;overflow:auto}nz-breadcrumb[_ngcontent-%COMP%]{margin:16px 0}.inner-content[_ngcontent-%COMP%]{padding:24px;min-height:360px}nz-footer[_ngcontent-%COMP%]{padding:5px;color:#fff;font-size:9px;background:inherit;position:absolute;bottom:0;width:100%}.app-shell[_ngcontent-%COMP%], app-shell[_ngcontent-%COMP%]{width:100%!important}.userbtn[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px;padding:0!important;color:#fff}.full-width[_ngcontent-%COMP%]{width:100%!important}.nav-link[_ngcontent-%COMP%]{color:#fff}.lightFont[_ngcontent-%COMP%]{color:#fff!important}.heading[_ngcontent-%COMP%]{font-family:revert;color:#fff;font-weight:800;font-size:16px;white-space:pre;letter-spacing:.4em}"]});let n=a;return n})();var gi=[{path:"",component:Mt,children:[{path:"",loadChildren:()=>import("./chunk-QD7CKUQJ.js").then(n=>n.DashboardModule),data:{name:"Dashboard"}},{path:"team",loadChildren:()=>import("./chunk-2S5JO3FB.js").then(n=>n.TeamModule),data:{name:"Team"}},{path:"sites",loadChildren:()=>import("./chunk-7MAQCR5P.js").then(n=>n.ProjectsModule),data:{name:"Projects"}},{path:"task",loadChildren:()=>import("./chunk-OEZLOADA.js").then(n=>n.TaskModule),data:{name:"Task"}},{path:"project",loadChildren:()=>import("./chunk-FWKDRTRA.js").then(n=>n.ProjectModule),data:{name:"Project"}},{path:"inventory",loadChildren:()=>import("./chunk-CVRPH26I.js").then(n=>n.InventoryManagementModule),data:{name:"Inventory"}},{path:"employee",loadChildren:()=>import("./chunk-Z24YLL27.js").then(n=>n.EmployeeManagementModule),data:{name:"Employee"}}]}],Ot=(()=>{let a=class a{};a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=V({type:a}),a.\u0275inj=N({imports:[K.forChild(gi),K]});let n=a;return n})();ge(vt);var Pt=ke,hi=Object.keys(Pt).map(n=>Pt[n]),Cn=(()=>{let a=class a{};a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=V({type:a}),a.\u0275inj=N({providers:[{provide:Ee,useValue:Ne},{provide:Ve,useValue:hi}],imports:[Ce,He,ze,xe,qe,Ot,zt,St]});let n=a;return n})();export{Cn as a};