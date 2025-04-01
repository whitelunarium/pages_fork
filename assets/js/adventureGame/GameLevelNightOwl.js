import GameEnvBackground from './GameEnvBackground.js';
import Player from './Player.js';
import Npc from './Npc.js';
import GameControl from './GameControl.js';

class GameLevelNightOwl {
    constructor(gameEnv) {
        // Store the game environment
        this.gameEnv = gameEnv;
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;

        // Set continue flag to true to keep the level running
        this.continue = true;

        // Game state
        this.currentStage = 'start'; // 'start', 'bossFight', 'ratFight'
        this.questionsAnswered = 0;

        // Questions database
        this.questions = {
            boss: {
                question: "What is the correct way to initialize an ArrayList of integers in Java?",
                options: [
                    "ArrayList<Integer> list = new ArrayList<Integer>();",
                    "ArrayList<int> list = new ArrayList<int>();",
                    "ArrayList list = new ArrayList();",
                    "Array<Integer> list = new Array<Integer>();"
                ],
                correct: 0
            },
            rat: {
                question: "Which method is used to add an element to an ArrayList in Java?",
                options: [
                    "list.push(element)",
                    "list.add(element)",
                    "list.append(element)",
                    "list.insert(element)"
                ],
                correct: 1
            }
        };

        // Background for dark forest
        const image_src_nightowl = path + "/images/gamify/nightowl-background.png";
        const image_data_nightowl = {
            name: 'Night Owl Challenge',
            greeting: "Welcome to the Dark Forest!",
            src: image_src_nightowl,
            pixels: { height: 1024, width: 1024 }
        };

        // Player character
        const sprite_src_chillguy = path + "/images/gamify/chillguy.png";
        const CHILLGUY_SCALE_FACTOR = 5;
        const sprite_data_chillguy = {
            id: 'Player',
            greeting: "Time to explore the dark forest!",
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

        // Boss Bug NPC
        const sprite_src_bug = path + "/images/gamify/zombiebug.png";
        const sprite_data_bug = {
            id: 'BossBug',
            greeting: "I am the guardian of the dark forest!",
            src: sprite_src_bug,
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
            interact: function() {
                // Simple interaction without state change
                alert("You've encountered the boss!");
            }
        };

        // Zombie Rat NPC
        const sprite_src_rat = path + "/images/gamify/zombierat.png";
        const sprite_data_rat = {
            id: 'ZombieRat',
            greeting: "SQUEAK! Answer correctly or become my dinner!",
            src: sprite_src_rat,
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 50,
            pixels: { height: 384, width: 512 },
            INIT_POSITION: { x: width * 0.85, y: height * 0.4 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            reaction: function() {
                alert(this.greeting);
            },
            interact: () => this.handleRatInteraction()
        };

        // Initialize game objects
        this.classes = [
            { class: GameEnvBackground, data: image_data_nightowl },
            { class: Player, data: sprite_data_chillguy },
            { class: Npc, data: sprite_data_bug },
            { class: Npc, data: sprite_data_rat }
        ];

        // Store NPC data for later use
        this.bossData = sprite_data_bug;
        this.ratData = sprite_data_rat;
    }

    // Required method to keep the game running
    update() {
        // This empty update method is required
        // It prevents the game from ending prematurely
    }

    // Initialize method
    initialize() {
        console.log("Night Owl level initialized");
        // Make sure the continue flag is set
        this.continue = true;
    }

    // Cleanup method
    destroy() {
        console.log("Night Owl level destroyed");
        // Only set continue to false when we actually want to end the level
        this.continue = false;
    }

    handleBossInteraction() {
        const question = this.questions.boss;
        const options = question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n');
        const answer = prompt(`${question.question}\n\n${options}\n\nEnter the number of your answer (1-4):`);
        
        if (answer && parseInt(answer) - 1 === question.correct) {
            alert("Correct! But can you handle my minion?");
            this.transitionToRat();
        } else {
            alert("Wrong! Try again, if you dare!");
        }
    }

    handleRatInteraction() {
        const question = this.questions.rat;
        const options = question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n');
        const answer = prompt(`${question.question}\n\n${options}\n\nEnter the number of your answer (1-4):`);
        
        if (answer && parseInt(answer) - 1 === question.correct) {
            alert("Congratulations! You've conquered the Dark Forest!");
            this.gameEnv.gameControl.gameOver();
        } else {
            alert("Wrong! The forest claims another victim!");
            this.gameEnv.gameControl.gameOver();
        }
    }

    transitionToRat() {
        // Remove boss and add rat
        const bossIndex = this.gameEnv.gameObjects.findIndex(obj => obj.spriteData && obj.spriteData.id === 'BossBug');
        if (bossIndex !== -1) {
            this.gameEnv.gameObjects[bossIndex].destroy();
            this.gameEnv.gameObjects.splice(bossIndex, 1);
        }
        
        // Add rat NPC
        const rat = new Npc(this.ratData, this.gameEnv);
        this.gameEnv.gameObjects.push(rat);
    }
}

export default GameLevelNightOwl;