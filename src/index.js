import Phaser from 'phaser-ce';
import GameState from './states/GameState';


class Game extends Phaser.Game {
    constructor() {
        super(500, 500, Phaser.AUTO, 'content', null)
        // TODO: take config object as input
        this.state.add('GameState', GameState, false);
        this.state.start('GameState');
    }
}

new Game();
