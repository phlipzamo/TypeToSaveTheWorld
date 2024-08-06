
import { Background } from "../comps/background";
import { Controller } from "../mc/controller";
import EventDispatcher from "../mc/eventDispatcher";
import { Model } from "../mc/model";
import { TextStyles } from "../ui/textStyles";
import { Align } from "./align";
import { AlignGrid } from "./AlignGrid";
import { MediaManager } from "./mediaManager";
export class BaseScene extends Phaser.Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    mm: MediaManager;
    controller: Controller;
    model: Model;
    emitter: EventDispatcher;
    textStyles: TextStyles;
    gw: number;
    gh: number;
    aGrid: AlignGrid;
    constructor(key: string) {
        super(key);
    }
    preload() {}
    create() {
        //
        //make the media manager
        this.mm = MediaManager.getInstance(this);
        //
        //create the controller to listen to events
        //
        this.controller = Controller.getInstance(this);
        //
        //set up model to hold global values
        //
        this.model = Model.getInstance();
        //
        //set up the event dispatcher
        //
        this.emitter = EventDispatcher.getInstance();
        //
        //set up the text styles object
        //
        this.textStyles = TextStyles.getInstance(Number(this.sys.game.config.width));
        this.gw = Number(this.sys.game.config.width);
        this.gh = Number(this.sys.game.config.height);
    }
    //
    //set a background image
    //
    setBackground(key:string) {
        let bg = new Background({
            scene: this,
            key: key
        });
        return bg;
    }
    //
    //place an image on the stage, and scale it
    //
    placeImage(key:string, pos:any, scale: number, physics = false) {
        let image
        if (physics == false) {
            image = this.add.sprite(0, 0, key);
        } else {
            image = this.physics.add.sprite(0, 0, key);
        }
        if (isNaN(pos)) {
            this.aGrid.placeAt(pos.x, pos.y, image);
        } else {
            this.aGrid.placeAtIndex(pos, image);
        }
        if (scale != -1) {
            Align.scaleToGameW(image, scale, this);
        }
        return image;
    }
   
    //
    //place an object on the grid by index
    //
    placeAtIndex(pos: number, item: any) {
        this.aGrid.placeAtIndex(pos, item);
    }
    //
    //place an object on the grid by x and y position
    //
    placeAt(xx: number, yy: number, item: any) {
        this.aGrid.placeAt(xx, yy, item);
    }
    //
    //make an align grid
    //
    /*makeAlignGrid(r = 11, c = 11) {
        this.aGrid = new AlignGrid({
            scene: this,
            rows: r,
            cols: c
        });
    }*/
    
    
   
    //place an effect on the stage - requires effect extension pack
    //
    /*    
    placeEffect(xx, yy, effect) {
        let fx = new Effect({
            scene: this,
            effect: effect,
            x: xx,
            y: yy
        });
    }*/
    //
    //get a text style object
    //
    getStyle(style: any) {
        let textStyle = this.textStyles.getStyle(style);
        return textStyle;
    }
    update() {}
}