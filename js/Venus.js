var venus, venusCenter, venusBigSphere;

function initVenus() {

    var size = planet_parameters.venus_.size;
    var distance = planet_parameters.venus_.distance;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    venusCenter = new THREE.Mesh(geometry, material);
    mainScene.add(venusCenter);

    //Venus
     geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/venus/diff.jpg');
    var bump = loader.load('textures/venus/bump.jpg');

     material = new THREE.MeshPhongMaterial({
        map: diffuse,
        bumpMap: bump,
        bumpScale: 0.01
    });
    venus = new THREE.Mesh(geometry, material);
    venus.position.set(distance/sizeFactor, 0, 0);
    venusCenter.add(venus);

    //Glow
       material = new THREE.SpriteMaterial({
        map: loader.load("textures/lava/glow.png"),
        color: 0xcc714a,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    var venusBigGlow = new THREE.Sprite(material);
    venusBigGlow.scale.set(100,100,100);

    //Big sphere
     var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
     material = new THREE.MeshBasicMaterial({
      color: 0xcc714a
    });
  venusBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    venus.add(venusBigSphere);
    venusBigSphere.add(venusBigGlow);
}
