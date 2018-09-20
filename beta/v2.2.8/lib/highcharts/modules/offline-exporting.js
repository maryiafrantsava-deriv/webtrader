!function(a){"object"==typeof module&&module.exports?module.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):a(Highcharts)}(function(a){!function(a){function b(b,c){var d=g.getElementsByTagName("head")[0],e=g.createElement("script");e.type="text/javascript",e.src=b,e.onload=c,e.onerror=function(){a.error("Error loading script "+b)},d.appendChild(e)}var c=a.addEvent,d=a.merge,e=a.win,f=e.navigator,g=e.document,h=a.each,i=e.URL||e.webkitURL||e,j=/Edge\/|Trident\/|MSIE /.test(f.userAgent),k=/Edge\/\d+/.test(f.userAgent),l=j?150:0;a.CanVGRenderer={},a.dataURLtoBlob=function(a){if(e.atob&&e.ArrayBuffer&&e.Uint8Array&&e.Blob&&i.createObjectURL){a=a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+\/]+)/);for(var b=e.atob(a[3]),c=new e.ArrayBuffer(b.length),c=new e.Uint8Array(c),d=0;d<c.length;++d)c[d]=b.charCodeAt(d);return a=new e.Blob([c],{type:a[1]}),i.createObjectURL(a)}},a.downloadURL=function(b,c){var d,h=g.createElement("a");if("string"==typeof b||b instanceof String||!f.msSaveOrOpenBlob){if((k||2e6<b.length)&&(b=a.dataURLtoBlob(b),!b))throw"Data URL length limit reached";if(void 0!==h.download)h.href=b,h.download=c,g.body.appendChild(h),h.click(),g.body.removeChild(h);else try{if(d=e.open(b,"chart"),void 0===d||null===d)throw"Failed to open window"}catch(i){e.location.href=b}}else f.msSaveOrOpenBlob(b,c)},a.svgToDataUrl=function(a){var b=-1<f.userAgent.indexOf("WebKit")&&0>f.userAgent.indexOf("Chrome");try{if(!b&&0>f.userAgent.toLowerCase().indexOf("firefox"))return i.createObjectURL(new e.Blob([a],{type:"image/svg+xml;charset-utf-16"}))}catch(c){}return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(a)},a.imageToDataUrl=function(a,b,c,d,f,h,i,j,k){var m,n=new e.Image,o=function(){setTimeout(function(){var e,h=g.createElement("canvas"),j=h.getContext&&h.getContext("2d");try{if(j){h.height=n.height*d,h.width=n.width*d,j.drawImage(n,0,0,h.width,h.height);try{e=h.toDataURL(b),f(e,b,c,d)}catch(l){m(a,b,c,d)}}else i(a,b,c,d)}finally{k&&k(a,b,c,d)}},l)},p=function(){j(a,b,c,d),k&&k(a,b,c,d)};m=function(){n=new e.Image,m=h,n.crossOrigin="Anonymous",n.onload=o,n.onerror=p,n.src=a},n.onload=o,n.onerror=p,n.src=a},a.downloadSVGLocal=function(c,d,j,k){function l(a,b){return b=new e.jsPDF("l","pt",[a.width.baseVal.value+2*b,a.height.baseVal.value+2*b]),h(a.querySelectorAll('*[visibility="hidden"]'),function(a){a.parentNode.removeChild(a)}),e.svg2pdf(a,b,{removeInvalid:!0}),b.output("datauristring")}function m(){s.innerHTML=c;var b,d=s.getElementsByTagName("text");h(d,function(a){h(["font-family","font-size"],function(b){for(var c=a;c&&c!==s;){if(c.style[b]){a.style[b]=c.style[b];break}c=c.parentNode}}),a.style["font-family"]=a.style["font-family"]&&a.style["font-family"].split(" ").splice(-1),b=a.getElementsByTagName("title"),h(b,function(b){a.removeChild(b)})}),d=l(s.firstChild,0);try{a.downloadURL(d,u),k&&k()}catch(e){j(e)}}var n,o,p,q=!0,r=d.libURL||a.getOptions().exporting.libURL,s=g.createElement("div"),t=d.type||"image/png",u=(d.filename||"chart")+"."+("image/svg+xml"===t?"svg":t.split("/")[1]),v=d.scale||1,r="/"!==r.slice(-1)?r+"/":r;if("image/svg+xml"===t)try{f.msSaveOrOpenBlob?(o=new MSBlobBuilder,o.append(c),n=o.getBlob("image/svg+xml")):n=a.svgToDataUrl(c),a.downloadURL(n,u),k&&k()}catch(w){j(w)}else"application/pdf"===t?e.jsPDF&&e.svg2pdf?m():(q=!0,b(r+"jspdf.js",function(){b(r+"svg2pdf.js",function(){m()})})):(n=a.svgToDataUrl(c),p=function(){try{i.revokeObjectURL(n)}catch(a){}},a.imageToDataUrl(n,t,{},v,function(b){try{a.downloadURL(b,u),k&&k()}catch(c){j(c)}},function(){var d=g.createElement("canvas"),h=d.getContext("2d"),i=c.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*v,l=c.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*v,m=function(){h.drawSvg(c,0,0,i,l);try{a.downloadURL(f.msSaveOrOpenBlob?d.msToBlob():d.toDataURL(t),u),k&&k()}catch(b){j(b)}finally{p()}};d.width=i,d.height=l,e.canvg?m():(q=!0,b(r+"rgbcolor.js",function(){b(r+"canvg.js",function(){m()})}))},j,j,function(){q&&p()}))},a.Chart.prototype.getSVGForLocalExport=function(b,d,e,f){var g,h,i,j,k,l,m=this,n=0,o=function(a,b,c){++n,c.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",a),n===g.length&&f(m.sanitizeSVG(h.innerHTML,i))};m.unbindGetSVG=c(m,"getSVG",function(a){i=a.chartCopy.options,h=a.chartCopy.container.cloneNode(!0)}),m.getSVGForExport(b,d),g=h.getElementsByTagName("image");try{if(!g.length)return void f(m.sanitizeSVG(h.innerHTML,i));for(k=0,l=g.length;l>k;++k)j=g[k],a.imageToDataUrl(j.getAttributeNS("http://www.w3.org/1999/xlink","href"),"image/png",{imageElement:j},b.scale,o,e,e,e)}catch(p){e(p)}m.unbindGetSVG()},a.Chart.prototype.exportChartLocal=function(b,c){var d=this,e=a.merge(d.options.exporting,b),f=function(b){!1===e.fallbackToExportServer?e.error?e.error(e,b):a.error(28,!0):d.exportChart(e)};j&&("application/pdf"===e.type||d.container.getElementsByTagName("image").length&&"image/svg+xml"!==e.type)||"application/pdf"===e.type&&d.container.getElementsByTagName("image").length?f("Image type not supported for this chart/browser."):d.getSVGForLocalExport(e,c,f,function(b){-1<b.indexOf("<foreignObject")&&"image/svg+xml"!==e.type?f("Image type not supported for charts with embedded HTML"):a.downloadSVGLocal(b,e,f)})},d(!0,a.getOptions().exporting,{libURL:"https://code.highcharts.com/6.1.3/lib/",menuItemDefinitions:{downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChartLocal()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChartLocal({type:"image/jpeg"})}},downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChartLocal({type:"image/svg+xml"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"})}}}})}(a)});