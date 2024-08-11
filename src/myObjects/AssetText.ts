import { Scene } from "phaser";

export class AssetText extends Phaser.GameObjects.Text{
    constructor(scene:Scene){
        super(scene,0,0,"Assets by J-ZO",{
            fontSize: 25,
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            fontFamily: "Lucida Handwriting",
        });
        this.setOrigin(1,1);
        this.setPosition(Number(scene.game.config.width), Number(scene.game.config.height));
        scene.add.existing(this);
    }
}