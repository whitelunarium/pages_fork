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
            this.ctx = this.canvas.getContext("2d");

            // Align the canvas with the gameCanvas
            const gameCanvas = document.getElementById("gameCanvas");
            this.canvas.style.position = "absolute";
            this.canvas.style.left = gameCanvas.style.left;
            this.canvas.style.top = gameCanvas.style.top;

            // Append the canvas to the DOM
            document.getElementById("gameContainer").appendChild(this.canvas);
            this.isInitialized = true; // Mark as initialized
        };
    }

    update() {
        // Update the position for parallax scrolling
        this.position.x -= this.velocity; // Move left
        this.position.y += this.velocity; // Move down (for snowfall effect)

        // Wrap the position to prevent overflow
        if (this.position.x < -this.width) {
            this.position.x = 0;
        }
        if (this.position.y > this.height) {
            this.position.y = 0;
        }

        this.draw();
    }

    draw() {
        if (!this.isInitialized) {
            return; // Skip drawing if not initialized
        }
    
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
    
        let xWrapped = this.position.x % this.width;
        let yWrapped = this.position.y % this.height;
    
        if (xWrapped > 0) {
            xWrapped -= this.width;
        }
        if (yWrapped > 0) {
            yWrapped -= this.height;
        }
    
        const numHorizontalDraws = Math.ceil(canvasWidth / this.width) + 1;
        const numVerticalDraws = Math.ceil(canvasHeight / this.height) + 1;
    
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        for (let i = 0; i < numHorizontalDraws; i++) {
            for (let j = 0; j < numVerticalDraws; j++) {
                this.ctx.drawImage(
                    this.image,
                    0, 0, this.width, this.height,
                    xWrapped + i * this.width, yWrapped + j * this.height, this.width, this.height
                );
            }
        }
    }

    resize() {
        const gameCanvas = document.getElementById("gameCanvas");
        this.canvas.width = this.gameEnv.innerWidth;
        this.canvas.height = this.gameEnv.innerHeight;
        this.canvas.style.left = gameCanvas.style.left;
        this.canvas.style.top = gameCanvas.style.top;
    
        this.draw(); // Redraw the canvas after resizing
    }
}

export default BackgroundParallax;