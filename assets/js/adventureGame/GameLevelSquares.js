// To build GameLevels, each contains GameObjects from below imports
import GameObject from './GameObject.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';

// Complete implementation with all required methods
class GameLevelSquares extends GameObject {
  constructor(gameEnv) {
    let path = gameEnv.path;
    let height = gameEnv.innerHeight;

    this.classes = [      
      { class: GameEnvBackground, data: {src:  path + "/images/platformer/backgrounds/mountains.jpg"} }, // zIndex default is 0
      { class: Background, data: {src:  path + "/images/platformer/backgrounds/hills.png", zIndex: 1 } },
      { class: BackgroundParallax, data: {src:  path + "/images/platformer/backgrounds/snowfall.png", zIndex: 2 } },
      { class: Player, data: {id: "player1", zIndex: 3} }, // wasd is default
      { class: Player, data: {
        id: "player2", 
        zIndex: 3,
        fillStyle: "blue", 
        INIT_POSITION: { x: 0, y: height/2 }, 
        keypress: {up: 73, left: 74, down: 75, right: 76 }} // Using IJKL
      }
    ];
  }
}

export default GameLevelSquares;
