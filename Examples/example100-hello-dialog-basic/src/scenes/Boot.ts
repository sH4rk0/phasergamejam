
export default class Boot extends Phaser.Scene {


  constructor() {
    super({
      key: "Boot",
    });
  }

  preload() {

    var graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x000000, .9);
    graphics.fillRect(0, 0, 1024, 200);
    graphics.generateTexture("layer-dialog", 1024, 200);

    this.load.image("phaser", "assets/images/phaser.png");
    this.load.bitmapFont(
      "arcade",
      "assets/fonts/arcade.png",
      "assets/fonts/arcade.xml"
    );

  }

  init() { }

  create() {
    console.log("create:boot")
    this.scene.start("Preloader");

  }


}
