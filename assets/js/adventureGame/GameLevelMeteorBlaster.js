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
    this.lives = 3
    this.gameOver = false
    this.isPaused = false
    this.meteors = []
    this.lasers = []
    this.lastShotTime = 0
    this.shootCooldown = 500
    this.meteorSpawnRate = 2000
    this.meteorSpawnInterval = null
    this.invincibleTime = 0
    this.invincibleDuration = 1500

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
      pixels: { height: 100, width: 100 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
    }

    this.classes = [
      { class: Background, data: image_data_space },
      { class: Player, data: this.playerData },
    ]

    this.createScoreDisplay()
    this.createLivesDisplay()
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
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this.score}`
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
      "What does the 'DOM' stand for in web development?\n1. Document Object Model\n2. Data Object Model\n3. Document Oriented Markup\n4. Digital Object Memory",

      "Which of these is NOT a JavaScript data type?\n1. String\n2. Boolean\n3. Integer\n4. Object",

      "What does CSS stand for?\n1. Computer Style Sheets\n2. Creative Style System\n3. Cascading Style Sheets\n4. Colorful Style Sheets",

      "Which symbol is used for single-line comments in JavaScript?\n1. //\n2. /* */\n3. #\n4. --",

      "What is the correct HTML element for the largest heading?\n1. <h1>\n2. <heading>\n3. <head>\n4. <h6>",

      "Which method adds an element to the end of an array in JavaScript?\n1. push()\n2. append()\n3. add()\n4. insert()",

      "What does API stand for?\n1. Application Programming Interface\n2. Application Process Integration\n3. Automated Programming Interface\n4. Application Protocol Interface",

      "Which of these is a JavaScript framework?\n1. Django\n2. Flask\n3. React\n4. Ruby on Rails",

      "What does the 'git clone' command do?\n1. Creates a new branch\n2. Creates a copy of a repository\n3. Merges two branches\n4. Deletes a repository",

      "Which of these is a valid way to declare a variable in JavaScript?\n1. variable x = 5;\n2. var x = 5;\n3. int x = 5;\n4. x as Integer = 5;",

      "What is the purpose of the 'npm' command?\n1. Node Package Manager\n2. Node Process Monitor\n3. New Program Module\n4. Network Protocol Manager",

      "Which HTML tag is used to create a hyperlink?\n1. <link>\n2. <a>\n3. <href>\n4. <url>",

      "What does JSON stand for?\n1. JavaScript Object Notation\n2. Java Standard Object Notation\n3. JavaScript Oriented Network\n4. Java Source Object Name",

      "Which operator is used for strict equality in JavaScript?\n1. ==\n2. ===\n3. =\n4. !=",

      "What is the correct way to write a function in JavaScript?\n1. function myFunction()\n2. function:myFunction()\n3. function = myFunction()\n4. myFunction() = function",

      "Which method is used to remove the last element from an array in JavaScript?\n1. pop()\n2. remove()\n3. delete()\n4. splice()",

      "What is the purpose of the 'this' keyword in JavaScript?\n1. Refers to the current function\n2. Refers to the current object\n3. Refers to the parent object\n4. Refers to the global object",

      "Which CSS property is used to change the text color?\n1. text-color\n2. font-color\n3. color\n4. text-style",

      "What is the correct way to include an external JavaScript file?\n1. <script href='script.js'>\n2. <script name='script.js'>\n3. <script src='script.js'>\n4. <javascript src='script.js'>",

      "Which method is used to add a class to an HTML element using JavaScript?\n1. element.addClass()\n2. element.className.add()\n3. element.classList.add()\n4. element.class.add()",
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

