import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ThreeDAvatar({ glbModelUrl }) {
    const mountRef = useRef();

    const wheelChairModel = ''; //'/Wheelchair.glb';
    const backgroundUrl = ''; //'/background.png';

    useEffect(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 2, 5);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 1.4;
        controls.maxDistance = 1.4;
        controls.target.set(0, 1.2, 0);
        controls.update();

        // Lighting Setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);  
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.5); 
        keyLight.position.set(-3, 1, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 1.0); 
        fillLight.position.set(3, 1, 5);
        scene.add(fillLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
        backLight.position.set(0, 1, -5);
        scene.add(backLight);

        // Additional point lights for specific illumination
        const pointLight = new THREE.PointLight(0xffffff, 0.8, 50);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 50);
        pointLight2.position.set(-2, 3, -4);
        scene.add(pointLight2);

        renderer.setClearColor(0x000000);   // Set background color

        /*
        const loader = new TextureLoader();
        loader.load(backgroundUrl,  // Path to your background image
            function (texture) {
                scene.background = texture;  // Set the loaded texture as the background
            },
            undefined,
            function (err) {
                console.error('An error occurred loading the texture:', err);
            }
        );
        */

        const gltfLoader = new GLTFLoader();
        gltfLoader.load(glbModelUrl, gltf => {
            scene.add(gltf.scene);

            // Compute bounding box to determine the size of the cover
            const bbox = new THREE.Box3().setFromObject(gltf.scene);
            const height = bbox.max.y - bbox.min.y;
            const coverHeight = height * 0.5; // Cover 40% from the bottom
            const coverYPosition = bbox.min.y + coverHeight / 2; // Position cover at the bottom

            // Use the width and depth from the bounding box
            const topWidth = 0.5;
            const bottomWidth = 0.53;

            // Create a cover object
            const coverGeometry = new THREE.CylinderGeometry(topWidth / 2, bottomWidth / 2, coverHeight, 32); // Parameters: radiusTop, radiusBottom, height, radialSegments
            const coverMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Or use any appropriate material/color
            const coverMesh = new THREE.Mesh(coverGeometry, coverMaterial);
            coverMesh.position.set(0, coverYPosition, 0.04);
            scene.add(coverMesh);
        }, undefined, error => {
            console.error('An error happened with the GLB loader.', error);
        });

        /*  // Code to load another .glb model, example the wheelchair
        const gltfLoader2 = new GLTFLoader();
        gltfLoader2.load(wheelChairModel, gltf => {
            gltf.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0x555555 });
                }
            });
            scene.add(gltf.scene);
        }, undefined, error => {
            console.error('An error happened with the second GLB loader.', error);
        });
        */

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const resizeObserver = new ResizeObserver(entries => {
            if (!entries || entries.length === 0) return;
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
        resizeObserver.observe(mountRef.current);

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            resizeObserver.disconnect();
            scene.clear();
            renderer.dispose();
        };
    }, [glbModelUrl]);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

export default ThreeDAvatar;
