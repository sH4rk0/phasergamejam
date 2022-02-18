export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 800,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: false,
  },

  preloader: {
    bgColor: "",
    image: "logo",
    imageX: 400,
    imageY: 300,
    loadingText: "",
  },

  spritesheets: [


  ],

  images: [


    { name: "bg", path: "assets/images/bg.jpg" },
    { name: "arkanoid", path: "assets/images/arkanoid.png" }



  ],


  atlas: [
    { key: "breakout", imagepath: "assets/images/breakout.png", jsonpath: "assets/images/breakout.json" },

  ],



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
