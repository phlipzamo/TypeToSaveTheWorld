import { Scene } from 'phaser';
import { TypeText } from '../myGameObjs/TypeText';
export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.scale.displaySize.setAspectRatio( window.innerWidth/window.innerHeight);
        this.scale.refresh();
        this.add.text(0,0,"TYPE TO SAVE THE WORLD");
        this.typeText = new TypeText(this, 512,460, 'start');
        this.add.existing(this.typeText);
        /*var text = 'Main Menu'
        this.typeText = this.physics.add.group();
        var x = 512
        var y = 384
        for (let i = 0; i < text.length; i++) {
            var letter = this.add.text(x, y, text[i], {
                fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            })
            this.typeText.add(letter)
            x = x + letter.width+2;
        };*/
        this.input.keyboard.on('keydown', function(keyPressed) { 
            if(this.typeText.getFirstAlive().text ===keyPressed.key){
                this.typeText.getFirstAlive().typed()
            }
                
        }, this);
    }
    update(){
        if(this.typeText.getTotalUsed() === 0){
            this.typeText.getChildren().forEach(child => {
                child.setActive(true);
                child.setColor('#fff')
            });
        }
    }
}


