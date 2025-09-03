---
layout: post
breadcrumb: True
toc: True
title: Jupyter Notebooks and JS
description: Further your understanding off Javascript setup and Juypter Notebooks. This lesson will test all your understanding, with questions for you to type responses. 
categories: ['GitHub Pages']
permalink: /github/pages/jp
comments: True
---

<h2>Lesson 1: Jupyter Notebooks & JavaScript</h2>

<h3>Introduction</h3>
<p>
This lesson explores the integration of JavaScript within Jupyter Notebooks, a powerful combination for interactive data exploration and web development. 
We will cover how to execute JavaScript code directly within Jupyter cells and manage related files within a GitHub Pages environment.
</p>

<hr>

<div class="frq-box">
  <b>FRQ 1:</b> Why might combining JavaScript with Jupyter Notebooks be useful for interactive projects?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<h3>Running JavaScript in Jupyter Notebooks</h3>
<p>
Jupyter Notebooks, while primarily known for Python, can execute various languages through kernels. 
For JavaScript, this typically involves using an IJavaScript kernel or leveraging the <code>%%javascript</code> magic command in a standard Python kernel environment, 
which allows for direct execution of JavaScript code within a cell.
</p>

<p>To execute JavaScript in a Jupyter Notebook, follow these steps:</p>
<ol>
<li><b>Open Developer Tools:</b> In VSCode, navigate to <code>Help > Toggle Developer Tools</code>.</li>
<li><b>Access the Console:</b> Select the <code>Console</code> tab to view outputs, errors, and warnings.</li>
<li><b>Clear Console (Optional):</b> Click the Clear Console button to have a clean output.</li>
<li><b>Execute Code:</b> Click the Play button next to the Jupyter cell containing JavaScript code.</li>
</ol>

<div class="frq-box">
  <b>FRQ 2:</b> What might happen if you do not check the console after executing JavaScript in a notebook?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<h3>Example: Interactive Jokes Application</h3>
<p>
JavaScript can display random jokes, demonstrating arrays and basic functions.
</p>

<h4>Programmer Jokes</h4>
<pre><code>%%javascript
var compsci_joke_list = [
    { joke: "Why do programmers prefer dark mode? Because light attracts bugs.", complexity: "1" },
    { joke: "Why do Java developers wear glasses? Because they don't see sharp.", complexity: "2" },
    { joke: "How many programmers does it take to change a light bulb? None, that's a hardware problem.", complexity: "1" },
    { joke: "Why do Python programmers prefer snake_case? Because they can't C.", complexity: "2" },
    { joke: "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.", complexity: "3" },
    { joke: "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.", complexity: "3" },
    { joke: "Why did the programmer quit his job? Because he didn't get arrays.", complexity: "O(n)" },
    { joke: "Why do Linux programmers prefer using the terminal? Because they don't like Windows.", complexity: "1" }
];
var randomIndex = Math.floor(Math.random() * compsci_joke_list.length);
var selectedJoke = compsci_joke_list[randomIndex];
console.log("Joke #" + (randomIndex + 1) + ": " + selectedJoke.joke + " (Complexity: " + selectedJoke.complexity + ")");
</code></pre>

<div class="frq-box">
  <b>FRQ 3:</b> Why might you choose an array of objects for the programmer jokes instead of just strings?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<h4>Accountant Jokes</h4>
<pre><code>%%javascript
var accounting_joke_list = [
    "Why did the accountant cross the road? To bore the people on the other side.",
    "What do accountants do when they're constipated? They work it out with a pencil.",
    "How does an accountant stay out of debt? He learns to act his wage.",
    "Why did the accountant stare at his glass of orange juice for three hours? Because on the box it said 'concentrate'.",
    "Why did the accountant get promoted? Because he knew how to balance his work and play.",
    "Why did the accountant get a job at the bakery? Because he was good at making dough.",
    "Why did the accountant get a job at the zoo? Because he was good with cheetahs.",
    "Why did the accountant get a job at the library? Because he was good at keeping books.",
    "Why did the accountant get a job at the circus? Because he was good at juggling numbers.",
    "Why did the accountant get a job at the gym? Because he was good at working out the numbers.",
    "Why did the accountant get a job at the farm? Because he was good at counting the chickens before they hatched."
];
var randomIndex = Math.floor(Math.random() * accounting_joke_list.length);
console.log("Joke #" + (randomIndex + 1) + ": " + accounting_joke_list[randomIndex]);
</code></pre>

<div class="frq-box">
  <b>FRQ 4:</b> Compare the structure of programmer jokes vs accountant jokes. What benefits does each structure provide?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<h3>File Management in GitHub Pages</h3>
<p>
Place all <code>.ipynb</code> files in the <code>_notebooks</code> directory. 
They are converted to Markdown and then HTML for web display.
</p>

<ol>
<li><b>Clone the Repository:</b> <code>git clone [URL]</code></li>
<li><b>Pull Latest Changes:</b> <code>git pull</code></li>
<li><b>Open in VSCode:</b> Navigate to the project directory and run <code>code .</code></li>
<li><b>Drag and Drop Files:</b> Move <code>.ipynb</code> files into the <code>_notebooks</code> directory</li>
</ol>

<div class="frq-box">
  <b>FRQ 5:</b> Why is proper file organization important for GitHub Pages deployment?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<h3>Best Practices</h3>
<ul>
<li><b>Organization:</b> Keep notebooks well-organized and create subdirectories if needed.</li>
<li><b>Frontmatter:</b> Include YAML frontmatter for permalinks and layouts.</li>
<li><b>Conversion:</b> Understand notebooks are converted to Markdown and then HTML.</li>
<li><b>Testing:</b> Test locally before pushing to GitHub.</li>
</ul>

<div class="frq-box">
  <b>FRQ 6:</b> How can frontmatter help with notebook deployment and web page linking?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<style>
.frq-box {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;
  background: #f9f9f9;
}
textarea {
  font-family: inherit;
  font-size: 1rem;
  padding: 6px;
}
</style>

<script>
// Auto-save FRQ responses into localStorage
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".frq-box textarea").forEach((textarea, index) => {
    const key = "frq_answer_" + index;

    // Load saved value if it exists
    const saved = localStorage.getItem(key);
    if (saved) {
      textarea.value = saved;
    }

    // Save on input
    textarea.addEventListener("input", () => {
      localStorage.setItem(key, textarea.value);
    });
  });
});
</script>