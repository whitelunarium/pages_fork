// To build GameLevels, each contains GameObjects from below imports
import GamEnvBackground from '/assets/js/adventureGame/GameEngine/GameEnvBackground.js';
import Player from '/assets/js/adventureGame/GameEngine/Player.js';
import Npc from '/assets/js/adventureGame/GameEngine/Npc.js';
import GameControl from '/assets/js/adventureGame/GameEngine/GameControl.js';
import DialogueSystem from '/assets/js/adventureGame/DialogueSystem.js';

class GameLevelHomePage {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    this.dialogueSystem = new DialogueSystem();
    // Background data
    const image_src_desert = path + "/images/digital-famine/galaxy.jpg"; // be sure to include the path
    const image_data_desert = {
        name: 'desert',
        greeting: "Welcome to the desert!  It is hot and dry here, but there are many adventures to be had!",
        src: image_src_desert,
        pixels: {height: 580, width: 1038}
    };

    // Player data for Chillguy
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

    //End Ship
    const sprite_src_cyberplanet = path + "/images/digital-famine/planet-3.png";
    const sprite_greet_cyberplanet = "Go To Cyber Planet";

    // Store a reference to the dialogueSystem for use in sprite data
    const dialogueSystem = this.dialogueSystem;

    const sprite_data_cyberplanet = {
        id: 'CyberPlanet',
        greeting: sprite_greet_cyberplanet,
        src: sprite_src_cyberplanet,
        SCALE_FACTOR: 5,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width / 2), y: (height / 2) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,  // Same z-index as player
        dialogues: [
          "Press E to travel or close"
        ],
        reaction: function() {
          //silent reaction for interaction to work
        },
        interact: function() {
          dialogueSystem.showDialogue("Press E to travel or click close to cancel"); // Show specific dialogue
          // Add event listener for 'e' key press during interaction
          const handleKeyPress = (event) => {
            if (event.key.toLowerCase() === 'e') {
              // Remove the event listener to prevent multiple bindings
              document.removeEventListener('keydown', handleKeyPress);
              
              // Redirect to the specified URL
              window.location.href = '/digital-famine/';
            }
          };
          
          // Add the event listener
          document.addEventListener('keydown', handleKeyPress);
          
          // Optional: Remove the event listener after a timeout to prevent it from staying active indefinitely
          setTimeout(() => {
            document.removeEventListener('keydown', handleKeyPress);
          }, 10000); // Remove after 10 seconds
        }
    };

    // List of objects defnitions for this level
    this.classes = [
      { class: GamEnvBackground, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_cyberplanet },
    ];
  }
}

export default GameLevelHomePage;