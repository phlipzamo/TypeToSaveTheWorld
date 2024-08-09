import { Scene, GameObjects } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { TypeableText } from '../myObjects/TypeableText';
export class MainMenu extends Scene
{
    background: GameObjects.Image;
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
        //grid to place objs, creates a 5x5 grid Left to right increasing starts at 0
        this.aGrid = new AlignGrid(this, 5,5)
        //following line will show the grid with indexes
        //this.aGrid.showNumbers()
        this.background = this.add.image(512, 384, 'background');
        this.createAndPlaceEarthSprite(12)
        this.createAndPlaceTitle("TYPE TO SAVE THE WORLD", 7)
        this.createAndPlaceStartText("start", 17);
        //handles the typing interaction
        this.createKeyboardTypingHandler();
    }
    update(time:any){
        //spin and bounce earth
        this.earth.rotation += 0.005;
        this.earth.y = this.earth.y + Math.sin(time / 1000 * 2)
    }
    createKeyboardTypingHandler(){
        if(!this.input.keyboard){return}
        this.input.keyboard.on('keydown', (keyPressed:any) => {
            if(!this.startText.hasUntypedLetters()){return}
            if(this.startText.isNextUntypedLetter(keyPressed.key)){
                this.startText.typeNextLetter(true);
                //if this was the last letter make game over
                if(!this.startText.hasUntypedLetters()){
                    this.scene.start('Game');
                }
            }
        });
    }
    createAndPlaceStartText(title: string, gridIndex: number){
         this.startText = new TypeableText(this,0,0,title,50);
         this.aGrid.placeTypeableTextAtIndex(gridIndex,this.startText);
    }
    createAndPlaceTitle(title: string, gridIndex: number){
        this.title = this.add.text(512, 460, title, {
            fontFamily: 'Arial Black', fontSize: 54, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        this.aGrid.placeAtIndex(gridIndex,this.title);
    }
    createAndPlaceEarthSprite(gridIndex: number){
        this.earth = this.add.sprite(0, 0, 'earth');
        this.earth.setScale(10);
        this.aGrid.placeAtIndex(gridIndex, this.earth);
    }

}
