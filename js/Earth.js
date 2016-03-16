var earth, earthCenter, earthClouds;

function initEarth() {

    var size = 1.2735;
    var distance = 150;

    //Center for rotation
    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial();
    earthCenter = new THREE.Mesh(geometry, material);
    scene.add(earthCenter);

    //Earth
    var geometry = new THREE.SphereGeometry(size/sizeFactor, 22, 22);
    var loader = new THREE.TextureLoader();

    var diffuse = loader.load('textures/earth/diff.jpg');
    var bump = loader.load('textures/earth/bump.jpg');
    var spec = loader.load('textures/earth/spec.jpg');

    var material = new THREE.MeshPhongMaterial({
        map: diffuse,
        bumpMap: bump,
        bumpScale: 0.01,
        specularMap: spec
    });
    earth = new THREE.Mesh(geometry, material);
    earth.position.set(distance/sizeFactor, 0, 0);
    earthCenter.add(earth);

    //Clouds
    var geometry = new THREE.SphereGeometry(size/sizeFactor + 0.001, 22, 22);
    var clouds = loader.load('textures/earth/cloud.png');
    var material = new THREE.MeshPhongMaterial({
        map: clouds,
        transparent: true
    });
    earthClouds = new THREE.Mesh(geometry, material);
    earth.add(earthClouds);
}
