---
layout: post
title: Plagiarism Avoidance Assessment
description: A tool to assist instructor in evaluating student competency in APA reference and citations. 
author: John Mortensen
permalink: /plagiarism/5
breadcrumb: True
---

## Assessment of Student Mastery

Instructor is able to see student progress on...

1. APA reference session samples (C2).
2. Landmark case studies APA reference revisions (C3).
3. Sample Paragraph, Avoiding Plagism, and Thesis completion (C4).

Instructor has view of each with context description as above.  There is a single comment at the bottom, with a Pass/Retry evaluation.

---

<style>
  .assessment-container {
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .student-work-card {
    border: 1px solid #6c757d;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .lesson-header {
    background-color: #007bff;
    color: white;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .work-section {
    border-left: 4px solid #007bff;
    padding: 15px;
    margin: 10px 0;
    border-radius: 4px;
  }
  
  .missing-work {
    border-left: 4px solid #dc3545;
    padding: 15px;
    margin: 10px 0;
    border-radius: 4px;
    color: #721c24;
  }
  
  .assessment-textarea {
    width: 100%;
    min-height: 100px;
    padding: 12px;
    border: 1px solid #6c757d;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    resize: vertical;
  }
  
  .status-select {
    padding: 8px 12px;
    border: 1px solid #6c757d;
    border-radius: 4px;
    font-size: 16px;
    margin-left: 10px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }
  
  .mockup-notice {
    border: 1px solid #ffeaa7;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    color: #856404;
  }
</style>

<div class="assessment-container">
  
  <div class="mockup-notice">
    🎭 INSTRUCTOR ASSESSMENT MOCKUP - This simulates how an instructor would view student work stored in browser localStorage
  </div>
  
  <h2>📊 Student Work Review</h2>
  
  <!-- C2 Work Display -->
  <div class="student-work-card">
    <div class="lesson-header">
      📚 C2: APA Reference Session Samples
    </div>

    <div id="c2-content">
      <div class="missing-work">
        ⚠️ No C2 student work found in localStorage. Student needs to complete exercises in C2 session.
      </div>
    </div>
  </div>
  
  <!-- C3 Work Display -->
  <div class="student-work-card">
    <div class="lesson-header">
      🔍 C3: Landmark Case Studies APA Reference Revisions
    </div>

    <div id="c3-content">
      <div class="missing-work">
        ⚠️ No C3 student work found in localStorage. Student needs to complete reference correction practice.
      </div>
    </div>
  </div>
  
  <!-- C4 Work Display (Placeholder for future) -->
  <div class="student-work-card">
    <div class="lesson-header">
      ✍️ C4: Sample Paragraph, Avoiding Plagiarism, and Thesis Completion
    </div>

    <div id="c4-content">
      <div class="missing-work">
        ⚠️ C4 exercises not yet implemented. This section will display thesis and paragraph work when available.
      </div>
    </div>
  </div>
  
  <!-- Instructor Assessment -->
  <div class="student-work-card">
    <div class="lesson-header">
      🎓 Instructor Assessment
    </div>

    <label for="instructor-comment"><strong>Instructor Comments:</strong></label>
    <textarea id="instructor-comment" class="assessment-textarea" placeholder="Provide feedback on student's understanding of APA citations, reference formatting, and plagiarism avoidance..."></textarea>
    
    <div style="margin-top: 15px;">
      <label for="assessment-status"><strong>Assessment Status:</strong></label>
      <select id="assessment-status" class="status-select">
        <option value="">-- Select Status --</option>
        <option value="pass">✅ Pass - Demonstrates Mastery</option>
        <option value="retry">🔄 Retry - Needs Additional Work</option>
      </select>
    </div>
    
    <div class="button-group">
      <button id="save-assessment" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">💾 Save Assessment</button>
      <button id="load-assessment" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">📂 Load Previous Assessment</button>
      <button id="refresh-student-work" class="iridescent flex-1 text-white text-center py-2 rounded-lg font-semibold transition">🔄 Refresh Student Work</button>
    </div>
  </div>
  
  <div id="assessment-status-message" style="margin: 10px 0; padding: 8px; border-radius: 4px; display: none;"></div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {

    // Status message helper function
    function showStatusMessage(message, type) {
        const statusDiv = document.getElementById("assessment-status-message");
        statusDiv.textContent = message;
        statusDiv.style.display = "block";

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
            case "info":
                statusDiv.style.backgroundColor = "#d1ecf1";
                statusDiv.style.color = "#0c5460";
                statusDiv.style.border = "1px solid #bee5eb";
                break;
        }

        setTimeout(() => {
            statusDiv.style.display = "none";
        }, 4000);
    }

    // Load and display student work
    function loadStudentWork() {
        // Load C2 Work
        const c2Data = localStorage.getItem('plagiarism-c2-assessment');
        const c2Container = document.getElementById('c2-content');

        if (c2Data) {
            try {
                const c2Work = JSON.parse(c2Data);
                const completedDate = new Date(c2Work.timestamp).toLocaleString();

                c2Container.innerHTML = `
                    <div class="work-section">
                        <strong>📅 Completed:</strong> ${completedDate}<br><br>

                        <strong>🎯 Salem's Citation Exercise:</strong><br>
                        <em>In-text Citation:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${c2Work.studentWork.salemExercise.citation || 'Not completed'}
                        </div>

                        <em>Reference List Entry:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${c2Work.studentWork.salemExercise.reference || 'Not completed'}
                        </div>

                        <strong>📝 Comparison Exercise:</strong><br>
                        <em>Uncited Version (showing plagiarism):</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${c2Work.studentWork.comparisonExercise.uncited || 'Not completed'}
                        </div>

                        <em>Properly Cited Version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${c2Work.studentWork.comparisonExercise.cited || 'Not completed'}
                        </div>

                        <em>Reference List:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${c2Work.studentWork.comparisonExercise.references || 'Not completed'}
                        </div>
                    </div>
                `;
            } catch (error) {
                c2Container.innerHTML = '<div class="missing-work">❌ Error loading C2 data: ' + error.message + '</div>';
            }
        }

        // Load C3 Work
        const c3Data = localStorage.getItem('plagiarism-c3-assessment');
        const c3Container = document.getElementById('c3-content');

        if (c3Data) {
            try {
                const c3Work = JSON.parse(c3Data);
                const completedDate = new Date(c3Work.timestamp).toLocaleString();

                c3Container.innerHTML = `
                    <div class="work-section">
                        <strong>📅 Completed:</strong> ${completedDate}<br><br>

                        <strong>🎵 Taylor Swift Reference Correction:</strong><br>
                        <em>Original weak reference:</em> MSN. (2025). Taylor Swift's legal odyssey...<br>
                        <em>Student's improved version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${c3Work.studentWork.taylorSwiftReference || 'Not completed'}
                        </div>

                        <strong>⚖️ Pete Hegseth Reference Correction:</strong><br>
                        <em>Original weak reference:</em> News source on 2025 academic misconduct cases.<br>
                        <em>Student's improved version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${c3Work.studentWork.peteHegsethReference || 'Not completed'}
                        </div>
                    </div>
                `;
            } catch (error) {
                c3Container.innerHTML = '<div class="missing-work">❌ Error loading C3 data: ' + error.message + '</div>';
            }
        }
    }

    // Save instructor assessment
    document.getElementById("save-assessment").onclick = function() {
        const comment = document.getElementById("instructor-comment").value.trim();
        const status = document.getElementById("assessment-status").value;

        if (comment.length === 0 || status === "") {
            showStatusMessage("⚠️ Please provide both comment and status before saving", "error");
            return;
        }

        try {
            const assessmentData = {
                instructorComment: comment,
                assessmentStatus: status,
                timestamp: new Date().toISOString(),
                studentDataReviewed: {
                    c2Available: !!localStorage.getItem('plagiarism-c2-assessment'),
                    c3Available: !!localStorage.getItem('plagiarism-c3-assessment'),
                    c4Available: false // Not implemented yet
                }
            };

            localStorage.setItem('plagiarism-instructor-assessment', JSON.stringify(assessmentData));
            showStatusMessage("✅ Assessment saved successfully!", "success");
        } catch (error) {
            showStatusMessage("❌ Failed to save assessment: " + error.message, "error");
        }
    };

    // Load instructor assessment
    document.getElementById("load-assessment").onclick = function() {
        try {
            const saved = localStorage.getItem('plagiarism-instructor-assessment');
            if (saved) {
                const data = JSON.parse(saved);
                document.getElementById("instructor-comment").value = data.instructorComment;
                document.getElementById("assessment-status").value = data.assessmentStatus;
                const saveDate = new Date(data.timestamp).toLocaleString();
                showStatusMessage(`✅ Assessment loaded! (Saved: ${saveDate})`, "success");
            } else {
                showStatusMessage("⚠️ No saved assessment found", "info");
            }
        } catch (error) {
            showStatusMessage("❌ Failed to load assessment: " + error.message, "error");
        }
    };

    // Refresh student work
    document.getElementById("refresh-student-work").onclick = function() {
        loadStudentWork();
        showStatusMessage("🔄 Student work refreshed from localStorage", "info");
    };

    // Initial load
    loadStudentWork();
    document.getElementById("load-assessment").click();
});
</script>
