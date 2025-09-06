---
layout: post 
author: Nikhil, Rohan, Pranav, Aditya, Shriya, Samhita
permalink: oopbreakoutlesson
---



<h1 class="breakout-title">OOPs Breakout (3-Part Mini Lesson)</h1>
<p><a href="{{site.baseurl}}/hacks" class="breakout-btn">Click here to go back to main page</a></p>
<br>

---

<br>

```mermaid
%%{init: {
  "flowchart": { "nodeSpacing": 70, "rankSpacing": 140, "curve": "linear" }
}}%%
flowchart LR
    A[OOP Mini-Lesson]

    %% invisible hubs to force a second tier (prevents squish)
    A --> H1(( ))
    A --> H2(( ))
    classDef ghost fill:transparent,stroke:transparent;
    class H1,H2 ghost;

    %% main branches (now split across two hubs)
    H1 --> L1[Lesson 1:<br/>Game Class & Inheritance]
    H1 --> L2[Lesson 2:<br/>Paddle Class]
    H1 --> L3[Lesson 3:<br/>Ball Class]
    H2 --> Activity[Whiteboard Activity]
    H2 --> Quizzes[Checkpoint Quizzes]

    %% Lesson 1 details
    L1 --> B1[Big Picture]
    L1 --> B2[GameObject Base]
    L1 --> B3[Child Classes]
    L1 --> B4[Game Conductor]

    %% Lesson 2 details
    L2 --> C1[Attributes]
    L2 --> C2[Methods]

    %% Lesson 3 details
    L3 --> D1[Constructor]
    L3 --> D2[Methods]

    %% Activity details
    Activity --> E1[Draw boxes]
    Activity --> E2[Show inheritance]
    Activity --> E3[Props inside,<br/>methods outside]

    %% Quiz details
    Quizzes --> F1[Inheritance vs Composition]
    Quizzes --> F2[Attributes vs Methods]
    Quizzes --> F3[Constructors & Ball]

    %% palette (same feel)
    style A fill:#e1f5fe,stroke:#000,stroke-width:2px,color:#000
    style L1 fill:#fff3e0,stroke:#000,color:#000
    style L2 fill:#f3e5f5,stroke:#000,color:#000
    style L3 fill:#e8f5e8,stroke:#000,color:#000
    style Activity fill:#fff8e1,stroke:#000,color:#000
    style Quizzes fill:#fce4ec,stroke:#000,color:#000
```

<div class="cards-container">
	<div class="card card-image-cover">
		<div class="card-body">
			<h2 class="card-header">OOP Breakout: Lesson 1</h2>
			<p class="text-content2">The Game class & how inheritance works</p>
			<div class="card-footer">
				<a href="{{ site.baseurl }}/oopbreakoutlesson1"><button class="btn-secondary btn">Go to lesson →</button></a>
			</div>
		</div>
	</div>
	<div class="card card-image-cover">
		<div class="card-body">
			<h2 class="card-header">OOP Breakout: Lesson 2</h2>
			<p class="text-content2">The Paddle class: attributes vs. methods</p>
			<div class="card-footer">
				<a href="{{ site.baseurl }}/oopbreakoutlesson2"><button class="btn-secondary btn">Go to lesson →</button></a>
			</div>
		</div>
	</div>
	<div class="card card-image-cover">
		<div class="card-body">
			<h2 class="card-header">OOP Breakout: Lesson 3</h2>
			<p class="text-content2">The Ball class & constructors</p>
			<div class="card-footer">
				<a href="{{ site.baseurl }}/oopbreakoutlesson3"><button class="btn-secondary btn">Go to lesson →</button></a>
			</div>
		</div>
	</div>
	<div class="card card-image-cover">
		<div class="card-body">
			<h2 class="card-header">OOP Breakout: Expert</h2>
			<p class="text-content2">*Very difficult extra game & lesson (not on mindmap!)</p>
			<div class="card-footer">
				<a href="{{ site.baseurl }}/oopadv"><button class="btn-secondary btn">Go to lesson →</button></a>
			</div>
		</div>
	</div>
</div>

<br>

---

## ACTIVITY: Showcase your learning in the blackboard below. 
- Draw your “class” as a box → properties inside (like health, lives), methods outside (like move(), hitBrick()).
- Draw inheritance → a Paddle class, then draw a “PowerPaddle” subclass that has an extra feature (like shooting lasers).

<br>

<canvas id="c" width="680" height="500" class="whiteboard-canvas" style="border:1px solid #ccc"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.js" integrity="sha512-hOJ0mwaJavqi11j0XoBN1PtOJ3ykPdP6lp9n29WVVVVZxgx9LO7kMwyyhaznGJ+kbZrDN1jFZMt2G9bxkOHWFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="{{ '/_sass/open-coding/whiteboard.scss' | relative_url }}">
<script>
  const canvas = new fabric.Canvas('c');
  canvas.isDrawingMode = true; // enable free drawing
  canvas.freeDrawingBrush.color = "white";
  canvas.freeDrawingBrush.width = 5;
  document.addEventListener("keydown", e => {
    if(e.key === "r") canvas.freeDrawingBrush.color = "red";
    if(e.key === "b") canvas.freeDrawingBrush.color = "blue";
    if(e.key === "g") canvas.freeDrawingBrush.color = "green";
    if(e.key === "c") canvas.clear();
  });
</script>

<br>
Press `r` to change brush color to red.
Press `b` to change brush color to blue.
Press `g` to change brush color to green.
Press `c` to clear blackboard. 


# ✅ Checkpoint Quizzes

<div id="oop-breakout-quizzes">

  <div class="breakout-quiz" data-answers='{"q1":"Ball,Paddle,Brick","q2":"Game owns and manages Ball, Paddle, Bricks"}'>
    <div class="breakout-quiz-title">Lesson 1 Checkpoint</div>
    <div class="breakout-quiz-q">
      <p class="prompt">1) Which classes inherit from <code>GameObject</code>?</p>
      <label><input type="checkbox" name="q1" value="Ball">Ball</label>
      <label><input type="checkbox" name="q1" value="Paddle">Paddle</label>
      <label><input type="checkbox" name="q1" value="Game">Game</label>
      <label><input type="checkbox" name="q1" value="Brick">Brick</label>
    </div>
    <div class="breakout-quiz-q">
      <p class="prompt">2) What is composition in the <code>Game</code> class?</p>
      <label><input type="radio" name="q2" value="Game extends GameObject">Game extends GameObject</label>
      <label><input type="radio" name="q2" value="Game owns and manages Ball, Paddle, Bricks">Game owns and manages Ball, Paddle, Bricks</label>
      <label><input type="radio" name="q2" value="Game overrides draw()">Game overrides draw()</label>
    </div>
    <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
    <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
    <div class="breakout-quiz-feedback"></div>
  </div>

  <div class="breakout-quiz" data-answers='{"q1":"width,color","q2":"update()"}'>
    <div class="breakout-quiz-title">Lesson 2 Checkpoint</div>
    <div class="breakout-quiz-q">
      <p class="prompt">1) Which of these are attributes of Paddle?</p>
      <label><input type="checkbox" name="q1" value="width">width</label>
      <label><input type="checkbox" name="q1" value="color">color</label>
      <label><input type="checkbox" name="q1" value="draw()">draw()</label>
      <label><input type="checkbox" name="q1" value="update()">update()</label>
    </div>
    <div class="breakout-quiz-q">
      <p class="prompt">2) Which method makes the paddle respond to keyboard input?</p>
      <label><input type="radio" name="q2" value="reset()">reset()</label>
      <label><input type="radio" name="q2" value="update()">update()</label>
      <label><input type="radio" name="q2" value="applyPowerUp()">applyPowerUp()</label>
    </div>
    <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
    <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
    <div class="breakout-quiz-feedback"></div>
  </div>

  <div class="breakout-quiz" data-answers='{"q1":"Calls GameObject constructor","q2":"Velocity magnitude"}'>
    <div class="breakout-quiz-title">Lesson 3 Checkpoint</div>
    <div class="breakout-quiz-q">
      <p class="prompt">1) What does <code>super(x, y)</code> do in Ball’s constructor?</p>
      <label><input type="radio" name="q1" value="Calls the Game class">Calls the Game class</label>
      <label><input type="radio" name="q1" value="Calls GameObject constructor">Calls GameObject constructor</label>
      <label><input type="radio" name="q1" value="Sets speed to default">Sets speed to default</label>
    </div>
    <div class="breakout-quiz-q">
      <p class="prompt">2) What does <code>speedUp()</code> change?</p>
      <label><input type="radio" name="q2" value="Ball size only">Ball size only</label>
      <label><input type="radio" name="q2" value="Velocity magnitude">Velocity magnitude</label>
      <label><input type="radio" name="q2" value="Direction and color">Direction and color</label>
    </div>
    <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
    <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
    <div class="breakout-quiz-feedback"></div>
  </div>

</div>

---

## Wrap-up: how the pieces fit

* **Inheritance:** `Ball`, `Paddle`, `Brick`, `PowerUp` extend `GameObject` to share position and override `draw/update`.&#x20;
* **Composition:** `Game` builds the world—instantiates objects, tracks score/lives/level, and runs the loop.&#x20;