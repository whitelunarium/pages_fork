// To build GameLevels, each contains GameObjects from below imports
import GameEnvBackground from '/assets/js/adventureGame/GameEngine/GameEnvBackground.js';
import Player from '/assets/js/adventureGame/GameEngine/Player.js';
import Npc from '/assets/js/adventureGame/GameEngine/Npc.js';
import GameControl from '/assets/js/adventureGame/GameEngine/GameControl.js';
import DialogueSystem from '/assets/js/adventureGame/DialogueSystem.js';

class GameLevelHomePage {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Helper function for locked planet effect
    this.applyLockedEffect = (ctx, sprite) => {
      if (sprite.isLocked) {
        ctx.globalAlpha = 0.5;
        ctx.filter = 'grayscale(100%)';
      } else {
        ctx.globalAlpha = 1;
        ctx.filter = 'none';
      }
    };

    // Game progression state with enforced order
    this.progression = {
      microblog: false,
      medialit: false,
      ai: false,
      cyber: false,
      current: 'microblog',  // Start with microblog planet
      // Helper function to get the next planet in sequence
      getNextPlanet: function() {
        if (!this.microblog) return 'microblog';
        if (!this.medialit) return 'medialit';
        if (!this.ai) return 'ai';
        if (!this.cyber) return 'cyber';
        return 'end';
      }
    };
    
    // Debug helper
    this.debugProgress = () => {
      console.log('Current Progress:', {
        microblog: this.progression.microblog,
        medialit: this.progression.medialit,
        ai: this.progression.ai,
        cyber: this.progression.cyber,
        current: this.progression.current
      });
    };

    // Reset progress (remove this line later if you want to keep progress)
    localStorage.removeItem('planetProgression');
    
    // Load progression from localStorage if available
    const savedProgress = localStorage.getItem('planetProgression');
    if (savedProgress) {
      const loaded = JSON.parse(savedProgress);
      // Ensure proper progression state
      this.progression = {
        ...this.progression,
        microblog: loaded.microblog || false,
        medialit: loaded.medialit && loaded.microblog ? loaded.medialit : false,
        ai: loaded.ai && loaded.medialit ? loaded.ai : false,
        cyber: loaded.cyber && loaded.ai ? loaded.cyber : false,
        current: this.progression.getNextPlanet()
      };
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      const planetOrder = ['microblog', 'medialit', 'ai', 'cyber', 'end'];
      const currentIndex = planetOrder.indexOf(this.progression.current);

      // 'B' key for previous planet
      if (e.key.toLowerCase() === 'b') {
        if (currentIndex > 0) {
          const prevPlanet = planetOrder[currentIndex - 1];
          this.progression.current = prevPlanet;
          localStorage.setItem('planetProgression', JSON.stringify(this.progression));
          console.log('Navigating to previous planet:', prevPlanet);
          this.debugProgress();
          location.reload();
        }
      }
      
      // 'N' key for next planet
      if (e.key.toLowerCase() === 'n') {
        if (currentIndex < planetOrder.length - 1) {
          const nextPlanet = planetOrder[currentIndex + 1];
          if (this.progression[this.progression.current]) {
            this.progression.current = nextPlanet;
            localStorage.setItem('planetProgression', JSON.stringify(this.progression));
            console.log('Navigating to next planet:', nextPlanet);
            this.debugProgress();
            location.reload();
          } else {
            console.log('Complete current planet first!');
            this.dialogueSystem.showDialogue("Complete the current planet first!");
          }
        }
      }
    });

    this.dialogueSystem = new DialogueSystem();
    
    // Keep track of active key listener
    this.activeKeyListener = null;
    
    // Function to remove any existing key listener
    this.removeExistingKeyListener = () => {
      if (this.activeKeyListener) {
        document.removeEventListener('keydown', this.activeKeyListener);
        this.activeKeyListener = null;
      }
    };
    
    // Watch for dialogue close and clean up listener
    const originalCloseDialogue = this.dialogueSystem.closeDialogue.bind(this.dialogueSystem);
    this.dialogueSystem.closeDialogue = () => {
      this.removeExistingKeyListener();
      originalCloseDialogue();
    };
    
    // Background data
    const image_src_desert = path + "/images/digital-famine/galaxy.jpg"; // be sure to include the path
    const image_data_desert = {
      name: 'galaxy',
      greeting: "Welcome to the Galaxy!  This will be the start of your adventure in saving the Earth",
      src: image_src_desert,
      pixels: { height: 580, width: 1038 }
    };

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/digital-famine/rocketship_sprite_2x1.png"; // be sure to include the path
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 10,
        INIT_POSITION: { x: 0, y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
        pixels: {height: 681, width: 692},
        orientation: {rows: 1, columns: 2},
        pivot: { x: 0.5, y: 0.5 },  // Center the rotation point
        down: {row: 0, start: 0, columns: 2, rotate: Math.PI},
        downRight: {row: 0, start: 0, columns: 2, rotate: 3*Math.PI/4},
        downLeft: {row: 0, start: 0, columns: 2, rotate: 5*Math.PI/4},
        left: {row: 0, start: 0, columns: 2, rotate: 3*Math.PI/2},
        right: {row: 0, start: 0, columns: 2, rotate: Math.PI/2},
        up: {row: 0, start: 0, columns: 2, rotate: 0},
        upLeft: {row: 0, start: 0, columns: 2, rotate: 7*Math.PI/4},
        upRight: {row: 0, start: 0, columns: 2, rotate: Math.PI/4},
        hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    //End Ship
    const sprite_src_cyberplanet = path + "/images/digital-famine/planet-3.png";
    const sprite_greet_cyberplanet = "Go To Cyber Planet";

    // Store a reference to the dialogueSystem for use in sprite data
    const dialogueSystem = this.dialogueSystem;

    const sprite_data_cyberplanet = {
        id: 'CyberPlanet',
        greeting: "Cyber Planet - Final Destination",
        src: sprite_src_cyberplanet,
        SCALE_FACTOR: 5,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.15), y: (height * 0.15) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        render: function(ctx) {
          this.isLocked = !this.progression.ai && this.progression.current !== 'cyber';
          this.applyLockedEffect(ctx, this);
        }.bind(this),
        dialogues: ["Would you like to travel to the Cyber Planet?"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          this.debugProgress();  // Debug current state
          
          // Check both previous completion and current status
          if (!this.progression.ai) {
            dialogueSystem.showDialogue("Complete AI Planet first!");
            console.log('Attempted to access Cyber without completing AI');
            return;
          }
          
          if (this.progression.current !== 'cyber') {
            dialogueSystem.showDialogue("You must visit planets in order!");
            console.log('Attempted to access Cyber out of order');
            return;
          }

          dialogueSystem.showDialogue("Do you want to travel to Cybersecurity Planet?");
          dialogueSystem.addButtons([
            {
              text: "Travel",
              action: () => {
                this.progression.cyber = true;
                this.progression.current = 'end';
                localStorage.setItem('planetProgression', JSON.stringify(this.progression));
                console.log('Updating progress - Cyber Planet completed');
                this.debugProgress();
                window.location.href = '/digital-famine/cyber/';
              },
              primary: true
            }
          ]);
        }.bind(this)
    };

    // Media Lit Planet
    const sprite_src_medialit = path + "/images/digital-famine/planet-1.png";
    const sprite_data_medialit = {
        id: 'MediaLitPlanet',
        greeting: "Media Literacy Planet - Essential Knowledge",
        src: sprite_src_medialit,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.25), y: (height * 0.75) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        render: function(ctx) {
          this.isLocked = !this.progression.microblog && this.progression.current !== 'medialit';
          this.applyLockedEffect(ctx, this);
        }.bind(this),
        dialogues: ["Would you like to travel to the Media Literacy Planet?"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          this.debugProgress();  // Debug current state
          
          if (!this.progression.microblog || this.progression.current !== 'medialit') {
            dialogueSystem.showDialogue("Complete Microblogging Planet first!");
            return;
          }

          dialogueSystem.showDialogue("Do you want to travel to Media Literacy Planet?");
          dialogueSystem.addButtons([
            {
              text: "Travel",
              action: () => {
                this.progression.medialit = true;
                this.progression.current = 'ai';
                localStorage.setItem('planetProgression', JSON.stringify(this.progression));
                console.log('Updating progress - Media Literacy completed');
                this.debugProgress();
                window.location.href = '/digital-famine/media/';
              },
              primary: true
            }
          ]);
        }.bind(this)
    };

    // AI Planet
    const sprite_src_ai = path + "/images/digital-famine/planet-2.png";
    const sprite_data_ai = {
        id: 'AIPlanet',
        greeting: "AI Planet - Future Technology",
        src: sprite_src_ai,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.55), y: (height * 0.25) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        render: function(ctx) {
          this.isLocked = !this.progression.medialit && this.progression.current !== 'ai';
          this.applyLockedEffect(ctx, this);
        },
        dialogues: ["Would you like to travel to the AI Planet?"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          this.debugProgress();  // Debug current state
          
          // Check both previous completion and current status
          if (!this.progression.medialit) {
            dialogueSystem.showDialogue("Complete Media Literacy Planet first!");
            console.log('Attempted to access AI without completing Media Lit');
            return;
          }
          
          if (this.progression.current !== 'ai') {
            dialogueSystem.showDialogue("You must visit planets in order!");
            console.log('Attempted to access AI out of order');
            return;
          }

          dialogueSystem.showDialogue("Do you want to travel to AI Planet?");
          dialogueSystem.addButtons([
            {
              text: "Travel",
              action: () => {
                this.progression.ai = true;
                this.progression.current = 'cyber';
                localStorage.setItem('planetProgression', JSON.stringify(this.progression));
                console.log('Updating progress - AI Planet completed');
                this.debugProgress();
                window.location.href = '/digital-famine/ai/';
              },
              primary: true
            }
          ]);
        }.bind(this)
    };

    // Microblogging Planet
    const sprite_src_microblog = path + "/images/digital-famine/planet-4.png";
    const sprite_data_microblog = {
        id: 'MicroblogPlanet',
        greeting: "Microblogging Planet - First Stop!",
        src: sprite_src_microblog,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.55), y: (height * 0.75) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        render: function(ctx) {
          this.isLocked = false; // First planet is never locked
          this.applyLockedEffect(ctx, this);
        },
        dialogues: ["Would you like to travel to the Microblogging Planet?"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          this.debugProgress();  // Debug current state
          
          // Check if this is the current planet in progression
          if (this.progression.current !== 'microblog') {
            dialogueSystem.showDialogue("You must visit planets in order!");
            console.log('Attempted to access Microblog out of order');
            return;
          }

          dialogueSystem.showDialogue("Do you want to travel to Microblogging Planet?");
          dialogueSystem.addButtons([
            {
              text: "Travel",
              action: () => {
                this.progression.microblog = true;
                this.progression.current = 'medialit';
                localStorage.setItem('planetProgression', JSON.stringify(this.progression));
                console.log('Updating progress - Microblog completed');
                this.debugProgress();
                window.location.href = '/digital-famine/microblog/';
              },
              primary: true
            }
          ]);
        }.bind(this)
    };

    // Home Planet (Earth)
    const sprite_src_home = path + "/images/digital-famine/home-planet.png";
    const sprite_data_home = {
        id: 'HomePlanet',
        greeting: "Return to Home Planet (Earth)",
        src: sprite_src_home,
        SCALE_FACTOR: 4,
        ANIMATION_RATE: 1,
        pixels: {height: 512, width: 512},
        INIT_POSITION: { x: (width * 0.82), y: (height * 0.5) },
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        render: function(ctx) {
          // Grey out if not all planets are completed
          this.isLocked = !(this.progression.microblog && 
                           this.progression.medialit && 
                           this.progression.ai && 
                           this.progression.cyber);
          this.applyLockedEffect(ctx, this);
        }.bind(this),
        dialogues: ["Return to Home Planet"],
        reaction: function() { },
        interact: function() {
          this.removeExistingKeyListener();
          
          // Check if all planets are completed in order
          if (!this.progression.cyber) {
            dialogueSystem.showDialogue("Complete the Cyber Planet first!");
            return;
          }
          
          dialogueSystem.showDialogue("Do you want to return to Earth?");
          dialogueSystem.addButtons([
            {
              text: "Travel",
              action: () => window.location.href = '/digital-famine/end/',
              primary: true
            }
          ]);
        }.bind(this)
    };

    // Objects on this level
    this.classes = [
      { class: GameEnvBackground, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_cyberplanet },
      { class: Npc, data: sprite_data_medialit },
      { class: Npc, data: sprite_data_ai },
      { class: Npc, data: sprite_data_microblog },
      { class: Npc, data: sprite_data_home },
    ];
  }
}

export default GameLevelHomePage;
