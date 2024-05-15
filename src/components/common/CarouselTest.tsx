'use client';
// components/Carousel.tsx
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import Dots from '@/components/model/Dots';
import React from 'react';
import CarouselControls from './CarouselControls';

type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  // const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, dragFree: false });
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, watchDrag: false });
  const length = React.Children.count(children);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();


  useEffect(() => {
    function selectHandler() {
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }
    emblaApi?.on('select', selectHandler);
    // emblaApi?.destroy();
    return () => {
      emblaApi?.off('select', selectHandler);
    };
  }, [emblaApi]);
  

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
      {/* <Dots itemsLength={length} selectedIndex={selectedIndex} /> */}
      
    </>
  );
};
export default Carousel;
