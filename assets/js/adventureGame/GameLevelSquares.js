
          // NPC Data for End Portal
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
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            /* Reaction function
            *  This function is called when the player collides with the NPC
            *  It displays an alert with the greeting message
            */
            reaction: function() {
              alert(sprite_greet_endportal);
            },
            /* Interact function
            *  This function is called when the player interacts with the NPC
            *  It pauses the main game, creates a new GameControl instance with the StarWars level,
            */
            interact: function() {
              // Set a primary game reference from the game environment
              let primaryGame = gameEnv.gameControl;
              // Define the game in game level
              let levelArray = [GameLevelEnd];
              // Define a new GameControl instance with the StarWars level
              let gameInGame = new GameControl(gameEnv.game,levelArray);
              // Pause the primary game 
              primaryGame.pause();
              // Start the game in game
              gameInGame.start();
              // Setup "callback" function to allow transition from game in gaame to the underlying game
              gameInGame.gameOver = function() {
                // Call .resume on primary game
                primaryGame.resume();
              }
            }
    
          };

