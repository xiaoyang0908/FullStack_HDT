import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ThreeDAvatar({ modelUrl }) {
    const mountRef = useRef();

    useEffect(() => {
        if (!mountRef.current) return;

        // Setup scene, camera and renderer
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 2, 5);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Setup controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 1.4;
        controls.maxDistance = 1.7;
        controls.target.set(0, 0.9, 0);
        controls.update();

        // Setup lighting
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);
        const spotLight = new THREE.SpotLight(0xffffff, 5);
        spotLight.position.set(3, 10, 10);
        spotLight.castShadow = true;
        scene.add(spotLight);
        const spotLight2 = new THREE.SpotLight(0xffffff);
        spotLight2.position.set(-3, 10, -10);
        spotLight2.castShadow = true;
        scene.add(spotLight2);

        // Load model
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(modelUrl, gltf => {
            scene.add(gltf.scene);
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Resize observer for responsiveness
        const resizeObserver = new ResizeObserver(entries => {
            if (!entries || entries.length === 0) return;
            const entry = entries[0];
            if (entry) {
                const { width, height } = entry.contentRect;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        });
        resizeObserver.observe(mountRef.current);

        // Cleanup on unmount
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            resizeObserver.disconnect();
            scene.clear();
            renderer.dispose();
        };
    }, [modelUrl]);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

export default ThreeDAvatar;
