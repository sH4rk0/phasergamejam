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
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.add.existing(this);

    this._body.setDragX(100).setCollideWorldBounds(true, 0.5).setImmovable(true);

    this._cursors = this._scene.input.keyboard.createCursorKeys();
    this._spacebar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



/*


this._spacebar =
this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

let _animation = {
key: "idle",
frames: this.anims.generateFrameNumbers(this._config.key, {
frames: [0,1]
}),
frameRate: 10,
yoyo: false,
repeat: 0
};
this.anims.create(_animation);
_animation = {
key: "move",
frames: this.anims.generateFrameNumbers(this._config.key, {
frames: [2,3]
}),
frameRate: 10,
yoyo: false,
repeat: 0
};
this.anims.create(_animation);
this.setDepth(11);

*/

   
  }


  

  update(time: number, delta: number) {


    if (Phaser.Input.Keyboard.JustDown(this._spacebar)) { 

      console.log("lancia missile")

      new Missile({scene:this._scene, x:this.x,y:this.y,key:"missile"})

    }
   
    if (this._cursors.left.isDown) {
      this._body.setAccelerationX(-100)
      //codice
    }
    else if (this._cursors.right.isDown) {
      // codice
        this._body.setAccelerationX(100)
    }
    else { 
      this._body.setAccelerationX(0)

      //codice
    }


  }

}
