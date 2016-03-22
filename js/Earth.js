var earth, earthCenter, earthClouds, earthBigSphere;

function initEarth() {

    var size = planet_parameters.earth_.size;
    var distance = planet_parameters.earth_.distance;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    earthCenter = new THREE.Mesh(geometry, material);
    mainScene.add(earthCenter);

    //Earth
     geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/earth/diff.jpg');
    var bump = loader.load('textures/earth/bump.jpg');
    var spec = loader.load('textures/earth/spec.jpg');

     material = new THREE.MeshPhongMaterial({
        map: diffuse,
        bumpMap: bump,
        bumpScale: 0.01,
        specularMap: spec
    });
    earth = new THREE.Mesh(geometry, material);
    earth.position.set(distance/sizeFactor, 0, 0);
    earthCenter.add(earth);

    //Clouds
     geometry = new THREE.SphereGeometry(size/sizeFactor + 0.001, 22, 22);
    var clouds = loader.load('textures/earth/cloud.png');
     material = new THREE.MeshPhongMaterial({
        map: clouds,
        transparent: true
    });
    earthClouds = new THREE.Mesh(geometry, material);
    earth.add(earthClouds);

    //Glow
       material = new THREE.SpriteMaterial({
        map: loader.load("textures/lava/glow.png"),
        color: 0x365591,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    var earthBigGlow = new THREE.Sprite(material);
    earthBigGlow.scale.set(100,100,100);

    //Big sphere
     var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
     material = new THREE.MeshBasicMaterial({
      color: 0x365591
    });
  earthBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    earth.add(earthBigSphere);
    earthBigSphere.add(earthBigGlow);
}
