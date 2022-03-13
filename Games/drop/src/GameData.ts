export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 600,
    gameHeight: 1024,
    bgColor: "#ffffff",
    debug: false,
  },

  preloader: {
    bgColor: "",
    image: "logo",
    imageX: 300,
    imageY: 300,
    loadingText: "",
  },

  DropGameOptions: {
    firstPlatformPosition: 2 / 10,
    gameGravity: 1700,
    platformHorizontalSpeedRange: [250, 400],
    platformLengthRange: [120, 300],
    platformVerticalDistanceRange: [150, 250],
    platformHeight: 50
  },


  tilemaps: [],

  spritesheets: [],


  images: [

    { name: "bg", path: "assets/images/bg.jpg" },
    { name: "galaxian", path: "assets/images/galaxian.png" },
    { name: "hero", path: "assets/images/hero.png" },
    { name: "pattern", path: "assets/images/pattern.png" },
    { name: "eyes", path: "assets/images/eyes.png" },
    { name: "particle", path: "assets/images/particle.png" },
    { name: "drop", path: "assets/images/drop.png" }

  ],


  atlas: [],


  sounds: [
    {
      name: "music0",
      paths: ["assets/sounds/music0.ogg", "assets/sounds/music0.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
  ],

  audio: [
    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
      instances: 10,
    },
  ],


  bitmapfont: [
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml",
    }
  ],
};
