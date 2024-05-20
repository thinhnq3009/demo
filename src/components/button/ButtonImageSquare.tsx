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
      'w-[80px] h-[80px] bg-transparent': size === 'sm',
      'w-[79px] h-[59px] bg-transparent': size === 'md',
    })}>
    <div className="flex flex-col items-center justify-center text-3xs">
      <Image className='mb-[12px] mt-[7px]' width={36} height={26} src={image} alt="Wallet"/>
      {children}
    </div>
  </button>);
}