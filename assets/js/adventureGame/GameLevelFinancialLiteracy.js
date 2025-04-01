import GameEnvBackground from './GameEnvBackground.js';
import Player from './Player.js';
import Npc from './Npc.js';
import GameControl from './GameControl.js';

class GameLevelFinancialLiteracy {
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;
        this.continue = true;

        // Financial website background
        const image_src_financial = path + "/images/gamify/financenews.png";
        const image_data_financial = {
            name: 'Financial Literacy Hub',
            greeting: "Welcome to the Financial Education Center!",
            src: image_src_financial,
            pixels: { height: 1024, width: 1024 }
        };
        // Player character
        const sprite_src_chillguy = path + "/images/gamify/chillguy.png";
        const CHILLGUY_SCALE_FACTOR = 5;
        const sprite_data_chillguy = {
            id: 'Player',
            greeting: "Time to learn about finance!",
            src: sprite_src_chillguy,
            SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width * 0.1, y: height * 0.7 },
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

        // Financial Advisor Owl
        const sprite_src_owl = path + "/images/gamify/owl.png";
        const sprite_data_owl = {
            id: 'FinancialOwl',
            greeting: "Welcome to Financial Education! Let me show you the latest market news.",
            src: sprite_src_owl,
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            pixels: { height: 384, width: 512 },
            INIT_POSITION: { x: width * 0.85, y: height * 0.4 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.15, heightPercentage: 0.25 },
            reaction: function() {
                alert(this.greeting);
            },
            interact: async () => {
                await this.showFinancialNews();
            }
        };

        this.classes = [
            { class: GameEnvBackground, data: image_data_financial },
            { class: Player, data: sprite_data_chillguy },
            { class: Npc, data: sprite_data_owl }
        ];

        // Initialize the news panel
        this.createNewsPanel();
    }

    createNewsPanel() {
        // Create a styled div for the news panel
        const newsPanel = document.createElement('div');
        newsPanel.id = 'financial-news-panel';
        newsPanel.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-height: 80vh;
            background-color: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #00ff00;
            display: none;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            z-index: 1000;
        `;
        document.body.appendChild(newsPanel);

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #00ff00;
            color: black;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
        `;
        closeButton.onclick = () => {
            newsPanel.style.display = 'none';
        };
        newsPanel.appendChild(closeButton);
    }

    async showFinancialNews() {
        const newsPanel = document.getElementById('financial-news-panel');
        newsPanel.style.display = 'block';

        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=YIFVKCN362NFW1KO`);
            const data = await response.json();

            if (data.feed && data.feed.length > 0) {
                let newsHtml = '<h2 style="color: #00ff00; text-align: center;">Latest Financial News</h2>';
                
                data.feed.slice(0, 5).forEach(article => {
                    newsHtml += `
                        <div style="margin: 20px 0; padding: 10px; border: 1px solid #00ff00; border-radius: 5px;">
                            <h3 style="color: #00ff00;">${article.title}</h3>
                            <p style="color: #00ff00;">${article.summary}</p>
                            <div style="color: #008800; font-size: 0.9em;">
                                Source: ${article.source} | ${new Date(article.time_published).toLocaleString()}
                            </div>
                        </div>
                    `;
                });

                newsPanel.innerHTML = newsHtml;
            } else {
                newsPanel.innerHTML = '<p style="color: #ff0000;">Unable to fetch news at this time.</p>';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            newsPanel.innerHTML = '<p style="color: #ff0000;">Error loading financial news. Please try again later.</p>';
        }
    }

    update() {
        // Required empty update method
    }

    initialize() {
        console.log("Financial Literacy level initialized");
        this.continue = true;
    }

    destroy() {
        console.log("Financial Literacy level destroyed");
        this.continue = false;
        // Remove the news panel when leaving the level
        const newsPanel = document.getElementById('financial-news-panel');
        if (newsPanel) {
            newsPanel.remove();
        }
    }
}

export default GameLevelFinancialLiteracy; 