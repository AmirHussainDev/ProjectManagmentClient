import{b as J,f as Ae}from"./chunk-EM36V2J5.js";import{a as Ce}from"./chunk-WEORZT4K.js";import{a as b}from"./chunk-7RB6QFZN.js";import"./chunk-QXNFUYHD.js";import{$c as ke,A as _,B as f,Cb as W,E as I,Eb as C,Fa as O,Fb as U,Gb as ge,Jb as L,La as P,Lb as ze,Ma as se,Mc as Pe,O as K,Ob as xe,Oc as H,P as d,Pb as Ve,Q as D,Qc as Me,Ra as le,Rb as ve,Rc as j,Sb as we,Tb as B,Tc as q,Ub as ye,Uc as G,V as u,Vb as Se,Vc as R,Wc as Z,X as p,_c as Fe,a as Y,aa as ae,e as y,ea as a,f as oe,fa as s,ga as g,ha as Q,hb as ee,ia as X,ib as de,ja as z,ka as h,la as l,lb as M,lc as be,mc as De,nb as me,nc as Te,ob as pe,oc as Ee,pa as T,pb as ce,qa as c,qb as F,qc as Ne,ra as S,rb as k,sa as $,sb as A,sc as Ie,tb as _e,tc as Oe,ua as x,ub as fe,v as re,va as V,w as E,wa as v,x as N,yb as ue,zb as he}from"./chunk-NE6OXDYI.js";function Qe(t,r){if(t&1){let i=z();a(0,"span")(1,"input",7),v("ngModelChange",function(e){_(i);let n=l(2);return V(n.newProduct,e)||(n.newProduct=e),f(e)}),s(),a(2,"button",8),h("click",function(){_(i);let e=l(2);return f(e.handleAddProduct())}),c(3,"Add Product"),s()()}if(t&2){let i=l(2);d(),x("ngModel",i.newProduct)}}function Xe(t,r){if(t&1&&(a(0,"tr")(1,"td"),c(2),s()()),t&2){let i=r.$implicit;d(2),S(i.name)}}function $e(t,r){if(t&1&&(a(0,"div",2),u(1,Qe,4,1,"span",3),a(2,"nz-table",4)(3,"thead")(4,"tr")(5,"th",5),c(6,"Product Name"),s()()(),a(7,"tbody"),u(8,Xe,3,1,"tr",6),s()()()),t&2){let i=l();d(),p("appHasPermission",i.appPermissions.UpdateVendors),d(),p("nzPageSize",1e3)("nzData",i.products),d(6),p("ngForOf",i.products)}}var We=(()=>{let r=class r{constructor(o){this.appService=o,this.visible=!1,this.closeDrawer=new re,this.placement="right",this.products=[],this.newProduct="",this.appPermissions=b}ngOnInit(){this.getAndSetItems()}getAndSetItems(){return y(this,null,function*(){this.products=yield this.appService.getVendorItems(this.vendor.id)})}addNewItem(){return y(this,null,function*(){this.newProduct&&this.newProduct.trim()&&(yield this.appService.addVendorItem(this.vendor.id,this.newProduct.trim()))})}showDrawer(){this.visible=!0}onClose(){this.visible=!1,this.closeDrawer.emit(!0)}handleAddProduct(){return y(this,null,function*(){this.newProduct.trim()!==""&&(this.products.push({name:this.newProduct.trim()}),yield this.addNewItem(),this.newProduct="",this.getAndSetItems())})}};r.\u0275fac=function(e){return new(e||r)(D(M))},r.\u0275cmp=E({type:r,selectors:[["app-vendor-details"]],inputs:{vendor:"vendor",visible:"visible"},outputs:{closeDrawer:"closeDrawer"},decls:2,vars:4,consts:[[3,"nzClosable","nzVisible","nzPlacement","nzTitle","nzOnClose"],["class","vendor-details",4,"nzDrawerContent"],[1,"vendor-details"],[4,"appHasPermission"],["nzShowPagination","false","nzBordered","",3,"nzPageSize","nzData"],["nzWidth","50%"],[4,"ngFor","ngForOf"],["nz-input","","placeholder","Enter product name",2,"margin-bottom","12px",3,"ngModel","ngModelChange"],["nz-button","","nzType","primary",2,"margin-bottom","12px",3,"click"]],template:function(e,n){e&1&&(a(0,"nz-drawer",0),h("nzOnClose",function(){return n.onClose()}),u(1,$e,9,4,"div",1),s()),e&2&&p("nzClosable",!1)("nzVisible",n.visible)("nzPlacement",n.placement)("nzTitle",n.vendor.name)},dependencies:[P,A,F,k,De,be,B,G,H,j,Z,q,R,W,U,L,J]});let t=r;return t})();function tt(t,r){if(t&1){let i=z();a(0,"span",17),h("click",function(){_(i);let e=l(3);return e.searchValue="",f(e.search())}),s()}}function it(t,r){t&1&&g(0,"span",18)}function nt(t,r){if(t&1&&u(0,tt,1,0,"span",16)(1,it,1,0),t&2){let i=l(2);ae(0,i.searchValue?0:1)}}function ot(t,r){t&1&&g(0,"span",18)}function rt(t,r){if(t&1){let i=z();a(0,"div",8)(1,"span",9)(2,"h3",10),c(3," Vendors "),s(),a(4,"nz-input-group",11)(5,"input",12),v("ngModelChange",function(e){_(i);let n=l();return V(n.searchValue,e)||(n.searchValue=e),f(e)}),h("keyup",function(){_(i);let e=l();return f(e.search())}),s()(),u(6,nt,2,1,"ng-template",null,13,O)(8,ot,1,0,"ng-template",null,14,O),s(),a(10,"button",15),h("click",function(){_(i);let e=l();return f(e.showModal())}),c(11,"Add Vendor"),s()()}if(t&2){let i=T(7),o=T(9),e=l();d(4),p("nzSuffix",o)("nzSuffix",i),d(),x("ngModel",e.searchValue)}}function at(t,r){if(t&1){let i=z();a(0,"app-vendor-details",19),h("closeDrawer",function(){_(i);let e=l();return f(e.drawerVisible=!1)}),s()}if(t&2){let i=l();p("vendor",i.selectedVendor)("visible",i.drawerVisible)}}function st(t,r){if(t&1&&(Q(0),g(1,"span",33),a(2,"div",34),c(3,"Upload"),s(),X()),t&2){let i=l(2);d(),p("nzType",i.loading?"loading":"plus")}}function lt(t,r){if(t&1&&g(0,"img",35),t&2){let i=l(2);p("src",i.avatarUrl,K)}}function dt(t,r){if(t&1){let i=z();a(0,"nz-form",20)(1,"nz-form-item")(2,"nz-form-label",21),c(3,"Vendor Name"),s(),a(4,"nz-form-control",22),g(5,"input",23),s()(),a(6,"nz-form-item")(7,"nz-form-label",21),c(8,"Contact No"),s(),a(9,"nz-form-control",24),g(10,"input",25),s()(),a(11,"nz-form-item")(12,"nz-form-label",21),c(13,"Email"),s(),a(14,"nz-form-control",26),g(15,"input",27),s()(),a(16,"nz-form-item")(17,"nz-form-label",21),c(18,"Address"),s(),a(19,"nz-form-control",28),g(20,"input",29),s()(),a(21,"nz-form-item")(22,"nz-form-label",21),c(23,"Vendor Image"),s(),a(24,"nz-form-control",22)(25,"nz-upload",30),h("nzChange",function(e){_(i);let n=l();return f(n.handleChange(e))}),u(26,st,4,1,"ng-container",31)(27,lt,1,1,"img",32),s()()()()}if(t&2){let i=l();p("formGroup",i.addVendorForm),d(25),p("nzShowUploadList",!1)("nzBeforeUpload",i.beforeUpload),d(),p("ngIf",!i.avatarUrl),d(),p("ngIf",i.avatarUrl)}}function mt(t,r){if(t&1&&(a(0,"th",36),c(1),s()),t&2){let i=r.$implicit;p("nzSortFn",i.compare)("nzSortPriority",i.priority),d(),$(" ",i.title," ")}}function pt(t,r){if(t&1&&g(0,"img",42),t&2){let i=l(2).$implicit,o=l();p("src",o.apiUrl+"/images/"+i.filename,K)}}function ct(t,r){if(t&1){let i=z();a(0,"a",43),h("click",function(){_(i);let e=l(2).$implicit,n=l();return n.startEdit(e.id),f(n.showModal(!1))}),c(1,"Edit"),s()}}function _t(t,r){if(t&1){let i=z();Q(0),a(1,"td")(2,"div")(3,"span",39),h("click",function(){_(i);let e=l().$implicit,n=l();return f(n.viewDetails(e))}),s(),u(4,pt,1,1,"img",40),a(5,"span"),c(6),s()()(),a(7,"td"),c(8),s(),a(9,"td"),c(10),s(),a(11,"td"),c(12),s(),a(13,"td"),u(14,ct,2,0,"a",41),s(),X()}if(t&2){let i=l().$implicit,o=l();d(4),p("ngIf",i.filename),d(2),$(" ",i.name,""),d(2),S(i.contact_no),d(2),S(i.address),d(2),S(i.email),d(2),p("appHasPermission",o.appPermissions.UpdateVendors)}}function ft(t,r){if(t&1){let i=z();a(0,"td")(1,"input",44),v("ngModelChange",function(e){_(i);let n=l().$implicit,m=l();return V(m.editCache[n.id].data.name,e)||(m.editCache[n.id].data.name=e),f(e)}),s()(),a(2,"td")(3,"input",44),v("ngModelChange",function(e){_(i);let n=l().$implicit,m=l();return V(m.editCache[n.id].data.contact_no,e)||(m.editCache[n.id].data.contact_no=e),f(e)}),s()(),a(4,"td")(5,"input",44),v("ngModelChange",function(e){_(i);let n=l().$implicit,m=l();return V(m.editCache[n.id].data.address,e)||(m.editCache[n.id].data.address=e),f(e)}),s()(),a(6,"td")(7,"input",44),v("ngModelChange",function(e){_(i);let n=l().$implicit,m=l();return V(m.editCache[n.id].data.email,e)||(m.editCache[n.id].data.email=e),f(e)}),s()(),a(8,"td")(9,"a",45),h("click",function(){_(i);let e=l().$implicit,n=l();return f(n.saveEdit(e.id))}),c(10,"Save"),s(),c(11," \xA0 "),a(12,"a",46),h("nzOnConfirm",function(){_(i);let e=l().$implicit,n=l();return f(n.cancelEdit(e.id))}),c(13,"Cancel"),s()()}if(t&2){let i=l().$implicit,o=l();d(),x("ngModel",o.editCache[i.id].data.name),d(2),x("ngModel",o.editCache[i.id].data.contact_no),d(2),x("ngModel",o.editCache[i.id].data.address),d(2),x("ngModel",o.editCache[i.id].data.email)}}function ut(t,r){if(t&1&&(a(0,"tr"),u(1,_t,15,6,"ng-container",37)(2,ft,14,4,"ng-template",null,38,O),s()),t&2){let i=r.$implicit,o=T(3),e=l();d(),p("ngIf",!(e.editCache[i.id]!=null&&e.editCache[i.id].edit))("ngIfElse",o)}}var Ue=(()=>{let r=class r{constructor(o,e){this.appService=o,this.fb=e,this.apiUrl=de.apiUrl,this.isModalVisible=!1,this.drawerVisible=!1,this.selectedVendor={},this.appPermissions=b,this.listOfColumn=[{title:"Name",compare:(n,m)=>n.name.localeCompare(m.name),priority:!1},{title:"Contact No",compare:(n,m)=>n.contact_no.localeCompare(m.contact_no),priority:!1},{title:"Address",compare:(n,m)=>n.address.localeCompare(m.address),priority:!1},{title:"Email",compare:(n,m)=>n.email.localeCompare(m.email),priority:!1},{title:"Action",compare:(n,m)=>n.role_id-m.role_id,priority:!1}],this.listOfData=[],this.visible=!1,this.listOfDisplayData=[],this.editCache={},this.beforeUpload=(n,m)=>new oe(w=>{let ie=n.type==="image/jpeg"||n.type==="image/png";if(!ie){this.msg.error("You can only upload JPG file!"),w.complete();return}let ne=n.size/1024/1024<2;if(!ne){this.msg.error("Image must smaller than 2MB!"),w.complete();return}this.addVendorForm.patchValue({file:n}),w.next(ie&&ne),w.complete()}),this.addVendorForm=this.fb.group({name:["",[C.required]],id:[0],contact_no:["",[C.required]],email:["",[C.required]],address:["",[C.required]],file:["",[C.required]]})}showModal(o=!0){this.newItem=o,this.newItem&&(this.addVendorForm.reset(),this.avatarUrl=""),this.isModalVisible=!0}handleOk(){return y(this,null,function*(){this.isModalVisible=!1,this.newItem?yield this.appService.createVendor(this.addVendorForm.value,this.addVendorForm.value.file):yield this.appService.updateVendor(this.addVendorForm.value,this.addVendorForm.value.file),this.isModalVisible=!1,this.populateVendorData()})}handleCancel(){this.isModalVisible=!1}ngOnInit(){this.currentSubOrganizationSubscription=this.appService.currentSubOrganization.subscribe(o=>{o&&o.id>0&&this.populateVendorData()})}ngOnDestroy(){this.currentSubOrganizationSubscription&&this.currentSubOrganizationSubscription.unsubscribe()}open(){this.visible=!0}close(o=!1){this.visible=!1,o&&this.populateVendorData()}populateVendorData(){return y(this,null,function*(){this.listOfData=yield this.appService.getVendors(),this.listOfDisplayData=this.listOfData,this.updateEditCache()})}startEdit(o){this.editableItem=this.editCache[o].data,this.addVendorForm=this.fb.group({name:[this.editableItem.name,[C.required]],contact_no:[this.editableItem.contact_no,[C.required]],email:[this.editableItem.email,[C.required]],address:[this.editableItem.address,[C.required]],file:[null,[C.required]],id:[this.editableItem.id]}),this.avatarUrl="api/images/"+this.editableItem.filename}cancelEdit(o){let e=this.listOfDisplayData.findIndex(n=>n.id===o);this.editCache[o]={data:Y({},this.listOfDisplayData[e]),edit:!1}}saveEdit(o){return y(this,null,function*(){let e=this.listOfDisplayData.findIndex(n=>n.id===o);this.editCache[o].edit=!1,Object.assign(this.listOfDisplayData[e],this.editCache[o].data),this.populateVendorData()})}updateEditCache(){this.listOfDisplayData.forEach(o=>{this.editCache[o.id]={edit:!1,data:Y({},o)}})}viewDetails(o){this.selectedVendor=o,this.drawerVisible=!0}getBase64(o,e){let n=new FileReader;n.addEventListener("load",()=>e(n.result.toString())),n.readAsDataURL(o)}handleChange(o){this.getBase64(o.file.originFileObj,e=>{this.loading=!1,this.avatarUrl=e})}search(){this.searchVisible=!1,this.searchValue?(this.listOfDisplayData=this.listOfData.filter(o=>o.name&&o.name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1),console.log(this.listOfDisplayData)):this.listOfDisplayData=this.listOfData}};r.\u0275fac=function(e){return new(e||r)(D(M),D(Ve))},r.\u0275cmp=E({type:r,selectors:[["app-vendor"]],decls:12,vars:8,consts:[["class","flex space-between","style","margin-bottom:5px",4,"appHasPermission"],[3,"vendor","visible","closeDrawer",4,"ngIf"],[3,"nzVisible","nzTitle","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],["nzShowPagination","false",3,"nzPageSize","nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[1,"flex","space-between",2,"margin-bottom","5px"],[2,"display","-webkit-box","width","100%"],[2,"margin-right","5px"],[3,"nzSuffix"],["type","text","placeholder","Search here","nz-input","",3,"ngModel","ngModelChange","keyup"],["inputClearTpl",""],["suffixIconSearch",""],["nz-button","","nzType","primary","nzSize","small",3,"click"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-icon","","nzType","search"],[3,"vendor","visible","closeDrawer"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input Vendor name"],["nz-input","","formControlName","name"],["nzHasFeedback","","nzErrorTip","Please input Vendor contact no"],["nz-input","","formControlName","contact_no"],["nzHasFeedback","","nzErrorTip","Please input Vendor email"],["nz-input","","formControlName","email"],["nzHasFeedback","","nzErrorTip","Please input vendor address"],["nz-input","","formControlName","address"],["nzAction","null","nzName","avatar","nzListType","picture-card",1,"avatar-uploader",3,"nzShowUploadList","nzBeforeUpload","nzChange"],[4,"ngIf"],["style","width: 100%",3,"src",4,"ngIf"],["nz-icon","",1,"upload-icon",3,"nzType"],[1,"ant-upload-text"],[2,"width","100%",3,"src"],[3,"nzSortFn","nzSortPriority"],[4,"ngIf","ngIfElse"],["editTemplate",""],["nz-button","","nz-icon","","nzType","profile","nzTheme","outline",2,"font-size","24px",3,"click"],["class","smallIcon","alt","",3,"src",4,"ngIf"],[3,"click",4,"appHasPermission"],["alt","",1,"smallIcon",3,"src"],[3,"click"],["type","text","nz-input","",3,"ngModel","ngModelChange"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"]],template:function(e,n){if(e&1&&(u(0,rt,12,3,"div",0)(1,at,1,2,"app-vendor-details",1),a(2,"nz-modal",2),v("nzVisibleChange",function(w){return V(n.isModalVisible,w)||(n.isModalVisible=w),w}),h("nzOnCancel",function(){return n.handleCancel()})("nzOnOk",function(){return n.handleOk()}),u(3,dt,28,5,"nz-form",3),s(),a(4,"nz-table",4,5)(7,"thead")(8,"tr"),u(9,mt,2,3,"th",6),s()(),a(10,"tbody"),u(11,ut,4,2,"tr",7),s()()),e&2){let m=T(6);p("appHasPermission",n.appPermissions.UpdateVendors),d(),p("ngIf",n.drawerVisible),d(),x("nzVisible",n.isModalVisible),p("nzTitle",n.newItem?"Add Vendor":"Edit Vendor"),d(2),p("nzPageSize",1e3)("nzData",n.listOfDisplayData),d(5),p("ngForOf",n.listOfColumn),d(2),p("ngForOf",m.data)}},dependencies:[P,se,A,F,k,ce,Ee,Te,Ne,Oe,Ie,B,Se,ye,he,ue,Pe,G,Me,H,j,Z,q,R,Fe,W,U,ge,ze,xe,L,J,We],styles:["[_nghost-%COMP%]     .avatar-uploader>.ant-upload{width:128px;height:128px}"]});let t=r;return t})();var ht=[{path:"",component:Ue,children:[],data:{name:"",permission:b.ViewVendors},canActivate:[Ce]}],Le=(()=>{let r=class r{};r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=N({type:r}),r.\u0275inj=I({imports:[ee.forChild(ht),ee]});let t=r;return t})();var Be=me,Ct=Object.keys(Be).map(t=>Be[t]),ii=(()=>{let r=class r{};r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=N({type:r}),r.\u0275inj=I({providers:[{provide:fe,useValue:_e},{provide:pe,useValue:Ct}],imports:[le,Le,ke,we,ve,Ae]});let t=r;return t})();export{ii as VendorModule};
