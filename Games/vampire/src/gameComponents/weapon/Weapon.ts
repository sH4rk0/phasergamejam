import GamePlay from "../../scenes/GamePlay";
import IWeapon from "./IWeapon";

export default class Weapon extends Phaser.GameObjects.Sprite implements IWeapon {
  //creo queste variabili protected che potranno essere utilizzate dalle classi figlie di WEAPON
  protected _config: weaponConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;


  constructor(params: weaponConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;

  }

  create() {

    this._scene.addWeapon(this);
    this._scene.add.existing(this);
    this._body.allowGravity = false;

  }

  update(time: number, delta: number) {
    //se l'arma esce dalla camera corrente viene distrutta automaricamente richiamando removeItem()
    if (!this._scene.cameras.main.worldView.contains(this.x, this.y)) {
      this.removeItem();
    }
  }

  //metodo per l'eliminazione della weapon corrente
  removeItem() {
    //richiama il metodo removeWeapon della scena gamePlay
    this._scene.removeWeapon(this);
  }
}
