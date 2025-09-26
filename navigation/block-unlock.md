---
layout: post
title: Block Unlock Game
description: Puzzle Game that teaches JS basics
permalink: /blockunlock/game
---

<div id="controls">
    <button id="rotate-cw">Rotate CW</button>
    <button id="rotate-ccw">Rotate CCW</button>
    <button id="start-pushers">Start Pushers (O)</button>
    <button id="stop-pushers">Stop Pushers (Esc)</button>
</div>

<div id="grid-container"></div>

<script type="module" src="/assets/js/block-unlock/tile.js"></script>
<script type="module" src="/assets/js/block-unlock/grid-system.js"></script>

<script type="module">
import { Grid } from "/assets/js/block-unlock/grid-system.js";
import { Tile } from "/assets/js/block-unlock/tile.js";

const container = document.getElementById("grid-container");
const BASE_CELL_SIZE = 60;

// Create grid
const g = new Grid(15, 15, 0);
g.startGame = true; // allow pushers to move
g.SetToGrid();

// Add tiles
g.addTile(new Tile([1,1],1));
g.addTile(new Tile([2,1],2,'east'));
g.addTile(new Tile([3,1],9));
g.addTile(new Tile([1,2],3));

// Helper: direction -> degrees
function directionToAngle(dir){
    switch(dir){
        case 'east': return 90;
        case 'south': return 180;
        case 'west': return 270;
        default: return 0;
    }
}

// Render grid
container.style.setProperty("--grid-cols", g.Xsize);
container.style.setProperty("--grid-rows", g.Ysize);
container.style.setProperty("--cell-size", `${BASE_CELL_SIZE}px`);
container.style.gridTemplateColumns = `repeat(${g.Xsize}, 1fr)`;
container.style.gridTemplateRows = `repeat(${g.Ysize}, 1fr)`;

const cells = [];
for(let y=0; y<g.Ysize; y++){
    for(let x=0; x<g.Xsize; x++){
        const cell = document.createElement("div");
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.classList.add("grid-cell");

        const bg = document.createElement("div");
        bg.classList.add("cell-bg");
        cell.appendChild(bg);

        const spriteDiv = document.createElement("div");
        spriteDiv.classList.add("cell-tile");

        const key = `${x},${y}`;
        const tile = g.tileMap[key];

        if(tile && tile.sprite){
            spriteDiv.style.backgroundImage = `url('${tile.sprite}')`;
            spriteDiv.style.setProperty('--rotation', `${directionToAngle(tile.direction)}deg`);
        } else {
            spriteDiv.style.backgroundImage = `url('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')`;
            spriteDiv.style.setProperty('--rotation', `0deg`);
        }

        cell.appendChild(spriteDiv);
        container.appendChild(cell);
        cells.push({cell, spriteDiv, bg});
    }
}

// Update function
g.subscribe((x,y,value)=>{
    const index = y*g.Xsize + x;
    const {spriteDiv} = cells[index];
    const key = `${x},${y}`;
    const tile = g.tileMap[key];

    if(tile && tile.sprite){
        spriteDiv.style.backgroundImage = `url('${tile.sprite}')`;
        spriteDiv.style.setProperty('--rotation', `${directionToAngle(tile.direction)}deg`);
    } else {
        spriteDiv.style.backgroundImage = `url('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')`;
        spriteDiv.style.setProperty('--rotation', `0deg`);
    }
    updateSelectionVisual();
});

// Selection visual
function updateSelectionVisual(){
    cells.forEach(c=>c.bg.classList.remove('selected'));
    if(g.selectedTile){
        const [sx,sy] = g.selectedTile.CordLocation;
        const index = sy*g.Xsize + sx;
        if(cells[index]){
            cells[index].bg.classList.add('selected');
        }
    }
}

// Click to select
container.addEventListener("click", e=>{
    const cell = e.target.closest('.grid-cell');
    if(!cell) return;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    g.selectTile([x,y]);
    updateSelectionVisual();
});

// Key handling
window.addEventListener("keydown", e=>{
    if(e.key==='o'||e.key==='O'){ g.startPushers(); e.preventDefault(); return; }
    if(e.key==='Escape'){ g.stopAllPushers(); e.preventDefault(); return; }

    if(!g.selectedTile) return;
    const map={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};
    if(map[e.key]){ g.moveSelected(map[e.key]); e.preventDefault(); updateSelectionVisual(); return; }

    if(e.key==='r'||e.key==='R'){ g.rotateSelected(true); e.preventDefault(); updateSelectionVisual(); return; }
    if(e.key==='q'||e.key==='Q'){ g.rotateSelected(false); e.preventDefault(); updateSelectionVisual(); return; }
});

// Button handlers
document.getElementById("rotate-cw").addEventListener("click", ()=>{ g.rotateSelected(true); updateSelectionVisual(); });
document.getElementById("rotate-ccw").addEventListener("click", ()=>{ g.rotateSelected(false); updateSelectionVisual(); });
document.getElementById("start-pushers").addEventListener("click", ()=>{ g.startPushers(); });
document.getElementById("stop-pushers").addEventListener("click", ()=>{ g.stopAllPushers(); });

</script>

<style>
#controls{ text-align:center; margin-bottom:10px; }
#controls button{ margin:0 5px; padding:6px 10px; cursor:pointer; }

#grid-container{
    display:grid;
    gap:2px;
    width:90vw;
    max-width:900px;
    margin:0 auto;
    background:#222;
    border:2px solid #555;
}

.grid-cell{
    position:relative;
    width: var(--cell-size);
    height: var(--cell-size);
}

.cell-bg{
    position:absolute;
    top:0; left:0; right:0; bottom:0;
    background:#333;
    border:1px solid #888;
    transition:box-shadow 0.12s, border 0.12s;
}

.cell-bg.selected{
    border:3px solid #ff0;
    box-shadow:0 0 10px rgba(255,255,0,0.5);
}

.cell-tile{
    position:absolute;
    top:0; left:0; right:0; bottom:0;
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    transition:transform 0.18s;
    transform: rotate(var(--rotation,0deg));
}

.grid-cell:hover .cell-tile{
    transform: scale(1.05) rotate(var(--rotation,0deg));
    cursor:pointer;
}
</style>
