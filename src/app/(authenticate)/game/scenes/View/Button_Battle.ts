import CustomButton from "./Button";

export default class ButtonBattle extends CustomButton{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, callback: Function) {
        super(scene, x, y, texture, '', callback);
    }
    
    onChangeState() {
        const button = this.getByName('button') as Phaser.GameObjects.Image;
        button.setTint(0x00ff00);
    }

    resetState() {
        const button = this.getByName('button') as Phaser.GameObjects.Image;
        button.clearTint();
    }
}