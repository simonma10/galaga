import Phaser from 'phaser-ce';

class Player extends Phaser.Sprite {
  constructor (game, x, y, key, velocity) {
    super(game, x, y, key);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.5);
    this.velocity = velocity;
    this.body.collideWorldBounds = true;
    this.game.stage.addChild(this);
    this.isShielded = false
    // this.shield = null;
  }
  moveLeft () {
    if (!this.isShielded) {
      this.body.velocity.x = -this.velocity;
    }
  }
  moveRight () {
    if (!this.isShielded) {
      this.body.velocity.x = this.velocity;
    }
  }
  moveUp () {
    if (!this.isShielded) {
      this.body.velocity.y = -this.velocity;
    }
  }
  moveDown () {
    if (!this.isShielded) {
      this.body.velocity.y = this.velocity;
    }
  }
  explode () {
    this.kill();
    let explode = this.game.add.sprite(this.centerX, this.centerY, 'explode');
    explode.scale.setTo(0.8);
    explode.anchor.setTo(0.5);
    let anim = explode.animations.add('anim_explode');
    anim.play(24, false, true);
    anim.onComplete.add(() => {
      this.revive();
    }, this);
  }
  /*addShield () {
    if (!this.isShielded) {
      this.shield = this.game.add.sprite(this.centerX, this.centerY, 'player_shield');
      this.game.physics.enable(this.shield, Phaser.Physics.ARCADE);
      this.shield.anchor.setTo(0.5);
      this.isShielded = true;
      let tween = this.game.add.tween(this.shield).to({alpha: 0}, 3000, null, false, 0, 0, false);
      tween.onComplete.add(() => {
        this.isShielded = false;
      }, this);
      tween.start();
    }
  }*/
}

export default Player;
