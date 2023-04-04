import IMain from "./IMain";
import FabioIacolare from "../../scenes/FabioIacolare";

export default class Main extends Phaser.GameObjects.Sprite implements IMain{
    protected _config: genericConfig;
    private _scene: FabioIacolare;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    private Proie: Phaser.Physics.Arcade.Group

    private _M: Phaser.Physics.Arcade.Body; 
    private _spacebar: Phaser.Input.Keyboard.Key;
    private _Andre: boolean = false
    private _direction: string;

constructor(params: genericConfig) {

		super(params.scene, params.x, params.y, params.key);
      
        this._scene = <FabioIacolare>params.scene;
        this._scene.physics.world.enable(this);
        this._M = <Phaser.Physics.Arcade.Body>this.body;
        this._scene.add.existing(this);
			  this._M = <Phaser.Physics.Arcade.Body>this.body;
			  this.createAnimations();
            this._M.setDragX(1000)
      .setCollideWorldBounds(true, 0.5)
      .setImmovable(true)
      .setGravity(0, 1200)
      .setMaxVelocity(250, 550)
      .setGravityY(1500)
      
      this._cursors = this._scene.input.keyboard.createCursorKeys(); 
      this._spacebar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


      this._M.setSize(35,40)

      let _animation : Phaser.Types.Animations.Animation = {

        key: "move",
        frames: this.anims.generateFrameNumbers("Main", {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      }; 
      this.anims.create(_animation);      
      this.setDepth(11); 


      let _Peppo : Phaser.Types.Animations.Animation = {
        key: "Stop",
        frames: this.anims.generateFrameNumbers("Fermo", {
          frames: [0]}),
        frameRate: 1,
        yoyo: false,
        repeat: -1
        };
        this.anims.create(_Peppo);      
        this.setDepth(11); 


        let _Sparo : Phaser.Types.Animations.Animation = {
          key: "Sparo",
          frames: this.anims.generateFrameNumbers("Proi", {
            frames: [0,1,2]}),
          frameRate: 10,
          yoyo: false,
          repeat: 0
          };
          this.anims.create(_Sparo);      
          this.setDepth(11); 
      };
		
     
        getMain(): Phaser.Physics.Arcade.Body {return this._M}
       
        
        createAnimations() {           
        }


        death() {
          this._M.setEnable(false);
          this.setAlpha(0);
      
        }
        relive() {
          this._M.setEnable(true);
          this.setAlpha(1);
          this.setPosition(64, 450);
        }

         setProie(Proie: Phaser.Physics.Arcade.Group)
      {
        this.Proie = Proie
      }
    

        private Sparo()
        {
          if (!this.Proie)
          {
            return
          }
      
          const Proi = this.Proie.get(this.x, this.y-5, 'Proi') as Phaser.Physics.Arcade.Image
          if (!Proi)
          {
            return
          }
      
          const parts = this.anims.currentAnim.key.split('-')
          const direction = parts[2]
      
          const vec = new Phaser.Math.Vector2(0, 0)
      
          switch (direction)
          {
           
            default:
            case 'side':
              if (this.scaleX < 0)
              {
                vec.x = -1
              }
              else
              {
                vec.x = 1
              }
              break
          }
      
          const angle = vec.angle()
      
          Proi.setActive(true)
          Proi.setVisible(true)
      
          Proi.setRotation(angle)
      
          Proi.x += vec.x * 16
      
          Proi.setVelocity(vec.x * 300, vec.y * 300)
        }






    update(time: number, delta: number) {

      if (Phaser.Input.Keyboard.JustDown(this._spacebar)) { 
        this.Sparo()
       }


    if (this._cursors.up.isDown){
      if (this._M.onFloor()) {
         
          this._M.setVelocityY(-550);
        } 
      }

        if (this._cursors.right.isDown ) {
            this.anims.play('move', true);
            this._M.setVelocityX(150);
            this.scaleX = 1
			      this._M.offset.x = 8
            
          }
          else if (this._cursors.left.isDown) {
            this.anims.play('move', true);
            this._M.setVelocityX(-150);
            this.scaleX = -1
			      this._M.offset.x = 24

          }else{
            this.anims.play('Stop', true);
            this._M.setVelocityX(0);
            this._direction = "none";
          }
         
  }
}