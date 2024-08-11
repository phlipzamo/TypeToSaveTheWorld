import { SPEED } from "./Speed";
import { TypeableText } from "./TypeableText";

export class TypeableAstroid extends Phaser.GameObjects.GameObject{
    typeableText: TypeableText;
    astroid: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    startLetter: string;
    beingTyped: boolean;
    x: number;
    y: number;
    speed:number;
    
    constructor(scene:Phaser.Scene,x:number, y:number,text:string,fontsize:number, speed:SPEED){
        super(scene, 'typeableAstroid');
        this.astroid = scene.physics.add.sprite(10,10,"astroid");
        this.astroid.body.setCircle(30,3,3);
        this.typeableText = new TypeableText(scene,x,y,text,fontsize);
        this.startLetter = text[0];
        this.beingTyped= false;
        this.speed = speed;
    }
    moveDown(){
        this.move(this.x, this.y+this.speed)
    }
    move(x:number,y:number){
        this.x = x;
        this.y = y;
        this.typeableText.moveTo(x,y);
        this.astroidMove(x,y);
    } 
    astroidMove(x:number, y:number){
        this.astroid.x =x;
        this.astroid.y =y;
    }
    setBeingTyped(bool:boolean){
        this.beingTyped= bool;
    }
    setVisible(bool:boolean){
        this.astroid.setVisible(bool);
        this.typeableText.setVisible(bool);
    }
    reset(){
        this.typeableText.reset();
        this.setBeingTyped(false);
    }
}