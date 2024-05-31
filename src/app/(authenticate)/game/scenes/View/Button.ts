import TweenEffect from '../TweenEffect';

export default class CustomButton extends Phaser.GameObjects.Container {

  protected sound_hover_button: Phaser.Sound.BaseSound | undefined;

  protected sound_click_button: Phaser.Sound.BaseSound | undefined;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, text: string, callback: Function) {
    super(scene, x, y);
    this.sound_hover_button = scene.sound.add('hover_button_sound', { volume: 0.05 });
    this.sound_click_button = scene.sound.add('click_button_sound', { volume: 0.05 });
    const button = scene.add.image(0, 0, texture).setOrigin(0.5, 0.5).setScale(0.5);
    button.setInteractive({ useHandCursor: true });
    button.name = 'button';
    TweenEffect.add_hover_effect(scene, button, this.sound_hover_button, 0.5, 0.55);

    button.on('pointerdown', () => {
      this.sound_click_button?.play();
      callback();
    });

    const text_type = scene.add.text(0, 0, text, {
      fontFamily: 'Mochiy Pop One',
      fontSize: '12px',
      color: '#fff',
      stroke: '##8B661E',
      strokeThickness: 1,
    }).setOrigin(0.5, 0.5);
    this.add(button);
    this.add(text_type);
    this.scene.add.existing(this);
  }

  add_btn_listener(callback) {
    const button = this.getByName('button') as Phaser.GameObjects.Image;
    button.on('pointerdown', () => {
      this.sound_click_button?.play();
      callback();
    });
  }
}