(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["page-wallet-create"],{"0b6d":function(t,e,n){"use strict";n("c740"),n("a434"),n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0});var r,i=n("9ab4"),a=i.__importDefault(n("2b0e")),s=i.__importStar(n("d2ad")),c=n("e7f3");(function(t){t[t["Empty"]=1]="Empty",t[t["Created"]=2]="Created",t[t["NeedRecovert"]=3]="NeedRecovert",t[t["NeedEncrypt"]=4]="NeedEncrypt",t[t["Stored"]=5]="Stored"})(r||(r={})),e.default=a.default.extend({data:function(){return{mnemonicRaw:"",mnemonic:[],walletState:r.Empty,recover:[],shuffleArray:[],formData:{passwd:""},encrypting:!1}},computed:{isEmpty:function(){return this.walletState===r.Empty},isCreated:function(){return this.walletState===r.Created},isNeedRecovert:function(){return this.walletState===r.NeedRecovert},isNeedEncrypt:function(){return this.walletState===r.NeedEncrypt},isStored:function(){return this.walletState===r.Stored}},methods:{createWallet:function(){var t=s.genMnemonic();this.mnemonicRaw=t,this.mnemonic=t.split(" "),this.walletState=r.Created},shuffle:function(t){for(var e=t.length-1;e>=0;e--){var n=Math.floor(Math.random()*(e+1)),r=t[n];t[n]=t[e],t[e]=r}},writed:function(){this.shuffleArray=Object.assign([],this.mnemonic),this.shuffle(this.shuffleArray),this.walletState=r.NeedRecovert},match:function(){for(var t=!0,e=0;e<this.mnemonic.length;e++)if(this.mnemonic[e]!==this.recover[e]){t=!1;break}t?this.walletState=r.NeedEncrypt:this.$message({message:"助记词不匹配",type:"error"})},chooseWord:function(t){var e=this.shuffleArray.findIndex((function(e){return e===t}));-1!==e&&this.shuffleArray.splice(e,1),this.recover.push(t)},matchBack:function(){var t=this.recover.pop();t&&this.shuffleArray.push(t)},forceMatch:function(){this.recover=Object.assign([],this.mnemonic)},encrypt:function(){if(this.formData.passwd){this.encrypting=!0;var t=new c.Wallet;t.mnemonic=this.mnemonicRaw,this.$db.setWallet(t),this.encrypting=!1,this.$router.push({path:"/wallet"})}else this.$message({message:"请输入密码",type:"error"})}}})},1276:function(t,e,n){"use strict";var r=n("d784"),i=n("44e7"),a=n("825a"),s=n("1d80"),c=n("4840"),l=n("8aa5"),o=n("50c4"),u=n("14c3"),f=n("9263"),d=n("d039"),h=[].push,p=Math.min,m=4294967295,v=!d((function(){return!RegExp(m,"y")}));r("split",2,(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(s(this)),a=void 0===n?m:n>>>0;if(0===a)return[];if(void 0===t)return[r];if(!i(t))return e.call(r,t,a);var c,l,o,u=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,v=new RegExp(t.source,d+"g");while(c=f.call(v,r)){if(l=v.lastIndex,l>p&&(u.push(r.slice(p,c.index)),c.length>1&&c.index<r.length&&h.apply(u,c.slice(1)),o=c[0].length,p=l,u.length>=a))break;v.lastIndex===c.index&&v.lastIndex++}return p===r.length?!o&&v.test("")||u.push(""):u.push(r.slice(p)),u.length>a?u.slice(0,a):u}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=s(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,i,n):r.call(String(i),e,n)},function(t,i){var s=n(r,t,this,i,r!==e);if(s.done)return s.value;var f=a(t),d=String(this),h=c(f,RegExp),w=f.unicode,g=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(v?"y":"g"),y=new h(v?f:"^(?:"+f.source+")",g),b=void 0===i?m:i>>>0;if(0===b)return[];if(0===d.length)return null===u(y,d)?[d]:[];var _=0,C=0,x=[];while(C<d.length){y.lastIndex=v?C:0;var k,E=u(y,v?d:d.slice(C));if(null===E||(k=p(o(y.lastIndex+(v?0:C)),d.length))===_)C=l(d,C,w);else{if(x.push(d.slice(_,C)),x.length===b)return x;for(var S=1;S<=E.length-1;S++)if(x.push(E[S]),x.length===b)return x;C=_=k}}return x.push(d.slice(_)),x}]}),!v)},"227f":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cw"},[t.isEmpty?[n("div",{staticClass:"cw-empty"},[n("strong",{staticClass:"cw-textBtn cw-empty-create",on:{click:t.createWallet}},[t._v("初始化助记词")])])]:t.isCreated?[n("el-row",{staticClass:"cw-row"},t._l(t.mnemonic,(function(e,r){return n("el-col",{key:r,staticClass:"cw-col",attrs:{span:8}},[n("span",{staticClass:"cw-col-item"},[t._v(t._s(e))])])})),1),n("span",{staticClass:"cw-textBtn",on:{click:t.writed}},[t._v("我已抄下助记词!")])]:t.isNeedRecovert?[n("div",{staticClass:"cw-reco"},[n("div",[n("h2",[t._v("请输入助记词进行恢复验证")]),n("el-row",{staticClass:"cw-reco-mnemonic"},t._l(24,(function(e){return n("el-col",{key:e,staticClass:"cw-reco-mnemonic-col",attrs:{span:8}},[n("span",{attrs:{readonly:!0}},[t._v(t._s(t.recover[e-1]))])])})),1)],1),n("div",{staticClass:"cw-reco-op"},[n("el-row",{staticClass:"cw-reco-op-row"},t._l(t.shuffleArray,(function(e,r){return n("span",{key:r,staticClass:"cw-reco-op-word",on:{click:function(n){return t.chooseWord(e)}}},[t._v(t._s(e))])})),0),n("el-row",{staticClass:"cw-reco-op-btns"},[n("el-button",{attrs:{type:"primary"},on:{click:t.match}},[t._v("匹配")]),n("el-button",{attrs:{type:"warning"},on:{click:t.forceMatch}},[t._v("强制匹配")]),n("el-button",{attrs:{type:"danger"},on:{click:t.matchBack}},[t._v("回退")])],1)],1)])]:t.isNeedEncrypt?[n("div",{staticClass:"cw-encrypt"},[n("el-form",{attrs:{inline:!0,model:t.formData}},[n("el-form-item",{attrs:{label:"密码",prop:"passwd"}},[n("el-input",{attrs:{placeholder:"请输入密码"},model:{value:t.formData.passwd,callback:function(e){t.$set(t.formData,"passwd",e)},expression:"formData.passwd"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",loading:t.encrypting},on:{click:t.encrypt}},[t._v("确定")])],1)],1)],1)]:t._e()],2)},i=[];n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}))},"3d17":function(t,e,n){},"44e7":function(t,e,n){var r=n("861d"),i=n("c6b6"),a=n("b622"),s=a("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==i(t))}},a72c:function(t,e,n){"use strict";var r=n("3d17"),i=n.n(r);i.a},d1d2:function(t,e,n){"use strict";n.r(e);var r=n("0b6d"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},de76:function(t,e,n){"use strict";n.r(e);var r=n("227f"),i=n("d1d2");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("a72c");var s=n("2877"),c=Object(s["a"])(i["default"],r["a"],r["b"],!1,null,"5fb41468",null);e["default"]=c.exports}}]);
//# sourceMappingURL=page-wallet-create.20b0bdef.js.map