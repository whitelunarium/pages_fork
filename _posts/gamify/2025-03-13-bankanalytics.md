---
layout: bank
title: Bank Analytics
permalink: /gamify/bankanalytics
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bank Analytics Dashboard</title>
  <link rel="stylesheet" href="{{site.baseurl}}/assets/css/portfolio.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    /* General Styles */
    body {
        font-family: 'Poppins', sans-serif;
        background-color: #121212;
        color: #ffffff;
        margin: 0;
        padding: 0;
    }
    /* Navigation Bar */
    .navbar {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
        background-color: #1c1c1c;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
    .nav-buttons {
        display: flex;
        gap: 15px;
    }
    .nav-buttons a {
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 6px;
        transition: 0.3s;
    }
    .nav-buttons a:hover {
        background-color: #ff9800;
        transform: scale(1.1);
    }
    /* Dashboard Layout */
    .dashboard {
        display: flex;
        gap: 30px;
        padding: 40px;
        max-width: 1400px;
        margin: 0 auto;
    }
    /* User Details Section */
    .user-details {
        flex: 1;
        background: #1f1f1f;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0px 0px 15px rgba(255, 136, 0, 0.3);
    }
    .user-profile {
        text-align: left;
        margin-bottom: 30px;
    }
    .user-stats {
        background: #2a2a2a;
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
    }
    .stat-item {
        margin: 15px 0;
        font-size: 18px;
    }
    .stat-label {
        color: #ff9800;
        margin-right: 10px;
    }
    /* Leaderboard Section */
    .leaderboard-container {
        width: 35%;
        min-width: 400px;
    }
    .leaderboard-title {
        font-size: 32px;
        font-weight: bold;
        text-transform: uppercase;
        background: linear-gradient(90deg, #ff8c00, #ff22a6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
        padding-bottom: 10px;
        border-bottom: 3px solid #ff22a6;
        letter-spacing: 2px;
        margin-bottom: 20px;
    }
    .leaderboard-table {
        width: 100%;
        border-collapse: collapse;
        background: #1f1f1f;
        border-radius: 8px;
        box-shadow: 0px 0px 15px rgba(255, 136, 0, 0.5);
        overflow: hidden;
    }
    th, td {
        padding: 12px 15px;
        text-align: left;
    }
    th {
        background-color: #ff9800;
        color: #000;
        font-size: 14px;
        text-transform: uppercase;
    }
    td {
        background-color: #2a2a2a;
        border-bottom: 1px solid #444;
        transition: background 0.3s;
    }
    tr:hover td {
        background-color: #ff22a6;
        color: #ffffff;
    }
    .rank {
        font-weight: bold;
        color: #ffcc00;
    }
    .balance {
        color: #00ff7f;
        font-weight: bold;
    }
    .name {
        font-weight: bold;
        color: #ffffff;
    }
    /* Column Widths */
    .leaderboard-table th:nth-child(1) { width: 15%; }
    .leaderboard-table th:nth-child(2) { width: 55%; }
    .leaderboard-table th:nth-child(3) { width: 30%; }
    /* Balance Chart Styles */
    .chart-section {
        background: #1f1f1f;
        padding: 30px;
        border-radius: 12px;
        margin: 40px auto;
        max-width: 1400px;
        box-shadow: 0px 0px 15px rgba(255, 136, 0, 0.3);
    }
    .chart-container {
        width: 100%;
        height: 400px;
        margin-top: 20px;
    }
    .chart-controls {
        margin: 20px 0;
        padding: 15px;
        background: #2a2a2a;
        border-radius: 5px;
    }
    .chart-select {
        padding: 8px 12px;
        margin-right: 10px;
        font-size: 16px;
        background: #3a3a3a;
        color: white;
        border: 1px solid #ff9800;
        border-radius: 4px;
    }
  </style>
</head>
<body>

  <br>
  <h1 style="text-align: center;">Bank Analytics</h1>
  <!-- Dashboard Content -->
  <div class="dashboard">
    <!-- Left Section - User Details -->
    <div class="user-details">
      <div class="user-profile">
        <h2 style="color: #ff9800; margin-bottom: 20px;">User Analytics</h2>
        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-label">Username:</span>
            <span class="name">Loading...</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Account Balance:</span>
            <span class="balance">Loading...</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Transactions:</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Right Section - Leaderboard -->
    <div class="leaderboard-container">
      <h1 class="leaderboard-title">Top 10 Users</h1>
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody id="top-users-table">
          <!-- Leaderboard Data Populated Here -->
        </tbody>
      </table>
    </div>
  </div>
  <!-- Balance Chart Section -->
  <div class="chart-section">
    <h2 style="color: #ff9800; margin-bottom: 20px;">Balance Change History</h2>
    <!-- Hidden div to store bank data passed from backend -->
    <div id="bankData" 
         data-profit-map='{"stocks":[150.25,-75.50,200.00],"casino":[50.00,25.00,12.50],"adventure":[1000.00,-500.00]}'>
    </div>
    <div class="chart-controls">
        <label for="categorySelect">Select Category:</label>
        <select id="categorySelect" class="chart-select">
            <option value="">Select a category</option>
        </select>
    </div>
    <div class="chart-container">
        <canvas id="balanceChart"></canvas>
    </div>
  </div>
  <script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    async function fetchUserDetails() {
        try {
            const response = await fetch(`${javaURI}/api/person/get`, fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch user data");
            const userData = await response.json(); 
            // Update user details section
            document.querySelector('.name').textContent = userData.uid;
            document.querySelector('.balance').textContent = `$${Number(userData.balance).toFixed(2)}`;
        } catch (error) {
            console.error("Error fetching user data:", error);
            document.querySelector('.name').textContent = "Error loading user";
        }
    }
    async function fetchLeaderboard() {
        try {
            const response = await fetch(`${javaURI}/api/rankings/leaderboard`, fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch leaderboard data");
            const data = await response.json();
            const topUsersTable = document.querySelector("#top-users-table");
            topUsersTable.innerHTML = "";
            data.forEach((user, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="rank">${index + 1}</td>
                    <td class="name">${user.name}</td>
                    <td class="balance">$${Number(user.balance).toFixed(2)}</td>
                `;
                topUsersTable.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    }
    // Balance Chart Functionality
    function initializeBalanceChart() {
        // Get the bank data from the hidden div
        const bankDataElement = document.getElementById('bankData');
        const profitMap = JSON.parse(bankDataElement.getAttribute('data-profit-map'));     
        // Global chart reference
        let balanceChart = null;
        const ctx = document.getElementById('balanceChart').getContext('2d');
        const categorySelect = document.getElementById('categorySelect');
        // Populate the category dropdown from profitMap keys
        function populateCategoryDropdown() {
            categorySelect.innerHTML = '<option value="">Select a category</option>'; 
            Object.keys(profitMap).forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
            // Select the first category if available
            if (Object.keys(profitMap).length > 0) {
                categorySelect.value = Object.keys(profitMap)[0];
            }
        }
        // Update the chart with data for the selected category
        function updateChart() {
            const selectedCategory = categorySelect.value;
            if (!selectedCategory || !profitMap[selectedCategory]) return; 
            const profitData = profitMap[selectedCategory];
            // Prepare chart data
            const chartData = {
                labels: profitData.map((_, index) => `Transaction ${index + 1}`),
                datasets: [{
                    label: `Balance Changes - ${selectedCategory}`,
                    data: profitData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    tension: 0.1
                }, {
                    label: `Cumulative Balance - ${selectedCategory}`,
                    data: calculateCumulative(profitData),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    tension: 0.1
                }]
            }; 
            // Create or update the chart
            if (balanceChart) {
                balanceChart.data = chartData;
                balanceChart.update();
            } else {
                balanceChart = new Chart(ctx, {
                    type: 'line',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Balance Change History',
                                color: '#ffffff'
                            },
                            legend: {
                                labels: {
                                    color: '#ffffff'
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#ffffff'
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }
                            },
                            y: {
                                beginAtZero: false,
                                ticks: {
                                    color: '#ffffff',
                                    callback: function(value) {
                                        return '$' + value.toFixed(2);
                                    }
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }
                            }
                        }
                    }
                });
            }
        }
        // Helper function to calculate cumulative values
        function calculateCumulative(data) {
            let cumulative = 0;
            return data.map(value => {
                cumulative += value;
                return cumulative;
            });
        }
        // Initialize the chart
        populateCategoryDropdown();
        updateChart();
        // Update chart when category changes
        categorySelect.addEventListener('change', updateChart);
    }
    document.addEventListener("DOMContentLoaded", () => {
        fetchUserDetails();
        fetchLeaderboard();
        initializeBalanceChart();
    });
  </script>
</body>
</html>