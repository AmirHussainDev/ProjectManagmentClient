import{a as ye,b as be,c as ge}from"./chunk-PYMJPE53.js";import{$ as h,Ab as k,Ba as M,Bb as W,Ca as R,Ea as xe,Ec as Ue,Fb as De,Ga as ve,Gb as Te,Hb as te,Ib as ie,J as p,K as w,Nb as Ee,P as _,Q as c,Rb as Ve,Sb as Me,Tb as ne,Ub as oe,Vb as re,Xa as ze,Xb as ae,Yb as se,Z as a,Za as K,_ as s,_a as H,aa as B,ab as we,ba as $,bb as Se,ca as g,da as C,db as F,ea as l,eb as T,fb as I,gb as J,ia as O,ja as d,jb as Q,ka as D,kc as Re,la as G,lb as X,lc as Fe,na as x,nc as le,oa as v,ob as Y,pa as y,pb as ee,pc as Ie,q as he,qa as j,qc as me,r as E,rb as Ne,s as L,sb as Oe,sc as Pe,ta as q,tb as P,tc as pe,ua as Z,v as u,vc as ce,w as f,wa as V,wc as de,xc as _e,yc as ue,z as A,zb as U}from"./chunk-R4PMELZD.js";import"./chunk-NFQMHT45.js";import{a as S,b as Ce,g as b}from"./chunk-MON7YFGF.js";function Ye(i,o){if(i&1&&h(0,"nz-option",13),i&2){let t=o.$implicit;c("nzValue",t==null?null:t.id)("nzLabel",t==null?null:t.name)}}function et(i,o){if(i&1&&(a(0,"nz-select",12),_(1,Ye,1,2,"nz-option",10),s()),i&2){let t=l(2);p(),c("ngForOf",t.users)}}function tt(i,o){if(i&1&&h(0,"nz-option",13),i&2){let t=o.$implicit;c("nzValue",t==null?null:t.value)("nzLabel",t==null?null:t.key)}}function it(i,o){if(i&1&&h(0,"nz-option",13),i&2){let t=o.$implicit;c("nzValue",t.id)("nzLabel",t.name)}}function nt(i,o){if(i&1&&(a(0,"nz-select",14),_(1,it,1,2,"nz-option",10),s()),i&2){let t=l(2);p(),c("ngForOf",t.subOrganizations)}}function ot(i,o){if(i&1&&(a(0,"nz-form",3)(1,"div",4)(2,"div",5)(3,"nz-form-item")(4,"nz-form-label"),d(5,"Name"),s(),a(6,"nz-form-control"),h(7,"input",6),s()()()(),a(8,"div",4)(9,"div",7)(10,"nz-form-item")(11,"nz-form-label"),d(12,"Reports To"),s(),a(13,"nz-form-control"),_(14,et,2,1,"nz-select",8),s()()()(),a(15,"div",4)(16,"div",5)(17,"nz-form-item")(18,"nz-form-label"),d(19,"Role Name"),s(),a(20,"nz-form-control")(21,"nz-select",9),_(22,tt,1,2,"nz-option",10),s()()()()(),a(23,"div",4)(24,"div",7)(25,"nz-form-item")(26,"nz-form-label"),d(27,"Organization "),s(),a(28,"nz-form-control"),_(29,nt,2,1,"nz-select",11),s()()()()()),i&2){let t=l();c("formGroup",t.userForm),p(),c("nzGutter",8),p(7),c("nzGutter",8),p(6),c("ngIf",t.users.length),p(),c("nzGutter",8),p(7),c("ngForOf",t.userRoles),p(),c("nzGutter",8),p(6),c("ngIf",t.subOrganizations.length)}}function rt(i,o){if(i&1){let t=g();a(0,"div",15)(1,"button",16),C("click",function(){u(t);let n=l();return f(n.close())}),d(2,"Cancel"),s(),a(3,"button",17),C("click",function(){u(t);let n=l();return f(n.addUser())}),d(4,"Submit"),s()()}if(i&2){let t=l();p(3),c("disabled",!t.userForm.valid)}}var at=()=>({overflow:"auto"}),Ge=(()=>{let o=class o{constructor(e,n){this.userService=e,this.fb=n,this.visible=!1,this.users=[],this.userRoles=[],this.subOrganizations=[],this.closeDrawer=new he,this.userForm=this.fb.group({name:["",[T.required]],reports_to:[0,[T.required]],role:[null,[T.required]],sub_organization_id:[null,[T.required]],organization_id:[parseInt(localStorage.getItem("organization_id")||"0")],password:["p@ssw0rD"]})}ngOnInit(){}close(){this.closeDrawer.emit(!1)}addUser(){return b(this,null,function*(){console.log(this.userForm),yield this.userService.createUser(this.userForm.value),this.closeDrawer.emit(!0)})}objectKeys(e){return Object.keys(e).map(n=>({key:n,value:e[n]}))}};o.\u0275fac=function(n){return new(n||o)(w(K),w(ee))},o.\u0275cmp=E({type:o,selectors:[["app-create-user-drawer"]],inputs:{visible:"visible",users:"users",userRoles:"userRoles",subOrganizations:"subOrganizations"},outputs:{closeDrawer:"closeDrawer"},decls:4,vars:6,consts:[["nzTitle","Create",3,"nzBodyStyle","nzMaskClosable","nzWidth","nzVisible","nzFooter","nzOnClose"],[3,"formGroup",4,"nzDrawerContent"],["footerTpl",""],[3,"formGroup"],["nz-row","",3,"nzGutter"],["nz-col","","nzSpan","12"],["formControlName","name","nz-input","","placeholder","please enter user name"],["nz-col","","nz-col","","nzSpan","12"],["id","reports_to","formControlName","reports_to","placeholder","Select user",4,"ngIf"],["id","role","formControlName","role","placeholder","Select role"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],["id","sub_organization_id","formControlName","sub_organization_id","placeholder","Select Organization",4,"ngIf"],["id","reports_to","formControlName","reports_to","placeholder","Select user"],[3,"nzValue","nzLabel"],["id","sub_organization_id","formControlName","sub_organization_id","placeholder","Select Organization"],[2,"float","right"],["nz-button","",2,"margin-right","8px",3,"click"],["nz-button","","nzType","primary",3,"disabled","click"]],template:function(n,r){if(n&1&&(a(0,"nz-drawer",0),C("nzOnClose",function(){return r.close()}),_(1,ot,30,8,"nz-form",1)(2,rt,5,1,"ng-template",null,2,V),s()),n&2){let m=O(3);c("nzBodyStyle",j(5,at))("nzMaskClosable",!1)("nzWidth",720)("nzVisible",r.visible)("nzFooter",m)}},dependencies:[M,R,W,U,k,Me,Ve,oe,ne,re,se,ae,P,te,ie,F,I,J,X,Y]});let i=o;return i})();function ct(i,o){if(i&1){let t=g();a(0,"app-create-user-drawer",6),C("closeDrawer",function(n){u(t);let r=l();return f(r.close(n))}),s()}if(i&2){let t=l();c("subOrganizations",t.subOrganizations)("visible",t.visible)("userRoles",t.userRoles)("users",t.listOfData)}}function dt(i,o){if(i&1&&(a(0,"th",7),d(1),s()),i&2){let t=o.$implicit;c("nzSortFn",t.compare)("nzSortPriority",t.priority),p(),G(" ",t.title," ")}}function _t(i,o){if(i&1){let t=g();B(0),a(1,"td"),d(2),s(),a(3,"td"),d(4),s(),a(5,"td"),d(6),s(),a(7,"td"),d(8),s(),a(9,"td")(10,"a",10),C("click",function(){u(t);let n=l().$implicit,r=l();return f(r.startEdit(n.id))}),d(11,"Edit"),s()(),$()}if(i&2){let t=l().$implicit;p(2),D(t.name),p(2),D(t.reportTo),p(2),D(t.roleName),p(2),D(t.sub_organization)}}function ut(i,o){if(i&1&&h(0,"nz-option",18),i&2){let t=o.$implicit;c("nzValue",t==null?null:t.id)("nzLabel",t==null?null:t.name)}}function ft(i,o){if(i&1){let t=g();a(0,"nz-select",17),y("ngModelChange",function(n){u(t);let r=l(2).$implicit,m=l();return v(m.editCache[r.id].data.reports_to,n)||(m.editCache[r.id].data.reports_to=n),f(n)}),_(1,ut,1,2,"nz-option",14),s()}if(i&2){let t=l(2).$implicit,e=l();x("ngModel",e.editCache[t.id].data.reports_to),p(),c("ngForOf",e.listOfData)}}function Ct(i,o){if(i&1&&h(0,"nz-option",18),i&2){let t=o.$implicit;c("nzValue",t==null?null:t.value)("nzLabel",t==null?null:t.key)}}function zt(i,o){if(i&1&&h(0,"nz-option",18),i&2){let t=o.$implicit;c("nzValue",(t==null?null:t.value)||0)("nzLabel",(t==null?null:t.key)||"")}}function gt(i,o){if(i&1){let t=g();a(0,"td")(1,"input",11),y("ngModelChange",function(n){u(t);let r=l().$implicit,m=l();return v(m.editCache[r.id].data.name,n)||(m.editCache[r.id].data.name=n),f(n)}),s()(),a(2,"td"),_(3,ft,2,2,"nz-select",12),s(),a(4,"td")(5,"nz-select",13),y("ngModelChange",function(n){u(t);let r=l().$implicit,m=l();return v(m.editCache[r.id].data.role_id,n)||(m.editCache[r.id].data.role_id=n),f(n)}),_(6,Ct,1,2,"nz-option",14),s()(),a(7,"td")(8,"nz-select",13),y("ngModelChange",function(n){u(t);let r=l().$implicit,m=l();return v(m.editCache[r.id].data.sub_organization_id,n)||(m.editCache[r.id].data.sub_organization_id=n),f(n)}),_(9,zt,1,2,"nz-option",14),s()(),a(10,"td")(11,"a",15),C("click",function(){u(t);let n=l().$implicit,r=l();return f(r.saveEdit(n.id))}),d(12,"Save"),s(),d(13," \xA0 "),a(14,"a",16),C("nzOnConfirm",function(){u(t);let n=l().$implicit,r=l();return f(r.cancelEdit(n.id))}),d(15,"Cancel"),s()()}if(i&2){let t=l().$implicit,e=l();p(),x("ngModel",e.editCache[t.id].data.name),p(2),c("ngIf",e.listOfData.length),p(2),x("ngModel",e.editCache[t.id].data.role_id),p(),c("ngForOf",e.userRoles),p(2),x("ngModel",e.editCache[t.id].data.sub_organization_id),p(),c("ngForOf",e.subOrganizations)}}function ht(i,o){if(i&1&&(a(0,"tr"),_(1,_t,12,4,"ng-container",8)(2,gt,16,6,"ng-template",null,9,V),s()),i&2){let t=o.$implicit,e=O(3),n=l();p(),c("ngIf",!(n.editCache[t.id]!=null&&n.editCache[t.id].edit))("ngIfElse",e)}}var je=(()=>{let o=class o{constructor(e,n){this.userService=e,this.appService=n,this.listOfColumn=[{title:"Name",compare:(r,m)=>r.name.localeCompare(m.name),priority:!1},{title:"Reports To",compare:(r,m)=>r.reports_to-m.reports_to,priority:2},{title:"Role Name",compare:(r,m)=>r.role_id-m.role_id,priority:3},{title:"Sub Organization",compare:(r,m)=>r.sub_organization_id-m.sub_organization_id,priority:3},{title:"Action",compare:(r,m)=>r.role_id-m.role_id,priority:3}],this.listOfData=[],this.visible=!1,this.editCache={}}ngOnInit(){this.populateUserData()}open(){this.visible=!0}close(e=!1){this.visible=!1,e&&this.populateUserData()}populateUserData(){return b(this,null,function*(){this.listOfData=yield this.userService.getOrganizationUsers(),this.userRoles=yield this.appService.getRoles(),this.subOrganizations=yield this.appService.getSubOrganizations(),this.userRoles=this.userRoles.map(e=>({key:e.role_name,value:e.id})),this.subOrganizations=this.subOrganizations.map(e=>Ce(S({},e),{key:e.name,value:e.id})),this.mapUserData(),this.updateEditCache()})}mapUserData(){console.log("userRoles",this.userRoles),this.listOfData=this.listOfData.map(e=>{let n="",r=this.userRoles.find(N=>e.role.id===N.value),m=this.listOfData.find(N=>N.id==e.reports_to);e.reports_to=m?.id,e.role_id=r?.value;let z=this.subOrganizations.find(N=>N.id===parseInt(e.sub_organization_id.toString()));return e.sub_organization_id=z?.id,Ce(S({},e),{sub_organization:z?.name,roleName:r?.key,reportTo:this.listOfData.find(N=>N.id==e.reports_to)?.name})})}startEdit(e){this.editCache[e].edit=!0}cancelEdit(e){let n=this.listOfData.findIndex(r=>r.id===e);this.editCache[e]={data:S({},this.listOfData[n]),edit:!1}}saveEdit(e){return b(this,null,function*(){let n=this.listOfData.findIndex(r=>r.id===e);yield this.userService.updateUser({id:e,organization_id:this.editCache[e].data.organization_id,role_id:this.editCache[e].data.role_id,reports_to:this.editCache[e].data.reports_to,name:this.editCache[e].data.name}),this.editCache[e].edit=!1,Object.assign(this.listOfData[n],this.editCache[e].data),this.populateUserData()})}updateEditCache(){this.listOfData.forEach(e=>{this.editCache[e.id]={edit:!1,data:S({},e)}})}};o.\u0275fac=function(n){return new(n||o)(w(K),w(H))},o.\u0275cmp=E({type:o,selectors:[["app-users"]],decls:11,vars:4,consts:[["nz-button","","nzType","primary",3,"click"],[3,"subOrganizations","visible","userRoles","users","closeDrawer",4,"ngIf"],["nzTableLayout","fixed",3,"nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[3,"subOrganizations","visible","userRoles","users","closeDrawer"],[3,"nzSortFn","nzSortPriority"],[4,"ngIf","ngIfElse"],["editTemplate",""],[3,"click"],["type","text","nz-input","",3,"ngModel","ngModelChange"],["id","reports_to","placeholder","Select user",3,"ngModel","ngModelChange",4,"ngIf"],["id","role_id","placeholder","Select role",3,"ngModel","ngModelChange"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"],["id","reports_to","placeholder","Select user",3,"ngModel","ngModelChange"],[3,"nzValue","nzLabel"]],template:function(n,r){if(n&1&&(a(0,"button",0),C("click",function(){return r.open()}),d(1,"Add"),s(),_(2,ct,1,4,"app-create-user-drawer",1),a(3,"nz-table",2,3)(6,"thead")(7,"tr"),_(8,dt,2,3,"th",4),s()(),a(9,"tbody"),_(10,ht,4,2,"tr",5),s()()),n&2){let m=O(5);p(2),c("ngIf",r.visible),p(),c("nzData",r.listOfData),p(5),c("ngForOf",r.listOfColumn),p(2),c("ngForOf",m.data)}},dependencies:[M,R,W,U,k,P,le,te,ie,de,Pe,me,pe,ue,ce,_e,F,I,Q,Ge]});let i=o;return i})();function xt(i,o){if(i&1&&(a(0,"nz-form",7)(1,"nz-form-item")(2,"nz-form-label",8),d(3,"Role Name"),s(),a(4,"nz-form-control",9),h(5,"input",10),s()()()),i&2){let t=l();c("formGroup",t.addRoleForm)}}function vt(i,o){if(i&1&&(a(0,"th"),d(1),s()),i&2){let t=o.$implicit,e=l();p(),G(" ",e.permissionNames[t.value],"")}}function yt(i,o){if(i&1){let t=g();a(0,"td")(1,"label",14),y("ngModelChange",function(n){let m=u(t).$implicit,z=l(2).$implicit;return v(z.role_permissions[m.value],n)||(z.role_permissions[m.value]=n),f(n)}),s()()}if(i&2){let t=o.$implicit,e=l(2).$implicit;p(),x("ngModel",e.role_permissions[t.value])}}function bt(i,o){if(i&1){let t=g();B(0),a(1,"td",5),d(2),s(),_(3,yt,2,1,"td",6),q(4,"keyvalue"),a(5,"td")(6,"a",13),C("click",function(){u(t);let n=l().$implicit,r=l();return f(r.startEdit(n.id))}),d(7,"Edit"),s()(),$()}if(i&2){let t=l().$implicit,e=l();p(2),D(t.role_name),p(),c("ngForOf",Z(4,2,e.appPermissions))}}function wt(i,o){if(i&1){let t=g();a(0,"td")(1,"label",18),y("ngModelChange",function(n){let m=u(t).$implicit,z=l(2).$implicit;return v(z.role_permissions[m.value],n)||(z.role_permissions[m.value]=n),f(n)}),s()()}if(i&2){let t=o.$implicit,e=l(2).$implicit;p(),x("ngModel",e.role_permissions[t.value])}}function St(i,o){if(i&1){let t=g();a(0,"td")(1,"input",15),y("ngModelChange",function(n){u(t);let r=l().$implicit,m=l();return v(m.editCache[r.id].data.role_name,n)||(m.editCache[r.id].data.role_name=n),f(n)}),s()(),_(2,wt,2,1,"td",6),q(3,"keyvalue"),a(4,"td")(5,"a",16),C("click",function(){u(t);let n=l().$implicit,r=l();return f(r.saveEdit(n.id))}),d(6,"Save"),s(),d(7," \xA0 "),a(8,"a",17),C("nzOnConfirm",function(){u(t);let n=l().$implicit,r=l();return f(r.cancelEdit(n.id))}),d(9,"Cancel"),s()()}if(i&2){let t=l().$implicit,e=l();p(),x("ngModel",e.editCache[t.id].data.role_name),p(),c("ngForOf",Z(3,2,e.appPermissions))}}function Nt(i,o){if(i&1&&(a(0,"tr"),_(1,bt,8,4,"ng-container",11)(2,St,10,4,"ng-template",null,12,V),s()),i&2){let t=o.$implicit,e=O(3),n=l();p(),c("ngIf",!(n.editCache[t.id]!=null&&n.editCache[t.id].edit))("ngIfElse",e)}}var Ot=()=>({x:"1000px"}),qe=(()=>{let o=class o{constructor(e,n){this.fb=e,this.appService=n,this.isModalVisible=!1,this.defuaultpermissions=ge,this.permissionNames=be,this.appPermissions=ye,this.rolePermissions={},this.editCache={},this.addRoleForm=this.fb.group({role_name:["",[T.required]],organization_id:[localStorage.getItem("organization_id")],role_permissions:[ge]})}ngOnInit(){this.getAndSetRolesPermission()}getAndSetRolesPermission(){return b(this,null,function*(){this.roles=yield this.appService.getRolesAndPermissions(),this.updateEditCache()})}handleCancel(){this.isModalVisible=!1}showModal(){this.isModalVisible=!0}handleOk(){return b(this,null,function*(){yield this.appService.createRole(this.addRoleForm.value),this.isModalVisible=!1,this.getAndSetRolesPermission()})}startEdit(e){this.editCache[e].edit=!0}cancelEdit(e){let n=this.roles.findIndex(r=>r.id.toString()===e);this.editCache[e]={data:S({},this.roles[n]),edit:!1}}saveEdit(e){return b(this,null,function*(){let n=this.roles.findIndex(r=>r.id.toString()===e);yield this.appService.updateRole({id:e,role_permissions:this.editCache[e].data.role_permissions,role_name:this.editCache[e].data.role_name}),this.editCache[e].edit=!1,Object.assign(this.roles[n],this.editCache[e].data)})}updateEditCache(){this.roles.forEach(e=>{this.editCache[e.id]={edit:!1,data:S({},e)}})}};o.\u0275fac=function(n){return new(n||o)(w(ee),w(H))},o.\u0275cmp=E({type:o,selectors:[["app-role-permissions"]],decls:19,vars:8,consts:[["nz-button","","nzType","primary",3,"click"],["nzTitle","Add Role",3,"nzVisible","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],[3,"nzData","nzScroll"],["editRowTable","","fixedTable",""],["nzLeft",""],[4,"ngFor","ngForOf"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input role name"],["nz-input","","formControlName","role_name"],[4,"ngIf","ngIfElse"],["editTemplate",""],[3,"click"],["nz-checkbox","","disabled","",3,"ngModel","ngModelChange"],["type","text","nz-input","",3,"ngModel","ngModelChange"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"],["nz-checkbox","",3,"ngModel","ngModelChange"]],template:function(n,r){n&1&&(a(0,"div")(1,"button",0),C("click",function(){return r.showModal()}),d(2,"Add Role"),s()(),a(3,"nz-modal",1),y("nzVisibleChange",function(z){return v(r.isModalVisible,z)||(r.isModalVisible=z),z}),C("nzOnCancel",function(){return r.handleCancel()})("nzOnOk",function(){return r.handleOk()}),_(4,xt,6,1,"nz-form",2),s(),a(5,"div")(6,"nz-table",3,4)(9,"thead")(10,"tr")(11,"th",5),d(12,"Role Name"),s(),_(13,vt,2,1,"th",6),q(14,"keyvalue"),a(15,"th"),d(16,"Actions"),s()()(),a(17,"tbody"),_(18,Nt,4,2,"tr",6),s()()()),n&2&&(p(3),x("nzVisible",r.isModalVisible),p(3),c("nzData",r.roles)("nzScroll",j(7,Ot)),p(7),c("ngForOf",Z(14,5,r.appPermissions)),p(5),c("ngForOf",r.roles))},dependencies:[M,R,W,U,k,Ee,oe,ne,re,se,ae,P,Fe,Re,le,de,me,pe,ue,ce,_e,Ie,F,I,J,X,Y,Q,xe]});let i=o;return i})();var Dt=[{path:"",component:je,data:{name:"Users"}},{path:"roles",component:qe,data:{name:"Roles"}}],Ze=(()=>{let o=class o{};o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=L({type:o}),o.\u0275inj=A({imports:[ze.forChild(Dt),ze]});let i=o;return i})();var Ke=we,Tt=Object.keys(Ke).map(i=>Ke[i]),si=(()=>{let o=class o{};o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=L({type:o}),o.\u0275inj=A({providers:[{provide:Te,useValue:De},{provide:Se,useValue:Tt}],imports:[ve,Ze,Ue,Oe,Ne]});let i=o;return i})();export{si as TeamModule};
