'use client';

import Profile from '@/components/common/header/Profile';
import ButtonImageSquare from '@/components/button/ButtonImageSquare';
import InputChat from '@/components/input/InputChat';
import ChatPopup from '@/components/common/ChatPopup';
import Link from 'next/link';
import HomeContextProvider from '@/components/context/home/HomeContextProvider';
import Carousel from '@/components/common/CarouselTest';
import { useEffect, useState } from 'react';
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
  const [loadedModels, setLoadedModels] = useState<(JSX.Element | null)[]>(Array(models.length).fill(null));

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);

    const newLoadedModels = [...loadedModels];
    const lengthModels = models.length - 1;
    const indexPrev = index === 0 ? lengthModels : index - 1;
    const indexNext = index === lengthModels ? 0 : index + 1;

    if (!loadedModels[index] || !loadedModels[indexPrev] || !loadedModels[indexNext]) {
      if (!loadedModels[index]) {
        newLoadedModels[index] = <ModelPreview key={models[index]} active={true} modelUrl={models[index]} />;
      }
      if (!loadedModels[indexPrev]) {
        newLoadedModels[indexPrev] = <ModelPreview key={models[indexPrev]} active={true} modelUrl={models[indexPrev]} />;
      }
      if (!loadedModels[indexNext]) {
        newLoadedModels[indexNext] = <ModelPreview key={models[indexNext]} active={true} modelUrl={models[indexNext]} />;
      }
      // for (let i = 0; i < models.length; i++) {
      //   if (i !== index && i !== indexPrev && i !== indexNext && newLoadedModels[i]) {
      //     newLoadedModels[i] = null;
      //     // newLoadedModels.splice(i, 1);
      //   }
      // }
      setLoadedModels(newLoadedModels);
    }
  };
  useEffect(() => {
    handleSlideChange(activeIndex);
  }, []);
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
      <main className="flex-1 relative sm:mt-3 md:mt-10">
        <ChatPopup/>   
        <Carousel loop onSlideChange={handleSlideChange}>
          {models.map((model, index) => (
            <div key={model} className="relative h-full flex-[0_0_100%]">
              {loadedModels[index]}
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