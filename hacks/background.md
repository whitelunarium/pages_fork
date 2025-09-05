---
layout: opencs
title: Background with Object
description: Use JavaScript to have an in motion background.
sprite: /images/platformer/sprites/flying-ufo.png
background: /images/platformer/backgrounds/alien_planet1.jpg
permalink: /background
---

<canvas id="world"></canvas>

<script>
  const gameSpeed = 5;
  const canvas = document.getElementById("world");
  const ctx = canvas.getContext('2d');
  const backgroundImg = new Image();
  const spriteImg = new Image();

  backgroundImg.src = '{{page.background}}';
  spriteImg.src = '{{page.sprite}}';

  let imagesLoaded = 0;
  function checkAndStart() {
    if (imagesLoaded < 2) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.position = 'absolute';
    canvas.style.left = `0px`;
    canvas.style.top = `${(window.innerHeight - canvasHeight) / 2}px`;


    class GameObject {
      constructor(image, width, height, x = 0, y = 0, speedRatio = 0) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedRatio = speedRatio;
        this.speed = gameSpeed * this.speedRatio;
      }
      update() {}
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }

    class Background extends GameObject {
      update() {
        this.x = (this.x - this.speed) % this.width;
      }
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    }

    class Player extends GameObject {
      constructor(image, x, y) {
        const width = image.naturalWidth / 2;
        const height = image.naturalHeight / 2;
        super(image, width, height, x, y);
        this.baseY = y;
        this.frame = 0;
      }
      update() {
        // produces a sin wave motion, 0.05 oscillation speed, 5 the movement in ±pixels
        //this.y = this.baseY + Math.sin(this.frame * 0.05) * 5;
        this.frame++;
      }
    }

    const backgroundObj = new Background(backgroundImg, canvasWidth, canvasHeight, 0, 0, 0.1);
    const spriteX = (canvasWidth - spriteImg.naturalWidth / 2) / 2;
    const spriteY = (canvasHeight - spriteImg.naturalHeight / 2) / 2;
    const playerObj = new Player(spriteImg, spriteX, spriteY);

    function gameLoop() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      backgroundObj.update();
      backgroundObj.draw(ctx);
      playerObj.update();
      playerObj.draw(ctx);
      requestAnimationFrame(gameLoop);
    }
    gameLoop();
  }

  backgroundImg.onload = function() {
    imagesLoaded++;
    checkAndStart();
  };
  spriteImg.onload = function() {
    imagesLoaded++;
    checkAndStart();
  };
</script>
