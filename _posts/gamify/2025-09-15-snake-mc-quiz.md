<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom MCQ Quiz</title>
    <style>
        body {
            background-color: #000000 !important;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }

        .quiz-container {
            max-width: 800px;
            margin: 0 auto;
            font-family: inherit;
        }

        .quiz-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #333333;
        }

        .quiz-header h1 {
            color: #ffffff;
            font-weight: 400;
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .quiz-header p {
            color: #cccccc;
            font-size: 1.1rem;
            margin: 0;
        }

        .question {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background-color: #1a1a1a;
            border: 1px solid #333333;
            border-radius: 4px;
            border-left: 4px solid #2a7ae4;
        }

        .question-title {
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            line-height: 1.4;
        }

        .question label {
            display: block;
            margin: 0.75rem 0;
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            border-radius: 3px;
            transition: background-color 0.2s ease;
            color: #cccccc;
            font-size: 0.95rem;
        }

        .question label:hover {
            background-color: #2a2a2a;
        }

        .question input[type="radio"] {
            margin-right: 0.75rem;
            accent-color: #2a7ae4;
        }

        .quiz-submit {
            text-align: center;
            margin: 2.5rem 0;
        }

        .quiz-button {
            background-color: #2a7ae4;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            font-size: 1rem;
            font-weight: 500;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
        }

        .quiz-button:hover {
            background-color: #1e5bb8;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(42, 122, 228, 0.3);
        }

        .quiz-button:active {
            transform: translateY(0);
        }

        #result {
            margin-top: 2rem;
            padding: 1.5rem;
            border-radius: 4px;
            font-weight: 500;
            text-align: center;
            display: none;
            font-size: 1.1rem;
        }

        .result-perfect {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .result-good {
            background-color: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }

        .result-needs-work {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.9em;
            color: #ff6b6b;
            background-color: #2a2a2a;
            padding: 0.2em 0.4em;
            border-radius: 3px;
        }

        .instructions {
            background-color: #1a1a1a;
            border: 1px solid #333333;
            border-radius: 4px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-left: 4px solid #28a745;
        }

        .instructions h3 {
            color: #28a745;
            margin-top: 0;
        }

        .instructions ul {
            color: #cccccc;
            padding-left: 1.5rem;
        }

        .instructions li {
            margin-bottom: 0.5rem;
        }

        @media screen and (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .question {
                padding: 1rem;
            }
            
            .quiz-button {
                padding: 0.75rem 1.5rem;
                font-size: 0.95rem;
            }

            .quiz-header h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <div class="quiz-header">
            <h1>🎯 Custom MCQ Quiz</h1>
            <p>Customize this template with your own questions and answers</p>
        </div>

        <div class="instructions">
            <h3>📝 How to Customize This Template</h3>
            <ul>
                <li>Edit the <code>quizData</code> object in the JavaScript section</li>
                <li>Change the title and description in the header</li>
                <li>Add as many questions as you want with 2-6 options each</li>
                <li>Set the correct answer using option letters (a, b, c, d, etc.)</li>
                <li>Customize scoring thresholds if needed</li>
            </ul>
        </div>

        <form id="quizForm">
            <!-- Questions will be generated dynamically -->
        </form>

        <div class="quiz-submit">
            <button type="button" class="quiz-button" onclick="checkAnswers()">Submit Quiz</button>
        </div>

        <div id="result"></div>
    </div>

    <script>
        // 🎯 CUSTOMIZE YOUR QUIZ HERE
        const quizData = {
            title: "Sample Quiz",
            description: "Test your knowledge with these sample questions",
            questions: [
                {
                    question: "What is the capital of France?",
                    options: [
                        "London",
                        "Paris",
                        "Berlin",
                        "Madrid"
                    ],
                    correct: "b"
                },
                {
                    question: "Which programming language is known for web development?",
                    options: [
                        "Python",
                        "JavaScript",
                        "C++",
                        "Java"
                    ],
                    correct: "b"
                },
                {
                    question: "What does HTML stand for?",
                    options: [
                        "HyperText Markup Language",
                        "High Tech Modern Language",
                        "Home Tool Markup Language",
                        "Hyperlink and Text Markup Language"
                    ],
                    correct: "a"
                },
                {
                    question: "Which of these is a CSS framework?",
                    options: [
                        "React",
                        "Angular",
                        "Bootstrap",
                        "Node.js",
                        "Express"
                    ],
                    correct: "c"
                },
                {
                    question: "What is the result of 2 + 2?",
                    options: [
                        "3",
                        "4",
                        "5"
                    ],
                    correct: "b"
                }
            ],
            // Scoring thresholds (as percentages)
            scoring: {
                perfect: 100,    // 100% correct
                good: 70,        // 70% or above
                needsWork: 40    // Below 70%
            }
        };

        // Generate quiz HTML
        function generateQuiz() {
            const form = document.getElementById('quizForm');
            const header = document.querySelector('.quiz-header');
            
            // Update header
            header.innerHTML = `
                <h1>🎯 ${quizData.title}</h1>
                <p>${quizData.description}</p>
            `;
            
            // Generate questions
            let html = '';
            quizData.questions.forEach((q, index) => {
                html += `
                    <div class="question">
                        <div class="question-title">${index + 1}. ${q.question}</div>
                `;
                
                q.options.forEach((option, optionIndex) => {
                    const letter = String.fromCharCode(97 + optionIndex); // a, b, c, d, e...
                    html += `
                        <label>
                            <input type="radio" name="q${index + 1}" value="${letter}"> 
                            ${letter}) ${option}
                        </label>
                    `;
                });
                
                html += `</div>`;
            });
            
            form.innerHTML = html;
        }

        // Check answers function
        function checkAnswers() {
            let score = 0;
            const totalQuestions = quizData.questions.length;
            
            // Calculate score
            quizData.questions.forEach((q, index) => {
                const radios = document.getElementsByName(`q${index + 1}`);
                let selected = null;
                
                for (let i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        selected = radios[i].value;
                        break;
                    }
                }
                
                if (selected === q.correct) {
                    score++;
                }
            });
            
            // Calculate percentage
            const percentage = (score / totalQuestions) * 100;
            
            // Determine feedback
            let message = "";
            let resultClass = "";
            
            if (percentage >= quizData.scoring.perfect) {
                message = "🌟 Perfect! You mastered these concepts!";
                resultClass = "result-perfect";
            } else if (percentage >= quizData.scoring.good) {
                message = "👍 Good job! Review a bit more to nail it.";
                resultClass = "result-good";
            } else {
                message = "📘 Keep practicing — try reviewing the material again.";
                resultClass = "result-needs-work";
            }
            
            // Display results
            const resultDiv = document.getElementById("result");
            resultDiv.className = resultClass;
            resultDiv.innerHTML = `Your Score: ${score} / ${totalQuestions} (${Math.round(percentage)}%)<br>${message}`;
            resultDiv.style.display = "block";
            
            // Smooth scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Initialize quiz when page loads
        window.onload = function() {
            generateQuiz();
        };
    </script>
</body>
</html>