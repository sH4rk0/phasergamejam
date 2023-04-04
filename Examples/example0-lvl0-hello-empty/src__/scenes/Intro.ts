export default class Intro extends Phaser.Scene {

  private _logo: Phaser.GameObjects.Image;
  private _text: Phaser.GameObjects.Text;
  private _text1: Phaser.GameObjects.Text;
  
  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }
  create() {

    this.cameras.main.setBackgroundColor("#000000");
    console.log("create:intro");

    this._logo = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "alfano1")

let _style={ fontFamily: 'Arial', fontSize: "55px", color: '#007fff', stroke:"#007fff", strokeThickness: 4};
this._text =this.add.text(512,100, "Back in Black presents!", _style).setX(240).setY(150);   
this._text1 = this.add.text(512, 100, "Click here to play", _style).setTint(0xffffff).setX(290).setY(480).setInteractive().on("pointerdown", () => {

  this.scene.stop("Intro");
  this.scene.start("GamePlay", { level: 1 });




}, this)


  
  }


  update(time: number, delta: number): void {


    this._logo.rotation += .01;

  }

}

