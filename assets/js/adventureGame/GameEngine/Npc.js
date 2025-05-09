import Character from "./Character.js";

class Npc extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.interact = data?.interact;
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
            
            if (this.spriteData && this.spriteData.id) {
                this.markNpcInteracted(this.spriteData.id);
                this.updateGameProgress();
            }
        }
    }
    
    markNpcInteracted(npcId) {
        document.cookie = `npc_interacted_${npcId}=true;path=/;max-age=31536000`;
    }
    
    hasBeenInteracted(npcId) {
        const cookies = document.cookie.split(';');
        return cookies.some(cookie => cookie.trim().startsWith(`npc_interacted_${npcId}=`));
    }
    
    updateGameProgress() {
        const cookies = document.cookie.split(';');
        const interactedNpcs = cookies
            .filter(cookie => cookie.trim().startsWith('npc_interacted_'))
            .map(cookie => cookie.split('=')[0].trim().replace('npc_interacted_', ''));
        
        document.cookie = `game_progress=${interactedNpcs.length};path=/;max-age=31536000`;
    }
}

export default Npc;
