var neptune, neptuneCenter, neptuneClouds;

function initNeptune() {

    var size = 50.4;
    var distance = 4495;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    neptuneCenter = new THREE.Mesh(geometry, material);
    scene.add(neptuneCenter);

    //Venus
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/neptune/diff.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        shininess: 0.4
    });
    neptune = new THREE.Mesh(geometry, material);
    neptune.position.set(distance/sizeFactor, 0, 0);
    neptuneCenter.add(neptune);
}
