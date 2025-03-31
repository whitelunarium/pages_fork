import GameControl from './GameControl.js';
import GameLevelWater from "./GameLevelWater.js";
import GameLevelDesert from "./GameLevelAirport.js";
import GameLevelAirport from "./GameLevelAirport.js";
import GameLevelSquares from './GameLevelSquares.js';
import GameLevelSiliconValley from './GameLevelSiliconValley.js';

class Game {
    // initialize user and launch GameControl 
    static main(environment) {
        // setting Web Application path
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
        const gameLevelClasses = [GameLevelAirport, GameLevelSiliconValley];
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
            questionsAnswered: this.javaURI + '/rpg_answer/getQuestionsAnswered/' + personId
        };

        for (let [key, url] of Object.entries(endpoints)) {
            fetch(url, this.fetchOptions)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(key).innerHTML = data ?? 0;
                    localStorage.setItem(key, data ?? 0);
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
            const response = await fetch(`${this.javaURI}/rpg_answer/getQuestion?category=${category}`, this.fetchOptions);
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

    static async transitionToSiliconValley(personId) {
        try {
            const response = await fetch(`${this.javaURI}/question/transitionToSiliconValley?personId=${personId}`, this.fetchOptions);
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            const questionsAnswered = await response.json();
            console.log(questionsAnswered);
            return questionsAnswered >= 6;
        } catch (error) {
            console.error("Error transitioning to Silicon Valley:", error);
            return null;
        }
    }

    static async transitionToParadise(personId) {
        try {
            const response = await fetch(`${this.javaURI}/question/transitionToParadise?personId=${personId}`, this.fetchOptions);
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            const boolean = await response.json();
            console.log(boolean);
            return boolean;
        } catch (error) {
            console.error("Error transitioning to Paradise:", error);
            return null;
        }
    }

    static initStatsUI() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '75px';
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';

        const cookies = document.cookie.split(';');
        const gameKeyCookie = cookies.find(cookie => cookie.trim().startsWith('gameKey='));
        const meteorKeyStatus = gameKeyCookie ? '✅ Meteor Key Earned' : '❌ Meteor Key Not Earned';

        statsContainer.innerHTML = `
            <div>Balance: <span id="balance">0</span></div>
            <div>Questions Answered: <span id="questionsAnswered">0</span></div>
            <div style="color: ${gameKeyCookie ? '#00ff00' : '#ff4444'}">${meteorKeyStatus}</div>
        `;
        document.body.appendChild(statsContainer);
    }
}

export default Game;
