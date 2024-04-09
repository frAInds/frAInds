//강아지 채팅방 url은 chat/dog
//캐릭터마다 채팅창 양식이 달라서 구분해야함
import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Model from '../components/Model';

const MODEL_DIR = '/models/miyu/scene.gltf';

const DogChat = () => {


    return(
        <div>
            {/* 화면을 좌우 2분할로 해서 왼쪽엔 아바타? 두고 */}
                {/* 오른쪽엔 채팅창 사용할 예정 */}

                {/* container */}
                <div className="flex w-full h-[92vh] ">
                    {/* 왼쪽 */}
                    <div className="flex w-1/2 flex-col items-center border-white">
                        {/* 3d goes here */}
                        <Canvas camera={{ position: [0,0,5] }}>
                            <ambientLight  intensity={100}/>
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
                    
                    </div>
                
                </div>
        </div>
    );
}
export default DogChat;