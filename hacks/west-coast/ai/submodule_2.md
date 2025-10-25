---
layout: post
title: "Submodule 2"
description: "Submodule 2 of AI Usage Mini-Quest"
permalink: /west-coast/ai/submodule_2/
parent: "AI Usage"
team: "Thinkers"
submodule: 2
categories: [CSP, Submodule, AIUsage]
tags: [ai, submodule, thinkers]
author: "Thinkers Team"
date: 2025-10-21
---

# Submodule 2: How LLM Memory Works: Interactive Visual Guide

Learn how Large Language Models like GPT and Claude handle memory through interactive visualizations!

---

## Part 1: The Context Window - LLM's "Working Memory"

LLMs don't have memory like humans. Instead, they have a **context window** - think of it as a sliding window that can see a limited amount of text at once.

### Interactive Demo: Context Window Visualization

<html>
<head>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background: #121212 !important;
  }
  .demo-container {
    background: #121212 !important;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin: 20px 0;
  }
  .conversation {
    background: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    max-height: 400px;
    overflow-y: auto;
  }
  .message {
    background: white;
    padding: 12px 16px;
    margin: 8px 0;
    border-radius: 8px;
    border-left: 4px solid #2196F3;
    transition: all 0.3s;
  }
  .message.in-context {
    background: #e3f2fd;
    border-left-color: #2196F3;
    box-shadow: 0 2px 4px rgba(33,150,243,0.2);
  }
  .message.out-of-context {
    background: #ffebee;
    border-left-color: #f44336;
    opacity: 0.5;
  }
  .message.current {
    background: #fff9c4;
    border-left-color: #FFC107;
    font-weight: bold;
  }
  .controls {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  button {
    background: #2196F3;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
  }
  button:hover {
    background: #1976D2;
  }
  button.secondary {
    background: #757575;
  }
  button.secondary:hover {
    background: #616161;
  }
  .stats {
    background: #263238;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    font-family: 'Courier New', monospace;
  }
  .stat-row {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    padding: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
  }
  .stat-label {
    color: #81d4fa;
  }
  .stat-value {
    color: #a5d6a7;
    font-weight: bold;
  }
  .progress-bar {
    width: 100%;
    height: 30px;
    background: #e0e0e0;
    border-radius: 15px;
    overflow: hidden;
    margin: 10px 0;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    transition: width 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }
  .legend {
    display: flex;
    gap: 20px;
    margin: 15px 0;
    flex-wrap: wrap;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .legend-box {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
  input[type="range"] {
    width: 100%;
    margin: 10px 0;
  }
</style>
</head>
<body>

<div class="demo-container">
  <h2>🪟 Context Window Simulator</h2>
  <p>This demonstrates how an LLM can only "see" a limited number of messages at once. Older messages fall out of the context window.</p>
  
  <div>
    <label><strong>Context Window Size: <span id="window-size-display">5</span> messages</strong></label>
    <input type="range" id="window-size" min="3" max="10" value="5">
  </div>
  
  <div class="controls">
    <button onclick="addMessage()">📝 Add New Message</button>
    <button onclick="processMessage()" style="background: #4CAF50;">🤖 LLM Processes</button>
    <button onclick="resetConversation()" class="secondary">🔄 Reset</button>
  </div>
  
  <div class="legend">
    <div class="legend-item">
      <div class="legend-box" style="background: #e3f2fd; border: 2px solid #2196F3;"></div>
      <span>In Context (LLM can see)</span>
    </div>
    <div class="legend-item">
      <div class="legend-box" style="background: #ffebee; border: 2px solid #f44336;"></div>
      <span>Out of Context (Forgotten)</span>
    </div>
    <div class="legend-item">
      <div class="legend-box" style="background: #fff9c4; border: 2px solid #FFC107;"></div>
      <span>Current Processing</span>
    </div>
  </div>
  
  <div class="conversation" id="conversation"></div>
  
  <div class="stats">
    <div class="stat-row">
      <span class="stat-label">Total Messages:</span>
      <span class="stat-value" id="total-messages">0</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">In Context Window:</span>
      <span class="stat-value" id="in-context">0</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Forgotten (Out of Context):</span>
      <span class="stat-value" id="out-context">0</span>
    </div>
    <div>
      <div style="margin-top: 15px; color: #81d4fa;">Context Usage:</div>
      <div class="progress-bar">
        <div class="progress-fill" id="context-progress">0%</div>
      </div>
    </div>
  </div>
</div>

<script>
let messages = [];
let messageCounter = 0;
let contextWindowSize = 5;
let isProcessing = false;

const sampleMessages = [
  "Hello! My name is Alice.",
  "What's the weather like today?",
  "I have a dog named Max.",
  "Can you help me with my homework?",
  "My favorite color is blue.",
  "I live in San Francisco.",
  "What's 2 + 2?",
  "Tell me a joke!",
  "I'm learning JavaScript.",
  "How does memory work in LLMs?",
  "Do you remember my name?",
  "What did I say about my dog?",
  "I forgot to mention I also have a cat.",
  "What was my favorite color again?",
];

function updateContextWindow() {
  contextWindowSize = parseInt(document.getElementById('window-size').value);
  document.getElementById('window-size-display').textContent = contextWindowSize;
  renderConversation();
}

function addMessage() {
  if (isProcessing) return;
  
  const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
  messageCounter++;
  
  messages.push({
    id: messageCounter,
    text: randomMessage,
    timestamp: new Date().toLocaleTimeString()
  });
  
  renderConversation();
}

function renderConversation() {
  const container = document.getElementById('conversation');
  const totalMessages = messages.length;
  const startIndex = Math.max(0, totalMessages - contextWindowSize);
  
  container.innerHTML = '';
  
  messages.forEach((msg, index) => {
    const div = document.createElement('div');
    div.className = 'message';
    
    if (index >= startIndex) {
      div.classList.add('in-context');
    } else {
      div.classList.add('out-of-context');
    }
    
    div.innerHTML = `
      <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
        Message #${msg.id} - ${msg.timestamp}
      </div>
      <div>${msg.text}</div>
    `;
    
    container.appendChild(div);
  });
  
  // Update stats
  const inContext = Math.min(totalMessages, contextWindowSize);
  const outContext = Math.max(0, totalMessages - contextWindowSize);
  
  document.getElementById('total-messages').textContent = totalMessages;
  document.getElementById('in-context').textContent = inContext;
  document.getElementById('out-context').textContent = outContext;
  
  const contextUsage = totalMessages > 0 ? (inContext / contextWindowSize * 100).toFixed(0) : 0;
  const progressBar = document.getElementById('context-progress');
  progressBar.style.width = `${Math.min(contextUsage, 100)}%`;
  progressBar.textContent = `${contextUsage}%`;
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

async function processMessage() {
  if (messages.length === 0 || isProcessing) return;
  
  isProcessing = true;
  const totalMessages = messages.length;
  const startIndex = Math.max(0, totalMessages - contextWindowSize);
  
  // Highlight each message in context
  for (let i = startIndex; i < totalMessages; i++) {
    const allMessages = document.querySelectorAll('.message');
    allMessages[i].classList.add('current');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    allMessages[i].classList.remove('current');
  }
  
  // Add LLM response
  messageCounter++;
  messages.push({
    id: messageCounter,
    text: `🤖 I processed ${Math.min(contextWindowSize, totalMessages)} messages. I can only see the most recent ${contextWindowSize} messages!`,
    timestamp: new Date().toLocaleTimeString()
  });
  
  renderConversation();
  isProcessing = false;
}

function resetConversation() {
  messages = [];
  messageCounter = 0;
  renderConversation();
}

// Initialize
document.getElementById('window-size').addEventListener('input', updateContextWindow);
renderConversation();

// Add a few initial messages
for (let i = 0; i < 3; i++) {
  addMessage();
}
</script>

</body>
</html>


---

## Part 2: Attention Mechanism - How LLMs "Focus"

The attention mechanism allows LLMs to weigh the importance of different tokens (words/pieces) in the context. Not all words are equally relevant!

### Interactive Demo: Attention Weights Visualizer

<html>
<head>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background: #f5f5f5;
  }
  .demo-container {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin: 20px 0;
  }
  .sentence-input {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    margin: 15px 0;
    font-family: inherit;
  }
  .word-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 30px 0;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    min-height: 100px;
    align-items: center;
    justify-content: center;
  }
  .word {
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    transition: all 0.3s;
    cursor: pointer;
    border: 2px solid transparent;
    position: relative;
  }
  .word:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  .word.selected {
    border: 2px solid #2196F3;
    box-shadow: 0 0 20px rgba(33, 150, 243, 0.3);
  }
  .attention-score {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #FF5722;
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }
  .controls {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  button {
    background: #2196F3;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
  }
  button:hover {
    background: #1976D2;
  }
  .info-box {
    background: #e3f2fd;
    border-left: 4px solid #2196F3;
    padding: 20px;
    border-radius: 4px;
    margin: 20px 0;
  }
  .query-word {
    background: #fff9c4;
    padding: 8px 16px;
    border-radius: 6px;
    display: inline-block;
    font-weight: bold;
    border: 2px solid #FFC107;
  }
  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
  }
  .heatmap-gradient {
    width: 200px;
    height: 30px;
    background: linear-gradient(90deg, 
      rgba(255,255,255,0.3),
      rgba(76, 175, 80, 0.5),
      rgba(33, 150, 243, 0.7),
      rgba(156, 39, 176, 0.9)
    );
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  .connection-line {
    position: absolute;
    height: 2px;
    background: rgba(33, 150, 243, 0.5);
    transform-origin: left;
    pointer-events: none;
  }
</style>
</head>
<body>

<div class="demo-container">
  <h2>🎯 Attention Mechanism Visualizer</h2>
  <p>Attention allows the LLM to determine which words in the context are most relevant to the current word being processed.</p>
  
  <div>
    <label><strong>Enter a sentence:</strong></label>
    <input 
      type="text" 
      class="sentence-input" 
      id="sentence-input" 
      placeholder="The cat sat on the mat because it was comfortable"
      value="The cat sat on the mat because it was comfortable"
    >
  </div>
  
  <div class="controls">
    <button onclick="processAttention()">🧠 Calculate Attention</button>
    <button onclick="animateAttention()">▶️ Animate</button>
    <button onclick="loadExample(1)">Example 1</button>
    <button onclick="loadExample(2)">Example 2</button>
    <button onclick="loadExample(3)">Example 3</button>
  </div>
  
  <div class="info-box">
    <strong>💡 How it works:</strong><br>
    Click "Calculate Attention" to see how each word attends to other words. The intensity of the color shows the attention weight - stronger colors mean the word is paying more attention to that token.
    <br><br>
    Click on any word to see what it's paying attention to!
  </div>
  
  <div class="heatmap-legend">
    <span><strong>Attention Strength:</strong></span>
    <div class="heatmap-gradient"></div>
    <span>Low → High</span>
  </div>
  
  <div id="selected-word" style="margin: 15px 0; font-size: 18px;"></div>
  
  <div class="word-container" id="word-container">
    <p style="color: #999;">Enter a sentence and click "Calculate Attention" to begin</p>
  </div>
</div>

<script>
let words = [];
let attentionMatrix = [];
let selectedWordIndex = null;
let isAnimating = false;

const examples = {
  1: "The cat sat on the mat because it was comfortable",
  2: "Alice went to the store and she bought some apples",
  3: "When the sun sets the sky turns orange and red"
};

function loadExample(num) {
  document.getElementById('sentence-input').value = examples[num];
  processAttention();
}

function calculateAttentionWeights(queryIndex, words) {
  // Simplified attention calculation
  // In reality, this uses complex neural network computations
  const weights = [];
  const queryWord = words[queryIndex].toLowerCase();
  
  for (let i = 0; i < words.length; i++) {
    const keyWord = words[i].toLowerCase();
    
    // Simulate attention based on simple heuristics:
    // 1. Self-attention is high
    // 2. Pronouns attend to recent nouns
    // 3. Verbs attend to subjects
    // 4. Nearby words get some attention
    
    let weight = 0.1; // Base attention
    
    if (i === queryIndex) {
      weight = 0.95; // Strong self-attention
    } else {
      const distance = Math.abs(i - queryIndex);
      
      // Distance-based attention (closer = more attention)
      weight += Math.max(0, (10 - distance) / 20);
      
      // Pronoun attention to nouns
      if (['it', 'she', 'he', 'they', 'them'].includes(queryWord)) {
        if (['cat', 'dog', 'alice', 'store', 'sun', 'sky', 'mat'].includes(keyWord)) {
          weight += 0.5;
        }
      }
      
      // Verb attention to nearby nouns
      if (['sat', 'went', 'bought', 'sets', 'turns'].includes(queryWord)) {
        if (['cat', 'alice', 'sun', 'sky'].includes(keyWord)) {
          weight += 0.4;
        }
      }
      
      // Article attention to following nouns
      if (queryWord === 'the' && i === queryIndex + 1) {
        weight += 0.6;
      }
    }
    
    weights.push(Math.min(weight, 1.0));
  }
  
  return weights;
}

function processAttention() {
  const sentence = document.getElementById('sentence-input').value.trim();
  if (!sentence) return;
  
  words = sentence.split(' ').filter(w => w.length > 0);
  attentionMatrix = [];
  
  // Calculate attention weights for each word
  for (let i = 0; i < words.length; i++) {
    attentionMatrix.push(calculateAttentionWeights(i, words));
  }
  
  renderWords();
}

function getColorForAttention(attention) {
  // Map attention (0-1) to color
  if (attention < 0.2) return `rgba(255, 255, 255, ${0.3 + attention})`;
  if (attention < 0.4) return `rgba(76, 175, 80, ${attention})`;
  if (attention < 0.7) return `rgba(33, 150, 243, ${attention})`;
  return `rgba(156, 39, 176, ${attention})`;
}

function renderWords(highlightIndex = null) {
  const container = document.getElementById('word-container');
  container.innerHTML = '';
  
  words.forEach((word, index) => {
    const wordDiv = document.createElement('div');
    wordDiv.className = 'word';
    wordDiv.textContent = word;
    wordDiv.onclick = () => selectWord(index);
    
    if (highlightIndex !== null) {
      const attention = attentionMatrix[highlightIndex][index];
      wordDiv.style.background = getColorForAttention(attention);
      wordDiv.style.color = attention > 0.5 ? 'white' : 'black';
      
      if (attention > 0.3) {
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'attention-score';
        scoreDiv.textContent = Math.round(attention * 100);
        wordDiv.appendChild(scoreDiv);
      }
    } else {
      wordDiv.style.background = '#e0e0e0';
      wordDiv.style.color = 'black';
    }
    
    if (index === selectedWordIndex) {
      wordDiv.classList.add('selected');
    }
    
    container.appendChild(wordDiv);
  });
}

function selectWord(index) {
  selectedWordIndex = index;
  renderWords(index);
  
  const selectedDiv = document.getElementById('selected-word');
  selectedDiv.innerHTML = `
    <span class="query-word">"${words[index]}"</span> is paying attention to other words:
  `;
}

async function animateAttention() {
  if (words.length === 0) {
    processAttention();
  }
  
  if (isAnimating) return;
  isAnimating = true;
  
  for (let i = 0; i < words.length; i++) {
    selectedWordIndex = i;
    renderWords(i);
    
    const selectedDiv = document.getElementById('selected-word');
    selectedDiv.innerHTML = `
      <span class="query-word">"${words[i]}"</span> is paying attention to other words...
    `;
    
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  selectedWordIndex = null;
  renderWords();
  document.getElementById('selected-word').innerHTML = '';
  isAnimating = false;
}
</script>

</body>
</html>

---

## Part 3: Training vs Runtime - Two Types of "Memory"

LLMs have two phases: **training** (where they learn patterns) and **runtime** (where they use those patterns). They can't learn new facts during runtime!

### Interactive Demo: Training vs Runtime Simulator

<html>
<head>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background: #f5f5f5;
  }
  .demo-container {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin: 20px 0;
  }
  .phases {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  .phase-box {
    border: 3px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s;
  }
  .phase-box.active {
    border-color: #4CAF50;
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
  }
  .phase-box.training {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  .phase-box.runtime {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }
  .knowledge-base {
    background: #263238;
    color: #4CAF50;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    min-height: 200px;
    max-height: 300px;
    overflow-y: auto;
    margin: 15px 0;
  }
  .knowledge-item {
    padding: 8px;
    margin: 5px 0;
    background: rgba(76, 175, 80, 0.1);
    border-left: 3px solid #4CAF50;
    border-radius: 3px;
  }
  .controls {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  button {
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
    font-weight: 500;
  }
  .train-btn {
    background: #667eea;
    color: white;
  }
  .train-btn:hover {
    background: #5568d3;
  }
  .query-btn {
    background: #f093fb;
    color: white;
  }
  .query-btn:hover {
    background: #d87ae6;
  }
  .reset-btn {
    background: #757575;
    color: white;
  }
  .reset-btn:hover {
    background: #616161;
  }
  input[type="text"] {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    min-width: 200px;
  }
  .input-group {
    display: flex;
    gap: 10px;
    margin: 15px 0;
    align-items: center;
  }
  .response-box {
    background: #fff9c4;
    border: 2px solid #FFC107;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    min-height: 80px;
  }
  .stat-display {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }
  .stat-card {
    background: #e3f2fd;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .stat-number {
    font-size: 36px;
    font-weight: bold;
    color: #1976D2;
  }
  .stat-label {
    color: #666;
    margin-top: 8px;
  }
  .alert {
    background: #ffebee;
    border-left: 4px solid #f44336;
    padding: 15px;
    border-radius: 4px;
    margin: 15px 0;
  }
</style>
</head>
<body>

<div class="demo-container">
  <h2>🧠 Training vs Runtime: How LLMs "Learn"</h2>
  <p>This simulation shows the difference between training (when the model learns) and runtime (when it uses what it learned).</p>
  
  <div class="phases">
    <div class="phase-box training" id="training-phase">
      <h3>📚 Training Phase</h3>
      <p>Model learns patterns from data.<br>This happens BEFORE deployment.</p>
      <div class="input-group">
        <input type="text" id="training-input" placeholder="Teach the model a fact...">
        <button class="train-btn" onclick="trainModel()">Train</button>
      </div>
      <small>Example: "Paris is the capital of France"</small>
    </div>
    
    <div class="phase-box runtime" id="runtime-phase">
      <h3>⚡ Runtime Phase</h3>
      <p>Model answers using learned patterns.<br>Cannot learn new information!</p>
      <div class="input-group">
        <input type="text" id="query-input" placeholder="Ask the model a question...">
        <button class="query-btn" onclick="queryModel()">Ask</button>
      </div>
      <small>Example: "What is the capital of France?"</small>
    </div>
  </div>
  
  <div class="stat-display">
    <div class="stat-card">
      <div class="stat-number" id="training-count">0</div>
      <div class="stat-label">Facts Trained</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" id="query-count">0</div>
      <div class="stat-label">Queries Made</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" id="success-rate">0%</div>
      <div class="stat-label">Success Rate</div>
    </div>
  </div>
  
  <h3>💾 Model's Knowledge Base (From Training)</h3>
  <div class="knowledge-base" id="knowledge-base">
    <div style="color: #81d4fa;">// Model's learned knowledge appears here...</div>
    <div style="color: #666; margin-top: 10px;">// No training data yet. Use the training phase to teach the model!</div>
  </div>
  
  <h3>💬 Model Response</h3>
  <div class="response-box" id="response-box">
    <em style="color: #666;">Train the model or ask it a question to see responses...</em>
  </div>
  
  <div class="controls">
    <button class="train-btn" onclick="loadSampleData()">📖 Load Sample Dataset</button>
    <button class="reset-btn" onclick="resetModel()">🔄 Reset Model</button>
  </div>
</div>

<script>
let knowledgeBase = [];
let trainingCount = 0;
let queryCount = 0;
let successfulQueries = 0;

const sampleDataset = [
  "Paris is the capital of France",
  "The Earth orbits the Sun",
  "Water boils at 100 degrees Celsius",
  "JavaScript is a programming language",
  "The moon orbits the Earth",
  "Claude is an AI assistant made by Anthropic",
  "Python was created by Guido van Rossum",
  "The Pacific Ocean is the largest ocean"
];

function trainModel() {
  const input = document.getElementById('training-input').value.trim();
  if (!input) return;
  
  // Simulate training
  const trainingPhase = document.getElementById('training-phase');
  trainingPhase.classList.add('active');
  
  setTimeout(() => {
    knowledgeBase.push({
      text: input,
      timestamp: new Date().toLocaleTimeString(),
      id: trainingCount
    });
    
    trainingCount++;
    updateKnowledgeBase();
    updateStats();
    
    document.getElementById('training-input').value = '';
    document.getElementById('response-box').innerHTML = `
      <strong>✅ Training Complete!</strong><br>
      The model has learned: "${input}"<br>
      <small>This knowledge is now part of the model's parameters.</small>
    `;
    
    trainingPhase.classList.remove('active');
  }, 500);
}

function queryModel() {
  const query = document.getElementById('query-input').value.trim();
  if (!query) return;
  
  queryCount++;
  
  const runtimePhase = document.getElementById('runtime-phase');
  runtimePhase.classList.add('active');
  
  setTimeout(() => {
    // Simulate querying the knowledge base
    let response = findBestMatch(query);
    
    if (response.found) {
      successfulQueries++;
      document.getElementById('response-box').innerHTML = `
        <strong>🤖 Model Response:</strong><br>
        ${response.answer}<br>
        <br>
        <small>✅ Retrieved from training data: "${response.source}"</small>
      `;
    } else {
      document.getElementById('response-box').innerHTML = `
        <strong>🤖 Model Response:</strong><br>
        I don't have information about that in my training data.<br>
        <br>
        <div class="alert">
          <strong>⚠️ Important:</strong> During runtime, I can only use knowledge from my training phase. 
          I cannot learn new information from this conversation!
        </div>
      `;
    }
    
    updateStats();
    document.getElementById('query-input').value = '';
    runtimePhase.classList.remove('active');
  }, 500);
}

function findBestMatch(query) {
  const queryLower = query.toLowerCase();
  
  // Simple keyword matching simulation
  for (let item of knowledgeBase) {
    const itemLower = item.text.toLowerCase();
    
    // Extract key entities and check for matches
    if (queryLower.includes('capital') && itemLower.includes('capital')) {
      const match = itemLower.match(/(\w+)\s+is the capital of\s+(\w+)/);
      if (match) {
        return {
          found: true,
          answer: `Based on my training, ${match[1]} is the capital of ${match[2]}.`,
          source: item.text
        };
      }
    }
    
    if (queryLower.includes('orbit') && itemLower.includes('orbit')) {
      return {
        found: true,
        answer: `Based on my training: ${item.text}`,
        source: item.text
      };
    }
    
    if (queryLower.includes('boil') && itemLower.includes('boil')) {
      return {
        found: true,
        answer: `Based on my training: ${item.text}`,
        source: item.text
      };
    }
    
    // Check if query words match training data
    const queryWords = queryLower.split(' ').filter(w => w.length > 3);
    const itemWords = itemLower.split(' ');
    const matches = queryWords.filter(w => itemWords.some(iw => iw.includes(w) || w.includes(iw)));
    
    if (matches.length >= 2) {
      return {
        found: true,
        answer: `Based on my training: ${item.text}`,
        source: item.text
      };
    }
  }
  
  return { found: false };
}

function updateKnowledgeBase() {
  const kb = document.getElementById('knowledge-base');
  kb.innerHTML = '<div style="color: #81d4fa;">// Model\'s learned knowledge:</div>';
  
  knowledgeBase.forEach(item => {
    const div = document.createElement('div');
    div.className = 'knowledge-item';
    div.innerHTML = `[Training #${item.id}] ${item.text} <small style="opacity: 0.6;">(${item.timestamp})</small>`;
    kb.appendChild(div);
  });
}

function updateStats() {
  document.getElementById('training-count').textContent = trainingCount;
  document.getElementById('query-count').textContent = queryCount;
  
  const rate = queryCount > 0 ? Math.round((successfulQueries / queryCount) * 100) : 0;
  document.getElementById('success-rate').textContent = rate + '%';
}

function loadSampleData() {
  sampleDataset.forEach((fact, index) => {
    setTimeout(() => {
      knowledgeBase.push({
        text: fact,
        timestamp: new Date().toLocaleTimeString(),
        id: trainingCount++
      });
      updateKnowledgeBase();
      updateStats();
    }, index * 100);
  });
  
  setTimeout(() => {
    document.getElementById('response-box').innerHTML = `
      <strong>✅ Sample dataset loaded!</strong><br>
      The model has been trained on ${sampleDataset.length} facts.<br>
      <small>Try asking questions like "What is the capital of France?" or "What orbits the Sun?"</small>
    `;
  }, sampleDataset.length * 100);
}

function resetModel() {
  knowledgeBase = [];
  trainingCount = 0;
  queryCount = 0;
  successfulQueries = 0;
  
  updateKnowledgeBase();
  updateStats();
  
  document.getElementById('knowledge-base').innerHTML = `
    <div style="color: #81d4fa;">// Model's learned knowledge appears here...</div>
    <div style="color: #666; margin-top: 10px;">// No training data. Use the training phase to teach the model!</div>
  `;
  
  document.getElementById('response-box').innerHTML = `
    <em style="color: #666;">Model reset! Train the model or ask it a question to see responses...</em>
  `;
}
</script>

</body>
</html>

---

## Part 4: No Persistent Memory Between Conversations

Each conversation is isolated. The LLM cannot remember previous conversations!

### Interactive Demo: Conversation Isolation

<html>
<head>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background: #f5f5f5;
  }
  .demo-container {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin: 20px 0;
  }
  .session-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  .session-box {
    border: 3px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  .session-box.active {
    border-color: #4CAF50;
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
  }
  .conversation {
    background: white;
    border-radius: 8px;
    padding: 15px;
    min-height: 250px;
    max-height: 400px;
    overflow-y: auto;
    margin: 15px 0;
  }
  .message {
    padding: 10px 15px;
    margin: 8px 0;
    border-radius: 8px;
  }
  .user-msg {
    background: #e3f2fd;
    border-left: 4px solid #2196F3;
  }
  .ai-msg {
    background: #f3e5f5;
    border-left: 4px solid #9C27B0;
  }
  .system-msg {
    background: #fff9c4;
    border-left: 4px solid #FFC107;
    font-style: italic;
    font-size: 14px;
  }
  .input-group {
    display: flex;
    gap: 10px;
    margin: 10px 0;
  }
  input {
    flex: 1;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
  }
  button {
    background: #2196F3;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }
  button:hover {
    background: #1976D2;
  }
  .new-session-btn {
    background: #4CAF50;
    padding: 12px 24px;
    font-size: 16px;
    margin: 20px 0;
  }
  .new-session-btn:hover {
    background: #45a049;
  }
  .warning-box {
    background: #ffebee;
    border: 2px solid #f44336;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }
  .info-box {
    background: #e8f5e9;
    border: 2px solid #4CAF50;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }
  .session-header {
    background: rgba(0,0,0,0.1);
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
</head>
<body>

<div class="demo-container">
  <h2>💬 Conversation Isolation Simulator</h2>
  <p>See how LLMs cannot access information from previous conversations. Each session is completely isolated!</p>
  
  <div class="info-box">
    <strong>🎯 Try This:</strong>
    <ol style="margin: 10px 0;">
      <li>Tell Session A your name in the chat</li>
      <li>Start Session B (new conversation)</li>
      <li>Ask Session B what your name is - it won't know!</li>
    </ol>
  </div>
  
  <button class="new-session-btn" onclick="startNewSession()">➕ Start New Session</button>
  
  <div class="session-container" id="session-container"></div>
  
  <div class="warning-box">
    <strong>⚠️ Key Point:</strong> Unlike humans, LLMs don't have long-term memory across conversations. 
    When you start a new chat, the AI has absolutely no memory of previous chats - it's like meeting 
    someone with complete amnesia every time.
  </div>
</div>

<script>
let sessions = [];
let sessionCounter = 0;

function createSession() {
  const sessionId = sessionCounter++;
  const session = {
    id: sessionId,
    messages: [],
    userInfo: {}  // Info learned in THIS session only
  };
  
  sessions.push(session);
  renderSessions();
  
  // Add welcome message
  addMessage(sessionId, 'system', `Session #${sessionId} started. I have no memory of previous conversations!`);
  
  return session;
}

function startNewSession() {
  createSession();
}

function renderSessions() {
  const container = document.getElementById('session-container');
  container.innerHTML = '';
  
  // Show only the last 2 sessions
  const visibleSessions = sessions.slice(-2);
  
  visibleSessions.forEach(session => {
    const sessionDiv = document.createElement('div');
    sessionDiv.className = 'session-box';
    sessionDiv.id = `session-${session.id}`;
    
    sessionDiv.innerHTML = `
      <div class="session-header">
        <strong>💬 Session #${session.id}</strong>
        <span style="font-size: 12px; opacity: 0.7;">
          ${session.messages.length} messages
        </span>
      </div>
      <div class="conversation" id="conv-${session.id}"></div>
      <div class="input-group">
        <input 
          type="text" 
          id="input-${session.id}" 
          placeholder="Type a message..."
          onkeypress="if(event.key==='Enter') sendMessage(${session.id})"
        >
        <button onclick="sendMessage(${session.id})">Send</button>
      </div>
      <div style="font-size: 12px; margin-top: 10px; opacity: 0.7;">
        Known info: ${Object.keys(session.userInfo).length} items
      </div>
    `;
    
    container.appendChild(sessionDiv);
    renderConversation(session.id);
  });
}

function renderConversation(sessionId) {
  const session = sessions.find(s => s.id === sessionId);
  if (!session) return;
  
  const convDiv = document.getElementById(`conv-${sessionId}`);
  if (!convDiv) return;
  
  convDiv.innerHTML = '';
  
  session.messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${msg.type}-msg`;
    msgDiv.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
    convDiv.appendChild(msgDiv);
  });
  
  convDiv.scrollTop = convDiv.scrollHeight;
}

function addMessage(sessionId, type, text, sender = null) {
  const session = sessions.find(s => s.id === sessionId);
  if (!session) return;
  
  let senderName = sender;
  if (!senderName) {
    if (type === 'user') senderName = 'You';
    else if (type === 'ai') senderName = 'AI';
    else senderName = 'System';
  }
  
  session.messages.push({
    type: type,
    text: text,
    sender: senderName,
    timestamp: new Date().toISOString()
  });
  
  renderConversation(sessionId);
}

function sendMessage(sessionId) {
  const input = document.getElementById(`input-${sessionId}`);
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  const session = sessions.find(s => s.id === sessionId);
  
  // Highlight active session
  document.querySelectorAll('.session-box').forEach(box => {
    box.classList.remove('active');
  });
  document.getElementById(`session-${sessionId}`).classList.add('active');
  
  addMessage(sessionId, 'user', message);
  input.value = '';
  
  // Simulate AI response
  setTimeout(() => {
    const response = generateResponse(session, message);
    addMessage(sessionId, 'ai', response);
  }, 500);
}

function generateResponse(session, message) {
  const msgLower = message.toLowerCase();
  
  // Extract and store information from this session
  if (msgLower.includes('my name is') || msgLower.includes('i am') || msgLower.includes("i'm")) {
    const nameMatch = message.match(/(?:my name is|i am|i'm)\s+(\w+)/i);
    if (nameMatch) {
      session.userInfo.name = nameMatch[1];
      return `Nice to meet you, ${nameMatch[1]}! I'll remember that in THIS conversation.`;
    }
  }
  
  if (msgLower.includes('i live in') || msgLower.includes('from')) {
    const locationMatch = message.match(/(?:i live in|from)\s+([\w\s]+)/i);
    if (locationMatch) {
      session.userInfo.location = locationMatch[1].trim();
      return `Interesting! So you're from ${locationMatch[1].trim()}. I'll remember that in THIS session only.`;
    }
  }
  
  // Try to recall information
  if (msgLower.includes('what') && msgLower.includes('name')) {
    if (session.userInfo.name) {
      return `In THIS conversation, you told me your name is ${session.userInfo.name}.`;
    } else {
      return `I don't know your name. We haven't discussed it in THIS conversation. (Remember: I can't access previous sessions!)`;
    }
  }
  
  if (msgLower.includes('where') && (msgLower.includes('live') || msgLower.includes('from'))) {
    if (session.userInfo.location) {
      return `In THIS session, you mentioned you're from ${session.userInfo.location}.`;
    } else {
      return `I don't know where you're from. We haven't discussed it in THIS conversation.`;
    }
  }
  
  if (msgLower.includes('remember') || msgLower.includes('previous')) {
    return `⚠️ I cannot access previous conversations! Each session is completely isolated. I only know what we've discussed in THIS session (#${session.id}).`;
  }
  
  // Generic responses
  const responses = [
    `I understand. What else would you like to discuss in this session?`,
    `Interesting! This information is only stored in Session #${session.id}'s context.`,
    `Got it! Keep in mind I won't remember this if you start a new session.`,
    `I'm processing that. Remember, I can only see messages from THIS conversation.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Initialize with one session
createSession();
</script>

</body>
</html>


---

## Summary: Key Takeaways

### ✅ What You Learned

1. **Context Window**: LLMs have a sliding window of recent messages they can "see"
2. **Attention Mechanism**: Not all words are equally important - attention helps focus on relevant tokens
3. **Training vs Runtime**: Learning happens during training, not during conversations
4. **No Persistent Memory**: Each conversation is completely isolated - no memory between sessions

### 🎯 Real-World Implications

- **Token Limits Matter**: Long conversations eventually lose early context
- **Can't Learn New Facts**: You can't teach an LLM new information during a chat
- **Reset Each Time**: Starting a new conversation = starting from scratch
- **Context is Everything**: All the model knows is what's in the current conversation

### 🚀 Advanced Topics (Not Covered Here)

- **Embeddings**: How text is converted to numbers
- **Transformer Architecture**: The neural network structure
- **Fine-tuning**: Specialized training for specific tasks
- **RAG (Retrieval Augmented Generation)**: Adding external knowledge
- **Vector Databases**: Long-term storage solutions

---

*Want to learn more? Try modifying the demos, experimenting with different context window sizes, or building your own LLM memory visualizations!*