// import Chat from "..";
//import three js for 3d models
import { useState, useMemo, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber'; //3d model canvas(container)
import Model from '../components/Model'; //3d model

//resizable library
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/common/components/ui/resizable";
import { useSelector } from 'react-redux';

import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";


//model dir
const MODEL_DIR = '/models/miyu/scene.gltf';

const TaeminChat = () => {

    const isDarkModeOn = useSelector(state => state.darkmode.value);

    const [messages, setMessages] = useState('');
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            text: 'Server message',
            timestamp: new Date().toISOString(),
            isUser: false,
        },
    ]);

    const handleInputChages = (e) => {
        setMessages(e.target.value);
    }

    //사용자 입력 text 채팅창에 쓰기
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
        
        if(dummyMessageCount >= 4){
            //after sending messages 3 times, stop sending messages
            return;
        }
        const timer = setTimeout(() => {
            let messagesToSend;

            if (dummyMessageCount < 2 || dummyMessageCount === 3) {
                messagesToSend = {
                    text: 'Server message 2 seconds later',
                    timestamp: new Date().toISOString(),
                    isUser: false,
                }
            } else if (dummyMessageCount === 2) {
                messagesToSend = {
                    text: '```print("Hello, World!")\n```',
                    timestamp: new Date().toISOString(),
                    isUser: false,
                }
            }

            if (messagesToSend.text.startsWith('```') && messagesToSend.text.endsWith('```')) {
                const codeBlock = messagesToSend.text.slice(3, -3);

                const width = 750;
                const height = 750;

                //팝업 화면을 중앙에 띄우려면 width, height를 계산해야 한다..
                const left = (window.screen.width - width) / 2;
                const top = (window.screen.height - height) / 2;

                const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
    
                const newWindow = window.open('', '', windowFeatures);
                newWindow.document.write('<html><head><title>Code Block</title></head><body><pre>');
                newWindow.document.write(codeBlock);
                newWindow.document.write('</pre></body></html>');
            }
            setChatMessages([messagesToSend, ...chatMessages]);
            setDummyMessageCount(dummyMessageCount + 1);
        }, 2000);  // 2 seconds delay

        return () => clearTimeout(timer);
    }, [chatMessages, dummyMessageCount]);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            const { scrollHeight, clientHeight } = chatContainerRef.current;
            if(scrollHeight > clientHeight){
                chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
            }
        }
    }, [chatMessages]);


    const [isBlockOpen, setIsBlockOpen] = useState(false);
    //블록 확장 버튼
    const handleBlockOpen = () => {
        // Add your implementation here
        setIsBlockOpen(!isBlockOpen);
    
    }

    return(
        <ResizablePanelGroup direction="horizontal" autoSaveId="conditional">
            {/* container */}
            <div className='flex w-full h-[92vh]' >

                {/* 왼쪽 */}
                <ResizablePanel defaultSize={55} order={1}>
                    <div className="flex w-full h-full flex-col bg-gray-200 dark:bg-testBlack">
                        {/* 3d goes here */}
                        <Canvas camera={{ position: [0,0,3] }}
                        className="w-full h-full">
                            <ambientLight  intensity={80}/>

                            {model}
                        </Canvas>
                    </div>
                </ResizablePanel>

                {/* handle */}
                <ResizableHandle withHandle style={{ backgroundColor: `${isDarkModeOn ? 'white' : 'black'}` }} className='dark:bg-white '/>

                {/* 오른쪽 */}
                <ResizablePanel defaultSize={45} order={3}>
                    {/* <ResizablePanelGroup direction="vertical"> */}
                        <div className="flex h-full flex-col bg-gray-200 justify-between dark:bg-testBlack">
                            <div ref={chatContainerRef} className='flex flex-col-reverse overflow-auto '>
                                {chatMessages.map((message, index) => (
                                    <div key={index} className={`'p-4 w-2/5 ${message.isUser ? 'ml-auto text-right' : 'mr-auto text-left'} mr-4 my-6`}>
                                        <div className={`bg-gray-300 p-2 inline-block
                                        ${message.isUser ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-right' : 'rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'}
                                        dark:text-black ml-4`}>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="flex items-center justify-center">
                                <form onSubmit={handleSendMessage} className='p-4 px-2 mt-auto flex w-95p mr-4'>
                                    <input
                                        type="text"
                                        value={messages}
                                        onChange={handleInputChages}
                                        className='flex-grow w-full h-10 border-2 border-gr rounded-md p-4 dark:text-black'
                                        placeholder='Type your message here...'
                                    />
                                    {/* <button type='submit' className='  text-white mt-2 rounded-md'>Send</button> */}
                                </form>
                            </div>

                        </div>
                    {/* </ResizablePanelGroup> */}
                </ResizablePanel>
            </div>
        </ResizablePanelGroup>

    );
}
export default TaeminChat;