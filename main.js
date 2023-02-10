import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js'

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load('bg.jpg')
			const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
            const controls = new OrbitControls( camera, renderer.domElement );

		
            const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.75 );
            scene.add( light );

            new RGBELoader().load( 'Environment2.hdr', function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;

						scene.environment = texture;

                        const loader = new GLTFLoader()
                        loader.load('model.glb', (gltf) =>{ 
                            let model = gltf.scene  
                            scene.add(model)
                        })

					} );

                    const renderScene = new RenderPass( scene, camera );

				const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
		
				const composer = new EffectComposer( renderer );
				composer.addPass( renderScene );
				composer.addPass( bloomPass );
		
bloomPass.threshold = 0.8;
				bloomPass.strength =1;
				bloomPass.radius = 0.6;

                window.addEventListener( 'resize', onWindowResize );

                function onWindowResize() {

                    camera.aspect = window.innerWidth / window.innerHeight;
    
                    camera.updateProjectionMatrix();
    
                    renderer.setSize( window.innerWidth, window.innerHeight );
    
    
                }


			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

	            controls.update()

			//	renderer.render( scene, camera );

            composer.render();

			};

			animate();