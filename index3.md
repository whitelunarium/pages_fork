---
layout: post 
title: Mario Gamified Navigation
hide: true # not a blog
permalink: /index3
sprite:
  image: /images/mario_animation.png
  pixelWidth: 256
  pixelHeight: 256
  scale: 0.25
  frames:
    Rest:   {row: 0,  col: 0,  frames: 15}
    RestL:  {row: 1,  col: 0,  frames: 15}
    Walk:   {row: 2,  col: 0,  frames: 8}
    Tada:   {row: 2,  col: 11, frames: 3}
    WalkL:  {row: 3,  col: 0,  frames: 8}
    TadaL:  {row: 3,  col: 11, frames: 3}
    Run1:   {row: 4,  col: 0,  frames: 15}
    Run1L:  {row: 5,  col: 0,  frames: 15}
    Run2:   {row: 6,  col: 0,  frames: 15}
    Run2L:  {row: 7,  col: 0,  frames: 15}
    Puff:   {row: 8,  col: 0,  frames: 15}
    PuffL:  {row: 9,  col: 0,  frames: 15}
    Cheer:  {row: 10, col: 0,  frames: 15}
    CheerL: {row: 11, col: 0,  frames: 15}
    Flip:   {row: 12, col: 0,  frames: 15}
    FlipL:  {row: 13, col: 0,  frames: 15}
---

<!-- Container for Mario and hotspots/details -->
<div id="game-area" style="position: relative; width: 400px; height: 700px; margin: 60px auto;">
  <!-- Mario sprite -->
  <p id="mario" class="sprite"></p>

  <!-- Hotspot text elements -->
  <div id="hotspot-csse" class="hotspot" style="top: 40px; left: 40px;">CSSE</div>
  <div id="hotspot-csp" class="hotspot" style="top: 240px; left: 40px;">CSP</div>
  <div id="hotspot-csa" class="hotspot" style="top: 440px; left: 40px;">CSA</div>

  <!-- Detail sections -->
  <div id="section-csse" class="detail-section" style="top: 40px; left: 200px;">  
    <h3>CSSE Detail</h3>
    <p>Computer Science and Software Engineering: JavaScript, OOP, algorithmic thinking, game dev projects.</p>
  </div>
  <div id="section-csp" class="detail-section" style="top: 240px; left: 200px;">
    <h3>CSP Detail</h3>
    <p>Computer Science Principles: Python, algorithms, data, networks, impact of computing.</p>
  </div>
  <div id="section-csa" class="detail-section" style="top: 440px; left: 200px;">
    <h3>CSA Detail</h3>
    <p>AP Computer Science A: Java, data structures, recursion, team projects, AP prep.</p>
  </div>
</div>

<style>
#game-area {
  position: relative;
  width: 400px;
  height: 700px;
  margin: 60px auto;
  background: #55595dff;
  border-radius: 16px;
  box-shadow: 0 4px 24px #b6c6e6;
}
.sprite {
  width: {{page.sprite.pixelWidth}}px;
  height: {{page.sprite.pixelHeight}}px;
  background-image: url('{{page.sprite.image}}');
  background-repeat: no-repeat;
  position: absolute;
  top: 20px;
  left: 20px;
  background-position: 0px 0px;
  z-index: 3;
  transform: scale({{page.sprite.scale}});
  transform-origin: top left;
}
.hotspot {
  position: absolute;
  width: 120px;
  height: 48px;
  font-weight: bold;
  color: #2563eb;
  background: #e0e7ff;
  padding: 8px 16px;
  border-radius: 8px;
  z-index: 2;
  font-size: 1.2em;
  box-shadow: 0 2px 8px #b6c6e6;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-section {
  position: absolute;
  display: none;
  border: 2px solid #2563eb;
  padding: 16px;
  background: #2758dfff;
  max-width: 160px;
  min-height: 48px;
  border-radius: 8px;
  z-index: 1;
}
</style>

<script>
// Sprite data: animation frames, pixel size, scale
const sprite_data = {{ page.sprite | jsonify }};

// Hotspots data for easy expansion
const hotspots = [
  {id: 'hotspot-csse', section: 'section-csse'},
  {id: 'hotspot-csp', section: 'section-csp'},
  {id: 'hotspot-csa', section: 'section-csa'}
];

class Mario {
  constructor(sprite_data, hotspots) {
    this.tID = null;
    this.positionX = 40;
    this.positionY = 40;
    this.currentSpeed = 0;
    this.marioElement = document.getElementById("mario");
    this.pixelsWidth = sprite_data.pixelWidth;
    this.pixelsHeight = sprite_data.pixelHeight;
    this.scale = sprite_data.scale;
    this.interval = 100;
    this.obj = sprite_data.frames;
    this.marioElement.style.position = "absolute";
    this.moving = false;
    this.direction = {x: 0, y: 0};
    this.hotspots = hotspots;
    this.activeSection = null;
    this.currentAnim = 'Rest';
  }

  animate(animName, speed) {
    let frame = 0;
    const obj = this.obj[animName];
    const row = obj.row * this.pixelsHeight;
    this.currentAnim = animName;
    this.currentSpeed = speed;
    this.stopAnimate();
    this.tID = setInterval(() => {
      const col = (frame + obj.col) * this.pixelsWidth;
      this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
      this.positionX += speed * this.direction.x;
      this.positionY += speed * this.direction.y;
      this.marioElement.style.left = `${this.positionX}px`;
      this.marioElement.style.top = `${this.positionY}px`;
      frame = (frame + 1) % obj.frames;
      this.checkHotspots();
    }, this.interval);
  }

  startWalkingRight() {
    this.direction = {x: 1, y: 0};
    this.animate("Walk", 8);
  }
  startWalkingLeft() {
    this.direction = {x: -1, y: 0};
    this.animate("WalkL", 8);
  }
  startWalkingDown() {
    this.direction = {x: 0, y: 1};
    this.animate("Walk", 8);
  }
  startWalkingUp() {
    this.direction = {x: 0, y: -1};
    this.animate("Walk", 8);
  }
  startResting() {
    this.direction = {x: 0, y: 0};
    this.animate("Rest", 0);
  }
  stopAnimate() {
    clearInterval(this.tID);
    this.tID = null;
  }

  checkHotspots() {
    let collided = false;
    // Mario is visually scaled down, so collision box must be scaled too
    for (const h of this.hotspots) {
      const el = document.getElementById(h.id);
      const hx = el.offsetLeft;
      const hy = el.offsetTop;
      const hw = el.offsetWidth;
      const hh = el.offsetHeight;
      const mx = this.positionX;
      const my = this.positionY;
      const mw = this.marioElement.offsetWidth * this.scale;
      const mh = this.marioElement.offsetHeight * this.scale;
      if (
        mx < hx + hw &&
        mx + mw > hx &&
        my < hy + hh &&
        my + mh > hy
      ) {
        document.getElementById(h.section).style.display = 'block';
        this.activeSection = h.section;
        collided = true;
      } else {
        document.getElementById(h.section).style.display = 'none';
      }
    }
    if (!collided) {
      this.activeSection = null;
    }
  }

  reset() {
    this.stopAnimate();
    this.positionX = 40;
    this.positionY = 40;
    this.marioElement.style.left = `40px`;
    this.marioElement.style.top = `40px`;
    for (const h of this.hotspots) {
      document.getElementById(h.section).style.display = 'none';
    }
    this.activeSection = null;
    this.startResting();
  }
}

const mario = new Mario(sprite_data, hotspots);

// Key press/release controls
window.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
    mario.startWalkingRight();
  }
  if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
    mario.startWalkingLeft();
  }
  if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
    mario.startWalkingDown();
  }
  if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
    mario.startWalkingUp();
  }
  if (event.key === "r" || event.key === "R") {
    mario.reset();
  }
});
window.addEventListener("keyup", (event) => {
  if (["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","d","a","s","w","D","A","S","W"].includes(event.key)) {
    mario.stopAnimate();
    mario.startResting();
  }
});

// On page load, Mario rests
window.addEventListener("DOMContentLoaded", () => {
  mario.startResting();
});
</script>

## Mario Gamified Navigation Example

Use arrow keys to move Mario. When Mario collides with CSSE, CSP, or CSA, the corresponding detail will expand. When Mario leaves the hotspot, the detail collapses. Press 'R' to reset Mario and hide all details.

---

This example uses your original Mario animation logic, organized layout, and dynamic hotspot reveals. You can further design and expand from here!
