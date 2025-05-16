import GameControl from './GameEngine/GameControl.js';
import Quiz from './Quiz.js';
import Inventory from "./Inventory.js";
import { defaultItems } from "./items.js";

class Game {
    constructor() {
        // initialize user and launch GameControl 
        this.main(environment);
        console.log("Initializing game inventory...");
        this.inventory = Inventory.getInstance();
        
        // Give starting items to the player
        this.giveStartingItems();
    }

    // initialize user and launch GameControl 
    static main(environment) {
        // setting Web Application path
        this.environment = environment;
        this.path = environment.path;

        // setting Element IDs
        this.gameContainer = environment.gameContainer;
        this.gameCanvas = environment.gameCanvas;

        // setting API environment variables 
        this.pythonURI = environment.pythonURI;
        this.javaURI = environment.javaURI;
        this.fetchOptions = environment.fetchOptions;

        // prepare user data for scoring and stats 
        this.uid;
        this.id;
        this.initUser();
        this.initStatsUI();

        this.gname = null;

        // start the game immediately
        const gameLevelClasses = environment.gameLevelClasses;
        new GameControl(this, gameLevelClasses).start();
    }

    static initUser() {
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
                console.log("User ID:", this.uid);

                const javaURL = this.javaURI + '/rpg_answer/person/' + this.uid;
                return fetch(javaURL, this.fetchOptions);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Spring server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                this.id = data.id;
                this.fetchStats(data.id);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    static fetchStats(personId) {
        const endpoints = {
            balance: this.javaURI + '/rpg_answer/getBalance/' + personId,
            questionAccuracy: this.javaURI + '/rpg_answer/getQuestionAccuracy/' + personId
        };
    
        for (let [key, url] of Object.entries(endpoints)) {
            fetch(url, this.fetchOptions)
                .then(response => response.json())
                .then(data => {
                    if (key === "questionAccuracy") {
                        const accuracyPercent = Math.round((data ?? 0) * 100);
                        document.getElementById(key).innerHTML = `${accuracyPercent}%`;
                        localStorage.setItem(key, `${accuracyPercent}%`);
                    } else {
                        document.getElementById(key).innerHTML = data ?? 0;
                        localStorage.setItem(key, data ?? 0);
                    }
                })
                .catch(err => console.error(`Error fetching ${key}:`, err));
        }
    }

    static async createStats(stats, gname, uid) {
        try {
            const response = await fetch(`${this.javaURI}/createStats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid, gname, stats })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating stats:", error);
            return "Error creating stats";
        }
    }

    static async getStats(uid) {
        try {
            const response = await fetch(`${this.javaURI}/getStats/${uid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching stats:", error);
            return "Error fetching stats";
        }
    }

    static async updateStats(stats, gname, uid) {
        try {
            const response = await fetch(`${this.javaURI}/updateStats`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid, gname, stats })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating stats:", error);
            return "Error updating stats";
        }
    }

    static async fetchQuestionByCategory(category) {
        try {
            const personId = this.id;
            const response = await fetch(
                `${this.javaURI}/rpg_answer/getQuestion?category=${category}&personid=${personId}`, 
                this.fetchOptions
            );
    
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
    
            const questions = await response.json();
            console.log(questions);
            return questions;
        } catch (error) {
            console.error("Error fetching question by category:", error);
            return null;
        }
    }
    
    static async attemptQuizForNpc(npcCategory, callback = null) {
        const personId = this.id;
    
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
    
    static async updateStatsMCQ(questionId, choiceId, personId) {
        try {
            console.log("Submitting answer with:", { questionId, choiceId, personId });

            const response = await fetch(this.javaURI + '/rpg_answer/submitMCQAnswer', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionId, personId, choiceId })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response;
        } catch (error) {
            console.error("Error submitting MCQ answer:", error);
            throw error;
        }
    }

    static async transitionToWallstreet(personId) {
        try {
            const response = await fetch(`${this.javaURI}/question/transitionToWallstreet/${personId}`, this.fetchOptions);
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            const questionsAnswered = await response.json();
            return questionsAnswered >=6;
        } catch (error) {
            console.error("Error transitioning to Paradise:", error);
            return null;
        }
    }

    // Static properties for tracking progress
    static npcInteractions = new Set();
    static totalNpcs = 6;
    static npcOrder = [
        { id: 'Fidelity', hint: 'Talk to Fidelity to learn about investments' },
        { id: 'Schwab', hint: 'Visit Schwab for more financial wisdom' },
        { id: 'Tech Owl', hint: 'Check the Tech Owl for market updates' },
        { id: 'Investor', hint: 'Meet the Investor to discuss trading' },
        { id: 'Market Computer', hint: 'Use the Market Computer for real-time data' },
        { id: 'Pilot', hint: 'Ready to move on! Talk to the Pilot to proceed' }
    ];
    static gameSteps = [
        { id: 'start', text: 'Start Adventure', completed: true },
        { id: 'talk_npcs', text: 'Talk to NPCs', completed: false },
        { id: 'meteor_key', text: 'Get Meteor Key', completed: false },
        { id: 'complete_quizzes', text: 'Complete Quizzes', completed: false },
        { id: 'reach_paradise', text: 'Reach Paradise', completed: false }
    ];

    static setCookie(name, value, days = 365) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    static loadProgressFromCookies() {
        // Load NPC interactions
        const npcCookie = this.getCookie('npc_interactions');
        if (npcCookie) {
            this.npcInteractions = new Set(JSON.parse(npcCookie));
        }

        // Load game steps
        const stepsCookie = this.getCookie('game_steps');
        if (stepsCookie) {
            const savedSteps = JSON.parse(stepsCookie);
            this.gameSteps.forEach((step, index) => {
                if (savedSteps[index]) {
                    step.completed = savedSteps[index].completed;
                }
            });
        }

        // Check for meteor key
        const gameKeyCookie = this.getCookie('gameKey');
        if (gameKeyCookie) {
            this.gameSteps[2].completed = true;
        }

        // Check for paradise
        const paradiseCookie = this.getCookie('paradise_reached');
        if (paradiseCookie) {
            this.gameSteps[4].completed = true;
        }

        // Update talk_npcs step based on NPC interactions
        this.gameSteps[1].completed = this.npcInteractions.size > 0;
        this.gameSteps[3].completed = this.npcInteractions.size >= this.totalNpcs;
    }

    static saveProgressToCookies() {
        // Save NPC interactions
        this.setCookie('npc_interactions', JSON.stringify([...this.npcInteractions]));

        // Save game steps
        this.setCookie('game_steps', JSON.stringify(this.gameSteps));

        // Save paradise progress if completed
        if (this.gameSteps[4].completed) {
            this.setCookie('paradise_reached', 'true');
        }
    }

    static getNextStep() {
        // If no NPCs talked to yet, direct to first NPC
        if (this.npcInteractions.size === 0) {
            return {
                type: 'npc',
                message: `Next Step: ${this.npcOrder[0].hint}`,
                target: this.npcOrder[0].id
            };
        }

        // If not all NPCs visited, find next unvisited NPC
        if (this.npcInteractions.size < this.totalNpcs - 1) { // -1 because Pilot is last
            for (let npc of this.npcOrder) {
                if (!this.npcInteractions.has(npc.id) && npc.id !== 'Pilot') {
                    return {
                        type: 'npc',
                        message: `Next Step: ${npc.hint}`,
                        target: npc.id
                    };
                }
            }
        }

        // If all NPCs except Pilot visited, direct to Pilot
        if (this.npcInteractions.size >= this.totalNpcs - 1 && !this.npcInteractions.has('Pilot')) {
            return {
                type: 'pilot',
                message: 'Next Step: You\'ve learned enough! Talk to the Pilot to continue your journey',
                target: 'Pilot'
            };
        }

        return {
            type: 'complete',
            message: 'You\'ve completed all steps in this area!',
            target: null
        };
    }

    static updateProgressUI() {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer) return;

        // Update NPC progress
        const npcProgressEl = statsContainer.querySelector('.npc-progress-fill');
        const npcCountEl = statsContainer.querySelector('.npc-count');
        if (npcProgressEl && npcCountEl) {
            const progress = (this.npcInteractions.size / this.totalNpcs) * 100;
            npcProgressEl.style.width = `${progress}%`;
            npcCountEl.textContent = `${this.npcInteractions.size}/${this.totalNpcs}`;
            console.log('Updating NPC progress:', this.npcInteractions.size, 'of', this.totalNpcs);
        }

        // Update game progress
        const completedSteps = this.gameSteps.filter(step => step.completed).length;
        const gameProgressEl = statsContainer.querySelector('.game-progress-fill');
        const gameCountEl = statsContainer.querySelector('.game-count');
        if (gameProgressEl && gameCountEl) {
            const progress = (completedSteps / this.gameSteps.length) * 100;
            gameProgressEl.style.width = `${progress}%`;
            gameCountEl.textContent = `${completedSteps}/${this.gameSteps.length}`;
        }

        // Update step indicators
        this.gameSteps.forEach((step, index) => {
            const stepEl = statsContainer.querySelector(`.game-step:nth-child(${index + 1})`);
            if (stepEl) {
                if (step.completed) {
                    stepEl.classList.add('completed');
                } else {
                    stepEl.classList.remove('completed');
                }
            }
        });

        // Force a reflow to ensure the UI updates
        statsContainer.style.display = 'none';
        statsContainer.offsetHeight; // Force reflow
        statsContainer.style.display = 'block';
    }

    static updateProgress(npcId) {
        console.log('Updating progress for NPC:', npcId);
        
        // Add NPC to interactions set if not already added
        if (!this.npcInteractions.has(npcId)) {
            this.npcInteractions.add(npcId);
            console.log('Current NPC interactions:', [...this.npcInteractions]);
            
            // Update game steps
            if (this.gameSteps) {
                const talkNpcsStep = this.gameSteps.find(step => step.id === 'talk_npcs');
                const completeQuizzesStep = this.gameSteps.find(step => step.id === 'complete_quizzes');
                
                if (talkNpcsStep) talkNpcsStep.completed = true;
                if (completeQuizzesStep) completeQuizzesStep.completed = this.npcInteractions.size >= this.totalNpcs;

                // Save progress to cookies
                this.saveProgressToCookies();

                // Update the UI
                this.updateProgressUI();

                // Show next step guidance
                this.showNextStepGuidance();
            } else {
                console.error('Game steps not properly initialized');
            }
        }
    }

    static showNextStepGuidance() {
        const nextStep = this.getNextStep();
        
        // Remove any existing guidance
        const existingGuidance = document.getElementById('next-step-guidance');
        if (existingGuidance) {
            existingGuidance.remove();
        }

        // Create new guidance element
        const guidance = document.createElement('div');
        guidance.id = 'next-step-guidance';
        guidance.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: #ffd700;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: 'Press Start 2P', monospace;
            font-size: 12px;
            border: 2px solid #ffd700;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
            z-index: 9999;
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
        `;

        // Add animation styles if not already present
        if (!document.getElementById('next-step-styles')) {
            const styles = document.createElement('style');
            styles.id = 'next-step-styles';
            styles.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 20px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(styles);
        }

        guidance.innerHTML = `
            <div style="margin-bottom: 5px; color: #fff; font-size: 10px;">NEXT OBJECTIVE</div>
            <div style="animation: pulse 2s infinite">${nextStep.message}</div>
        `;

        document.body.appendChild(guidance);

        // Remove guidance after 5 seconds
        setTimeout(() => {
            guidance.style.animation = 'fadeOut 0.5s ease-in forwards';
            setTimeout(() => guidance.remove(), 500);
        }, 5000);
    }

    static initStatsUI() {
        // Load saved progress before initializing UI
        this.loadProgressFromCookies();

        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '75px';
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';
        statsContainer.style.minWidth = '200px';
        statsContainer.style.fontFamily = "'Press Start 2P', monospace";
        statsContainer.style.fontSize = '10px';
        statsContainer.style.border = '2px solid #ffd700';
        statsContainer.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.3)';

        // Inject progress bar styles
        if (!document.getElementById('progress-bar-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'progress-bar-styles';
            styleSheet.textContent = `
                .progress-container {
                    margin: 8px 0;
                }
                .progress-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                    font-size: 8px;
                    color: #ffd700;
                }
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: #ffd700;
                    transition: width 0.3s ease;
                    border-radius: 4px;
                }
                .stats-divider {
                    height: 1px;
                    background: rgba(255, 215, 0, 0.3);
                    margin: 8px 0;
                }
                .game-step {
                    font-size: 8px;
                    color: #fff;
                    margin: 4px 0;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }
                .game-step.completed {
                    color: #ffd700;
                    opacity: 1;
                }
                .game-step:before {
                    content: '○';
                    margin-right: 5px;
                }
                .game-step.completed:before {
                    content: '●';
                    color: #ffd700;
                }
            `;
            document.head.appendChild(styleSheet);
        }

        const cookies = document.cookie.split(';');
        const gameKeyCookie = cookies.find(cookie => cookie.trim().startsWith('gameKey='));
        

        // Calculate initial progress
        if (gameKeyCookie) {
            this.gameSteps[2].completed = true;
        }

        const completedSteps = this.gameSteps.filter(step => step.completed).length;
        const npcCount = this.npcInteractions.size;

        statsContainer.innerHTML = `
            <div style="margin-bottom: 10px;">Balance: <span id="balance" style="color: #ffd700;">0</span></div>
            <div style="margin-bottom: 10px;">Accuracy: <span id="questionAccuracy" style="color: #ffd700;">0%</span></div>
            
            
            <div class="stats-divider"></div>
            
            <div class="progress-container">
                <div class="progress-label">
                    <span>NPCs Interacted</span>
                    <span class="npc-count">${npcCount}/${this.totalNpcs}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill npc-progress-fill" style="width: ${(npcCount / this.totalNpcs) * 100}%"></div>
                </div>
            </div>

            <div class="progress-container">
                <div class="progress-label">
                    <span>Game Progress</span>
                    <span class="game-count">${completedSteps}/${this.gameSteps.length}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill game-progress-fill" style="width: ${(completedSteps / this.gameSteps.length) * 100}%"></div>
                </div>
            </div>

            <div class="stats-divider"></div>
            
            ${this.gameSteps.map(step => `
                <div class="game-step ${step.completed ? 'completed' : ''}">
                    ${step.text}
                </div>
            `).join('')}
        `;

        document.body.appendChild(statsContainer);

        // Show initial guidance
        this.showNextStepGuidance();
    }

    // Add method to give items to player
    giveItem(itemId, quantity = 1) {
        console.log("Giving item:", itemId, "quantity:", quantity);
        const item = defaultItems[itemId];
        if (!item) {
            console.error(`Item ${itemId} not found in defaultItems`);
            return false;
        }

        const itemToAdd = {
            ...item,
            quantity: quantity
        };

        console.log("Adding item to inventory:", itemToAdd);
        return this.inventory.addItem(itemToAdd);
    }

    // Add method to remove items from player
    removeItem(itemId, quantity = 1) {
        return Inventory.getInstance().removeItem(itemId, quantity);
    }

    // Add method to check if player has an item
    hasItem(itemId) {
        return Inventory.getInstance().items.some(item => item.id === itemId);
    }

    // Add method to get item quantity
    getItemQuantity(itemId) {
        const item = Inventory.getInstance().items.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    }

    // Add method to give starting items
    giveStartingItems() {
        console.log("Giving starting items to player...");
        
        // Trading items
        this.giveItem('stock_certificate', 5);  // 5 stock certificates
        this.giveItem('bond', 3);               // 3 bonds
        
        // Power-ups
        this.giveItem('trading_boost', 2);      // 2 trading boosts
        this.giveItem('speed_boost', 2);        // 2 speed boosts
        
        // Tools
        this.giveItem('calculator', 1);         // 1 calculator
        this.giveItem('market_scanner', 1);     // 1 market scanner
        
        // Collectibles
        this.giveItem('rare_coin', 1);          // 1 rare coin
        this.giveItem('trading_manual', 1);     // 1 trading manual

        // Add ROI Calculator
        console.log("Adding ROI Calculator...");
        this.giveItem('roi_calculator', 1);     // 1 ROI Calculator
    }
}
export default Game;