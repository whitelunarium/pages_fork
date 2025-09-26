---
layout: post
title: Block Unlock Game
description: Puzzle Game that teaches JS basics
permalink: /blockunlock/game
---

<script type="module" src="/assets/js/block-unlock/tile.js"></script>
<script type="module" src="/assets/js/block-unlock/grid-system.js"></script>

<script type="module">
import { Grid } from "/assets/js/block-unlock/grid-system.js";
import { Tile } from "/assets/js/block-unlock/tile.js";

// Create grid
const g = new Grid(5,5,0);
g.SetToGrid();

// Add animation system to grid
g.animateMovement = animateTileMovement;

// Add some tiles
g.addTile(new Tile([1,1],1));
g.addTile(new Tile([2,1],2)); // pusher
g.addTile(new Tile([3,1],9)); // immovable
g.addTile(new Tile([1,2],3));

// Render grid in HTML
const container = document.getElementById("grid-container");
const BASE_CELL_SIZE = 60;

container.style.setProperty("--grid-cols", g.Xsize);
container.style.setProperty("--grid-rows", g.Ysize);
container.style.setProperty("--cell-size", `${BASE_CELL_SIZE}px`);
container.style.gridTemplateColumns = `repeat(${g.Xsize}, 1fr)`;
container.style.gridTemplateRows = `repeat(${g.Ysize}, 1fr)`;

const cells = [];
for(let y=0;y<g.Ysize;y++){
    for(let x=0;x<g.Xsize;x++){
        const cell = document.createElement("div");
        cell.dataset.x = x;
        cell.dataset.y = y;
        
        // Set initial sprite if tile exists
        const key = `${x},${y}`;
        const tile = g.tileMap[key];
        if (tile && tile.sprite) {
            cell.style.backgroundImage = `url('${tile.sprite}')`;
            cell.style.backgroundSize = "cover";
            cell.style.backgroundPosition = "center";
            cell.style.backgroundRepeat = "no-repeat";
        }
        
        container.appendChild(cell);
        cells.push(cell);
    }
}

// Helper function to animate tile movement
function animateTileMovement(fromX, fromY, toX, toY, tile, callback) {
    const fromIndex = fromY * g.Xsize + fromX;
    const toIndex = toY * g.Xsize + toX;
    const fromCell = cells[fromIndex];
    const toCell = cells[toIndex];
    
    if (!fromCell || !toCell) {
        if (callback) callback();
        return;
    }
    
    // Calculate movement distance in pixels
    const cellSize = BASE_CELL_SIZE + 2; // including gap
    const deltaX = (toX - fromX) * cellSize;
    const deltaY = (toY - fromY) * cellSize;
    
    // Set up the moving cell
    fromCell.classList.add('tile-sliding');
    fromCell.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    fromCell.style.zIndex = '100';
    
    // Clear the destination cell temporarily
    toCell.style.backgroundImage = '';
    toCell.style.backgroundColor = '#333';
    
    // After animation completes, finalize the move
    setTimeout(() => {
        // Reset source cell
        fromCell.classList.remove('tile-sliding');
        fromCell.style.transform = 'translate(0, 0)';
        fromCell.style.zIndex = '';
        fromCell.style.backgroundImage = '';
        fromCell.style.backgroundColor = '#333';
        
        // Update destination cell
        if (tile && tile.sprite) {
            toCell.style.backgroundImage = `url('${tile.sprite}')`;
            toCell.style.backgroundSize = "cover";
            toCell.style.backgroundPosition = "center";
            toCell.style.backgroundRepeat = "no-repeat";
            toCell.style.backgroundColor = "";
        }
        
        if (callback) callback();
    }, 150);
}

// Update function - Now with smooth sliding animations
g.subscribe((x,y,value)=>{
    // This will be handled by the animation system now
    // We'll update the display after animations complete
    const index = y*g.Xsize+x;
    const cell = cells[index];
    const key = `${x},${y}`;
    const tile = g.tileMap[key];
    
    // Only update immediately if no animation is in progress
    if (!cell.classList.contains('tile-sliding')) {
        if (tile && tile.sprite) {
            cell.style.backgroundImage = `url('${tile.sprite}')`;
            cell.style.backgroundSize = "cover";
            cell.style.backgroundPosition = "center";
            cell.style.backgroundRepeat = "no-repeat";
            cell.style.backgroundColor = "";
        } else {
            cell.style.backgroundImage = "";
            cell.style.backgroundColor = "#333";
        }
    }
    
    // Update selection visual
    requestAnimationFrame(() => updateSelectionVisual());
});

// Helper function to update selection visual
function updateSelectionVisual() {
    document.querySelectorAll('#grid-container div').forEach(c => {
        c.classList.remove('selected', 'pusher-selected');
    });
    
    if (g.selectedTile) {
        const [sx, sy] = g.selectedTile.CordLocation;
        const selectedIndex = sy * g.Xsize + sx;
        if (cells[selectedIndex]) {
            if (g.selectedTile.isPusher()) {
                cells[selectedIndex].classList.add('pusher-selected');
            } else {
                cells[selectedIndex].classList.add('selected');
            }
        }
    }
}

// Click to select
container.addEventListener("click", e=>{
    const cell = e.target;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    
    if (!isNaN(x) && !isNaN(y)) {
        g.selectTile([x,y]);
        updateSelectionVisual();
    }
});

// Enhanced key handling
window.addEventListener("keydown", e=>{
    if (!g.selectedTile) return;
    
    // Regular arrow key movement (non-pusher blocks or when pusher is not in direction mode)
    const arrowKeyMap = {ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};
    
    // WASD keys for pusher direction setting
    const wasdKeyMap = {
        'w': 'up', 'W': 'up',
        'a': 'left', 'A': 'left',
        's': 'down', 'S': 'down',
        'd': 'right', 'D': 'right'
    };
    
    if (g.selectedTile.isPusher()) {
        // Pusher block is selected
        if (wasdKeyMap[e.key]) {
            e.preventDefault();
            g.selectedTile.setPusherDirection(wasdKeyMap[e.key]);
            
        } else if (e.key === ' ') {
            e.preventDefault();
            g.selectedTile.startPushing(g);
            
        } else if (arrowKeyMap[e.key] && !g.selectedTile.pusherDirection) {
            // Allow regular movement if no pusher direction is set
            e.preventDefault();
            g.moveSelected(arrowKeyMap[e.key]);
            updateSelectionVisual();
        }
    } else {
        // Regular movement for non-pusher blocks
        if (arrowKeyMap[e.key]) {
            e.preventDefault();
            g.moveSelected(arrowKeyMap[e.key]);
            updateSelectionVisual();
        }
    }
});

// Optional: Add escape key to stop pusher and clear direction
window.addEventListener("keydown", e=>{
    if (e.key === 'Escape' && g.selectedTile && g.selectedTile.isPusher()) {
        g.selectedTile.stopPushing();
        console.log("Pusher stopped and direction cleared.");
    }
});
</script>

<div id="grid-container"></div>

<style>
#grid-container{
    display:grid;
    gap:2px;
    width:90vw;
    max-width:600px;
    margin:20px auto;
    background:#222;
    border:2px solid #555;
}

#grid-container div{
    background:#333;
    border:1px solid #888;
    aspect-ratio:1/1;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    transform: translate(0, 0);
    transition: transform 0.15s ease-out;
}

#grid-container div:hover{
    transform: scale(1.05);
    cursor: pointer;
}

#grid-container div.selected {
    border: 3px solid #ff0;
    box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
    transition: border 0.1s ease, box-shadow 0.1s ease, transform 0.15s ease-out;
}

#grid-container div.pusher-selected {
    border: 3px solid #f00;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    transition: border 0.1s ease, box-shadow 0.1s ease, transform 0.15s ease-out;
}

/* Animation classes for smooth sliding movement */
.tile-sliding {
    z-index: 100;
    transition: transform 0.15s ease-out;
}

.tile-moving {
    z-index: 10;
}

.tile-pushed {
    z-index: 5;
}
</style>