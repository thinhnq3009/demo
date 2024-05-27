export default class DraggableObject extends Phaser.GameObjects.Image {
  public value: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, value: number) {
    super(scene, x, y, texture);
    this.setOrigin(0.5, 0.5).setScale(0.6);
    this.value = value;
    this.setInteractive();
    scene.input.setDraggable(this);

    scene.input.on('dragstart', function (pointer, gameObject) {

      //this.children.bringToTop(gameObject);
      console.log('dragstart');

    }, scene);

    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    scene.input.on('dragenter', (pointer, gameObject, dropZone) => {
      dropZone.setScale(2);
      console.log('dragenter');
    });

    scene.input.on('dragleave', (pointer, gameObject, dropZone) => {
      dropZone.setScale(2);
      console.log('dragleave');
    });

    scene.input.on('drop', (pointer, gameObject, dropZone) => {

      console.log('drop');
      // gameObject.x = dropZone.x;
      // gameObject.y = dropZone.y;

      // gameObject.input.enabled = false;

    });

    scene.input.on('dragend', (pointer, gameObject, dropped) => {
      console.log('dragend');
      // if (!dropped)
      // {
      //     gameObject.x = gameObject.input.dragStartX;
      //     gameObject.y = gameObject.input.dragStartY;
      // }

      // graphics.clear();
      // graphics.lineStyle(2, 0xffff00);
      // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    });
    this.scene.add.existing(this);
  }
}