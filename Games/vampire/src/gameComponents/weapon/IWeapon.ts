interface IWeapon {
  create(): void;
  update(time: number, delta: number): void;
  removeItem(): void;
}
export default IWeapon;
