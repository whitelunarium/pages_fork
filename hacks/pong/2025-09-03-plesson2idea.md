📝 Pong Game Lesson
🔑 Skills You Will Learn

HTML & CSS: set up a <canvas> and basic UI (restart button).

Canvas API: draw rectangles, circles, and text; repaint every frame.

Game Loop & Animation: requestAnimationFrame timing.

Input Handling: keyboard events and continuous movement.

Game Physics & Logic: collisions, scoring, win state, and reset.

Code Organization: helper functions, state variables, and step-by-step assembly.

🧩 What Is Object-Oriented Programming (OOP) — and How It Fits Here

OOP organizes code into objects that bundle data (properties) and behaviors (methods).

In your current (procedural) version, state is stored in variables like ballX, ballY, player1Y, player2Y, and behavior lives in functions like update(), draw(), handleInput().

The OOP refactor would group those into classes:

Ball → { x, y, vx, vy, radius } with draw(ctx) and update().

Paddle → { x, y, w, h, speed } with draw(ctx) and move(dir).

Game → scores, winningScore, gameOver, and methods draw(), update(), handleInput(), restart().

You’ve already separated concerns with helpers (drawRect, drawCircle, drawText, initBall, etc.). Turning them into classes later is a natural next step; the logic stays the same, just wrapped into objects.

🛠 Build It Step-by-Step (Using Your Code)

Follow these steps in order. Each step points to the exact functions/lines you already have, so students see how the full game grows piece-by-piece.

1) Canvas & Context

Goal: get pixels on screen.

In your code:

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');


The <canvas> is defined in your HTML; this line gets its 2D drawing context.

Style is handled in your <style> (border, black background).

Checkpoint: Fill the background each frame (you do this inside draw() with drawRect(0,0,canvas.width,canvas.height,"#000")).

2) Game State Variables

Goal: define everything the game needs to remember.

In your code:

const paddleWidth = 10, paddleHeight = 100;
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 7;

let ballX, ballY, ballSpeedX, ballSpeedY, ballRadius = 10;

let player1Score = 0, player2Score = 0;
const winningScore = 10;
let gameOver = false;

const restartBtn = document.getElementById('restartBtn');


This is the single source of truth for positions, speeds, and scores.

3) Initialize the Ball

Goal: center the ball and give it a starting direction.

In your code:

function initBall() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = Math.random() > 0.5 ? 5 : -5;
  ballSpeedY = (Math.random() * 4) - 2; // slight random angle
}


ballSpeedX randomizes left/right.

ballSpeedY gives a small vertical angle so starts aren’t identical.

4) Drawing Helpers

Goal: reuse simple drawing calls everywhere.

In your code:

function drawRect(x, y, w, h, color) { /* ... */ }
function drawCircle(x, y, r, color) { /* ... */ }
function drawText(text, x, y, color="white") { /* ... */ }


Students can tweak visuals here (font, colors) without touching game logic.

5) Render a Frame (draw())

Goal: paint the entire scene in one place.

In your code:

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "#000"); // background
  drawRect(0, player1Y, paddleWidth, paddleHeight, "#fff"); // left paddle
  drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, "#fff"); // right paddle
  drawCircle(ballX, ballY, ballRadius, "#fff"); // ball
  drawText(player1Score, canvas.width/4, 50);
  drawText(player2Score, 3*canvas.width/4, 50);

  if (gameOver) {
    drawText("Game Over", canvas.width/2 - 80, canvas.height/2 - 20, "red");
    drawText(
      player1Score >= winningScore ? "Player 1 Wins!" : "Player 2 Wins!",
      canvas.width/2 - 120, canvas.height/2 + 20, "yellow"
    );
  }
}


Layering matters: background → paddles/ball → UI text → overlays (game over).

6) Update Physics & Rules (update())

Goal: move things and handle collisions & scoring.

In your code (key ideas):

ballX += ballSpeedX;
ballY += ballSpeedY;

// Top/bottom bounce
if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
  ballSpeedY = -ballSpeedY;
}

// Left paddle collision
if (ballX - ballRadius < paddleWidth &&
    ballY > player1Y && ballY < player1Y + paddleHeight) {
  ballSpeedX = -ballSpeedX;
  const deltaY = ballY - (player1Y + paddleHeight/2);
  ballSpeedY = deltaY * 0.3; // angle based on hit position
}

// Right paddle collision
if (ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > player2Y && ballY < player2Y + paddleHeight) {
  ballSpeedX = -ballSpeedX;
  const deltaY = ballY - (player2Y + paddleHeight/2);
  ballSpeedY = deltaY * 0.3;
}

// Scoring
if (ballX - ballRadius < 0) {          // right player scores
  player2Score++;
  if (player2Score >= winningScore) { gameOver = true; restartBtn.style.display = "inline-block"; }
  initBall();
} else if (ballX + ballRadius > canvas.width) { // left player scores
  player1Score++;
  if (player1Score >= winningScore) { gameOver = true; restartBtn.style.display = "inline-block"; }
  initBall();
}


Physics trick: deltaY * 0.3 makes the bounce angle depend on where the ball hits the paddle — more interesting than a flat reversal.

Guard clause: if (gameOver) return; at the top prevents updates after the win.

7) Keyboard Input (continuous movement)

Goal: smooth paddle control.

In your code:

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function handleInput() {
  // Player 1: W/S
  if (keys["w"] && player1Y > 0) player1Y -= paddleSpeed;
  if (keys["s"] && player1Y + paddleHeight < canvas.height) player1Y += paddleSpeed;

  // Player 2: I/K
  if (keys["i"] && player2Y > 0) player2Y -= paddleSpeed;
  if (keys["k"] && player2Y + paddleHeight < canvas.height) player2Y += paddleSpeed;
}


The keys map lets you hold keys for continuous motion.

Boundary checks keep paddles inside the canvas.

8) The Game Loop

Goal: tie update → input → draw together every frame.

In your code:

function gameLoop() {
  update();
  handleInput();
  draw();
  requestAnimationFrame(gameLoop);
}


requestAnimationFrame syncs with the browser’s refresh rate for smooth animation and better performance than setInterval.

9) Restart Flow

Goal: reset everything for a new match.

In your code:

restartBtn.addEventListener("click", () => {
  player1Score = 0; player2Score = 0;
  player1Y = (canvas.height - paddleHeight) / 2;
  player2Y = (canvas.height - paddleHeight) / 2;
  gameOver = false;
  restartBtn.style.display = "none";
  initBall();
});


Hides the button, resets positions/scores/state, and re-centers the ball.

10) Boot the Game

Goal: one-time startup.

In your code:

initBall();
gameLoop();

🔄 Mapping Your Code to OOP (Optional Teaching Aid)
Current Code	OOP Class & Property	OOP Method
ballX, ballY, ballSpeedX, ballSpeedY, ballRadius	Ball { x, y, vx, vy, radius }	draw(ctx), update(paddles, bounds)
player1Y, player2Y, paddleWidth, paddleHeight, paddleSpeed	Paddle { x, y, w, h, speed }	draw(ctx), move(up/down)
player1Score, player2Score, winningScore, gameOver	Game { scores, winningScore, gameOver }	draw(), update(), handleInput(), restart()

Teaching tip: Have students identify which variables/methods would live in each class, then refactor one piece (e.g., Ball) first.