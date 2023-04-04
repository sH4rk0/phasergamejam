
export default class GamePlay extends Phaser.Scene {
  private _sprite: Phaser.GameObjects.Sprite;
  
  

  constructor() {
    super({ key: "GamePlay" });
  }
  

  create() {

    console.log("create:gameplay");
    this.add.image(0, 0, "grecia").setOrigin(0).setX(0).setY(120);
    this.cameras.main.setBackgroundColor("#99CBFF");
    
    this._sprite=this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, "bomb").setFrame(4);

    


    
    
  }
}
