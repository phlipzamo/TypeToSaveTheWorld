import { Letter } from "./Letter";
export class TypeText extends Phaser.GameObjects.Group{

    constructor(scene,x,y,text){
        super(scene.physics.world, scene);

        for (let i = 0; i < text.length; i++) {
            var letter = new Letter(scene,x,y,text[i])
            this.add(letter)
            x = x + letter.width+2;
        };
    }
}
