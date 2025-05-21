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

  <!-- Combined Chart -->
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

  <!-- Charts Grid -->
  <div class="row g-4">
    <div class="col-12 col-md-6">
      <div class="game-card p-4 h-100">
        <h3 class="game-title mb-3">Poker</h3>
        <div id="pokerChartContainer" class="chart-container">
          <canvas id="pokerChart"></canvas>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="game-card p-4 h-100">
        <h3 class="game-title mb-3">Blackjack</h3>
        <div id="blackjackChartContainer" class="chart-container">
          <canvas id="blackjackChart"></canvas>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="game-card p-4 h-100">
        <h3 class="game-title mb-3">Dice</h3>
        <div id="diceChartContainer" class="chart-container">
          <canvas id="diceChart"></canvas>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="game-card p-4 h-100">
        <h3 class="game-title mb-3">Mines</h3>
        <div id="casino_minesChartContainer" class="chart-container">
          <canvas id="casino_minesChart"></canvas>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="game-card p-4 h-100">
        <h3 class="game-title mb-3">Crypto Portfolio</h3>
        <div id="cryptoChartContainer" class="chart-container">
          <canvas id="cryptoChart"></canvas>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="game-card p-4 h-100">
        <h3 class="game-title mb-3">Stock Portfolio</h3>
        <div id="stocksChartContainer" class="chart-container">
          <canvas id="stocksChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="module">
  import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  // Define chart colors and game mappings
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

  // Chart instances
  let charts = {};
  let combinedChart = null;
  let userAnalyticsData = null;
  
  // DOM loaded initialization
  document.addEventListener('DOMContentLoaded', () => {
    initializeAnalytics();
    
    // Set up refresh button
    document.getElementById('refreshData').addEventListener('click', initializeAnalytics);
    
    // Set up toggle buttons
    const toggleButtons = document.querySelectorAll('#toggleButtons button');
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const game = e.target.getAttribute('data-game');
        toggleDataset(game);
        button.classList.toggle('active');
      });
    });
  });
  
  // Initialize analytics data and charts
  async function initializeAnalytics() {
    try {
      showLoading();
      await fetchUserDetails();
      initializeCharts();
    } catch (error) {
      console.error("Analytics initialization error:", error);
      showError("Failed to load analytics data. Please try again later.");
    }
  }
  
  // Show loading spinner for all chart containers
  function showLoading() {
    const containers = document.querySelectorAll('.chart-container, .combined-chart-container');
    containers.forEach(container => {
      container.innerHTML = '<div class="loading-spinner"><div></div></div>';
    });
  }
  
  // Show error message in container
  function showError(message, containerId = null) {
    const errorHtml = `<div class="error-container">${message}</div>`;
    
    if (containerId) {
      document.getElementById(containerId).innerHTML = errorHtml;
    } else {
      const containers = document.querySelectorAll('.chart-container, .combined-chart-container');
      containers.forEach(container => {
        container.innerHTML = errorHtml;
      });
    }
    
    // Also update user info
    document.querySelector('.name').textContent = 'Error';
    document.querySelector('.balance').textContent = '0.00';
  }
  
  // Show empty data message
  function showEmptyData(containerId, message = "No data available for this game") {
    document.getElementById(containerId).innerHTML = `<div class="empty-data-message">${message}</div>`;
  }
  
  // Parse URL parameters
  function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  
  // Update header with user info
  function updateHeader(name, balance) {
    document.querySelector('.name').textContent = name || 'Unknown';
    document.querySelector('.balance').textContent = Number(balance).toFixed(2);
  }
  
  // Fetch user analytics data
  async function fetchUserDetails() {
    try {
      const urlUserId = getUrlParameter('userId');
      let analyticsResponse;

      if (urlUserId) {
        analyticsResponse = await fetch(`${javaURI}/bank/analytics/${urlUserId}`, fetchOptions);
      } else {
        const personResp = await fetch(`${javaURI}/api/person/get`, fetchOptions);
        if (!personResp.ok) throw new Error('Failed to fetch person data');
        
        const personData = await personResp.json();
        analyticsResponse = await fetch(`${javaURI}/bank/analytics/person/${personData.id}`, fetchOptions);
      }

      if (!analyticsResponse.ok) throw new Error(`Analytics fetch failed: ${analyticsResponse.status}`);
      const analyticsJson = await analyticsResponse.json();
      
      if (!analyticsJson.success) throw new Error('Failed to fetch analytics');

      userAnalyticsData = analyticsJson.data;
      updateHeader(userAnalyticsData.username, userAnalyticsData.balance);
      
      // Ensure we have a profitMap, even if empty
      if (!userAnalyticsData.profitMap) {
        userAnalyticsData.profitMap = {};
      }
      
      return userAnalyticsData;
    } catch (err) {
      console.error("Error fetching user details:", err);
      throw err;
    }
  }
  
  // Initialize all charts
  function initializeCharts() {
    if (!userAnalyticsData) return;
    
    const profitMap = userAnalyticsData.profitMap || {};
    
    // Reset chart containers
    Object.keys(gameMap).forEach(game => {
      document.getElementById(`${game}ChartContainer`).innerHTML = `<canvas id="${game}Chart"></canvas>`;
    });
    document.getElementById('combinedChartContainer').innerHTML = '<canvas id="combinedChart"></canvas>';
    
    // Create individual game charts
    Object.keys(gameMap).forEach(game => {
      const data = profitMap[game] || [];
      if (data.length > 0) {
        createChart(game, data);
      } else {
        showEmptyData(`${game}ChartContainer`);
      }
    });
    
    // Create combined chart with all data
    createCombinedChart();
  }
  
  // Create individual game chart
  function createChart(game, transactions) {
    const canvas = document.getElementById(`${game}Chart`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Process data for chart
    const chartData = processTransactionData(transactions);
    
    // If no valid data, show empty message
    if (chartData.labels.length === 0) {
      showEmptyData(`${game}ChartContainer`);
      return;
    }
    
    // Create chart configuration
    const config = {
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
          pointHoverRadius: 5,
          tension: 0.2,
          fill: true
        }]
      },
      options: chartOptions()
    };
    
    // Create chart
    if (charts[game]) {
      charts[game].destroy();
    }
    charts[game] = new Chart(ctx, config);
  }
  
  // Create combined chart with all games
  function createCombinedChart() {
    const canvas = document.getElementById('combinedChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const profitMap = userAnalyticsData.profitMap || {};
    
    // Get all dates from all datasets
    const allDates = new Set();
    Object.keys(gameMap).forEach(game => {
      const transactions = profitMap[game] || [];
      transactions.forEach(([ts]) => {
        if (ts) {
          allDates.add(new Date(ts).toLocaleDateString());
        }
      });
    });
    
    // Sort dates chronologically
    const labels = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));
    
    // If no data, show empty message
    if (labels.length === 0) {
      showEmptyData('combinedChartContainer', 'No game data available yet. Play some games to see your analytics!');
      return;
    }
    
    // Create datasets for each game
    const datasets = Object.keys(gameMap).map(game => {
      const transactions = profitMap[game] || [];
      const daily = {};
      
      // Group transactions by date
      transactions.forEach(([ts, val]) => {
        if (ts && val !== undefined) {
          const date = new Date(ts).toLocaleDateString();
          daily[date] = (daily[date] || 0) + Number(val);
        }
      });
      
      return {
        label: gameMap[game],
        data: labels.map(date => daily[date] || 0),
        borderColor: gameColors[game],
        backgroundColor: `${gameColors[game]}20`,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
        tension: 0.1,
        fill: false,
        hidden: false
      };
    });
    
    // Create the combined chart
    if (combinedChart) {
      combinedChart.destroy();
    }
    
    combinedChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        ...chartOptions(),
        plugins: {
          ...chartOptions().plugins,
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: context => `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }
  
  // Process transaction data for charting
  function processTransactionData(transactions) {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return { labels: [], data: [] };
    }
    
    // Filter out any invalid entries
    transactions = transactions.filter(item => 
      Array.isArray(item) && 
      item.length >= 2 && 
      item[0] !== null && 
      item[1] !== null
    );
    
    if (transactions.length === 0) {
      return { labels: [], data: [] };
    }
    
    // Group by date and sum values
    const dailyTotals = {};
    transactions.forEach(([timestamp, value]) => {
      try {
        const date = new Date(timestamp).toLocaleDateString();
        dailyTotals[date] = (dailyTotals[date] || 0) + Number(value);
      } catch (e) {
        console.error("Error processing timestamp:", timestamp, e);
      }
    });
    
    // Sort dates chronologically
    const sortedDates = Object.keys(dailyTotals).sort((a, b) => new Date(a) - new Date(b));
    
    return {
      labels: sortedDates,
      data: sortedDates.map(date => dailyTotals[date])
    };
  }
  
  // Chart options configuration
  function chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { 
            color: '#fff',
            font: {
              size: 12
            },
            boxWidth: 15,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          padding: 10,
          callbacks: {
            label: context => `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.3)'
          },
          ticks: { 
            color: '#fff',
            maxRotation: 45,
            minRotation: 0
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.3)'
          },
          ticks: {
            color: '#fff',
            callback: value => `$${value}`
          },
          beginAtZero: false
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    };
  }
  
  // Toggle dataset visibility in combined chart
  window.toggleDataset = function(label) {
    if (!combinedChart) return;
    
    const datasetIndex = combinedChart.data.datasets.findIndex(ds => 
      ds.label === gameMap[label]
    );
    
    if (datasetIndex >= 0) {
      const isVisible = combinedChart.isDatasetVisible(datasetIndex);
      combinedChart.setDatasetVisibility(datasetIndex, !isVisible);
      combinedChart.update();
      
      // Update button active state
      const button = document.querySelector(`button[data-game="${label}"]`);
      if (button) {
        if (isVisible) {
          button.classList.remove('active');
        } else {
          button.classList.add('active');
        }
      }
    }
  };
</script>