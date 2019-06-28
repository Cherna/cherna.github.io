const THREE = require('three');
const SubDiv = require('three-subdivision-modifier');
// Global Variables
var scene, camera, renderer;

var center = new THREE.Vector3(0, 0, 0);

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// Utility functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
};

// function onDocMouseMove(event) {
//   mouseX = ( event.clientX - windowHalfX ) * 10;
//   mouseY = ( event.clientY - windowHalfY ) * 10;
// }

// INITIALIZATION FUNCTION

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xddeeff, 0, 38);

  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(winWidth, winHeight);
  document.querySelector('.main-content').appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 2000);
  camera.position.set(0, 2, 8);
  // camera.lookAt(center);
  scene.add(camera);

  $(document).on('mousemove', function (event) {
    mouseX = (event.clientX - windowHalfX) * 5;
    mouseY = (event.clientY - windowHalfY) * 5;
  });

  // var axisHelper = new THREE.AxesHelper(5);
  // scene.add( axisHelper );

  // var gridHelper = new THREE.GridHelper(50, 1);
  // gridHelper.setColors('#aaaaaa', '#eeeeee');
  // scene.add( gridHelper );

  var winResWidth = window.innerWidth;
  var winResHeight = window.innerHeight;

  window.addEventListener('resize', function () {
    winResWidth = window.innerWidth;
    winResHeight = window.innerHeight;
    windowHalfX = winResWidth / 2;
    windowHalfY = winResHeight / 2;
    renderer.setSize(winResWidth, winResHeight);
    camera.aspect = winResWidth / winResHeight;
    camera.updateProjectionMatrix();
  });

  var planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 100, 100);
  var planeMaterial = new THREE.MeshStandardMaterial({
    color: '#666',
    metalness: 0.5,
    roughness: 0.95,
  });
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.position.y += -2;
  planeMesh.rotation.x = -0.5 * Math.PI;
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);

  renderer.setClearColor('#ddeeff', 1);

  var light = new THREE.SpotLight(0xff2200, 1, 0);
  light.position.set(-50, 120, 45);
  light.penumbra = 0.5;
  light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 0.5, 200));
  light.castShadow = true;
  light.shadow.mapSize.width = 4000;
  light.shadow.mapSize.height = 4000;
  light.shadow.radius = 1;
  scene.add(light);

  var lightOp = new THREE.SpotLight(0xaaccff, 1, 0);
  lightOp.position.set(50, 20, -35);
  scene.add(lightOp);

  var lightOp2 = new THREE.SpotLight(0x2288ff, 1, 0);
  lightOp2.position.set(30, 20, 40);
  lightOp2.shadow.Darkness = 0.2;
  scene.add(lightOp2);

  var boxSize = 1,
    boxSegments = 5,
    // mainGeometry = new THREE.SphereGeometry(1, 16, 16);
    mainGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize, boxSegments, boxSegments, boxSegments);
  // var texture = THREE.ImageUtils.loadTexture('assets/images/sand-texture-lq.jpg', {}, function() {
  //   renderer.render(scene, camera);
  // });

  var mainMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: 0xcececef,
    wireframe: true
  });

  var mainObject = new THREE.Mesh(mainGeometry, mainMaterial);
  mainObject.name = "mainObject";
  mainObject.castShadow = true;
  scene.add(mainObject);

  function recognizeVertex(objName) {
    var obj = scene.getObjectByName(objName),
      geom = obj.geometry,
      objVertex = geom.vertices,
      objFaces = geom.faces,
      modifiedVertex = [];
    // Avoid warning messages by using an empty texture to populate the UV array
    geom.faceVertexUvs = new THREE.Texture();

    geom.verticesNeedUpdate = true;
    geom.facesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    for (var i in objFaces) {
      var thisFace = objFaces[i],
        // Faces indexes to get vertices
        aF = thisFace.a,
        bF = thisFace.b,
        cF = thisFace.c,
        // Get every vertice that makes up the face
        aV = objVertex[aF],
        bV = objVertex[bF],
        cV = objVertex[cF];


      // Get the face normal
      var faceNormal = thisFace.normal;
      // aV, bV and cV all belong to the same face in every iteration
      // They can be moved safely outwards along the face normal
      // if (i >= 90 && i <= 100) {
      var rInt = randomInt(0, 2),
        rInt2 = randomInt(0, 1);
      // console.log(rInt, rInt2);
      // Three posible cases in which we decide to move one of the three vertices that make up the face
      // Check if the index of this vertex is in the modifiedVertex array
      if (rInt > 0) {
        if (!(modifiedVertex.indexOf(aF) != -1) && !(modifiedVertex.indexOf(bF) != -1) && !(modifiedVertex.indexOf(cF) != -1)) {
          // Then decide if we add or substract that face normal, moving the vertex ouside or inside the geometry
          if (rInt2 > 0) {
            var thisRanAdd = randomFloat(0, 1);
            aV.add(faceNormal.multiplyScalar(thisRanAdd));
            bV.add(faceNormal.multiplyScalar(thisRanAdd));
            cV.add(faceNormal.multiplyScalar(thisRanAdd));
          } else {
            // var thisRanSub = randomFloat(0, 1);
            //     thisRanSub2 = randomFloat(0, 0.5);
            // aV.sub(faceNormal.multiplyScalar(thisRanSub*thisRanSub2));
            // bV.sub(faceNormal.multiplyScalar(thisRanSub));
            // cV.sub(faceNormal.multiplyScalar(thisRanSub));
          }
          // Then push that vertex index to the modifiedVertex array to
          // keep track of the vertex already moved (thus preventing weird stuff?)
          modifiedVertex.push(aF);
          modifiedVertex.push(bF);
          modifiedVertex.push(cF);
        } else {
          // console.log('one of the vertex already modified');
        }
      } else {
        // console.log('not modifying, rolled 0');
      }
    }
    // console.log(modifiedVertex);
    var modifier = new SubDiv(3);
    modifier.modify(geom);
    geom.mergeVertices();
    geom.computeFaceNormals();
    geom.computeVertexNormals();
  }

  recognizeVertex('mainObject');

  var facesNormals = new THREE.FaceNormalsHelper(mainObject, 0.2, 0xff0000, 0.2);
  // var vertexNormals = new THREE.VertexNormalsHelper(mainObject, 0.2, 0x000000, 0.2);
  facesNormals.name = 'facesNormals';
  // scene.add(facesNormals);
  // scene.add(vertexNormals);
};

function animate(ts) {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  camera.position.x = (mouseX - camera.position.x) * 0.003;
  camera.position.y = Math.max((- mouseY - camera.position.y) * 0.001, -1.9);
  // Only print camera position whenever the time-stamp is divisible by 24
  if (!(Math.floor(ts) % 24)) {
    console.log(Math.floor(ts) % 24, camera.position.x, camera.position.y);
  }
  camera.lookAt(center);

  scene.getObjectByName('mainObject').rotation.y += 0.003;
  scene.getObjectByName('mainObject').rotation.x += 0.001;
  scene.getObjectByName('mainObject').rotation.z += 0.002;
}

init();
animate();