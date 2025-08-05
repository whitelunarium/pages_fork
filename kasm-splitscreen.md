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

### 🧪 Questions

<form id="quiz-form">

1. **What are the octal permissions of `/etc/passwd` on most Linux systems?**  
   <input type="text" name="q1" placeholder="e.g. 644" />

2. **What is the owner of `/etc/shadow`?**  
   <input type="text" name="q2" placeholder="e.g. root" />

3. **Which command shows all users currently logged in?**  
   <input type="text" name="q3" placeholder="e.g. who" />

<br>
<button type="submit">Check Answers</button>

</form>

<div id="quiz-result"></div>

---

## 🖥️ Launch Kasm Workspace

Use your Kasm Workspace session to test commands live.

<div style="margin-bottom: 1rem;">
  <button onclick="openKasmDashboard()" style="background: #2196F3; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
    🚀 Open Kasm Dashboard
  </button>
</div>

<div style="margin-bottom: 1rem;">
  <button onclick="showSessionInput()" style="background: #4CAF50; color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
    🔗 Open Specific Session
  </button>
</div>

<!-- Session ID Input -->
<div id="kasm-session-input" style="display:none; padding: 1rem; background: #f5f5f5; border-radius: 5px; margin-top: 1rem;">
  <h4>Connect to Existing Session</h4>
  <p>Enter your Kasm Session ID to open it in a new tab:</p>
  <input type="text" id="kasm-id" placeholder="e.g. eb62fba0-a7b9-459a-a9ac-62b77bf344eb" style="width: 100%; padding: 8px; margin: 10px 0; border: 1px solid #ddd; border-radius: 3px;" />
  
  <div style="margin: 10px 0;">
    <strong>How to find your Session ID:</strong>
    <ol style="margin: 5px 0; padding-left: 20px;">
      <li>Click "Open Kasm Dashboard" above</li>
      <li>Log into Kasm and start or find your session</li>
      <li>Look at the URL in the browser - it will be like <code>.../#/session/eb62fba0-a7b9-459a-a9ac-62b77bf344eb</code></li>
      <li>Copy the long ID after <code>/session/</code></li>
    </ol>
  </div>
  
  <button onclick="openSpecificSession()" style="background: #4CAF50; color: white; padding: 8px 16px; border: none; border-radius: 3px; cursor: pointer; margin-right: 10px;">
    Open Session
  </button>
  <button onclick="hideSessionInput()" style="background: #f44336; color: white; padding: 8px 16px; border: none; border-radius: 3px; cursor: pointer;">
    Cancel
  </button>
</div>

<!-- Status Messages -->
<div id="kasm-status" style="margin-top: 1rem;"></div>

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

<script>
// Quiz functionality
document.getElementById('quiz-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const answers = {
    q1: '644',
    q2: 'root',
    q3: 'who'
  };

  let correct = 0;
  const formData = new FormData(event.target);

  for (const [key, value] of formData.entries()) {
    if (value.trim().toLowerCase() === answers[key]) {
      correct++;
    }
  }

  const result = document.getElementById('quiz-result');
  result.innerHTML = `<p><strong>You got ${correct} / 3 correct.</strong></p>`;
});

// Kasm functionality
function showStatus(message, isError = false) {
  const status = document.getElementById('kasm-status');
  status.innerHTML = `<p style="color: ${isError ? 'red' : 'green'}; padding: 10px; background: ${isError ? '#ffebee' : '#e8f5e9'}; border-radius: 5px;">${message}</p>`;
  
  // Auto-hide success messages after 3 seconds
  if (!isError) {
    setTimeout(() => {
      status.innerHTML = '';
    }, 3000);
  }
}

function openKasmDashboard() {
  // Open the main Kasm dashboard where users can see all their sessions
  const kasmUrl = 'https://kasm.opencodingsociety.com/';
  window.open(kasmUrl, '_blank');
  showStatus('Opened Kasm Dashboard in new tab. You can view and manage all your sessions there.');
}

function showSessionInput() {
  document.getElementById('kasm-session-input').style.display = 'block';
}

function hideSessionInput() {
  document.getElementById('kasm-session-input').style.display = 'none';
  document.getElementById('kasm-id').value = ''; // Clear input
}

function openSpecificSession() {
  const sessionId = document.getElementById('kasm-id').value.trim();
  
  if (!sessionId) {
    showStatus('Please enter a session ID', true);
    return;
  }
  
  // Validate session ID format (basic check)
  if (sessionId.length < 10) {
    showStatus('Session ID seems too short. Please check and try again.', true);
    return;
  }
  
  // Construct the Kasm session URL
  const sessionUrl = `https://kasm.opencodingsociety.com/#/session/${sessionId}`;
  
  // Open in new tab
  window.open(sessionUrl, '_blank');
  
  showStatus(`Opening session ${sessionId} in new tab...`);
  
  // Clear the input and hide the form
  hideSessionInput();
}

// Allow Enter key to submit session ID
document.addEventListener('DOMContentLoaded', function() {
  const sessionInput = document.getElementById('kasm-id');
  if (sessionInput) {
    sessionInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        openSpecificSession();
      }
    });
  }
});
</script>