import { Scene } from 'phaser';
import { AlignGrid } from '../common/util/AlignGrid';
import { TypeableAstroid } from '../myObjects/TypeableAstroid';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    earth: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    aGrid: AlignGrid;
    astroid: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    typeableAstroid: TypeableAstroid;
    groupOfAstroids: Phaser.GameObjects.Group;

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
        
        this.createAnimations();
        this.groupOfAstroids = this.add.group();
        this.groupOfAstroids.add(this.createAndPlaceTypeableAstroid("hello", 2));
        this.groupOfAstroids.add(this.createAndPlaceTypeableAstroid("josie", 1));
        

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
                        typeableAstroid.setVisible(false);
                        typeableAstroid.destroy(false);
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
           typeableAstroid.moveDown(1);
        });
    }
    createAndPlaceEarth(){
        this.earth = this.physics.add.sprite(0, 0, 'earth');
        this.aGrid.placeAtIndex(22, this.earth);
        this.earth.setScale(19);
        this.earth.y+=this.earth.displayHeight/3;
    }
    createAndPlaceTypeableAstroid(text:string,index:number):TypeableAstroid{
        var typeableAstroid= new TypeableAstroid(this, 0,0,text,30)
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
}
