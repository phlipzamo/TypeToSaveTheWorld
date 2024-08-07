export class Letter extends Phaser.GameObjects.Text {
    constructor(scene:Phaser.Scene, public x:number, public y:number, text:string) {
      super(scene, x, y, text, {
        fontSize: 40,
        color: '#fff',
        stroke: '#000',
        strokeThickness: 4,
      });
      this.setOrigin(0, 0);
      scene.add.existing(this);
    }
    typed(){
      this.setActive(false);
      this.setColor("#808080");
    }
  }