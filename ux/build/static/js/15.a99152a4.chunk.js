(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[15],{1106:function(e,a,t){"use strict";t.r(a);var r=t(6),s=t(1),c=t(17),n=t(0),l=t(523),i=t(65),j=t.n(i),o=t(539),d=t(586),m=t(130),b=t(548),u=t(540),h=t(479),O=t(475),x=t(133),g=t(561),p=t(692),f=t(702),v=t(696),N=t(693),y=t(1082),k=t(1083),w=t(1078),S=t(1092),R=t(1088),C=t(710),q=t(1084),z=t(1085),P=t(1120),A=t(473),D=(t(528),t(7));a.default=function(){var e,a=Object(n.useContext)(x.a),i=Object(o.a)(),F=Object(c.a)(i,2),J=F[0],T=(F[1],Object(h.g)()),E=Object(m.b)(),I=Object(b.a)(),L=I.register,M=I.errors,U=I.handleSubmit,V=(I.trigger,Object(n.useState)("")),B=Object(c.a)(V,2),G=B[0],H=B[1],K=Object(n.useState)({}),Q=Object(c.a)(K,2),W=Q[0],X=Q[1],Y=Object(n.useState)(""),Z=Object(c.a)(Y,2),$=Z[0],_=Z[1],ee=Object(n.useState)(""),ae=Object(c.a)(ee,2),te=ae[0],re=ae[1],se=Object(n.useState)(!1),ce=Object(c.a)(se,2),ne=(ce[0],ce[1]),le="dark"===J?"register-v2-dark.svg":"register-v2.svg",ie=t(711)("./".concat(le)).default,je=function(){return Object(D.jsxs)(n.Fragment,{children:["I agree to",Object(D.jsx)("a",{className:"ml-25",href:"/",onClick:function(e){return e.preventDefault()},children:"privacy policy & terms"})]})};return Object(D.jsx)("div",{className:"auth-wrapper auth-v2",children:Object(D.jsxs)(y.a,{className:"auth-inner m-0",children:[Object(D.jsx)(O.b,{className:"brand-logo",to:"/",onClick:function(e){return e.preventDefault()},children:Object(D.jsx)("h2",{className:"brand-text text-primary ml-1",children:"Space Pools"})}),Object(D.jsx)(k.a,{className:"d-none d-lg-flex align-items-center p-5",lg:"8",sm:"12",children:Object(D.jsx)("div",{className:"w-100 d-lg-flex align-items-center justify-content-center px-5",children:Object(D.jsx)("img",{className:"img-fluid",src:ie,alt:"Login V2"})})}),Object(D.jsx)(k.a,{className:"d-flex align-items-center auth-bg px-2 p-lg-5",lg:"4",sm:"12",children:Object(D.jsxs)(k.a,{className:"px-xl-2 mx-auto",sm:"8",md:"6",lg:"12",children:[Object(D.jsx)(w.a,{tag:"h2",className:"font-weight-bold mb-1",children:"Adventure starts here \ud83d\ude80"}),Object(D.jsx)(S.a,{className:"mb-2",children:"Make your app management easy and fun!"}),Object(D.jsxs)(R.a,{action:"/",className:"auth-register-form mt-2",onSubmit:U((function(){Object(l.c)(M)&&d.a.register({username:$,email:G,password:te}).then((function(e){if(e.data.error){var t={};for(var r in e.data.error)null!==e.data.error[r]&&(t[r]=e.data.error[r]);X(t),null!==e.data.error.email&&console.error(e.data.error.email),null!==e.data.error.username&&console.error(e.data.error.username)}else{X({});var c=Object(s.a)(Object(s.a)({},e.data.user),{},{accessToken:e.data.accessToken});a.update(e.data.user.ability),E(Object(u.a)(c)),T.push("/")}})).catch((function(e){return console.log(e)}))})),children:[Object(D.jsxs)(C.a,{children:[Object(D.jsx)(q.a,{className:"form-label",for:"register-username",children:"Username"}),Object(D.jsx)(z.a,{autoFocus:!0,type:"text",value:$,placeholder:"johndoe",id:"register-username",name:"register-username",onChange:function(e){var a=W;a.username&&delete a.username,_(e.target.value),X(a)},className:j()({"is-invalid":M["register-username"]}),innerRef:L({required:!0,validate:function(e){return""!==e}})}),Object.keys(W).length&&W.username?Object(D.jsx)("small",{className:"text-danger",children:W.username}):null]}),Object(D.jsxs)(C.a,{children:[Object(D.jsx)(q.a,{className:"form-label",for:"register-email",children:"Email"}),Object(D.jsx)(z.a,{type:"email",value:G,id:"register-email",name:"register-email",onChange:function(e){var a=W;a.email&&delete a.email,H(e.target.value),X(a)},placeholder:"john@example.com",className:j()({"is-invalid":M["register-email"]}),innerRef:L({required:!0,validate:function(e){return""!==e}})}),Object.keys(W).length&&W.email?Object(D.jsx)("small",{className:"text-danger",children:W.email}):null]}),Object(D.jsxs)(C.a,{children:[Object(D.jsx)(q.a,{className:"form-label",for:"register-password",children:"Password"}),Object(D.jsx)(g.a,(e={value:te,id:"register-password",name:"register-password",className:"input-group-merge",onChange:function(e){return re(e.target.value)}},Object(r.a)(e,"className",j()({"is-invalid":M["register-password"]})),Object(r.a)(e,"innerRef",L({required:!0,validate:function(e){return""!==e}})),e))]}),Object(D.jsx)(C.a,{children:Object(D.jsx)(P.a,{type:"checkbox",id:"terms",name:"terms",value:"terms",label:Object(D.jsx)(je,{}),className:"custom-control-Primary",innerRef:L({required:!0}),onChange:function(e){return ne(e.target.checked)},invalid:M.terms&&!0})}),Object(D.jsx)(A.a.Ripple,{type:"submit",block:!0,color:"primary",children:"Sign up"})]}),Object(D.jsxs)("p",{className:"text-center mt-2",children:[Object(D.jsx)("span",{className:"mr-25",children:"Already have an account?"}),Object(D.jsx)(O.b,{to:"/login",children:Object(D.jsx)("span",{children:"Sign in instead"})})]}),Object(D.jsx)("div",{className:"divider my-2",children:Object(D.jsx)("div",{className:"divider-text",children:"or"})}),Object(D.jsxs)("div",{className:"auth-footer-btn d-flex justify-content-center",children:[Object(D.jsx)(A.a.Ripple,{color:"facebook",children:Object(D.jsx)(p.a,{size:14})}),Object(D.jsx)(A.a.Ripple,{color:"twitter",children:Object(D.jsx)(f.a,{size:14})}),Object(D.jsx)(A.a.Ripple,{color:"google",children:Object(D.jsx)(v.a,{size:14})}),Object(D.jsx)(A.a.Ripple,{className:"mr-0",color:"github",children:Object(D.jsx)(N.a,{size:14})})]})]})})]})})}}}]);
//# sourceMappingURL=15.a99152a4.chunk.js.map