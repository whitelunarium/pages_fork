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
    .combined-chart-container {
        height: 400px;
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

<!-- User Info -->
<div class="container text-center my-4">
    <h4>User ID: <span class="name">Loading...</span></h4>
    <h4>Current Balance: $<span class="balance">0.00</span></h4>
</div>

<!-- Combined Chart -->
<div class="container my-4">
    <div class="game-card p-3">
        <h3 class="game-title">All Games Combined</h3>
        <div class="combined-chart-container mt-3">
            <canvas id="combinedChart"></canvas>
        </div>
    </div>
</div>

<!-- Charts Grid -->
<div class="container my-4">
    <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3" id="pokerChartContainer"></div>
        <div class="col-12 col-md-6 col-lg-3" id="blackjackChartContainer"></div>
        <div class="col-12 col-md-6 col-lg-3" id="diceChartContainer"></div>
        <div class="col-12 col-md-6 col-lg-3" id="casino_minesChartContainer"></div>
    </div>
</div>

<script type="module">
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

let userId = null;
const charts = {};
let combinedChart = null;

const gameMap = {
    poker: 'Poker',
    blackjack: 'Blackjack',
    dice: 'Dice',
    casino_mines: 'Mines'
};

const gameColors = {
    poker: '#FF6384',
    blackjack: '#4BC0C0',
    dice: '#FFCE56',
    casino_mines: '#9966FF'
};

async function fetchUserDetails() {
    try {
        const response = await fetch(`${javaURI}/api/person/get`, fetchOptions);
        const userData = await response.json();
        userId = userData.id;
        document.querySelector('.name').textContent = userData.uid || "Unknown";
        document.querySelector('.balance').textContent = Number(userData.balance).toFixed(2);
        initializeCharts();
    } catch (error) {
        console.error("Error fetching user data:", error);
        document.querySelector('.name').textContent = "Error";
    }
}

async function initializeCharts() {
    const games = Object.keys(gameMap);

    const gameData = await Promise.all(games.map(async (game) => {
        try {
            const response = await fetch(`${javaURI}/bank/${userId}/profitmap/${game}`, {
                ...fetchOptions,
                method: 'GET'
            });
            return {
                game,
                data: response.ok ? await response.json() : []
            };
        } catch (error) {
            return { game, data: [] };
        }
    }));

    gameData.forEach(({ game, data }) => {
        renderChartCard(game);
        createChart(game, data);
    });

    createCombinedChart(gameData);
}

function renderChartCard(game) {
    const containerId = `${game}ChartContainer`;
    document.getElementById(containerId).innerHTML = `
        <div class="game-card p-3 h-100">
            <h3 class="game-title">${gameMap[game]}</h3>
            <div class="chart-container mt-3">
                <canvas id="${game}Chart"></canvas>
            </div>
        </div>
    `;
}

function createChart(game, transactions) {
    const processed = processChartData(game, transactions);
    const ctx = document.getElementById(`${game}Chart`).getContext('2d');

    if (charts[game]) charts[game].destroy();
    charts[game] = new Chart(ctx, {
        type: 'line',
        data: processed,
        options: getChartOptions(game)
    });
}

function createCombinedChart(gameData) {
    const labels = Array.from(new Set(gameData.flatMap(({ data }) => data.map(t => new Date(t[0]).toLocaleDateString())))).sort();

    const datasets = gameData.map(({ game, data }) => {
        let balance = 0;
        const balanceMap = {};
        data.forEach(([time, profit]) => {
            const key = new Date(time).toLocaleDateString();
            balance += parseFloat(profit) || 0;
            balanceMap[key] = balance;
        });
        const filled = labels.map(label => balanceMap[label] || null);

        return {
            label: gameMap[game],
            data: filled,
            borderColor: gameColors[game],
            backgroundColor: `${gameColors[game]}30`,
            tension: 0.2,
            fill: false
        };
    });

    if (combinedChart) combinedChart.destroy();
    const ctx = document.getElementById('combinedChart').getContext('2d');
    combinedChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: getChartOptions('combined')
    });
}

function processChartData(game, transactions) {
    const labels = [];
    const profits = [];
    let balance = 0;

    transactions.forEach(transaction => {
        if (Array.isArray(transaction)) {
            const date = new Date(transaction[0]).toLocaleDateString();
            const profit = parseFloat(transaction[1]) || 0;
            labels.push(date);
            profits.push(profit);
        }
    });

    const cumulative = profits.map(p => (balance += p));

    return {
        labels,
        datasets: [
            {
                label: 'Profit/Loss',
                data: profits,
                borderColor: gameColors[game],
                backgroundColor: `${gameColors[game]}30`,
                tension: 0.2,
                fill: true
            },
            {
                label: 'Cumulative Balance',
                data: cumulative,
                borderColor: gameColors[game],
                backgroundColor: `${gameColors[game]}30`,
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
            legend: { labels: { color: '#fff' } },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.dataset.label}: $${ctx.raw?.toFixed(2)}`
                }
            }
        },
        scales: {
            x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            y: {
                ticks: {
                    color: '#fff',
                    callback: (val) => `$${val.toFixed(2)}`
                },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    };
}

document.addEventListener("DOMContentLoaded", fetchUserDetails);
</script>
</body>
</html>
