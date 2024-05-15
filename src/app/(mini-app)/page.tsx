'use client';

import Profile from '@/components/common/header/Profile';
import ButtonImageSquare from '@/components/button/ButtonImageSquare';
import InputChat from '@/components/input/InputChat';
import ChatPopup from '@/components/common/ChatPopup';
import Link from 'next/link';
import HomeContextProvider from '@/components/context/home/HomeContextProvider';
import Carousel from '@/components/common/CarouselTest';
import { useState } from 'react';
import ModelPreview from '@/components/model/ModelPreview';

const models = [
  '/assets/models/steamgirl.glb',
  '/assets/models/gangster.glb',
  '/assets/models/corgi.glb',
  '/assets/models/archer.glb',
  '/assets/models/kpop.glb',
  '/assets/models/spacerange.glb',
  '/assets/models/ninja.glb',
  '/assets/models/nightsteal.glb',
  '/assets/models/necromance.glb',
  '/assets/models/demonic.glb',
  '/assets/models/femalemage.glb',
  '/assets/models/monkeyking.glb',
];
export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleSlideChange = (index: number) => {
    console.log('Slide changed to:', index);
    setActiveIndex(index);
  };
  return <HomeContextProvider>
    <div className="px-1 flex flex-col h-full">
      <header className="font-mochi flex justify-between">
        <Profile/>
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
        <Carousel loop onSlideChange={handleSlideChange}>
            {models.map((model, index) => (
            <div key={model} className="relative h-full flex-[0_0_100%]">
              {index}
              {activeIndex}
              {index === activeIndex && 
                <ModelPreview key={model} modelUrl={model} />}
            </div>
            ))}
        </Carousel>
        {/* <Carousel loop>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/steamgirl.glb"/>          
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/gangster.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/corgi.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/archer.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/kpop.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/spacerange.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/ninja.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/nightsteal.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/necromance.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/demonic.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/femalemage.glb"/>
            </div>
            <div className="relative h-full flex-[0_0_100%]">
              <ModelPreview modelUrl="/assets/models/monkeyking.glb"/>
            </div>
          </Carousel> */}
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