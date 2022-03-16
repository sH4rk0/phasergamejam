import Player from "../gameComponents/player/Player";
import Missile from "../gameComponents/missile/Missile";
import Enemy from "../gameComponents/enemy/Enemy";
import EnemyAsteroid from "../gameComponents/enemy/EnemyAsteroid";
import EnemyPlatform from "../gameComponents/enemy/EnemyPlatform";
import Bonus from "../gameComponents/bonus/Bonus";
import { GameData } from "../GameData";
import BonusCoin from "../gameComponents/bonus/BonusCoin";

export default class GamePlay extends Phaser.Scene {

  private _player: Player;
  private _bg: Phaser.GameObjects.TileSprite;
  private _parallax1: Phaser.GameObjects.TileSprite;
  private _parallax2: Phaser.GameObjects.TileSprite;
  private _parallax3: Phaser.GameObjects.TileSprite;
  private _missileGroup: Phaser.GameObjects.Group;
  private _enemyGroup: Phaser.GameObjects.Group;
  private _bonusGroup: Phaser.GameObjects.Group;
  private _level: number = 1;
  private _asteroidParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _robotParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.TilemapLayer;
  private layer2: Phaser.Tilemaps.TilemapLayer;
  private layer3: Phaser.Tilemaps.TilemapLayer;
  private layer4: Phaser.Tilemaps.TilemapLayer;
  private _levelValues: any;
  private _levelTitle: Phaser.GameObjects.BitmapText;



  constructor() {
    super({ key: "GamePlay" });
  }

  init(data: any) {

    //recuperiamo il valore levelcompleted e controlliamo che questo valore non sia nulla   
    if (data.level != null) {
      this._level = data.level;
      //recuperiamo dalle options eventuali valori del livello Esempio: titolo 
      this._levelValues = GameData.levelsOptions.levels[this._level];

    }

  }

  create() {



    this._asteroidParticle = this.add
      .particles("asteroid-emitter")
      .setDepth(101);
    this._asteroidParticle.createEmitter({
      frame: 0,
      angle: { min: 0, max: 360 },
      speed: { min: 10, max: 30 },
      quantity: { min: 6, max: 8 },
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 0.1, end: 0.4 },
      on: false
    });
    this._asteroidParticle.createEmitter({
      frame: [1, 2, 3, 4],
      angle: { min: 0, max: 360 },
      speed: { min: 30, max: 60 },
      quantity: { min: 6, max: 10 },
      lifespan: 3000,
      alpha: { start: 1, end: 0 },
      scale: 0.5,
      rotate: { start: 0, end: 360 },
      gravityY: 0,
      on: false
    });
    this._asteroidParticle.createEmitter({
      frame: 5,
      lifespan: 200,
      scale: { start: 2, end: 0 },
      rotate: { start: 0, end: 180 },
      alpha: { start: 0.8, end: 0 },
      on: false
    });


    this._robotParticle = this.add
      .particles("robo-emitter")
      .setDepth(101);
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
    this._robotParticle.createEmitter({
      frame: 5,
      lifespan: 200,
      scale: { start: 2, end: 0 },
      rotate: { start: 0, end: 180 },
      alpha: { start: 0.8, end: 0 },
      on: false
    });




    this._missileGroup = this.add.group({ runChildUpdate: true });
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._bonusGroup = this.add.group({ runChildUpdate: true });

    //updated code
    this._bg = this.add.tileSprite(0, 0, 1024, 600, "bg-0").setOrigin(0).setScrollFactor(0);
    this._parallax1 = this.add.tileSprite(0, 0, 1024, 600, "bg-1").setOrigin(0).setScrollFactor(0);
    this._parallax2 = this.add.tileSprite(0, 0, 1024, 600, "bg-2").setOrigin(0).setScrollFactor(0);
    this._parallax3 = this.add.tileSprite(0, 0, 1024, 600, "bg-3").setOrigin(0).setScrollFactor(0);

    //********/



    this._player = new Player({
      scene: this, x: this.game.canvas.width / 2, y:
        450, key: "robo"
    });



    this.createMap();
    this.setupEnemies();

    this.physics.add.collider(this._missileGroup, this._enemyGroup, this.hitEnemy, undefined, this);

    this.physics.add.collider(this._player, this._enemyGroup, this.hitPlayer, undefined, this);

    this.physics.add.collider(this._player, this._bonusGroup, this.hitBonus, undefined, this);

    this._levelTitle = this.add.bitmapText(this.game.canvas.width / 2, this.game.canvas.height / 2, "arcade", this._levelValues.title)
      .setOrigin(.5)
      .setScrollFactor(0).setAlpha(0)

    this.add.tween({ targets: this._levelTitle, alpha: 1, repeat: 1, yoyo: true, duration: 1000 });
  }



  createMap(): void {


    if (this.map != null) this.map.destroy();

    this.map = this.make.tilemap({ key: "level-" + this._level });

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.tileset = this.map.addTilesetImage("tilemap", "tiles");
    this.layer = this.map
      .createLayer("world-" + this._level, this.tileset, 0, 0)
      .setDepth(100)
      .setAlpha(1);

    this.layer2 = this.map
      .createLayer("collision-" + this._level, this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    this.layer2.setCollisionByProperty({
      collide: true,
    });

    this.layer3 = this.map
      .createLayer("enemyBlocks-" + this._level, this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    this.layer3.setCollisionByProperty({
      collide: true,
    });

    this.layer4 = this.map
      .createLayer("playerBlocks-" + this._level, this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(1);

    this.layer4.setCollisionByProperty({
      collide: true,
    });


    this.cameras.main.startFollow(
      this._player,
      true,
      1,
      0,
      0,
      0);

    this.physics.add.collider(
      this._player,
      this.layer2,
      () => { },
      undefined,
      this
    );

    this.physics.add.collider(
      this._enemyGroup,
      this.layer2,
      () => { },
      undefined,
      this
    );

    this.physics.add.collider(
      this._bonusGroup,
      this.layer2,
      () => { },
      undefined,
      this
    );

    this.physics.add.collider(
      this._enemyGroup,
      this.layer3,
      (enemy: any) => {
        let _enemy: Enemy = <Enemy>enemy;
        _enemy.changeDirection();

      },
      undefined,
      this
    );

    this.physics.add.collider(
      this._player,
      this.layer4,
      (_player: any, _tile: any) => {
        if (_tile.properties.kill == true) {
          this.events.emit("decrease-live");
          this._player.setPosition(this.game.canvas.width / 2, 450)

        } else if (_tile.properties.exit == true) {

          this.levelCompleted();

        }
        else if (_tile.properties.win == true) {

          this.gameCompleted();

        }
      },
      undefined,
      this
    );



  }


  setupEnemies(): void {

    //recuperiamo il layer object dalla mappa di TILED
    let _objLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("enemies");

    // controlliamo che _objLayer non sia null
    if (_objLayer != null) {

      // recuperiamo gli objects all'interno del layer
      let _enemies: any = _objLayer.objects as any[];

      // cicliamo l'array 
      _enemies.forEach((tile: Phaser.Tilemaps.Tile) => {

        //aggungiamo un nuovo nemico nella positione indicata dalla tile
        new EnemyPlatform({
          scene: this, x: tile.x, y: tile.y, key: "robo2"
        });

      });
    }


  }

  addMissile(missile: Missile) {
    this._missileGroup.add(missile);
  }

  removeMissile(missile: Missile) {
    this._missileGroup.remove(missile, true, true);
  }

  addEnemy(enemy: Enemy) {
    this._enemyGroup.add(enemy);
  }
  removeEnemy(enemy: Enemy) {
    this._enemyGroup.remove(enemy, true, true);
  }

  addBonus(bonus: Bonus) {
    this._bonusGroup.add(bonus);
  }
  removeBonus(bonus: Bonus) {
    this._bonusGroup.remove(bonus, true, true);
  }



  hitEnemy(missile: any, enemy: any) {

    if (enemy.name == "asteroid") {
      this._asteroidParticle.emitParticleAt(enemy.x, enemy.y);
    } else { this._robotParticle.emitParticleAt(enemy.x, enemy.y); }
    this.removeEnemy(enemy);
    this.removeMissile(missile);
    this.events.emit("update-score", [100]);
    this.playExplosion();
  }


  hitPlayer(player: any, enemy: any) {
    let _enemy: Enemy = <Enemy>enemy;
    let _player: Player = <Player>player;

    if (_enemy.name == "asteroid") {
      this._asteroidParticle.emitParticleAt(_enemy.x, _enemy.y);
      this.removeEnemy(_enemy);
      this.events.emit("decrease-live");
      this.playExplosion();

    } else if (_enemy.name == "robot") {

      if (_player.getBody().touching.down && _enemy.getBody().touching.up) {
        this._robotParticle.emitParticleAt(_enemy.x, _enemy.y);
        new BonusCoin({ scene: this, x: _enemy.x, y: _enemy.y, key: "bonus-coin" })
        this.removeEnemy(_enemy);
        this.playExplosion();

      } else {

        this._player.setPosition(this.game.canvas.width / 2, 450);
        this.events.emit("decrease-live");


      }


    }

  }

  hitBonus(_player: any, _bonus: any) {

    let __bonus: Bonus = <Bonus>_bonus;
    if (__bonus.isActive()) {
      __bonus.getBonus();

      this.events.emit("update-score", [50]);
      this.sound.playAudioSprite(
        "sfx",
        "nodamage",
        {
          loop: false,
          volume: 0.2,
        }
      );
    }
  }

  levelCompleted(): void {

    this.events.emit("level-completed", [this._level]);

  }

  gameCompleted(): void {

    this.events.emit("game-completed");

  }



  playExplosion() {
    this.sound.playAudioSprite(
      "sfx",
      "explosion",
      {
        loop: false,
        volume: 0.2,
      }
    );
  }

  update(time: number, delta: number) {

    // muoviamo la positione X delle tile in base alla posizione della camera moltiplicando per un fattore che ne rallenta il movimento
    // movimento lento
    this._parallax1.tilePositionX = this.cameras.main.scrollX * .25;
    // movimento medio
    this._parallax2.tilePositionX = this.cameras.main.scrollX * .5;
    // movimento veloce = a quello della camera
    this._parallax3.tilePositionX = this.cameras.main.scrollX;

    //richiamiamo in modo programmatico l'update del player
    this._player.update(time, delta);

  }

}
