---
layout: finance
title: Bank Analytics
permalink: /gamify/bankanalytics
---
<html lang="en">


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
    /* Your existing styles remain the same */
    .nav-link-custom {
    transition: transform 0.3s;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 6px;
    }
    .nav-link-custom:hover {
    background-color: #ff9800;
    transform: scale(1.1);
    }
    th.custom-th {
    background-color: #ff9800;
    color: #000;
    text-transform: uppercase;
    font-size: 14px;
    }
    td.custom-td {
    background-color: #2a2a2a;
    border-bottom: 1px solid #444;
    transition: background 0.3s;
    }
    tr:hover td.custom-td {
    background-color: #ff22a6;
    color: #fff;
    }
</style>
<body class="m-0 p-0" style="font-family: 'Poppins', sans-serif; background-color: #121212; color: #fff;">


<br>
<h1 class="text-center">Bank Analytics</h1>

<!-- Dashboard Content - Same as before -->
<div class="container my-4">
<div class="row g-4">
    <!-- Left Section - User Details -->
    <div class="col-md">
    <div class="p-4 rounded shadow" style="background-color: #1f1f1f;">
        <div class="mb-4 text-start">
        <h2 class="mb-3" style="color: #ff9800;">User Analytics</h2>
        <div class="p-3 rounded" style="background-color: #2a2a2a;">
            <div class="mb-3" style="font-size: 18px;">
            <span style="color: #ff9800; margin-right: 10px;">Username:</span>
            <span class="name">Loading...</span>
            </div>
            <div class="mb-3" style="font-size: 18px;">
            <span style="color: #ff9800; margin-right: 10px;">Account Balance:</span>
            <span class="balance">Loading...</span>
            </div>
            <div class="mb-3" style="font-size: 18px;">
            <span style="color: #ff9800; margin-right: 10px;">Total Transactions:</span>
            <span class="total-transactions">0</span>
            </div>
        </div>
        </div>
    </div>
    </div>
    <!-- Right Section - Leaderboard -->
    <div class="col-md-auto" style="min-width: 400px;">
    <h1 class="mb-3 text-uppercase fw-bold" style="background: linear-gradient(90deg, #ff8c00, #ff22a6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding-bottom: 10px; border-bottom: 3px solid #ff22a6; letter-spacing: 2px;">
        Top 10 Users
    </h1>
    <div class="table-responsive">
        <table class="table mb-0" style="background-color: #1f1f1f; border-collapse: collapse; border-radius: 8px; box-shadow: 0 0 15px rgba(255,136,0,0.5); overflow: hidden;">
        <thead>
            <tr>
            <th class="custom-th" style="width:15%;">Rank</th>
            <th class="custom-th" style="width:55%;">Name</th>
            <th class="custom-th" style="width:30%;">Balance</th>
            </tr>
        </thead>
        <tbody id="top-users-table">
            <!-- Leaderboard Data Populated Here -->
        </tbody>
        </table>
    </div>
    </div>
</div>
</div>

<!-- Balance Chart Section -->
<div class="container my-4">
<div class="p-4 rounded shadow" style="background-color: #1f1f1f;">
    <h2 class="mb-3" style="color: #ff9800;">Balance Change History</h2>
    <div class="p-3 mb-3 rounded" style="background-color: #2a2a2a;">
    <label for="categorySelect" class="me-2">Select Category:</label>
    <select id="categorySelect" class="form-select d-inline-block w-auto" style="background-color: #3a3a3a; border: 1px solid #ff9800; color: #fff;">
        <option value="">Select a category</option>
        <option value="poker">Poker</option>
        <option value="blackjack">Blackjack</option>
        <option value="dices">Dices</option>
        <!-- Add more categories as needed -->
    </select>
    </div>
    <div class="chart-container" style="height: 400px;">
    <canvas id="balanceChart"></canvas>
    </div>
</div>
</div>

<script type="module">
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

// Global variables
let userId = null;
let balanceChart = null;

async function fetchUserDetails() {
    try {
        // Since we're not using the person endpoint anymore, we'll need another way to get user ID
        // For now, we'll assume userId is known (7 as shown in your endpoint examples)
        userId = 7; // This should be dynamically set based on logged in user
        
        // For demo purposes, we'll set some user details
        document.querySelector('.name').textContent = "Thomas Edison";
        document.querySelector('.balance').textContent = "$40000.00";
        
        // Add event listener to dropdown
        document.getElementById('categorySelect').addEventListener('change', (e) => {
            if (e.target.value) {
                fetchProfitData(e.target.value);
            } else {
                clearChart();
            }
        });
        
        // Load initial data (poker by default)
        fetchProfitData('poker');
    } catch (error) {
        console.error("Error initializing user data:", error);
        document.querySelector('.name').textContent = "Error loading user";
    }
}

async function fetchProfitData(category) {
    if (!userId) {
        console.error("Cannot fetch profit data: User ID is missing");
        return;
    }

    try {
        // Get the profit data for the specific category
        const response = await fetch(`${javaURI}/bank/${userId}/profitmap/${category}`, {
            ...fetchOptions,
            method: 'GET'
        });
        
        if (!response.ok) throw new Error(`Failed to fetch ${category} data`);
        const transactions = await response.json();
        
        // Update total transactions count
        document.querySelector('.total-transactions').textContent = transactions.length;
        
        // Update the chart with the new data
        updateChart(category, transactions);
    } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
        clearChart();
    }
}

function updateChart(category, transactions) {
    if (!transactions || !Array.isArray(transactions)) {
        clearChart();
        return;
    }
    
    // Prepare data for chart
    const timestamps = [];
    const profits = [];
    
    transactions.forEach(transaction => {
        if (Array.isArray(transaction) && transaction.length >= 2) {
            // Handle timestamp (index 0)
            let timestamp;
            try {
                timestamp = new Date(transaction[0]).toLocaleDateString();
            } catch (e) {
                console.warn("Invalid date format:", transaction[0]);
                timestamp = new Date().toLocaleDateString();
            }
            
            // Handle profit amount (index 1)
            let profit = 0;
            if (typeof transaction[1] === 'number') {
                profit = transaction[1];
            } else if (typeof transaction[1] === 'string') {
                profit = parseFloat(transaction[1]) || 0;
            }
            
            timestamps.push(timestamp);
            profits.push(profit);
        }
    });
    
    // Calculate cumulative balance
    const cumulativeBalance = [];
    let balance = 0;
    for (const profit of profits) {
        balance += profit;
        cumulativeBalance.push(balance);
    }
    
    const chartData = {
        labels: timestamps,
        datasets: [
            {
                label: `Balance Changes - ${category}`,
                data: profits,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                tension: 0.1
            },
            {
                label: `Cumulative Balance - ${category}`,
                data: cumulativeBalance,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                tension: 0.1
            }
        ]
    };
    
    const ctx = document.getElementById('balanceChart').getContext('2d');
    
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
                        labels: { color: '#ffffff' }
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
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: '#ffffff',
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }
}

function clearChart() {
    if (balanceChart) {
        balanceChart.data.labels = [];
        balanceChart.data.datasets.forEach(dataset => {
            dataset.data = [];
        });
        balanceChart.update();
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
            <td class="custom-td fw-bold" style="color: #ffcc00;">${index + 1}</td>
            <td class="custom-td fw-bold">${user.name}</td>
            <td class="custom-td fw-bold" style="color: #00ff7f;">$${Number(user.balance).toFixed(2)}</td>
            `;
            topUsersTable.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchUserDetails();
    fetchLeaderboard();
});
</script>
</body>
</html>