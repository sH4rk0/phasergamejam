import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {
  private _scoreText: Phaser.GameObjects.BitmapText;
  private _score: number;
  private _livesText: Phaser.GameObjects.BitmapText;
  private _lives: number;
  private _gamePlay: GamePlay;
  private _music: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() {}

  create() {
  

     this._music = this.sound.add("music0");

      this._music.play(undefined, {
        loop: true,
        volume:0.03,
      });
    
    this._lives = 3;
    this._score = 0;
    this._gamePlay = <GamePlay>this.scene.get("GamePlay");
 
    this._gamePlay.events.off("update-score", this.updateScore, this);
    this._gamePlay.events.on("update-score", this.updateScore, this);

    this._gamePlay.events.off("decrease-live", this.decreaseLive, this);
    this._gamePlay.events.on("decrease-live", this.decreaseLive, this);

    
    this.registry.set("score", this._score);

    this._scoreText = this.add
      .bitmapText(20, 20, "arcade", "0")
      .setFontSize(30)
      .setTint(0xffffff)
      .setOrigin(0);
    
      this._livesText = this.add
      .bitmapText(1024-40, 20, "arcade", ""+this._lives)
      .setFontSize(30)
      .setTint(0xffffff)
      .setOrigin(0);

  }

  update() {

  }


  private updateScore(parameters: Array<any>): void {
    this._score += parameters[0];
    this._scoreText.setText(this._score + "");
    this.registry.set("score", this._score);
  
  }

  private decreaseLive(): void {
    this._lives--;
    this._livesText.setText(this._lives + "");
    if (this._lives == 0) this.gameOver();
  
  }

  private gameOver() {
    
      this._music.stop();
      this.scene.stop("Hud");
      this.scene.stop("GamePlay");
      this.scene.start("GameOver");
     
  }
}
