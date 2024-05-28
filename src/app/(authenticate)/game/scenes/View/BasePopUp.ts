import TweenEffect from '../TweenEffect';

export default class BasePopup extends Phaser.GameObjects.Container {
  protected center_x: number;

  protected center_y: number;

  protected main_container: Phaser.GameObjects.Container | undefined;

  protected sound_display: Phaser.Sound.BaseSound | undefined;

  protected sound_hover_button: Phaser.Sound.BaseSound | undefined;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.center_y = y;
    this.center_x = x;
    this.sound_display = scene.sound.add('show_sound');
    this.sound_hover_button = scene.sound.add('hover_button_sound', { volume: 0.05 });
    this.create_View();
  }

  create_View() {
    this.main_container = this.scene.add.container(this.center_x, this.center_y);
    console.log('main_container', this.main_container);
  }

  show() {
    if (this.main_container)
      TweenEffect.fadeIn(this.scene, this.main_container, this.sound_display!, 1000);
    else
      console.error('main_container is not defined');
  }

  hide() {
    if (this.main_container)
      TweenEffect.fadeOut(this.scene, this.main_container, this.sound_display!, 1000, 1000);
    else
      console.error('main_container is not defined');
  }

  hide_no_animation() {
    if (this.main_container)
      this.main_container.visible = false;
    else
      console.error('main_container is not defined');
  }

  is_showing() {
    if (this.main_container)
      return this.main_container.visible;
    else
      return false;
  }
}