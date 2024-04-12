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

                <div className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {items.map((item, index) => (
                                <div className="embla__slide relative group" key={index}>
                                    <Link to={item.url}>
                                        <img className="slides_images rounded-lg shadow transition-all duration-600 ease-in-out hover:shadow-xl" src={item.img} alt="123" />
                                        <div className="absolute bottom-0 left-0 w-full h-[15] bg-testBlack bg-opacity-50 group-hover:h-full transition-all duration-600 ease-in-out flex items-center justify-center p-4">
                                            <span className="text-white text-lg text-center">{item.name}</span>
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