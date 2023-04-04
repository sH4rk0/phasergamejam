import Player from "../gameComponents/player/Player";
import Missile from "../gameComponents/missile/Missile";
import Enemy from "../gameComponents/enemy/Enemy";


export default class GamePlay extends Phaser.Scene {

  private _player: Player;
  private _bg: Phaser.GameObjects.TileSprite;
  private _missileGroup: Phaser.GameObjects.Group;
  private _enemyGroup: Phaser.GameObjects.Group;
  private _level: number = 1;
  private _asteroidParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;


  constructor() {
    super({ key: "GamePlay" });
  }

  create() {

    this._level = 1;
    this._asteroidParticle = this.add
      .particles("asteroid-emitter")
      .setDepth(30);
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
    let particles = this.add.particles('flares').setDepth(1);

    particles.createEmitter({
      frame: 'white',
      y: 0,
      x: { min: 0, max: 1024 },
      lifespan: 10000,
      speedY: { min: 400, max: 500 },
      scale: { start: 0.1, end: 0.1 },
      alpha: .3,
      quantity: 1
    });


    this._missileGroup = this.add.group({ runChildUpdate: true });
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._bg = this.add.tileSprite(0, 0, 1024, 600, "bg").setOrigin(0)
    this._player = new Player({
      scene: this, x: this.game.canvas.width / 2, y:
        550, key: "spaceship"
    });
    this.nextLevel();
    this.physics.add.collider(this._missileGroup, this._enemyGroup,
      this.hitEnemy, undefined, this);
    this.physics.add.collider(this._player, this._enemyGroup, this.hitPlayer,
      undefined, this);



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
    //quando rimuovo il nemico controllo se ce ne sono altri
    //se in check level non ci sono + nemici richiamo next level
    this.checkLevel();
  }
  nextLevel() {
    this._level++;
    for (let e = 0; e < this._level; e++) {
      new Enemy({
        scene: this, x: Phaser.Math.RND.integerInRange(0, this.game.canvas.width), y: 0, key: "asteroid-" +
          Phaser.Math.RND.integerInRange(0, 3)
      });
    }
  }
  hitEnemy(missile: any, enemy: any) {
    this._asteroidParticle.emitParticleAt(enemy.x, enemy.y);
    this.removeEnemy(enemy);
    this.removeMissile(missile);
    this.events.emit("update-score", [100]);
    this.checkLevel();
    this.playExplosion();
  }
  hitPlayer(player: any, enemy: any) {
    this._asteroidParticle.emitParticleAt(enemy.x, enemy.y);
    this.removeEnemy(enemy);
    this.events.emit("decrease-live");
    this.checkLevel();
    this.playExplosion();
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
    this._bg.tilePositionY -= 2; this._player.update(time, delta);
  }

}
