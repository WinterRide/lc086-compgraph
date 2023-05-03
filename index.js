import * as THREE from './three.js/build/three.module.js'
import * as ORBIT from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const camera2 = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer({
        antialias : true
      });
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      const controls = new ORBIT.OrbitControls( camera, renderer.domElement );
      const controls2 = new ORBIT.OrbitControls( camera2, renderer.domElement );
      controls.enableDamping = true;
      controls2.enableDamping = true;

      controls.panSpeed = 2;
      controls.rotateSpeed = 2;
      controls.maxDistance = 100;

      controls2.panSpeed = 2;
      controls2.rotateSpeed = 2;
      controls2.minDistance = 50;
      controls2.maxDistance = 100;

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight)

    let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
    directionalLight.intensity = 1;
    directionalLight.castShadow = true;
    directionalLight.position.set(40, 50, 50);

    let directionalHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(directionalLight);
    // scene.add(directionalHelper);

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;

    const sunGeometry = new THREE.IcosahedronGeometry(1, 15);
    const sunMaterial = new THREE.MeshBasicMaterial( { color: 0xFDB813 } );
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(40, 50, 50);
    sun.castShadow = true;
    scene.add(sun);

    const planeGeometry = new THREE.PlaneGeometry( 100, 100, 10, 10 );
    const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xc2c5cc, side: THREE.DoubleSide } );
    var textureLoader = new THREE.TextureLoader();
        textureLoader.load( './Assets/8k_moon.jpg', function ( texture ) {
        planeMaterial.map = texture; // assign the loaded texture to the material's map property
        planeMaterial.needsUpdate = true; // update the material to reflect the changes
        });
      planeMaterial.receiveShadow = true;
      const plane = new THREE.Mesh( planeGeometry, planeMaterial );
      plane.rotation.x = Math.PI / 2;
      plane.receiveShadow = true;
      scene.add( plane );
      
      const rocket = new THREE.Group();
      rocket.castShadow = true;

      const bodyGeometry = new THREE.CylinderGeometry( 1, 1, 3.5, 32 );
      const bodyMaterial = new THREE.MeshBasicMaterial( { color: 0xB9B9B9 } );
      bodyMaterial.castShadow = true;
      const body = new THREE.Mesh( bodyGeometry, bodyMaterial );
      body.position.y = 3;
      body.castShadow = true;
      rocket.add( body );

      const tipGeometry = new THREE.ConeGeometry(1, 1, 32, 5);
      tipGeometry.radiusTop = 10;
      const tipMaterial = new THREE.MeshBasicMaterial( { color: 0x787878 } );
      tipMaterial.castShadow = true;
      const tip = new THREE.Mesh( tipGeometry, tipMaterial );
      tip.position.y = 5.25;
      tip.castShadow = true;
      rocket.add( tip );

      const thrusterGeometry = new THREE.CylinderGeometry( 0.7, 0.5, 0.5, 32);
      const thrusterMaterial = new THREE.MeshBasicMaterial( { color: 0x787878 } );
      thrusterMaterial.castShadow = true;
      const thruster = new THREE.Mesh( thrusterGeometry, thrusterMaterial );
      thruster.position.y = 1;
      thruster.castShadow = true;
      rocket.add( thruster );

      const wing = new THREE.Group();

      const wingGeo1 = new THREE.BoxGeometry(0.5, 2);
      const wingMaterial1 = new THREE.MeshMatcapMaterial({ color: 0x6f0000 });
      wingMaterial1.castShadow = true;
      const wing1 = new THREE.Mesh(wingGeo1, wingMaterial1);
      wing1.rotation.x = Math.PI;
      wing1.position.set(1,1,0);
      wing1.castShadow = true;
      wing.add(wing1);

      const wing2 = new THREE.Mesh(wingGeo1, wingMaterial1);
      wing2.rotation.x = Math.PI;
      wing2.position.set(-1,1,0);
      wing2.castShadow = true;
      wing.add(wing2);

      const wing3 = new THREE.Mesh(wingGeo1, wingMaterial1);
      wing3.rotation.y = Math.PI/2;
      wing3.position.set(0,1,1);
      wing3.castShadow = true;
      wing.add(wing3);

      const wing4 = new THREE.Mesh(wingGeo1, wingMaterial1);
      wing4.rotation.y = Math.PI/2;
      wing4.position.set(0,1,-1);
      wing4.castShadow = true;
      wing.add(wing4);

      const windowGeo = new THREE.IcosahedronGeometry(1, 1);
      const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x787878 });
      windowMaterial.receiveShadow = true;
      const windows = new THREE.Mesh(windowGeo, windowMaterial);
      windows.position.set(0,3.5,-0.3);
      window.castShadow = true;
      rocket.add(wing);
      rocket.add(windows);
      scene.add( rocket );


let boxMaterialArr = [
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox1/1.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox1/2.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox1/3.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox1/4.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox1/5.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox1/6.png'),
        side : THREE.DoubleSide
    }),
]

let boxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
let skyBox = new THREE.Mesh(boxGeo, boxMaterialArr);
scene.add(skyBox);

// Camera position
camera.position.set(-2, 1, -10) // x, y, z
camera.lookAt(0, 0, 0);

camera2.position.set(40, 50, -100) // x, y, z
camera2.lookAt(0, 0, 0);

const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", switchCamera);

function switchCamera() {
  if (currentCamera === camera2) {
    currentCamera = camera;
  } else {
    currentCamera = camera2;
  }
  controls.object = currentCamera;
}

// Raycast
var currentCamera = camera2; // start with camera1
var raycast = new THREE.Raycaster();
var pointer = new THREE.Vector2();

window.addEventListener("pointerdown", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycast.setFromCamera(pointer, currentCamera);

    let intersects = raycast.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++){
        console.log(intersects[i]);
        rocket.position.y += 1
    }
})

// 3d model

const loader = new GLTFLoader().load('./Assets/venus_planet_bedside_lamp/scene.gltf', (object) => {
    let model = object.scene;
    model.scale.set(500, 500, 100);
    model.position.set(0,-50,75);
    scene.add(model);
})



// Renderer
function render() {
    requestAnimationFrame( render );
    controls.update();
    controls2.update();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.render( scene, currentCamera );
}

render();