import{a as ke}from"./chunk-H24IXQUR.js";import{a as Fe}from"./chunk-MXNMPF3F.js";import{Ab as j,Ca as I,Da as m,Ea as R,F as L,Fa as u,G as b,Ga as B,Ha as D,Ia as P,J as y,Ja as O,K as h,Lb as $,Ma as V,Mc as de,N as M,Na as T,Nc as ue,Pb as Q,Pc as fe,Qa as x,Qb as X,Qc as ge,Rb as Z,Rc as ze,Sa as v,Sb as H,Sc as ye,Ta as k,Yb as J,Z as l,Zb as Y,_ as N,ac as ee,cb as A,cc as E,db as K,dc as te,ec as ne,f as C,ga as g,hb as W,hc as ie,ia as s,ib as G,ic as oe,jc as re,kd as he,ld as xe,mc as ae,md as ve,na as q,nc as le,nd as Ce,od as Se,pc as me,pd as Ie,qc as pe,qd as Te,ra as n,rc as ce,rd as Ee,sa as i,sc as se,sd as be,ta as f,tc as _e,td as Me,ua as w,ud as Ne,va as F,wa as S,xa as z,ya as d,yb as U,yd as we}from"./chunk-ALEK3DEW.js";function Le(t,r){if(t&1){let e=S();n(0,"span",20),z("click",function(){y(e);let a=d(2);return a.searchValue="",h(a.search())}),i()}}function qe(t,r){t&1&&f(0,"span",21)}function Re(t,r){if(t&1&&g(0,Le,1,0,"span",19)(1,qe,1,0),t&2){let e=d();q(0,e.searchValue?0:1)}}function Be(t,r){t&1&&f(0,"span",21)}function Ae(t,r){t&1&&(n(0,"nz-form-item")(1,"nz-form-label",23),m(2,"TASK Number"),i(),n(3,"nz-form-control"),f(4,"input",31),i()())}function Ke(t,r){t&1&&(n(0,"nz-form-item")(1,"nz-form-label",23),m(2,"Sale Id"),i(),n(3,"nz-form-control"),f(4,"input",32),i()())}function We(t,r){if(t&1){let e=S();w(0),n(1,"form",22),z("ngSubmit",function(){y(e);let a=d();return h(a.submitForm())}),n(2,"nz-form-item")(3,"nz-form-label",23),m(4,"Stock In"),i(),n(5,"nz-form-control"),f(6,"nz-switch",24),i()(),g(7,Ae,5,0,"nz-form-item",25)(8,Ke,5,0,"nz-form-item",25),n(9,"nz-form-item")(10,"nz-form-label",23),m(11,"Item name"),i(),n(12,"nz-form-control"),f(13,"input",26),i()(),n(14,"nz-form-item")(15,"nz-form-label",23),m(16,"Project"),i(),n(17,"nz-form-control"),f(18,"input",27),i()(),n(19,"nz-form-item")(20,"nz-form-label",23),m(21,"Quantity"),i(),n(22,"nz-form-control")(23,"input",28),z("ngModelChange",function(){y(e);let a=d();return h(a.setTotal())}),i()()(),n(24,"nz-form-item")(25,"nz-form-label",23),m(26,"Unit Price"),i(),n(27,"nz-form-control")(28,"input",29),z("ngModelChange",function(){y(e);let a=d();return h(a.setTotal())}),i()()(),n(29,"nz-form-item")(30,"nz-form-label",23),m(31,"Total"),i(),n(32,"nz-form-control")(33,"h4"),m(34),x(35,"currency"),i()()(),n(36,"nz-form-item")(37,"nz-form-label",23),m(38,"Description"),i(),n(39,"nz-form-control"),f(40,"textarea",30),i()()(),F()}if(t&2){let e=d(),o,a,c;l(),s("formGroup",e.inventoryItemForm),l(6),s("ngIf",(o=e.inventoryItemForm.get("stock_in"))==null?null:o.value),l(),s("ngIf",!((a=e.inventoryItemForm.get("stock_in"))!=null&&a.value)),l(26),R(v(35,4,(c=e.inventoryItemForm.get("total"))==null?null:c.value,"PKR "))}}function Ge(t,r){if(t&1&&(n(0,"th",33),m(1),i()),t&2){let e=r.$implicit;s("nzSortFn",e.compare)("nzSortPriority",e.priority),l(),u(" ",e.title," ")}}var Ue=()=>["/","task","task"],Pe=t=>({TASK:t});function $e(t,r){if(t&1&&(n(0,"a",43),m(1),i()),t&2){let e=d().$implicit;s("routerLink",V(3,Ue))("queryParams",T(4,Pe,e.task_no)),l(),u("TASK -",e.task_no,"")}}var Qe=()=>["/","task","sales","sale"],Xe=t=>({SALE:t});function Ze(t,r){if(t&1&&(n(0,"a",43),m(1),i()),t&2){let e=d().$implicit;s("routerLink",V(3,Qe))("queryParams",T(4,Xe,e.sale_no)),l(),u("SALE -",e.sale_no||e.sale_id,"")}}var He=t=>["/","sites",t];function Je(t,r){if(t&1&&(n(0,"a",43),m(1),i()),t&2){let e=d().$implicit;s("routerLink",T(3,He,e.site_id))("queryParams",T(5,Pe,e.sale_no)),l(),u("SITE -",e.site_no||e.site_id,"")}}function Ye(t,r){if(t&1&&(w(0),n(1,"tr",41)(2,"td"),g(3,$e,2,6,"a",42)(4,Ze,2,6,"a",42)(5,Je,2,7,"a",42),i(),n(6,"td"),m(7),i(),n(8,"td"),m(9),x(10,"currency"),i(),n(11,"td"),m(12),x(13,"currency"),i()(),F()),t&2){let e=r.$implicit;l(),s("className",e.stock_in?"task-row":"sale-row"),l(2),s("ngIf",e.stock_in),l(),s("ngIf",!e.stock_in&&e.sale_no),l(),s("ngIf",!e.stock_in&&(e.site_no||e.site_id)),l(2),B(" ",e.stock_in?"+":"-"," ",e.qty," "),l(2),u(" ",v(10,8,e.unit_price,"PKR ")," "),l(3),u(" ",v(13,11,e.total,"PKR ")," ")}}function et(t,r){if(t&1){let e=S();n(0,"span",46),z("click",function(){y(e);let a=d(2).$implicit,c=d();return h(c.onExpandChange(a.item_name,!0,a.id))}),i()}}function tt(t,r){if(t&1){let e=S();n(0,"span",47),z("click",function(){y(e);let a=d(2).$implicit,c=d();return h(c.onExpandChange(a.item_name,!1,a.id))}),i()}}function nt(t,r){if(t&1&&g(0,et,1,0,"span",44)(1,tt,1,0,"span",45),t&2){let e=d().$implicit,o=d();s("ngIf",!o.expandSet.has(e.item_name)),l(),s("ngIf",o.expandSet.has(e.item_name))}}function it(t,r){if(t&1&&(w(0),n(1,"tr"),f(2,"td",34),n(3,"td"),m(4),i(),n(5,"td"),m(6),i(),n(7,"td"),m(8),i(),n(9,"td"),m(10),x(11,"currency"),i(),n(12,"td"),m(13),x(14,"currency"),i(),n(15,"td"),m(16),x(17,"currency"),i()(),n(18,"tr",35)(19,"nz-table",36)(20,"thead")(21,"tr")(22,"th",37),m(23,"Reference #"),i(),n(24,"th",37),m(25,"Quantity"),i(),n(26,"th",38),m(27,"Unit Price"),i(),n(28,"th",39),m(29,"Total"),i()()(),n(30,"tbody"),g(31,Ye,14,14,"ng-container",18),i()()(),g(32,nt,2,2,"ng-template",null,40,k),F()),t&2){let e=r.$implicit,o=I(33),a=d();l(2),s("nzExpand",a.expandSet.has(e.item_name))("nzExpandIcon",o),l(2),u(" ",e.item_name," "),l(2),u(" ",e.project_name," "),l(2),u(" ",e.qty," "),l(2),u(" ",v(11,15,e.latest_unit_price,"PKR ")," "),l(3),u(" ",v(14,18,e.avg_unit_price,"PKR ")," "),l(3),u(" ",v(17,21,e.qty*e.latest_unit_price,"PKR ")," "),l(2),s("nzExpand",a.expandSet.has(e.item_name)),l(),s("nzPageSize",1e3)("nzShowPagination",!1)("nzData",e.subDetails)("nzFrontPagination",!1)("nzLoading",a.loading),l(12),s("ngForOf",e.subDetails)}}var Oe=(()=>{let r=class r{constructor(o,a,c){this.fb=o,this.exportSheetService=a,this.appService=c,this.inventory=[],this.loading=!1,this.projectItems=[],this.isVisible=!1,this.expandSet=new Set,this.currentOrganizationId=0,this.listOfColumn=[{title:"Name",compare:(p,_)=>p.name.localeCompare(_.name),priority:!1},{title:"Project",compare:(p,_)=>p.project_name.localeCompare(_.project_name),priority:2},{title:"Qunantity",compare:(p,_)=>p.qty-_.qty,priority:3},{title:"Latest Unit Price",compare:(p,_)=>p.latest_unit_price-_.latest_unit_price,priority:4},{title:"Average Unit Price",compare:(p,_)=>p.avg_unit_price-_.avg_unit_price,priority:5},{title:"Total",compare:(p,_)=>p.total-_.total,priority:5}],this.inventoryItemForm=this.fb.group({task_id:[null],sale_id:[null],stock_in:[!0,E.required],name:[null,E.required],project_id:[0],qty:[null,E.required],unit_price:[null,E.required],description:[null],total:[null]})}onExpandChange(o,a,c){return C(this,null,function*(){a?(this.inventory.find(p=>p.name===o).expanded||(this.inventory.find(p=>p.name===o).subDetails=yield this.appService.getInventoryItemDetails(o),this.inventory.find(p=>p.name===o).expanded=!0),this.expandSet.add(o)):this.expandSet.delete(o)})}export(){let o=this.listOfDisplayData;this.exportSheetService.exportDataToXLSX(o,"Inventory")}handleCancel(){console.log("Button cancel clicked!"),this.isVisible=!1,this.inventoryItemForm.reset()}ngOnInit(){this.clientSubscription=this.appService.currentClient.subscribe(o=>{o&&o.id>0&&this.currentOrganizationId!=o.id&&(this.currentOrganizationId=o.id,this.loadInventory())})}ngOnDestroy(){this.clientSubscription&&this.clientSubscription.unsubscribe()}loadInventory(){return C(this,null,function*(){this.loading=!0,this.inventory=yield this.appService.getInventory(),this.listOfDisplayData=this.inventory,this.loading=!1})}onProjectChange(){return C(this,null,function*(){this.projectItems=yield this.appService.getProjectItems(this.selectedProject?.id)})}addOrUpdateItem(){}deleteItem(o){}editItem(o){}addItem(){}clearForm(){}submitForm(){return C(this,null,function*(){if(this.inventoryItemForm.valid){let o=yield this.appService.addInventory(this.inventoryItemForm.getRawValue());console.log(o),this.isVisible=!1,this.inventoryItemForm.reset(),this.loadInventory()}})}setTotal(){this.inventoryItemForm.get("total")?.setValue(this.inventoryItemForm.get("qty")?.value*this.inventoryItemForm.get("unit_price")?.value)}search(){this.searchVisible=!1,this.searchValue?(this.listOfDisplayData=this.inventory.filter(o=>o.project_name&&o.project_name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1||o.item_name&&o.item_name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1),console.log(this.listOfDisplayData)):this.listOfDisplayData=this.inventory}};r.\u0275fac=function(a){return new(a||r)(N(le),N(Fe),N($))},r.\u0275cmp=L({type:r,selectors:[["app-inventory-management"]],decls:25,vars:14,consts:[[1,"container"],[1,"section"],[1,"flex","space-between"],[2,"display","-webkit-box","width","100%"],[2,"margin-right","5px"],[3,"nzSuffix"],["type","text","placeholder","Search here","nz-input","",3,"ngModel","ngModelChange","keyup"],["inputClearTpl",""],["suffixIconSearch",""],[2,"margin-left","10px",3,"click"],["nz-button","","nzType","primary",3,"nzSize"],["nz-icon","","nzType","download"],["nzTitle","Add inventory item",3,"nzVisible","nzOkText","nzOkDisabled","nzVisibleChange","nzOnCancel","nzOnOk"],[4,"nzModalContent"],[3,"nzShowPagination","nzPageSize","nzData","nzFrontPagination","nzLoading"],["sortTable",""],["nzWidth","60px"],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-icon","","nzType","search"],["nz-form","",3,"formGroup","ngSubmit"],["nzRequired",""],["formControlName","stock_in"],[4,"ngIf"],["nz-input","","formControlName","name"],["nz-input","","formControlName","project_id"],["nz-input","","formControlName","qty",3,"ngModelChange"],["nz-input","","formControlName","unit_price",3,"ngModelChange"],["nz-input","","formControlName","description"],["nz-input","","formControlName","task_id"],["nz-input","","formControlName","sale_id"],[3,"nzSortFn","nzSortPriority"],[3,"nzExpand","nzExpandIcon"],[3,"nzExpand"],[3,"nzPageSize","nzShowPagination","nzData","nzFrontPagination","nzLoading"],["nzColumnKey","qty"],["nzColumnKey","latest_unit_price"],["nzColumnKey","total"],["expandIcon",""],[3,"className"],["href","",3,"routerLink","queryParams",4,"ngIf"],["href","",3,"routerLink","queryParams"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click"]],template:function(a,c){if(a&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3)(4,"h3",4),m(5," Inventory "),i(),n(6,"nz-input-group",5)(7,"input",6),O("ngModelChange",function(_){return P(c.searchValue,_)||(c.searchValue=_),_}),z("keyup",function(){return c.search()}),i()(),g(8,Re,2,1,"ng-template",null,7,k)(10,Be,1,0,"ng-template",null,8,k),i(),n(12,"a",9),z("click",function(){return c.export()}),n(13,"button",10),f(14,"span",11),i()()(),n(15,"nz-modal",12),O("nzVisibleChange",function(_){return P(c.isVisible,_)||(c.isVisible=_),_}),z("nzOnCancel",function(){return c.handleCancel()})("nzOnOk",function(){return c.submitForm()}),g(16,We,41,7,"ng-container",13),i(),n(17,"nz-table",14,15)(19,"thead")(20,"tr"),f(21,"th",16),g(22,Ge,2,3,"th",17),i()(),n(23,"tbody"),g(24,it,34,24,"ng-container",18),i()()()()),a&2){let p=I(9),_=I(11),je=I(18);l(6),s("nzSuffix",_)("nzSuffix",p),l(),D("ngModel",c.searchValue),l(6),s("nzSize","small"),l(2),D("nzVisible",c.isVisible),s("nzOkText","Submit")("nzOkDisabled",!c.inventoryItemForm.valid),l(2),s("nzShowPagination",!1)("nzPageSize",1e3)("nzData",c.listOfDisplayData)("nzFrontPagination",!1)("nzLoading",c.loading),l(5),s("ngForOf",c.listOfColumn),l(2),s("ngForOf",je.data)}},dependencies:[U,A,K,H,X,Z,Q,ue,de,ge,fe,ye,ze,ce,_e,se,Y,J,he,Ee,Ce,xe,Se,ve,Me,Te,be,Ne,Ie,oe,ee,te,ne,re,ae,ie,W]});let t=r;return t})();var ot=[{path:"",component:Oe,data:{name:" "}}],Ve=(()=>{let r=class r{};r.\u0275fac=function(a){return new(a||r)},r.\u0275mod=b({type:r}),r.\u0275inj=M({imports:[j.forChild(ot),j]});let t=r;return t})();var Dt=(()=>{let r=class r{};r.\u0275fac=function(a){return new(a||r)},r.\u0275mod=b({type:r}),r.\u0275inj=M({imports:[Ve,G,we,pe,ke,me]});let t=r;return t})();export{Dt as InventoryManagementModule};