'use client';
import useEmblaCarousel from 'embla-carousel-react';
import {
  type EmblaOptionsType as CarouselOptions,
} from 'embla-carousel';
import { PropsWithChildren, useEffect, useState, useCallback } from 'react';
import React from 'react';
import CarouselControls from './CarouselControls';

type Props = PropsWithChildren & CarouselOptions & {
  onSlideChange?: (index: number) => void;
};

const Carousel = ({ children, onSlideChange, ...options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, watchDrag: false });
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    onSlideChange?.(emblaApi.selectedScrollSnap());
    setCanScrollNext(emblaApi.canScrollNext());
    setCanScrollPrev(emblaApi.canScrollPrev());
  }, [emblaApi, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', handleSelect);
    handleSelect(); // Initial call to set state

    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

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
      />
      <CarouselControls 
        imageUrl={'/assets/avatar/model-2.svg'}
        direction="left"
        canScrollNext={canScrollNext}
        canScrollPrev={canScrollPrev}
        onNext={() => emblaApi?.scrollNext()}
        onPrev={() => emblaApi?.scrollPrev()} 
        className={''}    
      />
    </>
  );
};

export default Carousel;
