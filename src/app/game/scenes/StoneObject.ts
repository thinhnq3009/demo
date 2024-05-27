import DraggableObject from './DraggableObject';

export default class StoneGameObject extends Phaser.GameObjects.Container {
  public value: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, value:number) {
    super(scene, x, y);
    this.value = value;
    const image = new DraggableObject(scene, 0, 0, texture, value);
    const txt_value = scene.add.text(0, 10, value.toString(), { fontFamily: 'Mochiy Pop One', fontSize: '8px', color:'#fff', stroke: '#8B661E', strokeThickness: 1 }).setOrigin(0.5, 0);
    this.add(image);
    this.add(txt_value);
    this.scene.add.existing(this);
  }
}