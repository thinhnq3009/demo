import {ButtonHTMLAttributes} from "react";
import classNames from "classnames";
import Image from "next/image";

type ButtonImageSlideProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'left' | 'right';
  imageUrl: string;
}

export default function ButtonImageSlide({
                                           children,
                                           direction,
                                           className,
                                           imageUrl,
                                           ...passProps
                                         }: ButtonImageSlideProps) {
  return <button
    className={classNames("py-[7px] absolute top-1/2  -translate-y-1/2 z-10", className, {
      "left-0 pl-7 pr-0.5 bg-[url('/assets/bg/slide-btn-l.svg')]": direction === 'left',
      "right-0 pr-7 pl-0.5 bg-[url('/assets/bg/slide-btn-r.svg')]": direction === 'right',
    })} {...passProps}>
    <Image width={26} height={26} src={imageUrl} alt={direction}/>
  </button>
}