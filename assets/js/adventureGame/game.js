import GameControl from './GameControl.js';

class Game {
    constructor() {
        if (!Game.instance) {
            this.stats = {};
            Game.instance = this;
        }
        return Game.instance;
    }

    // launch GameControl
    static main(path) {
        new GameControl(path).start();
    }

    /**
     * Start the game
     */
    startGame() {
        console.log("Game started");
        // Load environment, characters, and game levels
    }

    /**
     * Update game statistics (e.g., score, progress)
     */
    static updateStats(jsonStats) {
        const instance = new Game();
        instance.stats = { ...instance.stats, ...jsonStats };
        console.log("Game stats updated:", instance.stats);
    }
}

// Launch game on load
window.onload = () => Game.main();
