(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{123:function(t,e){},134:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),s=a(23),r=a.n(s),o=(a(80),a(81),a(24)),c=a(4),l=a(16),u=a(17),m=a(18),d=a(22),h=a(21),f=a(19),p=a.n(f),v=a(68),E=a(20),g=a.n(E),b=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){var t;Object(u.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(t=e.call.apply(e,[this].concat(i))).state={branchData:[],data:!1,ENDPOINT:"http://localhost:3010",current:"",pincode:"",showInvalidMessage:!1},t.handleSubmit=function(e){e.preventDefault();var a=t.state,n=a.contact,i=a.pincode,s=new Date,r=s.getDate(),o=s.getMonth(),c=s.getFullYear()+"-"+(o+1)+"-"+r,l=(s.getHours(),s.getMinutes(),{contact:n,pincode:i}),u=g()(t.state.ENDPOINT);p.a.post("/getData",l).then((function(e){console.log(e),0==e.data.length?(t.setState({showInvalidMessage:!0}),u.emit("notification",{customer:l,date:c})):(t.setState({branchData:e.data,data:!0}),u.emit("notification",{customer:l,date:c}))}))},t.inputValueHandler=function(e){e.preventDefault(),t.setState(Object(l.a)({},e.target.name,e.target.value))},t}return Object(m.a)(a,[{key:"render",value:function(){var t=this.state,e=t.contact,a=t.pincode;return this.state.data?this.state.data?i.a.createElement("div",null,i.a.createElement(v.a,{striped:!0,bordered:!0,hover:!0},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Branch Name"),i.a.createElement("th",null,"Address"),i.a.createElement("th",null,"City"),i.a.createElement("th",null,"Branch Incharge"),i.a.createElement("th",null,"Contact Number"))),i.a.createElement("tbody",null,this.state.branchData.map((function(t,e){return i.a.createElement("tr",{key:e},i.a.createElement("td",null,t.Branch_Name),i.a.createElement("td",null,t.Address),i.a.createElement("td",null,t.City),i.a.createElement("td",null,t.Branch_Incharge),i.a.createElement("td",null,t.Contact_Number))}))))):void 0:i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"customer"},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("label",null,"Contact Number",i.a.createElement("input",{type:"text",value:e,onChange:this.inputValueHandler,name:"contact"})),i.a.createElement("label",{id:"pincode"},"Pincode",i.a.createElement("input",{type:"text",value:a,onChange:this.inputValueHandler,name:"pincode"})),i.a.createElement("div",{className:"submit"},i.a.createElement("input",{id:"submit ",type:"submit",value:"SUBMIT"})))),this.state.showInvalidMessage?i.a.createElement("div",{className:""},"Bad Bad luck, No Donut for you!!"):null)}}]),a}(i.a.Component),w=a(31),N=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){var t;Object(u.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(t=e.call.apply(e,[this].concat(i))).state={ENDPOINT:"http://localhost:3010",username:"",password:"",notifications_data:[],afterLogin:!1,showInvalid:!1,shownotifications:!1,notifications_action_data:{},action:!1},t.showNotifications=function(){t.setState({shownotifications:!0})},t.notificationAction=function(e){t.setState({notifications_action_data:e,action:!0})},t.handleSubmit=function(e){e.preventDefault();var a=t.state,n={username:a.username,password:a.password};p.a.post("/verify",n).then((function(e){"Success"==e.data[0].status?(t.setState({notifications_data:e.data[0].CData.reverse(),afterLogin:!0}),g()(t.state.ENDPOINT).on("message",(function(a){if(a[0].pincode==e.data[0].Pincode||e.data[0].Pincode_Covered.includes(a.pincode)){var n=t.state.notifications_data;n.unshift(a[0]),t.setState({notifications_data:n})}}))):t.setState({afterLogin:!1,showInvalid:!0})}))},t.inputValueHandler=function(e){e.preventDefault(),t.setState(Object(l.a)({},e.target.name,e.target.value))},t}return Object(m.a)(a,[{key:"render",value:function(){var t=this,e=this.state,a=e.username,n=e.password;return this.state.afterLogin?this.state.afterLogin?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"mainBranch"},i.a.createElement("h3",null,"Hi Branch Manager"),i.a.createElement("div",{className:"notifications"},i.a.createElement(w.a,{variant:"primary",onClick:this.showNotifications},"Notifications"))),this.state.shownotifications?i.a.createElement("div",{className:"notifications notificationsmain"},this.state.notifications_data.map((function(e,a){return i.a.createElement("li",{className:"notificationsList",onClick:function(){return t.notificationAction(e)},key:a},"A customer was searching for your branch on ",e.date,".You can contact him in this number-",e.contact)}))):null,this.state.action?i.a.createElement("div",{className:"notificationaction"},"You can call the customer in the given number and provide more details."):null):void 0:i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"BranchManager"},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("label",null,"Username",i.a.createElement("input",{type:"text",value:a,onChange:this.inputValueHandler,name:"username"})),i.a.createElement("label",{id:"password"},"Password",i.a.createElement("input",{type:"password",value:n,onChange:this.inputValueHandler,name:"password"})),i.a.createElement("div",{className:"submit"},i.a.createElement("input",{id:"submit ",type:"submit",value:"SUBMIT"})))),this.state.showInvalid?i.a.createElement("div",{className:""},"Invalid Credentials! Please try again."):null)}}]),a}(i.a.Component),y=function(t){Object(d.a)(a,t);var e=Object(h.a)(a);function a(){var t;Object(u.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(t=e.call.apply(e,[this].concat(i))).state={ENDPOINT:"http://localhost:3010",username:"",password:"",notifications_data:[],afterLogin:!1,showInvalid:!1,shownotifications:!1},t.showNotifications=function(){t.setState({shownotifications:!0})},t.handleSubmit=function(e){e.preventDefault();var a=t.state,n={username:a.username,password:a.password};p.a.post("/admin",n).then((function(e){if("Success"==e.data[0].status){t.setState({notifications_data:e.data[0].CData.reverse(),afterLogin:!0});var a=g()(t.state.ENDPOINT);console.log(a),a.on("message",(function(e){var a=t.state.notifications_data;a.unshift(e[0]),t.setState({notifications_data:a})}))}else t.setState({afterLogin:!1,showInvalid:!0})}))},t.inputValueHandler=function(e){e.preventDefault(),t.setState(Object(l.a)({},e.target.name,e.target.value))},t}return Object(m.a)(a,[{key:"render",value:function(){var t=this.state,e=t.username,a=t.password;return this.state.afterLogin?this.state.afterLogin?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"mainBranch"},i.a.createElement("h3",null,"Hi Administrator"),i.a.createElement("div",{className:"notifications"},i.a.createElement(w.a,{variant:"primary",onClick:this.showNotifications},"Notifications"))),this.state.shownotifications?i.a.createElement("div",{className:"notifications notificationsmain"},this.state.notifications_data.map((function(t,e){return i.a.createElement("li",{className:"notificationsList",key:e},"A customer was searching for a branch in ",t.pincode," on ",t.date,".You can contact him in this number-",t.contact)}))):null):void 0:i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"BranchManager"},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("label",null,"Username",i.a.createElement("input",{type:"text",value:e,onChange:this.inputValueHandler,name:"username"})),i.a.createElement("label",{id:"password"},"Password",i.a.createElement("input",{type:"password",value:a,onChange:this.inputValueHandler,name:"password"})),i.a.createElement("div",{className:"submit"},i.a.createElement("input",{id:"submit ",type:"submit",value:"SUBMIT"})))),this.state.showInvalid?i.a.createElement("div",{className:""},"Invalid Credentials! Please try again."):null)}}]),a}(i.a.Component),S=a(137),C=a(138);a(126);var I=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(S.a,{bg:"primary",variant:"dark"},i.a.createElement(C.a,{className:"mr-auto"},i.a.createElement(C.a.Link,{as:o.b,to:"/customers"},"Customers"),i.a.createElement(C.a.Link,{as:o.b,to:"/branchmanager"},"Branch Managers"),i.a.createElement(C.a.Link,{as:o.b,to:"/administrator"},"Administrators"))),i.a.createElement(c.a,{path:"/customers",component:b}),i.a.createElement(c.a,{path:"/branchmanager",component:N}),i.a.createElement(c.a,{path:"/administrator",component:y}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(o.a,null,i.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},75:function(t,e,a){t.exports=a(134)},80:function(t,e,a){},81:function(t,e,a){}},[[75,1,2]]]);
//# sourceMappingURL=main.c0634bb0.chunk.js.map