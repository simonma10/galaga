import Phaser from 'phaser-ce';

import LoadState from './states/LoadState';
import GameState from './states/GameState';
import HomeState from './states/HomeState';
import WinState from './states/WinState';

class Game extends Phaser.Game {
    constructor () {
      super(1024, 800, Phaser.AUTO, 'content', null)

      this.state.add('LoadState', LoadState, false);
      this.state.add('HomeState', HomeState, false);
      this.state.add('GameState', GameState, false);
      this.state.add('WinState', WinState, false);
      this.state.start('LoadState');
    }
}

new Game();
