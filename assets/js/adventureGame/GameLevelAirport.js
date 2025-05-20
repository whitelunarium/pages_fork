import GameEnvBackground from './GameEngine/GameEnvBackground.js';
import Npc from './GameEngine/Npc.js';
import Player from './GameEngine/Player.js';
import GameControl from './GameEngine/GameControl.js';
import HelpPanel from './HelpPanel.js';
import Game from './Game.js';
import showDialogBox from './DialogBox.js';
import WaypointArrow from './WaypointArrow.js';
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
    window.gamePath = path;

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

    const sprite_src_casino = path + "/images/gamify/frankSinatra.png";
    const sprite_data_casino = {
      id: 'Casino-NPC',
      greeting: "Hey, kid. I'm Frank Sinatra — welcome to the bright lights and wild nights of Las Vegas.",
      src: sprite_src_casino,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 281, width: 280 },
      INIT_POSITION: { x: width * 0.65, y: height * 0.55 },
      orientation: { rows: 1, columns: 1 }, 
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        function intro() {
          showDialogBox(
            "Frank Sinatra",
            "Hey, kid. I'm Frank Sinatra — welcome to the bright lights and wild nights of Las Vegas.\nHere, you can test your luck on Blackjack, Poker, or the Minefield Challenge.\nBut remember: in gambling, the swing of fortune can be swift and brutal.\nWant a tip before you step in?",
            [
              { label: "Yes, give me advice", action: () => giveAdvice(), keepOpen: true },
              { label: "Take me to the Casino", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/gamify/casinohomepage" },
              { label: "No thanks", action: () => {} }
            ]
          );
        }
        function giveAdvice() {
          const adviceList = [
            "The house always has an edge, so play smart and know when to walk away.",
            "Set a budget before you play, and never chase your losses.",
            "Luck be a lady tonight, but skill keeps you in the game.",
            "Sometimes the best bet is the one you don't make.",
            "Enjoy the thrill, but remember: it's just a game."
          ];
          const advice = adviceList[Math.floor(Math.random() * adviceList.length)];
          showDialogBox(
            "Frank's Advice",
            advice + "\nWant to answer a question before you go in?",
            [
              { label: "Sure, ask me!", action: () => askQuestion(), keepOpen: true },
              { label: "Take me to the Casino", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/gamify/casinohomepage" },
              { label: "Another tip", action: () => giveAdvice(), keepOpen: true },
              { label: "Maybe later", action: () => {} }
            ]
          );
        }
        function askQuestion() {
          showDialogBox(
            "Frank's Question",
            "If you won a big jackpot tonight, what would you do with the money?",
            [
              { label: "Save it", action: () => frankResponse("Smart move, kid. Saving is always classy.") },
              { label: "Spend it all!", action: () => frankResponse("Ha! Just don't spend it all in one place, capisce?") },
              { label: "Invest it", action: () => frankResponse("Now that's the spirit of a true high roller!") },
              { label: "Back", action: () => giveAdvice(), keepOpen: true }
            ]
          );
        }
        function frankResponse(response) {
          showDialogBox(
            "Frank Sinatra",
            response + "\nReady to try your luck?",
            [
              { label: "Take me to the Casino", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/gamify/casinohomepage" },
              { label: "Back to advice", action: () => giveAdvice(), keepOpen: true },
              { label: "Maybe later", action: () => {} }
            ]
          );
        }
        intro();
      },
      interact: function () {
        this.reaction();
      }
    };

    const sprite_src_stocks = path + "/images/gamify/stockguy.png";
    const sprite_data_stocks = {
      id: 'Stock- NPC',
      greeting: "Good day, I am J.P. Morgan, financier of industry and architect of American banking.",
      src: sprite_src_stocks,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 441, width: 339 },
      INIT_POSITION: { x: width * 0.28, y: height * 0.82 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        function intro() {
          showDialogBox(
            "J.P. Morgan",
            "Good day, I am J.P. Morgan, financier of industry and architect of American banking.\nAre you ready to test your skills in the stock market?",
            [
              { label: "Yes", action: () => explainStocks(), keepOpen: true },
              { label: "No", action: () => {} }
            ]
          );
        }
        function explainStocks() {
          showDialogBox(
            "J.P. Morgan",
            "The stock market is a place of opportunity and risk. You can buy shares in companies and watch your investments grow—or shrink.\nWould you like to proceed to the Stock Exchange and begin your investment journey?",
            [
              { label: "Take me to the Stock Exchange", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/stocks/viewer" },
              { label: "Remind me what stocks are", action: () => whatAreStocks(), keepOpen: true },
              { label: "Back", action: () => intro(), keepOpen: true }
            ]
          );
        }
        function whatAreStocks() {
          showDialogBox(
            "J.P. Morgan",
            "Stocks represent ownership in a company. When you buy a stock, you become a partial owner and can benefit from its success.\nWould you like to try investing now?",
            [
              { label: "Yes, let's invest", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/stocks/viewer" },
              { label: "Back", action: () => explainStocks(), keepOpen: true }
            ]
          );
        }
        intro();
      },
      interact: function () { this.reaction(); }
    };

    const sprite_src_crypto = path + "/images/gamify/satoshiNakamoto.png";
    const sprite_data_crypto = {
      id: 'Crypto-NPC',
      greeting: "Greetings, seeker. I am Satoshi Nakamoto, architect of decentralized currency.",
      src: sprite_src_crypto,
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 50,
      pixels: { height: 282, width: 282 },
      INIT_POSITION: { x: width * 0.5, y: height * 0.7 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        function intro() {
          showDialogBox(
            "Satoshi Nakamoto",
            "Greetings, seeker. I am Satoshi Nakamoto, architect of decentralized currency.\nAre you curious about Bitcoin or ready to explore the Crypto Hub?",
            [
              { label: "Tell me about Bitcoin", action: () => aboutBitcoin(), keepOpen: true },
              { label: "Go to Crypto Hub", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/crypto/portfolio" },
              { label: "Goodbye", action: () => {} }
            ]
          );
        }
        function aboutBitcoin() {
          showDialogBox(
            "Satoshi Nakamoto",
            "Bitcoin is a decentralized digital currency, born from a desire for freedom and transparency. It operates without banks or governments.\nWould you like to know how to buy or mine Bitcoin?",
            [
              { label: "How do I buy Bitcoin?", action: () => howToBuy(), keepOpen: true },
              { label: "How do I mine Bitcoin?", action: () => howToMine(), keepOpen: true },
              { label: "Back", action: () => intro(), keepOpen: true }
            ]
          );
        }
        function howToBuy() {
          showDialogBox(
            "Satoshi Nakamoto",
            "To buy Bitcoin, you need a digital wallet and access to a crypto exchange. You can purchase fractions of a Bitcoin.\nWould you like to visit the Crypto Hub to start your journey?",
            [
              { label: "Yes, take me there", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/crypto/portfolio" },
              { label: "Back", action: () => aboutBitcoin(), keepOpen: true }
            ]
          );
        }
        function howToMine() {
          showDialogBox(
            "Satoshi Nakamoto",
            "Mining Bitcoin requires powerful computers to solve complex puzzles. Miners are rewarded with Bitcoin for verifying transactions.\nWould you like to try mining or learn more?",
            [
              { label: "Try Mining", action: () => window.location.href = "https://nighthawkcoders.github.io/portfolio_2025/crypto/mining" },
              { label: "Back", action: () => aboutBitcoin(), keepOpen: true }
            ]
          );
        }
        intro();
      },
      interact: function () {
        this.reaction();
      }
    };

    const sprite_src_pilot = path + "/images/gamify/pilot.png";
    const sprite_data_pilot = {
      id: 'Pilot',
      greeting: "Greetings passenger! Ready to travel to Wallstreet?",
      src: sprite_src_pilot,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 460, width: 422 },
      INIT_POSITION: { x: width / 10, y: height * 0.2 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
      interact: async function () {
        const personId = Game.id; 
        const transitionAllowed = await Game.transitionToWallstreet(personId);
      
        if (transitionAllowed) {
          let primaryGame = gameEnv.gameControl;
          let levelArray = [GameLevelWallstreet];
          let gameInGame = new GameControl(gameEnv.game, levelArray);
      
          primaryGame.pause();
          gameInGame.start();
      
          gameInGame.gameOver = function () {
            primaryGame.resume();
          };
        } else {
          alert("You need to answer all the questions before accessing Wallstreet. Keep exploring!");
        }
      },
    };

    const sprite_src_fidelity = path + "/images/gamify/fidelity.png";
    const sprite_data_fidelity = {
      id: 'Fidelity',
      greeting: "Hi I'm Fidelity! Let's tackle some finance and tech questions!",
      src: sprite_src_fidelity,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 512, width: 512 },
      INIT_POSITION: { x: width * 0.372, y: height * 0.25 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      interact: function () {
        Game.attemptQuizForNpc(sprite_data_fidelity.id);
      }
    };

    const sprite_src_schwab = path + "/images/gamify/schwab.png";
    const sprite_data_schwab = {
      id: 'Schwab',
      greeting: "Hi I'm Schwab! Let's tackle some finance and tech questions!",
      src: sprite_src_schwab,
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 50,
      pixels: { height: 2048, width: 2048 },
      INIT_POSITION: { x: width * 0.665, y: height * 0.25 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      interact: function () {
        Game.attemptQuizForNpc(sprite_data_schwab.id);
      }
    };

    const sprite_src_computer = path + "/images/gamify/stockupdatepc.png";
    const sprite_greet_computer = "*Computer Fan Whirs* Let me show you the latest market news!";
    const sprite_data_computer = {
      id: 'Market Computer',
      greeting: sprite_greet_computer,
      src: sprite_src_computer,
      SCALE_FACTOR: 1.5,
      ANIMATION_RATE: 50,
      pixels: { height: 1068, width: 1078 },
      INIT_POSITION: { x: width * 0.9, y: height * 0.65 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      interact: async function () {
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
    const sprite_src_bank = path + "/images/gamify/janetYellen.png";
    const sprite_data_bank = {
      id: 'Bank-NPC',
      greeting: "Welcome, I'm Janet Yellen, Secretary of the Treasury.",
      src: sprite_src_bank,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 50,
      pixels: { height: 282, width: 268 },
      INIT_POSITION: { x: width * 0.8, y: height * 0.1 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      reaction: function () {
        function intro() {
          alert("Welcome, I'm Janet Yellen, Secretary of the Treasury.\nToday, you have just been entrusted with an initial sum of $100,000 to shape your financial future.\nWould you like to learn about the bank, review your analytics, or get financial tips?");
        }
        function explainBank() {
          alert("The Bank keeps track of your every transaction, monitors your balance, and helps you plan for the future.\nWould you like to see your analytics or hear a tip?");
        }
        function analyticsIntro() {
          alert("Bank Analytics provides a detailed overview of your spending, investments, and savings.\nWould you like to proceed to the analytics dashboard?");
        }
        function financialTip() {
          const tips = [
            "Diversify your investments to reduce risk.",
            "Always keep an emergency fund.",
            "Track your spending to find savings opportunities.",
            "Invest for the long term, not quick gains.",
            "Review your financial goals regularly."
          ];
          const tip = tips[Math.floor(Math.random() * tips.length)];
          alert("Janet Yellen - Financial Tip: " + tip);
        }
        intro();
      },
      interact: function () {
        this.reaction();
      }
    };

    this.classes = [
      { class: GameEnvBackground, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      {class: Npc, data: sprite_data_crypto },
      {class: Npc, data: sprite_data_stocks},
      {class: Npc, data: sprite_data_casino},
      { class: Npc, data: sprite_data_pilot },
      { class: Npc, data: sprite_data_fidelity },
      { class: Npc, data: sprite_data_schwab },
      { class: Npc, data: sprite_data_computer },
      { class: Npc, data: sprite_data_bank}
    ];

    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        HelpPanel.toggle();
      }
    });
  }
}

export default GameLevelAirport;

// Waypoint Arrow Integration
window.addEventListener('DOMContentLoaded', function() {
  let gameCanvas = document.getElementById('gameCanvas');
  let gameContainer = document.getElementById('gameContainer') || (gameCanvas && gameCanvas.parentNode);
  if (!gameContainer) return;

  // Initialize the waypoint arrow
  new WaypointArrow(gameCanvas, window.gamePath);
});
