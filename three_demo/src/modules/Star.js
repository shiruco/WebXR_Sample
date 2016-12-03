import THREE from 'three';

var starColors=[
  0xffffff,
  0xfdfced,
  0xacaa81,
  0xf7f2fa
];

var starNum=300;
var starSizeBase=100;
var starSizeRnd=300;
var starAreaSize=12000;

var Star = function(camera){
  var size = 10;
  this.geometry = new THREE.SphereGeometry( size, size, size );
  this.material = new THREE.MeshPhongMaterial({color:starColors[Math.floor(Math.random()*starColors.length)]});
  this.obj = new THREE.Mesh( this.geometry, this.material );
  this.obj.position.x = Math.random()*starAreaSize-starAreaSize/2;
  this.obj.position.y = Math.random()*starAreaSize-starAreaSize/2;
  this.obj.position.z = camera.position.z+(Math.random()*starAreaSize*2-starAreaSize);
  this.obj.rotation.x = Math.random()*2*Math.PI;
  this.obj.rotation.y = Math.random()*2*Math.PI;
  this.zSpeed =- (Math.random()*100);
  this.rSpeedX = Math.random()*0.2-0.1;
  this.rSpeedY = Math.random()*0.2-0.1;
}

Star.prototype = {
  update: function(camera){
    if (this.obj.position.z<camera.position.z-starAreaSize-1000) {
      this.obj.position.z=camera.position.z+starAreaSize;
      this.obj.position.x=Math.random()*starAreaSize-starAreaSize/2;
      this.obj.position.y=Math.random()*starAreaSize-starAreaSize/2;
    }
    this.obj.position.z+=this.zSpeed;
    this.obj.rotation.x+=this.rSpeedX;
    this.obj.rotation.y+=this.rSpeedY;
  }
}

module.exports = Star