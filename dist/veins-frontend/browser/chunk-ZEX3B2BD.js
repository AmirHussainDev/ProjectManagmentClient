import{a as Me}from"./chunk-V3EHZM4M.js";import{$ as R,A as y,Aa as v,Ab as X,B as h,Ca as x,Cb as b,Da as N,Db as Y,E as F,Eb as ee,Hb as te,Ib as ne,Ja as K,Jb as ie,Jc as ze,Ka as W,Kc as ye,Lc as he,Mb as oe,Mc as ve,Nb as re,Nc as xe,Oa as j,Oc as Ce,P as m,Pa as G,Pb as ae,Pc as Se,Q as V,Qb as le,Qc as Ie,Rb as me,Rc as Ee,Sb as pe,Sc as be,Tb as ce,Tc as Te,V as u,W as s,Xc as Fe,da as n,db as U,e as C,ea as i,fa as f,fb as L,ga as M,ha as w,ia as S,ja as z,jb as $,ka as d,kc as se,lc as de,nb as Q,nc as _e,oa as I,ob as Z,oc as ue,pa as p,pc as fe,qa as B,qc as ge,ra as _,sa as A,ta as O,ua as D,va as k,w as q,wb as H,x as T,xa as P,xb as J,ya as E}from"./chunk-4UTRXBH4.js";function ke(t,o){if(t&1){let e=S();n(0,"span",17),z("click",function(){y(e);let a=d(2);return a.searchValue="",h(a.search())}),i()}}function Pe(t,o){t&1&&f(0,"span",18)}function Le(t,o){if(t&1&&u(0,ke,1,0,"span",16)(1,Pe,1,0),t&2){let e=d();R(0,e.searchValue?0:1)}}function qe(t,o){t&1&&f(0,"span",18)}function Re(t,o){t&1&&(n(0,"nz-form-item")(1,"nz-form-label",20),p(2,"PO Number"),i(),n(3,"nz-form-control"),f(4,"input",28),i()())}function Be(t,o){t&1&&(n(0,"nz-form-item")(1,"nz-form-label",20),p(2,"Sale Id"),i(),n(3,"nz-form-control"),f(4,"input",29),i()())}function Ae(t,o){if(t&1){let e=S();M(0),n(1,"form",19),z("ngSubmit",function(){y(e);let a=d();return h(a.submitForm())}),n(2,"nz-form-item")(3,"nz-form-label",20),p(4,"Stock In"),i(),n(5,"nz-form-control"),f(6,"nz-switch",21),i()(),u(7,Re,5,0,"nz-form-item",22)(8,Be,5,0,"nz-form-item",22),n(9,"nz-form-item")(10,"nz-form-label",20),p(11,"Item name"),i(),n(12,"nz-form-control"),f(13,"input",23),i()(),n(14,"nz-form-item")(15,"nz-form-label",20),p(16,"Vendor"),i(),n(17,"nz-form-control"),f(18,"input",24),i()(),n(19,"nz-form-item")(20,"nz-form-label",20),p(21,"Quantity"),i(),n(22,"nz-form-control")(23,"input",25),z("ngModelChange",function(){y(e);let a=d();return h(a.setTotal())}),i()()(),n(24,"nz-form-item")(25,"nz-form-label",20),p(26,"Unit Price"),i(),n(27,"nz-form-control")(28,"input",26),z("ngModelChange",function(){y(e);let a=d();return h(a.setTotal())}),i()()(),n(29,"nz-form-item")(30,"nz-form-label",20),p(31,"Total"),i(),n(32,"nz-form-control")(33,"h4"),p(34),v(35,"currency"),i()()(),n(36,"nz-form-item")(37,"nz-form-label",20),p(38,"Description"),i(),n(39,"nz-form-control"),f(40,"textarea",27),i()()(),w()}if(t&2){let e=d(),r,a,l;m(),s("formGroup",e.inventoryItemForm),m(6),s("ngIf",(r=e.inventoryItemForm.get("stock_in"))==null?null:r.value),m(),s("ngIf",!((a=e.inventoryItemForm.get("stock_in"))!=null&&a.value)),m(26),B(x(35,4,(l=e.inventoryItemForm.get("total"))==null?null:l.value,"PKR "))}}function Ke(t,o){if(t&1&&(n(0,"th",30),p(1),i()),t&2){let e=o.$implicit;s("nzSortFn",e.compare)("nzSortPriority",e.priority),m(),_(" ",e.title," ")}}var We=()=>["/","purchase","purchase"],Ne=t=>({PO:t});function je(t,o){if(t&1&&(n(0,"a",40),p(1),i()),t&2){let e=d().$implicit;s("routerLink",P(3,We))("queryParams",E(4,Ne,e.purchase_no)),m(),_("PO -",e.purchase_no,"")}}var Ge=()=>["/","purchase","sales","sale"],Ue=t=>({SALE:t});function $e(t,o){if(t&1&&(n(0,"a",40),p(1),i()),t&2){let e=d().$implicit;s("routerLink",P(3,Ge))("queryParams",E(4,Ue,e.sale_no)),m(),_("SALE -",e.sale_no||e.sale_id,"")}}var Qe=t=>["/","sites",t];function Ze(t,o){if(t&1&&(n(0,"a",40),p(1),i()),t&2){let e=d().$implicit;s("routerLink",E(3,Qe,e.site_id))("queryParams",E(5,Ne,e.sale_no)),m(),_("SITE -",e.site_no||e.site_id,"")}}function He(t,o){if(t&1&&(M(0),n(1,"tr",38)(2,"td"),u(3,je,2,6,"a",39)(4,$e,2,6,"a",39)(5,Ze,2,7,"a",39),i(),n(6,"td"),p(7),i(),n(8,"td"),p(9),v(10,"currency"),i(),n(11,"td"),p(12),v(13,"currency"),i()(),w()),t&2){let e=o.$implicit;m(),s("className",e.stock_in?"purchase-row":"sale-row"),m(2),s("ngIf",e.stock_in),m(),s("ngIf",!e.stock_in&&e.sale_no),m(),s("ngIf",!e.stock_in&&(e.site_no||e.site_id)),m(2),A(" ",e.stock_in?"+":"-"," ",e.qty," "),m(2),_(" ",x(10,8,e.unit_price,"PKR ")," "),m(3),_(" ",x(13,11,e.total,"PKR ")," ")}}function Je(t,o){if(t&1){let e=S();n(0,"span",43),z("click",function(){y(e);let a=d(2).$implicit,l=d();return h(l.onExpandChange(a.item_name,!0,a.id))}),i()}}function Xe(t,o){if(t&1){let e=S();n(0,"span",44),z("click",function(){y(e);let a=d(2).$implicit,l=d();return h(l.onExpandChange(a.item_name,!1,a.id))}),i()}}function Ye(t,o){if(t&1&&u(0,Je,1,0,"span",41)(1,Xe,1,0,"span",42),t&2){let e=d().$implicit,r=d();s("ngIf",!r.expandSet.has(e.item_name)),m(),s("ngIf",r.expandSet.has(e.item_name))}}function et(t,o){if(t&1&&(M(0),n(1,"tr"),f(2,"td",31),n(3,"td"),p(4),i(),n(5,"td"),p(6),i(),n(7,"td"),p(8),i(),n(9,"td"),p(10),v(11,"currency"),i(),n(12,"td"),p(13),v(14,"currency"),i(),n(15,"td"),p(16),v(17,"currency"),i()(),n(18,"tr",32)(19,"nz-table",33)(20,"thead")(21,"tr")(22,"th",34),p(23,"Reference #"),i(),n(24,"th",34),p(25,"Quantity"),i(),n(26,"th",35),p(27,"Unit Price"),i(),n(28,"th",36),p(29,"Total"),i()()(),n(30,"tbody"),u(31,He,14,14,"ng-container",15),i()()(),u(32,Ye,2,2,"ng-template",null,37,N),w()),t&2){let e=o.$implicit,r=I(33),a=d();m(2),s("nzExpand",a.expandSet.has(e.item_name))("nzExpandIcon",r),m(2),_(" ",e.item_name," "),m(2),_(" ",e.vendor_name," "),m(2),_(" ",e.qty," "),m(2),_(" ",x(11,15,e.latest_unit_price,"PKR ")," "),m(3),_(" ",x(14,18,e.avg_unit_price,"PKR ")," "),m(3),_(" ",x(17,21,e.qty*e.latest_unit_price,"PKR ")," "),m(2),s("nzExpand",a.expandSet.has(e.item_name)),m(),s("nzPageSize",1e3)("nzShowPagination",!1)("nzData",e.subDetails)("nzFrontPagination",!1)("nzLoading",a.loading),m(12),s("ngForOf",e.subDetails)}}var Ve=(()=>{let o=class o{constructor(r,a){this.fb=r,this.appService=a,this.inventory=[],this.loading=!1,this.vendorItems=[],this.isVisible=!1,this.expandSet=new Set,this.currentOrganizationId=0,this.listOfColumn=[{title:"Name",compare:(l,c)=>l.name.localeCompare(c.name),priority:!1},{title:"Vendor",compare:(l,c)=>l.vendor_name.localeCompare(c.vendor_name),priority:2},{title:"Qunantity",compare:(l,c)=>l.qty-c.qty,priority:3},{title:"Latest Unit Price",compare:(l,c)=>l.latest_unit_price-c.latest_unit_price,priority:4},{title:"Average Unit Price",compare:(l,c)=>l.avg_unit_price-c.avg_unit_price,priority:5},{title:"Total",compare:(l,c)=>l.total-c.total,priority:5}],this.inventoryItemForm=this.fb.group({purchase_id:[null],sale_id:[null],stock_in:[!0,b.required],name:[null,b.required],vendor_id:[0],qty:[null,b.required],unit_price:[null,b.required],description:[null],total:[null]})}onExpandChange(r,a,l){return C(this,null,function*(){a?(this.inventory.find(c=>c.name===r).expanded||(this.inventory.find(c=>c.name===r).subDetails=yield this.appService.getInventoryItemDetails(r),this.inventory.find(c=>c.name===r).expanded=!0),this.expandSet.add(r)):this.expandSet.delete(r)})}handleCancel(){console.log("Button cancel clicked!"),this.isVisible=!1,this.inventoryItemForm.reset()}ngOnInit(){this.subOrgSubscription=this.appService.currentSubOrganization.subscribe(r=>{r&&r.id>0&&this.currentOrganizationId!=r.id&&(this.currentOrganizationId=r.id,this.loadInventory())})}ngOnDestroy(){this.subOrgSubscription&&this.subOrgSubscription.unsubscribe()}loadInventory(){return C(this,null,function*(){this.loading=!0,this.inventory=yield this.appService.getInventory(),this.listOfDisplayData=this.inventory,this.loading=!1})}onVendorChange(){return C(this,null,function*(){this.vendorItems=yield this.appService.getVendorItems(this.selectedVendor?.id)})}addOrUpdateItem(){}deleteItem(r){}editItem(r){}addItem(){}clearForm(){}submitForm(){return C(this,null,function*(){if(this.inventoryItemForm.valid){let r=yield this.appService.addInventory(this.inventoryItemForm.getRawValue());console.log(r),this.isVisible=!1,this.inventoryItemForm.reset(),this.loadInventory()}})}setTotal(){this.inventoryItemForm.get("total")?.setValue(this.inventoryItemForm.get("qty")?.value*this.inventoryItemForm.get("unit_price")?.value)}search(){this.searchVisible=!1,this.searchValue?(this.listOfDisplayData=this.inventory.filter(r=>r.vendor_name&&r.vendor_name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1||r.item_name&&r.item_name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1),console.log(this.listOfDisplayData)):this.listOfDisplayData=this.inventory}};o.\u0275fac=function(a){return new(a||o)(V(re),V($))},o.\u0275cmp=q({type:o,selectors:[["app-inventory-management"]],decls:22,vars:13,consts:[[1,"container"],[1,"section"],[1,"flex","space-between"],[2,"display","-webkit-box","width","100%"],[2,"margin-right","5px"],[3,"nzSuffix"],["type","text","placeholder","Search here","nz-input","",3,"ngModel","ngModelChange","keyup"],["inputClearTpl",""],["suffixIconSearch",""],["nzTitle","Add inventory item",3,"nzVisible","nzOkText","nzOkDisabled","nzVisibleChange","nzOnCancel","nzOnOk"],[4,"nzModalContent"],[3,"nzShowPagination","nzPageSize","nzData","nzFrontPagination","nzLoading"],["sortTable",""],["nzWidth","60px"],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-icon","","nzType","search"],["nz-form","",3,"formGroup","ngSubmit"],["nzRequired",""],["formControlName","stock_in"],[4,"ngIf"],["nz-input","","formControlName","name"],["nz-input","","formControlName","vendor_id"],["nz-input","","formControlName","qty",3,"ngModelChange"],["nz-input","","formControlName","unit_price",3,"ngModelChange"],["nz-input","","formControlName","description"],["nz-input","","formControlName","purchase_id"],["nz-input","","formControlName","sale_id"],[3,"nzSortFn","nzSortPriority"],[3,"nzExpand","nzExpandIcon"],[3,"nzExpand"],[3,"nzPageSize","nzShowPagination","nzData","nzFrontPagination","nzLoading"],["nzColumnKey","qty"],["nzColumnKey","latest_unit_price"],["nzColumnKey","total"],["expandIcon",""],[3,"className"],["href","",3,"routerLink","queryParams",4,"ngIf"],["href","",3,"routerLink","queryParams"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click"]],template:function(a,l){if(a&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3)(4,"h3",4),p(5," Inventory "),i(),n(6,"nz-input-group",5)(7,"input",6),k("ngModelChange",function(g){return D(l.searchValue,g)||(l.searchValue=g),g}),z("keyup",function(){return l.search()}),i()(),u(8,Le,2,1,"ng-template",null,7,N)(10,qe,1,0,"ng-template",null,8,N),i()(),n(12,"nz-modal",9),k("nzVisibleChange",function(g){return D(l.isVisible,g)||(l.isVisible=g),g}),z("nzOnCancel",function(){return l.handleCancel()})("nzOnOk",function(){return l.submitForm()}),u(13,Ae,41,7,"ng-container",10),i(),n(14,"nz-table",11,12)(16,"thead")(17,"tr"),f(18,"th",13),u(19,Ke,2,3,"th",14),i()(),n(20,"tbody"),u(21,et,34,24,"ng-container",15),i()()()()),a&2){let c=I(9),g=I(11),De=I(15);m(6),s("nzSuffix",g)("nzSuffix",c),m(),O("ngModel",l.searchValue),m(5),O("nzVisible",l.isVisible),s("nzOkText","Submit")("nzOkDisabled",!l.inventoryItemForm.valid),m(2),s("nzShowPagination",!1)("nzPageSize",1e3)("nzData",l.listOfDisplayData)("nzFrontPagination",!1)("nzLoading",l.loading),m(5),s("ngForOf",l.listOfColumn),m(2),s("ngForOf",De.data)}},dependencies:[U,K,W,Z,Q,de,se,ue,_e,ge,fe,me,ce,pe,J,H,ze,Ie,ve,ye,xe,he,be,Se,Ee,Te,Ce,ne,X,Y,ee,ie,oe,te,j]});let t=o;return t})();var tt=[{path:"",component:Ve,data:{name:" "}}],Oe=(()=>{let o=class o{};o.\u0275fac=function(a){return new(a||o)},o.\u0275mod=T({type:o}),o.\u0275inj=F({imports:[L.forChild(tt),L]});let t=o;return t})();var Tt=(()=>{let o=class o{};o.\u0275fac=function(a){return new(a||o)},o.\u0275mod=T({type:o}),o.\u0275inj=F({imports:[Oe,G,Fe,le,Me,ae]});let t=o;return t})();export{Tt as InventoryManagementModule};
