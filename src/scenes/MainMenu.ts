import { Scene, GameObjects } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { AssetText } from '../myObjects/AssetText';
import { TypeableAstroid } from '../myObjects/TypeableAstroid';
export class MainMenu extends Scene
{
    background: GameObjects.Image;
    title: GameObjects.Text;
    aGrid:AlignGrid
    
    earth: GameObjects.Image;
    waterTag: AssetText;
    groupOfAstroids: GameObjects.Group;
    startText: TypeableAstroid;
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //grid to place objs, creates a 5x5 grid Left to right increasing starts at 0
        this.aGrid = new AlignGrid(this, 5,5)
        //following line will show the grid with indexes
        this.groupOfAstroids = this.add.group();
        this.background = this.add.image(512, 384, 'background');
        this.createAndPlaceEarthSprite(12)
        this.createAndPlaceTitle("TYPE TO SAVE THE WORLD", 7)
        this.groupOfAstroids.add(this.createAndPlaceTypeableAstroid("easy",16));
        this.groupOfAstroids.add(this.createAndPlaceTypeableAstroid("medium",17));
        this.groupOfAstroids.add(this.createAndPlaceTypeableAstroid("hard",18));
        //handles the typing interaction
        this.createKeyboardTypingHandler();
        //this.aGrid.showNumbers()
        this.waterTag = new AssetText(this);
    }
    update(time:any){
        //spin and bounce earth
        this.earth.rotation += 0.005;
        this.earth.y = this.earth.y + Math.sin(time / 1000 * 2)
    }
    createKeyboardTypingHandler(){
        if(!this.input.keyboard){return}
        this.input.keyboard.on('keydown', (keyPressed:any) => {
            //find typed astroid
            const astroidBeingTyped = <TypeableAstroid> this.groupOfAstroids.getChildren()
                .find((child)=>{
                    var typeableAstroid:TypeableAstroid= <TypeableAstroid> child;
                    return typeableAstroid.beingTyped===true;
                }
            );
            if(astroidBeingTyped){
                if(!astroidBeingTyped.typeableText.hasUntypedLetters()){return}
                if(astroidBeingTyped.typeableText.isNextUntypedLetter(keyPressed.key)){
                    astroidBeingTyped.typeableText.typeNextLetter(true);
                    //check if that was the last letter
                    if(!astroidBeingTyped.typeableText.hasUntypedLetters()){
                        this.scene.start('Game');
                    }
                }
                else{
                    const astroidToStartTyping = <TypeableAstroid> this.groupOfAstroids.getChildren()
                    .find((child)=>{
                        var typeableAstroid:TypeableAstroid= <TypeableAstroid> child;
                        return typeableAstroid.startLetter === keyPressed.key;
                    }
                    );
                    if(astroidToStartTyping){
                        astroidBeingTyped.reset();
                        astroidToStartTyping.typeableText.typeNextLetter(true);
                        astroidToStartTyping.setBeingTyped(true);
                    }    
                }
            }
            else{
                //find astroid to start typing 
                const astroidToStartTyping = <TypeableAstroid> this.groupOfAstroids.getChildren()
                    .find((child)=>{
                        var typeableAstroid:TypeableAstroid= <TypeableAstroid> child;
                        return typeableAstroid.startLetter === keyPressed.key;
                    }
                );
                if(astroidToStartTyping){
                    astroidToStartTyping.typeableText.typeNextLetter(true);
                    astroidToStartTyping.setBeingTyped(true);
                }     
            }
        });
    }
    createAndPlaceTypeableAstroid(title: string, gridIndex: number){
        var typeableAstroid = new TypeableAstroid(this, 0,0,title,30,1)
        var indexPos = this.aGrid.getPosByIndex(gridIndex);
        typeableAstroid.move(indexPos.x, indexPos.y);
        return typeableAstroid;
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
