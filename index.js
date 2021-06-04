import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//import { Mesh } from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setX(-300);
camera.position.setZ(-30);
renderer.render(scene, camera);
//controls
const controls = new OrbitControls( camera, renderer.domElement );//listens to dom events on mouse and update the camera postion accordingly
//background
const spaceTexture = new THREE.TextureLoader().load('textures/space.jpg');
scene.background = spaceTexture;
//grid helper
// const gridHelper = new THREE.GridHelper(1000,100);//to get the grid
// scene.add(gridHelper);
//stars / space objects
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshBasicMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry, material);
    //now we need to place the stars at different positions
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));//randFloatSpread(value) of Three will generate random nos b/w -value to +value
    star.position.set(x,y,z);
    scene.add(star)
}
Array(200).fill().forEach(addStar);// as we want 200 stars
//lighting
const pointLight = new THREE.PointLight(0xffffff, 1.5);//MeshBasicMaterial doesnot react to light
pointLight.position.set(0,0,0);
//const lightHelper = new THREE.PointLightHelper(pointLight);//remove later
scene.add(pointLight);

//planets
const sun = new THREE.Mesh( 
    new THREE.SphereGeometry( 50, 32, 32 ),
    new THREE.MeshBasicMaterial( {
        map:new THREE.TextureLoader().load('textures/sun.jpg'),
    }) 
);
scene.add( sun );
const mercury = new THREE.Mesh( 
    new THREE.SphereGeometry( 8, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/mercury.jpg'),
    }) 
);
mercury.position.z=80;
scene.add( mercury );
const venus = new THREE.Mesh( 
    new THREE.SphereGeometry( 13, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/venus.jpg'),
    }) 
);
venus.position.z=118;
scene.add( venus );
const earth = new THREE.Mesh( 
    new THREE.SphereGeometry( 14, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/earth.jpg'),
    }) 
);
earth.position.z=160;
scene.add( earth );
const mars = new THREE.Mesh( 
    new THREE.SphereGeometry( 9, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/mars.jpg'),
    }) 
);
mars.position.z=200;
scene.add( mars );
const jupiter = new THREE.Mesh( 
    new THREE.SphereGeometry( 22, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/jupiter.jpg'),
    }) 
);
jupiter.position.z=260;
scene.add( jupiter );
const saturn_ring = new THREE.Mesh(
    new THREE.RingGeometry( 25, 35, 32 ),
    new THREE.MeshBasicMaterial( {
        map:new THREE.TextureLoader().load('textures/saturn_ring.png'),
    })
);
saturn_ring.position.z=328;
saturn_ring.rotateX(-90);
scene.add( saturn_ring );
const saturn = new THREE.Mesh( 
    new THREE.SphereGeometry( 19, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/saturn.jpg'),
    }) 
);
saturn.position.z=328;
scene.add( saturn );
const uranus = new THREE.Mesh( 
    new THREE.SphereGeometry( 15, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/uranus.jpg'),
    }) 
);
uranus.position.z=375;
scene.add( uranus );
const neptune = new THREE.Mesh( 
    new THREE.SphereGeometry( 14, 32, 32 ),
    new THREE.MeshStandardMaterial( {
        map:new THREE.TextureLoader().load('textures/neptune.jpg'),
    }) 
);
neptune.position.z=415;
scene.add( neptune );

function revolve(obj,dist,speed){//this is how you revolve around
    obj.position.x = dist*Math.cos(speed) + 0;//for moving them in circular motion
    obj.position.z = dist*Math.sin(speed) + 0;
}
var arr = [0,0,0,0,0,0,0,0];
const animate = function () {
    requestAnimationFrame( animate );//a mechanism that tells the browser u want to perform an animation
    sun.rotation.y -= 0.001
    mercury.rotation.y += 0.01;
    venus.rotation.y += 0.01;
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.01;
    jupiter.rotation.y += 0.01;
    saturn_ring.rotation.z += 0.003;
    saturn.rotation.y += 0.01;
    uranus.rotation.y += 0.01;
    neptune.rotation.y += 0.01;

    for(let i=0;i<arr.length;i++){//this takes care of speed, like for i=3, arr[3]=0.001*(8-3)
        arr[i]+=0.001*(arr.length-i);
    }

    revolve(mercury,90,arr[0]);
    revolve(venus,130,arr[1]);
    revolve(earth,170,arr[2])
    revolve(mars,210,arr[3]);
    revolve(jupiter,270,arr[4]);
    revolve(saturn,350,arr[5]);
    revolve(saturn_ring,350,arr[5]);
    revolve(uranus,420,arr[6]);
    revolve(neptune,470,arr[7]);

    controls.update();//to make sure changes are reflected
    renderer.render( scene, camera );
};
animate();