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
    initializeUser() {
        const URL = pythonURI + '/api/id';
        return fetch(URL, fetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (data === null) return null;
                console.log(data);
                return data;
            })
            .catch(err => {
                console.error("Fetch error: ", err);
                return null;
            });
    }
    /**
     * Start the game
     */
    startGame() {
        console.log("Game started");
        // Load environment, characters, and game levels
    }

    static fetchStats() {

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
export default Game;
// Launch game on load
window.onload = () => Game.main();
