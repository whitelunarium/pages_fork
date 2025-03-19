import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';

class GameLevelMinesweeper {
    constructor(gameEnv) {
        // Store gameEnv for later use
        this.gameEnv = gameEnv;
        // Initialize gameObjectClasses array
        this.gameObjectClasses = [];
    }

    create(gameEnv) {
        // Values dependent on gameEnv.create()
        this.width = gameEnv.innerWidth;
        this.height = gameEnv.innerHeight;
        this.path = gameEnv.path;

        // Initialize game objects array
        this.gameObjects = [];

        // Game settings
        this.gridSize = 10; // 10x10 grid
        this.cellSize = 40; // Size of each cell in pixels
        this.mineCount = 10; // Number of mines
        
        // Initialize 2D arrays
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0));
        this.revealed = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false));
        this.flagged = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false));
        this.mines = [];
        this.gameOver = false;
        this.won = false;
        this.score = 0;
        this.firstClick = true;

        // Calculate grid position to center it
        this.gridX = (this.width - (this.gridSize * this.cellSize)) / 2;
        this.gridY = (this.height - (this.gridSize * this.cellSize)) / 2;

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.canvas.style.zIndex = '10'; // Increased z-index to ensure it's above other elements
        document.getElementById('gameCanvas').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        // Initialize game
        this.initializeGrid();
        this.addEventListeners();

        // Start the game loop
        this.isRunning = true;
    }

    gameLoop() {
        if (!this.isRunning) return;

        // Update game state
        this.update();
        
        // Draw the game
        this.draw();

        // Request next frame
        requestAnimationFrame(() => this.gameLoop());
    }

    initializeGrid() {
        // Reset arrays
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0));
        this.revealed = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false));
        this.flagged = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false));
        this.mines = [];

        // Place mines randomly
        let minesPlaced = 0;
        while (minesPlaced < this.mineCount) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            if (this.grid[x][y] !== -1) { // -1 represents a mine
                this.grid[x][y] = -1;
                this.mines.push({x, y});
                minesPlaced++;
            }
        }

        // Calculate numbers for adjacent cells
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] !== -1) {
                    this.grid[i][j] = this.countAdjacentMines(i, j);
                }
            }
        }
    }

    countAdjacentMines(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;
                if (newX >= 0 && newX < this.gridSize && 
                    newY >= 0 && newY < this.gridSize && 
                    this.grid[newX][newY] === -1) {
                    count++;
                }
            }
        }
        return count;
    }

    addEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            if (this.gameOver) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - this.gridX;
            const y = e.clientY - rect.top - this.gridY;
            
            const gridX = Math.floor(x / this.cellSize);
            const gridY = Math.floor(y / this.cellSize);
            
            if (gridX >= 0 && gridX < this.gridSize && 
                gridY >= 0 && gridY < this.gridSize) {
                this.revealCell(gridX, gridY);
            }
        });

        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (this.gameOver) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - this.gridX;
            const y = e.clientY - rect.top - this.gridY;
            
            const gridX = Math.floor(x / this.cellSize);
            const gridY = Math.floor(y / this.cellSize);
            
            if (gridX >= 0 && gridX < this.gridSize && 
                gridY >= 0 && gridY < this.gridSize) {
                this.toggleFlag(gridX, gridY);
            }
        });
    }

    revealCell(x, y) {
        if (this.revealed[x][y] || this.flagged[x][y]) return;

        this.revealed[x][y] = true;

        if (this.firstClick) {
            this.firstClick = false;
            // Ensure first click is not a mine
            if (this.grid[x][y] === -1) {
                this.grid[x][y] = 0;
                this.mines = this.mines.filter(mine => !(mine.x === x && mine.y === y));
                // Place new mine in empty spot
                let newMinePlaced = false;
                while (!newMinePlaced) {
                    const newX = Math.floor(Math.random() * this.gridSize);
                    const newY = Math.floor(Math.random() * this.gridSize);
                    if (this.grid[newX][newY] !== -1) {
                        this.grid[newX][newY] = -1;
                        this.mines.push({x: newX, y: newY});
                        newMinePlaced = true;
                    }
                }
                // Recalculate numbers
                for (let i = 0; i < this.gridSize; i++) {
                    for (let j = 0; j < this.gridSize; j++) {
                        if (this.grid[i][j] !== -1) {
                            this.grid[i][j] = this.countAdjacentMines(i, j);
                        }
                    }
                }
            }
        }

        if (this.grid[x][y] === -1) {
            this.gameOver = true;
            this.revealAll();
            return;
        }

        if (this.grid[x][y] === 0) {
            // Reveal adjacent cells
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newX = x + i;
                    const newY = y + j;
                    if (newX >= 0 && newX < this.gridSize && 
                        newY >= 0 && newY < this.gridSize) {
                        this.revealCell(newX, newY);
                    }
                }
            }
        }

        this.checkWin();
    }

    toggleFlag(x, y) {
        if (this.revealed[x][y]) return;
        this.flagged[x][y] = !this.flagged[x][y];
        this.checkWin();
    }

    revealAll() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.revealed[i][j] = true;
                this.flagged[i][j] = false;
            }
        }
    }

    checkWin() {
        let correctFlags = 0;
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === -1 && this.flagged[i][j]) {
                    correctFlags++;
                }
            }
        }
        if (correctFlags === this.mineCount) {
            this.won = true;
            this.gameOver = true;
            this.score = 100;
        }
    }

    draw() {
        // Clear the entire canvas and draw background
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#87CEEB'; // Sky blue background
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Add title
        this.ctx.fillStyle = 'black';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Minesweeper', this.width/2, 30);

        // Add instructions
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Left-click to reveal, Right-click to flag mines', this.width/2, 60);
        
        // Draw grid background
        this.ctx.fillStyle = 'rgba(200, 200, 200, 0.9)';
        this.ctx.fillRect(
            this.gridX - 5, 
            this.gridY - 5, 
            this.gridSize * this.cellSize + 10, 
            this.gridSize * this.cellSize + 10
        );
        
        // Draw grid
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const x = this.gridX + i * this.cellSize;
                const y = this.gridY + j * this.cellSize;

                // Draw cell background with 3D effect
                this.ctx.fillStyle = this.revealed[i][j] ? '#e0e0e0' : '#c0c0c0';
                this.ctx.fillRect(x, y, this.cellSize, this.cellSize);

                if (!this.revealed[i][j]) {
                    // Draw 3D effect for unrevealed cells
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + this.cellSize);
                    this.ctx.lineTo(x, y);
                    this.ctx.lineTo(x + this.cellSize, y);
                    this.ctx.strokeStyle = '#ffffff';
                    this.ctx.stroke();

                    this.ctx.fillStyle = '#808080';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + this.cellSize, y);
                    this.ctx.lineTo(x + this.cellSize, y + this.cellSize);
                    this.ctx.lineTo(x, y + this.cellSize);
                    this.ctx.strokeStyle = '#808080';
                    this.ctx.stroke();
                }

                if (this.revealed[i][j]) {
                    if (this.grid[i][j] === -1) {
                        // Draw mine
                        this.ctx.fillStyle = 'black';
                        this.ctx.beginPath();
                        this.ctx.arc(x + this.cellSize/2, y + this.cellSize/2, this.cellSize/3, 0, Math.PI * 2);
                        this.ctx.fill();
                    } else if (this.grid[i][j] > 0) {
                        // Draw number
                        this.ctx.fillStyle = this.getNumberColor(this.grid[i][j]);
                        this.ctx.font = 'bold 20px Arial';
                        this.ctx.textAlign = 'center';
                        this.ctx.textBaseline = 'middle';
                        this.ctx.fillText(this.grid[i][j], x + this.cellSize/2, y + this.cellSize/2);
                    }
                } else if (this.flagged[i][j]) {
                    // Draw flag
                    this.ctx.fillStyle = 'red';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + this.cellSize/4, y + this.cellSize/4);
                    this.ctx.lineTo(x + this.cellSize*3/4, y + this.cellSize/2);
                    this.ctx.lineTo(x + this.cellSize/4, y + this.cellSize*3/4);
                    this.ctx.closePath();
                    this.ctx.fill();
                }
            }
        }

        // Draw game over message
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                this.won ? 'You Won!' : 'Game Over!',
                this.width/2,
                this.height/2
            );
            if (this.won) {
                this.ctx.font = '20px Arial';
                this.ctx.fillText(
                    `Score: ${this.score}`,
                    this.width/2,
                    this.height/2 + 40
                );
            }
            
            // Add replay button
            this.ctx.fillStyle = '#4CAF50';
            const buttonWidth = 200;
            const buttonHeight = 50;
            const buttonX = this.width/2 - buttonWidth/2;
            const buttonY = this.height/2 + 80;
            this.ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Play Again', this.width/2, buttonY + buttonHeight/2);
        }

        // Draw remaining mines count
        let remainingFlags = this.mineCount - this.flagged.flat().filter(Boolean).length;
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Mines remaining: ${remainingFlags}`, 10, 30);
    }

    getNumberColor(number) {
        const colors = [
            '#0000FF', // 1: Blue
            '#008000', // 2: Green
            '#FF0000', // 3: Red
            '#000080', // 4: Dark Blue
            '#800000', // 5: Dark Red
            '#008080', // 6: Teal
            '#000000', // 7: Black
            '#808080'  // 8: Gray
        ];
        return colors[number - 1] || 'black';
    }

    update() {
        if (this.isRunning) {
            this.draw();
        }
    }

    cleanup() {
        this.isRunning = false;
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

export default GameLevelMinesweeper; 