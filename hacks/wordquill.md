---
layout: post
title: WordQuill Editor & Plagiarism Check
permalink: /word
---

<!-- Quill CSS/JS from CDN -->
<link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>

<div id="quill-editor" style="height: 200px;"></div>
<button id="checkBtn">Check for Plagiarism</button>
<pre id="output"></pre>

<script>
    const API_KEY = "AIzaSyC4HYxzGJOXC3YDrSk2GHflfHPokk2nlTQ";
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    document.addEventListener("DOMContentLoaded", function() {
    var quill = new Quill('#quill-editor', {
        theme: 'snow'
    });

    document.getElementById("checkBtn").onclick = function() {
        const text = quill.getText();
        const outputDiv = document.getElementById("output");
        outputDiv.textContent = "⏳ Checking...";

        fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Please look at this text for examples of plagiarism ${text}` }]
                }]
            })
        })
        .then(resp => {
            if (!resp.ok) return resp.text().then(text => { throw new Error(text); });
            return resp.json();
        })
        .then(result => {
            // Note: The response structure for the generateContent endpoint
            // is usually result.candidates[0].content.parts[0].text, not result.analysis.
            // You might need to adjust the line below to access the generated text.
            const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (result.error) outputDiv.textContent = "⚠️ " + result.error;
            else outputDiv.textContent = generatedText || "[no analysis]";
        })
            .catch(e => {
            outputDiv.textContent = "⚠️ " + e;
        });
    };
    });
</script>