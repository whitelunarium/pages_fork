import Character from "./Character.js";
import Game from "../Game.js";

class Npc extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.interact = data?.interact; // Interact function
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.proximityRadius = 150; // Distance in pixels to show popup
        this.hasInteracted = false;
        this.bindInteractKeyListeners();
        this.injectStyles();
        this.createPopup();

        // Add highlight effect if this is the next NPC to talk to
        this.checkIfNextTarget();
    }

    checkIfNextTarget() {
        const nextStep = Game.getNextStep();
        if (nextStep.target === this.spriteData.id) {
            this.addHighlight();
        } else {
            this.removeHighlight();
        }
    }

    addHighlight() {
        if (!this.highlightEffect) {
            this.highlightEffect = document.createElement('div');
            this.highlightEffect.style.cssText = `
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                border: 3px solid #ffd700;
                border-radius: 50%;
                animation: pulse 2s infinite;
                pointer-events: none;
                z-index: -1;
            `;
            this.canvas.parentElement.appendChild(this.highlightEffect);

            // Update highlight position when NPC moves
            const updateHighlightPosition = () => {
                if (this.highlightEffect) {
                    this.highlightEffect.style.top = (this.position.y - 10) + 'px';
                    this.highlightEffect.style.left = (this.position.x - 10) + 'px';
                }
                requestAnimationFrame(updateHighlightPosition);
            };
            updateHighlightPosition();
        }
    }

    removeHighlight() {
        if (this.highlightEffect) {
            this.highlightEffect.remove();
            this.highlightEffect = null;
        }
    }

    injectStyles() {
        if (document.getElementById('npc-popup-styles')) return;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'npc-popup-styles';
        styleSheet.innerHTML = `
            .npc-popup {
                position: fixed;
                top: 80px;
                left: -350px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                font-family: 'Press Start 2P', monospace;
                font-size: 8px;
                line-height: 1.4;
                z-index: 9999;
                display: block;
                border: 2px solid #ffd700;
                box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
                animation: float 2s ease-in-out infinite;
                pointer-events: none;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0;
                max-width: 250px;
                transform: translateX(0);
            }

            .npc-popup .key {
                color: #ffd700;
                font-weight: bold;
                padding: 2px 4px;
                background: rgba(255, 215, 0, 0.2);
                border-radius: 3px;
                margin: 0 2px;
                font-size: 8px;
            }

            .npc-popup .greeting {
                color: #ffd700;
                margin-bottom: 5px;
                font-size: 8px;
                display: block;
            }

            .npc-popup .instruction {
                font-size: 8px;
                opacity: 0.9;
            }

            @keyframes float {
                0% { transform: translateY(0px) translateX(0); }
                50% { transform: translateY(-5px) translateX(0); }
                100% { transform: translateY(0px) translateX(0); }
            }

            .npc-popup.show {
                opacity: 1;
                left: 10px;
                transform: translateX(0);
            }

            .npc-popup.hide {
                opacity: 0;
                left: -350px;
                transform: translateX(-20px);
            }
        `;
        document.head.appendChild(styleSheet);
    }

    createPopup() {
        this.popup = document.createElement('div');
        this.popup.className = 'npc-popup hide';
        this.updatePopupText();
        document.body.appendChild(this.popup);
    }

    updatePopupText(isColliding = false) {
        if (isColliding) {
            this.popup.innerHTML = `
                <span class="instruction">
                    Press <span class="key">E</span> to interact
                </span>
            `;
        } else if (this.spriteData.greeting) {
            // Truncate greeting if it's too long
            const greeting = this.spriteData.greeting.length > 50 
                ? this.spriteData.greeting.substring(0, 47) + '...'
                : this.spriteData.greeting;
            
            this.popup.innerHTML = `
                <span class="greeting">"${greeting}"</span>
                <span class="instruction">
                    Press <span class="key">E</span> to interact
                </span>
            `;
        } else {
            this.popup.innerHTML = `
                <span class="instruction">
                    Press <span class="key">E</span> to interact
                </span>
            `;
        }
    }

    update() {
        this.draw();
        this.checkProximity();
    }

    getDistanceToPlayer() {
        const player = this.gameEnv.gameObjects.find(obj => 
            obj.constructor.name === 'Player'
        );
        
        if (!player) return Infinity;

        const dx = (this.position.x + this.width/2) - (player.position.x + player.width/2);
        const dy = (this.position.y + this.height/2) - (player.position.y + player.height/2);
        return Math.sqrt(dx * dx + dy * dy);
    }

    checkProximity() {
        const distance = this.getDistanceToPlayer();
        
        if (distance <= this.proximityRadius) {
            if (this.popup.classList.contains('hide')) {
                this.popup.classList.remove('hide');
                setTimeout(() => {
                    this.popup.classList.add('show');
                }, 10);
                this.updatePopupText(false);
            }
        } else {
            if (this.popup.classList.contains('show')) {
                this.popup.classList.remove('show');
                setTimeout(() => {
                    this.popup.classList.add('hide');
                }, 10);
            }
        }

        // Also check collision events for interaction
        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
        
        if (players.length > 0) {
            // Player is colliding, they can interact
            this.updatePopupText(true);
        }
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
            if (!this.hasInteracted) {
                console.log('First interaction with NPC:', this.spriteData.id);
                this.hasInteracted = true;
                // Update progress tracking
                Game.updateProgress(this.spriteData.id);
                // Remove highlight after interaction
                this.removeHighlight();
                // Update highlights for all NPCs
                this.updateAllNpcHighlights();
            }
            // Call the interact function after updating progress
            setTimeout(() => {
                this.interact();
            }, 100);
        }
    }

    updateAllNpcHighlights() {
        // Find all NPCs in the game
        const npcs = this.gameEnv.gameObjects.filter(obj => obj instanceof Npc);
        npcs.forEach(npc => {
            if (npc !== this) {  // Don't check the current NPC
                npc.checkIfNextTarget();
            }
        });
    }

    destroy() {
        if (this.popup) {
            this.popup.remove();
        }
        if (this.highlightEffect) {
            this.highlightEffect.remove();
        }
        super.destroy?.();
    }
}

export default Npc;
