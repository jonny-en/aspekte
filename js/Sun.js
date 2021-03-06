var uniforms, material, sun;

function initSun() {
    var textureLoader = new THREE.TextureLoader();

    uniforms = {

        fogDensity: { type: "f", value: 0.45 },
        fogColor: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        uvScale: { type: "v2", value: new THREE.Vector2(3.0, 1.0) },
        texture1: { type: "t", value: textureLoader.load("textures/lava/cloud.png") },
        texture2: { type: "t", value: textureLoader.load("textures/lava/lavatile.jpg") }

    };

    uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
    uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;

    var size = 50.4;

    material = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent

    });

    sun = new THREE.Mesh(new THREE.SphereGeometry(size/sizeFactor, 30, 30), material);
    scene.add(sun);
    

    //Glow
     var material = new THREE.SpriteMaterial({
        map: textureLoader.load("textures/lava/glow.png"),
        color: 0xFFDB99,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
   	var sunGlow = new THREE.Sprite(material);
   	sunGlow.scale.set(0.8,0.8,0.8)
    sun.add(sunGlow);
}
