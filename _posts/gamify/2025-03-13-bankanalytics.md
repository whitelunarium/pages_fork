---
layout: finance
title: Bank Analytics
permalink: /gamify/bankanalytics
---
<html lang="en">

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
    .chart-container {
        height: 300px;
        position: relative;
    }
    .game-card {
        background-color: #1f1f1f;
        border-radius: 8px;
        transition: transform 0.3s;
    }
    .game-card:hover {
        transform: translateY(-5px);
    }
    .game-title {
        color: #ff9800;
        border-left: 4px solid #ff9800;
        padding-left: 1rem;
    }
</style>
<body class="m-0 p-0" style="font-family: 'Poppins', sans-serif; background-color: #121212; color: #fff;">

<br>
<h1 class="text-center">Game Analytics</h1>

<!-- Charts Grid -->
<div class="container my-4">
    <div class="row g-4">
        <!-- Poker Chart -->
        <div class="col-12 col-md-6 col-lg-4">
            <div class="game-card p-3 h-100">
                <h3 class="game-title">Poker</h3>
                <div class="chart-container mt-3">
                    <canvas id="pokerChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Blackjack Chart -->
        <div class="col-12 col-md-6 col-lg-4">
            <div class="game-card p-3 h-100">
                <h3 class="game-title">Blackjack</h3>
                <div class="chart-container mt-3">
                    <canvas id="blackjackChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Dice Chart -->
        <div class="col-12 col-md-6 col-lg-4">
            <div class="game-card p-3 h-100">
                <h3 class="game-title">Dice</h3>
                <div class="chart-container mt-3">
                    <canvas id="diceChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="module">
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

let userId = null;
const charts = {};

async function fetchUserDetails() {
    try {
        const response = await fetch(`${javaURI}/api/person/get`, fetchOptions);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        userId = userData.id;
        initializeCharts();
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

async function initializeCharts() {
    const games = ['poker', 'blackjack', 'dice'];
    
    await Promise.all(games.map(async (game) => {
        try {
            const response = await fetch(`${javaURI}/bank/${userId}/profitmap/${game}`, {
                ...fetchOptions,
                method: 'GET'
            });
            
            if (!response.ok) throw new Error(`Failed to fetch ${game} data`);
            const transactions = await response.json();
            createChart(game, transactions);
        } catch (error) {
            console.error(`Error fetching ${game} data:`, error);
            createChart(game, []); // Create empty chart
        }
    }));
}

function createChart(game, transactions) {
    const processedData = processChartData(game, transactions);
    const ctx = document.getElementById(`${game}Chart`).getContext('2d');
    
    if (charts[game]) {
        charts[game].destroy();
    }

    charts[game] = new Chart(ctx, {
        type: 'line',
        data: processedData,
        options: getChartOptions(game)
    });
}

function processChartData(game, transactions) {
    const timestamps = [];
    const profits = [];
    let cumulativeBalance = 0;

    transactions.forEach(transaction => {
        if (Array.isArray(transaction) && transaction.length >= 2) {
            try {
                const timestamp = new Date(transaction[0]).toLocaleDateString();
                const profit = parseFloat(transaction[1]) || 0;
                
                timestamps.push(timestamp);
                profits.push(profit);
            } catch (e) {
                console.warn('Invalid transaction format:', transaction);
            }
        }
    });

    const cumulativeData = profits.map(p => {
        cumulativeBalance += p;
        return cumulativeBalance;
    });

    return {
        labels: timestamps,
        datasets: [
            {
                label: 'Profit/Loss',
                data: profits,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.2,
                fill: true
            },
            {
                label: 'Cumulative Balance',
                data: cumulativeData,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.2,
                fill: true
            }
        ]
    };
}

function getChartOptions(game) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#fff' }
            },
            tooltip: {
                callbacks: {
                    label: (context) => 
                        `${context.dataset.label}: $${context.raw.toFixed(2)}`
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#fff' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            },
            y: {
                ticks: { 
                    color: '#fff',
                    callback: (value) => `$${value.toFixed(2)}`
                },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    };
}

document.addEventListener("DOMContentLoaded", () => {
    fetchUserDetails();
});
</script>
</body>
</html>