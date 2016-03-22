var mercury, mercuryCenter, mercuryBigSphere;

function initMercury() {

    var size =0.002439;
    var distance = 58;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    mercuryCenter = new THREE.Mesh(geometry, material);
    mainScene.add(mercuryCenter);

    //Venus
     geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/mercury/diff.jpg');
    var bump = loader.load('textures/mercury/bump.jpg');

     material = new THREE.MeshPhongMaterial({
        map: diffuse,
        bumpMap: bump,
        bumpScale: 0.01
    });
    mercury = new THREE.Mesh(geometry, material);
    mercury.position.set(distance/sizeFactor, 0, 0);
    mercuryCenter.add(mercury);

    //Big sphere
     var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
     material = new THREE.MeshBasicMaterial({
      color: 0x88716f
    });
  mercuryBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    mercury.add(mercuryBigSphere);
}
