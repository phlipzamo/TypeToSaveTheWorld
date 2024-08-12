import { Scene } from "phaser";
import { Align } from "../common/util/align";

export class AssetText extends Phaser.GameObjects.Text{
    constructor(scene:Scene){
        super(scene,0,0,"Assets by J-ZO",{
            fontSize: 25,
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            fontFamily: "Lucida Handwriting",
        });
        Align.alignToLBottomRight(this,scene);
        scene.add.existing(this);
    }
}