

import IPlayer from "./IPlayer";
import Player from "./Player";

export default class Player2directions extends Player implements IPlayer {

    constructor(params: genericConfig) {
        super(params);

    }


    update(time: number, delta: number) {

        this._scene.updateValues(this.x, this.y);


        this.setDepth(this.y);
        //se il il cursore sinistro è premuto
        if (this._cursors.left.isDown || this._a.isDown) {
            //gira il PLAYER nella posizione iniziale, quella definina nello spritesheet
            this.setFlipX(false);
            //effettual il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityX(-this._velocity);

        }


        //se il il cursore destro è premuto
        if (this._cursors.right.isDown || this._d.isDown) {
            //gira il PLAYER in direzione opposta da quella definina nello spritesheet
            this.setFlipX(true);
            //effettual il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityX(this._velocity);
        }

        //se il il cursore in alto è premuto
        if (this._cursors.up.isDown || this._w.isDown) {

            //effettual il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(-this._velocity);
        }
        //se il il cursore in basso è premuto
        if (this._cursors.down.isDown || this._s.isDown) {

            //effettual il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(this._velocity);
        }

        if (
            !this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown
            && !this._a.isDown && !this._d.isDown && !this._w.isDown && !this._s.isDown) {
            //setta la velocità x a 0 in modo da far fermare il PLAYER
            this._body.setVelocity(0);
            //effettual il play dell'animazione
            this.anims.play('idle', true);

        }

    }

}