// DialogueSystem.js - Create this as a new file

class DialogueSystem {
  constructor() {
    this.dialogueContainer = null;
    this.timeoutId = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;
    
    // Create dialogue container
    this.dialogueContainer = document.createElement('div');
    this.dialogueContainer.id = 'npc-dialogue-container';
    Object.assign(this.dialogueContainer.style, {
      position: 'absolute',
      bottom: '120px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '15px 20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      borderRadius: '10px',
      maxWidth: '80%',
      fontFamily: "'Press Start 2P', sans-serif", // Pixelated game font
      fontSize: '14px',
      textShadow: '1px 1px 2px black',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      border: '2px solid #FFF',
      zIndex: '1000',
      opacity: '0',
      transition: 'opacity 0.3s ease-in-out',
      display: 'none',
      lineHeight: '1.5',
      textAlign: 'center'
    });
    
    document.body.appendChild(this.dialogueContainer);
    this.initialized = true;
  }

  showDialogue(npcId, message) {
    this.initialize();
    
    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    // Create NPC name element
    const nameElement = document.createElement('div');
    nameElement.textContent = npcId;
    Object.assign(nameElement.style, {
      fontWeight: 'bold',
      color: '#FFC107', // Yellow/gold color for name
      marginBottom: '5px',
      fontSize: '16px'
    });
    
    // Create message element with typing effect
    const messageElement = document.createElement('div');
    messageElement.textContent = "";
    
    // Clear the dialogue container
    this.dialogueContainer.innerHTML = '';
    
    // Add name and message to container
    this.dialogueContainer.appendChild(nameElement);
    this.dialogueContainer.appendChild(messageElement);
    
    // Show the container
    this.dialogueContainer.style.display = 'block';
    
    // Fade in
    setTimeout(() => {
      this.dialogueContainer.style.opacity = '1';
    }, 10);
    
    // Type out the message
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < message.length) {
        messageElement.textContent += message.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30); // Typing speed
    
    // Auto-dismiss after 10 seconds
    this.timeoutId = setTimeout(() => {
      this.hideDialogue();
    }, 10000);
  }

  hideDialogue() {
    if (!this.dialogueContainer) return;
    
    // Fade out
    this.dialogueContainer.style.opacity = '0';
    
    // Hide after fade completes
    setTimeout(() => {
      this.dialogueContainer.style.display = 'none';
    }, 300);
  }
}

// Export as singleton
const dialogueSystem = new DialogueSystem();
export default dialogueSystem;