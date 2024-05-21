import{F as g,O as S,da as m,s as u,t as y,y as h,z as f}from"./chunk-R4PMELZD.js";import{a as r,b as l}from"./chunk-MON7YFGF.js";var w=(()=>{class i{_printStyle=[];_styleSheetFile="";setPrintStyle(e){this._printStyle=[];for(let t in e)e.hasOwnProperty(t)&&this._printStyle.push((t+JSON.stringify(e[t])).replace(/['"]+/g,""))}returnStyleValues(){return`<style> ${this._printStyle.join(" ").replace(/,/g,";")} </style>`}returnStyleSheetLinkTags(){return this._styleSheetFile}setStyleSheetFile(e){let t=function(n){return`<link rel="stylesheet" type="text/css" href="${n}">`};if(e.indexOf(",")!==-1){let n=e.split(",");this._styleSheetFile=n.map(s=>t(s)).join("")}else this._styleSheetFile=t(e)}updateInputDefaults(e){for(let t=0;t<e.length;t++){let n=e[t];n.defaultValue=n.value,n.checked&&(n.defaultChecked=!0)}}updateSelectDefaults(e){for(let t=0;t<e.length;t++){let n=e[t],s=n.selectedIndex,o=n.options[s];o.defaultSelected=!0}}updateTextAreaDefaults(e){for(let t=0;t<e.length;t++){let n=e[t];n.defaultValue=n.value}}canvasToImageHtml(e){return`<img src="${e.toDataURL()}" style="max-width: 100%;">`}updateCanvasToImage(e){for(let t=0;t<e.length;t++){let n=this.canvasToImageHtml(e[t]);e[t].insertAdjacentHTML("afterend",n),e[t].remove()}}getHtmlContents(e){let t=document.getElementById(e);if(!t)return null;let n=t.getElementsByTagName("input"),s=t.getElementsByTagName("select"),o=t.getElementsByTagName("textarea"),a=t.getElementsByTagName("canvas");return this.updateInputDefaults(n),this.updateSelectDefaults(s),this.updateTextAreaDefaults(o),this.updateCanvasToImage(a),t.innerHTML}getElementTag(e){let t=[],n=document.getElementsByTagName(e);for(let s=0;s<n.length;s++)t.push(n[s].outerHTML);return t.join(`\r
`)}print(e){let t="",n="",s="top=0,left=0,height=auto,width=auto",o=this.getElementTag("base");e.useExistingCss&&(t=this.getElementTag("style"),n=this.getElementTag("link")),e.openNewTab&&(s="");let a=this.getHtmlContents(e.printSectionId);if(!a){console.error(`Print section with id ${e.printSectionId} not found.`);return}let c=window.open("","_blank",s);if(!c){console.error("Could not open print window.");return}c.document.open(),c.document.write(`
          <html>
            <head>
              <title>${e.printTitle?e.printTitle:""}</title>
              ${o}
              ${this.returnStyleValues()}
              ${this.returnStyleSheetLinkTags()}
              ${t}
              ${n}
            </head>
            <body ${e.bodyClass?`class="${e.bodyClass}"`:""}>
              ${a}
              <script defer>
                function triggerPrint(event) {
                  window.removeEventListener('load', triggerPrint, false);
                  ${e.previewOnly?"":`setTimeout(function() {
                    closeWindow(window.print());
                  }, ${e.printDelay});`}
                }
                function closeWindow(){
                  ${e.closeWindow?"window.close();":""}
                }
                window.addEventListener('load', triggerPrint, false);
              <\/script>
            </body>
          </html>`),c.document.close()}static \u0275fac=function(t){return new(t||i)};static \u0275prov=h({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var p=class{printSectionId=null;printTitle=null;useExistingCss=!1;bodyClass="";openNewTab=!1;previewOnly=!1;closeWindow=!0;printDelay=0;constructor(d){d&&Object.assign(this,d)}},T=(()=>{class i extends w{printOptions=new p;set previewOnly(e){this.printOptions=l(r({},this.printOptions),{previewOnly:e})}set printSectionId(e){this.printOptions=l(r({},this.printOptions),{printSectionId:e})}set printTitle(e){this.printOptions=l(r({},this.printOptions),{printTitle:e})}set useExistingCss(e){this.printOptions=l(r({},this.printOptions),{useExistingCss:e})}set printDelay(e){this.printOptions=l(r({},this.printOptions),{printDelay:e})}set closeWindow(e){this.printOptions=l(r({},this.printOptions),{closeWindow:e})}set bodyClass(e){this.printOptions=l(r({},this.printOptions),{bodyClass:e})}set openNewTab(e){this.printOptions=l(r({},this.printOptions),{openNewTab:e})}set printStyle(e){super.setPrintStyle(e)}set styleSheetFile(e){super.setStyleSheetFile(e)}print(){super.print(this.printOptions)}static \u0275fac=(()=>{let e;return function(n){return(e||(e=g(i)))(n||i)}})();static \u0275dir=y({type:i,selectors:[["button","ngxPrint",""]],hostBindings:function(t,n){t&1&&m("click",function(){return n.print()})},inputs:{previewOnly:"previewOnly",printSectionId:"printSectionId",printTitle:"printTitle",useExistingCss:"useExistingCss",printDelay:"printDelay",closeWindow:"closeWindow",bodyClass:"bodyClass",openNewTab:"openNewTab",printStyle:"printStyle",styleSheetFile:"styleSheetFile"},standalone:!0,features:[S]})}return i})(),D=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=u({type:i});static \u0275inj=f({})}return i})();export{T as a,D as b};
