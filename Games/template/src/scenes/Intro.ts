export default class Intro extends Phaser.Scene {

  private _logo: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }
  create() {

    this.cameras.main.setBackgroundColor("#ffffff");
    console.log("create:intro");

    this._logo = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "logo-phaser")

  }


  update(time: number, delta: number): void {


    this._logo.rotation += .01;

  }

}

