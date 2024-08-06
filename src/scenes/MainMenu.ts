import { Scene, GameObjects } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    aGrid:AlignGrid
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.aGrid = new AlignGrid(this, 5,5)
        //this.aGrid.showNumbers();
        this.background = this.add.image(512, 384, 'background');

        //this.logo = this.add.image(512, 300, 'logo');

        this.title = this.add.text(512, 460, 'TYPE TO SAVE THE WORLD', {
            fontFamily: 'Arial Black', fontSize: 54, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        this.aGrid.placeAtIndex(7,this.title);
        this.aGrid.showNumbers();
        this.input.once('pointerdown', () => {
            
            //this.scene.start('Game');

        });
    }
}
