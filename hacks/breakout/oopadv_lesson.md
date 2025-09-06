---
layout: post 
title: OOP Advanced Lesson
author: Nikhil, Rohan, Pranav, Aditya, Shriya, Samhita
permalink: oopadvlesson
---


<p><a href="{{ site.baseurl }}/oopbreakoutlesson" class="breakout-btn">Return to main OOP lesson page</a></p>
## Lesson 1 — Advanced Inheritance: Building Complex Class Hierarchies

### Big picture

* **Advanced Inheritance** involves creating multiple levels of class hierarchies and understanding when to use inheritance vs. composition.
* In this enhanced project, we have **base classes** (`GameObject`, `Brick`) and **specialized subclasses** (`StrongBrick`, `MovingBrick`) that demonstrate different inheritance patterns.
* **Polymorphism** allows different brick types to behave differently while sharing the same interface.

### Enhanced base classes

**GameObject - The foundation**

```js
class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    draw(ctx) {
        // Base draw method - to be overridden
    }
    
    update() {
        // Base update method - to be overridden
    }
    
    // NEW: Enhanced collision detection
    getBounds() {
        return {
            left: this.x,
            right: this.x + (this.width || this.radius * 2),
            top: this.y,
            bottom: this.y + (this.height || this.radius * 2)
        };
    }
}
```

This enhanced base class now includes collision bounds calculation, making it more useful for subclasses.

**Brick - The specialized base class**

```js
class Brick extends GameObject {
    constructor(x, y, width = 75, height = 20) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.status = 1; // 1 = active, 0 = destroyed
        this.hasPowerUp = Math.random() < 0.3;
        this.color = "#0095DD";
    }
    
    hit() {
        this.status = 0;
        return true; // Brick is destroyed
    }
    
    getPoints() {
        return 1; // Base points for hitting this brick
    }
}
```

`Brick` inherits from `GameObject` but adds brick-specific behavior. This creates a two-level inheritance hierarchy.

### Advanced subclasses

**StrongBrick - Multiple inheritance levels**

```js
class StrongBrick extends Brick {
    constructor(x, y, width = 75, height = 20) {
        super(x, y, width, height);
        this.maxHits = 2;
        this.hits = this.maxHits;
        this.color = "#ff6b35";
    }
    
    hit() {
        this.hits--;
        if (this.hits <= 0) {
            this.status = 0;
            return true; // Brick is destroyed
        }
        return false; // Brick still alive
    }
    
    getPoints() {
        return 2; // Override parent method
    }
}
```

`StrongBrick` extends `Brick`, which extends `GameObject` - this is a **three-level inheritance hierarchy**. It overrides both `hit()` and `getPoints()` methods.

**Try it:** Create an `UltraStrongBrick` that extends `StrongBrick` and requires 3 hits. How would you modify the constructor and `hit()` method?

---

## Lesson 2 — Polymorphism and Method Overriding

### What is polymorphism?

**Polymorphism** means "many forms" - it allows objects of different classes to be treated the same way while behaving differently. In our game, all brick types can be treated as "bricks" but each responds differently to being hit.

### Method overriding in action

**Drawing differences - Each brick type looks different**

```js
// Basic Brick - simple rectangle
draw(ctx) {
    if (this.status === 1) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// StrongBrick - shows remaining hits
draw(ctx) {
    if (this.status === 1) {
        // Dynamic color based on remaining hits
        const alpha = this.hits / this.maxHits;
        const r = 255;
        const g = Math.floor(107 * alpha);
        const b = Math.floor(53 * alpha);
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw hit counter
        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.hits.toString(), this.x + this.width/2, this.y + this.height/2 + 4);
    }
}
```

Both methods are called `draw()`, but they produce different visual results. This is **method overriding**.

**Movement behavior - MovingBrick adds update logic**

```js
class MovingBrick extends Brick {
    constructor(x, y, width = 75, height = 20) {
        super(x, y, width, height);
        this.speed = 1;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.originalX = x;
        this.moveRange = 50;
    }
    
    update(canvasWidth) {
        if (this.status === 1) {
            this.x += this.speed * this.direction;
            
            // Reverse direction at boundaries
            if (Math.abs(this.x - this.originalX) > this.moveRange || 
                this.x <= 0 || this.x >= canvasWidth - this.width) {
                this.direction *= -1;
            }
        }
    }
}
```

`MovingBrick` overrides the base `update()` method to add movement behavior that other bricks don't have.

### Polymorphism in the Game class

**Factory method - Creating different types**

```js
createRandomBrick(x, y) {
    const random = Math.random();
    if (random < 0.6) {
        return new Brick(x, y);
    } else if (random < 0.85) {
        return new StrongBrick(x, y);
    } else {
        return new MovingBrick(x, y);
    }
}
```

This method can return different brick types, but they're all stored in the same `bricks` array and treated uniformly.

**Uniform handling - Same interface, different behavior**

```js
// In the game loop - all bricks are treated the same way
for (let brick of this.bricks) {
    if (brick.isActive() && ball.collidesWith(brick)) {
        const destroyed = brick.hit(); // Calls appropriate hit() method
        if (destroyed) {
            this.score += brick.getPoints(); // Calls appropriate getPoints() method
        }
    }
}
```

The game doesn't need to know what type of brick it's dealing with - each brick responds to `hit()` and `getPoints()` appropriately.

**Try it:** Add a `getDescription()` method to each brick class that returns a different string ("Basic", "Strong", "Moving"). Then log these descriptions during collision detection.

---

## Lesson 3 — Composition and Array Management with Multiple Object Types

### Advanced composition patterns

The `Game` class demonstrates **composition** by managing collections of different object types. This is more complex than simple inheritance because it involves coordinating multiple arrays of different classes.

**Multiple object collections**

```js
class Game {
    constructor(canvasId) {
        // ... initialization ...
        
        // Multiple arrays for different object types
        this.balls = [new Ball(this.width / 2, this.height - 30)]; // Array of balls
        this.paddle = new Paddle(/* ... */);                       // Single paddle
        this.bricks = [];                                          // Mixed brick types
        this.powerUps = [];                                        // Array of power-ups
        
        // Complex state management
        this.activePowerUps = new Set();    // Set for active power-up types
        this.powerUpTimers = {};            // Object for timing
    }
}
```

The game manages **four different collections** with different data structures (arrays, single objects, Sets, and plain objects).

### Array management patterns

**Filtering active objects**

```js
updatePowerUps() {
    for (let powerUp of this.powerUps) {
        powerUp.update(this.height);
        
        if (powerUp.collidesWithPaddle(this.paddle)) {
            powerUp.collect();
            this.applyPowerUp(powerUp.type);
        }
    }
    
    // Remove inactive power-ups
    this.powerUps = this.powerUps.filter(p => p.active);
}
```

This pattern updates all objects, then filters out inactive ones. It's common when objects can become inactive during the game.

**Mixed-type array handling**

```js
update() {
    // Update moving bricks only (using instanceof)
    for (let brick of this.bricks) {
        if (brick instanceof MovingBrick) {
            brick.update(this.width);
        }
    }
}
```

Since the `bricks` array contains different types, we use `instanceof` to identify which objects need special handling.

**Dynamic object creation and removal**

```js
applyPowerUp(type) {
    if (type === "multiball") {
        // Add 2 extra balls dynamically
        for (let i = 0; i < 2; i++) {
            const newBall = new Ball(this.balls[0].x, this.balls[0].y);
            const angle = (Math.PI / 4) * (i + 1);
            const speed = Math.hypot(this.balls[0].dx, this.balls[0].dy);
            newBall.dx = speed * Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1);
            newBall.dy = -speed * Math.sin(angle);
            this.balls.push(newBall); // Add to existing array
        }
    }
}

checkBallCollision() {
    let activeBallCount = 0;
    
    for (let ball of this.balls) {
        if (!ball.active) continue;
        activeBallCount++;
        
        // ... collision logic ...
    }
    
    // Clean up inactive balls by creating new array
    if (activeBallCount === 0) {
        this.balls = [new Ball(this.width / 2, this.height - 30)];
    }
}
```

Objects can be added dynamically (`push()`) or replaced entirely by creating a new array.

**Try it:** Create a method `getBrickTypeCount()` that returns an object with counts of each brick type currently active. Use `instanceof` to identify types.

---

## Lesson 4 — Advanced Object Communication and State Management

### Power-up system architecture

The power-up system demonstrates complex **object communication** where multiple objects need to coordinate their behavior.

**Power-up creation chain**

```js
// 1. Brick determines if it has a power-up (in constructor)
this.hasPowerUp = Math.random() < 0.3;

// 2. When brick is destroyed, Game creates power-up
if (destroyed && brick.hasPowerUp) {
    const powerUpType = this.getRandomPowerUpType();
    this.powerUps.push(new PowerUp(brick.x + brick.width / 2, brick.y, powerUpType));
}

// 3. Power-up falls and checks collision with paddle
collidesWithPaddle(paddle) {
    return (
        this.active &&
        this.y + this.size / 2 >= paddle.canvasHeight - paddle.height &&
        this.x > paddle.x &&
        this.x < paddle.x + paddle.width
    );
}

// 4. Game applies power-up effects
this.applyPowerUp(powerUp.type);
```

This shows how **four different classes** communicate: `Brick` → `Game` → `PowerUp` → `Game` → `Paddle`.

### Complex state management

**Timer-based effects**

```js
class Game {
    constructor() {
        // Complex state tracking
        this.activePowerUps = new Set();           // Which power-ups are active
        this.powerUpTimers = {};                   // When each was activated
        this.powerUpDurations = {                  // How long each lasts
            wide: 5000,
            speed: 3000,
            multiball: 1000
        };
    }
    
    updatePowerUps() {
        // Check timers for all active power-ups
        for (let type of this.activePowerUps) {
            const elapsed = Date.now() - this.powerUpTimers[type];
            if (elapsed > this.powerUpDurations[type]) {
                this.activePowerUps.delete(type);
                delete this.powerUpTimers[type];
                this.removePowerUp(type);  // Clean up effects
            }
        }
    }
}
```

This uses **three different data structures** to track power-up state: a Set for active types, an Object for timers, and another Object for durations.

**State restoration**

```js
removePowerUp(type) {
    if (type === "wide") {
        this.paddle.resetPowerUp();     // Tell paddle to reset
    } else if (type === "speed") {
        for (let ball of this.balls) {
            ball.speedUp(1.43);         // Restore normal speed
        }
    }
    // multiball doesn't need removal - balls naturally disappear
}
```

The game needs to **undo** power-up effects by communicating with the affected objects.

### Factory pattern for object creation

**Power-up type selection**

```js
getRandomPowerUpType() {
    const types = ["wide", "speed", "multiball"];
    const probabilities = [0.4, 0.3, 0.3];
    
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < types.length; i++) {
        cumulative += probabilities[i];
        if (random < cumulative) {
            return types[i];
        }
    }
    return types[0];
}
```

This **factory method** encapsulates the logic for creating different power-up types with weighted probabilities.

**Brick creation factory**

```js
createRandomBrick(x, y) {
    const random = Math.random();
    if (random < 0.6) {
        return new Brick(x, y);
    } else if (random < 0.85) {
        return new StrongBrick(x, y);
    } else {
        return new MovingBrick(x, y);
    }
}
```

This factory abstracts the complexity of choosing which brick type to create.

**Try it:** Create a `PowerUpFactory` class that handles power-up creation logic. Move the `getRandomPowerUpType()` method into this factory class.

---

## Wrap-up: Advanced OOP Concepts in Action

* **Multi-level Inheritance:** `GameObject` → `Brick` → `StrongBrick` creates complex hierarchies
* **Polymorphism:** Different brick types respond differently to the same method calls
* **Advanced Composition:** Game manages multiple arrays of different object types
* **Object Communication:** Complex chains of interaction between different classes
* **State Management:** Sophisticated tracking of temporary effects and timers
* **Factory Patterns:** Centralized creation logic for complex object types

This advanced version demonstrates how OOP concepts scale to handle complex game mechanics while keeping code organized and maintainable.

---

## ACTIVITY: Advanced Inheritance Diagram

Draw your understanding of the advanced class hierarchy and object relationships.

<canvas id="advancedCanvas" width="800" height="600" class="whiteboard-canvas" style="border:1px solid #ccc"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.js" integrity="sha512-hOJ0mwaJavqi11j0XoBN1PtOJ3ykPdP6lp9n29WVVVVZxgx9LO7kMwyyhaznGJ+kbZrDN1jFZMt2G9bxkOHWFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="{{ '/_sass/open-coding/whiteboard.scss' | relative_url }}">
<script>
  const advancedCanvas = new fabric.Canvas('advancedCanvas');
  advancedCanvas.isDrawingMode = true;
  advancedCanvas.freeDrawingBrush.color = "white";
  advancedCanvas.freeDrawingBrush.width = 3;
  document.addEventListener("keydown", e => {
    if(e.key === "r") advancedCanvas.freeDrawingBrush.color = "red";
    if(e.key === "b") advancedCanvas.freeDrawingBrush.color = "blue";
    if(e.key === "g") advancedCanvas.freeDrawingBrush.color = "green";
    if(e.key === "y") advancedCanvas.freeDrawingBrush.color = "yellow";
    if(e.key === "p") advancedCanvas.freeDrawingBrush.color = "purple";
    if(e.key === "c") advancedCanvas.clear();
  });
</script>

<br>
**Drawing Guide:**
- Draw inheritance arrows: `GameObject` → `Brick` → `StrongBrick`
- Show composition: `Game` contains arrays of different objects
- Show communication: arrows between classes that interact
- Use different colors for different concept types

Press `r` for red, `b` for blue, `g` for green, `y` for yellow, `p` for purple, `c` to clear.

## ✅ Advanced Checkpoint Quizzes

<div class="breakout-quiz" data-answers='{"q1":"GameObject → Brick → StrongBrick","q2":"StrongBrick,MovingBrick"}'>
    <div class="breakout-quiz-title">Lesson 1 Checkpoint</div>

    <div class="breakout-quiz-q">
        <p class="prompt">1) What is the correct inheritance chain for StrongBrick?</p>
        <label><input type="radio" name="q1" value="GameObject → StrongBrick"> GameObject → StrongBrick</label>
        <label><input type="radio" name="q1" value="GameObject → Brick → StrongBrick"> GameObject → Brick → StrongBrick</label>
        <label><input type="radio" name="q1" value="Game → Brick → StrongBrick"> Game → Brick → StrongBrick</label>
    </div>

    <div class="breakout-quiz-q">
        <p class="prompt">2) Which classes override the <code>getPoints()</code> method?</p>
        <label><input type="checkbox" name="q2" value="StrongBrick"> StrongBrick</label>
        <label><input type="checkbox" name="q2" value="MovingBrick"> MovingBrick</label>
        <label><input type="checkbox" name="q2" value="Ball"> Ball</label>
        <label><input type="checkbox" name="q2" value="Paddle"> Paddle</label>
    </div>

    <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
    <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
    <div class="breakout-quiz-feedback"></div>
</div>

<div class="breakout-quiz" data-answers='{"q1":"Polymorphism","q2":"MovingBrick"}'>
    <div class="breakout-quiz-title">Lesson 2 Checkpoint</div>

    <div class="breakout-quiz-q">
        <p class="prompt">1) What allows all brick types to be stored in the same array?</p>
        <label><input type="radio" name="q1" value="Inheritance"> Inheritance</label>
        <label><input type="radio" name="q1" value="Polymorphism"> Polymorphism</label>
        <label><input type="radio" name="q1" value="Composition"> Composition</label>
    </div>

    <div class="breakout-quiz-q">
        <p class="prompt">2) Which brick type overrides the <code>update()</code> method?</p>
        <label><input type="radio" name="q2" value="StrongBrick"> StrongBrick</label>
        <label><input type="radio" name="q2" value="MovingBrick"> MovingBrick</label>
        <label><input type="radio" name="q2" value="Basic Brick"> Basic Brick</label>
    </div>

    <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
    <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
    <div class="breakout-quiz-feedback"></div>
</div>

<div class="breakout-quiz" data-answers='{"q1":"Arrays,Sets,Objects","q2":"instanceof"}'>
    <div class="breakout-quiz-title">Lesson 3 Checkpoint</div>

    <div class="breakout-quiz-q">
        <p class="prompt">1) Which data structures does the Game class use for state management?</p>
        <label><input type="checkbox" name="q1" value="Arrays"> Arrays</label>
        <label><input type="checkbox" name="q1" value="Sets"> Sets</label>
        <label><input type="checkbox" name="q1" value="Objects"> Objects</label>
        <label><input type="checkbox" name="q1" value="Maps"> Maps</label>
    </div>

    <div class="breakout-quiz-q">
        <p class="prompt">2) What keyword is used to identify specific brick types in mixed arrays?</p>
        <label><input type="radio" name="q2" value="typeof"> typeof</label>
        <label><input type="radio" name="q2" value="instanceof"> instanceof</label>
        <label><input type="radio" name="q2" value="extends"> extends</label>
    </div>

    <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
    <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
    <div class="breakout-quiz-feedback"></div>
</div>

<div class="breakout-quiz" data-answers='{"q1":"Factory pattern","q2":"4 classes"}'>
    <div class="breakout-quiz-title">Lesson 4 Checkpoint</div>

    <div class="breakout-quiz-q">
        <p class="prompt">1) What pattern is used for creating different brick types?</p>
        <label><input type="radio" name="q1" value="Singleton pattern"> Singleton pattern</label>
        <label><input type="radio" name="q1" value="Factory pattern"> Factory pattern</label>
        <label><input type="radio" name="q1" value="Observer pattern"> Observer pattern</label>
    </div>

    <div class="breakout-quiz-q">
        <p class="prompt">2) How many classes are involved in the power-up creation chain?</p>
        <label><input type="radio" name="q2" value="2 classes"> 2 classes</label>
        <label><input type="radio" name="q2" value="3 classes"> 3 classes</label>
        <label><input type="radio" name="q2" value="4 classes"> 4 classes</label>
    </div>

    <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
    <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
    <div class="breakout-quiz-feedback"></div>
</div>

<script>
function checkQuiz(btn) {
    const quiz = btn.closest('.breakout-quiz');
    const answers = JSON.parse(quiz.dataset.answers);
    let ok = true;
    for (const q in answers) {
        const expected = answers[q].split(',');
        const checked = Array.from(quiz.querySelectorAll(`input[name='${q}']:checked`)).map(i=>i.value);
        if (expected.length > 1) {
            if (checked.length !== expected.length || !expected.every(val => checked.includes(val))) ok = false;
        } else {
            if (!checked.length || checked[0] !== answers[q]) ok = false;
        }
    }
    const fb = quiz.querySelector('.breakout-quiz-feedback');
    fb.textContent = ok ? '✅ Correct!' : '❌ Try again.';
    fb.className = 'breakout-quiz-feedback ' + (ok ? 'ok' : 'bad');
}
function resetQuiz(btn) {
    const quiz = btn.closest('.breakout-quiz');
    quiz.querySelectorAll('input').forEach(i=>i.checked=false);
    const fb = quiz.querySelector('.breakout-quiz-feedback');
    fb.textContent = '';
    fb.className = 'breakout-quiz-feedback';
}
</script>

## Advanced Challenges

Now that you understand the advanced concepts, try these challenges:

1. **Create an ExplosiveBrick** that destroys adjacent bricks when hit
2. **Add a BrickFactory class** that manages all brick creation logic
3. **Implement a PowerUpManager** to handle complex power-up interactions
4. **Design a particle system** for visual effects using inheritance
5. **Create a save/load system** that preserves the game state

These challenges will test your understanding of advanced OOP concepts and push you to think about scalable, maintainable code architecture.