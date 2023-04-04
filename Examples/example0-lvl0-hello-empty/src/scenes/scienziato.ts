export default class scienziato extends Phaser.Scene {
  private _bar:Phaser.GameObjects.TileSprite;
  private _dialogo:Phaser.GameObjects.BitmapText;

  //container 1
  private _dialogoContainer: Phaser.GameObjects.Container;
  private _dialogoContainerText: Phaser.GameObjects.Text;
  private _dialogoContainerBackground: Phaser.GameObjects.Image;
  private _dialogoContainerBackground2: Phaser.GameObjects.Image;
  private _dialogoContainerEsc: Phaser.GameObjects.Image; 

  //container 2
  private _dialogo2Container: Phaser.GameObjects.Container;
  private _dialogo2ContainerText: Phaser.GameObjects.Text;
  private _dialogo2ContainerBackground: Phaser.GameObjects.Image;
  private _dialogo2ContainerBackground2: Phaser.GameObjects.Image;
  private _dialogo2ContainerEsc: Phaser.GameObjects.Image; 

   //container 3
   private _dialogo3Container: Phaser.GameObjects.Container;
   private _dialogo3ContainerText: Phaser.GameObjects.Text;
   private _dialogo3ContainerBackground: Phaser.GameObjects.Image;
   private _dialogo3ContainerBackground2: Phaser.GameObjects.Image;
   private _dialogo3ContainerEsc: Phaser.GameObjects.Image; 
//a
    //container 4
  private _dialogo4Container: Phaser.GameObjects.Container;
  private _dialogo4ContainerText: Phaser.GameObjects.Text;
  private _dialogo4ContainerBackground: Phaser.GameObjects.Image;
  private _dialogo4ContainerBackground2: Phaser.GameObjects.Image;
  private _dialogo4ContainerEsc: Phaser.GameObjects.Image; 

   //container 5
   private _dialogo5Container: Phaser.GameObjects.Container;
   private _dialogo5ContainerText: Phaser.GameObjects.Text;
   private _dialogo5ContainerBackground: Phaser.GameObjects.Image;
   private _dialogo5ContainerBackground2: Phaser.GameObjects.Image;
   private _dialogo5ContainerEsc: Phaser.GameObjects.Image; 

    //container 6
  private _dialogo6Container: Phaser.GameObjects.Container;
  private _dialogo6ContainerText: Phaser.GameObjects.Text;
  private _dialogo6ContainerBackground: Phaser.GameObjects.Image;
  private _dialogo6ContainerBackground2: Phaser.GameObjects.Image;
  private _dialogo6ContainerEsc: Phaser.GameObjects.Image; 

   //container 7
   private _dialogo7Container: Phaser.GameObjects.Container;
   private _dialogo7ContainerText: Phaser.GameObjects.Text;
   private _dialogo7ContainerBackground: Phaser.GameObjects.Image;
   private _dialogo7ContainerBackground2: Phaser.GameObjects.Image;
   private _dialogo7ContainerEsc: Phaser.GameObjects.Image; 

  //musica
  private music_bar:Phaser.Sound.BaseSound;
  private _music: Phaser.Sound.BaseSound;
  private _music2: Phaser.Sound.BaseSound;



  constructor(){
      super({
          key: "scienziato"
      })
  }

  
 create(){
  this.cameras.main.setBackgroundColor(0xffffff);

  this._bar=this.add.tileSprite(500,250,0,0, "bar_contipi").setAlpha(1).setOrigin(1).setPosition(1024,600)
  this.music_bar=this.sound.add("_musicbar", { loop: true, volume: 0.05 });
  this.music_bar.play();


  this._dialogoContainer = this.add.container().setAlpha(0).setDepth(10);
    this._dialogoContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogoContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogoContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_destra").setDepth(2).setScale(4,3).setPosition(390,267).setOrigin(0.5);
  this._dialogoContainer = this.add.container().setAlpha(0).setDepth(10);


  this._dialogoContainer.add([
    this._dialogoContainerBackground,
     this._dialogoContainerText,
     this._dialogoContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Forestiero, e' da un po' di tempo che ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,220),
     this.add.text(this.game.canvas.width / 2, 100, "ti vedo da queste parti, da dove vieni?").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,245),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setDepth(15).setPosition(1010,470).setInteractive()
     .on("pointerdown", () => {
      this.closedialogo(),
    this.opendialogo2();
  }),])
   



 this._dialogo2Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogo2ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogo2ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogo2ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_sinistra").setDepth(2).setScale(4,3).setPosition(610,280).setOrigin(0.5);
  this._dialogo2Container = this.add.container().setAlpha(0).setDepth(10);

  this._dialogo2Container.add([
    this._dialogo2ContainerBackground,
     this._dialogo2ContainerText,
     this._dialogo2ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Vengo da una Nazione ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(500,230),
     this.add.text(this.game.canvas.width / 2, 100, "del sud chiamata Clover").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(500,265),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setPosition(1010,470).setDepth(15).setInteractive()
     .on("pointerdown", () => {
    this.closedialogo2();
    this.opendialogo3();
  }),])




  this._dialogo3Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogo3ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogo3ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogo3ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_destra").setDepth(2).setScale(4,3).setPosition(390,267).setOrigin(0.5);
  this._dialogo3Container = this.add.container().setAlpha(0).setDepth(10);

  this._dialogo3Container.add([
    this._dialogo3ContainerBackground,
     this._dialogo3ContainerText,
     this._dialogo3ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Ah, quella nazione che ha perso ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,220),
     this.add.text(this.game.canvas.width / 2, 100, "la guerra tempo fa. *cough *cough").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,245),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setDepth(15).setPosition(1010,470).setInteractive()
     .on("pointerdown", () => {
      this.closedialogo3(),
    this.opendialogo4();
  }),])


  this._dialogo4Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogo4ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogo4ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogo4ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_sinistra").setDepth(2).setScale(4,3).setPosition(610,280).setOrigin(0.5);
  this._dialogo4Container = this.add.container().setAlpha(0).setDepth(10);


  this._dialogo4Container.add([
    this._dialogo4ContainerBackground,
     this._dialogo4ContainerText,
     this._dialogo4ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Si proprio quella nazione, ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(480,213),
     this.add.text(this.game.canvas.width / 2, 100, "vorrei ci fosse un modo per  ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(480,233),
     this.add.text(this.game.canvas.width / 2, 100, "rimediare ai miei sbagli come ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(480,253),
     this.add.text(this.game.canvas.width / 2, 100, " ad esempio tornare nel passato").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(480,273),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setPosition(1010,470).setDepth(15).setInteractive()
     .on("pointerdown", () => {
    this.closedialogo4();
    this.opendialogo5();
  }),])


  this._dialogo5Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogo5ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogo5ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogo5ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_destra").setDepth(2).setScale(4,3).setPosition(390,267).setOrigin(0.5);
  this._dialogo5Container = this.add.container().setAlpha(0).setDepth(10);

  this._dialogo5Container.add([
    this._dialogo5ContainerBackground,
     this._dialogo5ContainerText,
     this._dialogo5ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Ho io qualcosa che fa al caso tuo,  ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,210),
     this.add.text(this.game.canvas.width / 2, 100, "domani recati nel mio laboratorio").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,230),
     this.add.text(this.game.canvas.width / 2, 100, "via WolfStreet 1/5").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,250),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setDepth(15).setPosition(1010,470).setInteractive()
     .on("pointerdown", () => {
      this.closedialogo5(),
    this.opendialogo6();
  }),])


  this._dialogo6Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogo6ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogo6ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogo6ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_sinistra").setDepth(2).setScale(4,3).setPosition(610,280).setOrigin(0.5);
  this._dialogo6Container = this.add.container().setAlpha(0).setDepth(10);


  this._dialogo6Container.add([
    this._dialogo6ContainerBackground,
     this._dialogo6ContainerText,
     this._dialogo6ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Saresti una specie di scienziato? ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(470,240),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setPosition(1010,470).setDepth(15).setInteractive()
     .on("pointerdown", () => {
    this.closedialogo6();
    this.opendialogo7();
  }),])


  this._dialogo7Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogo7ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogo7ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogo7ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_destra").setDepth(2).setScale(4,3).setPosition(390,267).setOrigin(0.5);
  this._dialogo7Container = this.add.container().setAlpha(0).setDepth(10);


  this._dialogo7Container.add([
    this._dialogo7ContainerBackground,
     this._dialogo7ContainerText,
     this._dialogo7ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Haha ragazzo, lo scoprirai, ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,220),
     this.add.text(this.game.canvas.width / 2, 100, "a domani. *cough *cough").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(240,245),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setDepth(15).setPosition(1010,470).setInteractive()
     .on("pointerdown", () => {
      this.closedialogo7();
      this.startGame();
  }),])




    this._dialogo = this.add
    .bitmapText(this.game.canvas.width / 2, 400, "arcade", "inizia il dialogo")
    .setAlpha(1)
    .setOrigin(0.5)
    .setInteractive()
    .setDepth(100)
    .setScale(0.3)
    .setPosition(915,480)
    .setTint(0xffffff)
    .on("pointerup", () => {
      this._dialogo.setAlpha(0)
      this._dialogo.removeInteractive();
    })
    .on("pointerover", () => {
      this._dialogo.setTint(0xffffff).setScale(0.4);
      this._music2= this.sound.add("_button", { loop: false, volume: 0.7 });
      this._music2.play();
    })
    .on("pointerout", () => { 
      this._dialogo.setTint(0xffffff).setScale(0.3);
    })
    .on("pointerdown", this.opendialogo, this);

        

}

  
    opendialogo() {
      this.tweens.add({
        targets: this._dialogoContainer, alpha: 1, duration: 1000, onComplete: () => {
          this._dialogoContainerBackground.setInteractive()
        }
      })}
    
    closedialogo() {
        this.tweens.add({
          targets: this._dialogoContainer, alpha: 0, duration: 1000, onComplete: () => {
            this._dialogo.setInteractive();
          }
        })
      }

      opendialogo2() {
        this.tweens.add({
          targets: this._dialogo2Container, alpha: 1, duration: 1000, onComplete: () => {
            this._dialogo2ContainerBackground.setInteractive()
          }
        })}
      
      closedialogo2() {
          this.tweens.add({
            targets: this._dialogo2Container, alpha: 0, duration: 1000, onComplete: () => {
              this._dialogo.setInteractive();
            }
          })
        }


        opendialogo3() {
          this.tweens.add({
            targets: this._dialogo3Container, alpha: 1, duration: 1000, onComplete: () => {
              this._dialogo3ContainerBackground.setInteractive()
            }
          })}
        
        closedialogo3() {
            this.tweens.add({
              targets: this._dialogo3Container, alpha: 0, duration: 1000, onComplete: () => {
                this._dialogo.setInteractive();
              }
            })
          }


          opendialogo4() {
            this.tweens.add({
              targets: this._dialogo4Container, alpha: 1, duration: 1000, onComplete: () => {
                this._dialogo4ContainerBackground.setInteractive()
              }
            })}
          
          closedialogo4() {
              this.tweens.add({
                targets: this._dialogo4Container, alpha: 0, duration: 1000, onComplete: () => {
                  this._dialogo.setInteractive();
                }
              })
            }


            opendialogo5() {
              this.tweens.add({
                targets: this._dialogo5Container, alpha: 1, duration: 1000, onComplete: () => {
                  this._dialogo5ContainerBackground.setInteractive()
                }
              })}
            
            closedialogo5() {
                this.tweens.add({
                  targets: this._dialogo5Container, alpha: 0, duration: 1000, onComplete: () => {
                    this._dialogo.setInteractive();
                  }
                })
              }


              opendialogo6() {
                this.tweens.add({
                  targets: this._dialogo6Container, alpha: 1, duration: 1000, onComplete: () => {
                    this._dialogo6ContainerBackground.setInteractive()
                  }
                })}
              
              closedialogo6() {
                  this.tweens.add({
                    targets: this._dialogo6Container, alpha: 0, duration: 1000, onComplete: () => {
                      this._dialogo.setInteractive();
                    }
                  })
                }


                opendialogo7() {
                  this.tweens.add({
                    targets: this._dialogo7Container, alpha: 1, duration: 1000, onComplete: () => {
                      this._dialogo7ContainerBackground.setInteractive()
                    }
                  })}
                
                closedialogo7() {
                    this.tweens.add({
                      targets: this._dialogo7Container, alpha: 0, duration: 1000, onComplete: () => {
                        this._dialogo.setInteractive();
                      }
                    })
                  }

startGame() {
  this.scene.stop("scienziato");
  this.scene.start("laboratorio");
  this.music_bar.stop();
}

update(time: number, delta: number): void {

}

}
