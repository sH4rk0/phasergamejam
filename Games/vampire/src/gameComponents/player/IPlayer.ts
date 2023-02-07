interface IPlayer {

  update(time: number, delta: number): void;
  getBody(): Phaser.Physics.Arcade.Body;
  fireWeapons(): void;
  death(): void;
  relive(): void;
  update(time: number, delta: number): void;
  activateWeapons(): void;
  deactivateWeapons(): void;

}
export default IPlayer;
