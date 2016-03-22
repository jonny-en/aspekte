var jupiter, jupiterCenter, jupiterBigSphere;

function initJupiter() {

    var size = 0.0654173;
    var distance = 778;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    jupiterCenter = new THREE.Mesh(geometry, material);
    mainScene.add(jupiterCenter);

    //Venus
     geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/jupiter/diff.jpg');

     material = new THREE.MeshPhongMaterial({
        map: diffuse,
        shininess: 0.4
    });
    jupiter = new THREE.Mesh(geometry, material);
    jupiter.position.set(distance/sizeFactor, 0, 0);
    jupiterCenter.add(jupiter);

    //Big sphere
     var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
     material = new THREE.MeshBasicMaterial({
      color: 0xb1968a
    });
  jupiterBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    jupiter.add(jupiterBigSphere);
}
