// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';

// Minimal Definition
class GameLevelSquares {
  constructor(path) {
    this.classes = [      
      { class: Background, data: {} },
      { class: Player, data: {} }, 
    ];
  }
}

export default GameLevelSquares;