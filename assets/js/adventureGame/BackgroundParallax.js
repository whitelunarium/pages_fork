import GameObject from './GameObject.js';

export class BackgroundParallax extends GameObject {
    /**
     * Constructor is called by GameLevel create() method
     * @param {Object} data - The data object for the background
     * @param {Object} gameEnv - The game environment object for convenient access to game properties 
     */
    constructor(data = null, gameEnv = null) {
        super(gameEnv);

        if (!data.src) {
            throw new Error('BackgroundParallax requires a src property in data');
        }

        // Set the properties of the background
        this.image = new Image();
        this.image.src = data.src;
        this.isInitialized = false; // Flag to track initialization

        // Finish initializing the background after the image loads 
        this.image.onload = () => {
            // Width and height come from the image
            this.width = this.image.width;
            this.height = this.image.height;

            // Create the canvas element and context
            this.canvas = document.createElement("canvas");
            this.canvas.style.position = "absolute";
            this.canvas.id = data.id || "backgroundParallax";
            this.ctx = this.canvas.getContext("2d");
            
            // Align the canvas size to the gameCanvas
            this.alignCanvas();

            // Append the canvas to the DOM
            document.getElementById("gameContainer").appendChild(this.canvas);
            this.isInitialized = true; // Mark as initialized
        };
    }

    /**
     * Align canvas to be the same size and position as the gameCanvas 
     */
    alignCanvas() {
        // align the canvas to the gameCanvas
        const gameCanvas = document.getElementById("gameCanvas");
        this.canvas.width = gameCanvas.width;
        this.canvas.height = gameCanvas.height;
        this.canvas.style.left = gameCanvas.style.left;
        this.canvas.style.top = gameCanvas.style.top;
    }

    /**
     * Update is called by GameLoop on all GameObjects 
     * draw() is only action with Static Tiling
     */
    update() {
        this.draw();
    }

    /**
     * Draws the background image on the canvas,  using Static Tiling.
     * - Static Tiling: The image is drawn multiple times to fill the canvas
     * - Scrolling: adds velocity or position updates to the update(), to scroll the background
     * - Layered: draw multiple background images on top of each other 
     */
    draw() {
        if (!this.isInitialized) {
            return; // Skip drawing if not initialized
        }
    
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
    
        // Calculate the number of draws needed to fill the canvas
        const numHorizontalDraws = Math.ceil(canvasWidth / this.width) + 1;
        const numVerticalDraws = Math.ceil(canvasHeight / this.height) + 1;
    
        // Clear the canvas
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw the background image multiple times to fill the canvas
        for (let i = 0; i < numHorizontalDraws; i++) {
            for (let j = 0; j < numVerticalDraws; j++) {
                this.ctx.drawImage(
                    this.image, // Source image
                    0, 0, this.width, this.height, // Source rectangle
                    i * this.width, j * this.height, this.width, this.height // Destination rectangle
                );
            }
        }
    }
    
    /**
     * Resize method is called by resize listner on all GameObjects
     */
    resize() {
        this.alignCanvas(); // Align the canvas to the gameCanvas
        this.draw(); // Redraw the canvas after resizing
    }
}

export default BackgroundParallax;