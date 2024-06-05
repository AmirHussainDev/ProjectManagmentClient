import{b as q,d as Fe}from"./chunk-DFGD4IIT.js";import{a as Ce}from"./chunk-MB4J4X5W.js";import{a as y}from"./chunk-MI2CZ2YP.js";import{$a as Q,$b as ye,A as _,Aa as ae,Ac as L,B as f,Bb as ze,Cc as j,Dc as H,E as P,Eb as ve,Ec as G,Fa as E,Fb as xe,Fc as R,Ga as se,Hb as Ve,Ib as we,Jb as W,Ka as le,Kc as Oe,Lc as Ie,N as Z,O as m,P as S,T as u,U as p,a as D,ab as de,ac as Se,b as ne,ba as a,bc as be,ca as l,cb as M,cc as De,da as b,dc as Te,e as z,ea as J,eb as me,f as oe,fa as Y,fb as pe,fc as Ne,ga as C,gb as ce,gc as Pe,ha as h,hb as O,ia as s,ib as I,jb as F,lb as _e,ma as $,mb as fe,na as c,oa as w,pa as K,qb as ue,ra as v,rb as he,sa as x,ta as V,tb as A,ub as X,v as re,vb as k,vc as Ee,w as T,wb as ge,x as N,xc as B,zb as U,zc as Me}from"./chunk-IMPZQHLK.js";function Ye(o,r){if(o&1){let n=C();a(0,"span")(1,"input",7),V("ngModelChange",function(e){_(n);let t=s(2);return x(t.newProduct,e)||(t.newProduct=e),f(e)}),l(),a(2,"button",8),h("click",function(){_(n);let e=s(2);return f(e.handleAddProduct())}),c(3,"Add Product"),l()()}if(o&2){let n=s(2);m(),v("ngModel",n.newProduct)}}function $e(o,r){if(o&1&&(a(0,"tr")(1,"td"),c(2),l()()),o&2){let n=r.$implicit;m(2),w(n.name)}}function Ke(o,r){if(o&1&&(a(0,"div",2),u(1,Ye,4,1,"span",3),a(2,"nz-table",4)(3,"thead")(4,"tr")(5,"th",5),c(6,"Product Name"),l()()(),a(7,"tbody"),u(8,$e,3,1,"tr",6),l()()()),o&2){let n=s();m(),p("appHasPermission",n.appPermissions.UpdateVendors),m(),p("nzPageSize",1e3)("nzData",n.products),m(6),p("ngForOf",n.products)}}var Ae=(()=>{let r=class r{constructor(i){this.appService=i,this.visible=!1,this.closeDrawer=new re,this.placement="right",this.products=[],this.newProduct="",this.appPermissions=y}ngOnInit(){this.getAndSetItems()}getAndSetItems(){return z(this,null,function*(){this.products=yield this.appService.getVendorItems(this.vendor.id)})}addNewItem(){return z(this,null,function*(){this.newProduct&&this.newProduct.trim()&&(yield this.appService.addVendorItem(this.vendor.id,this.newProduct.trim()))})}showDrawer(){this.visible=!0}onClose(){this.visible=!1,this.closeDrawer.emit(!0)}handleAddProduct(){return z(this,null,function*(){this.newProduct.trim()!==""&&(this.products.push({name:this.newProduct.trim()}),yield this.addNewItem(),this.newProduct="",this.getAndSetItems())})}};r.\u0275fac=function(e){return new(e||r)(S(M))},r.\u0275cmp=T({type:r,selectors:[["app-vendor-details"]],inputs:{vendor:"vendor",visible:"visible"},outputs:{closeDrawer:"closeDrawer"},decls:2,vars:4,consts:[[3,"nzClosable","nzVisible","nzPlacement","nzTitle","nzOnClose"],["class","vendor-details",4,"nzDrawerContent"],[1,"vendor-details"],[4,"appHasPermission"],["nzShowPagination","false","nzBordered","",3,"nzPageSize","nzData"],["nzWidth","50%"],[4,"ngFor","ngForOf"],["nz-input","","placeholder","Enter product name",2,"margin-bottom","12px",3,"ngModel","ngModelChange"],["nz-button","","nzType","primary",2,"margin-bottom","12px",3,"click"]],template:function(e,t){e&1&&(a(0,"nz-drawer",0),h("nzOnClose",function(){return t.onClose()}),u(1,Ke,9,4,"div",1),l()),e&2&&p("nzClosable",!1)("nzVisible",t.visible)("nzPlacement",t.placement)("nzTitle",t.vendor.name)},dependencies:[E,F,O,I,Se,ye,W,H,B,L,R,j,G,A,k,U,q]});let o=r;return o})();function Xe(o,r){if(o&1){let n=C();a(0,"div")(1,"button",8),h("click",function(){_(n);let e=s();return f(e.showModal())}),c(2,"Add Vendor"),l()()}}function et(o,r){if(o&1){let n=C();a(0,"app-vendor-details",9),h("closeDrawer",function(){_(n);let e=s();return f(e.drawerVisible=!1)}),l()}if(o&2){let n=s();p("vendor",n.selectedVendor)("visible",n.drawerVisible)}}function tt(o,r){if(o&1&&(J(0),b(1,"span",17),a(2,"div",18),c(3,"Upload"),l(),Y()),o&2){let n=s(2);m(),p("nzType",n.loading?"loading":"plus")}}function it(o,r){if(o&1&&b(0,"img",19),o&2){let n=s(2);p("src",n.avatarUrl,Z)}}function nt(o,r){if(o&1){let n=C();a(0,"nz-form",10)(1,"nz-form-item")(2,"nz-form-label",11),c(3,"Vendor Name"),l(),a(4,"nz-form-control",12),b(5,"input",13),l()(),a(6,"nz-form-item")(7,"nz-form-label",11),c(8,"Vendor Name"),l(),a(9,"nz-form-control",12)(10,"nz-upload",14),h("nzChange",function(e){_(n);let t=s();return f(t.handleChange(e))}),u(11,tt,4,1,"ng-container",15)(12,it,1,1,"img",16),l()()()()}if(o&2){let n=s();p("formGroup",n.addVendorForm),m(10),p("nzShowUploadList",!1)("nzBeforeUpload",n.beforeUpload),m(),p("ngIf",!n.avatarUrl),m(),p("ngIf",n.avatarUrl)}}function ot(o,r){if(o&1&&(a(0,"th",20),c(1),l()),o&2){let n=r.$implicit;p("nzSortFn",n.compare)("nzSortPriority",n.priority),m(),K(" ",n.title," ")}}function rt(o,r){if(o&1){let n=C();a(0,"a",26),h("click",function(){_(n);let e=s(2).$implicit,t=s();return f(t.startEdit(e.id))}),c(1,"Edit"),l()}}function at(o,r){if(o&1){let n=C();J(0),a(1,"td")(2,"div")(3,"span",23),h("click",function(){_(n);let e=s().$implicit,t=s();return f(t.viewDetails(e))}),l(),b(4,"img",24),a(5,"span"),c(6),l()()(),a(7,"td"),c(8),l(),a(9,"td"),c(10),l(),a(11,"td"),c(12),l(),a(13,"td"),u(14,rt,2,0,"a",25),l(),Y()}if(o&2){let n=s().$implicit,i=s();m(4),p("src",i.apiUrl+"/images/"+n.filename,Z),m(2),K(" ",n.name,""),m(2),w(n.contact_no),m(2),w(n.address),m(2),w(n.email),m(2),p("appHasPermission",i.appPermissions.UpdateVendors)}}function st(o,r){if(o&1){let n=C();a(0,"td")(1,"input",27),V("ngModelChange",function(e){_(n);let t=s().$implicit,d=s();return x(d.editCache[t.id].data.name,e)||(d.editCache[t.id].data.name=e),f(e)}),l()(),a(2,"td")(3,"input",27),V("ngModelChange",function(e){_(n);let t=s().$implicit,d=s();return x(d.editCache[t.id].data.contact_no,e)||(d.editCache[t.id].data.contact_no=e),f(e)}),l()(),a(4,"td")(5,"input",27),V("ngModelChange",function(e){_(n);let t=s().$implicit,d=s();return x(d.editCache[t.id].data.address,e)||(d.editCache[t.id].data.address=e),f(e)}),l()(),a(6,"td")(7,"input",27),V("ngModelChange",function(e){_(n);let t=s().$implicit,d=s();return x(d.editCache[t.id].data.email,e)||(d.editCache[t.id].data.email=e),f(e)}),l()(),a(8,"td")(9,"a",28),h("click",function(){_(n);let e=s().$implicit,t=s();return f(t.saveEdit(e.id))}),c(10,"Save"),l(),c(11," \xA0 "),a(12,"a",29),h("nzOnConfirm",function(){_(n);let e=s().$implicit,t=s();return f(t.cancelEdit(e.id))}),c(13,"Cancel"),l()()}if(o&2){let n=s().$implicit,i=s();m(),v("ngModel",i.editCache[n.id].data.name),m(2),v("ngModel",i.editCache[n.id].data.contact_no),m(2),v("ngModel",i.editCache[n.id].data.address),m(2),v("ngModel",i.editCache[n.id].data.email)}}function lt(o,r){if(o&1&&(a(0,"tr"),u(1,at,15,6,"ng-container",21)(2,st,14,4,"ng-template",null,22,ae),l()),o&2){let n=r.$implicit,i=$(3),e=s();m(),p("ngIf",!(e.editCache[n.id]!=null&&e.editCache[n.id].edit))("ngIfElse",i)}}var ke=(()=>{let r=class r{constructor(i,e){this.appService=i,this.fb=e,this.apiUrl=de.apiUrl,this.isModalVisible=!1,this.drawerVisible=!1,this.selectedVendor={},this.appPermissions=y,this.listOfColumn=[{title:"Name",compare:(t,d)=>t.name.localeCompare(d.name),priority:!1},{title:"Contact No",compare:(t,d)=>t.contact_no.localeCompare(d.contact_no),priority:!1},{title:"Address",compare:(t,d)=>t.address.localeCompare(d.address),priority:!1},{title:"Email",compare:(t,d)=>t.email.localeCompare(d.email),priority:!1},{title:"Action",compare:(t,d)=>t.role_id-d.role_id,priority:!1}],this.listOfData=[],this.visible=!1,this.editCache={},this.beforeUpload=(t,d)=>new oe(g=>{let te=t.type==="image/jpeg"||t.type==="image/png";if(!te){this.msg.error("You can only upload JPG file!"),g.complete();return}let ie=t.size/1024/1024<2;if(!ie){this.msg.error("Image must smaller than 2MB!"),g.complete();return}this.addVendorForm.patchValue({file:t}),g.next(te&&ie),g.complete()}),this.addVendorForm=this.fb.group({name:["",[X.required]],file:["",[X.required]]})}showModal(){this.isModalVisible=!0}handleOk(){return z(this,null,function*(){yield this.appService.createVendor(this.addVendorForm.value.name,this.addVendorForm.value.file),this.isModalVisible=!1,this.populateVendorData()})}handleCancel(){this.isModalVisible=!1}ngOnInit(){this.currentSubOrganizationSubscription=this.appService.currentSubOrganization.subscribe(i=>{i&&i.id>0&&this.populateVendorData()})}ngOnDestroy(){this.currentSubOrganizationSubscription&&this.currentSubOrganizationSubscription.unsubscribe()}open(){this.visible=!0}close(i=!1){this.visible=!1,i&&this.populateVendorData()}populateVendorData(){return z(this,null,function*(){this.listOfData=yield this.appService.getVendors(),this.updateEditCache()})}startEdit(i){this.editCache[i].edit=!0}cancelEdit(i){let e=this.listOfData.findIndex(t=>t.id===i);this.editCache[i]={data:D({},this.listOfData[e]),edit:!1}}saveEdit(i){return z(this,null,function*(){let e=this.listOfData.findIndex(t=>t.id===i);yield this.appService.updateVendor(ne(D({id:i},this.editCache[i].data),{organization_id:this.editCache[i].data.organization_id,role_id:this.editCache[i].data.role_id,reports_to:this.editCache[i].data.reports_to,name:this.editCache[i].data.name})),this.editCache[i].edit=!1,Object.assign(this.listOfData[e],this.editCache[i].data),this.populateVendorData()})}updateEditCache(){this.listOfData.forEach(i=>{this.editCache[i.id]={edit:!1,data:D({},i)}})}viewDetails(i){this.selectedVendor=i,this.drawerVisible=!0}getBase64(i,e){let t=new FileReader;t.addEventListener("load",()=>e(t.result.toString())),t.readAsDataURL(i)}handleChange(i){this.getBase64(i.file.originFileObj,e=>{this.loading=!1,this.avatarUrl=e})}};r.\u0275fac=function(e){return new(e||r)(S(M),S(xe))},r.\u0275cmp=T({type:r,selectors:[["app-vendor"]],decls:12,vars:7,consts:[[4,"appHasPermission"],[3,"vendor","visible","closeDrawer",4,"ngIf"],["nzTitle","Add Vendor",3,"nzVisible","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],["nzShowPagination","false","nzTableLayout","fixed",3,"nzPageSize","nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],["nz-button","","nzType","primary",3,"click"],[3,"vendor","visible","closeDrawer"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input Vendor name"],["nz-input","","formControlName","name"],["nzAction","null","nzName","avatar","nzListType","picture-card",1,"avatar-uploader",3,"nzShowUploadList","nzBeforeUpload","nzChange"],[4,"ngIf"],["style","width: 100%",3,"src",4,"ngIf"],["nz-icon","",1,"upload-icon",3,"nzType"],[1,"ant-upload-text"],[2,"width","100%",3,"src"],[3,"nzSortFn","nzSortPriority"],[4,"ngIf","ngIfElse"],["editTemplate",""],["nz-button","","nz-icon","","nzType","profile","nzSize","large","nzTheme","outline",3,"click"],["alt","",1,"smallIcon",3,"src"],[3,"click",4,"appHasPermission"],[3,"click"],["type","text","nz-input","",3,"ngModel","ngModelChange"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"]],template:function(e,t){if(e&1&&(u(0,Xe,3,0,"div",0)(1,et,1,2,"app-vendor-details",1),a(2,"nz-modal",2),V("nzVisibleChange",function(g){return x(t.isModalVisible,g)||(t.isModalVisible=g),g}),h("nzOnCancel",function(){return t.handleCancel()})("nzOnOk",function(){return t.handleOk()}),u(3,nt,13,5,"nz-form",3),l(),a(4,"nz-table",4,5)(7,"thead")(8,"tr"),u(9,ot,2,3,"th",6),l()(),a(10,"tbody"),u(11,lt,4,2,"tr",7),l()()),e&2){let d=$(6);p("appHasPermission",t.appPermissions.UpdateVendors),m(),p("ngIf",t.drawerVisible),m(),v("nzVisible",t.isModalVisible),m(2),p("nzPageSize",1e3)("nzData",t.listOfData),m(5),p("ngForOf",t.listOfColumn),m(2),p("ngForOf",d.data)}},dependencies:[E,se,F,O,I,ce,De,be,Te,Pe,Ne,W,he,ue,Ee,H,Me,B,L,R,j,G,Oe,A,k,ge,ze,ve,U,q,Ae],styles:["[_nghost-%COMP%]     .avatar-uploader>.ant-upload{width:128px;height:128px}"]});let o=r;return o})();var dt=[{path:"",component:ke,children:[],data:{name:"",permission:y.ViewVendors},canActivate:[Ce]}],Ue=(()=>{let r=class r{};r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=N({type:r}),r.\u0275inj=P({imports:[Q.forChild(dt),Q]});let o=r;return o})();var We=me,mt=Object.keys(We).map(o=>We[o]),Yt=(()=>{let r=class r{};r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=N({type:r}),r.\u0275inj=P({providers:[{provide:fe,useValue:_e},{provide:pe,useValue:mt}],imports:[le,Ue,Ie,we,Ve,Fe]});let o=r;return o})();export{Yt as VendorModule};
