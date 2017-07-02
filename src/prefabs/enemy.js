import Phaser from 'phaser-ce';
import { IN_TOP_LEFT, IN_TOP_RIGHT } from './formations';

class Enemy extends Phaser.Sprite {
  constructor (game, x, y, key, entryFormation, attackFormation) {

    super(game, -100, -100, key);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3);

    this.body.collideWorldBounds = true;
    this.game.stage.addChild(this);
    this.points = this.getEntryFormationPoints(entryFormation, x, y);

    /*this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();
    this.plot();*/
  }

  getEntryFormationPoints (entryFormation, x, y) {
    let w = this.game.width;
    let h = this.game.height;

    switch (entryFormation) {
      case IN_TOP_LEFT:
        this.x = 0;
        this.y = 0;
        return {
          'x': [32, w / 2, w / 2, 32, 32, x],
          'y': [-32, h * 0.6, h * 0.9, h * 0.9, h * 0.6, y]
        };

      case IN_TOP_RIGHT:
        this.x = this.game.width;
        this.y = 0;
        return {
          'x': [w - 32, w / 2, w / 2, w - 32, w - 32, x],
          'y': [-32, h * 0.6, h * 0.9, h * 0.9, h * 0.6, y]
        };

      default:
        return {
          'x': [32, 240, 240, 32, 32, 240],
          'y': [-32, 360, 480, 480, 360, 32]
        };
    }
  }

  plot () {
    this.bmd.clear();

    this.path = [];

    let ix = 0;
    let x = 1 / this.game.width;

    for (let i = 0; i <= 1; i += x) {

      let px = Phaser.Math.bezierInterpolation(this.points.x, i);
      let py = Phaser.Math.bezierInterpolation(this.points.y, i);

      let node = {x: px, y: py, angle: 0};

      if (ix > 0) {
        node.angle = Phaser.Math.angleBetweenPoints(this.path[ix - 1], node);
      }

      this.path.push(node);

      ix++;

      this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
    }

    for (let p = 0; p < this.points.x.length; p++) {
      this.bmd.rect(this.points.x[p] - 3, this.points.y[p] - 3, 6, 6, 'rgba(255, 0, 0, 1)');
    }
  }

}

export default Enemy;
