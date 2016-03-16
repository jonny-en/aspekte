var mars, marsCenter, marsClouds;

function initMars() {

    var size = 6772;
    var distance = 2.28;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    marsCenter = new THREE.Mesh(geometry, material);
    scene.add(marsCenter);

    //Mars
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/mars/diff.jpg');
    var normal = loader.load('textures/mars/normal.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        normalMap: normal
    });
    mars = new THREE.Mesh(geometry, material);
    mars.position.set(distance/sizeFactor, 0, 0);
    marsCenter.add(mars);
}
