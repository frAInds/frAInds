import Messenger from '@/pages/chat/page/components/Messenger';
import exImg from '@/pages/test/page/images/1701826553654.jpg';

const Chat = () => {
    return (
        <>
            <div style={{
                backgroundImage: `url(${exImg})`
            }}
                className='w-screen h-screen flex flex-row bg-no-repeat bg-center'
            >
                <Messenger className='ml-auto' />
            </div>
        </>
    )
}

export default Chat