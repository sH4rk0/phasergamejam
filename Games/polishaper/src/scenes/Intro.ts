export default class Intro extends Phaser.Scene {

  private _logo: Phaser.GameObjects.Image;
  private _play: Phaser.GameObjects.BitmapText;
  private _counter: number = 0;
  private _cubes: Phaser.GameObjects.TileSprite;


  constructor() {



    super({
      key: "Intro",
    });
  }
  create() {




    this.cameras.main.setBackgroundColor("#000000");

    this._cubes = this.add.tileSprite(0, 0, 1024, 600, "cubes").setOrigin(0)
    this.add.image(0, 0, "trasparenza").setOrigin(0).setScale(2);
    this._logo = this.add.image(this.game.canvas.width / 2, 50, "greenbots").setAlpha(0);
    this.add.tween({
      targets: this._logo, y: 150, alpha: 1, duration: 1000, ease: "quad.easeInOut",

      onComplete: () => {
        this.add.tween({
          targets: this._logo, y: 120, repeat: -1, yoyo: true, duration: 1000, ease: "quad.easeInOut",
        });
      }
    });


    this._play = this.add
      .bitmapText(this.game.canvas.width / 2, 550, "arcade", "PLAY")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0xffffff)
      .on("pointerup", () => {
        this._play.removeInteractive();
        this.startGame();
      })
      .on("pointerover", () => {
        this._play.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this._play.setTint(0xffffff);
      });
  }

  startGame() {

    this.scene.stop("Intro");
    this.scene.start("Levels");


  }

  update(time: number, delta: number): void {


    this._counter += 0.01;
    this._cubes.tilePositionX += Math.sin(this._counter) * 1;
    this._cubes.tilePositionY += Math.cos(this._counter) * 1;
  }

}

