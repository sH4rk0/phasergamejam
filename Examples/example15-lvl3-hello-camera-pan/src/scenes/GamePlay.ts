
export default class GamePlay extends Phaser.Scene {


  constructor() {
    super({ key: "GamePlay" });
  }

  create() {


    this.add.text(512, 300, "gameplay").setOrigin(.5).setTint(0xff0000);

    this.add.text(512, 400, "Back to Intro").setOrigin(.5).setTint(0xff0000).setFontSize(40).setFontFamily("Roboto").setInteractive().on("pointerdown", () => {
      this.scene.stop("GamePlay");
      this.scene.start("Intro");
    });


  }
}
