---
layout: lessonbase
title: End of Lesson Quiz
description: Test your knowledge with a custom quiz after finishing the Snake lessons
type: issues
comments: true
permalink: /snake/lesson/quiz

sidebar_title: "🐍 Snake Lessons"
lesson_links:
  - { text: "Lesson 1: Frontend", url: "/snake/lesson/frontend" }
  - { text: "Lesson 2: Programming", url: "/snake/lesson/oop" }
  - { text: "Lesson 3: Problem Solving", url: "/snake/lesson/problem-solving" }
  - { text: "End of Lesson Quiz", url: "/snake/lesson/quiz" }
  - { text: "Future References", url: "/snake/lesson/future-references" }

enable_timer: true
enable_progress: true
progress_total: 5
enable_badges: true
lesson_key: "quiz"
lesson_badges:
- "quiz"
enable_quiz: true
---

<div class="post">
<header class="post-header">
<h1 class="post-title">🎯 End of Lesson Quiz</h1>
<p class="post-meta">Check your understanding of frontend, JavaScript, and web concepts used in Snake.</p>
</header>

<article class="post-content">

<div class="quiz-container">
  <div class="quiz-header">
    <h2>Custom Snake Quiz</h2>
  </div>

  <form id="quizForm">

    <div class="question">
      <div class="question-title">1. What is the capital of France?</div>
      <label><input type="radio" name="q1" value="a"> a) London</label>
      <label><input type="radio" name="q1" value="b"> b) Paris</label>
      <label><input type="radio" name="q1" value="c"> c) Berlin</label>
      <label><input type="radio" name="q1" value="d"> d) Madrid</label>
    </div>

    <div class="question">
      <div class="question-title">2. Which programming language is known for web development?</div>
      <label><input type="radio" name="q2" value="a"> a) Python</label>
      <label><input type="radio" name="q2" value="b"> b) JavaScript</label>
      <label><input type="radio" name="q2" value="c"> c) C++</label>
      <label><input type="radio" name="q2" value="d"> d) Java</label>
    </div>

    <div class="question">
      <div class="question-title">3. What does HTML stand for?</div>
      <label><input type="radio" name="q3" value="a"> a) HyperText Markup Language</label>
      <label><input type="radio" name="q3" value="b"> b) High Tech Modern Language</label>
      <label><input type="radio" name="q3" value="c"> c) Home Tool Markup Language</label>
      <label><input type="radio" name="q3" value="d"> d) Hyperlink and Text Markup Language</label>
    </div>

    <div class="question">
      <div class="question-title">4. Which of these is a CSS framework?</div>
      <label><input type="radio" name="q4" value="a"> a) React</label>
      <label><input type="radio" name="q4" value="b"> b) Angular</label>
      <label><input type="radio" name="q4" value="c"> c) Bootstrap</label>
      <label><input type="radio" name="q4" value="d"> d) Node.js</label>
      <label><input type="radio" name="q4" value="e"> e) Express</label>
    </div>

    <div class="question">
      <div class="question-title">5. What is the result of 2 + 2?</div>
      <label><input type="radio" name="q5" value="a"> a) 3</label>
      <label><input type="radio" name="q5" value="b"> b) 4</label>
      <label><input type="radio" name="q5" value="c"> c) 5</label>
    </div>

    <div class="quiz-submit">
      <button type="button" class="quiz-button" onclick="checkAnswers()">Submit Quiz</button>
    </div>
    
  </form>

  <div id="result"></div>
</div>

</article>
</div>

<script>
function checkAnswers() {
  const answers = { q1: "b", q2: "b", q3: "a", q4: "c", q5: "b" };
  let score = 0;
  
  // Calculate score
  for (let key in answers) {
    const radios = document.getElementsByName(key);
    let selected = null;
    
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        selected = radios[i].value;
        break;
      }
    }
    
    if (selected === answers[key]) {
      score++;
    }
  }
  
  const total = Object.keys(answers).length;
  let message = "";
  let resultClass = "";
  
  if (score === total) {
    message = "🌟 Perfect! You mastered these concepts!";
    resultClass = "result-perfect";
  } else if (score >= Math.ceil(total * 0.7)) {
    message = "👍 Good job! Review a bit more to nail it.";
    resultClass = "result-good";
  } else {
    message = "📘 Keep practicing — try reviewing the material again.";
    resultClass = "result-needs-work";
  }
  
  const resultDiv = document.getElementById("result");
  resultDiv.className = resultClass;
  resultDiv.innerHTML = "Your Score: " + score + " / " + total + "<br>" + message;
  resultDiv.style.display = "block";
  
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
</script>
