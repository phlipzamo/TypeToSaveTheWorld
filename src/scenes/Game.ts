import { Scene } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { TypeableAstroid } from '../myObjects/TypeableAstroid';
import { SPEED } from '../myObjects/Speed';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    msg_text : Phaser.GameObjects.Text;
    aGrid: AlignGrid;
    astroid: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    typeableAstroid: TypeableAstroid;
    words:string[]
    groupOfAstroids: Phaser.GameObjects.Group;
    earth: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    lettersInUse:string[]
    kills: number;
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.aGrid = new AlignGrid(this, 5,5);
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        this.createAndPlaceEarth()
        this.kills = 0;
        this.createAnimations();
        this.groupOfAstroids = this.add.group();
        this.words = this.cache.json.get("twoLetterWords");
        this.lettersInUse=[];
        this.addNewTypeableAstroidToScene();
        //TODO Clean this up, make a it clear what you are doing
        if(!this.input.keyboard){return}
        this.input.keyboard.on('keydown', (keyPressed:any) => {
            const typeableAstroid = <TypeableAstroid> this.groupOfAstroids.getChildren()
                .find((child)=>{
                    var typeableAstroid:TypeableAstroid= <TypeableAstroid> child;
                    return typeableAstroid.beingTyped===true;
                }
            );
            if(typeableAstroid){
                if(!typeableAstroid.typeableText.getFirstAlive()){return}
                if(typeableAstroid.typeableText.getFirstAlive().text===keyPressed.key){
                    typeableAstroid.typeableText.getFirstAlive().setTyped(true);
                    if(!typeableAstroid.typeableText.getFirstAlive()){
                        this.removeAstroid(typeableAstroid)
                        this.kills++;
                        this.addNewTypeableAstroidToScene();
                        if(this.kills===10){
                            this.increaseDifficulty();
                            this.kills=0;
                        }
                    }
                }
            }
            else{
                const typeableAstroid = <TypeableAstroid> this.groupOfAstroids.getChildren()
                    .find((child)=>{
                        var typeableAstroid:TypeableAstroid= <TypeableAstroid> child;
                        return typeableAstroid.startLetter === keyPressed.key;
                    }
                );
                if(typeableAstroid){
                    typeableAstroid.typeableText.getFirstAlive().setTyped(true);
                    typeableAstroid.setBeingTyped(true);
                }     
            }
        });   
        
               
    }
    update() {
        this.groupOfAstroids.getChildren().forEach((child)=>{
            var typeableAstroid:TypeableAstroid= <TypeableAstroid> child;
           typeableAstroid.moveDown();
        });
    }
    createAndPlaceEarth(){
        this.earth = this.physics.add.sprite(0, 0, 'earth');
        this.aGrid.placeAtIndex(22, this.earth);
        this.earth.setScale(19);

        this.earth.body.setCircle(30,1,4);
        this.earth.y+=this.earth.displayHeight/3;
    }
    createAndPlaceTypeableAstroid(text:string,index:number, speed:SPEED):TypeableAstroid{
        var typeableAstroid= new TypeableAstroid(this, 0,0,text,30,speed)
        var indexPos = this.aGrid.getPosByIndex(index);
        typeableAstroid.move(indexPos.x, indexPos.y);
        return typeableAstroid;
    }
    createAnimations(){
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
    getRandomNumber(min:number, max:number):number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
        // The maximum is exclusive and the minimum is inclusive  
    }
    increaseDifficulty(){
        this.addNewTypeableAstroidToScene();
    }
    removeAstroid(typeableAstroid:TypeableAstroid){
        // find and remove letter from array
        const indexToRemove = this.lettersInUse.findIndex(letter => letter === typeableAstroid.startLetter);
        if (indexToRemove !== -1) {
          this.lettersInUse.splice(indexToRemove, 1);
        }
        //destory and hide
        typeableAstroid.setVisible(false);
        typeableAstroid.destroy(false);
    }
    findNewWord():string{
       
        //look for new word with different starting letter
        var newWord:string
        do{
            newWord = this.words[this.getRandomNumber(0,this.words.length)].toLowerCase();
        }
        while(this.lettersInUse.find(item => item === newWord[0]))
        this.lettersInUse.push(newWord[0]);
        return newWord;
    }
    addNewTypeableAstroidToScene(){
        //add word
        var newTypeableAstroid:TypeableAstroid = this.createAndPlaceTypeableAstroid(this.findNewWord(), this.getRandomNumber(0,5), SPEED.SLOW);
        this.groupOfAstroids.add(newTypeableAstroid);
        this.physics.add.overlap(newTypeableAstroid.astroid, this.earth, () =>
            {
                this.scene.start('GameOver');
            }
        );
    }
}
