var jupiter, jupiterCenter, jupiterClouds;

function initJupiter() {

    var size = 138346;
    var distance = 7.78;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    jupiterCenter = new THREE.Mesh(geometry, material);
    scene.add(jupiterCenter);

    //Venus
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/jupiter/diff.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        shininess: 0.4
    });
    jupiter = new THREE.Mesh(geometry, material);
    jupiter.position.set(distance/sizeFactor, 0, 0);
    jupiterCenter.add(jupiter);
}
