
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
      /* Lesson System Base Styles */
      .lesson-container {
          display: flex;
          min-height: 100vh;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }

      .lesson-sidebar {
          width: 280px;
          background: #f8fafc;
          padding: 1.5rem;
          border-right: 2px solid #e2e8f0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
      }

      .lesson-sidebar h3 {
          color: #1e293b;
          font-weight: 700;
          margin-bottom: 1rem;
      }

      .lesson-sidebar h4 {
          color: #475569;
          font-weight: 600;
          margin: 1.5rem 0 0.5rem 0;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.025em;
      }

      .lesson-sidebar ul {
          list-style: none;
          padding: 0;
      }

      .lesson-sidebar li {
          margin: 0.5rem 0;
      }

      .lesson-sidebar a {
          color: #3b82f6;
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          display: block;
          transition: background-color 0.2s;
      }

      .lesson-sidebar a:hover {
          background: #dbeafe;
      }

      .lesson-content {
          margin-left: 280px;
          padding: 2rem;
          flex: 1;
          max-width: calc(100% - 280px);
      }

      /* Timer Styles */
      .time-display {
          background: #10b981;
          color: white;
          padding: 0.75rem;
          border-radius: 0.5rem;
          text-align: center;
          font-weight: 700;
          font-size: 1.125rem;
      }

      .timer-status {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #059669;
          font-weight: 600;
      }

      /* Progress Bar Styles */
      .progress-bar {
          width: 100%;
          height: 20px;
          background: #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
      }

      .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          width: 0%;
          transition: width 0.3s ease;
      }

      #progress-text {
          text-align: center;
          margin: 0.5rem 0;
          font-weight: 600;
          color: #374151;
      }

      /* Button Styles */
      .btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s;
          text-decoration: none;
          display: inline-block;
      }

      .btn:hover {
          background: #2563eb;
      }

      .small-btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
      }

      .btn-secondary {
          background: #6b7280;
      }

      .btn-secondary:hover {
          background: #4b5563;
      }

      /* Card Styles */
      .cards-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin: 2rem 0;
      }

      .card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
      }

      .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
      }

      .card-header {
          color: #1e293b;
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
      }

      .text-content2 {
          color: #64748b;
          margin-bottom: 1rem;
      }

      .card-footer {
          margin-top: 1rem;
      }

      /* Hub Title */
      .hub-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 800;
          color: #1e293b;
          margin: 1rem 0;
      }

      .back-button {
          text-align: center;
          margin-bottom: 1rem;
      }

      /* Quiz Styles */
      #breakout-blocks-quizzes {
          --ok: #10b981;
          --bad: #ef4444;
      }

      .quiz-card {
          background: #fff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      .quiz-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
      }

      .quiz-sub {
          color: #64748b;
          margin-bottom: 1rem;
      }

      .q {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem 0;
      }

      .q:nth-child(odd) {
          background: #faf5ff;
      }

      .q:nth-child(even) {
          background: #f0fdf4;
      }

      .prompt {
          font-weight: 700;
          color: #374151;
          margin-bottom: 0.75rem;
      }

      .option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0.5rem 0;
          color: #4b5563;
      }

      .option input {
          margin-right: 0.5rem;
      }

      .feedback {
          margin-top: 1rem;
          font-weight: 600;
          padding: 0.75rem;
          border-radius: 0.5rem;
      }

      .feedback.ok {
          color: var(--ok);
          background: #dcfce7;
      }

      .feedback.bad {
          color: var(--bad);
          background: #fef2f2;
      }

      code {
          background: #f1f5f9;
          color: #475569;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
      }

      /* Mermaid diagram styling */
      .mermaid {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
          .lesson-sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease;
          }
          
          .lesson-content {
              margin-left: 0;
              max-width: 100%;
          }
          
          .cards-container {
              grid-template-columns: 1fr;
          }
      }

      @media (max-width: 768px) {
          .lesson-content {
              padding: 1rem;
          }
          
          .hub-title {
              font-size: 1.8rem;
          }
      }

      /* Badge Styles */
      #badges {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 0.5rem;
          padding: 0.75rem;
          color: #92400e;
          font-weight: 600;
      }

      /* Mobile sidebar toggle */
      .sidebar-toggle {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1000;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
      }

      @media (max-width: 1024px) {
          .sidebar-toggle {
              display: block;
          }
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