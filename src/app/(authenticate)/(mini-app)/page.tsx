'use client';

import Profile from '@/components/common/header/Profile';
import ButtonImageSquare from '@/components/button/ButtonImageSquare';
import Link from 'next/link';
import HomeContextProvider from '@/components/context/home/HomeContextProvider';
import Carousel from '@/components/common/CarouselTest';
import { useContext, useEffect, useMemo, useState } from 'react';
import ModelPreview from '@/components/model/ModelPreview';
// import CaseInfo from '@/components/common/CaseInfo';
// import HomeMenu from '@/components/common/menu/HomeMenu';
import ButtonImageArrow from '@/components/button/ButtonImageArrow';
import { GlobalContext } from '@/components/context/GlobalContextProvider';
import GameMenu from '@/components/common/menu/GameMenu';

// const models = [
//   '/assets/models/steam_girl.glb',
//   '/assets/models/gangster.glb',
//   '/assets/models/corgi.glb',
//   '/assets/models/archer.glb',
//   '/assets/models/kpop.glb',
//   '/assets/models/space_range.glb',
//   '/assets/models/ninja.glb',
//   '/assets/models/night_steal.glb',
//   '/assets/models/necromance.glb',
//   '/assets/models/demonic.glb',
//   '/assets/models/sorceress.glb',
//   '/assets/models/monkey_king.glb',
// ];
export default function HomePage() {

  // Context
  const {
    character: [character],
    selectedIndex: [activeIndex, setActiveIndex],
  } = useContext(GlobalContext);

  // Memo
  const models = useMemo<string[]>(() => {
    return character.map((char) => char.url_model);
  }, [character]);

  console.log(models);

  // // State
  // const [activeIndex, setActiveIndex] = useState(0);
  const [loadedModels, setLoadedModels] = useState<(JSX.Element | null)[]>(Array(models.length).fill(null));

  const handleSlideChange = (index: number) => {
    if (index < 0 || index >= models.length || models.length < 1) return;

    setActiveIndex(index);

    const newLoadedModels = [...loadedModels];
    const lengthModels = models.length - 1;
    const indexPrev = index === 0 ? lengthModels : index - 1;
    const indexNext = index === lengthModels ? 0 : index + 1;
    console.log(models[index]);
    if (!loadedModels[index] || !loadedModels[indexPrev] || !loadedModels[indexNext]) {
      if (!loadedModels[index]) {
        newLoadedModels[index] = <ModelPreview key={models[index]} active={true} modelUrl={models[index]}/>;
      }
      if (!loadedModels[indexPrev]) {
        newLoadedModels[indexPrev] = <ModelPreview key={models[indexPrev]} active={true} modelUrl={models[indexPrev]}/>;
      }
      if (!loadedModels[indexNext]) {
        newLoadedModels[indexNext] = <ModelPreview key={models[indexNext]} active={true} modelUrl={models[indexNext]}/>;
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
      <header className="font-mochi">
        <Profile/>
        <div className="flex justify-between">
          <span></span>
          <div className='flex flex-col gap-2'>
            <Link href="/wallet">
              <ButtonImageSquare image="\assets\item\wallet.svg"
                                 className="bg-[#2B0940] bg-[url('/assets/rect/btn-gold.svg'),_url('/assets/bg/bg-btn-wallet.svg')]">Wallet</ButtonImageSquare>
            </Link>
            {/*<ButtonImageSquare image="\assets\item\battle.svg"*/}
            {/*                   className="bg-[#971C01] bg-[url('/assets/rect/btn-gold.svg'),_url('/assets/bg/bg-btn-battle.svg')] pb-2">Battle</ButtonImageSquare>*/}
          </div>
        </div>
      </header>
      <main className=" flex-1 relative sm:mt-3 md:mt-10">
        {/*<ChatPopup/>*/}
        <Carousel loop onSlideChange={handleSlideChange}>
          {models.map((model, index) => (
            <div key={index} className="relative h-full flex-[0_0_100%]">
              {loadedModels[index]}
            </div>
          ))}
        </Carousel>
      </main>
      <section className="text-center w-full">
        {/*<InputChat className="mb-2 mx-auto" placeholder={'Start typing ...'}/>*/}
        <div className="mb-2 w-full flex justify-center">
          <ButtonImageSquare size='md' image="\assets\item\play-item.svg"
                             className="bg-[#2B0940] bg-[url('/assets/rect/btn-left-play.svg')]"></ButtonImageSquare>
          <Link href={'/game'}><ButtonImageArrow size='lg'>Play</ButtonImageArrow></Link>
          <ButtonImageSquare size='md' image="\assets\item\play-item.svg"
                             className="bg-[#2B0940] bg-[url('/assets/rect/btn-right-play.svg')]"></ButtonImageSquare>
        </div>
        {/*<div className="flex gap-1.5 mb-6 justify-center">*/}
        {/*  <ButtonImageArrow>For $NUD</ButtonImageArrow>*/}
        {/*  <ButtonImageArrow>For $TON</ButtonImageArrow>*/}
        {/*  <ButtonImageArrow>Free game</ButtonImageArrow>*/}
        {/*</div>*/}
        {/*<CaseInfo/>*/}
        {/*<HomeMenu/>*/}
        <GameMenu/>
      </section>
    </div>
  </HomeContextProvider>;
}