const THREE = require('three');
const Orbit = require('three-orbit-controls')(THREE);
const SubDiv = require('three-subdivision-modifier');
// Global Variables
var scene, camera, renderer, controls;

// Utility functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
};

// INITIALIZATION FUNCTION

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x59472b);
  scene.fog = new THREE.Fog( 0x59472b, 0, 40 );

  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(winWidth, winHeight);
  document.querySelector('.main-content').appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 20000);
  camera.position.set(5, 7, 5);
  camera.lookAt(new THREE.Vector2(0,0));
  scene.add(camera);

  controls = new Orbit(camera, renderer.domElement);

  var axisHelper = new THREE.AxesHelper( 5 );
  // scene.add( axisHelper );

  var gridHelper = new THREE.GridHelper( 50, 1, '#aaaaaa', '#eeeeee');
  // scene.add( gridHelper );

  var winResWidth = window.innerWidth;
  var winResHeight = window.innerHeight;

  window.addEventListener('resize', function() {
    winResWidth = window.innerWidth;
    winResHeight = window.innerHeight;
    renderer.setSize(winResWidth, winResHeight);
    camera.aspect = winResWidth / winResHeight;
    camera.updateProjectionMatrix();
  });

  var planeGeometry = new THREE.PlaneBufferGeometry( 50, 50, 100, 100 );
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: '#aeaeae',
    side: THREE.DoubleSide
  });
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.position.y += -2;
  planeMesh.rotation.x = -0.5*Math.PI;
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);

  renderer.setClearColor('#ffffff', 1);

  var light = new THREE.SpotLight(0xff2200, 1, 0);
  light.position.set(-50, 120, 45);
  light.penumbra = 0.5;
  light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, winResWidth / winResHeight, 20, 200 ) );
  light.castShadow = true;
  light.shadow.mapSize.width = 4000;
  light.shadow.mapSize.height = 4000;
  light.shadow.radius = 1;
  scene.add(light);

  console.log(light.shadow);

  var lightOp = new THREE.SpotLight(0xaaccff, 1, 0);
  lightOp.position.set(50, 20, -35);
  // lightOp.castShadow = true;
  // lightOp.shadow.bias = 0.0001;
  // lightOp.shadow.mapSize.width = 2048;
  // lightOp.shadow.mapSize.height = 2048;
  scene.add(lightOp);

  var lightOp2 = new THREE.SpotLight(0x2288ff, 1, 0);
  lightOp2.position.set(30, 20, 40);
  // lightOp2.castShadow = true;
  // lightOp2.shadow.bias = 0.0001;
  // lightOp2.shadow.mapSize.width = 2048;
  // lightOp2.shadow.mapSize.height = 2048;
  scene.add(lightOp2);

  var boxSize = 1,
      boxSegments = 4,
      // mainGeometry = new THREE.SphereGeometry(1, 16, 16);
      mainGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize, boxSegments, boxSegments, boxSegments);

  var mainMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: 0xcececef
  });

  var mainObject = new THREE.Mesh(mainGeometry, mainMaterial);
  mainObject.name = "mainObject";
  mainObject.castShadow = true;

  function recognizeVertex(objName) {
    var obj = scene.getObjectByName(objName),
        geom = obj.geometry,
        objVertex = geom.vertices,
        objFaces = geom.faces,
        modifiedVertex = [];

    geom.verticesNeedUpdate = true;
    geom.facesNeedUpdate = true;
    geom.uvsNeedUpdate = true;

    for (var i in objFaces) {
      var thisFace = objFaces[i],
        // Faces indexes to get vertices
          aF = thisFace.a,
          bF = thisFace.b,
          cF = thisFace.c,
        // Get every vertex that makes up the face
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
      if (rInt == 0) {
        // console.log('move aV', !(modifiedVertex.indexOf(aF) != -1));
        // Check if the index of this vertex is in the modifiedVertex array
        if (!(modifiedVertex.indexOf(aF) != -1)) {
          // Then decide if we add or substract that face normal, moving the vertex ouside or inside the geometry
          if (rInt2 > 0) {
            aV.add(faceNormal.multiplyScalar(0.5));
          } else {
            aV.sub(faceNormal.multiplyScalar(0.1));
          }
          // Then push that vertex index to the modifiedVertex array to
          // keep track of the vertex already moved (thus preventing weird stuff?)
          modifiedVertex.push(aF);
        } else {
          // console.log('aV already modified');
        }
      } else if (rInt == 1) {
        // console.log('move bV', !(modifiedVertex.indexOf(bF) != -1));
        if (!(modifiedVertex.indexOf(bF) != -1)) {
          if (rInt2 > 0) {
            bV.add(faceNormal.multiplyScalar(0.5));
          } else {
            bV.sub(faceNormal.multiplyScalar(0.1));
          }
          modifiedVertex.push(bF);
        } else {
          // console.log('bV already modified');
        }
      } else {
        // console.log('move cV', !(modifiedVertex.indexOf(cF) != -1));
        if (!(modifiedVertex.indexOf(cF) != -1)) {
          if (rInt2 > 0) {
            cV.add(faceNormal.multiplyScalar(0.1));
          } else {
            cV.sub(faceNormal.multiplyScalar(0.1));
          }
          modifiedVertex.push(cF);
        } else {
          // console.log('cV already modified');
        }
      }
    }
    // console.log(modifiedVertex);
    var modifier = new SubDiv( 2 );
    modifier.modify(geom);
    geom.mergeVertices();
    geom.computeFaceNormals();
    geom.computeVertexNormals();
  }

  scene.add(mainObject);

  recognizeVertex('mainObject');

  var facesNormals = new THREE.FaceNormalsHelper(mainObject, 0.2, 0xff0000, 0.2);
  var vertexNormals = new THREE.VertexNormalsHelper(mainObject, 0.2, 0x000000, 0.2);
  var wireframe = new THREE.WireframeGeometry(mainObject);
  facesNormals.name = 'facesNormals';
  // scene.add(facesNormals);
  // scene.add(wireframe);
  // scene.add(vertexNormals);
};

function animate(ts) {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();

  scene.getObjectByName('mainObject').rotation.y += 0.003;
  scene.getObjectByName('mainObject').rotation.x += 0.001;
  scene.getObjectByName('mainObject').rotation.z += 0.002;

}

init();
animate();