
export default class GamePlay extends Phaser.Scene {

  private _text: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "GamePlay" });
  }

  create() {


    this._text = this.add.text(20, 20, "Clicca per dialogo index:0").setTint(0xff0000).setOrigin(0).setFontFamily("Roboto").setFontSize(20).setInteractive().on("pointerdown", () => {

      this.events.emit("start-dialog", [0]);
    });

    this.add.text(20, 60, "Clicca per dialogo index:3").setTint(0xff0000).setOrigin(0).setFontFamily("Roboto").setFontSize(20).setInteractive().on("pointerdown", () => {

      this.events.emit("start-dialog", [3]);
    });


  }



  update(time: number, delta: number): void {

    this._text.rotation += .001
  }

}
