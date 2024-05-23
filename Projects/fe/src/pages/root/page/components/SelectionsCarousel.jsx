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
                <div className="embla w-full">
                    <div className="embla__viewport w-full" ref={emblaRef}>
                        <div className="embla__container ">
                        {items.map((item, index) => (
                                <div className='embla__slide relative group mx-5' key={index}>
                                    <Link to={item.url} className="flex relative">
                                        {/* +는 svg인데 아이콘이 전체크기를 잡아먹어서 컨테이너에 따로 작게 렌더링함. */}
                                        {item.name === 'Create' ? (
                                            <div className="flex items-center justify-center border border-customGray rounded-lg" style={{ width: '344px', height: '344px', borderColor: '#e5e5e1' }}>
                                                <img src={item.img} alt={item.name} className="w-1/2 h-1/2 rounded-lg "/>
                                            </div>
                                        ) : (
                                            <img className=' rounded-lg shadow   ease-in-out hover:shadow-xl ' src={item.img} alt={item.name} />
                                        )}
                                        <div className="absolute  w-full h-full bg-testBlack/50 flex items-center justify-center -bottom-40 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out p-4 flex-col overflow-hidden">
                                            <span className="text-white text-lg text-center mb-2 z-10">{item.name}</span>
                                            <span className="text-white z-10">{item.desc}</span>
                                            <div className="absolute bottom-20 left-0 w-full text-center z-10">
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