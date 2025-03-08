import Background from "./Background.js"
import Player from "./Player.js"
import Meteor from "./Meteor.js"
import Character from "./Character.js"
import Quiz from "./Quiz.js"
import { checkGameImages } from "./debug-helper.js"

class GameLevelMeteorBlaster {
  constructor(gameEnv) {
    this.gameEnv = gameEnv
    const width = gameEnv.innerWidth
    const height = gameEnv.innerHeight
    const path = gameEnv.path

    checkGameImages(path)

    this.score = 0
    this.gameOver = false
    this.isPaused = false
    this.meteors = []
    this.lasers = []
    this.lastShotTime = 0
    this.shootCooldown = 500
    this.meteorSpawnRate = 2000
    this.meteorSpawnInterval = null

    this.quiz = new Quiz()
    this.quiz.initialize()

    const image_src_space = path + "/images/gamify/space.png"
    const image_data_space = {
      id: "Space-Background",
      src: image_src_space,
      pixels: { height: 857, width: 1200 },
    }

    const sprite_src_ufo = path + "/images/gamify/ufo.png"
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

    this.laserData = {
      id: "Laser",
      src: path + "/images/gamify/laser_bolt.png",
      SCALE_FACTOR: 20,
      ANIMATION_RATE: 50,
      pixels: { height: 500, width: 500 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
    }

    this.meteorData = {
      id: "Meteor",
      src: path + "/images/gamify/meteor.png",
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 50,
      pixels: { height: 1111, width: 1111 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
    }

    this.classes = [
      { class: Background, data: image_data_space },
      { class: Player, data: this.playerData },
    ]

    this.createScoreDisplay()
    this.bindShootKey()
  }

  initialize() {
    console.log("Initializing Meteor Blaster game")
    this.startMeteorSpawner()
    for (let i = 0; i < 3; i++) {
      this.spawnMeteor()
    }
  }

  startMeteorSpawner() {
    console.log("Starting meteor spawner")
    if (this.meteorSpawnInterval) {
      clearInterval(this.meteorSpawnInterval)
    }

    this.meteorSpawnInterval = setInterval(() => {
      if (!this.isPaused && !this.gameOver) {
        this.spawnMeteor()
      }
    }, 1500)
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
    this.scoreElement.style.top = "10px"
    this.scoreElement.style.left = "10px"
    this.scoreElement.style.color = "white"
    this.scoreElement.style.fontSize = "24px"
    this.scoreElement.style.fontWeight = "bold"
    this.scoreElement.style.zIndex = "1000"
    this.scoreElement.textContent = "Score: 0"

    gameContainer.appendChild(this.scoreElement)
  }

  updateScore(points) {
    this.score += points
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this.score}`
    }
  }

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

  showQuiz(meteor) {
    this.isPaused = true

    const quizData = {
      title: "Meteor Question",
      questions: [meteor.spriteData.question],
    }

    this.quiz.openPanel(quizData)

    const submitButton = document.querySelector(".quiz-submit")
    if (submitButton) {
      const newButton = submitButton.cloneNode(true)
      submitButton.parentNode.replaceChild(newButton, submitButton)

      newButton.addEventListener("click", () => {
        this.isPaused = false
      })
    }
  }

  checkCollisions() {
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
      if (this.meteors[i].position.y > this.gameEnv.innerHeight) {
        this.endGame()
        return
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
    gameOverMsg.innerHTML = `GAME OVER<br>Score: ${this.score}<br><span style="font-size: 24px">Press ESC to exit</span>`

    gameContainer.appendChild(gameOverMsg)
  }

  cleanup() {
    if (this.meteorSpawnInterval) {
      clearInterval(this.meteorSpawnInterval)
    }

    if (this.scoreElement) {
      this.scoreElement.remove()
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

    for (let i = this.meteors.length - 1; i >= 0; i--) {
      if (this.meteors[i].position.y > this.gameEnv.innerHeight && !this.meteors[i].isHit) {
        this.removeMeteor(i)
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

