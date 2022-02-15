
export default class Boot extends Phaser.Scene {

  private iNutile: boolean;
  private _image: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Boot",
    });
  }

  preload() {

    this.load.image("logo", "assets/images/logo.png");
    this.load.bitmapFont(
      "arcade",
      "assets/fonts/arcade.png",
      "assets/fonts/arcade.xml"
    );
    
  }

  init(){ }

  create() {

  this.scene.start("Preloader");

  }


}
