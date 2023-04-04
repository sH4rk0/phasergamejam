export default class Intro extends Phaser.Scene {

  private _logo: Phaser.GameObjects.Image;
  private _play: Phaser.GameObjects.BitmapText;
  private _credits: Phaser.GameObjects.BitmapText;
  private _music: Phaser.Sound.BaseSound;
  private _music2: Phaser.Sound.BaseSound;
  private _creditsContainer: Phaser.GameObjects.Container;
  private _creditsContainerText: Phaser.GameObjects.Text;
  private _creditsContainerBackground: Phaser.GameObjects.Image;
  private _creditsContainerBackground2: Phaser.GameObjects.Image;
  private _creditsContainerEsc: Phaser.GameObjects.Image;
  private _M: Phaser.GameObjects.Sprite;
  private _Aereo: Phaser.GameObjects.TileSprite;
  private _Aereo2: Phaser.GameObjects.TileSprite;
  private _Aereo3: Phaser.GameObjects.TileSprite;
  private _Aereo4: Phaser.GameObjects.TileSprite;
  private _Aereo5: Phaser.GameObjects.TileSprite;
  private _Aereo6: Phaser.GameObjects.TileSprite;
  private _Aereo7: Phaser.GameObjects.TileSprite;
  private _Aereo8: Phaser.GameObjects.TileSprite;
  private _Aereo9: Phaser.GameObjects.TileSprite;
  private _Aereo10: Phaser.GameObjects.TileSprite;
  private _Aereo11: Phaser.GameObjects.TileSprite;
  private _Aereo12: Phaser.GameObjects.TileSprite;
  private _Aereo13: Phaser.GameObjects.TileSprite;
  private _Aereo14: Phaser.GameObjects.TileSprite;
  private _Aereo15: Phaser.GameObjects.TileSprite;
  private _Aereo16: Phaser.GameObjects.TileSprite;
  private _Aereo17: Phaser.GameObjects.TileSprite;
  private _Aereo18: Phaser.GameObjects.TileSprite;
  private _Aereo19: Phaser.GameObjects.TileSprite;
  private _Aereo20: Phaser.GameObjects.TileSprite;
  private _Aereo21: Phaser.GameObjects.TileSprite;
  private _Aereo22: Phaser.GameObjects.TileSprite;
  private _Aereo23: Phaser.GameObjects.TileSprite;
  private _Aereo24: Phaser.GameObjects.TileSprite;
  constructor() {
    super({
      key: "Intro",
    });

  }





  create() {
    this.add.tileSprite(500, 250, 0, 0, "intro-image").setOrigin(1).setPosition(1024, 600);







    this._Aereo = this.add.tileSprite(-300, 40, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo2 = this.add.tileSprite(-43, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.3, .2);
    this._Aereo3 = this.add.tileSprite(-125, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo4 = this.add.tileSprite(-2000, 10, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo5 = this.add.tileSprite(-1507, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo6 = this.add.tileSprite(-1662, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo7 = this.add.tileSprite(-2000, 10, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo8 = this.add.tileSprite(-2307, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo9 = this.add.tileSprite(-2462, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo10 = this.add.tileSprite(-3100, 10, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo11 = this.add.tileSprite(-3534, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo12 = this.add.tileSprite(-3842, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo13 = this.add.tileSprite(-3980, 40, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo14 = this.add.tileSprite(-4300, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.3, .2);
    this._Aereo15 = this.add.tileSprite(-4574, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo16 = this.add.tileSprite(-4876, 10, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo17 = this.add.tileSprite(-5144, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo18 = this.add.tileSprite(-5632, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo19 = this.add.tileSprite(-6012, 10, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo20 = this.add.tileSprite(-6344, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo21 = this.add.tileSprite(-6578, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo22 = this.add.tileSprite(-6890, 10, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._Aereo23 = this.add.tileSprite(-7007, 70, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.24, .2);
    this._Aereo24 = this.add.tileSprite(-6643, 120, 0, 0, "aereo").setOrigin(0).setDepth(1).setScale(.4, .3);
    this._M = this.add.sprite(510, 493, "player_intro").setDepth(1).setScale(.15);
    this._music = this.sound.add("_intro", { loop: true, volume: 0.7 });
    this._music.play();
    this._creditsContainer = this.add.container().setAlpha(0).setDepth(10);
    this._creditsContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
    this._creditsContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450, 0);
    this._creditsContainerBackground2 = this.add.image(this.game.canvas.width / 2, 120, "options");

    this._creditsContainer.add([
      this._creditsContainerBackground,
      this._creditsContainerText,
      this._creditsContainerBackground2,
      this.add.text(this.game.canvas.width / 2, 100, "Creators").setTint(0xff0000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(475, 15),
      this.add.text(this.game.canvas.width / 2, 100, "Andrea Iacolare / andrue").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(378, 45),
      this.add.text(this.game.canvas.width / 2, 100, "Michele Pascarella / zozne").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(378, 75),
      this.add.text(this.game.canvas.width / 2, 100, "Fabio Iacolare / fasbruk").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(378, 105),
      this.add.text(this.game.canvas.width / 2, 100, "Giovanni Torrente / zio gio").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(378, 135),
      this.add.text(this.game.canvas.width / 2, 100, "Angelo  Galzerano / brodino").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(378, 165),
      this.add.text(this.game.canvas.width / 2, 100, "Gabriele Di Maio / nog").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(378, 195),
      this.add.text(this.game.canvas.width / 2, 100, "Giampoalo La Cerra / tondus").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(378, 225),
      this.add.image(0, 0, "popup").setOrigin(.0).setScale(.1).setPosition(640, 0).setInteractive()
        .on("pointerdown", () => {
          this.closeCredits();
        })]);


    this.cameras.main.setBackgroundColor(0xffffff);
    this._logo = this.add.image(this.game.canvas.width / 2, 50, "arkanoid").setAlpha(0);
    this._play = this.add
      .bitmapText(this.game.canvas.width / 2, 350, "arcade", "PLAY")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setScale(1.1)
      .setTint(0x800000)
      .on("pointerup", () => {
        this._play.removeInteractive();
        this.startGame();
      })
      .on("pointerover", () => {
        this._play.setTint(0x300000).setScale(1.3);
        this._music2 = this.sound.add("_button", { loop: false, volume: 0.7 });
        this._music2.play();
      })
      .on("pointerout", () => {
        this._play.setTint(0x800000).setScale(1.1);
      });


    this._credits = this.add
      .bitmapText(this.game.canvas.width / 2, 400, "arcade", "CREDITS")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setScale(1)
      .setTint(0x800000)
      .on("pointerup", () => {
        this._credits.removeInteractive();
      })
      .on("pointerover", () => {
        this._credits.setTint(0x300000).setScale(1.3);
        this._music2 = this.sound.add("_button", { loop: false, volume: 0.7 });
        this._music2.play();
      })
      .on("pointerout", () => {
        this._credits.setTint(0x800000).setScale(1);
      })
      .on("pointerdown", this.openCredits, this);

  }

  //a



  openCredits() {
    this._credits.disableInteractive();
    this._play.disableInteractive();
    this.tweens.add({
      targets: this._creditsContainer, alpha: 1, duration: 1000, onComplete: () => {
        this._creditsContainerBackground.setInteractive()
      }
    })
  }

  closeCredits() {
    this.tweens.add({
      targets: this._creditsContainer, alpha: 0, duration: 1000, onComplete: () => {
        this._play.setInteractive();
        this._credits.setInteractive();
      }
    })
  }

  startGame() {

    this.scene.stop("Intro");
    //this.scene.start("GamePlay");

    this.scene.start("FabioIacolare");

    this._music.stop();
  }


  update(time: number, delta: number): void {


    this._Aereo.x += 5;
    this._Aereo2.x += 3;
    this._Aereo3.x += 5;
    this._Aereo4.x += 6;
    this._Aereo5.x += 5;
    this._Aereo6.x += 4;
    this._Aereo7.x += 7;
    this._Aereo8.x += 3;
    this._Aereo9.x += 4;
    this._Aereo10.x += 5;
    this._Aereo11.x += 4;
    this._Aereo12.x += 6;
    this._Aereo13.x += 4;
    this._Aereo14.x += 6;
    this._Aereo15.x += 5;
    this._Aereo16.x += 6;
    this._Aereo17.x += 3;
    this._Aereo18.x += 5;
    this._Aereo19.x += 7;
    this._Aereo20.x += 3;
    this._Aereo21.x += 4;
    this._Aereo22.x += 5;
    this._Aereo23.x += 4;
    this._Aereo24.x += 5;
  }



}