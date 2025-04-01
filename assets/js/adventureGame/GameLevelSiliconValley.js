import GameEnvBackground from './GameEnvBackground.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';
import Quiz from './Quiz.js';
import GameLevelRetro from './GameLevelRetro.js';
import GameLevelNightOwl from './GameLevelNightOwl.js';

class GameLevelSiliconValley {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    const image_src_siliconvalley = path + "/images/gamify/siliconvalley.png";
    const image_data_siliconvalley = {
        name: 'Silicon Valley',
        greeting: "Welcome to Silicon Valley!  It is bustling and vast so enjoy your stay!",
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
    const sprite_greet_robot = "Hi I am Robot, the Jupyter Notebook mascot.  I am very happy to spend some linux shell time with you!";
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
      interact: function () {
        let primaryGame = gameEnv.gameControl;
        let levelArray = [GameLevelRetro];
        let gameInGame = new GameControl(gameEnv.game, levelArray);
        primaryGame.pause();
        gameInGame.start();
        gameInGame.gameOver = function () {
          primaryGame.resume();
        };
      }
    };

    const sprite_src_fidelity = path + "/images/gamify/fidelity.png";
    const sprite_greet_fidelity = "Hi I'm Fidelity! Lets tackle some finance and tech questions!";
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
    const sprite_greet_schwab = "Hi I'm schwab! Lets tackle some finance and tech questions!";
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

    // ✅ Re-adding the Financial Advisor (Octocat)
    const sprite_src_advisor = path + "/images/gamify/financeguy.png";
    const sprite_greet_advisor = "Hello! I'm your Financial Advisor. Press 'E' near me to get the latest financial news and tips!";
    const sprite_data_advisor = {
      id: 'Financial Advisor',
      greeting: sprite_greet_advisor,
      src: sprite_src_advisor,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 301, width: 801 },
      INIT_POSITION: { x: width * 0.35, y: height * 0.6 },
      orientation: { rows: 1, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
      reaction: function () {
        alert(sprite_greet_advisor);
      },
      interact: function () {
        alert("Here's a financial tip: Diversify your investments and stay informed!");
      }
    };

    // Add Night Owl Character
    const sprite_src_owl = path + "/images/gamify/owl.png";
    const sprite_greet_owl = "Hoot! I'm the Tech Owl. Want to play a fun game? Press 'E' to start!";
    const sprite_data_owl = {
      id: 'Tech Owl',
      greeting: sprite_greet_owl,
      src: sprite_src_owl,
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 50,
      pixels: { height: 384, width: 512 },
      INIT_POSITION: { x: width * 0.85, y: height * 0.4 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(sprite_greet_owl);
      },
      interact: function() {
        let primaryGame = gameEnv.gameControl;
        let levelArray = [GameLevelNightOwl];
        let gameInGame = new GameControl(gameEnv.game, levelArray);
        primaryGame.pause();
        gameInGame.start();
        gameInGame.gameOver = function() {
          primaryGame.resume();
        }
      }
    };

    this.classes = [
      { class: GameEnvBackground, data: image_data_siliconvalley },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_robot },
      { class: Npc, data: sprite_data_fidelity },
      { class: Npc, data: sprite_data_schwab },
      { class: Npc, data: sprite_data_advisor },
      { class: Npc, data: sprite_data_owl }  // Add owl to the level
    ];
  }
}

export default GameLevelSiliconValley;
