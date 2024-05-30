import StoneData from '~/data/stone_data';
import DraggableObject from './DraggableObject';

export default class StoneGameObject extends Phaser.GameObjects.Container {
  public stoneData: StoneData;

  constructor(scene: Phaser.Scene, x: number, y: number, stoneData: StoneData) {
    super(scene, x, y);
    this.stoneData = stoneData;
    console.log('stoneData', stoneData.sprite);
    const image = new DraggableObject(scene, 0, 0, stoneData.sprite, stoneData.value);
    const txt_value = scene.add.text(0, 10, stoneData.value.toString(), { fontFamily: 'Mochiy Pop One', fontSize: '8px', color:'#fff', stroke: '#8B661E', strokeThickness: 1 }).setOrigin(0.5, 0);
    txt_value.name = 'txt_value';
    this.add(image);
    this.add(txt_value);
    this.scene.add.existing(this);
  }

  update_value(value:number): void {
    const txt_value = this.getByName('txt_value') as Phaser.GameObjects.Text;
    txt_value.text = value.toString();
  }
}