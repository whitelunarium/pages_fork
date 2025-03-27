import GameEnvBackground from './GameEnvBackground.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';

import GameLevelMeteorBlaster from './GameLevelMeteorBlaster.js';

class GameLevelUniverse {
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
    const image_src_universe = path + "/images/gamify/siliconvalley.jpg"; // be sure to include the path
    const image_data_universe = {
        name: 'universe',
        greeting: "Welcome to the universe!  It is bustling and vast so enjoy your stay!",
        src: image_src_universe,
        pixels: {height: 1024, width: 1024}
    };

    // Player Data for Octopus
    const sprite_src_octopus = path + "/images/gamify/octopus.png"; // be sure to include the path
    const OCTOPUS_SCALE_FACTOR = 5;
    const sprite_data_octopus = {
        id: 'Octopus',
        greeting: "Hi I am Octopus, the water wanderer. I am looking for wisdome and adventure!",
        src: sprite_src_octopus,
        SCALE_FACTOR: OCTOPUS_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/OCTOPUS_SCALE_FACTOR) }, 
        pixels: {height: 250, width: 167},
        orientation: {rows: 3, columns: 2 },
        down: {row: 0, start: 0, columns: 2 },
        downLeft: {row: 0, start: 0, columns: 2, mirror: true, rotate: Math.Pi/16 }, // mirror is used to flip the sprite
        downRight: {row: 0, start: 0, columns: 2, rotate: -Math.Pi/16 },
        left: {row: 1, start: 0, columns: 2, mirror: true }, // mirror is used to flip the sprite
        right: {row: 1, start: 0, columns: 2 },
        up: {row: 0, start: 0, columns: 2},
        upLeft: {row: 1, start: 0, columns: 2, mirror: true, rotate: -Math.Pi/16 }, // mirror is used to flip the sprite
        upRight: {row: 1, start: 0, columns: 2, rotate: Math.Pi/16 },
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
      // Linux command quiz

      quiz: { 
        title: "Jupyter Notebook Command Quiz",
        questions: [
          "Which shortcut is used to run a cell in Jupyter Notebook?\n1. Shift + Enter\n2. Ctrl + Enter\n3. Alt + Enter\n4. Tab + Enter",
          "Which shortcut adds a new cell above the current cell?\n1. A\n2. B\n3. C\n4. D",
          "Which shortcut adds a new cell below the current cell?\n1. B\n2. A\n3. C\n4. D",
          "Which shortcut changes a cell to Markdown format?\n1. M\n2. Y\n3. R\n4. K",
          "Which shortcut changes a cell to Code format?\n1. Y\n2. M\n3. C\n4. D",
          "Which shortcut deletes the current cell?\n1. D, D\n2. X\n3. Del\n4. Ctrl + D",
          "Which shortcut saves the current notebook?\n1. Ctrl + S\n2. Alt + S\n3. Shift + S\n4. Tab + S",
          "Which shortcut restarts the kernel?\n1. 0, 0\n2. R, R\n3. K, K\n4. Shift + R",
          "Which shortcut interrupts the kernel?\n1. I, I\n2. Ctrl + C\n3. Shift + I\n4. Alt + I",
          "Which shortcut toggles line numbers in a cell?\n1. L\n2. N\n3. T\n4. G"
        ] 
      },
      reaction: function() {
        alert(sprite_greet_robot);
      },

      interact: function() {
        // Set a primary game reference from the game environment
        let primaryGame = gameEnv.gameControl;
        // Define the game in game level
        let levelArray = [GameLevelMeteorBlaster];
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


    const sprite_src_wizard = path + "/images/gamify/robot.png"; // be sure to include the path
    const sprite_greet_wizard = "Hi I am Robot, the Jupyter Notebook mascot.  I am very happy to spend some linux shell time with you!";
    const sprite_data_wizard = {
      id: 'Robot',
      greeting: sprite_greet_wizard,
      src: sprite_src_wizard,
      SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: {height: 316, width: 627},
      INIT_POSITION: { x: (width * 3 / 4), y: (height * 1 / 4)},
      orientation: {rows: 3, columns: 6 },
      down: {row: 1, start: 0, columns: 6 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      // Linux command quiz

      quiz: { 
        title: "Jupyter Notebook Command Quiz",
        questions: [
          "Which shortcut is used to run a cell in Jupyter Notebook?\n1. Shift + Enter\n2. Ctrl + Enter\n3. Alt + Enter\n4. Tab + Enter",
          "Which shortcut adds a new cell above the current cell?\n1. A\n2. B\n3. C\n4. D",
          "Which shortcut adds a new cell below the current cell?\n1. B\n2. A\n3. C\n4. D",
          "Which shortcut changes a cell to Markdown format?\n1. M\n2. Y\n3. R\n4. K",
          "Which shortcut changes a cell to Code format?\n1. Y\n2. M\n3. C\n4. D",
          "Which shortcut deletes the current cell?\n1. D, D\n2. X\n3. Del\n4. Ctrl + D",
          "Which shortcut saves the current notebook?\n1. Ctrl + S\n2. Alt + S\n3. Shift + S\n4. Tab + S",
          "Which shortcut restarts the kernel?\n1. 0, 0\n2. R, R\n3. K, K\n4. Shift + R",
          "Which shortcut interrupts the kernel?\n1. I, I\n2. Ctrl + C\n3. Shift + I\n4. Alt + I",
          "Which shortcut toggles line numbers in a cell?\n1. L\n2. N\n3. T\n4. G"
        ] 
      },
      reaction: function() {
        alert(sprite_greet_robot);
      },

      interact: function() {
        // Set a primary game reference from the game environment
        let primaryGame = gameEnv.gameControl;
        // Define the game in game level
        let levelArray = [GameLevelMeteorBlaster];
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



    // List of classes and supporting definitions to create the game level
    this.classes = [
      { class: GameEnvBackground, data: image_data_universe },
      { class: Player, data: sprite_data_octopus },
      { class: Npc, data: sprite_data_robot },
      { class: Npc, data: sprite_data_wizard },
    ];
  }
}

export default GameLevelUniverse;