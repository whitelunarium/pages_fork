---
layout: page
title: Theme Preferences
permalink: /theme-preferences/
---

<div class="theme-preferences">
  <h2>Choose Your Theme</h2>
  
  <div class="theme-options">
    <div class="theme-card" data-theme="minima">
      <h3>Minima Theme</h3>
      <div class="theme-preview">
        <img src="/images/minima-preview.png" alt="Minima Theme Preview" />
      </div>
      <div class="theme-features">
        <ul>
          <li>✨ Clean, minimal design</li>
          <li>🌙 Dark mode support</li>
          <li>⚡ Fast loading</li>
          <li>🎨 Multiple sub-themes (dracula, leaf, hacker)</li>
          <li>📱 Mobile responsive</li>
        </ul>
      </div>
      <button class="select-theme-btn" onclick="selectTheme('minima')">Select Minima</button>
    </div>
    
    <div class="theme-card" data-theme="text">
      <h3>TeXt Theme</h3>
      <div class="theme-preview">
        <img src="/images/text-preview.png" alt="TeXt Theme Preview" />
      </div>
      <div class="theme-features">
        <ul>
          <li>🎯 Modern iOS 11-inspired design</li>
          <li>🌈 6 built-in skins</li>
          <li>🔍 Advanced search functionality</li>
          <li>📊 MathJax & Mermaid diagram support</li>
          <li>🗂️ Table of contents</li>
          <li>🌍 Internationalization</li>
        </ul>
      </div>
      <button class="select-theme-btn" onclick="selectTheme('text')">Select TeXt</button>
    </div>
  </div>
</div>

<style>
.theme-preferences {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.theme-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.theme-card {
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
}

.theme-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.theme-card.selected {
  border-color: #007acc;
}

.theme-preview img {
  width: 100%;
  max-width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin: 15px 0;
}

.theme-features ul {
  text-align: left;
  margin: 20px 0;
}

.theme-features li {
  margin: 8px 0;
  font-size: 14px;
}

.select-theme-btn {
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.select-theme-btn:hover {
  background: #005a9e;
}

@media (max-width: 768px) {
  .theme-options {
    grid-template-columns: 1fr;
  }
  
  .theme-card {
    margin: 10px 0;
  }
}
</style>

<script>
function selectTheme(themeName) {
  // Save preference
  localStorage.setItem('selectedTheme', themeName);
  
  // Visual feedback
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.remove('selected');
  });
  document.querySelector(`[data-theme="${themeName}"]`).classList.add('selected');
  
  // Show confirmation
  alert(`${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme selected! Refresh the page to see changes.`);
  
  // Optional: Auto-redirect with theme parameter
  const url = new URL(window.location.origin);
  url.searchParams.set('theme', themeName);
  window.location.href = url.toString();
}

// Load current selection on page load
document.addEventListener('DOMContentLoaded', function() {
  const currentTheme = localStorage.getItem('selectedTheme') || 'minima';
  const currentCard = document.querySelector(`[data-theme="${currentTheme}"]`);
  if (currentCard) {
    currentCard.classList.add('selected');
  }
});
</script>
