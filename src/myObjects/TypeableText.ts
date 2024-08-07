import { Letter } from "./Letter";

export class TypeableText extends Phaser.GameObjects.Group{
    width: number;
    height: number;

    constructor(scene:Phaser.Scene,x:number, y:number,text:string){
        super(scene);
        //dvar tempX=x
        
        for (let i = 0; i < text.length; i++) {
            var letter = new Letter(scene,x,y,text[i])
            this.add(letter)
            x = x + letter.width+2;
            this.width += letter.width+2
            this.height=letter.height;
        };
        
        scene.add.existing(this);
        //scene.physics.world.enableBody(this);
    }
    spaceOutLetters(){ 
        var letterBeforeWidth =0;
        var letterBeforeX =0;
        var letterBeforeY = 0
        this.getChildren().forEach((child)=>{
            var letter:Letter = <Letter> child;
            if(letterBeforeX===0){
                letterBeforeX = letter.x
                letterBeforeY = letter.y
                letterBeforeWidth = letter.width
                return;
            }
            
            letter.x = letterBeforeX + letterBeforeWidth + 2;
            letter.y = letterBeforeY;
            
            letterBeforeX = letter.x
            letterBeforeY = letter.y
            letterBeforeWidth = letter.width
        });
    }
    getWidth(){
        this.width =0;
        this.getChildren().forEach((child)=>{
            var letter:Letter = <Letter> child;
            this.width += letter.width+2
        });
        return this.width;
    }
    getHeight(){
        this.height =0;
        this.getChildren().forEach((child)=>{
            var letter:Letter = <Letter> child;
            this.height = letter.height
            return;
        });
        return this.height;
    }
    centerWord(){
        var letter:Letter = <Letter> this.getChildren()[0] ;
        letter.x -=this.getWidth()/2;
        letter.y -=this.getHeight()/2;
        this.spaceOutLetters();
    }
    
    
    
}