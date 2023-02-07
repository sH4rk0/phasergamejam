import GamePlay from "../../scenes/GamePlay";
import Enemy from "./Enemy";

export default class EnemyRobot extends Enemy {

  private _vel: number = 100;
  private _turnDegreesPerFrame: number = 3;

  constructor(params: genericConfig) {
    super(params);
    this.setName("robot")
    this.create();
  }
  create() {

    this._vel = Phaser.Math.RND.integerInRange(80, 120);
    this._body
      .setCollideWorldBounds(true, 0.5)
      .setImmovable(true)
      .setGravity(0, 0)
      .setMaxVelocity(250, 550)


    this.setDepth(11);

    if (!this._scene.anims.exists("enemy-move")) {

      let _animation = {
        key: "enemy-move",
        frames: this.anims.generateFrameNumbers(this._config.key, {
          frames: [4, 5, 6, 7]
        }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };

      this._scene.anims.create(_animation);
    }

    this.play("enemy-move");

  }




  update(time: number, delta: number) {

    if (this.x > this._scene.getPlayer().x) {
      this.setFlipX(false);
    } else {
      this.setFlipX(true);
    }
    this.setDepth(this.y);
    this._scene.physics.moveToObject(this, this._scene.getPlayer(), this._vel)
  }
}
