import{b as Ie}from"./chunk-5VS2LQ5Z.js";import{b as L}from"./chunk-MCMTRHRP.js";import{$ as c,$b as ce,Aa as A,Ba as j,Hb as oe,Ib as re,J as l,Jb as ae,K as F,Kb as me,Lb as le,Mb as pe,N as g,O as s,Ra as V,U as e,V as t,Va as W,W as d,Wa as G,X as E,Xa as S,Y as N,Ya as U,Z as T,Za as Q,_,_b as se,bb as $,cb as Z,cc as de,da as k,ea as a,ec as _e,fa as D,fb as H,fc as ue,ga as u,gb as J,gc as fe,ha as w,hc as ze,ia as O,ib as X,ic as ge,ja as P,jb as Y,jc as ve,ka as q,kb as ee,kc as ye,lc as he,mc as xe,nc as Ce,oa as h,qa as x,ra as R,rb as te,s as M,sb as ne,t as I,tb as ie,uc as Se,v,w as y,wa as K,xa as B,z as b}from"./chunk-KCJYYZJD.js";import"./chunk-NFQMHT45.js";import{g as C}from"./chunk-MON7YFGF.js";function Te(o,i){o&1&&(e(0,"nz-form-item")(1,"nz-form-label",16),a(2,"PO Number"),t(),e(3,"nz-form-control"),d(4,"input",24),t()())}function Fe(o,i){o&1&&(e(0,"nz-form-item")(1,"nz-form-label",16),a(2,"Sale Id"),t(),e(3,"nz-form-control"),d(4,"input",25),t()())}function we(o,i){if(o&1){let n=T();E(0),e(1,"form",15),_("ngSubmit",function(){v(n);let r=c();return y(r.submitForm())}),e(2,"nz-form-item")(3,"nz-form-label",16),a(4,"Stock In"),t(),e(5,"nz-form-control"),d(6,"nz-switch",17),t()(),g(7,Te,5,0,"nz-form-item",18)(8,Fe,5,0,"nz-form-item",18),e(9,"nz-form-item")(10,"nz-form-label",16),a(11,"Item name"),t(),e(12,"nz-form-control"),d(13,"input",19),t()(),e(14,"nz-form-item")(15,"nz-form-label",16),a(16,"Vendor"),t(),e(17,"nz-form-control"),d(18,"input",20),t()(),e(19,"nz-form-item")(20,"nz-form-label",16),a(21,"Quantity"),t(),e(22,"nz-form-control")(23,"input",21),_("ngModelChange",function(){v(n);let r=c();return y(r.setTotal())}),t()()(),e(24,"nz-form-item")(25,"nz-form-label",16),a(26,"Unit Price"),t(),e(27,"nz-form-control")(28,"input",22),_("ngModelChange",function(){v(n);let r=c();return y(r.setTotal())}),t()()(),e(29,"nz-form-item")(30,"nz-form-label",16),a(31,"Total"),t(),e(32,"nz-form-control")(33,"h4"),a(34),h(35,"currency"),t()()(),e(36,"nz-form-item")(37,"nz-form-label",16),a(38,"Description"),t(),e(39,"nz-form-control"),d(40,"textarea",23),t()()(),N()}if(o&2){let n=c(),m,r,p;l(),s("formGroup",n.inventoryItemForm),l(6),s("ngIf",(m=n.inventoryItemForm.get("stock_in"))==null?null:m.value),l(),s("ngIf",!((r=n.inventoryItemForm.get("stock_in"))!=null&&r.value)),l(26),D(x(35,4,(p=n.inventoryItemForm.get("total"))==null?null:p.value,"PKR "))}}function Ve(o,i){if(o&1&&(E(0),e(1,"tr",29)(2,"td"),a(3),t(),e(4,"td"),a(5),t(),e(6,"td"),a(7),h(8,"currency"),t(),e(9,"td"),a(10),h(11,"currency"),t()(),N()),o&2){let n=i.$implicit;l(),s("className",n.stock_in?"purchase-row":"sale-row"),l(2),w(" ",n.stock_in?"PO- ":"SALE -"," ",n.stock_in?n.purchase_id:n.sale_id," "),l(2),w(" ",n.stock_in?"+":"-"," ",n.qty," "),l(2),u(" ",x(8,7,n.unit_price,"PKR ")," "),l(3),u(" ",x(11,10,n.total,"PKR ")," ")}}function Me(o,i){if(o&1){let n=T();e(0,"span",32),_("click",function(){v(n);let r=c(2),p=r.$implicit,f=r.index,z=c();return y(z.onExpandChange(p.item_name,!0,f))}),t()}}function ke(o,i){if(o&1){let n=T();e(0,"span",33),_("click",function(){v(n);let r=c(2),p=r.$implicit,f=r.index,z=c();return y(z.onExpandChange(p.item_name,!1,f))}),t()}}function De(o,i){if(o&1&&g(0,Me,1,0,"span",30)(1,ke,1,0,"span",31),o&2){let n=c().$implicit,m=c();s("ngIf",!m.expandSet.has(n.item_name)),l(),s("ngIf",m.expandSet.has(n.item_name))}}function Oe(o,i){if(o&1&&(E(0),e(1,"tr"),d(2,"td",26),e(3,"td"),a(4),t(),e(5,"td"),a(6),t(),e(7,"td"),a(8),t(),e(9,"td"),a(10),h(11,"currency"),t(),e(12,"td"),a(13),h(14,"currency"),t()(),e(15,"tr",27)(16,"nz-table",7)(17,"thead")(18,"tr")(19,"th",11),a(20,"Reference #"),t(),e(21,"th",11),a(22,"Quantity"),t(),e(23,"th",12),a(24,"Unit Price"),t(),e(25,"th",13),a(26,"Total"),t()()(),e(27,"tbody"),g(28,Ve,12,13,"ng-container",14),t()()(),g(29,De,2,2,"ng-template",null,28,R),N()),o&2){let n=i.$implicit,m=k(30),r=c();l(2),s("nzExpand",r.expandSet.has(n.item_name))("nzExpandIcon",m),l(2),u(" ",n.item_name," "),l(2),u(" ",n.vendor_name," "),l(2),u(" ",n.qty," "),l(2),u(" ",x(11,13,n.latest_unit_price,"PKR ")," "),l(3),u(" ",x(14,16,n.qty*n.latest_unit_price,"PKR ")," "),l(2),s("nzExpand",r.expandSet.has(n.item_name)),l(),s("nzShowPagination",!1)("nzData",n.subDetails)("nzFrontPagination",!1)("nzLoading",r.loading),l(12),s("ngForOf",n.subDetails)}}var Ee=(()=>{let i=class i{constructor(m,r){this.fb=m,this.appService=r,this.inventory=[],this.loading=!1,this.vendorItems=[],this.isVisible=!1,this.expandSet=new Set,this.inventoryItemForm=this.fb.group({purchase_id:[null],sale_id:[null],stock_in:[!0,S.required],name:[null,S.required],vendor_id:[0],qty:[null,S.required],unit_price:[null,S.required],description:[null],total:[null]})}onExpandChange(m,r,p){return C(this,null,function*(){r?(this.inventory[p].expanded||(this.inventory[p].subDetails=yield this.appService.getInventoryItemDetails(m),this.inventory[p].expanded=!0),this.expandSet.add(m)):this.expandSet.delete(m)})}handleCancel(){console.log("Button cancel clicked!"),this.isVisible=!1,this.inventoryItemForm.reset()}ngOnInit(){this.subOrgSubscription=this.appService.currentSubOrganization.subscribe(m=>{m&&this.loadInventory()})}ngOnDestroy(){this.subOrgSubscription&&this.subOrgSubscription.unsubscribe()}loadInventory(){return C(this,null,function*(){this.loading=!0,this.inventory=yield this.appService.getInventory(),this.loading=!1})}onVendorChange(){return C(this,null,function*(){this.vendorItems=yield this.appService.getVendorItems(this.selectedVendor?.id)})}addOrUpdateItem(){}deleteItem(m){}editItem(m){}addItem(){}clearForm(){}submitForm(){return C(this,null,function*(){if(this.inventoryItemForm.valid){let m=yield this.appService.addInventory(this.inventoryItemForm.getRawValue());console.log(m),this.isVisible=!1,this.inventoryItemForm.reset(),this.loadInventory()}})}setTotal(){this.inventoryItemForm.get("total")?.setValue(this.inventoryItemForm.get("qty")?.value*this.inventoryItemForm.get("unit_price")?.value)}};i.\u0275fac=function(r){return new(r||i)(F(J),F(L))},i.\u0275cmp=M({type:i,selectors:[["app-inventory-management"]],decls:24,vars:10,consts:[[1,"container"],[1,"section"],[1,"flex","space-between",2,"margin","12px"],["nz-button","","nzType","primary",3,"nzSize","click"],["nz-icon","","nzType","plus"],["nzTitle","Add inventory item",3,"nzVisible","nzOkText","nzOkDisabled","nzVisibleChange","nzOnCancel","nzOnOk"],[4,"nzModalContent"],[3,"nzShowPagination","nzData","nzFrontPagination","nzLoading"],["nzWidth","60px"],["nzColumnKey","item_name",3,"nzSortFn"],["nzColumnKey","vendor_name"],["nzColumnKey","qty"],["nzColumnKey","latest_unit_price"],["nzColumnKey","total"],[4,"ngFor","ngForOf"],["nz-form","",3,"formGroup","ngSubmit"],["nzRequired",""],["formControlName","stock_in"],[4,"ngIf"],["nz-input","","formControlName","name"],["nz-input","","formControlName","vendor_id"],["nz-input","","formControlName","qty",3,"ngModelChange"],["nz-input","","formControlName","unit_price",3,"ngModelChange"],["nz-input","","formControlName","description"],["nz-input","","formControlName","purchase_id"],["nz-input","","formControlName","sale_id"],[3,"nzExpand","nzExpandIcon"],[3,"nzExpand"],["expandIcon",""],[3,"className"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click",4,"ngIf"],["nz-icon","","nzType","caret-right","nzTheme","outline",3,"click"],["nz-icon","","nzType","caret-down","nzTheme","outline",3,"click"]],template:function(r,p){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2),d(3,"span"),e(4,"button",3),_("click",function(){return p.isVisible=!p.isVisible}),d(5,"span",4),t()(),e(6,"nz-modal",5),q("nzVisibleChange",function(z){return P(p.isVisible,z)||(p.isVisible=z),z}),_("nzOnCancel",function(){return p.handleCancel()})("nzOnOk",function(){return p.submitForm()}),g(7,we,41,7,"ng-container",6),t(),e(8,"nz-table",7)(9,"thead")(10,"tr"),d(11,"th",8),e(12,"th",9),a(13,"Name"),t(),e(14,"th",10),a(15,"Vendor"),t(),e(16,"th",11),a(17,"Quantity"),t(),e(18,"th",12),a(19,"Unit Price"),t(),e(20,"th",13),a(21,"Total"),t()()(),e(22,"tbody"),g(23,Oe,31,19,"ng-container",14),t()()()()),r&2&&(l(4),s("nzSize","small"),l(2),O("nzVisible",p.isVisible),s("nzOkText","Submit")("nzOkDisabled",!p.inventoryItemForm.valid),l(2),s("nzShowPagination",!1)("nzData",p.inventory)("nzFrontPagination",!1)("nzLoading",p.loading),l(4),s("nzSortFn",!0),l(11),s("ngForOf",p.inventory))},dependencies:[K,B,ie,te,ne,W,re,oe,me,ae,pe,le,ee,ce,se,de,ye,fe,_e,ze,ue,xe,ve,he,Ce,ge,$,G,U,Q,Z,H,A]});let o=i;return o})();var Pe=[{path:"",component:Ee,data:{name:" "}}],Ne=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275mod=I({type:i}),i.\u0275inj=b({imports:[V.forChild(Pe),V]});let o=i;return o})();var pt=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275mod=I({type:i}),i.\u0275inj=b({imports:[Ne,j,Se,Y,Ie,X]});let o=i;return o})();export{pt as InventoryManagementModule};
