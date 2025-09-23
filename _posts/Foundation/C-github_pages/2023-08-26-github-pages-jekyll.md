---
layout: post
breadcrumb: True
toc: True
title: GitHub Pages Jekyll
description: Learn about the power of GitHub Pages and Jekyll
categories: ['GitHub Pages']
permalink: /github/pages/jekyll
comments: True
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jekyll Lesson</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0 auto;
            max-width: 800px;
            padding: 2rem;
            color: #333;
        }
        h2, h3 {
            color: #2c3e50;
        }
        hr {
            border: 0;
            border-top: 1px solid #ddd;
            margin: 2rem 0;
        }
        .frq-box {
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 8px;
            margin: 1.5rem 0;
            background: #f9f9f9;
            box-sizing: border-box;
            /* prevent FRQ content from looking like pre/code and stop overflow */
            overflow: auto;
            word-wrap: break-word;
            white-space: normal;
        }
        /* ensure textarea and feedback are readable against the page background */
        .frq-box textarea,
        .frq-box .feedback-box {
            background: #fff;
            color: #222;
            box-sizing: border-box;
        }
        .frq-box h3, .frq-box b {
            font-size: 1.1em;
            color: #555;
            margin-bottom: 0.5rem;
        }
        textarea {
            font-family: inherit;
            font-size: 1rem;
            padding: 0.5rem;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            margin-top: 0.5rem;
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
        pre {
            background-color: #2d2d2d;
            color: #ccc;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
        }
        code {
            font-family: 'Courier New', monospace;
            background-color: #e9ecef;
            color: #333;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
        }
        pre code {
            background-color: transparent;
            color: #ccc;
        } 
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .feedback-box {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            background-color: #ecf0f1;
            border: 1px solid #bdc3c7;
            display: none;
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
        .hidden { display: none; }
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
        }
        .modal-button {
            background-color: #3498db;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="lesson-part" data-part="1" style="display:block;">
        <h2>Lesson 1: GitHub Pages and Jekyll</h2>
        <p>GitHub Pages leverages the power of Jekyll to transform your Markdown and HTML files into a static website.</p>
        <ol>
            <li><b>Front Matter</b>: All Markdown (.md) and Jupyter Notebook (.ipynb) files with front matter are processed into a static data structure, making their keys and values accessible to the GitHub Pages system via Jekyll.</li>
            <li><b>Jekyll Language</b>: Jekyll can access all site-wide keys and values defined in _config.yml, as well as individual page front matter keys and values. This allows for dynamic organization and rendering of documents based on their metadata.</li>
        </ol>
        <hr>
        <h3>Jekyll and Liquid</h3>
        <p>The primary purpose of Jekyll within GitHub Pages is to help developers create dynamic web pages. By using site and page front matter, you can organize and render pages based on data. Liquid provides the templating syntax that allows you to dynamically generate content within your Jekyll templates. In essence, Jekyll is the system, and Liquid is the templating language.</p>
        <div class="frq-box" data-frq-id="1">
            <b>FRQ 1:</b> Explain the relationship between Jekyll and Liquid. How do they work together to create dynamic content?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="2" style="display:none;">
        <hr>
        <h3>Language Comparisons</h3>
        <p>Since we are mentioning essential programming constructs, following are examples of similar constructs in languages you will be exposed to in the CompSci pathway at Del Norte High School.</p>
        <h4>JavaScript</h4>
        <pre><code class="language-javascript">
// Variable Assignments
var rawposts = site.posts;

// Conditionals
if (posts.length > 0) {
    // conditional code here
}

// Loops
for (let post of site.posts) {
    // repeating code here
}

// Include (Function)
import { function } from './file.js';
        </code></pre>
        <h4>AP CSP Pseudocode</h4>
        <pre><code class="language-plaintext">
// Variable Assignments
rawposts ← site.getPosts()

// Conditionals, they use language "Selection"
IF (LENGTH(posts) > 0) {
    // conditional code here
}

// Loops, they use language "Iteration"
FOR EACH post IN site.getPosts() {
    // repeating code here
}

// Include (Procedure)
INCLUDE function FROM file
        </code></pre>
        <h4>Python</h4>
        <pre><code class="language-python">
# Variable Assignments
rawposts = site.posts

# Conditionals
if len(posts) > 0:
    pass  # conditional code here in place of pass

# Loops
for post in site.posts:
    pass  # repeating code here in place of pass

# Include (Function)
from file import function
        </code></pre>
        <h4>Java</h4>
        <pre><code class="language-java">
import java.util.List;

// Variable Assignments
List<Post> rawposts = site.getPosts();

// Conditionals
if (posts.size() > 0) {
    // conditional code here
}

// Loops
for (Post post : site.getPosts()) {
    // repeating code here
}

// Include (Method)
import static com.example.file.function;
        </code></pre>
        <h4></h4>
        <div class="frq-box" data-frq-id="2">
            <b>FRQ 2:</b> Using the provided examples, compare how a variable is assigned in Liquid to how it's assigned in Python and Java. What is a key difference?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="3" style="display:none;">
        <hr>
        <h3>Blogging Example Code</h3>
        <p>A core part of this project is the blogs layout (_layouts/blogs.html). This file is used to organize the blog list on the website. Read the comments in the code and consider making changes to the data or code to alter the appearance of the blogs. Try to modify the blog layout to better suit your needs or preferences.</p>
        <pre><code class="language-liquid">
{% raw %}

{{ content | markdownify }}

{% assign rawposts = site.posts %}

{% assign posts = '' | split:'' %}
{% for post in rawposts %}
  {% if post.hide != true %}
    {% assign posts = posts | push: post %}
  {% endif %}
{% endfor %}

{% assign grouped_posts = posts | group_by: "sticky_rank" | sort: "name", "last" %}
{% assign sticky_posts = '' | split:'' %}
{% assign non_sticky_posts = '' | split:'' %}
{% for gp in grouped_posts %}
  {%- if gp.name == "" -%}
    {% assign non_sticky_posts = gp.items | sort: "date" | reverse %}
  {%- else %}
    {% assign sticky_posts = sticky_posts | concat: gp.items %}
  {%- endif %}
{% endfor %}

{% assign sticky_posts = sticky_posts | sort: "sticky_rank", "last" %}
{% assign posts = sticky_posts | concat: non_sticky_posts %}
{%- if posts.size > 0 -%}
  {%- if page.list_title -%}
    <h2 class="post-list-heading">{{ page.list_title }}</h2>
  {%- endif -%}
  <ul class="post-list">
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    {%- for post in posts -%}
    <li>
      {%- include post_list_image_card.html -%}
    </li>
    {%- endfor -%}
  </ul>
{%- endif -%}

{% endraw %}
        </code></pre>
        <div class="frq-box" data-frq-id="3">
            <b>FRQ 3:</b> Based on the provided code, how does Jekyll sort the blog posts? What two post properties does it use for sorting?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="4" style="display:none;">
        <hr>
        <h3>HTML Included Code</h3>
        <p>The block of code below is located in the system at _includes/post_list_image_card.html. This file is included in the blogs and generates the HTML for the card. If you want to change the style or appearance of the card output for the blogs, you should modify the _includes/post_list_image_card.html file.</p>
        <pre><code class="language-html">
<div class="Box box-shadow-medium rounded-1 col-12">
  {%- if post.image -%}
  <div class="col-4 d-table-cell p-3 v-align-middle">
      <img class="image-preview" src="{{ post.image | relative_url }}" />
  </div>
  {%- endif -%}
  <div class="col-8 d-table-cell p-3">
      <h3>
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </h3>
      <p class="post-meta-description">{{ post.description }}</p>
      <p class="post-meta">{{ post.date | date: date_format }}</p>
  </div>
</div>
        </code></pre>
        <div class="frq-box" data-frq-id="4">
            <b>FRQ 4:</b> Explain the benefit of using an <code>include</code> file like <code>post_list_image_card.html</code> for generating the blog post card. Why is this a good practice in web development?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="5" style="display:none;">
        <hr>
        <h3>Conclusion</h3>
        <p>
        By understanding the core concepts of Jekyll and Liquid, along with the programming constructs they offer, you can build a dynamic and well-organized website. These foundations are crucial for creating a robust and maintainable site, and they lay the groundwork for more advanced web development concepts.
        </p>
        <div class="frq-box" data-frq-id="5">
            <b>FRQ 5:</b> Summarize in your own words the key benefits of using Jekyll and GitHub Pages for static site generation.<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <script>
        const FRQ_QUESTIONS = {
            '1': "Explain the relationship between Jekyll and Liquid. How do they work together to create dynamic content?",
            '2': "Using the provided examples, compare how a variable is assigned in Liquid to how it's assigned in Python and Java. What is a key difference?",
            '3': "Based on the provided code, how does Jekyll sort the blog posts? What two post properties does it use for sorting?",
            '4': "Explain the benefit of using an `include` file like `post_list_image_card.html` for generating the blog post card. Why is this a good practice in web development?",
            '5': "Summarize in your own words the key benefits of using Jekyll and GitHub Pages for static site generation."
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
                        You are an expert tutor grading a student's answer to a free-response question about Jekyll and Liquid.
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
        // Auto-save FRQ responses into localStorage
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(".frq-box textarea").forEach((textarea, index) => {
                const key = "jekyll_frq_answer_" + index;
                const saved = localStorage.getItem(key);
                if (saved) {
                    textarea.value = saved;
                }
                textarea.addEventListener("input", () => {
                    localStorage.setItem(key, textarea.value);
                });
            });
        });
        // Simple modal for alerts
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
        // Exponential backoff for API retries
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
</body>
</html>
