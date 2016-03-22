var mars, marsCenter, marsBigSphere, marsBigGlow;

function initMars() {

    var size = planet_parameters.mars.size;
    var distance = planet_parameters.mars.distance;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    marsCenter = new THREE.Mesh(geometry, material);
    mainScene.add(marsCenter);

    //Mars
    geometry = new THREE.SphereGeometry(size , 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/mars/diff.jpg');
    var normal = loader.load('textures/mars/normal.jpg');

    material = new THREE.MeshPhongMaterial({
        map: diffuse,
        normalMap: normal
    });
    mars = new THREE.Mesh(geometry, material);
    mars.position.set(distance , 0, 0);
    marsCenter.add(mars);

    //Glow
       material = new THREE.SpriteMaterial({
        map: loader.load("textures/lava/glow.png"),
        color: 0xaf241f,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    marsBigGlow = new THREE.Sprite(material);
    marsBigGlow.scale.set(100,100,100);

    //Big sphere
    var bigSphereGeometry = new THREE.SphereGeometry(15, 22, 22);
    material = new THREE.MeshBasicMaterial({
        color: 0xaf241f
    });
    marsBigSphere = new THREE.Mesh(bigSphereGeometry, material);
    mars.add(marsBigSphere);

}
