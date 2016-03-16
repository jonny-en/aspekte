var mercury, mercuryCenter, mercuryClouds;

function initMercury() {

    var size = 4879;
    var distance = 0.58;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    mercuryCenter = new THREE.Mesh(geometry, material);
    scene.add(mercuryCenter);

    //Venus
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/mercury/diff.jpg');
    var bump = loader.load('textures/mercury/bump.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        bumpMap: bump,
        bumpScale: 0.01
    });
    mercury = new THREE.Mesh(geometry, material);
    mercury.position.set(distance/sizeFactor, 0, 0);
    mercuryCenter.add(mercury);
}
