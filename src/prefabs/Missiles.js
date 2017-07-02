import Phaser from 'phaser-ce';

class Missiles extends Phaser.Group {
  constructor (game, key, scale, multiple) {
    super(game);
    game.add.group(this);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(multiple, key);
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 1);
    this.setAll('scale.x', scale);
    this.setAll('scale.y', scale);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
  }
}

export default Missiles;

