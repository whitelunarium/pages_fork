---
title: Game Documentation
comments: false
toc: true
layout: tailwindPost
title: Documentation for changes made to the game
authors: Nikhil Ekambaram

---

<div class="flex items-center justify-center">
  <h1 class="text-center text-gray-100 text-4xl font-bold">Game Documentation</h1>
</div>
<br>
<div class="flex flex-col items-center justify-center space-y-4 mb-4">
  <div class="flex items-center max-w-sm drop-shadow-lg rounded justify-center w-1/2 bg-gray-400">
    <h2 class="text-3xl text-center font-semibold text-white">Addition 1: End Portal</h2>
  </div>
</div>
<p class="font-medium text-gray-100 mb-4">- The End Portal is a NPC located in GameLevelDesert that takes the player to GameLevelEnd</p>
<div class="bg-gray-800 text-gray-200 font-mono text-sm p-4 rounded-lg overflow-auto mb-5 drop-shadow-xl">
  <pre>
    <code>
        const sprite_src_endportal = path + "/images/gamify/exitportalfull.png"; // be sure to include the path
        const sprite_greet_endportal = "Teleport to the End? Press E";
        const sprite_data_endportal = {
        id: 'End Portal',
        greeting: sprite_greet_endportal,
        src: sprite_src_endportal,
        SCALE_FACTOR: 6,  // smaller = baller
        ANIMATION_RATE: 100,
        pixels: {width: 2029, height: 2025},
        INIT_POSITION: { x: (width * 2 / 5), y: (height * 1 / 10)}, // Adjusted position
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
        }
      </code>
    </pre>
  </div>
  
<p class="font-medium text-gray-100 mb-4">- This part is just standard code that lets the NPC be displayed with Mr. Mortensen's system</p>

<div class="bg-gray-800 text-gray-200 font-mono text-sm p-4 rounded-lg overflow-auto mb-4 drop-shadow-xl">
  <pre>
    <code>
      reaction: function() {
        alert(sprite_greet_endportal);
      },
      /* Interact function
       *  This function is called when the player interacts with the NPC
      *  It pauses the main game, creates a new GameControl instance with the End level,
      */
      interact: function() {
        // Set a primary game reference from the game environment
        let primaryGame = gameEnv.gameControl;
        // Define the game in game level
        let levelArray = [GameLevelEnd];
        // Define a new GameControl instance with the End level
        let gameInGame = new GameControl(gameEnv.game, levelArray);
        // Pause the primary game 
        primaryGame.pause();
        // Start the game in game
        gameInGame.start();
        // Setup "callback" function to allow transition from game in game to the underlying game
        gameInGame.gameOver = function() {
        // Call .resume on primary game
        primaryGame.resume();
        }
      }
      </code>
    </pre>
  </div>

<p class="font-medium text-gray-100 mb-4">- The reaction: function displays a message on collision. <br>- The 
interact function creates a game-in-game instance which loads another gameControl instance and allows the player to complete the End level without losing their progress on the main game line.
</p>

<div class="flex 1/4 justify-center items-center bg-gray-400 rounded">
  <p class=" text-gray-100 font-medium">Now here's the full character code</p> 
</div>






