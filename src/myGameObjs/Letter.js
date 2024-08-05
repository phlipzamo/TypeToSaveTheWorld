import { GameObjects, Scene } from 'phaser';
export class Letter extends GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      fontSize: 30,
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
    });
    this.setOrigin(0, 0);
    scene.add.existing(this);
  }
  typed(){
    this.setActive(false);
    this.setColor("#008000");
  }
}