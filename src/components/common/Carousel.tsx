'use client';

import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import React from 'react';
// import ButtonImageSlide from '@/components/button/BottonImageSlide';

type CaurouselProps = {
  children: ReactNode[];
  className?: string;
};

export default function Carousel({ children, className }: CaurouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const childRefs = useRef<(HTMLDivElement | null)[]>([]);

  const nextImage = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % children.length);
  };
  const prevImage = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
  };
  
  useEffect(() => {
    const containerWidth = containerRef?.current?.clientWidth || 0;
    const currentTranslateValue = currentSlideIndex * containerWidth;
    childRefs.current.forEach((ref) => { 
      if (ref) {
        ref.style.transition = 'transform 0.5s ease-in-out';
        ref.style.transform = `translateX(-${currentTranslateValue}px)`;
      }
    });
  }, [currentSlideIndex]);


  const containerWidth = useMemo<number>(() => containerRef?.current?.clientWidth || 0, [containerRef]);
  const currentTranslateValue = useMemo<number>(() => {
    return currentSlideIndex * containerWidth;
  }, [currentSlideIndex, containerWidth]);
  console.log('currentTranslateValue', currentTranslateValue);
  console.log('containerWidth', containerWidth);
  return (
    <div ref={containerRef} className={classNames('relative ####', className)} style={{ overflow: 'hidden' }}>
      <div className='flex h-32 flex-nowrap'>
            <button className="absolute top-1/2 left-0 -translate-y-1/2 z-10" onClick={prevImage}>{'<'}</button>
                {children.map((child, index) => <div
                    key={index}
                    ref={el => childRefs.current[index] = el}
                    className="min-w-full inline-block"
                    style={{
                      // transform: `translateX(${index * containerWidth}px)`,
                      // transition: 'transform 0.5s ease-in-out',
                    }}
                >
                    {child}
                </div>)}
            <button className="absolute top-1/2 right-0 -translate-y-1/2 z-10" onClick={nextImage}>{'>'}</button>
            {/* <ButtonImageSlide url_child="/assets/item/arrow-slide-right.svg" image="\assets\avatar\avt-2.svg" className="absolute top-1/2 right-0 -translate-y-1/2 z-10" onClick={nextImage}> </ButtonImageSlide> */}
            </div>
    </div>
  );
}