import GamePlay from "../../scenes/GamePlay";
import IEnemy from "./IEnemy";

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _type: number = 0;
  private _runAnimation: Array<{ radius: number, frames: Array<number> }> = [
    { radius: 40, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { radius: 40, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { radius: 50, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
    { radius: 35, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
  ];
  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this.create();
  }
  create() {
    if (this._config.key == "asteroid-0") {
      this._type = 0;
    } else if (this._config.key == "asteroid-1") {
      this._type = 1;
    } else if (this._config.key == "asteroid-2") {
      this._type = 2;
    } else if (this._config.key == "asteroid-3") {
      this._type = 3;
    }
    let _animation = {
      key: "rotate",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: this._runAnimation[this._type].frames
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };
    this.setAlpha(0).setDepth(11);
    this._scene.tweens.add({ targets: this, alpha: 1, duration: 200 });
    this._body
      .setCircle(this._runAnimation[this._type].radius, 0, 0)
      .setVelocity(Phaser.Math.RND.integerInRange(80, 200) *
        Phaser.Math.RND.sign(), Phaser.Math.RND.integerInRange(80, 200) *
      Phaser.Math.RND.sign()).setCollideWorldBounds(true)
      .setBounce(0.9, 0.9);
    this.anims.create(_animation);
    this.play("rotate");
    this._scene.addEnemy(this);
    this._scene.add.existing(this);
  }
  update(time: number, delta: number) { }
}
