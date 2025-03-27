import GameEnvBackground from './GameEnvBackground.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';


class GameLevelParadise {
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
    const image_src_city = path + "/images/gamify/city.png"; // be sure to include the path
    const image_data_city = {
        name: 'city',
        greeting: "Welcome to the city!  It is bustling and vast so enjoy your stay!",
        src: image_src_city,
        pixels: {height: 966, width: 654}
    };

    

    const sprite_src_crypto = path + "/images/gamify/bitcoin.png"; // Path to the NPC sprite
    const sprite_greet_crypto = "*cha-ching*";
    const sprite_data_crypto = {
        id: 'Crypto-NPC',
        greeting: sprite_greet_crypto,
        src: sprite_src_crypto,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 50,
        pixels: {height: 600, width: 600},
        INIT_POSITION: { x: width / 3, y: height / 3 },
        orientation: {rows: 1, columns: 1},
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Reaction when player approaches NPC
        reaction: function() {
            alert(sprite_greet_crypto);
        },
        // Interact when player presses "E"
        interact: function() {
            const confirmTeleport = window.confirm("Teleport to gambling hub?");
            if (confirmTeleport) {
                window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/gamify/casinohomepage"; // Replace with your lin
            }
        }
    };


    const sprite_src_stocks = path + "/images/gamify/stockguy.png"; // Path to the NPC sprite
    const sprite_greet_stocks = "Darn it, I lost some money on the stock market.. come with me to help me out?";
    
    const sprite_data_stocks = {
        id: 'Stock-NPC',
        greeting: sprite_greet_stocks,
        src: sprite_src_stocks,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 50,
        pixels: {height: 441, width: 339},
        INIT_POSITION: { x: width * 0.75, y: height * 0.6 },
        orientation: {rows: 1, columns: 1},
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Reaction when player approaches NPC
        reaction: function() {
            alert(sprite_greet_stocks);
        },
        // Interact when player presses "E"
        interact: function() {
            const confirmTeleport = window.confirm("Teleport to the stock market?");
            if (confirmTeleport) {
                window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/stocks/home"; // Replace with your link
            }
        }
    };
    // List of classes and supporting definitions to create the game level
    this.classes = [
      { class: GameEnvBackground, data: image_data_city },
      { class: Player, data: sprite_data_octopus },
      { class: Npc, data: sprite_data_crypto },
      { class: Npc, data: sprite_data_stocks },
    ];
  }
}

export default GameLevelParadise;