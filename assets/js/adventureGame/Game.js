import GameControl from './GameEngine/GameControl.js';
import Quiz from './Quiz.js';
import Inventory from "./Inventory.js";
import { defaultItems } from "./items.js";

class StatsManager {
    constructor(game) {
        this.game = game;
        this.initStatsUI();
    }

    async getNpcProgress(personId) {
        try {
            const response = await fetch(`${this.game.javaURI}/bank/${personId}/npcProgress`, this.fetchOptions);
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            const npcProgressDictionary = await response.json();
            console.log(npcProgressDictionary);
            return npcProgressDictionary
        } catch (error) {
            console.error("Error fetching Npc Progress:", error);
            return null;
        }
    }

    async fetchStats(personId) {
        const endpoints = {
            balance: this.game.javaURI + '/rpg_answer/getBalance/' + personId,
            questionAccuracy: this.game.javaURI + '/rpg_answer/getQuestionAccuracy/' + personId
        };
    
        for (let [key, url] of Object.entries(endpoints)) {
            try {
                const response = await fetch(url, this.game.fetchOptions);
                const data = await response.json();
                
                if (key === "questionAccuracy") {
                    const accuracyPercent = Math.round((data ?? 0) * 100);
                    document.getElementById(key).innerHTML = `${accuracyPercent}%`;
                    localStorage.setItem(key, `${accuracyPercent}%`);
                } else {
                    document.getElementById(key).innerHTML = data ?? 0;
                    localStorage.setItem(key, data ?? 0);
                }
            } catch (err) {
                console.error(`Error fetching ${key}:`, err);
            }
        }
    }

    async createStats(stats, gname, uid) {
        try {
            const response = await fetch(`${this.game.javaURI}/createStats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gname, stats })
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error creating stats:", error);
            return "Error creating stats";
        }
    }

    async getStats(uid) {
        try {
            const response = await fetch(`${this.game.javaURI}/getStats/${uid}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error fetching stats:", error);
            return "Error fetching stats";
        }
    }

    async updateStats(stats, gname, uid) {
        try {
            const response = await fetch(`${this.game.javaURI}/updateStats`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gname, stats })
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error updating stats:", error);
            return "Error updating stats";
        }
    }

    async updateStatsMCQ(questionId, choiceId, personId) {
        try {
            const response = await fetch(this.game.javaURI + '/rpg_answer/submitMCQAnswer', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionId, personId, choiceId })
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return response;
        } catch (error) {
            console.error("Error submitting MCQ answer:", error);
            throw error;
        }
    }

    async transitionToWallstreet(personId) {
        try {
            const response = await fetch(`${this.game.javaURI}/question/transitionToWallstreet/${personId}`, this.game.fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch questions");
            const questionsAnswered = await response.json();
            return questionsAnswered >= 12;
        } catch (error) {
            console.error("Error transitioning to Wallstreet:", error);
            return null;
        }
    }

    initStatsUI() {
        const TOTAL_NPCS = 10;
        // Create wrapper for button and panel
        const statsWrapper = document.createElement('div');
        statsWrapper.id = 'stats-wrapper';
        Object.assign(statsWrapper.style, {
            position: 'fixed',
            top: '80px',
            right: '0',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
        });

        // Add pixel font if not present
        if (!document.getElementById('pixel-font-link')) {
            const fontLink = document.createElement('link');
            fontLink.id = 'pixel-font-link';
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
            document.head.appendChild(fontLink);
        }

        // Add pixel-art icon spritesheet if not present
        if (!document.getElementById('pixel-icon-style')) {
            const style = document.createElement('style');
            style.id = 'pixel-icon-style';
            style.innerHTML = `
                #stats-wrapper {
                    display: flex;
                    align-items: flex-start;
                }
                #stats-button {
                    width: 60px;
                    height: 70px;
                    background: url('https://www.transparenttextures.com/patterns/pw-maze-white.png'), linear-gradient(135deg, #ffe066 0%, #ffd700 100%);
                    border: 8px solid #ffb300;
                    outline: 6px solid #ff9100;
                    outline-offset: -8px;
                    box-shadow: 0 0 24px 8px #ffec80;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    image-rendering: pixelated;
                    z-index: 10001;
                    transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
                }
                #stats-button.pinned {
                    box-shadow: 0 0 32px 8px #ffd700, 0 0 0 4px #ffb300;
                    border-color: #ffd700;
                    background: linear-gradient(135deg, #fffbe6 0%, #ffe066 100%);
                }
                #stats-button img {
                    width: 38px;
                    height: 38px;
                    image-rendering: pixelated;
                }
                #stats-container {
                    position: absolute;
                    top: 80px;
                    left: auto;
                    right: 60px;
                    width: 0;
                    height: auto;
                    overflow: hidden;
                    background: url('https://www.transparenttextures.com/patterns/pw-maze-white.png'), linear-gradient(135deg, #ffe066 0%, #ffd700 100%);
                    color: #3a2c00;
                    border: 8px solid #ffb300;
                    outline: 6px solid #ff9100;
                    outline-offset: -8px;
                    box-shadow: 0 0 24px 8px #ffec80;
                    font-family: 'Press Start 2P', 'VT323', 'Courier New', Courier, monospace;
                    font-size: 15px;
                    letter-spacing: 1px;
                    text-shadow: 2px 2px 0 #fffbe6, 0 0 2px #ffb300;
                    image-rendering: pixelated;
                    min-width: 0;
                    user-select: none;
                    box-sizing: border-box;
                    padding: 0;
                    opacity: 0;
                    pointer-events: none;
                    transition: width 0.4s cubic-bezier(0.4,1.6,0.4,1), opacity 0.3s, padding 0.25s, top 0.3s cubic-bezier(0.4,1.6,0.4,1);
                    z-index: 10000;
                }
                #stats-wrapper:hover #stats-container, #stats-container:focus-within {
                    width: 320px;
                    opacity: 1;
                    pointer-events: auto;
                    padding: 18px 28px;
                    overflow: visible;
                }
                #stats-wrapper.pinned #stats-container {
                    width: 320px !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                    padding: 18px 28px !important;
                    overflow: visible !important;
                    position: fixed !important;
                    right: 0 !important;
                    left: unset !important;
                    top: 120px !important;
                    z-index: 10002 !important;
                }
                #stats-wrapper.pinned #stats-button {
                    display: none !important;
                }
                #stats-pin-btn {
                    display: block;
                    color: #888;
                    background: none;
                    border: none;
                    font-size: 22px;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    z-index: 10002;
                    user-select: none;
                    outline: none;
                    transition: transform 0.1s, color 0.2s;
                }
                #stats-pin-btn.pinned {
                    color: #ffb300;
                    transform: rotate(-30deg);
                }
                #stats-container .pixel-title {
                    margin-bottom: 14px;
                    text-align: center;
                    font-size: 20px;
                    color: #ff9100;
                    text-shadow: 2px 2px 0 #fffbe6, 0 0 2px #ffb300;
                    letter-spacing: 2px;
                }
                .pixel-stat-box {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    background: #fffbe6;
                    border: 3px solid #ffb300;
                    border-radius: 0;
                    padding: 8px 12px;
                    box-shadow: 2px 2px 0 #ffec80;
                    transition: background 0.2s, box-shadow 0.2s, opacity 0.2s;
                    font-size: 15px;
                }
                .pixel-stat-box:last-child { margin-bottom: 0; }
                .pixel-stat-box:hover {
                    background: #ffe066;
                    box-shadow: 0 0 8px 2px #ffd700;
                }
                .pixel-icon {
                    width: 22px;
                    height: 22px;
                    margin-right: 12px;
                    image-rendering: pixelated;
                    display: inline-block;
                }
            `;
            document.head.appendChild(style);
        }

        // Get NPCs talked to count from cookies
        let npcsTalkedTo = 0;
        const cookies = document.cookie.split(';');
        const npcsCookie = cookies.find(cookie => cookie.trim().startsWith('npcsTalkedTo='));
        if (npcsCookie) {
            npcsTalkedTo = parseInt(npcsCookie.split('=')[1]) || 0;
        }

        // Pixel-art icons (free, open source)
        const coinIcon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1fa99.png'; // 🪙
        const accuracyIcon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3af.png'; // 🎯
        const npcIcon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9d1-200d-1f3a4.png'; // 🧑‍🎤
        const statsIcon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3ae.png'; // 🎮

        // Create the button
        const statsButton = document.createElement('div');
        statsButton.id = 'stats-button';
        statsButton.innerHTML = `<img src="${statsIcon}" alt="Stats" title="Show Player Stats" style="width:38px;height:38px;image-rendering:pixelated;" />`;

        // Create the panel
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.tabIndex = 0;
        // Add a pin button (always visible when expanded)
        const pinButton = document.createElement('button');
        pinButton.id = 'stats-pin-btn';
        pinButton.innerText = '📌';
        pinButton.title = 'Pin/unpin';
        pinButton.style.position = 'absolute';
        pinButton.style.top = '10px';
        pinButton.style.right = '10px';
        pinButton.style.background = 'none';
        pinButton.style.border = 'none';
        pinButton.style.fontSize = '22px';
        pinButton.style.cursor = 'pointer';
        pinButton.style.zIndex = '10002';
        pinButton.style.userSelect = 'none';
        pinButton.style.outline = 'none';
        pinButton.style.transition = 'transform 0.1s, color 0.2s';
        pinButton.addEventListener('mouseenter', () => pinButton.style.transform = 'scale(1.2)');
        pinButton.addEventListener('mouseleave', () => pinButton.style.transform = '');
        pinButton.addEventListener('click', (e) => {
            e.stopPropagation();
            setPinnedState(!pinned);
        });
        statsContainer.innerHTML = `
            <div class="pixel-title" style="position: relative;">
                <img class="pixel-icon" src="${statsIcon}" alt="Game" style="width:22px;height:22px;margin-right:8px;vertical-align:middle;" />
                <span style="font-family: 'Press Start 2P', 'VT323', monospace;">PLAYER STATS</span>
                <img class="pixel-icon" src="${statsIcon}" alt="Game" style="width:22px;height:22px;margin-left:8px;vertical-align:middle;" />
            </div>
            <div class="pixel-stat-box">
                <img class="pixel-icon" src="${coinIcon}" alt="Coin" style="width:22px;height:22px;vertical-align:middle;" />
                <span style="color: #ffb300;">Balance:</span> <span id="balance" style="margin-left: 6px;">0</span>
            </div>
            <div class="pixel-stat-box">
                <img class="pixel-icon" src="${accuracyIcon}" alt="Accuracy" style="width:22px;height:22px;vertical-align:middle;" />
                <span style="color: #ffb300;">Question Accuracy:</span> <span id="questionAccuracy" style="margin-left: 6px;">0%</span>
            </div>
            <div class="pixel-stat-box">
                <img class="pixel-icon" src="${npcIcon}" alt="NPC" style="width:22px;height:22px;vertical-align:middle;" />
                <span style="color: #ffb300;">NPCs Talked To:</span> <span id="npcsTalkedTo" style="margin-left: 6px;">${npcsTalkedTo}</span>
            </div>
            <div id="npcs-progress-bar-container" style="width: 100%; margin-top: 6px; margin-bottom: 2px; height: 18px; background: #fffbe6; border: 2px solid #ffb300; border-radius: 4px; box-shadow: 1px 1px 0 #ffec80; position: relative; overflow: hidden;">
                <div id="npcs-progress-bar" style="height: 100%; width: ${(Math.min(npcsTalkedTo, TOTAL_NPCS) / TOTAL_NPCS) * 100}%; background: repeating-linear-gradient(135deg, #ffe066, #ffd700 8px, #ffb300 12px, #ffe066 16px); image-rendering: pixelated; transition: width 0.3s;"></div>
                <span id="npcs-progress-label" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-family: 'Press Start 2P', 'VT323', monospace; font-size: 12px; color: #3a2c00; text-shadow: 1px 1px 0 #fffbe6; pointer-events: none;">${npcsTalkedTo} / ${TOTAL_NPCS}</span>
            </div>
        `;
        statsContainer.appendChild(pinButton);

        // Add to DOM
        statsWrapper.appendChild(statsButton);
        statsWrapper.appendChild(statsContainer);
        document.body.appendChild(statsWrapper);

        // --- PINNED STATE LOGIC ---
        let pinned = false;
        function setPinnedState(isPinned) {
            pinned = isPinned;
            if (pinned) {
                statsWrapper.classList.add('pinned');
                pinButton.classList.add('pinned');
                statsButton.classList.add('pinned');
                statsButton.style.display = 'none';
                statsContainer.style.position = 'fixed';
                statsContainer.style.right = '0';
                statsContainer.style.left = '';
                statsContainer.style.width = '320px';
                statsContainer.style.opacity = '1';
                statsContainer.style.pointerEvents = 'auto';
                statsContainer.style.padding = '18px 28px';
                statsContainer.style.overflow = 'visible';
                statsContainer.style.zIndex = '10002';
            } else {
                statsWrapper.classList.remove('pinned');
                pinButton.classList.remove('pinned');
                statsButton.classList.remove('pinned');
                statsButton.style.display = '';
                statsContainer.style.position = '';
                statsContainer.style.right = '60px';
                statsContainer.style.left = 'auto';
                statsContainer.style.width = '';
                statsContainer.style.opacity = '';
                statsContainer.style.pointerEvents = '';
                statsContainer.style.padding = '';
                statsContainer.style.overflow = '';
                statsContainer.style.zIndex = '';
            }
            // Pin color/rotation
            pinButton.style.color = pinned ? '#ffb300' : '#888';
            pinButton.style.transform = pinned ? 'rotate(-30deg)' : '';
        }
        // If pinned, prevent hover from closing; if not pinned, allow hover
        statsWrapper.addEventListener('mouseleave', () => {
            if (pinned) {
                setPinnedState(true);
            }
        });
        // Optional: clicking anywhere else unpins
        document.addEventListener('click', (e) => {
            if (pinned && !statsWrapper.contains(e.target)) {
                setPinnedState(false);
            }
        });
        // --- END PINNED STATE LOGIC ---
    }

    updateNpcsTalkedToUI(count) {
        const npcsSpan = document.getElementById('npcsTalkedTo');
        if (npcsSpan) {
            npcsSpan.textContent = count;
        }
        // Update progress bar
        const bar = document.getElementById('npcs-progress-bar');
        const label = document.getElementById('npcs-progress-label');
        if (bar && label) {
            const TOTAL_NPCS = 10;
            bar.style.width = `${(Math.min(count, TOTAL_NPCS) / TOTAL_NPCS) * 100}%`;
            label.textContent = `${count} / ${TOTAL_NPCS}`;
        }
    }

    incrementNpcsTalkedTo() {
        // Get current count from cookies
        let npcsTalkedTo = 0;
        const cookies = document.cookie.split(';');
        const npcsCookie = cookies.find(cookie => cookie.trim().startsWith('npcsTalkedTo='));
        if (npcsCookie) {
            npcsTalkedTo = parseInt(npcsCookie.split('=')[1]) || 0;
        }
        npcsTalkedTo += 1;
        // Update cookie (expires in 30 days)
        document.cookie = `npcsTalkedTo=${npcsTalkedTo}; path=/; max-age=${60*60*24*30}`;
        this.updateNpcsTalkedToUI(npcsTalkedTo);
    }
}

class InventoryManager {
    constructor(game) {
        this.game = game;
        this.inventory = Inventory.getInstance();
    }

    giveItem(itemId, quantity = 1) {
        const item = defaultItems[itemId];
        if (!item) {
            console.error(`Item ${itemId} not found in defaultItems`);
            return false;
        }

        const itemToAdd = {
            ...item,
            quantity: quantity
        };

        return this.inventory.addItem(itemToAdd);
    }

    removeItem(itemId, quantity = 1) {
        return this.inventory.removeItem(itemId, quantity);
    }

    hasItem(itemId) {
        return this.inventory.items.some(item => item.id === itemId);
    }

    getItemQuantity(itemId) {
        const item = this.inventory.items.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    }

    giveStartingItems() {
        this.giveItem('stock_certificate', 5);
        this.giveItem('bond', 3);
        this.giveItem('trading_boost', 2);
        this.giveItem('speed_boost', 2);
        this.giveItem('calculator', 1);
        this.giveItem('market_scanner', 1);
        this.giveItem('rare_coin', 1);
        this.giveItem('trading_manual', 1);
        this.giveItem('roi_calculator', 1);
    }
}

class QuizManager {
    constructor(game) {
        this.game = game;
    }

    async fetchQuestionByCategory(category) {
        try {
            const personId = this.game.id;
            const response = await fetch(
                `${this.game.javaURI}/rpg_answer/getQuestion?category=${category}&personid=${personId}`, 
                this.game.fetchOptions
            );
    
            if (!response.ok) throw new Error("Failed to fetch questions");
            const questions = await response.json();
            return questions;
        } catch (error) {
            console.error("Error fetching question by category:", error);
            return null;
        }
    }
    
    async attemptQuizForNpc(npcCategory, callback = null) {
        try {
            const response = await this.fetchQuestionByCategory(npcCategory);
            const allQuestions = response?.questions || [];
    
            if (allQuestions.length === 0) {
                alert(`✅ You've already completed all of ${npcCategory}'s questions!`);
                return;
            }
    
            const quiz = new Quiz();
            quiz.initialize();
            quiz.openPanel(npcCategory, callback, allQuestions);
        } catch (error) {
            console.error("Error during NPC quiz attempt:", error);
            alert("⚠️ There was a problem loading the quiz. Please try again.");
        }
    }
}

class Game {
    constructor(environment) {
        this.environment = environment;
        this.path = environment.path;
        this.gameContainer = environment.gameContainer;
        this.gameCanvas = environment.gameCanvas;
        this.pythonURI = environment.pythonURI;
        this.javaURI = environment.javaURI;
        this.fetchOptions = environment.fetchOptions;
        this.uid = null;
        this.id = null;
        this.gname = null;

        this.statsManager = new StatsManager(this);
        this.inventoryManager = new InventoryManager(this);
        this.quizManager = new QuizManager(this);
        
        this.initUser();
        this.inventoryManager.giveStartingItems();
        
        const gameLevelClasses = environment.gameLevelClasses;
        new GameControl(this, gameLevelClasses).start();
    }

    static main(environment) {
        return new Game(environment);
    }

    initUser() {
        const pythonURL = this.pythonURI + '/api/id';
        fetch(pythonURL, this.fetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                this.uid = data.uid;

                const javaURL = this.javaURI + '/rpg_answer/person/' + this.uid;
                return fetch(javaURL, this.fetchOptions);
            })
            .then(response => {
                if (!response || !response.ok) {
                    throw new Error(`Spring server response: ${response?.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                this.id = data.id;
                this.statsManager.fetchStats(data.id);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    giveItem(itemId, quantity = 1) {
        return this.inventoryManager.giveItem(itemId, quantity);
    }

    removeItem(itemId, quantity = 1) {
        return this.inventoryManager.removeItem(itemId, quantity);
    }

    hasItem(itemId) {
        return this.inventoryManager.hasItem(itemId);
    }

    getItemQuantity(itemId) {
        return this.inventoryManager.getItemQuantity(itemId);
    }

    attemptQuizForNpc(npcCategory, callback = null) {
        return this.quizManager.attemptQuizForNpc(npcCategory, callback);
    }
}

export default Game;