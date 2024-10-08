import {
    EventDispatcher
} from "../mc/eventDispatcher";
import { Align } from "../util/align";
export class TextObj extends Phaser.GameObjects.Text {
    config: { scene: Phaser.Scene; text: string | string[]; x: number; y: number; scale: any; textStyle: { style?: any; stroke?: any; strokeThick?: any; shadow?: any; fontSize?: string; color?: string; }; shadow: string | undefined; event: any; };
    constructor(config: { scene: Phaser.Scene; text: string | string[]; x: number; y: number; scale: any; textStyle: { style?: any; stroke?: any; strokeThick?: any; shadow?: any; fontSize?: string; color?: string; }; shadow: string | undefined; event: any; }) {
        super(config.scene, 0, 0, config.text, {});
        this.config = config;
        this.setOrigin(0.5, 0.5);
        if (config.x) {
            this.x = config.x;
        }
        if (config.y) {
            this.y = config.y;
        }
        if (config.scale) {
            Align.scaleToGameW(this, config.scale, config.scene);
        }
        //
        //
        //
        if (!config.textStyle) {
            config.textStyle = {
                fontSize: "16px",
                color: "#ff0000"
            };
        }
        if (config.textStyle) {
            if (config.textStyle.style) {
                this.setStyle(config.textStyle.style);
            }
            if (config.textStyle.stroke) {
                if (config.textStyle.strokeThick) {
                    this.setStroke(config.textStyle.stroke, config.textStyle.strokeThick);
                } else {
                    this.setStroke(config.textStyle.stroke, 4);
                }
            }
            if (config.textStyle.shadow) {
                this.setShadow(4, 4, config.shadow, 2, false, true);
            }
        }
        if (config.event) {
            this.setInteractive();
            this.on('pointerdown', this.onDown, this);
        }
        this.scene.add.existing(this);
        // ut.emitter.on(G.SCENE_CHANGED, this.sceneChanged, this);
    }
    onDown() {
        let emitter = EventDispatcher.getInstance();
        emitter.emit(this.config.event, this.config);
    }
    sceneChanged() {
        //   ut.emitter.off(G.SCENE_CHANGED, this.sceneChanged, this);
        this.destroy();
    }
}