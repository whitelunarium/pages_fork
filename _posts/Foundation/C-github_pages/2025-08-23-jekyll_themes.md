---
layout: post
breadcrumb: True
toc: True
title: Jekyll Themes
description: Builds upon the first lesson of Jekyll Themes to ensure understanding, and has questions to test your knowledge,. Jekyll Themes willbe crucial, so it is important to understand it. 
categories: ['GitHub Pages']
permalink: /github/pages/jekylltwo
comments: True
authors: Ahaan Vaidyanathan, Nikhil Naryan, Arnav Mittal, Xavier Thompson, Spencer Lyons, Sharuya Singh
---

<h2>Lesson 3: Jekyll Themes</h2>

<h3>Introduction</h3>
<p>
Jekyll themes provide a powerful way to quickly style and structure your GitHub Pages website without extensive CSS coding. 
This lesson will further delve into how Jekyll themes work, how to switch between them, and how to troubleshoot common issues, 
enabling you to effectively manage your site’s visual presentation. 
</p>

<hr>

<h3>Understanding Jekyll Themes</h3>
<p>
A Jekyll theme is a collection of layouts, includes, stylesheets, and scripts that define the look and feel of your website. 
When you apply a theme, Jekyll uses these files to render your content consistently across all pages. 
This modular approach allows for rapid development and easy customization.
</p>

<ul>
  <li><b>Layouts:</b> HTML files (e.g., <code>default.html</code>, <code>page.html</code>, <code>post.html</code>) that provide the overall structure. Your content is injected into these layouts.</li>
  <li><b>Includes:</b> Reusable HTML snippets (e.g., headers, footers, navigation menus).</li>
  <li><b>Assets:</b> CSS, JavaScript, and images that control visual design and interactivity.</li>
  <li><b>Configuration:</b> Theme-specific settings often defined in <code>_config.yml</code> or in the theme’s own configuration files.</li>
</ul>

<div class="frq-box">
  <b>FRQ 1:</b> Explain why Jekyll uses layouts and includes. How do these features make web development easier?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<hr>

<h3>Theme Switching Guide</h3>
<p>
Switching between Jekyll themes involves modifying your <code>_config.yml</code> file and ensuring that the necessary theme files are correctly referenced. 
The process can be simplified using scripts or by directly editing the configuration.
</p>

<pre><code class="language-yaml">
# Example snippet from _config.yml
remote_theme: jekyll/minima
</code></pre>

<div class="frq-box">
  <b>FRQ 2:</b> Describe the role of <code>_config.yml</code> in Jekyll. Why is it important for themes?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<hr>

<h3>Theme Features (Minima vs. TeXt)</h3>
<p>Different themes offer distinct features and design philosophies. Here’s a comparison of two popular Jekyll themes:</p>

<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse; width:100%;">
  <tr>
    <th>Feature</th>
    <th>Minima Theme</th>
    <th>TeXt Theme</th>
  </tr>
  <tr>
    <td><b>Design</b></td>
    <td>Clean, minimal</td>
    <td>Modern iOS 11-inspired</td>
  </tr>
  <tr>
    <td><b>Dark Mode</b></td>
    <td>Supported</td>
    <td>Supported (6 skins)</td>
  </tr>
  <tr>
    <td><b>Responsiveness</b></td>
    <td>Mobile responsive</td>
    <td>Mobile responsive</td>
  </tr>
  <tr>
    <td><b>Math/Diagrams</b></td>
    <td>Limited</td>
    <td>MathJax & Mermaid supported</td>
  </tr>
</table>

<div class="frq-box">
  <b>FRQ 3:</b> Compare the strengths of Minima and TeXt. Which would you choose and why?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<hr>

<h3>Troubleshooting Theme Issues</h3>
<ol>
  <li><b>Missing SASS Variables:</b> Ensure your theme installation is complete.</li>
  <li><b>Build Errors:</b> Run <code>make clean && make</code> or <code>bundle exec jekyll build</code>.</li>
  <li><b>Theme Not Switching:</b> Double-check the <code>remote_theme</code> value in <code>_config.yml</code>.</li>
  <li><b>Backup:</b> Always back up <code>_config.yml</code> before big changes.</li>
</ol>

<div class="frq-box">
  <b>FRQ 4:</b> A student’s theme won’t switch even after editing <code>_config.yml</code>. What steps would you take to troubleshoot?<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<hr>

<h3>Conclusion</h3>
<p>
Jekyll themes are a powerful asset for creating visually appealing and functional GitHub Pages sites. 
By understanding their structure, switching methods, and troubleshooting techniques, you can leverage themes to enhance your web projects and focus more on content creation rather than design details.
</p>

<div class="frq-box">
  <b>FRQ 5:</b> Summarize in your own words why themes are valuable for developers using Jekyll.<br><br>
  <textarea rows="5" style="width:100%;" placeholder="Type your response here..."></textarea>
</div>

<style>
.frq-box {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;
  background: #f9f9f9;
}
textarea {
  font-family: inherit;
  font-size: 1rem;
  padding: 6px;
}
</style>

<script>
// Auto-save FRQ responses into localStorage
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".frq-box textarea").forEach((textarea, index) => {
    const key = "jkyl_frq_answer_" + index;

    // Load saved response
    const saved = localStorage.getItem(key);
    if (saved) {
      textarea.value = saved;
    }

    // Save on input
    textarea.addEventListener("input", () => {
      localStorage.setItem(key, textarea.value);
    });
  });
});
</script>