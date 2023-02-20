import GamePlay from "./GamePlay";

enum dialogs {
  next,
  end
}

export default class Hud extends Phaser.Scene {

  private _gamePlay: GamePlay;

  private _dialogText: Phaser.GameObjects.Text;
  private _dialogLayer: Phaser.GameObjects.Image;
  private _dialogImage: Phaser.GameObjects.Image;
  private _dialogContainer: Phaser.GameObjects.Container;
  private _dialogTimer: Phaser.Time.TimerEvent;
  private _dialogCurrentIndex: number = -1;
  private _dialogInProgress: boolean = false;

  private _dialogTexts: Array<{ image: string, text: string, delay: number, action: dialogs, callback?: any }> =
    [
      //index 0
      { image: "bomb", text: "Ciao, come ti chiami?", delay: 5000, action: dialogs.next },
      { image: "robo", text: "Ciao, io sono Francesco.", delay: 5000, action: dialogs.next },
      { image: "bomb", text: "Ciao Francesco io mi chiamo Angelo, piacere di conoscerti!", delay: 5000, action: dialogs.end },
      //index 3
      { image: "bomb", text: "Ciao, io sono un segnale informativo! Attendo 5 secondi e poi passo al prossimo messaggio.", delay: 5000, action: dialogs.next },
      { image: "robo", text: "Che informazioni puoi darmi?", delay: 5000, action: dialogs.next },
      { image: "bomb", text: "Se clicchi sull'area di dialogo passo direttamente al messaggio successivo.", delay: 5000, action: dialogs.next },
      { image: "robo", text: "Grazie per l'informazione!", delay: 5000, action: dialogs.end }
    ];

  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() { }

  create() {


    //creo un container per la finestra di dialogo
    this._dialogContainer = this.add.container();
    //aggiungo un layer di sfondo opaco 
    //layer-dialog è una texture creata in boot.ts
    this._dialogLayer = this.add.image(512, 300, "layer-dialog").setInteractive().on("pointerdown", () => { this.showNext(); })
    //aggiungo un immagine che sarà il portrait di chi sta parlando
    this._dialogImage = this.add.image(100, 300, "");
    //aggiungo un il testo
    this._dialogText = this.add.text(512, 300, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(20).setWordWrapWidth(600);
    //aggiungo tutti gli elementi al container
    this._dialogContainer.add([this._dialogLayer, this._dialogImage, this._dialogText]);
    //setto il container invisibile
    this._dialogContainer.setAlpha(0);

    //recuperiamo l'istanza di gameplay e la assegnamo alla nostra variabile locale.
    this._gamePlay = <GamePlay>this.scene.get("GamePlay");

    //rimuove il listener per i dialoghi
    this._gamePlay.events.off("start-dialog", this.openDialog, this);
    //aggiunge il listener per i dialoghi
    this._gamePlay.events.on("start-dialog", this.openDialog, this);


    console.log("create:HUD")

  }


  //metodo richiamato per iniziare il dialogo
  openDialog(parameters: Array<any>) {

    //se c'è già un dialogo in corso esco dal metodo
    if (this._dialogInProgress) return;
    //setto il dialogo in corso
    this._dialogInProgress = true;
    //recupero l'indice del dialogo richiesto da i parametri
    let index: number = <number>parameters[0];
    //metto in pausa la scena di gameplay
    this.scene.pause(this._gamePlay);

    //recupero l'oggetto corrente per settare il testo e l'immagine iniziale
    let _textObj = this._dialogTexts[index];
    // setto il testo con il testo corretto
    this._dialogText.setText(_textObj.text);
    // setto l'immagine con la texture corretta
    this._dialogImage.setTexture(_textObj.image);

    //rendo il container visibile usando un tween
    this.tweens.add({
      targets: this._dialogContainer, duration: 300, alpha: 1, onComplete: () => {
        //richiamo il metodo per la visualizzazione del testo corretto
        this.showPhrase(index);
      }
    });

  }

  closeDialog() {

    //rendo il container invisibile usando un tween ed al completamento resetto i parametri
    this.tweens.add({
      targets: this._dialogContainer, duration: 300, alpha: 0, onComplete: () => {

        //setto l'indice del dialogo a -1
        this._dialogCurrentIndex = -1
        //rimuovo il timer
        this._dialogTimer.remove();
        //setto il container trasparente
        this._dialogContainer.setAlpha(0);
        //riattivo la scena di game play
        this.scene.resume(this._gamePlay);
        //setto il dlialogo in progress a false
        this._dialogInProgress = false;
      }
    });

  }

  //metodo richiamato dal click sul layer opaco
  //serve a velocizzare il tempo di conversazione e passare al messaggio successivo
  //senza dover attendere tutto il tempo indicato nel delay di ciascuna frase
  showNext() {
    //rimuovo il timer
    this._dialogTimer.remove();
    //recupero l'oggetti corrente con _dialogCurrentIndex
    let _textObj = this._dialogTexts[this._dialogCurrentIndex];
    //se la action è di tipo next, passo immediatamente al messaggio successivo
    if (_textObj.action == dialogs.next) {
      this.showPhrase(this._dialogCurrentIndex + 1);
    }
    //se la action è di tipo end chiudo il dialogo
    else if (_textObj.action == dialogs.end) {
      this.closeDialog();
    }

  }



  //metodo richiamato per visualizzare la frase del dialogo
  showPhrase(index: number) {
    // salvo il valore di index in _dialogCurrentIndex
    this._dialogCurrentIndex = index;
    // recupero l'oggetto del dialogo
    let _textObj = this._dialogTexts[index];
    // setto il testo con il testo corretto
    this._dialogText.setText(_textObj.text);
    // setto l'immagine con la texture corretta
    this._dialogImage.setTexture(_textObj.image)

    //se la action è di tipo next, setto un timer con il delay indicato dall'oggetto e nella callback richiamo la stessa funzione showPhrase passando la index incrementata di 1
    if (_textObj.action == dialogs.next) {

      this._dialogTimer = this.time.addEvent({ delay: _textObj.delay, callback: () => { this.showPhrase(index + 1) }, callbackScope: this })

    }
    //se la action è di tipo end, setto un timer con il delay indicato dall'oggetto e nella callback richiamo il metodo closeDialog()
    else if (_textObj.action == dialogs.end) {

      this._dialogTimer = this.time.addEvent({ delay: _textObj.delay, callback: () => { this.closeDialog(); }, callbackScope: this })

    }

  }





}
