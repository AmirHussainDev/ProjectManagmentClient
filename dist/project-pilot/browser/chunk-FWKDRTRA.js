import{b as J,f as ke}from"./chunk-TFSPKEVB.js";import{a as Ce}from"./chunk-CXD6RW2A.js";import{a as j}from"./chunk-62EMLTDR.js";import"./chunk-MXNMPF3F.js";import{Ab as ee,Bb as ce,Ca as b,D as re,Da as d,Ea as N,F as S,Fa as X,G as T,Ha as P,Ia as w,J as _,Ja as v,K as f,Kc as De,Lb as O,Lc as be,Mc as Se,N as V,Nb as pe,Nc as Te,Ob as me,Pb as de,Pc as Ve,Qb as M,Rb as F,Rc as Ne,Sb as k,Sc as Ee,Ta as E,Tb as _e,Ub as fe,Y,Yb as ue,Z as c,Zb as he,_ as D,a as $,ac as A,cb as I,cc as y,db as se,dc as U,ec as ge,f as z,ga as u,h as oe,hc as W,ia as p,ib as le,jc as ze,jd as Ie,ld as B,mc as xe,na as ae,nc as Pe,nd as Oe,od as H,pc as we,qc as ve,qd as G,ra as s,rc as L,rd as R,sa as l,sc as ye,sd as q,ta as x,tc as je,td as Z,ua as K,va as Q,wa as C,xa as h,xd as Me,ya as a,yd as Fe}from"./chunk-ALEK3DEW.js";function Ke(e,r){if(e&1){let n=C();s(0,"span")(1,"input",7),v("ngModelChange",function(t){_(n);let o=a(2);return w(o.newProduct,t)||(o.newProduct=t),f(t)}),l(),s(2,"button",8),h("click",function(){_(n);let t=a(2);return f(t.handleAddProduct())}),d(3,"Add Product"),l()()}if(e&2){let n=a(2);c(),P("ngModel",n.newProduct)}}function Qe(e,r){if(e&1&&(s(0,"tr")(1,"td"),d(2),l()()),e&2){let n=r.$implicit;c(2),N(n.name)}}function Xe(e,r){if(e&1&&(s(0,"div",2),u(1,Ke,4,1,"span",3),s(2,"nz-table",4)(3,"thead")(4,"tr")(5,"th",5),d(6,"Product Name"),l()()(),s(7,"tbody"),u(8,Qe,3,1,"tr",6),l()()()),e&2){let n=a();c(),p("appHasPermission",n.appPermissions.AddUpdateTask),c(),p("nzPageSize",1e3)("nzData",n.products),c(6),p("ngForOf",n.products)}}var Ae=(()=>{let r=class r{constructor(i){this.appService=i,this.visible=!1,this.closeDrawer=new re,this.placement="right",this.products=[],this.newProduct="",this.appPermissions=j}ngOnInit(){this.getAndSetItems()}getAndSetItems(){return z(this,null,function*(){this.products=yield this.appService.getProjectItems(this.project.id)})}addNewItem(){return z(this,null,function*(){this.newProduct&&this.newProduct.trim()&&(yield this.appService.addProjectItem(this.project.id,this.newProduct.trim()))})}showDrawer(){this.visible=!0}onClose(){this.visible=!1,this.closeDrawer.emit(!0)}handleAddProduct(){return z(this,null,function*(){this.newProduct.trim()!==""&&(this.products.push({name:this.newProduct.trim()}),yield this.addNewItem(),this.newProduct="",this.getAndSetItems())})}};r.\u0275fac=function(t){return new(t||r)(D(O))},r.\u0275cmp=S({type:r,selectors:[["app-project-details"]],inputs:{project:"project",visible:"visible"},outputs:{closeDrawer:"closeDrawer"},decls:2,vars:4,consts:[[3,"nzClosable","nzVisible","nzPlacement","nzTitle","nzOnClose"],["class","project-details",4,"nzDrawerContent"],[1,"project-details"],[4,"appHasPermission"],["nzShowPagination","false","nzBordered","",3,"nzPageSize","nzData"],["nzWidth","50%"],[4,"ngFor","ngForOf"],["nz-input","","placeholder","Enter product name",2,"margin-bottom","12px",3,"ngModel","ngModelChange"],["nz-button","","nzType","primary",2,"margin-bottom","12px",3,"click"]],template:function(t,o){t&1&&(s(0,"nz-drawer",0),h("nzOnClose",function(){return o.onClose()}),u(1,Xe,9,4,"div",1),l()),t&2&&p("nzClosable",!1)("nzVisible",o.visible)("nzPlacement",o.placement)("nzTitle",o.project.name)},dependencies:[I,k,M,F,be,De,L,R,B,H,Z,G,q,A,U,W,J]});let e=r;return e})();function tt(e,r){if(e&1){let n=C();s(0,"span",17),h("click",function(){_(n);let t=a(3);return t.searchValue="",f(t.search())}),l()}}function it(e,r){e&1&&x(0,"span",18)}function nt(e,r){if(e&1&&u(0,tt,1,0,"span",16)(1,it,1,0),e&2){let n=a(2);ae(0,n.searchValue?0:1)}}function ot(e,r){e&1&&x(0,"span",18)}function rt(e,r){if(e&1){let n=C();s(0,"div",8)(1,"span",9)(2,"h3",10),d(3," Projects "),l(),s(4,"nz-input-group",11)(5,"input",12),v("ngModelChange",function(t){_(n);let o=a();return w(o.searchValue,t)||(o.searchValue=t),f(t)}),h("keyup",function(){_(n);let t=a();return f(t.search())}),l()(),u(6,nt,2,1,"ng-template",null,13,E)(8,ot,1,0,"ng-template",null,14,E),l(),s(10,"button",15),h("click",function(){_(n);let t=a();return f(t.showModal())}),d(11,"Add Project"),l()()}if(e&2){let n=b(7),i=b(9),t=a();c(4),p("nzSuffix",i)("nzSuffix",n),c(),P("ngModel",t.searchValue)}}function at(e,r){if(e&1){let n=C();s(0,"app-project-details",19),h("closeDrawer",function(){_(n);let t=a();return f(t.drawerVisible=!1)}),l()}if(e&2){let n=a();p("project",n.selectedProject)("visible",n.drawerVisible)}}function st(e,r){if(e&1&&(K(0),x(1,"span",29),s(2,"div",30),d(3,"Upload"),l(),Q()),e&2){let n=a(2);c(),p("nzType",n.loading?"loading":"plus")}}function lt(e,r){if(e&1&&x(0,"img",31),e&2){let n=a(2);p("src",n.avatarUrl,Y)}}function ct(e,r){if(e&1){let n=C();s(0,"nz-form",20)(1,"nz-form-item")(2,"nz-form-label",21),d(3,"Project Name"),l(),s(4,"nz-form-control",22),x(5,"input",23),l()(),s(6,"nz-form-item")(7,"nz-form-label",21),d(8,"Description"),l(),s(9,"nz-form-control",24),x(10,"textarea",25),l()(),s(11,"nz-form-item")(12,"nz-form-label",21),d(13,"Project Image"),l(),s(14,"nz-form-control",22)(15,"nz-upload",26),h("nzChange",function(t){_(n);let o=a();return f(o.handleChange(t))}),u(16,st,4,1,"ng-container",27)(17,lt,1,1,"img",28),l()()()()}if(e&2){let n=a();p("formGroup",n.addProjectForm),c(15),p("nzShowUploadList",!1)("nzBeforeUpload",n.beforeUpload),c(),p("ngIf",!n.avatarUrl),c(),p("ngIf",n.avatarUrl)}}function pt(e,r){if(e&1&&(s(0,"th",32),d(1),l()),e&2){let n=r.$implicit;p("nzSortFn",n.compare)("nzSortPriority",n.priority),c(),X(" ",n.title," ")}}function mt(e,r){if(e&1&&x(0,"img",38),e&2){let n=a(2).$implicit,i=a();p("src",i.apiUrl+"/images/"+n.filename,Y)}}function dt(e,r){if(e&1){let n=C();s(0,"a",39),h("click",function(){_(n);let t=a(2).$implicit,o=a();return o.startEdit(t.id),f(o.showModal(!1))}),d(1,"Edit"),l()}}function _t(e,r){if(e&1){let n=C();K(0),s(1,"td")(2,"div")(3,"span",35),h("click",function(){_(n);let t=a().$implicit,o=a();return f(o.viewDetails(t))}),l(),u(4,mt,1,1,"img",36),s(5,"span"),d(6),l()()(),s(7,"td"),d(8),l(),s(9,"td"),u(10,dt,2,0,"a",37),l(),Q()}if(e&2){let n=a().$implicit,i=a();c(4),p("ngIf",n.filename),c(2),X(" ",n.name,""),c(2),N(n.description),c(2),p("appHasPermission",i.appPermissions.AddUpdateTask)}}function ft(e,r){if(e&1){let n=C();s(0,"td")(1,"input",40),v("ngModelChange",function(t){_(n);let o=a().$implicit,m=a();return w(m.editCache[o.id].data.name,t)||(m.editCache[o.id].data.name=t),f(t)}),l()(),s(2,"td")(3,"input",40),v("ngModelChange",function(t){_(n);let o=a().$implicit,m=a();return w(m.editCache[o.id].data.description,t)||(m.editCache[o.id].data.description=t),f(t)}),l()(),s(4,"td")(5,"a",41),h("click",function(){_(n);let t=a().$implicit,o=a();return f(o.saveEdit(t.id))}),d(6,"Save"),l(),d(7," \xA0 "),s(8,"a",42),h("nzOnConfirm",function(){_(n);let t=a().$implicit,o=a();return f(o.cancelEdit(t.id))}),d(9,"Cancel"),l()()}if(e&2){let n=a().$implicit,i=a();c(),P("ngModel",i.editCache[n.id].data.name),c(2),P("ngModel",i.editCache[n.id].data.description)}}function ut(e,r){if(e&1&&(s(0,"tr"),u(1,_t,11,4,"ng-container",33)(2,ft,10,2,"ng-template",null,34,E),l()),e&2){let n=r.$implicit,i=b(3),t=a();c(),p("ngIf",!(t.editCache[n.id]!=null&&t.editCache[n.id].edit))("ngIfElse",i)}}var Ue=(()=>{let r=class r{constructor(i,t){this.appService=i,this.fb=t,this.apiUrl=ce.apiUrl,this.isModalVisible=!1,this.drawerVisible=!1,this.selectedProject={},this.appPermissions=j,this.listOfColumn=[{title:"Name",compare:(o,m)=>o.name.localeCompare(m.name),priority:!1},{title:"Description",compare:(o,m)=>o.description.localeCompare(m.description),priority:!1},{title:"Action",compare:(o,m)=>o.role_id-m.role_id,priority:!1}],this.listOfData=[],this.visible=!1,this.listOfDisplayData=[],this.editCache={},this.beforeUpload=(o,m)=>new oe(g=>{let ie=o.type==="image/jpeg"||o.type==="image/png";if(!ie){this.msg.error("You can only upload JPG file!"),g.complete();return}let ne=o.size/1024/1024<2;if(!ne){this.msg.error("Image must smaller than 2MB!"),g.complete();return}this.addProjectForm.patchValue({file:o}),g.next(ie&&ne),g.complete()}),this.addProjectForm=this.fb.group({name:["",[y.required]],id:[0],description:["",[y.required]],file:["",[y.required]]})}showModal(i=!0){this.newItem=i,this.newItem&&(this.addProjectForm.reset(),this.avatarUrl=""),this.isModalVisible=!0}handleOk(){return z(this,null,function*(){this.isModalVisible=!1,this.newItem?yield this.appService.createProject(this.addProjectForm.value,this.addProjectForm.value.file):yield this.appService.updateProject(this.addProjectForm.value,this.addProjectForm.value.file),this.isModalVisible=!1,this.populateProjectData()})}handleCancel(){this.isModalVisible=!1}ngOnInit(){this.currentClientSubscription=this.appService.currentClient.subscribe(i=>{i&&i.id>0&&this.populateProjectData()})}ngOnDestroy(){this.currentClientSubscription&&this.currentClientSubscription.unsubscribe()}open(){this.visible=!0}close(i=!1){this.visible=!1,i&&this.populateProjectData()}populateProjectData(){return z(this,null,function*(){this.listOfData=yield this.appService.getProjects(),this.listOfDisplayData=this.listOfData,this.updateEditCache()})}startEdit(i){this.editableItem=this.editCache[i].data,this.addProjectForm=this.fb.group({name:[this.editableItem.name,[y.required]],description:[this.editableItem.description,[y.required]],file:[null,[y.required]],id:[this.editableItem.id]}),this.avatarUrl="api/images/"+this.editableItem.filename}cancelEdit(i){let t=this.listOfDisplayData.findIndex(o=>o.id===i);this.editCache[i]={data:$({},this.listOfDisplayData[t]),edit:!1}}saveEdit(i){return z(this,null,function*(){let t=this.listOfDisplayData.findIndex(o=>o.id===i);this.editCache[i].edit=!1,Object.assign(this.listOfDisplayData[t],this.editCache[i].data),this.populateProjectData()})}updateEditCache(){this.listOfDisplayData.forEach(i=>{this.editCache[i.id]={edit:!1,data:$({},i)}})}viewDetails(i){this.selectedProject=i,this.drawerVisible=!0}getBase64(i,t){let o=new FileReader;o.addEventListener("load",()=>t(o.result.toString())),o.readAsDataURL(i)}handleChange(i){this.getBase64(i.file.originFileObj,t=>{this.loading=!1,this.avatarUrl=t})}search(){this.searchVisible=!1,this.searchValue?(this.listOfDisplayData=this.listOfData.filter(i=>i.name&&i.name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1),console.log(this.listOfDisplayData)):this.listOfDisplayData=this.listOfData}};r.\u0275fac=function(t){return new(t||r)(D(O),D(Pe))},r.\u0275cmp=S({type:r,selectors:[["app-project"]],decls:12,vars:8,consts:[["class","flex space-between","style","margin-bottom:5px",4,"appHasPermission"],[3,"project","visible","closeDrawer",4,"ngIf"],[3,"nzVisible","nzTitle","nzVisibleChange","nzOnCancel","nzOnOk"],[3,"formGroup",4,"nzModalContent"],["nzShowPagination","false",3,"nzPageSize","nzData"],["editRowTable","","sortTable",""],[3,"nzSortFn","nzSortPriority",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[1,"flex","space-between",2,"margin-bottom","5px"],[2,"display","-webkit-box","width","100%"],[2,"margin-right","5px"],[3,"nzSuffix"],["type","text","placeholder","Search here","nz-input","",3,"ngModel","ngModelChange","keyup"],["inputClearTpl",""],["suffixIconSearch",""],["nz-button","","nzType","primary","nzSize","small",3,"click"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-icon","","nzType","search"],[3,"project","visible","closeDrawer"],[3,"formGroup"],["nzRequired",""],["nzHasFeedback","","nzErrorTip","Please input Project name"],["nz-input","","formControlName","name"],["nzHasFeedback","","nzErrorTip","Please input project description"],["nz-input","","rows","2","formControlName","description"],["nzAction","null","nzName","avatar","nzListType","picture-card",1,"avatar-uploader",3,"nzShowUploadList","nzBeforeUpload","nzChange"],[4,"ngIf"],["style","width: 100%",3,"src",4,"ngIf"],["nz-icon","",1,"upload-icon",3,"nzType"],[1,"ant-upload-text"],[2,"width","100%",3,"src"],[3,"nzSortFn","nzSortPriority"],[4,"ngIf","ngIfElse"],["editTemplate",""],["nz-button","","nz-icon","","nzType","profile","nzTheme","outline",2,"font-size","24px",3,"click"],["class","smallIcon","alt","",3,"src",4,"ngIf"],[3,"click",4,"appHasPermission"],["alt","",1,"smallIcon",3,"src"],[3,"click"],["type","text","nz-input","",3,"ngModel","ngModelChange"],[1,"save",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Sure to cancel?",3,"nzOnConfirm"]],template:function(t,o){if(t&1&&(u(0,rt,12,3,"div",0)(1,at,1,2,"app-project-details",1),s(2,"nz-modal",2),v("nzVisibleChange",function(g){return w(o.isModalVisible,g)||(o.isModalVisible=g),g}),h("nzOnCancel",function(){return o.handleCancel()})("nzOnOk",function(){return o.handleOk()}),u(3,ct,18,5,"nz-form",3),l(),s(4,"nz-table",4,5)(7,"thead")(8,"tr"),u(9,pt,2,3,"th",6),l()(),s(10,"tbody"),u(11,ut,4,2,"tr",7),l()()),t&2){let m=b(6);p("appHasPermission",o.appPermissions.AddUpdateTask),c(),p("ngIf",o.drawerVisible),c(),P("nzVisible",o.isModalVisible),p("nzTitle",o.newItem?"Add Project":"Edit Project"),c(2),p("nzPageSize",1e3)("nzData",o.listOfDisplayData),c(5),p("ngForOf",o.listOfColumn),c(2),p("ngForOf",m.data)}},dependencies:[I,se,k,M,F,de,Te,Se,Ve,Ee,Ne,L,je,ye,he,ue,Ie,R,Oe,B,H,Z,G,q,Me,A,U,ge,ze,xe,W,J,Ae],styles:["[_nghost-%COMP%]     .avatar-uploader>.ant-upload{width:128px;height:128px}"]});let e=r;return e})();var ht=[{path:"",component:Ue,children:[],data:{name:"",permission:j.ViewTasks},canActivate:[Ce]}],We=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=T({type:r}),r.\u0275inj=V({imports:[ee.forChild(ht),ee]});let e=r;return e})();var Le=pe,Ct=Object.keys(Le).map(e=>Le[e]),ii=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=T({type:r}),r.\u0275inj=V({providers:[{provide:fe,useValue:_e},{provide:me,useValue:Ct}],imports:[le,We,Fe,ve,we,ke]});let e=r;return e})();export{ii as ProjectModule};