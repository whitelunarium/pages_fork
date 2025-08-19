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
    class Layer {
      constructor(image, speedRatio) {
        this.x = 0;
        this.y = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.image = image;
        this.speedRatio = speedRatio;
        this.speed = gameSpeed * this.speedRatio;
      }
      update() {
        this.x = (this.x - this.speed) % this.width;
      }
      draw(){
        ctx.drawImage(this.image, this.x, this.y);
        // Draw a second image for seamless scrolling
        ctx.drawImage(this.image, this.x + this.width, this.y);
      }
    }

    var backgroundObj = new Layer(backgroundImg, 0.1);

    function drawSprite() {
      if (spriteImg.complete && spriteImg.naturalWidth > 0) {
        const spriteWidth = spriteImg.naturalWidth / 2;
        const spriteHeight = spriteImg.naturalHeight / 2;
        const spriteX = (canvasWidth - spriteWidth) / 2;
        const spriteY = (canvasHeight - spriteHeight) / 2;
        ctx.drawImage(spriteImg, spriteX, spriteY, spriteWidth, spriteHeight);
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      backgroundObj.update();
      backgroundObj.draw();
      drawSprite();
      requestAnimationFrame(animate);
    }
    animate();
  };
</script>
