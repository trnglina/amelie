"use strict";!function(){for(var t=document.querySelectorAll("figure img"),e=document.getElementsByTagName("main")[0],i=0;i<t.length;i++)t[i].style.cursor="pointer",t[i].onclick=function(){this.classList.contains("expanded")?(this.style.maxWidth="100%",this.classList.remove("expanded")):(this.style.maxWidth="calc(100vw - ".concat(window.innerWidth-e.clientWidth+80,"px)"),this.classList.add("expanded"))}}();
//# sourceMappingURL=image-expander.js.map
