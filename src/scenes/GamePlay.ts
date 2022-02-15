import Player from "../gameComponents/player/Player";


export default class GamePlay extends Phaser.Scene {

  private _bg: Phaser.GameObjects.TileSprite;
  private _player: Player;

  constructor() {
    super({ key: "GamePlay" });
  }
  
  create() {
  
    this._bg = this.add.tileSprite(0, 0, 1024, 600, "bg").setOrigin(0);
    this._player = new Player({ scene: this, x: 512, y: 550, key: "spaceship" });

  }
  
  update (time: number, delta: number)
  {

    this._bg.tilePositionY -= 2;
    this._player.update(time, delta);
    
       
  }
  
}
