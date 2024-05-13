'use client';

import Profile from '@/components/common/header/Profile';
import ButtonImageSquare from '@/components/button/ButtonImageSquare';
// import ModelPreview from '@/components/model/ModelPreview';
import InputChat from '@/components/input/InputChat';
// import ButtonImageArrow from '@/components/button/ButtonImageArrow';
// import CaseInfo from '@/components/common/CaseInfo';
// import HomeMenu from '@/components/common/menu/HomeMenu';
import ChatPopup from '@/components/common/ChatPopup';
import Link from 'next/link';
import HomeContextProvider from '@/components/context/home/HomeContextProvider';
import Carousel from '@/components/common/Carousel';
import Loading from '@/components/loading/loadingModel';
import dynamic from 'next/dynamic';
import { SetStateAction, useState } from 'react';

const avt = '/assets/avatar/avt-2.jpg';
const LoadModelPreview = dynamic(() => import('@/components/model/ModelPreview'), {
  ssr: false,
  loading: () => <Loading />,
});
// const models = [
//   '/assets/models/test4.gltf',
//   '/assets/models/emily.glb',
//   '/assets/models/emily-2.glb',
// ];

export default function HomePage() {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const handleSlideChange = (index: SetStateAction<number>) => {
  //   setActiveIndex(index);
  // };
  return <HomeContextProvider>
    <div className="px-1 flex flex-col h-full">
      <header className="font-mochi flex justify-between">
        <Profile coin={100} avatar={avt} ton={100} username={'Username'}/>
        <div className="flex flex-col gap-2">
        <Link href="/wallet">
          <ButtonImageSquare image="\assets\item\wallet.svg" className="bg-[#2B0940]">Wallet</ButtonImageSquare>
        </Link>
          <ButtonImageSquare image="\assets\item\battle.svg"
                             className="bg-[#971C01]">Battle</ButtonImageSquare>
        </div>
      </header>
      <main className="flex-1 relative">
        <ChatPopup/>
        {/*<ModelPreview/> */}
        {/* <Carousel nextImage="/assets/avatar/model-1.svg" prevImage="/assets/avatar/model-2.svg" onSlideChange={handleSlideChange}>
          {models.map((model, index) => (
            <div key={index}>
            {index === activeIndex && <LoadModelPreview modelUrl={model} />}
          </div>
          ))}
        </Carousel> */}
        <Carousel nextImage="/assets/avatar/model-1.svg" prevImage="/assets/avatar/model-2.svg">
          <LoadModelPreview modelUrl="/assets/models/test5.glb"/>
          <LoadModelPreview modelUrl="/assets/models/emily.glb"/>
          <LoadModelPreview modelUrl="/assets/models/emily-2.glb"/>
        </Carousel>
      </main>
      <section className="text-center">
        <InputChat className="mb-2 mx-auto" placeholder={'Start typing ...'}/>
        {/*<ButtonImageArrow className="mb-3 opacity-0" size={'lg'}>Play</ButtonImageArrow>*/}
        {/*<div className="flex gap-1.5 mb-6 justify-center opacity-0">*/}
        {/*    <ButtonImageArrow>For $NUD</ButtonImageArrow>*/}
        {/*    <ButtonImageArrow>For $TON</ButtonImageArrow>*/}
        {/*    <ButtonImageArrow>Free game</ButtonImageArrow>*/}
        {/*</div>*/}
        {/*<CaseInfo/>*/}
        {/*<HomeMenu/>*/}
      </section>
    </div>
  </HomeContextProvider>;
}