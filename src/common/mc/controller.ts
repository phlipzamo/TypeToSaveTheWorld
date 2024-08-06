import {
    EventDispatcher
} from "./eventDispatcher";
import {
    Model
} from "./model";
import {
    MediaManager
} from "../util/mediaManager";
let instance:Controller
export class Controller {
    model: Model;
    mm: MediaManager;
    emitter: EventDispatcher;
    constructor(scene: Phaser.Scene) {
        this.model = Model.getInstance();
        this.mm = MediaManager.getInstance(scene);
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("TOGGLE_MUSIC", this.toggleMusic.bind(this));
        this.emitter.on("TOGGLE_SOUND", this.toggleSound.bind(this));
        this.emitter.on('SET_SCORE', this.setScore.bind(this));
        this.emitter.on('UP_POINTS', this.upPoints.bind(this));
    }
    static getInstance(scene: Phaser.Scene) {
        if (instance == null) {
            instance = new Controller(scene);
        }
        return instance;
    }
    toggleMusic() {
        this.model.toggleMusic();
        this.mm.musicChanged();
    }
    toggleSound() {
        this.model.toggleSound();
    }
    setScore(score:number) {
        this.model.score = score;
    }
    upPoints(points:number) {
        var score = this.model.score;
        score += points;
        this.model.score = score;
    }
}