import{a as We}from"./chunk-WNMHJVN4.js";import{a as fe,b as ze,c as oe}from"./chunk-PYMJPE53.js";import{$ as o,$a as j,Ac as Ae,Bb as O,Bc as Ge,Ca as E,Cb as F,Cc as je,Da as D,Db as T,Fa as ue,Ha as _e,Hb as be,Ib as Se,Ic as qe,Jb as ye,K as m,Kb as we,L as g,Pb as K,Q as _,Qb as Ne,R as l,Rb as Ee,Tb as De,Ub as Oe,Vb as J,Wb as Q,X as ae,Xb as Y,Y as le,Ya as re,Z as me,Zb as ee,_ as s,_a as G,_b as te,aa as C,bb as Ce,cb as he,da as x,db as q,ea as f,fa as d,fb as W,gb as z,hb as B,ib as X,ja as N,ka as p,la as R,lb as ve,ma as U,nb as L,oa as P,oc as Fe,pa as k,pc as Te,q as se,qa as M,qb as $,qc as Re,r as w,ra as ce,rb as H,rc as Ue,s as I,sc as Ie,tb as ge,ua as pe,ub as xe,uc as Ve,v as h,va as de,vb as Z,w as v,wc as Pe,xa as A,xc as ke,z as V,zc as Me}from"./chunk-3TINHIPJ.js";import"./chunk-NFQMHT45.js";import{a as y,b as ne,g as b}from"./chunk-MON7YFGF.js";function ot(i,n){if(i&1&&C(0,"nz-option",17),i&2){let t=n.$implicit;l("nzValue",t==null?null:t.id)("nzLabel",t==null?null:t.name)}}function st(i,n){if(i&1&&(s(0,"nz-select",16),_(1,ot,1,2,"nz-option",10),o()),i&2){let t=d(2);m(),l("ngForOf",t.users)}}function at(i,n){if(i&1&&C(0,"nz-option",17),i&2){let t=n.$implicit;l("nzValue",t==null?null:t.value)("nzLabel",t==null?null:t.key)}}function lt(i,n){if(i&1&&C(0,"nz-option",17),i&2){let t=n.$implicit;l("nzValue",t.id)("nzLabel",t.name)}}function mt(i,n){if(i&1&&(s(0,"nz-select",18),_(1,lt,1,2,"nz-option",10),o()),i&2){let t=d(2);m(),l("ngForOf",t.subOrganizations)}}function ct(i,n){if(i&1&&(s(0,"nz-form",3)(1,"div",4)(2,"div",5)(3,"nz-form-item")(4,"nz-form-label"),p(5,"Name"),o(),s(6,"nz-form-control"),C(7,"input",6),o()()()(),s(8,"div",4)(9,"div",7)(10,"nz-form-item")(11,"nz-form-label"),p(12,"Reports To"),o(),s(13,"nz-form-control"),_(14,st,2,1,"nz-select",8),o()()()(),s(15,"div",4)(16,"div",5)(17,"nz-form-item")(18,"nz-form-label"),p(19,"Role Name"),o(),s(20,"nz-form-control")(21,"nz-select",9),_(22,at,1,2,"nz-option",10),o()()()()(),s(23,"div",4)(24,"div",7)(25,"nz-form-item")(26,"nz-form-label"),p(27,"Organization "),o(),s(28,"nz-form-control"),_(29,mt,2,1,"nz-select",11),o()()()(),s(30,"div",4)(31,"div",7)(32,"nz-form-item")(33,"nz-form-label"),p(34,"Email "),o(),s(35,"nz-form-control"),C(36,"input",12),o()()()(),s(37,"div",4)(38,"div",7)(39,"nz-form-item")(40,"nz-form-label"),p(41,"Contact No "),o(),s(42,"nz-form-control"),C(43,"input",13),o()()()(),s(44,"div",4)(45,"div",7)(46,"nz-form-item")(47,"nz-form-label"),p(48,"Address "),o(),s(49,"nz-form-control"),C(50,"textarea",14),o()()()(),s(51,"div",4)(52,"div",7)(53,"nz-form-item")(54,"nz-form-label"),p(55,"Is Admin "),o(),s(56,"nz-form-control"),C(57,"label",15),o()()()()()),i&2){let t=d();l("formGroup",t.userForm),m(),l("nzGutter",8),m(7),l("nzGutter",8),m(6),l("ngIf",t.users.length),m(),l("nzGutter",8),m(7),l("ngForOf",t.userRoles),m(),l("nzGutter",8),m(6),l("ngIf",t.subOrganizations.length),m(),l("nzGutter",8),m(7),l("nzGutter",8),m(7),l("nzGutter",8),m(7),l("nzGutter",8)}}function pt(i,n){if(i&1){let t=x();s(0,"div",19)(1,"button",20),f("click",function(){h(t);let r=d();return v(r.close())}),p(2,"Cancel"),o(),s(3,"button",21),f("click",function(){h(t);let r=d();return v(r.addUser())}),p(4,"Submit"),o()()}if(i&2){let t=d();m(3),l("disabled",!t.userForm.valid)}}var dt=()=>({overflow:"auto"}),He=(()=>{let n=class n{constructor(e,r,a){this.userService=e,this.fb=r,this.notification=a,this.visible=!1,this.users=[],this.userRoles=[],this.subOrganizations=[],this.isEdit=!1,this.closeDrawer=new se,this.userForm=this.fb.group({name:["",[z.required]],reports_to:[0,[z.required]],role:[null,[z.required]],sub_organization_id:[null,[z.required]],organization_id:[parseInt(localStorage.getItem("organization_id")||"0")],password:["p@ssw0rD"],email:["",[z.required]],contact_no:["",[z.required]],address:[""],is_admin:[!1]})}ngOnInit(){this.isEdit&&(this.userForm=this.fb.group({name:[this.selectedUser.name,[z.required]],reports_to:[this.selectedUser.reports_to,[z.required]],role:[this.selectedUser.role_id,[z.required]],sub_organization_id:[this.selectedUser.sub_organization_id,[z.required]],organization_id:[parseInt(localStorage.getItem("organization_id")||"0")],email:[this.selectedUser.email,[z.required]],contact_no:[this.selectedUser.contact_no,[z.required]],address:[this.selectedUser.address],is_admin:[this.selectedUser.is_admin]}))}close(){this.closeDrawer.emit(!1)}addUser(){return b(this,null,function*(){this.isEdit?(console.log(this.userForm),yield this.userService.updateUser(this.userForm.value,this.selectedUser.id),this.notification.create("success","User details update successfully",""),this.closeDrawer.emit(!0)):(console.log(this.userForm),yield this.userService.createUser(this.userForm.value),this.notification.create("success","User created successfully",""),this.closeDrawer.emit(!0))})}objectKeys(e){return Object.keys(e).map(r=>({key:r,value:e[r]}))}};n.\u0275fac=function(r){return new(r||n)(g(G),g(H),g(Ue))},n.\u0275cmp=w({type:n,selectors:[["app-create-user-drawer"]],inputs:{visible:"visible",users:"users",userRoles:"userRoles",subOrganizations:"subOrganizations",isEdit:"isEdit",selectedUser:"selectedUser"},outputs:{closeDrawer:"closeDrawer"},decls:4,vars:7,consts:[[3,"nzBodyStyle","nzMaskClosable","nzWidth","nzVisible","nzTitle","nzFooter","nzOnClose"],[3,"formGroup",4,"nzDrawerContent"],["footerTpl",""],[3,"formGroup"],["nz-row","",3,"nzGutter"],["nz-col","","nzSpan","24"],["formControlName","name","nz-input","","placeholder","please enter user name"],["nz-col","","nz-col","","nzSpan","24"],["id","reports_to","formControlName","reports_to","placeholder","Select user",4,"ngIf"],["id","role","formControlName","role","placeholder","Select role"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],["id","sub_organization_id","formControlName","sub_organization_id","placeholder","Select Organization",4,"ngIf"],["formControlName","email","nz-input","","placeholder","Add email"],["formControlName","contact_no","nz-input","","placeholder","Add contact no"],["nz-input","","rows","2","formControlName","address","nz-input","","placeholder","Add address"],["nz-checkbox","","formControlName","is_admin","placeholder","Add is admin"],["id","reports_to","formControlName","reports_to","placeholder","Select user"],[3,"nzValue","nzLabel"],["id","sub_organization_id","formControlName","sub_organization_id","placeholder","Select Organization"],[2,"float","right"],["nz-button","",2,"margin-right","8px",3,"click"],["nz-button","","nzType","primary",3,"disabled","click"]],template:function(r,a){if(r&1&&(s(0,"nz-drawer",0),f("nzOnClose",function(){return a.close()}),_(1,ct,58,12,"nz-form",1)(2,pt,5,1,"ng-template",null,2,A),o()),r&2){let c=N(3);l("nzBodyStyle",ce(6,dt))("nzMaskClosable",!1)("nzWidth",720)("nzVisible",a.visible)("nzTitle",a.isEdit?"Edit User":"Create User")("nzFooter",c)}},dependencies:[E,D,T,O,F,K,Oe,De,Q,J,Y,te,ee,Z,ye,we,W,B,X,L,$]});let i=n;return i})();function Ct(i,n){if(i&1){let t=x();s(0,"app-create-user-drawer",6),f("closeDrawer",function(r){h(t);let a=d();return v(a.close(r))}),o()}if(i&2){let t=d();l("subOrganizations",t.subOrganizations)("visible",t.visible)("userRoles",t.userRoles)("users",t.listOfData)("isEdit",t.isEdit)("selectedUser",t.selectedUser)}}function ht(i,n){if(i&1&&(s(0,"th",7),p(1),o()),i&2){let t=n.$implicit;l("nzSortFn",t.compare)("nzSortPriority",t.priority),m(),U(" ",t.title," ")}}function vt(i,n){if(i&1){let t=x();s(0,"tr")(1,"td"),p(2),o(),s(3,"td"),p(4),o(),s(5,"td"),p(6),o(),s(7,"td"),p(8),o(),s(9,"td")(10,"a",8),f("click",function(){let a=h(t).index,c=d();return v(c.startEdit(a))}),p(11,"Edit"),o()(),s(12,"td")(13,"a",8),f("click",function(){let a=h(t).index,c=d();return v(c.openChangePasswordModal(a))}),p(14,"Change "),C(15,"span",9),o()()()}if(i&2){let t=n.$implicit;m(2),R(t.name),m(2),R(t.reportTo),m(2),R(t.roleName),m(2),R(t.sub_organization)}}var Ze=(()=>{let n=class n{constructor(e,r,a){this.userService=e,this.appService=r,this.modal=a,this.listOfColumn=[{title:"Name",compare:(c,u)=>c.name.localeCompare(u.name),priority:!1},{title:"Reports To",compare:(c,u)=>c.reports_to-u.reports_to,priority:2},{title:"Role Name",compare:(c,u)=>c.role_id-u.role_id,priority:3},{title:"Sub Organization",compare:(c,u)=>c.sub_organization_id-u.sub_organization_id,priority:3},{title:"Action",compare:(c,u)=>c.role_id-u.role_id,priority:3},{title:"",compare:(c,u)=>c.role_id-u.role_id,priority:3}],this.listOfData=[],this.visible=!1,this.isEdit=!1}ngOnInit(){this.populateUserData()}open(e=!1){this.visible=!0,this.isEdit=e}close(e=!1){this.visible=!1,this.isEdit=!1,e&&this.populateUserData()}populateUserData(){return b(this,null,function*(){this.listOfData=yield this.userService.getOrganizationUsers(),this.userRoles=yield this.appService.getRoles(),this.subOrganizations=yield this.appService.getSubOrganizations(),this.userRoles=this.userRoles.map(e=>({key:e.role_name,value:e.id})),this.subOrganizations=this.subOrganizations.map(e=>ne(y({},e),{key:e.name,value:e.id})),this.mapUserData()})}mapUserData(){console.log("userRoles",this.userRoles),this.listOfData=this.listOfData.map(e=>{let r="",a=this.userRoles.find(S=>e.role?.id===S.value),c=this.listOfData.find(S=>S.id==e.reports_to);e.reports_to=c?.id,e.role_id=a?.value;let u=this.subOrganizations.find(S=>S.id===parseInt(e.sub_organization_id.toString()));return e.sub_organization_id=u?.id,ne(y({},e),{sub_organization:u?.name,roleName:a?.key,reportTo:this.listOfData.find(S=>S.id==e.reports_to)?.name})})}startEdit(e){this.open(!0),this.selectedUser=this.listOfData[e]}openChangePasswordModal(e){this.modal.create({nzTitle:"Change Password ("+this.listOfData[e].name+")",nzContent:We,nzFooter:null,nzData:{user:this.listOfData[e]}}).afterClose.subscribe(a=>{a&&console.log("Password changed",a)})}};n.\u0275fac=function(r){return new(r||n)(g(G),g(j),g(Fe))},n.\u0275cmp=w({type:n,selectors:[["app-users"]],decls:11,vars:4,consts:[["nz-button","","nzType","primary",3,"click"],[3,"subOrganizations","visible","userRoles","users","isEdit","selectedUser","closeDrawer",4,"ngIf"],["nzTableLayout","fixed",3,"nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[3,"subOrganizations","visible","userRoles","users","isEdit","selectedUser","closeDrawer"],[3,"nzSortFn","nzSortPriority"],[3,"click"],["nz-icon","","nzType","unlock","nzTheme","outline"]],template:function(r,a){if(r&1&&(s(0,"button",0),f("click",function(){return a.open()}),p(1,"Add"),o(),_(2,Ct,1,6,"app-create-user-drawer",1),s(3,"nz-table",2,3)(6,"thead")(7,"tr"),_(8,ht,2,3,"th",4),o()(),s(9,"tbody"),_(10,vt,16,4,"tr",5),o()()),r&2){let c=N(5);m(2),l("ngIf",a.visible),m(),l("nzData",a.listOfData),m(5),l("ngForOf",a.listOfColumn),m(2),l("ngForOf",c.data)}},dependencies:[E,D,T,O,F,q,Ae,Pe,Ve,ke,je,Me,Ge,He]});let i=n;return i})();function gt(i,n){if(i&1&&(s(0,"nz-form",3)(1,"nz-form-item")(2,"nz-form-label",4),p(3,"Role Name"),o(),s(4,"nz-form-control",5),C(5,"input",6),o()()()),i&2){let t=d();l("formGroup",t.addRoleForm)}}function xt(i,n){if(i&1){let t=x();s(0,"div")(1,"nz-form-item")(2,"nz-form-label",13),p(3,"Role Name"),o(),s(4,"nz-form-control",14)(5,"input",15),M("ngModelChange",function(r){h(t);let a=d().$implicit,c=d();return k(c.editCache[a.id].data.role_name,r)||(c.editCache[a.id].data.role_name=r),v(r)}),o()()()()}if(i&2){let t=d().$implicit,e=d();m(5),P("ngModel",e.editCache[t.id].data.role_name)}}function bt(i,n){if(i&1){let t=x();s(0,"nz-col",16)(1,"label",17),M("ngModelChange",function(r){let c=h(t).$implicit,u=d().$implicit;return k(u.role_permissions[c.value],r)||(u.role_permissions[c.value]=r),v(r)}),o(),p(2),o()}if(i&2){let t=n.$implicit,e=d().$implicit,r=d();l("nzSm",12)("nzXs",12)("nzMd",6)("nzXl",6)("nzXXl",4),m(),l("disabled",!(r.editCache[e.id]!=null&&r.editCache[e.id].edit)),P("ngModel",e.role_permissions[t.value]),m(),U(" ",r.permissionNames[t.value]," ")}}function St(i,n){if(i&1){let t=x();s(0,"div")(1,"a",18),f("click",function(){h(t);let r=d().$implicit,a=d();return v(a.startEdit(r.id))}),p(2,"Edit"),o()()}}function yt(i,n){if(i&1){let t=x();s(0,"div")(1,"a",19),f("click",function(){h(t);let r=d().$implicit,a=d();return v(a.saveEdit(r.id))}),p(2,"Save"),o(),p(3," \xA0 "),s(4,"a",20),f("nzOnConfirm",function(){h(t);let r=d().$implicit,a=d();return v(a.cancelEdit(r.id))}),p(5,"Cancel"),o()()}}function wt(i,n){if(i&1&&(p(0),C(1,"span",21)),i&2){let t=n.$implicit;d();let e=N(1);U(" ",t," "),m(),l("nzRotate",e.nzActive?90:-90)}}function Nt(i,n){if(i&1&&(s(0,"nz-collapse-panel",7,8),_(2,xt,6,1,"div",9),s(3,"nz-row",10),_(4,bt,3,8,"nz-col",11),pe(5,"keyvalue"),o(),_(6,St,3,0,"div",9)(7,yt,6,0,"div",9)(8,wt,2,2,"ng-template",null,12,A),o()),i&2){let t=n.$implicit,e=d();l("nzHeader",t.role_name),m(2),l("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit),m(2),l("ngForOf",de(5,5,e.appPermissions)),m(2),l("ngIf",!(e.editCache[t.id]!=null&&e.editCache[t.id].edit)),m(),l("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit)}}var Ke=(()=>{let n=class n{constructor(e,r){this.fb=e,this.appService=r,this.isModalVisible=!1,this.defuaultpermissions=oe,this.permissionNames=ze,this.appPermissions=fe,this.rolePermissions={},this.editCache={},this.addRoleForm=this.fb.group({role_name:["",[z.required]],organization_id:[localStorage.getItem("organization_id")],role_permissions:[oe]})}ngOnInit(){this.getAndSetRolesPermission()}getAndSetRolesPermission(){return b(this,null,function*(){this.roles=yield this.appService.getRolesAndPermissions(),this.updateEditCache()})}handleCancel(){this.isModalVisible=!1}showModal(){this.isModalVisible=!0}handleOk(){return b(this,null,function*(){yield this.appService.createRole(this.addRoleForm.value),this.isModalVisible=!1,this.getAndSetRolesPermission()})}startEdit(e){this.editCache[e].edit=!0}cancelEdit(e){let r=this.roles.findIndex(a=>a.id.toString()===e);this.editCache[e]={data:y({},this.roles[r]),edit:!1}}saveEdit(e){return b(this,null,function*(){let r=this.roles.findIndex(a=>a.id.toString()===e);yield this.appService.updateRole({id:e,role_permissions:this.editCache[e].data.role_permissions,role_name:this.editCache[e].data.role_name}),this.editCache[e].edit=!1,Object.assign(this.roles[r],this.editCache[e].data)})}updateEditCache(){this.roles.forEach(e=>{this.editCache[e.id]={edit:!1,data:y({},e)}})}};n.\u0275fac=function(r){return new(r||n)(g(H),g(j))},n.\u0275cmp=w({type:n,selectors:[["app-role-permissions"]],decls:9,vars:1,consts:[["nz-button","","nzType","primary",3,"click"],["nzTitle","Add Role",3,"nzVisible","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input role name"],["nz-input","","formControlName","role_name"],[3,"nzHeader"],["p",""],[4,"ngIf"],["nzGutter","8"],[3,"nzSm","nzXs","nzMd","nzXl","nzXXl",4,"ngFor","ngForOf"],["expandedIcon",""],["nzFor","terms"],["nzErrorTip",""],["type","text","nz-input","",3,"ngModel","ngModelChange"],[3,"nzSm","nzXs","nzMd","nzXl","nzXXl"],["nz-checkbox","",3,"disabled","ngModel","ngModelChange"],[3,"click"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"],["nz-icon","","nzType","caret-right",1,"ant-collapse-arrow",3,"nzRotate"]],template:function(r,a){r&1&&(s(0,"div")(1,"button",0),f("click",function(){return a.showModal()}),p(2,"Add Role"),o()(),s(3,"nz-modal",1),M("nzVisibleChange",function(u){return k(a.isModalVisible,u)||(a.isModalVisible=u),u}),f("nzOnCancel",function(){return a.handleCancel()})("nzOnOk",function(){return a.handleOk()}),_(4,gt,6,1,"nz-form",2),o(),s(5,"div")(6,"nz-collapse"),le(7,Nt,10,7,"nz-collapse-panel",7,ae),o()()),r&2&&(m(3),P("nzVisible",a.isModalVisible),m(4),me(a.roles))},dependencies:[E,D,T,O,F,K,Ee,Ne,q,Q,J,Y,te,ee,Z,Re,Te,Ie,W,B,X,L,$,ve,ue]});let i=n;return i})();var Et=[{path:"",component:Ze,data:{name:"Users"}},{path:"roles",component:Ke,data:{name:"Roles"}}],Je=(()=>{let n=class n{};n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=I({type:n}),n.\u0275inj=V({imports:[re.forChild(Et),re]});let i=n;return i})();var Qe=Ce,Dt=Object.keys(Qe).map(i=>Qe[i]),ci=(()=>{let n=class n{};n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=I({type:n}),n.\u0275inj=V({providers:[{provide:Se,useValue:be},{provide:he,useValue:Dt}],imports:[_e,Je,qe,xe,ge]});let i=n;return i})();export{ci as TeamModule};