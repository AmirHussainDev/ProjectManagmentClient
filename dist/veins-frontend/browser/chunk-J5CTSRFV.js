import{a as O}from"./chunk-PYMJPE53.js";import{B as l,C as a,E as d,Ha as g,K as c,Ka as v,M as m,Ua as I,Za as y,_a as C,q as o,r as u,s as h,x as p,y as s,z as f}from"./chunk-R4PMELZD.js";var F=(()=>{let t=class t{constructor(i,e){this.el=i,this._zone=e,this.updateChange=new o(!0),this.chartInstance=new o}ngOnChanges(i){let e=i.update&&i.update.currentValue;(i.options||e)&&(this.wrappedUpdateOrCreateChart(),e&&this.updateChange.emit(!1))}wrappedUpdateOrCreateChart(){this.runOutsideAngular?this._zone.runOutsideAngular(()=>{this.updateOrCreateChart()}):this.updateOrCreateChart()}updateOrCreateChart(){this.chart&&this.chart.update?this.chart.update(this.options,!0,this.oneToOne||!1):(this.chart=this.Highcharts[this.constructorType||"chart"](this.el.nativeElement,this.options,this.callbackFunction||null),this.chartInstance.emit(this.chart))}ngOnDestroy(){this.chart&&(this.chart.destroy(),this.chart=null,this.chartInstance.emit(this.chart))}};t.\u0275fac=function(e){return new(e||t)(c(p),c(m))},t.\u0275cmp=u({type:t,selectors:[["highcharts-chart"]],inputs:{Highcharts:"Highcharts",constructorType:"constructorType",callbackFunction:"callbackFunction",oneToOne:"oneToOne",runOutsideAngular:"runOutsideAngular",options:"options",update:"update"},outputs:{updateChange:"updateChange",chartInstance:"chartInstance"},features:[d],decls:0,vars:0,template:function(e,n){},encapsulation:2});let r=t;return r})(),A=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=h({type:t}),t.\u0275inj=f({});let r=t;return r})();var S=(()=>{let t=class t{constructor(i,e,n){this.http=i,this.platformId=e,this.appService=n}isLoggedIn(){if(g(this.platformId)){let i=localStorage.getItem("token");if(i){let e=this.getTokenExpirationDate(i);return e===void 0||e<=new Date?(this.logout(),!1):(this.setUserSubOrganization(),!0)}}return!1}getTokenExpirationDate(i){try{let e=JSON.parse(atob(i.split(".")[1]));return e&&e.exp?new Date(e.exp*1e3):void 0}catch{return}}logout(){localStorage.removeItem("token")}setUserSubOrganization(){this.appService.getAndSetUserDefaultSubOrganization()}};t.\u0275fac=function(e){return new(e||t)(a(v),a(l),a(C))},t.\u0275prov=s({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();var q=(()=>{let t=class t{constructor(i,e,n){this.authService=i,this.userService=e,this.router=n}canActivate(i,e){if(this.authService.isLoggedIn()){if(this.userService.loggedInUser.is_admin)return!0;let n=i.data.permission;return n&&!this.userService.hasPermission(n)?(n==O.MainDashboardView?this.router.navigate(["/employee"]):this.router.navigate(["/"]),!1):!0}else return this.router.navigate(["/login"]),!1}};t.\u0275fac=function(e){return new(e||t)(a(S),a(y),a(I))},t.\u0275prov=s({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();export{q as a,F as b,A as c};
