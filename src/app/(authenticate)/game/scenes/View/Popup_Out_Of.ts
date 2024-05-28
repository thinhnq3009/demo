import BasePopup from './BasePopUp';
import TweenEffect from '../TweenEffect';

export default class OutOfPrayPopup extends BasePopup {
  // Specific properties here
  public nav_font_size = '12px';
    
  create_View() {
    super.create_View();
    const pop_up_offset = 40;
    const item_icon_offset = 20;
    // Tạo tấm nền đen
    const background = this.scene.add.rectangle(this.main_container?.x, this.main_container?.y, this.scene.game.canvas.width * 2, this.scene.game.canvas.height * 2, 0x000000);
    background.setAlpha(0.5); // Đặt độ trong suốt của tấm nền
    this.main_container?.add(background);
    const bg_popup_out_pray = this.scene.add.image(this.main_container?.x ?? 0, (this.main_container?.y ?? 0) + pop_up_offset, 'bg_popup_out_pray').setOrigin(0.5, 0.5);
    this.main_container?.add(bg_popup_out_pray);
    const bg_item_popup_out_pray1 = this.scene.add.image(bg_popup_out_pray.x, bg_popup_out_pray.y - bg_popup_out_pray.height / 2 + 50, 'bg_item_popup_out_pray').setOrigin(0.5, 0);
    const ic_sand_clock = this.scene.add.image(bg_item_popup_out_pray1.x + item_icon_offset - bg_item_popup_out_pray1.width / 2, bg_item_popup_out_pray1.y + 10, 'ic_sand_clock').setOrigin(0, 0).setScale(0.5);
    this.main_container?.add(bg_item_popup_out_pray1);
    this.main_container?.add(ic_sand_clock);
    const text_waiting = this.scene.add.text(bg_item_popup_out_pray1.x + item_icon_offset, bg_item_popup_out_pray1.y + 30, 'Waiting for regenerate', { fontFamily: 'Mochiy Pop One', fontSize: this.nav_font_size, color: '#ffffff' }).setOrigin(0.5, 0.5);
    this.main_container?.add(text_waiting);
    const bg_item_popup_out_pray2 = this.scene.add.image(bg_popup_out_pray.x, bg_popup_out_pray.y - bg_popup_out_pray.height / 2 + 125, 'bg_item_popup_out_pray').setOrigin(0.5, 0);
    const ic_battle_shadow = this.scene.add.image(bg_item_popup_out_pray2.x + item_icon_offset - bg_item_popup_out_pray2.width / 2, bg_item_popup_out_pray2.y + 10, 'ic_battle_shadow').setOrigin(0, 0).setScale(0.5);
    this.main_container?.add(bg_item_popup_out_pray2);
    this.main_container?.add(ic_battle_shadow);
    const text_battle = this.scene.add.text(bg_item_popup_out_pray2.x + item_icon_offset, bg_item_popup_out_pray2.y + 30, 'Win battle to get', { fontFamily: 'Mochiy Pop One', fontSize: this.nav_font_size, color: '#ffffff' }).setOrigin(0.5, 0.5);
    this.main_container?.add(text_battle);
    const bg_item_popup_out_pray3 = this.scene.add.image(bg_popup_out_pray.x, bg_popup_out_pray.y - bg_popup_out_pray.height / 2 + 205, 'bg_item_popup_out_pray').setOrigin(0.5, 0);
    const ic_market = this.scene.add.image(bg_item_popup_out_pray3.x + item_icon_offset - bg_item_popup_out_pray3.width / 2, bg_item_popup_out_pray3.y + 10, 'ic_market').setOrigin(0, 0).setScale(0.4);
    this.main_container?.add(bg_item_popup_out_pray3);
    this.main_container?.add(ic_market);
    const text_market = this.scene.add.text(bg_item_popup_out_pray3.x + item_icon_offset, bg_item_popup_out_pray3.y + 30, 'Buy in Market', { fontFamily: 'Mochiy Pop One', fontSize: this.nav_font_size, color: '#ffffff' }).setOrigin(0.5, 0.5);
    this.main_container?.add(text_market);
    const ic_x_cross = this.scene.add.image(bg_popup_out_pray.x + bg_popup_out_pray.width / 2 - 30, bg_popup_out_pray.y - bg_popup_out_pray.height / 2 + 20, 'ic_x_cross').setOrigin(0.5, 0).setScale(0.5);
    ic_x_cross.setInteractive({ useHandCursor: true });
    this.main_container?.add(ic_x_cross);       
    Phaser.Actions.GridAlign([bg_item_popup_out_pray1, bg_item_popup_out_pray2, bg_item_popup_out_pray3], {
      width: 1,
      height: 3,
      cellWidth: 292,
      cellHeight: 61 + 12,
      x: bg_popup_out_pray.x,
      y: bg_popup_out_pray.y - bg_popup_out_pray.height / 2 + 95,
    });
    TweenEffect.add_hover_effect(this.scene, ic_x_cross, this.sound_hover_button!, 0.5, 0.6);
    ic_x_cross.on('pointerdown', () => {
      this.hide();
    });        
  }
  // Other specific methods here
}