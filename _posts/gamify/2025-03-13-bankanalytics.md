---
layout: fortunefinders
title: Bank Analytics
permalink: /gamify/bankanalytics
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
  body { background-color: #121212; color: #fff; font-family: 'Poppins', sans-serif; }
  .chart-container { height: 500px; overflow: visible; }
  .combined-chart-container { height: 600px; }
  .game-card { background-color: #1f1f1f; border-radius: 8px; transition: transform 0.3s; }
  .game-card:hover { transform: translateY(-5px); }
  .game-title { color: #ff9800; border-left: 4px solid #ff9800; padding-left: 1rem; }
  .toggle-container { text-align: center; margin-bottom: 1rem; }
  .toggle-container button { margin: 0.2rem; }
  canvas { transition: transform 0.3s ease; }
  .game-card:hover canvas { transform: scale(1.8); transform-origin: center center; }
</style>

<body>
<br><h1 class="text-center">Game Analytics</h1>
<div class="container text-center my-4">
  <h4>User ID: <span class="name">Loading...</span></h4>
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
    <div class="combined-chart-container mt-3"><canvas id="combinedChart"></canvas></div>
  </div>
</div>

<!-- Individual Game Charts -->
<div class="container my-4">
  <div class="row g-4">
    <div class="col-md-6" id="pokerChartContainer"></div>
    <div class="col-md-6" id="blackjackChartContainer"></div>
    <div class="col-md-6" id="diceChartContainer"></div>
    <div class="col-md-6" id="casino_minesChartContainer"></div>
    <div class="col-md-6">
      <div class="game-card p-3 h-100">
        <h3 class="game-title">Crypto Portfolio</h3>
        <div class="chart-container mt-3"><canvas id="cryptoPortfolioGraph"></canvas></div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="game-card p-3 h-100">
        <h3 class="game-title">Stock Portfolio</h3>
        <div class="chart-container mt-3"><canvas id="stocksChart"></canvas></div>
      </div>
    </div>
  </div>
</div>

<script type="module">
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

const gameMap = {
  poker: 'Poker', blackjack: 'Blackjack', dice: 'Dice', casino_mines: 'Mines'
};
const gameColors = {
  poker: '#FF6384', blackjack: '#4BC0C0', dice: '#FFCE56',
  casino_mines: '#9966FF', crypto: '#00FFFF', stocks: '#28a745'
};

let combinedChart = null;
const charts = {};
let uid = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const userRes = await fetch(`${javaURI}/api/person/get`, fetchOptions);
    const user = await userRes.json();
    uid = user.uid;
    document.querySelector('.name').textContent = uid;
    document.querySelector('.balance').textContent = parseFloat(user.banks.balance).toFixed(2);

    await loadCharts(user.uid, user.email);
  } catch (e) {
    console.error('User fetch failed:', e);
  }
});

async function loadCharts(uid, email) {
  const gameData = await Promise.all(Object.keys(gameMap).map(async game => {
    const url = game === 'casino_mines'
      ? `${javaURI}/api/casino/mines/history/${uid}`
      : `${javaURI}/bank/${uid}/profitmap/${game}`;
    const res = await fetch(url, fetchOptions);
    const data = await res.json().catch(() => []);
    renderChartCard(game);
    createChart(game, data);
    return { game, data };
  }));

  const crypto = await buildCryptoPortfolioChart(email);
  const stocks = await buildStockPortfolioChart(email);
  createCombinedChart([...gameData, { game: 'crypto', data: crypto }, { game: 'stocks', data: stocks }]);
}

function renderChartCard(game) {
  const container = document.getElementById(`${game}ChartContainer`);
  if (container) container.innerHTML = `
    <div class="game-card p-3 h-100">
      <h3 class="game-title">${gameMap[game]}</h3>
      <div class="chart-container mt-3"><canvas id="${game}Chart"></canvas></div>
    </div>`;
}

function createChart(game, entries) {
  if (!entries.length) return;
  const labels = [], profits = [], cum = [];
  let bal = 0;
  entries.forEach(([ts, val]) => {
    labels.push(new Date(ts).toLocaleDateString());
    const p = parseFloat(val);
    profits.push(p);
    bal += p; cum.push(bal);
  });
  const ctx = document.getElementById(`${game}Chart`).getContext('2d');
  charts[game]?.destroy();
  charts[game] = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Profit', data: profits, borderColor: gameColors[game], backgroundColor: gameColors[game] + '30', tension: 0.2 },
        { label: 'Cumulative', data: cum, borderColor: gameColors[game], backgroundColor: gameColors[game] + '10', tension: 0.2 }
      ]
    },
    options: getOptions()
  });
}

function createCombinedChart(allGames) {
  const allDates = new Set();
  allGames.forEach(({ data }) => data.forEach(([ts]) => allDates.add(new Date(ts).toLocaleDateString())));
  const labels = [...allDates].sort((a, b) => new Date(a) - new Date(b));

  const datasets = allGames.map(({ game, data }) => {
    const cum = {}, sum = [];
    let b = 0;
    data.forEach(([ts, val]) => {
      const d = new Date(ts).toLocaleDateString();
      b += parseFloat(val); cum[d] = b;
    });
    labels.forEach(l => sum.push(cum[l] ?? null));
    return {
      label: gameMap[game] || game.charAt(0).toUpperCase() + game.slice(1),
      data: sum, borderColor: gameColors[game],
      backgroundColor: gameColors[game] + '30', tension: 0.2
    };
  });

  const ctx = document.getElementById('combinedChart').getContext('2d');
  combinedChart?.destroy();
  combinedChart = new Chart(ctx, {
    type: 'line', data: { labels, datasets }, options: getOptions()
  });
}

window.toggleDataset = function (label) {
  const ds = combinedChart?.data.datasets.find(d => d.label === label);
  if (ds) { ds.hidden = !ds.hidden; combinedChart.update(); }
};

function getOptions() {
  return {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#fff' } },
      tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: $${ctx.raw?.toFixed(2)}` } }
    },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: {
        ticks: { color: '#fff', callback: v => `$${v.toFixed(2)}` },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };
}

async function buildCryptoPortfolioChart(email) {
  try {
    const res = await fetch(`${javaURI}/api/crypto/holdings?email=${email}`, fetchOptions);
    if (!res.ok) return [];
    const holdingsRaw = await res.json();
    const holdings = Object.fromEntries(holdingsRaw.holdings.split(',').map(e => {
      const [sym, amt] = e.split(':'); return [sym.trim().toUpperCase(), parseFloat(amt)];
    }));
    const trend = Array(7).fill(0);
    for (const [symbol, amt] of Object.entries(holdings)) {
      const res = await fetch(`${javaURI}/api/crypto/trend?cryptoId=${symbol}&days=7`, fetchOptions);
      if (!res.ok) continue;
      const td = await res.json();
      td.forEach((val, i) => trend[i] += val * amt);
    }
    new Chart(document.getElementById('cryptoPortfolioGraph'), {
      type: 'line',
      data: {
        labels: ['6d', '5d', '4d', '3d', '2d', '1d', 'Today'],
        datasets: [{
          label: 'Portfolio ($)', data: trend, borderColor: gameColors.crypto,
          backgroundColor: gameColors.crypto + '10', tension: 0.2
        }]
      }, options: getOptions()
    });
    return trend.map((v, i) => [Date.now() - (6 - i) * 86400000, v]);
  } catch (e) { console.error("Crypto error:", e); return []; }
}

async function buildStockPortfolioChart(email) {
  try {
    const res = await fetch(`${javaURI}/api/stocks/portfolio/trend?email=${email}`, fetchOptions);
    if (!res.ok) return [];
    const trend = await res.json();
    new Chart(document.getElementById('stocksChart'), {
      type: 'line',
      data: {
        labels: ['6d', '5d', '4d', '3d', '2d', '1d', 'Today'],
        datasets: [{
          label: 'Stock Portfolio ($)', data: trend, borderColor: gameColors.stocks,
          backgroundColor: gameColors.stocks + '10', tension: 0.2
        }]
      }, options: getOptions()
    });
    return trend.map((v, i) => [Date.now() - (6 - i) * 86400000, v]);
  } catch (e) { console.error("Stock error:", e); return []; }
}
</script>
</body>