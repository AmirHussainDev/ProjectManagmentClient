import{a as ee}from"./chunk-6I24REKJ.js";import{b as pe,c as B}from"./chunk-6XHQ47EQ.js";import{$ as oe,$a as U,A as F,Aa as T,Ba as A,Bb as he,Bc as Fe,Ca as me,Cb as ve,Db as R,Eb as $,Fa as se,Ib as Z,K as s,L as S,Mb as xe,Nb as Ee,O as u,Ob as Se,P as p,Pb as be,Qb as De,Sb as we,Tb as Te,Wa as ie,Y as a,Ya as ce,Z as l,Za as de,_ as y,aa as re,ab as v,ba as x,bb as W,ca as g,cb as ue,da as d,fb as _e,ha as O,hb as fe,ia as c,ic as Oe,ja as C,ka as ae,kb as ge,lb as Ce,lc as K,ma as b,na as D,nb as ye,nc as Ne,oa as w,ob as ze,oc as H,pa as le,pb as q,qc as J,r as ne,rc as Q,s as z,sa as h,sc as X,t as I,ta as V,tc as Y,ua as k,va as P,vb as L,w as _,wb as G,x as f,xb as j,xc as Me,yc as Ie}from"./chunk-BQGCRMRC.js";import"./chunk-NFQMHT45.js";import{a as M,g as E}from"./chunk-MON7YFGF.js";function Ke(t,n){if(t&1&&y(0,"nz-option",16),t&2){let e=n.$implicit;p("nzValue",e==null?null:e.id)("nzLabel",e==null?null:e.name)}}function He(t,n){if(t&1&&(a(0,"nz-select",14),u(1,Ke,1,2,"nz-option",15),l()),t&2){let e=d(2);s(),p("ngForOf",e.users)}}function Je(t,n){if(t&1&&y(0,"nz-option",16),t&2){let e=n.$implicit;p("nzValue",e==null?null:e.id)("nzLabel",e==null?null:e.name)}}function Qe(t,n){if(t&1&&(a(0,"nz-select",17),u(1,Je,1,2,"nz-option",15),l()),t&2){let e=d(2);s(),p("ngForOf",e.users)}}function Xe(t,n){if(t&1&&(a(0,"nz-form",3)(1,"div",4)(2,"div",5)(3,"nz-form-item")(4,"nz-form-label"),c(5,"Position"),l(),a(6,"nz-form-control"),y(7,"input",6),l()()()(),a(8,"div",4)(9,"div",7)(10,"nz-form-item")(11,"nz-form-label"),c(12,"Employee"),l(),a(13,"nz-form-control"),u(14,He,2,1,"nz-select",8),l()()()(),a(15,"div",4)(16,"div",7)(17,"nz-form-item")(18,"nz-form-label"),c(19,"Supervisor"),l(),a(20,"nz-form-control"),u(21,Qe,2,1,"nz-select",9),l()()()(),a(22,"div",4)(23,"div",5)(24,"nz-form-item")(25,"nz-form-label"),c(26,"Salary"),l(),a(27,"nz-form-control"),y(28,"input",10),l()()()(),a(29,"div",4)(30,"div",5)(31,"nz-form-item")(32,"nz-form-label"),c(33,"Over time allowed"),l(),a(34,"nz-form-control"),y(35,"label",11),l()()()(),a(36,"div",4)(37,"div",5)(38,"nz-form-item")(39,"nz-form-label"),c(40,"Signout Required"),l(),a(41,"nz-form-control"),y(42,"label",12),l()()()(),a(43,"div",4)(44,"div",5)(45,"nz-form-item")(46,"nz-form-label"),c(47,"Employement Details"),l(),a(48,"nz-form-control"),y(49,"textarea",13),l()()()()()),t&2){let e=d();p("formGroup",e.employeeForm),s(),p("nzGutter",8),s(7),p("nzGutter",8),s(6),p("ngIf",e.users.length),s(),p("nzGutter",8),s(6),p("ngIf",e.users.length),s(),p("nzGutter",8),s(7),p("nzGutter",8),s(7),p("nzGutter",8),s(7),p("nzGutter",8),s(6),p("rows",3)}}function Ye(t,n){if(t&1){let e=x();a(0,"div",18)(1,"button",19),g("click",function(){_(e);let i=d();return f(i.close())}),c(2,"Cancel"),l(),a(3,"button",20),g("click",function(){_(e);let i=d();return f(i.addUser())}),c(4,"Submit"),l()()}if(t&2){let e=d();s(3),p("disabled",!e.employeeForm.valid)}}var et=()=>({overflow:"auto"}),te=(()=>{let n=class n{constructor(r,i){this.appService=r,this.fb=i,this.visible=!1,this.users=[],this.userRoles=[],this.subOrganizations=[],this.closeDrawer=new ne,this.employeeForm=this.fb.group({employee:[0,[v.required]],position:["",[v.required]],salary:[0,[v.required]],overtime:[!1,[v.required]],siginout_required:[!1,[v.required]],organization:[parseInt(localStorage.getItem("organization_id")||"0")],subOrganization:[0],supervisor:[0,[v.required]],details:["",[v.required]]})}ngOnInit(){}close(){this.closeDrawer.emit(!1)}addUser(){return E(this,null,function*(){console.log(this.employeeForm),yield this.appService.createEmployee(this.employeeForm.value),this.closeDrawer.emit(!0)})}objectKeys(r){return Object.keys(r).map(i=>({key:i,value:r[i]}))}};n.\u0275fac=function(i){return new(i||n)(S(B),S(Ce))},n.\u0275cmp=z({type:n,selectors:[["app-employee-contract"]],inputs:{visible:"visible",users:"users",userRoles:"userRoles",subOrganizations:"subOrganizations"},outputs:{closeDrawer:"closeDrawer"},decls:4,vars:6,consts:[["nzTitle","Create",3,"nzBodyStyle","nzMaskClosable","nzWidth","nzVisible","nzFooter","nzOnClose"],[3,"formGroup",4,"nzDrawerContent"],["footerTpl",""],[3,"formGroup"],["nz-row","",3,"nzGutter"],["nz-col","","nzSpan","12"],["formControlName","position","nz-input","","placeholder","please enter user position"],["nz-col","","nz-col","","nzSpan","12"],["id","employee","formControlName","employee","placeholder","Select user",4,"ngIf"],["id","supervisor","formControlName","supervisor","placeholder","Select user",4,"ngIf"],["formControlName","salary","nz-input","","placeholder","please enter user salary"],["nz-checkbox","","formControlName","overtime"],["nz-checkbox","","formControlName","siginout_required"],["nz-input","","formControlName","details",3,"rows"],["id","employee","formControlName","employee","placeholder","Select user"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],[3,"nzValue","nzLabel"],["id","supervisor","formControlName","supervisor","placeholder","Select user"],[2,"float","right"],["nz-button","",2,"margin-right","8px",3,"click"],["nz-button","","nzType","primary",3,"disabled","click"]],template:function(i,o){if(i&1&&(a(0,"nz-drawer",0),g("nzOnClose",function(){return o.close()}),u(1,Xe,50,11,"nz-form",1)(2,Ye,5,1,"ng-template",null,2,P),l()),i&2){let m=O(3);p("nzBodyStyle",le(5,et))("nzMaskClosable",!1)("nzWidth",720)("nzVisible",o.visible)("nzFooter",m)}},dependencies:[T,A,j,L,G,Z,Ee,xe,be,Se,De,Te,we,q,R,$,U,W,ue,fe,ge]});let t=n;return t})();function nt(t,n){if(t&1){let e=x();a(0,"app-employee-contract",6),g("closeDrawer",function(i){_(e);let o=d();return f(o.close(i))}),l()}if(t&2){let e=d();p("subOrganizations",e.subOrganizations)("visible",e.visible)("users",e.users)}}function ot(t,n){if(t&1&&(a(0,"th",7),c(1),l()),t&2){let e=n.$implicit;p("nzSortFn",e.compare)("nzSortPriority",e.priority),s(),ae(" ",e.title," ")}}function rt(t,n){if(t&1){let e=x();oe(0),a(1,"td"),c(2),h(3,"username"),l(),a(4,"td"),c(5),l(),a(6,"td"),c(7),h(8,"username"),l(),a(9,"td"),c(10),l(),a(11,"td"),c(12),l(),a(13,"td"),c(14),l(),a(15,"td")(16,"a",10),g("click",function(){_(e);let i=d().$implicit,o=d();return f(o.startEdit(i.id))}),c(17,"Edit"),l()(),re()}if(t&2){let e=d().$implicit;s(2),C(V(3,6,e.employee)),s(3),C(e.position),s(2),C(V(8,8,e.supervisor)),s(3),C(e.salary),s(2),C(e.overtime),s(2),C(e.siginout_required)}}function at(t,n){if(t&1&&y(0,"nz-option",18),t&2){let e=n.$implicit;p("nzValue",e==null?null:e.id)("nzLabel",e==null?null:e.name)}}function lt(t,n){if(t&1){let e=x();a(0,"nz-select",16),w("ngModelChange",function(i){_(e);let o=d(2).$implicit,m=d();return D(m.editCache[o.id].data.supervisor,i)||(m.editCache[o.id].data.supervisor=i),f(i)}),u(1,at,1,2,"nz-option",17),l()}if(t&2){let e=d(2).$implicit,r=d();b("ngModel",r.editCache[e.id].data.supervisor),s(),p("ngForOf",r.users)}}function mt(t,n){if(t&1){let e=x();a(0,"td"),c(1),h(2,"username"),l(),a(3,"td")(4,"input",11),w("ngModelChange",function(i){_(e);let o=d().$implicit,m=d();return D(m.editCache[o.id].data.position,i)||(m.editCache[o.id].data.position=i),f(i)}),l()(),a(5,"td"),u(6,lt,2,2,"nz-select",12),l(),a(7,"td")(8,"input",11),w("ngModelChange",function(i){_(e);let o=d().$implicit,m=d();return D(m.editCache[o.id].data.salary,i)||(m.editCache[o.id].data.salary=i),f(i)}),l()(),a(9,"td")(10,"label",13),w("ngModelChange",function(i){_(e);let o=d().$implicit,m=d();return D(m.editCache[o.id].data.overtime,i)||(m.editCache[o.id].data.overtime=i),f(i)}),l()(),a(11,"td")(12,"label",13),w("ngModelChange",function(i){_(e);let o=d().$implicit,m=d();return D(m.editCache[o.id].data.siginout_required,i)||(m.editCache[o.id].data.siginout_required=i),f(i)}),l()(),a(13,"td")(14,"a",14),g("click",function(){_(e);let i=d().$implicit,o=d();return f(o.saveEdit(i.id))}),c(15,"Save"),l(),c(16," \xA0 "),a(17,"a",15),g("nzOnConfirm",function(){_(e);let i=d().$implicit,o=d();return f(o.cancelEdit(i.id))}),c(18,"Cancel"),l()()}if(t&2){let e=d().$implicit,r=d();s(),C(V(2,8,e.employee)),s(3),b("ngModel",r.editCache[e.id].data.position),s(2),p("ngIf",r.listOfData.length),s(2),b("ngModel",r.editCache[e.id].data.salary),s(2),b("ngModel",r.editCache[e.id].data.overtime),p("nzChecked",r.editCache[e.id].data.overtime),s(2),b("ngModel",r.editCache[e.id].data.siginout_required),p("nzChecked",r.editCache[e.id].data.siginout_required)}}function st(t,n){if(t&1&&(a(0,"tr"),u(1,rt,18,10,"ng-container",8)(2,mt,19,10,"ng-template",null,9,P),l()),t&2){let e=n.$implicit,r=O(3),i=d();s(),p("ngIf",!(i.editCache[e.id]!=null&&i.editCache[e.id].edit))("ngIfElse",r)}}var ke=(()=>{let n=class n{constructor(r,i){this.appService=r,this.userService=i,this.listOfColumn=[{title:"Employee",compare:(o,m)=>o.employee-m.employee,priority:!1},{title:"Position",compare:(o,m)=>o.position.localeCompare(m.position),priority:!1},{title:"Supervisor",compare:(o,m)=>o.supervisor-m.supervisor,priority:2},{title:"Salary",compare:(o,m)=>o.salary-m.salary,priority:3},{title:"Overtime",compare:(o,m)=>o.salary-m.salary,priority:3},{title:"Signout Required",compare:(o,m)=>o.salary-m.salary,priority:3},{title:"Action",compare:(o,m)=>(o.id||0)-(m.id||0),priority:3}],this.listOfData=[],this.users=[],this.visible=!1,this.editCache={}}ngOnInit(){this.subOrgSubscription=this.appService.currentSubOrganization.subscribe(r=>{this.populateEmployeeData()}),this.getUsers()}getUsers(){return E(this,null,function*(){this.users=yield this.userService.getOrganizationUsers()})}ngOnDestroy(){this.subOrgSubscription&&this.subOrgSubscription.unsubscribe()}open(){this.visible=!0}close(r=!1){this.visible=!1,r&&this.populateEmployeeData()}populateEmployeeData(){return E(this,null,function*(){this.listOfData=yield this.appService.getOrganizationEmployees(),this.updateEditCache()})}startEdit(r){this.editCache[r].edit=!0}cancelEdit(r){let i=this.listOfData.findIndex(o=>o.id===r);this.editCache[r]={data:M({},this.listOfData[i]),edit:!1}}saveEdit(r){return E(this,null,function*(){let i=this.listOfData.findIndex(o=>o.id===r);yield this.appService.updateEmployee(M({},this.editCache[r].data)),this.editCache[r].edit=!1,Object.assign(this.listOfData[i],this.editCache[r].data),this.populateEmployeeData()})}updateEditCache(){this.listOfData.forEach(r=>{this.editCache[r.id]={edit:!1,data:M({},r)}})}};n.\u0275fac=function(i){return new(i||n)(S(B),S(pe))},n.\u0275cmp=z({type:n,selectors:[["app-employee-management"]],decls:11,vars:4,consts:[["nz-button","","nzType","primary",3,"click"],[3,"subOrganizations","visible","users","closeDrawer",4,"ngIf"],["nzShowPagination","false","nzTableLayout","fixed",3,"nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[3,"subOrganizations","visible","users","closeDrawer"],[3,"nzSortFn","nzSortPriority"],[4,"ngIf","ngIfElse"],["editTemplate",""],[3,"click"],["type","text","nz-input","",3,"ngModel","ngModelChange"],["id","supervisor","placeholder","Select user",3,"ngModel","ngModelChange",4,"ngIf"],["nz-checkbox","",3,"ngModel","nzChecked","ngModelChange"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"],["id","supervisor","placeholder","Select user",3,"ngModel","ngModelChange"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],[3,"nzValue","nzLabel"]],template:function(i,o){if(i&1&&(a(0,"button",0),g("click",function(){return o.open()}),c(1,"Add"),l(),u(2,nt,1,3,"app-employee-contract",1),a(3,"nz-table",2,3)(6,"thead")(7,"tr"),u(8,ot,2,3,"th",4),l()(),a(9,"tbody"),u(10,st,4,2,"tr",5),l()()),i&2){let m=O(5);s(2),p("ngIf",o.visible),s(),p("nzData",o.listOfData),s(5),p("ngForOf",o.listOfColumn),s(2),p("ngForOf",m.data)}},dependencies:[T,A,j,L,G,Z,q,Oe,R,$,Q,Ne,K,H,Y,J,X,U,W,_e,te,ee]});let t=n;return t})();function pt(t,n){if(t&1&&(a(0,"tr")(1,"td"),c(2),h(3,"date"),l()()),t&2){let e=n.$implicit;s(2),C(k(3,1,e.date,"EEEE d MMM yyyy"))}}function ct(t,n){if(t&1&&(a(0,"tr")(1,"td"),c(2),h(3,"date"),l()()),t&2){let e=n.$implicit;s(2),C(k(3,1,e.date,"EEEE d MMM yyyy"))}}function dt(t,n){if(t&1&&(a(0,"nz-tab",5)(1,"nz-table",1,6)(3,"thead")(4,"tr")(5,"th"),c(6,"Date"),l()()(),a(7,"tbody"),u(8,ct,4,4,"tr",3),l()()()),t&2){let e=n.$implicit;p("nzTitle",e.name),s(),p("nzData",e.data)("nzBordered",!0),s(7),p("ngForOf",e.data)}}var Pe=(()=>{let n=class n{constructor(){this.currentDate=new Date,this.supervisorData=[],this.supervisorUsers=[]}ngOnInit(){this.initializeSupervisorTableData(),this.fetchSupervisorUsers()}signIn(){console.log("Signed In")}signOut(){console.log("Signed Out")}initializeSupervisorTableData(){let r=new Date("2024-01-01"),i=new Date("2024-01-31"),o=[],m=new Date(r);for(;m<=i;)o.push({date:m}),m=new Date(m.setDate(m.getDate()+1));this.supervisorData=o}fetchSupervisorUsers(){this.supervisorUsers=[{name:"User 1",data:this.generateUserData()},{name:"User 2",data:this.generateUserData()}]}generateUserData(){let r=new Date("2024-01-01"),i=new Date("2024-01-31"),o=[],m=new Date(r);for(;m<=i;)o.push({date:m}),m=new Date(m.setDate(m.getDate()+1));return o}};n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=z({type:n,selectors:[["app-attendance"]],decls:20,vars:8,consts:[["mat-button","",3,"click"],["nzShowPagination","false",3,"nzData","nzBordered"],["basicTable",""],[4,"ngFor","ngForOf"],[3,"nzTitle",4,"ngFor","ngForOf"],[3,"nzTitle"],["userTable",""]],template:function(i,o){i&1&&(a(0,"h1"),c(1,"Attendance"),l(),a(2,"p")(3,"strong"),c(4),h(5,"date"),l(),a(6,"button",0),g("click",function(){return o.signIn()}),c(7,"Sign In"),l(),a(8,"button",0),g("click",function(){return o.signOut()}),c(9,"Sign Out"),l()(),a(10,"nz-table",1,2)(12,"thead")(13,"tr")(14,"th"),c(15,"Date"),l()()(),a(16,"tbody"),u(17,pt,4,4,"tr",3),l()(),a(18,"nz-tabset"),u(19,dt,9,4,"nz-tab",4),l()),i&2&&(s(4),C(k(5,5,o.currentDate,"longDate")),s(6),p("nzData",o.supervisorData)("nzBordered",!0),s(7),p("ngForOf",o.supervisorData),s(2),p("ngForOf",o.supervisorUsers))},dependencies:[T,Q,K,H,Y,J,X,Ie,Me,me]});let t=n;return t})();var Ae=(()=>{let n=class n{};n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=z({type:n,selectors:[["app-pay-processing"]],decls:2,vars:0,template:function(i,o){i&1&&(a(0,"p"),c(1,"pay-processing works!"),l())}});let t=n;return t})();var ut=[{path:"",component:ke,data:{name:"All Employee"}},{path:":employeeId",component:te,data:{name:"Employee"}},{path:":userId/attendance",component:Pe,data:{name:"Attendance"}},{path:":employeeId/pay-processing",component:Ae,data:{name:"Payment"}}],Be=(()=>{let n=class n{};n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=I({type:n}),n.\u0275inj=F({imports:[ie.forChild(ut),ie]});let t=n;return t})();var Ue=ce,_t=Object.keys(Ue).map(t=>Ue[t]),Yt=(()=>{let n=class n{};n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=I({type:n}),n.\u0275inj=F({providers:[{provide:ve,useValue:he},{provide:de,useValue:_t},ee],imports:[Be,se,Fe,ze,ye]});let t=n;return t})();export{Yt as EmployeeManagementModule};
