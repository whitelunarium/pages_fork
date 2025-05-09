import GameControl from './GameEngine/GameControl.js';
import Quiz from './Quiz.js';
import Inventory from "./Inventory.js";
import { defaultItems } from "./items.js";

class StatsManager {
    constructor(game) {
        this.game = game;
        this.initStatsUI();
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
            console.error("Error transitioning to Paradise:", error);
            return null;
        }
    }

    initStatsUI() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        Object.assign(statsContainer.style, {
            position: 'fixed',
            top: '75px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px'
        });
    
        const cookies = document.cookie.split(';');
        const gameKeyCookie = cookies.find(cookie => cookie.trim().startsWith('gameKey='));
        const meteorKeyStatus = gameKeyCookie ? '✅ Meteor Key Earned' : '❌ Meteor Key Not Earned';
    
        statsContainer.innerHTML = `
            <div>Balance: <span id="balance">0</span></div>
            <div>Question Accuracy: <span id="questionAccuracy">0%</span></div>
            <div style="color: ${gameKeyCookie ? '#00ff00' : '#ff4444'}">${meteorKeyStatus}</div>
        `;
        document.body.appendChild(statsContainer);
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

    // Static method to maintain compatibility with the existing code
    static main(environment) {
        // Create a new Game instance with the environment
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

    // Public API methods for simplicity
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