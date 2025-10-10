---
layout: post
title: Quill Editor & Flask/Gemini API request 
permalink: /word
---

<link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<style>
/* Target the output container */
#output {
    /* Ensure long content and formatting is handled correctly */
    padding: 10px;
    /* Allows text to wrap naturally inside the div */
    word-wrap: break-word;
    overflow-wrap: break-word;
}
</style>

<div id="quill-editor" style="height: 200px;"></div>
<button id="checkBtn">Check for Plagiarism</button>
<div id="output"></div>

<script type="module">
    // API Endpoint
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    const ENDPOINT = `${pythonURI}/api/gemini`;

    document.addEventListener("DOMContentLoaded", function() {
    var quill = new Quill('#quill-editor', {
        theme: 'snow'
    });

    document.getElementById("checkBtn").onclick = function() {
        const text = quill.getText();
        const outputDiv = document.getElementById("output");
        outputDiv.textContent = "⏳ Checking..."; // Use textContent for temporary status

        fetch(ENDPOINT, {
            ...fetchOptions,
            method: "POST",
            body: JSON.stringify({
                prompt: "Please look at this text for correct academic citations, and recommend APA references for each area of concern: ",
                text: text
            })
        })
        .then(resp => {
            if (!resp.ok) return resp.text().then(text => { throw new Error(text); });
            return resp.json();
        })
        .then(result => {
            if (result.error || result.message) {
                // Handle error responses - use the message from API
                let errorMsg = result.error || result.message || "Unknown error";

                // Add error code if present
                if (result.error_code) {
                    errorMsg += ` (Error ${result.error_code})`;
                }

                outputDiv.textContent = "⚠️ " + errorMsg;

                // Special handling for authentication errors
                if (result.message && result.message.includes("Authentication")) {
                    outputDiv.textContent += " (Login required)";
                }
            } else if (result.success && result.text) {
                // Handle successful response - the analysis is in result.text
                const markdown = result.text;

                // Convert the Markdown content into fully styled HTML
                const htmlContent = marked.parse(markdown);

                // Insert the formatted HTML into the output div
                outputDiv.innerHTML = htmlContent;
            } else {
                outputDiv.textContent = "✅ Analysis complete: No clear analysis provided by the backend.";
            }
        })
        .catch(e => {
            outputDiv.textContent = "⚠️ Fetch Error: " + e;
        });
    };
    });
</script>
