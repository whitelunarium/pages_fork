import GameEnvBackground from './GameEnvBackground.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';
import Quiz from './Quiz.js';
import GameLevelRetro from './GameLevelRetro.js';
class GameLevelSiliconValley {
  /**
   * Properties and methods to define a game level
   * @param {*} gameEnv - The active game environment
   */
  constructor(gameEnv) {
    // Dependencies to support game level creation
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_siliconvalley = path + "/images/gamify/siliconvalley.png"; // be sure to include the path
    const image_data_siliconvalley = {
        name: 'Silicon Valley',
        greeting: "Welcome to Silicon Valley!  It is bustling and vast so enjoy your stay!",
        src: image_src_siliconvalley,
        pixels: {height: 1024, width: 1024}
    };

    const sprite_src_chillguy = path + "/images/gamify/chillguy.png"; // be sure to include the path
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 1, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    const sprite_src_robot = path + "/images/gamify/robot.png"; // be sure to include the path
    const sprite_greet_robot = "Hi I am Robot, the Jupyter Notebook mascot.  I am very happy to spend some linux shell time with you!";
    const sprite_data_robot = {
      id: 'Robot',
      greeting: sprite_greet_robot,
      src: sprite_src_robot,
      SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: {height: 316, width: 627},
      INIT_POSITION: { x: (width * 3 / 4), y: (height * 1 / 4)},
      orientation: {rows: 3, columns: 6 },
      down: {row: 1, start: 0, columns: 6 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(sprite_greet_robot);
      },

      interact: function() {
        // Set a primary game reference from the game environment
        let primaryGame = gameEnv.gameControl;
        // Define the game in game level
        let levelArray = [GameLevelRetro];
        // Define a new GameControl instance with the StarWars level
        let gameInGame = new GameControl(gameEnv.game, levelArray);
        // Pause the primary game 
        primaryGame.pause();
        // Start the game in game
        gameInGame.start();
        // Setup "callback" function to allow transition from game in gaame to the underlying game
        gameInGame.gameOver = function() {
          // Call .resume on primary game
          primaryGame.resume();
        }
      }
    }


    const sprite_src_fidelity = path + "/images/gamify/fidelity.png"; // be sure to include the path
    const sprite_greet_fidelity = "Hi I'm Fidelity! Lets tackle some finance and tech questions!";
    const sprite_data_fidelity = {
      id: 'Fidelity',
      greeting: sprite_greet_fidelity,
      src: sprite_src_fidelity,
      SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 50,
      pixels: {height: 512, width: 512},
      INIT_POSITION: { x: (width * 1 / 4), y: (height * 1 / 4)},
      orientation: {rows: 1, columns: 1 },
      down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

      reaction: function() {
        alert(sprite_greet_fidelity.id);
      },

      interact: function() {
        let quiz = new Quiz(); 
        quiz.initialize();
        quiz.openPanel(sprite_data_fidelity);
      }
    }
    const sprite_src_schwab = path + "/images/gamify/schwab.png"; // be sure to include the path
    const sprite_greet_schwab = "Hi I'm schwab! Lets tackle some finance and tech questions!";
    const sprite_data_schwab = {
      id: 'Schwab',
      greeting: sprite_greet_schwab,
      src: sprite_src_schwab,
      SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 50,
      pixels: {height: 2048, width: 2048},
      INIT_POSITION: { x: (width / 2), y: (height / 5)},
      orientation: {rows: 1, columns: 1 },
      down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

      reaction: function() {
        alert(sprite_greet_schwab);
      },

      interact: function() {
        let quiz = new Quiz(); 
        quiz.initialize();
        quiz.openPanel(sprite_data_schwab.id);
      }
    }


    // List of classes and supporting definitions to create the game level
    this.classes = [
      { class: GameEnvBackground, data: image_data_siliconvalley },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_robot },
      { class: Npc, data: sprite_data_fidelity },
      { class: Npc, data: sprite_data_schwab },
    ];
  }
}

export default GameLevelSiliconValley;