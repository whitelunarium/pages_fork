---
layout: fortunefinders
title: Bank Analytics
permalink: /gamify/bankanalytics
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
  .chart-container { height: 400px; position: relative; margin-bottom: 20px; }
  .combined-chart-container { height: 500px; margin-bottom: 20px; }
  .game-card { background-color: #1f1f1f; border-radius: 8px; transition: transform 0.3s; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); margin-bottom: 20px; }
  .game-card:hover { transform: translateY(-5px); }
  .game-title { color: #ff9800; border-left: 4px solid #ff9800; padding-left: 1rem; }
  .toggle-container { text-align: center; margin-bottom: 1rem; }
  .toggle-container button { margin: 0.2rem; }
  .toggle-container button.active { opacity: 1; font-weight: bold; }
  .toggle-container button:not(.active) { opacity: 0.7; }
  .loading-spinner { display: flex; justify-content: center; align-items: center; height: 200px; }
  .loading-spinner div { border: 5px solid rgba(255, 152, 0, 0.3); border-radius: 50%; border-top: 5px solid #ff9800; width: 50px; height: 50px; animation: spin 1s linear infinite; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  .error-container { padding: 20px; text-align: center; color: #ff6b6b; }
  .empty-data-message { padding: 20px; text-align: center; color: #aaa; font-style: italic; }
</style>

<div class="container my-5">
  <h1 class="text-center mb-4">Game Analytics Dashboard</h1>

  <div class="game-card p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="game-title mb-0">User Profile</h3>
      <button class="btn btn-sm btn-outline-warning" id="refreshData">Refresh Data</button>
    </div>
    <div id="userInfo">
      <div class="row">
        <div class="col-md-6">
          <h4>Username: <span class="name">Loading...</span></h4>
        </div>
        <div class="col-md-6 text-md-end">
          <h4>Current Balance: $<span class="balance">0.00</span></h4>
        </div>
      </div>
    </div>
  </div>

  <div class="game-card p-4">
    <h3 class="game-title mb-3">All Games Combined</h3>
    <div class="toggle-container" id="toggleButtons">
      <button class="btn btn-sm btn-outline-warning active" data-game="poker">Poker</button>
      <button class="btn btn-sm btn-outline-info active" data-game="blackjack">Blackjack</button>
      <button class="btn btn-sm btn-outline-light active" data-game="dice">Dice</button>
      <button class="btn btn-sm btn-outline-primary active" data-game="casino_mines">Mines</button>
      <button class="btn btn-sm btn-outline-success active" data-game="stocks">Stocks</button>
      <button class="btn btn-sm btn-outline-info active" data-game="crypto">Crypto</button>
    </div>
    <div id="combinedChartContainer" class="combined-chart-container">
      <canvas id="combinedChart"></canvas>
    </div>
  </div>

  <div class="row g-4">
    <div class="col-md-6"><div class="game-card p-4"><h3 class="game-title mb-3">Poker</h3><div id="pokerChartContainer" class="chart-container"><canvas id="pokerChart"></canvas></div></div></div>
    <div class="col-md-6"><div class="game-card p-4"><h3 class="game-title mb-3">Blackjack</h3><div id="blackjackChartContainer" class="chart-container"><canvas id="blackjackChart"></canvas></div></div></div>
    <div class="col-md-6"><div class="game-card p-4"><h3 class="game-title mb-3">Dice</h3><div id="diceChartContainer" class="chart-container"><canvas id="diceChart"></canvas></div></div></div>
    <div class="col-md-6"><div class="game-card p-4"><h3 class="game-title mb-3">Mines</h3><div id="casino_minesChartContainer" class="chart-container"><canvas id="casino_minesChart"></canvas></div></div></div>
    <div class="col-md-6"><div class="game-card p-4"><h3 class="game-title mb-3">Crypto Portfolio</h3><div id="cryptoChartContainer" class="chart-container"><canvas id="cryptoChart"></canvas></div></div></div>
    <div class="col-md-6"><div class="game-card p-4"><h3 class="game-title mb-3">Stock Portfolio</h3><div id="stocksChartContainer" class="chart-container"><canvas id="stocksChart"></canvas></div></div></div>
  </div>
</div>

<script type="module">
  import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  const gameMap = {
    poker: 'Poker',
    blackjack: 'Blackjack',
    dice: 'Dice',
    casino_mines: 'Mines',
    crypto: 'Crypto',
    stocks: 'Stocks'
  };

  const gameColors = {
    poker: '#FF6384',
    blackjack: '#4BC0C0',
    dice: '#FFCE56',
    casino_mines: '#9966FF',
    crypto: '#00FFFF',
    stocks: '#28a745'
  };

  let charts = {};
  let combinedChart = null;
  let userAnalyticsData = null;
  let uid = null;

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const userResponse = await fetch(`${javaURI}/api/person/get`, fetchOptions);
      const userData = await userResponse.json();
      uid = userData.uid;

      initializeAnalytics();
      document.getElementById('refreshData').addEventListener('click', initializeAnalytics);

      document.querySelectorAll('#toggleButtons button').forEach(button => {
        button.addEventListener('click', (e) => {
          const game = e.target.getAttribute('data-game');
          toggleDataset(game);
          button.classList.toggle('active');
        });
      });
    } catch (error) {
      console.error("Initialization error:", error);
      showError("Failed to initialize dashboard. Please refresh the page.");
    }
  });

  async function initializeAnalytics() {
    try {
      showLoading();
      await fetchUserDetails();
      initializeCharts();
    } catch (error) {
      console.error("Analytics error:", error);
      showError("Failed to load analytics data. Please try again later.");
    }
  }

  async function fetchUserDetails() {
    const response = await fetch(`${javaURI}/bank/analytics/${uid}`, fetchOptions);
    const analyticsJson = await response.json();
    userAnalyticsData = analyticsJson.data || {};
    updateHeader(userAnalyticsData.username, userAnalyticsData.balance);
    userAnalyticsData.profitMap = userAnalyticsData.profitMap || {};
  }

  function initializeCharts() {
    const profitMap = userAnalyticsData.profitMap || {};

    Object.keys(gameMap).forEach(game => {
      const container = document.getElementById(`${game}ChartContainer`);
      if (container) {
        container.innerHTML = `<canvas id="${game}Chart"></canvas>`;
        const data = profitMap[game] || [];
        data.length > 0 ? createChart(game, data) : showEmptyData(`${game}ChartContainer`);
      }
    });

    createCombinedChart();
  }

  function createChart(game, transactions) {
    const ctx = document.getElementById(`${game}Chart`).getContext('2d');
    const chartData = processTransactionData(transactions);

    if (charts[game]) charts[game].destroy();

    charts[game] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: gameMap[game],
          data: chartData.data,
          borderColor: gameColors[game],
          backgroundColor: `${gameColors[game]}30`,
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.2,
          fill: true
        }]
      },
      options: chartOptions()
    });
  }

  function createCombinedChart() {
    const ctx = document.getElementById('combinedChart').getContext('2d');
    const profitMap = userAnalyticsData.profitMap || {};
    const allDates = new Set();

    Object.values(profitMap).flat().forEach(([ts]) => ts && allDates.add(new Date(ts).toLocaleDateString()));
    const labels = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

    const datasets = Object.keys(gameMap).map(game => {
      const transactions = profitMap[game] || [];
      const daily = {};
      transactions.forEach(([ts, val]) => {
        const date = new Date(ts).toLocaleDateString();
        daily[date] = (daily[date] || 0) + Number(val);
      });

      return {
        label: gameMap[game],
        data: labels.map(date => daily[date] || 0),
        borderColor: gameColors[game],
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.1
      };
    });

    if (combinedChart) combinedChart.destroy();

    combinedChart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: chartOptions()
    });
  }

  function processTransactionData(transactions) {
    const dailyTotals = {};
    transactions.forEach(([timestamp, value]) => {
      const date = new Date(timestamp).toLocaleDateString();
      dailyTotals[date] = (dailyTotals[date] || 0) + Number(value);
    });

    const sortedDates = Object.keys(dailyTotals).sort((a, b) => new Date(a) - new Date(b));
    return {
      labels: sortedDates,
      data: sortedDates.map(date => dailyTotals[date])
    };
  }

  function chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#fff' } },
        tooltip: {
          backgroundColor: '#222',
          callbacks: {
            label: ctx => `${ctx.dataset.label}: $${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          ticks: { color: '#fff', callback: val => `$${val}` },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
    };
  }

  function updateHeader(name, balance) {
    document.querySelector('.name').textContent = name || 'Unknown';
    document.querySelector('.balance').textContent = Number(balance).toFixed(2);
  }

  function showLoading() {
    document.querySelectorAll('.chart-container, .combined-chart-container').forEach(container => {
      container.innerHTML = '<div class="loading-spinner"><div></div></div>';
    });
  }

  function showError(message) {
    document.querySelectorAll('.chart-container, .combined-chart-container').forEach(container => {
      container.innerHTML = `<div class="error-container">${message}</div>`;
    });
  }

  function showEmptyData(containerId, message = "No data available") {
    document.getElementById(containerId).innerHTML = `<div class="empty-data-message">${message}</div>`;
  }

  function toggleDataset(game) {
    const dataset = combinedChart.data.datasets.find(ds => ds.label === gameMap[game]);
    if (dataset) {
      dataset.hidden = !dataset.hidden;
      combinedChart.update();
    }
  }
</script>
