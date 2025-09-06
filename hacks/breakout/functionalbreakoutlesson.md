---
layout: post
author: Nikhil, Rohan, Pranav, Aditya, Shriya, Samhita
permalink: functionalbreakoutlesson
---




<h1 class="breakout-title">Functional Breakout (2-Part Mini Lesson)</h1>
<p><a href="{{site.baseurl}}/hacks" class="breakout-btn">Click here to go back to main page</a></p>
<br>

---

<br>

```mermaid
flowchart TD
    A[Start: Breakout Blocks Lesson] --> B[Lesson 1: Paddle and Base Blocks]
    
    B --> B1[Make the Paddle]
    B1 --> B2[Move the Paddle]
    
    B --> C[Interactive Demos]
    C --> C1[Paddle Movement]
    C1 --> C2[Ball Bouncing]
    C2 --> C3[Paddle + Ball]
    C3 --> C4[Mini Breakout]
    
    B --> D[Lesson 2: Power-Up Block + Timer]
    
    D --> D1[Add Special Bricks]
    D1 --> D2[Draw and Drop Power-Up]
    D2 --> D3[Show Timer]
    
    C4 --> E[Full Power-Up Demo]
    
    D --> F[Exploration Activities]
    
    E --> G[Complete Breakout Game]
    
    style A fill:#ffffff,stroke:#000000,stroke-width:3px,color:#000000
    style B fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#000000
    style B1 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000000
    style B2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000000
    style C fill:#e8f5e8,stroke:#388e3c,stroke-width:2px,color:#000000
    style C1 fill:#f1f8e9,stroke:#66bb6a,stroke-width:2px,color:#000000
    style C2 fill:#f1f8e9,stroke:#66bb6a,stroke-width:2px,color:#000000
    style C3 fill:#f1f8e9,stroke:#66bb6a,stroke-width:2px,color:#000000
    style C4 fill:#f1f8e9,stroke:#66bb6a,stroke-width:2px,color:#000000
    style D fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000000
    style D1 fill:#fff8e1,stroke:#ffb74d,stroke-width:2px,color:#000000
    style D2 fill:#fff8e1,stroke:#ffb74d,stroke-width:2px,color:#000000
    style D3 fill:#fff8e1,stroke:#ffb74d,stroke-width:2px,color:#000000
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000000
    style F fill:#f9fbe7,stroke:#827717,stroke-width:2px,color:#000000
    style G fill:#ffebee,stroke:#d32f2f,stroke-width:3px,color:#000000
```

<!-- ADD ICONS to the cards IN FUTURE! -->

<div class="cards-container">
	<div class="card backgroundPrimary">
		<div class="card-body backgroundPrimary">
			<h2 class="card-header">Functional Breakout: Lesson 1</h2>
			<p class="text-content2">Paddle and Base Blocks</p>
			<div class="card-footer">
				<a href="{{ site.baseurl }}/functionalbreakoutlesson1"><button class="btn-secondary btn">Go to lesson →</button></a>
			</div>
		</div>
	</div>
	<div class="card">
		<div class="card-body">
			<h2 class="card-header">Functional Breakout: Lesson 2</h2>
			<p class="text-content2">Power-Up Block + Timer</p>
			<div class="card-footer">
				<a href="{{ site.baseurl }}/functionalbreakoutlesson2"><button class="btn-secondary btn">Go to lesson →</button></a>
			</div>
		</div>
	</div>
</div>

---


<div class="breakout-quiz" data-answers='{"q1":"rightPressed,leftPressed","q2":"Conditional checks on paddleX against 0 and canvas.width - paddleWidth","q3":"keydown,keyup"}'>
  <div class="breakout-quiz-title">Lesson 1 Checkpoint</div>

  <div class="breakout-quiz-q">
    <p class="prompt">1) Which variables track keyboard input for moving the paddle?</p>
    <label><input type="checkbox" name="q1" value="rightPressed"> rightPressed</label>
    <label><input type="checkbox" name="q1" value="leftPressed"> leftPressed</label>
    <label><input type="checkbox" name="q1" value="paddleHeight"> paddleHeight</label>
    <label><input type="checkbox" name="q1" value="paddleWidth"> paddleWidth</label>
  </div>

  <div class="breakout-quiz-q">
    <p class="prompt">2) What prevents the paddle from leaving the canvas?</p>
    <label><input type="radio" name="q2" value="IncreaseWidth"> Increasing <code>paddleWidth</code> when near the edge</label>
    <label><input type="radio" name="q2" value="Conditional checks on paddleX against 0 and canvas.width - paddleWidth"> Conditional checks on <code>paddleX</code> against 0 and <code>canvas.width - paddleWidth</code></label>
    <label><input type="radio" name="q2" value="ClosePath"> Calling <code>ctx.closePath()</code> in <code>drawPaddle()</code></label>
  </div>

  <div class="breakout-quiz-q">
    <p class="prompt">3) Which events are used to update movement flags?</p>
    <label><input type="checkbox" name="q3" value="keydown"> keydown</label>
    <label><input type="checkbox" name="q3" value="keyup"> keyup</label>
    <label><input type="checkbox" name="q3" value="wheel"> wheel</label>
    <label><input type="checkbox" name="q3" value="resize"> resize</label>
  </div>

  <button class="breakout-quiz-btn" onclick="checkQuiz(this)">Check answers</button>
  <button class="breakout-quiz-btn" onclick="resetQuiz(this)">Reset</button>
  <div class="breakout-quiz-feedback"></div>
</div>

<script>
function checkQuiz(btn) {
  const quiz = btn.closest('.breakout-quiz');
  const answers = JSON.parse(quiz.dataset.answers);
  let ok = true;
  for (const q in answers) {
    const expected = answers[q].split(',');
    const checked = Array.from(quiz.querySelectorAll(`input[name='${q}']:checked`)).map(i=>i.value);
    if (expected.length > 1) {
      if (checked.length !== expected.length || !expected.every(val => checked.includes(val))) ok = false;
    } else {
      if (!checked.length || checked[0] !== answers[q]) ok = false;
    }
  }
  const fb = quiz.querySelector('.breakout-quiz-feedback');
  fb.textContent = ok ? '✅ Correct!' : '❌ Try again.';
  fb.className = 'breakout-quiz-feedback ' + (ok ? 'ok' : 'bad');
}
function resetQuiz(btn) {
  const quiz = btn.closest('.breakout-quiz');
  quiz.querySelectorAll('input').forEach(i=>i.checked=false);
  const fb = quiz.querySelector('.breakout-quiz-feedback');
  fb.textContent = '';
  fb.className = 'breakout-quiz-feedback';
}
</script>