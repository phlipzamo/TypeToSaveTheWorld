export class Align {
    static scaleToGameW(obj: Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite, per: number, scene: Phaser.Scene) {
        obj.displayWidth = Number(scene.game.config.width)* per;
        obj.scaleY = obj.scaleX;
    }
    static scaleToGameH(obj: Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite, per: number, scene: Phaser.Scene) {
        obj.displayHeight =   Number(scene.game.config.height) * per;
        obj.scaleX = obj.scaleY;
    }
    static centerH(obj: Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite, scene: Phaser.Scene) {
        obj.x = Number(scene.game.config.width) / 2 - obj.displayWidth / 2;
    }
    static centerV(obj:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite, scene:Phaser.Scene) {
        obj.y = Number(scene.game.config.height)/ 2 - obj.displayHeight / 2;
    }
    static center2(obj:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite, scene:Phaser.Scene) {
        obj.x = Number(scene.game.config.width) / 2 - obj.displayWidth / 2;
        obj.y = Number(scene.game.config.height) / 2 - obj.displayHeight / 2;
    }
    static center(obj:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite, scene:Phaser.Scene) {
        obj.x = Number(scene.game.config.width) / 2;
        obj.y = Number(scene.game.config.height) / 2;
    }
    static centerX(scene:Phaser.Scene) {
        return Number(scene.game.config.width) / 2;
    }
    static getYPer(scene:Phaser.Scene, per:number) {
        return Number(scene.game.config.height) * per;
    }
    static getXPer(scene:Phaser.Scene, per:number) {
        return Number(scene.game.config.width) * per;
    }
    static scaleImageToSize(image:Phaser.GameObjects.Image, sizeX:number, sizeY:number) {
        var scaleWidth = sizeX / image.width;
        var scaleHeight = sizeY / image.height;
        var scale = scaleWidth;
        if (scale > scaleHeight) scale = scaleHeight;
        image.setScale(scale);
    }
    static scaleImageToWidth(image:Phaser.GameObjects.Image, sizeX:number) {
        var scaleWidth = sizeX / image.width;
        var scale = scaleWidth;
        image.setScale(scale);
    }
    static alignToTopLeft(obj:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite) {
        obj.x = obj.displayWidth / 2;
        obj.y = obj.displayHeight / 2;
    }
    static alignToTopRight(obj:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite,scene:Phaser.Scene) {
        obj.x = Number(scene.sys.game.config.width) - obj.displayWidth / 2;
        obj.y = obj.displayHeight / 2;
    }
    static alignToLBottomLeft(obj:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite,scene:Phaser.Scene) {
        obj.x = obj.displayWidth / 2;
        obj.y = Number(scene.sys.game.config.height) - obj.displayHeight / 2;
    }
    static alignToLBottomRight(obj:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Text|Phaser.Physics.Arcade.Sprite,scene:Phaser.Scene) {
        obj.x = Number(scene.game.config.width) - obj.displayWidth / 2;
        obj.y = Number(scene.game.config.height) - obj.displayHeight / 2;
    }
}