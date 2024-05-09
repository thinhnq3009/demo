'use client';

import { InputHTMLAttributes, KeyboardEventHandler, useContext, useState } from 'react';
import classNames from 'classnames';
import { HomeContext } from '@/components/context/home/HomeContextProvider';
import apiChat from '@/apis/chatApi';

type InputChatProps = InputHTMLAttributes<HTMLInputElement> & {
  backgroundUrl?: string;
  classNameInput?: string;
};

export default function InputChat({ className, classNameInput, ...passProp }: InputChatProps) {

  const {
    messageResponse: [messageResponse, setMessageResponse],
    sending: [sending, setSending],
  } = useContext(HomeContext);
  const [message, setMessage] = useState('');

  // API
  const { getResponse } = apiChat();

  const handleSendMessage = () => {
    if (sending) return;
    setSending(true);
    setMessage('');
    getResponse(message)
      .then((res) => {
        setMessageResponse(res);
      })
      .finally(() => {
        setSending(false);
      })
    ;
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  return <div
    className={classNames("flex bg-[url('/assets/item/input-chat.svg')] bg-no-repeat bg-center w-[318px] px-4 py-1.5", className)}>
    <input
      value={message}
      onKeyUp={handleKeyUp}
      onChange={(e) => setMessage(e.target.value)}
      className={classNames('font-mochi text-white flex-1 items-center outline-none bg-transparent text-2xs py-1 pl-0.5', classNameInput)}
      {...passProp}/>
    <button
      onClick={handleSendMessage}
      className={classNames("bg-[url('/assets/item/arrow.svg')] active:translate-x-0.5 duration-100 ease-in-out pr-5 bg-center bg-no-repeat", {
        'animate-flip-x': sending,
      })}></button>
  </div>;
}