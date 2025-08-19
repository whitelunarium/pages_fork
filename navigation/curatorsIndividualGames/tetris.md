---
layout: base 
title: Tetris
author: Rohan
permalink: tetris
---

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .game-container {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    color: #776e65;
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
  }

  .title {
    font-size: 80px;
    font-weight: bold;
    color: #776e65;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 18px;
    color: #776e65;
    opacity: 0.8;
  }

  .game-info {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }

  .score-box, .best-box {
    background: #bbada0;
    padding: 15px 25px;
    border-radius: 10px;
    text-align: center;
    color: white;
    min-width: 80px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .score-label, .best-label {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .score-value, .best-value {
    font-size: 24px;
    font-weight: bold;
  }

  .grid-container {
    background: #bbada0;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    position: relative;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 15px;
    width: 400px;
    height: 400px;
  }

  .cell {
    background: rgba(238, 228, 218, 0.35);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    transition: all 0.15s ease-in-out;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }

  .tile {
    position: absolute;
    width: 85px;
    height: 85px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: all 0.15s ease-in-out;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    animation: tileAppear 0.2s ease-in-out;
  }

  @keyframes tileAppear {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .tile.merged {
    animation: tileMerge 0.3s ease-in-out;
  }

  @keyframes tileMerge {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  /* Tile colors */
  .tile-2 { background: #eee4da; color: #776e65; font-size: 32px; }
  .tile-4 { background: #ede0c8; color: #776e65; font-size: 32px; }
  .tile-8 { background: #f2b179; color: #f9f6f2; font-size: 32px; }
  .tile-16 { background: #f59563; color: #f9f6f2; font-size: 32px; }
  .tile-32 { background: #f67c5f; color: #f9f6f2; font-size: 32px; }
  .tile-64 { background: #f65e3b; color: #f9f6f2; font-size: 32px; }
  .tile-128 { background: #edcf72; color: #f9f6f2; font-size: 28px; }
  .tile-256 { background: #edcc61; color: #f9f6f2; font-size: 28px; }
  .tile-512 { background: #edc850; color: #f9f6f2; font-size: 28px; }
  .tile-1024 { background: #edc53f; color: #f9f6f2; font-size: 24px; }
  .tile-2048 { background: #edc22e; color: #f9f6f2; font-size: 24px; box-shadow: 0 0 20px rgba(237, 194, 46, 0.5); }

  .controls {
    margin-top: 30px;
    text-align: center;
  }

  .restart-btn {
    background: #8f7a66;
    color: #f9f6f2;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    margin-bottom: 20px;
  }

  .restart-btn:hover {
    background: #9f8a76;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
  }

  .instructions {
    color: #776e65;
    font-size: 16px;
    text-align: center;
    line-height: 1.5;
    max-width: 400px;
  }

  .game-over, .game-won {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: none;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    z-index: 1000;
  }

  .game-over-content, .game-won-content {
    text-align: center;
    color: #776e65;
  }

  .game-over-title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ed4c5c;
  }

  .game-won-title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #f2b179;
  }

  .final-score {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .try-again-btn, .continue-btn {
    background: #8f7a66;
    color: #f9f6f2;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    margin: 0 10px;
  }

  .try-again-btn:hover, .continue-btn:hover {
    background: #9f8a76;
    transform: translateY(-2px);
  }
</style>

<div class="game-container">
  <div class="header">
    <div class="title">2048</div>
    <div class="subtitle">Join the tiles, get to 2048!</div>
  </div>
  
  <div class="game-info">
    <div class="score-box">
      <div class="score-label">Score</div>
      <div class="score-value" id="score">0</div>
    </div>
    <div class="best-box">
      <div class="best-label">Best</div>
      <div class="best-value" id="best">0</div>
    </div>
  </div>
  
  <div class="grid-container">
    <div class="grid" id="grid">
      <!-- Grid cells will be generated by JavaScript -->
    </div>
    <div class="game-over" id="gameOver">
      <div class="game-over-content">
        <div class="game-over-title">Game Over!</div>
        <div class="final-score">Final Score: <span id="finalScore">0</span></div>
        <button class="try-again-btn" onclick="restartGame()">Try Again</button>
      </div>
    </div>
    <div class="game-won" id="gameWon">
      <div class="game-won-content">
        <div class="game-won-title">You Win!</div>
        <div class="final-score">You reached 2048!</div>
        <button class="continue-btn" onclick="continueGame()">Keep Going</button>
        <button class="try-again-btn" onclick="restartGame()">New Game</button>
      </div>
    </div>
  </div>
  
  <div class="controls">
    <button class="restart-btn" onclick="restartGame()">New Game</button>
    <div class="instructions">
      Use your <strong>arrow keys</strong> to move the tiles.<br>
      When two tiles with the same number touch, they <strong>merge into one!</strong>
    </div>
  </div>
</div>

<script>
let gameState = {
  board: Array(4).fill().map(() => Array(4).fill(0)),
  score: 0,
  bestScore: 0, // Note: localStorage not available in Claude artifacts
  gameWon: false,
  gameOver: false
};

const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const bestElement = document.getElementById('best');
const gameOverElement = document.getElementById('gameOver');
const gameWonElement = document.getElementById('gameWon');
const finalScoreElement = document.getElementById('finalScore');

// Create grid cells
function createGrid() {
  gridElement.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    gridElement.appendChild(cell);
  }
}

// Add a new tile (2 or 4) to a random empty position
function addNewTile() {
  const emptyCells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (gameState.board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    gameState.board[randomCell.row][randomCell.col] = value;
  }
}

// Create tile element
function createTileElement(value, row, col) {
  const tile = document.createElement('div');
  tile.className = `tile tile-${value}`;
  tile.textContent = value;
  
  const x = col * 100 + 15; // 85px tile + 15px gap
  const y = row * 100 + 15;
  
  tile.style.left = `${x}px`;
  tile.style.top = `${y}px`;
  
  return tile;
}

// Update the visual display
function updateDisplay() {
  // Remove all existing tiles
  const existingTiles = gridElement.querySelectorAll('.tile');
  existingTiles.forEach(tile => tile.remove());
  
  // Add tiles for current board state
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (gameState.board[row][col] !== 0) {
        const tile = createTileElement(gameState.board[row][col], row, col);
        gridElement.appendChild(tile);
      }
    }
  }
  
  // Update score
  scoreElement.textContent = gameState.score;
  if (gameState.score > gameState.bestScore) {
    gameState.bestScore = gameState.score;
    bestElement.textContent = gameState.bestScore;
  }
}

// Move and merge logic
function moveLeft() {
  let moved = false;
  const newBoard = gameState.board.map(row => [...row]);
  
  for (let row = 0; row < 4; row++) {
    // Filter out zeros and merge
    let tiles = newBoard[row].filter(val => val !== 0);
    let merged = [];
    let i = 0;
    
    while (i < tiles.length) {
      if (i < tiles.length - 1 && tiles[i] === tiles[i + 1]) {
        // Merge tiles
        merged.push(tiles[i] * 2);
        gameState.score += tiles[i] * 2;
        
        // Check for 2048
        if (tiles[i] * 2 === 2048 && !gameState.gameWon) {
          gameState.gameWon = true;
          setTimeout(() => gameWonElement.style.display = 'flex', 200);
        }
        
        i += 2; // Skip next tile as it was merged
      } else {
        merged.push(tiles[i]);
        i++;
      }
    }
    
    // Pad with zeros
    while (merged.length < 4) {
      merged.push(0);
    }
    
    // Check if row changed
    if (JSON.stringify(newBoard[row]) !== JSON.stringify(merged)) {
      moved = true;
    }
    
    newBoard[row] = merged;
  }
  
  if (moved) {
    gameState.board = newBoard;
  }
  
  return moved;
}

function moveRight() {
  // Reverse, move left, reverse back
  gameState.board = gameState.board.map(row => row.reverse());
  const moved = moveLeft();
  gameState.board = gameState.board.map(row => row.reverse());
  return moved;
}

function moveUp() {
  // Transpose, move left, transpose back
  transposeBoard();
  const moved = moveLeft();
  transposeBoard();
  return moved;
}

function moveDown() {
  // Transpose, move right, transpose back
  transposeBoard();
  const moved = moveRight();
  transposeBoard();
  return moved;
}

function transposeBoard() {
  const newBoard = Array(4).fill().map(() => Array(4).fill(0));
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newBoard[col][row] = gameState.board[row][col];
    }
  }
  gameState.board = newBoard;
}

// Check if any moves are possible
function canMove() {
  // Check for empty cells
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (gameState.board[row][col] === 0) {
        return true;
      }
    }
  }
  
  // Check for possible merges
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const current = gameState.board[row][col];
      // Check right
      if (col < 3 && gameState.board[row][col + 1] === current) {
        return true;
      }
      // Check down
      if (row < 3 && gameState.board[row + 1][col] === current) {
        return true;
      }
    }
  }
  
  return false;
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  if (gameState.gameOver) return;
  
  let moved = false;
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      moved = moveLeft();
      break;
    case 'ArrowRight':
      e.preventDefault();
      moved = moveRight();
      break;
    case 'ArrowUp':
      e.preventDefault();
      moved = moveUp();
      break;
    case 'ArrowDown':
      e.preventDefault();
      moved = moveDown();
      break;
  }
  
  if (moved) {
    addNewTile();
    updateDisplay();
    
    // Check for game over
    if (!canMove()) {
      gameState.gameOver = true;
      finalScoreElement.textContent = gameState.score;
      setTimeout(() => gameOverElement.style.display = 'flex', 200);
    }
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

gridElement.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

gridElement.addEventListener('touchend', (e) => {
  if (gameState.gameOver) return;
  
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  const minSwipeDistance = 30;
  let moved = false;
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        moved = moveRight();
      } else {
        moved = moveLeft();
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        moved = moveDown();
      } else {
        moved = moveUp();
      }
    }
  }
  
  if (moved) {
    addNewTile();
    updateDisplay();
    
    if (!canMove()) {
      gameState.gameOver = true;
      finalScoreElement.textContent = gameState.score;
      setTimeout(() => gameOverElement.style.display = 'flex', 200);
    }
  }
});

function restartGame() {
  gameState = {
    board: Array(4).fill().map(() => Array(4).fill(0)),
    score: 0,
    bestScore: gameState.bestScore,
    gameWon: false,
    gameOver: false
  };
  
  gameOverElement.style.display = 'none';
  gameWonElement.style.display = 'none';
  
  addNewTile();
  addNewTile();
  updateDisplay();
}

function continueGame() {
  gameWonElement.style.display = 'none';
}

// Initialize game
createGrid();
bestElement.textContent = gameState.bestScore;
addNewTile();
addNewTile();
updateDisplay();
</script>