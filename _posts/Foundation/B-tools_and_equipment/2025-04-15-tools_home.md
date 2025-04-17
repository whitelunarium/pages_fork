---
toc: False 
layout: tailwindIG
data: tools
title: Tools and Equipment
description: Tech has reshaped our lives, from the internet to the smartphone in your pocket, or the advent of AI. This course is opening new technology possibilities by equipping you with the developer tools that are the keys to boundless technology possibilities.
courses: {'csse': {'week': 1}, 'csp': {'week': 1}, 'csa': {'week': 1}}
type: ccc
categories: [Foundation]
permalink: /tools/
---

## Why Development Tools Matter

Development tools are the foundation of modern software engineering. They enable collaboration, streamline workflows, and make coding more efficient. These develpment tools will not only help you succeed in this class but also prepare you for real-world software development.

<!-- Question Container -->
<div id="questions-container" class="space-y-6 border-t pt-6"></div>
<!-- Question Data -->
<script>
// JSON for questions
const questionsData = [
    {
        id: "tools-familiarity",
        title: "Tools Familiarity",
        question: "What are the key tools in the infographic?  List it's purpose in your own words."
    },
    {
        id: "tools-bunrdown-link",
        title: "Issue and Burndown List",
        question: "Provide a link to your GitHub Issue."
    },
    {
        id: "tools-setup-time",
        title: "Tools Setup and Time",
        question: "How long did it take? Write down your biggest success and biggest challenge."
    },
    {
        id: "tools-version-checks",
        title: "Version Checks",
        question: "Capture text output of your version checks.  Why do you think it is correct?"
    },
    {
        id: "tools-vscode-make",
        title: "VSCode ",
        question: "Capture text output of your VSCode make with link to localhost IP address.  Why do you think it is correct?"
    }
];

// Render questions
function renderQuestions() {
    const questionsContainer = document.getElementById("questions-container");
    questionsData.forEach(question => {
        const savedResponse = localStorage.getItem(question.id) || "";
        const questionHTML = `
            <div class="p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold mb-2">${question.title}</h3>
                <p class="text-sm mb-4">${question.question}</p>
                <textarea id="${question.id}" class="w-full border rounded-lg p-2 text-sm" rows="2" placeholder="Write your response here...">${savedResponse}</textarea>
            </div>
        `;
        questionsContainer.innerHTML += questionHTML;
    });

    // Add event listeners to save responses
    questionsData.forEach(question => {
        const textarea = document.getElementById(question.id);
        textarea.addEventListener("input", () => {
            localStorage.setItem(question.id, textarea.value);
        });
    });
}
// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    renderQuestions();
});
</script>
