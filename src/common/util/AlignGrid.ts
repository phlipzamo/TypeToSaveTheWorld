import { TypeableText } from "../../myObjects/TypeableText";


export class AlignGrid {
    
    
    cw:number;
    ch: number;
    graphics: Phaser.GameObjects.Graphics;
    width: number;
    height: number;
   
   
    constructor(private scene: Phaser.Scene,private rows: number, private cols: number) {
        
        this.width = Number(scene.sys.game.config.width);
        this.height = Number(scene.sys.game.config.height);
        
        //cell width
        this.cw = this.width / cols;
        //cell height
        this.ch = this.height / rows;
    }
    show() {
        
        //
        //
        //
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);
        for (var i = 0; i < this.width; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.height);
        }
        for (var i = 0; i < this.height; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.width, i);
        }
        this.graphics.strokePath();
        return this.graphics;
    }
    placeAt(xx:number, yy:number, obj:any) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
        return {x:x2,y:y2};
    }
    placeAtIndex(index:number, obj:any) {
        var yy = Math.floor(index / this.cols)
        var xx = index - (yy * this.cols)
       return this.placeAt(xx, yy, obj);
    }
    placeTypeableTextAtIndex(index:number,typeableText:TypeableText){
        this.placeAtIndex(index, typeableText.getChildren()[0]);
        typeableText.centerWord();
    }
   
    showNumbers() {
        this.show();
        var count = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var numText = this.scene.add.text(0, 0, String(count), {
                    color: '#ff0000'
                });
                numText.setOrigin(0.5, 0.5);
                this.placeAtIndex(count, numText);
                count++;
            }
        }
    }
    showPos() {
        this.show();
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                let posString = "x:" + j + "\ny:" + i;
                var numText = this.scene.add.text(0, 0, posString, {
                    color: '#ff0000',
                    fontSize: 16,
                    fontStyle: 'bold',
                    backgroundColor: '#000000'
                });
                numText.setOrigin(0.5, 0.5);
                this.placeAt(j, i, numText);
            }
        }
    }
     findNearestIndex(xx:number, yy:number) {
        var row = Math.floor(yy / this.ch);
        var col = Math.floor(xx / this.cw);        
        var index = (row * this.cols) + col;
        return index;
    }
    getPosByIndex(index:number) {
        var yy = Math.floor(index / this.cols);
        var xx = index - (yy * this.cols);
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        return {
            x: x2,
            y: y2
        }
    }
}