import Player from "../gameComponents/player/Player";
import Weapon from "../gameComponents/weapon/Weapon";
import Enemy from "../gameComponents/enemy/Enemy";
import EnemyRobot from "../gameComponents/enemy/EnemyRobot";
import Bonus from "../gameComponents/bonus/Bonus";
import { GameData } from "../GameData";
import BonusCoin from "../gameComponents/bonus/BonusCoin";
import BonusHeart from "../gameComponents/bonus/BonusHeart";
import BonusKey from "../gameComponents/bonus/BonusKey";


enum EnemySpawnSide {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT
}

export default class GamePlay extends Phaser.Scene {

  //creo tutte le variabile che utilizzerò nel gamplay
  //questa conterrà l'istanza della classe player
  private _player: Player;

  //i gruppi che ospiteranno i diversi tipi di gameobjects
  private _enemyGroup: Phaser.GameObjects.Group;
  private _bonusGroup: Phaser.GameObjects.Group;
  private _weaponGroup: Phaser.GameObjects.Group;

  //questa variabile contiene l'indice del livello corrente
  private _level: number = 0;

  //i due emitter manager per la gestione delle esplosioni (asteroide e nemico)
  private _asteroidParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _robotParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _playerParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;

  //i game objects relativi alla mappa di tile gestita con TILED
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  //in layer viene istanziato il livello di tile visibili
  private layer: Phaser.Tilemaps.TilemapLayer;
  //in layer 2 il livello per la gestione delle collisioni pavimento e piattaforme
  private layer2: Phaser.Tilemaps.TilemapLayer;


  //in questa variabile memorizzo le opzioni del livello
  private _levelValues: any;
  //game object bitmaptext per la scritta del livello
  private _levelTitle: Phaser.GameObjects.BitmapText;

  //variabile per stabilire se la chiave è stata presa o meno
  private _haveKey: boolean = false;
  //variabile per stabilire se la chiave è rilasciata come bonus
  private _keySpawned: boolean = false;

  constructor() {
    // richiamiamo l'istanza padre passandogli il nome della scena
    // tutte le scene che noi creiamo ereditano ed estendono la classe Phaser.Scene
    super({ key: "GamePlay" });
  }

  //questo metodo viene richiamato in automatico quando viene creata una scena e viene chiamato prima del CREATE
  // i metodi richiamati in automatico in una scena sono INIT, PRELOAD, CREATE, UPDATE
  // non devono essere per forza presenti tutti
  init(data: any) {

    //recuperiamo il valore levelcompleted e controlliamo che questo valore non sia nulla   
    if (data.level != null) {
      this._level = data.level;
    } else {
      //se è null settiamo il livello = 0 (primo livello)
      this._level = 0;
    }
    //recuperiamo dalle options eventuali valori del livello Esempio: titolo 
    this._levelValues = GameData.levelsOptions.levels[this._level];

  }

  //questo metodo viene richiamato in automatico quando viene creata una scena
  create() {

    //la chiave non è stata presa
    this._haveKey = false;
    //la chiave non è stata rilasciata
    this._keySpawned = false;


    //creo il particle emitter manager per l'esplosione del robot nemico usando la texture "robo-emitter"
    this._robotParticle = this.add
      .particles("robo-emitter")
      .setDepth(101);

    //creo tre diversi emitter
    this._robotParticle.createEmitter({
      frame: 0,
      angle: { min: 0, max: 360 },
      speed: { min: 10, max: 30 },
      quantity: { min: 6, max: 8 },
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 0.1, end: 0.4 },
      on: false
    });

    this._robotParticle.createEmitter({
      frame: [1, 2],
      angle: 180,
      speed: { min: -200, max: -300 },
      quantity: 2,
      lifespan: 3000,
      alpha: { start: 1, end: 0 },
      scale: { start: 1, end: 1.5 },
      rotate: { start: 0, end: 360 },
      gravityY: 800,
      on: false
    });

    this._robotParticle.createEmitter({
      frame: 5,
      lifespan: 200,
      scale: { start: 2, end: 0 },
      rotate: { start: 0, end: 180 },
      alpha: { start: 0.8, end: 0 },
      on: false
    });

    //creo il particle emitter manager per l'esplosione del robot nemico usando la texture "robo-emitter"
    this._playerParticle = this.add
      .particles("robo-emitter")
      .setDepth(101);

    //creo tre diversi emitter nella stessa modalità dell'esplosione dell'asteroide
    this._playerParticle.createEmitter({
      frame: 0,
      angle: { min: 0, max: 360 },
      speed: { min: 10, max: 30 },
      quantity: { min: 6, max: 8 },
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 0.1, end: 0.4 },
      on: false
    });

    this._playerParticle.createEmitter({
      frame: [3, 4],
      angle: { min: 0, max: 360 },
      speed: { min: -200, max: -300 },
      quantity: 2,
      lifespan: 3000,
      alpha: { start: 1, end: 0 },
      scale: { start: 1, end: 1.5 },
      rotate: { start: 0, end: 360 },
      gravityY: 800,
      on: false
    });

    this._playerParticle.createEmitter({
      frame: 5,
      lifespan: 200,
      scale: { start: 2, end: 0 },
      rotate: { start: 0, end: 180 },
      alpha: { start: 0.8, end: 0 },
      on: false
    });


    //creo le tre istanze dei gruppi che opsiteranno i diversi game objects (missile/enemy/bonus)
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._bonusGroup = this.add.group({ runChildUpdate: true });
    this._weaponGroup = this.add.group({ runChildUpdate: true, maxSize: 100 });

    //creo l'istanza del player posizionandolo in un punto arbitrario della mappa
    this._player = new Player({
      scene: this, x: 64, y:
        450, key: "robo"
    });



    //richiamo il metodo createMap che gestisce la visualizzazione della mappa
    this.createMap();
    //creo i vari gameobjects prelevandoli dal layer di tiled
    this.setupObjects();

    //creo un collider tra il gruppo _missileGroup e _enemyGroup.
    //quando avviene una collisione tra i due gruppi viene eseguito il codice della funzione di callback hitEnemy
    this.physics.add.collider(this._weaponGroup, this._enemyGroup, this.hitEnemy, undefined, this);

    //creo un collider tra il _player e _enemyGroup.
    //quando avviene una collisione viene eseguito il codice della funzione di callback hitPlayer
    // this.physics.add.collider(this._player, this._enemyGroup, this.hitPlayer, undefined, this);

    //creo un collider tra il _player e _bonusGroup.
    //quando avviene una collisione viene eseguito il codice della funzione di callback hitBonus
    this.physics.add.collider(this._player, this._bonusGroup, this.hitBonus, undefined, this);

    //creo un istanza di gameobject di tipo bitmaptext
    //la posiziono al centro, con scrollfactor=0 e alpha = 0
    this._levelTitle = this.add.bitmapText(this.game.canvas.width / 2, this.game.canvas.height / 2, "arcade", this._levelValues.title)
      .setOrigin(.5)
      .setScrollFactor(0).setAlpha(0).setDepth(1000);



    //creo un tween this._levelTitle che si ripete una volta con dissolvenza e della durata di 1000ms
    this.add.tween({
      targets: this._levelTitle, alpha: 1, repeat: 1, yoyo: true, duration: 1000, onComplete: () => {

        this.time.addEvent({
          delay: 500, loop: true, callback: () => {
            //this.spawnEnemy()
          }, callbackScope: this
        });
        this._player.activateWeapons();
      }
    });
  }


  //metodo createMap
  //questo metodo crea la mappa partendo dal file .json e dal tileset
  createMap(): void {

    //se un istanza di map è già attiva la distruggo
    if (this.map != null) this.map.destroy();

    //creo la tilemap usando come chiave "level-" + this._level che è il livello che viene passato alla scena nell'init.
    this.map = this.make.tilemap({ key: "level-0" });

    //definisco i bounds della camera
    //sono posizionati a x:0,y:0 e come larghezza e altezza corrispondono all'altezza e larghezza della mappa
    this.cameras.main.setBounds(
      0, //x
      0, //y
      this.map.widthInPixels, //width
      this.map.heightInPixels //height
    );

    //definisco i bounds della fisica
    //sono posizionati a x:0,y:0 e come larghezza e altezza corrispondono all'altezza e larghezza della mappa
    this.physics.world.setBounds(
      0, //x
      0, //y
      this.map.widthInPixels, //width
      this.map.heightInPixels //height
    );

    //creo il tileset che sarà utilizzato nei singoli layer come texture per le tile
    this.tileset = this.map.addTilesetImage("tilemap-extruded");

    //creo il primo layer che ospiterà le tile del pavimento e delle piattaforme
    //questo layer è solamente visuale e non c'è interazione con nessun game object
    this.layer = this.map
      .createLayer("world", this.tileset, 0, 0)
      .setDepth(9)
      .setAlpha(1);

    //il secondo layer contiene invece le tile con il collide:true per cui i game object potranno interagire con esso
    //questo layer viene settato con alpha a zero
    this.layer2 = this.map
      .createLayer("collision", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(1);

    //definisco che tutte le TILE di questo layer con la property collide devono aver collisione con i gameobject
    this.layer2.setCollisionByProperty({
      collide: true,
    });


    //definisco che la camera deve seguire il player
    this.cameras.main.startFollow(
      this._player,
      true,
      1,
      1,
      0,
      0);



    //creo un collider tra PLAYER e Layer2
    //senza di questo la collisione non verrebbe eseguita
    this.physics.add.collider(
      this._player,
      this.layer2,
      (_player: any, _tile: any) => {
        //qui è possibile eseguire del codice specifico per verificare la collisione tra il gameObject ed una specifica tile
        // ad esempio la tile oltre alla proprietà collide=true potrebbe avere una proprietà exit=true perché è la tile che ci permette di passare al livello successivo
        if (_tile.properties.exit == true) {
          // eseguo del codice specifico o richiamo un metodo						
          console.log("level completed");
        }

      },
      undefined,
      this
    );

    //creo un collider tra il gruppo _enemyGroup e Layer2
    //senza di questo la collisione non verrebbe eseguita
    this.physics.add.collider(
      this._enemyGroup,
      this.layer2,
      () => {
        //qui è possibile eseguire del codice specifico
      },
      undefined,
      this
    );











  }


  spawnEnemy() {


    switch (Phaser.Math.RND.integerInRange(0, 3)) {

      case EnemySpawnSide.TOP:
        new EnemyRobot({ scene: this, x: this.cameras.main.worldView.centerX, y: this.cameras.main.worldView.top, key: "robo2" })
        break;

      case EnemySpawnSide.BOTTOM:
        new EnemyRobot({ scene: this, x: this.cameras.main.worldView.centerX, y: this.cameras.main.worldView.bottom, key: "robo2" })
        break;

      case EnemySpawnSide.LEFT:
        new EnemyRobot({ scene: this, x: this.cameras.main.worldView.left, y: this.cameras.main.worldView.centerY, key: "robo2" })
        break;

      case EnemySpawnSide.RIGHT:
        new EnemyRobot({ scene: this, x: this.cameras.main.worldView.right, y: this.cameras.main.worldView.centerY, key: "robo2" })
        break;

    }

  }



  setupObjects(): void {

    //recuperiamo il layer object dalla mappa di TILED
    let _objLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("gameObjects");

    // controlliamo che _objLayer non sia null
    if (_objLayer != null) {
      // recuperiamo gli objects all'interno del layer
      let _objects: any = _objLayer.objects as any[];
      // cicliamo l'array 
      _objects.forEach((tile: Phaser.Tilemaps.Tile) => {

        //convertiamo la property in un oggetto al quale possiamo accedere
        var _objectValue = JSON.parse(tile.properties[0].value).type;

        switch (_objectValue) {
          case "bonus":

            this.addBonus(new BonusCoin({
              scene: this, x: tile.x, y: tile.y, key: "bonus-coin"
            }));
            break;
        }



      });
    }

  }



  addWeapon(weapon: Weapon) {
    this._weaponGroup.add(weapon)
  }
  //rimuove un missile dal gruppo _missileGroup

  removeWeapon(weapon: Weapon) {
    this._weaponGroup.remove(weapon, true, true);
  }

  getEnemyGroup(): Phaser.GameObjects.Group {
    return this._enemyGroup;
  }

  getClosestEnemy(): any {
    return this.physics.closest(
      this._player,
      this._enemyGroup.getChildren()
    );
  }

  getPlayer(): Player {
    return this._player;
  }


  //aggiunge un ENEMY al gruppo _enemyGroup
  addEnemy(enemy: Enemy) {
    this._enemyGroup.add(enemy);
  }

  //rimuove un ENEMY dal gruppo _enemyGroup
  removeEnemy(enemy: Enemy) {
    this._enemyGroup.remove(enemy, true, true);
  }

  //aggiunge un BONUS al gruppo _bonusGroup
  addBonus(bonus: Bonus) {
    this._bonusGroup.add(bonus);
  }

  //rimuove un BONUS dal gruppo _bonusGroup
  removeBonus(bonus: Bonus) {
    this._bonusGroup.remove(bonus, true, true);
  }


  //questo metodo viene richiamato quando un missile sparato dal PLAYER collide con un ENEMY
  hitEnemy(weapon: any, enemy: any) {

    //effettuiamo una conversione dal tipo any al tipo corretto
    const _weapon: Weapon = <Weapon>weapon;
    const _enemy: Enemy = <Enemy>enemy;

    //se l'enemy ha il name == asteroid 
    if (_enemy.name == "asteroid") {
      //emette una particella dal manager _asteroidParticle nella posizione dell'ENEMY
      this._asteroidParticle.emitParticleAt(_enemy.x, _enemy.y);
    } else {
      //emette una particella dal manager _robotParticle nella posizione dell'ENEMY
      this._robotParticle.emitParticleAt(_enemy.x, _enemy.y);
    }

    //rimuove ENEMY dal gruppo _enemyGroup
    this.removeEnemy(_enemy);
    //rimuove MISSILE dal gruppo _missileGroup
    this.removeWeapon(_weapon);
    //emetto l'evento "update-score" che verrà captato dalla scena HUD ed incrementerà lo score
    this.events.emit("update-score", [100]);
    //questo metodo generico riproduce il suono dell'esplosione
    this.playExplosion();

  }

  //questo metodo viene richiamato quando il PLAYER collide con un ENEMY
  hitPlayer(player: any, enemy: any) {

    //effettuiamo una conversione dal tipo any al tipo corretto
    const _enemy: Enemy = <Enemy>enemy;
    const _player: Player = <Player>player;

    //se l'ENEMY è di tipo asteroid
    if (_enemy.name == "asteroid") {
      //emettiamo la particella di esplosione dell'asteroid
      this._asteroidParticle.emitParticleAt(_enemy.x, _enemy.y);
      //rimuoviamo l'ENEMY dal gruppo _enemyGroup
      this.removeEnemy(_enemy);
      //emettiamo l'evento "decrease-live" che verrà intercettato dal listener nella HUD
      this.events.emit("decrease-live");
      //riproduciamo il suono dell'esplosione
      this.playExplosion();

    }
    // se l'ENEMY è di tipo robot
    else if (_enemy.name == "robot") {

      //controlliamo il tipo di collisione tra PLAYER e ENEMY
      //se il margine inferiore del PLAYER collide con il margine superiore dell'ENEMY 
      if (_player.getBody().touching.down && _enemy.getBody().touching.up) {
        //emettiamo la particella per la distruzione dell'ENEMY
        this._robotParticle.emitParticleAt(_enemy.x, _enemy.y);
        //rimuoviamo l'ENEMY dal gruppo _enemyGroup
        this.removeEnemy(_enemy);
        //riproduciamo il suono dell'esplosione
        this.playExplosion();
        // richiamo il metodo per la creazione del bonus
        this.bonusLogic(_enemy.x, _enemy.y)

      }
      //se il PLAYER collide in altro modo dal precedente
      else {
        //richiamiamo la funzione per la morte del player
        this.playerDeath()
        //riproduciamo il suono dell'esplosione
        this.playExplosion();
        //emettiamo l'evento "decrease-live" che verrà intercettato dal listener nella HUD
        this.events.emit("decrease-live");
      }

    }

  }

  playerDeath() {

    this.cameras.main.stopFollow();
    this._player.death();
    this._playerParticle.emitParticleAt(this._player.x, this._player.y);

    this.time.addEvent({
      delay: 1000, callback: () => {
        this._player.relive();
        this.cameras.main.startFollow(
          this._player,
          true,
          1,
          0,
          0,
          0);
      }
    });

  }

  //metodo per la gestione della logica di rilascio dei bonus
  bonusLogic(x: number, y: number) {

    // produco un valore random tra 0 e 100
    const _rnd: number = Phaser.Math.RND.integerInRange(0, 100);

    //controllo se il numero di nemici è maggiore di zero
    if (this._enemyGroup.countActive() > 0) {

      // se il valore è minore di 65 creo un bonus di tipo coin
      if (_rnd < 65) {
        //creo un bonus di tipo coin
        new BonusCoin({ scene: this, x: x, y: y, key: "bonus-coin" });

      }
      // se il valore è tra 65 e 95 e non ho la chiave genero un bonus di tipo chiave
      else if (_rnd >= 65 && _rnd < 95 && !this._haveKey && !this._keySpawned) {
        //creo un bonus di tipo chiave
        new BonusKey({ scene: this, x: x, y: y, key: "bonus-key" });
        this._keySpawned = true;

      }
      // se il valore è tra 65 e 95 e ho la chiave genero un bonus di tipo chiave
      else if (_rnd >= 65 && _rnd < 95 && this._keySpawned) {
        //creo un bonus di tipo chiave
        new BonusCoin({ scene: this, x: x, y: y, key: "bonus-coin" });

      }
      // se il valore è maggiore di 95 genero un bonus di tipo heart
      else if (_rnd >= 95) {
        //creo un bonus di tipo cuore
        new BonusHeart({ scene: this, x: x, y: y, key: "bonus-heart" });
      }
      //se nessuna delle precedenti opzioni è valida genero un bonus di tipo coin
      else {
        //creo un bonus di tipo coin
        new BonusCoin({ scene: this, x: x, y: y, key: "bonus-coin" });

      }

    }
    //se il numero di nemici è uguale a zero, quindi ho eliminato l'ultimo nemico, e la chiave ancora non è stata presa, genero in maniera forzata il bonus di titpo chiave   
    else if (this._enemyGroup.countActive() == 0 && !this._keySpawned && !this._haveKey) {
      //creo un bonus di tipo chiave
      new BonusKey({ scene: this, x: x, y: y, key: "bonus-key" });

    }
    //se nessuna delle precedenti opzioni è valida genero un bonus di tipo coin
    else {
      //creo un bonus di tipo coin
      new BonusCoin({ scene: this, x: x, y: y, key: "bonus-coin" });

    }

  }


  //metodo richiamato quando il PLAYER collide con un BONUS
  hitBonus(player: any, bonus: any) {

    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Bonus = <Bonus>bonus;

    //se il BONUS è attivo per essere collezionato

    //viene esguito il metodo getBonus
    _bonus.getBonus();

    //se il bonus è di tipo COIN
    if (_bonus.name == "coin") {

      //emettiamo l'evento "update-score" che verrà intercettato dal listener nella HUD
      this.events.emit("update-score", [50]);
      //riproduciamo un suono
      this.sound.playAudioSprite("sfx", "coin", { loop: false, volume: 0.2, });
    }
    //se il bonus è di tipo KEY
    else if (_bonus.name == "key") {
      //settiamo la variabile a true così da sapere se una chiave è già stata presa
      this._haveKey = true;
      //riproduciamo un suono
      this.sound.playAudioSprite("sfx", "key", { loop: false, volume: 0.2, });

    }
    //se il bonus è di tipo HEART
    else if (_bonus.name == "heart") {
      //emettiamo l'evento "increase-live" che verrà intercettato dal listener nella HUD
      this.events.emit("increase-live");
      //riproduciamo un suono
      this.sound.playAudioSprite("sfx", "heart", { loop: false, volume: 0.2, });


    }




  }

  //metodo che viene richiamato quando il livello è completato
  levelCompleted(): void {
    //emettiamo l'evento "level-completed" che verrà intercettato dal listener nella HUD
    this.events.emit("level-completed", [this._level]);

  }

  //metodo che viene richiamato quando il gioco è completato
  gameCompleted(): void {
    //emettiamo l'evento "game-completed" che verrà intercettato dal listener nella HUD
    this.events.emit("game-completed");

  }

  //metodo che riproduce il suono dell'esplosione
  playExplosion() {
    this.sound.playAudioSprite(
      "sfx",
      "explosion",
      {
        loop: false,
        volume: 0.05,
      }
    );
  }

  //questo metodo viene richiamato in automatico ogni sessantesimo di secondo
  update(time: number, delta: number) {



    //richiamiamo in modo programmatico l'update del player
    this._player.update(time, delta);

  }

}
