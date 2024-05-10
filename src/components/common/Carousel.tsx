'use client';

import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import ButtonImageSlide from '@/components/button/ButtonImageSilde';
// import ButtonImageSlide from '@/components/button/BottonImageSlide';

type CaurouselProps = {
  children: ReactNode[];
  className?: string;
  onChange?: (index: number, target: HTMLDivElement) => void;
  nextImage: string;
  prevImage: string;
};


export default function Carousel({ children, className, nextImage, prevImage, onChange }: CaurouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const childRefs = useRef<HTMLDivElement[]>([]);

  const handleNext = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % children.length);
  };
  const handlePrev = () => {
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
    onChange?.(currentSlideIndex, childRefs.current[currentSlideIndex]);
  }, [currentSlideIndex]);


  const containerWidth = useMemo<number>(() => containerRef?.current?.clientWidth || 0, [containerRef]);
  const currentTranslateValue = useMemo<number>(() => {
    return currentSlideIndex * containerWidth;
  }, [currentSlideIndex, containerWidth]);
  console.log('currentTranslateValue', currentTranslateValue);
  console.log('containerWidth', containerWidth);
  return (
    <div ref={containerRef} className={classNames('relative h-full overflow-hidden', className)}>
      <div className='flex flex-nowrap h-full'>
        <ButtonImageSlide imageUrl={prevImage} direction="left"
                          onClick={handlePrev}>{'<'}</ButtonImageSlide>
        {children.map((child, index) => <div
          key={index}
          ref={el => {
            childRefs.current[index] = el === null ? {} as HTMLDivElement : el;
          }}
          className="min-w-full inline-block"
          style={{
            // transform: `translateX(${index * containerWidth}px)`,
            // transition: 'transform 0.5s ease-in-out',
          }}
        >
          {child}
        </div>)}
        <ButtonImageSlide imageUrl={nextImage} direction="right"
                          onClick={handleNext}>{'>'}</ButtonImageSlide>
      </div>
    </div>);
}