 export default class laboratorio extends Phaser.Scene {
 private _lab:Phaser.GameObjects.TileSprite;
 private _dialogolab:Phaser.GameObjects.BitmapText;

   //container 1
   private _dialogolabContainer: Phaser.GameObjects.Container;
   private _dialogolabContainerText: Phaser.GameObjects.Text;
   private _dialogolabContainerBackground: Phaser.GameObjects.Image;
   private _dialogolabContainerBackground2: Phaser.GameObjects.Image;
   private _dialogolabContainerEsc: Phaser.GameObjects.Image; 
 
   //container 2
   private _dialogolab2Container: Phaser.GameObjects.Container;
   private _dialogolab2ContainerText: Phaser.GameObjects.Text;
   private _dialogolab2ContainerBackground: Phaser.GameObjects.Image;
   private _dialogolab2ContainerBackground2: Phaser.GameObjects.Image;
   private _dialogolab2ContainerEsc: Phaser.GameObjects.Image; 
 
    //container 3
    private _dialogolab3Container: Phaser.GameObjects.Container;
    private _dialogolab3ContainerText: Phaser.GameObjects.Text;
    private _dialogolab3ContainerBackground: Phaser.GameObjects.Image;
    private _dialogolab3ContainerBackground2: Phaser.GameObjects.Image;
    private _dialogolab3ContainerEsc: Phaser.GameObjects.Image; 


    //musica
    private _music: Phaser.Sound.BaseSound;
    private _music2: Phaser.Sound.BaseSound;

    constructor(){
        super({
            key: "laboratorio"
        })
    }

    create(){

      
        this.cameras.main.setBackgroundColor(0x000000);
        this._lab=this.add.tileSprite(500,250,0,0, "labs").setAlpha(1).setOrigin(1).setPosition(1024,600);
        

    this._dialogolabContainer = this.add.container().setAlpha(0).setDepth(10);
    this._dialogolabContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogolabContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogolabContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_destra").setDepth(2).setScale(4,3).setPosition(695,335).setOrigin(0.5);
  this._dialogolabContainer = this.add.container().setAlpha(0).setDepth(10);


  this._dialogolabContainer.add([
    this._dialogolabContainerBackground,
     this._dialogolabContainerText,
     this._dialogolabContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Cosa stai facendo?! ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(550,280),
     this.add.text(this.game.canvas.width / 2, 100, "Perche' sono chiuso qui dentro?!").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(540,310),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setDepth(15).setPosition(1010,470).setInteractive()
     .on("pointerdown", () => {
      this.closedialogolab(),
    this.opendialogolab2();
  }),])


  this._dialogolab2Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogolab2ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogolab2ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogolab2ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_sinistra").setDepth(2).setScale(4,3).setPosition(345,330).setOrigin(0.5);
  this._dialogolab2Container = this.add.container().setAlpha(0).setDepth(10);

  this._dialogolab2Container.add([
    this._dialogolab2ContainerBackground,
     this._dialogolab2ContainerText,
     this._dialogolab2ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Volevi tornare nel passato ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(200,280),
     this.add.text(this.game.canvas.width / 2, 100, "o sbaglio ragazzo?").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(200,310),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setPosition(1010,470).setDepth(15).setInteractive()
     .on("pointerdown", () => {
    this.closedialogolab2();
    this.opendialogolab3();
  }),])




  this._dialogolab3Container = this.add.container().setAlpha(0).setDepth(10);
    this._dialogolab3ContainerText = this.add.text(this.game.canvas.width / 2, 100, "").setTint(0xff0000).setOrigin(.5);
     this._dialogolab3ContainerBackground = this.add.image(0, 0, "").setOrigin(.0).setScale(.1).setPosition(450,0);
    this._dialogolab3ContainerBackground2=this.add.image(this.game.canvas.width / 2, 120, "dialogo_destra").setDepth(2).setScale(4,3).setPosition(695,335).setOrigin(0.5);
  this._dialogolab3Container = this.add.container().setAlpha(0).setDepth(10);

  this._dialogolab3Container.add([
    this._dialogolab3ContainerBackground,
     this._dialogolab3ContainerText,
     this._dialogolab3ContainerBackground2,
     this.add.text(this.game.canvas.width / 2, 100, "Quindi esiste davvero ").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(570,280),
     this.add.text(this.game.canvas.width / 2, 100, "una cosa del genere").setTint(0x00000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setDepth(10).setScale(1.2).setPosition(570,310),
     this.add.image(0, 0, "freccia").setOrigin(0.5).setScale(0.4).setDepth(15).setPosition(1010,470).setInteractive()
     .on("pointerdown", () => {
      this.closedialogolab3(),
    this.startGame();
  }),])

    this._dialogolab = this.add
    .bitmapText(this.game.canvas.width / 2, 400, "arcade", "inizia il dialogo")
    .setAlpha(1)
    .setOrigin(0.5)
    .setInteractive()
    .setDepth(100)
    .setScale(0.3)
    .setPosition(915,480)
    .setTint(0xffffff)
    .on("pointerup", () => {
      this._dialogolab.setAlpha(0)
      this._dialogolab.removeInteractive();
    })
    .on("pointerover", () => {
      this._dialogolab.setTint(0xffffff).setScale(0.4);
      this._music2= this.sound.add("_button", { loop: false, volume: 0.7 });
      this._music2.play();
    })
    .on("pointerout", () => { 
      this._dialogolab.setTint(0xffffff).setScale(0.3);
    })
    .on("pointerdown", this.opendialogolab, this);
}






opendialogolab() {
    this.tweens.add({
      targets: this._dialogolabContainer, alpha: 1, duration: 1000, onComplete: () => {
        this._dialogolabContainerBackground.setInteractive()
      }
    })}
  
  closedialogolab() {
      this.tweens.add({
        targets: this._dialogolabContainer, alpha: 0, duration: 1000, onComplete: () => {
          this._dialogolab.setInteractive();
        }
      })
    }

    opendialogolab2() {
      this.tweens.add({
        targets: this._dialogolab2Container, alpha: 1, duration: 1000, onComplete: () => {
          this._dialogolab2ContainerBackground.setInteractive()
        }
      })}
    
    closedialogolab2() {
        this.tweens.add({
          targets: this._dialogolab2Container, alpha: 0, duration: 1000, onComplete: () => {
            this._dialogolab.setInteractive();
          }
        })
      }


      opendialogolab3() {
        this.tweens.add({
          targets: this._dialogolab3Container, alpha: 1, duration: 1000, onComplete: () => {
            this._dialogolab3ContainerBackground.setInteractive()
          }
        })}
      
      closedialogolab3() {
          this.tweens.add({
            targets: this._dialogolab3Container, alpha: 0, duration: 1000, onComplete: () => {
              this._dialogolab.setInteractive();
            }
          })
        }
        startGame() {
            this.scene.stop("laboratorio");
            this.scene.start("FabioIacolare");
          
          }
        update(time: number, delta: number): void {

        }}