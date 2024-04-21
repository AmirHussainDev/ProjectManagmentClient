import{b as Ie}from"./chunk-LPC6AIC7.js";import{c as L}from"./chunk-EMPMCSMU.js";import{$ as T,$a as Q,Ca as A,Da as j,J as l,K as F,Lb as oe,Mb as re,N as g,Nb as ae,O as s,Ob as me,Pb as le,Qb as pe,Ta as V,W as e,X as t,Xa as W,Y as d,Ya as G,Z as E,Za as S,_ as N,_a as U,aa as _,ba as c,cc as se,db as $,dc as ce,eb as Z,fa as O,ga as m,gc as de,ha as k,hb as H,ia as u,ib as J,ic as _e,ja as w,jc as ue,ka as D,kb as X,kc as fe,la as P,lb as Y,lc as ze,ma as q,mb as ee,mc as ge,nc as ve,oc as ye,pc as he,qa as h,qc as xe,rc as Ce,s as M,sa as x,t as I,ta as R,tb as te,ub as ne,v,vb as ie,w as y,ya as K,yc as Se,z as b,za as B}from"./chunk-ALXNCXXS.js";import"./chunk-NFQMHT45.js";import{g as C}from"./chunk-MON7YFGF.js";function Te(o,i){o&1&&(e(0,"nz-form-item")(1,"nz-form-label",16),m(2,"PO Number"),t(),e(3,"nz-form-control"),d(4,"input",24),t()())}function Fe(o,i){o&1&&(e(0,"nz-form-item")(1,"nz-form-label",16),m(2,"Sale Id"),t(),e(3,"nz-form-control"),d(4,"input",25),t()())}function we(o,i){if(o&1){let n=T();E(0),e(1,"form",15),_("ngSubmit",function(){v(n);let a=c();return y(a.submitForm())}),e(2,"nz-form-item")(3,"nz-form-label",16),m(4,"Stock In"),t(),e(5,"nz-form-control"),d(6,"nz-switch",17),t()(),g(7,Te,5,0,"nz-form-item",18)(8,Fe,5,0,"nz-form-item",18),e(9,"nz-form-item")(10,"nz-form-label",16),m(11,"Item name"),t(),e(12,"nz-form-control"),d(13,"input",19),t()(),e(14,"nz-form-item")(15,"nz-form-label",16),m(16,"Vendor"),t(),e(17,"nz-form-control"),d(18,"input",20),t()(),e(19,"nz-form-item")(20,"nz-form-label",16),m(21,"Quantity"),t(),e(22,"nz-form-control")(23,"input",21),_("ngModelChange",function(){v(n);let a=c();return y(a.setTotal())}),t()()(),e(24,"nz-form-item")(25,"nz-form-label",16),m(26,"Unit Price"),t(),e(27,"nz-form-control")(28,"input",22),_("ngModelChange",function(){v(n);let a=c();return y(a.setTotal())}),t()()(),e(29,"nz-form-item")(30,"nz-form-label",16),m(31,"Total"),t(),e(32,"nz-form-control")(33,"h4"),m(34),h(35,"currency"),t()()(),e(36,"nz-form-item")(37,"nz-form-label",16),m(38,"Description"),t(),e(39,"nz-form-control"),d(40,"textarea",23),t()()(),N()}if(o&2){let n=c(),r,a,p;l(),s("formGroup",n.inventoryItemForm),l(6),s("ngIf",(r=n.inventoryItemForm.get("stock_in"))==null?null:r.value),l(),s("ngIf",!((a=n.inventoryItemForm.get("stock_in"))!=null&&a.value)),l(26),k(x(35,4,(p=n.inventoryItemForm.get("total"))==null?null:p.value,"PKR "))}}function Ve(o,i){if(o&1&&(E(0),e(1,"tr",29)(2,"td"),m(3),t(),e(4,"td"),m(5),t(),e(6,"td"),m(7),h(8,"currency"),t(),e(9,"td"),m(10),h(11,"currency"),t()(),N()),o&2){let n=i.$implicit;l(),s("className",n.stock_in?"purchase-row":"sale-row"),l(2),w(" ",n.stock_in?"PO- ":"SALE -"," ",n.stock_in?n.purchase_id:n.sale_id," "),l(2),w(" ",n.stock_in?"+":"-"," ",n.qty," "),l(2),u(" ",x(8,7,n.unit_price,"PKR ")," "),l(3),u(" ",x(11,10,n.total,"PKR ")," ")}}function Me(o,i){if(o&1){let n=T();e(0,"span",32),_("click",function(){v(n);let a=c(2),p=a.$implicit,f=a.index,z=c();return y(z.onExpandChange(p.item_name,!0,f))}),t()}}function Oe(o,i){if(o&1){let n=T();e(0,"span",33),_("click",function(){v(n);let a=c(2),p=a.$implicit,f=a.index,z=c();return y(z.onExpandChange(p.item_name,!1,f))}),t()}}function ke(o,i){if(o&1&&g(0,Me,1,0,"span",30)(1,Oe,1,0,"span",31),o&2){let n=c().$implicit,r=c();s("ngIf",!r.expandSet.has(n.item_name)),l(),s("ngIf",r.expandSet.has(n.item_name))}}function De(o,i){if(o&1&&(E(0),e(1,"tr"),d(2,"td",26),e(3,"td"),m(4),t(),e(5,"td"),m(6),t(),e(7,"td"),m(8),t(),e(9,"td"),m(10),h(11,"currency"),t(),e(12,"td"),m(13),h(14,"currency"),t()(),e(15,"tr",27)(16,"nz-table",7)(17,"thead")(18,"tr")(19,"th",11),m(20,"Reference #"),t(),e(21,"th",11),m(22,"Quantity"),t(),e(23,"th",12),m(24,"Unit Price"),t(),e(25,"th",13),m(26,"Total"),t()()(),e(27,"tbody"),g(28,Ve,12,13,"ng-container",14),t()()(),g(29,ke,2,2,"ng-template",null,28,R),N()),o&2){let n=i.$implicit,r=O(30),a=c();l(2),s("nzExpand",a.expandSet.has(n.item_name))("nzExpandIcon",r),l(2),u(" ",n.item_name," "),l(2),u(" ",n.vendor_name," "),l(2),u(" ",n.qty," "),l(2),u(" ",x(11,13,n.latest_unit_price,"PKR ")," "),l(3),u(" ",x(14,16,n.qty*n.latest_unit_price,"PKR ")," "),l(2),s("nzExpand",a.expandSet.has(n.item_name)),l(),s("nzShowPagination",!1)("nzData",n.subDetails)("nzFrontPagination",!1)("nzLoading",a.loading),l(12),s("ngForOf",n.subDetails)}}var Ee=(()=>{let i=class i{constructor(r,a){this.fb=r,this.appService=a,this.inventory=[],this.loading=!1,this.vendorItems=[],this.isVisible=!1,this.expandSet=new Set,this.currentOrganizationId=0,this.inventoryItemForm=this.fb.group({purchase_id:[null],sale_id:[null],stock_in:[!0,S.required],name:[null,S.required],vendor_id:[0],qty:[null,S.required],unit_price:[null,S.required],description:[null],total:[null]})}onExpandChange(r,a,p){return C(this,null,function*(){a?(this.inventory[p].expanded||(this.inventory[p].subDetails=yield this.appService.getInventoryItemDetails(r),this.inventory[p].expanded=!0),this.expandSet.add(r)):this.expandSet.delete(r)})}handleCancel(){console.log("Button cancel clicked!"),this.isVisible=!1,this.inventoryItemForm.reset()}ngOnInit(){this.subOrgSubscription=this.appService.currentSubOrganization.subscribe(r=>{r&&r.id>0&&this.currentOrganizationId!=r.id&&(this.currentOrganizationId=r.id,this.loadInventory())})}ngOnDestroy(){this.subOrgSubscription&&this.subOrgSubscription.unsubscribe()}loadInventory(){return C(this,null,function*(){this.loading=!0,this.inventory=yield this.appService.getInventory(),this.loading=!1})}onVendorChange(){return C(this,null,function*(){this.vendorItems=yield this.appService.getVendorItems(this.selectedVendor?.id)})}addOrUpdateItem(){}deleteItem(r){}editItem(r){}addItem(){}clearForm(){}submitForm(){return C(this,null,function*(){if(this.inventoryItemForm.valid){let r=yield this.appService.addInventory(this.inventoryItemForm.getRawValue());console.log(r),this.isVisible=!1,this.inventoryItemForm.reset(),this.loadInventory()}})}setTotal(){this.inventoryItemForm.get("total")?.setValue(this.inventoryItemForm.get("qty")?.value*this.inventoryItemForm.get("unit_price")?.value)}};i.\u0275fac=function(a){return new(a||i)(F(J),F(L))},i.\u0275cmp=M({type:i,selectors:[["app-inventory-management"]],decls:24,vars:10,consts:[[1,"container"],[1,"section"],[1,"flex","space-between",2,"margin","12px"],["nz-button","","nzType","primary",3,"nzSize","click"],["nz-icon","","nzType","plus"],["nzTitle","Add inventory item",3,"nzVisible","nzOkText","nzOkDisabled","nzVisibleChange","nzOnCancel","nzOnOk"],[4,"nzModalContent"],[3,"nzShowPagination","nzData","nzFrontPagination","nzLoading"],["nzWidth","60px"],["nzColumnKey","item_name",3,"nzSortFn"],["nzColumnKey","vendor_name"],["nzColumnKey","qty"],["nzColumnKey","latest_unit_price"],["nzColumnKey","total"],[4,"ngFor","ngForOf"],["nz-form","",3,"formGroup","ngSubmit"],["nzRequired",""],["formControlName","stock_in"],[4,"ngIf"],["nz-input","","formControlName","name"],["nz-input","","formControlName","vendor_id"],["nz-input","","formControlName","qty",3,"ngModelChange"],["nz-input","","formControlName","unit_price",3,"ngModelChange"],["nz-input","","formControlName","description"],["nz-input","","formControlName","purchase_id"],["nz-input","","formControlName","sale_id"],[3,"nzExpand","nzExpandIcon"],[3,"nzExpand"],["expandIcon",""],[3,"className"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click"]],template:function(a,p){a&1&&(e(0,"div",0)(1,"div",1)(2,"div",2),d(3,"span"),e(4,"button",3),_("click",function(){return p.isVisible=!p.isVisible}),d(5,"span",4),t()(),e(6,"nz-modal",5),q("nzVisibleChange",function(z){return P(p.isVisible,z)||(p.isVisible=z),z}),_("nzOnCancel",function(){return p.handleCancel()})("nzOnOk",function(){return p.submitForm()}),g(7,we,41,7,"ng-container",6),t(),e(8,"nz-table",7)(9,"thead")(10,"tr"),d(11,"th",8),e(12,"th",9),m(13,"Name"),t(),e(14,"th",10),m(15,"Vendor"),t(),e(16,"th",11),m(17,"Quantity"),t(),e(18,"th",12),m(19,"Unit Price"),t(),e(20,"th",13),m(21,"Total"),t()()(),e(22,"tbody"),g(23,De,31,19,"ng-container",14),t()()()()),a&2&&(l(4),s("nzSize","small"),l(2),D("nzVisible",p.isVisible),s("nzOkText","Submit")("nzOkDisabled",!p.inventoryItemForm.valid),l(2),s("nzShowPagination",!1)("nzData",p.inventory)("nzFrontPagination",!1)("nzLoading",p.loading),l(4),s("nzSortFn",!0),l(11),s("ngForOf",p.inventory))},dependencies:[K,B,ie,te,ne,W,re,oe,me,ae,pe,le,ee,ce,se,de,ye,fe,_e,ze,ue,xe,ve,he,Ce,ge,$,G,U,Q,Z,H,A]});let o=i;return o})();var Pe=[{path:"",component:Ee,data:{name:" "}}],Ne=(()=>{let i=class i{};i.\u0275fac=function(a){return new(a||i)},i.\u0275mod=I({type:i}),i.\u0275inj=b({imports:[V.forChild(Pe),V]});let o=i;return o})();var pt=(()=>{let i=class i{};i.\u0275fac=function(a){return new(a||i)},i.\u0275mod=I({type:i}),i.\u0275inj=b({imports:[Ne,j,Se,Y,Ie,X]});let o=i;return o})();export{pt as InventoryManagementModule};
