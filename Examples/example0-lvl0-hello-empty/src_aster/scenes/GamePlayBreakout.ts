


export default class GamePlayBreakout extends Phaser.Scene {

  private bricks: Phaser.Physics.Arcade.StaticGroup;
  private ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private paddle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private bg: Phaser.GameObjects.TileSprite;


  constructor() {
    super({ key: "GamePlayBreakout" });
  }

  preload() {}
  init() {}
  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.bg = this.add.tileSprite(0, 0, 800, 600, "bg").setOrigin(0);

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'breakout', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
            frameQuantity: 10,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });

        this.ball = this.physics.add.image(400, 500, 'breakout', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 550, 'breakout', 'paddle1').setImmovable();

        //  Our colliders
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, undefined, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, undefined, this);

        //  Input events
        this.input.on('pointermove',  (pointer:Phaser.Input.Pointer)=> {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 800-52);

            if (this.ball.getData('onPaddle'))
            {
                this.ball.x = this.paddle.x;
            }

        }, this);

        this.input.on('pointerup',  (pointer:Phaser.Input.Pointer) =>{

            if (this.ball.getData('onPaddle'))
            {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }

        }, this);
    
  }


  hitBrick(ball:any, brick:any)
    {
    brick.disableBody(true, true);
    
    
     this.sound.playAudioSprite(
      "sfx",
      "splash",
      {
        loop: false,
        volume: 0.2,
      }
      );
      
 this.events.emit("update-score",[50])
        if (this.bricks.countActive() === 0)
        {
            this.resetLevel();
        }
    }

    resetBall ()
    {
        this.sound.playAudioSprite(
      "sfx",
      "explo",
      {
        loop: false,
        volume: 0.2,
      }
    );
        this.events.emit("decrease-live");
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onPaddle', true);
    }

    resetLevel ()
    {
        this.resetBall();

        this.bricks.children.each(function (brick:any) {

            brick.enableBody(false, 0, 0, true, true);

        });
    }

    hitPaddle (ball:any, paddle:any)
    {
        var diff = 0;

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    update ()
    {
      this.bg.tilePositionY += 0.4;
       
        if (this.ball.y > 600)
        {
            this.resetBall();
        }
    }


}
