'use client';

import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

type CaurouselProps = {
  children: ReactNode[];
  className?: string;
};

export default function Carousel({ children, className }: CaurouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const nextImage = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  useEffect(() => {

  }, []);

  const prevImage = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
  };

  const containerWidth = useMemo<number>(() => containerRef?.current?.clientWidth, [containerRef]);
  // const containerWidth = containerRef?.current?.clientWidth;
  const currentTranslateValue = useMemo<number>(() => {
    return currentSlideIndex * containerWidth;
  }, [currentSlideIndex, containerWidth]);
    // const currentTranslateValue = currentSlideIndex * containerWidth;
  console.log('currentTranslateValue', currentTranslateValue);
  console.log('containerWidth', containerWidth);
  return (
        <div ref={containerRef} className={classNames('relative ####', className)}>
            <button className="absolute top-1/2 left-0 -translate-y-1/2" onClick={prevImage}>{'<'}</button>
            <div className='flex flex-nowrap'>
                {children.map((child, index) => <div
                    key={index}
                    className="min-w-full inline-block"
                    style={{
                      translate: `translateX(${index * containerWidth}px)`,
                    }}
                >
                    {child}
                </div>)}
            </div>
            <button className="absolute top-1/2 right-0 -translate-y-1/2" onClick={nextImage}>{'>'}</button>
        </div>
  );
}