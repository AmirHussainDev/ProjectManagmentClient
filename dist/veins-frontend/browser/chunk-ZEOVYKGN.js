import{a as ve}from"./chunk-YAWZ4XCU.js";import{b as xe,c as gt}from"./chunk-V5HHRK7K.js";import{a as Qe}from"./chunk-TJJQQ22B.js";import{a as X}from"./chunk-MI2CZ2YP.js";import{$ as a,$a as V,$b as ge,Ac as ee,Bb as nt,Bc as te,Ca as N,Cb as it,Cc as ne,Da as k,Ea as Y,Eb as at,Ec as _t,Fb as ot,Fc as yt,Ga as me,Gb as L,Ha as Re,Ic as ht,J as Te,K as s,L as v,Ob as pe,Pb as de,Q as u,Qb as rt,R as p,Ra as Ue,Ta as Le,Tb as lt,Ub as ue,Va as Ge,Vb as st,Wb as ct,Ya as Ie,Yb as _e,Zb as ye,_ as o,_a as qe,_b as he,aa as z,ac as mt,ba as le,bb as $e,ca as se,cb as Ke,cc as pt,da as x,db as Ye,dc as dt,ea as g,eb as j,fa as m,fb as B,gb as W,hb as Xe,ib as Ze,ja as M,jb as Je,ka as c,la as w,ma as f,na as Be,oa as E,pa as D,q as je,qa as O,qb as R,r as A,ra as We,rb as F,s as oe,sb as U,sc as fe,tb as et,tc as Ce,u as He,ua as h,uc as G,v as _,va as ce,w as y,wa as C,wb as Z,wc as ut,xa as P,xc as J,y as Fe,yb as tt,z as re,zc as Q}from"./chunk-HDWWHYKZ.js";import"./chunk-NFQMHT45.js";import{a as K,g as S}from"./chunk-MON7YFGF.js";function It(i,l){if(i&1&&z(0,"nz-option",18),i&2){let t=l.$implicit;p("nzValue",t==null?null:t.id)("nzLabel",t==null?null:t.name)}}function Mt(i,l){if(i&1&&(o(0,"nz-select",16),u(1,It,1,2,"nz-option",17),a()),i&2){let t=m(2);s(),p("ngForOf",t.users)}}function Pt(i,l){if(i&1&&z(0,"nz-option",18),i&2){let t=l.$implicit;p("nzValue",t==null?null:t.id)("nzLabel",t==null?null:t.name)}}function At(i,l){if(i&1&&(o(0,"nz-select",19),u(1,Pt,1,2,"nz-option",17),a()),i&2){let t=m(2);s(),p("ngForOf",t.users)}}function Nt(i,l){if(i&1&&(o(0,"nz-form",3)(1,"div",4)(2,"div",5)(3,"nz-form-item")(4,"nz-form-label"),c(5,"Position"),a(),o(6,"nz-form-control"),z(7,"input",6),a()()()(),o(8,"div",4)(9,"div",7)(10,"nz-form-item")(11,"nz-form-label"),c(12,"Employee"),a(),o(13,"nz-form-control"),u(14,Mt,2,1,"nz-select",8),a()()()(),o(15,"div",4)(16,"div",7)(17,"nz-form-item")(18,"nz-form-label"),c(19,"Supervisor"),a(),o(20,"nz-form-control"),u(21,At,2,1,"nz-select",9),a()()()(),o(22,"div",4)(23,"div",5)(24,"nz-form-item")(25,"nz-form-label"),c(26,"Salary Nature"),a(),o(27,"nz-form-control"),z(28,"nz-switch",10),a()()()(),o(29,"div",4)(30,"div",5)(31,"nz-form-item")(32,"nz-form-label"),c(33,"Salary"),a(),o(34,"nz-form-control"),z(35,"input",11),a()()()(),o(36,"div",4)(37,"div",5)(38,"nz-form-item")(39,"nz-form-label"),c(40,"Working Hours"),a(),o(41,"nz-form-control"),z(42,"label",12),a()()()(),o(43,"div",4)(44,"div",5)(45,"nz-form-item")(46,"nz-form-label"),c(47,"Over time allowed"),a(),o(48,"nz-form-control"),z(49,"label",13),a()()()(),o(50,"div",4)(51,"div",5)(52,"nz-form-item")(53,"nz-form-label"),c(54,"Signout Required"),a(),o(55,"nz-form-control"),z(56,"label",14),a()()()(),o(57,"div",4)(58,"div",5)(59,"nz-form-item")(60,"nz-form-label"),c(61,"Employement Details"),a(),o(62,"nz-form-control"),z(63,"textarea",15),a()()()()()),i&2){let t=m();p("formGroup",t.employeeForm),s(),p("nzGutter",8),s(7),p("nzGutter",8),s(6),p("ngIf",t.users.length),s(),p("nzGutter",8),s(6),p("ngIf",t.users.length),s(),p("nzGutter",8),s(7),p("nzGutter",8),s(7),p("nzGutter",8),s(7),p("nzGutter",8),s(7),p("nzGutter",8),s(7),p("nzGutter",8),s(6),p("rows",3)}}function kt(i,l){if(i&1){let t=x();o(0,"div",20)(1,"button",21),g("click",function(){_(t);let n=m();return y(n.close())}),c(2,"Cancel"),a(),o(3,"button",22),g("click",function(){_(t);let n=m();return y(n.addUser())}),c(4,"Submit"),a()()}if(i&2){let t=m();s(3),p("disabled",!t.employeeForm.valid)}}var Vt=()=>({overflow:"auto"}),we=(()=>{let l=class l{constructor(e,n){this.appService=e,this.fb=n,this.visible=!1,this.users=[],this.userRoles=[],this.subOrganizations=[],this.closeDrawer=new je,this.employeeForm=this.fb.group({employee:[0,[F.required]],position:["",[F.required]],isSalaryHourly:[!1],salary:[0,[F.required]],overtime:[!1,[F.required]],siginout_required:[!1,[F.required]],organization:[parseInt(localStorage.getItem("organization_id")||"0")],subOrganization:[0],supervisor:[0,[F.required]],details:["",[F.required]],workingHours:[8,[F.required]]})}ngOnInit(){}close(){this.closeDrawer.emit(!1)}addUser(){return S(this,null,function*(){console.log(this.employeeForm),yield this.appService.createEmployee(this.employeeForm.value),this.closeDrawer.emit(!0)})}objectKeys(e){return Object.keys(e).map(n=>({key:n,value:e[n]}))}};l.\u0275fac=function(n){return new(n||l)(v(V),v(it))},l.\u0275cmp=A({type:l,selectors:[["app-employee-contract"]],inputs:{visible:"visible",users:"users",userRoles:"userRoles",subOrganizations:"subOrganizations"},outputs:{closeDrawer:"closeDrawer"},decls:4,vars:6,consts:[["nzTitle","Create",3,"nzBodyStyle","nzMaskClosable","nzWidth","nzVisible","nzFooter","nzOnClose"],[3,"formGroup",4,"nzDrawerContent"],["footerTpl",""],[3,"formGroup"],["nz-row","",3,"nzGutter"],["nz-col","","nzSpan","12"],["formControlName","position","nz-input","","placeholder","please enter user position"],["nz-col","","nz-col","","nzSpan","12"],["id","employee","formControlName","employee","placeholder","Select user",4,"ngIf"],["id","supervisor","formControlName","supervisor","placeholder","Select user",4,"ngIf"],["formControlName","isSalaryHourly","nzCheckedChildren","Hourly","nzUnCheckedChildren","Monthly"],["formControlName","salary","nz-input","","placeholder","please enter user salary"],["nz-checkbox","","formControlName","workingHours"],["nz-checkbox","","formControlName","overtime"],["nz-checkbox","","formControlName","siginout_required"],["nz-input","","formControlName","details",3,"rows"],["id","employee","formControlName","employee","placeholder","Select user"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],[3,"nzValue","nzLabel"],["id","supervisor","formControlName","supervisor","placeholder","Select user"],[2,"float","right"],["nz-button","",2,"margin-right","8px",3,"click"],["nz-button","","nzType","primary",3,"disabled","click"]],template:function(n,r){if(n&1&&(o(0,"nz-drawer",0),g("nzOnClose",function(){return r.close()}),u(1,Nt,64,13,"nz-form",1)(2,kt,5,1,"ng-template",null,2,P),a()),n&2){let d=M(3);p("nzBodyStyle",We(5,Vt))("nzMaskClosable",!1)("nzWidth",720)("nzVisible",r.visible)("nzFooter",d)}},dependencies:[N,k,W,j,B,ue,ye,_e,ge,he,mt,dt,pt,L,pe,de,Ce,R,U,et,tt,nt]});let i=l;return i})();function Bt(i,l){if(i&1){let t=x();o(0,"button",6),g("click",function(){_(t);let n=m();return y(n.open())}),c(1,"Add"),a()}}function Wt(i,l){if(i&1){let t=x();o(0,"app-employee-contract",7),g("closeDrawer",function(n){_(t);let r=m();return y(r.close(n))}),a()}if(i&2){let t=m();p("subOrganizations",t.subOrganizations)("visible",t.visible)("users",t.users)}}function Rt(i,l){if(i&1&&(o(0,"th",8),c(1),a()),i&2){let t=l.$implicit;p("nzSortFn",t.compare)("nzSortPriority",t.priority),s(),f(" ",t.title," ")}}function Ut(i,l){if(i&1){let t=x();o(0,"a",12),g("click",function(){_(t);let n=m(2).$implicit,r=m();return y(r.startEdit(n.id))}),c(1,"Edit"),a()}}function Lt(i,l){if(i&1&&(le(0),o(1,"td"),c(2),h(3,"username"),a(),o(4,"td"),c(5),a(),o(6,"td"),c(7),h(8,"username"),a(),o(9,"td"),c(10),a(),o(11,"td"),c(12),a(),o(13,"td"),c(14),a(),o(15,"td"),c(16),a(),o(17,"td"),u(18,Ut,2,0,"a",11),a(),se()),i&2){let t=m().$implicit,e=m();s(2),w(ce(3,9,t.employee)),s(3),w(t.position),s(2),w(ce(8,11,t.supervisor)),s(3),Be("",t.salary," ",t.isSalaryHourly?"/h":"/m",""),s(2),w(t.overtime),s(2),w(t.siginout_required),s(2),w(t.workingHours),s(2),p("appHasPermission",e.appPermissions.AddEmployees)}}function Gt(i,l){if(i&1&&z(0,"nz-option",20),i&2){let t=l.$implicit;p("nzValue",t==null?null:t.id)("nzLabel",t==null?null:t.name)}}function qt(i,l){if(i&1){let t=x();o(0,"nz-select",18),O("ngModelChange",function(n){_(t);let r=m(2).$implicit,d=m();return D(d.editCache[r.id].data.supervisor,n)||(d.editCache[r.id].data.supervisor=n),y(n)}),u(1,Gt,1,2,"nz-option",19),a()}if(i&2){let t=m(2).$implicit,e=m();E("ngModel",e.editCache[t.id].data.supervisor),s(),p("ngForOf",e.users)}}function $t(i,l){if(i&1){let t=x();o(0,"td"),c(1),h(2,"username"),a(),o(3,"td")(4,"input",13),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.position,n)||(d.editCache[r.id].data.position=n),y(n)}),a()(),o(5,"td"),u(6,qt,2,2,"nz-select",14),a(),o(7,"td")(8,"input",13),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.salary,n)||(d.editCache[r.id].data.salary=n),y(n)}),a(),c(9),a(),o(10,"td")(11,"label",15),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.overtime,n)||(d.editCache[r.id].data.overtime=n),y(n)}),a()(),o(12,"td")(13,"label",15),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.siginout_required,n)||(d.editCache[r.id].data.siginout_required=n),y(n)}),a()(),o(14,"td")(15,"input",13),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.workingHours,n)||(d.editCache[r.id].data.workingHours=n),y(n)}),a()(),o(16,"td")(17,"a",16),g("click",function(){_(t);let n=m().$implicit,r=m();return y(r.saveEdit(n.id))}),c(18,"Save"),a(),c(19," \xA0 "),o(20,"a",17),g("nzOnConfirm",function(){_(t);let n=m().$implicit,r=m();return y(r.cancelEdit(n.id))}),c(21,"Cancel"),a()()}if(i&2){let t=m().$implicit,e=m();s(),w(ce(2,10,t.employee)),s(3),E("ngModel",e.editCache[t.id].data.position),s(2),p("ngIf",e.listOfData.length),s(2),E("ngModel",e.editCache[t.id].data.salary),s(),f(" ",e.editCache[t.id].data.isSalaryHourly?"/h":"/m",""),s(2),E("ngModel",e.editCache[t.id].data.overtime),p("nzChecked",e.editCache[t.id].data.overtime),s(2),E("ngModel",e.editCache[t.id].data.siginout_required),p("nzChecked",e.editCache[t.id].data.siginout_required),s(2),E("ngModel",e.editCache[t.id].data.workingHours)}}function Kt(i,l){if(i&1&&(o(0,"tr"),u(1,Lt,19,13,"ng-container",9)(2,$t,22,12,"ng-template",null,10,P),a()),i&2){let t=l.$implicit,e=M(3),n=m();s(),p("ngIf",!(n.editCache[t.id]!=null&&n.editCache[t.id].edit))("ngIfElse",e)}}var ft=(()=>{let l=class l{constructor(e,n){this.appService=e,this.userService=n,this.listOfColumn=[{title:"Employee",compare:(r,d)=>r.employee-d.employee,priority:!1},{title:"Position",compare:(r,d)=>r.position.localeCompare(d.position),priority:!1},{title:"Supervisor",compare:(r,d)=>r.supervisor-d.supervisor,priority:2},{title:"Salary",compare:(r,d)=>r.salary-d.salary,priority:3},{title:"Overtime",compare:(r,d)=>r.salary-d.salary,priority:3},{title:"Signout Required",compare:(r,d)=>r.salary-d.salary,priority:3},{title:"Working Hours",compare:(r,d)=>r.workingHours-d.workingHours,priority:3},{title:"Action",compare:(r,d)=>(r.id||0)-(d.id||0),priority:3}],this.listOfData=[],this.users=[],this.visible=!1,this.appPermissions=X,this.editCache={}}ngOnInit(){this.subOrgSubscription=this.appService.currentSubOrganization.subscribe(e=>{this.populateEmployeeData()}),this.getUsers()}getUsers(){return S(this,null,function*(){this.users=yield this.userService.getOrganizationUsers()})}ngOnDestroy(){this.subOrgSubscription&&this.subOrgSubscription.unsubscribe()}open(){this.visible=!0}close(e=!1){this.visible=!1,e&&this.populateEmployeeData()}populateEmployeeData(){return S(this,null,function*(){this.listOfData=yield this.appService.getOrganizationEmployees(),this.updateEditCache()})}startEdit(e){this.editCache[e].edit=!0}cancelEdit(e){let n=this.listOfData.findIndex(r=>r.id===e);this.editCache[e]={data:K({},this.listOfData[n]),edit:!1}}saveEdit(e){return S(this,null,function*(){let n=this.listOfData.findIndex(r=>r.id===e);yield this.appService.updateEmployee(K({},this.editCache[e].data)),this.editCache[e].edit=!1,Object.assign(this.listOfData[n],this.editCache[e].data),this.populateEmployeeData()})}updateEditCache(){this.listOfData.forEach(e=>{this.editCache[e.id]={edit:!1,data:K({},e)}})}};l.\u0275fac=function(n){return new(n||l)(v(V),v(qe))},l.\u0275cmp=A({type:l,selectors:[["app-employee-management"]],decls:10,vars:5,consts:[["nz-button","","nzType","primary",3,"click",4,"appHasPermission"],[3,"subOrganizations","visible","users","closeDrawer",4,"ngIf"],["nzShowPagination","false","nzTableLayout","fixed",3,"nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],["nz-button","","nzType","primary",3,"click"],[3,"subOrganizations","visible","users","closeDrawer"],[3,"nzSortFn","nzSortPriority"],[4,"ngIf","ngIfElse"],["editTemplate",""],[3,"click",4,"appHasPermission"],[3,"click"],["type","text","nz-input","",3,"ngModel","ngModelChange"],["id","supervisor","placeholder","Select user",3,"ngModel","ngModelChange",4,"ngIf"],["nz-checkbox","",3,"ngModel","nzChecked","ngModelChange"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"],["id","supervisor","placeholder","Select user",3,"ngModel","ngModelChange"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],[3,"nzValue","nzLabel"]],template:function(n,r){if(n&1&&(u(0,Bt,2,0,"button",0)(1,Wt,1,3,"app-employee-contract",1),o(2,"nz-table",2,3)(5,"thead")(6,"tr"),u(7,Rt,2,3,"th",4),a()(),o(8,"tbody"),u(9,Kt,4,2,"tr",5),a()()),n&2){let d=M(4);p("appHasPermission",r.appPermissions.AddEmployees),s(),p("ngIf",r.visible),s(),p("nzData",r.listOfData),s(5),p("ngForOf",r.listOfColumn),s(2),p("ngForOf",d.data)}},dependencies:[N,k,W,j,B,ue,L,fe,pe,de,ee,ut,G,J,ne,Q,te,R,U,Z,xe,we,ve]});let i=l;return i})();var ie=(()=>{let l=class l{constructor(){}calculateHourlyRate(e,n,r,d=!0){if(d)return e/r;{let b=n.getFullYear(),T=n.getMonth(),ae=new Date(b,T+1,0).getDate(),H=0;for(let $=1;$<=ae;$++)new Date(b,T,$).getDay()!==0&&H++;return e/(H*r)}}isDateInLastOrCurrentMonth(e){let n=new Date,r=n.getMonth(),d=n.getFullYear(),b=e.getMonth(),T=e.getFullYear();return d===T&&r===b||d===T&&r-1===b||d-1===T&&r===0&&b===11}getDifferenceInHours(e,n){let r=new Date(e).getHours()*3600+new Date(e).getMinutes()*60+new Date(e).getSeconds(),d=new Date(n).getHours()*3600+new Date(n).getMinutes()*60+new Date(n).getSeconds(),T=Math.abs(d-r)/3600;return isNaN(T)?0:T}calculateWorkingHours(e,n){let r=e.overtime,d=e.siginout_required,b=e.workingHours;return r?n:d?n>b?b||8:n:n==0?0:b}};l.\u0275fac=function(n){return new(n||l)},l.\u0275prov=Fe({token:l,factory:l.\u0275fac,providedIn:"root"});let i=l;return i})();function Yt(i,l){i&1&&(o(0,"th"),c(1," Action "),a())}function Xt(i,l){if(i&1&&(o(0,"span",8),c(1),h(2,"date"),o(3,"a",9),z(4,"span",10),a()()),i&2){let t=m().$implicit;s(),f(" ",C(2,2,t.attendanceObj==null?null:t.attendanceObj.sign_in,"hh:mm a")," "),s(2),p("href","https://www.google.com/maps?q="+(t.attendanceObj==null?null:t.attendanceObj.sign_in_corrd),Te)}}function Zt(i,l){if(i&1){let t=x();o(0,"nz-time-picker",11),g("ngModelChange",function(){_(t);let n=m().$implicit,r=m();return y(r.signIn(n.id))}),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.attendanceObj.sign_in,n)||(d.editCache[r.id].data.attendanceObj.sign_in=n),y(n)}),a()}if(i&2){let t=m().$implicit,e=m();E("ngModel",e.editCache[t.id].data.attendanceObj.sign_in)}}function Jt(i,l){if(i&1&&(o(0,"a",9),z(1,"span",10),a()),i&2){let t=m(2).$implicit;p("href","https://www.google.com/maps?q="+(t.attendanceObj==null?null:t.attendanceObj.sign_out_corrd),Te)}}function Qt(i,l){if(i&1&&(o(0,"span",8),c(1),h(2,"date"),u(3,Jt,2,1,"a",12),a()),i&2){let t=m().$implicit,e=m();s(),f("",C(2,2,t.attendanceObj==null?null:t.attendanceObj.sign_out,"hh:mm a")," "),s(2),p("ngIf",!(e.editCache[t.id]!=null&&e.editCache[t.id].edit))}}function en(i,l){if(i&1){let t=x();o(0,"nz-time-picker",11),g("ngModelChange",function(){_(t);let n=m().$implicit,r=m();return y(r.signOut(n.id))}),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.attendanceObj.sign_out,n)||(d.editCache[r.id].data.attendanceObj.sign_out=n),y(n)}),a()}if(i&2){let t=m().$implicit,e=m();E("ngModel",e.editCache[t.id].data.attendanceObj.sign_out)}}function tn(i,l){if(i&1&&(o(0,"span"),c(1),a()),i&2){let t=m().$implicit;s(),f(" ",t.attendanceObj==null?null:t.attendanceObj.approved_hours," ")}}function nn(i,l){if(i&1){let t=x();o(0,"input",13),g("ngModelChange",function(){_(t);let n=m().$implicit,r=m();return y(r.claculateAndSetAmount(n.id))}),O("ngModelChange",function(n){_(t);let r=m().$implicit,d=m();return D(d.editCache[r.id].data.attendanceObj.approved_hours,n)||(d.editCache[r.id].data.attendanceObj.approved_hours=n),y(n)}),a()}if(i&2){let t=m().$implicit,e=m();E("ngModel",e.editCache[t.id].data.attendanceObj.approved_hours)}}function an(i,l){if(i&1&&(o(0,"span"),c(1),h(2,"currency"),a()),i&2){let t=m().$implicit,e=m();s(),w(C(2,1,(e.editCache[t.id].data==null||e.editCache[t.id].data.attendanceObj==null?null:e.editCache[t.id].data.attendanceObj.amount)||0," "))}}function on(i,l){if(i&1&&(o(0,"span"),c(1),h(2,"currency"),a()),i&2){let t=m().$implicit;s(),w(C(2,1,(t.attendanceObj==null?null:t.attendanceObj.amount)||0," "))}}function rn(i,l){if(i&1){let t=x();o(0,"a",17),g("click",function(){_(t);let n=m(2).$implicit,r=m();return y(r.startEdit(n.id))}),c(1,"Edit"),a()}}function ln(i,l){if(i&1){let t=x();o(0,"a",18),g("click",function(){_(t);let n=m(2).$implicit,r=m();return y(r.saveEdit(n.id))}),c(1,"Save"),a()}}function sn(i,l){if(i&1){let t=x();o(0,"a",19),g("nzOnConfirm",function(){_(t);let n=m(2).$implicit,r=m();return y(r.cancelEdit(n.id))}),c(1,"Cancel"),a()}}function cn(i,l){if(i&1&&(o(0,"td"),u(1,rn,2,0,"a",14)(2,ln,2,0,"a",15),c(3," \xA0 "),u(4,sn,2,0,"a",16),a()),i&2){let t=m().$implicit,e=m();s(),p("ngIf",!(e.editCache[t.id]!=null&&e.editCache[t.id].edit)),s(),p("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit),s(2),p("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit)}}function mn(i,l){if(i&1&&(o(0,"tr")(1,"td"),c(2),h(3,"date"),a(),o(4,"td"),u(5,Xt,5,5,"span",5)(6,Zt,1,1,"nz-time-picker",6),a(),o(7,"td"),u(8,Qt,4,5,"span",5)(9,en,1,1,"nz-time-picker",6),a(),o(10,"td"),c(11),a(),o(12,"td"),u(13,tn,2,1,"span",2)(14,nn,1,1,"input",7),a(),o(15,"td"),u(16,an,3,4,"span",2)(17,on,3,4,"span",2),a(),u(18,cn,5,3,"td",2),a()),i&2){let t=l.$implicit,e=m();s(2),f("",C(3,11,t.date,"EEEE d MMM yyyy")," "),s(3),p("ngIf",!(e.editCache[t.id]!=null&&e.editCache[t.id].edit)),s(),p("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit),s(2),p("ngIf",!(e.editCache[t.id]!=null&&e.editCache[t.id].edit)),s(),p("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit),s(2),w(t.attendanceObj==null?null:t.attendanceObj.hours_worked),s(2),p("ngIf",!(e.editCache[t.id]!=null&&e.editCache[t.id].edit)),s(),p("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit),s(2),p("ngIf",e.editCache[t.id]==null?null:e.editCache[t.id].edit),s(),p("ngIf",!(e.editCache[t.id]!=null&&e.editCache[t.id].edit)),s(),p("ngIf",e.isSupervisor)}}function pn(i,l){if(i&1&&(o(0,"span",20),z(1,"span"),o(2,"span")(3,"b"),c(4),h(5,"currency"),a()()()),i&2){let t=m();s(4),f(" Total: ",C(5,1,t.totalAmount,"PKR "),"")}}var Ee=(()=>{let l=class l{constructor(e,n){this.appService=e,this.employeeManagementService=n,this.supervisorData=[],this.totalAmount=0,this.editCache={}}ngOnInit(){this.getCurrentUserAttance(),this.sunscribeToGeoLocation()}sunscribeToGeoLocation(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition(e=>{this.latitude=e.coords.latitude,this.longitude=e.coords.longitude})}getCurrentUserAttance(){return S(this,null,function*(){let e=yield this.appService.getCurrentUserAttendance(this.employee.id);e&&this.initializeSupervisorTableData(e.lastPayment,e.attendances),this.updateEditCache()})}initializeSupervisorTableData(e,n){let r=new Date,d=e?new Date(e.date_created):null,b=n.map(I=>new Date(I.attendance_date)),T;d&&(Math.min(...b.map(I=>I.getTime()))===1/0||d<=new Date(Math.min(...b.map(I=>I.getTime()))))?T=d:b&&b.length?T=new Date(Math.min(...b.map(I=>I.getTime()))):T=new Date(this.employee.date_created);let ae=[],H=new Date(T),De=0;for(;H<=r;){let I=n.find($=>{let Oe=new Date($.attendance_date);return Oe.setHours(0,0,0,0),H.setHours(0,0,0,0),Oe.getTime()===H.getTime()});ae.push({id:De,date:new Date(H),attendanceObj:I||{}}),H.setDate(H.getDate()+1),De++}this.supervisorData=ae,this.totalAmount=this.supervisorData.reduce((I,$)=>I+(Number($.attendanceObj.amount)||0),0)}startEdit(e){this.editCache[e].edit=!0}cancelEdit(e){let n=this.supervisorData.findIndex(r=>r.id===e);this.editCache[e]={data:K({},this.supervisorData[n]),edit:!1}}claculateAndSetAmount(e){let n=this.employeeManagementService.calculateHourlyRate(this.employee.salary,this.editCache[e].data.date,this.employee.workingHours||8,this.employee.isSalaryHourly);setTimeout(()=>{this.editCache[e].data.attendanceObj.amount=n*this.employeeManagementService.calculateWorkingHours(this.employee,this.editCache[e].data.attendanceObj.approved_hours||this.editCache[e].data.attendanceObj.hours_worked)})}signIn(e){this.editCache[e].data.attendanceObj.sign_in_corrd=this.latitude+","+this.longitude}signOut(e){this.editCache[e].data.attendanceObj.sign_out_corrd=this.latitude+","+this.longitude,this.editCache[e].data.attendanceObj.hours_worked=Math.round(this.employeeManagementService.getDifferenceInHours(this.editCache[e].data.attendanceObj.sign_in,this.editCache[e].data.attendanceObj.sign_out));let n=this.employeeManagementService.calculateHourlyRate(this.employee.salary,this.editCache[e].data.date,this.employee.workingHours||8,this.employee.isSalaryHourly);this.editCache[e].data.attendanceObj.amount=n*this.employeeManagementService.calculateWorkingHours(this.employee,this.editCache[e].data.attendanceObj.approved_hours||this.editCache[e].data.attendanceObj.hours_worked)}saveEdit(e){return S(this,null,function*(){let n=this.supervisorData.findIndex(r=>r.id===e);this.editCache[e].data.attendanceObj.id?yield this.appService.updateAttendance({id:this.editCache[e].data.attendanceObj.id,sign_in:this.editCache[e].data.attendanceObj.sign_in,sign_out:this.editCache[e].data.attendanceObj.sign_out,sign_in_corrd:this.editCache[e].data.attendanceObj.sign_in_corrd,sign_out_corrd:this.editCache[e].data.attendanceObj.sign_out_corrd,hours_worked:this.editCache[e].data.attendanceObj.hours_worked,approved_hours:this.editCache[e].data.attendanceObj.approved_hours,amount:this.editCache[e].data.attendanceObj.amount}):yield this.appService.createAttendance({employee:this.employee.id,sign_in:this.editCache[e].data.attendanceObj.sign_in,sign_out:this.editCache[e].data.attendanceObj.sign_out,sign_in_corrd:this.editCache[e].data.attendanceObj.sign_in_corrd,sign_out_corrd:this.editCache[e].data.attendanceObj.sign_out_corrd,hours_worked:this.editCache[e].data.attendanceObj.hours_worked,approved_hours:this.editCache[e].data.attendanceObj.approved_hours,attendance_date:this.editCache[e].data.date,amount:this.editCache[e].data.attendanceObj.amount}),this.editCache[e].edit=!1,Object.assign(this.supervisorData[n],this.editCache[e].data),this.getCurrentUserAttance()})}updateEditCache(){this.supervisorData.forEach(e=>{this.editCache[e.id]={edit:!1,data:K({},e)}})}};l.\u0275fac=function(n){return new(n||l)(v(V),v(ie))},l.\u0275cmp=A({type:l,selectors:[["app-attendance-details"]],inputs:{employee:"employee",isSupervisor:"isSupervisor"},decls:21,vars:5,consts:[["nzShowPagination","false",3,"nzFooter","nzData","nzBordered"],["basicTable",""],[4,"ngIf"],[4,"ngFor","ngForOf"],["footerDetails",""],["class","flex space-between",4,"ngIf"],["nzFormat","HH:mm",3,"ngModel","ngModelChange",4,"ngIf"],["nz-input","",3,"ngModel","ngModelChange",4,"ngIf"],[1,"flex","space-between"],["target","_blank","nzType","default","nzShape","circle","nzShape","round",3,"href"],["nz-icon","","nzType","environment","nzTheme","outline"],["nzFormat","HH:mm",3,"ngModel","ngModelChange"],["target","_blank","nzType","default","nzShape","circle","nzShape","round",3,"href",4,"ngIf"],["nz-input","",3,"ngModel","ngModelChange"],[3,"click",4,"ngIf"],["class","save",3,"click",4,"ngIf"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm",4,"ngIf"],[3,"click"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"],[1,"flex","space-between","center"]],template:function(n,r){if(n&1&&(o(0,"nz-table",0,1)(2,"thead")(3,"tr")(4,"th"),c(5,"Date"),a(),o(6,"th"),c(7,"Sign In"),a(),o(8,"th"),c(9,"Sign Out"),a(),o(10,"th"),c(11,"Hours Worked"),a(),o(12,"th"),c(13,"Approved Hours"),a(),o(14,"th"),c(15,"Amount"),a(),u(16,Yt,2,0,"th",2),a()(),o(17,"tbody"),u(18,mn,19,14,"tr",3),a()(),u(19,pn,6,4,"ng-template",null,4,P)),n&2){let d=M(20);p("nzFooter",d)("nzData",r.supervisorData)("nzBordered",!0),s(16),p("ngIf",r.isSupervisor),s(2),p("ngForOf",r.supervisorData)}},dependencies:[N,k,j,Ye,L,fe,ee,G,J,ne,Q,te,rt,R,U,Z,me,Y]});let i=l;return i})();function dn(i,l){if(i&1&&(o(0,"div"),c(1),h(2,"date"),a()),i&2){let t=m();s(),f(" ",C(2,1,t.signInTime,"hh:mm a"),"")}}function un(i,l){if(i&1){let t=x();o(0,"button",4),g("click",function(){_(t);let n=m();return y(n.signIn())}),c(1,"Sign In"),a()}}function _n(i,l){if(i&1&&(o(0,"div"),c(1),h(2,"date"),a()),i&2){let t=m();s(),f(" ",C(2,1,t.signOutTime,"hh:mm a"),"")}}function yn(i,l){if(i&1){let t=x();o(0,"button",4),g("click",function(){_(t);let n=m();return y(n.signOut())}),c(1,"Sign Out"),a()}}function hn(i,l){if(i&1&&(o(0,"td"),c(1),a()),i&2){let t=m().$implicit;s(),w(t.employee==null?null:t.employee.employee.name)}}function gn(i,l){if(i&1&&z(0,"app-attendance-details",8),i&2){let t=m().$implicit;p("employee",t.employee)("isSupervisor",t.isSupervisor)}}function fn(i,l){if(i&1&&(o(0,"nz-tab",5),u(1,hn,2,1,"ng-template",null,6,P)(3,gn,1,2,"app-attendance-details",7),a()),i&2){let t=l.$implicit,e=M(2);p("nzTitle",e),s(3),p("ngIf",t.employee)}}var xt=(()=>{let l=class l{constructor(e,n,r,d){this.route=e,this.router=n,this.appService=r,this.employeeManagementService=d,this.currentDate=new Date,this.supervisorUsers=[],this.currentDateAttendanceIndex=0}ngOnInit(){this.subOrganizationSubscription=this.appService.currentSubOrganization.subscribe(e=>{this.route.paramMap.subscribe(n=>{e&&e.id>0&&n.get("userId")&&(this.currentUserId=parseInt(n.get("userId")||"0"),this.setCurrentUserDetails(e.id))})}),this.sunscribeToGeoLocation()}sunscribeToGeoLocation(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition(e=>{this.latitude=e.coords.latitude,this.longitude=e.coords.longitude})}setCurrentUserDetails(e){return S(this,null,function*(){this.employee=yield this.appService.getEmployeeDetail(this.currentUserId,e),this.employee||(alert("No employee found"),this.router.navigate(["/"])),this.getCurrentDayAttance(this.employee.id),this.fetchSupervisorUsers()})}getCurrentDayAttance(e){return S(this,null,function*(){let n=yield this.appService.getCurrentDateAttendance(e);this.processCurentDayAttendance(n)})}processCurentDayAttendance(e){e?(this.currentDateAttendanceIndex=e.id,e.sign_in&&(this.signInTime=new Date(e.sign_in)),e.sign_out&&(this.signOutTime=new Date(e.sign_out))):this.currentDateAttendanceIndex=0}signIn(){return S(this,null,function*(){let e=yield this.appService.createAttendance({employee:this.employee.id,sign_in:new Date,sign_in_corrd:this.latitude+","+this.longitude});this.processCurentDayAttendance(e)})}signOut(){return S(this,null,function*(){let e=Math.round(this.employeeManagementService.getDifferenceInHours(this.signInTime,new Date)),r=this.employeeManagementService.calculateHourlyRate(this.employee.salary,new Date,this.employee.workingHours||8,this.employee.isSalaryHourly)*this.employeeManagementService.calculateWorkingHours(this.employee,e),d=yield this.appService.updateAttendance({id:this.currentDateAttendanceIndex,sign_out:new Date,sign_out_corrd:this.latitude+","+this.longitude,hours_worked:e,amount:r});this.processCurentDayAttendance(d)})}fetchSupervisorUsers(){return S(this,null,function*(){this.supervisorUsers=[{employee:this.employee,isSupervisor:!1}];let e=yield this.appService.getCurrentEmployeeSubordinates(this.currentUserId);e&&e.length&&(this.supervisorUsers=[...this.supervisorUsers,...e.map(n=>({employee:n,isSupervisor:!0}))])})}generateUserData(){let e=new Date("2024-01-01"),n=new Date("2024-01-31"),r=[],d=new Date(e);for(;d<=n;)r.push({date:d}),d=new Date(d.setDate(d.getDate()+1));return r}ngOnDestroy(){this.subOrganizationSubscription&&this.subOrganizationSubscription.unsubscribe()}};l.\u0275fac=function(n){return new(n||l)(v(Le),v(Ge),v(V),v(ie))},l.\u0275cmp=A({type:l,selectors:[["app-attendance"]],decls:12,vars:9,consts:[[1,"flex","center","space-between"],[4,"ngIf"],["nz-button","","nzType","primary","mat-button","",3,"click",4,"ngIf"],[3,"nzTitle",4,"ngFor","ngForOf"],["nz-button","","nzType","primary","mat-button","",3,"click"],[3,"nzTitle"],["titleTemplate",""],[3,"employee","isSupervisor",4,"ngIf"],[3,"employee","isSupervisor"]],template:function(n,r){n&1&&(o(0,"h1"),c(1,"Attendance"),a(),o(2,"div",0)(3,"strong"),c(4),h(5,"date"),a(),u(6,dn,3,4,"div",1)(7,un,2,0,"button",2)(8,_n,3,4,"div",1)(9,yn,2,0,"button",2),a(),o(10,"nz-tabset"),u(11,fn,4,2,"nz-tab",3),a()),n&2&&(s(4),w(C(5,6,r.currentDate,"longDate")),s(2),p("ngIf",r.signInTime),s(),p("ngIf",!r.signInTime),s(),p("ngIf",r.signOutTime),s(),p("ngIf",r.signInTime&&!r.signOutTime),s(2),p("ngForOf",r.supervisorUsers))},dependencies:[N,k,W,j,B,G,yt,_t,Ee,Y]});let i=l;return i})();function Cn(i,l){if(i&1){let t=x();o(0,"a",6),g("click",function(){_(t);let n=m().$implicit,r=m();return y(r.open(n))}),c(1,"Pay"),a()}}function xn(i,l){if(i&1&&(o(0,"tr")(1,"td"),c(2),a(),o(3,"td"),c(4),h(5,"currency"),a(),o(6,"td")(7,"span"),c(8),h(9,"date"),a()(),o(10,"td"),c(11),h(12,"currency"),a(),o(13,"td"),c(14),h(15,"currency"),a(),o(16,"td")(17,"span"),c(18),h(19,"currency"),a()(),o(20,"td"),u(21,Cn,2,0,"a",5),a()()),i&2){let t=l.$implicit,e=m();s(2),f("",t.employee==null||t.employee.employee==null?null:t.employee.employee.name," "),s(2),f("",C(5,7,t.employee==null?null:t.employee.salary," ")," "),s(4),f("",C(9,10,t.paymentObject==null?null:t.paymentObject.minDateCreated,"dd-mm-yyyy")," "),s(3),w(C(12,13,(t.paymentObject==null?null:t.paymentObject.totalAmount)||0," ")),s(3),f("",C(15,16,(t.paymentObject==null?null:t.paymentObject.balance)||0," ")," "),s(4),w(C(19,19,(t.paymentObject==null?null:t.paymentObject.advanceBalance)||0," ")),s(3),p("appHasPermission",e.appPermissions.EmployeeSalaryManagment)}}function vn(i,l){if(i&1&&z(0,"app-attendance-details",26),i&2){let t=m(2);p("employee",t.selectedEmployee.employee)}}function zn(i,l){if(i&1&&(o(0,"tr")(1,"td"),c(2),h(3,"date"),a(),o(4,"td"),c(5),h(6,"currency"),a(),o(7,"td"),c(8),h(9,"currency"),a(),o(10,"td"),c(11),a()()),i&2){let t=l.$implicit;s(2),f("",C(3,4,t.date_created,"EEEE d MMM yyyy")," "),s(3),f("",C(6,7,t.amount," ")," "),s(3),f("",C(9,10,t.balance," ")," "),s(3),f("",t.payment_notes," ")}}function Sn(i,l){i&1&&c(0," Payment History ")}function bn(i,l){i&1&&c(0," Advance History ")}function wn(i,l){if(i&1){let t=x();le(0),o(1,"h3")(2,"strong"),c(3," Employee Attendance "),a()(),u(4,vn,1,1,"app-attendance-details",7),o(5,"nz-row",8)(6,"nz-col",9)(7,"nz-card",10)(8,"div",11)(9,"h4")(10,"b"),c(11," Payment Amount "),a()(),o(12,"div")(13,"div",12)(14,"span")(15,"b"),c(16,"Amount:"),a()(),o(17,"span"),c(18),h(19,"currency"),a()(),o(20,"b"),c(21,"Notes"),a(),o(22,"div",13)(23,"span")(24,"b"),c(25,"Balance:"),a()(),o(26,"span"),c(27),h(28,"currency"),a()(),o(29,"input",14),O("ngModelChange",function(n){_(t);let r=m();return D(r.amountPayment,n)||(r.amountPayment=n),y(n)}),a(),o(30,"textarea",14),O("ngModelChange",function(n){_(t);let r=m();return D(r.paymentNotes,n)||(r.paymentNotes=n),y(n)}),a(),o(31,"button",15),g("click",function(){_(t);let n=m();return y(n.createPayment())}),c(32," Pay"),a()()(),o(33,"nz-collapse",16)(34,"nz-collapse-panel",17),g("nzActiveChange",function(n){_(t);let r=m();return y(r.getEmployeePayments(n))}),o(35,"p",18)(36,"nz-table",0,1)(38,"thead")(39,"tr")(40,"th"),c(41,"Date"),a(),o(42,"th"),c(43,"Amount"),a(),o(44,"th"),c(45,"Balance"),a(),o(46,"th"),c(47,"Notes"),a()()(),o(48,"tbody"),u(49,zn,12,13,"tr",2),a()()()()(),u(50,Sn,1,0,"ng-template",null,19,P),a()(),o(52,"nz-col",9)(53,"nz-card",10)(54,"div",11)(55,"h4")(56,"b"),c(57," Advance Payments "),a()(),o(58,"div",12)(59,"span"),c(60," \xA0"),a()(),o(61,"div",13)(62,"span")(63,"b"),c(64,"Balance:"),a()(),o(65,"span"),c(66),h(67,"currency"),a()(),o(68,"span")(69,"input",20),O("ngModelChange",function(n){_(t);let r=m();return D(r.amountPayment,n)||(r.amountPayment=n),y(n)}),a(),o(70,"span",21)(71,"nz-switch",22),O("ngModelChange",function(n){_(t);let r=m();return D(r.advancePayment,n)||(r.advancePayment=n),y(n)}),a(),o(72,"button",23),c(73),a()()()(),o(74,"nz-collapse",16)(75,"nz-collapse-panel",24)(76,"p",18),c(77," A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world. "),a()()(),u(78,bn,1,0,"ng-template",null,25,P),a()()(),se()}if(i&2){let t=M(51),e=M(79),n=m();s(4),p("ngIf",n.selectedEmployee),s(2),p("nzMd",12)("nzSm",24)("nzXs",24),s(12),f(" ",C(19,25,n.selectedEmployee.paymentObject.totalAmount||0,"PKR "),""),s(9),f(" ",C(28,28,n.selectedEmployee.paymentObject.balance||0,"PKR "),""),s(2),p("disabled",n.disablePayment),E("ngModel",n.amountPayment),s(),p("disabled",n.disablePayment),E("ngModel",n.paymentNotes),s(),p("disabled",n.disablePayment),s(3),p("nzHeader",t)("nzActive",n.activeSalaryHistory),s(2),p("nzData",n.payments)("nzBordered",!0),s(13),p("ngForOf",n.payments),s(3),p("nzMd",12)("nzSm",24)("nzXs",24),s(14),f(" ",C(67,31,n.selectedEmployee.paymentObject.advanceBalance||0,"PKR "),""),s(3),E("ngModel",n.amountPayment),s(2),E("ngModel",n.advancePayment),s(2),f(" ",n.advancePayment?"Pay":"Recieve",""),s(2),p("nzHeader",e)("nzActive",n.activeAdvanceHistory)}}var vt=(()=>{let l=class l{constructor(e,n,r){this.appService=e,this.media=n,this.employeeManagementService=r,this.appPermissions=X,this.today=new Date,this.amountPayment=0,this.advanceAmount=0,this.paymentNotes="",this.advancePayment=!0,this.disablePayment=!1,this.payments=[],this.visible=!1}ngOnInit(){this.subOrganizationSubscription=this.appService.currentSubOrganization.subscribe(e=>{e&&e.id>0&&this.setEmployeePayments(e.id)})}ngOnDestroy(){this.subOrganizationSubscription&&this.subOrganizationSubscription.unsubscribe}setEmployeePayments(e){return S(this,null,function*(){this.paymentData=yield this.appService.getEmployeePaymentsDetail(e)})}open(e){this.selectedEmployee=e,this.visible=!0,this.activeSalaryHistory=!1,this.activeAdvanceHistory=!1,this.amountPayment=0,this.advanceAmount=0,this.disablePayment=this.selectedEmployee?.paymentObject.minDateCreated&&this.employeeManagementService.isDateInLastOrCurrentMonth(this.selectedEmployee?.paymentObject.minDateCreated)}close(){this.visible=!1}isMobile(){return this.media.matchMedia("(max-width: 600px)").matches}createPayment(){return S(this,null,function*(){let e={payment_type:"salary",employee:this.selectedEmployee.employee.id,payment_notes:this.paymentNotes,amount:this.amountPayment,balance:this.selectedEmployee.paymentObject.balance+this.selectedEmployee.paymentObject.totalAmount-this.amountPayment};yield this.appService.createPayment(e),this.visible=!1,this.paymentData=yield this.appService.getEmployeePaymentsDetail()})}getEmployeePayments(e){return S(this,null,function*(){e&&(this.payments=[],this.payments=yield this.appService.getPayments(this.selectedEmployee.employee.id))})}};l.\u0275fac=function(n){return new(n||l)(v(V),v(Xe),v(ie))},l.\u0275cmp=A({type:l,selectors:[["app-pay-processing"]],decls:24,vars:7,consts:[["nzShowPagination","false",3,"nzData","nzBordered"],["basicTable",""],[4,"ngFor","ngForOf"],["nzPlacement","right",3,"nzClosable","nzVisible","nzTitle","nzWidth","nzOnClose"],[4,"nzDrawerContent"],["nzType","primary",3,"click",4,"appHasPermission"],["nzType","primary",3,"click"],[3,"employee",4,"ngIf"],["nzGutter","4",2,"margin-top","12px"],[3,"nzMd","nzSm","nzXs"],[2,"width","100%","margin-top","12px"],[2,"width","100%","display","inline-block"],[1,"flex","space-between"],[1,"flex","space-between",2,"margin-bottom","10px"],["nz-input","",3,"disabled","ngModel","ngModelChange"],["nz-button","","nzType","primary","nzSize","small",2,"margin-top","12px","float","right",3,"disabled","click"],["nzGhost",""],[3,"nzHeader","nzActive","nzActiveChange"],[2,"margin","0"],["expandTitle",""],["nz-input","",3,"ngModel","ngModelChange"],[1,"flex","space-between",2,"width","100%","margin-top","12px","float","right"],["nzCheckedChildren","Pay","nzUnCheckedChildren","Recieve",3,"ngModel","ngModelChange"],["nz-button","","nzType","primary","nzSize","small"],[3,"nzHeader","nzActive"],["expandAdvanceTitle",""],[3,"employee"]],template:function(n,r){n&1&&(o(0,"h3"),c(1,"Employee Payments"),a(),o(2,"nz-table",0,1)(4,"thead")(5,"tr")(6,"th"),c(7,"Employee"),a(),o(8,"th"),c(9,"Salary"),a(),o(10,"th"),c(11,"Payment From"),a(),o(12,"th"),c(13,"Amount"),a(),o(14,"th"),c(15,"Balance"),a(),o(16,"th"),c(17,"Advance Balance"),a(),o(18,"th"),c(19," Proceed For Payment "),a()()(),o(20,"tbody"),u(21,xn,22,22,"tr",2),a()(),o(22,"nz-drawer",3),g("nzOnClose",function(){return r.close()}),u(23,wn,80,34,"ng-container",4),a()),n&2&&(s(2),p("nzData",r.paymentData)("nzBordered",!0),s(19),p("ngForOf",r.paymentData),s(),p("nzClosable",!1)("nzVisible",r.visible)("nzTitle","Payment for Employee: "+(r.selectedEmployee==null||r.selectedEmployee.employee==null?null:r.selectedEmployee.employee.employee.name))("nzWidth",r.isMobile()?"100%":"50%"))},dependencies:[N,k,W,j,B,lt,ct,st,ye,_e,ge,he,L,Ce,ee,G,J,ne,Q,te,R,U,Z,xe,Ee,me,Y]});let i=l;return i})();var En=[{path:"",component:ft,data:{name:"All Employee"}},{path:"pay-processing",component:vt,data:{name:"Payment",permission:X.EmployeeSalaryManagment},canActivate:[Qe]},{path:":employeeId",component:we,data:{name:"Employee"}},{path:":userId/attendance",component:xt,data:{name:"Attendance"}}],zt=(()=>{let l=class l{};l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=oe({type:l}),l.\u0275inj=re({imports:[Ie.forChild(En),Ie]});let i=l;return i})();var St=(()=>{let l=class l{constructor(e){this.sanitizer=e}transform(e){return this.sanitizer.bypassSecurityTrustResourceUrl(e)}};l.\u0275fac=function(n){return new(n||l)(v(Ue,16))},l.\u0275pipe=He({name:"safe",type:l,pure:!0,standalone:!0});let i=l;return i})();var bt=$e,Dn=Object.keys(bt).map(i=>bt[i]),Oi=(()=>{let l=class l{};l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=oe({type:l}),l.\u0275inj=re({providers:[{provide:Je,useValue:Ze},{provide:Ke,useValue:Dn},ve,St],imports:[zt,Re,ht,ot,at,gt]});let i=l;return i})();export{Oi as EmployeeManagementModule};
