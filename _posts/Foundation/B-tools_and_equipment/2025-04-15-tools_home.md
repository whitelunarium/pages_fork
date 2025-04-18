---
toc: False 
layout: tailwindPost
infoGraph: tools_infograph
questions: tools_questions
title: Tools and Equipment
description: Tech has reshaped our lives, from the internet to the smartphone in your pocket, or the advent of AI. This course is opening new technology possibilities by equipping you with the developer tools that are the keys to boundless technology possibilities.
courses: {'csse': {'week': 1}, 'csp': {'week': 1}, 'csa': {'week': 1}}
type: ccc
categories: [Foundation]
permalink: /tools/
---

## Why Development Tools Matter

Development tools are the foundation of modern software engineering. They enable collaboration, streamline workflows, and make coding more efficient. These develpment tools will not only help you succeed in this class but also prepare you for real-world software development.

<script>
  document.addEventListener("DOMContentLoaded", () => {
    // Load saved responses from localStorage
    const json = {{site.data[page.questions]  | jsonify }};
    const questions = json.questions;
    questions.forEach(question => {
      const textarea = document.getElementById(question.id);
      if (textarea) {
        // Load saved response
        const savedResponse = localStorage.getItem(question.id) || "";
        textarea.value = savedResponse;

        // Save response on input
        textarea.addEventListener("input", () => {
          localStorage.setItem(question.id, textarea.value);
        });
      }
    });
  });
</script>
