import { Scene, GameObjects } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { TypeableText } from '../myObjects/TypeableText';
export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    aGrid:AlignGrid
    startText: TypeableText;
    earth: GameObjects.Image;
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.aGrid = new AlignGrid(this, 5,5)
        this.background = this.add.image(512, 384, 'background');
        this.earth = this.add.sprite(0, 0, 'earth');
        this.aGrid.placeAtIndex(12, this.earth);
        this.earth.setScale(10);
        this.title = this.add.text(512, 460, 'TYPE TO SAVE THE WORLD', {
            fontFamily: 'Arial Black', fontSize: 54, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        this.aGrid.placeAtIndex(7,this.title);
        this.startText = new TypeableText(this,0,0,"start",50);
      
        this.aGrid.placeTypeableTextAtIndex(17,this.startText);
        if(!this.input.keyboard){return}
        this.input.keyboard.on('keydown', (keyPressed:any) => {
            if(!this.startText.getFirstAlive()){return}
            if(this.startText.getFirstAlive().text===keyPressed.key){
                this.startText.getFirstAlive().setTyped(true);
                if(!this.startText.getFirstAlive()){
                    this.scene.start('Game');
                }
            }
        });
    }
    update(time:any){
        this.earth.rotation += 0.005;
        this.earth.y = this.earth.y + Math.sin(time / 1000 * 2)
    }
}
