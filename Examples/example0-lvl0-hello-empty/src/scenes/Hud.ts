import FabioIacolare from "./FabioIacolare";
import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {
  private _vita: Phaser.GameObjects.Image;
  private _tre: Phaser.GameObjects.Text;
  private _colpi: Phaser.GameObjects.Image;
  private _ncolpi:Phaser.GameObjects.Text;
  private _ncolpi2: number
  private _FabioIacolare:FabioIacolare;

  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() { }

  create() {
    this._FabioIacolare = <FabioIacolare>this.scene.get("FabioIacolare");
    this._vita= this.add.image(this.game.canvas.width/ 2,100, "cuore").setPosition(980,40).setScale(.1).setAlpha(1)
  this._tre= this.add.text(this.game.canvas.width/ 2,100, "3").setPosition(977,25).setScale(1).setAlpha(1).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setTint(0x000000)
  this._colpi= this.add.image(this.game.canvas.width/ 2,100, "proiettili_pieni").setPosition(915,37).setScale(.3).setAlpha(1)
  this._ncolpi2= 12;
  this._ncolpi=this.add.text(this.game.canvas.width/2,100, ""+ this._ncolpi2).setPosition(860,25).setScale(1.2).setAlpha(1).setTint(0x000000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setTint(0x000000)
 
  }
 update(time: number, delta: number): void {
     
    }
  }
//a