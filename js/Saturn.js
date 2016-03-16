var saturn, saturnCenter, saturnClouds;

function initSaturn() {

    var size = 114632;
    var distance = 14.33;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    saturnCenter = new THREE.Mesh(geometry, material);
    scene.add(saturnCenter);

    //Venus
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/saturn/diff.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        shininess: 0.4
    });
    saturn = new THREE.Mesh(geometry, material);
    saturn.position.set(distance/sizeFactor, 0, 0);
    saturnCenter.add(saturn);
}
