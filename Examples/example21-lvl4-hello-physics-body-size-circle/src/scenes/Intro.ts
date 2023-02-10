export default class Intro extends Phaser.Scene {


  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }

  create() {

    this.cameras.main.setBackgroundColor("#000000");

    let _sprite1 = this.physics.add.sprite(200, 100, "bomb").setScale(3);
    _sprite1.body.setGravityY(200).setSize(20, 20);


    let _sprite = this.add.sprite(100, 100, "bomb").setScale(3);
    this.physics.world.enableBody(_sprite);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;
    _body.setGravityY(100).setCircle(10).setOffset(6, 6);


  }



  update(time: number, delta: number): void {



  }




}

