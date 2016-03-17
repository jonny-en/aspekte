var mars, marsCenter, marsBigSphere;

function initMars() {

    var size = 0.003386;
    var distance = 228;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    marsCenter = new THREE.Mesh(geometry, material);
    scene.add(marsCenter);

    //Mars
     geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/mars/diff.jpg');
    var normal = loader.load('textures/mars/normal.jpg');

     material = new THREE.MeshPhongMaterial({
        map: diffuse,
        normalMap: normal
    });
    mars = new THREE.Mesh(geometry, material);
    mars.position.set(distance/sizeFactor, 0, 0);
    marsCenter.add(mars);

    //Big sphere
     var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
     material = new THREE.MeshBasicMaterial({
      color: 0xaf241f
    });
  marsBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    mars.add(marsBigSphere);
}
