'use client';
import { useContext, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from '@/app/(authenticate)/game/PhaserGame';
import { GlobalContext } from '@/components/context/GlobalContextProvider';

export default function GameContentPage() {

  const {
    character: [characters],
    selectedIndex: [index],
  } = useContext(GlobalContext);

  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [, setCanMoveSprite] = useState(true);
  const currentScene = (scene: Phaser.Scene) => {
    console.log(scene);
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  };

  return <div className="h-screen bg-[url('/assets/prayscene/bg.png')] bg-cover bg-center">
    <PhaserGame ref={phaserRef} currentActiveScene={currentScene}/>
  </div>;
}