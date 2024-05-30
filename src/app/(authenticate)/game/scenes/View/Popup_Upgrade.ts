import BasePopup from './BasePopup';
import StatGameObject from './StatGameObject';
import Stat from '~/data/stat';
import CustomButton from './Button';
import { GameObjects } from 'phaser';
import Global from '~/data/Global';
import StoneData from '~/data/stone_data';

export default class UpgradePopup extends BasePopup {
  // Specific properties here
  private group_item: GameObjects.Group | undefined;

  private list_stat: Array<StatGameObject> = new Array<StatGameObject>();

  private current_stat: StatGameObject | undefined;

  private current_max = 0;

  private current_select_stone: StoneData | undefined;

  create_View() {
    super.create_View();
    const offset = -50;
    const panel_y_offset = -120;
    const item_w = 322;
    const bg_upgrade_popup = this.scene.add.image(0, offset, 'bg_upgrade_popup').setOrigin(0.5, 0.5);
    this.main_container?.add(bg_upgrade_popup);
    const panel_upgrade = this.scene.add.image(0, panel_y_offset, 'panel_upgrade').setOrigin(0.5, 0.5);
    this.main_container?.add(panel_upgrade);
    // get data from server
    const upgrade_holder = this.scene.add.image(panel_upgrade.x, panel_upgrade.y + 180, 'item_bg').setOrigin(0.5, 0.5).setScale(1.5);
    const rs_image = this.scene.add.image(upgrade_holder.x, upgrade_holder.y, 'item_bg').setOrigin(0.5, 0.5).setScale(0.8).setInteractive();
    rs_image.name = 'rs_image';
    const zone = this.scene.add.zone(upgrade_holder.x, upgrade_holder.y, 72, 72).setRectangleDropZone(72, 72);
    this.main_container?.add(upgrade_holder);
    const btn_upgrade = new CustomButton(this.scene, 0, 160, 'btn_upgrade', 'Upgrade', () => {

    });
    btn_upgrade.name = 'btn_upgrade';
    const bg_value = this.scene.add.image(0, 115, 'bg_value').setOrigin(0.5, 0.5).setScale(0.5);
    const text_value = this.scene.add.text(0, 115, '', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '12px',
      color: '#fff',
      stroke: '#8B661E',
      strokeThickness: 1,
    }).setOrigin(0.5, 0.5);
    text_value.name = 'text_value';
    const btn_minus = new CustomButton(this.scene, -40, 115, 'ic_minus', '', () => {
      if (text_value.text == '')
        return;
      let value = parseInt(text_value.text);
      if (value > 0)
        value -= 1;
      this.update_text_value(value);
      this.current_stat?.update_percent_success(this.current_select_stone?.level!, value);
    });

    const btn_plus = new CustomButton(this.scene, 40, 115, 'ic_plus', '', () => {
      if (text_value.text == '')
        return;
      let value = parseInt(text_value.text);
      if (value < this.current_max)
        value += 1;
      this.update_text_value(value);
      this.current_stat?.update_percent_success(this.current_select_stone?.level!, value);
    });
    this.scene.input.on('drop', (pointer, gameObject, dropzone) => {
      if (dropzone) {
        rs_image.setTexture(gameObject.texture.key);
        this.change_status(gameObject.texture.key);
      }
    });
    //btn_upgrade.setInteractive({enabled:false})
    this.main_container?.add(zone);
    this.main_container?.add(rs_image);
    this.main_container?.add(btn_upgrade);
    this.main_container?.add(bg_value);
    this.main_container?.add(text_value);
    this.main_container?.add(btn_minus);
    this.main_container?.add(btn_plus);
  }

  set_btn_upgrade_callback(callback: Function) {
    const btn_upgrade = this.main_container?.getByName('btn_upgrade') as CustomButton;
    btn_upgrade.add_btn_listener(callback);
  }

  update_text_value(value: number) {
    const text_value = this.main_container?.getByName('text_value') as Phaser.GameObjects.Text;
    text_value.text = value.toString();
  }

  update_view_when_NFT_data_change() {
    let count = 0;
    this.list_stat.forEach(element => {
      (element as StatGameObject).update_stat(Global.nftData.stats[count]);
      count++;
    });
  }

  change_status(string_type: string) {
    const type = string_type.slice(0, -1);
    const lastChar = string_type[string_type.length - 1];
    const stone_data = Global.userData.stone_data;
    console.log('stone_data', stone_data);
    stone_data.forEach(element => {

      console.log(element.stone_type, type, element.level, parseInt(lastChar));
      if (element.stone_type == type && element.level == parseInt(lastChar)) {
        console.log('change text');
        this.update_text_value(element.value);
        this.current_max = element.value;
        this.current_select_stone = element;
      }
    });
    this.list_stat?.forEach(element => {
      (element as StatGameObject).set_alpha(0.3);
      (element as StatGameObject).remove_highLight();
      (element as StatGameObject).hide_upgrade_status();
    });
    switch (type) {
      case 'red':
        (this.list_stat?.[0] as StatGameObject).set_alpha(1);
        (this.list_stat?.[0] as StatGameObject).highLight();
        (this.list_stat?.[0] as StatGameObject).upgrade_status(20);
        (this.list_stat?.[0] as StatGameObject).update_percent_success(parseInt(lastChar), this.current_max);
        this.current_stat = this.list_stat?.[0] as StatGameObject;
        break;
      case 'yellow':
        (this.list_stat?.[2] as StatGameObject).set_alpha(1);
        (this.list_stat?.[2] as StatGameObject).highLight();
        (this.list_stat?.[2] as StatGameObject).upgrade_status(20);
        (this.list_stat?.[2] as StatGameObject).update_percent_success(parseInt(lastChar), this.current_max);
        this.current_stat = this.list_stat?.[2] as StatGameObject;
        break;
      case 'green':
        (this.list_stat?.[1] as StatGameObject).set_alpha(1);
        (this.list_stat?.[1] as StatGameObject).highLight();
        (this.list_stat?.[1] as StatGameObject).upgrade_status(20);
        (this.list_stat?.[1] as StatGameObject).update_percent_success(parseInt(lastChar), this.current_max);
        this.current_stat = this.list_stat?.[1] as StatGameObject;
        break;
      default:
        (this.list_stat?.[0] as StatGameObject).set_alpha(1);
        (this.list_stat?.[0] as StatGameObject).highLight();
        (this.list_stat?.[0] as StatGameObject).upgrade_status(20);
        (this.list_stat?.[0] as StatGameObject).update_percent_success(parseInt(lastChar), this.current_max);
        this.current_stat = this.list_stat?.[0] as StatGameObject;
        break;
    }
  }

  init_stat_data_toview(object_list: Array<StatGameObject>) {
    this.list_stat = object_list;
    const item_h = 50;
    const item_spacing = 20;
    this.group_item = this.scene.add.group();
    object_list.forEach(element => {
      this.group_item!.add(element);
    },
    );
    const grid = Phaser.Actions.GridAlign(this.group_item.getChildren(), {
      width: 1,
      height: 3,
      cellWidth: 150,
      cellHeight: item_h + item_spacing,
      x: 75,
      y: -160,
    });
    this.main_container?.add(grid);
  }

  load_stat_data(object_list: Array<Stat>): Array<StatGameObject> {
    const list_gameobj = new Array<StatGameObject>();
    object_list?.forEach(element => {
      const gj = new StatGameObject(this.scene, 0, 0, 'upgrade_item', element);
      list_gameobj.push(gj);
      console.log('stat', gj);
    });
    return list_gameobj;
  }

  show(): void {
    super.show();
    this.reset_popup();
  }

  reset_popup() {
    this.list_stat.forEach(element => {
      (element as StatGameObject).set_alpha(1);
      (element as StatGameObject).remove_highLight();
      (element as StatGameObject).hide_upgrade_status();
    });
    this.update_text_value(0);
    this.current_max = 0;
    this.current_select_stone = undefined;
    this.current_stat = undefined;
    const text_value = this.main_container?.getByName('text_value') as Phaser.GameObjects.Text;
    text_value.text = '';
    const rs_image = this.main_container?.getByName('rs_image') as Phaser.GameObjects.Image;
    rs_image.setTexture('item_bg');
  }

}