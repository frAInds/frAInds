// import Chat from "..";
//import three js for 3d models
import { useState, useMemo, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber'; //3d model canvas(container)
import Model from '../components/Model'; //3d model

//resizable library
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/common/components/ui/resizable";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,  } from '@/common/components/ui/tooltip';
import { Panel } from 'react-resizable-panels';

import { useSpring, animated } from '@react-spring/web';

//reducer
// import { useSelector } from 'react-redux';

// const isDarkModeOn = localStorage.theme === 'dark';

//model dir
const MODEL_DIR = '/models/miyu/scene.gltf';

const TaeminChat = () => {

    const [springProps, setSpringProps] = useSpring(() => ({ width: '0%' }));


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

                const width = 500;
                const height = 500;

                // Calculate the position of the new window
                // const left = (window.innerWidth - width) / 2 + 50;
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
                <ResizablePanel defaultSize={30} order={1}>
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
                <ResizableHandle withHandle style={{ backgroundColor: '#000080' }} className='dark:bg-white '/>

                {/* 확장 화면: 초기엔 안보임 */}
                {isBlockOpen && (
                    <>
                        <ResizablePanel defaultSize={35} order={2} collapsible={true}>
                            <div className="flex w-full h-full flex-col opacity-50 dark:bg-testBlack
                            transition-height duration-600 ease-in-out">

                            </div>
                        </ResizablePanel>
                        {/* <ResizableHandle withHandle style={{ backgroundColor: '#000080' }} className='dark:bg-white '/> */}
                </>
                )}




                {/* 오른쪽 */}
                <ResizablePanel defaultSize={35} order={3}>
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

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button onClick={handleBlockOpen}>
                                                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                                className='dark:fill-indigo-400 fill-indigo-400 ml-2 cursor-pointer'>
                                                    <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" />
                                                    <path d="M12 8L12 16" stroke="#33363F" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                                                    <path d="M16 12L8 12" stroke="#33363F" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>코드 창 확장하기</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

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