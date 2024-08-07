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
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //this.startText = new TypeText(this,"start");
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
        this.startText = new TypeableText(this,0,0,"start");
      
        this.aGrid.placeTypeableTextAtIndex(17,this.startText);
        //this.startText.x -= this.startText.width/2
        if(!this.input.keyboard){return}
        this.input.keyboard.on('keydown', (keyPressed:any) => {
            if(!this.startText.getFirstAlive()){return}
            if(this.startText.getFirstAlive().text===keyPressed.key){
                this.startText.getFirstAlive().typed();
                if(!this.startText.getFirstAlive()){
                    this.scene.start('Game');
                }
            }
        });
    }
    update(){

    }
}
