import Phaser from 'phaser-ce';
import Player from '../prefabs/player';
import Missiles from '../prefabs/Missiles';
import Enemy from '../prefabs/enemy';
import ScoreBoard from '../prefabs/scoreBoard';

import { IN_TOP_LEFT, IN_TOP_RIGHT } from '../prefabs/formations';

class GameState extends Phaser.State{
  preload () {
    // NB All assets should be loaded in LoadState.js!!!
  }
  init () {
    this.center = {x: this.game.world.centerX, y: this.game.world.centerY}
    this.bulletTime = 0;
    this.score = 0;
    this.firingTimer = 0;
    this.livingEnemies = [];
  }

  create () {
    // Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Starfield
    this.starfield = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.stage.height, 'starfield');
    this.starfield.scale.setTo(1);

    // Player sprite
    this.player = new Player(this.game, this.center.x, this.game.world.height - 80, 'player', 300);

    //  Player bullet group
    this.bullets = new Missiles(this.game, 'player_bullet', 0.6, 30);

    // Enemy bullet group
    this.enemyBullets = new Missiles(this.game, 'enemy_bullet', 0.5, 30);

    // Enemy sprite group
    this.aliens = this.game.add.group();
    this.aliens.enableBody = true;
    this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
    this.createAliens();

    //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(30, 'explode');
    this.explosions.forEach(this.setupInvader, this);

    //  The score
    this.scoreString = 'Score : ';
    // this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });
    this.scoreBoard = new ScoreBoard(this.game);

    //  Lives
    this.lives = this.game.add.group();
    // this.game.add.text(this.game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    for (let i = 0; i < 3; i++) {
      let ship = this.lives.create(24 + (36 * i), this.game.world.height - 24, 'player');
      console.log(ship.position);
      ship.anchor.setTo(0.5, 0.5);
      // ship.angle = 90;
      ship.scale.setTo(0.3);
      ship.alpha = 0.6;
    }

    //  State Text: used for Game over messages etc
    this.stateText = this.game.add.text(this.center.x, this.center.y,' ', { font: '84px Arial', fill: '#fff' });
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;

    // Input keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shieldButton = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
  }

  update () {
    // Move the starfield
    this.starfield.tilePosition.y += 2;

    if (this.player.alive) {
      //  Reset the player
      this.player.body.velocity.setTo(0, 0);
      // Check for movement keys
      if (this.cursors.left.isDown) {
        this.player.moveLeft();
      } else if (this.cursors.right.isDown) {
        this.player.moveRight();
      } else if (this.cursors.up.isDown) {
        this.player.moveUp();
      } else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }
      if (this.shieldButton.isDown) {
        this.player.addShield();
      }
      //  Firing?
      if (this.fireButton.isDown) {
        this.fireBullet();
      }

      if (this.game.time.now > this.firingTimer) {
        this.enemyFires();
      }

      //  Run collision
      if (this.player.isShielded) {
        this.game.physics.arcade.overlap(this.enemyBullets, this.player.shield, this.enemyHitsShield, null, this);
      }
      this.game.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);

      this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
    }
  }

  fireBullet () {
      //  To avoid them being allowed to fire too fast we set a time limit
      if (this.game.time.now > this.bulletTime) {
        //  Grab the first bullet we can from the pool
        let bullet = this.bullets.getFirstExists(false);
        if (bullet) {
          //  And fire it
          bullet.reset(this.player.x + 2, this.player.y + 8);
          bullet.body.velocity.y = -400;
          this.bulletTime = this.game.time.now + 200;
        }
      }
  }

  addAlien (x0, y0, x, y, key, formation) {
    let w = this.game.width;
    let h = this.game.height;
    //let alien = new Enemy(this.game, x0 + (x * 48), y0 + (y * 50), key, formation);
    let alien = new Enemy(this.game, (w / 2) - 50 + (x * 50), 50 * y, key, formation);
    this.aliens.add(alien);
    let tween = this.game.add.tween(alien).to({x: alien.points.x, y: alien.points.y}, 2000, null, false, 0, 0, false);
    tween.interpolation(Phaser.Math.bezierInterpolation);
    tween.onComplete.add(() => {
      console.log('tween complete');
    });
    tween.start();
    // alien.body.moves = false;
  }

  createAliens () {

    for (let y = 1; y < 3; y++) {
      for (let x = 1; x < 3; x++) {
        let delay = (0.2 * y) + (0.1 * x);
        this.game.time.events.add(Phaser.Timer.SECOND * delay, this.addAlien, this, 50, 100, x, y, 'enemy_a', IN_TOP_LEFT);
      }
    }
    for (let y = 3; y < 5; y++) {
      for (let x = 1; x < 3; x++) {
        let delay = (0.2 * y) + (0.1 * x);
        this.game.time.events.add(Phaser.Timer.SECOND * delay, this.addAlien, this, 800, 100, x, y, 'enemy_b', IN_TOP_RIGHT);
      }
    }

    //this.aliens.x = this.game.width / 2 - 50;
    //this.aliens.y = 50;

    //this.game.add.tween(this.aliens).to({ x: this.game.width - 100 }, 500 );

    /*//  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    let tween = this.game.add.tween(this.aliens).to({ x: 50 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, true).loop();

    //  When the tween loops it calls descend
    tween.onLoop.add(this.descend, this);
    tween.start();*/
  }

  descend () {
    this.aliens.y += 10;
  }

  setupInvader (invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('anim_explode');
  }

  collisionHandler (bullet, alien) {
  //  When a bullet hits an alien we kill them both
  bullet.kill();
  alien.kill();
  //  Increase the score
  this.score += 20;
  this.scoreBoard.display(this.score);

  //  And create an explosion :)
  let explosion = this.explosions.getFirstExists(false);
  explosion.reset(alien.body.x, alien.body.y);
  explosion.play('anim_explode', 30, false, true);

  if (this.aliens.countLiving() === 0) {
    this.score += 1000;
     this.scoreBoard.display(this.score);

    this.enemyBullets.callAll('kill',this);
    this.stateText.text = " You Won, \n Click to restart";
    this.stateText.visible = true;

    // the "click to restart" handler
    this.game.input.onTap.addOnce(this.restart, this);
  }
}

  enemyHitsPlayer (bullet) {
    bullet.kill();
    if (!this.player.isShielded) {
      let live = this.lives.getFirstAlive();
      if (live) {
        live.kill();
      }
      //  And create an explosion :)
      this.player.explode();

      // When the player dies
      if (this.lives.countLiving() < 1) {
        this.player.kill();
        this.enemyBullets.callAll('kill');

        this.stateText.text = 'GAME OVER \n Click to restart';
        this.stateText.visible = true;

        // the "click to restart" handler
        this.game.input.onTap.addOnce(this.restart, this);
      }
    }
  }

  enemyHitsShield (bullet) {
    console.log('enemyHitsShield');
    bullet.kill();
    this.player.isShielded = false;
  }

  enemyFires () {
    //  Grab the first bullet we can from the pool
    let enemyBullet = this.enemyBullets.getFirstExists(false);
    this.livingEnemies.length = 0;
    this.aliens.forEachAlive((alien) => {
      // put every living enemy in an array
      this.livingEnemies.push(alien);
    });
    if (enemyBullet && this.livingEnemies.length > 0) {
      let random = this.game.rnd.integerInRange(0, this.livingEnemies.length - 1);

      // randomly select one of them
      let shooter = this.livingEnemies[random];
      // And fire the bullet from this enemy
      enemyBullet.reset(shooter.body.x + shooter.width / 2, shooter.body.y);

      enemyBullet.body.velocity.y = 200;
      //this.game.physics.arcade.moveToObject(enemyBullet, this.player, 120);
      this.firingTimer = this.game.time.now + 2000;
    }
  }

  restart () {
    //  A new level starts

    // resets the life count
    this.lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    this.aliens.removeAll();
    this.createAliens();

    // revives the player
    this.player.revive();
    // hides the text
    this.stateText.visible = false;
  }
}

export default GameState;
