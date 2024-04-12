import{a as Y}from"./chunk-NGE6N3H6.js";import{B as N,Ba as f,Db as q,Ea as y,Eb as W,Fa as I,Fb as U,Ga as S,Gb as K,Hb as Q,J as p,K as s,La as F,Na as _,O as l,Pa as x,Qa as P,Sa as w,T as n,Ta as d,U as a,Ua as D,V as c,Va as M,Z as C,Za as O,_a as k,bb as j,da as u,db as E,eb as T,fb as R,gb as V,hb as A,nb as G,ob as B,pb as J,qc as X,s as v,t as z,tb as L,ua as b,ub as H,z as h,zb as Z}from"./chunk-PKM5J5B2.js";import{g}from"./chunk-MON7YFGF.js";var $=(()=>{let t=class t{constructor(i,o,m,r){this.fb=i,this.http=o,this.platformId=m,this.router=r,this.organization_id=0,this.validateForm=this.fb.group({username:["",[d.required]],password:["",[d.required]],remember:[!0]}),f(this.platformId)&&(this.organization_id=parseInt(localStorage.getItem("organization_id")||""))}submitForm(){return g(this,null,function*(){if(this.validateForm.valid){console.log("submit",this.validateForm.value);let i=20,o=this.validateForm.value.password||"",m=this.validateForm.value.username||"";this.http.post("/api/auth/login",{organization_id:this.organization_id,username:m,password:o}).toPromise().then(r=>{f(this.platformId)&&r.access_token&&(localStorage.setItem("token",JSON.stringify(r.access_token)),localStorage.setItem("user",JSON.stringify(r.user)),localStorage.setItem("sub_organization_id",JSON.stringify(r.user.sub_organization_id)),this.router.navigate(["/"]))})}else Object.values(this.validateForm.controls).forEach(i=>{i.invalid&&(i.markAsDirty(),i.updateValueAndValidity({onlySelf:!0}))})})}};t.\u0275fac=function(o){return new(o||t)(s(E),s(y),s(N),s(F))},t.\u0275cmp=v({type:t,selectors:[["app-login"]],decls:19,vars:3,consts:[[1,"app-login"],[1,"text-center","p4"],["nz-form","",1,"login-form",3,"formGroup","ngSubmit"],["nzErrorTip","Please input your username!"],["nzPrefixIcon","user"],["type","text","nz-input","","formControlName","username","placeholder","username"],["nzErrorTip","Please input your Password!"],["nzPrefixIcon","lock"],["type","password","nz-input","","formControlName","password","placeholder","Password"],["nz-row","",1,"login-form-margin"],["nz-col","",3,"nzSpan"],["nz-checkbox","","formControlName","remember"],["nz-button","",1,"login-form-button","login-form-margin",3,"nzType"]],template:function(o,m){o&1&&(n(0,"div",0)(1,"h2",1),u(2," Welcome Back!"),a(),n(3,"form",2),C("ngSubmit",function(){return m.submitForm()}),n(4,"nz-form-item")(5,"nz-form-control",3)(6,"nz-input-group",4),c(7,"input",5),a()()(),n(8,"nz-form-item")(9,"nz-form-control",6)(10,"nz-input-group",7),c(11,"input",8),a()()(),n(12,"div",9)(13,"div",10)(14,"label",11)(15,"span"),u(16,"Remember me"),a()()()(),n(17,"button",12),u(18,"Log in"),a()()()),o&2&&(p(3),l("formGroup",m.validateForm),p(10),l("nzSpan",12),p(4),l("nzType","primary"))},dependencies:[O,w,D,M,k,j,J,G,B,Z,W,q,K,U,Q,V,A],styles:[".login-form[_ngcontent-%COMP%]{max-width:300px}.login-form-margin[_ngcontent-%COMP%]{margin-bottom:16px}.login-form-forgot[_ngcontent-%COMP%]{float:right}.login-form-button[_ngcontent-%COMP%]{width:100%}.app-login[_ngcontent-%COMP%]{background:#fff;padding:32px;margin:50px;border-radius:12px}"]});let e=t;return e})();var tt=[{path:"",component:$}];b(Y);var ot=x,it=Object.keys(ot).map(e=>ot[e]),jt=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=z({type:t}),t.\u0275inj=h({providers:[_(tt),{provide:H,useValue:L},{provide:P,useValue:it}],imports:[T,I,S,R,X]});let e=t;return e})();export{jt as a};
