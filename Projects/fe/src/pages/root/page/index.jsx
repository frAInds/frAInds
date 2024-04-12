
import SelectionsCarousel from "./components/SelectionsCarousel";

//images
import exImg from '@/pages/test/page/images/DALLE.webp';
import exImg1 from '@/pages/test/page/images/corgi.webp';
import exImg2 from '@/pages/test/page/images/DALLE_robot.webp';

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
          name: 'DALLE',
          url: '/chat/taemin',
          img: exImg,
          desc: '유태민이에요!'
        },
        {
          //card hover아님
          name: 'Corgi',
          url: '/chat/dog',
          img: exImg1,
          desc: '나만의 캐릭터를 만들어 볼까요?'
        },
        {
          name: 'DALLE Robot',
          url: '/chat/dog',
          img: exImg2,
          desc: '사이보그 태민이에요!'

        },
      ]} options={OPTIONS}
      slides={SLIDES}/>

    </div>
  )
}

export default Root;
