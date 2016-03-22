var container;
var clock = new THREE.Clock();

var camera, cubeCamera;
var scene, mainScene, boxScene, renderer, composer;
var marble, innerMarble, marbleIsClicked = false;

var raycaster;

var mouse;
var lat = 0,
    phi = 0,
    theta = 0,
    lon = 0;
var width = window.innerWidth || 2;
var height = window.innerHeight || 2;

var windowHalfX = width / 2;
var windowHalfY = height / 2;

var speedFactor = 1;
var sizeFactor = 1;

//Access with planet_parameters.mercury_.size
var planet_parameters = {
  mercury_ : {size: 0.002439, distance: 58},
  venus_ : {size: 0.006056, distance: 108},
  earth_ : {size: 0.006367, distance: 150},
  mars_ : {size: 0.003386, distance: 228},
  jupiter_ : {size: 0.0654173, distance: 778},
  saturn_ : {size: 0.077316, distance: 1433},
  uranus_ : {size: 0.025266, distance: 2872},
  neptune_ : {size: 0.024552, distance: 4495},
};

init();


function init() {
    container = document.getElementById('container');

    //Camera FOV WAS 35!!!!!!
    camera = new THREE.PerspectiveCamera(75, windowHalfX / windowHalfY, 0.0001, 30000);

    sizeFactor = 1;
    //Scene
    scene = new THREE.Scene();
    mainScene = new THREE.Scene();


    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    renderer.autoClear = false;

    //Raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    //Lights
    var light = new THREE.PointLight(0xf0f0f0, 1);
    light.position.set(0, 0, 0);
    mainScene.add(light);

    var light2 = new THREE.AmbientLight(0x0c0c0c, 1);
    light2.position.set(0, 0, 0);
    mainScene.add(light2);

    //InitPlanets
    initSun();
    initStars();
    initEarth();
    initMars();
    initVenus();
    initMercury();
    initJupiter();
    initSaturn();
    initUranus();
    initNeptune();

    camera.position.set(0, 0, 0);

    camera.target = sun.position.clone();

    //Init Renderpasses
    var renderModel = new THREE.RenderPass(scene, camera);
    var effectBloom = new THREE.BloomPass(0.3, 25, 20, 256);
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
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    document.addEventListener('DOMMOuseScroll', onDocumentMouseWheel, false);



    initMarbleScene();
    animate();
}

function initMarbleScene() {
    boxScene = new THREE.Scene();
    var textureLoader = new THREE.TextureLoader();

    texture = textureLoader.load('textures/2294472375_24a3b8ef46_o.jpg');

    texture.mapping = THREE.UVMapping;
    var mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
    mesh.scale.x = -1;
    boxScene.add(mesh);
    scene.add(boxScene);

    //CubeCamera
    cubeCamera = new THREE.CubeCamera(1, 1000, 256);
    cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    boxScene.add(cubeCamera);

    var loader = new THREE.TextureLoader();
    starTexture = loader.load('textures/starmap.jpg');
    starTexture.wrapS = THREE.RepeatWrapping;
    starTexture.wrapT = THREE.RepeatWrapping;
    starTexture.repeat.set(0.33, 0.33);

    //Marble
    var material = new THREE.MeshBasicMaterial({ map: starTexture, envMap: cubeCamera.renderTarget, reflectivity: 0.5 });
    marble = new THREE.Mesh(new THREE.SphereGeometry(15, 30, 30), material);
    marble.position.set(0,15,0);
    boxScene.add(marble);

    //innerMarble
    material = new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x000000});
    innerMarble = new THREE.Mesh(new THREE.SphereGeometry(13, 30, 30), material);
    marble.add(innerMarble);



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
    TWEEN.update();


    if (marbleIsClicked === false) {
        var delta = 5 * clock.getDelta();
        lon += 0.15;
        lat = Math.max(-85, Math.min(85, lat));
        phi = THREE.Math.degToRad(90 - lat);
        theta = THREE.Math.degToRad(lon);

        uniforms.time.value += 0.2 * delta;

        //PlanetRotations
        sun.rotation.y += 0.025 * delta;
        //earth.rotation.y += 0.4 * delta;

        camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
        camera.position.y = 100 * Math.cos(phi);
        camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);

        marble.visible = false; // *cough*
        innerMarble.visible = false;
        cubeCamera.updateCubeMap(renderer, scene);
        innerMarble.visible = true;
        marble.visible = true; // *cough*
    }
    //earthCenter.rotation.z -= 0.107 * speedFactor * delta;
    //marsCenter.rotation.z -= 0.086 * speedFactor * delta;
    //venusCenter.rotation.z -= 0.126 * speedFactor * delta;
    //mercuryCenter.rotation.z -= 0.172 * speedFactor * delta;
    //jupiterCenter.rotation.z -= 0.047 * speedFactor * delta;
    //saturnCenter.rotation.z -= 0.034 * speedFactor * delta;
    //uranusCenter.rotation.z -= 0.024 * speedFactor * delta;
    //neptuneCenter.rotation.z -= 0.019 * speedFactor * delta;


    //CameraPosition via mouse position
    camera.lookAt(camera.target);
    camera.updateProjectionMatrix();
    renderer.clear();
    composer.render(0.01);
}

function removeBigPlanets() {
    earth.remove(earthBigSphere);
    mars.remove(marsBigSphere);
    saturn.remove(saturnBigSphere);
    mercury.remove(mercuryBigSphere);
    venus.remove(venusBigSphere);
    jupiter.remove(jupiterBigSphere);
    mercury.remove(mercuryBigSphere);
    saturn.remove(saturnBigSphere);
    uranus.remove(uranusBigSphere);
    neptune.remove(neptuneBigSphere);
    sun.remove(sunBigSphere);

}

function addBigPlanets() {
    earth.add(earthBigSphere);
    mars.add(marsBigSphere);
    saturn.add(saturnBigSphere);
    mercury.add(mercuryBigSphere);
    venus.add(venusBigSphere);
    jupiter.add(jupiterBigSphere);
    mercury.add(mercuryBigSphere);
    saturn.add(saturnBigSphere);
    uranus.add(uranusBigSphere);
    neptune.add(neptuneBigSphere);
}

$('#mercury').mouseenter(function () {
  mercuryBigSphere.add(mercuryBigGlow);
})
.mouseleave(function () {
  mercuryBigSphere.remove(mercuryBigGlow);
});
function flyToPlanet(planet, planetCenter) {
    removeBigPlanets();
    planetCenter.updateMatrixWorld();
    mainScene.updateMatrixWorld();
    planet.updateMatrixWorld();
    var vector = new THREE.Vector3();
    vector.setFromMatrixPosition(planet.matrixWorld);

    var tween = new TWEEN.Tween(camera.position).to({
            x: vector.x + 0.02,
            y: vector.y + 0.02,
            z: vector.z + 0.02
        }, 9000)
        .easing(TWEEN.Easing.Quintic.InOut)
        .onComplete(function() {})
        .start();

    var tweenTarget = new TWEEN.Tween(camera.target).to({
            x: vector.x,
            y: vector.y,
            z: vector.z
        }, 8000)
        .easing(TWEEN.Easing.Quintic.InOut)
        .start();
    console.log(vector);
}

function onDocumentTouchStart(event) {
    event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    onDocumentMouseDown(event);
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([marble], true);
    if (intersects.length > 0) {
        console.log("hellooo");
        marbleClicked();
    }
}

function marbleClicked() {
    marbleIsClicked = true;
    $("#pcontainer").empty();
    var tween = new TWEEN.Tween(camera.position).to({
            x: 0,
            y: 15,
            z: 0
        }, 1000)
        .easing(TWEEN.Easing.Quintic.In)
        .onComplete(function() {

            camera.position.set(0, 0, 5000);
            scene.remove(boxScene);
            scene.add(mainScene);
            $('#navigation').load("content/navigation.html");
        })
        .start();
}


function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentMouseWheel(event) {

    event = window.event || event;
    if ((event.wheelDelta < 0 && camera.position.z > 800 && event.wheelDelta + camera.position.z > 800) || (event.wheelDelta > 0 && camera.position.z < 10000 && event.wheelDelta + camera.position.z < 10000)) {
        camera.position.z += event.wheelDelta;
    }

}
