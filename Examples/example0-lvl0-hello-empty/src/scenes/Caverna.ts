import Main from "../components/Player/Main";
import Player from "../components/Player/Main";
import Nemico from "../components/Nemico/Nemico";
export default class Caverna extends Phaser.Scene {

    private _sfondo:Phaser.GameObjects.Image;
    private _vita: Phaser.GameObjects.Image;
  private _tre: Phaser.GameObjects.Text;
  private _tre2: number=3;
  private _colpi:Phaser.GameObjects.Image;
  private _colpi2:Phaser.GameObjects.Image;
  private _ncolpi:Phaser.GameObjects.Text;
  private _ncolpi2: number=12;
  private _player: Main;
  private L: Phaser.GameObjects.Image;
    private _bg: Phaser.GameObjects.TileSprite;
    private _P: Phaser.Physics.Arcade.Sprite;
    private GruppoPavimento: Phaser.GameObjects.Group;
    private strada: Phaser.GameObjects.TileSprite;
    private _enemyGroup: Phaser.GameObjects.Group;

    private Sparata: Phaser.Physics.Arcade.Group

    private mappa: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private layer1: Phaser.Tilemaps.TilemapLayer;
    private Level: number=0;
 
    private _proiettileGroup: Phaser.GameObjects.Group

    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    
    preload() {
        // Caricamento della mappa Tiled
        this.load.tilemapTiledJSON('mappa', 'assets/mappa.json');
    
        // Caricamento delle immagini
        this.load.image('tiles', 'assets/tiles.png');
      }

    constructor() {
        super({ key: "Caverna" });
        

        
      } 
    create(){
    this.createMap();  
 //this._vita= this.add.image(this.game.canvas.width/ 2,100, "cuore").setPosition(980,40).setScale(.1).setAlpha(1).setScrollFactor(0);
 //this._tre= this.add.text(this.game.canvas.width/ 2,100, "3").setPosition(977,25).setScale(1).setAlpha(1).setScrollFactor(0).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setTint(0x000000),
//this._colpi= this.add.image(this.game.canvas.width /2,100, "proiettil").setPosition(450,250).setScale(.1).setAlpha(1).setScrollFactor(0);

        this.cameras.main.setBackgroundColor(0x000000);
        this._sfondo=this.add.image(this.game.canvas.width/ 2,100, "livcaverna").setAlpha(1).setPosition(450,250)
        this._vita=this.add.image(this.game.canvas.width/2,100, "cuori").setPosition(930,40).setAlpha(1).setScrollFactor(0).setScale(.1)
        this._colpi=this.add.image(this.game.canvas.width/ 2,100, "proiettili_pieni").setPosition(870,30).setScrollFactor(0).setScale(.35)
        this._colpi2=this.add.image(this.game.canvas.width/ 2,100, "proiettili_vuoti").setPosition(870,30).setScrollFactor(0).setScale(.35).setAlpha(0)
        this._ncolpi=this.add.text(this.game.canvas.width/ 2,100, ""+ this._ncolpi2).setFontFamily('Georgia,"Goudy Booletter 1911",Times,serif').setTint(0xffffff).setPosition(820,20);
        
        


        /*this.Sparata = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize: 24
          })
          this._player = new Player({
            scene: this, x: 60, y:
              450, key: "Main"     
          });  
          this._player.setProie(this.Sparata)
            this.setupEnemies();*/
              }
              createMap(): void {

                /*this._bg = this.add.tileSprite(0, 0, 1024, 600, "bg").setOrigin(0).setScrollFactor(0);
                this.map = this.make.tilemap({ key: "Map"});
                this.tileset = this.map.addTilesetImage("blocchi_caverna", "Cav");
                this.layer = this.map
                  .createLayer("Pavimento", this.tileset, 0, 50)
                  .setDepth(100)
                  .setAlpha(1);
                  this.layer1 = this.map
                  .createLayer("Collisioni", this.tileset, 0, 50)
                  .setDepth(0)
                  .setAlpha(0);
                  this.layer1.setCollisionByProperty({ collide: true });*/
                  
                  };

          colpidecrease(){
        
             
          }

                  update(time: number, delta: number): void {
                  }
    }
    

    
