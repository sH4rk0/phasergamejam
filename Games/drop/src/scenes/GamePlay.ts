import Player from "../gameComponents/player/Player";
import Platform from "../gameComponents/platform/Platform"
import { GameData } from "../GameData";


export default class GamePlay extends Phaser.Scene {

  eyes: Phaser.GameObjects.Sprite;
  hero: Player;
  canDestroy: Boolean;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  platformGroup: Phaser.Physics.Arcade.Group;
  gameWidth: number;
  gameHeight: number;
  borderGraphics: Phaser.GameObjects.Graphics;
  spritePattern: Phaser.GameObjects.TileSprite;

  constructor() {
    super({
      key: "GamePlay",
    });
  }

  create() {


    this.physics.world.gravity.y = GameData.DropGameOptions.gameGravity;
    this.cameras.main.setBackgroundColor(0x000000);
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
    this.borderGraphics = this.add.graphics();
    this.borderGraphics.setVisible(false);
    this.spritePattern = this.add.tileSprite(this.gameWidth / 2, GameData.DropGameOptions.platformHeight / 2, this.gameWidth, GameData.DropGameOptions.platformHeight * 2, 'pattern')
    this.spritePattern.setVisible(false);
    this.eyes = this.add.sprite(0, 0, 'eyes');
    this.eyes.setVisible(false);
    this.platformGroup = this.physics.add.group();
    for (let i: number = 0; i < 7; i++) {
      this.addPlatform(i == 0);
    }
    this.hero = new Player({ scene: this, x: this.gameWidth / 2, y: 0, key: 'hero' });
    this.cameras.main.startFollow(this.hero, true, 0, 0.5, 0, - (this.gameHeight / 2 - this.gameHeight * GameData.DropGameOptions.firstPlatformPosition));
    this.input.on('pointerdown', this.destroyPlatform, this);
    this.createEmitter();

  }

  createEmitter(): void {
    this.emitter = this.add.particles('particle').createEmitter({
      scale: {
        start: 1,
        end: 0
      },
      speed: {
        min: 0,
        max: 200
      },
      active: false,
      lifespan: 500,
      quantity: 50
    });
  }

  addPlatform(isFirst: Boolean): void {
    let platform: Platform = new Platform(this, this.gameWidth / 2, isFirst ? this.gameWidth * GameData.DropGameOptions.firstPlatformPosition : 0, this.gameWidth / 8, GameData.DropGameOptions.platformHeight);
    this.platformGroup.add(platform);
    platform.setPhysics();
    platform.drawTexture(this.borderGraphics, this.spritePattern, this.eyes);
    if (!isFirst) {
      this.initPlatform(platform);
    }
    else {
      platform.setTint(0x00ff00);

    }
  }

  destroyPlatform(): void {
    if (this.canDestroy) {
      this.canDestroy = false;
      let closestPlatform: Phaser.Physics.Arcade.Body = this.physics.closest(this.hero) as Phaser.Physics.Arcade.Body;
      let platform: Platform = closestPlatform.gameObject as Platform;
      platform.explodeAndDestroy(this.emitter);
      this.initPlatform(platform);
    }
  }

  initPlatform(platform: Platform): void {
    platform.assignedVelocity = this.randomValue(GameData.DropGameOptions.platformHorizontalSpeedRange) * Phaser.Math.RND.sign();
    platform.transformTo(this.gameWidth / 2, this.getLowestPlatform() + this.randomValue(GameData.DropGameOptions.platformVerticalDistanceRange), this.randomValue(GameData.DropGameOptions.platformLengthRange), GameData.DropGameOptions.platformHeight);
    platform.drawTexture(this.borderGraphics, this.spritePattern, this.eyes);
  }

  getLowestPlatform(): number {
    let lowestPlatform: number = 0;
    let platforms: Platform[] = this.platformGroup.getChildren() as Platform[];
    for (let platform of platforms) {
      let y: number = platform.y;
      lowestPlatform = Math.max(lowestPlatform, y);
    }
    return lowestPlatform;
  }

  getHighestPlatform(maxHeight: number): Platform {
    let highestPlatform: Platform = this.platformGroup.getFirst();
    let platforms: Platform[] = this.platformGroup.getChildren() as Platform[];
    for (let platform of platforms) {
      if ((platform.y > maxHeight) && (!highestPlatform || platform.y < highestPlatform.y)) {
        highestPlatform = platform;
      }
    }
    return highestPlatform;
  }

  randomValue(a: number[]): number {
    return Phaser.Math.Between(a[0], a[1]);
  }

  handleCollision(body1: Phaser.GameObjects.GameObject, body2: Phaser.GameObjects.GameObject): void {
    let hero: Player = body1 as Player;
    let platform: Platform = body2 as Platform;
    if (!platform.isHeroOnIt()) {
      if (!platform.isTinted) {
        this.check();
      }
      if (hero.x < platform.getBounds().left) {
        hero.getBody().setVelocityY(-200);
        hero.getBody().setVelocityX(-200);
        hero.angle = -45;
      }
      if (hero.x > platform.getBounds().right) {
        hero.getBody().setVelocityY(-200);
        hero.getBody().setVelocityX(200);
        hero.angle = 45;
      }
      this.updateScore(10);
      platform.setOnIt();
      this.paintSafePlatforms();
      this.canDestroy = true;
    }
  }

  paintSafePlatforms(): void {
    let floorPlatform: Platform = this.getHighestPlatform(0);
    floorPlatform.setTint(0xff0000);
    let targetPlatform: Platform = this.getHighestPlatform(floorPlatform.y);
    targetPlatform.setTint(0x00ff00);
  }

  update(time: number, delta: number): void {
    if (this.hero.angle == 0) {
      this.physics.world.collide(this.hero, this.platformGroup, this.handleCollision, undefined, this);
    }
    let platforms: Platform[] = this.platformGroup.getChildren() as Platform[];
    for (let platform of platforms) {
      if (platform.y + this.gameHeight < this.hero.y) {
        this.check()
      }
      let distance: number = Math.max(0.2, 1 - ((Math.abs(this.gameWidth / 2 - platform.x) / (this.gameWidth / 2)))) * Math.PI / 2;
      platform.body.setVelocityX(platform.assignedVelocity * distance);
      if ((platform.body.velocity.x < 0 && platform.getBounds().left < this.hero.displayWidth / 2) || (platform.body.velocity.x > 0 && platform.getBounds().right > this.gameWidth - this.hero.displayWidth / 2)) {
        platform.assignedVelocity *= -1;
      }
    }
  }

  check(): void {

    this.events.emit("decrease-live");

    /*this.updateLive(-1, false);
    if (this.getLives() == 0) {
      this.gameOver(true);
    } else {
      this.scene.restart();
    }*/
  }

  updateScore(score: number): void { this.events.emit("update-score", [score]) }


}
