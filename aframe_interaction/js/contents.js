'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var pictures = document.querySelectorAll(".picture");

  var setPictureEvent = function(picture) {
    var artist = picture.id;
    var menu = document.querySelector('#' + artist + 'Menu');
    var menu1 = menu.querySelector(".menu1");
    var menu2 = menu.querySelector(".menu2");
    var menu3 = menu.querySelector(".menu3");
    var close = menu.querySelector(".close");

    picture.addEventListener('mouseenter',function(){
      var artist = this.id;
      if (artist) {
        var panel = document.querySelector('#' + artist + 'Panel');
        panel.setAttribute('visible','true');
      }
    });

    picture.addEventListener('mouseleave',function(){
      var artist = this.id;
      if (artist) {
        var panel = document.querySelector('#' + artist + 'Panel');
        panel.setAttribute('visible','false');
      }
    });

    picture.addEventListener('click',function(){
      var artist = this.id;
      var menu = document.querySelector('#' + artist + 'Menu');
      if(menu.getAttribute('visible')) return;
      menu.querySelector('.menu1').emit('show');
      menu.querySelector('.menu2').emit('show');
      menu.querySelector('.menu3').emit('show');
      menu.querySelector('.close').emit('show');
      menu.setAttribute('visible','true');
    });

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
  }

  var picture;
  for (var i = 0, pictureNum = pictures.length; i < pictureNum; i++) {
    picture = pictures[i];
    setPictureEvent(picture);
  }
});