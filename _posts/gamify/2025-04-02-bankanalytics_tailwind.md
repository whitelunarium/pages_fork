---
layout: bank
title: Bank Analytics
permalink: /gamify/bankanalytics/tailwind
---


<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<br>
<h1 class="text-center text-4xl font-bold">Bank Analytics</h1>

<!-- Dashboard Content -->
<div class="flex gap-8 p-10 max-w-screen-xl mx-auto">
<!-- Left Section - User Details -->
<div class="flex-1 bg-[#1f1f1f] p-8 rounded-xl shadow-lg">
    <div class="text-left mb-8">
    <h2 class="text-[#ff9800] mb-5 text-2xl font-bold">User Analytics</h2>
    <div class="bg-[#2a2a2a] p-5 rounded-md mt-5">
        <div class="my-4 text-lg">
        <span class="text-[#ff9800] mr-2">Username:</span>
        <span class="name">Loading...</span>
        </div>
        <div class="my-4 text-lg">
        <span class="text-[#ff9800] mr-2">Account Balance:</span>
        <span class="balance">Loading...</span>
        </div>
        <div class="my-4 text-lg">
        <span class="text-[#ff9800] mr-2">Total Transactions:</span>
        <span>0</span>
        </div>
    </div>
    </div>
</div>

<!-- Right Section - Leaderboard -->
<div class="w-[35%] min-w-[400px]">
    <h1 class="text-4xl font-bold uppercase bg-gradient-to-r from-[#ff8c00] to-[#ff22a6] bg-clip-text text-transparent inline-block pb-2 border-b-4 border-[#ff22a6] tracking-wider mb-5">
    Top 10 Users
    </h1>
    <table class="w-full border-collapse bg-[#1f1f1f] rounded-md shadow-[0_0_15px_rgba(255,136,0,0.5)] overflow-hidden">
    <thead>
        <tr>
        <th class="px-4 py-3 text-left bg-[#ff9800] text-black text-xs uppercase w-1/6">Rank</th>
        <th class="px-4 py-3 text-left bg-[#ff9800] text-black text-xs uppercase w-2/3">Name</th>
        <th class="px-4 py-3 text-left bg-[#ff9800] text-black text-xs uppercase w-1/6">Balance</th>
        </tr>
    </thead>
    <tbody id="top-users-table">
        <!-- Leaderboard Data Populated Here -->
    </tbody>
    </table>
</div>
</div>

<!-- Balance Chart Section -->
<div class="bg-[#1f1f1f] p-8 rounded-xl my-10 max-w-screen-xl mx-auto shadow-[0_0_15px_rgba(255,136,0,0.3)]">
<h2 class="text-[#ff9800] mb-5 text-2xl font-bold">Balance Change History</h2>
<!-- Hidden div to store bank data passed from backend -->
<div id="bankData" data-profit-map='{"stocks":[150.25,-75.50,200.00],"casino":[50.00,25.00,12.50],"adventure":[1000.00,-500.00]}'></div>
<div class="my-5 p-4 bg-[#2a2a2a] rounded-md">
    <label for="categorySelect">Select Category:</label>
    <select id="categorySelect" class="p-2 mr-2 text-base bg-[#3a3a3a] text-white border border-[#ff9800] rounded-md">
    <option value="">Select a category</option>
    </select>
</div>
<div class="w-full h-96 mt-5">
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
        row.classList.add("transition", "duration-300", "hover:bg-[#ff22a6]", "hover:text-white");
        row.innerHTML = `
        <td class="px-4 py-3 font-bold text-[#ffcc00]">${index + 1}</td>
        <td class="px-4 py-3 font-bold text-white">${user.name}</td>
        <td class="px-4 py-3 font-bold text-[#00ff7f]">$${Number(user.balance).toFixed(2)}</td>
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
    if (Object.keys(profitMap).length > 0) {
        categorySelect.value = Object.keys(profitMap)[0];
    }
    }

    // Update the chart with data for the selected category
    function updateChart() {
    const selectedCategory = categorySelect.value;
    if (!selectedCategory || !profitMap[selectedCategory]) return;
    const profitData = profitMap[selectedCategory];
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

    function calculateCumulative(data) {
    let cumulative = 0;
    return data.map(value => {
        cumulative += value;
        return cumulative;
    });
    }

    populateCategoryDropdown();
    updateChart();
    categorySelect.addEventListener('change', updateChart);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchUserDetails();
    fetchLeaderboard();
    initializeBalanceChart();
});
</script>
