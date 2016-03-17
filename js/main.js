var container, stats;

var clock = new THREE.Clock();

var camera, scene, renderer, composer;

var mouseX = 0,
    mouseY = 0,
    lat = 0,
    lon = 0,
    phy = 0,
    theta = 0;

var width = window.innerWidth || 2;
var height = window.innerHeight || 2;

var windowHalfX = width / 2;
var windowHalfY = height / 2;

var sizeFactor = 1;
var speedFactor = 1;



init();
animate();

function init() {
    container = document.getElementById('container');

    //Camera
    camera = new THREE.PerspectiveCamera(35, windowHalfX / windowHalfY, 1, 10000);


    //Scene
    scene = new THREE.Scene();

    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    renderer.autoClear = false;

    //Lights
    var light = new THREE.PointLight(0xf0f0f0, 1);
    light.position.set(0, 0, 0);
    scene.add(light);

      var light2 = new THREE.AmbientLight(0x0c0c0c, 1);
    light2.position.set(0, 0, 0);
    scene.add(light2);

    //InitPlanets
    initSun();
    //initStars();
    initEarth();
  initMars();
   initVenus();
   initMercury();
   initJupiter();
 initSaturn();
   initUranus();
  initNeptune();

    camera.position.set(1433+1,2,0);
//  camera.lookAt = scene.position;
   camera.target = saturn.position;

    //Init Renderpasses
    var renderModel = new THREE.RenderPass(scene, camera);
    var effectBloom = new THREE.BloomPass(1.2, 25, 20, 256);
    var effectFilm = new THREE.FilmPass(0.0, 0.0, 2048, false);
    effectFilm.renderToScreen = true;
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderModel);
    composer.addPass(effectBloom);
    composer.addPass(effectFilm);

    //Window Resize
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
    //Event Listener
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

}

function onWindowResize(event) {
    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    composer.reset();
}
//

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = 5 * clock.getDelta();

    uniforms.time.value += 0.2 * delta;

    //PlanetRotations
   sun.rotation.y += 0.025 * delta;
//earth.rotation.y += 0.4 * delta;


  //earthCenter.rotation.y -= 0.107 * speedFactor * delta;
  // marsCenter.rotation.y -= 0.086 * speedFactor * delta;
  // venusCenter.rotation.y -= 0.126 * speedFactor * delta;
  // mercuryCenter.rotation.y -= 0.172 * speedFactor * delta;
  // jupiterCenter.rotation.y -= 0.047 * speedFactor * delta;
  //  saturnCenter.rotation.y -= 0.034 * speedFactor * delta;
//  uranusCenter.rotation.y -= 0.024 * speedFactor * delta;
  // neptuneCenter.rotation.y -= 0.019 * speedFactor * delta;


    //CameraPosition = MousePosition
  camera.position.x = camera.target.x + (mouseX * 3);
    camera.position.z = camera.target.y + (mouseY * 2);
    camera.lookAt(camera.target);
    camera.updateProjectionMatrix();
    renderer.clear();
    composer.render(0.01);
}

function onDocumentTouchStart(event) {
    event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    onDocumentMouseDown(event);
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentMouseMove(event) {
    event.preventDefault();

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}
