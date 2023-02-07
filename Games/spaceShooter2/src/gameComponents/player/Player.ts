import GamePlay from "../../scenes/GamePlay";
import Missile from "../missile/Missile";
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;

  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _spacebar: Phaser.Input.Keyboard.Key;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, "space", "ship");
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.add.existing(this);

    const particles = this._scene.add.particles('space');
    /* 
    const emitter = particles.createEmitter({
       frame: 'blue',
       speed: 100,
       scale: { start: 1, end: 0 },
       blendMode: 'ADD'
     });
     emitter.startFollow(this);
     */

    const emitter = particles.createEmitter({
      frame: 'blue',
      speed: 100,
      lifespan: {
        onEmit: () => {
          return Phaser.Math.Percent(this._body.speed, 0, 300) * 2000;
        }
      },
      alpha: {
        onEmit: () => {
          return Phaser.Math.Percent(this._body.speed, 0, 300);
        }
      },
      angle: {
        onEmit: () => {
          const v = Phaser.Math.Between(-10, 10);
          return (this.angle - 180) + v;
        }
      },
      scale: { start: 0.6, end: 0 },
      blendMode: 'ADD'
    });

    emitter.startFollow(this);



    this._body.setDrag(300, 300).setAngularDrag(400).setMaxVelocity(600);

    this._cursors = this._scene.input.keyboard.createCursorKeys();
    this._spacebar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.setDepth(11);
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this._body
  }

  update(time: number, delta: number) {

    //se preme la barra spaziatrice
    if (Phaser.Input.Keyboard.JustDown(this._spacebar)) {

      //crea una nova istanza di missile
      new Missile({ scene: this._scene, x: this.x, y: this.y, key: "missile" })

    }

    const { left, right, up } = this._cursors;

    if (left.isDown) {
      this._body.setAngularVelocity(-150);
    }
    else if (right.isDown) {
      this._body.setAngularVelocity(150);
    }
    else {
      this._body.setAngularVelocity(0);
    }

    if (up.isDown) {
      this._scene.physics.velocityFromRotation(this.rotation, 600, this._body.acceleration);
    }
    else {
      this._body.setAcceleration(0, 0);
    }



  }

}
