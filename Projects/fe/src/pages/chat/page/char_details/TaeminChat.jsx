// import Chat from "..";
//import three js for 3d models
import { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import Model from '../components/Model';

//model dir
const MODEL_DIR = '/models/godzilla/scene.gltf';
// const MODEL_DIR2 = '/models/miyu/scene.gltf';

const TaeminChat = () => {

    const [messages, setMessages] = useState('');

    const handleInputChages = (e) => {
        setMessages(e.target.value);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        setMessages('');
    };


    return(
        <div>
            {/* 화면을 좌우 2분할로 해서 왼쪽엔 아바타? 두고 */}
                {/* 오른쪽엔 채팅창 사용할 예정 */}

                {/* container */}
                <div className="flex w-full h-[92vh] ">
                    {/* 왼쪽 */}
                    <div className="flex w-2/3 flex-col items-center border-white">
                        {/* 3d goes here */}
                        <Canvas camera={{ position: [0,0,7] }}>
                            <ambientLight  intensity={80}/>
                            <Model modelDir={MODEL_DIR}  scale={0.7}/>
                        </Canvas>
                    </div>

                    {/* 구분선(임시) */}
                    <div className="border-2 border-gr">

                    </div>
                    {/* 오른쪽 */}
                    <div className="flex w-3/4 flex-col">
                        <div className='flex-1 overflow-auto'>
                            <p>chat goes here</p>
                        </div>

                        <div className='p-4'>
                            <form onSubmit={handleSendMessage} className='mt-auto'>
                                <input type="text" 
                                value={messages}
                                onChange={handleInputChages}
                                className='w-full h-10 border-2 border-gr rounded-md p-4'
                                placeholder='Type your message here...'/>
                            </form>
                        </div>
                    </div>
                
                </div>
        </div>
    );
}
export default TaeminChat;