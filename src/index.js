import GameState from 'states/GameState';

class Game extends Phaser.Game {

    constructor() {
        //TODO: take config object as input
        super(500, 500, Phaser.AUTO, 'content', null);
        this.state.add('GameState', GameState, false);
        this.state.start('GameState');
    }

}

new Game();