---
toc: true
comments: true
layout: post
title: Implenting enemies into the Game
description: Learn how to make an enemy that follows you around and ends the game when interacting
categories: [AdPlat] 
permalink: /adplat/EnemyLesson
author: Zhengji Li
courses: { csse: {week: 17} }
type: ccc
---
# Adding an Enemy That Follows the Player in a JavaScript Game

In this tutorial, you'll learn how to implement a simple "enemy" character in a JavaScript game engine. The enemy will follow the nearest player and end the game upon contact.

> This notebook is designed for learners familiar with JavaScript, basic game loops, and sprite management.


## Game Environment Structure

This example is built with custom classes like `Player`, `Npc`, `Collectible`, etc. We assume you have a level file like `GameLevelEnd.js`.

We'll modify this level to include an enemy NPC with basic AI.


## Step 1: Define the Enemy Sprite

Example code to create the enemy:

```javascript
const sprite_src_enemy = path + "/images/gamify/ederman.png";
const sprite_data_enemy = {
  id: 'Enderman',
  greeting: "You feel a dark presence...",
  src: sprite_src_enemy,
  SCALE_FACTOR: 7,
  ANIMATION_RATE: 0,
  pixels: {height: 256, width: 128},
  INIT_POSITION: { x: width / 2, y: height / 4 },
  orientation: {rows: 1, columns: 1},
  down: {row: 0, start: 0, columns: 1},
  hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
  zIndex: 10,
  update: function(players, stopGameLoop) {
    // Follows nearest player
    ...
  }
};



---

#### **Enemy AI: Following the Player**
```markdown
## Step 2: Follow the Nearest Player

Inside the `update` function, add:

```javascript

let nearest = players[0];
let minDist = Infinity;

for (const p of players) {
  const dx = p.x - this.x;
  const dy = p.y - this.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < minDist) {
    minDist = dist;
    nearest = p;
  }
}

// Move toward them
const speed = 1.5;
const dx = nearest.x - this.x;
const dy = nearest.y - this.y;
const angle = Math.atan2(dy, dx);
this.x += Math.cos(angle) * speed;
this.y += Math.sin(angle) * speed;



---

#### **Game Over Logic**
```markdown
## Step 3: End the Game on Collision

Still inside the `update()` method:

```javascript

for (const p of players) {
  if (
    Math.abs(p.x - this.x) < this.width * this.hitbox.widthPercentage &&
    Math.abs(p.y - this.y) < this.height * this.hitbox.heightPercentage
  ) {
    stopGameLoop();
    alert("Game Over! You were caught by the enemy!");
  }
}



---

####  **Add Enemy to the Level**
```markdown
## Step 4: Include the Enemy in the Level

Make sure the enemy gets added to the game objects:

```javascript

this.classes = [
  { class: BackgroundParallax, data: image_data_parallax },
  { class: GamEnvBackground, data: image_data_end },
  { class: Player, data: sprite_data_chillguy },
  { class: Npc, data: sprite_data_tux },
  { class: Collectible, data: sprite_data_eye },
  { class: Player, data: sprite_data_alex },
  { class: Enemy, data: sprite_data_enemy } // Add enemy here
];



---

#### **Summary**
```markdown
## TL;DR

You've added:
- An enemy sprite.
- Simple AI to follow the nearest player.
- Collision detection to trigger Game Over.


---

#### **Homework**

For your homework, we would want you to implement this enemy system into your actual game, unlike previous enemy lessons, this enemy will follow the player around instead of traveling around a set path.

## Requirements:
1. Enemy following player
2. Game over when enemy interacts with player
3. Make it look fluid
