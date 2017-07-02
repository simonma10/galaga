import Phaser from 'phaser-ce';

class HomeState extends Phaser.State {
  preload () {

  }

  create () {
    let center = {x: this.game.world.centerX, y: this.game.world.centerY}

    this.starfield = this.game.add.tileSprite(0, 0, this.game.stage.width * 2, this.game.stage.height * 2, 'starfield-9');
    this.starfield.scale.setTo(0.5);

    let text = this.game.add.text(center.x, center.y -200, '...');
    text.anchor.setTo(0.5);
    text.font = 'Revalia';
    text.fontSize = 80;
    let grd = text.context.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, '#22FCFF');
    grd.addColorStop(1, '#002289');
    text.fill = grd;
    text.stroke = '#8ED6FF';
    text.strokeThickness = 2;
    text.setShadow(2, 2, 'rgba(255,255,255,0.5)', 2, true, false);
    text.text = 'Galaga';

    let textInstr = this.game.add.text(center.x, center.y + 200, 'Cursor keys to move\nSpace to fire\nShield: C\nAny key to start');
    textInstr.anchor.setTo(0.5);
    textInstr.font = 'Revalia';
    textInstr.fontSize = 32;
    textInstr.align = 'center';
    grd = textInstr.context.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, '#22FCFF');
    grd.addColorStop(1, '#002289');
    textInstr.fill = grd;

    /*let textReflect = this.game.add.text(center.x, center.y - 130, 'Galaga');
    textReflect.anchor.setTo(0.5);
    textReflect.scale.y = -1;
    textReflect.font = 'Revalia';
    textReflect.fontSize = 80;
    grd = textReflect.context.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(1, 'rgba(255,255,255,0.08)');
    textReflect.fill = grd;*/

    /*let explosion = this.game.add.sprite(center.x, center.y, 'explosion');
    explosion.scale.setTo(0.5);
    explosion.animations.add('explode');
    explosion.animations.play('explode', 24, true);

    let fire = this.game.add.sprite(center.x - 200, center.y, 'fire');
    fire.animations.add('explode');
    fire.animations.play('explode', 24, true);
*/
    let explode = this.game.add.sprite(center.x + 200, center.y, 'explode');
    explode.scale.setTo(0.5);
    explode.animations.add('explode');
    explode.animations.play('explode', 24, true);

    this.game.input.keyboard.onDownCallback = () => {
      this.game.input.keyboard.onDownCallback = null;
      this.game.state.start('GameState', true, false)
    }
  }
}

export default HomeState;
