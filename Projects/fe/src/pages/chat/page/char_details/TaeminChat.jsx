// import Chat from "..";
//import three js for 3d models
import { useState, useMemo, useEffect, useRef } from 'react';
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
        },
        {
            id: 4,
            text: 'Server message',
            timestamp: new Date().toISOString(),
            isUser: false,
        },
        {
            id: 5,
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

        if(!messages.trim()){
            return;
        }

        const newMessage = {
            text: messages,
            timestamp: new Date().toISOString(),
            isUser: true,
        }
        setChatMessages([newMessage, ...chatMessages]);
        setMessages('');
    };

    const model = useMemo(
        () => <Model modelDir={MODEL_DIR} scale={2} />, 
        [MODEL_DIR]
    );


    //for testing messages from other users or server

    const [dummyMessageCount, setDummyMessageCount] = useState(0);

    useEffect(() => {
        if(dummyMessageCount >= 3){
            //after sending messages 3 times, stop sending messages
            return;
        }
        const timer = setTimeout(() => {
            const newMessage = {
                text: 'Server message 2 seconds later',
                timestamp: new Date().toISOString(),
                isUser: false,
            };
            setChatMessages([newMessage, ...chatMessages]);
            setDummyMessageCount(dummyMessageCount + 1);
        }, 2000);  // 2 seconds delay
    
        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timer);
    }, [chatMessages, dummyMessageCount]);

    const chatContainerRef = useRef(null);

    //seding messages will now activate automatic scroll down

    useEffect(() => {
        if (chatContainerRef.current) {
            const { scrollHeight, clientHeight } = chatContainerRef.current;
            if(scrollHeight > clientHeight){
                chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
            }
        }
    }, [chatMessages]);

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
                        <div className="flex h-full flex-col bg-gray-200 justify-between dark:bg-testBlack">
                            <div ref={chatContainerRef} className='flex flex-col-reverse overflow-auto'>
                                {chatMessages.map((message, index) => (
                                    <div key={index} className={`'p-4 w-2/5 ${message.isUser ? 'ml-auto' : 'mr-auto'} mr-4 my-6`}>
                                        <div className={`bg-gray-300 p-2 
                                        ${message.isUser ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl' : 'rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'}
                                        dark:text-black ml-4`}>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                                <form onSubmit={handleSendMessage} className='p-4 px-6 mt-auto flex'>
                                    <input type="text" 
                                    value={messages}
                                    onChange={handleInputChages}
                                    className='w-full h-10 border-2 border-gr rounded-md p-4 dark:text-black'
                                    placeholder='Type your message here...'/>
                                    <button type='submit' className='  text-white mt-2 rounded-md'>Send</button>
                                </form>
                        </div> 
                    </ResizablePanelGroup>
                </ResizablePanel>
            </div>
        </ResizablePanelGroup>
            
    );
}
export default TaeminChat;