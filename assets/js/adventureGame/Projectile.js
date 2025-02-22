import Character from './Character.js';

class Projectile extends Character {
    constructor(data, gameEnv) {
        super(data, gameEnv);
        this.startTime = Date.now();
        this.duration = data.TRANSLATE_SIMULATION.miliseconds;
        this.steps = data.TRANSLATE_SIMULATION.steps;
        this.calculateTranslatePositions();
        this.startScaleFactor = data.SCALE_FACTOR;
        this.endScaleFactor = data.TRANSLATE_SCALE_FACTOR;
    }

    /**
     * Calculate the start and end positions for the projectile's translation
     * 1. The start position is the initial position of the projectile
     * 2. The end position is the position the projectile will translate towards
     * By placing this into a method, restart and reszie will reset or update the positions for the projectile
     */
    calculateTranslatePositions() {
        this.startPosition = {
            x: this.gameEnv.innerWidth * this.data.INIT_POSITION_RATIO.x,
            y: this.gameEnv.innerHeight * this.data.INIT_POSITION_RATIO.y
        };
        this.endPosition = {
            x: this.gameEnv.innerWidth * this.data.TRANSLATE_POSITION_RATIO.x,
            y: this.gameEnv.innerHeight * this.data.TRANSLATE_POSITION_RATIO.y
        };
    }

    /**
     * Update the projectile's position, size, and scale factor based on the translation animation
     * 1. Calculate the steps and progress of the animation
     * 2. Calculate the intermediate position of the projectile
     * 3. Calculate the new scale factor as the projectile gets larger as it travels
     * Restart the projectile if the animation reaches the end
     */
    update() {
        // Calculate the steps and progress of the animation
        const elapsedTime = Date.now() - this.startTime;
        const progress = Math.min(elapsedTime / this.duration, 1);
        const step = Math.floor(progress * this.steps);

        // Calculate the intermediate position of the projectile
        this.position.x = this.startPosition.x + (this.endPosition.x - this.startPosition.x) * progress;
        this.position.y = this.startPosition.y + (this.endPosition.y - this.startPosition.y) * progress;

        // Calculate the new scale factor as the projectile gets larger as it travels
        this.scaleFactor = this.startScaleFactor + (this.endScaleFactor - this.startScaleFactor) * progress;

        // Update the size of the projectile based on the scale factor 
        this.size = this.gameEnv.innerHeight / this.scaleFactor;
        this.width = this.size;
        this.height = this.size;

        // Call the parent update method to handle other updates
        super.update();

        // If the animation reaches the end, restart the projectile
        if (progress >= 1) {
            this.restart();
        }
    }

    /**
     * Restart simulates a new projectile being projected
     */
    restart() {
        this.startTime = Date.now();
        this.calculateTranslatePositions();
        this.position = { ...this.startPosition };
        this.scaleFactor = this.startScaleFactor;
    }

}

export default Projectile;