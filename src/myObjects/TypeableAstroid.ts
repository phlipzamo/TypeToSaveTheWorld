import { TypeableText } from "./TypeableText";

export class TypeableAstroid{
    typeableText: TypeableText;
    astroid: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    beingTyped: boolean;
    x: number;
    y: number;
   
    constructor(scene:Phaser.Scene,x:number, y:number,text:string,fontsize:number){
        this.astroid = scene.physics.add.sprite(10,10,"astroid");
        this.typeableText = new TypeableText(scene,x,y,text,fontsize);
        this.beingTyped= false;
    }
    moveDown(speed:number){
        this.move(this.x, this.y+speed)
    }
    move(x:number,y:number){
        this.x =x;
        this.y = y;
        this.typeableText.moveTo(x,y);
        this.astroidMove(x,y);
    } 
    astroidMove(x:number, y:number){
        this.astroid.x =x;
        this.astroid.y =y;
    }
}