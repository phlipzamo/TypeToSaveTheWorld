export class ImageLoader {
    scene: Phaser.Scene;
    callback: any;
    key: string;
    constructor(config: { scene: Phaser.Scene; callback: any; }) {
        this.scene = config.scene;
        this.callback = config.callback;
    }
    loadImage(key:string, path:string) {
        this.key = key;
        if (this.scene.textures.exists(key) == false) {
            this.scene.load.image(key, path);
            this.scene.load.once('complete', this.imageLoaded, this);
            this.scene.load.start();
        } else {
            //
            //already in cache
            //
            if (this.callback) {
                this.callback(this);
            }
        }
    }
    imageLoaded() {
        //
        //image loaded
        //
        if (this.callback) {
            this.callback(this);
        }
    }
}