import Character from "./Character.js"

class Meteor extends Character {
  constructor(data, gameEnv) {
    super(data, gameEnv)

    // Set initial position
    this.position = data.INIT_POSITION || {
      x: Math.random() * (gameEnv.innerWidth - this.width),
      y: -this.height,
    }

    // Set random velocity for falling
    this.velocity = {
      x: (Math.random() - 0.5) * 2, // slight horizontal movement
      y: 3 + Math.random() * 2, // Increased speed (was 2 + Math.random() * 3)
    }

    // Track if meteor has been hit
    this.isHit = false

    console.log(`Created meteor at position (${this.position.x}, ${this.position.y})`)
  }

  update() {
    if (this.isHit) return

    // Move the meteor
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // Bounce off walls
    if (this.position.x <= 0 || this.position.x + this.width >= this.gameEnv.innerWidth) {
      this.velocity.x *= -1
    }

    // Draw the meteor
    this.draw()
  }
}

export default Meteor

