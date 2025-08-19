---
layout: base 
title: Breakout Blocks
author: Rohan and Pranav
permalink: fullbreakout
---
<canvas id="gameCanvas" width="480" height="320"></canvas>

<style>
  canvas {
    background: #eee;
    display: block;
    margin: 0 auto;
    border: 1px solid #333;
  }
</style>

<script>
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Paddle
  let paddleHeight = 10;
  let basePaddleWidth = 75;
  let paddleWidth = basePaddleWidth;
  let paddleX = (canvas.width - paddleWidth) / 2;

  let rightPressed = false;
  let leftPressed = false;

  // Ball
  let ballRadius = 8;
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 2;
  let dy = -2;

  // Blocks
  const brickRowCount = 3;
  const brickColumnCount = 5;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  let bricks = [];
  const powerUpChance = 0.3; // 30% chance a brick contains a powerup
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      const hasPowerUp = Math.random() < powerUpChance;
      bricks[c][r] = { x: 0, y: 0, status: 1, powerUp: hasPowerUp };
    }
  }

  // Powerups
  let powerUps = [];
  const powerUpSize = 20;
  const powerUpFallSpeed = 1.5;

  // Active powerup state
  let activePowerUp = null;
  let powerUpTimer = 0;
  const powerUpDuration = 5000; // 5 seconds

  // Input handling
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
  document.addEventListener("mousemove", mouseMoveHandler);

  function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
  }

  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
  }

  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  // Collision detection
  function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let b = bricks[c][r];
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;

            if (b.powerUp) {
              powerUps.push({ x: b.x + brickWidth / 2, y: b.y, active: true });
            }
          }
        }
      }
    }
  }

  // Powerup mechanics
  function drawPowerUps() {
    for (let i = 0; i < powerUps.length; i++) {
      let p = powerUps[i];
      if (p.active) {
        // Draw colorful circle with "P"
        let gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          5,
          p.x,
          p.y,
          powerUpSize
        );
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "red");

        ctx.beginPath();
        ctx.arc(p.x, p.y, powerUpSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "black";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("P", p.x, p.y);

        // Move down
        p.y += powerUpFallSpeed;

        // Paddle catches powerup
        if (
          p.y + powerUpSize / 2 >= canvas.height - paddleHeight &&
          p.x > paddleX &&
          p.x < paddleX + paddleWidth
        ) {
          p.active = false;
          paddleWidth = basePaddleWidth + 40; // effect: enlarge paddle
          activePowerUp = "Wide Paddle";
          powerUpTimer = Date.now(); // start timer
        }

        // Missed powerup
        if (p.y > canvas.height) {
          p.active = false;
        }
      }
    }
  }

  // Draw timer bar if powerup active
  function drawPowerUpTimer() {
    if (activePowerUp) {
      let elapsed = Date.now() - powerUpTimer;
      let remaining = Math.max(0, powerUpDuration - elapsed);
      let barHeight = 100;
      let barWidth = 10;
      let fillHeight = (remaining / powerUpDuration) * barHeight;

      ctx.fillStyle = "gray";
      ctx.fillRect(canvas.width - 20, 20, barWidth, barHeight);

      ctx.fillStyle = "lime";
      ctx.fillRect(
        canvas.width - 20,
        20 + (barHeight - fillHeight),
        barWidth,
        fillHeight
      );

      ctx.strokeStyle = "black";
      ctx.strokeRect(canvas.width - 20, 20, barWidth, barHeight);

      // If timer expired
      if (remaining <= 0) {
        activePowerUp = null;
        paddleWidth = basePaddleWidth;
      }
    }
  }

  // Drawing functions
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);

          if (bricks[c][r].powerUp) {
            // Make powerup bricks glow yellow
            ctx.fillStyle = "gold";
            ctx.shadowColor = "orange";
            ctx.shadowBlur = 10;
          } else {
            ctx.fillStyle = "#0095DD";
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawPowerUps();
    drawPowerUpTimer();
    collisionDetection();

    // Ball movement
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;
    else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        document.location.reload(); // Restart game
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }

  draw();
</script>

---

## **Lesson 1: Slider and Base Blocks**

**Goal:** Learn how to move a block (player) left and right using a slider.

### Step 1: Make the base block (player)

* Create a rectangle with `pygame.Rect()`.
* Example:

```python
player = pygame.Rect(300, 550, 100, 20)  # x, y, width, height
```

### Step 2: Add movement

* Use arrow keys to move it left and right.

```python
keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:
    player.x -= 5
if keys[pygame.K_RIGHT]:
    player.x += 5
```

**Assignment:**

* Make your own block that moves left/right with the arrow keys.
* Change its width/height and test how it feels.

---

## **Lesson 2: Power-Up Block + Timer**

**Goal:** Add a special block that gives a temporary boost when hit.

### Step 1: Make a power-up block

* Create a rectangle in a different color (like yellow).

```python
power_block = pygame.Rect(200, 200, 60, 20)
```

### Step 2: Detect collision

* When your player touches the block, start a timer.

```python
if player.colliderect(power_block):
    power_active = True
    power_timer = pygame.time.get_ticks()  # start timer
```

### Step 3: Show timer

* Draw the time left on screen.

```python
if power_active:
    time_left = 5 - (pygame.time.get_ticks() - power_timer)//1000
    font = pygame.font.SysFont(None, 36)
    text = font.render(f"Power: {time_left}", True, (255,255,255))
    screen.blit(text, (10,10))
```

**Assignment:**

* Change the block color when it’s a power-up.
* Make the timer 10 seconds instead of 5.
* Try different effects (ex: double player speed).

