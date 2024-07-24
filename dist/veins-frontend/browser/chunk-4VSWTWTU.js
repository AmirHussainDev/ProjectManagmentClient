import{b as Y,e as We}from"./chunk-KORWDTX3.js";import{a as ge}from"./chunk-WTG3AKFA.js";import{a as S}from"./chunk-CZFGAI6E.js";import{$ as se,A as _,Ab as U,B as f,Cb as D,Da as M,Db as L,E as P,Eb as ze,Gc as Ie,Hb as B,Ic as j,Ja as I,Jb as xe,Ka as le,Kc as Fe,Lc as G,Mb as Ve,Nb as ve,Nc as R,O as K,Oc as q,P as d,Pa as de,Pb as we,Pc as Z,Q as b,Qb as ye,Qc as J,Rb as H,Sb as Se,Tb as De,Uc as ke,V as u,Vc as Ae,W as p,a as E,b as oe,da as a,e as w,ea as s,f as re,fa as C,fb as ee,ga as Q,gb as me,ha as X,ia as g,ic as be,ja as h,jb as F,jc as Te,ka as l,kc as Ee,lb as pe,lc as Ne,mb as ce,nb as _e,nc as Oe,oa as T,ob as k,pa as c,pb as A,pc as Pe,qa as y,qb as W,qc as Me,ra as $,rb as fe,sb as ue,ta as z,ua as x,v as ae,va as V,w as N,wb as he,x as O,xb as Ce}from"./chunk-FK7IKGFG.js";function Xe(i,r){if(i&1){let n=g();a(0,"span")(1,"input",7),V("ngModelChange",function(e){_(n);let o=l(2);return x(o.newProduct,e)||(o.newProduct=e),f(e)}),s(),a(2,"button",8),h("click",function(){_(n);let e=l(2);return f(e.handleAddProduct())}),c(3,"Add Product"),s()()}if(i&2){let n=l(2);d(),z("ngModel",n.newProduct)}}function $e(i,r){if(i&1&&(a(0,"tr")(1,"td"),c(2),s()()),i&2){let n=r.$implicit;d(2),y(n.name)}}function et(i,r){if(i&1&&(a(0,"div",2),u(1,Xe,4,1,"span",3),a(2,"nz-table",4)(3,"thead")(4,"tr")(5,"th",5),c(6,"Product Name"),s()()(),a(7,"tbody"),u(8,$e,3,1,"tr",6),s()()()),i&2){let n=l();d(),p("appHasPermission",n.appPermissions.UpdateVendors),d(),p("nzPageSize",1e3)("nzData",n.products),d(6),p("ngForOf",n.products)}}var Ue=(()=>{let r=class r{constructor(t){this.appService=t,this.visible=!1,this.closeDrawer=new ae,this.placement="right",this.products=[],this.newProduct="",this.appPermissions=S}ngOnInit(){this.getAndSetItems()}getAndSetItems(){return w(this,null,function*(){this.products=yield this.appService.getVendorItems(this.vendor.id)})}addNewItem(){return w(this,null,function*(){this.newProduct&&this.newProduct.trim()&&(yield this.appService.addVendorItem(this.vendor.id,this.newProduct.trim()))})}showDrawer(){this.visible=!0}onClose(){this.visible=!1,this.closeDrawer.emit(!0)}handleAddProduct(){return w(this,null,function*(){this.newProduct.trim()!==""&&(this.products.push({name:this.newProduct.trim()}),yield this.addNewItem(),this.newProduct="",this.getAndSetItems())})}};r.\u0275fac=function(e){return new(e||r)(b(F))},r.\u0275cmp=N({type:r,selectors:[["app-vendor-details"]],inputs:{vendor:"vendor",visible:"visible"},outputs:{closeDrawer:"closeDrawer"},decls:2,vars:4,consts:[[3,"nzClosable","nzVisible","nzPlacement","nzTitle","nzOnClose"],["class","vendor-details",4,"nzDrawerContent"],[1,"vendor-details"],[4,"appHasPermission"],["nzShowPagination","false","nzBordered","",3,"nzPageSize","nzData"],["nzWidth","50%"],[4,"ngFor","ngForOf"],["nz-input","","placeholder","Enter product name",2,"margin-bottom","12px",3,"ngModel","ngModelChange"],["nz-button","","nzType","primary",2,"margin-bottom","12px",3,"click"]],template:function(e,o){e&1&&(a(0,"nz-drawer",0),h("nzOnClose",function(){return o.onClose()}),u(1,et,9,4,"div",1),s()),e&2&&p("nzClosable",!1)("nzVisible",o.visible)("nzPlacement",o.placement)("nzTitle",o.vendor.name)},dependencies:[I,W,k,A,Te,be,H,q,j,G,J,R,Z,U,L,B,Y]});let i=r;return i})();function it(i,r){if(i&1){let n=g();a(0,"span",17),h("click",function(){_(n);let e=l(3);return e.searchValue="",f(e.search())}),s()}}function nt(i,r){i&1&&C(0,"span",18)}function ot(i,r){if(i&1&&u(0,it,1,0,"span",16)(1,nt,1,0),i&2){let n=l(2);se(0,n.searchValue?0:1)}}function rt(i,r){i&1&&C(0,"span",18)}function at(i,r){if(i&1){let n=g();a(0,"div",8)(1,"span",9)(2,"h3",10),c(3," Vendors "),s(),a(4,"nz-input-group",11)(5,"input",12),V("ngModelChange",function(e){_(n);let o=l();return x(o.searchValue,e)||(o.searchValue=e),f(e)}),h("keyup",function(){_(n);let e=l();return f(e.search())}),s()(),u(6,ot,2,1,"ng-template",null,13,M)(8,rt,1,0,"ng-template",null,14,M),s(),a(10,"button",15),h("click",function(){_(n);let e=l();return f(e.showModal())}),c(11,"Add Vendor"),s()()}if(i&2){let n=T(7),t=T(9),e=l();d(4),p("nzSuffix",t)("nzSuffix",n),d(),z("ngModel",e.searchValue)}}function st(i,r){if(i&1){let n=g();a(0,"app-vendor-details",19),h("closeDrawer",function(){_(n);let e=l();return f(e.drawerVisible=!1)}),s()}if(i&2){let n=l();p("vendor",n.selectedVendor)("visible",n.drawerVisible)}}function lt(i,r){if(i&1&&(Q(0),C(1,"span",33),a(2,"div",34),c(3,"Upload"),s(),X()),i&2){let n=l(2);d(),p("nzType",n.loading?"loading":"plus")}}function dt(i,r){if(i&1&&C(0,"img",35),i&2){let n=l(2);p("src",n.avatarUrl,K)}}function mt(i,r){if(i&1){let n=g();a(0,"nz-form",20)(1,"nz-form-item")(2,"nz-form-label",21),c(3,"Vendor Name"),s(),a(4,"nz-form-control",22),C(5,"input",23),s()(),a(6,"nz-form-item")(7,"nz-form-label",21),c(8,"Contact No"),s(),a(9,"nz-form-control",24),C(10,"input",25),s()(),a(11,"nz-form-item")(12,"nz-form-label",21),c(13,"Email"),s(),a(14,"nz-form-control",26),C(15,"input",27),s()(),a(16,"nz-form-item")(17,"nz-form-label",21),c(18,"Address"),s(),a(19,"nz-form-control",28),C(20,"input",29),s()(),a(21,"nz-form-item")(22,"nz-form-label",21),c(23,"Vendor Image"),s(),a(24,"nz-form-control",22)(25,"nz-upload",30),h("nzChange",function(e){_(n);let o=l();return f(o.handleChange(e))}),u(26,lt,4,1,"ng-container",31)(27,dt,1,1,"img",32),s()()()()}if(i&2){let n=l();p("formGroup",n.addVendorForm),d(25),p("nzShowUploadList",!1)("nzBeforeUpload",n.beforeUpload),d(),p("ngIf",!n.avatarUrl),d(),p("ngIf",n.avatarUrl)}}function pt(i,r){if(i&1&&(a(0,"th",36),c(1),s()),i&2){let n=r.$implicit;p("nzSortFn",n.compare)("nzSortPriority",n.priority),d(),$(" ",n.title," ")}}function ct(i,r){if(i&1&&C(0,"img",42),i&2){let n=l(2).$implicit,t=l();p("src",t.apiUrl+"/images/"+n.filename,K)}}function _t(i,r){if(i&1){let n=g();a(0,"a",43),h("click",function(){_(n);let e=l(2).$implicit,o=l();return f(o.startEdit(e.id))}),c(1,"Edit"),s()}}function ft(i,r){if(i&1){let n=g();Q(0),a(1,"td")(2,"div")(3,"span",39),h("click",function(){_(n);let e=l().$implicit,o=l();return f(o.viewDetails(e))}),s(),u(4,ct,1,1,"img",40),a(5,"span"),c(6),s()()(),a(7,"td"),c(8),s(),a(9,"td"),c(10),s(),a(11,"td"),c(12),s(),a(13,"td"),u(14,_t,2,0,"a",41),s(),X()}if(i&2){let n=l().$implicit,t=l();d(4),p("ngIf",n.filename),d(2),$(" ",n.name,""),d(2),y(n.contact_no),d(2),y(n.address),d(2),y(n.email),d(2),p("appHasPermission",t.appPermissions.UpdateVendors)}}function ut(i,r){if(i&1){let n=g();a(0,"td")(1,"input",44),V("ngModelChange",function(e){_(n);let o=l().$implicit,m=l();return x(m.editCache[o.id].data.name,e)||(m.editCache[o.id].data.name=e),f(e)}),s()(),a(2,"td")(3,"input",44),V("ngModelChange",function(e){_(n);let o=l().$implicit,m=l();return x(m.editCache[o.id].data.contact_no,e)||(m.editCache[o.id].data.contact_no=e),f(e)}),s()(),a(4,"td")(5,"input",44),V("ngModelChange",function(e){_(n);let o=l().$implicit,m=l();return x(m.editCache[o.id].data.address,e)||(m.editCache[o.id].data.address=e),f(e)}),s()(),a(6,"td")(7,"input",44),V("ngModelChange",function(e){_(n);let o=l().$implicit,m=l();return x(m.editCache[o.id].data.email,e)||(m.editCache[o.id].data.email=e),f(e)}),s()(),a(8,"td")(9,"a",45),h("click",function(){_(n);let e=l().$implicit,o=l();return f(o.saveEdit(e.id))}),c(10,"Save"),s(),c(11," \xA0 "),a(12,"a",46),h("nzOnConfirm",function(){_(n);let e=l().$implicit,o=l();return f(o.cancelEdit(e.id))}),c(13,"Cancel"),s()()}if(i&2){let n=l().$implicit,t=l();d(),z("ngModel",t.editCache[n.id].data.name),d(2),z("ngModel",t.editCache[n.id].data.contact_no),d(2),z("ngModel",t.editCache[n.id].data.address),d(2),z("ngModel",t.editCache[n.id].data.email)}}function ht(i,r){if(i&1&&(a(0,"tr"),u(1,ft,15,6,"ng-container",37)(2,ut,14,4,"ng-template",null,38,M),s()),i&2){let n=r.$implicit,t=T(3),e=l();d(),p("ngIf",!(e.editCache[n.id]!=null&&e.editCache[n.id].edit))("ngIfElse",t)}}var Le=(()=>{let r=class r{constructor(t,e){this.appService=t,this.fb=e,this.apiUrl=me.apiUrl,this.isModalVisible=!1,this.drawerVisible=!1,this.selectedVendor={},this.appPermissions=S,this.listOfColumn=[{title:"Name",compare:(o,m)=>o.name.localeCompare(m.name),priority:!1},{title:"Contact No",compare:(o,m)=>o.contact_no.localeCompare(m.contact_no),priority:!1},{title:"Address",compare:(o,m)=>o.address.localeCompare(m.address),priority:!1},{title:"Email",compare:(o,m)=>o.email.localeCompare(m.email),priority:!1},{title:"Action",compare:(o,m)=>o.role_id-m.role_id,priority:!1}],this.listOfData=[],this.visible=!1,this.listOfDisplayData=[],this.editCache={},this.beforeUpload=(o,m)=>new re(v=>{let ie=o.type==="image/jpeg"||o.type==="image/png";if(!ie){this.msg.error("You can only upload JPG file!"),v.complete();return}let ne=o.size/1024/1024<2;if(!ne){this.msg.error("Image must smaller than 2MB!"),v.complete();return}this.addVendorForm.patchValue({file:o}),v.next(ie&&ne),v.complete()}),this.addVendorForm=this.fb.group({name:["",[D.required]],contact_no:["",[D.required]],email:["",[D.required]],address:["",[D.required]],file:["",[D.required]]})}showModal(){this.isModalVisible=!0}handleOk(){return w(this,null,function*(){this.isModalVisible=!1,yield this.appService.createVendor(this.addVendorForm.value.name,this.addVendorForm.value.file),this.isModalVisible=!1,this.populateVendorData()})}handleCancel(){this.isModalVisible=!1}ngOnInit(){this.currentSubOrganizationSubscription=this.appService.currentSubOrganization.subscribe(t=>{t&&t.id>0&&this.populateVendorData()})}ngOnDestroy(){this.currentSubOrganizationSubscription&&this.currentSubOrganizationSubscription.unsubscribe()}open(){this.visible=!0}close(t=!1){this.visible=!1,t&&this.populateVendorData()}populateVendorData(){return w(this,null,function*(){this.listOfData=yield this.appService.getVendors(),this.listOfDisplayData=this.listOfData,this.updateEditCache()})}startEdit(t){this.editCache[t].edit=!0}cancelEdit(t){let e=this.listOfDisplayData.findIndex(o=>o.id===t);this.editCache[t]={data:E({},this.listOfDisplayData[e]),edit:!1}}saveEdit(t){return w(this,null,function*(){let e=this.listOfDisplayData.findIndex(o=>o.id===t);yield this.appService.updateVendor(oe(E({id:t},this.editCache[t].data),{organization_id:this.editCache[t].data.organization_id,role_id:this.editCache[t].data.role_id,reports_to:this.editCache[t].data.reports_to,name:this.editCache[t].data.name})),this.editCache[t].edit=!1,Object.assign(this.listOfDisplayData[e],this.editCache[t].data),this.populateVendorData()})}updateEditCache(){this.listOfDisplayData.forEach(t=>{this.editCache[t.id]={edit:!1,data:E({},t)}})}viewDetails(t){this.selectedVendor=t,this.drawerVisible=!0}getBase64(t,e){let o=new FileReader;o.addEventListener("load",()=>e(o.result.toString())),o.readAsDataURL(t)}handleChange(t){this.getBase64(t.file.originFileObj,e=>{this.loading=!1,this.avatarUrl=e})}search(){this.searchVisible=!1,this.searchValue?(this.listOfDisplayData=this.listOfData.filter(t=>t.name&&t.name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1),console.log(this.listOfDisplayData)):this.listOfDisplayData=this.listOfData}};r.\u0275fac=function(e){return new(e||r)(b(F),b(ve))},r.\u0275cmp=N({type:r,selectors:[["app-vendor"]],decls:12,vars:7,consts:[["class","flex space-between","style","margin-bottom:5px",4,"appHasPermission"],[3,"vendor","visible","closeDrawer",4,"ngIf"],["nzTitle","Add Vendor",3,"nzVisible","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],["nzShowPagination","false","nzTableLayout","fixed",3,"nzPageSize","nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[1,"flex","space-between",2,"margin-bottom","5px"],[2,"display","-webkit-box","width","100%"],[2,"margin-right","5px"],[3,"nzSuffix"],["type","text","placeholder","Search here","nz-input","",3,"ngModel","ngModelChange","keyup"],["inputClearTpl",""],["suffixIconSearch",""],["nz-button","","nzType","primary","nzSize","small",3,"click"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-icon","","nzType","search"],[3,"vendor","visible","closeDrawer"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input Vendor name"],["nz-input","","formControlName","name"],["nzHasFeedback","","nzErrorTip","Please input Vendor contact no"],["nz-input","","formControlName","contact_no"],["nzHasFeedback","","nzErrorTip","Please input Vendor email"],["nz-input","","formControlName","email"],["nzHasFeedback","","nzErrorTip","Please input vendor address"],["nz-input","","formControlName","address"],["nzAction","null","nzName","avatar","nzListType","picture-card",1,"avatar-uploader",3,"nzShowUploadList","nzBeforeUpload","nzChange"],[4,"ngIf"],["style","width: 100%",3,"src",4,"ngIf"],["nz-icon","",1,"upload-icon",3,"nzType"],[1,"ant-upload-text"],[2,"width","100%",3,"src"],[3,"nzSortFn","nzSortPriority"],[4,"ngIf","ngIfElse"],["editTemplate",""],["nz-button","","nz-icon","","nzType","profile","nzTheme","outline",2,"font-size","24px",3,"click"],["class","smallIcon","alt","",3,"src",4,"ngIf"],[3,"click",4,"appHasPermission"],["alt","",1,"smallIcon",3,"src"],[3,"click"],["type","text","nz-input","",3,"ngModel","ngModelChange"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"]],template:function(e,o){if(e&1&&(u(0,at,12,3,"div",0)(1,st,1,2,"app-vendor-details",1),a(2,"nz-modal",2),V("nzVisibleChange",function(v){return x(o.isModalVisible,v)||(o.isModalVisible=v),v}),h("nzOnCancel",function(){return o.handleCancel()})("nzOnOk",function(){return o.handleOk()}),u(3,mt,28,5,"nz-form",3),s(),a(4,"nz-table",4,5)(7,"thead")(8,"tr"),u(9,pt,2,3,"th",6),s()(),a(10,"tbody"),u(11,ht,4,2,"tr",7),s()()),e&2){let m=T(6);p("appHasPermission",o.appPermissions.UpdateVendors),d(),p("ngIf",o.drawerVisible),d(),z("nzVisible",o.isModalVisible),d(2),p("nzPageSize",1e3)("nzData",o.listOfDisplayData),d(5),p("ngForOf",o.listOfColumn),d(2),p("ngForOf",m.data)}},dependencies:[I,le,W,k,A,_e,Ne,Ee,Oe,Me,Pe,H,De,Se,Ce,he,Ie,q,Fe,j,G,J,R,Z,ke,U,L,ze,xe,Ve,B,Y,Ue],styles:["[_nghost-%COMP%]     .avatar-uploader>.ant-upload{width:128px;height:128px}"]});let i=r;return i})();var Ct=[{path:"",component:Le,children:[],data:{name:"",permission:S.ViewVendors},canActivate:[ge]}],Be=(()=>{let r=class r{};r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=O({type:r}),r.\u0275inj=P({imports:[ee.forChild(Ct),ee]});let i=r;return i})();var He=pe,gt=Object.keys(He).map(i=>He[i]),ni=(()=>{let r=class r{};r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=O({type:r}),r.\u0275inj=P({providers:[{provide:ue,useValue:fe},{provide:ce,useValue:gt}],imports:[de,Be,Ae,ye,we,We]});let i=r;return i})();export{ni as VendorModule};
