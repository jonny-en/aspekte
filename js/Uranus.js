var uranus, uranusCenter, uranusBigSphere;

function initUranus() {

    var size = 0.025266;
    var distance = 2872;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    uranusCenter = new THREE.Mesh(geometry, material);
    mainScene.add(uranusCenter);

    //Venus
     geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/uranus/diff.jpg');

     material = new THREE.MeshPhongMaterial({
        map: diffuse,
        shininess: 0.4
    });
    uranus = new THREE.Mesh(geometry, material);
    uranus.position.set(distance/sizeFactor, 0, 0);
    uranusCenter.add(uranus);

    //Big sphere
     var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
     material = new THREE.MeshBasicMaterial({
      color: 0x67d4e7
    });
  uranusBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    uranus.add(uranusBigSphere);
}
