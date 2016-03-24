var saturn, saturnCenter, saturnBigSphere, saturnRing,saturnBigGlow;

function initSaturn() {

    var size = planet_parameters.saturn.size;
    var distance = planet_parameters.saturn.distance;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    saturnCenter = new THREE.Mesh(geometry, material);
    mainScene.add(saturnCenter);

    //Saturn
    geometry = new THREE.SphereGeometry(size, 60, 60);
    var loader = new THREE.TextureLoader();

    var saturnMap = loader.load('textures/saturn/saturnmap.jpg');

    material = new THREE.MeshPhongMaterial({
        map: saturnMap,
        bumpMap: saturnMap,
        bumpScale: size/100,
        specular: new THREE.Color('#190909')
    });
    saturn = new THREE.Mesh(geometry, material);
    saturn.position.set(distance, 0, 0);
    saturnCenter.add(saturn);

    //Saturn Ring
    var ringGeometry = new THREE.RingGeometry(1.2 * size, 2 * size, 40, 3, 0, 2 * Math.PI);
    var ringTexture = loader.load('textures/saturn/saturn-rings.png');
    material = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    saturnRing = new THREE.Mesh(ringGeometry, material);
    saturnRing.rotation.y = Math.PI/8 ;
    saturnRing.rotation.x = Math.PI/4 ;
    saturnRing.rotation.z = Math.PI/8 ;

    saturn.add(saturnRing);

    //Glow
       material = new THREE.SpriteMaterial({
        map: loader.load("textures/lava/glow.png"),
        color: 0xd2c7a8,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
  saturnBigGlow = new THREE.Sprite(material);
    saturnBigGlow.scale.set(100,100,100);

    //Big sphere
    var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
    material = new THREE.MeshBasicMaterial({
        color: 0xd2c7a8
    });
    saturnBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    saturn.add(saturnBigSphere);
}
