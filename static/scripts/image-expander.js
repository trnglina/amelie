"use strict";!function(){for(var t=document.querySelectorAll("figure img"),e=document.getElementsByTagName("main")[0],i=0;i<t.length;i++)t[i].style.cursor="pointer",t[i].onclick=function(){if(this.classList.contains("expanded"))this.style.maxWidth="100%",this.classList.remove("expanded");else{var t=window.innerWidth-e.clientWidth+80;this.style.maxWidth="calc(100vw - ".concat(t,"px)"),this.classList.add("expanded")}}}();
//# sourceMappingURL=image-expander.js.map
