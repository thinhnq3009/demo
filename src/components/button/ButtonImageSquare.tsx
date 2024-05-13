import Image from 'next/image';
import classNames from 'classnames';

export type ButtonImageProps = {
  children?: string;
  className?: string;
  image: string;
  size?: 'sm' | 'md' | 'lg';
};


export default function ButtonImageSquare({ children, className, image, size = 'sm' }: ButtonImageProps) {


  return (<button
    className={classNames('bg-no-repeat text-white font-bold', className, {
      "bg-[url('/assets/rect/btn-gold.svg')] w-[52px] h-[52px]": size === 'sm',
    })}>
    <div className="flex flex-col items-center justify-center text-3xs">
      <Image width={26} height={26} src={image} alt="Wallet"/>
      {children}
    </div>
  </button>);
}