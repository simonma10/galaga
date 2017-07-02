import Phaser from 'phaser-ce';

class GameState extends Phaser.State {
  preload () {
    this.game.load.spritesheet('explode', '../../static/fx/explode.png', 128, 128);
    this.game.load.image('bar_load', '../../static/ui/bar_loading.png');
    this.game.load.image('bar_load_mask', '../../static/ui/bar_loading_mask.png');
    this.game.load.image('starfield-9', '../../static/backgrounds/Star-field-9.jpg');
    this.game.load.image('starfield', '../../static/backgrounds/black.png');
    this.game.load.image('player', '../../static/player/playerShip2_red.png');
    this.game.load.image('player_bullet', '../../static/player/bullet.png');
    this.game.load.image('player_shield', '../../static/player/shield2.png');
    this.game.load.image('ship_lives', '../../static/player/player.png');
    this.game.load.image('enemy_a', '../../static/enemies/enemyRed1.png');
    this.game.load.image('enemy_b', '../../static/enemies/enemyBlue2.png');
    this.game.load.image('enemy_c', '../../static/enemies/enemyGreen3.png');
    this.game.load.image('enemy_d', '../../static/enemies/enemyBlack5.png');
    this.game.load.image('enemy_e', '../../static/enemies/enemyRed4.png');
    this.game.load.image('enemy_bullet', '../../static/projectiles/laserRed03.png');

    this.game.load.image('0', '../../static/ui/numeral0.png');
    this.game.load.image('1', '../../static/ui/numeral1.png');
    this.game.load.image('2', '../../static/ui/numeral2.png');
    this.game.load.image('3', '../../static/ui/numeral3.png');
    this.game.load.image('4', '../../static/ui/numeral4.png');
    this.game.load.image('5', '../../static/ui/numeral5.png');
    this.game.load.image('6', '../../static/ui/numeral6.png');
    this.game.load.image('7', '../../static/ui/numeral7.png');
    this.game.load.image('8', '../../static/ui/numeral8.png');
    this.game.load.image('9', '../../static/ui/numeral9.png');

  }

  create () {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    this.game.stage.backgroundColor = '#1B1B1B';
    let text = this.game.add.text(center.x, center.y -200, '...');
    text.anchor.setTo(0.5);
    text.font = 'Revalia';
    text.fontSize = 40;
    let grd = text.context.createLinearGradient(0, 0, 0, 100);
    // let grd = text.context.createLinearGradient(0, 0, text.canvas.width, text.canvas.height);
    // grd.addColorStop(0, '#FFFFFF');
    grd.addColorStop(0, '#22FCFF');
    // grd.addColorStop(1, '#8ED6FF');
    // grd.addColorStop(1, '#004CB3');
    grd.addColorStop(1, '#002289');
    text.fill = grd;
    text.text = 'Loading';

    let barLoad = this.game.add.sprite(center.x - 307, center.y, 'bar_load');
    barLoad.anchor.setTo(0.5);
    let barMove = this.game.add.tween(barLoad);
    barMove.to({x: center.x, y: center.y}, 200, null, false, 100, 0, false);
    barMove.onComplete.add(function () {
      this.game.state.start('GameState');
    }, this);

    let barLoadMask = this.game.add.sprite(center.x - 307, center.y, 'bar_load_mask');
    barLoadMask.anchor.setTo(0.5);
    barMove.start();
  }
}

export default GameState;
