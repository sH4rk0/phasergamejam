import FabioIacolare from "../../scenes/FabioIacolare";
import INemico from "./INemico";

export default class Nemico extends Phaser.GameObjects.Sprite implements INemico {
  protected _config: genericConfig;
  protected _scene: FabioIacolare;
  protected _body: Phaser.Physics.Arcade.Body;
    private _type:number=0;
    private _enemy1:Phaser.Physics.Arcade.Body;
  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <FabioIacolare>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this.create();
    
    this._enemy1.setSize(35,40)
    
    let _animation : Phaser.Types.Animations.Animation = {
      
    }

  }
  create() {

    
   /* if (this._config.key == "asteroid-0") {
      this._type = 0;
    } else if (this._config.key == "asteroid-1") {
      this._type = 1;
    } else if (this._config.key == "asteroid-2") {
      this._type = 2;
    } else if (this._config.key == "asteroid-3") {
      this._type = 3;
    }
    /*let _animation = {
      key: "rotate",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: this._runAnimation[this._type].frames
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };*/
    //this.setAlpha(0).setDepth(11);
    //this._scene.tweens.add({ targets: this, alpha: 1, duration: 200 });
    //this._body
     /* .setCircle(this._runAnimation[this._type].radius, 0, 0)
      .setVelocity(Phaser.Math.RND.integerInRange(80, 200) *
        Phaser.Math.RND.sign(), Phaser.Math.RND.integerInRange(80, 200) *
      Phaser.Math.RND.sign()).setCollideWorldBounds(true)
      .setBounce(0.9, 0.9);
    this.anims.create(_animation);
    this.play("rotate");
   // this._scene.addNemico(this);
    this._scene.add.existing(this);*/
  }
  update(time: number, delta: number) { }

  changeDirection(): void { }
  getBody(): Phaser.Physics.Arcade.Body { return this._body; }
}