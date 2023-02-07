import GamePlay from "../../scenes/GamePlay";
import Weapon from "./Weapon";
import IWeapon from "./IWeapon";

export default class WeaponDagger extends Weapon implements IWeapon {

  //questa è la weapon di default. 
  //viene sparata nella direzione in cui guarda il Player

  private _runAnimation: Array<number> = [0, 1, 2, 3, 4, 5];

  constructor(params: weaponConfig) {
    super(params);
    this._config = params;
    this.create();
  }

  create() {

    super.create();

    let _animation = {
      key: "rotate",
      frames: this.anims.generateFrameNumbers("bomb", {
        frames: this._runAnimation
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };

    this.setScale(1)
    this._body.setCircle(14, 3, 2);
    this._scene.anims.create(_animation);
    this.play("rotate").setAlpha(0).setScale(0.5).setDepth(10);
    this._scene.tweens.add({ targets: this, alpha: 1, scale: 1, duration: 200 });

    //setta la velocity in base alla direzione del player
    if (this._config.direction == "left") { this._body.setVelocityX(-400) }
    else if (this._config.direction == "right") { this._body.setVelocityX(400) }
    else if (this._config.direction == "up") { this._body.setVelocityY(-400) }
    else if (this._config.direction == "down") { this._body.setVelocityY(400) }
    else if (this._config.direction == "none") { this._body.setVelocityY(-400) }


  }




}
