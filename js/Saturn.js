var saturn, saturnCenter, saturnBigSphere, saturnRing;

function initSaturn() {

    var size = 0.077316;
    var distance = 1433;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    saturnCenter = new THREE.Mesh(geometry, material);
    mainScene.add(saturnCenter);

    //Venus
    geometry = new THREE.SphereGeometry(size / sizeFactor, 32, 32);
    var loader = new THREE.TextureLoader();

    var saturnMap = loader.load('textures/saturn/saturnmap.jpg');

    material = new THREE.MeshPhongMaterial({
        map: saturnMap,
        bumpScale: 0.05,
        specular: new THREE.Color('#190909')
    });
    saturn = new THREE.Mesh(geometry, material);
    saturn.position.set(distance / sizeFactor, 0, 0);
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
    saturnRing.rotation.x = Math.PI - 2.1;
    saturnRing.rotation.y = Math.PI;
    saturn.add(saturnRing);
    //Big sphere
    var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
    material = new THREE.MeshBasicMaterial({
        color: 0xd2c7a8
    });
    saturnBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    saturn.add(saturnBigSphere);
    
}