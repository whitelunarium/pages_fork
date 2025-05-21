---
layout: fortunefinders
title: Bank Analytics
permalink: /gamify/bankanalytics
---

<html lang="en">
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .chart-container {
            height: 500px;
            position: relative;
        }
        .combined-chart-container {
            height: 600px;
        }
        .game-card {
            background-color: #1f1f1f;
            border-radius: 8px;
            transition: transform 0.3s;
            position: relative;
        }
        .game-card:hover {
            transform: translateY(-5px);
        }
        .game-title {
            color: #ff9800;
            border-left: 4px solid #ff9800;
            padding-left: 1rem;
        }
        .toggle-container {
            text-align: center;
            margin-bottom: 1rem;
        }
        .toggle-container button {
            margin: 0.2rem;
        }
    </style>
</head>
<body class="m-0 p-0" style="font-family: 'Poppins', sans-serif; background-color: #121212; color: #fff;">
    <br>
    <h1 class="text-center">Game Analytics</h1>
    <div class="container text-center my-4">
        <h4>User: <span class="name">Loading...</span></h4>
        <h4>Current Balance: $<span class="balance">0.00</span></h4>
    </div>
    <!-- Combined Chart -->
    <div class="container my-4">
        <div class="game-card p-3">
            <h3 class="game-title">All Games Combined</h3>
            <div class="toggle-container">
                <button class="btn btn-sm btn-outline-warning" onclick="window.toggleDataset('Poker')">Poker</button>
                <button class="btn btn-sm btn-outline-info" onclick="window.toggleDataset('Blackjack')">Blackjack</button>
                <button class="btn btn-sm btn-outline-light" onclick="window.toggleDataset('Dice')">Dice</button>
                <button class="btn btn-sm btn-outline-primary" onclick="window.toggleDataset('Mines')">Mines</button>
                <button class="btn btn-sm btn-outline-success" onclick="window.toggleDataset('Stocks')">Stocks</button>
                <button class="btn btn-sm btn-outline-cyan" onclick="window.toggleDataset('Crypto')">Crypto</button>
            </div>
            <div class="combined-chart-container mt-3">
                <canvas id="combinedChart"></canvas>
            </div>
        </div>
    </div>
    <!-- Charts Grid -->
    <div class="container my-4">
        <div class="row g-4">
            <div class="col-12 col-md-6 col-lg-6" id="pokerChartContainer"></div>
            <div class="col-12 col-md-6 col-lg-6" id="blackjackChartContainer"></div>
            <div class="col-12 col-md-6 col-lg-6" id="diceChartContainer"></div>
            <div class="col-12 col-md-6 col-lg-6" id="casino_minesChartContainer"></div>
            <div class="col-12 col-md-6 col-lg-6">
                <div class="game-card p-3 h-100">
                    <h3 class="game-title">Crypto Portfolio</h3>
                    <div class="chart-container mt-3">
                        <canvas id="cryptoPortfolioGraph"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6">
                <div class="game-card p-3 h-100">
                    <h3 class="game-title">Stock Portfolio</h3>
                    <div class="chart-container mt-3">
                        <canvas id="stocksChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module">
        import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
        let userId = null;
        let combinedChart = null;
        const charts = {};
        let userAnalyticsData = null;
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
            casino_mines: '#9966FF',
            crypto: '#00FFFF',
            stocks: '#28a745'
        };
        // Helper function to get URL parameters
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
        async function fetchUserDetails() {
            try {
                // Check if there's a userId in the URL parameters
                const urlUserId = getUrlParameter('userId');
                if (urlUserId) {
                    // If userId is in URL, fetch that specific user's analytics
                    const response = await fetch(`${javaURI}/bank/analytics/${urlUserId}`, fetchOptions);
                    if (!response.ok) throw new Error("Failed to fetch analytics data");  
                    const result = await response.json();
                    if (result.success && result.data) {
                        userId = result.data.userId;
                        userAnalyticsData = result.data;
                        document.querySelector('.name').textContent = result.data.username || "Unknown";
                        document.querySelector('.balance').textContent = Number(result.data.balance).toFixed(2); 
                        // Initialize charts for this user
                        initializeCharts();
                        return;
                    }
                }
                // Fall back to current user if no userId provided or fetch failed
                const response = await fetch(`${javaURI}/api/person/get`, fetchOptions);
                const userData = await response.json();
                userId = userData.id;
                document.querySelector('.name').textContent = userData.uid || "Unknown";
                document.querySelector('.balance').textContent = Number(userData.balance).toFixed(2);
                initializeCharts(userData.email);
            } catch (error) {
                console.error("Error fetching user data:", error);
                document.querySelector('.name').textContent = "Error";
            }
        }
        async function initializeCharts(email) {
            const games = Object.keys(gameMap);
            const gameData = await Promise.all(games.map(async (game) => {
                try {
                    const endpoint = game === 'casino_mines' 
                        ? `${javaURI}/bank/${userId}/profitmap/casino_mines`
                        : `${javaURI}/bank/${userId}/profitmap/${game}`;   
                    const response = await fetch(endpoint, fetchOptions);
                    const result = response.ok ? await response.json() : [];
                    return { game, data: result };
                } catch (error) {
                    console.error(`Failed to fetch ${game}:`, error);
                    return { game, data: [] };
                }
            }));
            gameData.forEach(({ game, data }) => {
                renderChartCard(game);
                createChart(game, data);
            });
            const crypto = await buildCryptoPortfolioChart(email);
            const stocks = await buildStockPortfolioChart(email);
            createCombinedChart([...gameData, 
                { game: 'crypto', data: crypto }, 
                { game: 'stocks', data: stocks }
            ]);
        }
        function renderChartCard(game) {
            const containerId = `${game}ChartContainer`;
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                <div class="game-card p-3 h-100">
                    <h3 class="game-title">${gameMap[game]}</h3>
                    <div class="chart-container mt-3">
                        <canvas id="${game}Chart"></canvas>
                    </div>
                </div>`;
            }
        }
        function createChart(game, transactions) {
            const processed = processChartData(game, transactions);
            if (!processed) return;
            const ctx = document.getElementById(`${game}Chart`)?.getContext('2d');
            if (!ctx) return;
            if (charts[game]) charts[game].destroy();
            charts[game] = new Chart(ctx, {
                type: 'line',
                data: processed,
                options: { ...getChartOptions(game), maintainAspectRatio: false }
            });
        }
        function createCombinedChart(gameData) {
            const labelSet = new Set();
            gameData.forEach(({ data }) => {
                if (!data || !Array.isArray(data)) return;
                data.forEach(item => {
                    if (Array.isArray(item) && item.length > 0) {
                        const date = item[0];
                        if (date) labelSet.add(new Date(date).toLocaleDateString());
                    }
                });
            });
            const labels = Array.from(labelSet).sort((a, b) => new Date(a) - new Date(b));
            const datasets = gameData.map(({ game, data }) => {
                if (!data || !Array.isArray(data)) {
                    return {
                        label: gameMap[game] || game.charAt(0).toUpperCase() + game.slice(1),
                        data: [],
                        borderColor: gameColors[game],
                        backgroundColor: gameColors[game] + '30',
                        tension: 0.2,
                        hidden: false
                    };
                }
                const dailyMap = {};
                data.forEach(item => {
                    if (Array.isArray(item) && item.length > 1) {
                        const [time, profit] = item;
                        if (time) {
                            const key = new Date(time).toLocaleDateString();
                            dailyMap[key] = (dailyMap[key] || 0) + (parseFloat(profit) || 0);
                        }
                    }
                });
                return {
                    label: gameMap[game] || game.charAt(0).toUpperCase() + game.slice(1),
                    data: labels.map(label => dailyMap[label] ?? null),
                    borderColor: gameColors[game],
                    backgroundColor: gameColors[game] + '30',
                    tension: 0.2,
                    hidden: false
                };
            });
            const ctx = document.getElementById('combinedChart').getContext('2d');
            if (combinedChart) combinedChart.destroy();
            combinedChart = new Chart(ctx, {
                type: 'line',
                data: { labels, datasets },
                options: getChartOptions('combined')
            });
        }
        window.toggleDataset = function(label) {
            const ds = combinedChart.data.datasets.find(d => d.label === label);
            if (ds) {
                ds.hidden = !ds.hidden;
                combinedChart.update();
            }
        };
        function processChartData(game, transactions) {
            if (!Array.isArray(transactions) || transactions.length === 0) return null;
            const labels = [], profits = [];
            transactions.forEach(transaction => {
                if (Array.isArray(transaction) && transaction.length >= 2) {
                    const date = new Date(transaction[0]).toLocaleDateString();
                    const profit = parseFloat(transaction[1]) || 0;
                    labels.push(date);
                    profits.push(profit);
                }
            });
            return {
                labels,
                datasets: [{
                    label: 'Profit/Loss',
                    data: profits,
                    borderColor: gameColors[game],
                    backgroundColor: gameColors[game] + '30',
                    tension: 0.2
                }]
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
                            label: ctx => `${ctx.dataset.label}: $${ctx.raw?.toFixed(2)}`
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
                            callback: val => `$${val.toFixed(2)}` 
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            };
        }
        async function buildCryptoPortfolioChart(email) {
            try {
                // Check if we're viewing another user's data
                const urlUserId = getUrlParameter('userId');
                if (urlUserId && userAnalyticsData && userAnalyticsData.profitMap && userAnalyticsData.profitMap.crypto) {
                    // Use the crypto data from the user's profit map
                    const cryptoData = userAnalyticsData.profitMap.crypto;
                    const ctx = document.getElementById('cryptoPortfolioGraph')?.getContext('2d');
                    if (ctx && Array.isArray(cryptoData) && cryptoData.length > 0) {
                        const labels = [];
                        const values = [];
                        // Process crypto data
                        cryptoData.forEach(item => {
                            if (Array.isArray(item) && item.length >= 2) {
                                const date = new Date(item[0]);
                                labels.push(formatDateLabel(date));
                                values.push(parseFloat(item[1]) || 0);
                            }
                        });
                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: labels.length > 0 ? labels : ['No Data'],
                                datasets: [{
                                    label: 'Portfolio Value ($)',
                                    data: values.length > 0 ? values : [0],
                                    borderColor: gameColors.crypto,
                                    backgroundColor: gameColors.crypto + '10',
                                    tension: 0.2
                                }]
                            },
                            options: getChartOptions('crypto')
                        });
                        return cryptoData;
                    }
                    // Return empty placeholder data if we couldn't render properly
                    return [];
                }
                // Current user or fallback logic
                if (!email) return [];
                const res = await fetch(`${javaURI}/api/crypto/holdings?email=${encodeURIComponent(email)}`, fetchOptions);
                if (!res.ok) return [];
                const holdingsData = await res.json();
                const holdings = Object.fromEntries(
                    holdingsData.holdings.split(',').map(s => {
                        const [symbol, amt] = s.split(':');
                        return [symbol.trim().toUpperCase(), parseFloat(amt.trim())];
                    })
                );
                const trend = Array(7).fill(0);
                for (const [symbol, amt] of Object.entries(holdings)) {
                    const tr = await fetch(`${javaURI}/api/crypto/trend?cryptoId=${symbol}&days=7`, fetchOptions);
                    if (!tr.ok) continue;
                    const td = await tr.json();
                    for (let i = 0; i < 7; i++) trend[i] += (td[i] || 0) * amt;
                }
                const ctx = document.getElementById('cryptoPortfolioGraph')?.getContext('2d');
                if (ctx) new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['6d ago', '5d', '4d', '3d', '2d', '1d', 'Today'],
                        datasets: [{
                            label: 'Portfolio Value ($)',
                            data: trend.map(v => v.toFixed(2)),
                            borderColor: gameColors.crypto,
                            backgroundColor: gameColors.crypto + '10',
                            tension: 0.2
                        }]
                    },
                    options: getChartOptions('crypto')
                });
                return trend.map((v, i) => [Date.now() - (6 - i) * 86400000, v]);
            } catch (e) { 
                console.error('Crypto fetch error:', e); 
                return []; 
            }
        }
        async function buildStockPortfolioChart(email) {
            try {
                // Check if we're viewing another user's data
                const urlUserId = getUrlParameter('userId');    
                if (urlUserId && userAnalyticsData && userAnalyticsData.profitMap && userAnalyticsData.profitMap.stocks) {
                    // Use the stocks data from the user's profit map
                    const stocksData = userAnalyticsData.profitMap.stocks;
                    const ctx = document.getElementById('stocksChart')?.getContext('2d'); 
                    if (ctx && Array.isArray(stocksData) && stocksData.length > 0) {
                        const labels = [];
                        const values = [];    
                        // Process stocks data
                        stocksData.forEach(item => {
                            if (Array.isArray(item) && item.length >= 2) {
                                const date = new Date(item[0]);
                                labels.push(formatDateLabel(date));
                                values.push(parseFloat(item[1]) || 0);
                            }
                        });    
                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: labels.length > 0 ? labels : ['No Data'],
                                datasets: [{
                                    label: 'Stock Portfolio ($)',
                                    data: values.length > 0 ? values : [0],
                                    borderColor: gameColors.stocks,
                                    backgroundColor: gameColors.stocks + '10',
                                    tension: 0.2
                                }]
                            },
                            options: getChartOptions('stocks')
                        });                       
                        return stocksData;
                    }                  
                    // Return empty placeholder data if we couldn't render properly
                    return [];
                }
                // Current user or fallback logic
                if (!email) return [];               
                const res = await fetch(`${javaURI}/api/stocks/portfolio/trend?email=${email}`, fetchOptions);
                if (!res.ok) return [];
                const trend = await res.json();
                const ctx = document.getElementById('stocksChart')?.getContext('2d');
                if (ctx) new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['6d ago', '5d', '4d', '3d', '2d', '1d', 'Today'],
                        datasets: [{
                            label: 'Stock Portfolio ($)',
                            data: trend.map(v => v.toFixed(2)),
                            borderColor: gameColors.stocks,
                            backgroundColor: gameColors.stocks + '10',
                            tension: 0.2
                        }]
                    },
                    options: getChartOptions('stocks')
                });
                return trend.map((v, i) => [Date.now() - (6 - i) * 86400000, v]);
            } catch (e) { 
                console.error('Stocks fetch error:', e);
                return []; 
            }
        }
        function formatDateLabel(date) {
            const now = new Date();
            const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 7) return `${diffDays}d ago`;
            
            return date.toLocaleDateString();
        }
        document.addEventListener('DOMContentLoaded', fetchUserDetails);
    </script>
</body>
</html>