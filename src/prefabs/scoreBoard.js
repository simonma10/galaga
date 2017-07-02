import Phaser from 'phaser-ce';

export const TOP_LEFT = 'topLeft';
export const TOP_RIGHT = 'topRight';
export const BOTTOM_LEFT = 'bottomLeft';
export const BOTTOM_RIGHT = 'bottomRight';

class ScoreBoard extends Phaser.Group {
  constructor (game, numDigits = 7, position = TOP_LEFT) {
    super(game);
    game.add.group(this);
    this.numDigits = numDigits;
    this.location = position;

    this.sprites = [];
    for (let i = 0; i < 10; i++){
      this.sprites.push(new Phaser.Sprite(game, -100, -100, i.toString() ));

    }
    this.spriteWidth = this.sprites[0].width;
    this.initBoard();
  }

  initBoard () {
    switch (this.location){
      case TOP_LEFT:
        this.x = 12;
        this.y = 12;
        break;
      default:
        this.x = 32;
        this.y = 32;
    }
    for (let i = 0; i < this.numDigits; i++){
      this.create(this.x + (i * this.spriteWidth), this.y, this.sprites[0].texture);
    }
  }

  display (score) {
    let scoreStr = score.toString();
    if (scoreStr.length < this.numDigits){
      let pre = '0'.repeat(this.numDigits - scoreStr.length);
      scoreStr = pre.concat(scoreStr);
    }
    this.removeAll(true, false, false);
    for (let i = 0; i < scoreStr.length; i++){
      this.create(this.x + (i * this.spriteWidth), this.y, scoreStr[i]);
    }

  }
}

export default ScoreBoard;
