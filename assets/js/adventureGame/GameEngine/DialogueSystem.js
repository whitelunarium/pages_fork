/**
 * DialogueSystem.js
 * A reusable dialogue system for the game environment
 * Features:
 * - Shows dialogue boxes with text when interacting with NPCs or objects
 * - Auto-dismisses dialogue after 10 seconds
 * - Supports styled text with Minecraft-like aesthetics
 * - Can be triggered from any game object
 */

class DialogueSystem {
  constructor() {
    this.activeDialogue = null;
    this.dialogueTimeout = null;
    this.initialized = false;
    this.animationSpeed = 50; // ms between characters for typing effect
  }

  /**
   * Initialize the dialogue system by creating the necessary DOM elements
   */
  initialize() {
    if (this.initialized) return;
    
    // Create the main dialogue container
    this.dialogueContainer = document.createElement('div');
    this.dialogueContainer.id = 'dialogue-container';
    Object.assign(this.dialogueContainer.style, {
      position: 'fixed',
      bottom: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '70%',
      maxWidth: '800px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '3px solid #4a86e8',
      boxShadow: '0 0 20px rgba(74, 134, 232, 0.7)',
      fontFamily: "'Press Start 2P', sans-serif",
      zIndex: '1000',
      display: 'none',
      transition: 'opacity 0.3s ease-in-out',
      opacity: '0'
    });
    
    // Create the speaker name element
    this.speakerName = document.createElement('div');
    this.speakerName.id = 'dialogue-speaker';
    Object.assign(this.speakerName.style, {
      fontSize: '18px',
      color: '#4a86e8',
      marginBottom: '10px',
      textShadow: '0 0 5px rgba(74, 134, 232, 0.7)'
    });
    
    // Create the dialogue text element
    this.dialogueText = document.createElement('div');
    this.dialogueText.id = 'dialogue-text';
    Object.assign(this.dialogueText.style, {
      fontSize: '16px',
      lineHeight: '1.5',
      marginBottom: '15px'
    });
    
    // Create a progress bar for the auto-dismiss timer
    this.timerBar = document.createElement('div');
    this.timerBar.id = 'dialogue-timer';
    Object.assign(this.timerBar.style, {
      height: '5px',
      width: '100%',
      backgroundColor: '#333',
      borderRadius: '2px',
      overflow: 'hidden'
    });
    
    this.timerProgress = document.createElement('div');
    this.timerProgress.id = 'timer-progress';
    Object.assign(this.timerProgress.style, {
      height: '100%',
      width: '100%',
      backgroundColor: '#4a86e8',
      transition: 'width 10s linear'
    });
    
    // Continue prompt
    this.continuePrompt = document.createElement('div');
    this.continuePrompt.id = 'dialogue-continue';
    this.continuePrompt.textContent = 'Press E to continue';
    Object.assign(this.continuePrompt.style, {
      fontSize: '12px',
      color: '#aaa',
      textAlign: 'right',
      marginTop: '10px',
      fontStyle: 'italic'
    });
    
    // Assemble the elements
    this.timerBar.appendChild(this.timerProgress);
    this.dialogueContainer.appendChild(this.speakerName);
    this.dialogueContainer.appendChild(this.dialogueText);
    this.dialogueContainer.appendChild(this.timerBar);
    this.dialogueContainer.appendChild(this.continuePrompt);
    document.body.appendChild(this.dialogueContainer);
    
    // Load Minecraft-style font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Add event listener for dismiss on key press
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
    
    // Create animation for the blinking continue prompt
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes blink {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    this.continuePrompt.style.animation = 'blink 1.5s infinite';
    
    this.initialized = true;
  }

  /**
   * Handle key press events to dismiss dialogue
   * @param {KeyboardEvent} event 
   */
  handleKeyPress(event) {
    // Use 'E' key (keyCode 69) to dismiss dialogue
    if (event.keyCode === 69 && this.activeDialogue) {
      this.dismissDialogue();
    }
  }

  /**
   * Show a dialogue with the given speaker name and text
   * @param {string} speaker - The name of the speaker
   * @param {string} text - The dialogue text
   * @param {object} options - Additional options like auto-dismiss, etc.
   */
  showDialogue(speaker, text, options = {}) {
    if (!this.initialized) this.initialize();
    
    // Clear any existing dialogue
    if (this.activeDialogue) {
      this.dismissDialogue();
    }
    
    this.activeDialogue = { speaker, text, options };
    
    // Update content
    this.speakerName.textContent = speaker;
    this.dialogueText.textContent = '';
    
    // Show the dialogue container
    this.dialogueContainer.style.display = 'block';
    
    // Fade in animation
    setTimeout(() => {
      this.dialogueContainer.style.opacity = '1';
    }, 10);
    
    // Type out the text with an animation
    this.typeText(text);
    
    // Reset and start the timer bar
    this.timerProgress.style.transition = 'none';
    this.timerProgress.style.width = '100%';
    
    // Force a reflow to make sure the transition will occur
    this.timerProgress.offsetHeight;
    
    // Start the timer animation
    this.timerProgress.style.transition = 'width 10s linear';
    this.timerProgress.style.width = '0%';
    
    // Set timeout for auto-dismiss after 10 seconds
    this.dialogueTimeout = setTimeout(() => {
      this.dismissDialogue();
    }, 10000);
  }

  /**
   * Creates a typing animation effect for the dialogue text
   * @param {string} text - The full text to be typed
   */
  typeText(text) {
    let index = 0;
    const typing = setInterval(() => {
      if (index < text.length) {
        this.dialogueText.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typing);
      }
    }, this.animationSpeed);
  }

  /**
   * Dismiss the currently active dialogue
   */
  dismissDialogue() {
    if (!this.activeDialogue) return;
    
    // Clear the timeout
    if (this.dialogueTimeout) {
      clearTimeout(this.dialogueTimeout);
      this.dialogueTimeout = null;
    }
    
    // Fade out
    this.dialogueContainer.style.opacity = '0';
    
    // Hide after fade out animation completes
    setTimeout(() => {
      this.dialogueContainer.style.display = 'none';
      this.activeDialogue = null;
    }, 300);
  }
  
  /**
   * Check if dialogue is currently active
   * @returns {boolean}
   */
  isDialogueActive() {
    return this.activeDialogue !== null;
  }
}

// Create a singleton instance to be used throughout the game
const dialogueSystem = new DialogueSystem();
export default dialogueSystem;