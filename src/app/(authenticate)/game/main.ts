import Phaser, { Game } from 'phaser';

import PrayScene from './scenes/PrayScene';
import PlayGame from './scenes/PlayScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,

  },
  scene: [PrayScene,
    PlayGame],
  transparent: true,
};

const StartGame = (parent: string) => {

  return new Game({ ...config, parent });

};
export default StartGame;



