"use strict";anime({targets:".animated-char",translateY:function(a,n){return anime.random(-50,50)-anime.random(-50,50)*n},rotate:function(){return anime.random(-360,360)},scale:function(){return anime.random(.8,1.1)},direction:"alternate",loop:!0,delay:anime.stagger(anime.random(0,200),{start:500}),endDelay:500});
//# sourceMappingURL=404-animation.js.map
