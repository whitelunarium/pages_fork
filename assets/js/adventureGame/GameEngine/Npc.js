import Character from "./Character.js";

class Npc extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.interact = data?.interact; // Interact function
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.bindInteractKeyListeners();
    }

    update() {
        this.draw();
    }

    bindInteractKeyListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ key }) {
        if (key === 'e' || key === 'u') {
            this.handleKeyInteract();
        }
    }

    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    handleKeyInteract() {
        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
        const hasInteract = this.interact !== undefined;

        if (players.length > 0 && hasInteract) {
            this.interact();
            
            // After interaction, update the progress cookie
            if (this.spriteData && this.spriteData.id) {
                this.markNpcInteracted(this.spriteData.id);
                this.updateGameProgress();
            }
        }
    }
    
    // Mark an NPC as interacted in cookies
    markNpcInteracted(npcId) {
        // Save to cookie that this NPC has been interacted with
        document.cookie = `npc_interacted_${npcId}=true;path=/;max-age=31536000`;
    }
    
    // Check if an NPC has been interacted with
    hasBeenInteracted(npcId) {
        const cookies = document.cookie.split(';');
        return cookies.some(cookie => cookie.trim().startsWith(`npc_interacted_${npcId}=`));
    }
    
    // Update overall game progress
    updateGameProgress() {
        // Get all interacted NPCs
        const cookies = document.cookie.split(';');
        const interactedNpcs = cookies
            .filter(cookie => cookie.trim().startsWith('npc_interacted_'))
            .map(cookie => cookie.split('=')[0].trim().replace('npc_interacted_', ''));
        
        // Update progress cookie
        document.cookie = `game_progress=${interactedNpcs.length};path=/;max-age=31536000`;
    }
}

export default Npc;
