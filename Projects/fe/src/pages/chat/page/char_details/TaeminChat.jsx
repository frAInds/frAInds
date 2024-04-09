// import Chat from "..";
//import three js for 3d models
import { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber'; //3d model canvas(container)
import Model from '../components/Model'; //3d model

//resizable library
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/common/components/ui/resizable"; 

//model dir
const MODEL_DIR = '/models/miyu/scene.gltf';

const TaeminChat = () => {

    const [messages, setMessages] = useState('');
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            text: 'Server message',
            timestamp: new Date().toISOString(),
            isUser: false,
        }
    ]);

    const handleInputChages = (e) => {
        setMessages(e.target.value);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        const newMessages = {
            id: chatMessages.length + 1,
            text: messages,
            timestamp: new Date().toISOString(),
            isUser: true,
        }
        setChatMessages([...chatMessages, newMessages]);
        setMessages('');
    };

    const model = useMemo(() => <Model modelDir={MODEL_DIR} scale={2} />, [MODEL_DIR])

    return(
        <ResizablePanelGroup direction="horizontal">
            {/* container */}
            <div className='flex w-full h-[92vh]' >

                {/* 왼쪽 */}
                <ResizablePanel defaultSize={65}>
                    <div className="flex w-full h-full flex-col bg-gray-200 dark:bg-testBlack">
                        {/* 3d goes here */}
                        <Canvas camera={{ position: [0,0,3] }}
                        className="w-full h-full">
                            <ambientLight  intensity={80}/>
                        
                            {model}
                        </Canvas>
                    </div>
                </ResizablePanel>
                {/* 구분선(임시) */}
                {/* 0409. resizable 사용해서 구분선 resizble하게 수정함 */}
                <ResizableHandle withHandle className='dark:bg-white'/>
                
                {/* 오른쪽 */}
                <ResizablePanel defaultSize={35}>
                    <ResizablePanelGroup direction="vertical">
                    <div className="flex h-full flex-col bg-gray-200 dark:bg-testBlack">
                            <div className='flex-1 overflow-auto'>
                                {chatMessages.map((message) => (
                                    <div key={message.id} className={`'p-4 w-2/5 ${message.isUser ? 'ml-auto' : 'mr-auto'} mr-4`}>
                                        <div className='bg-gray-300 p-2 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl dark:text-black ml-4'>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        <div className='p-4 px-6'>
                            <form onSubmit={handleSendMessage} className='mt-auto'>
                                <input type="text" 
                                value={messages}
                                onChange={handleInputChages}
                                className='w-full h-10 border-2 border-gr rounded-md p-4 dark:text-black'
                                placeholder='Type your message here...'/>
                            </form>
                        </div>
                    </div> 
                    </ResizablePanelGroup>
                </ResizablePanel>
            </div>
        </ResizablePanelGroup>
            
    );
}
export default TaeminChat;