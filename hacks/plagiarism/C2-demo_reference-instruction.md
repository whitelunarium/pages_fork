---
layout: post
title: APA Reference Instruction
description: A tool to assist students in building an APA reference. 
author: John Mortensen
permalink: /plagiarism/2
breadcrumb: True
---

## Sample Consequence

Fictitious example by Salem, our workshop character found the perfect quote for their research paper: "Innovation distinguishes between a leader and a follower."It was exactly what they needed! They copy-pasted it into their paper and moved on. Later, their professor marked it as plagiarism - it was a Steve Jobs quote that needed proper citation. Alex's grade dropped from an A to a C.

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

## Provide 2 examples to show understading of APA reference and citation.

Fix Salem's delima to boost grade to an 'A".

Create a flawed article then correct article with citation and reference.

---

<style>
  .exercise-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .exercise-card {
    border: 1px solid #6c757d;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .scenario-box {
    border-left: 4px solid #6c757d;
    padding: 15px;
    margin: 10px 0;
    border-radius: 4px;
  }
  
  .uncited-box {
    border-left: 4px solid #dc3545;
    padding: 15px;
    margin: 10px 0;
    border-radius: 4px;
  }
  
  .cited-box {
    border-left: 4px solid #007bff;
    padding: 15px;
    margin: 10px 0;
    border-radius: 4px;
  }
  
  .exercise-textarea {
    width: 100%;
    min-height: 100px;
    padding: 12px;
    border: 1px solid #6c757d;
    border-radius: 4px;
    font-family: 'Times New Roman', serif;
    line-height: 1.6;
    resize: vertical;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }
  
  .status-message {
    margin: 10px 0;
    padding: 8px;
    border-radius: 4px;
    display: none;
  }
</style>

<div class="exercise-container">
  
  <!-- Exercise 1: Salem's Citation Problem -->
  <div class="exercise-card">
    <h3>📚 Exercise 1: Fix Salem's Citation Problem</h3>

    <p><strong>Your Task:</strong> Research this Steve Jobs quote and create both a proper in-text citation AND a reference list entry.</p>
    <div class="scenario-box">
      <strong>🎯 The Problem:</strong><br>
      Salem found this perfect quote: <em>"Innovation distinguishes between a leader and a follower."</em><br>
    </div>
    
    
    <label for="salem-citation"><strong>In-text Citation (how it should appear in the paper):</strong></label>
    <textarea id="salem-citation" class="exercise-textarea" placeholder="Write the in-text citation here. Example: According to Jobs (2005), 'Innovation distinguishes...'"></textarea>
    
    <label for="salem-reference"><strong>Reference List Entry (for bibliography):</strong></label>
    <textarea id="salem-reference" class="exercise-textarea" placeholder="Write the full APA reference here. Include author, date, source, URL, etc."></textarea>
    
    <div class="button-group">
      <button id="save-salem" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">💾 Save Salem's Solution</button>
      <button id="load-salem" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">📂 Load Saved Work</button>
    </div>
  </div>
  
  <!-- Exercise 2: Uncited vs Cited Comparison -->
  <div class="exercise-card">
    <h3>📝 Exercise 2: Create Uncited vs Cited Example</h3>

    <p><strong>Your Task:</strong> Create a flawed paragraph (with plagiarism), then show the corrected version with proper citations.</p>
    
    <label for="uncited-text"><strong>❌ Uncited Version (flawed article excerpt):</strong></label>
    <div class="uncited-box">
      <strong>Instructions:</strong> Write a paragraph that uses information/quotes without proper citation (this shows what NOT to do)
    </div>
    <textarea id="uncited-text" class="exercise-textarea" placeholder="Write a paragraph that improperly uses sources without citations. This demonstrates plagiarism to avoid..."></textarea>
    
    <label for="cited-text"><strong>✅ Properly Cited Version (corrected article):</strong></label>
    <div class="cited-box">
      <strong>Instructions:</strong> Rewrite the same paragraph with proper in-text citations and attribution
    </div>
    <textarea id="cited-text" class="exercise-textarea" placeholder="Rewrite the paragraph above with proper APA in-text citations and attributions..."></textarea>
    
    <label for="reference-list"><strong>📚 Reference List for Cited Sources:</strong></label>
    <textarea id="reference-list" class="exercise-textarea" placeholder="List all the references used in your cited version in proper APA format..."></textarea>
    
    <div class="button-group">
      <button id="save-comparison" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">💾 Save Comparison Example</button>
      <button id="load-comparison" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">📂 Load Saved Work</button>
    </div>
  </div>
  
  <!-- Save All for Assessment -->
  <div class="button-group">
    <button id="test-mode-button" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">🧪 Test Mode - Fill All Exercises</button>
    <button id="save-all-exercises" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">📤 Save All for Assessment</button>
    <button id="clear-all-exercises" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">🗑️ Clear All Work</button>
  </div>
  
  <div id="exercise-status" class="status-message"></div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {

    // Status message helper function
    function showStatusMessage(message, type) {
        const statusDiv = document.getElementById("exercise-status");
        statusDiv.textContent = message;
        statusDiv.style.display = "block";

        // Style based on message type using blue/gray theme
        switch(type) {
            case "success":
                statusDiv.style.backgroundColor = "#d1ecf1";
                statusDiv.style.color = "#0c5460";
                statusDiv.style.border = "1px solid #bee5eb";
                break;
            case "error":
                statusDiv.style.backgroundColor = "#e9ecef";
                statusDiv.style.color = "#495057";
                statusDiv.style.border = "1px solid #6c757d";
                break;
            case "warning":
                statusDiv.style.backgroundColor = "#e2e3e5";
                statusDiv.style.color = "#383d41";
                statusDiv.style.border = "1px solid #adb5bd";
                break;
            case "info":
                statusDiv.style.backgroundColor = "#d1ecf1";
                statusDiv.style.color = "#0c5460";
                statusDiv.style.border = "1px solid #bee5eb";
                break;
        }

        // Auto-hide after 4 seconds
        setTimeout(() => {
            statusDiv.style.display = "none";
        }, 4000);
    }

    // Test Mode - Fill all exercises with sample data
    document.getElementById("test-mode-button").onclick = function() {
        if (confirm("This will fill all exercises with sample data for testing. Continue?")) {
            // Exercise 1: Salem's Citation Problem
            document.getElementById("salem-citation").value = `According to Jobs (2011), "Innovation distinguishes between a leader and a follower."`;
            document.getElementById("salem-reference").value = `Jobs, S. (2011, October). Innovation quote. Stanford University Commencement Address. https://news.stanford.edu/news/2005/june15/jobs-061505.html`;
            
            // Exercise 2: Uncited vs Cited Comparison
            document.getElementById("uncited-text").value = `Artificial intelligence is transforming education by providing personalized learning experiences. Studies show that AI can improve student outcomes by 40%. Machine learning algorithms can adapt to individual learning styles and provide instant feedback. This technology is revolutionizing how we think about teaching and learning.`;
            
            document.getElementById("cited-text").value = `Artificial intelligence is transforming education by providing personalized learning experiences (Chen, 2023). Studies show that AI can improve student outcomes by 40% (Johnson & Smith, 2024). According to Rodriguez (2023), machine learning algorithms can adapt to individual learning styles and provide instant feedback. This technology is revolutionizing how we think about teaching and learning (AI Education Consortium, 2024).`;
            
            document.getElementById("reference-list").value = `AI Education Consortium. (2024). The future of AI in education. Journal of Educational Technology, 15(3), 45-62. https://doi.org/10.1234/jet.2024.15.3.45

Chen, L. (2023). Personalized learning through artificial intelligence. Educational Psychology Review, 28(4), 123-145. https://doi.org/10.1234/epr.2023.28.4.123

Johnson, M., & Smith, R. (2024). Measuring AI impact on student performance. Computers & Education, 89, 67-78. https://doi.org/10.1234/ce.2024.89.67

Rodriguez, A. (2023). Adaptive learning systems in modern classrooms. Teaching and Technology Quarterly, 12(2), 89-104. https://doi.org/10.1234/ttq.2023.12.2.89`;

            showStatusMessage("🧪 Test mode activated! All exercises filled with sample data.", "info");
        }
    };

    // Save Salem's Exercise
    document.getElementById("save-salem").onclick = function() {
        const citation = document.getElementById("salem-citation").value.trim();
        const reference = document.getElementById("salem-reference").value.trim();

        if (citation.length === 0 || reference.length === 0) {
            showStatusMessage("⚠️ Please complete both citation and reference before saving", "warning");
            return;
        }

        try {
            localStorage.setItem('plagiarism-c2-1', JSON.stringify({
                citation: citation,
                reference: reference,
                timestamp: new Date().toISOString(),
                exercise: 'Salem Citation Problem'
            }));
            showStatusMessage("✅ Salem's solution saved successfully!", "success");
        } catch (error) {
            showStatusMessage("❌ Failed to save: " + error.message, "error");
        }
    };

    // Load Salem's Exercise
    document.getElementById("load-salem").onclick = function() {
        try {
            const saved = localStorage.getItem('plagiarism-c2-1');
            if (saved) {
                const data = JSON.parse(saved);
                document.getElementById("salem-citation").value = data.citation;
                document.getElementById("salem-reference").value = data.reference;
                const saveDate = new Date(data.timestamp).toLocaleString();
                showStatusMessage(`✅ Salem's solution loaded! (Saved: ${saveDate})`, "success");
            } else {
                showStatusMessage("⚠️ No saved Salem exercise found", "warning");
            }
        } catch (error) {
            showStatusMessage("❌ Failed to load: " + error.message, "error");
        }
    };

    // Save Comparison Exercise
    document.getElementById("save-comparison").onclick = function() {
        const uncited = document.getElementById("uncited-text").value.trim();
        const cited = document.getElementById("cited-text").value.trim();
        const references = document.getElementById("reference-list").value.trim();

        if (uncited.length === 0 || cited.length === 0 || references.length === 0) {
            showStatusMessage("⚠️ Please complete all three sections before saving", "warning");
            return;
        }

        try {
            localStorage.setItem('plagiarism-c2-2', JSON.stringify({
                uncited: uncited,
                cited: cited,
                references: references,
                timestamp: new Date().toISOString(),
                exercise: 'Uncited vs Cited Comparison'
            }));
            showStatusMessage("✅ Comparison example saved successfully!", "success");
        } catch (error) {
            showStatusMessage("❌ Failed to save: " + error.message, "error");
        }
    };

    // Load Comparison Exercise
    document.getElementById("load-comparison").onclick = function() {
        try {
            const saved = localStorage.getItem('plagiarism-c2-2');
            if (saved) {
                const data = JSON.parse(saved);
                document.getElementById("uncited-text").value = data.uncited;
                document.getElementById("cited-text").value = data.cited;
                document.getElementById("reference-list").value = data.references;
                const saveDate = new Date(data.timestamp).toLocaleString();
                showStatusMessage(`✅ Comparison example loaded! (Saved: ${saveDate})`, "success");
            } else {
                showStatusMessage("⚠️ No saved comparison exercise found", "warning");
            }
        } catch (error) {
            showStatusMessage("❌ Failed to load: " + error.message, "error");
        }
    };

    // Save All for Assessment
    document.getElementById("save-all-exercises").onclick = function() {
        const salemCitation = document.getElementById("salem-citation").value.trim();
        const salemReference = document.getElementById("salem-reference").value.trim();
        const uncited = document.getElementById("uncited-text").value.trim();
        const cited = document.getElementById("cited-text").value.trim();
        const references = document.getElementById("reference-list").value.trim();

        if (salemCitation.length === 0 || salemReference.length === 0 ||
            uncited.length === 0 || cited.length === 0 || references.length === 0) {
            showStatusMessage("⚠️ Please complete all exercises before saving for assessment", "warning");
            return;
        }

        try {
            // Save consolidated assessment data
            const assessmentData = {
                lesson: 'C2-demo_reference-session',
                studentWork: {
                    salemExercise: {
                        citation: salemCitation,
                        reference: salemReference
                    },
                    comparisonExercise: {
                        uncited: uncited,
                        cited: cited,
                        references: references
                    }
                },
                timestamp: new Date().toISOString(),
                completed: true
            };

            localStorage.setItem('plagiarism-c2-assessment', JSON.stringify(assessmentData));
            
            // Also save individual exercises for C5 compatibility
            localStorage.setItem('plagiarism-c2-1', JSON.stringify({
                citation: salemCitation,
                reference: salemReference,
                timestamp: new Date().toISOString(),
                exercise: 'Salem Citation Exercise'
            }));
            
            localStorage.setItem('plagiarism-c2-2', JSON.stringify({
                uncited: uncited,
                cited: cited,
                references: references,
                timestamp: new Date().toISOString(),
                exercise: 'Comparison Exercise'
            }));
            
            showStatusMessage("🎓 All exercises saved for instructor assessment!", "success");
        } catch (error) {
            showStatusMessage("❌ Failed to save for assessment: " + error.message, "error");
        }
    };

    // Clear All Work
    document.getElementById("clear-all-exercises").onclick = function() {
        if (confirm("Are you sure you want to clear all your work? This cannot be undone.")) {
            // Clear all text areas
            document.getElementById("salem-citation").value = "";
            document.getElementById("salem-reference").value = "";
            document.getElementById("uncited-text").value = "";
            document.getElementById("cited-text").value = "";
            document.getElementById("reference-list").value = "";

            // Clear individual saves
            localStorage.removeItem('plagiarism-c2-1');
            localStorage.removeItem('plagiarism-c2-2');
            localStorage.removeItem('plagiarism-c2-assessment');

            showStatusMessage("🗑️ All work cleared", "info");
        }
    };

    // Auto-load saved work on page load
    document.getElementById("load-salem").click();
    document.getElementById("load-comparison").click();
});
</script>



