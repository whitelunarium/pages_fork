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
        

        // start the game
        // const gameLevelClasses = [GameLevelAirport, GameLevelSiliconValley]
        // new GameControl(this, gameLevelClasses).start();

        // Show instructions before starting the game
        this.showInstructions(() => {
            // start the game after instructions are closed
            const gameLevelClasses = [GameLevelAirport, GameLevelSiliconValley]
            new GameControl(this, gameLevelClasses).start();
        });
    }

    static showInstructions(callback) {
        // Create the instructions popup
        const instructionsDiv = document.createElement('div');
        instructionsDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(0, 32, 64, 0.98) 0%, rgba(0, 16, 32, 0.98) 100%);
            color: white;
            border-radius: 15px;
            width: 65%;
            max-width: 850px;
            max-height: 85%;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 128, 0.2);
            border: 1px solid rgba(0, 255, 128, 0.3);
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif;
            opacity: 0;
            animation: fadeIn 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        `;

        // Create the content
        instructionsDiv.innerHTML = `
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -45%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
                
                @keyframes slideIn {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .panel-header {
                    position: sticky;
                    top: 0;
                    background: linear-gradient(135deg, rgba(0, 32, 64, 0.98) 0%, rgba(0, 16, 32, 0.98) 100%);
                    padding: 20px 25px 5px;
                    border-bottom: 1px solid rgba(0, 255, 128, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1;
                }
                
                .panel-content {
                    padding: 5px 25px 30px;
                }
                
                .panel-section {
                    background: rgba(0, 255, 128, 0.03);
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-left: 3px solid #00ff80;
                    position: relative;
                    overflow: hidden;
                    animation: slideIn 0.5s ease forwards;
                    opacity: 0;
                }
                
                .panel-section:nth-child(1) { animation-delay: 0.2s; }
                .panel-section:nth-child(2) { animation-delay: 0.3s; }
                .panel-section:nth-child(3) { animation-delay: 0.4s; }
                
                .start-button {
                    background: linear-gradient(45deg, #00ff80, #00cc66);
                    color: #003300;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: block;
                    margin: 20px auto;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0, 255, 128, 0.3);
                }
                
                .start-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 255, 128, 0.4);
                }
                
                .start-button:active {
                    transform: translateY(0);
                }

                .stock-ticker {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0, 255, 128, 0.1);
                    padding: 5px 10px;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    color: #00ff80;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .positive-change {
                    color: #00ff80;
                }

                .negative-change {
                    color: #ff4444;
                }
            </style>
            
            <div class="stock-ticker">
                <span class="positive-change">📈 AAPL +2.5%</span> | 
                <span class="positive-change">GOOGL +1.8%</span> | 
                <span class="positive-change">MSFT +3.2%</span> | 
                <span class="positive-change">AMZN +1.9%</span> | 
                <span class="negative-change">TSLA -4.1%</span> 📉
            </div>
            
            <div class="panel-header">
                <h2 style="
                    margin: 0;
                    font-size: 22px;
                    font-weight: 600;
                    color: white;
                    display: flex;
                    align-items: center;
                ">
                    <span style="
                        background: linear-gradient(45deg, #00ff80, #00cc66);
                        border-radius: 50%;
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 12px;
                        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
                    ">💼</span>
                    Financial Adventure
                </h2>
            </div>
            
            <div class="panel-content">
                <div class="panel-section">
                    <h3 style="
                        margin: 0 0 15px 0;
                        color: #00ff80;
                        font-size: 18px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                    ">
                        <span style="
                            background: linear-gradient(45deg, #00ff80, #00cc66);
                            border-radius: 50%;
                            width: 26px;
                            height: 26px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 10px;
                            font-size: 14px;
                            color: #003300;
                        ">⌨️</span>
                        Trading Controls
                    </h3>
                    <p style="margin: 0; line-height: 1.6; color: rgba(255, 255, 255, 0.9); font-size: 15px;">
                        • WASD - Navigate the trading floor<br>
                        • E/U - Interact with financial advisors<br>
                        • ESC - Exit trading sessions
                    </p>
                </div>
                
                <div class="panel-section">
                    <h3 style="
                        margin: 0 0 15px 0;
                        color: #00ff80;
                        font-size: 18px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                    ">
                        <span style="
                            background: linear-gradient(45deg, #00ff80, #00cc66);
                            border-radius: 50%;
                            width: 26px;
                            height: 26px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 10px;
                            font-size: 14px;
                            color: #003300;
                        ">📊</span>
                        Trading Partners
                    </h3>
                    <p style="margin: 0; line-height: 1.6; color: rgba(255, 255, 255, 0.9); font-size: 15px;">
                        • Market Analyst - Stock Trading Game<br>
                        • Investment Banker - Portfolio Management<br>
                        • Financial Advisor - Investment Quizzes<br>
                        • Crypto Expert - Cryptocurrency Trading<br>
                        • Risk Manager - Risk Assessment Games
                    </p>
                </div>
                
                <button id="startGameBtn" class="start-button">Start Trading</button>
                
                <div style="
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.5);
                ">
                    Press ESC key or click outside to close
                </div>
            </div>
        `;

        // Add the popup to the document
        document.body.appendChild(instructionsDiv);

        // Add click handler for the start button
        document.getElementById('startGameBtn').addEventListener('click', () => {
            instructionsDiv.style.animation = 'fadeOut 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards';
            setTimeout(() => {
                instructionsDiv.remove();
                if (callback) callback();
            }, 400);
        });

        // Add ESC key handler
        const escKeyHandler = (e) => {
            if (e.key === 'Escape') {
                instructionsDiv.style.animation = 'fadeOut 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards';
                setTimeout(() => {
                    instructionsDiv.remove();
                    if (callback) callback();
                }, 400);
                document.removeEventListener('keydown', escKeyHandler);
            }
        };
        document.addEventListener('keydown', escKeyHandler);
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
                console.log("User ID:", this.uid);  // Ensure this prints correctly
    
                // Now that this.uid is set, fetch from the Java backend
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
            chatScore: this.javaURI + '/rpg_answer/getChatScore/' + personId,
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
                body: JSON.stringify({
                    uid: uid,
                    gname: gname,
                    stats: stats
                })
            });
     
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            return data; // returns the stats JSON
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
                body: JSON.stringify({
                    uid: uid,
                    gname: gname,
                    stats: stats
                })
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
            console.log("Submitting answer with:", {
                questionId,     // should be a valid number
                choiceId,       // should be a valid number
                personId        // should be a valid number
            });
            
            const response = await fetch(this.javaURI + '/rpg_answer/submitMCQAnswer', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionId: questionId,
                    personId: personId,
                    choiceId: choiceId
                })
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
            if (questionsAnswered >= 6) {
                return true;
            } else {
                return false;
            }
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
        
        // Check for meteor game cookie
        const cookies = document.cookie.split(';');
        const gameKeyCookie = cookies.find(cookie => cookie.trim().startsWith('gameKey='));
        const meteorKeyStatus = gameKeyCookie ? '✅ Meteor Key Earned' : '❌ Meteor Key Not Earned';
        
        statsContainer.innerHTML = `
          <div>Balance: <span id="balance">0</span></div>
          <div>Chat Score: <span id="chatScore">0</span></div>
          <div>Questions Answered: <span id="questionsAnswered">0</span></div>
          <div style="color: ${gameKeyCookie ? '#00ff00' : '#ff4444'}">${meteorKeyStatus}</div>
        `;
        document.body.appendChild(statsContainer);
    }
}
export default Game;
