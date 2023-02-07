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
    name: "players",
    path: "assets/images/players.png",
    width: 52,
    height: 70,
    frames: 84
  },
  {
    name: "bomb",
    path: "assets/images/bomb.png",
    width: 33,
    height: 31,
    frames: 6
  },
  {
    name: "explosion",
    path: "assets/images/explosion.png",
    width: 80,
    height: 80,
    frames: 28
  }, {
    name: "explosion-2",
    path: "assets/images/explosion2.png",
    width: 64,
    height: 64,
    spacing: 25
  },

  {
    name: "asteroid-0",
    path: "assets/images/asteroid-0.png",
    width: 80,
    height: 80,
    frames: 12
  },
  {
    name: "asteroid-1",
    path: "assets/images/asteroid-1.png",
    width: 80,
    height: 80,
    frames: 12
  },
  {
    name: "asteroid-2",
    path: "assets/images/asteroid-2.png",
    width: 100,
    height: 100,
    frames: 15
  },
  {
    name: "asteroid-3",
    path: "assets/images/asteroid-3.png",
    width: 70,
    height: 70,
    frames: 13
  }],
  images: [
    {
      name: "logo-phaser",
      path: "assets/images/logo-phaser.png",
    },],
  atlas: [],
  sounds: [],
  audio: [],
  bitmapfont: [],
};
