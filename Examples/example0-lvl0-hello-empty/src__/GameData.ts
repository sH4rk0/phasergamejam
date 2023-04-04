export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1024,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: false,
  },

  preloader: {
    bgColor: "",
    image: "phaser",
    imageX: 512,
    imageY: 300,
    loadingText: "",
  },

  spritesheets: [{
    name: "bomb",
    path: "assets/images/bomb.png",
    width: 33,
    height: 31,
    frames: 6
  }],




  images: [
    { name: "grecia", path: "assets/images/grecia.png", },
    {
      name: "alfano1",
      path: "assets/images/alfano1.jpg",
    },],
  atlas: [],
  sounds: [],
  audio: [],
  bitmapfont: [],
};
