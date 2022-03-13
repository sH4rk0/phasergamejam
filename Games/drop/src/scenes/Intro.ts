export default class Intro extends Phaser.Scene {

  private _logo: Phaser.GameObjects.Image;
  private _play: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "Intro",
    });
  }
  create() {

    this.cameras.main.setBackgroundColor("#000000");
    this._logo = this.add.image(this.game.canvas.width / 2, 50, "drop").setAlpha(0);
    this.add.tween({
      targets: this._logo, y: 180, alpha: 1, duration: 1000, ease: "quad.easeInOut",

      onComplete: () => {
        this.add.tween({
          targets: this._logo, y: 150, repeat: -1, yoyo: true, duration: 1000, ease: "quad.easeInOut",
        });
      }
    });


    this._play = this.add
      .bitmapText(this.game.canvas.width / 2, 550, "arcade", "PLAY")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0xff8200)
      .on("pointerup", () => {
        this._play.removeInteractive();
        this.startGame();
      })
      .on("pointerover", () => {
        this._play.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this._play.setTint(0xff8200);
      });
  }

  startGame() {

    this.scene.stop("Intro");
    this.scene.start("GamePlay");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");

  }

  update(time: number, delta: number): void { }

}

