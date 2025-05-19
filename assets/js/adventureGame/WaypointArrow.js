export default class WaypointArrow {
  constructor(gameCanvas, gamePath) {
    this.gameCanvas = gameCanvas;
    this.gamePath = gamePath;
    this.waypointIds = [
      'Stock-NPC',         // J.P. Morgan
      'Crypto-NPC',        // Satoshi Nakamoto
      'Casino-NPC',        // Frank Sinatra
      'Investor',          // Bizguys
      'Market Computer',   // Computer
      'Schwab',            // Schwab
      'Fidelity',          // Fidelity
      'Bank-NPC',          // Janet Yellen
      'Pilot'             // Pilot
    ];
    
    this.currentStep = this.loadStep();
    this.arrowImg = this.createArrowElement();
    this.setupEventListeners();
    this.moveArrowToCurrentWaypoint();
  }

  loadStep() {
    const savedStep = this.getCookie('waypointStep');
    return savedStep !== null ? parseInt(savedStep) : 0;
  }

  setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  createArrowElement() {
    let arrowImg = document.createElement('img');
    arrowImg.src = this.gamePath + "/images/gamify/redarrow1.png";
    arrowImg.id = 'waypointArrow';
    arrowImg.style.position = 'absolute';
    arrowImg.style.zIndex = 2000;
    arrowImg.style.width = '48px';
    arrowImg.style.height = '48px';
    arrowImg.style.pointerEvents = 'none';
    arrowImg.style.transition = 'top 0.3s, left 0.3s';
    document.body.appendChild(arrowImg);
    return arrowImg;
  }

  getWaypointPosition(npcId) {
    const width = this.gameCanvas ? this.gameCanvas.width : window.innerWidth;
    const height = this.gameCanvas ? this.gameCanvas.height : window.innerHeight;
    
    const positions = {
      'Stock-NPC': { x: width * 0.28, y: height * 0.82 },
      'Crypto-NPC': { x: width * 0.5, y: height * 0.7 },
      'Casino-NPC': { x: width * 0.65, y: height * 0.55 },
      'Investor': { x: width * 0.8, y: height * 0.8 },
      'Market Computer': { x: width * 0.9, y: height * 0.65 },
      'Schwab': { x: width * 0.665, y: height * 0.25 },
      'Fidelity': { x: width * 0.372, y: height * 0.25 },
      'Bank-NPC': { x: width * 0.8, y: height * 0.1 },
      'Pilot': { x: width / 10, y: height * 0.2 }
    };

    return positions[npcId] || { x: width / 2, y: height / 2 };
  }

  moveArrowToCurrentWaypoint() {
    const npcId = this.waypointIds[this.currentStep] || this.waypointIds[0];
    const pos = this.getWaypointPosition(npcId);
    this.arrowImg.style.left = (pos.x - 24) + 'px';
    this.arrowImg.style.top = (pos.y - 64) + 'px';
  }

  advanceStep() {
    if (this.currentStep < this.waypointIds.length - 1) {
      this.currentStep++;
      this.setCookie('waypointStep', this.currentStep, 30);
      this.moveArrowToCurrentWaypoint();
    }
  }

  resetStep() {
    this.currentStep = 0;
    this.setCookie('waypointStep', 0, 30);
    this.moveArrowToCurrentWaypoint();
  }

  setupEventListeners() {
    // Right-click to reset
    this.arrowImg.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.resetStep();
    });

    // Resize handler
    window.addEventListener('resize', () => this.moveArrowToCurrentWaypoint());

    // 'E' key handler
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() !== 'e') return;
      
      try {
        const npcId = this.waypointIds[this.currentStep] || this.waypointIds[0];
        const pos = this.getWaypointPosition(npcId);
        
        let playerObj = null;
        if (window.gameEnv && window.gameEnv.gameObjects) {
          playerObj = window.gameEnv.gameObjects.find(obj => 
            obj.constructor && obj.constructor.name === 'Player'
          );
        }
        
        if (!playerObj) {
          const playerCanvas = document.querySelector('canvas[id*="player" i]');
          if (playerCanvas && playerCanvas.getBoundingClientRect) {
            const rect = playerCanvas.getBoundingClientRect();
            playerObj = {
              position: { x: rect.left + rect.width/2, y: rect.top + rect.height/2 }
            };
          }
        }

        if (playerObj && playerObj.position) {
          const px = playerObj.position.x;
          const py = playerObj.position.y;
          const dx = px - pos.x;
          const dy = py - pos.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 80) {
            this.advanceStep();
          }
        } else {
          this.advanceStep();
        }
      } catch (err) {
        this.advanceStep();
      }
    });
  }
} 