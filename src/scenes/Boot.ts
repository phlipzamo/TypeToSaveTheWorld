import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg.png');
        this.load.image('earth', 'assets/Globe.png')
        this.load.atlas("astroid", "assets/astroid.png", "assets/astroid.json");
        this.load.json("words", "assets/words.json");
        this.load.image('ufo',"assets/ufo.png");
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
