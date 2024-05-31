import TweenEffect from '../TweenEffect';
import BasePopup from './BasePopUp';

export default class SuccessFailPopup extends BasePopup {
  create_View(): void {
    super.create_View();
    const background = this.scene.add.rectangle(0, 0, this.scene.game.canvas.width * 2, this.scene.game.canvas.height * 2, 0x000000);
    background.setAlpha(0.5); // Đặt độ trong suốt của tấm nền
    background.setInteractive();
    this.main_container?.add(background);
    const img_success = this.scene.add.image(0, 0, 'success').setOrigin(0.5, 0.5).setScale(0.5);
    img_success.name = 'img_success';
    this.main_container?.add(img_success);
    this.hide_no_animation();
  }

  show_win(is_win:boolean) {
    const img_success = this.main_container?.getByName('img_success') as Phaser.GameObjects.Image;
    if (is_win) {
      img_success.setTexture('success');
    } else {
      img_success.setTexture('fail');
    }
    this.show();
    this.scene.time.delayedCall(3000, () => {
      this.hide();
    });
  }

  reset_popup() {
  }
}