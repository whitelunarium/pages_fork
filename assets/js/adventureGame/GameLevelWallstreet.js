import GameEnvBackground from './GameEngine/GameEnvBackground.js';
import Npc from './GameEngine/Npc.js';
import Player from './GameEngine/Player.js';

class GameLevelWallstreet {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    const image_src_city = path + "/images/gamify/city.png";
    const image_data_city = {
      name: 'city',
      greeting: "Welcome to the city! It is like paradise, bustling and vast so enjoy your stay!",
      src: image_src_city,
      pixels: { height: 966, width: 654 }
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

    const sprite_src_casino = path + "/images/gamify/casino.png";
    const sprite_data_casino = {
      id: 'Casino-NPC',
      greeting: "Teleport to the casino?",
      src: sprite_src_casino,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 1920, width: 1861 },
      INIT_POSITION: { x: width * 0.55, y: height * 0.6 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert("Teleport to the casino?");
      },
      interact: function () {
        const confirmTeleport = window.confirm("Teleport to the casino?");
        if (confirmTeleport) {
          window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/gamify/casinohomepage";
        }
      }
    };

    const sprite_src_stocks = path + "/images/gamify/stockguy.png";
    const sprite_data_stocks = {
      id: 'Stock-NPC',
      greeting: "Teleport to the stock market?",
      src: sprite_src_stocks,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 441, width: 339 },
      INIT_POSITION: { x: width / 3, y: height / 3 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert("Teleport to the stock market?");
      },
      interact: function () {
        const confirmTeleport = window.confirm("Teleport to the stock market?");
        if (confirmTeleport) {
          window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/stocks/viewer";
        }
      }
    };

    const sprite_src_cryptoMining = path + "/images/gamify/mining.png";
    const sprite_data_cryptoMining = {
      id: 'CryptoMining-NPC',
      greeting: "Teleport to the cryptocurrency mining hub?",
      src: sprite_src_cryptoMining,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 600, width: 600 },
      INIT_POSITION: { x: width / 3, y: height / 3 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert("Teleport to the cryptocurrency mining hub?");
      },
      interact: function () {
        const confirmTeleport = window.confirm("Teleport to the mining hub?");
        if (confirmTeleport) {
          window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/crypto/mining";
        }
      }
    };

    const sprite_src_crypto = path + "/images/gamify/bitcoin.png";
    const sprite_data_crypto = {
      id: 'Crypto-NPC',
      greeting: "Teleport to the crypto hub?",
      src: sprite_src_crypto,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 600, width: 600 },
      INIT_POSITION: { x: width * 0.75, y: height * 0.6 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert("Teleport to the crypto hub?");
      },
      interact: function () {
        const confirmTeleport = window.confirm("Teleport to the crypto hub?");
        if (confirmTeleport) {
          window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/crypto/portfolio";
        }
      }
    };

    // === Fixed Bank NPC ===
    const sprite_src_bank = path + "/images/gamify/bank.png";
    const sprite_data_bank = {
      id: 'Bank-NPC',
      greeting: "*bank noises*",
      src: sprite_src_bank,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 270, width: 377 },
      INIT_POSITION: { x: width * 0.6, y: height * 0.4 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        alert("*bank noises*");
      },
      interact: function () {
        const confirmTeleport = window.confirm("Teleport to the bank?");
        if (confirmTeleport) {
          window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/gamify/bankanalytics";
        }
      }
    };

    this.classes = [
      { class: GameEnvBackground, data: image_data_city },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_casino },
      { class: Npc, data: sprite_data_stocks },
      { class: Npc, data: sprite_data_crypto },
      { class: Npc, data: sprite_data_cryptoMining },
      { class: Npc, data: sprite_data_bank }, // Updated Bank NPC
    ];
  }
}

export default GameLevelWallstreet;
