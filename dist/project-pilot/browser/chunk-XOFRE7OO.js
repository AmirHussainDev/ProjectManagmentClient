import{a as Fe}from"./chunk-MQLXLLFS.js";import{a as Ne}from"./chunk-US7SBZSK.js";import{$ as b,Ad as Ee,Bd as Me,Cd as we,Da as I,Db as U,Dd as be,Ea as l,Fa as R,Fb as j,G as M,Ga as f,Ha as A,Hd as Ve,Ja as k,K as L,Ka as D,L as w,La as P,Oa as O,Pa as T,Qb as $,R as d,S as u,Sa as v,Ua as x,Ub as Q,Uc as de,Va as F,Vb as X,Vc as ue,Wb as Z,Xb as H,Xc as fe,Yc as ge,Zc as ye,_ as a,_c as ze,bc as J,cc as Y,eb as K,f as S,fa as y,fb as B,fc as ee,hc as E,ia as p,ic as te,jc as ne,lb as W,mb as G,mc as ie,na as q,nc as oe,oc as re,ra as n,rc as ae,sa as i,sc as le,sd as he,ta as g,ua as V,uc as me,ud as ve,va as N,vc as pe,vd as xe,wc as ce,wd as Ce,xa as C,xc as se,xd as Se,ya as z,yc as _e,yd as Ie,za as _,zd as Te}from"./chunk-RYV5VKQF.js";var je=()=>["/","task","task"],De=t=>({TASK:t}),Le=()=>["/","task","sales","sale"],qe=t=>({SALE:t}),Re=t=>["/","sites",t];function Ae(t,s){if(t&1){let e=C();n(0,"span",22),z("click",function(){d(e);let o=_(2);return o.searchValue="",u(o.search())}),i()}}function Ke(t,s){t&1&&g(0,"span",21)}function Be(t,s){if(t&1&&y(0,Ae,1,0,"span",20)(1,Ke,1,0,"span",21),t&2){let e=_();q(e.searchValue?0:1)}}function We(t,s){t&1&&g(0,"span",21)}function Ge(t,s){t&1&&(n(0,"nz-form-item")(1,"nz-form-label",24),l(2,"TASK Number"),i(),n(3,"nz-form-control"),g(4,"input",32),i()())}function Ue(t,s){t&1&&(n(0,"nz-form-item")(1,"nz-form-label",24),l(2,"Sale Id"),i(),n(3,"nz-form-control"),g(4,"input",33),i()())}function $e(t,s){if(t&1){let e=C();V(0),n(1,"form",23),z("ngSubmit",function(){d(e);let o=_();return u(o.submitForm())}),n(2,"nz-form-item")(3,"nz-form-label",24),l(4,"Stock In"),i(),n(5,"nz-form-control"),g(6,"nz-switch",25),i()(),y(7,Ge,5,0,"nz-form-item",26)(8,Ue,5,0,"nz-form-item",26),n(9,"nz-form-item")(10,"nz-form-label",24),l(11,"Item name"),i(),n(12,"nz-form-control"),g(13,"input",27),i()(),n(14,"nz-form-item")(15,"nz-form-label",24),l(16,"Project"),i(),n(17,"nz-form-control"),g(18,"input",28),i()(),n(19,"nz-form-item")(20,"nz-form-label",24),l(21,"Quantity"),i(),n(22,"nz-form-control")(23,"input",29),z("ngModelChange",function(){d(e);let o=_();return u(o.setTotal())}),i()()(),n(24,"nz-form-item")(25,"nz-form-label",24),l(26,"Unit Price"),i(),n(27,"nz-form-control")(28,"input",30),z("ngModelChange",function(){d(e);let o=_();return u(o.setTotal())}),i()()(),n(29,"nz-form-item")(30,"nz-form-label",24),l(31,"Total"),i(),n(32,"nz-form-control")(33,"h4"),l(34),v(35,"currency"),i()()(),n(36,"nz-form-item")(37,"nz-form-label",24),l(38,"Description"),i(),n(39,"nz-form-control"),g(40,"textarea",31),i()()(),N()}if(t&2){let e,m,o,r=_();a(),p("formGroup",r.inventoryItemForm),a(6),p("ngIf",(e=r.inventoryItemForm.get("stock_in"))==null?null:e.value),a(),p("ngIf",!((m=r.inventoryItemForm.get("stock_in"))!=null&&m.value)),a(26),R(x(35,4,(o=r.inventoryItemForm.get("total"))==null?null:o.value,"PKR "))}}function Qe(t,s){if(t&1&&(n(0,"th",34),l(1),i()),t&2){let e=s.$implicit;p("nzSortFn",e.compare)("nzSortPriority",e.priority),a(),f(" ",e.title," ")}}function Xe(t,s){if(t&1&&(n(0,"a",43),l(1),i()),t&2){let e=_().$implicit;p("routerLink",O(3,je))("queryParams",T(4,De,e.task_no)),a(),f("TASK -",e.task_no,"")}}function Ze(t,s){if(t&1&&(n(0,"a",43),l(1),i()),t&2){let e=_().$implicit;p("routerLink",O(3,Le))("queryParams",T(4,qe,e.sale_no)),a(),f("SALE -",e.sale_no||e.sale_id,"")}}function He(t,s){if(t&1&&(n(0,"a",43),l(1),i()),t&2){let e=_().$implicit;p("routerLink",T(3,Re,e.site_id))("queryParams",T(5,De,e.sale_no)),a(),f("SITE -",e.site_no||e.site_id,"")}}function Je(t,s){if(t&1&&(V(0),n(1,"tr",41)(2,"td"),y(3,Xe,2,6,"a",42)(4,Ze,2,6,"a",42)(5,He,2,7,"a",42),i(),n(6,"td"),l(7),i(),n(8,"td"),l(9),v(10,"currency"),i(),n(11,"td"),l(12),v(13,"currency"),i()(),N()),t&2){let e=s.$implicit;a(),p("className",e.stock_in?"task-row":"sale-row"),a(2),p("ngIf",e.stock_in),a(),p("ngIf",!e.stock_in&&e.sale_no),a(),p("ngIf",!e.stock_in&&(e.site_no||e.site_id)),a(2),A(" ",e.stock_in?"+":"-"," ",e.qty," "),a(2),f(" ",x(10,8,e.unit_price,"PKR ")," "),a(3),f(" ",x(13,11,e.total,"PKR ")," ")}}function Ye(t,s){if(t&1){let e=C();n(0,"span",46),z("click",function(){d(e);let o=_(2).$implicit,r=_();return u(r.onExpandChange(o.item_name,!0,o.id))}),i()}}function et(t,s){if(t&1){let e=C();n(0,"span",47),z("click",function(){d(e);let o=_(2).$implicit,r=_();return u(r.onExpandChange(o.item_name,!1,o.id))}),i()}}function tt(t,s){if(t&1&&y(0,Ye,1,0,"span",44)(1,et,1,0,"span",45),t&2){let e=_().$implicit,m=_();p("ngIf",!m.expandSet.has(e.item_name)),a(),p("ngIf",m.expandSet.has(e.item_name))}}function nt(t,s){if(t&1&&(V(0),n(1,"tr"),g(2,"td",35),n(3,"td"),l(4),i(),n(5,"td"),l(6),i(),n(7,"td"),l(8),i(),n(9,"td"),l(10),v(11,"currency"),i(),n(12,"td"),l(13),v(14,"currency"),i(),n(15,"td"),l(16),v(17,"currency"),i()(),n(18,"tr",36)(19,"nz-table",37)(20,"thead")(21,"tr")(22,"th",38),l(23,"Reference #"),i(),n(24,"th",38),l(25,"Quantity"),i(),n(26,"th",39),l(27,"Unit Price"),i(),n(28,"th",40),l(29,"Total"),i()()(),n(30,"tbody"),y(31,Je,14,14,"ng-container",19),i()()(),y(32,tt,2,2,"ng-template",null,3,F),N()),t&2){let e=s.$implicit,m=I(33),o=_();a(2),p("nzExpand",o.expandSet.has(e.item_name))("nzExpandIcon",m),a(2),f(" ",e.item_name," "),a(2),f(" ",e.project_name," "),a(2),f(" ",e.qty," "),a(2),f(" ",x(11,15,e.latest_unit_price,"PKR ")," "),a(3),f(" ",x(14,18,e.avg_unit_price,"PKR ")," "),a(3),f(" ",x(17,21,e.qty*e.latest_unit_price,"PKR ")," "),a(2),p("nzExpand",o.expandSet.has(e.item_name)),a(),p("nzPageSize",1e3)("nzShowPagination",!1)("nzData",e.subDetails)("nzFrontPagination",!1)("nzLoading",o.loading),a(12),p("ngForOf",e.subDetails)}}var Pe=(()=>{class t{constructor(e,m,o){this.fb=e,this.exportSheetService=m,this.appService=o,this.inventory=[],this.loading=!1,this.projectItems=[],this.isVisible=!1,this.expandSet=new Set,this.currentOrganizationId=0,this.listOfColumn=[{title:"Name",compare:(r,c)=>r.name.localeCompare(c.name),priority:!1},{title:"Project",compare:(r,c)=>r.project_name.localeCompare(c.project_name),priority:2},{title:"Qunantity",compare:(r,c)=>r.qty-c.qty,priority:3},{title:"Latest Unit Price",compare:(r,c)=>r.latest_unit_price-c.latest_unit_price,priority:4},{title:"Average Unit Price",compare:(r,c)=>r.avg_unit_price-c.avg_unit_price,priority:5},{title:"Total",compare:(r,c)=>r.total-c.total,priority:5}],this.inventoryItemForm=this.fb.group({task_id:[null],sale_id:[null],stock_in:[!0,E.required],name:[null,E.required],project_id:[0],qty:[null,E.required],unit_price:[null,E.required],description:[null],total:[null]})}onExpandChange(e,m,o){return S(this,null,function*(){m?(this.inventory.find(r=>r.name===e).expanded||(this.inventory.find(r=>r.name===e).subDetails=yield this.appService.getInventoryItemDetails(e),this.inventory.find(r=>r.name===e).expanded=!0),this.expandSet.add(e)):this.expandSet.delete(e)})}export(){let e=this.listOfDisplayData;this.exportSheetService.exportDataToXLSX(e,"Inventory")}handleCancel(){console.log("Button cancel clicked!"),this.isVisible=!1,this.inventoryItemForm.reset()}ngOnInit(){this.clientSubscription=this.appService.currentClient.subscribe(e=>{e&&e.id>0&&this.currentOrganizationId!=e.id&&(this.currentOrganizationId=e.id,this.loadInventory())})}ngOnDestroy(){this.clientSubscription&&this.clientSubscription.unsubscribe()}loadInventory(){return S(this,null,function*(){this.loading=!0,this.inventory=yield this.appService.getInventory(),this.listOfDisplayData=this.inventory,this.loading=!1})}onProjectChange(){return S(this,null,function*(){this.projectItems=yield this.appService.getProjectItems(this.selectedProject?.id)})}addOrUpdateItem(){}deleteItem(e){}editItem(e){}addItem(){}clearForm(){}submitForm(){return S(this,null,function*(){if(this.inventoryItemForm.valid){let e=yield this.appService.addInventory(this.inventoryItemForm.getRawValue());console.log(e),this.isVisible=!1,this.inventoryItemForm.reset(),this.loadInventory()}})}setTotal(){this.inventoryItemForm.get("total")?.setValue(this.inventoryItemForm.get("qty")?.value*this.inventoryItemForm.get("unit_price")?.value)}search(){this.searchVisible=!1,this.searchValue?(this.listOfDisplayData=this.inventory.filter(e=>e.project_name&&e.project_name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1||e.item_name&&e.item_name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1),console.log(this.listOfDisplayData)):this.listOfDisplayData=this.inventory}static{this.\u0275fac=function(m){return new(m||t)(b(le),b(Ne),b($))}}static{this.\u0275cmp=L({type:t,selectors:[["app-inventory-management"]],decls:25,vars:14,consts:[["inputClearTpl",""],["suffixIconSearch",""],["sortTable",""],["expandIcon",""],[1,"container"],[1,"section"],[1,"flex","space-between"],[2,"display","-webkit-box","width","100%"],[2,"margin-right","5px"],[3,"nzSuffix"],["type","text","placeholder","Search here","nz-input","",3,"ngModelChange","keyup","ngModel"],[2,"margin-left","10px",3,"click"],["nz-button","","nzType","primary",3,"nzSize"],["nz-icon","","nzType","download"],["nzTitle","Add inventory item",3,"nzVisibleChange","nzOnCancel","nzOnOk","nzVisible","nzOkText","nzOkDisabled"],[4,"nzModalContent"],[3,"nzShowPagination","nzPageSize","nzData","nzFrontPagination","nzLoading"],["nzWidth","60px"],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon"],["nz-icon","","nzType","search"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-form","",3,"ngSubmit","formGroup"],["nzRequired",""],["formControlName","stock_in"],[4,"ngIf"],["nz-input","","formControlName","name"],["nz-input","","formControlName","project_id"],["nz-input","","formControlName","qty",3,"ngModelChange"],["nz-input","","formControlName","unit_price",3,"ngModelChange"],["nz-input","","formControlName","description"],["nz-input","","formControlName","task_id"],["nz-input","","formControlName","sale_id"],[3,"nzSortFn","nzSortPriority"],[3,"nzExpand","nzExpandIcon"],[3,"nzExpand"],[3,"nzPageSize","nzShowPagination","nzData","nzFrontPagination","nzLoading"],["nzColumnKey","qty"],["nzColumnKey","latest_unit_price"],["nzColumnKey","total"],[3,"className"],["href","",3,"routerLink","queryParams",4,"ngIf"],["href","",3,"routerLink","queryParams"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click"]],template:function(m,o){if(m&1){let r=C();n(0,"div",4)(1,"div",5)(2,"div",6)(3,"span",7)(4,"h3",8),l(5," Inventory "),i(),n(6,"nz-input-group",9)(7,"input",10),P("ngModelChange",function(h){return d(r),D(o.searchValue,h)||(o.searchValue=h),u(h)}),z("keyup",function(){return d(r),u(o.search())}),i()(),y(8,Be,2,1,"ng-template",null,0,F)(10,We,1,0,"ng-template",null,1,F),i(),n(12,"a",11),z("click",function(){return d(r),u(o.export())}),n(13,"button",12),g(14,"span",13),i()()(),n(15,"nz-modal",14),P("nzVisibleChange",function(h){return d(r),D(o.isVisible,h)||(o.isVisible=h),u(h)}),z("nzOnCancel",function(){return d(r),u(o.handleCancel())})("nzOnOk",function(){return d(r),u(o.submitForm())}),y(16,$e,41,7,"ng-container",15),i(),n(17,"nz-table",16,2)(19,"thead")(20,"tr"),g(21,"th",17),y(22,Qe,2,3,"th",18),i()(),n(23,"tbody"),y(24,nt,34,24,"ng-container",19),i()()()()}if(m&2){let r=I(9),c=I(11),h=I(18);a(6),p("nzSuffix",c)("nzSuffix",r),a(),k("ngModel",o.searchValue),a(6),p("nzSize","small"),a(2),k("nzVisible",o.isVisible),p("nzOkText","Submit")("nzOkDisabled",!o.inventoryItemForm.valid),a(2),p("nzShowPagination",!1)("nzPageSize",1e3)("nzData",o.listOfDisplayData)("nzFrontPagination",!1)("nzLoading",o.loading),a(5),p("ngForOf",o.listOfColumn),a(2),p("ngForOf",h.data)}},dependencies:[U,K,B,H,X,Z,Q,ue,de,ge,fe,ze,ye,ce,_e,se,Y,J,he,Ee,Ce,ve,Se,xe,we,Te,Me,be,Ie,oe,ee,te,ne,re,ae,ie,W]})}}return t})();var it=[{path:"",component:Pe,data:{name:" "}}],Oe=(()=>{class t{static{this.\u0275fac=function(m){return new(m||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=M({imports:[j.forChild(it),j]})}}return t})();var Ft=(()=>{class t{static{this.\u0275fac=function(m){return new(m||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=M({imports:[Oe,G,Ve,pe,Fe,me]})}}return t})();export{Ft as InventoryManagementModule};
