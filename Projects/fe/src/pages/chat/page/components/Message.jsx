import { useEffect, useState } from "react"
// import avatar from '@/pages/test/page/images/1701826553654.jpg'
import avatar from '@/pages/test/page/images/choongi_pic.png'

const Message = (props) => {
    const [isJustMounted, setIsJustMounted] = useState(false);

    // 내가 보낸 메시지일 때 추가적인 css 클래스들 정의하여 추가
    let additionalClasses1 = '';
    let additionalClasses2 = '';
    let additionalClasses3 = '';

    useEffect(() => {
        setIsJustMounted(true);
    }, []);

    if (isJustMounted === true) {
        if (props.isMine === true) {
            additionalClasses1 = 'ml-auto flex-row-reverse'
            additionalClasses2 = 'text-right';
            additionalClasses3 = "bg-yellow-200"
        }
    }

    return (
        <div className="py-3 px-2">
            <div className={`flex justify-start gap-2 ${additionalClasses1}`}>
                {props.isMine === false && <img src={avatar} alt="" className='h-[40px] w-[40px] rounded-2xl' />}


                <div className="flex flex-col text-sm">

                    {props.isMine === false && <span>이충기</span>}

                    <div className={`bg-slate-50 p-1 rounded text-pretty ${additionalClasses3}`}>
                        {props.children}
                    </div>
                </div>

                <div className={`self-end text-xs flex flex-col ${additionalClasses2}`}>
                    <span>2</span>
                    <span>{props.sent_time}</span>
                </div>
            </div>
        </div>
    )
}

export default Message