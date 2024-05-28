export default class TweenEffect {

  constructor() {
        
  }

  public static fadeOut(scene: Phaser.Scene, object: Phaser.GameObjects.Container, sound: Phaser.Sound.BaseSound, duration: number, delay: number) {
    scene.tweens.add({
      targets: object,
      alpha: 0,
      duration: duration,
      ease: 'Power2',
      scaleY: 0,
      onStart: () => {
        object.setAlpha(1);
        object.setScale(1);
        sound.play();
      },
    });
    setTimeout(() => {
      object.setVisible(false);
    }, delay);
  }

  public static fadeIn(scene: Phaser.Scene, object: Phaser.GameObjects.Container, sound: Phaser.Sound.BaseSound, duration: number) {
    scene.tweens.add({
      targets: object,
      alpha: 1,
      duration: duration,
      ease: 'Power2',
      scale: 1,
      onStart: () => {
        object.setAlpha(0);
        object.setScale(1, 0);
        sound.play();
        object.setVisible(true);
      },
    });
  }

  public static add_hover_effect(scene: Phaser.Scene, item: Phaser.GameObjects.GameObject, hover_sound: Phaser.Sound.BaseSound, scalefrom, scaleto) {
    item.on('pointerover', () => {
      scene.tweens.add({
        targets: item,
        scale: { from: scalefrom, to: scaleto }, // Change this to your desired scale
        duration: 300, // Change this to your desired duration
        ease: 'Power2', // This is the easing function to use
        onStart: () => {
          hover_sound?.play();
        },
      });
    });

    item.on('pointerout', () => {
      scene.tweens.add({
        targets: item,
        scale: { from: scaleto, to: scalefrom }, // Change this to your original scale
        duration: 300, // Change this to your desired duration
        ease: 'Power2', // This is the easing function to use
      });
    });
  }
}