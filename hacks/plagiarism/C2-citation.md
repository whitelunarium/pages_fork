---
layout: post
title: APA Reference and Citation Workshop
description: A tool to assist students in building an APA reference. 
author: John Mortensen
permalink: /plagiarism/2
breadcrumb: True
---

## Sample Consequence

Fictitious exampl *Salem, our workshop character found the perfect quote for their research paper: "Innovation distinguishes between a leader and a follower."It was exactly what they needed! They copy-pasted it into their paper and moved on. Later, their professor marked it as plagiarism - it was a Steve Jobs quote that needed proper citation. Alex's grade dropped from an A to a C.*

Research this quote and use it to build an APA reference.

---

<style>
  /* File-specific styles only - iridescent styles moved to _sass/open-coding/elements/buttons/iridescent.scss */
  .apa-tool-label { 
    display: block; 
    margin-top: 8px; 
    font-weight: bold; 
    color: #333;
  }
  .apa-tool-input { 
    width: 90%; 
    padding: 8px; 
    margin-bottom: 8px; 
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  .apa-tool-output { 
    margin-top: 16px; 
    border-left: 4px solid #007bff; 
    padding: 15px; 
    font-family: 'Times New Roman', serif;
    line-height: 1.6;
    border-radius: 4px;
  }
  .citation-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>

<details style="padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #007bff ">
  <summary style="cursor: pointer; font-weight: bold; color: #007bff; font-size: 18px;">📚 Citation Tool Helper (Click to see guide)</summary>

  <div style="margin-top: 15px;">
    <h4>Purpose</h4>
    <p>Automate and scaffold the citation correction workflow for students.</p>
    
    <h4>How to Use</h4>
    <ol>
      <li>Enter the required information in each field below</li>
      <li>Click "Generate APA Citation" to see the formatted result</li>
      <li>Copy the generated citation for use in your work</li>
    </ol>
    
    <h4>Features</h4>
    <ul>
      <li><strong>Real-time formatting:</strong> Automatically formats your citation in proper APA style</li>
      <li><strong>Clickable URLs:</strong> Generated citations include working links</li>
      <li><strong>Example data:</strong> Pre-filled with sample information to demonstrate format</li>
      <li><strong>Interactive:</strong> Can be used as standalone activity or embedded in group work</li>
    </ul>
    
    <h4>Instructions</h4>
    <p>Input the author, date, title, source, and URL information to output a correctly formatted APA citation. This tool can be further customized to support additional citation styles or integration with AI and external databases.</p>
  </div>
</details>

<div class="citation-container">
  <h3>APA Citation Generator</h3>
  
  <label class="apa-tool-label">Author(s):</label>
  <input class="apa-tool-input" id="apa-author" type="text" placeholder="e.g., Doe, J." />
  
  <label class="apa-tool-label">Date (Year, Month Day):</label>
  <input class="apa-tool-input" id="apa-date" type="text" placeholder="e.g., 2025, May 10" />
  
  <label class="apa-tool-label">Title (in italics):</label>
  <input class="apa-tool-input" id="apa-title" type="text" placeholder="e.g., Harvard revokes tenure of Francesca Gino after misconduct findings" />
  
  <label class="apa-tool-label">Source/Website:</label>
  <input class="apa-tool-input" id="apa-source" type="text" placeholder="e.g., The New York Times" />
  
  <label class="apa-tool-label">URL:</label>
  <input class="apa-tool-input" id="apa-url" type="text" placeholder="e.g., https://www.nytimes.com/article-link" />
  
  <button class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition" onclick="generateAPA()">Generate APA Reference</button>
  
  <div class="apa-tool-output" id="apa-output">
    <strong>Generated Citation:</strong><br>
    <span id="citation-text"></span>
  </div>
</div>

<script>
function generateAPA() {
  const author = document.getElementById('apa-author').value.trim();
  const date = document.getElementById('apa-date').value.trim();
  const title = document.getElementById('apa-title').value.trim();
  const source = document.getElementById('apa-source').value.trim();
  const url = document.getElementById('apa-url').value.trim();
  
  let citation = '';
  
  if (author && date && title && source && url) {
    citation = `${author} (${date}). <i>${title}</i>. ${source}. <a href='${url}' target='_blank'>${url}</a>`;
  } else {
    // Default example citation
    citation = `Doe, J. (2025, May 10). <i>Harvard revokes tenure of Francesca Gino after misconduct findings</i>. The New York Times. <a href='https://www.nytimes.com/article-link' target='_blank'>https://www.nytimes.com/article-link</a>`;
  }
  
  document.getElementById('citation-text').innerHTML = citation;
}

// Show default example on page load
document.addEventListener('DOMContentLoaded', function() {
  generateAPA();
});
</script>
