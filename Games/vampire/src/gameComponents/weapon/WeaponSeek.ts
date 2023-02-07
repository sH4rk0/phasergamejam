import GamePlay from "../../scenes/GamePlay";
import Weapon from "./Weapon";
import IWeapon from "./IWeapon";

export default class WeaponSeek extends Weapon implements IWeapon {
  private _runAnimation: Array<number> = [0, 1, 2, 3, 4, 5];
  private _turnDegreesPerFrame: number = 3;

  constructor(params: weaponConfig) {
    super(params);
    this._config = params;
    this.create();
  }

  create() {


    super.create();


    if (!this._scene.anims.exists("rotate")) {
      let _animation = {
        key: "rotate",
        frames: this.anims.generateFrameNumbers("bomb", {
          frames: this._runAnimation
        }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };

      this._scene.anims.create(_animation);
    }


    this._scene.time.addEvent({
      delay: this._config.lifeSpan, callback: () => {
        this.removeItem();
      }, callbackScope: this
    })

    this.setScale(1)
    this._body.setCircle(14, 3, 2);

    this.play("rotate").setAlpha(0).setScale(0.5).setDepth(10);
    this._scene.tweens.add({ targets: this, alpha: 1, scale: 1, duration: 200 });


  }

  update(time: number, delta: number): void {

    //richiama l'update della classe base per controllare se lo sprite è all'interno della camera
    super.update(time, delta);

    let targetAngle: number = 0;
    let _enemy: any = this._scene.physics.closest(
      this,
      this._scene.getEnemyGroup().getChildren()
    );

    if (_enemy != null && _enemy.x != null && _enemy.y != null) {
      targetAngle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        _enemy.x,
        _enemy.y
      );
    } else {
      targetAngle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this._scene.getPlayer().x,
        this._scene.getPlayer().y
      );
    }

    // clamp to -PI to PI for smarter turning
    let diff = Phaser.Math.Angle.Wrap(targetAngle - this.rotation);

    // set to targetAngle if less than turnDegreesPerFrame
    if (Math.abs(diff) < Phaser.Math.DegToRad(this._turnDegreesPerFrame)) {
      this.rotation = targetAngle;
    } else {
      let angle = this.angle;
      if (diff > 0) {
        // turn clockwise
        angle += this._turnDegreesPerFrame;
      } else {
        // turn counter-clockwise
        angle -= this._turnDegreesPerFrame;
      }

      this.setAngle(angle);
    }

    const vx = Math.cos(this.rotation);
    const vy = Math.sin(this.rotation);

    this._body.velocity.x = vx * 350;
    this._body.velocity.y = vy * 350;
  }




}
