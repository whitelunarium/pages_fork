---
layout: opencs
title: "Los Angeles"
description: "Submodule 2 of Backend Development Mini-Quest"
permalink: /west-coast/backend/submodule_2/
parent: "Backend Development"
team: "Zombies"
submodule: 2
categories: [CSP, Submodule, Backend]
tags: [backend, submodule, zombies]
author: "Zombies Team"
date: 2025-10-21
microblog: True
---

# Submodule 2

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        padding: 20px;
        min-height: 100vh;
        color: #333;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
        color: white;
        padding: 40px;
        text-align: center;
        border-radius: 20px;
        margin-bottom: 30px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .header h1 {
        font-size: 2.5em;
        margin-bottom: 10px;
    }

    .header p {
        font-size: 1.2em;
        opacity: 0.9;
    }

    .concept-box {
        background: white;
        padding: 30px;
        border-radius: 15px;
        margin-bottom: 30px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        border-left: 6px solid #e74c3c;
    }

    .concept-box h2 {
        color: #2c3e50 !important;
        margin-bottom: 15px;
        font-size: 1.8em;
    }

    .concept-box ul {
        color: #2c3e50 !important;
        line-height: 1.8;
        margin-left: 20px;
    }

    .concept-box li {
        margin-bottom: 10px;
    }

    .stadium-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 30px;
        margin-bottom: 30px;
    }

    .stadium-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .stadium-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    }

    .dodgers-card .card-header {
        background: linear-gradient(135deg, #005A9C 0%, #A5ACAF 100%);
        padding: 30px;
        text-align: center;
        color: white;
    }

    .chargers-card .card-header {
        background: linear-gradient(135deg, #0080C6 0%, #FFC20E 100%);
        padding: 30px;
        text-align: center;
        color: white;
    }

    .card-header h2 {
        font-size: 2em;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }

    .team-logo {
        font-size: 1.5em;
    }

    .card-body {
        padding: 30px;
    }

    .stat-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 20px;
    }

    .stat-item {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        border-left: 4px solid #3498db;
    }

    .stat-label {
        font-size: 0.9em;
        color: #7f8c8d;
        margin-bottom: 5px;
    }

    .stat-value {
        font-size: 1.5em;
        font-weight: bold;
        color: #2c3e50;
    }

    .chart-container {
        margin: 20px 0;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
    }

    .comparison-section {
        background: white;
        padding: 40px;
        border-radius: 20px;
        margin-bottom: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .comparison-section h2 {
        color: #2c3e50 !important;
        text-align: center;
        margin-bottom: 30px;
        font-size: 2em;
    }

    .comparison-bars {
        margin-bottom: 40px;
    }

    .comparison-item {
        margin-bottom: 25px;
    }

    .comparison-label {
        font-weight: bold;
        margin-bottom: 8px;
        color: #2c3e50;
    }

    .bar-container {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .bar {
        height: 30px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: white;
        font-weight: bold;
        transition: width 0.5s ease;
    }

    .dodgers-bar {
        background: linear-gradient(90deg, #005A9C 0%, #A5ACAF 100%);
    }

    .chargers-bar {
        background: linear-gradient(90deg, #0080C6 0%, #FFC20E 100%);
    }

    .quiz-section {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .quiz-section h2 {
        color: #2c3e50 !important;
        text-align: center;
        margin-bottom: 30px;
        font-size: 2em;
    }

    .quiz-question {
        background: #f8f9fa;
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 20px;
    }

    .quiz-question h3 {
        color: #2c3e50 !important;
        margin-bottom: 15px;
    }

    .quiz-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .quiz-option {
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        border: 2px solid #ddd;
        cursor: pointer;
        transition: all 0.3s;
        color: #2c3e50;
    }

    .quiz-option:hover {
        border-color: #3498db;
        background: #ecf0f1;
    }

    .quiz-option.correct {
        border-color: #27ae60;
        background: #d5f4e6;
    }

    .quiz-option.incorrect {
        border-color: #e74c3c;
        background: #fadbd8;
    }

    .quiz-result {
        text-align: center;
        margin-top: 20px;
        font-size: 1.2em;
        font-weight: bold;
        padding: 15px;
        border-radius: 10px;
        display: none;
    }

    .quiz-result.show {
        display: block;
    }

    .key-takeaways {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        border-radius: 20px;
        margin-top: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .key-takeaways h2 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 2em;
    }

    .key-takeaways ul {
        line-height: 2;
        font-size: 1.1em;
    }

    .key-takeaways li {
        margin-bottom: 15px;
    }

    canvas {
        max-height: 300px;
    }
</style>

<div class="container">
    <div class="header">
        <h1>🏟️ Los Angeles Sports Dashboard</h1>
        <p>Dodger Stadium vs SoFi Stadium - A Data-Driven Comparison</p>
    </div>

    <div class="concept-box">
        <h2>📊 Step 2: Set Up the Data Source / Backend</h2>
        <ul>
            <li><strong>Decide where the API will get its data</strong> (database, CSV/JSON file, or live sports stats)</li>
            <li><strong>Organize the data</strong> so it's easy for the API to access</li>
            <li><strong>This is like preparing a well-stocked library</strong> for the API to fetch info</li>
        </ul>
    </div>

    <div class="stadium-grid">
        <div class="stadium-card dodgers-card">
            <div class="card-header">
                <h2><span class="team-logo">⚾</span> Dodger Stadium</h2>
                <p>Home of the Los Angeles Dodgers</p>
            </div>
            <div class="card-body">
                <div class="stat-grid">
                    <div class="stat-item">
                        <div class="stat-label">Capacity</div>
                        <div class="stat-value">56,000</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Opened</div>
                        <div class="stat-value">1962</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Location</div>
                        <div class="stat-value">Chavez Ravine</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Sport</div>
                        <div class="stat-value">Baseball</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">World Series</div>
                        <div class="stat-value">7 Titles</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Cost</div>
                        <div class="stat-value">$23M</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="dodgersChart"></canvas>
                </div>
            </div>
        </div>

        <div class="stadium-card chargers-card">
            <div class="card-header">
                <h2><span class="team-logo">🏈</span> SoFi Stadium</h2>
                <p>Home of the Los Angeles Chargers</p>
            </div>
            <div class="card-body">
                <div class="stat-grid">
                    <div class="stat-item">
                        <div class="stat-label">Capacity</div>
                        <div class="stat-value">70,240</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Opened</div>
                        <div class="stat-value">2020</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Location</div>
                        <div class="stat-value">Inglewood</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Sport</div>
                        <div class="stat-value">Football</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Technology</div>
                        <div class="stat-value">4K HDR Board</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Cost</div>
                        <div class="stat-value">$5.5B</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="chargersChart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <div class="comparison-section">
        <h2>📊 Stadium Comparison</h2>
        <div class="comparison-bars">
            <div class="comparison-item">
                <div class="comparison-label">Seating Capacity</div>
                <div class="bar-container">
                    <div class="bar dodgers-bar" style="width: 40%;">Dodgers: 56,000</div>
                    <div class="bar chargers-bar" style="width: 50%;">Chargers: 70,240</div>
                </div>
            </div>
            <div class="comparison-item">
                <div class="comparison-label">Age (Years)</div>
                <div class="bar-container">
                    <div class="bar dodgers-bar" style="width: 50%;">Dodgers: 62 yrs</div>
                    <div class="bar chargers-bar" style="width: 5%;">Chargers: 4 yrs</div>
                </div>
            </div>
            <div class="comparison-item">
                <div class="comparison-label">Construction Cost</div>
                <div class="bar-container">
                    <div class="bar dodgers-bar" style="width: 2%;">Dodgers: $23M</div>
                    <div class="bar chargers-bar" style="width: 50%;">Chargers: $5.5B</div>
                </div>
            </div>
        </div>
    </div>

    <div class="quiz-section">
        <h2>🎯 Test Your Knowledge!</h2>
        
        <div class="quiz-question">
            <h3>Question 1: Which stadium is older?</h3>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkAnswer(this, true)">Dodger Stadium (1962)</div>
                <div class="quiz-option" onclick="checkAnswer(this, false)">SoFi Stadium (2020)</div>
            </div>
        </div>

        <div class="quiz-question">
            <h3>Question 2: Which stadium has a larger capacity?</h3>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkAnswer(this, false)">Dodger Stadium (56,000)</div>
                <div class="quiz-option" onclick="checkAnswer(this, true)">SoFi Stadium (70,240)</div>
            </div>
        </div>

        <div class="quiz-question">
            <h3>Question 3: Which stadium cost more to build?</h3>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkAnswer(this, false)">Dodger Stadium ($23M)</div>
                <div class="quiz-option" onclick="checkAnswer(this, true)">SoFi Stadium ($5.5B)</div>
            </div>
        </div>

        <div class="quiz-question">
            <h3>Question 4: Which represents the blend of tradition and history?</h3>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkAnswer(this, true)">Dodger Stadium - One of the oldest MLB stadiums</div>
                <div class="quiz-option" onclick="checkAnswer(this, false)">SoFi Stadium - Brand new high-tech venue</div>
            </div>
        </div>

        <div id="quizResult" class="quiz-result"></div>
    </div>

    <div class="key-takeaways">
        <h2>💡 Key Takeaways</h2>
        <ul>
            <li>Learned how <strong>UI design makes data easier to understand</strong> and more engaging</li>
            <li>Practiced using <strong>team colors, logos, and branding</strong> to build a professional dashboard</li>
            <li>Used <strong>charts and graphs to compare data</strong> between Dodger Stadium and SoFi Stadium</li>
            <li>Discovered that <strong>Dodger Stadium is one of the oldest and largest baseball stadiums</strong> in the U.S., while <strong>SoFi Stadium is one of the newest and most high-tech</strong></li>
            <li>Understood how <strong>design and data work together</strong>—just like how stadiums combine tradition and technology to improve the fan experience</li>
        </ul>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
<script>
    let correctAnswers = 0;
    let totalQuestions = 4;
    let answeredQuestions = 0;

    function checkAnswer(element, isCorrect) {
        const options = element.parentElement.children;
        for (let option of options) {
            option.style.pointerEvents = 'none';
        }

        if (isCorrect) {
            element.classList.add('correct');
            correctAnswers++;
        } else {
            element.classList.add('incorrect');
            for (let option of options) {
                if (option !== element) {
                    option.classList.add('correct');
                }
            }
        }

        answeredQuestions++;
        
        if (answeredQuestions === totalQuestions) {
            const resultDiv = document.getElementById('quizResult');
            const percentage = (correctAnswers / totalQuestions) * 100;
            resultDiv.innerHTML = `You scored ${correctAnswers} out of ${totalQuestions} (${percentage}%)!`;
            resultDiv.style.background = percentage >= 75 ? '#d5f4e6' : '#fadbd8';
            resultDiv.style.color = percentage >= 75 ? '#27ae60' : '#e74c3c';
            resultDiv.classList.add('show');
        }
    }

    const dodgersCtx = document.getElementById('dodgersChart').getContext('2d');
    new Chart(dodgersCtx, {
        type: 'bar',
        data: {
            labels: ['Capacity', 'Age (years)', 'Championships'],
            datasets: [{
                label: 'Dodger Stadium Stats',
                data: [56000, 62, 7],
                backgroundColor: [
                    'rgba(0, 90, 156, 0.8)',
                    'rgba(165, 172, 175, 0.8)',
                    'rgba(0, 90, 156, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 90, 156, 1)',
                    'rgba(165, 172, 175, 1)',
                    'rgba(0, 90, 156, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const chargersCtx = document.getElementById('chargersChart').getContext('2d');
    new Chart(chargersCtx, {
        type: 'bar',
        data: {
            labels: ['Capacity', 'Age (years)', 'Super Bowls Hosted'],
            datasets: [{
                label: 'SoFi Stadium Stats',
                data: [70240, 4, 1],
                backgroundColor: [
                    'rgba(0, 128, 198, 0.8)',
                    'rgba(255, 194, 14, 0.8)',
                    'rgba(0, 128, 198, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 128, 198, 1)',
                    'rgba(255, 194, 14, 1)',
                    'rgba(0, 128, 198, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
</script>