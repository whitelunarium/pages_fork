import Character from "./Character.js";

class Collectible extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.interact = data?.interact; // Interact function
        this.alertTimeout = null;
        this.isInteracting = false; // Flag to track if currently interacting
        this.handleKeyDownBound = this.handleKeyDown.bind(this);
        this.handleKeyUpBound = this.handleKeyUp.bind(this);
        this.bindInteractKeyListeners();
        
        // Register with game control for cleanup during transitions
        if (gameEnv && gameEnv.gameControl) {
            gameEnv.gameControl.registerInteractionHandler(this);
        }
    }

    update() {
        this.draw();
        // Check if player is still in collision
        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
        
        // Reset interaction state if player moved away
        if (players.length === 0 && this.isInteracting) {
            this.isInteracting = false;
        }
    }

    bindInteractKeyListeners() {
        // Add event listeners for keydown and keyup
        document.addEventListener('keydown', this.handleKeyDownBound);
        document.addEventListener('keyup', this.handleKeyUpBound);
    }

    removeInteractKeyListeners() {
        // Remove event listeners to prevent memory leaks
        document.removeEventListener('keydown', this.handleKeyDownBound);
        document.removeEventListener('keyup', this.handleKeyUpBound);
        
        // Clear any pending timeouts
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
            this.alertTimeout = null;
        }
        
        // Reset interaction state
        this.isInteracting = false;
    }

    handleKeyDown(event) {
        if (event.key === 'e' || event.key === 'u') {
            this.handleKeyInteract();
        }
    }

    handleKeyUp(event) {
        if (event.key === 'e' || event.key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    handleKeyInteract() {
        // Check if game is active - don't allow interactions during transitions
        if (this.gameEnv.gameControl && this.gameEnv.gameControl.isPaused) {
            return;
        }
        
        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
        const hasInteract = this.interact !== undefined;

        // Only trigger interaction if:
        // 1. Player is in collision with this collectible
        // 2. Collectible has an interact function
        // 3. Not already interacting
        if (players.length > 0 && hasInteract && !this.isInteracting) {
            this.isInteracting = true;
            
            // Store a reference to this collectible's interact function
            const originalInteract = this.interact;
            
            // Execute the interact function
            originalInteract.call(this);
            
            // For collectibles that should be interactable multiple times (like Eye of Ender),
            // reset the interaction state after a short delay
            setTimeout(() => {
                this.isInteracting = false;
            }, 300);
        }
    }

    // Clean up event listeners when Collectible is destroyed
    destroy() {
        // Unregister from game control
        if (this.gameEnv && this.gameEnv.gameControl) {
            this.gameEnv.gameControl.unregisterInteractionHandler(this);
        }
        
        this.removeInteractKeyListeners();
        super.destroy();
    }
}

export default Collectible;