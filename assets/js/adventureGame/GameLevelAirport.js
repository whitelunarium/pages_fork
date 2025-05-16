import GameEnvBackground from './GameEngine/GameEnvBackground.js';
import Npc from './GameEngine/Npc.js';
import Player from './GameEngine/Player.js';
import GameControl from './GameEngine/GameControl.js';
import HelpPanel from './HelpPanel.js';
import Game from './Game.js';
import MarketSentimentModal from './MarketSentimentModal.js';

let socketURI
let javaURI
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    javaURI = "http://localhost:8085";
    socketURI = "ws://localhost:8085/websocket";
} else {
    javaURI = "https://spring2025.nighthawkcodingsociety.com";
    socketURI = "wss://spring2025.nighthawkcodingsociety.com/websocket";
}

class GameLevelAirport {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    const image_src_desert = path + "/images/gamify/airport.jpg";
    const image_data_desert = {
      id: 'Airport-Background',
      src: image_src_desert,
      pixels: { height: 580, width: 386 }
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

    // Stock Simulation Game NPC
    const sprite_src_stocks = path + "/images/gamify/stockguy.png";
    const sprite_greet_stocks = "Teleport to the stock market?";
    const sprite_data_stocks = {
      id: 'Stock-NPC',
      greeting: sprite_greet_stocks,
      src: sprite_src_stocks,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 441, width: 339 },
      INIT_POSITION: { x: width * 0.2, y: height * 0.3 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(sprite_greet_stocks);
      },
      interact: function() {
        if (document.getElementById('stockModal')) {
          document.getElementById('stockModal').style.display = 'block';
          const iframe = document.querySelector('#stockModal iframe');
          iframe.src = '';
          iframe.src = 'https://nighthawkcoders.github.io/portfolio_2025/stocks/viewer';
          return;
        }
        
        const modal = document.createElement('div');
        modal.id = 'stockModal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#fff';
        modal.style.border = '2px solid #444';
        modal.style.padding = '0';
        modal.style.zIndex = '1000';
        modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        modal.style.borderRadius = '12px';
        modal.style.width = '90%';
        modal.style.maxWidth = '1000px';
        modal.style.height = '80vh';
        
        modal.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%;">
            <iframe 
              src="http://127.0.0.1:4100/portfolio_2025/stocks/viewer"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 12px;"
              allowfullscreen
              loading="lazy"
            ></iframe>
            <button id="closeStockModal" 
              style="position: absolute; top: 10px; right: 10px; z-index: 10; background: #ff5252; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ✖
            </button>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closeStockModal').onclick = () => {
          modal.style.display = 'none';
        };
      }
    };

    // Keep existing Fidelity & Schwab NPCs
    const sprite_src_fidelity = path + "/images/gamify/fidelity.png";
    const sprite_data_fidelity = {
      id: 'Fidelity',
      greeting: "Hi I'm Fidelity! Let's tackle some finance and tech questions!",
      src: sprite_src_fidelity,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 512, width: 512 },
      INIT_POSITION: { x: width * 0.4, y: height * 0.3 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(this.greeting);
      },
      interact: function() {
        const gameInstance = GameControl.gameInstance;
        if (gameInstance && typeof gameInstance.attemptQuizForNpc === 'function') {
          gameInstance.attemptQuizForNpc(this.id);
        } else {
          console.error("Game instance not available or quiz function not found");
          alert("Quiz system is currently unavailable");
        }
      }
    };

    const sprite_src_schwab = path + "/images/gamify/schwab.png";
    const sprite_data_schwab = {
      id: 'Schwab',
      greeting: "Hi I'm Schwab! Let's test your financial knowledge!",
      src: sprite_src_schwab,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 2048, width: 2048 },
      INIT_POSITION: { x: width * 0.6, y: height * 0.3 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(this.greeting);
      },
      interact: function() {
        const gameInstance = GameControl.gameInstance;
        if (gameInstance && typeof gameInstance.attemptQuizForNpc === 'function') {
          gameInstance.attemptQuizForNpc(this.id);
        } else {
          console.error("Game instance not available or quiz function not found");
          alert("Quiz system is currently unavailable");
        }
      }
    };

    // Crypto Portfolio NPC
    const sprite_src_crypto = path + "/images/gamify/bitcoin.png";
    const sprite_greet_crypto = "Teleport to the crypto hub?";
    const sprite_data_crypto = {
      id: 'Crypto-NPC',
      greeting: sprite_greet_crypto,
      src: sprite_src_crypto,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 600, width: 600 },
      INIT_POSITION: { x: width * 0.3, y: height * 0.6 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(sprite_greet_crypto);
      },
      interact: function() {
        if (document.getElementById('cryptoModal')) {
          document.getElementById('cryptoModal').style.display = 'block';
          const iframe = document.querySelector('#cryptoModal iframe');
          iframe.src = '';
          iframe.src = 'https://nighthawkcoders.github.io/portfolio_2025/crypto/portfolio';
          return;
        }
        
        const modal = document.createElement('div');
        modal.id = 'cryptoModal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#fff';
        modal.style.border = '2px solid #444';
        modal.style.padding = '0';
        modal.style.zIndex = '1000';
        modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        modal.style.borderRadius = '12px';
        modal.style.width = '90%';
        modal.style.maxWidth = '1000px';
        modal.style.height = '80vh';
        
        modal.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%;">
            <iframe 
              src="https://nighthawkcoders.github.io/portfolio_2025/crypto/portfolio"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 12px;"
              allowfullscreen
              loading="lazy"
            ></iframe>
            <button id="closeCryptoModal" 
              style="position: absolute; top: 10px; right: 10px; z-index: 10; background: #ff5252; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ✖
            </button>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closeCryptoModal').onclick = () => {
          modal.style.display = 'none';
        };
      }
    };

    // Crypto Mining NPC
    const sprite_src_cryptoMining = path + "/images/gamify/mining.png";
    const sprite_greet_cryptoMining = "Teleport to the cryptocurrency mining hub?";
    const sprite_data_cryptoMining = {
      id: 'CryptoMining-NPC',
      greeting: sprite_greet_cryptoMining,
      src: sprite_src_cryptoMining,
      SCALE_FACTOR: 4,
      ANIMATION_RATE: 50,
      pixels: { height: 600, width: 600 },
      INIT_POSITION: { x: width * 0.5, y: height * 0.6 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.05, heightPercentage: 0.05 },
      reaction: function() {
        alert(sprite_greet_cryptoMining);
      },
      interact: function() {
        if (document.getElementById('stockModal')) {
          document.getElementById('stockModal').style.display = 'block';
          const iframe = document.querySelector('#stockModal iframe');
          iframe.src = '';
          iframe.src = 'https://nighthawkcoders.github.io/portfolio_2025/crypto/mining';
          return;
        }
        
        const modal = document.createElement('div');
        modal.id = 'stockModal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#fff';
        modal.style.border = '2px solid #444';
        modal.style.padding = '0';
        modal.style.zIndex = '1000';
        modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        modal.style.borderRadius = '12px';
        modal.style.width = '90%';
        modal.style.maxWidth = '1000px';
        modal.style.height = '80vh';
        
        modal.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%;">
            <iframe 
              src="https://nighthawkcoders.github.io/portfolio_2025/crypto/mining"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 12px;"
              allowfullscreen
              loading="lazy"
            ></iframe>
            <button id="closeStockModal" 
              style="position: absolute; top: 10px; right: 10px; z-index: 10; background: #ff5252; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ✖
            </button>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closeStockModal').onclick = () => {
          modal.style.display = 'none';
        };
      }
    };

    // Casino NPC
    const sprite_src_casino = path + "/images/gamify/casino.png";
    const sprite_greet_casino = "Teleport to the casino?";
    const sprite_data_casino = {
      id: 'Casino-NPC',
      greeting: sprite_greet_casino,
      src: sprite_src_casino,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 1920, width: 1861 },
      INIT_POSITION: { x: width * 0.7, y: height * 0.6 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(sprite_greet_casino);
      },
      interact: function() {
        const confirmTeleport = window.confirm("Teleport to the casino?");
        if (confirmTeleport) {
          window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/gamify/casinohomepage";
        }
      }
    };

    // Keep existing Market Computer
    const sprite_src_computer = path + "/images/gamify/stockupdatepc.png";
    const sprite_data_computer = {
      id: 'Market-Computer',
      greeting: "*Computer Fan Whirs* Check out the latest market news!",
      src: sprite_src_computer,
      SCALE_FACTOR: 1.5,
      ANIMATION_RATE: 50,
      pixels: { height: 1068, width: 1078 },
      INIT_POSITION: { x: width * 0.8, y: height * 0.85 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.15, heightPercentage: 0.15 },
      reaction: function() {
        alert(this.greeting);
      },
      interact: async function() {
        try {
          const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=LIMANRBUDM0ZN7LE`);
          const data = await response.json();

          if (data.feed && data.feed.length > 0) {
            const modalContainer = document.createElement('div');
            modalContainer.style.cssText = `
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(0, 0, 0, 0.95);
              padding: 20px;
              border-radius: 10px;
              color: white;
              z-index: 1000;
              max-width: 800px;
              width: 90%;
              max-height: 80vh;
              box-shadow: 0 0 20px rgba(0,0,0,0.5);
              display: flex;
              flex-direction: column;
            `;

            modalContainer.innerHTML = `
              <h2 style="color: #4CAF50;">Latest Market News</h2>
              <div style="overflow-y: auto; flex-grow: 1; margin-top: 10px;">
                ${data.feed.map(article => `
                  <div style="margin-bottom: 20px;">
                    <h3 style="color: #2196F3;">${article.title}</h3>
                    <p style="color: #ccc;">${article.summary}</p>
                    <a href="${article.url}" target="_blank" style="color: #4CAF50;">Read more →</a>
                  </div>
                `).join('')}
              </div>
              <button style="margin-top: 20px; align-self: flex-end; background: #4CAF50; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">Close</button>
            `;

            document.body.appendChild(modalContainer);
            modalContainer.querySelector('button').onclick = () => modalContainer.remove();
          } else {
            alert('Unable to fetch market news at this time.');
          }
        } catch (err) {
          console.error(err);
          alert('Error loading news. Try again later.');
        }
      }
    };

    // Keep existing Pilot (but update position)
    const sprite_src_pilot = path + "/images/gamify/pilot.png";
    const sprite_data_pilot = {
      id: 'Pilot',
      greeting: "Ready to see your final results?",
      src: sprite_src_pilot,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 460, width: 422 },
      INIT_POSITION: { x: width * 0.9, y: height * 0.6 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
      reaction: () => {
        alert(sprite_data_pilot.greeting);
      },
      interact: async function() {
        const personId = Game.id;
        const gameInstance = GameControl.gameInstance;
        const transitionAllowed = await gameInstance.statsManager.transitionToWallstreet(personId);
      
        if (transitionAllowed) {
          let primaryGame = gameEnv.gameControl;
          let levelArray = [GameLevelWallstreet];
          let gameInGame = new GameControl(gameEnv.game, levelArray);
      
          primaryGame.pause();
          gameInGame.start();
      
          gameInGame.gameOver = function() {
            primaryGame.resume();
          };
        } else {
          alert("You need to complete all activities before viewing your final results!");
        }
      }
    };

    // Add Bizguy NPC
    const sprite_src_bizguy = path + "/images/gamify/bizguys.png";
    const sprite_greet_bizguy = "Want to check the market sentiment?";
    const sprite_data_bizguy = {
      id: 'Bizguy-NPC',
      greeting: sprite_greet_bizguy,
      src: sprite_src_bizguy,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 512, width: 512 },
      INIT_POSITION: { x: width * 0.1, y: height * 0.3 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function() {
        alert(this.greeting);
      },
      interact: function() {
        showInvestmentModal();
      }
    };

    function showInvestmentModal() {
      const modal = new MarketSentimentModal(javaURI, Game);
      modal.create();
    }

    this.classes = [
      { class: GameEnvBackground, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_bizguy },
      { class: Npc, data: sprite_data_stocks },
      { class: Npc, data: sprite_data_fidelity },
      { class: Npc, data: sprite_data_schwab },
      { class: Npc, data: sprite_data_crypto },
      { class: Npc, data: sprite_data_cryptoMining },
      { class: Npc, data: sprite_data_casino },
      { class: Npc, data: sprite_data_computer },
      { class: Npc, data: sprite_data_pilot }
    ];

    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        HelpPanel.toggle();
      }
    });
  }
}

export default GameLevelAirport;
