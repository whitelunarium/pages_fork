// To build GameLevels, each contains GameObjects from below imports
import GameEnvBackground from '/assets/js/adventureGame/GameEngine/GameEnvBackground.js';
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
    
    // Keep track of active key listener
    this.activeKeyListener = null;
    
    // Function to remove any existing key listener
    this.removeExistingKeyListener = () => {
      if (this.activeKeyListener) {
        document.removeEventListener('keydown', this.activeKeyListener);
        this.activeKeyListener = null;
      }
    };
    
    // Watch for dialogue close and clean up listener
    const originalCloseDialogue = this.dialogueSystem.closeDialogue.bind(this.dialogueSystem);
    this.dialogueSystem.closeDialogue = () => {
      this.removeExistingKeyListener();
      originalCloseDialogue();
    };
    
    // Background data
    const image_src_desert = path + "/images/digital-famine/galaxy.jpg"; // be sure to include the path
    const image_data_desert = {
      name: 'galaxy',
      greeting: "Welcome to the Galaxy!  This will be the start of your adventure in saving the Earth",
      src: image_src_desert,
      pixels: { height: 580, width: 1038 }
    };

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/digital-famine/rocketship_sprite_2x1.png"; // be sure to include the path
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 10,
        INIT_POSITION: { x: 0, y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
        pixels: {height: 681, width: 692},
        orientation: {rows: 1, columns: 2},
        pivot: { x: 0.5, y: 0.5 },  // Center the rotation point
        down: {row: 0, start: 0, columns: 2, rotate: Math.PI},
        downRight: {row: 0, start: 0, columns: 2, rotate: 3*Math.PI/4},
        downLeft: {row: 0, start: 0, columns: 2, rotate: 5*Math.PI/4},
        left: {row: 0, start: 0, columns: 2, rotate: 3*Math.PI/2},
        right: {row: 0, start: 0, columns: 2, rotate: Math.PI/2},
        up: {row: 0, start: 0, columns: 2, rotate: 0},
        upLeft: {row: 0, start: 0, columns: 2, rotate: 7*Math.PI/4},
        upRight: {row: 0, start: 0, columns: 2, rotate: Math.PI/4},
        hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
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
        INIT_POSITION: { x: (width * 0.15), y: (height * 0.15) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        dialogues: ["Press E to travel or close"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          
          this.activeKeyListener = (event) => {
            if (event.key.toLowerCase() === 'e' && dialogueSystem.isDialogueOpen()) {
              window.location.href = '/digital-famine/cyber/';
            }
          };
          
          dialogueSystem.showDialogue("Press E to travel or close");
          document.addEventListener('keydown', this.activeKeyListener);
        }.bind(this)
    };

    // Media Lit Planet
    const sprite_src_medialit = path + "/images/digital-famine/planet-1.png";
    const sprite_data_medialit = {
        id: 'MediaLitPlanet',
        greeting: "Travel to Media Literacy Planet",
        src: sprite_src_medialit,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.25), y: (height * 0.75) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        dialogues: ["Press E to travel to Media Literacy Planet"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          
          this.activeKeyListener = (event) => {
            if (event.key.toLowerCase() === 'e' && dialogueSystem.isDialogueOpen()) {
              window.location.href = '/digital-famine/media/';
            }
          };
          
          dialogueSystem.showDialogue("Press E to travel or close");
          document.addEventListener('keydown', this.activeKeyListener);
        }.bind(this)
    };

    // AI Planet
    const sprite_src_ai = path + "/images/digital-famine/planet-2.png";
    const sprite_data_ai = {
        id: 'AIPlanet',
        greeting: "Travel to AI Planet",
        src: sprite_src_ai,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.55), y: (height * 0.25) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        dialogues: ["Press E to travel to AI Planet"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          
          this.activeKeyListener = (event) => {
            if (event.key.toLowerCase() === 'e' && dialogueSystem.isDialogueOpen()) {
              window.location.href = '/digital-famine/ai/';
            }
          };
          
          dialogueSystem.showDialogue("Press E to travel or close");
          document.addEventListener('keydown', this.activeKeyListener);
        }.bind(this)
    };

    // Microblogging Planet
    const sprite_src_microblog = path + "/images/digital-famine/planet-4.png";
    const sprite_data_microblog = {
        id: 'MicroblogPlanet',
        greeting: "Travel to Microblogging Planet",
        src: sprite_src_microblog,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.55), y: (height * 0.75) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        dialogues: ["Press E to travel to Microblogging Planet"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          
          this.activeKeyListener = (event) => {
            if (event.key.toLowerCase() === 'e' && dialogueSystem.isDialogueOpen()) {
              window.location.href = '/digital-famine/microblog/';
            }
          };
          
          dialogueSystem.showDialogue("Press E to travel or close");
          document.addEventListener('keydown', this.activeKeyListener);
        }.bind(this)
    };

    // Home Planet (Earth)
    const sprite_src_home = path + "/images/digital-famine/home-planet.png";
    const sprite_data_home = {
        id: 'HomePlanet',
        greeting: "Return to Home Planet (Earth)",
        src: sprite_src_home,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.82), y: (height * 0.5) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        dialogues: ["Press E to return to Home Planet"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          
          this.activeKeyListener = (event) => {
            if (event.key.toLowerCase() === 'e' && dialogueSystem.isDialogueOpen()) {
              window.location.href = '/digital-famine/end/';
            }
          };
          
          dialogueSystem.showDialogue("Press E to travel or close");
          document.addEventListener('keydown', this.activeKeyListener);
        }.bind(this)
    };

    // Objects on this level
    this.classes = [
      { class: GameEnvBackground, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_cyberplanet },
      { class: Npc, data: sprite_data_medialit },
      { class: Npc, data: sprite_data_ai },
      { class: Npc, data: sprite_data_microblog },
      { class: Npc, data: sprite_data_home },
    ];
  }
}

export default GameLevelHomePage;
