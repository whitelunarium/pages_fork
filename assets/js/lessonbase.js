// -------------------- TIME TRACKER --------------------
(function () {
  const display = document.getElementById("total-time");
  const statusEl = document.getElementById("timer-status");
  if (!display || !statusEl) return;

  const lessonKey = window.location.pathname.split("/").pop() || "lesson";
  let startTime = Date.now();
  let totalTime = parseInt(localStorage.getItem(`lesson-time-${lessonKey}`)) || 0;
  let isActive = true;

  function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  function update() {
    if (!isActive) return;
    const current = totalTime + (Date.now() - startTime);
    display.textContent = formatTime(current);
    if (current >= 60000) unlockBadge(lessonKey); // 1 min badge
  }

  function pause() {
    if (!isActive) return;
    totalTime += Date.now() - startTime;
    isActive = false;
    statusEl.textContent = "Paused";
    statusEl.className = "timer-status paused";
    localStorage.setItem(`lesson-time-${lessonKey}`, totalTime);
  }

  function resume() {
    if (isActive) return;
    startTime = Date.now();
    isActive = true;
    statusEl.textContent = "Active";
    statusEl.className = "timer-status active";
  }

  setInterval(update, 1000);
  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : resume()));
  window.addEventListener("beforeunload", () => {
    if (isActive) totalTime += Date.now() - startTime;
    localStorage.setItem(`lesson-time-${lessonKey}`, totalTime);
  });
})();

// -------------------- PROGRESS TRACKER --------------------
(function () {
  const bar = document.getElementById("lesson-progress");
  const text = document.getElementById("progress-text");
  const resetBtn = document.getElementById("reset-progress");
  if (!bar || !text) return;

  const lessons = ["frontend", "oop", "problem-solving", "future-references"];
  const key = "lesson-progress";
  const lessonKey = window.location.pathname.split("/").pop() || "lesson";

  let progress = JSON.parse(localStorage.getItem(key)) || {};
  progress[lessonKey] = true;
  localStorage.setItem(key, JSON.stringify(progress));

  const done = Object.keys(progress).length;
  const percent = Math.floor((done / lessons.length) * 100);
  bar.style.width = percent + "%";
  text.textContent = percent + "% complete";

  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm("Reset all progress and time data?")) {
        localStorage.removeItem(key);
        localStorage.removeItem("lesson-badges");
        lessons.forEach((l) => localStorage.removeItem(`lesson-time-${l}`));
        location.reload();
      }
    };
  }
})();

// -------------------- BADGES --------------------
function unlockBadge(lesson) {
  let badges = JSON.parse(localStorage.getItem("lesson-badges")) || [];
  if (!badges.includes(lesson)) {
    badges.push(lesson);
    localStorage.setItem("lesson-badges", JSON.stringify(badges));
    renderBadges(badges);
    showCongratsPopup(lesson);
  }
}

function renderBadges(badges) {
  const badgeContainer = document.getElementById("badges");
  if (!badgeContainer) return;
  badgeContainer.innerHTML = "";
  const icons = { frontend: "💻", oop: "🧩", "problem-solving": "🧠", "future-references": "📖", lesson: "🏅" };
  badges.forEach((b) => {
    const span = document.createElement("span");
    span.className = "badge";
    span.innerHTML = `${icons[b] || "🏅"} ${b.replace("-", " ")}`;
    badgeContainer.appendChild(span);
  });
}

function showCongratsPopup(lesson) {
  const popup = document.createElement("div");
  popup.className = "congrats-popup";
  popup.innerHTML = `🎉 Congrats! You earned a badge for <b>${lesson.replace("-", " ")}</b>`;
  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add("show"), 50);
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  let saved = JSON.parse(localStorage.getItem("lesson-badges")) || [];
  renderBadges(saved);
});

// -------------------- SANDBOX --------------------
(function () {
  const runBtn = document.getElementById("run-sandbox");
  const codeBox = document.getElementById("sandbox-code");
  const output = document.getElementById("sandbox-output");
  if (!runBtn || !codeBox || !output) return;

  runBtn.addEventListener("click", () => {
    try {
      const result = eval(codeBox.value);
      output.textContent = String(result ?? "✅ Code ran successfully.");
    } catch (e) {
      output.textContent = "❌ Error: " + e.message;
    }
  });
})();

// -------------------- QUIZ / REFLECTION --------------------
(function () {
  const saveBtn = document.getElementById("save-reflection");
  const box = document.getElementById("reflection-box");
  const status = document.getElementById("reflection-status");
  if (!saveBtn || !box || !status) return;

  const lessonKey = window.location.pathname.split("/").pop() || "lesson";
  const refKey = "reflection-" + lessonKey;
  box.value = localStorage.getItem(refKey) || "";

  saveBtn.addEventListener("click", () => {
    localStorage.setItem(refKey, box.value);
    status.textContent = "Saved!";
    setTimeout(() => (status.textContent = ""), 1500);
    unlockBadge(lessonKey); // Badge for writing reflection
  });
})();
