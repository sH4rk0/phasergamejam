import Bonus from "../components/bonus/Bonus";
import Planet from "../components/planet/Planet";
import Player from "../components/player/Player";
import Player4directions from "../components/player/Player4directions";

export default class GamePlay extends Phaser.Scene {

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _text: Phaser.GameObjects.Text;
  private _groupBonus: Phaser.GameObjects.Group;
  private _groupPlanet: Phaser.GameObjects.Group;
  private _level: number = 0;

  constructor() {
    super({ key: "GamePlay" });
  }


  init(data: { level: number }) {
    //recuperiamo il valore level e controlliamo che questo valore non sia null
    if (data.level != null) {
      this._level = data.level
    } else {
      //se è null settiamo il livello = 0 (primo livello)
      this._level = 0;
    }
  }


  create() {

    this._mainCamera = this.cameras.main;
    this._groupBonus = this.add.group({ runChildUpdate: true });
    this._groupPlanet = this.add.group({ runChildUpdate: true });
    this._mainCamera.setBackgroundColor(0x000000);


    this._text = this.add.text(0, 0, "")
      .setScrollFactor(0)
      .setFontSize(30)
      .setShadow(2, 2, "#000000", 2)
      .setStroke("#ff0000", 5).setDepth(100);
    this._player = new Player4directions({ scene: this, x: 100, y: 100, key: "robo-idle" });
    this.physics.world.gravity = new Phaser.Math.Vector2({ x: 0, y: 0 });

    new Planet({ scene: this, x: 512, y: 300, key: "planet" });
    new Planet({ scene: this, x: 202, y: 600, key: "planet" });

    this.physics.add.collider(this._player, this._groupPlanet, this.hitPlanet, undefined, this);
    this.physics.add.collider(this._player, this._groupBonus, this.hitBonus, undefined, this);


  }

  hitPlanet(player: any, planet: any) {

    //effettuiamo una conversione dal tipo any al tipo corretto
    const _planet: Planet = <Planet>planet;


  }


  hitBonus(player: any, bonus: any) {

    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Bonus = <Bonus>bonus;
    //viene esguito il metodo getBonus
    _bonus.getBonus();

  }

  updateValues(x: number, y: number) {
    this._text.setText("player position:" + Math.round(x) + " " + Math.round(y));

  }

  addBonus(bonus: Bonus) {
    this._groupBonus.add(bonus);
  }

  addPlanet(bonus: Planet) {
    this._groupPlanet.add(bonus);
  }

  removeBonus(bonus: Bonus) {
    this._groupBonus.remove(bonus, true, true);
    this.events.emit("update-score", [100]);
  }


  update(time: number, delta: number): void {
    this._player.update(time, delta);
  }

}
