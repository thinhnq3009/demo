export default class DraggableObject extends Phaser.GameObjects.Image {
  public value: number;
    
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, value:number) {
    super(scene, x, y, texture);
    this.setOrigin(0.5, 0.5).setScale(0.6);
    const origin = scene.add.image(x, y, texture).setOrigin(0.5, 0.5).setScale(0.6);
    this.value = value;
    this.setInteractive();
    scene.input.setDraggable(this);
    const origin_position = { x:x, y:y };
    scene.input.on('dragstart', function (pointer, gameObject) {
      //this.children.bringToTop(gameObject);
      console.log('dragstart');

    }, scene);

    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    scene.input.on('dragend', function (pointer, gameObject, dropped) {
      gameObject.x = origin_position.x;
      gameObject.y = origin_position.y;
    });
    this.scene.add.existing(this);
  }
}