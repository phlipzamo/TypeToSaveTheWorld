import { Scene } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { TypeableAstroid } from '../myObjects/TypeableAstroid';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    earth: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    aGrid: AlignGrid;
    astroid: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    typeableAstroid: TypeableAstroid;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.aGrid = new AlignGrid(this, 5,5)
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        this.typeableAstroid= new TypeableAstroid(this, 0,0,"hello",30)
        var indexPos = this.aGrid.getPosByIndex(2);
        this.typeableAstroid.move(indexPos.x, indexPos.y);
        //this.astroid=this.physics.add.sprite(10,10,"astroid");
        //this.aGrid.placeAtIndex(2,this.astroid);
        this.earth = this.add.image(0, 0, 'earth');
        this.aGrid.placeAtIndex(22, this.earth);
        this.earth.setScale(19);
        this.earth.y+=this.earth.displayHeight/3;
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNames('astroid', {start: 1, end: 1, zeroPad: 1, prefix: 'A', suffix: '.png'}),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'Explode',
            frames: this.anims.generateFrameNames('astroid', {start: 1, end: 13, zeroPad: 1, prefix: 'A', suffix: '.png'}),
            frameRate: 16,
            repeat: 0
        });
    }
    update() {
        this.typeableAstroid.moveDown(1);
    }
}
