import Background from "./Background.js"
import Player from "./Player.js"
import Meteor from "./Meteor.js"
import Character from "./Character.js"
import Quiz from "./Quiz.js"

class GameLevelMeteorBlaster {
  constructor(gameEnv) {
    // Store reference to game environment
    this.gameEnv = gameEnv
    const width = gameEnv.innerWidth
    const height = gameEnv.innerHeight
    const path = gameEnv.path

    // Game state
    this.score = 0
    this.gameOver = false
    this.isPaused = false
    this.meteors = []
    this.lasers = []
    this.lastShotTime = 0
    this.shootCooldown = 500 // milliseconds between shots
    this.meteorSpawnRate = 2000 // milliseconds between meteor spawns
    this.meteorSpawnInterval = null

    // Initialize quiz
    this.quiz = new Quiz()
    this.quiz.initialize()

    // Background (Space Image)
    const image_src_space = path + "/images/gamify/space.png"
    const image_data_space = {
      id: "Space-Background",
      src: image_src_space,
      pixels: { height: 857, width: 1200 },
    }

    // Updated Player (UFO) configuration
    const sprite_src_ufo = path + "/images/gamify/ufo.png"
    const UFO_SCALE_FACTOR = 5
    this.playerData = {
      id: "Ufo",
      src: sprite_src_ufo,
      SCALE_FACTOR: UFO_SCALE_FACTOR,
      STEP_FACTOR: 100, // Reduced from 1000 to make movement more responsive
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: width / 2 - 50, y: height - 100 },
      pixels: { height: 422, width: 460 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      left: { row: 0, start: 0, columns: 1 },
      right: { row: 0, start: 0, columns: 1 },
      up: { row: 0, start: 0, columns: 1 },
      keypress: {
        up: 87, // W
        left: 65, // A
        down: 83, // S
        right: 68, // D
      },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 }, // Added hitbox
    }

    // Laser data
    this.laserData = {
      id: "Laser",
      src: path + "/images/gamify/laser_bolt.png",
      SCALE_FACTOR: 20,
      ANIMATION_RATE: 50,
      pixels: { height: 500, width: 500 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
    }

    // Meteor data
    this.meteorData = {
      id: "Meteor",
      src: path + "/images/gamify/meteor.png",
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 50,
      pixels: { height: 100, width: 100 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
    }

    // List of game objects - IMPORTANT: This is what the GameLevel uses to create objects
    this.classes = [
      { class: Background, data: image_data_space },
      { class: Player, data: this.playerData },
    ]

    // Create score display - ensure gameContainer exists
    this.createScoreDisplay()

    // Bind shoot method to spacebar
    this.bindShootKey()
  }

  initialize() {
    console.log("Initializing Meteor Blaster game")
    // Start meteor spawner immediately
    this.startMeteorSpawner()
    // Spawn initial meteors
    for (let i = 0; i < 3; i++) {
      this.spawnMeteor()
    }
  }

  startMeteorSpawner() {
    console.log("Starting meteor spawner")
    // Clear any existing interval
    if (this.meteorSpawnInterval) {
      clearInterval(this.meteorSpawnInterval)
    }

    // Spawn meteors more frequently (every 1.5 seconds)
    this.meteorSpawnInterval = setInterval(() => {
      if (!this.isPaused && !this.gameOver) {
        this.spawnMeteor()
      }
    }, 1500) // Changed from 2000 to 1500ms
  }

  spawnMeteor() {
    console.log("Spawning meteor")
    const meteorData = {
      ...this.meteorData,
      id: `Meteor-${Math.random().toString(36).substr(2, 9)}`,
      question: this.getRandomQuestion(),
      INIT_POSITION: {
        x: Math.random() * (this.gameEnv.innerWidth - 50),
        y: -100, // Start above the screen
      },
    }

    const meteor = new Meteor(meteorData, this.gameEnv)
    this.meteors.push(meteor)
    this.gameEnv.gameObjects.push(meteor)
  }

  // Bind shoot key (spacebar)
  bindShootKey() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.shootLaser()
      }
    })
  }

  // Shoot laser from player
  shootLaser() {
    if (this.isPaused || this.gameOver) return

    const currentTime = Date.now()
    if (currentTime - this.lastShotTime < this.shootCooldown) return

    this.lastShotTime = currentTime

    // Find player
    const player = this.gameEnv.gameObjects.find((obj) => obj.spriteData && obj.spriteData.id === "Ufo")

    if (!player) {
      console.error("Player not found")
      return
    }

    console.log("Shooting laser")

    // Create laser data
    const laserData = {
      ...this.laserData,
      id: `Laser-${Math.random().toString(36).substring(2, 9)}`,
      INIT_POSITION: {
        x: player.position.x + player.width / 2 - 10,
        y: player.position.y - 20,
      },
    }

    // Create laser character
    const laser = new Character(laserData, this.gameEnv)

    // Set upward velocity for laser
    laser.velocity = { x: 0, y: -10 }

    // Override update method to handle laser movement
    laser.update = function () {
      this.position.y += this.velocity.y
      this.draw()
    }

    this.lasers.push(laser)
    this.gameEnv.gameObjects.push(laser)
  }

  // Create score display
  createScoreDisplay() {
    // Check if gameContainer exists
    const gameContainer = document.getElementById("gameContainer")
    if (!gameContainer) {
      console.error("Game container not found")
      return
    }

    // Remove existing score element if it exists
    const existingScore = document.getElementById("meteor-score")
    if (existingScore) {
      existingScore.remove()
    }

    this.scoreElement = document.createElement("div")
    this.scoreElement.id = "meteor-score"
    this.scoreElement.style.position = "absolute"
    this.scoreElement.style.top = "10px"
    this.scoreElement.style.left = "10px"
    this.scoreElement.style.color = "white"
    this.scoreElement.style.fontSize = "24px"
    this.scoreElement.style.fontWeight = "bold"
    this.scoreElement.style.zIndex = "1000"
    this.scoreElement.textContent = "Score: 0"

    gameContainer.appendChild(this.scoreElement)
  }

  // Update score
  updateScore(points) {
    this.score += points
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this.score}`
    }
  }

  // Get random question
  getRandomQuestion() {
    const questions = [
      "What is 2 + 2?\n1. 3\n2. 4\n3. 5\n4. 6",
      "Which planet is closest to the Sun?\n1. Earth\n2. Venus\n3. Mercury\n4. Mars",
      "What is the chemical symbol for water?\n1. H2O\n2. CO2\n3. O2\n4. N2",
      "What is the capital of France?\n1. London\n2. Berlin\n3. Madrid\n4. Paris",
      "Who wrote 'Romeo and Juliet'?\n1. Charles Dickens\n2. William Shakespeare\n3. Jane Austen\n4. Mark Twain",
    ]

    return questions[Math.floor(Math.random() * questions.length)]
  }

  // Show quiz when meteor is hit
  showQuiz(meteor) {
    // Pause the game
    this.isPaused = true

    // Create quiz data
    const quizData = {
      title: "Meteor Question",
      questions: [meteor.spriteData.question],
    }

    // Show quiz panel
    this.quiz.openPanel(quizData)

    // Add event listener for quiz completion
    const submitButton = document.querySelector(".quiz-submit")
    if (submitButton) {
      // Remove existing event listeners
      const newButton = submitButton.cloneNode(true)
      submitButton.parentNode.replaceChild(newButton, submitButton)

      // Add new event listener
      newButton.addEventListener("click", () => {
        this.isPaused = false
      })
    }
  }

  // Check collisions between lasers and meteors
  checkCollisions() {
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i]

      for (let j = this.meteors.length - 1; j >= 0; j--) {
        const meteor = this.meteors[j]

        if (!meteor.isHit && this.isColliding(laser, meteor)) {
          // Mark meteor as hit
          meteor.isHit = true

          // Show quiz
          this.showQuiz(meteor)

          // Increase score
          this.updateScore(10)

          // Remove meteor and laser
          this.removeMeteor(j)
          this.removeLaser(i)

          break
        }
      }
    }
  }

  // Simple collision detection
  isColliding(obj1, obj2) {
    return (
      obj1.position.x < obj2.position.x + obj2.width &&
      obj1.position.x + obj1.width > obj2.position.x &&
      obj1.position.y < obj2.position.y + obj2.height &&
      obj1.position.y + obj1.height > obj2.position.y
    )
  }

  // Remove meteor
  removeMeteor(index) {
    const meteor = this.meteors[index]
    const gameObjIndex = this.gameEnv.gameObjects.indexOf(meteor)

    if (gameObjIndex !== -1) {
      this.gameEnv.gameObjects.splice(gameObjIndex, 1)
    }

    this.meteors.splice(index, 1)
    meteor.destroy()
  }

  // Remove laser
  removeLaser(index) {
    const laser = this.lasers[index]
    const gameObjIndex = this.gameEnv.gameObjects.indexOf(laser)

    if (gameObjIndex !== -1) {
      this.gameEnv.gameObjects.splice(gameObjIndex, 1)
    }

    this.lasers.splice(index, 1)
    laser.destroy()
  }

  // Check if any meteors hit the bottom
  checkGameOver() {
    for (let i = 0; i < this.meteors.length; i++) {
      if (this.meteors[i].position.y > this.gameEnv.innerHeight) {
        this.endGame()
        return
      }
    }
  }

  // End the game
  endGame() {
    this.gameOver = true
    clearInterval(this.meteorSpawnInterval)

    // Check if gameContainer exists
    const gameContainer = document.getElementById("gameContainer")
    if (!gameContainer) {
      console.error("Game container not found")
      return
    }

    // Show game over message
    const gameOverMsg = document.createElement("div")
    gameOverMsg.style.position = "absolute"
    gameOverMsg.style.top = "50%"
    gameOverMsg.style.left = "50%"
    gameOverMsg.style.transform = "translate(-50%, -50%)"
    gameOverMsg.style.color = "white"
    gameOverMsg.style.fontSize = "48px"
    gameOverMsg.style.fontWeight = "bold"
    gameOverMsg.style.textAlign = "center"
    gameOverMsg.style.zIndex = "1000"
    gameOverMsg.innerHTML = `GAME OVER<br>Score: ${this.score}<br><span style="font-size: 24px">Press ESC to exit</span>`

    gameContainer.appendChild(gameOverMsg)
  }

  // Clean up when level is destroyed
  cleanup() {
    if (this.meteorSpawnInterval) {
      clearInterval(this.meteorSpawnInterval)
    }

    if (this.scoreElement) {
      this.scoreElement.remove()
    }
  }

  // This is the main update method called by the game loop
  update() {
    if (this.isPaused || this.gameOver) return

    // Update lasers and remove those that are off-screen
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      if (this.lasers[i].position.y < -this.lasers[i].height) {
        this.removeLaser(i)
      }
    }

    // Update meteors and remove those that are off-screen
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      if (this.meteors[i].position.y > this.gameEnv.innerHeight && !this.meteors[i].isHit) {
        this.removeMeteor(i)
      }
    }

    // Check for collisions
    this.checkCollisions()

    // Check if game is over
    this.checkGameOver()
  }

  // This method is called when the level is destroyed
  destroy() {
    this.cleanup()
  }
}

export default GameLevelMeteorBlaster

