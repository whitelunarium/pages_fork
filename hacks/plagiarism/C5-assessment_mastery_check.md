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
    color: #495057;
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
        // Helper function to safely get value or show 'Not available'
        function safeValue(obj, path, defaultValue = 'Not available') {
            return path.split('.').reduce((current, key) => current && current[key], obj) || defaultValue;
        }
        
        // Load C2 Work - Check both new individual keys and old assessment format
        const c2Container = document.getElementById('c2-content');
        const c2_1_data = localStorage.getItem('plagiarism-c2-1');
        const c2_2_data = localStorage.getItem('plagiarism-c2-2');
        const c2AssessmentData = localStorage.getItem('plagiarism-c2-assessment');
        
        let c2HasData = false;
        let c2Content = '';
        
        if (c2_1_data || c2_2_data || c2AssessmentData) {
            c2HasData = true;
            c2Content = '<div class="work-section">';
            
            // Try to get data from individual exercises first
            if (c2_1_data) {
                try {
                    const salemData = JSON.parse(c2_1_data);
                    const saveDate = new Date(salemData.timestamp).toLocaleString();
                    c2Content += `
                        <strong>📅 Salem Exercise Completed:</strong> ${saveDate}<br><br>
                        <strong>🎯 Salem's Citation Exercise:</strong><br>
                        <em>In-text Citation:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(salemData, 'citation')}
                        </div>
                        <em>Reference List Entry:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(salemData, 'reference')}
                        </div><br>
                    `;
                } catch (error) {
                    c2Content += '<div style="color: red;">❌ Error loading Salem exercise data</div><br>';
                }
            }
            
            if (c2_2_data) {
                try {
                    const comparisonData = JSON.parse(c2_2_data);
                    const saveDate = new Date(comparisonData.timestamp).toLocaleString();
                    c2Content += `
                        <strong>📅 Comparison Exercise Completed:</strong> ${saveDate}<br><br>
                        <strong>📝 Comparison Exercise:</strong><br>
                        <em>Uncited Version (showing plagiarism):</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(comparisonData, 'uncited')}
                        </div>
                        <em>Properly Cited Version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(comparisonData, 'cited')}
                        </div>
                        <em>Reference List:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(comparisonData, 'references')}
                        </div>
                    `;
                } catch (error) {
                    c2Content += '<div style="color: red;">❌ Error loading comparison exercise data</div>';
                }
            }
            
            // Fallback to old assessment format if individual exercises not found
            if (!c2_1_data && !c2_2_data && c2AssessmentData) {
                try {
                    const c2Work = JSON.parse(c2AssessmentData);
                    const completedDate = new Date(c2Work.timestamp).toLocaleString();
                    c2Content += `
                        <strong>📅 Assessment Completed:</strong> ${completedDate}<br><br>
                        <strong>🎯 Salem's Citation Exercise:</strong><br>
                        <em>In-text Citation:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c2Work, 'studentWork.salemExercise.citation')}
                        </div>
                        <em>Reference List Entry:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c2Work, 'studentWork.salemExercise.reference')}
                        </div>
                        <strong>📝 Comparison Exercise:</strong><br>
                        <em>Uncited Version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c2Work, 'studentWork.comparisonExercise.uncited')}
                        </div>
                        <em>Properly Cited Version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c2Work, 'studentWork.comparisonExercise.cited')}
                        </div>
                        <em>Reference List:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c2Work, 'studentWork.comparisonExercise.references')}
                        </div>
                    `;
                } catch (error) {
                    c2Content += '<div style="color: red;">❌ Error loading C2 assessment data</div>';
                }
            }
            
            c2Content += '</div>';
        }
        
        if (c2HasData) {
            c2Container.innerHTML = c2Content;
        }

        // Load C3 Work - Check both new individual keys and old assessment format
        const c3Container = document.getElementById('c3-content');
        const c3_1_data = localStorage.getItem('plagiarism-c3-1');
        const c3_2_data = localStorage.getItem('plagiarism-c3-2');
        const c3AssessmentData = localStorage.getItem('plagiarism-c3-assessment');
        
        let c3HasData = false;
        let c3Content = '';
        
        if (c3_1_data || c3_2_data || c3AssessmentData) {
            c3HasData = true;
            c3Content = '<div class="work-section">';
            
            // Try to get data from individual exercises first
            if (c3_1_data) {
                try {
                    const taylorData = JSON.parse(c3_1_data);
                    const saveDate = new Date(taylorData.timestamp).toLocaleString();
                    c3Content += `
                        <strong>📅 Taylor Swift Exercise Completed:</strong> ${saveDate}<br><br>
                        <strong>🎵 Taylor Swift Reference Correction:</strong><br>
                        <em>Original weak reference:</em> ${safeValue(taylorData, 'originalReference', 'MSN. (2025). Taylor Swift\'s legal odyssey...')}<br>
                        <em>Student's improved version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(taylorData, 'correctedReference')}
                        </div><br>
                    `;
                } catch (error) {
                    c3Content += '<div style="color: red;">❌ Error loading Taylor Swift exercise data</div><br>';
                }
            }
            
            if (c3_2_data) {
                try {
                    const peteData = JSON.parse(c3_2_data);
                    const saveDate = new Date(peteData.timestamp).toLocaleString();
                    c3Content += `
                        <strong>📅 Pete Hegseth Exercise Completed:</strong> ${saveDate}<br><br>
                        <strong>⚖️ Pete Hegseth Reference Correction:</strong><br>
                        <em>Original weak reference:</em> ${safeValue(peteData, 'originalReference', 'News source on 2025 academic misconduct cases.')}<br>
                        <em>Student's improved version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(peteData, 'correctedReference')}
                        </div>
                    `;
                } catch (error) {
                    c3Content += '<div style="color: red;">❌ Error loading Pete Hegseth exercise data</div>';
                }
            }
            
            // Fallback to old assessment format if individual exercises not found
            if (!c3_1_data && !c3_2_data && c3AssessmentData) {
                try {
                    const c3Work = JSON.parse(c3AssessmentData);
                    const completedDate = new Date(c3Work.timestamp).toLocaleString();
                    c3Content += `
                        <strong>📅 Assessment Completed:</strong> ${completedDate}<br><br>
                        <strong>🎵 Taylor Swift Reference Correction:</strong><br>
                        <em>Original weak reference:</em> MSN. (2025). Taylor Swift's legal odyssey...<br>
                        <em>Student's improved version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c3Work, 'studentWork.taylorSwiftReference')}
                        </div>
                        <strong>⚖️ Pete Hegseth Reference Correction:</strong><br>
                        <em>Original weak reference:</em> News source on 2025 academic misconduct cases.<br>
                        <em>Student's improved version:</em><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c3Work, 'studentWork.peteHegsethReference')}
                        </div>
                    `;
                } catch (error) {
                    c3Content += '<div style="color: red;">❌ Error loading C3 assessment data</div>';
                }
            }
            
            c3Content += '</div>';
        }
        
        if (c3HasData) {
            c3Container.innerHTML = c3Content;
        }
        
        // Load C4 Work (placeholder for future - check for c4-1)
        const c4Container = document.getElementById('c4-content');
        const c4_1_data = localStorage.getItem('plagiarism-c4-1');
        
        if (c4_1_data) {
            try {
                const c4Work = JSON.parse(c4_1_data);
                const completedDate = new Date(c4Work.timestamp).toLocaleString();
                c4Container.innerHTML = `
                    <div class="work-section">
                        <strong>📅 Completed:</strong> ${completedDate}<br><br>
                        <strong>✍️ C4 Exercise:</strong><br>
                        <div style="padding: 8px; background: white; border-radius: 4px; margin: 5px 0;">
                            ${safeValue(c4Work, 'content', 'C4 content structure to be defined')}
                        </div>
                    </div>
                `;
            } catch (error) {
                c4Container.innerHTML = '<div class="missing-work">❌ Error loading C4 data: ' + error.message + '</div>';
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
