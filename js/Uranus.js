var uranus, uranusCenter, uranusClouds;

function initUranus() {

    var size = 50532;
    var distance = 28.72;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    uranusCenter = new THREE.Mesh(geometry, material);
    scene.add(uranusCenter);

    //Venus
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/uranus/diff.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        shininess: 0.4
    });
    uranus = new THREE.Mesh(geometry, material);
    uranus.position.set(distance/sizeFactor, 0, 0);
    uranusCenter.add(uranus);
}
