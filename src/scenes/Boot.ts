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

        this.load.image('background', require('assets/bg.png'));
        this.load.image('earth', require('assets/images/globe.png'));
        this.load.atlas("astroid", require("assets/astroid.png"), require("assets/astroid.json"));
        this.load.json("words", require("assets/words.json"));
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
