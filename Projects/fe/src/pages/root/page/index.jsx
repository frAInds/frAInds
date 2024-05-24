
import SelectionsCarousel from "./components/SelectionsCarousel";

//images
import exImg from '@/pages/test/page/images/DALLE.webp';
import exImg1 from '@/pages/test/page/images/cyborg_taemin.png';
import Plus from '@/pages/root/page/images/plus-svgrepo-com.svg';

export const Root = () => {

  const OPTIONS = { loop: true, dragFree: true, align: "center", dragThreshold: 20}
  const SLIDE_COUNT = 3;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="dark:bg-testBlack max-w-[100vw] min-h-screen
    flex flex-col items-center">

        <div className="flex mt-10 text-6xl text-center mb-20 text-indigo-400">
          {/* font 추후 수정 예정 */}
          <p>[ 챗봇 캐릭터 선택하기 ]</p>
        </div>

      <SelectionsCarousel 
      items={[
        {
          name: '유태민',
          url: '/chat/taemin',
          img: exImg,
          desc: '용인 어느 깊은 산속, 한 청년이 밤늦게까지 모니터 앞에서 유희를 즐기고 있습니다. 그의 이름은 유태민 평범한 대학생입니다. 그러나 그의 삶은 당신과 만남으로 인해 파국으로 치닿는데.. [더보기]'
        },
        {
          name: '유태민(사이보그)',
          url: '/chat/cyborg',
          img: exImg1,
          desc: '어느 따뜻한 봄날 유태민은 조윤기에게 납치당해 기계에 갇히고 맙니다. [더보기] '
        },
        {
          name: 'Create',
          url: '/chat/create',
          img: Plus,
          desc: '나만의 캐릭터를 만들어 볼까요?'

        },
      ]} options={OPTIONS}
      slides={SLIDES}/>
    </div>
  )
}

export default Root;
