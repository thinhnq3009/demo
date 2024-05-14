'use client';

import classNames from 'classnames';
import Image from 'next/image';

// type Props = {
//   canScrollPrev: boolean;
//   canScrollNext: boolean;
//   onPrev(): void;
//   onNext(): void;
//   direction: 'left' | 'right';
//   imageUrl: string;
//   className: string;
// };
type Props = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
  direction: string;
  imageUrl: string;
  className: string;
};
const CarouselControls = ({ canScrollPrev, canScrollNext, onPrev, onNext, direction, imageUrl, className, ...passProps }: Props) => {
  return (
    <div className="flex justify-between">
      {direction === 'left' ? (
        <button
          onClick={() => {
            if (canScrollPrev) {
              onPrev();
            }
          }}
          disabled={!canScrollPrev}
          className={classNames('py-[7px] absolute top-1/2 -translate-y-1/2 z-10', className, {
            "left-0 pl-7 pr-0.5 bg-[url('/assets/bg/slide-btn-l.svg')]": direction === 'left',
          })} {...passProps}>
            <Image width={26} height={26} src={imageUrl} alt={direction}/>
        </button>
      ) : (
        <button
          onClick={() => {
            if (canScrollNext) {
              onNext();
            }
          }}
          disabled={!canScrollNext}
          className={classNames('py-[7px] absolute top-1/2 -translate-y-1/2 z-10', className, {
            "right-0 pr-7 pl-0.5 bg-[url('/assets/bg/slide-btn-r.svg')]": direction === 'right',
          })} {...passProps}>
          <Image width={26} height={26} src={imageUrl} alt={direction}/>
        </button>
      )}
    </div>
  );
};
export default CarouselControls;
