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

  spritesheets: [],
  images: [{
    name: "logo-phaser",
    path: "assets/images/logo-phaser.png",
  },],
  atlas: [],
  sounds: [],
  audio: [],
  bitmapfont: [],
};
