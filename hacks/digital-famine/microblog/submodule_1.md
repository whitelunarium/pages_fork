---
layout: post
title: "Submodule 1"
description: "Submodule 1 of AI Usage Mini-Quest"
permalink: /digital-famine/microblog/mcq/
parent: "AI Usage"
team: "Thinkers"
submodule: 1
categories: [CSP, Submodule, AIUsage]
tags: [ai, submodule, thinkers]
author: "Thinkers Team"
date: 2025-10-21
---

# Submodule 1

## Content Coming Soon
This submodule will be developed by the Thinkers team.

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiple Choice Quiz Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .quiz-container {
            background-color: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .options {
            display: grid;
            gap: 10px;
            margin: 15px 0;
        }
        button {
            padding: 10px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        .option-button {
            background-color: #ffffff;
            color: #333;
            border: 1px solid #ddd;
        }
        .option-button:hover {
            background-color: #f0f0f0;
        }
        .result {
            margin-top: 20px;
            font-weight: bold;
            font-size: 18px;
        }
        .feedback {
            color: #666;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <h1>Multiple Choice Quiz</h1>
        <div id="quiz">
            <div id="question"></div>
            <div class="options" id="options"></div>
            <button id="submit">Submit Answer</button>
        </div>
        <div id="results" style="display: none;">
            <div class="result">Your Score: <span id="score">0</span>/10</div>
            <button id="restart">Restart Quiz</button>
        </div>
    </div>

    <script>
        const questions = [
            {
                question: "Question 1: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 0
            },
            {
                question: "Question 2: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 1
            },
            {
                question: "Question 3: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 2
            },
            {
                question: "Question 4: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 3
            },
            {
                question: "Question 5: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 0
            },
            {
                question: "Question 6: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 1
            },
            {
                question: "Question 7: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 2
            },
            {
                question: "Question 8: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 3
            },
            {
                question: "Question 9: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 0
            },
            {
                question: "Question 10: Sample question here?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correct: 1
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;

        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const submitBtn = document.getElementById('submit');
        const quizEl = document.getElementById('quiz');
        const resultsEl = document.getElementById('results');
        const scoreEl = document.getElementById('score');
        const restartBtn = document.getElementById('restart');

        function displayQuestion() {
            const question = questions[currentQuestion];
            questionEl.textContent = question.question;
            
            optionsEl.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.onclick = () => selectOption(index);
                optionsEl.appendChild(button);
            });
            
            submitBtn.disabled = true;
        }

        function selectOption(index) {
            const buttons = optionsEl.getElementsByClassName('option-button');
            for (let button of buttons) {
                button.style.backgroundColor = '#ffffff';
            }
            buttons[index].style.backgroundColor = '#e0e0e0';
            selectedOption = index;
            submitBtn.disabled = false;
        }

        function submitAnswer() {
            if (selectedOption === questions[currentQuestion].correct) {
                score++;
            }
            
            currentQuestion++;
            if (currentQuestion < questions.length) {
                selectedOption = null;
                displayQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            quizEl.style.display = 'none';
            resultsEl.style.display = 'block';
            scoreEl.textContent = score;
        }

        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            selectedOption = null;
            quizEl.style.display = 'block';
            resultsEl.style.display = 'none';
            displayQuestion();
        }

        submitBtn.onclick = submitAnswer;
        restartBtn.onclick = restartQuiz;

        // Start the quiz
        displayQuestion();
    </script>
</body>
</html>