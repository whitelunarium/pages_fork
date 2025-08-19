---
layout: base
title: Background with Object
description: Use JavaScript to have an in motion background.
sprite: /images/platformer/sprites/flying-ufo.png
background: /images/platformer/backgrounds/alien_planet1.jpg
permalink: /background
---

<canvas id="world"></canvas>

<script>
  const canvas = document.getElementById("world");
  const ctx = canvas.getContext('2d');

  const backgroundImg = new Image();
  backgroundImg.src = '{{page.background}}';

  const spriteImg = new Image();
  spriteImg.src = '{{page.sprite}}';

  backgroundImg.onload = function() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    canvas.style.position = 'absolute';
    canvas.style.left = `0px`;
    canvas.style.top = `${(window.innerHeight - canvasHeight) / 2}px`;

    var gameSpeed = 5;

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
        // Draw two images for seamless scrolling
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    }

    // Create objects
    const backgroundObj = new Background(backgroundImg, canvasWidth, canvasHeight, 0, 0, 0.1);

    // Center the sprite and scale it down
    const spriteWidth = spriteImg.naturalWidth / 2;
    const spriteHeight = spriteImg.naturalHeight / 2;
    const spriteX = (canvasWidth - spriteWidth) / 2;
    const spriteY = (canvasHeight - spriteHeight) / 2;
    const spriteObj = new GameObject(spriteImg, spriteWidth, spriteHeight, spriteX, spriteY);

    function animate() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      backgroundObj.update();
      backgroundObj.draw(ctx);
      if (spriteImg.complete && spriteImg.naturalWidth > 0) {
        spriteObj.draw(ctx);
      }
      requestAnimationFrame(animate);
    }
    animate();
  };
</script>
