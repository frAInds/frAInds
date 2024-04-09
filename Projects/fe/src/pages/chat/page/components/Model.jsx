// Model.jsx
import React, { useRef, useState, useEffect } from 'react';
// import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Model =  ({ modelDir, scale }) => {

    const groupRef = useRef(new THREE.Group());
    const loader = new GLTFLoader();
    const [modelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        loader.load(
            modelDir,
            (gltf) => {
                groupRef.current.add(gltf.scene);
                groupRef.current.position.set(0, -2, 0);

                groupRef.current.scale.set(scale,scale,scale)
                setIsModelLoaded(true); //model loaded
            },
            undefined,
            (error) => {
                console.log('error loading gltf', error);
            }
        );
    }, [loader, modelDir, scale]);

    return (
        <group ref={groupRef}>
            {/* <primitive object={gltf.scene} scale={scale} /> */}
        </group>
    );
};
export default React.memo(Model);