import Phaser from 'phaser';
import WebFont from 'webfontloader';
import UpgradePopup from './View/Popup_Upgrade';
import OutOfPrayPopup from './View/Popup_Out_Of';
import TweenEffect from './TweenEffect';
import StoneGameObject from './View/StoneObject';
import StoneData from '~/data/stone_data';
import StatGameObject from './View/StatGameObject';
import Global from '~/data/Global';
import SuccessFailPopup from './View/Success_Fail_Popup';
import ApiHandler from '~/scenes/ApiHandler';
import UserData from '~/data/user_data';
import NFTData from '~/data/NFT_data';

export default class PrayScene extends Phaser.Scene {
  public nav_font_size = '12px';

  // main screen
  private bg: Phaser.GameObjects.Image | undefined;

  private angle: Phaser.GameObjects.Image | undefined;

  private bg_bootmenu: Phaser.GameObjects.Image | undefined;

  private bg_nav: Phaser.GameObjects.Image | undefined;

  // View components
  private popup_out_spray: OutOfPrayPopup | undefined;

  private upgrade_popup: UpgradePopup | undefined;

  private container_btn_pray: Phaser.GameObjects.Container | undefined;

  private popup_success_fail: SuccessFailPopup | undefined;

  private topbar_container: Phaser.GameObjects.Container | undefined;

  //components
  private show_sound: Phaser.Sound.BaseSound | undefined;

  private main_font: Phaser.Loader.LoaderPlugin | undefined;

  private hover_sound: Phaser.Sound.BaseSound | undefined;

  private click_sound: Phaser.Sound.BaseSound | undefined;

  // support logic
  private arr_stone_data_object: Array<StoneGameObject> = new Array<StoneGameObject>();

  constructor() {
    super('PrayScene');
  }

  preload() {
    this.main_font = this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    this.load_sound_effect();
    this.load_images();
    //load image main
    WebFont.load({
      google: {
        families: ['Mochiy Pop One'],
      },
      active: function () {
        console.log('font loaded');
      },
    });

  }

  load_images() {
    this.load.html('inputtext', 'assets/input_text.html');
    this.load.image('btn_upgrade', 'assets/upgrade/btn_upgrade.png');
    this.load.image('upgrade_item', 'assets/upgrade/upgrade_item.png');
    this.load.image('bg', 'assets/prayscene/bg.png');
    this.load.image('angle', 'assets/prayscene/angle.png');
    this.load.image('btn_pray', 'assets/prayscene/button_pray.png');
    this.load.image('praypoints_holder', 'assets/prayscene/praypoints_holder.png');
    //load panel bottom menu
    this.load.image('bg_bootmenu', 'assets/bottom_menu/bg.png');
    this.load.image('border_progress_pray_point', 'assets/prayscene/border_progress_pray_point.png');
    this.load.image('item_bg', 'assets/bottom_menu/item_bg.png');
    this.load.image('bg_nav', 'assets/bottom_menu/nav_bg.png');
    this.load.image('ic_character', 'assets/icon/ic_character.png');
    this.load.image('ic_upgrade', 'assets/icon/ic_upgrade.png');
    this.load.image('ic_battle', 'assets/icon/ic_battle.png');
    this.load.image('ic_pray', 'assets/icon/ic_pray.png');
    this.load.image('ic_market', 'assets/icon/ic_market.png');
    // load icon for popup out of pray point
    this.load.image('bg_popup_out_pray', 'assets/popup/out_pray/bg_out_pray_popup.png');
    this.load.image('bg_item_popup_out_pray', 'assets/popup/out_pray/bg_item.png');
    this.load.image('ic_x_cross', 'assets/icon/ic_x_cross.png');
    this.load.image('ic_sand_clock', 'assets/icon/ic_sand_clock.png');
    this.load.image('ic_battle_shadow', 'assets/icon/ic_battle_shadow.png');
    // load image for top bar
    this.load.image('bg_top_bar', 'assets/topbar/bg.png');
    this.load.image('avatar', 'assets/topbar/fullavatar.png');
    this.load.image('exp_border', 'assets/topbar/exp_border.png');
    this.load.image('exp_progress', 'assets/topbar/exp_full.png');
    this.load.image('avatar_mask', 'assets/topbar/avatar_mask.png');
    // load image for upgrade popup        
    this.load.image('bg_upgrade_popup', 'assets/upgrade/bg.png');
    this.load.image('panel_upgrade', 'assets/upgrade/panel.png');
    this.load.image('upgrade_item', 'assets/upgrade/upgrade_item.png');
    this.load.image('ic_minus', 'assets/icon/ic_minus.png');
    this.load.image('ic_plus', 'assets/icon/ic_plus.png');
    this.load.image('bg_value', 'assets/upgrade/value_bg.png');
    //load image stone 
    this.load.image('red1', 'assets/stones/red1.png');
    this.load.image('red2', 'assets/stones/red2.png');
    this.load.image('red3', 'assets/stones/red3.png');
    this.load.image('yellow1', 'assets/stones/yellow1.png');
    this.load.image('yellow2', 'assets/stones/yellow2.png');
    this.load.image('yellow3', 'assets/stones/yellow3.png');
    this.load.image('green1', 'assets/stones/green1.png');
    this.load.image('green2', 'assets/stones/green2.png');
    this.load.image('green3', 'assets/stones/green3.png');
    // load image for winfail popup
    this.load.image('success', 'assets/popup/successfail/success.png');
    this.load.image('fail', 'assets/popup/successfail/fail.png');
  }

  load_sound_effect() {
    this.load.audio('main_sound', 'sounds/bg.ogg');
    this.load.audio('hover_button_sound', 'sounds/MI_SFX37.mp3');
    this.load.audio('click_button_sound', 'sounds/MI_SFX45.mp3');
    this.load.audio('show_sound', 'sounds/MI_SFX30.mp3');
    this.load.audio('success_sound', 'sounds/winfail.wav');
  }

  create() {
    this.hover_sound = this.sound.add('hover_button_sound', { volume: 0.05 });
    this.click_sound = this.sound.add('click_button_sound', { volume: 0.05 });
    this.show_sound = this.sound.add('show_sound');
    this.sound.add('main_sound', { volume: 0.1, loop: true }).play();
    //init user data here
    this.init_user_data();
    this.init_view();
  }

  init_view() {
    const w_mid_point = this.game.canvas.width / 2;
    const h_mid_point = this.game.canvas.height / 2;
    this.bg = this.add.image(w_mid_point, h_mid_point, 'bg')
      .setOrigin(0.5, 0.5);
    this.bg.displayWidth = this.game.canvas.width;
    this.bg.displayHeight = this.game.canvas.height;
    this.angle = this.add.image(w_mid_point, h_mid_point - 60, 'angle').setOrigin(0.5, 0.5).setScale(0.5);
    this.container_btn_pray = this.add.container(this.angle.x, this.angle.y + this.angle.height * 0.7 / 2 - 165);
    const btn_pray = this.add.image(0, 0, 'btn_pray').setOrigin(0.5, 0.5).setScale(0.5);
    const text = this.add.text(0, -10, 'Pray', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '20px',
      color: '#FCF5B8',
    }).setOrigin(0.5, 0.5);
    this.container_btn_pray.add(btn_pray);
    this.container_btn_pray.add(text);
    const interactive_zone = new Phaser.Geom.Rectangle(0, 0, btn_pray.width * btn_pray.scaleX, btn_pray.height * btn_pray.scaleY);
    interactive_zone.x -= interactive_zone.width / 2;
    interactive_zone.y -= interactive_zone.height / 2;
    this.container_btn_pray.setInteractive(interactive_zone, Phaser.Geom.Rectangle.Contains);
    this.container_btn_pray.setInteractive({ useHandCursor: true });
    TweenEffect.add_hover_effect(this, this.container_btn_pray, this.hover_sound, 1, 1.1);
    const praypoints_holder = this.add.image(0, 15, 'praypoints_holder').setOrigin(0.5, 0.5).setScale(0.5);
    const text_praypoints = this.add.text(0, 15, '50', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '8px',
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
    text_praypoints.name = 'text_praypoints';
    this.container_btn_pray.add(praypoints_holder);
    this.container_btn_pray.add(text_praypoints);
    this.container_btn_pray.on('pointerdown', () => this.pray_action());
    //const border_progress_pray_point = this.add.image(this.container_btn_pray.x, this.container_btn_pray.y + btn_pray.height*0.5/2+5, 'border_progress_pray_point').setOrigin(0.5, 0.5).setScale(0.5)
    //const progress_regenerate = this.add.image(border_progress_pray_point.x - border_progress_pray_point.width*border_progress_pray_point.scaleX/2, border_progress_pray_point.y, 'exp_progress').setOrigin(0, 0.5).setScale(0,1)
    //const text_timer = this.add.text(border_progress_pray_point.x, border_progress_pray_point.y, '00:00', { fontFamily: 'Mochiy Pop One', fontSize: '10px', color: '#ffffff' }).setOrigin(0.5, 0.5);
    // this.create_animation_progress(progress_regenerate,text_timer,0.555,60000, (value) => {
    //     const minutes = Math.floor((value * 0.555) * 60)
    //     const seconds = Math.floor(((value * 0.555) * 60 - minutes) * 60)
    //     text_timer.setText(`${seconds}:${minutes}`);
    // })

    this.create_top_bar();
    this.create_nav_bar();
    this.upgrade_popup = new UpgradePopup(this, this.game.canvas.width / 2, this.game.canvas.height / 2);
    this.load_stat_data();
    this.update_praypoint_data();
    this.create_bottom_menu();
    this.upgrade_popup?.hide_no_animation();
    this.popup_out_spray = new OutOfPrayPopup(this, this.game.canvas.width / 2, this.game.canvas.height / 2);
    this.popup_out_spray.hide_no_animation();
    this.popup_success_fail = new SuccessFailPopup(this, this.game.canvas.width / 2, this.game.canvas.height / 2);
    //this.popup_success_fail!.show_win(true)
    this.upgrade_popup.set_btn_upgrade_callback((a, b, c) => ApiHandler.handleUpgradeStone(this, a, b, c));
  }

  enable_btn_pray(b: boolean) {
    this.container_btn_pray?.setInteractive({ enabled: b });
  }

  show_result_pop_up(isSuccess: boolean) {
    this.popup_success_fail?.show_win(isSuccess);
  }

  update_praypoint_data() {
    const text_praypoints = this.container_btn_pray?.getByName('text_praypoints') as Phaser.GameObjects.Text;
    text_praypoints.setText(Global.userData.pray_points.toString());
  }

  update_ratio_upgrade(string_type: string) {
    this.upgrade_popup?.change_status(string_type);
  }

  update_view_when_data_change() {
    this.update_praypoint_data();
    this.update_stone_data();
    this.load_user_data_to_topbar();
  }

  init_user_data() {
    // load api here, replace null by api data
    Global.userData = UserData.input_user_data(null);
    Global.userData.on('update_user_data', () => this.update_view_when_data_change());
    Global.nftData = NFTData.convert_json_to_NFTData(null);
    Global.nftData.on('update_NFT_data', () => this.upgrade_popup?.update_view_when_NFT_data_change());
    ApiHandler.handleLoadUserData(this);
    ApiHandler.handleLoadCharacterData(this);
  }

  load_stat_data() {
    // load api here
    const data = Global.nftData.stats.slice();
    //
    const list_stat_object = this.upgrade_popup?.load_stat_data(data) as Array<StatGameObject>;
    this.upgrade_popup?.init_stat_data_toview(list_stat_object);
  }

  load_stone_data() {
    this.arr_stone_data_object = this.load_stone_data_toview(Global.userData.stone_data);
  }

  update_stone_data() {
    const arr = Global.userData.stone_data;
    if (arr.length === 0) {
      return;
    }
    const array_list_holer = arr.slice();
    array_list_holer.reverse();
    console.log('array_list_holer', array_list_holer);
    for (let i = 0; i < this.arr_stone_data_object.length; i++) {
      this.arr_stone_data_object[i].update_value(array_list_holer.pop()?.value);
    }
  }

  load_stone_data_toview(arr: Array<StoneData>): Array<StoneGameObject> {
    const spacex = this.bg_bootmenu!.width / 6;
    const y_padding = 60;
    const spacey = (this.bg_bootmenu!.height - y_padding) / 6;
    const center_pos = this.bg_bootmenu!.x;
    const array_list_holer = arr.slice();
    array_list_holer.reverse();
    const arr_StoneItemView = Array<StoneGameObject>();
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const item_bg = this.add.image(center_pos + (i * spacex), this.bg_bootmenu!.y + (j * spacey), 'item_bg').setOrigin(0.5, 0.5);
        const item = new StoneGameObject(this, center_pos + (i * spacex), this.bg_bootmenu!.y + (j * spacey), array_list_holer.pop()!);
        arr_StoneItemView.push(item);
      }
    }
    return arr_StoneItemView;
  }

  create_bottom_menu(): Phaser.GameObjects.Container {

    const container = this.add.container(this.game.canvas.width / 2, this.game.canvas.height - 235);
    this.bg_bootmenu = this.add.image(this.game.canvas.width / 2, this.game.canvas.height - 235, 'bg_bootmenu').setOrigin(0.5, 0.5).setScale(0.5);
    const spacex = this.bg_bootmenu.width / 6;
    const y_padding = 60;
    const spacey = (this.bg_bootmenu.height - y_padding) / 6;
    const center_pos = this.bg_bootmenu.x;
    const array_list_holer = new Array<StoneGameObject>();
    this.load_stone_data();
    return container;
  }

  create_nav_bar() {
    const y_offset = 100;
    const y_item_offset = -5;
    this.bg_nav = this.add.image(this.game.canvas.width / 2, this.game.canvas.height - y_offset, 'bg_nav').setOrigin(0.5, 0);
    const item_space = this.bg_nav.width / 5;
    const item_center_y = this.bg_nav.x - y_item_offset;
    const item_center_x = this.bg_nav.x;
    const ic_character = this.add.image(item_center_x + (-2 * item_space), item_center_y, 'ic_character').setOrigin(0.5, 0).setScale(0.5);
    const text_character = this.add.text(ic_character.x, ic_character.y + 60, 'Character', {
      fontFamily: 'Mochiy Pop One',
      fontSize: this.nav_font_size,
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
    const ic_upgrade = this.add.image(item_center_x + (-1 * item_space), item_center_y, 'ic_upgrade').setOrigin(0.5, 0).setScale(0.5);
    const text_upgrade = this.add.text(ic_upgrade.x, ic_upgrade.y + 60, 'Upgrade', {
      fontFamily: 'Mochiy Pop One',
      fontSize: this.nav_font_size,
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
    const ic_battle = this.add.image(item_center_x + (0 * item_space), item_center_y, 'ic_battle').setOrigin(0.5, 0).setScale(0.5);
    const text_battle = this.add.text(ic_battle.x, ic_battle.y + 60, 'Battle', {
      fontFamily: 'Mochiy Pop One',
      fontSize: this.nav_font_size,
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
    const ic_pray = this.add.image(item_center_x + (1 * item_space), item_center_y, 'ic_pray').setOrigin(0.5, 0).setScale(0.5);
    const text_pray = this.add.text(ic_pray.x, ic_pray.y + 60, 'Pray', {
      fontFamily: 'Mochiy Pop One',
      fontSize: this.nav_font_size,
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
    const ic_market = this.add.image(item_center_x + (2 * item_space), item_center_y, 'ic_market').setOrigin(0.5, 0).setScale(0.5);
    const text_market = this.add.text(ic_market.x, ic_market.y + 60, 'Market', {
      fontFamily: 'Mochiy Pop One',
      fontSize: this.nav_font_size,
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
    const list_button = [ic_battle, ic_pray, ic_market, ic_upgrade, ic_character];
    for (let i = 0; i < list_button.length; i++) {
      TweenEffect.add_hover_effect(this, list_button[i], this.hover_sound!, 0.5, 0.6);
    }
    ic_character.on('pointerdown', () => this.button_character_onclick());
    ic_upgrade.on('pointerdown', () => this.button_upgrade_onclick());
    ic_battle.on('pointerdown', () => this.button_battle_onclick());
    ic_pray.on('pointerdown', () => this.button_pray_onclick());
    ic_market.on('pointerdown', () => this.button_market_onclick());
    ic_character.setInteractive({ useHandCursor: true });
    ic_upgrade.setInteractive({ useHandCursor: true });
    ic_battle.setInteractive({ useHandCursor: true });
    ic_pray.setInteractive({ useHandCursor: true });
    ic_market.setInteractive({ useHandCursor: true });
  }

  create_top_bar() {
    const y_offset = 170;
    const y_item_offset = -10;
    const y_exp_offset = 90;
    this.topbar_container = this.add.container(this.game.canvas.width / 2 + 70, y_offset);
    const bg_top_bar = this.add.image(-100, 0, 'bg_top_bar').setOrigin(0.5, 0).setScale(0.5);
    this.topbar_container.add(bg_top_bar);
    const text_name = this.add.text(bg_top_bar.x - 105, bg_top_bar.y, 'Player', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '12px',
      color: '#ffffff',
      align: 'left',
    }).setOrigin(0, 0);
    text_name.name = 'text_name';
    this.topbar_container.add(text_name);
    const text_level = this.add.text(bg_top_bar.x - 85, bg_top_bar.y + 18, 'Lv. 1', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '8px',
      color: '#ffffff',
    }).setOrigin(0.5, 0);
    text_level.name = 'text_level';
    this.topbar_container.add(text_level);
    const exp_border = this.add.image(-100, bg_top_bar.y + 30, 'exp_border').setOrigin(0.5, 0).setScale(0.5);
    this.topbar_container.add(exp_border);
    const avatar = this.add.image(bg_top_bar.x - bg_top_bar.width / 4, bg_top_bar.y + y_item_offset, 'avatar').setOrigin(0.5, 0).setScale(0.25);
    const avatar_border = this.add.image(avatar.x, avatar.y, 'avatar_border').setOrigin(0.5, 0).setScale(0.25);
    //avatar.setMask(mask);
    const exp_progress = this.add.image(exp_border.x - exp_border.width / 4, exp_border.y + 6, 'exp_progress').setOrigin(0, 0.5).setScale(0, 1);
    exp_progress.name = 'exp_progress';
    const text_exp = this.add.text(exp_border.x, exp_border.y + 7, '0/100', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '12px',
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
    text_exp.name = 'text_exp';
    const max = 80;
    // this.create_animation_progress(exp_progress,text_exp,1,10000, (value) => {
    //     text_exp.setText(`${Math.floor(value * max)}/${max}`);
    // })
    this.topbar_container.add(exp_progress);
    this.topbar_container.add(text_exp);
    this.topbar_container.add(avatar);
    this.topbar_container.add(avatar_border);
    this.load_user_data_to_topbar();
  }

  load_user_data_to_topbar() {
    const text_name = this.topbar_container!.getByName('text_name') as Phaser.GameObjects.Text;
    const text_level = this.topbar_container!.getByName('text_level') as Phaser.GameObjects.Text;
    const user_data = Global.userData;
    text_name.setText(user_data.username);
    text_level.setText(`Lv. ${user_data.level}`);
    const exp_progress = this.topbar_container!.getByName('exp_progress') as Phaser.GameObjects.Image;
    const originalWidth = exp_progress.scaleX;
    const value = user_data.reminder / user_data.next_exp;
    exp_progress.scaleX = value;
    const text_exp = this.topbar_container!.getByName('text_exp') as Phaser.GameObjects.Text;
    text_exp.setText(`${Math.floor(user_data.reminder)}/${Math.round(user_data.next_exp)}`);
  }

  create_animation_progress(exp_progress: Phaser.GameObjects.Image, text: Phaser.GameObjects.Text, max_scale, duration, callback: (value: number) => void) {
    const originalWidth = exp_progress.scaleX; // Save the original width
    const max = 80;
    const value = { val: 0 }; // Object to tween
    const tween = this.tweens.add({
      targets: value,
      val: max_scale,
      duration: duration, // Duration of the tween in milliseconds
      yoyo: false, // Make the tween return to its start value after reaching the end
      repeat: -1, // -1 means repeat forever
      onUpdate: function () {
        //text.setText(`${Math.floor(value.val * max)}/${max}`); // Update the text with the new value
        callback(value.val);
        exp_progress.scaleX = originalWidth + value.val; // Update the width of the image
      },
    });
  }

  button_battle_onclick() {
    this.click_sound?.play();
    console.log('Battle action');
    this.scene.start('PlayGame');
  }

  button_pray_onclick() {
    this.click_sound?.play();
    console.log('Pray action');
    if (this.upgrade_popup?.is_showing()) {
      this.upgrade_popup?.hide();
    }
  }

  button_market_onclick() {
    this.click_sound?.play();
    console.log('Market action');
  }

  button_upgrade_onclick() {
    this.click_sound?.play();
    if (this.upgrade_popup?.is_showing())
      return;
    this.upgrade_popup?.show();
  }

  button_character_onclick() {
    this.click_sound?.play();
    console.log('Character action');
  }

  show_out_of_spray_popup() {
    if (this.popup_out_spray?.is_showing())
      return;
    this.popup_out_spray?.show();
  }

  pray_action() {
    ApiHandler.handlePray(this);
    // if (this.upgrade_popup?.is_showing())
    //   return;
    // if (this.popup_out_spray) {
    //   this.popup_out_spray?.show();
    // } else {
    //   console.log('Pray action');
    // }
  }
}

