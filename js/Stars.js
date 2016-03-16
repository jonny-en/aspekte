 function initStars() {
     var loader = new THREE.TextureLoader();
     texture = loader.load('textures/starmap.png');

     texture.wrapS = THREE.RepeatWrapping;
     texture.wrapT = THREE.RepeatWrapping;
     texture.repeat.set(6, 6);

     var material = new THREE.MeshBasicMaterial({
         map: texture,
         transparent: true,
         side: THREE.BackSide,
         opacity: 0.9
     });

     var geometry = new THREE.SphereGeometry(40, 6, 6);
     stars = new THREE.Mesh(geometry, material);
     stars.rotation.x = Math.PI * 2
     stars.material.opacity = 0.5;
     scene.add(stars);

     var geometry = new THREE.SphereGeometry(30, 6, 6);
     stars2 = new THREE.Mesh(geometry, material);
     stars2.rotation.x = Math.PI * 1;
     scene.add(stars2);

     var geometry = new THREE.SphereGeometry(20, 6, 6);
     stars3 = new THREE.Mesh(geometry, material);
     stars3.rotation.x = Math.PI * 0.5;
     scene.add(stars3);
 }
