'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { PropsWithChildren } from 'react';
import React from 'react';
import CarouselControls from './CarouselControls';

type Props = PropsWithChildren;

const Carousel = ({ children, ...options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, watchDrag: false });
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();

  return (
    <>
      <div className="overflow-hidden h-full max-h-[80%]" ref={emblaRef}>
        <div className="flex flex-nowrap h-full">{children}</div>
      </div>
      <CarouselControls 
              imageUrl={'/assets/avatar/model-1.svg'}
              direction="right"
              canScrollNext={canScrollNext}
              canScrollPrev={canScrollPrev}
              onNext={() => emblaApi?.scrollNext()}
              onPrev={() => emblaApi?.scrollPrev()} 
              className={''}    
        >
        </CarouselControls>
      <CarouselControls 
              imageUrl={'/assets/avatar/model-2.svg'}
              direction="left"
              canScrollNext={canScrollNext}
              canScrollPrev={canScrollPrev}
              onNext={() => emblaApi?.scrollNext()}
              onPrev={() => emblaApi?.scrollPrev()} 
              className={''}    
        >
        </CarouselControls>
      
    </>
  );
};
export default Carousel;
