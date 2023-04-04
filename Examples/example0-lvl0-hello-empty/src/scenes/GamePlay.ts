
export default class GamePlay extends Phaser.Scene {
  private _illustrazione: Phaser.GameObjects.Text;
  private _cliccare: Phaser.GameObjects.Text;
  private _frase1: Phaser.GameObjects.Text;
  private _frase2:Phaser.GameObjects.Text;
  private _frase3:Phaser.GameObjects.Text;
  private _frase4:Phaser.GameObjects.Text;
  private _frase5:Phaser.GameObjects.Text;
  private _frase6:Phaser.GameObjects.Text;
  private _frase7:Phaser.GameObjects.Text;
  private _frase8:Phaser.GameObjects.Text;
  private _frase9:Phaser.GameObjects.Text;
  private _fine: Phaser.GameObjects.Text;
  private _gruop1: Phaser.GameObjects.Group;
  
  
  
  
  
    constructor() {    
      super({ key: "GamePlay" });
      
    }
  
  
    create() {



      this.cameras.main.setBackgroundColor(0x0000);
      this._illustrazione= this.add.text(this.game.canvas.width / 2, 100, "Introduzione:").setTint(0xff0000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(430,130);
      this._cliccare= this.add.text(this.game.canvas.width / 2, 100, "clicca per continuare a leggere." ).setTint(0xff0000).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setScale(1.4).setPosition(700,500).setInteractive().on("pointerdown", () => {
       this._frase1=this.add.text(this.game.canvas.width / 2, 100, "SAVE US è un gioco che tratta di una guerra avvenuta tra due nazioni, (Clover, Diamond).")
             .setTint(0xffffff)
             .setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif')
             .setScale(1.2)
             .setPosition(130,185)
             this._cliccare.setText("Continua").setPosition(800,500).setInteractive().on("pointerdown", () => { 
              this._frase2=this.add.text(this.game.canvas.width / 2, 100, "La Nazione Diamond sovrasta completamente la Nazione Clover sterminandone tutti gli abitanti e soldati,")
              .setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif')
              .setTint(0xffffff)
              .setScale(1.2)
              .setPosition(55,215);
              this._cliccare.setText("Continua ")
              .setPosition(800,500) 
              .setInteractive()
              .on("pointerdown", () => {
                this._frase3=this.add.text(this.game.canvas.width / 2, 100, "di questa Nazione però sopravvive un solo soldato fuggito dalla guerra per paura,")
                .setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif')
                .setTint(0xffffff)
                .setScale(1.2)
                .setPosition(160,245);
                this._cliccare
               .setInteractive()
               .on("pointerdown", () => {
                this._frase4=this.add.text(this.game.canvas.width / 2, 100, "costui dopo aver saputo della guerra persa")
                .setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif')
                .setTint(0xffffff)
                .setScale(1.2)
                .setPosition(295,275);
                this._frase5=this.add.text(this.game.canvas.width / 2, 100, "si sente in colpa per non aver aiutato la Nazione e decide di dirigersi a nord.")
                .setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif')
                .setTint(0xffffff)
                .setScale(1.2)
                .setPosition(180,305)
                this._cliccare.setInteractive()
                .setPosition(800,500)
                .on("pointerdown", () => {
                  this._frase6=this.add.text(this.game.canvas.width / 2, 100, "L'ex-soldato riuscì a trovare un paese ospitale dove trascorrere le notti,")
                  .setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif')
                  .setTint(0xffffff)
                  .setScale(1.2)
                  .setPosition(205,335)
                  this._cliccare
                  .setInteractive()
                  .setPosition(800,500)
                  .on("pointerdown", () => {
                    this._frase9=this.add.text(this.game.canvas.width / 2, 100, "ma ad un certo punto…").setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif')
                    .setTint(0xffffff)
                    .setScale(1.2)
                    .setPosition(410,365)
                    this._cliccare.setText("premi per andare avanti")
                    .setPosition(700,500)
                    .setInteractive()
                    .on("pointerdown", () => {
                      this.startGame();
                    })
                  })
                })
              })
              })
            }) 
            })
            
           

            //a
          
        }
          
     
  
    

  
      
     
        startGame() {
          this.scene.stop("GamePlay");
          this.scene.start("scienziato");
        }
      
      update(time: number, delta: number): void {
     
        }
  
        }
        
        
      
  
   

  