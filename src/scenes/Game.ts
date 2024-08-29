import { Scene } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { TypeableAstroid } from '../myObjects/TypeableAstroid';
import { DIFFICULTY, SPEED } from '../myObjects/Speed';
import { AssetText } from '../myObjects/AssetText';
import { Lasers } from '../myObjects/Lasers';
import { Score } from '../myObjects/Score';
import { Align } from '../common/util/align';
export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    aGrid: AlignGrid;
    typeableAstroid: TypeableAstroid;
    
    groupOfAstroids: Phaser.GameObjects.Group;
    earth: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    lettersInUse:string[];
    startTime: number;
    numOfKeyPressed:number;
    numOfRightKeyPressed:number;
    endTime: number;
    newIndex: number;
    lastIndex: number;
    waterTag: AssetText;
    astroidsLeftText: Score;
    uiOverlay: Phaser.GameObjects.Group;
    uiGrid: AlignGrid;
    threeLetterPercentage: number;
    fourLetterPercentage: number;
    fiveLetterPercentage: number;
    wordsInJson: any;
    waveWords: DIFFICULTY[];
    intervalOfAdding: number;
    numOfStartAstroids: number;
    numOfEasyWords: number;
    numOfMedWords: number;
    numOfLongWord: number;
    counter: number;
    startDifficulty: string;
    wpmText: Phaser.GameObjects.Text;
    accuracyText: Phaser.GameObjects.Text;
    lasers: Lasers;
    constructor ()
    {
        super('Game');
    }
    init(data: { difficulty: string; }) {
        this.startDifficulty=data.difficulty;
    }
    create ()
    { 
        this.lasers = new Lasers(this);
        this.threeLetterPercentage=90;
        this.fourLetterPercentage=5;
        this.fiveLetterPercentage=0;
        this.numOfRightKeyPressed=0;
        this.numOfKeyPressed=0;
        this.startTime = 0;
        this.endTime =0;
        this.groupOfAstroids = this.add.group();
        this.aGrid = new AlignGrid(this, 5,15);
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        this.createAndPlaceEarth(67);
        this.astroidsLeftText = new Score(this, "Astroids Left:");
        this.createAnimations();
        this.wordsInJson = this.cache.json.get("words");
        this.lettersInUse=[];
        this.waveWords = [];
        this.numOfStartAstroids = 0
        this.intervalOfAdding = 0;
        this.numOfEasyWords = 0;
        this.numOfMedWords = 0;
        this.numOfLongWord = 0;
        switch (this.startDifficulty) {
            case "easy":
                this.levelUp(1,7,18,5,0);
                break;
            case "medium":
                this.levelUp(3,7,18,20,5);
                break;
            case "hard":
                this.levelUp(5,7,18,35,10);
                break;
            default:
                this.levelUp(1,7,18,5,0);
                break;
        }
        
        this.counter=0;
        //this.addNewTypeableAstroidToScene();
        this.waterTag = new AssetText(this);
        
        
        this.createSuccessScreen()
        Align.alignToTopRight(this.astroidsLeftText,this);
        
        
        if(!this.input.keyboard){return}
        this.input.keyboard.on('keydown', (keyPressed:any) => {
            this.numOfKeyPressed++;
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
                        this.astroidsLeftText.downScore(1);
                        astroidBeingTyped.astroid.play("Explode");
                        astroidBeingTyped.destroy(false);
                        astroidBeingTyped.astroid.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY+"Explode",  () => {
                            this.removeAstroid(astroidBeingTyped);
                        }, this);
                        if(this.astroidsLeftText.getScore()===0){
                            this.uiOverlay.setVisible(true); 
                            this.calcTimeAndWPMAndStore();
                            this.setWpmText();
                            this.setAccuracyText();
                            this.counter =0;
                            this.startTime=0;
                            this.endTime=0;
                            this.numOfRightKeyPressed = 0;
                            this.numOfKeyPressed =0;
                            return; 
                        }
                        this.counter++;
                        this.addNewTypeableAstroidToScene();
                        if(this.intervalOfAdding ===this.counter){
                            this.counter=0;
                            this.addNewTypeableAstroidToScene()
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
                    this.numOfRightKeyPressed++;
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
    levelUp(startAstroidsIncrease: number, intervalIncrease:number, easyWordsIncrease:number, mediumWordsIncrease: number, hardWordsIncrease:number){
        this.waveWords =[];
        this.numOfStartAstroids+=startAstroidsIncrease;
        this.intervalOfAdding+=intervalIncrease;
        this.numOfEasyWords +=easyWordsIncrease
        this.numOfMedWords += mediumWordsIncrease;
        this.numOfLongWord += hardWordsIncrease;
        this.astroidsLeftText.setScore(this.numOfEasyWords+this.numOfMedWords+this.numOfLongWord);
        for (let index = 0; index < this.numOfEasyWords; index++) {
            this.waveWords.push(DIFFICULTY.EASY);
        }
        for (let index = 0; index < this.numOfMedWords; index++) {
            this.waveWords.push(DIFFICULTY.MEDIUM);   
        }
        for (let index = 0; index < this.numOfLongWord; index++) {
            this.waveWords.push(DIFFICULTY.HARD);  
        }
        for (let index = 0; index <  this.numOfStartAstroids; index++) {
            this.addNewTypeableAstroidToScene();
        } 
    }
    removeAstroid(typeableAstroid:TypeableAstroid){

        // find and remove letter from array
        const indexToRemove = this.lettersInUse.findIndex(letter => letter === typeableAstroid.startLetter);
        if (indexToRemove !== -1) {
          this.lettersInUse.splice(indexToRemove, 1);
        }

        typeableAstroid.setVisible(false);
        
    }
    findNewWord(difficulty:DIFFICULTY):string{
        //look for new word with different starting letter than the other words in scene
        var newWord:string
        var words:string[]
       switch (difficulty) {
        case DIFFICULTY.EASY:
            words = this.wordsInJson.easyWords;
            break;
        case DIFFICULTY.MEDIUM:
            words = this.wordsInJson.mediumWords;
            break;
        case DIFFICULTY.HARD:
            words = this.wordsInJson.hardWords;
            break;
        default:
            words=[]
            break;
       }
        do{
            newWord = words[this.getRandomNumber(0,words.length)].toLowerCase();
        }
        while(this.lettersInUse.find(item => item === newWord[0]))
        this.lettersInUse.push(newWord[0]);
        return newWord;
    }
    addNewTypeableAstroidToScene(){
        var difficulty = this.removeRandomElement(this.waveWords);
        if(!difficulty){return};
        //check if placing in same col or adjacent col as last astroid
        if(!this.lastIndex){
            this.lastIndex = this.getRandomNumber(1,14);
        }
        do{
            this.newIndex = this.getRandomNumber(1,14);
        }while(Math.abs(this.lastIndex-this.newIndex)<=1)
        this.lastIndex = this.newIndex;
        //add word
        var newTypeableAstroid:TypeableAstroid = this.createAndPlaceTypeableAstroid(this.findNewWord(difficulty), this.newIndex, this.difficultyToSpeed(difficulty));
        this.groupOfAstroids.add(newTypeableAstroid);
        this.physics.add.overlap(newTypeableAstroid.astroid, this.earth, () =>
            {   
               this.gameOver();
            }
        );
    }
    difficultyToSpeed(difficulty:DIFFICULTY){
        switch (difficulty) {
            case DIFFICULTY.EASY:
                return SPEED.FAST;
            case DIFFICULTY.MEDIUM:
                return SPEED.MEDIUM;
            case DIFFICULTY.HARD:
                return SPEED.SLOW;
            default:
                return SPEED.SLOW;
           }
    }
    removeRandomElement(array: DIFFICULTY[]): DIFFICULTY | undefined {
        if (array.length === 0) return undefined; // Handle the case of an empty array
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * array.length);
    
        // Remove the element at the random index
        return array.splice(randomIndex, 1)[0]; // splice() returns an array of removed elements
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
    createSuccessScreen(){
        this.uiGrid = new AlignGrid(this,9,3);
        //this.uiGrid.showNumbers();
        this.uiOverlay = this.add.group();
        var txt_Sucess =this.add.text(0,0, "W A V E    S U R V I V E D",{fontFamily: "Arial Black", fontSize: 50, color:"#FFFFFF", stroke: "#05ed04", strokeThickness: 8 });
        txt_Sucess.setOrigin(0.5);
        this.uiGrid.placeAtIndex(7, txt_Sucess);
        txt_Sucess.setDepth(30);
        this.wpmText = this.add.text(0,0, "WPM: ",{fontSize: 40, color:"#FFFFFF", stroke: "#05ed04", strokeThickness: 4 })
        .setOrigin(.5);
        this.uiGrid.placeAtIndex(13, this.wpmText);
        this.accuracyText = this.add.text(0,0, "Accuracy: ",{fontSize: 40, color:"#FFFFFF", stroke: "#05ed04", strokeThickness: 4 })
        .setOrigin(.5);
        this.uiGrid.placeAtIndex(16, this.accuracyText);
        var nextLevelButton =this.add.text(0,0, "Next Level?",{fontSize: 40, color:"#FFFFFF", stroke: "#05ed04", strokeThickness: 4 })
        .setInteractive()
        .on('pointerdown', () => {
            this.uiOverlay.setVisible(false);
            if((this.numOfEasyWords+this.numOfMedWords+this.numOfLongWord)%2===0){
                this.levelUp(1,0,0,2,1);
            }
            else{
                this.levelUp(0,0,0,2,1);
            }
        })
        .on('pointerover', () => this.changeColor(nextLevelButton,"#FF0000") )
        .on('pointerout', () => this.changeColor(nextLevelButton,"#05ed04") );
        nextLevelButton.setOrigin(0.5);
        this.uiGrid.placeAtIndex(19, nextLevelButton);
        nextLevelButton.setDepth(30);
        this.uiOverlay.add(txt_Sucess);
        this.uiOverlay.add(this.wpmText);
        this.uiOverlay.add(this.accuracyText);
        this.uiOverlay.add(nextLevelButton);
        this.uiOverlay.setVisible(false);
    }
    setWpmText(){
        this.wpmText.setText(localStorage.getItem("wpm")||"");
    }
    setAccuracyText(){
        this.accuracyText.setText("Accuracy: "+String(Math.round(this.numOfRightKeyPressed/this.numOfKeyPressed*100))+"%");
    }
    changeColor(text:Phaser.GameObjects.Text, color:string){
        text.setStroke(color,4);
    }
    
}
