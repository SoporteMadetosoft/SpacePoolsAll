(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[8],{1079:function(e,a,t){"use strict";t.r(a);var s=t(1),c=t(17),n=t(0),i=t(65),r=t.n(i),l=t(509),o=t(537),d=t(584),u=t(129),m=t(523),b=t(139),j=t(538),f=t(132),g=t(477),p=t(473),h=t(556),x=t(521),O=t(683),v=t(1056),N=t(1057),y=t(1052),w=t(1066),k=t(1062),B=t(704),C=t(1058),M=t(1059),T=t(1094),P=t(471),R=(t(527),t(937)),q=t.n(R),L=t(511),E=t.n(L),F=t(6),S=function(e){var a=e.name,t=e.role;return Object(F.jsxs)(n.Fragment,{children:[Object(F.jsx)("div",{className:"toastify-header",children:Object(F.jsxs)("div",{className:"title-wrapper",children:[Object(F.jsx)(l.a,{size:"sm",color:"success",icon:Object(F.jsx)(O.a,{size:12})}),Object(F.jsxs)("h6",{className:"toast-title font-weight-bold",children:["Bienvenido/a, ",a]})]})}),Object(F.jsx)("div",{className:"toastify-body",children:Object(F.jsxs)("span",{children:["Has iniciado sesi\xf3n correctamente como ",t,"."]})})]})};a.default=function(e){var a=Object(o.a)(),i=Object(c.a)(a,2),l=(i[0],i[1],Object(n.useContext)(f.a)),O=Object(u.b)(),R=Object(g.g)(),L=Object(n.useState)(""),A=Object(c.a)(L,2),D=A[0],U=A[1],_=Object(n.useState)(""),z=Object(c.a)(_,2),I=z[0],J=z[1],H=Object(m.a)(),V=H.register,G=H.errors,K=H.handleSubmit,Q=t(931)("./".concat("background1.png")).default,W=t(936).default;return Object(F.jsx)("div",{className:"auth-wrapper auth-v2",children:Object(F.jsxs)(v.a,{className:"auth-inner m-0",children:[Object(F.jsx)(N.a,{className:"d-none d-lg-flex align-items-center",lg:"8",sm:"12",style:{padding:"0px",margin:"0px"},children:Object(F.jsx)("div",{className:"w-100 h-100 d-lg-flex align-items-center justify-content-center",children:Object(F.jsx)("img",{className:"img-fluid",src:Q,alt:"Login V2",style:{width:"200%"}})})}),Object(F.jsx)(N.a,{className:"d-flex align-items-center auth-bg px-2 p-lg-5",lg:"4",sm:"12",style:{padding:"0px",margin:"0px"},children:Object(F.jsxs)(N.a,{className:"px-xl-2 mx-auto",sm:"8",md:"6",lg:"12",children:[Object(F.jsx)("div",{className:"d-flex d-lg-flex align-items-center justify-content-center mb-2",children:Object(F.jsx)(q.a,{src:W,style:{width:"200px"}})}),Object(F.jsx)(y.a,{tag:"h2",className:"font-weight-bold mb-1 d-flex d-lg-flex align-items-center justify-content-center mb-1",children:"Bienvenido a Beta SFP"}),Object(F.jsx)(w.a,{className:"mb-1 d-flex d-lg-flex align-items-center justify-content-center",children:"Por favor, introduce tus datos de acceso"}),Object(F.jsxs)(k.a,{className:"auth-login-form mt-2",onSubmit:K((function(e){Object(x.c)(G)&&d.a.login({email:D,password:I}).then((function(e){if(!1===e.data.ok)E.a.fire({title:"\xa1Error!",text:e.data.data,icon:"error",timer:3e3,timerProgressBar:!0,customClass:{confirmButton:"btn btn-success"}});else{var a=Object(s.a)(Object(s.a)({},e.data.data.userData),{},{accessToken:e.data.data.accessToken});O(Object(j.a)(a)),l.update(e.data.data.userData.ability),R.push(Object(x.a)(a.role)),b.c.success(Object(F.jsx)(S,{name:a.fullName||a.username||"No usename",role:a.role||"Admin"}),{transition:b.a,hideProgressBar:!0,autoClose:2e3})}})).catch((function(e){return console.log(e)}))})),children:[Object(F.jsxs)(B.a,{children:[Object(F.jsx)(C.a,{className:"form-label",for:"login-email",children:"Login"}),Object(F.jsx)(M.a,{autoFocus:!0,value:D,id:"login-email",name:"login-email",placeholder:"Login",onChange:function(e){return U(e.target.value)},className:r()({"is-invalid":G["login-email"]}),innerRef:V({required:!0,validate:function(e){return""!==e}})})]}),Object(F.jsxs)(B.a,{children:[Object(F.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(F.jsx)(C.a,{className:"form-label",for:"login-password",children:"Contrase\xf1a"}),Object(F.jsx)(p.b,{to:"/forgot-password",children:Object(F.jsx)("small",{children:"\xbfOlvidaste la contrase\xf1a?"})})]}),Object(F.jsx)(h.a,{value:I,id:"login-password",name:"login-password",className:"input-group-merge mb-2",htmlFor:"merge-password",onChange:function(e){return J(e.target.value)},innerRef:V({required:!0,validate:function(e){return""!==e}})})]}),Object(F.jsx)(B.a,{children:Object(F.jsx)(T.a,{type:"checkbox",className:"custom-control-Primary",id:"remember-me",label:"Recu\xe9rdame"})}),Object(F.jsx)(P.a.Ripple,{type:"submit",color:"primary",block:!0,children:"Acceder"})]})]})})]})})}},527:function(e,a,t){},704:function(e,a,t){"use strict";var s=t(16),c=t(22),n=t(0),i=t.n(n),r=t(5),l=t.n(r),o=t(65),d=t.n(o),u=t(88),m={children:l.a.node,row:l.a.bool,check:l.a.bool,inline:l.a.bool,disabled:l.a.bool,tag:u.l,className:l.a.string,cssModule:l.a.object},b=function(e){var a=e.className,t=e.cssModule,n=e.row,r=e.disabled,l=e.check,o=e.inline,m=e.tag,b=Object(c.a)(e,["className","cssModule","row","disabled","check","inline","tag"]),j=Object(u.i)(d()(a,!!n&&"row",l?"form-check":"form-group",!(!l||!o)&&"form-check-inline",!(!l||!r)&&"disabled"),t);return"fieldset"===m&&(b.disabled=r),i.a.createElement(m,Object(s.a)({},b,{className:j}))};b.propTypes=m,b.defaultProps={tag:"div"},a.a=b},931:function(e,a,t){var s={"./BURRITO BLANCO etiquetas que pedimos.xls":932,"./background1.png":933,"./background2.png":934,"./chat-bg.svg":935};function c(e){var a=n(e);return t(a)}function n(e){if(!t.o(s,e)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return s[e]}c.keys=function(){return Object.keys(s)},c.resolve=n,e.exports=c,c.id=931},932:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/BURRITO BLANCO etiquetas que pedimos.f531196f.xls"},933:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/background1.fc45e1cb.png"},934:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/background2.37fb7254.png"},935:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/chat-bg.07c8c4c5.svg"},936:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/favicon.36b55845.png"},937:function(e,a,t){"use strict";var s=t(492);a.__esModule=!0,a.default=void 0;var c=s(t(489)),n=s(t(495)),i=s(t(0)),r=s(t(5)),l=s(t(65)),o=t(496),d={tag:o.tagPropType,top:r.default.bool,bottom:r.default.bool,className:r.default.string,cssModule:r.default.object},u=function(e){var a=e.className,t=e.cssModule,s=e.top,r=e.bottom,d=e.tag,u=(0,n.default)(e,["className","cssModule","top","bottom","tag"]),m="card-img";s&&(m="card-img-top"),r&&(m="card-img-bottom");var b=(0,o.mapToCssModules)((0,l.default)(a,m),t);return i.default.createElement(d,(0,c.default)({},u,{className:b}))};u.propTypes=d,u.defaultProps={tag:"img"};var m=u;a.default=m}}]);
//# sourceMappingURL=8.7ae9f32b.chunk.js.map