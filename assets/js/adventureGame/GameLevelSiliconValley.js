import GameEnvBackground from './GameEnvBackground.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';
import Quiz from './Quiz.js';
import GameLevelRetro from './GameLevelRetro.js';
import GameLevelFinancialLiteracy from './GameLevelFinancialLiteracy.js';
import Game from './Game.js';
import StockMoodModal from './StockMoodModal.js';
import Market from './Market.js';
import HelpPanel2 from './HelpPanel2.js'; // ✅ new import

class GameLevelSiliconValley {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    const image_src_siliconvalley = path + "/images/gamify/siliconvalley2.png";
    const image_data_siliconvalley = {
        name: 'Silicon Valley',
        greeting: "Welcome to Silicon Valley! It is bustling and vast so enjoy your stay!",
        src: image_src_siliconvalley,
        pixels: { height: 1024, width: 1024 }
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
        pixels: { height: 384, width: 512 },
        orientation: { rows: 3, columns: 4 },
        down: { row: 0, start: 0, columns: 3 },
        downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
        downLeft: { row: 2, start: 0, columns: 3, rotate: -Math.PI / 16 },
        left: { row: 2, start: 0, columns: 3 },
        right: { row: 1, start: 0, columns: 3 },
        up: { row: 3, start: 0, columns: 3 },
        upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
        upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    const sprite_src_robot = path + "/images/gamify/robot.png";
    const sprite_greet_robot = "Hi I am Robot, the Jupyter Notebook mascot. I am very happy to spend some linux shell time with you!";
    const sprite_data_robot = {
      id: 'Robot',
      greeting: sprite_greet_robot,
      src: sprite_src_robot,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 100,
      pixels: { height: 316, width: 627 },
      INIT_POSITION: { x: width * 0.75, y: height * 0.25 },
      orientation: { rows: 3, columns: 6 },
      down: { row: 1, start: 0, columns: 6 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert(sprite_greet_robot);
      },
      interact: async function () {
        const personId = Game.id;
        const transitionAllowed = await Game.transitionToRetro(personId);

        if (transitionAllowed) {
          let primaryGame = gameEnv.gameControl;
          let levelArray = [GameLevelRetro];
          let gameInGame = new GameControl(gameEnv.game, levelArray);
          primaryGame.pause();
          gameInGame.start();
          gameInGame.gameOver = function () {
            primaryGame.resume();
          };
        } else {
          alert("You need to answer all the questions before accessing the Retro level. Keep exploring!");
        }
      }
    };

    const sprite_src_fidelity = path + "/images/gamify/fidelity.png";
    const sprite_greet_fidelity = "Hi I'm Fidelity! Let's tackle some finance and tech questions!";
    const sprite_data_fidelity = {
      id: 'Fidelity',
      greeting: sprite_greet_fidelity,
      src: sprite_src_fidelity,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 512, width: 512 },
      INIT_POSITION: { x: width * 0.25, y: height * 0.25 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert(sprite_greet_fidelity);
      },
      interact: function () {
        Game.attemptQuizForNpc(sprite_data_fidelity.id);
      }
    };

    const sprite_src_schwab = path + "/images/gamify/schwab.png";
    const sprite_greet_schwab = "Hi I'm Schwab! Let's tackle some finance and tech questions!";
    const sprite_data_schwab = {
      id: 'Schwab',
      greeting: sprite_greet_schwab,
      src: sprite_src_schwab,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 2048, width: 2048 },
      INIT_POSITION: { x: width / 2, y: height / 5 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert(sprite_greet_schwab);
      },
      interact: function () {
        Game.attemptQuizForNpc(sprite_data_schwab.id);
      }
    };

    const sprite_src_owl = path + "/images/gamify/owl.png";
    const sprite_greet_owl = "Hoot! I'm the Tech Owl. Want to play a fun game? Press 'E' to start!";
    const sprite_data_owl = {
      id: 'Tech Owl',
      greeting: sprite_greet_owl,
      src: sprite_src_owl,
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 50,
      pixels: { height: 1068, width: 1078 },
      INIT_POSITION: { x: width * 0.85, y: height * 0.4 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert(sprite_greet_owl);
      },
      interact: function () {
        let primaryGame = gameEnv.gameControl;
        let levelArray = [GameLevelFinancialLiteracy];
        let gameInGame = new GameControl(gameEnv.game, levelArray);
        primaryGame.pause();
        gameInGame.start();
        gameInGame.gameOver = function () {
          primaryGame.resume();
        }
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
      interact: function () {
        HelpPanel2.toggle();
      }
    };

    new StockMoodModal();
    new Market(1500);

    this.classes = [
      { class: GameEnvBackground, data: image_data_siliconvalley },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_robot },
      { class: Npc, data: sprite_data_fidelity },
      { class: Npc, data: sprite_data_schwab },
      { class: Npc, data: sprite_data_owl },
      { class: Npc, data: sprite_data_helpicon }
    ];

    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        HelpPanel2.toggle();
      }
    });
  }
}

export default GameLevelSiliconValley;
