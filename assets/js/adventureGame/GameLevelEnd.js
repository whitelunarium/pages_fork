import GamEnvBackground from './GameEngine/GameEnvBackground.js';
import BackgroundParallax from './GameEngine/BackgroundParallax.js';
import Player from './GameEngine/Player.js';
import Npc from './GameEngine/Npc.js';
import Collectible from './GameEngine/Collectible.js';
import Quiz from './Quiz.js';
import Game from './Game.js';
import Enemy from './GameEngine/Enemy.js';

class GameLevelEnd {
  constructor(gameEnv) {
    console.log("Initializing GameLevelEnd...");
    
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;
    
    // Track ender eyes collection
    this.eyesCollected = 0;
    this.endTime = null;
    this.startTime = Date.now();
    this.gameCompleted = false;
    
    // Parallax background configuration
    const image_src_parallax = path + "/images/gamify/parallaxbg.png";
    const image_data_parallax = {
        name: 'parallax_background',
        id: 'parallax-background',
        greeting: "A mysterious parallax effect in the background.",
        src: image_src_parallax,
        pixels: {height: 1140, width: 2460},
        position: { x: 0, y: 0 },
        velocity: 0.2,  // Slower velocity for a more subtle effect
        layer: 0,  // Explicitly set the layer to 0 (furthest back)
        zIndex: 1  // Use positive z-index but keep it low
    };
    
    const image_src_end = path + "/images/gamify/TransparentEnd.png";
    const image_data_end = {
        name: 'end',
        id: 'end-background',
        greeting: "The End opens before you, a vast black void in the distance. The stone beneath your feet is yellowish and hard, and the air tingles.",
        src: image_src_end,
        pixels: {height: 1140, width: 2460},
        layer: 1,  // Set layer to 1 to be in front of parallax
        zIndex: 5  // Higher z-index to appear above parallax
    };
    
    const sprite_src_chillguy = path + "/images/gamify/Steve.png";
    const CHILLGUY_SCALE_FACTOR = 7;
    const sprite_data_chillguy = {
        id: 'Steve',
        greeting: "Hi, I am Steve.",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 25,
        
        INIT_POSITION: { x: width/16, y: height/2 },
        pixels: {height: 256, width: 128},
        orientation: {rows: 8, columns: 4 },
        down: {row: 1, start: 0, columns: 4 },
        downRight: {row: 7, start: 0, columns: 4, rotate: Math.PI/8 },
        downLeft: {row: 5, start: 0, columns: 4, rotate: -Math.PI/8 },
        left: {row: 5, start: 0, columns: 4 },
        right: {row: 7, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        upLeft: {row: 5, start: 0, columns: 4, rotate: Math.PI/8 },
        upRight: {row: 7, start: 0, columns: 4, rotate: -Math.PI/8 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // Using W, A, S, D for Steve
    };
    
    const sprite_src_alex = path + "/images/gamify/Alex.png";
    const alex_SCALE_FACTOR = 7;
    const sprite_data_alex = {
        id: 'Alex',
        greeting: "Hi, I am Alex",
        src: sprite_src_alex,
        SCALE_FACTOR: alex_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 25,
        
        INIT_POSITION: { x: 0, y: height/2 },
        pixels: {height: 256, width: 128},
        orientation: {rows: 8, columns: 4 },
        down: {row: 1, start: 0, columns: 4 },
        downRight: {row: 7, start: 0, columns: 4, rotate: Math.PI/8 },
        downLeft: {row: 5, start: 0, columns: 4, rotate: -Math.PI/8 },
        left: {row: 5, start: 0, columns: 4 },
        right: {row: 7, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        upLeft: {row: 5, start: 0, columns: 4, rotate: Math.PI/8 },
        upRight: {row: 7, start: 0, columns: 4, rotate: -Math.PI/8 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 73, left: 74, down: 75, right: 76 } // Using I, J, K, L for Alex to differentiate from Steve 
    };

    const sprite_src_enemy = path + "/images/gamify/ederman.png"; // Add your own image
    const sprite_data_enemy = {
      id: 'Enemy',
      greeting: "You feel a dark presence...",
      src: sprite_src_enemy,
      SCALE_FACTOR: 7,
      ANIMATION_RATE: 0,
      pixels: {height: 256, width: 128},
      INIT_POSITION: { x: width / 2, y: height / 4 },
      orientation: {rows: 1, columns: 1},
      down: {row: 0, start: 0, columns: 1},
      hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
      zIndex: 10,
      update: function(players, stopGameLoop) {
        // Follow nearest player
        let nearest = players[0];
        let minDist = Infinity;

        for (const p of players) {
          const dx = p.x - this.x;
          const dy = p.y - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < minDist) {
            minDist = dist;
            nearest = p;
          }
        }

        // Move towards nearest player
        const speed = 1.5;
        const dx = nearest.x - this.x;
        const dy = nearest.y - this.y;
        const angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle) * speed;
        this.y += Math.sin(angle) * speed;

        // Collision check
        for (const p of players) {
          if (
           Math.abs(p.x - this.x) < this.width * this.hitbox.widthPercentage &&
            Math.abs(p.y - this.y) < this.height * this.hitbox.heightPercentage
          ) {
            stopGameLoop();
            alert("Game Over! You were caught by the enemy!");
          }
        }
      }
    };

        
    const sprite_src_endship = path + "/images/gamify/endship.png";
    const sprite_greet_endship = "Find the elytra";
    const sprite_data_endship = {
        id: 'Endship',
        greeting: sprite_greet_endship,
        src: sprite_src_endship,
        SCALE_FACTOR: 5,
        ANIMATION_RATE: 1000000,
        pixels: {height: 982, width: 900},
        INIT_POSITION: { x: (width / 2), y: (height / 2) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,  // Same z-index as player
        quiz: {
          title: "Linux Command Quiz",
          questions: [
            "It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! \n1. huh\n2. what\n3. ...\n4. ok bye"
          ]
        },
        reaction: function() {
          alert(sprite_greet_endship);
        },
        interact: function() {
          let quiz = new Quiz();
          quiz.initialize();
          quiz.openPanel(sprite_data_endship);
        }
    };

    // Store a reference to the current instance to use in closures
    const self = this;

    const sprite_src_eye = path + "/images/gamify/eyeOfEnder.png";
    const sprite_data_eye = {
        id: 'Eye of Ender',
        greeting: `Press E to claim this Eye of Ender.`,
        src: sprite_src_eye,
        SCALE_FACTOR: 20,
        ANIMATION_RATE: 9007199254740991,
        pixels: {height: 16, width: 16},
        INIT_POSITION: { x: (Math.random()*width/2.6)+width/19, y: (Math.random()*height/3.5)+height/2.7 },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 0 },
        hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
        zIndex: 10,  // Same z-index as player
        reaction: function() {
          alert(`Press E to claim this Eye of Ender.`);
        },
        interact: function() {
        self.eyesCollected++;

        //check to make sure timer is initializing DELETE LATER
        if (Game.setCurrentLevelInstance) {
                Game.setCurrentLevelInstance(this);
            } else {
                console.error("Game.setCurrentLevelInstance not available");
            }
        // Update the eye counter display
        self.updateEyeCounter();

        // Update player's balance by 100 when collecting an eye
        self.updatePlayerBalance(100);

        if (self.eyesCollected >= 12) {
            // Record that the game is completed
            self.gameCompleted = true;
            
            // Stop the timer
            if (Game.timeManager) {
                Game.timeManager.stopStopwatch(true);
                
                // Check if this is a new best time
                const isNewBest = Game.timeManager.saveCompletionTime(Game.timeManager.gameTimer);
                
                // Create a notification about the completion
                self.showCompletionNotification(isNewBest);
            }
            
            // Spawn the portal NPC
            self.spawnPortalNPC();
            
        } else {
            // Move the eye to a new random position
            this.move((Math.random()*width/2.6)+width/19, (Math.random()*height/3.5)+height/2.7);
        }
        }
    };
    
    this.classes = [
      { class: BackgroundParallax, data: image_data_parallax },  // Add parallax background first
      { class: GamEnvBackground, data: image_data_end },         // Then regular background
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_endship },
      { class: Collectible, data: sprite_data_eye },
      { class: Player, data: sprite_data_alex },
      { class: Enemy, data: sprite_data_enemy }
    ];
    
    // Create eye counter UI
    this.createEyeCounter();
  }
  
  // Create a UI counter for the eyes
  createEyeCounter() {
    const counterContainer = document.createElement('div');
    counterContainer.id = 'eye-counter-container';
    counterContainer.style.position = 'fixed';
    counterContainer.style.top = '180px'; // Changed from 150px to 180px to position it lower
    counterContainer.style.right = '10px';
    counterContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    counterContainer.style.color = 'white';
    counterContainer.style.padding = '10px';
    counterContainer.style.borderRadius = '5px';
    counterContainer.style.display = 'flex';
    counterContainer.style.alignItems = 'center';
    counterContainer.style.fontFamily = "'Minecraft', sans-serif";
    counterContainer.style.zIndex = '1000';
    counterContainer.style.border = '2px solid #4a86e8';
    counterContainer.style.boxShadow = '0 0 10px rgba(74, 134, 232, 0.7)';
    
    // Load Minecraft-style font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Create eye icon
    const eyeIcon = document.createElement('div');
    eyeIcon.style.width = '25px';
    eyeIcon.style.height = '25px';
    eyeIcon.style.backgroundImage = "url('./images/gamify/eyeOfEnder.png')";
    eyeIcon.style.backgroundSize = 'contain';
    eyeIcon.style.backgroundRepeat = 'no-repeat';
    eyeIcon.style.marginRight = '10px';
    
    // Create counter text
    const counterText = document.createElement('div');
    counterText.id = 'eye-counter';
    counterText.textContent = `0/12`;
    counterText.style.fontSize = '18px';
    counterText.style.color = '#4a86e8'; // Changed from #8A2BE2 to #4a86e8
    counterText.style.textShadow = '0 0 5px rgba(74, 134, 232, 0.7)'; // Updated shadow to match new color
    
    // Assemble counter
    counterContainer.appendChild(eyeIcon);
    counterContainer.appendChild(counterText);
    document.body.appendChild(counterContainer);
  }
  
  // Update the eye counter display
  updateEyeCounter() {
    const counterText = document.getElementById('eye-counter');
    if (counterText) {
      counterText.textContent = `${this.eyesCollected}/12`;
      
      // Add visual feedback when collecting an eye
      counterText.style.transform = 'scale(1.5)';
      counterText.style.color = '#00FFFF';
      
      // Reset after animation
      setTimeout(() => {
        counterText.style.transform = 'scale(1)';
        counterText.style.color = '#4a86e8'; // Changed from #8A2BE2 to #4a86e8
      }, 300);
    }
  }
  
  // New method to update player's balance
  updatePlayerBalance(amount) {
    // Get the current balance from UI
    const balanceElement = document.getElementById('balance');
    if (!balanceElement) {
      console.error("Balance element not found");
      return;
    }
    
    // Parse current balance
    let currentBalance = parseInt(balanceElement.innerHTML) || 0;
    
    // Add amount to balance
    const newBalance = currentBalance + amount;
    
    // Update UI
    balanceElement.innerHTML = newBalance;
    
    // Store in localStorage
    localStorage.setItem('balance', newBalance);
    
    // Visual feedback for balance change
    balanceElement.style.transform = 'scale(1.5)';
    balanceElement.style.color = '#00FFFF';
    setTimeout(() => {
      balanceElement.style.transform = 'scale(1)';
      balanceElement.style.color = '#4a86e8';
    }, 300);
    
    // If we have access to the Java API endpoint, update server-side balance
    if (Game.id && Game.javaURI) {
      this.updateServerBalance(Game.id, amount);
    }
    
    // Show floating +100 text near the eye
    this.showFloatingPoints(amount);
  }
  
  // Update balance on server
  updateServerBalance(personId, amount) {
    // Check if Game and fetchOptions are available
    if (!Game.javaURI || !Game.fetchOptions) {
      console.error("Cannot update server balance - missing Game.javaURI or Game.fetchOptions");
      return;
    }
    
    // Endpoint for updating balance
    const endpoint = `${Game.javaURI}/rpg_answer/updateBalance/${personId}/${amount}`;
    
    // Send request to update balance
    fetch(endpoint, Game.fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to update balance: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Balance updated on server:", data);
      })
      .catch(error => {
        console.error("Error updating balance on server:", error);
      });
  }
  
  // Show floating points animation
  showFloatingPoints(amount) {
    // Create floating text element
    const floatingPoints = document.createElement('div');
    floatingPoints.textContent = `+${amount}`;
    floatingPoints.style.position = 'fixed';
    floatingPoints.style.color = '#4a86e8';
    floatingPoints.style.fontSize = '24px';
    floatingPoints.style.fontWeight = 'bold';
    floatingPoints.style.textShadow = '0 0 10px rgba(74, 134, 232, 0.7)';
    floatingPoints.style.zIndex = '9999';
    
    // Get position of eye counter for reference
    const eyeCounter = document.getElementById('eye-counter-container');
    if (eyeCounter) {
      const rect = eyeCounter.getBoundingClientRect();
      floatingPoints.style.top = `${rect.top - 30}px`;
      floatingPoints.style.left = `${rect.left + 20}px`;
    } else {
      // Fallback position
      floatingPoints.style.top = '100px';
      floatingPoints.style.right = '30px';
    }
    
    // Create animation
    floatingPoints.style.animation = 'float-up 1.5s ease-out forwards';
    const style = document.createElement('style');
    if (!document.getElementById('float-animation')) {
      style.id = 'float-animation';
      style.innerHTML = `
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add to document and remove after animation
    document.body.appendChild(floatingPoints);
    setTimeout(() => {
      floatingPoints.remove();
    }, 1500);
  }
  createAndStartStopwatch() {
    console.log("Manually creating stopwatch in GameLevelEnd");
    
    // Create the stopwatch container
    const stopwatchContainer = document.createElement('div');
    stopwatchContainer.id = 'direct-stopwatch';
    stopwatchContainer.style.position = 'fixed';
    stopwatchContainer.style.top = '10px';
    stopwatchContainer.style.left = '50%';
    stopwatchContainer.style.transform = 'translateX(-50%)';
    stopwatchContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    stopwatchContainer.style.color = 'white';
    stopwatchContainer.style.padding = '10px 20px';
    stopwatchContainer.style.borderRadius = '10px';
    stopwatchContainer.style.zIndex = '9999';
    stopwatchContainer.style.fontFamily = 'monospace';
    stopwatchContainer.style.fontSize = '20px';
    stopwatchContainer.style.fontWeight = 'bold';
    stopwatchContainer.style.border = '2px solid #4a86e8';
    stopwatchContainer.style.boxShadow = '0 0 10px rgba(74, 134, 232, 0.7)';
    
    // Create title
    const title = document.createElement('div');
    title.textContent = 'TIME';
    title.style.fontSize = '12px';
    title.style.textAlign = 'center';
    title.style.marginBottom = '5px';
    stopwatchContainer.appendChild(title);
    
    // Create timer display
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'direct-timer-display';
    timerDisplay.textContent = '00:00.0';
    timerDisplay.style.textAlign = 'center';
    stopwatchContainer.appendChild(timerDisplay);
    
    // Add to document
    document.body.appendChild(stopwatchContainer);
    
    // Start timer
    let startTime = Date.now();
    let interval = setInterval(() => {
        if (this.gameCompleted) {
            clearInterval(interval);
            return;
        }
        
        const elapsed = (Date.now() - startTime) / 1000;
        const minutes = Math.floor(elapsed / 60);
        const seconds = Math.floor(elapsed % 60);
        const tenths = Math.floor((elapsed * 10) % 10);
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}`;
        
        // Store current time for completion
        this.currentTime = elapsed;
    }, 100);
    
    // Store interval for cleanup
    this.timerInterval = interval;
  }

  // Add a helper method to format time consistently
  formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const milliseconds = Math.floor((time % 1) * 100);
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }

interact = function() {
    self.eyesCollected++;
    
    // Update the eye counter display
    self.updateEyeCounter();
    
    // Update player's balance by 100 when collecting an eye
    self.updatePlayerBalance(100);
    
    if (self.eyesCollected >= 12) {
        // Record that the game is completed
        self.gameCompleted = true;
        
        // Stop the timer
        if (Game.timeManager) {
            Game.timeManager.stopStopwatch(true);
            
            // Show a simple completion message
            alert(`Congratulations! You collected all 12 Eyes of Ender in ${Game.timeManager.formatTime(Game.timeManager.gameTimer)}`);
        }
        
        // Spawn the portal NPC
        self.spawnPortalNPC();
        
    } else {
        // Move the eye to a new random position
        this.move((Math.random()*width/2.6)+width/19, (Math.random()*height/3.5)+height/2.7);
    }
}
  // Alternative Portal NPC Implementation with Direct Level Transition

// This implementation doesn't use dynamic imports but relies on 
// access to level classes through the GameControl's levelClasses property

spawnPortalNPC() {
    // Get game environment references
    const gameEnv = this.gameEnv;
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const path = gameEnv.path;
    
    // Portal NPC data - using exitportalfull.png which is already in your game
    const sprite_src_portal = path + "/images/gamify/exitportalfull.png";
    const sprite_data_portal = {
        id: 'EndPortal',
        greeting: "Portal to the Desert. Press E to enter.",
        src: sprite_src_portal,
        SCALE_FACTOR: 6,
        ANIMATION_RATE: 10,
        pixels: {height: 2025, width: 2029}, // Match your existing portal image dimensions
        INIT_POSITION: { x: width / 2 - 100, y: height / 2 - 100 }, // Center of screen
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
        zIndex: 15, // Make sure it appears on top
        reaction: function() {
            alert("Press E to return to the Desert");
        },
        interact: function() {
            // Get the game control
            const gameControl = gameEnv.gameControl;
            
            if (gameControl) {
                // Set the level index to 0 (assuming Desert is the first level)
                gameControl.currentLevelIndex = 0;
                
                // Tell the current level to end
                gameControl.currentLevel.continue = false;
                
                // Alert the user
                alert("Returning to the Desert...");
            } else {
                alert("Could not return to Desert. Reloading the game...");
                location.reload();
            }
        }
    };
    
    // Create the portal NPC
    const Npc = gameEnv.gameObjects.find(obj => obj.constructor.name === 'Npc')?.constructor;
    if (Npc) {
        const portalNPC = new Npc(sprite_data_portal, gameEnv);
        gameEnv.gameObjects.push(portalNPC);
        console.log("Portal NPC added to the game");
    } else {
        console.error("Could not find Npc constructor to create portal");
    }
}
}

export default GameLevelEnd;