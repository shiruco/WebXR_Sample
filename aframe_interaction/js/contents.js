'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const pictures = document.querySelectorAll(".picture");

  const setPictureEvent = function(picture) {
    let artist = picture.id;
    let menu = document.querySelector('#' + artist + 'Menu');
    let menu1 = menu.querySelector(".menu1");
    let menu2 = menu.querySelector(".menu2");
    let menu3 = menu.querySelector(".menu3");
    let close = menu.querySelector(".close");

    menu1.addEventListener('mouseenter',function(){
      menu1.setAttribute('color','#CCC');
      menu2.setAttribute('color','#FFF');
      menu3.setAttribute('color','#FFF');
    });
    menu1.addEventListener('mouseleave',function(){
      menu1.setAttribute('color','#FFF');
    });
    menu2.addEventListener('mouseenter',function(){
      menu1.setAttribute('color','#FFF');
      menu2.setAttribute('color','#CCC');
      menu3.setAttribute('color','#FFF');
    });
    menu2.addEventListener('mouseleave',function(){
      menu2.setAttribute('color','#FFF');
    });
    menu3.addEventListener('mouseenter',function(){
      menu1.setAttribute('color','#FFF');
      menu2.setAttribute('color','#FFF');
      menu3.setAttribute('color','#CCC');
    });
    menu3.addEventListener('mouseleave',function(){
      menu3.setAttribute('color','#FFF');
    });
    close.addEventListener('mouseenter',function(){
      menu1.setAttribute('color','#FFF');
      menu2.setAttribute('color','#FFF');
      menu3.setAttribute('color','#FFF');
    });
    close.addEventListener('click',function(){
      this.parentNode.setAttribute('visible','false');
    });

    picture.addEventListener('mouseenter',function(){
      let artist = this.id;
      if (artist) {
        let panel = document.querySelector('#' + artist + 'Panel');
        panel.setAttribute('visible','true');
      }
    });
    picture.addEventListener('mouseleave',function(){
      let artist = this.id;
      if (artist) {
        let panel = document.querySelector('#' + artist + 'Panel');
        panel.setAttribute('visible','false');
      }
    });
    picture.addEventListener('click',function(){
      let artist = this.id;
      let menu = document.querySelector('#' + artist + 'Menu');
      if(menu.getAttribute('visible')) return;
      menu.querySelector('.menu1').emit('show');
      menu.querySelector('.menu2').emit('show');
      menu.querySelector('.menu3').emit('show');
      menu.querySelector('.close').emit('show');
      menu.setAttribute('visible','true');
    });
  }

  let picture;
  for (let i = 0, pictureNum = pictures.length; i < pictureNum; i++) {
    picture = pictures[i];
    setPictureEvent(picture);
  }
});