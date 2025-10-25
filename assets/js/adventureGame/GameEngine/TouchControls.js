/**
 * TouchControls - Virtual D-pad for mobile WASD simulation
 * Creates on-screen buttons that simulate keyboard WASD input
 */
class TouchControls {
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
        this.isVisible = false;
        this.controlsContainer = null;
        this.activeButtons = new Set();
        this.buttonMap = {
            'up': 87,    // W key
            'left': 65,  // A key
            'down': 83,  // S key
            'right': 68  // D key
        };
        
        this.init();
        this.detectMobile();
    }

    /**
     * Detect if device is mobile and show/hide controls accordingly
     */
    detectMobile() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                        || ('ontouchstart' in window);
        
        if (isMobile) {
            this.show();
        } else {
            this.hide();
        }
    }

    /**
     * Initialize the touch controls UI
     */
    init() {
        // Create controls container
        this.controlsContainer = document.createElement('div');
        this.controlsContainer.id = 'touch-controls';
        this.controlsContainer.innerHTML = `
            <style>
                #touch-controls {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    z-index: 1000;
                    display: none;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                
                .dpad-container {
                    position: relative;
                    width: 150px;
                    height: 150px;
                }
                
                .dpad-button {
                    position: absolute;
                    width: 45px;
                    height: 45px;
                    background: rgba(255, 255, 255, 0.8);
                    border: 2px solid rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    cursor: pointer;
                    transition: all 0.1s ease;
                    touch-action: none;
                }
                
                .dpad-button:active, .dpad-button.pressed {
                    background: rgba(100, 150, 255, 0.9);
                    color: white;
                    transform: scale(0.95);
                }
                
                .dpad-up {
                    top: 0;
                    left: 52px;
                }
                
                .dpad-left {
                    top: 52px;
                    left: 0;
                }
                
                .dpad-right {
                    top: 52px;
                    right: 0;
                }
                
                .dpad-down {
                    bottom: 0;
                    left: 52px;
                }
                
                @media (max-width: 480px) {
                    .dpad-container {
                        width: 120px;
                        height: 120px;
                    }
                    
                    .dpad-button {
                        width: 36px;
                        height: 36px;
                        font-size: 14px;
                    }
                    
                    .dpad-up, .dpad-down {
                        left: 42px;
                    }
                    
                    .dpad-left, .dpad-right {
                        top: 42px;
                    }
                }
            </style>
            <div class="dpad-container">
                <div class="dpad-button dpad-up" data-direction="up">↑</div>
                <div class="dpad-button dpad-left" data-direction="left">←</div>
                <div class="dpad-button dpad-right" data-direction="right">→</div>
                <div class="dpad-button dpad-down" data-direction="down">↓</div>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(this.controlsContainer);
        
        // Bind events
        this.bindEvents();
    }

    /**
     * Bind touch events to the virtual buttons
     */
    bindEvents() {
        const buttons = this.controlsContainer.querySelectorAll('.dpad-button');
        
        buttons.forEach(button => {
            const direction = button.dataset.direction;
            
            // Touch events
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleButtonPress(direction, true);
            });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.handleButtonPress(direction, false);
            });
            
            button.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                this.handleButtonPress(direction, false);
            });
            
            // Mouse events for desktop testing
            button.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.handleButtonPress(direction, true);
            });
            
            button.addEventListener('mouseup', (e) => {
                e.preventDefault();
                this.handleButtonPress(direction, false);
            });
            
            button.addEventListener('mouseleave', (e) => {
                this.handleButtonPress(direction, false);
            });
        });
    }

    /**
     * Handle virtual button press/release
     * @param {string} direction - The direction button pressed
     * @param {boolean} isPressed - Whether button is pressed or released
     */
    handleButtonPress(direction, isPressed) {
        const keyCode = this.buttonMap[direction];
        const button = this.controlsContainer.querySelector(`[data-direction="${direction}"]`);
        
        if (isPressed) {
            this.activeButtons.add(direction);
            button.classList.add('pressed');
            
            // Simulate keydown event
            this.dispatchKeyEvent('keydown', keyCode);
        } else {
            this.activeButtons.delete(direction);
            button.classList.remove('pressed');
            
            // Simulate keyup event
            this.dispatchKeyEvent('keyup', keyCode);
        }
    }

    /**
     * Dispatch synthetic keyboard events
     * @param {string} type - Event type ('keydown' or 'keyup')
     * @param {number} keyCode - The key code to simulate
     */
    dispatchKeyEvent(type, keyCode) {
        const event = new KeyboardEvent(type, {
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Show the touch controls
     */
    show() {
        if (this.controlsContainer) {
            this.controlsContainer.style.display = 'block';
            this.isVisible = true;
        }
    }

    /**
     * Hide the touch controls
     */
    hide() {
        if (this.controlsContainer) {
            this.controlsContainer.style.display = 'none';
            this.isVisible = false;
        }
    }

    /**
     * Toggle visibility of touch controls
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Clean up the touch controls
     */
    destroy() {
        if (this.controlsContainer && this.controlsContainer.parentNode) {
            this.controlsContainer.parentNode.removeChild(this.controlsContainer);
        }
    }
}

export default TouchControls;