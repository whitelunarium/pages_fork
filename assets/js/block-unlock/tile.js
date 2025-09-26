// tile.js
export class Tile {
    static spriteLibrary = [
        null,                          // 0 - empty
        "/images/block-unlock/block.png",       // 1 - Block
        "/images/block-unlock/pusher.png",     // 2 - Pusher
        "/images/block-unlock/heavy.png",      // 3 - Heavy Block
        "/images/block-unlock/rotater.png",    // 4 - Rotater
        "/images/block-unlock/sliderH.png",    // 5 - Slider Horizontal
        "/images/block-unlock/sliderV.png",    // 6 - Slider Vertical
        "/images/block-unlock/key.png",        // 7 - Key
        "/images/block-unlock/door.png",       // 8 - Door
        "/images/block-unlock/immovable.png"   // 9 - Immoveable
    ];

    constructor(cords, tileState) {
        this.CordLocation = cords; // [x, y]
        this.State = tileState;
        this.pusherDirection = null; // For pusher tiles
        this.isMoving = false; // Prevent multiple simultaneous movements
    }

    get sprite() {
        return Tile.spriteLibrary[this.State] || null;
    }

    // Check if this is a pusher tile
    isPusher() {
        return this.State === 2;
    }

    // Set pusher direction (for pusher tiles only)
    setPusherDirection(direction) {
        if (!this.isPusher()) return false;
        
        const validDirections = ['up', 'down', 'left', 'right'];
        if (validDirections.includes(direction)) {
            this.pusherDirection = direction;
            console.log(`Pusher direction set to: ${direction}. Press SPACE to start pushing.`);
            return true;
        }
        return false;
    }

    // Start pusher movement (requires grid reference)
    startPushing(grid) {
        if (!this.isPusher() || !this.pusherDirection || this.isMoving) return false;
        
        this.isMoving = true;
        this._continuousPush(grid);
        return true;
    }

    // Private method for continuous pusher movement
    _continuousPush(grid) {
        if (!this.isMoving) return; // Safety check
        
        const dirMap = {
            "up": [0, -1],
            "down": [0, 1],
            "left": [-1, 0],
            "right": [1, 0]
        };

        const [dx, dy] = dirMap[this.pusherDirection];
        const [currentX, currentY] = this.CordLocation;
        const nextX = currentX + dx;
        const nextY = currentY + dy;

        // Check bounds
        if (nextX < 0 || nextX >= grid.Xsize || nextY < 0 || nextY >= grid.Ysize) {
            console.log("Pusher stopped: Hit wall");
            this.isMoving = false;
            return;
        }

        // Check what's in the next position
        const nextKey = `${nextX},${nextY}`;
        const nextTile = grid.tileMap[nextKey];

        if (!nextTile || nextTile.State === 0) {
            // Empty space - move pusher
            this._moveTo(grid, nextX, nextY);
            // Continue moving after animation completes
            setTimeout(() => this._continuousPush(grid), 170);
            
        } else if (nextTile.State === 9) {
            // Immovable block - stop
            console.log("Pusher stopped: Hit immovable block");
            this.isMoving = false;
            return;
            
        } else {
            // Another block - try to push it
            if (this._canPushBlock(grid, nextX, nextY, dx, dy)) {
                this._pushBlock(grid, nextX, nextY, dx, dy);
                this._moveTo(grid, nextX, nextY);
                // Continue moving after animations complete
                setTimeout(() => this._continuousPush(grid), 170);
            } else {
                console.log("Pusher stopped: Cannot push block");
                this.isMoving = false;
                return;
            }
        }
    }

    // Private method to move this pusher tile to new coordinates
    _moveTo(grid, toX, toY) {
        const [fromX, fromY] = this.CordLocation;
        
        // Get the animation function from the grid's animation system
        const animateMovement = grid.animateMovement;
        
        if (animateMovement) {
            // Use smooth animation
            animateMovement(fromX, fromY, toX, toY, this, () => {
                // Update internal state after animation
                delete grid.tileMap[`${fromX},${fromY}`];
                this.CordLocation = [toX, toY];
                grid.tileMap[`${toX},${toY}`] = this;
                
                // Update grid state
                grid.set(fromX, fromY, 0);
                grid.set(toX, toY, this.State);
            });
        } else {
            // Fallback to instant movement
            delete grid.tileMap[`${fromX},${fromY}`];
            this.CordLocation = [toX, toY];
            grid.tileMap[`${toX},${toY}`] = this;
            
            grid.set(fromX, fromY, 0);
            grid.set(toX, toY, this.State);
        }
    }

    // Private method to check if blocks can be pushed (handles multiple blocks)
    _canPushBlock(grid, startX, startY, dx, dy) {
        const blocksToPush = [];
        let currentX = startX;
        let currentY = startY;
        
        // Collect all consecutive blocks in the push direction
        while (currentX >= 0 && currentX < grid.Xsize && currentY >= 0 && currentY < grid.Ysize) {
            const currentKey = `${currentX},${currentY}`;
            const currentTile = grid.tileMap[currentKey];
            
            if (!currentTile || currentTile.State === 0) {
                // Hit empty space - we can push all collected blocks
                break;
            } else if (currentTile.State === 9) {
                // Hit immovable block - cannot push
                return false;
            } else {
                // Found a pushable block
                blocksToPush.push(currentTile);
                currentX += dx;
                currentY += dy;
            }
        }
        
        // Check if the final position is within bounds and empty
        if (currentX < 0 || currentX >= grid.Xsize || currentY < 0 || currentY >= grid.Ysize) {
            return false; // Would push blocks out of bounds
        }
        
        // If we get here, we can push all the blocks
        return blocksToPush.length > 0;
    }

    // Private method to push multiple blocks
    _pushBlock(grid, startX, startY, dx, dy) {
        const blocksToPush = [];
        let currentX = startX;
        let currentY = startY;
        
        // Collect all consecutive blocks in the push direction
        while (currentX >= 0 && currentX < grid.Xsize && currentY >= 0 && currentY < grid.Ysize) {
            const currentKey = `${currentX},${currentY}`;
            const currentTile = grid.tileMap[currentKey];
            
            if (!currentTile || currentTile.State === 0) {
                break; // Hit empty space
            } else if (currentTile.State === 9) {
                return; // Hit immovable block (shouldn't happen if _canPushBlock was called first)
            } else {
                blocksToPush.push(currentTile);
                currentX += dx;
                currentY += dy;
            }
        }
        
        const animateMovement = grid.animateMovement;
        let animationsCompleted = 0;
        const totalAnimations = blocksToPush.length;
        
        if (animateMovement && totalAnimations > 0) {
            // Animate all blocks simultaneously
            for (let i = 0; i < blocksToPush.length; i++) {
                const block = blocksToPush[i];
                const [oldX, oldY] = block.CordLocation;
                const newX = oldX + dx;
                const newY = oldY + dy;
                
                animateMovement(oldX, oldY, newX, newY, block, () => {
                    // Update internal state after animation
                    delete grid.tileMap[`${oldX},${oldY}`];
                    block.CordLocation = [newX, newY];
                    grid.tileMap[`${newX},${newY}`] = block;
                    
                    // Update grid state
                    grid.set(oldX, oldY, 0);
                    grid.set(newX, newY, block.State);
                    
                    animationsCompleted++;
                });
            }
        } else {
            // Fallback to instant movement
            for (let i = blocksToPush.length - 1; i >= 0; i--) {
                const block = blocksToPush[i];
                const [oldX, oldY] = block.CordLocation;
                const newX = oldX + dx;
                const newY = oldY + dy;
                
                delete grid.tileMap[`${oldX},${oldY}`];
                block.CordLocation = [newX, newY];
                grid.tileMap[`${newX},${newY}`] = block;
                
                grid.set(oldX, oldY, 0);
                grid.set(newX, newY, block.State);
            }
        }
    }

    // Stop pusher movement (emergency stop)
    stopPushing() {
        if (this.isPusher()) {
            this.isMoving = false;
            this.pusherDirection = null;
        }
    }
}