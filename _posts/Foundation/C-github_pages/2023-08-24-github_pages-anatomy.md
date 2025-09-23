---
layout: post
breadcrumb: True
toc: True
title: Anatomy of GitHub Pages
description: Learn the Files and development work flow of GitHub Pages.  This includes working with you home page, theme, markdown, and more.
categories: ['GitHub Pages']
permalink: /github/pages/anatomy
comments: True
---

<html lang="en">
<head>
  <style>
    /* Reuse consistent lesson styles */
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
        overflow: auto;
        word-wrap: break-word;
        white-space: normal;
    }
    .frq-box textarea,
    .frq-box .feedback-box {
        background: #fff;
        color: #222;
    }
    textarea {
        width: 100%;
        padding: 0.5rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-top: 0.5rem;
    }
    .grade-button {
        background: #3498db;
        color: #fff;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 1rem;
    }
    .feedback-box {
        margin-top: 0.75rem;
        padding: 0.75rem;
        border-radius: 6px;
        background: #f6f9ff;
        border: 1px solid #dbeafe;
        color: #333;
        display: none;
        white-space: pre-wrap;
    }
    .lesson-part {
        display: none;
    }
    .lesson-part[data-part="1"] {
        display: block;
    }
    pre {
        background: #f4f4f4;
        color: #0f172a;
        padding: 0.75rem;
        border-radius: 6px;
        overflow-x: auto;
        margin: 1rem 0;
        white-space: pre; /* preserve code formatting */
        box-sizing: border-box;
    }
    code {
        font-family: "Courier New", Courier, monospace;
        color: #1e6fbe; /* inline code appears blue */
        background: transparent;
        padding: 0 0.2rem;
        border-radius: 3px;
    }
    table,
    p,
    ul,
    ol {
        margin-top: 0.5rem;
        margin-bottom: 0.9rem;
    }
    img {
        max-width: 100%;
        height: auto;
        display: inline-block;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="lesson-part" data-part="1">
        <h2>Anatomy of GitHub Pages files</h2>
        <p>
            Discuss how to develop a home page, code, run local server test, and then sync to deploy to GitHub Pages.
        </p>
        <ul>
            <li>Review tools setup and make in README.md to support this lesson.</li>
        </ul>
        <h3>Files and Directories in this Project</h3>
        <p>
            Here are some definitions to key files and directories in this project:
        </p>
        <ul>
            <li><code>README.md</code>: This file contains instructions and background information about the project. It is a standard file present in all properly set up GitHub projects.</li>
            <li><code>index.md</code>: This is the source file for the home page of the project. It is a standard file for all GitHub Pages projects. Note that Markdown (.md) files are converted to HTML by the Jekyll build process. HTML files are the only file type that is rendered on a website.</li>
            <li><code>_notebooks</code>: This directory contains Jupyter Notebook (.ipynb) files. These files are converted to Markdown (.md) files by the Makefile rules in the build process. The Markdown files are then converted to HTML by the Jekyll build process.</li>
            <li><code>_posts</code>: This directory contains Markdown (.md) files that will be part of the website. These files are formatted similarly to index.md and include frontmatter (metadata coded in YAML) and Markdown, HTML, JavaScript, and CSS source code. You will also find Liquid code in these files, which is used to generate Markdown, HTML, JavaScript, and CSS.</li>
            <li><code>_data</code>: This directory is the standard location for storing data files that support the _posts or _notebooks directories.</li>
            <li><code>images</code>: This directory is the standard location for storing image files (JPEG, PNG, etc.) that support the _posts or _notebooks directories.</li>
            <li><code>_config.yml</code>: This file contains YAML definitions (key-value properties) used to build the Jekyll website.</li>
            <li><code>.gitignore</code>: This file specifies elements to be excluded from version control. Files are excluded when they are derived from the original source and not considered part of the project's source code. In the VSCode Explorer, you may notice some files appearing dimmed, indicating that they are purposely excluded by the rules in .gitignore.</li>
            <li><code>_layouts</code>: This directory contains HTML files used by Jekyll to generate the structure of the website, including blogs, schedules, and home pages. Each post or notebook specifies a layout in its frontmatter, which determines how the content is presented.</li>
            <li><code>scripts</code>: This directory contains scripts such as <code>convert_notebooks.py</code>, which converts Jupyter Notebook (.ipynb) files into Markdown (.md) files. These scripts automate parts of the build process, ensuring that content is properly formatted for the website.</li>
        </ul>
        <p>Please note that there are many other key files and directories in a GitHub Pages project, but we will highlight those as the development progresses.</p>
        <div class="frq-box" data-frq-id="1">
            <b>FRQ 1:</b> What is the purpose of the <code>.gitignore</code> file and why is it important in a project's file structure?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="2">
        <hr>
        <h3>Configuration Notes, behind the scenes</h3>
        <p>
            The <code>_config.yml</code> file is the configuration file for Jekyll. It is a YAML file that defines the configuration of the site. The configuration file can be used to set site-wide variables, and can be used to set variables for specific environments (development, production, etc).
        </p>
        <p>
            Often in code we use the <code>site.baseurl</code> to identify the path to files. GitHub actions uses this location in its build to identify the name of the project. Be sure the values of these keys match your GitHub Repo.
        </p>
        <pre><code>
    github_repo: "pages"
    baseurl: "/pages"
    </code></pre>
    <p>
    Many remote theme files are commented out, you can only have one at a time. The Teacher is in favor of using the <code>minima</code> theme. To change these themes it could require many other changes to make it effective. Themes and related CSS changes are below, but they are not complete. IMO, you would need to disable minima or reorganize a lot of files.
    </p>
    <pre><code>
    theme requirements
    remote_theme: pages-themes/midnight@v0.2.0
    remote_theme: pages-themes/dinky@v0.2.0
    remote_theme: pages-themes/minimal@v0.2.0
    remote_theme: pages-themes/hacker@v0.2.0
    remote_theme: pages-themes/cayman@v0.2.0
    remote_theme: pages-themes/time-machine@v0.2.0
        </code></pre>
        <p>
            Under _includes/theme you will see directories that correspond to your selection. In each of these directories there is a base.html. This is the foundation for the page: head, body, footer. When you select a layout in the frontmatter of your pages, it ultimately includes the base.html from one of these directories. To understand how a web page is formed, these are excellent studies.
        </p>
        <div class="frq-box" data-frq-id="2">
            <b>FRQ 2:</b> Describe the function of the <code>_config.yml</code> file in a Jekyll project. How does it relate to the `remote_theme` setting?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="3">
        <hr>
        <h2>Customizations</h2>
        <p>
            Each student should perform customization to their project. This is an opportunity to learn a few concepts from 'teacher' repository and then customize your own page to your personal interests.
        </p>
        <h3>Customize a Page</h3>
        <p>
            The home page to other pages is a common first step in building a project. To start you will need to form your <code>index.md</code> in your project, which behind the scenes is generated into an <code>index.html</code> by the GitHub Pages build process.
        </p>
        <h3>Change Title</h3>
        <p>
            Every page should have a <code>title</code>. Here is frontmatter sample. This uses the <code>_layouts/page.html</code> that reads the frontmatter title and places it at the top page.
        </p>
        <pre><code>
    layout: page title: My Title
        </code></pre>
        <p>
            If you look at the page layout you will see it includes base, or base.html according to the selected theme. This nesting is foundation of how GitHub Pages and Jekyll work.
        </p>
        <p>
            Look at some of the layouts that form schedule, search, blogs, and each post. Between this structure and Jekyll you can automate almost any reconfiguration of the notebooks and posts.
        </p>
        <div class="frq-box" data-frq-id="3">
            <b>FRQ 3:</b> What is the purpose of "frontmatter" in a Jekyll Markdown file, and how does the <code>layout</code> key specifically function?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="4">
        <hr>
        <h3>Making a Submenu</h3>
        <p>
            There are many submenus made in <code>_includes/nav</code>.
        </p>
        <ul>
            <li><code>index.md</code> is the file that contains markdown for a submenu</li>
            <li><code>_includes/nav/home.html</code> contains code for submenu, it is included in every page in this dialog</li>
            <li><code>{{site.baseurl}}</code> refers to baseurl defined in <code>_config.yml</code>, this is the location of all files in WebSite. Note, this changes as you run on localhost and deployed; make sure you remember to use this for locations of files in site.</li>
        </ul>
        <pre><code>
    <table>
    <tr>
    <td><img src="{{site.baseurl}}/images/logo.png" height="60" title="Frontend" alt=""></td>
    <td><a href="{{site.baseurl}}/index">Course</a></td>
    <td><a href="{{site.baseurl}}/home/table">Table</a></td>
    <td><a href="{{site.baseurl}}/home/about">About</a></td>
    </tr>
    </table>
        </code></pre>
        <p>
        Look how the same submenu is included on all of the pages it calls, you will notices this in the frontmatter menu key.
        </p>
        <div class="frq-box" data-frq-id="4">
            <b>FRQ 4:</b> Explain the role of <code>{{site.baseurl}}</code> in Jekyll. Why is it important to use this variable instead of a hardcoded path like `/images/logo.png`?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <div class="lesson-part" data-part="5">
        <hr>
        <h3>Style revolves around _sass</h3>
        <p>
            In the <code>_sass</code> folder there are many theme files. Remember that are themes are <code>remote</code> as designated in the <code>_config.yml</code> line. However, some files are placed in the _sass directory to make customizations. It is best to only have files in your project that you need to customize.
        </p>
        <p>
            The <code>_sass/minima</code> folder is a theme with many subthemes that can be changed in the <code>_sass/minima/custom-styles.scss</code> file. In the below example <code>_dracula</code>. You could switch to leaf, hacker, hamilton, etc. Then you will want to decide if you want <code>dark-mode</code>. Always include the <code>nighthawk/main</code> as it has customization to style for Nighthawk Pagees.
        </p>
        <pre><code>
    // Comment in or Uncomment out the following themes to use them
    // Dark themes
    //@import "minima/leaf/_leaf";  //Leaf theme
    //@import "minima/hacker/jekyll-theme-hacker"; //Hacker theme
    @import "minima/dracula/_dracula";
    // Light themes
    //@import "minima/hamilton/main"; //Hamilton theme
    //@import "minima/monophase/main"; //Monophase theme
    //@import "minima/minimal-mistakes/__minimal-mistakes"; //Minimal Mistakes theme
    // Mix Light themes with this if your eyes are bleeding
    @import "minima/dracula/dark-mode";
    // Styles for nighthawk theme, do not remove
    @import "nighthawk/main";
        </code></pre>
        <div class="frq-box" data-frq-id="5">
            <b>FRQ 5:</b> Explain the purpose of the <code>@import</code> rule within an SCSS file like <code>custom-styles.scss</code>. How does this allow for theme customization?<br><br>
            <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
            <button class="grade-button" style="margin-top: 10px;">Grade</button>
            <div class="feedback-box"></div>
        </div>
    </div>
    <script>
        const FRQ_QUESTIONS = {
            "1": "What is the purpose of the .gitignore file and why is it important in a project's file structure?",
            "2": "Describe the function of the _config.yml file in a Jekyll project. How does it relate to the `remote_theme` setting?",
            "3": "What is the purpose of 'frontmatter' in a Jekyll Markdown file, and how does the layout key specifically function?",
            "4": "Explain the role of {{site.baseurl}} in Jekyll. Why is it important to use this variable instead of a hardcoded path like `/images/logo.png`?",
            "5": "Explain the purpose of the @import rule within an SCSS file like custom-styles.scss. How does this allow for theme customization?"
        };
        const gradeButtons = document.querySelectorAll(".grade-button");
        gradeButtons.forEach(button => {
            button.addEventListener("click", async () => {
                const frqBox = button.closest(".frq-box");
                const frqId = frqBox.dataset.frqId;
                const questionText = FRQ_QUESTIONS[frqId];
                const studentResponseTextArea = frqBox.querySelector("textarea");
                const feedbackBox = frqBox.querySelector(".feedback-box");
                const studentResponse = studentResponseTextArea.value.trim();
                if (!studentResponse) {
                    showModal("Please enter your response before submitting.");
                    return;
                }
                button.disabled = true;
                feedbackBox.style.display = "block";
                feedbackBox.innerHTML = '<div class="flex items-center space-x-2"><div class="loading-spinner"></div><span>Grading...</span></div>';
                try {
                    const systemPrompt = `
                        You are an expert tutor grading a student's answer to a free-response question about GitHub Pages and Jekyll.
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
                        Format your final output with a clear heading for the grade and the feedback. Do not use markdown heading tags (like # or ##) as it messes with the display.
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
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    const feedbackText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate feedback. Please try again.";
                    const formattedFeedback = feedbackText
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br>");
                    feedbackBox.innerHTML = formattedFeedback;
                    const gradeMatch = feedbackText.match(/Grade:\s*(\d)\/5/);
                    if (gradeMatch && parseInt(gradeMatch[1], 10) >= 4) {
                        const currentPart = parseInt(frqBox.closest(".lesson-part").dataset.part, 10);
                        const nextPart = document.querySelector(`.lesson-part[data-part="${currentPart + 1}"]`);
                        if (nextPart) {
                            nextPart.style.display = "block";
                            nextPart.scrollIntoView({ behavior: "smooth" });
                        }
                    }
                } catch (error) {
                    console.error("Error generating feedback:", error);
                    feedbackBox.innerHTML = '<span style="color:red;">An error occurred while grading. Please try again.</span>';
                } finally {
                    button.disabled = false;
                }
            });
        });
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(".frq-box textarea").forEach((textarea, index) => {
                const key = "github_pages_frq_answer_" + index;
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
            const modal = document.createElement("div");
            modal.className = "modal";
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
  </div>
</body>
</html>