(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[14],{867:function(e,s,t){},868:function(e,s,t){},927:function(e,s,t){"use strict";t.r(s);var a=t(16),c=t(0),i=t(85),l=t.n(i),n=t(1),r=t(9),j=t(61),d=t.n(j),m=t(918),o=(t(867),t(6)),b=function(e){var s,t=e.children,a=e.blocking,i=e.loader,l=e.className,j=e.tag,m=e.overlayColor,b=j;return Object(o.jsxs)(b,{className:d()("ui-loader",(s={},Object(r.a)(s,l,l),Object(r.a)(s,"show",a),s)),children:[t,a?Object(o.jsxs)(c.Fragment,{children:[Object(o.jsx)("div",Object(n.a)({className:"overlay"},a&&m?{style:{backgroundColor:m}}:{})),Object(o.jsx)("div",{className:"loader",children:i})]}):null]})},x=b;b.defaultProps={tag:"div",blocking:!1,loader:Object(o.jsx)(m.a,{color:"primary"})};var h=t(495),O=t(873),u=t(919),f=t(928),p=t(893),N=t(866),g=t(542),v=function(e){var s=e.data;return Object(o.jsx)(p.a,{children:Object(o.jsxs)(N.a,{children:[Object(o.jsx)("h5",{className:"mb-1",children:"Polls"}),Object(o.jsx)(g.a,{className:"mb-0",children:"Who is the best actor in Marvel Cinematic Universe?"}),s.map((function(e){return Object(o.jsxs)("div",{className:"profile-polls-info mt-2",children:[Object(o.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(o.jsx)(O.a,{type:"radio",id:"radio-".concat(e.name.toLowerCase()),name:"customRadio",label:e.name}),Object(o.jsx)("div",{className:"text-right",children:e.result})]}),Object(o.jsx)(u.a,{className:"my-50",value:e.result.replace("%"," ").trim()}),Object(o.jsx)("div",{className:"avatar-group my-1",children:e.votedUser.map((function(e){return Object(o.jsxs)(c.Fragment,{children:[Object(o.jsx)(h.a,{className:"pull-up",img:e.img,id:e.username.toLowerCase().split(" ").join("-"),imgHeight:"26",imgWidth:"26"}),Object(o.jsx)(f.a,{target:e.username.toLowerCase().split(" ").join("-"),placement:"top",children:e.username})]},e.username)}))})]},e.name)}))]})})},w=function(e){var s=e.data;return Object(o.jsx)(p.a,{children:Object(o.jsxs)(N.a,{children:[Object(o.jsx)("h5",{className:"mb-75",children:"About"}),Object(o.jsx)(g.a,{children:s.about}),Object(o.jsxs)("div",{className:"mt-2",children:[Object(o.jsx)("h5",{className:"mb-75",children:"Joined:"}),Object(o.jsx)(g.a,{children:s.joined})]}),Object(o.jsxs)("div",{className:"mt-2",children:[Object(o.jsx)("h5",{className:"mb-75",children:"Lives:"}),Object(o.jsx)(g.a,{children:s.lives})]}),Object(o.jsxs)("div",{className:"mt-2",children:[Object(o.jsx)("h5",{className:"mb-75",children:"Email:"}),Object(o.jsx)(g.a,{children:s.email})]}),Object(o.jsxs)("div",{className:"mt-2",children:[Object(o.jsx)("h5",{className:"mb-75",children:"Website:"}),Object(o.jsx)(g.a,{children:s.website})]})]})})},y=t(602),k=t(625),C=t(628),z=t(899),P=t(900),L=t(902),F=t(901),W=t(453),D=function(e){return e.data.map((function(e){return Object(o.jsx)(p.a,{className:"post",children:Object(o.jsxs)(N.a,{children:[Object(o.jsxs)("div",{className:"d-flex justify-content-start align-items-center mb-1",children:[Object(o.jsx)(h.a,{className:"mr-1",img:e.avatar,imgHeight:"50",imgWidth:"50"}),Object(o.jsxs)("div",{className:"profile-user-info",children:[Object(o.jsx)("h6",{className:"mb-0",children:e.username}),Object(o.jsx)("small",{className:"text-muted",children:e.postTime})]})]}),Object(o.jsx)(g.a,{children:e.postText}),e.postImg?Object(o.jsx)("img",{src:e.postImg,alt:e.username,className:"img-fluid rounded mb-75"}):e.postVid?Object(o.jsx)("iframe",{src:"https://www.youtube.com/embed/6stlCkUDG_s",className:"w-100 rounded height-250 mb-50 border-0"}):null,Object(o.jsxs)(z.a,{className:"d-flex justify-content-start align-items-center flex-wrap pb-50 post-actions",children:[Object(o.jsxs)(P.a,{className:"d-flex justify-content-between justify-content-sm-start mb-2",sm:"6",children:[Object(o.jsxs)("div",{className:"d-flex align-items-center text-muted text-nowrap cursor-pointer",children:[Object(o.jsx)(y.a,{size:18,className:d()("mr-50",{"profile-likes":!0===e.youLiked})}),Object(o.jsx)("span",{children:e.likes})]}),Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)("div",{className:"avatar-group ml-1",children:e.likedUsers.map((function(e){return Object(o.jsxs)(c.Fragment,{children:[Object(o.jsx)(h.a,{className:"pull-up",img:e.avatar,id:e.username.toLowerCase().split(" ").join("-"),imgHeight:"26",imgWidth:"26"}),Object(o.jsx)(f.a,{target:e.username.toLowerCase().split(" ").join("-"),placement:"top",children:e.username})]},e.username)}))}),Object(o.jsx)("a",{href:"/",className:"text-muted text-nowrap ml-50",onClick:function(e){return e.preventDefault()},children:"+140 more"})]})]}),Object(o.jsxs)(P.a,{className:"d-flex justify-content-between justify-content-sm-end align-items-center mb-2",sm:"6",children:[Object(o.jsxs)("a",{href:"/",className:"text-nowrap",onClick:function(e){return e.preventDefault()},children:[Object(o.jsx)(k.a,{size:18,className:"text-body mr-50"}),Object(o.jsx)("span",{className:"text-muted mr-1",children:e.comments})]}),Object(o.jsxs)("a",{href:"/",className:"text-nowrap share-post",onClick:function(e){return e.preventDefault()},children:[Object(o.jsx)(C.a,{size:18,className:"text-body mx-50"}),Object(o.jsx)("span",{className:"text-muted mr-1",children:e.share})]})]})]}),e.detailedComments.map((function(e){return Object(o.jsxs)("div",{className:"d-flex align-items-start mb-1",children:[Object(o.jsx)(h.a,{img:e.avatar,className:"mt-25 mr-75",imgHeight:"34",imgWidth:"34"}),Object(o.jsxs)("div",{className:"profile-user-info w-100",children:[Object(o.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[Object(o.jsx)("h6",{className:"mb-0",children:e.username}),Object(o.jsxs)("a",{href:"/",onClick:function(e){return e.preventDefault()},children:[Object(o.jsx)(y.a,{size:18,className:d()("text-body",{"profile-likes":!0===e.youLiked})}),Object(o.jsx)("span",{className:"align-middle ml-25 text-muted",children:e.commentsLikes})]})]}),Object(o.jsx)("small",{children:e.comment})]})]},e.username)})),Object(o.jsxs)("fieldset",{className:"form-label-group mb-50",children:[Object(o.jsx)(L.a,{id:"add-comment-".concat(e.username),type:"textarea",rows:"3",placeholder:"Add Comment"}),Object(o.jsx)(F.a,{for:"add-comment-".concat(e.username),children:"Add Comment"})]}),Object(o.jsx)(W.a.Ripple,{color:"primary",size:"sm",children:"Post Comment"})]})},e.username)}))},H=t(610),A=t(627),U=t(623),S=t(622),T=t(632),I=t(617),E=t(920),J=t(911),R=t(910),M=t(921),G=t(907),V=t(908),_=function(e){var s=e.data,t=Object(c.useState)(!1),i=Object(a.a)(t,2),l=i[0],n=i[1];return Object(o.jsxs)(p.a,{className:"profile-header mb-2",children:[Object(o.jsx)(E.a,{src:s.coverImg,alt:"User Profile Image",top:!0}),Object(o.jsx)("div",{className:"position-relative",children:Object(o.jsxs)("div",{className:"profile-img-container d-flex align-items-center",children:[Object(o.jsx)("div",{className:"profile-img",children:Object(o.jsx)("img",{className:"rounded img-fluid",src:s.avatar,alt:"Card image"})}),Object(o.jsxs)("div",{className:"profile-title ml-3",children:[Object(o.jsx)("h2",{className:"text-white",children:s.username}),Object(o.jsx)("p",{className:"text-white",children:s.designation})]})]})}),Object(o.jsx)("div",{className:"profile-header-nav",children:Object(o.jsxs)(J.a,{className:"justify-content-end justify-content-md-between w-100",expand:"md",light:!0,children:[Object(o.jsx)(W.a,{color:"",className:"btn-icon navbar-toggler",onClick:function(){return n(!l)},children:Object(o.jsx)(H.a,{size:21})}),Object(o.jsx)(R.a,{isOpen:l,navbar:!0,children:Object(o.jsxs)("div",{className:"profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0",children:[Object(o.jsxs)(M.a,{className:"mb-0",pills:!0,children:[Object(o.jsx)(G.a,{children:Object(o.jsxs)(V.a,{className:"font-weight-bold",active:!0,children:[Object(o.jsx)("span",{className:"d-none d-md-block",children:"Feed"}),Object(o.jsx)(A.a,{className:"d-block d-md-none",size:14})]})}),Object(o.jsx)(G.a,{children:Object(o.jsxs)(V.a,{className:"font-weight-bold",children:[Object(o.jsx)("span",{className:"d-none d-md-block",children:"About"}),Object(o.jsx)(U.a,{className:"d-block d-md-none",size:14})]})}),Object(o.jsx)(G.a,{children:Object(o.jsxs)(V.a,{className:"font-weight-bold",children:[Object(o.jsx)("span",{className:"d-none d-md-block",children:"Photos"}),Object(o.jsx)(S.a,{className:"d-block d-md-none",size:14})]})}),Object(o.jsx)(G.a,{children:Object(o.jsxs)(V.a,{className:"font-weight-bold",children:[Object(o.jsx)("span",{className:"d-none d-md-block",children:"Friends"}),Object(o.jsx)(T.a,{className:"d-block d-md-none",size:14})]})})]}),Object(o.jsxs)(W.a,{color:"primary",children:[Object(o.jsx)(I.a,{className:"d-block d-md-none",size:14}),Object(o.jsx)("span",{className:"font-weight-bold d-none d-md-block",children:"Edit"})]})]})})]})})]})},q=t(612),B=t(629),K=function(e){var s=e.data;return Object(o.jsx)(p.a,{children:Object(o.jsxs)(N.a,{children:[Object(o.jsx)("h5",{children:"Twitter Feeds"}),s.map((function(e,s){return Object(o.jsxs)("div",{className:d()("profile-twitter-feed",{"mt-1":0===s,"mt-2":0!==s}),children:[Object(o.jsxs)("div",{className:"d-flex justify-content-start align-items-center mb-1",children:[Object(o.jsx)(h.a,{className:"mr-1",img:e.imgUrl,imgHeight:"40",imgWidth:"40"}),Object(o.jsxs)("div",{className:"profile-user-info",children:[Object(o.jsx)("h6",{className:"mb-0",children:e.title}),Object(o.jsxs)("a",{href:"/",onClick:function(e){return e.preventDefault()},children:[Object(o.jsx)("small",{className:"text-muted",children:e.id}),Object(o.jsx)(q.a,{size:14})]})]}),Object(o.jsx)("div",{className:"profile-star ml-auto",children:Object(o.jsx)(B.a,{size:18,className:d()("cursor-pointer",{"profile-favorite":!0===e.favorite})})})]}),Object(o.jsx)(g.a,{className:"mb-50",children:e.desc}),Object(o.jsx)("a",{href:"/",onClick:function(e){return e.preventDefault()},children:Object(o.jsx)("small",{children:e.tags})})]},s)}))]})})},Q=function(e){var s=e.data;return Object(o.jsx)(p.a,{children:Object(o.jsxs)(N.a,{children:[Object(o.jsx)("h5",{className:"mb-0",children:"Latest Photos"}),Object(o.jsx)(z.a,{children:s.map((function(e,s){return Object(o.jsx)(P.a,{md:"4",xs:"6",className:"profile-latest-img",children:Object(o.jsx)("a",{href:"/",onClick:function(e){return e.preventDefault()},children:Object(o.jsx)("img",{className:"img-fluid rounded",src:e.img,alt:"latest-photo"})})},s)}))})]})})},X=function(e){var s=e.data;return Object(o.jsx)(p.a,{children:Object(o.jsxs)(N.a,{className:"profile-suggestion",children:[Object(o.jsx)("h5",{className:"mb-2",children:"Suggested Pages"}),s.map((function(e,t){return Object(o.jsxs)("div",{className:d()("d-flex justify-content-start align-items-center",{"mb-1":t!==s.length-1}),children:[Object(o.jsx)(h.a,{className:"mr-1",img:e.avatar,imgHeight:40,imgWidth:40}),Object(o.jsxs)("div",{className:"profile-user-info",children:[Object(o.jsx)("h6",{className:"mb-0",children:e.username}),Object(o.jsx)("small",{className:"text-muted",children:e.subtitle})]}),Object(o.jsx)("div",{className:"profile-star ml-auto",children:Object(o.jsx)(B.a,{size:18,className:d()("cursor-pointer",{"profile-favorite":!0===e.favorite})})})]},t)}))]})})},Y=t(631),Z=function(e){var s=e.data;return Object(o.jsx)(p.a,{children:Object(o.jsxs)(N.a,{children:[Object(o.jsx)("h5",{children:"Suggestions"}),s.map((function(e,s){return Object(o.jsxs)("div",{className:d()("d-flex justify-content-start align-items-center",{"mt-2":0===s,"mt-1":0!==s}),children:[Object(o.jsx)(h.a,{className:"mr-75",img:e.avatar,imgHeight:"40",imgWidth:"40"}),Object(o.jsxs)("div",{className:"profile-user-info",children:[Object(o.jsx)("h6",{className:"mb-0",children:e.name}),Object(o.jsx)("small",{className:"text-muted",children:e.mutualFriend})]}),Object(o.jsx)("div",{className:"ml-auto",children:Object(o.jsx)(W.a.Ripple,{className:"btn-icon",color:"primary",size:"sm",children:Object(o.jsx)(Y.a,{size:14})})})]},s)}))]})})},$=t(468);t(868),s.default=function(){var e=Object(c.useState)(null),s=Object(a.a)(e,2),t=s[0],i=s[1],n=Object(c.useState)(!1),r=Object(a.a)(n,2),j=r[0],d=r[1];return Object(c.useEffect)((function(){l.a.get("/profile/data").then((function(e){return i(e.data)}))}),[]),Object(o.jsxs)(c.Fragment,{children:[Object(o.jsx)($.a,{breadCrumbTitle:"Profile",breadCrumbParent:"Pages",breadCrumbActive:"Profile"}),null!==t?Object(o.jsxs)("div",{id:"user-profile",children:[Object(o.jsx)(z.a,{children:Object(o.jsx)(P.a,{sm:"12",children:Object(o.jsx)(_,{data:t.header})})}),Object(o.jsxs)("section",{id:"profile-info",children:[Object(o.jsxs)(z.a,{children:[Object(o.jsxs)(P.a,{lg:{size:3,order:1},sm:{size:12},xs:{order:2},children:[Object(o.jsx)(w,{data:t.userAbout}),Object(o.jsx)(X,{data:t.suggestedPages}),Object(o.jsx)(K,{data:t.twitterFeeds})]}),Object(o.jsx)(P.a,{lg:{size:6,order:2},sm:{size:12},xs:{order:1},children:Object(o.jsx)(D,{data:t.post})}),Object(o.jsxs)(P.a,{lg:{size:3,order:3},sm:{size:12},xs:{order:3},children:[Object(o.jsx)(Q,{data:t.latestPhotos}),Object(o.jsx)(Z,{data:t.suggestions}),Object(o.jsx)(v,{data:t.polls})]})]}),Object(o.jsx)(z.a,{children:Object(o.jsx)(P.a,{className:"text-center",sm:"12",children:Object(o.jsx)(W.a,{color:"primary",className:"border-0 mb-1 profile-load-more",size:"sm",onClick:function(){d(!0),setTimeout((function(){d(!1)}),2e3)},children:Object(o.jsx)(x,{blocking:j,overlayColor:"rgba(255,255,255, .5)",children:Object(o.jsx)("span",{children:" Load More"})})})})})]})]}):null]})}}}]);
//# sourceMappingURL=14.dabb9960.chunk.js.map