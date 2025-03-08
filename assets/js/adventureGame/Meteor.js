import Character from "./Character.js"

class Meteor extends Character {
  constructor(data, gameEnv) {
    super(data, gameEnv)

    // Set random position at the top of the screen
    this.position = {
      x: Math.random() * (gameEnv.innerWidth - this.width),
      y: -this.height,
    }

    // Set random velocity for falling
    this.velocity = {
      x: (Math.random() - 0.5) * 2, // slight horizontal movement
      y: 2 + Math.random() * 3, // downward movement
    }

    // Track if meteor has been hit
    this.isHit = false
  }

  update() {
    // Move the meteor
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // Bounce off walls
    if (this.position.x <= 0 || this.position.x + this.width >= this.gameEnv.innerWidth) {
      this.velocity.x *= -1
    }

    // Draw the meteor
    super.update()
  }
}

export default Meteor

