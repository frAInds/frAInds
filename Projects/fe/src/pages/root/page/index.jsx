
import SelectionsCarousel from "./components/SelectionsCarousel";

//images
import exImg from '@/pages/test/page/images/DALLE.webp';
import exImg1 from '@/pages/test/page/images/DALLE_robot.webp';
import Plus from '@/pages/root/page/images/plus-svgrepo-com.svg';

export const Root = () => {

  const OPTIONS = { loop: true, dragFree: true, align: "center", dragThreshold: 20}
  const SLIDE_COUNT = 3;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="dark:bg-slate-900 max-w-[100vw] min-h-screen
    flex flex-col items-center">

      <SelectionsCarousel 
      items={[
        {
          name: '유태민',
          url: '/chat/taemin',
          img: exImg,
          desc: '유태민이에요!'
        },
        {
          
          name: '유태민(사이보그)',
          url: '/chat/dog',
          img: exImg1,
          desc: '사이보그 태민이에요!'
        },
        {
          //card hover아님
          name: 'Create',
          url: '/chat/dog',
          img: Plus,
          desc: '나만의 캐릭터를 만들어 볼까요?'

        },
      ]} options={OPTIONS}
      slides={SLIDES}/>

    </div>
  )
}

export default Root;
