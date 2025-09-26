import { Tile } from "/assets/js/block-unlock/tile.js";

export class Grid {
    static currentGridData = null;
    static tileLibrary = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // allowed states (excluding 0 for empty)

    constructor(Xsize, Ysize, defaultValue = 0) {
        this.Xsize = Xsize;
        this.Ysize = Ysize;
        this.grid = Array.from({ length: Ysize }, () => Array(Xsize).fill(defaultValue));
        this.tileMap = {}; // store Tile objects {"x,y": Tile}
        this.subscribers = [];
        this.selectedTile = null; // currently selected tile
    }

    SetToGrid() {
        Grid.currentGridData = this;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify(x, y) {
        for (const callback of this.subscribers) {
            callback(x, y, this.get(x, y));
        }
    }

    set(x, y, value) {
        if (x < 0 || x >= this.Xsize || y < 0 || y >= this.Ysize) return;
        this.grid[y][x] = value;
        this.notify(x, y);
    }

    get(x, y) {
        if (x < 0 || x >= this.Xsize || y < 0 || y >= this.Ysize) return null;
        return this.grid[y][x];
    }

    addTile(tile) {
        const [x, y] = tile.CordLocation;
        this.tileMap[`${x},${y}`] = tile;
        this.set(x, y, tile.State);
    }

    #inTileLibrary(cords) {
        const state = this.get(cords[0], cords[1]);
        return Grid.tileLibrary.includes(state);
    }

    renderSprite(cords) {
        if (!this.#inTileLibrary(cords)) return null;
        const key = `${cords[0]},${cords[1]}`;
        const tile = this.tileMap[key];
        return tile ? tile.sprite : null;
    }

    // Select a tile at coordinates [x, y]
    selectTile(coords) {
        const [x, y] = Array.isArray(coords) ? coords : [coords, arguments[1]];
        const key = `${x},${y}`;
        const tile = this.tileMap[key];
        
        if (tile && tile.State !== 0 && tile.State !== 9) { // Can't select empty or immovable
            this.selectedTile = tile;
            console.log(`Selected tile at (${x}, ${y}) with state ${tile.State}`);
        } else {
            this.selectedTile = null;
        }
    }

    // Move selected tile in a direction ("up", "down", "left", "right")
    moveSelected(direction) {
        if (!this.selectedTile) return;

        const dirMap = {
            "up": [0, -1],
            "down": [0, 1],
            "left": [-1, 0],
            "right": [1, 0]
        };

        const [dx, dy] = dirMap[direction];
        if (!dx && !dy) return;

        const [startX, startY] = this.selectedTile.CordLocation;
        
        // Collect all tiles that need to move in the line
        const tilesToMove = [];
        
        if (dx !== 0) { // Horizontal movement
            const step = dx;
            let currentX = startX;
            
            // Find all consecutive tiles in the direction of movement
            while (currentX >= 0 && currentX < this.Xsize) {
                const key = `${currentX},${startY}`;
                const tile = this.tileMap[key];
                
                if (tile && tile.State !== 0) {
                    if (tile.State === 9) { // Hit immovable block
                        return; // Can't move - blocked by immovable
                    }
                    tilesToMove.push(tile);
                } else {
                    break; // Hit empty space
                }
                currentX += step;
            }
            
            // Check if we can move all tiles
            const lastTile = tilesToMove[tilesToMove.length - 1];
            const [lastX, lastY] = lastTile.CordLocation;
            const newX = lastX + dx;
            
            // Check bounds and obstacles
            if (newX < 0 || newX >= this.Xsize) {
                return; // Can't move - would go out of bounds
            }
            
            const obstacleKey = `${newX},${lastY}`;
            const obstacle = this.tileMap[obstacleKey];
            if (obstacle && obstacle.State !== 0) {
                return; // Can't move - blocked by another tile
            }
            
        } else if (dy !== 0) { // Vertical movement
            const step = dy;
            let currentY = startY;
            
            // Find all consecutive tiles in the direction of movement
            while (currentY >= 0 && currentY < this.Ysize) {
                const key = `${startX},${currentY}`;
                const tile = this.tileMap[key];
                
                if (tile && tile.State !== 0) {
                    if (tile.State === 9) { // Hit immovable block
                        return; // Can't move - blocked by immovable
                    }
                    tilesToMove.push(tile);
                } else {
                    break; // Hit empty space
                }
                currentY += step;
            }
            
            // Check if we can move all tiles
            const lastTile = tilesToMove[tilesToMove.length - 1];
            const [lastX, lastY] = lastTile.CordLocation;
            const newY = lastY + dy;
            
            // Check bounds and obstacles
            if (newY < 0 || newY >= this.Ysize) {
                return; // Can't move - would go out of bounds
            }
            
            const obstacleKey = `${lastX},${newY}`;
            const obstacle = this.tileMap[obstacleKey];
            if (obstacle && obstacle.State !== 0) {
                return; // Can't move - blocked by another tile
            }
        }

        // Move all tiles (from the end of the line backwards to avoid overwriting)
        for (let i = tilesToMove.length - 1; i >= 0; i--) {
            const tile = tilesToMove[i];
            const [oldX, oldY] = tile.CordLocation;
            const newX = oldX + dx;
            const newY = oldY + dy;
            
            // Update tileMap
            delete this.tileMap[`${oldX},${oldY}`];
            tile.CordLocation = [newX, newY];
            this.tileMap[`${newX},${newY}`] = tile;
            
            // Update grid values
            this.set(oldX, oldY, 0);
            this.set(newX, newY, tile.State);
        }
        
        // Update selected tile reference
        this.selectedTile = tilesToMove.find(t => t === this.selectedTile);
    }
}