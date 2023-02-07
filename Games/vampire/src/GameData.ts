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

  //inseriamo un oggetto con le impostazioni dei nostri livelli
  levelsOptions: {

    pages: 1,
    tintColors: [0xff0000, 0x00ff00, 0x0000ff],
    columns: 3,
    rows: 1,
    thumbWidth: 60,
    thumbHeight: 60,
    spacing: 20,
    levels: [{ title: "Level 1" }, { title: "Level 2" }, { title: "Level 3" }]

  },


  tilemaps: [
    {
      key: "level-0",
      path: "assets/map/level-0.json",
    }

  ],

  spritesheets: [
    {
      name: "tilemap-extruded",
      path: "assets/map/tilemap-extruded.png",
      width: 32,
      height: 32,
      spacing: 2,
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

    {
      name: "bonus-heart",
      path: "assets/images/bonus-heart.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-key",
      path: "assets/images/bonus-key.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-coin",
      path: "assets/images/bonus-coin.png",
      width: 64,
      height: 64,
      frames: 8
    },
    {
      name: "gears",
      path: "assets/images/gears.png",
      width: 512,
      height: 512,
      frames: 4
    },
  ],

  images: [

    { name: "greenbots", path: "assets/images/greenbots.png" },
    { name: "cubes", path: "assets/images/cubes.png" },
    { name: "cubes2", path: "assets/images/cubes2.png" },
    { name: "trasparenza", path: "assets/images/trasparenza.png" },

  ],


  atlas: [
    { key: "flares", imagepath: "assets/images/flares.png", jsonpath: "assets/images/flares.json" },
  ],

  sounds: [
    {
      name: "game",
      paths: ["assets/sounds/game.ogg", "assets/sounds/game.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
    {
      name: "intro",
      paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
      volume: .6,
      loop: false,
      frame: 1,
    },
    {
      name: "win",
      paths: ["assets/sounds/win.ogg", "assets/sounds/win.m4a"],
      volume: .6,
      loop: false,
      frame: 1,
    },
    {
      name: "gameover",
      paths: ["assets/sounds/gameover.ogg", "assets/sounds/gameover.m4a"],
      volume: .6,
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
