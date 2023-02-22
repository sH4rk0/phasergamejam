

export default class Intro extends Phaser.Scene {




  constructor() {

    super({ key: "Intro" });

  }


  create() {


    this.add.text(512, 300, "click to Start from level 0").setOrigin(.5).on("pointerdown", () => {

      this.scene.start("GamePlay", { level: 0 });
      this.scene.start("Hud");
      this.scene.bringToTop("Hud");

    }).setTint(0xff0000).setInteractive();



  }

  update(time: number, delta: number): void {



  }


}
