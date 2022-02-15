export default class Intro extends Phaser.Scene {
  
  private _logo: Phaser.GameObjects.Image;
  private _playGame: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "Intro",
    });
  }
  create() {


    let particles = this.add.particles("flares");

    let emitter=particles.createEmitter({
      frame: "yellow",
      y: 0,
      x: { min: 0, max: this.game.canvas.width },
      lifespan: 10000,
      speedY: { min: 50, max: 3000 },
      scale: { start: 0.1, end: 0.5 },
      quantity: 4 

    })



    this.cameras.main.setBackgroundColor("#000000")

    this._logo = this.add.image(this.game.canvas.width / 2, 50, "galaxian").setAlpha(0);
    this.add.tween({
      targets: this._logo, y: 150, alpha: 1, duration: 1000, ease: "quad.easeInOut",

      onComplete: () => {
         this.add.tween({
           targets: this._logo, y: 120, repeat: -1, yoyo: true, duration: 1000, ease: "quad.easeInOut",
          });
       }
    });

    this._playGame = this.add.bitmapText(this.game.canvas.width / 2, this.game.canvas.height - 20, "arcade", "Clicca per giocare");

    this._playGame.setTint(0xff0000)
      .setOrigin(.5)
      .setInteractive()
      .on("pointerup", () => {

        this.startGame();        

       });
  }


  
  startGame() {

    this.scene.stop("Intro");
    this.scene.start("GamePlay");
    console.log("click")

   }

  update(time: number, delta: number): void { }

}

