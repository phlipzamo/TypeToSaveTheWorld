import { Scene } from "phaser";

export class Score extends Phaser.GameObjects.Text{
    scoreText: string;
    score: number
    constructor(scene:Scene, scoreTitle:string){
        super(scene,0,0,"",{
            fontSize: 25,
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
        });
        this.scoreText = scoreTitle+" ";
        this.score = 0;
        this.setText(this.scoreText + this.score);
        scene.add.existing(this);
    }
    upScore(points:number){
        this.score+=points;
        this.setText(this.scoreText+ this.score);
    }
    downScore(points:number){
        this.score-=points;
        this.setText(this.scoreText+ this.score);
    }
    setScore(points:number){
        this.score=points;
        this.setText(this.scoreText+ this.score);
    }
    resetScore(){
        this.score=0;
        this.setText(this.scoreText+ this.score);
    }
    getScore():number{
        return this.score;
    }
}