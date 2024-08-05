import { Scene } from 'phaser';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.text(512, 384, 'Test', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown', function(me) { 
            
            console.log(me.key);
        }, this);
       /* this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });*/
    }
}

class TypeText extends Phaser.GameObjects.Group{
    constructor(){
        super('TypeText');
    }
}
