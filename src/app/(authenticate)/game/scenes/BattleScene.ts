import CustomButton from './View/Button';
import * as THREE from 'three';
import { GLTFLoader } from 'THREE/examples/jsm/loaders/GLTFLoader.js';

export default class BattleScene extends Phaser.Scene {
  private text_timer: Phaser.GameObjects.Text | undefined;

  constructor() {
    super('BattleScene');
  }

  preload() {
    this.load.image('background', 'assets/battle/background.png');
    this.load.image('bottom_bg', 'assets/battle/bottom_bg.png');
    this.load.image('btn_attack', 'assets/battle/attack_btn.png');
    this.load.image('btn_defend', 'assets/battle/defend_btn.png');
    this.load.image('btn_end', 'assets/battle/end_btn.png');
  }
    
  create() {

    const btn_offset = 100;
    this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'background').setOrigin(0.5, 0.5).setScale(0.5);
    const bottom_bg = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.83, 'bottom_bg').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
    const btn_attack = new CustomButton(this, bottom_bg.x - btn_offset, bottom_bg.y, 'btn_attack', '', () => {});
    //this.add.image(bottom_bg.x - btn_offset, bottom_bg.y, 'btn_attack').setOrigin(0.5,0.5).setScale(0.5,0.5).setInteractive({});
    //this.add.image(bottom_bg.x + btn_offset, bottom_bg.y, 'btn_defend').setOrigin(0.5,0.5).setScale(0.5,0.5).setInteractive({});
    const btn_defend = new CustomButton(this, bottom_bg.x + btn_offset, bottom_bg.y, 'btn_defend', '', () => {});
    //this.add.image(bottom_bg.x, bottom_bg.y + btn_offset + 20, 'btn_end').setOrigin(0.5,0.5).setScale(0.5,0.5).setInteractive({});
    this.text_timer = this.add.text(bottom_bg.x, bottom_bg.y + btn_offset - 20, '15S', { fontFamily: 'Mochiy Pop One', fontSize: '16px', color:'#fff', stroke: '#8D5522', strokeThickness: 1 }).setOrigin(0.5, 0.5);
    const btn_end = new CustomButton(this, bottom_bg.x, bottom_bg.y + btn_offset + 20, 'btn_end', '', () => {});
    this.run_timer();
  }

  run_timer() {
    let time = 15;
    this.time.addEvent({
      delay: 1000,
      repeat: 15,
      callback: () => {
        this.text_timer?.setText(time + 'S');
        time -= 1;
      },
    });
  } 
}