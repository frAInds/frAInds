import { useEffect, useRef } from "react"
import avatar from '@/pages/test/page/images/1701826553654.jpg'

const Message = (props) => {
    const temp = useRef();

    useEffect(() => {

    }, []);

    return (
        <div className="py-3 px-2">
            <div className="flex justify-start gap-2">
                <img src={avatar} alt="" className='h-[40px] w-[40px] rounded-2xl' />

                <div className="flex flex-col text-sm">

                    <span>강아지</span>
                    <div className="bg-slate-50 p-1 rounded text-pretty">
                        멍멍멍멍멍멍{props.children}
                    </div>
                </div>

                <div className="self-end text-xs flex flex-col">
                    <span>2</span>
                    <span>1:53 AM</span>
                </div>
            </div>
        </div>
    )
}

export default Message