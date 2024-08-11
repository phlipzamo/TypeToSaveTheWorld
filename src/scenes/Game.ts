import { Scene } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { TypeableAstroid } from '../myObjects/TypeableAstroid';
import { SPEED } from '../myObjects/Speed';
import { AssetText } from '../myObjects/AssetText';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    aGrid: AlignGrid;
    typeableAstroid: TypeableAstroid;
    words:string[]
    groupOfAstroids: Phaser.GameObjects.Group;
    earth: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    lettersInUse:string[]
    destroyed: number;
    startTime: number;
    numOfKeyPressed:number;
    numOfRightKeyPressed:number;
    endTime: number;
    newIndex: number;
    lastIndex: number;
    waterTag: AssetText;
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.numOfRightKeyPressed=0;
        this.numOfKeyPressed=0;
        this.startTime = 0;
        this.endTime =0;
        this.destroyed = 0;
        this.groupOfAstroids = this.add.group();
        this.aGrid = new AlignGrid(this, 5,15);
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        this.createAndPlaceEarth(67)
        this.createAnimations();
        this.words = this.cache.json.get("words");
        this.lettersInUse=[];
        this.addNewTypeableAstroidToScene();
        this.waterTag = new AssetText(this);

        if(!this.input.keyboard){return}
        this.input.keyboard.on('keydown', (keyPressed:any) => {
            //startTime if hasnt been started
            if(this.startTime===0){this.startTime = Date.now();}

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
                    this.numOfRightKeyPressed++;
                    astroidBeingTyped.typeableText.typeNextLetter(true);
                    //check if that was the last letter
                    if(!astroidBeingTyped.typeableText.hasUntypedLetters()){
                        this.destroyed++
                        this.removeAstroid(astroidBeingTyped)
                        this.addNewTypeableAstroidToScene();
                        if(this.destroyed===30){
                            this.increaseDifficulty();
                            this.destroyed=0;
                        }
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
    update() {
       this.groupOfAstroids.getChildren().forEach((child)=>{
            var typeableAstroid:TypeableAstroid= <TypeableAstroid> child;
           typeableAstroid.moveDown();
        });
    }
    createAndPlaceEarth(gridIndex: number){
        this.earth = this.physics.add.sprite(0, 0, 'earth');
        this.aGrid.placeAtIndex(gridIndex, this.earth);
        this.earth.setScale(19);
        this.earth.body.setCircle(30,1,4);
        this.earth.y+=this.earth.displayHeight/3;
    }
    createAndPlaceTypeableAstroid(text:string,gridIndex:number, speed:SPEED):TypeableAstroid{
        var typeableAstroid= new TypeableAstroid(this, 0,0,text,30,speed)
        var indexPos = this.aGrid.getPosByIndex(gridIndex);
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

        typeableAstroid.setVisible(false);
        typeableAstroid.destroy(false);
    }
    findNewWord():string{
        //look for new word with different starting letter than the other words in scene
        var newWord:string
        do{
            newWord = this.words[this.getRandomNumber(0,this.words.length)].toLowerCase();
        }
        while(this.lettersInUse.find(item => item === newWord[0]))
        this.lettersInUse.push(newWord[0]);
        return newWord;
    }
    addNewTypeableAstroidToScene(){
        //check if placing in same col or adjacent col as last astroid
        if(!this.lastIndex){
            this.lastIndex = this.getRandomNumber(1,14);
        }
        do{
            this.newIndex = this.getRandomNumber(1,14);
        }while(Math.abs(this.lastIndex-this.newIndex)<=1)
        this.lastIndex = this.newIndex;
        //add word
        var newTypeableAstroid:TypeableAstroid = this.createAndPlaceTypeableAstroid(this.findNewWord(), this.newIndex, SPEED.SLOW);
        this.groupOfAstroids.add(newTypeableAstroid);
        this.physics.add.overlap(newTypeableAstroid.astroid, this.earth, () =>
            {   
               this.gameOver();
            }
        );
    }
    gameOver(){
        this.calcTimeAndWPMAndStore();
        this.scene.start('GameOver');
    }
    calcTimeAndWPMAndStore(){
        if(this.startTime!=0){
            this.endTime = Date.now();
        }
        var totalTimeInMilliseconds = this.endTime-this.startTime;
        (totalTimeInMilliseconds===0)?totalTimeInMilliseconds=1:totalTimeInMilliseconds;
        localStorage.setItem("time", "Time: "+this.millisecondsToFormattedMinString(totalTimeInMilliseconds) );

        var grossWPM = (this.numOfRightKeyPressed/5)/(this.millisecondsToMin(totalTimeInMilliseconds));
        localStorage.setItem("wpm", "WPM: "+Math.round(grossWPM));
    }
    millisecondsToFormattedMinString(milliseconds:number) {
        const seconds = milliseconds/1000
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
      
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    millisecondsToMin(milliseconds:number){
        return ((milliseconds/1000)/60);
    }
    
    
}
