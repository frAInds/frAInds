import { useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import {
    SelectedSnapDisplay,
    useSelectedSnapDisplay
  } from './EmblaCarouselSelectedSnapDisplay'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
  } from './EmblaCarouselArrowButtons'

import { Link } from "react-router-dom";

//carousel 형식으로 된 캐릭터 선택창 index.jsx에서 넘긴 값 그대로 받기
const SelectionsCarousel = (props) => {
    const {items, options, slides} = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

    useEffect(() => {
        if (emblaApi) console.log(emblaApi.slideNodes())
    }, [emblaApi])

    return (
        <>
            <div className="overflow-hidden flex-grow">
                {/* choose your character */}
                <div className="flex mt-10 text-6xl text-center mb-20 text-indigo-400">
                    {/* font 추후 수정 예정 */}
                    <p>[ CHOOSE YOUR CHARACTER ]</p>
                </div>

                <div className="embla w-full">
                    <div className="embla__viewport w-full" ref={emblaRef}>
                        <div className="embla__container ">
                            {items.map((item, index) => (
                                <div className='embla__slide relative group mx-5' key={index}>
                                    <Link to={item.url} className="flex relative">
                                        <img className='slides_images rounded-lg shadow transition-all duration-[2000ms]  ease-in-out hover:shadow-xl hover:bg-testBlack ' src={item.img} alt={item.name} />
                                        
                                        <div className="absolute bottom-0 w-full h-[15] bg-testBlack bg-opacity-50 group-hover:h-full transition-all duration-[2000ms]  ease-in-out flex items-center justify-center p-4 flex-col overflow-hidden">
                                            <span className="text-white text-lg text-center mb-2 z-10">{item.name}</span>
                                            <div className="h-[2px] overflow-hidden"></div>
                                            <span className="text-white z-10">{item.desc}</span>
                                            <div className="absolute bottom-20 left-0 w-full text-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms]">
                                                
                                                <span>Lorem ipsum dolor sit amet, </span>
                                            </div>
                                        </div>
                                        
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div 
                className="embla__controls items-center gap-[1.2rem] mt-[1.0rem] justify-center flex">
                    <div className="embla__buttons">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>

                    <SelectedSnapDisplay className="embla__snap__display"
                    selectedSnap={selectedSnap}
                    snapCount={snapCount}
                    />
                </div>                    
            </div>
        </>

    )
}

export default SelectionsCarousel