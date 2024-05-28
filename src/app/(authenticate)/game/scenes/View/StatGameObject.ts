import Phaser, { NONE } from 'phaser';
import Stat from '@/app/(authenticate)/game/data/stat';

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