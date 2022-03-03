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
    image: "logo",
    imageX: 512,
    imageY: 300,
    loadingText: "",
  },


  tilemaps: [
    {
      key: "level-0",
      path: "assets/map/level-0.json",
    },
  ],

  spritesheets: [
    {
      name: "tiles",
      path: "assets/map/tilemap.png",
      width: 32,
      height: 32,
      spacing: 1,
      margin: 1,
    },
    {
      name: "bomb",
      path: "assets/images/bomb.png",
      width: 33,
      height: 31,
      frames: 6
    },
    {
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
      name: "asteroid-emitter",
      path: "assets/images/asteroids-emitter.png",
      width: 128,
      height: 128,
      frames: 6
    },
    {
      name: "robo-emitter",
      path: "assets/images/robo-emitter.png",
      width: 128,
      height: 128,
      frames: 6
    },

    {
      name: "robo",
      path: "assets/images/robo.png",
      width: 30,
      height: 50,
      frames: 8
    },
    {
      name: "robo2",
      path: "assets/images/robo2.png",
      width: 30,
      height: 50,
      frames: 8
    },
  ],

  images: [

    { name: "bg", path: "assets/images/bg.jpg" },
    { name: "galaxian", path: "assets/images/galaxian.png" }



  ],


  atlas: [
    { key: "breakout", imagepath: "assets/images/breakout.png", jsonpath: "assets/images/breakout.json" },
    { key: "flares", imagepath: "assets/images/flares.png", jsonpath: "assets/images/flares.json" },
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
