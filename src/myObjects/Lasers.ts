export class Laser extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene: Phaser.Scene,)
    {
        super(scene, -40, -40, 'laser');
        
    }

    fire (x:number, y:number)
    {
        if(!this.body) return;
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-300); 
    }
    preUpdate (time:number, delta:number)
    {
        super.preUpdate(time, delta);        
        if (this.y <= 30) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
   
       
}

export class Lasers extends Phaser.Physics.Arcade.Group
{
    constructor (scene:Phaser.Scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 30,
            key: 'laser',
            active: false,
            visible: false,
            classType: Laser
        });
    }

    fireLaser (x:number, y:number)
    {
        const laser = this.getFirstDead(false);

        if (laser)
        {
            laser.fire(x, y);
        }
    }
}