export class Letter extends Phaser.GameObjects.Text {
    constructor(scene:Phaser.Scene, public x:number, public y:number, text:string,fontsize:number) {
      super(scene, x, y, text, {
        fontSize: fontsize,
        color: '#fff',
        stroke: '#000',
        strokeThickness: 4,
      });
      this.setOrigin(0, 0);
      scene.add.existing(this);
    }
    setTyped(bool:boolean){
      this.setActive(!bool);
      bool?this.setColor("#808080"):this.setColor("#fff");
      
    }
  }