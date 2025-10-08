---
layout: opencs
title: Mini Golf Game
permalink: /golf
---

<style>
    #game-container {
        width: 800px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #game-canvas {
        border: 1px solid #00ff00;
        background-color: #00ff00;
    }

    #game-controls button {
        padding: 10px 20px;
        margin: 10px;
        font-size: 16px;
        cursor: pointer;
    }

    #message {
        color: black !important;
        font-weight: bold;
    }

    #score {
        font-size: 20px;
        font-weight: bold;
        color: #333;
    }
</style>

<h2>Mini Golf Game</h2>

<div id="game-container">
    <canvas id="game-canvas" width="800" height="400" style="border:1px solid #00a31eff;"></canvas>
    <div id="game-controls">
        <button id="start-button">Start Game</button>
        <p id="message"></p>
        <p>Score: <span id="score">0</span></p>
    </div>
</div>

<script>
    // game vars
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('start-button');
    const messageEl = document.getElementById('message');
    const scoreEl = document.getElementById('score');
    
    let ball = { x: 0, y: 0, vx: 0, vy: 0 };
    let hole = { x: 0, y: 0 };
    let mouse = { x: 0, y: 0 };
    let obstacles = [];
    let score = 0;
    let isGameActive = false;
    let isBallMoving = false;
    let animationId = null;

    function drawSquare(x, y, size, color, filled = true, rotation = 0) {
        drawRectangle(x, y, size, size, color, filled, rotation);
    }

    function drawRectangle(x, y, width, height, color, filled = true, rotation = 0) {
        ctx.save();
        ctx.translate(x + width/2, y + height/2);
        ctx.rotate(rotation);
        
        if (filled) {
            ctx.fillStyle = color;
            ctx.fillRect(-width/2, -height/2, width, height);
        } else {
            ctx.strokeStyle = color;
            ctx.strokeRect(-width/2, -height/2, width, height);
        }
        ctx.restore();
    }

    function drawCircle(x, y, radius, color, filled = true) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (filled) {
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }

    function drawCourse() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw obstacles
        drawObstacles();
        
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (isGameActive && !isBallMoving) {
            drawAimingLine();
        }
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function drawAimingLine() {
        const dx = mouse.x - ball.x;
        const dy = mouse.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const maxPower = 15;
            const power = Math.min(distance / 10, maxPower) * 1.5;
            
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;
            
            const trajectoryLength = power * 20;
            const trajectoryEndX = ball.x - (normalizedDx * trajectoryLength);
            const trajectoryEndY = ball.y - (normalizedDy * trajectoryLength);
            
            const powerRatio = power / maxPower;
            const red = Math.floor(255 * powerRatio);
            const green = Math.floor(255 * (1 - powerRatio));
            
            ctx.strokeStyle = `rgb(${red}, ${green}, 0)`;
            ctx.lineWidth = 3;
            ctx.setLineDash([10, 5]);
            
            ctx.beginPath();
            ctx.moveTo(ball.x, ball.y);
            ctx.lineTo(trajectoryEndX, trajectoryEndY);
            ctx.stroke();
            
            const arrowSize = 10;
            const arrowAngle = Math.atan2(-normalizedDy, -normalizedDx);
            
            ctx.beginPath();
            ctx.moveTo(trajectoryEndX, trajectoryEndY);
            ctx.lineTo(
                trajectoryEndX - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
                trajectoryEndY - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
            );
            ctx.moveTo(trajectoryEndX, trajectoryEndY);
            ctx.lineTo(
                trajectoryEndX - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
                trajectoryEndY - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
            );
            ctx.stroke();
            
            ctx.fillStyle = `rgba(${red}, ${green}, 0, 0.2)`;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, 10 + power * 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.setLineDash([]);
        }
    }

function generateObstacles() {
    obstacles = [];
    
    // First, place a guaranteed obstacle in the direct path
    placePathBlockingObstacle();
    
    const numAdditionalObstacles = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < numAdditionalObstacles; i++) {
        let obstacle;
        let attempts = 0;
        
        do {
            obstacle = createRandomObstacle();
            attempts++;
        } while (attempts < 50 && (isObstacleBlocking(obstacle) || isObstacleOverlapping(obstacle)));
        
        if (attempts < 50) {
            obstacles.push(obstacle);
        }
    }
}

function placePathBlockingObstacle() {
    const midX = (ball.x + hole.x) / 2;
    const midY = (ball.y + hole.y) / 2;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50;
    const x = midX + Math.cos(angle) * distance;
    const y = midY + Math.sin(angle) * distance;
    
    const clampedX = Math.max(50, Math.min(canvas.width - 100, x));
    const clampedY = Math.max(50, Math.min(canvas.height - 100, y));
    
    const shapeType = Math.floor(Math.random() * 3);
    let obstacle;
    
    if (shapeType === 0) {
        const size = Math.random() * 40 + 30;
        obstacle = {
            type: 'square',
            x: clampedX - size/2,
            y: clampedY - size/2,
            size: size,
            rotation: Math.random() * Math.PI * 2,
            color: getRandomObstacleColor()
        };
    } else if (shapeType === 1) {
        const width = Math.random() * 60 + 40;
        const height = Math.random() * 40 + 30;
        obstacle = {
            type: 'rectangle',
            x: clampedX - width/2,
            y: clampedY - height/2,
            width: width,
            height: height,
            rotation: Math.random() * Math.PI * 2,
            color: getRandomObstacleColor()
        };
    } else {
        const radius = Math.random() * 25 + 20;
        obstacle = {
            type: 'circle',
            x: clampedX,
            y: clampedY,
            radius: radius,
            rotation: 0,
            color: getRandomObstacleColor()
        };
    }
    
    let attempts = 0;
    while (attempts < 20 && (isPositionBlocked(ball.x, ball.y, obstacle, 20) || 
                            isPositionBlocked(hole.x, hole.y, obstacle, 20))) {
        const dx = obstacle.x - ball.x;
        const dy = obstacle.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            obstacle.x += (dx / distance) * 10;
            obstacle.y += (dy / distance) * 10;
        }
        
        if (obstacle.type === 'circle') {
            obstacle.x = Math.max(obstacle.radius + 10, Math.min(canvas.width - obstacle.radius - 10, obstacle.x));
            obstacle.y = Math.max(obstacle.radius + 10, Math.min(canvas.height - obstacle.radius - 10, obstacle.y));
        } else {
            const size = obstacle.size || Math.max(obstacle.width || 0, obstacle.height || 0);
            obstacle.x = Math.max(10, Math.min(canvas.width - size - 10, obstacle.x));
            obstacle.y = Math.max(10, Math.min(canvas.height - size - 10, obstacle.y));
        }
        
        attempts++;
    }
    
    obstacles.push(obstacle);
}

function createRandomObstacle() {
    const shapeType = Math.floor(Math.random() * 3);
    const x = Math.random() * (canvas.width - 100) + 50;
    const y = Math.random() * (canvas.height - 100) + 50;
    const rotation = Math.random() * Math.PI * 2;
    
    if (shapeType === 0) {
        const size = Math.random() * 40 + 20;
        return {
            type: 'square',
            x: x,
            y: y,
            size: size,
            rotation: rotation,
            color: getRandomObstacleColor()
        };
    } else if (shapeType === 1) {
        const width = Math.random() * 60 + 30;
        const height = Math.random() * 40 + 20;
        return {
            type: 'rectangle',
            x: x,
            y: y,
            width: width,
            height: height,
            rotation: rotation,
            color: getRandomObstacleColor()
        };
    } else {
        const radius = Math.random() * 25 + 15;
        return {
            type: 'circle',
            x: x,
            y: y,
            radius: radius,
            rotation: 0,
            color: getRandomObstacleColor()
        };
    }
}

function isObstacleOverlapping(newObstacle) {
    return obstacles.some(existing => {
        const dx = (existing.x + (existing.width || existing.size || 0)/2) - (newObstacle.x + (newObstacle.width || newObstacle.size || 0)/2);
        const dy = (existing.y + (existing.height || existing.size || 0)/2) - (newObstacle.y + (newObstacle.height || newObstacle.size || 0)/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const existingRadius = existing.radius || Math.max(existing.width || existing.size || 0, existing.height || existing.size || 0) / 2;
        const newRadius = newObstacle.radius || Math.max(newObstacle.width || newObstacle.size || 0, newObstacle.height || newObstacle.size || 0) / 2;
        
        return distance < (existingRadius + newRadius + 10);
    });
}

    function getRandomObstacleColor() {
        const colors = ['#8B4513', '#696969', '#800080', '#FF4500', '#4682B4', '#228B22'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function isObstacleBlocking(obstacle) {
        return isPositionBlocked(ball.x, ball.y, obstacle, 25) || 
            isPositionBlocked(hole.x, hole.y, obstacle, 25);
    }

    function isPositionBlocked(x, y, obstacle, buffer) {
        if (obstacle.type === 'square') {
            return isPointInRotatedRect(x, y, obstacle.x, obstacle.y, obstacle.size, obstacle.size, obstacle.rotation, buffer);
        } else if (obstacle.type === 'rectangle') {
            return isPointInRotatedRect(x, y, obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.rotation, buffer);
        } else if (obstacle.type === 'circle') {
            const distance = Math.sqrt(Math.pow(x - obstacle.x, 2) + Math.pow(y - obstacle.y, 2));
            return distance <= obstacle.radius + buffer;
        }
        return false;
    }

    function isPointInRotatedRect(px, py, rectX, rectY, width, height, rotation, buffer = 0) {
        const dx = px - (rectX + width/2);
        const dy = py - (rectY + height/2);
        
        const cos = Math.cos(-rotation);
        const sin = Math.sin(-rotation);
        const rotatedX = dx * cos - dy * sin;
        const rotatedY = dx * sin + dy * cos;
        
        return Math.abs(rotatedX) <= (width/2 + buffer) && Math.abs(rotatedY) <= (height/2 + buffer);
    }

    function checkCollisions() {
        for (let obstacle of obstacles) {
            if (isPositionBlocked(ball.x, ball.y, obstacle, 10)) {
                let normalX, normalY;
                
                if (obstacle.type === 'circle') {
                    const dx = ball.x - obstacle.x;
                    const dy = ball.y - obstacle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 0) {
                        normalX = dx / distance;
                        normalY = dy / distance;
                        
                        ball.x = obstacle.x + normalX * (obstacle.radius + 11);
                        ball.y = obstacle.y + normalY * (obstacle.radius + 11);
                    }
                } else {
                    const centerX = obstacle.x + (obstacle.width || obstacle.size || 0) / 2;
                    const centerY = obstacle.y + (obstacle.height || obstacle.size || 0) / 2;
                    
                    const closestPoint = getClosestPointOnRotatedRect(
                        ball.x, ball.y, 
                        obstacle.x, obstacle.y, 
                        obstacle.width || obstacle.size || 0, 
                        obstacle.height || obstacle.size || 0, 
                        obstacle.rotation
                    );
                    
                    const dx = ball.x - closestPoint.x;
                    const dy = ball.y - closestPoint.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 0) {
                        normalX = dx / distance;
                        normalY = dy / distance;
                        
                        const pushDistance = 11;
                        ball.x = closestPoint.x + normalX * pushDistance;
                        ball.y = closestPoint.y + normalY * pushDistance;
                    }
                }
                
                if (normalX !== undefined && normalY !== undefined) {
                    const dotProduct = ball.vx * normalX + ball.vy * normalY;
                    ball.vx -= 2 * dotProduct * normalX;
                    ball.vy -= 2 * dotProduct * normalY;
                    
                    ball.vx *= 0.85;
                    ball.vy *= 0.85;
                }
                
                break;
            }
        }
    }

    function getClosestPointOnRotatedRect(px, py, rectX, rectY, width, height, rotation) {
        // Translate point to rectangle's coordinate system
        const centerX = rectX + width / 2;
        const centerY = rectY + height / 2;
        const dx = px - centerX;
        const dy = py - centerY;
        
        // Rotate point back by negative rotation
        const cos = Math.cos(-rotation);
        const sin = Math.sin(-rotation);
        const rotatedX = dx * cos - dy * sin;
        const rotatedY = dx * sin + dy * cos;
        
        // Clamp to rectangle bounds
        const clampedX = Math.max(-width / 2, Math.min(width / 2, rotatedX));
        const clampedY = Math.max(-height / 2, Math.min(height / 2, rotatedY));
        
        // Rotate back to world coordinates
        const worldX = clampedX * Math.cos(rotation) - clampedY * Math.sin(rotation);
        const worldY = clampedX * Math.sin(rotation) + clampedY * Math.cos(rotation);
        
        return {
            x: centerX + worldX,
            y: centerY + worldY
        };
    }

    function drawObstacles() {
        obstacles.forEach(obstacle => {
            if (obstacle.type === 'square') {
                drawSquare(obstacle.x, obstacle.y, obstacle.size, obstacle.color, true, obstacle.rotation);
            } else if (obstacle.type === 'rectangle') {
                drawRectangle(obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.color, true, obstacle.rotation);
            } else if (obstacle.type === 'circle') {
                drawCircle(obstacle.x, obstacle.y, obstacle.radius, obstacle.color);
            }
        });
    }

    function getRandomPosition() {
        let position;
        let attempts = 0;
        
        do {
            position = {
                x: Math.random() * (canvas.width - 60) + 30,
                y: Math.random() * (canvas.height - 60) + 30
            };
            attempts++;
        } while (attempts < 100 && isPositionBlockedByObstacles(position.x, position.y));
        
        return position;
    }

    function isPositionBlockedByObstacles(x, y) {
        return obstacles.some(obstacle => isPositionBlocked(x, y, obstacle, 30));
    }

    function updateMouse(event) {
        if (!isGameActive || isBallMoving) return;
        
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        
        drawCourse();
    }

    function hitBall(event) {
        if (!isGameActive || isBallMoving) return;
        
        // Check if the click is on a button or other interactive element
        if (event.target.tagName === 'BUTTON' || 
            event.target.closest('button') || 
            event.target.id === 'start-button') {
            return; // Don't process the shot if clicking on a button
        }
        
        // Prevent event bubbling
        event.stopPropagation();
        event.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        
        // Calculate direction from ball to click position
        const dx = ball.x - clickX;
        const dy = ball.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return;
        
        const maxPower = 15;
        const power = Math.min(distance / 10, maxPower);
        
        ball.vx = (dx / distance) * power;
        ball.vy = (dy / distance) * power;
        
        isBallMoving = true;
        score++;
        scoreEl.textContent = score;
        
        animateBall();
    }

    function animateBall() {
        ball.vx *= 0.98;
        ball.vy *= 0.98;
        
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // Check obstacle collisions
        checkCollisions();
        
        // Wall bouncing
        if (ball.x <= 10 || ball.x >= canvas.width - 10) {
            ball.vx = -ball.vx;
            ball.x = Math.max(10, Math.min(canvas.width - 10, ball.x));
        }
        if (ball.y <= 10 || ball.y >= canvas.height - 10) {
            ball.vy = -ball.vy;
            ball.y = Math.max(10, Math.min(canvas.height - 10, ball.y));
        }
        
        const distanceToHole = Math.sqrt(
            Math.pow(ball.x - hole.x, 2) + Math.pow(ball.y - hole.y, 2)            
        );
        
        if (distanceToHole < 15) {
            messageEl.textContent = `Hole in ${score}! Click Start Game for a new round.`;
            isGameActive = false;
            isBallMoving = false;
            document.removeEventListener('click', hitBall);
            document.removeEventListener('mousemove', updateMouse);
            ball.x = hole.x;
            ball.y = hole.y;
            drawCourse();
            return;
        }
        
        if (Math.abs(ball.vx) < 0.1 && Math.abs(ball.vy) < 0.1) {
            ball.vx = 0;
            ball.vy = 0;
            isBallMoving = false;
            messageEl.textContent = 'Aim and click to hit the ball.';
            drawCourse();
            return;
        }

        drawCourse();
        
        if (ball.vx !== 0 || ball.vy !== 0) {
            animationId = requestAnimationFrame(animateBall);
        }
    }

    function startGame() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        // Remove existing event listeners first
        canvas.removeEventListener('click', hitBall);
        canvas.removeEventListener('mousemove', updateMouse);
        document.removeEventListener('click', hitBall);
        document.removeEventListener('mousemove', updateMouse);
        
        score = 0;
        scoreEl.textContent = score;
        isGameActive = true;
        isBallMoving = false;
        
        // Generate obstacles first
        obstacles = [];
        
        // Position ball and hole with sufficient distance from each other
        do {
            ball = getRandomPosition();
            hole = getRandomPosition();
        } while (Math.sqrt(Math.pow(ball.x - hole.x, 2) + Math.pow(ball.y - hole.y, 2)) < 100);
        
        // Generate obstacles after ball and hole are positioned
        generateObstacles();
        
        ball.vx = 0;
        ball.vy = 0;
        
        drawCourse();
        messageEl.textContent = 'Aim and click to hit the ball!';
        
        // Add event listeners to the entire document for full-page interaction
        document.addEventListener('click', hitBall);
        document.addEventListener('mousemove', updateMouse);
    }

    // Start button handler - no need for event prevention since hitBall handles it
    startButton.addEventListener('click', function(event) {
        startGame();
    });
</script>