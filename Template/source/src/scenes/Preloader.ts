import { GameData } from "../GameData";
import WebFontFile from '../scenes/webFontFile';

export default class Preloader extends Phaser.Scene {

  private _loading: Phaser.GameObjects.Text;
  private _progress: Phaser.GameObjects.Graphics;
  private _image: Phaser.GameObjects.Image;


  constructor() {
    super({
      key: "Preloader",
    });
  }

  preload() {
    this.cameras.main.setBackgroundColor(GameData.globals.bgColor);
    this._progress = this.add.graphics();
    this.loadAssets();
  }

  create() {
    if (this.input.keyboard != null) {
      //fullscreen
      //-----------------------------------------------------------------------
      this.input.keyboard.on("keydown-F", (event: KeyboardEvent) => {
        if (event.shiftKey) {
          this.toggleFullScreen();
        }
      });
    }
  }

  toggleFullScreen(): void {
    //console.log("toggleFullScreen");
    if (
      //@ts-ignore
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      //@ts-ignore
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      this.setFullscreen();
    } else {
      this.removeFullscreen();
    }
  }

  setFullscreen(): void {

    //@ts-ignore
    if (document.documentElement.requestFullScreen) {
      //@ts-ignore
      document.documentElement.requestFullScreen();
      //@ts-ignore
    } else if (document.documentElement.mozRequestFullScreen) {
      //@ts-ignore
      document.documentElement.mozRequestFullScreen();
      //@ts-ignore
    } else if (document.documentElement.webkitRequestFullScreen) {
      //@ts-ignore
      document.documentElement.webkitRequestFullScreen(
        //@ts-ignore
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  }

  removeFullscreen(): void {

    //@ts-ignore
    if (document.cancelFullScreen) {
      //@ts-ignore
      document.cancelFullScreen();
      //@ts-ignore
    } else if (document.mozCancelFullScreen) {
      //@ts-ignore
      document.mozCancelFullScreen();
      //@ts-ignore
    } else if (document.webkitCancelFullScreen) {
      //@ts-ignore
      document.webkitCancelFullScreen();
    }
  }

  update(time: number, delta: number) { }


  init() {
    this._image = this.add
      .image(
        GameData.preloader.imageX,
        GameData.preloader.imageY,
        GameData.preloader.image
      )
      .setAlpha(0).setScale(.4);


    this.tweens.add({
      targets: [this._image],
      alpha: 1,
      duration: 500,
    });

    this._loading = this.add
      .text(this.game.canvas.width / 2, this.game.canvas.height - 100, "")
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0.5, 1).setColor("#000000").setFontSize(40).setFontFamily("roboto");
  }

  loadAssets(): void {

    this.load.on("start", () => { });

    this.load.on("fileprogress", (file: any, value: any) => {
      //console.log(file)
    });

    this.load.on("progress", (value: any) => {

      this._progress.clear();
      this._progress.fillStyle(0xff0000, 1);
      this._progress.fillRect(0, 530, GameData.globals.width * value, 70);
      this._loading.setText("Loading...");
    });

    this.load.on("complete", () => {



      this._loading.setText("Tap/click to start!");

      this.input.once("pointerdown", () => {
        this.tweens.add({
          targets: [this._image, this._loading],
          alpha: 0,
          duration: 500,
          onComplete: () => {

            this.scene.start("Intro");

          },
        });

      });






    });


    //Assets Load
    //--------------------------

    //WEB FONT
    this.load.addFile(new WebFontFile(this.load, 'Roboto'));

    //SCRIPT
    if (GameData.script != null)
      GameData.script.forEach((element: ScriptAsset) => {
        this.load.script(element.key, element.path);
      });

    // IMAGES
    if (GameData.images != null)
      GameData.images.forEach((element: ImageAsset) => {
        this.load.image(element.name, element.path);
      });

    // TILEMAPS
    if (GameData.tilemaps != null)
      GameData.tilemaps.forEach((element: TileMapsAsset) => {
        this.load.tilemapTiledJSON(element.key, element.path);
      });

    // ATLAS
    if (GameData.atlas != null)
      GameData.atlas.forEach((element: AtlasAsset) => {
        this.load.atlas(element.key, element.imagepath, element.jsonpath);
      });

    // SPRITESHEETS
    if (GameData.spritesheets != null)
      GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
        this.load.spritesheet(element.name, element.path, {
          frameWidth: element.width,
          frameHeight: element.height,
          endFrame: element.frames,
        });
      });

    //video 
    if (GameData.video != null) {

      GameData.video.forEach((element: VideoAsset) => {

        this.load.video(element.name, element.path, true);


      });
    }

    //bitmap fonts
    if (GameData.bitmapfont != null)
      GameData.bitmapfont.forEach((element: BitmapfontAsset) => {
        this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
      });

    // SOUNDS
    if (GameData.sounds != null)
      GameData.sounds.forEach((element: SoundAsset) => {
        this.load.audio(element.name, element.paths);
      });

    // Audio
    if (GameData.audio != null)
      GameData.audio.forEach((element: AudioSpriteAsset) => {
        this.load.audioSprite(
          element.name,
          element.jsonpath,
          element.paths,
          element.instance
        );
      });
  }
}
