import GameLevel from "./GameLevel.js";
import Inventory from "../Inventory.js";

class GameControl {
    static gameInstance = null;

    constructor(game, levelClasses) {
        GameControl.gameInstance = game;
        
        this.game = game;
        this.path = game.path;
        this.gameContainer = game.gameContainer;
        this.gameCanvas = game.gameCanvas;
        this.levelClasses = levelClasses;
        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.gameLoopCounter = 0;
        this.isPaused = false;
        this.nextLevelKeyListener = this.handleNextLevelKey.bind(this);
        this.gameOver = null;
        this.savedCanvasState = [];
        
        console.log(`GameControl initialized with ${levelClasses.length} level classes`);
        if (!Array.isArray(levelClasses) || levelClasses.length === 0) {
            console.error('LevelClasses must be a non-empty array', levelClasses);
        } else {
            levelClasses.forEach((levelClass, index) => {
                if (typeof levelClass !== 'function') {
                    console.error(`LevelClass at index ${index} is not a constructor`, levelClass);
                }
            });
        }
        this.canvasContexts = new Map();
        
        if (this.gameContainer) {
            this.gameContainer.gameControl = this;
        }
        
        console.log("Initializing inventory in GameControl...");
        this.inventory = Inventory.getInstance();
    }

    initializeCanvasContexts() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        canvasElements.forEach(canvas => {
            if (!this.canvasContexts.has(canvas)) {
                this.canvasContexts.set(canvas, canvas.getContext('2d', { willReadFrequently: true }));
            }
        });
    }

    start() {
        this.addExitKeyListener();
        this.initializeCanvasContexts();
        this.transitionToLevel();
    }

    transitionToLevel() {
        try {
            if (this.currentLevelIndex >= this.levelClasses.length) {
                console.error('Level index out of bounds:', this.currentLevelIndex);
                return;
            }
            
            const GameLevelClass = this.levelClasses[this.currentLevelIndex];
            
            if (typeof GameLevelClass !== 'function') {
                console.error('Invalid GameLevelClass:', GameLevelClass);
                return;
            }
            
            console.log(`Transitioning to level ${this.currentLevelIndex}: ${GameLevelClass.name}`);
            
            this.currentLevel = new GameLevel(this);
            this.currentLevel.create(GameLevelClass);
            this.gameLoop();
        } catch (error) {
            console.error('Error in transitionToLevel:', error);
        }
        const GameLevelClass = this.levelClasses[this.currentLevelIndex];
        this.currentLevel = new GameLevel(this);
        this.currentLevel.create(GameLevelClass);
        this.initializeCanvasContexts();
        this.gameLoop();
    }

    gameLoop() {
        if (!this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }
        if (this.isPaused) {
            return;
        }
        if (this.currentLevel.restart) {
            this.restartLevel();
            return;
        }
        this.currentLevel.update();
        this.handleInLevelLogic();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleInLevelLogic() {
        if (this.currentLevelIndex === 0 && this.gameLoopCounter === 0) {
            console.log("Start Level.");
        }
        this.gameLoopCounter++;
    }

    handleLevelEnd() {
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else {
            alert("All levels completed.");
        }
        
        if (this.currentLevel) {
            this.currentLevel.destroy();
        }
        
        if (this.gameOver) {
            this.gameOver();
        } else {
            this.currentLevelIndex++;
            if (this.currentLevelIndex < this.levelClasses.length) {
                this.transitionToLevel();
            } else {
                console.log("All levels completed, no more levels to transition to.");
            }
        }
    }


    handleExitKey(event) {
        if (event.key === 'Escape') {
            this.currentLevel.continue = false;
        }
    }


    /**
     * Exit key handler to end the current level
     * @param {*} event - The keydown event object
     */

    handleNextLevelKey(event) {
        if (event.key.toLowerCase() === 't' || event.key.toLowerCase() === 'Escape') {
            if (this.currentLevelIndex < this.levelClasses.length - 1) {
                console.log("Hotkey 't' pressed: Transitioning to next level.");
                this.currentLevel.continue = false;
            } else {
                alert("🎉 You're on the final level! There are no more levels to transition to.");
            }
        }
    }
    
    addExitKeyListener() {
        document.addEventListener('keydown', this.exitKeyListener);
        document.addEventListener('keydown', this.nextLevelKeyListener);
    }
    
    removeExitKeyListener() {
        document.removeEventListener('keydown', this.exitKeyListener);
        document.removeEventListener('keydown', this.nextLevelKeyListener);
    }
    
    getCanvasContext(canvas) {
        if (!this.canvasContexts.has(canvas)) {
            this.canvasContexts.set(canvas, canvas.getContext('2d', { willReadFrequently: true }));
        }
        return this.canvasContexts.get(canvas);
    }

    saveCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        this.initializeCanvasContexts();
        this.savedCanvasState = Array.from(canvasElements).map(canvas => {
            return {
                id: canvas.id,
                imageData: this.getCanvasContext(canvas).getImageData(0, 0, canvas.width, canvas.height)
            };
        });
    }

    hideCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        canvasElements.forEach(canvas => {
            if (canvas.id !== 'gameCanvas') {
                canvas.style.display = 'none';
            }
        });
    }

    showCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        this.savedCanvasState.forEach(hidden_canvas => {
            const canvas = document.getElementById(hidden_canvas.id);
            if (canvas) {
                canvas.style.display = 'block';
                this.getCanvasContext(canvas).putImageData(hidden_canvas.imageData, 0, 0);
            }
        });
    }

    pause() {
        this.isPaused = true;
        this.removeExitKeyListener();
        this.saveCanvasState();
        this.hideCanvasState();
     }

    resume() {
        this.isPaused = false;
        this.addExitKeyListener();
        this.showCanvasState();
        this.gameLoop();
    }

    restartLevel() {
        if (this.currentLevel) {
            this.currentLevel.destroy();
        }
        this.gameLoopCounter = 0;
        this.transitionToLevel();
    }
}

export default GameControl;