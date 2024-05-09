'use client';
import TypeWriter from '@/components/common/TypeWriter';
import {useContext, useEffect} from 'react';
import {HomeContext} from '@/components/context/home/HomeContextProvider';
import classNames from 'classnames';

export default function ChatPopup() {

  const {
    messageResponse: [messageResponse, setMessageResponse],
    sending: [sending],
  } = useContext(HomeContext);
  useEffect(() => {
    if (sending) {
      setMessageResponse('. . .');
    }
  }, [sending]);
  return <div
    className={classNames("absolute hidden font-mochi text-white text-3xs pl-2 pr-4 pt-2 pb-5 w-[137px] h-[72px] top-2 left-2 bg-[url('/assets/bg/chat-bg.svg')] z-10 bg-center", {
      '!block': messageResponse || sending,
    })}>
    <TypeWriter className="overflow-y-auto h-full inline-block" infinite={sending}>
      {messageResponse}
    </TypeWriter>
  </div>;
}