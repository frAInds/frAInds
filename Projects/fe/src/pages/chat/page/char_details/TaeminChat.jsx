// import Chat from "..";
//import three js for 3d models
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//model dir
const MODEL_DIR = '/models/godzilla/scene.gltf';
const MODEL_DIR2 = '/models/miyu/scene.gltf';

function Model({ modelDir, scale }){
    // const modelRef = useRef();
    const groupRef = useRef(new THREE.Group());

    const loader = new GLTFLoader();
    //모델 로드
    // const [modelLoaded, setModelLoaded] = useState(false);

    useEffect(() => {
        loader.load(
            modelDir,
            (gltf) => {
                groupRef.current.add(gltf.scene);
                groupRef.current.position.set(0, -3, 0);

                groupRef.current.scale.set(scale,scale,scale)
                // setModelLoaded(true); //model loaded
            },
            undefined,
            (error) => {
                console.log('error loading gltf', error);
            }
        );
    }, [loader, modelDir]);
    

    // useFrame(() => {
    //     if(groupRef.current){
    //         groupRef.current.rotation.y += 0.01;
    //     }
    // });

    return(
        <group ref={groupRef}>
            {/* {modelLoaded && <primitive object={modelRef.current} />} */}
        </group>
    )
}

const TaeminChat = () => {

    return(
        <div>
            {/* 화면을 좌우 2분할로 해서 왼쪽엔 아바타? 두고 */}
                {/* 오른쪽엔 채팅창 사용할 예정 */}

                {/* container */}
                <div className="flex w-full h-[92vh] ">
                    {/* 왼쪽 */}
                    <div className="flex w-1/2 flex-col items-center border-white">
                        {/* 3d goes here */}
                        <Canvas>
                            <ambientLight  intensity={80}/>
                        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
                            <Model modelDir={MODEL_DIR}  scale={0.7}/>
                        </Canvas>
                    </div>

                    {/* 구분선(임시) */}
                    <div className="border-2 border-gr">

                    </div>
                    {/* 오른쪽 */}
                    <div className="flex w-1/2 ">
                        <Canvas>
                            <ambientLight intensity={50}></ambientLight>
                            <Model modelDir={MODEL_DIR2}  scale={3.6}/>
                        </Canvas>
                    </div>
                
                </div>
        </div>
    );
}
export default TaeminChat;