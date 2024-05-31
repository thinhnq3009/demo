import Phaser, { NONE } from 'phaser';
import Stat from '~/data/stat';
import MyUltils from '../Utils';

export default class StatGameObject extends Phaser.GameObjects.Container {
  // Add properties for the stats of the object
  public stat: Stat;

  private current_stone = NONE;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, stat: Stat) {
    super(scene, x, y);
    const text_value_offset = 140;
    const y_text_offset = 10;
    this.stat = stat;
    const image = scene.add.image(x, y, texture);
    image.name = 'image_stat';
    this.add(image);
    const text_type = scene.add.text(x - text_value_offset, y - y_text_offset, this.convert_to_short_string(stat.type),
      {
        fontFamily: 'Mochiy Pop One',
        fontSize: '14px',
        color: this.convert_to_type_to_color(stat.type),
        stroke: '##8B661E',
        strokeThickness: 1,
      },
    );
    text_type.name = 'text_stat_type';
    this.add(text_type);
    const text_value = scene.add.text(x, y - y_text_offset, stat.value.toString(), {
      fontFamily: 'Mochiy Pop One',
      fontSize: '14px',
      color: '#fff',
      stroke: '#8B661E',
      strokeThickness: 1,
    }).setOrigin(0.5, 0);
    text_value.name = 'text_stat_value';
    this.add(text_value);
    const txt_upgrade = scene.add.text(text_value.x + 30, text_value.y, '(+1)', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '14px',
      color: '#8CFF32',
      stroke: '#8B661E',
      strokeThickness: 1,
      align: 'left',
    }).setOrigin(0.5, 0);
    txt_upgrade.name = 'txt_upgrade';
    const txt_upgrade_percent = scene.add.text(txt_upgrade.x + 100, txt_upgrade.y, '(1%)', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '14px',
      color: '#8CFF32',
      stroke: '#8B661E',
      strokeThickness: 1,
      align: 'left',
    }).setOrigin(0.5, 0);
    txt_upgrade_percent.name = 'txt_upgrade_percent';
    this.add(txt_upgrade);
    this.add(txt_upgrade_percent);
    txt_upgrade_percent.visible = false;
    txt_upgrade.visible = false;
    // Add the object to the scene
    this.scene.add.existing(this);
  }

  set_alpha(value: number) {
    const image = this.getByName('image_stat') as Phaser.GameObjects.Image;
    image.alpha = value;
    const text_type = this.getByName('text_stat_value') as Phaser.GameObjects.Text;
    text_type.alpha = value;
    const text_value = this.getByName('text_stat_type') as Phaser.GameObjects.Text;
    text_value.alpha = value;
  }

  update_percent_text(percent: number) {
    const txt_upgrade_percent = this.getByName('txt_upgrade_percent') as Phaser.GameObjects.Text;
    txt_upgrade_percent.text = '(' + percent + '%)';
  }

  update_percent_success(stone_level: number, number_of_stone: number) {
    let one_stone_percent = 0;
    console.log(this.stat.value);
    switch (stone_level) {
      case 1:
        one_stone_percent = MyUltils.calculate_ratio_upgrading_lv1(this.stat.value);
        break;
      case 2:
        one_stone_percent = MyUltils.calculate_ratio_upgrading_lv2(this.stat.value);
        break;
      case 3:
        one_stone_percent = MyUltils.calculate_ratio_upgrading_lv3(this.stat.value);
        break;
      default:
        break;
    }
    let total_percent: number = one_stone_percent * number_of_stone;
    total_percent = parseFloat(total_percent.toFixed(2));
    this.update_percent_text(total_percent);
  }

  highLight() {
    const image = this.getByName('image_stat') as Phaser.GameObjects.Image;
    image.setTint(0xFBCE78);
  }

  remove_highLight() {
    const image = this.getByName('image_stat') as Phaser.GameObjects.Image;
    image.clearTint();
  }

  update_stat(stat: Stat) {
    this.stat = stat;
    const text_value = this.getByName('text_stat_value') as Phaser.GameObjects.Text;
    text_value.text = stat.value.toString();
  }

  upgrade_status(percent: number) {
    const txt_upgrade = this.getByName('txt_upgrade') as Phaser.GameObjects.Text;
    txt_upgrade.visible = true;
    const txt_upgrade_percent = this.getByName('txt_upgrade_percent') as Phaser.GameObjects.Text;
    txt_upgrade_percent.text = percent + '%)';
    txt_upgrade_percent.visible = true;
  }

  hide_upgrade_status() {
    const txt_upgrade = this.getByName('txt_upgrade') as Phaser.GameObjects.Text;
    txt_upgrade.visible = false;
    const txt_upgrade_percent = this.getByName('txt_upgrade_percent') as Phaser.GameObjects.Text;
    txt_upgrade_percent.visible = false;
  }

  convert_to_short_string(string_type: string): string {
    switch (string_type) {
      case 'attack':
        return 'ATK';
      case 'defense':
        return 'DEF';
      case 'energy':
        return 'ENG';
      default:
        return string_type;
    }
  }

  convert_to_type_to_color(string_type: string): string {
    switch (string_type) {
      case 'attack':
        return '#FFBD13';
      case 'defense':
        return '#A0DDFF';
      case 'energy':
        return '#AFFFAD';
      default:
        return '#FFBD13';
    }
  }
}