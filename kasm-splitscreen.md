---
toc: True
layout: post
data: tools
title: Linux OS Default Permissions Quiz
description: Quiz to assess knowledge of default system permissions in a Linux-based OS.
permalink: /tools/os/permissions-quiz
breadcrumb: True 
---

## 🔐 Default Permissions & OS Security Quiz

Test your knowledge of default file permissions in Linux.

<div class="controls">
<button class="control-btn active" onclick="toggleView('quiz')">📝 Quiz Mode</button>
<button class="control-btn" onclick="toggleView('split')">⚡ Split View</button>
</div>

### 🧪 Questions

<div class="main-content">
<div class="quiz-section">

<form id="quiz-form" class="quiz-form">

<div class="question">
<strong>1. What are the octal permissions of `/etc/passwd` on most Linux systems?</strong><br>
<input type="text" name="q1" placeholder="e.g. 644" />
</div>

<div class="question">
<strong>2. What is the owner of `/etc/shadow`?</strong><br>
<input type="text" name="q2" placeholder="e.g. root" />
</div>

<div class="question">
<strong>3. Which command shows all users currently logged in?</strong><br>
<input type="text" name="q3" placeholder="e.g. who" />
</div>

<br>
<button type="submit" class="submit-btn">Check Answers</button>

</form>

<div id="quiz-result" class="quiz-result"></div>

</div>

<div class="terminal-section">
<div class="kasm-controls">
<label for="kasm-id">Kasm Session ID:</label>
<input type="text" id="kasm-id" class="kasm-input" placeholder="Enter your session ID (e.g., 26a8c4f6...)" />
<button onclick="launchKasmIframe()" class="kasm-btn">Connect</button>
</div>
<iframe id="kasm-iframe" class="kasm-iframe" src="about:blank"></iframe>
</div>

</div>

---

## 🧠 Tip

Use commands like:

```bash
ls -l /etc/passwd
stat /etc/shadow
who
```

to explore permissions and ownership in a real Linux system.

---

<style>
.main-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    transition: all 0.3s ease;
}

.split-view .main-content {
    flex-direction: row;
    height: calc(100vh - 200px);
}

.quiz-section {
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #e1e4e8;
    background: white;
    flex: 1;
    overflow-y: auto;
}

.terminal-section {
    background: #1a1a1a;
    border-radius: 8px;
    padding: 0;
    border: 1px solid #e1e4e8;
    display: none;
    flex: 1;
    overflow: hidden;
}

.split-view .terminal-section {
    display: block;
}

.quiz-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.question {
    padding: 1rem;
    border-left: 4px solid #0366d6;
    background: #f6f8fa;
    border-radius: 4px;
}

.question input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #d1d5da;
    border-radius: 4px;
    font-size: 14px;
}

.question input:focus {
    outline: none;
    border-color: #0366d6;
    box-shadow: 0 0 0 2px rgba(3, 102, 214, 0.1);
}

.submit-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.submit-btn:hover {
    background: #218838;
}

.quiz-result {
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 6px;
    text-align: center;
    font-weight: 600;
    display: none;
}

.quiz-result.show {
    display: block;
}

.quiz-result.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.quiz-result.partial {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
}

.quiz-result.fail {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.control-btn {
    background: #f6f8fa;
    color: #24292e;
    border: 1px solid #d1d5da;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.control-btn:hover {
    background: #e1e4e8;
    border-color: #c6cbd1;
}

.control-btn.active {
    background: #0366d6;
    color: white;
    border-color: #0366d6;
}

.kasm-controls {
    background: #24292e;
    color: white;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.kasm-input {
    flex: 1;
    min-width: 200px;
    padding: 0.5rem;
    border: 1px solid #444d56;
    border-radius: 4px;
    background: #2f363d;
    color: white;
    font-size: 14px;
}

.kasm-input::placeholder {
    color: #959da5;
}

.kasm-btn {
    background: #0366d6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
}

.kasm-btn:hover {
    background: #0256cc;
}

.kasm-iframe {
    width: 100%;
    height: calc(100% - 70px);
    border: none;
    background: #000;
}

@media (max-width: 768px) {
    .split-view .main-content {
        flex-direction: column;
        height: auto;
    }

    .controls {
        justify-content: center;
    }
}
</style>

<script>
let currentView = 'quiz';

document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const answers = {
        q1: '644',
        q2: 'root', 
        q3: 'who'
    };

    let correct = 0;
    const total = Object.keys(answers).length;
    const formData = new FormData(event.target);

    for (const [key, value] of formData.entries()) {
        const userAnswer = value.trim().toLowerCase();
        const correctAnswer = answers[key].toLowerCase();
        
        if (userAnswer === correctAnswer) {
            correct++;
        }
    }

    const percentage = Math.round((correct / total) * 100);
    const resultDiv = document.getElementById('quiz-result');
    
    let resultClass = 'fail';
    let message = '';
    
    if (correct === total) {
        resultClass = 'success';
        message = `🎉 Perfect! You got all ${correct}/${total} questions correct!`;
    } else if (correct >= total * 0.6) {
        resultClass = 'partial';
        message = `👍 Good job! You got ${correct}/${total} questions correct (${percentage}%)`;
    } else {
        resultClass = 'fail';  
        message = `📚 Keep studying! You got ${correct}/${total} questions correct (${percentage}%)`;
    }

    resultDiv.className = `quiz-result show ${resultClass}`;
    resultDiv.innerHTML = `<p>${message}</p>`;
});

function toggleView(view) {
    const body = document.body;
    const buttons = document.querySelectorAll('.control-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (view === 'split') {
        body.classList.add('split-view');
        currentView = 'split';
    } else {
        body.classList.remove('split-view');
        currentView = 'quiz';
    }
}

function launchKasmIframe() {
    const sessionId = document.getElementById('kasm-id').value.trim();
    const iframe = document.getElementById('kasm-iframe');
    
    if (!sessionId) {
        alert('Please enter a valid Kasm Session ID');
        return;
    }

    const kasmUrl = `https://kasm.opencodingsociety.com/#/session/${sessionId}`;
    iframe.src = kasmUrl;
    
    const controls = document.querySelector('.kasm-controls');
    const existingStatus = controls.querySelector('.connection-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.className = 'connection-status';
    statusDiv.style.cssText = 'background: #28a745; padding: 0.5rem; border-radius: 4px; font-size: 12px; margin-left: 1rem;';
    statusDiv.textContent = '✅ Connected';
    controls.appendChild(statusDiv);
}

document.querySelectorAll('.question input').forEach((input, index, inputs) => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                document.querySelector('.submit-btn').click();
            }
        }
    });
});
</script>