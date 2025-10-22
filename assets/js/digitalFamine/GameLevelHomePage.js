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
    const sprite_src_chillguy = path + "/images/digital-famine/rocketship-left-no-bg.png"; // be sure to include the path
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
        INIT_POSITION: { x: (width / 4), y: (height / 4) },
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
              window.location.href = '/digital-famine/media-lit/';
            }
          };
          
          dialogueSystem.showDialogue("Press E to travel to Media Literacy Planet");
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
        INIT_POSITION: { x: (width * 3/4), y: (height / 4) },
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
          
          dialogueSystem.showDialogue("Press E to travel to AI Planet");
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
        INIT_POSITION: { x: (width / 4), y: (height * 3/4) },
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
          
          dialogueSystem.showDialogue("Press E to travel to Microblogging Planet");
          document.addEventListener('keydown', this.activeKeyListener);
        }.bind(this)
    };

    // Home Planet (Earth)
    const sprite_src_home = path + "/images/digital-famine/planet-3.png";
    const sprite_data_home = {
        id: 'HomePlanet',
        greeting: "Return to Home Planet (Earth)",
        src: sprite_src_home,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 3/4), y: (height * 3/4) },
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
              window.location.href = '/digital-famine/home/';
            }
          };
          
          dialogueSystem.showDialogue("Press E to return to Home Planet");
          document.addEventListener('keydown', this.activeKeyListener);
        }.bind(this)
    };

    // List of objects defnitions for this level

    // Define flame image paths
    const leftFlame = path + "/images/digital-famine/rocketship-left-no-bg.png";
    const rightFlame = path + "/images/digital-famine/rocketship-right-no-bg.png";
    
    // Simple flame-flicker toggle (run AFTER sprite_data_chillguy is declared)
    let flameToggle = false;
    setInterval(() => {
      flameToggle = !flameToggle;
      sprite_data_chillguy.src = flameToggle ? leftFlame : rightFlame;
    }, 150);


    // Objects on this level
    this.classes = [
      { class: GamEnvBackground, data: image_data_desert },
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