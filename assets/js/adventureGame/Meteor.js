import Character from "./Character.js"

class Meteor extends Character {
  constructor(data, gameEnv) {
    // Log the data being passed to the constructor
    console.log("Creating meteor with data:", data)

    // Ensure data has all required properties
    if (!data.src) {
      console.error("Meteor data missing src property")
    }

    super(data, gameEnv)

    // Set initial position
    this.position = data.INIT_POSITION || {
      x: Math.random() * (gameEnv.innerWidth - this.width),
      y: -this.height,
    }

    // Set random velocity for falling
    this.velocity = {
      x: (Math.random() - 0.5) * 2, // slight horizontal movement
      y: 3 + Math.random() * 2, // Increased speed
    }

    // Track if meteor has been hit
    this.isHit = false

    console.log(`Created meteor at position (${this.position.x}, ${this.position.y})`)

    // Verify the sprite loaded correctly
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

