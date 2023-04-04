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
    imageX: 500,
    imageY: 300,
    loadingText: "",
  },

  spritesheets: [
    {
      name: "Pav",
      path: "assets/Mappa/Blocchi.png",
      width: 32,
      height: 32,
      spacing: 0,
      margin: 0,
    },
    {
      name: "Car",
      path: "assets/Mappa/macchine.png",
      width: 84,
      height: 57,
      spacing: 0,
      margin: 0,
    },
    {
      name: "Proi",
      path: "assets/images/proiettili.png",
      width: 20,
      height: 20,
      frames: 12,
    },
    {
      name: "Main",
      path: "assets/images/Corsa.png",
      width: 40,
      height: 43,
      frames: 11,
    },
    {
      name: "Fermo",
      path: "assets/images/sta_puntando.png",
      width: 40,
      height: 43,
      frames: 1,
    },
    {
      name: "Fermo",
      path: "assets/images/Copp.png",
      width: 28,
      height: 40,
      frames: 4,
    },
    {
      name: "sfondo",
      path: "assets/map/sfondo.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    },
  ],

  images: [
    {
      name: "bg",
      path: "assets/Sfondo/introcity.png",
    },
    {
      name: "player_intro",
      path: "assets/images/playerintro.png",
    },
    {
      name: "aereo",
      path: "assets/images/aereo.png",
    },
    {
      name: "popup",
      path: "assets/images/x.png",
    },
    {
      name: "options",
      path: "assets/images/options.png",
    },
    {
      name: "Sfondo",
      path: "assets/images/Sfondo.png",
    },
    {
      name: "intro-image",
      path: "assets/Sfondo/introcity.png",
    },
    {
      name: "bar_contipi",
      path: "assets/images/bar_contipi.png",
    },
    {
      name: "freccia",
      path: "assets/images/freccia.png",
    },
    {
      name: "dialogo_destra",
      path: "assets/images/dialogo_destra.png",
    },
    {
      name: "dialogo_sinistra",
      path: "assets/images/dialogo_sinistra.png",
    },
    {
      name: "labs",
      path: "assets/images/labs.png",
    },

    {
      name: "stradabg",
      path: "assets/imagestradaty.png",
    },
    {
      name: "cuore",
      path: "assets/images/cuore.png",
    },
    {
      name: "proiettili",
      path: "assets/images/proiettili.png",
    },
    {
      name: "proiettil",
      path: "assets/images/proiettili_pieni.png",
    },
    {
      name: "proiettili_vuoti",
      path: "assets/images/proiettili_vuoti.png",
    },
    {
      name: "lvl1city",
      path: "assets/Sfondo/lvl1city.png",
    },
  ],
  atlas: [],
  sounds: [{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"]
  },
  {
    name: "_intro",
    paths: ["assets/sounds/canzoneintro.ogg", "assets/sounds/canzoneintro.m4a"]
  },
  {
    name: "_button",
    paths: ["assets/sounds/button.ogg", "assets/sounds/button.m4a"]
  },
  {
    name: "_musicbar",
    paths: ["assets/sounds/music-bar.ogg", "assets/sounds/music-bar.m4a"]
  }],
  audio: [],
  bitmapfont: [],
  tilemaps: [{
    key: "level-0",
    path: "assets/Mappa/Map1.json",
  },
  ]
};