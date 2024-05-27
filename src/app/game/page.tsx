'use client';
import { IRefPhaserGame, PhaserGame } from '@/app/game/PhaserGame';
import { useRef, useState } from 'react';

export default function GameContentPage() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [, setCanMoveSprite] = useState(true);
  const currentScene = (scene: Phaser.Scene) => {

    setCanMoveSprite(scene.scene.key !== 'MainMenu');

  };
  return <div className="h-screen bg-[url('/assets/prayscene/bg.png')] bg-cover bg-center">
    <PhaserGame ref={phaserRef} currentActiveScene={currentScene}/>
  </div>;
}