import GamEnvBackground from './GameEnvBackground.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelSiliconValley from './GameLevelSiliconValley.js';
import HelpPanel from './HelpPanel.js'; // Your custom HelpPanel logic

class GameLevelAirport {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    const image_src_desert = path + "/images/gamify/airport.jpg";
    const image_data_desert = {
        id: 'Airport-Background',
        src: image_src_desert,
        pixels: {height: 580, width: 386}
    };

    const sprite_src_chillguy = path + "/images/gamify/chillguy.png";
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height / CHILLGUY_SCALE_FACTOR) },
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4},
        down: {row: 0, start: 0, columns: 3},
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI / 16},
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI / 16},
        left: {row: 2, start: 0, columns: 3},
        right: {row: 1, start: 0, columns: 3},
        up: {row: 3, start: 0, columns: 3},
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI / 16},
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI / 16},
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    const sprite_src_pilot = path + "/images/gamify/pilot.png";
    const sprite_data_pilot = {
        id: 'Pilot',
        greeting: "Greetings passenger! Ready to travel to Silicon Valley?",
        src: sprite_src_pilot,
        SCALE_FACTOR: 5,
        ANIMATION_RATE: 50,
        pixels: {height: 460, width: 422},
        INIT_POSITION: { x: width / 10, y: height * 0.2 },
        orientation: {rows: 1, columns: 1},
        down: {row: 0, start: 0, columns: 1},
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
        reaction: () => {
          alert(sprite_data_pilot.greeting);
        },
        interact: () => {
          let primaryGame = gameEnv.gameControl;
          let levelArray = [GameLevelSiliconValley];
          let gameInGame = new GameControl(gameEnv.game, levelArray);
          primaryGame.pause();
          gameInGame.start();
          gameInGame.gameOver = function () {
            primaryGame.resume();
          };
        }
    };

    const sprite_src_worker = path + "/images/gamify/worker.png";
    const sprite_data_worker = {
        id: 'Worker',
        greeting: "Hey! You look like you're a chill guy! The plane on the runway leaves to Silicon Valley soon. Better catch it! Press 'E' when you talk to the pilot and other people you meet. Safe travels!",
        src: sprite_src_worker,
        SCALE_FACTOR: 3.5,
        ANIMATION_RATE: 50,
        pixels: {height: 400, width: 400},
        INIT_POSITION: { x: width * 0.6, y: height * 0.7 },
        orientation: {rows: 1, columns: 1},
        down: {row: 0, start: 0, columns: 1},
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
        reaction: () => {
            alert(sprite_data_worker.greeting);
        },
        interact: () => {
            const panel = document.getElementById('worker-instructions-panel');
            if (panel) panel.style.display = 'block';
        }
    };

    const sprite_src_helpicon = path + "/images/gamify/helpbutton.png";
    const sprite_data_helpicon = {
        id: 'HelpIcon',
        greeting: "",
        src: sprite_src_helpicon,
        SCALE_FACTOR: 14,
        ANIMATION_RATE: 50,
        pixels: { height: 201, width: 158 },
        INIT_POSITION: { x: width * 0.01, y: height * 0.91 },
        orientation: { rows: 1, columns: 1 },
        down: { row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0, heightPercentage: 0 },
        interact: () => {
            HelpPanel.toggle();
        }
    };

    this.classes = [
      { class: GamEnvBackground, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_pilot },
      { class: Npc, data: sprite_data_worker },
      { class: Npc, data: sprite_data_helpicon }
    ];

    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        HelpPanel.toggle();
      }
    });
  }
}

export default GameLevelAirport;
