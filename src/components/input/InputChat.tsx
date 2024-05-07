import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type InputChatProps = InputHTMLAttributes<HTMLInputElement> & {
  backgroundUrl?: string;
  classNameInput?: string;
};

export default function InputChat({ className, classNameInput, ...passProp }: InputChatProps) {
  return <div
        className={classNames("flex bg-[url('/assets/item/input-chat.svg')] bg-no-repeat bg-center w-[318px] px-4 py-1.5", className)}>
        <input
            className={classNames('font-mochi text-white flex-1 items-center outline-none bg-transparent text-2xs py-1 pl-0.5', classNameInput)}
            {...passProp}/>
        <button className="bg-[url('/assets/item/arrow.svg')] pr-5 bg-center bg-no-repeat"></button>
    </div>;
}