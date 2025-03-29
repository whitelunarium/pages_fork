import GameEnvBackground from "./GameEnvBackground.js"
import Player from "./Player.js"
import Meteor from "./Meteor.js"
import Character from "./Character.js"
import Quiz from "./Quiz.js"
import { checkGameImages } from "./debug-helper.js"

class GameLevelMeteorBlaster {
  constructor(gameEnv) {
    this.gameEnv = gameEnv
    let width = gameEnv.innerWidth
    let height = gameEnv.innerHeight
    let path = gameEnv.path

    console.log("Game path:", path)  // Debug log
    checkGameImages(path)

    this.score = 0
    this.lives = 3
    this.gameOver = false
    this.isPaused = false
    this.meteors = []
    this.lasers = []
    this.lastShotTime = 0
    this.shootCooldown = 500
    this.meteorSpawnRate = 2000  // Time between meteor spawns in milliseconds
    this.meteorSpawnInterval = null
    this.invincibleTime = 0
    this.invincibleDuration = 1500
    this.questionsAnswered = 0
    this.totalQuestions = 3  // Set to 3 questions total
    this.hasKey = false
    this.meteorsSpawned = 0  // Track number of meteors spawned

    this.quiz = new Quiz()
    this.quiz.initialize()

    const image_src_space = path + "/images/gamify/space.png"  // be sure to include the path
    const image_data_space = {
      id: "Space-Background",
      src: image_src_space,
      pixels: { height: 857, width: 1200 },
    }

    const sprite_src_ufo = path + "/images/gamify/ufo.png"  // be sure to include the path
    const UFO_SCALE_FACTOR = 5
    this.playerData = {
      id: "Ufo",
      src: sprite_src_ufo,
      SCALE_FACTOR: UFO_SCALE_FACTOR,
      STEP_FACTOR: 100,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: width / 2 - 50, y: height - 100 },
      pixels: { height: 422, width: 460 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      left: { row: 0, start: 0, columns: 1 },
      right: { row: 0, start: 0, columns: 1 },
      up: { row: 0, start: 0, columns: 1 },
      keypress: {
        up: 87,
        left: 65,
        down: 83,
        right: 68,
      },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
    }

    const laser_image = path + "/images/gamify/laser_bolt.png"  // be sure to include the path
    this.laserData = {
      id: "Laser",
      src: laser_image,
      SCALE_FACTOR: 20,
      ANIMATION_RATE: 50,
      pixels: { height: 500, width: 500 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
    }

    const meteor_image = path + "/images/gamify/meteor.png"  // be sure to include the path
    this.meteorData = {
      id: "Meteor",
      src: meteor_image,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 50,
      pixels: { height: 100, width: 100 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
    }

    // Log all image paths for debugging
    console.log("Space image path:", image_src_space)
    console.log("UFO image path:", sprite_src_ufo)
    console.log("Laser image path:", laser_image)
    console.log("Meteor image path:", meteor_image)

    this.classes = [
      { class: GameEnvBackground, data: image_data_space },
      { class: Player, data: this.playerData },
    ]

    this.createScoreDisplay()
    this.createLivesDisplay()
    this.bindShootKey()
  }

  initialize() {
    console.log("Initializing Meteor Blaster game")
    this.startMeteorSpawner()
  }

  startMeteorSpawner() {
    console.log("Starting meteor spawner")
    if (this.meteorSpawnInterval) {
      clearInterval(this.meteorSpawnInterval)
    }

    this.meteorSpawnInterval = setInterval(() => {
      if (!this.isPaused && !this.gameOver && this.questionsAnswered < this.totalQuestions) {
        this.spawnMeteor()
        console.log("Meteor spawned, questions answered:", this.questionsAnswered, "total:", this.totalQuestions)
      } else if (this.questionsAnswered >= this.totalQuestions) {
        console.log("All questions answered, stopping spawner")
        clearInterval(this.meteorSpawnInterval)
      }
    }, this.meteorSpawnRate)
  }

  spawnMeteor() {
    console.log("Spawning meteor with path:", this.meteorData.src)

    const meteorId = `Meteor-${Math.random().toString(36).substr(2, 9)}`

    const meteorData = {
      id: meteorId,
      src: this.meteorData.src,
      SCALE_FACTOR: this.meteorData.SCALE_FACTOR,
      ANIMATION_RATE: this.meteorData.ANIMATION_RATE,
      pixels: this.meteorData.pixels,
      orientation: this.meteorData.orientation,
      down: this.meteorData.down,
      question: this.getRandomQuestion(),
      INIT_POSITION: {
        x: Math.random() * (this.gameEnv.innerWidth - 50),
        y: -100,
      },
    }

    try {
      const meteor = new Meteor(meteorData, this.gameEnv)
      this.meteors.push(meteor)
      this.gameEnv.gameObjects.push(meteor)
      console.log(`Successfully created meteor ${meteorId}, total meteors: ${this.meteors.length}`)
    } catch (error) {
      console.error("Error creating meteor:", error)
    }
  }

  bindShootKey() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.shootLaser()
      }
    })
  }

  shootLaser() {
    if (this.isPaused || this.gameOver) return

    const currentTime = Date.now()
    if (currentTime - this.lastShotTime < this.shootCooldown) return

    this.lastShotTime = currentTime

    const player = this.gameEnv.gameObjects.find((obj) => obj.spriteData && obj.spriteData.id === "Ufo")

    if (!player) {
      console.error("Player not found")
      return
    }

    console.log("Shooting laser")

    const laserData = {
      ...this.laserData,
      id: `Laser-${Math.random().toString(36).substring(2, 9)}`,
      INIT_POSITION: {
        x: player.position.x + player.width / 2 - 10,
        y: player.position.y - 20,
      },
    }

    const laser = new Character(laserData, this.gameEnv)

    laser.velocity = { x: 0, y: -10 }

    laser.update = function () {
      this.position.y += this.velocity.y

      if (this.position.y < -this.height) {
        const index = this.gameEnv.gameObjects.indexOf(this)
        if (index !== -1) {
          this.gameEnv.gameObjects.splice(index, 1)
          this.destroy()
        }
        return
      }

      this.draw()
    }

    this.lasers.push(laser)
    this.gameEnv.gameObjects.push(laser)
  }

  createScoreDisplay() {
    const gameContainer = document.getElementById("gameContainer")
    if (!gameContainer) {
      console.error("Game container not found")
      return
    }

    const existingScore = document.getElementById("meteor-score")
    if (existingScore) {
      existingScore.remove()
    }

    this.scoreElement = document.createElement("div")
    this.scoreElement.id = "meteor-score"
    this.scoreElement.style.position = "absolute"
    this.scoreElement.style.top = "20px"
    this.scoreElement.style.left = "50%"
    this.scoreElement.style.transform = "translateX(-50%)"
    this.scoreElement.style.color = "#FFFFFF"
    this.scoreElement.style.fontSize = "28px"
    this.scoreElement.style.fontWeight = "bold"
    this.scoreElement.style.zIndex = "1000"
    this.scoreElement.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)"
    this.scoreElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
    this.scoreElement.style.padding = "10px 20px"
    this.scoreElement.style.borderRadius = "15px"
    this.scoreElement.style.display = "flex"
    this.scoreElement.style.gap = "20px"
    this.scoreElement.style.alignItems = "center"
    this.scoreElement.innerHTML = `
      <span style="color: #FFD700">Score: ${this.score}</span>
      <span style="color: #00FF00">Questions: ${this.questionsAnswered}/${this.totalQuestions}</span>
    `

    gameContainer.appendChild(this.scoreElement)
  }

  createLivesDisplay() {
    const gameContainer = document.getElementById("gameContainer")
    if (!gameContainer) {
      console.error("Game container not found")
      return
    }

    const existingLives = document.getElementById("meteor-lives")
    if (existingLives) {
      existingLives.remove()
    }

    this.livesElement = document.createElement("div")
    this.livesElement.id = "meteor-lives"
    this.livesElement.style.position = "absolute"
    this.livesElement.style.top = "10px"
    this.livesElement.style.right = "10px"
    this.livesElement.style.color = "white"
    this.livesElement.style.fontSize = "24px"
    this.livesElement.style.fontWeight = "bold"
    this.livesElement.style.zIndex = "1000"
    this.livesElement.textContent = "Lives: 3"

    gameContainer.appendChild(this.livesElement)
  }

  updateScore(points) {
    this.score += points
    this.updateDisplay()
  }

  updateQuestions() {
    this.questionsAnswered++
    this.updateDisplay()
  }

  updateDisplay() {
    const scoreElement = document.getElementById("meteor-score")
    if (scoreElement) {
      scoreElement.innerHTML = `
        <span style="color: #FFD700">Score: ${this.score}</span>
        <span style="color: #00FF00">Questions: ${this.questionsAnswered}/${this.totalQuestions}</span>
      `
      console.log("Display updated - Score:", this.score, "Questions:", this.questionsAnswered, "Total:", this.totalQuestions)
    } else {
      this.createScoreDisplay()
    }
  }

  updateLives(lives) {
    this.lives = lives
    if (this.livesElement) {
      this.livesElement.textContent = `Lives: ${this.lives}`
    }

    if (this.lives <= 0) {
      this.endGame()
    }
  }

  getRandomQuestion() {
    const questions = [
      // Multiple choice questions
      {
        type: "multiple-choice",
        question: "What is compound interest?",
        options: [
          "Interest earned on both principal and previously earned interest",
          "Interest earned only on the principal amount",
          "A fixed interest rate that never changes",
          "Interest paid at the end of a loan term"
        ],
        correctAnswer: 0
      },
      {
        type: "multiple-choice",
        question: "Which investment typically has the highest risk?",
        options: [
          "Government bonds",
          "Individual stocks",
          "Savings accounts",
          "Certificates of deposit"
        ],
        correctAnswer: 1
      },
      {
        type: "multiple-choice",
        question: "What is diversification in investing?",
        options: [
          "Putting all money in one stable stock",
          "Spreading investments across different assets",
          "Only investing in real estate",
          "Keeping all money in a savings account"
        ],
        correctAnswer: 1
      },
      {
        type: "multiple-choice",
        question: "What is a bear market?",
        options: [
          "A market where prices are rising",
          "A market where prices are falling",
          "A market with no change",
          "A market only for commodities"
        ],
        correctAnswer: 1
      },
      {
        type: "multiple-choice",
        question: "What is an ETF?",
        options: [
          "Exchange-Traded Fund",
          "Electronic Transfer Fee",
          "Extended Tax Form",
          "Emergency Trust Fund"
        ],
        correctAnswer: 0
      },

      // Free response questions
      {
        type: "free-response",
        question: "What is the most common retirement account type in the US? (Hint: 3 letters)",
        correctAnswer: "401k",
        acceptableAnswers: ["401k", "401(k)", "401-k"]
      },
      {
        type: "free-response",
        question: "What is the name for money you initially put into an investment?",
        correctAnswer: "principal",
        acceptableAnswers: ["principal", "principle", "initial investment"]
      },
      {
        type: "free-response",
        question: "What type of investment pays regular fixed payments? (Hint: 4 letters)",
        correctAnswer: "bond",
        acceptableAnswers: ["bond", "bonds"]
      },
      {
        type: "free-response",
        question: "What's the term for the upward movement of market prices? (Hint: starts with B)",
        correctAnswer: "bull",
        acceptableAnswers: ["bull", "bullish", "bull market"]
      },
      {
        type: "free-response",
        question: "What's the three-letter acronym for a tax-advantaged retirement account?",
        correctAnswer: "IRA",
        acceptableAnswers: ["ira", "IRA", "i.r.a."]
      }
    ];

    return questions[Math.floor(Math.random() * questions.length)];
  }

  showQuiz(meteor) {
    this.isPaused = true

    const question = meteor.spriteData.question
    const quizData = {
      title: "Finance Challenge",
      question: question.question,
      type: question.type,
      options: question.options,
      correctAnswer: question.correctAnswer,
      acceptableAnswers: question.acceptableAnswers
    }

    const handleAnswer = (isCorrect) => {
      console.log("Quiz callback received, isCorrect:", isCorrect) // Debug log

      if (isCorrect) {
        // First remove the meteor
        const meteorIndex = this.meteors.indexOf(meteor)
        if (meteorIndex > -1) {
          this.meteors.splice(meteorIndex, 1)
          const gameObjectIndex = this.gameEnv.gameObjects.indexOf(meteor)
          if (gameObjectIndex > -1) {
            this.gameEnv.gameObjects.splice(gameObjectIndex, 1)
          }
        }

        // Update score and questions using the dedicated methods
        this.updateScore(20)
        this.updateQuestions()
        
        console.log("Updated score:", this.score)
        console.log("Questions answered:", this.questionsAnswered)
        
        // Check if all questions are answered
        if (this.questionsAnswered >= this.totalQuestions && !this.hasKey) {
          this.hasKey = true
          this.showKeyReward()
        }

        // 10% chance to get an extra life (up to max 5 lives)
        if (Math.random() < 0.1 && this.lives < 5) {
          this.updateLives(this.lives + 1)
          this.showLifeGainedMessage()
        }
      } else {
        this.updateScore(5)
      }

      // Force a display update
      this.updateDisplay()
      this.isPaused = false
    }

    this.quiz.openPanel(quizData, handleAnswer)
  }

  showKeyReward() {
    const gameContainer = document.getElementById("gameContainer")
    if (!gameContainer) return

    // Create cookie with key
    document.cookie = "gameKey=meteorBlasterKey; path=/; max-age=86400" // Cookie lasts 24 hours

    const keyMsg = document.createElement("div")
    keyMsg.style.position = "absolute"
    keyMsg.style.top = "50%"
    keyMsg.style.left = "50%"
    keyMsg.style.transform = "translate(-50%, -50%)"
    keyMsg.style.color = "#FFD700"
    keyMsg.style.fontSize = "36px"
    keyMsg.style.fontWeight = "bold"
    keyMsg.style.textAlign = "center"
    keyMsg.style.zIndex = "1000"
    keyMsg.style.textShadow = "0 0 10px #FFD700"
    keyMsg.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
    keyMsg.style.padding = "20px"
    keyMsg.style.borderRadius = "10px"
    keyMsg.style.border = "2px solid #FFD700"
    keyMsg.innerHTML = `
      🎉 CONGRATULATIONS! 🎉<br>
      You've earned the key!<br>
      <span style="font-size: 24px; color: #00FF00">Key: meteorBlasterKey</span><br>
      <span style="font-size: 20px; color: #FFA500">Page will refresh in 5 seconds...</span>
    `

    gameContainer.appendChild(keyMsg)

    // Refresh the page after 5 seconds
    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }

  showLifeGainedMessage() {
    const gameContainer = document.getElementById("gameContainer")
    if (!gameContainer) return

    const lifeMsg = document.createElement("div")
    lifeMsg.style.position = "absolute"
    lifeMsg.style.top = "50%"
    lifeMsg.style.left = "50%"
    lifeMsg.style.transform = "translate(-50%, -50%)"
    lifeMsg.style.color = "#00ff00"
    lifeMsg.style.fontSize = "36px"
    lifeMsg.style.fontWeight = "bold"
    lifeMsg.style.textAlign = "center"
    lifeMsg.style.zIndex = "1000"
    lifeMsg.style.textShadow = "0 0 10px #00ff00"
    lifeMsg.textContent = "EXTRA LIFE!"

    gameContainer.appendChild(lifeMsg)

    setTimeout(() => {
      lifeMsg.remove()
    }, 1500)
  }

  checkCollisions() {
    // Get player object
    const player = this.gameEnv.gameObjects.find((obj) => obj.spriteData && obj.spriteData.id === "Ufo")
    if (!player) return

    // Check for laser-meteor collisions
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i]

      for (let j = this.meteors.length - 1; j >= 0; j--) {
        const meteor = this.meteors[j]

        if (!meteor.isHit && this.isColliding(laser, meteor)) {
          meteor.isHit = true
          this.showQuiz(meteor)
          this.updateScore(10)
          this.removeMeteor(j)
          this.removeLaser(i)
          break
        }
      }
    }

    // Check for player-meteor collisions (only if not invincible)
    if (Date.now() > this.invincibleTime) {
      for (let j = this.meteors.length - 1; j >= 0; j--) {
        const meteor = this.meteors[j]

        if (!meteor.isHit && this.isColliding(player, meteor)) {
          // Player hit by meteor
          this.updateLives(this.lives - 1)
          this.removeMeteor(j)

          // Make player invincible for a short time
          this.invincibleTime = Date.now() + this.invincibleDuration

          // Flash player to indicate invincibility
          this.flashPlayer(player)

          break
        }
      }
    }
  }

  flashPlayer(player) {
    let flashCount = 0
    const maxFlashes = 6
    const flashInterval = setInterval(() => {
      if (flashCount >= maxFlashes) {
        clearInterval(flashInterval)
        if (player.canvas) {
          player.canvas.style.opacity = "1"
        }
        return
      }

      if (player.canvas) {
        player.canvas.style.opacity = flashCount % 2 === 0 ? "0.3" : "1"
      }
      flashCount++
    }, 250)
  }

  isColliding(obj1, obj2) {
    return (
      obj1.position.x < obj2.position.x + obj2.width &&
      obj1.position.x + obj1.width > obj2.position.x &&
      obj1.position.y < obj2.position.y + obj2.height &&
      obj1.position.y + obj1.height > obj2.position.y
    )
  }

  removeMeteor(index) {
    const meteor = this.meteors[index]
    const gameObjIndex = this.gameEnv.gameObjects.indexOf(meteor)

    if (gameObjIndex !== -1) {
      this.gameEnv.gameObjects.splice(gameObjIndex, 1)
    }

    this.meteors.splice(index, 1)
    meteor.destroy()
  }

  removeLaser(index) {
    if (index < 0 || index >= this.lasers.length) return

    const laser = this.lasers[index]
    if (!laser) return

    const gameObjIndex = this.gameEnv.gameObjects.indexOf(laser)
    if (gameObjIndex !== -1) {
      this.gameEnv.gameObjects.splice(gameObjIndex, 1)
    }

    this.lasers.splice(index, 1)

    if (laser.destroy && typeof laser.destroy === "function") {
      laser.destroy()
    }
  }

  checkGameOver() {
    for (let i = 0; i < this.meteors.length; i++) {
      if (this.meteors[i].position.y > this.gameEnv.innerHeight && !this.meteors[i].isHit) {
        // Meteor reached bottom - no life lost, just remove it
        this.removeMeteor(i)
      }
    }
  }

  endGame() {
    this.gameOver = true
    clearInterval(this.meteorSpawnInterval)

    const gameContainer = document.getElementById("gameContainer")
    if (!gameContainer) {
      console.error("Game container not found")
      return
    }

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
    gameOverMsg.innerHTML = `GAME OVER<br>Score: ${this.score}<br><span style="font-size: 24px">Press ESC to exit the game</span>`

    gameContainer.appendChild(gameOverMsg)
  }

  cleanup() {
    if (this.meteorSpawnInterval) {
      clearInterval(this.meteorSpawnInterval)
    }

    if (this.scoreElement) {
      this.scoreElement.remove()
    }

    if (this.livesElement) {
      this.livesElement.remove()
    }
  }

  update() {
    if (this.isPaused || this.gameOver) return

    for (let i = 0; i < this.meteors.length; i++) {
      if (this.meteors[i] && typeof this.meteors[i].update === "function") {
        this.meteors[i].update()
      }
    }

    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laserIndex = this.gameEnv.gameObjects.indexOf(this.lasers[i])
      if (laserIndex === -1 || this.lasers[i].position.y < -this.lasers[i].height) {
        this.removeLaser(i)
        continue
      }
    }

    this.checkCollisions()
    this.checkGameOver()
  }

  destroy() {
    this.cleanup()
  }
}

export default GameLevelMeteorBlaster

