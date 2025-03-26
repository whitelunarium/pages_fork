import GameObject from './GameObject.js';

export class BackgroundParallax extends GameObject  {
    constructor(data = null, gameEnv = null) { 
        super(gameEnv);
    
        if (!data.src) {
           throw new Error('BackgroundParallax requires a src property in data'); 
        }

        this.velocity = data.velocity || 1; 
        this.image = new Image();
        this.image.src = data.src;
        this.width = 1;
        this.height = 1;

        // Set the src and handle the onload event
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };
    } 

    // speed is used to background parallax behavior
    update() {
        this.draw();
    }

    draw() {
        const width = this.gameEnv.innerWidth;
        const ctx = this.gameEnv.ctx;
    
        // Normalize the x position for seamless wrapping
        let xWrapped = this.velocity % this.width;
        if (xWrapped > 0) {
            xWrapped -= this.width;
        }
    
        // Calculate how many times to potentially draw the image to cover wide viewports
        let numDraws = Math.ceil(width / this.width) + 1; // +1 to ensure overlap coverage
    
        // Draw the image multiple times to cover the entire canvas
        for (let i = 0; i < numDraws; i++) {
            ctx.drawImage(this.image, 0, 0, this.width, this.height, xWrapped + i * this.width, 0, this.width, this.height);
        }
    }

}

export default BackgroundParallax;