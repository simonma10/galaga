import Phaser from 'phaser-ce';

class WinState extends Phaser.State {
  preload () {
  }
  create () {
    let center = {x: this.game.world.centerX, y: this.game.world.centerY}
    let text = this.game.add.text(center.x, center.y, 'You Win!');
    text.anchor.setTo(0.5);
  }
}

export default WinState;
