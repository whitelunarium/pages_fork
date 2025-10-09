---
layout: post
title: Editor & Plagiarism Checker
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

<script>
    // NOTE: Replace this with your actual, secure key
    const API_KEY = "AIzaSyC4HYxzGJOXC3YDrSk2GHflfHPokk2nlTQ";
    // Using the current recommended model
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    document.addEventListener("DOMContentLoaded", function() {
    var quill = new Quill('#quill-editor', {
        theme: 'snow'
    });

    document.getElementById("checkBtn").onclick = function() {
        const text = quill.getText();
        const outputDiv = document.getElementById("output");
        outputDiv.textContent = "⏳ Checking..."; // Use textContent for temporary status

        fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Please look at this text for correct academic citations, and recommend APA references for each area of concern: ${text}` }]
                }]
            })
        })
        .then(resp => {
            if (!resp.ok) return resp.text().then(text => { throw new Error(text); });
            return resp.json();
        })
        .then(result => {
            const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (result.error) {
                // Keep error messages as plain text
                outputDiv.textContent = "⚠️ " + result.error;
            } else {
                const markdown = generatedText || "✅ Analysis complete: No clear analysis provided by the model.";

                // Convert the Markdown content into fully styled HTML
                const htmlContent = marked.parse(markdown);

                // Insert the formatted HTML into the output div
                outputDiv.innerHTML = htmlContent;
            }
        })
        .catch(e => {
            outputDiv.textContent = "⚠️ Fetch Error: " + e;
        });
    };
    });
</script>
