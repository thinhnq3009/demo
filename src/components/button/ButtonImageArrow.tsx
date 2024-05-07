import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

type ButtonImageArrowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
};

export default function ButtonImageArrow({ size = 'sm', className, children, ...passProps }: ButtonImageArrowProps) {


  return <button
        className={classNames(className,
          'inline-flex items-center justify-center bg-no-repeat bg-center font-mochi text-white ', {
            'py-2.5 w-[102px] bg-[url("/assets/rect/btn-sm.svg")] hover:bg-[url("/assets/rect/btn-sm-hover.svg")] active:bg-[url("/assets/rect/btn-sm-active.svg")]': size === 'sm',
            'py-2.5 w-[183px] bg-[url("/assets/rect/btn-md.svg")] hover:bg-[url("/assets/rect/btn-md-hover.svg")] active:bg-[url("/assets/rect/btn-md-active.svg")]': size === 'md',
            'py-3 w-[318px] bg-[url("/assets/rect/btn-lg.svg")] hover:bg-[url("/assets/rect/btn-lg-hover.svg")] active:bg-[url("/assets/rect/btn-lg-active.svg")]': size === 'lg',
          })}
        {...passProps}>
        <span
            className={classNames('text-gradient bg-gradient-to-b from-[#FDFDFD] to-[#F2DAB0] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]', {
              'text-xs': size === 'sm',
              'text-base': size === 'md',
              'text-xl': size === 'lg',
            })}>{children}</span>
    </button>;
}