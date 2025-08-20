---
layout: base 
title: Breakout Blocks Lesson
author: Nikhil, Rohan, Pranav, Aditya, Shriya, Samhita
permalink: breakoutLesson
---

## **Lesson 1: Paddle and Base Blocks**

**Goal:** Learn how to move the paddle (player) left and right and create basic bricks.

### Step 1: Make the paddle

We draw a rectangle at the bottom of the canvas.  

```js
let paddleHeight = 10;
let basePaddleWidth = 75;
let paddleWidth = basePaddleWidth;
let paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
```

### Step 2: Move the paddle

We listen for keyboard input and update the paddleX position.

```js
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function updatePaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  else if (leftPressed && paddleX > 0) paddleX -= 7;
}
```

**Explore:**

* Make your own block that moves left/right with the arrow keys.
* Change its width/height and test how it feels.

---

## **Lesson 2: Power-Up Block + Timer**

**Goal:** Add a special block that gives a temporary boost when hit.

### Step 1: Add special bricks that drop a power-up when broken.

* We randomly give some bricks a powerUp property:

```js
let bricks = [];
const powerUpChance = 0.3; // 30% chance
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    const hasPowerUp = Math.random() < powerUpChance;
    bricks[c][r] = { x: 0, y: 0, status: 1, powerUp: hasPowerUp };
  }
}
```

When a power-up brick is hit, it spawns a falling power-up:
```js
if (b.powerUp) {
  powerUps.push({ x: b.x + brickWidth/2, y: b.y, active: true });
}
```

### Step 2: Draw and drop the power-up

* Each power-up is drawn as a glowing circle with “P” inside, and it falls down.

```js
let powerUps = [];
let activePowerUp = null;
let powerUpTimer = 0;
const powerUpDuration = 5000; // 5 seconds

function drawPowerUps() {
  for (let p of powerUps) {
    if (p.active) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "gold";
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("P", p.x, p.y);

      // Make it fall
      p.y += 1.5;

      // If paddle catches it
      if (p.y >= canvas.height - paddleHeight &&
          p.x > paddleX && p.x < paddleX + paddleWidth) {
        p.active = false;
        paddleWidth = basePaddleWidth + 40; // widen paddle
        activePowerUp = "Wide Paddle";
        powerUpTimer = Date.now(); // start timer
      }
    }
  }
}
```

### Step 3: Show timer

* Draw the time left on screen.

```js
function drawPowerUpTimer() {
  if (activePowerUp) {
    let elapsed = Date.now() - powerUpTimer;
    let remaining = Math.max(0, powerUpDuration - elapsed);

    // Draw bar
    ctx.fillStyle = "gray";
    ctx.fillRect(canvas.width - 20, 20, 10, 100);

    ctx.fillStyle = "lime";
    let fillHeight = (remaining / powerUpDuration) * 100;
    ctx.fillRect(canvas.width - 20, 120 - fillHeight, 10, fillHeight);

    if (remaining <= 0) {
      activePowerUp = null;
      paddleWidth = basePaddleWidth; // reset
    }
  }
}

```

**Explore:**
* Make the timer 10 seconds instead of 5..
* Try different effects (ex: double player speed).

<h2>Interactive Demos Progression</h2>
<h4>Until base functionality - does not include advanced features</h4>

<!-- Canvas 1: Paddle Movement -->
<h3>1. Paddle Movement</h3>
<canvas id="paddleDemo" width="300" height="150" style="background:white; border:2px solid #333; display:block; margin:0 auto;"></canvas>

<script>
const pdCanvas = document.getElementById("paddleDemo");
const pdCtx = pdCanvas.getContext("2d");
let pdX = (pdCanvas.width - 75) / 2;
let pdRight = false, pdLeft = false;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") pdRight = true;
  if (e.key === "ArrowLeft") pdLeft = true;
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowRight") pdRight = false;
  if (e.key === "ArrowLeft") pdLeft = false;
});

function drawPaddleDemo() {
  pdCtx.clearRect(0,0,pdCanvas.width,pdCanvas.height);
  pdCtx.fillStyle = "#0095DD";
  pdCtx.fillRect(pdX, pdCanvas.height-10, 75, 10);
  if (pdRight && pdX < pdCanvas.width-75) pdX += 5;
  if (pdLeft && pdX > 0) pdX -= 5;
  requestAnimationFrame(drawPaddleDemo);
}
drawPaddleDemo();
</script>

---

<!-- Canvas 2: Ball Bouncing -->
<h3>2. Ball Bouncing</h3>
<canvas id="ballDemo" width="300" height="150" style="background:white; border:2px solid #333; display:block; margin:0 auto;"></canvas>

<script>
const bCanvas = document.getElementById("ballDemo");
const bCtx = bCanvas.getContext("2d");
let bx = bCanvas.width/2, by = bCanvas.height/2, bvx = 2, bvy = 2, br = 8;

function drawBallDemo() {
  bCtx.clearRect(0,0,bCanvas.width,bCanvas.height);
  bCtx.beginPath();
  bCtx.arc(bx, by, br, 0, Math.PI*2);
  bCtx.fillStyle = "#DD0000";
  bCtx.fill();
  bCtx.closePath();
  bx += bvx; by += bvy;
  if (bx+br > bCanvas.width || bx-br < 0) bvx = -bvx;
  if (by+br > bCanvas.height || by-br < 0) bvy = -bvy;
  requestAnimationFrame(drawBallDemo);
}
drawBallDemo();
</script>

---

<!-- Canvas 3: Paddle + Ball -->
<h3>3. Paddle + Ball</h3>
<canvas id="comboDemo" width="300" height="150" style="background:white; border:2px solid #333; display:block; margin:0 auto;"></canvas>

<script>
const cCanvas = document.getElementById("comboDemo");
const cCtx = cCanvas.getContext("2d");
let cx = cCanvas.width/2, cy = cCanvas.height-30, cvx = 2, cvy = -2, cr = 8;
let cpX = (cCanvas.width - 75)/2, cRight = false, cLeft = false;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") cRight = true;
  if (e.key === "ArrowLeft") cLeft = true;
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowRight") cRight = false;
  if (e.key === "ArrowLeft") cLeft = false;
});

function drawCombo() {
  cCtx.clearRect(0,0,cCanvas.width,cCanvas.height);
  // Ball
  cCtx.beginPath();
  cCtx.arc(cx, cy, cr, 0, Math.PI*2);
  cCtx.fillStyle = "#DD0000";
  cCtx.fill();
  cCtx.closePath();
  // Paddle
  cCtx.fillStyle = "#0095DD";
  cCtx.fillRect(cpX, cCanvas.height-10, 75, 10);
  // Update ball
  cx += cvx; cy += cvy;
  if (cx+cr > cCanvas.width || cx-cr < 0) cvx = -cvx;
  if (cy-cr < 0) cvy = -cvy;
  else if (cy+cr > cCanvas.height-10 && cx > cpX && cx < cpX+75) cvy = -cvy;
  else if (cy+cr > cCanvas.height) { cx = cCanvas.width/2; cy = cCanvas.height/2; }
  // Update paddle
  if (cRight && cpX < cCanvas.width-75) cpX += 5;
  if (cLeft && cpX > 0) cpX -= 5;
  requestAnimationFrame(drawCombo);
}
drawCombo();
</script>

---

<!-- Canvas 4: Full Mini Breakout -->
<h3>4. Mini Breakout (Ball + Paddle + Bricks)</h3>
<canvas id="breakoutDemo" width="300" height="200" style="background:white; border:2px solid #333; display:block; margin:0 auto;"></canvas>

<script>
const brCanvas = document.getElementById("breakoutDemo");
const brCtx = brCanvas.getContext("2d");
// Ball
let brX = brCanvas.width/2, brY = brCanvas.height-30, brVX = 2, brVY = -2, brR = 8;
// Paddle
let brPW = 75, brPH = 10, brPX = (brCanvas.width-brPW)/2, brRight = false, brLeft = false;
// Bricks
const rowCount=3, colCount=5, bw=50, bh=15, bp=10, bo=30, bt=30;
let bricks = [];
for(let c=0;c<colCount;c++){ bricks[c]=[]; for(let r=0;r<rowCount;r++){ bricks[c][r]={x:0,y:0,status:1}; } }

document.addEventListener("keydown",e=>{ if(e.key==="ArrowRight")brRight=true; if(e.key==="ArrowLeft")brLeft=true; });
document.addEventListener("keyup",e=>{ if(e.key==="ArrowRight")brRight=false; if(e.key==="ArrowLeft")brLeft=false; });

function drawBricks() {
  for(let c=0;c<colCount;c++){ for(let r=0;r<rowCount;r++){
    if(bricks[c][r].status==1){
      let bx=(c*(bw+bp))+bo, by=(r*(bh+bp))+bt;
      bricks[c][r].x=bx; bricks[c][r].y=by;
      brCtx.fillStyle="#00AA00";
      brCtx.fillRect(bx,by,bw,bh);
    }
  }}
}

function drawBreakout() {
  brCtx.clearRect(0,0,brCanvas.width,brCanvas.height);
  // Ball
  brCtx.beginPath(); brCtx.arc(brX,brY,brR,0,Math.PI*2); brCtx.fillStyle="#DD0000"; brCtx.fill(); brCtx.closePath();
  // Paddle
  brCtx.fillStyle="#0095DD"; brCtx.fillRect(brPX, brCanvas.height-brPH, brPW, brPH);
  // Bricks
  drawBricks();
  // Collision
  for(let c=0;c<colCount;c++){ for(let r=0;r<rowCount;r++){
    let b=bricks[c][r];
    if(b.status==1 && brX> b.x && brX< b.x+bw && brY> b.y && brY< b.y+bh){
      brVY=-brVY; b.status=0;
    }
  }}
  // Ball move
  brX+=brVX; brY+=brVY;
  if(brX+brR>brCanvas.width||brX-brR<0) brVX=-brVX;
  if(brY-brR<0) brVY=-brVY;
  else if(brY+brR>brCanvas.height-brPH && brX>brPX && brX<brPX+brPW) brVY=-brVY;
  else if(brY+brR>brCanvas.height){ brX=brCanvas.width/2; brY=brCanvas.height-30; brVY=-2; }
  // Paddle move
  if(brRight && brPX<brCanvas.width-brPW) brPX+=5;
  if(brLeft && brPX>0) brPX-=5;
  requestAnimationFrame(drawBreakout);
}
drawBreakout();
</script>

<br>

### [👉 Click this for full source code](https://github.com/code259/curators/blob/main/navigation/breakout/full_breakout.md?plain=1)
