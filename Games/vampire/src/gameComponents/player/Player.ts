//importiamo le classi che servono
import GamePlay from "../../scenes/GamePlay";
import IPlayer from "./IPlayer";
import WeaponDagger from "../weapon/WeaponDagger";
import WeaponSeek from "../weapon/WeaponSeek";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {

  //dichiariamo le variabili

  private _config: genericConfig;
  private _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _direction: string;
  private _fireTimer: Phaser.Time.TimerEvent;


  constructor(params: genericConfig) {
    //passiamo i parametri di inizializzazione alla classe SPRITE da cui eredita la nostra classe Player
    super(params.scene, params.x, params.y, params.key);
    //assegnamo i parametri di configurazione alla variabile
    this._config = params;
    //assegnamo il riferrimento alla scena padre
    this._scene = <GamePlay>params.scene;
    //abilitiamo questo gameobject alla fisica
    this._scene.physics.world.enable(this);
    //settiamo la variabile in modo da poter accedere a tutte le propery del body
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    //aggiungiamo questo gameobject alla scena
    this._scene.add.existing(this);

    this._body
      .setCollideWorldBounds(true, 0.5) //collide con i bounds del world
      .setImmovable(true) //non rispnde agli effetti della fisica se collide con altro game object
      .setGravity(0, 0) //setta la gravità 
      .setMaxVelocity(250, 550); //setta una velocità max per la X e la Y


    //creiamo un istanza di cursor keys
    this._cursors = this._scene.input.keyboard.createCursorKeys();

    //creiamo l'animazione di pausa
    let _animation = {
      key: "idle",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };
    //la inizializziamo
    this.anims.create(_animation);

    //creiamo l'animazione di movimento
    _animation = {
      key: "move",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [4, 5, 6, 7]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };
    //la inizializziamo
    this.anims.create(_animation);
    //settiamo la z a 11
    this.setDepth(11);

    //come in vampire survivor le armi del player vengono richiamate in automatico
    //settiamo un evento che ogni secondo richiama il metodo del Player fireWeapons();
    //assegnamo l'evento alla variabile _fireTimer in modo da poterla gestire anche successivamente
    this._fireTimer = this.scene.time.addEvent({ delay: 1000, loop: true, callback: () => { this.fireWeapons(); }, callbackScope: this });
    //mettiamo in pausa il timer richiamando il metodo deactivateWeapons
    this.deactivateWeapons();

  }

  //questo metodo serve nel collider per avere accesso alle proprità del body per fare dei controlli
  //ritorna al collider il Body del Player
  getBody(): Phaser.Physics.Arcade.Body { return this._body }

  //metodo per attivare le armi
  activateWeapons(): void {
    //this._fireTimer.paused = false;
  }

  //metodo per disattivare le armi
  deactivateWeapons(): void {
    this._fireTimer.paused = true;
  }

  //metodo richiamato una volta al secondo
  //questo metodo in base alla potenza del player permette di usare weapon multiple
  fireWeapons(): void {


    new WeaponDagger({ scene: this._scene, x: this.x, y: this.y, key: "missile", direction: this._direction });

    new WeaponSeek({
      scene: this._scene, x: this.x, y: this.y, key: "missile", lifeSpan: 3000
    });

  }

  update(time: number, delta: number) {

    this.setDepth(this.y);
    //se il il cursore sinistro è premuto
    if (this._cursors.left.isDown) {
      //gira il PLAYER nella posizione iniziale, quella definina nello spritesheet
      this.setFlipX(false);
      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocità x in modo da far muovere il player
      this._body.setVelocityX(-250);
      //setta la direction verso sinistra
      this._direction = "left";

    }

    //se il il cursore destro è premuto
    else if (this._cursors.right.isDown) {
      //gira il PLAYER in direzione opposta da quella definina nello spritesheet
      this.setFlipX(true);
      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocità x in modo da far muovere il player
      this._body.setVelocityX(250);
      //setta la direction verso destra
      this._direction = "right";
    }


    //se il il cursore in alto è premuto
    else if (this._cursors.up.isDown) {

      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocità x in modo da far muovere il player
      this._body.setVelocityY(-250);
      //setta la direction verso destra
      this._direction = "up";
    }
    //se il il cursore in basso è premuto
    else if (this._cursors.down.isDown) {

      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocità x in modo da far muovere il player
      this._body.setVelocityY(250);
      //setta la direction verso destra
      this._direction = "down";
    }

    //se non sono premuti i pulsanti
    else {
      //setta la velocità x a 0 in modo da far fermare il PLAYER
      this._body.setVelocity(0);
      //effettual il play dell'animazione
      this.anims.play('idle', true);
      //setta la direction a NONE
      //this._direction = "none";

    }


  }

  death() {
    //disattivo il body del player
    this._body.setEnable(false);
    //setto l'alpha a zero e lo rendo invisibile
    this.setAlpha(0);

  }

  relive() {
    //riattivo il body del player
    this._body.setEnable(true);
    //setto l'alpha a 1 e lo rendo visibile
    this.setAlpha(1);
    //lo riposiziono allo start
    this.setPosition(64, 450);
  }


}
