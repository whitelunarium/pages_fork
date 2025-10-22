// To build GameLevels, each contains GameObjects from below imports
import GamEnvBackground from '/assets/js/adventureGame/GameEngine/GameEnvBackground.js';
import Player from '/assets/js/adventureGame/GameEngine/Player.js';
import Npc from '/assets/js/adventureGame/GameEngine/Npc.js';
import GameControl from '/assets/js/adventureGame/GameEngine/GameControl.js';

class GameLevelHomePage {
  constructor(gameEnv) {
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const path = gameEnv.path; // <-- fix this to whatever your engine exposes

    // Background data
    const image_src_desert = path + "/images/digital-famine/galaxy.jpg";
    const image_data_desert = {
      name: 'galaxy',
      greeting: "Welcome to the Galaxy!  This will be the start of your adventure in saving the Earth",
      src: image_src_desert,
      pixels: { height: 580, width: 1038 }
    };

    // Player data for Rocketship (left/right flames)
const leftFlame  = path + "/images/digital-famine/rocketship-left-no-bg.png";
const rightFlame = path + "/images/digital-famine/rocketship-right-no-bg.png";

const CHILLGUY_SCALE_FACTOR = 4; // keeping your name & value
const sprite_data_chillguy = {
  id: 'Rocketship',
  greeting: "This is the rocket ship that will accompany through the adventure of saving the earth",
  src: leftFlame,

  // keep the same names:
  SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
  STEP_FACTOR: 1000,
  ANIMATION_RATE: 50,

  // Use the real image frame as a single frame (no spritesheet cropping)
  pixels: { height: 681, width: 346 },

    orientation: { rows: 1, columns: 1 },

        down:      { row: 0, start: 0, columns: 1, rotate: Math.PI },                 // S
      downRight: { row: 0, start: 0, columns: 1, rotate: Math.PI + Math.PI / 16 },   // S + D
      downLeft:  { row: 0, start: 0, columns: 1, rotate: Math.PI - Math.PI / 16 },   // S + A

      left:      { row: 0, start: 0, columns: 1, rotate: -Math.PI / 24 },           // A
      right:     { row: 0, start: 0, columns: 1, rotate: +Math.PI / 24 },           // D

      up:        { row: 0, start: 0, columns: 1 },                                   // W
      upLeft:    { row: 0, start: 0, columns: 1, rotate: -Math.PI / 16 },            // W + A
      upRight:   { row: 0, start: 0, columns: 1, rotate: +Math.PI / 16 },   
  
    INIT_POSITION: { 
    x: 0, 
    y: height - (681 / CHILLGUY_SCALE_FACTOR) 
  },

  hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
  keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
};

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
    ];
  }
}

export default GameLevelHomePage;