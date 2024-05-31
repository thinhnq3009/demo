export default class Preload extends Phaser.Scene {
  private text_timer: Phaser.GameObjects.Text | undefined;

  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('background', 'assets/battle/background.png');
    this.load.image('bottom_bg', 'assets/battle/bottom_bg.png');
    this.load.image('btn_attack', 'assets/battle/attack_btn.png');
    this.load.image('btn_defend', 'assets/battle/defend_btn.png');
    this.load.image('btn_end', 'assets/battle/end_btn.png');
  }

  startScenePray() {
    this.scene.start('Pray', { data: 'upgrade' });
  }
}