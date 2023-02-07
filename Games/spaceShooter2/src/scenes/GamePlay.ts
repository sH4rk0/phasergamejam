import Player from "../gameComponents/player/Player";
import Missile from "../gameComponents/missile/Missile";
import Enemy from "../gameComponents/enemy/Enemy";


export default class GamePlay extends Phaser.Scene {

  private _player: Player;
  private _bg: Phaser.GameObjects.TileSprite;
  private _stars: Phaser.GameObjects.TileSprite;
  private _missileGroup: Phaser.GameObjects.Group;
  private _enemyGroup: Phaser.GameObjects.Group;
  private _level: number = 1;
  private _asteroidParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;


  constructor() {
    super({ key: "GamePlay" });
  }

  create() {

    this.textures.addSpriteSheetFromAtlas('mine-sheet', { atlas: 'space', frame: 'mine', frameWidth: 64 });
    this.textures.addSpriteSheetFromAtlas('asteroid1-sheet', { atlas: 'space', frame: 'asteroid1', frameWidth: 96 });
    this.textures.addSpriteSheetFromAtlas('asteroid2-sheet', { atlas: 'space', frame: 'asteroid2', frameWidth: 96 });
    this.textures.addSpriteSheetFromAtlas('asteroid3-sheet', { atlas: 'space', frame: 'asteroid3', frameWidth: 96 });
    this.textures.addSpriteSheetFromAtlas('asteroid4-sheet', { atlas: 'space', frame: 'asteroid4', frameWidth: 64 });

    this.anims.create({ key: 'mine-anim', frames: this.anims.generateFrameNumbers('mine-sheet', { start: 0, end: 15 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid1-anim', frames: this.anims.generateFrameNumbers('asteroid1-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid2-anim', frames: this.anims.generateFrameNumbers('asteroid2-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid3-anim', frames: this.anims.generateFrameNumbers('asteroid3-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
    this.anims.create({ key: 'asteroid4-anim', frames: this.anims.generateFrameNumbers('asteroid4-sheet', { start: 0, end: 23 }), frameRate: 20, repeat: -1 });

    //  World size is 8000 x 6000
    this._bg = this.add.tileSprite(512, 300, 1024, 600, 'background').setScrollFactor(0);
    this._stars = this.add.tileSprite(512, 300, 1024, 600, 'stars').setScrollFactor(0);

    //  Add our planets, etc
    this.add.image(512, 680, 'space', 'blue-planet').setOrigin(0).setScrollFactor(0.6);
    this.add.image(2833, 1246, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6);
    this.add.image(3875, 531, 'space', 'sun').setOrigin(0).setScrollFactor(0.6);
    const galaxy = this.add.image(5345 + 1024, 327 + 1024, 'space', 'galaxy').setBlendMode(1).setScrollFactor(0.6);
    this.add.image(908, 3922, 'space', 'gas-giant').setOrigin(0).setScrollFactor(0.6);
    this.add.image(3140, 2974, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6).setScale(0.8).setTint(0x882d2d);
    this.add.image(6052, 4280, 'space', 'purple-planet').setOrigin(0).setScrollFactor(0.6);

    for (let i = 0; i < 8; i++) {
      this.add.image(Phaser.Math.Between(0, 8000), Phaser.Math.Between(0, 6000), 'space', 'eyes').setBlendMode(1).setScrollFactor(0.8);
    }

    this._player = new Player({
      scene: this, x: this.game.canvas.width / 2, y: 550, key: ""
    });

    this.cameras.main.startFollow(this._player);

    this.tweens.add({
      targets: galaxy,
      angle: 360,
      duration: 100000,
      ease: 'Linear',
      loop: -1
    });

    this._missileGroup = this.add.group({ runChildUpdate: true });
    this._enemyGroup = this.add.group({ runChildUpdate: true });

    /*
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
      scale: { start: 0.1, endp: 0.1 },
      alpha: .3,
      quantity: 1
    });
   

    this._bg = this.add.tileSrite(0, 0, 1024, 600, "background").setOrigin(0)
    this._player = new Player({
      scene: this, x: this.game.canvas.width / 2, y:
        550, key: "spaceship"
    });
    this.nextLevel();
    this.physics.add.collider(this._missileGroup, this._enemyGroup,
      this.hitEnemy, undefined, this);
    this.physics.add.collider(this._player, this._enemyGroup, this.hitPlayer,
      undefined, this);
      */

  }

  getPlayerBody(): Phaser.Physics.Arcade.Body {
    return this._player.getBody();
  }

  getPlayer(): Player {
    return this._player;
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
      new Enemy({
        scene: this, x: Phaser.Math.RND.integerInRange(100,
          this.game.canvas.width - 100), y: 100, key: "asteroid-" +
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

    this._player.update(time, delta);

    this._bg.tilePositionX += this._player.getBody().deltaX() * 0.5;
    this._bg.tilePositionY += this._player.getBody().deltaY() * 0.5;

    this._stars.tilePositionX += this._player.getBody().deltaX() * 2;
    this._stars.tilePositionY += this._player.getBody().deltaY() * 2;

  }

}
