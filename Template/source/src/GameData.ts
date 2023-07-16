export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: false,
    autoplay: true,
    videoTime: false,
    loading: { text: "", textX: 1920 / 2, textY: 980, loadingX: 1920 / 2, loadingY: 980 }

  },

  preloader: {
    bgColor: "ffffff",
    image: "logo",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "",
  },

  spritesheets: [
    { name: "robo", path: "assets/images/robo.png", width: 30, height: 50, frames: 8 },

  ],
  images: [
    { name: "phaser", path: "assets/images/logo-phaser.png" },
  ],
  atlas: [],
  sounds: [{
    name: "music",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    volume: 1,
    loop: true,
    frame: 1,
  },],

  video: [

    { name: "video", path: "/assets/video/video.mp4" },

  ],
  audio: [{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    instances: 10,
  },],

  bitmapfont: [],
};
