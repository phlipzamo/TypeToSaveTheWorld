import { Scene } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { AssetText } from '../myObjects/AssetText';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;
    aGrid: AlignGrid;
    timeText: Phaser.GameObjects.Text;
    wpmText: Phaser.GameObjects.Text;
    waterTag: AssetText;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);
        this.aGrid = new AlignGrid(this, 5,5);
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameover_text = this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.aGrid.placeAtIndex(7,this.gameover_text);

        this.wpmText = this.add.text(0, 0, localStorage.getItem("wpm")||"", {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.aGrid.placeAtIndex(11,this.wpmText);

        this.timeText = this.add.text(0, 0, localStorage.getItem("time")||"", {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.aGrid.placeAtIndex(16,this.timeText);
        this.gameover_text.setOrigin(0.5);
        this.waterTag = new AssetText(this);
        //this.aGrid.showNumbers();
        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
