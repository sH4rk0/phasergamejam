
export default class Boot extends Phaser.Scene {

  private iNutile: boolean;
  private _image: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Boot",
    });
  }

  preload() {

    var graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture("robot", 32, 32);

    this.load.image("logo", "assets/images/logo.png");
    this.load.bitmapFont(
      "arcade",
      "assets/fonts/arcade.png",
      "assets/fonts/arcade.xml"
    );

  }

  init() { }

  create() {

    this.scene.start("Preloader");

  }


}
