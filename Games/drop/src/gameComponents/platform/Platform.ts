
import IPlatform from "./IPlatform";
import { GameData } from "../../GameData";

export default class Platform extends Phaser.GameObjects.RenderTexture implements IPlatform {

  _isHeroOnIt: boolean = false;
  body: Phaser.Physics.Arcade.Body;
  assignedVelocity: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);
    this.setOrigin(0.5);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  setPhysics(): void {
    this.body.setImmovable(true);
    this.body.setAllowGravity(false);
    this.body.setFrictionX(1);
  }

  isHeroOnIt(): boolean {
    return this._isHeroOnIt;
  }

  setOnIt() {
    this._isHeroOnIt = true;
  }

  drawTexture(border: Phaser.GameObjects.Graphics, pattern: Phaser.GameObjects.TileSprite, eyes: Phaser.GameObjects.Sprite): void {
    border.clear();
    border.lineStyle(8, 0x000000, 1);
    border.strokeRect(0, 0, this.displayWidth, this.displayHeight);
    this.draw(pattern, this.displayWidth / 2, Phaser.Math.Between(0, GameData.DropGameOptions.platformHeight));
    this.draw(eyes, this.displayWidth / 2, this.displayHeight / 2);
    this.draw(border);
  }

  transformTo(x: number, y: number, width: number, height: number): void {
    this.x = x;
    this.y = y;
    this.setSize(width, height);
    this.body.setSize(width, height);
  }

  explodeAndDestroy(emitter: Phaser.GameObjects.Particles.ParticleEmitter): void {
    let platformBounds: Phaser.Geom.Rectangle = this.getBounds();
    emitter.setPosition(platformBounds.left, platformBounds.top);
    emitter.active = true;
    emitter.setEmitZone({
      source: new Phaser.Geom.Rectangle(0, 0, platformBounds.width, platformBounds.height),
      type: 'random',
      quantity: 50
    });
    emitter.explode(50, this.x - this.displayWidth / 2, this.y - this.displayHeight / 2);
    this.clearTint();
    this._isHeroOnIt = false;
  }

}
