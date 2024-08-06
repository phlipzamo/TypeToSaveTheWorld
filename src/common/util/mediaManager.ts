import EventDispatcher from "../mc/eventDispatcher";
import { Model } from "../mc/model";



let instance:MediaManager;
export class MediaManager {
    scene: Phaser.Scene;
    model: any;
    emitter: any;
    background: any;
    constructor() {}
    static getInstance(scene: Phaser.Scene) {
        if (instance == null) {
            instance = new MediaManager();
            instance.scene = scene;
            instance.model = Model.getInstance();
            instance.emitter = EventDispatcher.getInstance();
            instance.emitter.on('PLAY_SOUND', instance.playSound.bind(instance));
            instance.emitter.on('MUSIC_CHANGED', instance.musicChanged, instance);
        }
        return instance;
    }
    
    musicChanged() {
        if (this.background) {
            if (this.model.musicOn == false) {
                this.background.stop();
            } else {
                this.background.play();
            }
        }
    }
    playSound(key:string) {
        if (this.model.soundOn == true) {
            var sound = this.scene.sound.add(key);
            sound.play();
        }
    }
    setBackgroundMusic(key:string) {
        if (this.model.musicOn == true) {
            this.background = this.scene.sound.add(key, {
                volume: .5,
                loop: true
            });
            this.background.play();
        }
    }
}