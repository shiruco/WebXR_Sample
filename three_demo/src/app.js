import * as THREE from 'three';
import OrbitControls from './modules/OrbitControls';
import DeviceOrientationControls from './modules/DeviceOrientationControls';
import StereoEffect from './modules/StereoEffect';
import Stats from 'stats-js';
import earthImage from './images/earth.jpg';
import moonImage from './images/moon.jpg';
import style from './app.css';

let worldContainer;
let stats, camera, scene, renderer, group, effect, controls, moonMesh, earthMesh;
let stars = [];

function initialize() {
  // create scene
  scene = new THREE.Scene();
  worldContainer = document.getElementById('container');

  // create camera
  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 2000;

  // renderer
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor(0x000000);
  worldContainer.appendChild( renderer.domElement );

  // lights
  const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
  scene.add( ambientLight );

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 1,1,1 );
  scene.add( directionalLight );

  //create moon
  let geometry = new THREE.SphereGeometry(50, 64, 64);
  let material = new THREE.MeshPhongMaterial({
    color: 0xffff99, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
    map: THREE.ImageUtils.loadTexture(moonImage) });
  moonMesh = new THREE.Mesh(geometry, material);
  moonMesh.position.set(camera.position.x + 100,camera.position.y + 100,camera.position.z + 600);
  scene.add(moonMesh);

  //create earth
  geometry = new THREE.SphereGeometry(200, 64, 32);
  material = new THREE.MeshPhongMaterial({
    color: 0xb7c7fc, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
    map: THREE.ImageUtils.loadTexture(earthImage) });
  earthMesh = new THREE.Mesh(geometry, material);
  earthMesh.position.set(camera.position.x,camera.position.y - 280,camera.position.z - 20);
  scene.add(earthMesh);

  //mouse operation
  controls = new OrbitControls(camera);
  controls.target.set(
    camera.position.x - 0.2,
    camera.position.y - 0.5,
    camera.position.z + 1.1
  );
  controls.noPan = true;
  controls.noZoom = true;

  effect = new StereoEffect( renderer );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  worldContainer.appendChild( stats.domElement );

  scene.fog = new THREE.Fog( 0x000000, 600,starAreaSize );

  window.addEventListener( 'resize', resize, false );
  setTimeout(resize, 1);

  createStars();
}

function updateOrientationControls(e) {
  if (!e.alpha) { return; }
  controls = new DeviceOrientationControls(camera, true);
  controls.connect();
  controls.update();
  window.removeEventListener('deviceorientation', updateOrientationControls, true);
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  effect.setSize( width, height );
}

let baseTime = +new Date;
function render() {
  controls.update();
  moonMesh.rotation.y = 0.3 * (+new Date - baseTime) / 5000;
  earthMesh.rotation.y = 0.3 * (+new Date - baseTime) / 8000;

  moonMesh.position.z -= 0.1;
  earthMesh.position.z -= 0.1;
  effect.render( scene, camera );
}

function update() {
  requestAnimationFrame( update );

  //update stars
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
  }

  render();

  stats.update();
}

function createStars() {
  group = new THREE.Group();
  scene.add( group );
  for(let i = 0; i < starNum; i++){
    const star = new Star();
    group.add(star.obj);
    stars.push(star);
  }
}

//stars
const starColors = [ 0xffffff, 0xfdfced, 0xacaa81, 0xf7f2fa ];
const starNum = 350;
const starAreaSize = 13000;

const Star = function() {
  const size = 8;
  this.geometry = new THREE.SphereGeometry( size, size, size );
  this.material = new THREE.MeshPhongMaterial({
    color:starColors[ Math.floor(Math.random() * starColors.length)]
  })
  this.obj = new THREE.Mesh( this.geometry, this.material );
  this.obj.position.x = Math.random() * starAreaSize - starAreaSize / 2;
  this.obj.position.y = Math.random() * starAreaSize - starAreaSize / 2;
  this.obj.position.z = camera.position.z + (Math.random() * starAreaSize * 2 - starAreaSize);
  this.obj.rotation.x = Math.random() * 2 * Math.PI;
  this.obj.rotation.y = Math.random() * 2 * Math.PI;
  this.zSpeed =- Math.random() * 100;
  this.rSpeedX = Math.random() * 0.2 - 0.1;
  this.rSpeedY = Math.random() * 0.2 - 0.1;
}

Star.prototype = {
  update: function() {
    if (this.obj.position.z < camera.position.z - starAreaSize - 1000) {
      this.obj.position.z = camera.position.z+starAreaSize;
      this.obj.position.x = Math.random() * starAreaSize - starAreaSize / 2;
      this.obj.position.y = Math.random() * starAreaSize - starAreaSize / 2;
    }
    this.obj.position.z += this.zSpeed;
    this.obj.rotation.x += this.rSpeedX;
    this.obj.rotation.y += this.rSpeedY;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initialize();
  update();
});

window.addEventListener('deviceorientation', updateOrientationControls, true);