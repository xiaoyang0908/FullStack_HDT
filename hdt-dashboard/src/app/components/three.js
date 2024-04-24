import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ThreeDAvatar({ glbModelUrl, objModelUrl }) {
    const mountRef = useRef();

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
        controls.maxDistance = 1.7;
        controls.target.set(0, 0.9, 0);
        controls.update();

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

        const gltfLoader = new GLTFLoader();
        gltfLoader.load(glbModelUrl, gltf => {
            scene.add(gltf.scene);
        }, undefined, error => {
            console.error('An error happened with the GLB loader.', error);
        });

        const objLoader = new OBJLoader();
        objLoader.load(objModelUrl, obj => {
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0x555555 });
                }
            });
            scene.add(obj);
        }, undefined, error => {
            console.error('An error happened with the OBJ loader.', error);
        });

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
    }, [glbModelUrl, objModelUrl]);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

export default ThreeDAvatar;
