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

## 🖥️ Launch Split View

Use your Kasm Workspace session to test commands live.

<button onclick="openKasmPopup()">Launch Split View</button>

<div id="kasm-popup" style="display:none; padding-top:1rem;">
  <label for="kasm-id">Enter your Kasm Session ID:</label>
  <input type="text" id="kasm-id" placeholder="e.g. 26a8c4f6..." />
  <button onclick="launchKasmIframe()">Open Session</button>
</div>

<div id="kasm-iframe-container" style="margin-top: 2rem; display: none;">
  <iframe id="kasm-iframe" width="100%" height="500px" style="border:1px solid #ccc;"></iframe>
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

{% include slim_sidebar.html %}

<script>
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

function openKasmPopup() {
  document.getElementById('kasm-popup').style.display = 'block';
}

function launchKasmIframe() {
  const sessionId = document.getElementById('kasm-id').value.trim();
  if (sessionId) {
    const iframe = document.getElementById('kasm-iframe');
    iframe.src = `https://kasm.opencodingsociety.com/#/session/${sessionId}`;
    document.getElementById('kasm-iframe-container').style.display = 'block';
  }
}
</script>
