var venus, venusCenter, venusClouds;

function initVenus() {

    var size = 12103;
    var distance = 1.08;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    venusCenter = new THREE.Mesh(geometry, material);
    scene.add(venusCenter);

    //Venus
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/venus/diff.jpg');
    var bump = loader.load('textures/venus/bump.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        bumpMap: bump,
        bumpScale: 0.01
    });
    venus = new THREE.Mesh(geometry, material);
    venus.position.set(distance/sizeFactor, 0, 0);
    venusCenter.add(venus);
}
