(this.webpackJsonpyuwitter=this.webpackJsonpyuwitter||[]).push([[0],{55:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),a=n(36),i=n.n(a),o=n(4),s=n(12),u=n(24),l=n(8),b=n(9),d=n.n(b),j=n(14),p=n(15),x=n(25),f=n(26);n(50),n(57),n(58);f.a.initializeApp({apiKey:"AIzaSyDdXgVZyUb-NkTb3Zfsfyo7T8yXIeEZqHU",authDomain:"yuwitter-d54e2.firebaseapp.com",projectId:"yuwitter-d54e2",storageBucket:"yuwitter-d54e2.appspot.com",messagingSenderId:"499889562135",appId:"1:499889562135:web:be225a28e45544925db252"});var O,h,m,g,y,w,v,k,C,S,I,F,A,z,U,P,N,D,B,E,L,T,R,W,q,G,Z,H,J,M,X,Y,K,V=f.a,_=f.a.auth(),Q=f.a.firestore(),$=f.a.storage(),ee=n(5),te=Object(ee.b)(O||(O=Object(o.a)(["\n\tcursor: pointer;\n\twidth: 100%;\n\tpadding: 7px 20px;\n\ttext-align: center;\n\tcolor: white;\n\tborder-radius: 20px;\n\t\n\tmargin-top: 15px;\n\tmargin-bottom: 5px;\n"]))),ne={Container:ee.c.div(h||(h=Object(o.a)(["\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\twidth: 100%;\n\t\tmax-width: 320px;\n\t\t/* background-color: pink; */\n\t"]))),FormInput:ee.c.input(m||(m=Object(o.a)(["\n\t  width: 100%;\n\t\tpadding: 10px 20px;\n\t\tborder-radius: 20px;\n\t\tborder: 1px solid black;\n\t\ttext-align: center;\n\t\tbackground-color: white;\n\t\tcolor: black;\n\t"]))),FormSumbit:ee.c.input(g||(g=Object(o.a)(["\n\t\t","\n\t\tbackground-color: #04aaff;\n\t"])),te),CancelButton:ee.c.span(y||(y=Object(o.a)(["\n\t\t","\n\t\tbackground-color: tomato;\n\t\tmargin-top: 0px;\n\t"])),te)},re=n(1),ce=ee.c.input(w||(w=Object(o.a)(["\n  max-width: 320px;\n  width: 100%;\n  padding: 10px;\n  border-radius: 30px;\n  background-color: rgba(255, 255, 255, 1);\n  margin-bottom: 10px;\n  font-size: 12px;\n  color: black;\n"]))),ae=Object(ee.c)(ce)(v||(v=Object(o.a)(["\n\ttext-align: center;\n  background: #04aaff;\n  color: white;\n  margin-top: 10;\n  cursor: pointer;\n"]))),ie=ee.c.span(k||(k=Object(o.a)(["\n \tcolor: tomato;\n  text-align: center;\n  font-weight: 500;\n  font-size: 12px;\n"]))),oe=ee.c.span(C||(C=Object(o.a)(["\n  color: #04aaff;\n  cursor: pointer;\n  margin-top: 10px;\n  margin-bottom: 50px;\n  display: block;\n  font-size: 12px;\n  text-decoration: underline;\n}\n"]))),se=function(){var e=Object(r.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),i=Object(s.a)(a,2),o=i[0],u=i[1],l=Object(r.useState)(!0),b=Object(s.a)(l,2),p=b[0],x=b[1],f=Object(r.useState)(""),O=Object(s.a)(f,2),h=O[0],m=O[1],g=function(e){var t=e.target,n=t.name,r=t.value;"email"===n?c(r):"password"===n&&u(r)},y=function(){var e=Object(j.a)(d.a.mark((function e(t){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!p){e.next=8;break}return e.next=5,_.createUserWithEmailAndPassword(n,o);case 5:r=e.sent,e.next=11;break;case 8:return e.next=10,_.signInWithEmailAndPassword(n,o);case 10:r=e.sent;case 11:console.log(r),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),console.log(e.t0.meassage),m(e.t0.message);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(re.jsxs)(re.Fragment,{children:[Object(re.jsx)(ne.Container,{children:Object(re.jsxs)("form",{onSubmit:y,children:[Object(re.jsx)(ce,{name:"email",type:"email",placeholder:"Email",required:!0,value:n,onChange:g}),Object(re.jsx)(ce,{name:"password",type:"password",placeholder:"Password",required:!0,value:o,onChange:g}),Object(re.jsx)(ae,{type:"submit",value:p?"Create Account":"Sign In"}),h&&Object(re.jsx)(ie,{children:h})]})}),Object(re.jsx)(oe,{onClick:function(){return x((function(e){return!e}))},children:p?"Sign In":"Create Account"})]})},ue=Object(ee.c)(ne.Container)(S||(S=Object(o.a)(["\n\tmax-width: none;\n\theight: 100vh;\n  justify-content: center;\n\talign-items: center;\n"]))),le=ee.c.div(I||(I=Object(o.a)(["\n\tdisplay: flex;\n  justify-content: space-between;\n  width: 100%;\n\tmax-width: 320px;\n"]))),be=ee.c.button(F||(F=Object(o.a)(["\n  cursor: pointer;\n  border-radius: 20px;\n  border: none;\n  padding: 10px 0px;\n  font-size: 12px;\n  text-align: center;\n  width: 150px;\n  background: white;\n  cursor: pointer;\n"]))),de=function(){var e=function(){var e=Object(j.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"google"===(n=t.target.name)?r=new V.auth.GoogleAuthProvider:"github"===n&&(r=new V.auth.GithubAuthProvider),e.next=4,_.signInWithPopup(r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(re.jsxs)(ue,{children:[Object(re.jsx)(p.a,{icon:x.c,color:"#04AAFF",size:"3x",style:{marginBottom:30}}),Object(re.jsx)(se,{}),Object(re.jsxs)(le,{children:[Object(re.jsxs)(be,{onClick:e,name:"google",children:["Continue with Google ",Object(re.jsx)(p.a,{icon:x.b})]}),Object(re.jsxs)(be,{onClick:e,name:"github",children:["Continue with Github ",Object(re.jsx)(p.a,{icon:x.a})]})]})]})},je=n(40),pe=n(21),xe=Object(ee.c)(ne.Container)(A||(A=Object(o.a)(["\n  margin-bottom: 20px;\n  background-color: white;\n  padding: 20px;\n  border-radius: 10px;\n  position: relative;\n  color: rgba(0, 0, 0, 0.8);\n"]))),fe=Object(ee.c)(ne.Container)(z||(z=Object(o.a)(["\n  cursor: pointer;\n  margin-bottom: 5px;\n"]))),Oe=ee.c.img(U||(U=Object(o.a)(["\n  border-radius: 10px;\n  margin-top: 10px;\n"]))),he=ee.c.div(P||(P=Object(o.a)(["\n  position: absolute;\n  right: 10px;\n  top: 10px;\n"]))),me=ee.c.span(N||(N=Object(o.a)(["\n  cursor: pointer;\n  margin: 0 10px 10px 0;\n"]))),ge=ee.c.h1(D||(D=Object(o.a)(["\n  font-size: 1rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n"]))),ye=ee.c.span(B||(B=Object(o.a)(["\n  margin-left: 5px;\n  color: grey;\n  font-size: 0.8rem;\n"]))),we=function(e){var t=e.yuweetObj,n=e.isOwner,c=e.userObj,a=Object(r.useState)(!1),i=Object(s.a)(a,2),o=i[0],u=i[1],l=Object(r.useState)(t.text),b=Object(s.a)(l,2),x=b[0],f=b[1],O=function(){var e=Object(j.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure delete yutweet?")){e.next=6;break}return e.next=4,Q.doc("yuweets/".concat(t.id)).delete();case 4:return e.next=6,$.refFromURL(t.attachmentUrl).delete();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),h=function(){return u((function(e){return!e}))},m=function(){var e=Object(j.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.value,f(n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(j.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,Q.doc("yuweets/".concat(t.id)).update({text:x});case 3:u(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return console.log(),Object(re.jsx)(xe,{children:o?Object(re.jsxs)(re.Fragment,{children:[Object(re.jsx)(fe,{children:Object(re.jsxs)("form",{onSubmit:g,children:[Object(re.jsx)(ne.FormInput,{type:"text",placeholder:"Edit your yuweet",value:x,required:!0,autoFocus:!0,onChange:m,maxLength:120}),Object(re.jsx)(ne.FormSumbit,{type:"submit",value:"Update yuweet"})]})}),Object(re.jsx)(ne.CancelButton,{onClick:h,children:"Cancel"})]}):Object(re.jsxs)(re.Fragment,{children:[Object(re.jsxs)(ge,{children:[c.displayName,Object(re.jsx)(ye,{children:c.email.substring(0,c.email.indexOf("@"))})]}),Object(re.jsx)("h2",{style:{fontSize:14},children:t.text}),t.attachmentUrl&&Object(re.jsx)(Oe,{src:t.attachmentUrl}),n&&Object(re.jsxs)(he,{children:[Object(re.jsx)(me,{onClick:O,children:Object(re.jsx)(p.a,{icon:pe.d})}),Object(re.jsx)(me,{onClick:h,children:Object(re.jsx)(p.a,{icon:pe.a})})]})]})})},ve=n(60),ke=ee.c.form(E||(E=Object(o.a)(["\n\tdisplay: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n"]))),Ce=ee.c.div(L||(L=Object(o.a)(["\n \tdisplay: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  position: relative;\n  margin-bottom: 20px;\n  width: 100%;\n"]))),Se=ee.c.input(T||(T=Object(o.a)(["\n  flex-grow: 1;\n  height: 40px;\n  padding: 0px 20px;\n  color: white;\n  border: 1px solid #04aaff;\n  border-radius: 20px;\n  font-weight: 500;\n  font-size: 12px;\n"]))),Ie=ee.c.input(R||(R=Object(o.a)(["\n\tposition: absolute;\n\tright: 0;\n\tbackground-color: #04aaff;\n\theight: 40px;\n\twidth: 40px;\n\tpadding: 10px 0px;\n\ttext-align: center;\n\tborder-radius: 20px;\n\tcolor: white;\n\tcursor: pointer;\n"]))),Fe=ee.c.label(W||(W=Object(o.a)(["\n\tcolor: #04aaff;\n  cursor: pointer;\n"]))),Ae=ee.c.div(q||(q=Object(o.a)(["\n\tdisplay: flex;\n  flex-direction: column;\n  align-items: center;\n"]))),ze=ee.c.img(G||(G=Object(o.a)(["\n\theight: 80px;\n  width: 80px;\n  border-radius: 40px;\n"]))),Ue=ee.c.div(Z||(Z=Object(o.a)(["\n\tcolor: #04aaff;\n  cursor: pointer;\n  text-align: center;\n"]))),Pe=ee.c.span(H||(H=Object(o.a)(["\n  margin-right: 10px;\n  font-size: 12px;\n"]))),Ne=function(e){var t=e.userObj,n=Object(r.useState)(""),c=Object(s.a)(n,2),a=c[0],i=c[1],o=Object(r.useState)(""),u=Object(s.a)(o,2),l=u[0],b=u[1],x=function(){var e=Object(j.a)(d.a.mark((function e(n){var r,c,o,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==a){e.next=2;break}return e.abrupt("return");case 2:if(n.preventDefault(),r="",""===l){e.next=12;break}return c=$.ref().child("".concat(t.uid,"/").concat(Object(ve.a)())),e.next=8,c.putString(l,"data_url");case 8:return o=e.sent,e.next=11,o.ref.getDownloadURL();case 11:r=e.sent;case 12:return s={text:a,createdAt:Date.now(),creatorId:t.uid,attachmentUrl:r},e.next=15,Q.collection("yuweets").add(s);case 15:i(""),b("");case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(re.jsxs)(ke,{onSubmit:x,children:[Object(re.jsxs)(Ce,{children:[Object(re.jsx)(Se,{value:a,onChange:function(e){var t=e.target.value;i(t)},type:"text",placeholder:"What's on your mind?",maxLength:120}),Object(re.jsx)(Ie,{type:"submit",value:"\u2192"})]}),Object(re.jsx)(Fe,{for:"attach-file",children:Object(re.jsxs)("p",{children:["Add photo ",Object(re.jsx)(p.a,{icon:pe.b})]})}),Object(re.jsx)("input",{id:"attach-file",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onloadend=function(e){var t=e.currentTarget.result;b(t)},n.readAsDataURL(t)},style:{opacity:0}}),l&&Object(re.jsxs)(Ae,{children:[Object(re.jsx)(ze,{src:l,style:{backgroundImage:l}}),Object(re.jsxs)(Ue,{onClick:function(){b(""),document.getElementById("attach-file").value=null},children:[Object(re.jsx)(Pe,{children:"Remove"}),Object(re.jsx)(p.a,{icon:pe.c})]})]})]})},De=function(e){var t=e.userObj,n=Object(r.useState)([]),c=Object(s.a)(n,2),a=c[0],i=c[1];return Object(r.useEffect)((function(){Q.collection("yuweets").orderBy("createdAt","desc").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(je.a)({id:e.id},e.data())}));i(t)}))}),[]),Object(re.jsxs)(ne.Container,{children:[Object(re.jsx)(Ne,{userObj:t}),Object(re.jsx)("div",{style:{marginTop:30},children:a.map((function(e){return Object(re.jsx)(we,{yuweetObj:e,isOwner:e.creatorId===t.uid,userObj:t},e.id)}))})]})},Be=ee.c.form(J||(J=Object(o.a)(["\n\tborder-bottom: 1px solid rgba(255, 255, 255, 0.9);\n  padding-bottom: 30px;\n  width: 100%;\n  display: flex;\n\tflex-direction: column;\n"]))),Ee=function(e){var t=e.userObj,n=e.refreshUser,c=Object(l.f)(),a=Object(r.useState)(t.displayName),i=Object(s.a)(a,2),o=i[0],u=i[1],b=function(){var e=Object(j.a)(d.a.mark((function e(r){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),t.displayName===o){e.next=5;break}return e.next=4,t.updateProfile({displayName:o});case 4:n();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(j.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.collection("yuweets").where("creatorId","==",t.uid).orderBy("createdAt").get();case 2:e.sent;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){p()}),[]),Object(re.jsxs)(ne.Container,{children:[Object(re.jsxs)(Be,{onSubmit:b,children:[Object(re.jsx)(ne.FormInput,{onChange:function(e){var t=e.target.value;u(t)},type:"text",autoFocus:!0,placeholder:"Display Name",value:o}),Object(re.jsx)(ne.FormSumbit,{type:"submit",value:"Update Profile",style:{marginTop:10}})]}),Object(re.jsx)(ne.CancelButton,{style:{marginTop:50},onClick:function(){_.signOut(),c.push("/")},children:"Log Out"})]})},Le=function(e){var t=e.userObj;return Object(re.jsx)("nav",{children:Object(re.jsxs)("ul",{style:{display:"flex",justifyContent:"center",marginTop:50},children:[Object(re.jsx)("li",{children:Object(re.jsx)(u.b,{to:"/",style:{marginRight:10},children:Object(re.jsx)(p.a,{icon:x.c,color:"#04AAFF",size:"2x"})})}),Object(re.jsx)("li",{children:Object(re.jsxs)(u.b,{to:"/profile",style:{marginLeft:10,display:"flex",flexDirection:"column",alignItems:"center",fontSize:12},children:[Object(re.jsx)(p.a,{icon:pe.e,color:"#04AAFF",size:"2x"}),Object(re.jsx)("span",{style:{marginTop:10},children:t.displayName?"".concat(t.displayName,"'s Profile"):"Profile"})]})})]})})},Te=function(e){var t=e.refreshUser,n=e.isLoggedIn,r=e.userObj;return Object(re.jsxs)(u.a,{children:[n&&Object(re.jsx)(Le,{userObj:r}),Object(re.jsx)(l.c,{children:n?Object(re.jsxs)("div",{style:{maxWidth:890,width:"100%",margin:"0 auto",marginTop:80,display:"flex",justifyContent:"center"},children:[Object(re.jsx)(l.a,{exact:!0,path:"/",children:Object(re.jsx)(De,{userObj:r})}),Object(re.jsx)(l.a,{exact:!0,path:"/profile",children:Object(re.jsx)(Ee,{refreshUser:t,userObj:r})})]}):Object(re.jsx)(re.Fragment,{children:Object(re.jsx)(l.a,{exact:!0,path:"/",children:Object(re.jsx)(de,{})})})})]})};var Re=Object(ee.a)(M||(M=Object(o.a)(['\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    background-color: #051e34;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,\n      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;\n    font-size: 14px;\n    color: white;\n    display: flex;\n    justify-content: center;\n  }\n  \n  form {\n    width: 100%;\n  }\n\n  input {\n    all: unset;\n    box-sizing: border-box;\n    appearance: none;\n  }\n\n  button {\n    background-color: white;\n    color: black;\n  }\n  \n  a {\n    text-decoration: none;\n    color: inherit;\n  }\n   \n']))),We=ee.c.div(X||(X=Object(o.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 400px;\n  border: 3px solid white;\n  border-radius: 30px;\n  margin: 50px 0 50px 0;\n  background-color: #122c44;\n"]))),qe=ee.c.p(Y||(Y=Object(o.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100vh;\n"]))),Ge=ee.c.footer(K||(K=Object(o.a)(["\n \n  height: 30px;\n  text-align: center;\n  margin-top: 3rem;\n  margin-bottom: 1rem;\n"]))),Ze=function(){var e=Object(r.useState)(!1),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(null),i=Object(s.a)(a,2),o=i[0],u=i[1];return Object(r.useEffect)((function(){_.onAuthStateChanged((function(e){u(e?{displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)},email:e.email}:null),c(!0)}))}),[]),Object(re.jsxs)(We,{children:[Object(re.jsx)(Re,{}),n?Object(re.jsx)(Te,{refreshUser:function(){var e=_.currentUser;u({displayName:e.displayName,uid:e.uid,updateProfile:function(t){return e.updateProfile(t)}})},isLoggedIn:Boolean(o),userObj:o}):Object(re.jsx)(qe,{children:"Initializing..."}),Object(re.jsxs)(Ge,{children:["\xa9 Yuwitter ",(new Date).getFullYear()]})]})};n(55);i.a.render(Object(re.jsx)(c.a.StrictMode,{children:Object(re.jsx)(Ze,{})}),document.getElementById("root"))}},[[56,1,2]]]);
//# sourceMappingURL=main.bf857d6a.chunk.js.map