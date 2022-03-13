interface IPlatform {

  update(time: number, delta: number): void;
  setPhysics(): void;
}
export default IPlatform;
