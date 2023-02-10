export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1024,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: true,
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
  },
  {
    name: "flares",
    path: "assets/images/flares.png",
    width: 130,
    height: 132,
    frames: 5
  }],
  images: [
    { name: "cannon_head", path: "assets/images/cannon_head.png" },
    { name: "cannon_body", path: "assets/images/cannon_body.png" },
    { name: "logo", path: "assets/images/galaxian.png" },
    { name: "layer", path: "assets/images/layer.png" },
    { name: "popup", path: "assets/images/popup.png" },
    { name: "bg1", path: "assets/images/1.png" },
    { name: "bg2", path: "assets/images/2.png" },
    { name: "bg3", path: "assets/images/3.png" },
    { name: "bg4", path: "assets/images/4.png" },
    { name: "bg5", path: "assets/images/5.png" },
    { name: "bg6", path: "assets/images/6.png" },
    { name: "bg7", path: "assets/images/7.png" },
    { name: "space", path: "assets/images/bg.jpg" },
    { name: "nebula", path: "assets/images/nebula.jpg" },
    { name: "grid", path: "assets/images/grid.png" },
    {
      name: "logo-phaser",
      path: "assets/images/logo-phaser.png",
    },],
  atlas: [],
  sounds: [{
    name: "intro",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
  },
  ],
  audio: [
    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    },
  ],
  bitmapfont: [],
};
