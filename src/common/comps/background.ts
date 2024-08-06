export class Background {
    scene: Phaser.Scene;
    constructor(config: { scene: Phaser.Scene; key: string; }) {
       
        this.scene = config.scene;
        let game = this.scene.sys.game;
        var back = this.scene.add.image(Number(game.config.width) / 2, Number(game.config.height) / 2, config.key);
        back.displayWidth = Number(game.config.width);
        back.displayHeight = Number(game.config.height);
    }
}