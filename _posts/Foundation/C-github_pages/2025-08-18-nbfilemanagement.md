---
layout: post
breadcrumb: True
toc: True
title: Using JS (+ other Languages) in Jupyter Notebooks
description: Further your understanding off Javascript setup and Juypter Notebooks. This lesson will test all your understanding, with questions for you to type responses. 
categories: ['GitHub Pages']
permalink: /github/pages/jp
comments: True
---

<style>
    /* Override theme colors for all lesson content */
    .lesson-part {
        color: #e0e0e0 !important;
    }
    .lesson-part h2, .lesson-part h3, .lesson-part h4 {
        color: #ffffff !important;
    }
    .lesson-part p, .lesson-part li {
        color: #e0e0e0 !important;
    }
    .lesson-part code {
        background-color: rgba(40, 44, 52, 0.8) !important;
        color: #abb2bf !important;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
    }
    .lesson-part pre {
        background-color: #282c34 !important;
        color: #abb2bf !important;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
    }
    .lesson-part pre code {
        background-color: transparent !important;
        color: inherit !important;
    }
    
    .frq-box {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 8px;
        margin: 1.5rem 0;
        background: rgba(249, 249, 249, 0.95);
        color: #333 !important;
    }
    .frq-box h3, .frq-box b {
        font-size: 1.1em;
        color: #333 !important;
        margin-bottom: 0.5rem;
    }
    .frq-box textarea {
        color: #333 !important;
        background: white !important;
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 4px;
    }
    .grade-button {
        display: inline-block;
        background-color: #3498db;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 1rem;
        transition: background-color 0.3s ease;
    }
    .grade-button:hover {
        background-color: #2980b9;
    } 
    .grade-button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
    }
    .feedback-box {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        background-color: rgba(236, 240, 241, 0.95) !important;
        border: 1px solid #bdc3c7;
        color: #2c3e50 !important;
        display: none;
    }
    .feedback-box * {
        color: #2c3e50 !important;
    }
    .loading-spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #3498db;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .space-x-2 > * + * { margin-left: 0.5rem; }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        color: #333 !important;
    }
    .modal-content * {
        color: #333 !important;
    }
    .modal-button {
        background-color: #3498db;
        color: white !important;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
</style>

<div class="lesson-part" data-part="1" style="display:block;">

Lesson 1: An Introduction to Jupyter Notebooks

Introduction to Jupyter

Jupyter Notebooks are a powerful, open-source web application that allows you to create and share documents containing live code, equations, visualizations, and narrative text. They are widely used in data science, scientific computing, and education for their interactive and reproducible nature. The "Jupyter" name is a combination of the core languages it was originally built for: Julia, Python, and R. Today, Jupyter supports a vast ecosystem of languages through its kernel architecture.

A Jupyter Notebook is composed of a series of cells. There are two primary types of cells:

- Code Cells: These contain code for a specific programming language. When you run a code cell, the output (like a printed value, a plot, or an error message) is displayed directly below it.
- Markdown Cells: These cells are for text documentation. You can use Markdown, a simple markup language, to format your text with headings, bolding, italics, lists, and links. This allows you to add explanations, comments, and structure to your work.

<div class="frq-box" data-frq-id="1">
    <b>FRQ 1:</b> In your own words, what is the core purpose of a Jupyter Notebook, and how do its two main cell types contribute to this purpose?<br><br>
    <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
    <button class="grade-button" style="margin-top: 10px;">Grade</button>
    <div class="feedback-box"></div>
</div>

</div>

<div class="lesson-part" data-part="2" style="display:none;">

### Integrating JavaScript into Jupyter

While Jupyter is most commonly associated with Python, its versatility allows it to run other languages. By default, a standard Jupyter environment runs a Python kernel. To execute JavaScript directly, you can use a special command known as a **magic command**.

The `%%javascript` magic command tells the notebook to interpret the content of the entire cell as JavaScript code. This is a powerful feature because it allows you to:

- **Create Interactive Visualizations:** Use JavaScript libraries like D3.js or Plotly.js to build dynamic, interactive charts and graphs that go beyond static images.
- **Develop Web Components:** Test and prototype small web applications or UI elements directly within your notebook, complete with HTML, CSS, and JavaScript.
- **Debug and Explore:** Use the browser's developer tools to inspect and debug your code.

#### Executing JavaScript and Debugging

1. **Open Developer Tools:** In your web browser (Chrome, Firefox, etc.), you can access the developer console. In VSCode, navigate to `Help > Toggle Developer Tools`.
2. **Access the Console:** Select the **Console** tab to view the output from your `console.log()` statements and any errors or warnings generated by your JavaScript.
3. **Execute Code:** After writing your `%%javascript` cell, click the "Run" button to execute it. The output will appear in the cell's output area and the browser's console.

<div class="frq-box" data-frq-id="2">
    <b>FRQ 2:</b> How does the <code>%%javascript</code> magic command enable a Python-based Jupyter Notebook to execute JavaScript, and what is the key tool you would use to see the results of your JavaScript code?<br><br>
    <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
    <button class="grade-button" style="margin-top: 10px;">Grade</button>
    <div class="feedback-box"></div>
</div>

</div>

<div class="lesson-part" data-part="3" style="display:none;">

### Example: Interactive Data Structures

To demonstrate the power of JavaScript in a notebook, let's create a small application that uses an array of objects to store jokes. This structure is more flexible than a simple array of strings because it allows you to store multiple pieces of related information for each item.

#### Programmer Jokes

In this example, each joke is an object with two properties: `joke` and `complexity`. This structured data allows us to easily access more than just the joke text.

```javascript
%%javascript
var compsci_joke_list = [
    { joke: "Why do programmers prefer dark mode? Because light attracts bugs.", complexity: "1" },
    { joke: "Why do Java developers wear glasses? Because they don't see sharp.", complexity: "2" },
    { joke: "How many programmers does it take to change a light bulb? None, that's a hardware problem.", complexity: "1" },
    { joke: "Why do Python programmers prefer snake_case? Because they can't C.", complexity: "2" },
    { joke: "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.", complexity: "3" },
    { joke: "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.", complexity: "3" },
    { joke: "Why did the programmer quit his job? Because he didn't get arrays.", complexity: "O(n)" },
    { joke: "Why do Linux programmers prefer using the terminal? Because they don't like Windows.", complexity: "1" }
];
var randomIndex = Math.floor(Math.random() * compsci_joke_list.length);
var selectedJoke = compsci_joke_list[randomIndex];
console.log("Joke #" + (randomIndex + 1) + ": " + selectedJoke.joke + " (Complexity: " + selectedJoke.complexity + ")");
```

<div class="frq-box" data-frq-id="3">
    <b>FRQ 3:</b> Explain why using an array of objects for the programmer jokes is a more extensible design than a simple array of strings.<br><br>
    <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
    <button class="grade-button" style="margin-top: 10px;">Grade</button>
    <div class="feedback-box"></div>
</div>

</div>

<div class="lesson-part" data-part="4" style="display:none;">

### File Management and Best Practices for GitHub Pages

Jupyter Notebooks are excellent for local development, but to share them on the web, you often need to convert them to a static format. GitHub Pages provides a seamless way to do this, especially when using a tool like Jekyll.

1. **Organize Your Files:** Place all your `.ipynb` files in a dedicated directory, such as `_notebooks`. This keeps your project organized and makes it easy for GitHub Pages to find and convert them.
2. **Pull and Push:** Use standard Git commands (`git clone`, `git pull`, `git add`, `git commit`, `git push`) to manage your project repository.
3. **Add Frontmatter:** To properly render notebooks as webpages, you need to include **YAML Frontmatter** at the very top of your notebook file. This is a special block of text enclosed by `---` that provides metadata for Jekyll, such as the `permalink` (the URL for the page) and the `layout` (the HTML template to use).

<div class="frq-box" data-frq-id="4">
    <b>FRQ 4:</b> Why is it a best practice to use a separate directory for Jupyter Notebook files and to include YAML frontmatter in each notebook when deploying to GitHub Pages?<br><br>
    <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
    <button class="grade-button" style="margin-top: 10px;">Grade</button>
    <div class="feedback-box"></div>
</div>

</div>

<script>
    const FRQ_QUESTIONS = {
        '1': "In your own words, what is the core purpose of a Jupyter Notebook, and how do its two main cell types contribute to this purpose?",
        '2': "How does the `%%javascript` magic command enable a Python-based Jupyter Notebook to execute JavaScript, and what is the key tool you would use to see the results of your JavaScript code?",
        '3': "Explain why using an array of objects for the programmer jokes is a more extensible design than a simple array of strings.",
        '4': "Why is it a best practice to use a separate directory for Jupyter Notebook files and to include YAML frontmatter in each notebook when deploying to GitHub Pages?"
    };

    const gradeButtons = document.querySelectorAll('.grade-button');
    gradeButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const frqBox = button.closest('.frq-box');
            const frqId = frqBox.dataset.frqId;
            const questionText = FRQ_QUESTIONS[frqId];
            const studentResponseTextArea = frqBox.querySelector('textarea');
            const feedbackBox = frqBox.querySelector('.feedback-box');
            const studentResponse = studentResponseTextArea.value.trim();

            if (!studentResponse) {
                showModal("Please enter your response before submitting.");
                return;
            }

            // Show loading state
            button.disabled = true;
            feedbackBox.style.display = 'block';
            feedbackBox.innerHTML = '<div class="flex items-center space-x-2"><div class="loading-spinner"></div><span>Grading...</span></div>';

            try {
                const systemPrompt = `
                    You are an expert tutor grading a student's answer to a free-response question about Jupyter Notebooks and JavaScript.
                    Your task is to:
                    1. Determine a grade for the student's response based on the following 1-5 scale:
                       - 5: The answer addresses all parts of the question and is detailed and comprehensive.
                       - 4: The answer is correct and addresses most parts of the question.
                       - 3: The answer is correct but may be incomplete or lack detail.
                       - 2: The answer has significant inaccuracies or is incomplete.
                       - 1: The answer is incorrect or does not address the question.
                       Write the grade like this: "Grade: (1-5)/5"
                    2. Provide detailed, constructive feedback explaining the grade.
                    3. Offer very short suggestions on what the user could improve on, enough to give them a hint but not enough for them to figure out what to answer.
                    The question is: "${questionText}"
                    The student's response is: "${studentResponse}"
                    Format your final output with a clear heading for the grade and the feedback. Also, in the final output don't include hashtags to make your text bigger, it messes with the system on my end.
                `;

                const apiKey = "AIzaSyB3Ky_RSgPsdXBt5I32ZVWRZ09Ont5_xmQ";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
                
                const payload = {
                    contents: [{
                        parts: [
                            { text: systemPrompt }
                        ]
                    }]
                };

                const response = await fetchWithBackoff(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const feedbackText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate feedback. Please try again.";
                
                const formattedFeedback = feedbackText
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br>');
                
                feedbackBox.innerHTML = formattedFeedback;

                // Unlock next part if grade is 4 or 5
                const gradeMatch = feedbackText.match(/Grade:\s*(\d)\/5/);
                if (gradeMatch && parseInt(gradeMatch[1], 10) >= 4) {
                    const currentPart = parseInt(frqBox.closest('.lesson-part').dataset.part, 10);
                    const nextPart = document.querySelector(`.lesson-part[data-part="${currentPart + 1}"]`);
                    if (nextPart) {
                        nextPart.style.display = 'block';
                        nextPart.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } catch (error) {
                console.error("Error generating feedback:", error);
                feedbackBox.innerHTML = `<span style="color:red;">An error occurred while grading. Please try again.</span>`;
            } finally {
                button.disabled = false;
            }
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".frq-box textarea").forEach((textarea, index) => {
            const key = "js_lesson_frq_answer_" + index;
            const saved = localStorage.getItem(key);
            if (saved) {
                textarea.value = saved;
            }
            textarea.addEventListener("input", () => {
                localStorage.setItem(key, textarea.value);
            });
        });
    });

    function showModal(message) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <p>${message}</p>
                <button class="modal-button" onclick="this.closest('.modal').remove()">OK</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (response.status === 429 && i < retries - 1) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                    continue;
                }
                return response;
            } catch (error) {
                if (i < retries - 1) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                    continue;
                }
                throw error;
            }
        }
    }
</script>