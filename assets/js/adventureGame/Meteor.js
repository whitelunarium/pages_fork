import Character from "./Character.js"

class Meteor extends Character {
  constructor(data, gameEnv) {
    console.log("Creating meteor with data:", data)

    if (!data.src) {
      console.error("Meteor data missing src property")
      throw new Error("Meteor data missing src property")
    }

    super(data, gameEnv)

    this.position = data.INIT_POSITION || {
      x: Math.random() * (gameEnv.innerWidth - this.width),
      y: -this.height,
    }

    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: 1 + Math.random() * 0.5,
    }

    this.isHit = false

    console.log(`Created meteor at position (${this.position.x}, ${this.position.y})`)

    if (this.spriteSheet) {
      this.spriteSheet.onload = () => {
        console.log("Meteor sprite loaded successfully")
      }

      this.spriteSheet.onerror = (error) => {
        console.error("Error loading meteor sprite:", error)
      }
    } else {
      console.error("Meteor sprite sheet not created")
    }
  }

  update() {
    super.update()

    // Move the meteor
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // Check if meteor has reached the bottom of the screen
    if (this.position.y > this.gameEnv.innerHeight) {
      this.destroy()
    }

    this.draw()
  }
}

export default Meteor

