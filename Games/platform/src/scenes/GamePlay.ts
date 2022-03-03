import Player from "../gameComponents/player/Player";
import Missile from "../gameComponents/missile/Missile";
import Enemy from "../gameComponents/enemy/Enemy";
import EnemyAsteroid from "../gameComponents/enemy/EnemyAsteroid";
import EnemyPlatform from "../gameComponents/enemy/EnemyPlatform";

export default class GamePlay extends Phaser.Scene {

  private _player: Player;
  private _bg: Phaser.GameObjects.TileSprite;
  private _missileGroup: Phaser.GameObjects.Group;
  private _enemyGroup: Phaser.GameObjects.Group;
  private _level: number = 1;
  private _asteroidParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _robotParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;


  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.TilemapLayer;
  private layer2: Phaser.Tilemaps.TilemapLayer;
  private layer3: Phaser.Tilemaps.TilemapLayer;



  constructor() {
    super({ key: "GamePlay" });
  }

  create() {

    this._level = 1;
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


    let particles = this.add.particles('flares').setDepth(1);
    particles.createEmitter({
      frame: 'white',
      x: 1024,
      y: { min: 0, max: 600 },
      lifespan: 10000,
      speedX: { min: -400, max: -500 },
      scale: 0.1,
      alpha: .3,
      quantity: 1
    }).setScrollFactor(0);

    this._missileGroup = this.add.group({ runChildUpdate: true });
    this._enemyGroup = this.add.group({ runChildUpdate: true });

    //updated code
    this._bg = this.add.tileSprite(0, 0, 1024, 600, "bg").setOrigin(0).setScrollFactor(0);
    //********/



    this._player = new Player({
      scene: this, x: this.game.canvas.width / 2, y:
        450, key: "robo"
    });

    new EnemyPlatform({
      scene: this, x: this.game.canvas.width / 2 + 100, y: 100, key: "robo2"
    });

    new EnemyPlatform({
      scene: this, x: this.game.canvas.width / 2 + 650, y: 100, key: "robo2"
    });


    //this.nextLevel();


    //new code
    this.createMap();
    //********/

    this.physics.add.collider(this._missileGroup, this._enemyGroup,
      this.hitEnemy, undefined, this);

    this.physics.add.collider(this._player, this._enemyGroup, this.hitPlayer,
      undefined, this);

  }



  createMap(): void {

    if (this.map != null) this.map.destroy();

    this.map = this.make.tilemap({ key: "level-0" });

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
      .createLayer("world-0", this.tileset, 0, 0)
      .setDepth(100)
      .setAlpha(1);

    this.layer2 = this.map
      .createLayer("collision-0", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    this.layer3 = this.map
      .createLayer("enemyBlocks-0", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    this.layer2.setCollisionByProperty({
      collide: true,
    });

    this.layer3.setCollisionByProperty({
      collide: true,
    });

    this.cameras.main.startFollow(
      this._player,
      true,
      0.5,
      0,
      0,
      0);

    this.physics.add.collider(
      this._player,
      this.layer2,
      (_player: any, _tile: any) => {
        if (_tile.properties.kill == true) {
          this.events.emit("decrease-live");
          this._player.setPosition(this.game.canvas.width / 2, 450)

        }
      },
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
      this._enemyGroup,
      this.layer3,
      (enemy: any) => {
        let _enemy: Enemy = <Enemy>enemy;
        _enemy.changeDirection();

      },
      undefined,
      this
    );



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

  nextLevel() {
    this._level++;
    for (let e = 0; e < this._level; e++) {
      new EnemyAsteroid({
        scene: this, x: Phaser.Math.RND.integerInRange(100,
          this.game.canvas.width - 100), y: 100, key: "asteroid-" +
            Phaser.Math.RND.integerInRange(0, 3)
      });
    }
  }

  hitEnemy(missile: any, enemy: any) {

    if (enemy.name == "asteroid") {
      this._asteroidParticle.emitParticleAt(enemy.x, enemy.y);
    } else { this._robotParticle.emitParticleAt(enemy.x, enemy.y); }
    this.removeEnemy(enemy);
    this.removeMissile(missile);
    this.events.emit("update-score", [100]);
    this.checkLevel();
    this.playExplosion();
  }

  hitPlayer(player: any, enemy: any) {
    let _enemy: Enemy = <Enemy>enemy;
    let _player: Player = <Player>player;

    if (_enemy.name == "asteroid") {
      this._asteroidParticle.emitParticleAt(_enemy.x, _enemy.y);
      this.removeEnemy(_enemy);
      this.events.emit("decrease-live");
      this.checkLevel();
      this.playExplosion();

    } else if (_enemy.name == "robot") {

      if (_player.getBody().touching.down && _enemy.getBody().touching.up) {
        this._robotParticle.emitParticleAt(_enemy.x, _enemy.y);
        this.removeEnemy(_enemy);
        this.checkLevel();
        this.playExplosion();

      } else {

        this._player.setPosition(this.game.canvas.width / 2, 450);
        this.events.emit("decrease-live");


      }


    }

  }

  checkLevel() {
    if (this._enemyGroup.countActive() == 0) {
      this.nextLevel();
    }
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

    this._bg.tilePositionX = this.cameras.main.scrollX * .5;
    this._player.update(time, delta);
  }

}
