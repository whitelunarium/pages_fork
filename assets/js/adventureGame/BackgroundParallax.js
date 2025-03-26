import GameObject from './GameObject.js';

export class BackgroundParallax extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);

        if (!data.src) {
            throw new Error('BackgroundParallax requires a src property in data');
        }
        this.gameEnv = gameEnv;
        this.position = data.position || { x: 0, y: 0 };
        this.velocity = data.velocity || 1;
        this.image = new Image();
        this.image.src = data.src;
        this.width = 1;
        this.height = 1;
        this.isInitialized = false; // Flag to track initialization

        // Set the src and handle the onload event
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;

            // Create the canvas element
            this.canvas = document.createElement("canvas");
            this.canvas.id = data.id || "backgroundParallax";
            this.canvas.width = this.gameEnv.innerWidth;
            this.canvas.height = this.gameEnv.innerHeight;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
            this.canvas.style.position = 'absolute';
            this.canvas.style.left = `${this.position.x}px`;
            this.canvas.style.top = `${this.gameEnv.top}px`;
            this.ctx = this.canvas.getContext("2d");

            // Append the canvas to the DOM
            document.getElementById("gameContainer").appendChild(this.canvas);
            this.isInitialized = true; // Mark as initialized
        };
    }

    // speed is used to background parallax behavior
    update() {
        this.draw();
    }

    draw() {
        // Wait until the image and canvas are initialized
        if (!this.isInitialized) {
            return; // Skip drawing if not initialized
        }

        const width = this.gameEnv.innerWidth;

        // Normalize the x position for seamless wrapping
        let xWrapped = this.velocity % this.width;
        if (xWrapped > 0) {
            xWrapped -= this.width;
        }

        // Calculate how many times to potentially draw the image to cover wide viewports
        let numDraws = Math.ceil(width / this.width) + 1; // +1 to ensure overlap coverage

        // Draw the image multiple times to cover the entire canvas
        for (let i = 0; i < numDraws; i++) {
            this.ctx.drawImage(
                this.image,
                0, 0, this.width, this.height, // Source rectangle
                xWrapped + i * this.width, 0, this.width, this.height // Destination rectangle
            );
        }
    }

    resize() {
        this.canvas.width = this.gameEnv.innerWidth;
        this.canvas.height = this.gameEnv.innerHeight;
        this.draw();
    }
}

export default BackgroundParallax;