
import SelectionsCarousel from "./components/SelectionsCarousel";

//images
import exImg from '@/pages/test/page/images/DALLE.webp';
import exImg1 from '@/pages/test/page/images/choongi_pic.png';
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
        exImg, exImg2, exImg1
      ]} options={OPTIONS}
      slides={SLIDES}/>

    </div>
  )
}

export default Root;
