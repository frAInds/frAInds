import { useEffect, useState } from "react";

import exImg from '@/pages/test/page/images/1701826553654.jpg';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/common/components/ui/carousel";
// import emblaCarouselAutoplay from "embla-carousel-autoplay";
// import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

export const Root = () => {

  return (
    <div className="dark:bg-slate-800 max-w-[100vw] h-screen
    flex flex-col items-center">

      {/* <Carousel
        opts={{
          align: "start",
          dragFree: true,
          loop: true,
          startIndex: 1
        }}
        setApi={setApi}
        plugins={[
          // WheelGesturesPlugin({

          // }),
          emblaCarouselAutoplay({
            delay: 5000,
          }),
         
        ]}
        className="w-[85vw] mt-10"
      >
        <CarouselContent >
          <CarouselItem className="">
            <img className="w-full rounded-2xl" src={exImg} />
          </CarouselItem>

          <CarouselItem className="">
            <img className="w-full" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}

    </div>
  )
}

export default Root;
