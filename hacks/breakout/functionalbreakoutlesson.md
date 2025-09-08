
---
layout: opencs
author: Nikhil, Rohan, Pranav, Aditya, Shriya, Samhita
permalink: functionalbreakoutlesson
---

<div class="lesson-container">
  <!-- Sidebar -->
  {% if page.sidebar != false %}
  <aside class="lesson-sidebar">
    {% if page.sidebar_title %}
      <h3>{{ page.sidebar_title }}</h3>
    {% endif %}

    <!-- Lesson Links -->
    {% if page.lesson_links %}
    <h4>Lessons</h4>
    <ul>
      {% for link in page.lesson_links %}
        <li><a href="{{ site.baseurl }}{{ link.url }}">{{ link.text }}</a></li>
      {% endfor %}
    </ul>
    {% endif %}

    <!-- Time Tracker -->
    {% if page.enable_timer %}
    <h4>⏱️ Study Time</h4>
    <div class="time-display"><span id="total-time">0:00</span></div>
    <div id="timer-status" class="timer-status">Active</div>
    {% endif %}

    <!-- Progress -->
    {% if page.enable_progress %}
    <h4>📊 Your Progress</h4>
    <div class="progress-bar"><div class="progress-fill" id="lesson-progress"></div></div>
    <p id="progress-text">0% complete</p>
    <button id="reset-progress" class="btn small-btn">Reset Progress</button>
    {% endif %}

    <!-- Badges -->
    {% if page.enable_badges %}
    <h4>🏅 Your Badges</h4>
    <p id="badges">No badges yet...</p>
    {% endif %}
  </aside>
  {% endif %}

  <!-- Main Content -->
  <main class="lesson-content">
    <h1>{{ page.title }}</h1>
    <div class="post-content">
      {{ content }}
    </div>

    {% if page.enable_sandbox %}
    <hr>
    <div class="sandbox">
      <h3>🖥️ Try It Yourself</h3>
      <textarea id="sandbox-code">{{ page.sandbox_code | default: "// Type your code here" }}</textarea>
      <button id="run-sandbox">Run Code</button>
      <pre id="sandbox-output"></pre>
    </div>
    {% endif %}

    {% if page.enable_blackboard %}
    <hr>
    <div class="blackboard">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.js" integrity="sha512-hOJ0mwaJavqi11j0XoBN1PtOJ3ykPdP6lp9n29WVVVVZxgx9LO7kMwyyhaznGJ+kbZrDN1jFZMt2G9bxkOHWFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <canvas id="blackboard-canvas"></canvas>
      <p class="blackboard-description">Press 'w' for white, press `r` for red, press `b` for blue, and press `g` for green. Press `c` to clear blackboard. </p>
    </div>
    {% endif %}
  
    {% if page.enable_demo %}
    <!-- Note: utilizes script tags in the HTML file as cannot dynamically use information from frontmatter in lessonbase.js -->
    <hr>
    <div class="demo">
      <label class="demo-label">
        <input type="checkbox" id="demo-toggle"> Show code
      </label>
      <div id="demo-canvas-wrapper">
        <canvas id="demo-canvas"></canvas>
        <!-- Make sure you put the normal JS code in the "demo_runtime_code" field in the frontmatter. -->
        <script>
          // Will need const canvas = document.getElementById("demo-canvas"); to interact with the canvas
          {{ page.demo_runtime_code }}
        </script>
      </div>
      <!-- Instead of writing '<' or '>' for brackets, use '&lt;' and '&gt;' else the HTML will actually be run instead of displayed. -->
      <pre id="demo-code" style="display:none; max-width:820px; margin:8px auto; overflow:auto;">
        <code>
          <!-- Need to use multiline YAML content in the frontmatter for the javascript -->
          {{ page.demo_display_code | default: console.log("No demo code provided.") }}
        </code>
      </pre>
    </div>
    {% endif %}

    {% if page.enable_quiz %}
    <hr>
    <div class="lesson-quiz">
      <h3>📝 Quick Check</h3>
      <p>{{ page.quiz_prompt | default: "What did you learn?" }}</p>
      <textarea id="reflection-box"></textarea>
      <button id="save-reflection">Save</button>
      <p id="reflection-status"></p>
    </div>
    {% endif %}

    {% if page.resources %}
    <hr>
    <div class="resources">
      <h3>📚 Resources</h3>
      <ul>
        {% for r in page.resources %}
          <li><a href="{{ r.url }}" target="_blank">{{ r.text }}</a></li>
        {% endfor %}
      </ul>
    </div>
    {% endif %}

    {% if page.prev_url or page.next_url %}
    <div class="lesson-nav">
      {% if page.prev_url %}<a href="{{ page.prev_url }}" class="btn">⬅ Previous</a>{% endif %}
      {% if page.next_url %}<a href="{{ page.next_url }}" class="btn">Next ➡</a>{% endif %}
    </div>
    {% endif %}
  </main>
</div>

<!-- Load your shared scripts & styles -->
<script src="{{ '/assets/js/lessonbase.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/lessonbase.css' | relative_url }}">

<link
   rel="stylesheet"
   href="https://cdn.jsdelivr.net/npm/rippleui@1.12.1/dist/css/styles.css"
/>

<script src="https://cdn.tailwindcss.com"></script>

<style>
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.hub-title {
  display: block !important;
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 10px;
  margin-top: 1px !important;
}

.back-button {
  margin-bottom: 5px !important;
  text-align: center;
}

.card {
  background-color: white !important;
}

.card-header {
  color: black !important;
}

.text-content2 {
  color: black !important;
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>


<h1 class="hub-title">Functional Breakout (2-Part Mini Lesson)</h1>
<p class="back-button"><a href="{{site.baseurl}}/hacks" style="text-decoration:none;color:#007acc;font-weight:bold;">Click here to go back to main page</a></p>
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

<!-- ===================== Breakout Blocks: Checkpoint Quizzes ===================== -->
<div id="breakout-blocks-quizzes">
<style>
  #breakout-blocks-quizzes { --ok:#118a00; --bad:#b00020; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
  #breakout-blocks-quizzes .quiz-card{
    background:#fff;border:2px solid #ddd;border-radius:14px;
    padding:1.2rem;margin:1.2rem 0;box-shadow:0 4px 12px rgba(0,0,0,.05);
    color:#000;
  }
  #breakout-blocks-quizzes .quiz-title{font-size:1.2rem;font-weight:700;margin-bottom:.25rem}
  #breakout-blocks-quizzes .quiz-sub{margin-bottom:.9rem;color:#222}
  #breakout-blocks-quizzes .q{border-radius:10px;padding:.9rem;margin:.7rem 0;border:1px solid #eee}
  #breakout-blocks-quizzes .q:nth-child(odd){background:#f7f3ff;}  /* lilac */
  #breakout-blocks-quizzes .q:nth-child(even){background:#f3fff7;} /* mint  */
  #breakout-blocks-quizzes .prompt{font-weight:700;margin-bottom:.4rem}
  #breakout-blocks-quizzes .option{display:flex;gap:.45rem;align-items:flex-start;margin:.3rem 0}
  #breakout-blocks-quizzes button{
    background:#f7f7f7;color:#000;border:2px solid #000;
    border-radius:999px;padding:.45rem 1rem;
    font-weight:700;cursor:pointer;margin-top:.6rem;margin-right:.4rem
  }
  #breakout-blocks-quizzes button:hover{background:#000;color:#fff}
  #breakout-blocks-quizzes .feedback{margin-top:.6rem;font-weight:800}
  #breakout-blocks-quizzes .feedback.ok{color:var(--ok)}
  #breakout-blocks-quizzes .feedback.bad{color:var(--bad)}
  #breakout-blocks-quizzes code{
    background:#f4f4f4;color:#000;padding:2px 5px;border-radius:4px
  }
</style>

  <!-- Quiz A: Lesson 1 — Paddle & Base Blocks -->
  <div class="quiz-card" data-quiz="A">
    <div class="quiz-title">Lesson 1 Checkpoint</div>
    <div class="quiz-sub">Paddle setup, keyboard input, and bounds</div>

    <div class="q">
      <div class="prompt">1) Which variables track keyboard input for moving the paddle?</div>
      <label class="option"><input type="checkbox" value="rightPressed">rightPressed</label>
      <label class="option"><input type="checkbox" value="leftPressed">leftPressed</label>
      <label class="option"><input type="checkbox" value="paddleHeight">paddleHeight</label>
      <label class="option"><input type="checkbox" value="paddleWidth">paddleWidth</label>
    </div>

    <div class="q">
      <div class="prompt">2) What prevents the paddle from leaving the canvas?</div>
      <label class="option"><input type="radio" name="A2">Increasing <code>paddleWidth</code> when near the edge</label>
      <label class="option"><input type="radio" name="A2">Conditional checks on <code>paddleX</code> against 0 and <code>canvas.width - paddleWidth</code></label>
      <label class="option"><input type="radio" name="A2">Calling <code>ctx.closePath()</code> in <code>drawPaddle()</code></label>
    </div>

    <div class="q">
      <div class="prompt">3) Which events are used to update movement flags?</div>
      <label class="option"><input type="checkbox" value="keydown">keydown</label>
      <label class="option"><input type="checkbox" value="keyup">keyup</label>
      <label class="option"><input type="checkbox" value="wheel">wheel</label>
      <label class="option"><input type="checkbox" value="resize">resize</label>
    </div>

    <button class="check">Check Answers</button>
    <button class="clear">Clear</button>
    <div class="feedback"></div>
  </div>

  <!-- Quiz B: Lesson 2 — Power-Up Block + Timer -->
  <div class="quiz-card" data-quiz="B">
    <div class="quiz-title">Lesson 2 Checkpoint</div>
    <div class="quiz-sub">Spawning, catching, and timing a power-up</div>

    <div class="q">
      <div class="prompt">1) When a power-up brick is hit, what happens immediately?</div>
      <label class="option"><input type="radio" name="B1">All bricks in the row disappear</label>
      <label class="option"><input type="radio" name="B1">A falling power-up object is pushed into <code>powerUps</code></label>
      <label class="option"><input type="radio" name="B1">Ball speed is permanently doubled</label>
    </div>

    <div class="q">
      <div class="prompt">2) What effect is applied when the paddle catches the power-up in the sample code?</div>
      <label class="option"><input type="radio" name="B2">The paddle becomes narrower</label>
      <label class="option"><input type="radio" name="B2">The paddle becomes wider temporarily</label>
      <label class="option"><input type="radio" name="B2">The ball changes color</label>
    </div>

    <div class="q">
      <div class="prompt">3) Which variables manage the power-up’s duration?</div>
      <label class="option"><input type="checkbox" value="activePowerUp">activePowerUp</label>
      <label class="option"><input type="checkbox" value="powerUpTimer">powerUpTimer</label>
      <label class="option"><input type="checkbox" value="powerUpDuration">powerUpDuration</label>
      <label class="option"><input type="checkbox" value="basePaddleWidth">basePaddleWidth</label>
    </div>

    <div class="q">
      <div class="prompt">4) What UI element communicates remaining time to the player?</div>
      <label class="option"><input type="radio" name="B4">A vertical bar that fills/shrinks</label>
      <label class="option"><input type="radio" name="B4">A blinking paddle outline</label>
      <label class="option"><input type="radio" name="B4">An alert popup every second</label>
    </div>

    <button class="check">Check Answers</button>
    <button class="clear">Clear</button>
    <div class="feedback"></div>
  </div>

  <!-- Quiz C: Interactive Demos — Ball Bouncing Logic -->
  <div class="quiz-card" data-quiz="C">
    <div class="quiz-title">Demos Checkpoint</div>
    <div class="quiz-sub">Ball bouncing conditions</div>

    <div class="q">
      <div class="prompt">1) Which condition flips the ball’s horizontal velocity?</div>
      <label class="option"><input type="radio" name="C1"><code>bx + br &gt; canvas.width || bx - br &lt; 0</code></label>
      <label class="option"><input type="radio" name="C1"><code>by - br &lt; 0</code></label>
      <label class="option"><input type="radio" name="C1"><code>by + br &gt; canvas.height - paddleHeight</code></label>
    </div>

    <div class="q">
      <div class="prompt">2) In the Paddle + Ball demo, what causes a bounce off the paddle?</div>
      <label class="option"><input type="radio" name="C2">Reaching the exact center of the canvas</label>
      <label class="option"><input type="radio" name="C2">Ball’s bottom touching paddle’s top while x is between paddle edges</label>
      <label class="option"><input type="radio" name="C2">Calling <code>ctx.closePath()</code> after drawing the paddle</label>
    </div>

    <button class="check">Check Answers</button>
    <button class="clear">Clear</button>
    <div class="feedback"></div>
  </div>

  <!-- Quiz D: Mini Breakout — Bricks & Collision -->
  <div class="quiz-card" data-quiz="D">
    <div class="quiz-title">Mini Breakout Checkpoint</div>
    <div class="quiz-sub">Brick grid and collision clearing</div>

    <div class="q">
      <div class="prompt">1) How are brick positions assigned each frame in the sample?</div>
      <label class="option"><input type="radio" name="D1">They are randomized every loop</label>
      <label class="option"><input type="radio" name="D1">Computed from row/column indices using offsets and padding, then stored to each brick’s <code>x,y</code></label>
      <label class="option"><input type="radio" name="D1">Hardcoded pixel coordinates for each brick</label>
    </div>

    <div class="q">
      <div class="prompt">2) What happens when the ball’s position overlaps a brick’s rectangle?</div>
      <label class="option"><input type="radio" name="D2">Vertical velocity inverts and the brick’s <code>status</code> becomes 0</label>
      <label class="option"><input type="radio" name="D2">The ball teleports to center</label>
      <label class="option"><input type="radio" name="D2">All bricks immediately reset</label>
    </div>

    <div class="q">
      <div class="prompt">3) Select all parameters that define the brick layout grid:</div>
      <label class="option"><input type="checkbox" value="rowCount">rowCount</label>
      <label class="option"><input type="checkbox" value="colCount">colCount</label>
      <label class="option"><input type="checkbox" value="bw">bw (brick width)</label>
      <label class="option"><input type="checkbox" value="bt">bt (top offset)</label>
      <label class="option"><input type="checkbox" value="gravity">gravity</label>
    </div>

    <button class="check">Check Answers</button>
    <button class="clear">Clear</button>
    <div class="feedback"></div>
  </div>
</div>

<script>
/* Answer key for Breakout Blocks quizzes */
(function(){
  const key = {
    A: {
      multi1: ["rightPressed","leftPressed"],
      single2: "Conditional checks on paddleX against 0 and canvas.width - paddleWidth",
      multi3: ["keydown","keyup"]
    },
    B: {
      single1: "A falling power-up object is pushed into powerUps",
      single2: "The paddle becomes wider temporarily",
      multi3: ["activePowerUp","powerUpTimer","powerUpDuration"],
      single4: "A vertical bar that fills/shrinks"
    },
    C: {
      single1: "bx + br > canvas.width || bx - br < 0",
      single2: "Ball’s bottom touching paddle’s top while x is between paddle edges"
    },
    D: {
      single1: "Computed from row/column indices using offsets and padding, then stored to each brick’s x,y",
      single2: "Vertical velocity inverts and the brick’s status becomes 0",
      multi3: ["rowCount","colCount","bw","bt"]
    }
  };

  function textOf(label){
    return label.textContent.replace(/\s+/g,' ').trim();
  }

  function getCheckedValues(scope, selector){
    return [...scope.querySelectorAll(selector)]
      .filter(i=>i.checked)
      .map(i=>i.value || textOf(i.parentNode));
  }

  function arraysEqual(a,b){
    const A=[...a].sort(); const B=[...b].sort();
    return A.length===B.length && A.every((v,i)=>v===B[i]);
  }

  document.querySelectorAll('#breakout-blocks-quizzes .quiz-card').forEach(card=>{
    const id = card.dataset.quiz;

    card.querySelector('.check').addEventListener('click', ()=>{
      let ok = true;

      if(id==="A"){
        const chosen1 = getCheckedValues(card,'input[type=checkbox]');
        // Map Q1 & Q3 separately:
        const qBlocks = card.querySelectorAll('.q');
        const q1 = [...qBlocks[0].querySelectorAll('input[type=checkbox]:checked')].map(i=>i.value);
        const q2 = qBlocks[1].querySelector('input[type=radio]:checked');
        const q3 = [...qBlocks[2].querySelectorAll('input[type=checkbox]:checked')].map(i=>i.value);

        if(!arraysEqual(q1, key.A.multi1)) ok = false;
        if(!q2 || textOf(q2.parentNode) !== key.A.single2) ok = false;
        if(!arraysEqual(q3, key.A.multi3)) ok = false;
      }

      if(id==="B"){
        const qBlocks = card.querySelectorAll('.q');
        const b1 = qBlocks[0].querySelector('input[type=radio]:checked');
        const b2 = qBlocks[1].querySelector('input[type=radio]:checked');
        const b3 = [...qBlocks[2].querySelectorAll('input[type=checkbox]:checked')].map(i=>i.value);
        const b4 = qBlocks[3].querySelector('input[type=radio]:checked');

        if(!b1 || textOf(b1.parentNode)!==key.B.single1) ok=false;
        if(!b2 || textOf(b2.parentNode)!==key.B.single2) ok=false;
        if(!arraysEqual(b3, key.B.multi3)) ok=false;
        if(!b4 || textOf(b4.parentNode)!==key.B.single4) ok=false;
      }

      if(id==="C"){
        const qBlocks = card.querySelectorAll('.q');
        const c1 = qBlocks[0].querySelector('input[type=radio]:checked');
        const c2 = qBlocks[1].querySelector('input[type=radio]:checked');

        if(!c1 || textOf(c1.parentNode)!==key.C.single1) ok=false;
        if(!c2 || textOf(c2.parentNode)!==key.C.single2) ok=false;
      }

      if(id==="D"){
        const qBlocks = card.querySelectorAll('.q');
        const d1 = qBlocks[0].querySelector('input[type=radio]:checked');
        const d2 = qBlocks[1].querySelector('input[type=radio]:checked');
        const d3 = [...qBlocks[2].querySelectorAll('input[type=checkbox]:checked')].map(i=>i.value);

        if(!d1 || textOf(d1.parentNode)!==key.D.single1) ok=false;
        if(!d2 || textOf(d2.parentNode)!==key.D.single2) ok=false;
        if(!arraysEqual(d3, key.D.multi3)) ok=false;
      }

      const fb = card.querySelector('.feedback');
      fb.textContent = ok ? "✅ Correct!" : "❌ Try again.";
      fb.className = "feedback " + (ok ? "ok" : "bad");
    });

    card.querySelector('.clear').addEventListener('click', ()=>{
      card.querySelectorAll('input').forEach(i=>{ i.checked=false; });
      const fb = card.querySelector('.feedback');
      fb.textContent = "";
      fb.className = "feedback";
    });
  });
})();
</script>
<!-- =================== /End Breakout Blocks: Checkpoint Quizzes =================== -->