'use client';

import classNames from 'classnames';
import Image from 'next/image';

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
          className={classNames('py-[19px] absolute top-1/2 -translate-y-1/2 z-10', className, {
            "left-0 pt-[1.3px] pl-[11px] pr-[13px] pb-[32.7px] bg-[url('/assets/bg/slide-btn-l.svg')] bg-no-repeat": direction === 'left',
          })} {...passProps}>
            <Image width={28} height={28} src={imageUrl} alt={direction}/>
        </button>
      ) : (
        <button
          onClick={() => {
            if (canScrollNext) {
              onNext();
            }
          }}
          className={classNames('py-[19px] absolute top-1/2 -translate-y-1/2 z-10', className, {
            "right-0 pt-[1.5px] pr-[11px] pl-[12px] pb-[32.5px] bg-[url('/assets/bg/slide-btn-r.svg')] bg-no-repeat": direction === 'right',
          })} {...passProps}>
          <Image width={28} height={28} src={imageUrl} alt={direction}/>
        </button>
      )}
    </div>
  );
};
export default CarouselControls;
