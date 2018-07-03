define(["exports","babel-runtime/regenerator","jquery","../windows/windows","../common/rivetsExtra","lodash","text!./index.html","websockets/binary_websockets","../instruments/instruments","css!./index.css","../common/util"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(a){return a&&a.__esModule?a:{"default":a}}function k(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var l=j(b),m=j(c),n=j(d),o=j(e),p=j(f),q=j(g),r=j(h),s=[{code:"CALL",name:"Rise/Higher"},{code:"PUT",name:"Fall/Lower"},{code:"ONETOUCH",name:"Touch"},{code:"NOTOUCH",name:"NoTouch"},{code:"EXPIRYMISS",name:"Ends Out"},{code:"EXPIRYRANGE",name:"Ends In"},{code:"DIGITDIFF",name:"Digits Differ"},{code:"DIGITMATCH",name:"Digits Match"},{code:"DIGITOVER",name:"Digits Over"},{code:"DIGITUNDER",name:"Digits Under"},{code:"DIGITODD",name:"Digits Odd"},{code:"DIGITEVEN",name:"Digits Even"},{code:"ASIANU",name:"Asians Up"},{code:"ASIAND",name:"Asians Down"}],t="copyTrade",u=s.slice(0,2).map(function(a){return a.code}),v=function(a){return{copy_start:a,min_trade_stake:10,max_trade_stake:100,assets:p["default"].cloneDeep(A),trade_types:p["default"].cloneDeep(u)}},w=function(a){return{open:!1,started:!1,disableRemove:!1,disableStart:!1,yourCopySettings:v(a)}},x=function(a){var b=!1,c="";return a?a.assets&&a.assets.length>0?a.trade_types&&a.trade_types.length>0?a.min_trade_stake>=1&&a.min_trade_stake<=5e4?a.max_trade_stake>=1&&a.max_trade_stake<=5e4?a.min_trade_stake<a.max_trade_stake?b=!0:c="Min Trade Stake cannot be more than or equal to Max Trader stake":c="Max Trade Stake should between 1 and 50000":c="Min Trade Stake should between 1 and 50000":c="Trade types required":c="Assets required":c="Enter valid values for copy settings",c&&m["default"].growl.error({message:c}),b},y=function(a){var b=p["default"].cloneDeep(a);delete b.searchToken.disable,b.traderTokens.forEach(function(a){delete a.open,delete a.started,delete a.disableRemove,delete a.disableStart}),local_storage.set(t,b)},z=null,A=null;i.init().then(function(a){z=p["default"].flatten(a.map(function(a){var b=a.display_name;return a.submarkets.map(function(a){return{displayName:b+" - "+a.display_name,instruments:a.instruments}})}));var b=[];a.forEach(function(a){a.submarkets.forEach(function(a){a.instruments.forEach(function(a){var c=a.symbol,d=a.display_name;b.push({code:c,name:d})})})}),D.masterAssetList=b,D.groupedAssets=z,A=b.slice(0,2).map(function(a){return a.code})});var B=null,C=null,D={masterAssetList:[],masterTradeTypeList:p["default"].cloneDeep(s),groupedAssets:[],allowCopy:{allow_copiers:!1,onAllowCopyChange:p["default"].debounce(function(a,b){r["default"].send({set_settings:1,allow_copiers:+b.allowCopy.allow_copiers})["catch"](function(a){m["default"].growl.error({message:a.message}),b.allowCopy.allow_copiers=!b.allowCopy.allow_copiers})},250)},onOpenChange:function(a){D.traderTokens[a].open=!D.traderTokens[a].open},onStartedChange:function(a){D.traderTokens[a].disableStart=!0;var b=!D.traderTokens[a].started;if(b){var c=local_storage.get(t);if(c){var d=c.traderTokens[a];if(d){var e={};p["default"].merge(e,D.traderTokens[a],d),D.traderTokens.splice(a,1),p["default"].defer(function(){D.traderTokens.splice(a,0,e),r["default"].send(e.yourCopySettings).then(function(){e.disableStart=!1,e.started=!0})["catch"](function(a){m["default"].growl.error({message:a.message}),e.disableStart=!1})})}}}else r["default"].send({copy_stop:D.traderTokens[a].yourCopySettings.copy_start}).then(function(){D.traderTokens[a].disableStart=!1,D.traderTokens[a].started=!1})["catch"](function(b){m["default"].growl.error({message:b.message}),D.traderTokens[a].disableStart=!1})},onRemove:function(a){var b=D.traderTokens[a];b.disableRemove=!0,r["default"].send({copy_stop:b.yourCopySettings.copy_start}).then(function(){D.traderTokens.splice(a,1),y(D)})["catch"](function(a){m["default"].growl.error({message:a.message}),b.disableRemove=!1})},onMinTradeChange:function(a,b){var c=m["default"](a.target).data("index"),d=a.target.value;b.traderTokens[c].yourCopySettings.min_trade_stake=d},onMaxTradeChange:function(a,b){var c=m["default"](a.target).data("index"),d=a.target.value;b.traderTokens[c].yourCopySettings.max_trade_stake=d},onUpdateYourSettings:function(a){x(D.traderTokens[a].yourCopySettings)&&(y(D),m["default"].growl.notice({message:"Updated successfully"}))},searchToken:{token:"",onTokenChange:function(a,b){return b.searchToken.token=a.target.value},disable:!1,onKeyDown:function(a,b){13===a.keyCode&&b.searchToken.addToken(a,b)},addToken:function(a,b){!b.searchToken.token.match(/^[A-Za-z]+\d+$/),b.searchToken.disable=!0,r["default"].send({copytrading_statistics:1,trader_id:b.searchToken.token}).then(function(c){if(c.copytrading_statistics){var d=p["default"].find(b.traderTokens,function(a){return a.yourCopySettings&&a.yourCopySettings.copy_start===b.searchToken.token});d?p["default"].merge(d.traderStatistics,c.copytrading_statistics):b.traderTokens.push(p["default"].merge({traderStatistics:c.copytrading_statistics},w(b.searchToken.token)))}b.searchToken.token="",b.searchToken.disable=!1,y(b),p["default"].defer(function(){return m["default"](a.target).focus()})})["catch"](function(a){m["default"].growl.error({message:a.message}),b.searchToken.disable=!1})}},traderTokens:[]},E=function(){var a=m["default"](q["default"]).i18n();C=o["default"].bind(a[0],D),B=n["default"].createBlankWindow(a,{title:"Copy Trade".i18n(),resizable:!0,collapsable:!0,minimizable:!0,maximizable:!0,modal:!1,width:600,open:function(){var a=local_storage.get(t);a&&(p["default"].merge(D,a),D.traderTokens=p["default"].cloneDeep(D.traderTokens)),r["default"].send({get_settings:1}).then(function(a){var b=a.get_settings,c=void 0===b?{}:b;return D.allowCopy.allow_copiers=1===c.allow_copiers});var b=function(){var b=k(l["default"].mark(function c(){var b,d,e,f,g,h,i=this;return l["default"].wrap(function(c){for(;;)switch(c.prev=c.next){case 0:b=!0,d=!1,e=void 0,c.prev=3,f=l["default"].mark(function j(){var a,b,c;return l["default"].wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return a=h.value,d.prev=1,d.next=4,r["default"].send({copytrading_statistics:1,trader_id:a});case 4:b=d.sent,b.copytrading_statistics&&(c=p["default"].find(D.traderTokens,function(b){return b.yourCopySettings&&b.yourCopySettings.copy_start===a}),c&&p["default"].merge(c.traderStatistics,b.copytrading_statistics)),d.next=10;break;case 8:d.prev=8,d.t0=d["catch"](1);case 10:case"end":return d.stop()}},j,i,[[1,8]])}),g=a.traderTokens[Symbol.iterator]();case 6:if(b=(h=g.next()).done){c.next=11;break}return c.delegateYield(f(),"t0",8);case 8:b=!0,c.next=6;break;case 11:c.next=17;break;case 13:c.prev=13,c.t1=c["catch"](3),d=!0,e=c.t1;case 17:c.prev=17,c.prev=18,!b&&g["return"]&&g["return"]();case 20:if(c.prev=20,!d){c.next=23;break}throw e;case 23:return c.finish(20);case 24:return c.finish(17);case 25:case"end":return c.stop()}},c,this,[[3,13,17,25],[18,,20,24]])}));return function(){return b.apply(this,arguments)}}();a&&b()},close:function(){C&&C.unbind(),B&&B.dialog("destroy").remove(),C=B=null},"data-authorized":"true"}),B.track({module_id:"copyTrade",is_unique:!0,data:null}),B.dialog("open")},F=a.init=function(a){a.click(function(){B?B.moveToTop():E()})};a["default"]={init:F}});