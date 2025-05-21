---
layout: fortunefinders
title: Bank Analytics
permalink: /gamify/bankanalytics
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bank Analytics</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    .chart-container { height: 500px; position: relative; }
    .combined-chart-container { height: 600px; }
    .game-card { background-color: #1f1f1f; border-radius: 8px; transition: transform 0.3s; }
    .game-card:hover { transform: translateY(-5px); }
    .game-title { color: #ff9800; border-left: 4px solid #ff9800; padding-left: 1rem; }
    .toggle-container { text-align: center; margin-bottom: 1rem; }
    .toggle-container button { margin: 0.2rem; }
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
        <button class="btn btn-sm btn-outline-warning" onclick="toggleDataset('Poker')">Poker</button>
        <button class="btn btn-sm btn-outline-info" onclick="toggleDataset('Blackjack')">Blackjack</button>
        <button class="btn btn-sm btn-outline-light" onclick="toggleDataset('Dice')">Dice</button>
        <button class="btn btn-sm btn-outline-primary" onclick="toggleDataset('Mines')">Mines</button>
        <button class="btn btn-sm btn-outline-success" onclick="toggleDataset('Stocks')">Stocks</button>
        <button class="btn btn-sm btn-outline-cyan" onclick="toggleDataset('Crypto')">Crypto</button>
      </div>
      <div class="combined-chart-container mt-3">
        <canvas id="combinedChart"></canvas>
      </div>
    </div>
  </div>

  <!-- Charts Grid -->
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-12 col-md-6" id="pokerChartContainer"></div>
      <div class="col-12 col-md-6" id="blackjackChartContainer"></div>
      <div class="col-12 col-md-6" id="diceChartContainer"></div>
      <div class="col-12 col-md-6" id="casino_minesChartContainer"></div>
      <div class="col-12 col-md-6">
        <div class="game-card p-3 h-100">
          <h3 class="game-title">Crypto Portfolio</h3>
          <div class="chart-container mt-3"><canvas id="cryptoPortfolioGraph"></canvas></div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="game-card p-3 h-100">
          <h3 class="game-title">Stock Portfolio</h3>
          <div class="chart-container mt-3"><canvas id="stocksChart"></canvas></div>
        </div>
      </div>
    </div>
  </div>

  <script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    const Chart = window.Chart;

    let userAnalyticsData = null;
    let combinedChart = null;
    const charts = {};
    const gameMap = { poker: 'Poker', blackjack: 'Blackjack', dice: 'Dice', casino_mines: 'Mines' };
    const gameColors = { poker: '#FF6384', blackjack: '#4BC0C0', dice: '#FFCE56', casino_mines: '#9966FF', crypto: '#00FFFF', stocks: '#28a745' };

    function getUrlParameter(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }

    function updateHeader(name, balance) {
      document.querySelector('.name').textContent = name || 'Unknown';
      document.querySelector('.balance').textContent = Number(balance).toFixed(2);
    }

    async function fetchUserDetails() {
      try {
        const urlUserId = getUrlParameter('userId');
        let analyticsResponse;

        if (urlUserId) {
          analyticsResponse = await fetch(`${javaURI}/bank/analytics/${urlUserId}`, fetchOptions);
        } else {
          const personResp = await fetch(`${javaURI}/api/person/get`, fetchOptions);
          const personData = await personResp.json();
          analyticsResponse = await fetch(`${javaURI}/bank/analytics/person/${personData.id}`, fetchOptions);
        }

        const analyticsJson = await analyticsResponse.json();
        if (!analyticsResponse.ok || !analyticsJson.success) throw new Error('Failed to fetch analytics');

        userAnalyticsData = analyticsJson.data;
        updateHeader(userAnalyticsData.username, userAnalyticsData.balance);
        initializeCharts();
      } catch (err) {
        console.error(err);
        updateHeader('Error', 0);
      }
    }

    function initializeCharts() {
      const profitMap = userAnalyticsData.profitMap || {};
      const gameData = Object.keys(gameMap).map(game => ({ game, data: profitMap[game] || [] }));

      gameData.forEach(({ game, data }) => {
        renderChartCard(game);
        createChart(game, data);
      });

      buildCryptoChart();
      buildStockChart();
      createCombinedChart(gameData);
    }

    function renderChartCard(game) {
      const container = document.getElementById(`${game}ChartContainer`);
      if (!container) return;
      container.innerHTML = `
        <div class="game-card p-3 h-100">
          <h3 class="game-title">${gameMap[game]}</h3>
          <div class="chart-container mt-3"><canvas id="${game}Chart"></canvas></div>
        </div>`;
    }

    function createChart(game, transactions) {
      const ctx = document.getElementById(`${game}Chart`)?.getContext('2d');
      const cfg = getChartConfig(transactions, gameMap[game], gameColors[game]);
      if (!ctx || !cfg) return;
      if (charts[game]) charts[game].destroy();
      charts[game] = new Chart(ctx, cfg);
    }

    function buildCryptoChart() {
      const ctx = document.getElementById('cryptoPortfolioGraph')?.getContext('2d');
      const dataArr = userAnalyticsData.profitMap.crypto || [];
      const cfg = getChartConfig(dataArr, 'Crypto', gameColors.crypto);
      if (ctx && cfg) new Chart(ctx, cfg);
    }

    function buildStockChart() {
      const ctx = document.getElementById('stocksChart')?.getContext('2d');
      const dataArr = userAnalyticsData.profitMap.stocks || [];
      const cfg = getChartConfig(dataArr, 'Stocks', gameColors.stocks);
      if (ctx && cfg) new Chart(ctx, cfg);
    }

    function createCombinedChart(gameData) {
      const allDates = new Set();
      const series = gameData.map(({ game, data }) => {
        const daily = {};
        data.forEach(([ts, val]) => {
          const d = new Date(ts).toLocaleDateString();
          daily[d] = (daily[d] || 0) + Number(val);
          allDates.add(d);
        });
        return { label: gameMap[game], daily, color: gameColors[game] };
      });

      const labels = Array.from(allDates).sort((a,b) => new Date(a) - new Date(b));
      const datasets = series.map(({ label, daily, color }) => ({
        label,
        data: labels.map(d => daily[d] || 0),
        borderColor: color,
        backgroundColor: color + '30',
        tension: 0.2
      }));

      const ctx = document.getElementById('combinedChart').getContext('2d');
      if (combinedChart) combinedChart.destroy();
      combinedChart = new Chart(ctx, { type: 'line', data: { labels, datasets }, options: chartOptions() });
    }

    function getChartConfig(dataArr, label, color) {
      if (!Array.isArray(dataArr) || dataArr.length === 0) return null;
      const daily = {};
      dataArr.forEach(([ts, val]) => {
        const d = new Date(ts).toLocaleDateString();
        daily[d] = (daily[d] || 0) + Number(val);
      });
      const labels = Object.keys(daily).sort((a,b) => new Date(a) - new Date(b));
      const data = labels.map(d => daily[d]);
      return { type: 'line', data: { labels, datasets: [{ label, data, borderColor: color, backgroundColor: color+'30', tension:0.2 }] }, options: chartOptions() };
    }

    function chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#fff' } },
          tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: $${ctx.parsed.y.toFixed(2)}` } }
        },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
          y: { ticks: { color: '#fff', callback: val => `$${val}` }, grid: { color: 'rgba(255,255,255,0.1)' } }
        }
      };
    }

    function toggleDataset(label) {
      if (!combinedChart) return;
      const ds = combinedChart.data.datasets.find(d => d.label === label);
      if (ds) { ds.hidden = !ds.hidden; combinedChart.update(); }
    }

    document.addEventListener('DOMContentLoaded', fetchUserDetails);
  </script>
</body>
</html>