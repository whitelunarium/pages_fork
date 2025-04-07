---
layout: base
title: Crypto Mining Simulator
type: issueshen i
permalink: /crypto/mining
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Mining Simulator</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://unpkg.com/intro.js/minified/introjs.min.css" rel="stylesheet">
    <script src="https://unpkg.com/intro.js/minified/intro.min.js"></script>
</head>

<link rel="stylesheet" href="crypto.scss">

<body>
    <div id="notification" class="notification"></div>
    <div class="main-content">
        <!-- Page title -->
        <h1 class="page-title">Crypto Mining Simulator</h1>
        <!-- Warning messages -->
        <div class="text-center mb-4 text-yellow-400">
            *** note: If the stats number are not showing, try to stop the mining and start again... <br>
            *** note: If it says "Error loading mining state. Please try again.", please check if you are logged in or no...
        </div>
        <!-- Tutorial Help Button -->
        <div class="tutorial-help-button" title="Interactive Tutorial">
            <button onclick="startTutorial()" class="bg-gray-800 hover:bg-gray-700 text-green-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-green-500/30">
                <span class="text-lg font-bold">?</span>
            </button>
        </div>
        <!-- Navigation Bar -->
        <nav class="navbar">
            <div class="nav-buttons">
                <a href="{{site.baseurl}}/stocks/home">Home</a>
                <a href="{{site.baseurl}}/crypto/portfolio">Crypto</a>
                <a href="{{site.baseurl}}/stocks/viewer">Stocks</a>
                <a href="{{site.baseurl}}/crypto/mining">Mining</a>
                <a href="{{site.baseurl}}/stocks/buysell">Buy/Sell</a>
                <a href="{{site.baseurl}}/stocks/game">Game</a>
                <a href="{{site.baseurl}}/crypto/energy">Energy Plan</a>
                <a href="{{site.baseurl}}/crypto/energy-store">Energy Store</a>
                <a href="{{site.baseurl}}/stocks/portfolio">Portfolio</a>
                <div class="balance-display">Balance: $<span id="user-balance">Loading...</span></div>
            </div>
        </nav>
        <div class="container mx-auto">
            <!-- Core Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Wallet -->
                <div class="dashboard-card">
                    <h2>Wallet</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">Crypto Balance</div>
                            <div class="stat-value" id="btc-balance">0.00000000</div>
                        </div>
                        <div>
                            <div class="stat-label">Pending Crypto Balance</div>
                            <div class="stat-value text-yellow-400" id="pending-balance">0.00000000</div>
                            <span class="text-sm text-blue-400 cursor-pointer hover:underline mt-1 inline-block" onclick="openCryptoDetailsModal()">View all crypto balances &rarr;</span>
                        </div>
                        <div>
                            <div class="stat-label">USD Value</div>
                            <div class="stat-value" id="usd-value">$0.00</div>
                        </div>
                        <div>
                            <div class="stat-label" id="pool-info">Min. Payout: 0.001 BTC</div>
                        </div>
                    </div>
                </div>
                <!-- Mining Stats -->
                <div class="dashboard-card">
                    <h2>Mining Stats</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">Hashrate</div>
                            <div class="stat-value" id="hashrate">0 MH/s</div>
                        </div>
                        <div>
                            <div class="stat-label">Shares</div>
                            <div class="stat-value" id="shares">0</div>
                        </div>
                    </div>
                </div>
                <!-- Hardware -->
                <div class="dashboard-card">
                    <h2>Hardware</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">Current GPU</div>
                            <div class="stat-value text-blue-400 cursor-pointer hover:text-blue-300 transition-colors" 
                                 onclick="openActiveGPUsModal()" 
                                 id="current-gpu">
                                No GPU
                            </div>
                        </div>
                        <div>
                            <div class="stat-label">GPU Temperature</div>
                            <div class="stat-value" id="gpu-temp">0°C</div>
                        </div>
                        <div>
                            <div class="stat-label">Power Draw</div>
                            <div class="stat-value" id="power-draw">0W</div>
                        </div>
                    </div>
                </div>
                <!-- Profitability -->
                <div class="dashboard-card">
                    <h2>Profitability</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">24h Revenue</div>
                            <div class="stat-value" id="daily-revenue">$0.00</div>
                        </div>
                        <div>
                            <div class="stat-label">Power Cost</div>
                            <div class="stat-value text-red-400" id="power-cost">$0.00</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Mining Controls -->
            <div class="flex justify-center mt-8 mb-8">
                <div class="flex justify-between items-center">
                    <button id="start-mining" onclick="toggleMining()">
                        <span>Start Mining</span>
                    </button>
                </div>
            </div>
            <!-- Performance Charts -->
            <div class="flex flex-col gap-4 mt-4">
                <div class="text-sm text-gray-400 text-center">
                    Drag to pan horizontally • Use mouse wheel to zoom • Double click to reset
                </div>
                <div class="chart-container">
                    <canvas id="hashrate-chart"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="profit-chart"></canvas>
                </div>
            </div>
            <!-- GPU Inventory -->
            <div class="dashboard-card mt-4 bg-gray-900 p-6 rounded-lg">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">My GPU Inventory</h2>
                    <button id="gpu-shop" 
                            class="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg 
                                   font-medium transition-colors duration-200 flex items-center gap-2">
                        <span>🛒</span>
                        GPU Shop
                    </button>
                </div>
                <div id="gpu-inventory" class="min-h-[400px]">
                </div>
            </div>
        </div>
    </div>
    <!-- Tutorial Welcome Modal -->
    <div id="tutorial-welcome" class="tutorial-welcome hidden">
        <h2>Welcome to Crypto Mining Simulator!</h2>
        <p>Would you like to take a quick tour of the mining interface?</p>
        <div class="tutorial-buttons">
            <button class="tutorial-button tutorial-button-primary" onclick="startTutorial()">Start Tour</button>
            <button class="tutorial-button tutorial-button-tertiary" onclick="skipTutorial()">Skip</button>
            <button class="tutorial-button tutorial-button-tertiary" onclick="neverShowTutorial()">Never Show</button>
        </div>
    </div>
    <!-- GPU Shop Modal -->
    <div id="gpu-shop-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-gray-800 rounded-lg p-6 w-11/12 max-w-4xl max-h-[80vh] overflow-hidden">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">GPU Shop</h2>
                <button id="close-shop" class="text-gray-400 hover:text-white text-3xl">&times;</button>
            </div>
            <div class="overflow-y-auto pr-2" style="max-height: calc(80vh - 100px);">
                <div id="gpu-list" class="grid gap-4">
                    <!-- GPUs will be inserted here -->
                </div>
            </div>
            <!-- Total Cost Footer -->
            <div id="total-cost-footer" class="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-4 flex justify-between items-center"
                 style="border-top: 3px solid transparent;
                        background: rgba(17, 24, 39, 0.95);
                        animation: rgb-border-breathe 3s ease-in-out infinite;">
                <div class="text-2xl font-bold text-white">Total Cost:</div>
                <div class="flex items-center gap-4">
                    <div class="text-3xl font-bold text-white">
                        USD: <span id="shop-total-cost">0</span>
                    </div>
                    <button onclick="buySelectedGPUs()" 
                            class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                        Buy Selected GPUs
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Add this right before the closing </body> tag -->
    <div id="active-gpus-modal" class="active-gpus-modal hidden">
        <div class="active-gpus-content">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-blue-400">Active GPUs</h2>
                <button onclick="closeActiveGPUsModal()" 
                        class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div id="active-gpus-list">
                <!-- GPUs will be listed here -->
            </div>
        </div>
    </div>
    <div id="sellModal">
        <div id="sellModalContent"></div>
    </div>
    <!-- Replace the entire crypto-details-modal div with this updated version -->
    <div id="crypto-details-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
        <div class="bg-gray-900 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 class="text-2xl font-bold text-white">Your Cryptocurrency Balances</h2>
                <button onclick="closeCryptoDetailsModal()" class="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            <!-- Main content - scrollable -->
            <div class="overflow-y-auto flex-grow p-4" style="overflow-y: auto !important;">
                <div id="crypto-balances-container">
                    <!-- Crypto balances will be loaded here dynamically -->
                    <div class="animate-pulse">
                        <div class="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div class="h-24 bg-gray-800 rounded mb-4"></div>
                        <div class="h-24 bg-gray-800 rounded mb-4"></div>
                        <div class="h-24 bg-gray-800 rounded mb-4"></div>
                    </div>
                </div>
                <!-- Cryptocurrency selection -->
                <div class="mt-8 border-t border-gray-700 pt-4">
                    <h3 class="text-xl font-bold text-white mb-4">Change Mining Cryptocurrency</h3>
                    <div id="crypto-selection-container" class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <!-- Cryptocurrency options will be loaded here dynamically -->
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module">
        import { login, pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
        let userEmail = "";
        let userBalance = localStorage.getItem("userBalance");
        // Define showNotification globally at the top of your script
        window.showNotification = function(message, isError = false) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${isError ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded shadow-lg`;
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        };
        async function fetchUser() {
            console.log("Attempting to fetch user...");
            try {
                const response = await fetch(javaURI + `/api/person/get`, fetchOptions);
                console.log("User fetch response status:", response.status);
                if (response.ok) {
                    const userInfo = await response.json();
                    userEmail = userInfo.email;
                    console.log("Successfully fetched user email:", userEmail);
                    localStorage.setItem("userEmail", userEmail);
                    fetchUserBalance(); // Fetch balance after getting the email
                } else if (response.status === 401 || response.status === 201) {
                    console.log("Guest user detected");
                    document.getElementById('user-balance').innerText = "0.00";
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        function updateBalance(balance) {
            const formattedBalance = parseFloat(balance).toFixed(2);
            document.getElementById('user-balance').innerText = formattedBalance;
            localStorage.setItem("userBalance", formattedBalance);
        }
        async function fetchUserBalance() {
            console.log("Attempting to fetch balance for email:", userEmail);
            if (!userEmail) {
                console.error("User email not found, skipping balance fetch.");
                return;
            }
            try {
                // Use the mining-status endpoint which returns the correct balance from Person table
                const balanceUrl = `${javaURI}/api/mining/mining-status`;
                console.log("Fetching balance from:", balanceUrl);
                const response = await fetch(balanceUrl, fetchOptions);
                console.log("Balance fetch response status:", response.status);
                if (!response.ok) throw new Error(`Failed to fetch balance: ${response.status}`);
                const balanceData = await response.json();
                console.log("Received balance data:", balanceData);
                updateBalance(balanceData.userBalance);
            } catch (error) {
                console.error("Error fetching balance:", error);
                document.getElementById('user-balance').innerText = "Error";
            }
        }
        // Update balance every 5 seconds
        setInterval(fetchUserBalance, 5000);
        // Initial fetch
        fetchUser();
        // Make functions globally available
        window.openActiveGPUsModal = function() {
            const modal = document.getElementById('active-gpus-modal');
            modal.classList.remove('hidden');
            updateActiveGPUsList();
        }
        window.closeActiveGPUsModal = function() {
            const modal = document.getElementById('active-gpus-modal');
            modal.classList.add('hidden');
        }
        function updateActiveGPUsList() {
            const container = document.getElementById('active-gpus-list');
            container.innerHTML = '';
            if (!window.stats || !window.stats.gpus) return;
            // Group GPUs by ID
            const gpuGroups = {};
            window.stats.gpus.forEach(gpu => {
                if (gpu.isActive) {
                    if (!gpuGroups[gpu.id]) {
                        gpuGroups[gpu.id] = {
                            ...gpu,
                            quantity: gpu.quantity
                        };
                    }
                }
            });
            Object.values(gpuGroups).forEach(gpu => {
                const card = document.createElement('div');
                card.className = 'gpu-card';
                card.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-xl font-bold text-blue-400">${gpu.name}</h3>
                                <span class="text-green-400 text-lg font-bold">x${gpu.quantity}</span>
                            </div>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <p class="text-gray-400 mb-2">Performance (Per GPU)</p>
                                    <div class="space-y-2">
                                        <p class="text-white">⚡ ${gpu.hashrate.toFixed(2)} MH/s</p>
                                        <p class="text-white">🔌 ${gpu.power}W</p>
                                        <p class="text-white">🌡️ ${gpu.temp}°C</p>
                                        <p class="text-white">📊 ${(gpu.hashrate/gpu.power).toFixed(3)} MH/W</p>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-gray-400 mb-2">Total Output</p>
                                    <div class="space-y-2">
                                        <p class="text-white">⚡ ${(gpu.hashrate * gpu.quantity).toFixed(2)} MH/s</p>
                                        <p class="text-white">🔌 ${gpu.power * gpu.quantity}W</p>
                                        <p class="text-emerald-400">✅ All Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
        // Make toggleMining globally available
        window.toggleMining = async function() {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'POST',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/toggle`, options);
                const result = await response.json();
                console.log('Mining toggle result:', result);
                // Update UI
                updateMiningButton(result.isMining);
                if (result.isMining) {
                    startPeriodicUpdates();
                    showNotification('Mining started successfully');
                } else {
                    stopPeriodicUpdates();
                    showNotification('Mining stopped');
                }
                await updateMiningStats();
            } catch (error) {
                console.error('Error toggling mining:', error);
                showNotification('Error toggling mining state');
            }
        };
        let hashrateChart, profitChart;
        let updateInterval;
        // Initialize charts and setup
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                initializeCharts();
                setupEventListeners();
                await initializeMiningState();
                await loadGPUs();
            } catch (error) {
                console.error('Error during initialization:', error);
            }
        });
        function setupEventListeners() {
            // Remove this line since we're using onclick in HTML
            // document.getElementById('start-mining').addEventListener('click', toggleMining);
            document.getElementById('gpu-shop').addEventListener('click', openGpuShop);
        }
        function initializeCharts() {
            // Hashrate Chart
            const hashrateCtx = document.getElementById('hashrate-chart').getContext('2d');
            hashrateChart = new Chart(hashrateCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Hashrate (MH/s)',
                        data: [],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderWidth: 3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        zoom: {
                            zoom: {
                                wheel: { enabled: true },
                                pinch: { enabled: true },
                                mode: 'x'
                            },
                            pan: { enabled: true }
                        }
                    }
                }
            });
            // Profit Chart
            const profitCtx = document.getElementById('profit-chart').getContext('2d');
            profitChart = new Chart(profitCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Profit (USD)',
                        data: [],
                        borderColor: '#BE0102',
                        backgroundColor: 'rgba(190, 1, 2, 0.2)',
                        borderWidth: 3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        zoom: {
                            zoom: {
                                wheel: { enabled: true },
                                pinch: { enabled: true },
                                mode: 'x'
                            },
                            pan: { enabled: true }
                        }
                    }
                }
            });
        }
        async function initializeMiningState() {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'GET',
                    cache: 'no-cache'
                };
                // Fetch initial mining state
                const response = await fetch(`${javaURI}/api/mining/state`, options);
                if (!response.ok) {
                    throw new Error('Failed to fetch mining state');
                }
                const state = await response.json();
                console.log('Initial mining state:', state);
                // Update UI with initial state
                updateDisplay(state);
                updateMiningButton(state.isMining);
                // Start periodic updates if mining is active
                if (state.isMining) {
                    startPeriodicUpdates();
                }
            } catch (error) {
                console.error('Error initializing mining state:', error);
                showNotification('Error loading mining state. Please try again.');
            }
        }
        async function startPeriodicUpdates() {
            if (updateInterval) clearInterval(updateInterval);
            updateInterval = setInterval(async () => {
                await updateMiningStats();
            }, 5000);
            const options = {
                ...fetchOptions,
                method: 'GET',
                cache: 'no-cache'
            };
            // Real time monitor
            setInterval(async () => {
                try {
                    const response = await fetch(`${javaURI}/api/mining/stats`, options);
                    const stats = await response.json();
                    console.log('Real time monitor:', {
                        time: new Date().toLocaleTimeString(),
                        pending: stats.pendingBalance,
                        hashrate: stats.hashrate,
                        activeGPUs: stats.activeGPUs?.length || 0
                    });
                } catch (error) {
                    console.error('Real time monitor **FAILED**:', error);
                }
            }, 5000);
        }
        // API Calls
        async function loadGPUs() {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'GET',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/shop`, options);
                const gpus = await response.json();
                console.log('GPUs:', gpus); // Log the GPUs to check the structure
                renderGpuShop(gpus);
            } catch (error) {
                console.error('Error loading GPUs:', error);
            }
        }
        window.toggleGPU = async function(gpuId) {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'POST',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/gpu/toggle/${gpuId}`, options);
                const result = await response.json();
                if (result.success) {
                    showNotification(result.message);
                    // 局部更新GPU卡片
                    const gpuCard = document.querySelector(`[data-gpu-id="${gpuId}"]`);
                    if (gpuCard) {
                        const button = gpuCard.querySelector('button');
                        button.innerHTML = `
                            <span class="text-lg">${result.isActive ? '⏸️' : '▶️'}</span>
                            ${result.isActive ? 'Deactivate' : 'Activate'}
                        `;
                        button.className = `w-full ${result.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} 
                            px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2`;
                    }
                    await updateMiningStats();
                } else {
                    showNotification(result.message || 'Failed to toggle GPU');
                }
            } catch (error) {
                console.error('Error toggling GPU:', error);
                showNotification('Error toggling GPU: ' + error.message);
            }
        }
        window.buyGpu = async function(gpuId, quantity) {
            try {
                const options = {
                    ...fetchOptions,
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({ quantity: quantity })
                };
                const response = await fetch(`${javaURI}/api/mining/gpu/buy/${gpuId}`, options);
                const result = await response.json();
                if (response.ok) {
                    showNotification(result.message);
                    await updateMiningStats();
                    await loadGPUs();
                } else {
                    showNotification(result.message || 'Failed to buy GPU');
                }
            } catch (error) {
                console.error('Error buying GPU:', error);
                showNotification('Error buying GPU: ' + error.message);
            }
        }
        async function updateMiningStats() {
            // Get current cryptocurrency from localStorage or default to BTC
            let currentSymbol = localStorage.getItem('currentMiningCrypto') || 'BTC';
            // Update the pool info with the current cryptocurrency
            document.getElementById('pool-info').textContent = `Mining: ${currentSymbol}`;
            try {
                const options = {
                    ...fetchOptions,
                    method: 'GET',
                    cache: 'no-cache'
                };
                const response = await fetch(`${javaURI}/api/mining/stats`, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const stats = await response.json();
                console.log('Full info:', {
                    pendingBalance: stats.pendingBalance,
                    shares: stats.shares,
                    hashrate: stats.hashrate,
                    activeGPUs: stats.activeGPUs
                });
                if (!stats.gpus) {
                    console.warn('API response missing gpus field', stats);
                    stats.gpus = []; // Set default
                }
                updateDisplay(stats);
                renderGpuInventory(stats);
                updateCharts(stats);
            } catch (error) {
                console.error('Error updating mining stats:', error);
                showNotification('Failed to fetch mining data, check your connection');
            }
        }
        // UI Updates
        function updateDisplay(stats) {
            // Log incoming data
            console.log('Updating display with stats:', stats);
            // Parse BTC values
            const btcBalance = parseFloat(stats.btcBalance) || 0;
            const pendingBalance = parseFloat(stats.pendingBalance) || 0;
            const totalBTC = btcBalance + pendingBalance;
            // Update BTC displays
            document.getElementById('btc-balance').textContent = btcBalance.toFixed(8);
            document.getElementById('pending-balance').textContent = pendingBalance.toFixed(8);
            // Calculate and update USD value
            let usdValue;
            if (stats.totalBalanceUSD) {
                // Use API-provided USD value if available
                usdValue = stats.totalBalanceUSD;
            } else {
                // Calculate USD value using BTC_PRICE constant
                usdValue = (totalBTC * 45000).toFixed(2);
            }
            document.getElementById('usd-value').textContent = `$${usdValue}`;
            // Log the values being displayed
            console.log('Display values:', {
                btcBalance: btcBalance.toFixed(8),
                pendingBalance: pendingBalance.toFixed(8),
                totalBTC: totalBTC.toFixed(8),
                usdValue: usdValue
            });
            // Add small random fluctuations to temperature and power
            const tempVariation = Math.random() * 2 - 1; // Random variation ±1°C
            const powerVariation = Math.random() * 10 - 5; // Random variation ±5W
            // Get base values
            const baseTemp = parseFloat(stats.averageTemperature) || 0;
            const basePower = parseFloat(stats.powerConsumption) || 0;
            // Calculate new values with fluctuations
            const newTemp = Math.max(30, Math.min(90, baseTemp + tempVariation)); // Keep between 30-90°C
            const newPower = Math.max(0, basePower + powerVariation); // Keep above 0W
            // Update display elements
            document.getElementById('hashrate').textContent = `${(parseFloat(stats.hashrate) || 0).toFixed(2)} MH/s`;
            document.getElementById('shares').textContent = stats.shares || 0;
            document.getElementById('gpu-temp').textContent = `${newTemp.toFixed(1)}°C`;
            document.getElementById('power-draw').textContent = `${newPower.toFixed(0)}W`;
            document.getElementById('daily-revenue').textContent = `$${(typeof stats.dailyRevenue === 'number' ? stats.dailyRevenue : 0).toFixed(2)}`;
            document.getElementById('power-cost').textContent = `$${(typeof stats.powerCost === 'number' ? stats.powerCost : 0).toFixed(2)}`;
            // Update GPU count display
            if (stats.gpus && stats.gpus.length > 0) {
                const totalGPUs = stats.gpus.reduce((sum, gpu) => sum + gpu.quantity, 0);
                const activeGPUs = stats.gpus.reduce((sum, gpu) => gpu.isActive ? sum + gpu.quantity : sum, 0);
                document.getElementById('current-gpu').textContent = 
                    `${activeGPUs} Active of ${totalGPUs} GPUs (Click to view)`;
            } else {
                document.getElementById('current-gpu').textContent = 'No GPUs';
            }
            // Add color indicators for temperature
            const tempElement = document.getElementById('gpu-temp');
            if (newTemp >= 80) {
                tempElement.className = 'stat-value text-red-500'; // Hot
            } else if (newTemp >= 70) {
                tempElement.className = 'stat-value text-yellow-500'; // Warm
            } else {
                tempElement.className = 'stat-value text-green-500'; // Good
            }
            // Store stats globally for modal access
            window.stats = stats;
        }
        function renderGpuInventory(stats) {
            const inventoryElement = document.getElementById('gpu-inventory');
            if (!inventoryElement) return;
            inventoryElement.innerHTML = '';
            const gpus = stats?.gpus || [];
            if (!gpus.length) {
                inventoryElement.innerHTML = '<p class="text-gray-400 text-center">No GPUs in inventory</p>';
                return;
            }
            // Create gpuGroups object to group GPUs by ID
            const gpuGroups = {};
            gpus.forEach(gpu => {
                const gpuId = gpu.id;
                if (!gpuGroups[gpuId]) {
                    gpuGroups[gpuId] = {
                        ...gpu,
                        quantity: gpu.quantity || 0,
                        activeCount: gpu.isActive ? (gpu.quantity || 0) : 0
                    };
                }
            });
            const container = document.createElement('div');
            container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4';
            Object.values(gpuGroups).forEach(gpu => {
                const gpuCard = document.createElement('div');
                gpuCard.className = 'bg-gray-800 rounded-xl p-6 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-700';
                gpuCard.dataset.gpuId = gpu.id;
                // Fix property names to match the backend data
                const hashrate = parseFloat(gpu.hashRate) || 0;  // Changed from hashrate to hashRate
                const power = parseFloat(gpu.powerConsumption) || 0;  // Changed from power to powerConsumption
                const temp = parseFloat(gpu.temp) || 0;
                const price = parseFloat(gpu.price) || 0;
                const dailyRevenue = hashrate * 86400 * 0.00000001;
                const dailyPowerCost = (power * 24 / 1000 * 0.12);
                const dailyProfit = dailyRevenue - dailyPowerCost;
                const sellPrice = (price * 0.8).toFixed(2);
                gpuCard.innerHTML = `
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <h3 class="text-xl font-bold text-white">${gpu.name}</h3>
                                <span class="text-green-400 text-lg font-bold">x${gpu.quantity}</span>
                            </div>
                            <p class="text-blue-400 text-sm mb-4">${gpu.activeCount} of ${gpu.quantity} Active</p>
                            <div class="grid grid-cols-2 gap-4 mt-2">
                                <div class="text-sm">
                                    <p class="text-gray-400">Performance (Per GPU)</p>
                                    <p class="text-white">⚡ ${hashrate.toFixed(2)} MH/s</p>
                                    <p class="text-white">🔌 ${power.toFixed(0)}W</p>
                                    <p class="text-white">🌡️ ${temp.toFixed(1)}°C</p>
                                </div>
                                <div class="text-sm">
                                    <p class="text-gray-400">Daily Estimates (Per GPU)</p>
                                    <p class="text-green-400">💰 $${dailyRevenue.toFixed(2)}</p>
                                    <p class="text-red-400">💡 -$${dailyPowerCost.toFixed(2)}</p>
                                    <p class="text-blue-400">📈 $${dailyProfit.toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="mt-4 text-sm">
                                <p class="text-purple-400">Total Daily Profit: $${(dailyProfit * gpu.quantity).toFixed(2)}</p>
                                <p class="text-yellow-400">Sell Price: $${sellPrice} each</p>
                            </div>
                            <div class="mt-4 flex justify-end">
                                <button onclick="showSellModal(${gpu.id}, '${gpu.name}', ${gpu.quantity}, ${sellPrice})"
                                        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                                    Sell GPU
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(gpuCard);
            });
            inventoryElement.appendChild(container);
        }
        function updateCharts(stats) {
            if (!stats) {
                console.warn('updateCharts called without stats');
                return;
            }
            console.log('Updating charts with:', {
                hashrate: stats.hashrate,
                dailyRevenue: stats.dailyRevenue,
                powerCost: stats.powerCost
            });
            const now = new Date().toLocaleTimeString();
            // Update hashrate chart
            if (hashrateChart) {
                const numericHashrate = parseFloat(stats.hashrate) || 0;
                console.log('Adding hashrate data point:', numericHashrate);
                hashrateChart.data.labels.push(now);
                hashrateChart.data.datasets[0].data.push(numericHashrate);
                if (hashrateChart.data.labels.length > 50) {
                    hashrateChart.data.labels.shift();
                    hashrateChart.data.datasets[0].data.shift();
                }
                hashrateChart.update('none');
                console.log('Hashrate chart updated');
            }
            // Update profit chart with total profit (Power Cost + USD Value)
            if (profitChart) {
                const dailyRevenue = typeof stats.dailyRevenue === 'number' ? stats.dailyRevenue : 0;
                const powerCost = typeof stats.powerCost === 'number' ? stats.powerCost : 0;
                const totalBalanceUSD = parseFloat(stats.totalBalanceUSD) || 0;
                const totalProfit = totalBalanceUSD + powerCost; // Add power cost to total balance
                console.log('Calculated total profit:', { dailyRevenue, powerCost, totalBalanceUSD, totalProfit });
                profitChart.data.labels.push(now);
                profitChart.data.datasets[0].data.push(totalProfit);
                if (profitChart.data.labels.length > 50) {
                    profitChart.data.labels.shift();
                    profitChart.data.datasets[0].data.shift();
                }
                profitChart.update('none');
                console.log('Profit chart updated');
            }
        }
        function updateMiningButton(isActive) {
            const button = document.getElementById('start-mining');
            if (isActive) {
                button.textContent = 'Stop Mining';
                button.className = 'mining-button active';
            } else {
                button.textContent = 'Start Mining';
                button.className = 'mining-button';
            }
        }
        function renderGpuShop(gpus) {
            const gpuListElement = document.getElementById('gpu-list');
            gpuListElement.innerHTML = '';
            // Group GPUs by category
            const categories = {
                'Free Starter GPU': gpus.filter(gpu => gpu.price === 0),
                'Budget GPUs ($10000-20000)': gpus.filter(gpu => gpu.price > 0 && gpu.price <= 20000),
                'Mid-Range GPUs ($20000-50000)': gpus.filter(gpu => gpu.price > 20000 && gpu.price <= 50000),
                'High-End GPUs ($50000-100000)': gpus.filter(gpu => gpu.price > 50000 && gpu.price <= 100000),
                'Premium GPUs ($100000+)': gpus.filter(gpu => gpu.price > 100000)
            };
            Object.entries(categories).forEach(([category, categoryGpus]) => {
                if (categoryGpus.length === 0) return;
                const categoryHeader = document.createElement('div');
                categoryHeader.className = `text-xl font-bold mb-4 mt-6 ${getCategoryColor(category)}`;
                categoryHeader.textContent = category;
                gpuListElement.appendChild(categoryHeader);
                categoryGpus.forEach(gpu => {
                    const gpuCard = createGpuCard(gpu, category);
                    gpuListElement.appendChild(gpuCard);
                });
            });
        }
        function createGpuCard(gpu, category) {
            const card = document.createElement('div');
            card.className = `gpu-card mb-4 ${getCategoryClass(category)}`;
            // Calculate daily estimates
            const dailyRevenue = (gpu.hashRate || 0) * 86400 * 0.00000001;
            const dailyPowerCost = (gpu.powerConsumption || 0) * 24 / 1000 * 0.12;
            const dailyProfit = dailyRevenue - dailyPowerCost;
            const roi = dailyProfit > 0 ? (gpu.price / dailyProfit) : Infinity;
            // Add quantity selector for non-starter GPUs
            const isStarterGPU = gpu.price === 0;
            const quantitySelector = isStarterGPU ? '' : `
                <div class="flex flex-col items-end gap-2">
                    <div class="flex items-center">
                        <label class="text-gray-400 mr-2">Quantity:</label>
                        <select id="quantity-${gpu.id}" class="bg-gray-700 rounded px-2 py-1" 
                                data-price="${gpu.price}"
                                data-gpu-id="${gpu.id}"
                                onchange="updateTotalPrice(${gpu.id}, ${gpu.price}); updateShopTotalCost()">
                            ${[0,1,2,3,4,5].map(n => `<option value="${n}">${n}</option>`).join('')}
                        </select>
                    </div>
                    <div class="text-gray-400">
                        Total: $<span id="total-${gpu.id}">0</span>
                    </div>
                </div>
            `;
            // Show owned quantity if owned
            const ownedQuantity = gpu.quantity > 0 ? 
                `<p class="text-green-400 text-sm">Owned: ${gpu.quantity}</p>` : '';
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="text-lg font-bold ${getCategoryColor(category)}">${gpu.name}</h3>
                        ${ownedQuantity}
                        <div class="grid grid-cols-2 gap-4 mt-2">
                            <div class="text-sm">
                                <p class="text-gray-400">Performance</p>
                                <p class="text-white">⚡ ${(gpu.hashRate || 0).toFixed(2)} MH/s</p>
                                <p class="text-white">🔌 ${(gpu.powerConsumption || 0).toFixed(0)}W</p>
                                <p class="text-white">🌡️ ${(gpu.temp || 0).toFixed(1)}°C</p>
                            </div>
                            <div class="text-sm">
                                <p class="text-gray-400">Daily Estimates</p>
                                <p class="text-green-400">💰 $${dailyRevenue.toFixed(2)}</p>
                                <p class="text-red-400">💡 -$${dailyPowerCost.toFixed(2)}</p>
                                <p class="text-blue-400">📈 $${dailyProfit.toFixed(2)}</p>
                            </div>
                        </div>
                        <div class="mt-2 text-sm">
                            <p class="text-gray-400">Efficiency: ${((gpu.hashRate || 0) / (gpu.powerConsumption || 1)).toFixed(3)} MH/W</p>
                            <p class="text-gray-400">ROI: ${roi.toFixed(1)} days</p>
                        </div>
                    </div>
                    <div class="text-right ml-4 flex flex-col items-end">
                        <p class="text-xl font-bold ${getCategoryColor(category)} mb-2">
                            ${gpu.price === 0 ? 'FREE' : '$' + gpu.price.toLocaleString()}
                        </p>
                        ${quantitySelector}
                    </div>
                </div>
            `;
            // After creating the card, attach the event listener
            setTimeout(() => {
                const quantitySelect = document.getElementById(`quantity-${gpu.id}`);
                if (quantitySelect) {
                    quantitySelect.addEventListener('change', function() {
                        const gpuId = this.dataset.gpuId;
                        const basePrice = parseFloat(this.dataset.price);
                        updateTotalPrice(gpuId, basePrice);
                        updateShopTotalCost();
                    });
                }
            }, 0);
            return card;
        }
        // Utility functions
        function getCategoryColor(category) {
            const colors = {
                'Free Starter GPU': 'text-green-400',
                'Budget GPUs ($10000-20000)': 'text-blue-400',
                'Mid-Range GPUs ($20000-50000)': 'text-purple-400',
                'High-End GPUs ($50000-100000)': 'text-orange-400',
                'Premium GPUs ($100000+)': 'text-red-400'
            };
            return colors[category] || 'text-white';
        }
        function getCategoryClass(category) {
            const classes = {
                'Free Starter GPU': 'starter',
                'Budget GPUs ($10000-20000)': 'budget',
                'Mid-Range GPUs ($20000-50000)': 'mid-range',
                'High-End GPUs ($50000-100000)': 'high-end',
                'Premium GPUs ($100000+)': 'premium'
            };
            return classes[category] || '';
        }
        function openGpuShop() {
            const modal = document.getElementById('gpu-shop-modal');
            modal.classList.remove('hidden');
        }
        // Add close shop functionality
        document.getElementById('close-shop').addEventListener('click', () => {
            const modal = document.getElementById('gpu-shop-modal');
            modal.classList.add('hidden');
        });
        // Close modal when clicking outside
        document.getElementById('gpu-shop-modal').addEventListener('click', (e) => {
            if (e.target.id === 'gpu-shop-modal') {
                e.target.classList.add('hidden');
            }
        });
        function stopPeriodicUpdates() {
            if (updateInterval) {
                clearInterval(updateInterval);
                updateInterval = null;
            }
        }
        // Update the total price function to properly format numbers
        function updateTotalPrice(gpuId, basePrice) {
            const quantitySelect = document.getElementById(`quantity-${gpuId}`);
            const totalSpan = document.getElementById(`total-${gpuId}`);
            if (quantitySelect && totalSpan) {
                const quantity = parseInt(quantitySelect.value);
                const total = quantity > 0 ? basePrice * quantity : 0;
                totalSpan.textContent = total.toLocaleString();
            }
        }
        function updateShopTotalCost() {
            let total = 0;
            document.querySelectorAll('[id^="quantity-"]').forEach(select => {
                const quantity = parseInt(select.value);
                if (quantity > 0) {  // Only include if quantity is greater than 0
                    const basePrice = parseFloat(select.dataset.price);
                    if (!isNaN(basePrice)) {
                        total += basePrice * quantity;
                    }
                }
            });
            document.getElementById('shop-total-cost').textContent = total.toLocaleString();
        }
        // Make the functions globally available
        window.updateTotalPrice = updateTotalPrice;
        window.updateShopTotalCost = updateShopTotalCost;
        window.buySelectedGPUs = async function() {
            const purchases = [];
            document.querySelectorAll('[id^="quantity-"]').forEach(select => {
                const quantity = parseInt(select.value);
                const gpuId = select.dataset.gpuId;
                if (quantity > 0) {
                    purchases.push({ gpuId, quantity });
                }
            });
            if (purchases.length === 0) {
                showNotification('Please select at least one GPU to buy');
                return;
            }
            // Process each purchase
            for (const purchase of purchases) {
                await buyGpu(purchase.gpuId, purchase.quantity);
            }
        };
        // Add sell functionality
        function showSellModal(gpuId, gpuName, maxQuantity, sellPrice) {
            const modal = document.getElementById('sellModal');
            const modalContent = document.getElementById('sellModalContent');
            modalContent.innerHTML = `
                <div class="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 class="text-2xl font-bold text-white mb-4">Sell ${gpuName}</h2>
                    <p class="text-gray-300 mb-4">Sell price: $${sellPrice.toFixed(2)} each</p>
                    <div class="mb-4">
                        <label class="text-gray-300 block mb-2">Quantity:</label>
                        <input type="number" id="sellQuantity" 
                               min="1" max="${maxQuantity}" value="1" 
                               class="bg-gray-700 text-white px-3 py-2 rounded w-full"
                               onchange="updateSellTotal(${sellPrice})">
                    </div>
                    <p class="text-lg text-green-400 mb-4">
                        Total value: $<span id="totalSellValue">${sellPrice.toFixed(2)}</span>
                    </p>
                    <div class="flex justify-end gap-4">
                        <button onclick="closeSellModal()"
                                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button onclick="confirmSell(${gpuId})"
                                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                            Confirm Sale
                        </button>
                    </div>
                </div>
            `;
            modal.style.display = 'flex';
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            updateSellTotal(sellPrice);
        }
        window.updateSellTotal = function(sellPrice) {
            const quantity = parseInt(document.getElementById('sellQuantity').value) || 0;
            const total = (sellPrice * quantity).toFixed(2);
            document.getElementById('totalSellValue').textContent = total;
        };
        window.closeSellModal = function() {
            document.getElementById('sellModal').style.display = 'none';
        };
        // Update the confirmSell function with proper headers
        window.confirmSell = async function(gpuId) {
            const quantity = parseInt(document.getElementById('sellQuantity').value);
            try {
                const response = await fetch(`${javaURI}/api/mining/gpu/sell/${gpuId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...fetchOptions.headers
                    },
                    credentials: 'include',
                    body: JSON.stringify({ quantity: quantity })
                });
                const result = await response.json();
                if (result.success) {
                    window.showNotification(result.message);
                    closeSellModal();
                    await updateMiningStats();
                    // Update user balance
                    await fetchUserBalance();
                } else {
                    window.showNotification(result.message || 'Failed to sell GPU', true);
                }
            } catch (error) {
                console.error('Error selling GPU:', error);
                window.showNotification('Error selling GPU: ' + error.message, true);
            }
        };
        // Make functions globally available
        window.showSellModal = showSellModal;
        window.updateSellTotal = updateSellTotal;
        window.closeSellModal = closeSellModal;
        window.confirmSell = confirmSell;
    </script>
    <script>
    // Add tutorial initialization code
    document.addEventListener('DOMContentLoaded', async function() {
        // Check login status first
        try {
            const response = await fetch(`${javaURI}/api/auth/status`, {
                ...fetchOptions,
                method: 'GET'
            });
            const data = await response.json();
            if (!data.isLoggedIn) {
                showNotification('Please log in to access the tutorial');
                return;
            }
            // Check if user has seen the tutorial
            const lastLogin = localStorage.getItem('lastLogin');
            const now = new Date().getTime();
            const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
            // Show tutorial if:
            // 1. Tutorial has never been seen, or
            // 2. Last login was more than a week ago, or
            // 3. User hasn't chosen to never show it
            if (!localStorage.getItem('tutorialSeen') || 
                (lastLogin && (now - parseInt(lastLogin)) > oneWeek)) {
                if (!localStorage.getItem('neverShowTutorial')) {
                    document.getElementById('tutorial-welcome').classList.remove('hidden');
                }
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            showNotification('Error checking login status');
        }
    });
    function startTutorial() {
        document.getElementById('tutorial-welcome').classList.add('hidden');
        introJs().setOptions({
            steps: [
                {
                    title: 'Wallet Overview',
                    intro: 'Your wallet shows your BTC balance, pending rewards, and USD value. The minimum payout is 0.001 BTC.',
                    element: document.querySelector('.dashboard-card:nth-child(1)'),
                    position: 'bottom'
                },
                {
                    title: 'Mining Statistics',
                    intro: 'Track your mining performance with hashrate and shares. Higher hashrate means more mining power!',
                    element: document.querySelector('.dashboard-card:nth-child(2)'),
                    position: 'bottom'
                },
                {
                    title: 'Hardware Status',
                    intro: 'Monitor your GPU temperature and power consumption. Keep your hardware cool for optimal performance!',
                    element: document.querySelector('.dashboard-card:nth-child(3)'),
                    position: 'bottom'
                },
                {
                    title: 'Profitability',
                    intro: 'See your daily revenue and power costs. This helps you calculate your mining profitability.',
                    element: document.querySelector('.dashboard-card:nth-child(4)'),
                    position: 'bottom'
                },
                {
                    title: 'Mining Control',
                    intro: 'Click here to start/stop mining. Watch your hashrate and earnings grow!',
                    element: document.getElementById('start-mining'),
                    position: 'bottom'
                },
                {
                    title: 'GPU Management',
                    intro: 'Visit the GPU Shop to upgrade your mining power. Better GPUs = Higher hashrate!',
                    element: document.getElementById('gpu-shop'),
                    position: 'left'
                },
                {
                    title: 'Performance Monitoring',
                    intro: 'Monitor your mining performance and earnings with real-time charts.',
                    element: document.querySelector('.chart-container'),
                    position: 'top'
                }
            ],
            showProgress: true,
            showBullets: true,
            exitOnOverlayClick: false,
            exitOnEsc: false,
            nextLabel: 'Next →',
            prevLabel: '← Back',
            skipLabel: 'Skip',
            doneLabel: 'Got it!',
            tooltipClass: 'customTooltip'
        }).start();
    }
    function skipTutorial() {
        document.getElementById('tutorial-welcome').classList.add('hidden');
        localStorage.setItem('tutorialSeen', 'true');
        localStorage.setItem('lastLogin', new Date().getTime().toString());
    }
    function neverShowTutorial() {
        document.getElementById('tutorial-welcome').classList.add('hidden');
        localStorage.setItem('tutorialSeen', 'true');
        localStorage.setItem('neverShowTutorial', 'true');
        localStorage.setItem('lastLogin', new Date().getTime().toString());
    }
    </script>
    <script>
    // Function to open the cryptocurrency details modal
    function openCryptoDetailsModal() {
        const modal = document.getElementById('crypto-details-modal');
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open'); // Add class to body
        loadCryptoBalances();
        loadAvailableCryptocurrencies();
    }
    // Function to close the cryptocurrency details modal
    function closeCryptoDetailsModal() {
        const modal = document.getElementById('crypto-details-modal');
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open'); // Remove class from body
    }
    // Function to load cryptocurrency balances
    function loadCryptoBalances() {
        console.log('Fetching crypto balances from: http://localhost:8085/api/mining/balances');
        // Get currently selected cryptocurrency from localStorage or default to BTC
        const currentMining = localStorage.getItem('currentMiningCrypto') || 'BTC';
        // Sample data to display when backend is unavailable
        const sampleData = {
            balances: [
                {
                    name: "Bitcoin",
                    symbol: "BTC",
                    logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
                    price: 45000.0,
                    confirmedBalance: "0.00025000",
                    pendingBalance: "0.00010000",
                    confirmedUSD: "11.25",
                    pendingUSD: "4.50",
                    totalUSD: "15.75",
                    algorithm: "SHA-256",
                    difficulty: "Very High",
                    minPayout: 0.001,
                    blockReward: 6.25
                },
                {
                    name: "Ethereum",
                    symbol: "ETH",
                    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
                    price: 3000.0,
                    confirmedBalance: "0.00300000",
                    pendingBalance: "0.00050000",
                    confirmedUSD: "9.00",
                    pendingUSD: "1.50",
                    totalUSD: "10.50",
                    algorithm: "Ethash",
                    difficulty: "High",
                    minPayout: 0.01,
                    blockReward: 2.0
                },
                {
                    name: "Litecoin",
                    symbol: "LTC",
                    logoUrl: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
                    price: 80.0,
                    confirmedBalance: "0.15000000",
                    pendingBalance: "0.05000000",
                    confirmedUSD: "12.00",
                    pendingUSD: "4.00",
                    totalUSD: "16.00",
                    algorithm: "Scrypt",
                    difficulty: "Medium",
                    minPayout: 0.02,
                    blockReward: 12.5
                },
                {
                    name: "Monero",
                    symbol: "XMR",
                    logoUrl: "https://cryptologos.cc/logos/monero-xmr-logo.png",
                    price: 170.0,
                    confirmedBalance: "0.01000000",
                    pendingBalance: "0.00500000",
                    confirmedUSD: "1.70",
                    pendingUSD: "0.85",
                    totalUSD: "2.55",
                    algorithm: "RandomX",
                    difficulty: "Medium",
                    minPayout: 0.01,
                    blockReward: 0.6
                }
            ],
            totalUSD: "44.80",
            currentMining: currentMining // Use the saved cryptocurrency
        };
        // Try to fetch from the API first
        fetch('http://localhost:8085/api/mining/balances')
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received balances data:', data);
                displayCryptoBalances(data);
            })
            .catch(error => {
                console.error('Error loading crypto balances:', error);
                // Display sample data instead
                console.log('Using sample data instead');
                displayCryptoBalances(sampleData);
            });
    }
    // Function to display cryptocurrency balances
    function displayCryptoBalances(data) {
        const container = document.getElementById('crypto-balances-container');
        if (!data.balances || data.balances.length === 0) {
            container.innerHTML = '<p class="text-gray-400">No cryptocurrency balances found.</p>';
            return;
        }
        let html = '';
        // Current mining
        const currentMining = data.currentMining || 'BTC';
        html += `<p class="text-sm text-blue-400 mb-4">Currently mining: <span class="font-bold">${currentMining}</span></p>`;
        // Total value
        html += `<p class="text-xl mb-6">Total value: <span class="font-bold text-green-400">$${data.totalUSD}</span></p>`;
        // Individual balances
        data.balances.forEach(balance => {
            html += `
            <div class="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img src="${balance.logoUrl}" alt="${balance.symbol}" class="w-10 h-10 mr-3" onerror="this.src='https://via.placeholder.com/40'">
                        <div>
                            <h3 class="text-lg font-semibold">${balance.name} (${balance.symbol})</h3>
                            <p class="text-gray-400">$${typeof balance.price === 'number' ? balance.price.toLocaleString() : balance.price}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold">${balance.confirmedBalance} ${balance.symbol}</p>
                        <p class="text-yellow-400">${balance.pendingBalance} ${balance.symbol} pending</p>
                        <p class="text-green-400">$${balance.totalUSD}</p>
                    </div>
                </div>
                <!-- Pool Info Section -->
                <div class="mt-3 pt-3 border-t border-gray-700 grid grid-cols-4 gap-2 text-sm">
                    <div>
                        <p class="text-gray-400">Algorithm</p>
                        <p>${balance.algorithm}</p>
                    </div>
                    <div>
                        <p class="text-gray-400">Difficulty</p>
                        <p>${balance.difficulty}</p>
                    </div>
                    <div>
                        <p class="text-gray-400">Min Payout</p>
                        <p>${balance.minPayout} ${balance.symbol}</p>
                    </div>
                    <div>
                        <p class="text-gray-400">Block Reward</p>
                        <p>${balance.blockReward} ${balance.symbol}</p>
                    </div>
                </div>
            </div>
            `;
        });
        container.innerHTML = html;
    }
    // Function to load available cryptocurrencies
    function loadAvailableCryptocurrencies() {
        console.log('Fetching cryptocurrencies from: http://localhost:8085/api/mining/cryptocurrencies');
        // Sample cryptocurrency data to display when backend is unavailable
        const sampleCryptos = [
            {
                id: 1,
                name: "Bitcoin",
                symbol: "BTC",
                price: 45000.0,
                logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
                algorithm: "SHA-256",
                blockReward: 6.25,
                difficulty: "Very High",
                minPayout: 0.001
            },
            {
                id: 2,
                name: "Ethereum",
                symbol: "ETH",
                price: 3000.0,
                logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
                algorithm: "Ethash",
                blockReward: 2.0,
                difficulty: "High",
                minPayout: 0.01
            },
            {
                id: 3,
                name: "Litecoin",
                symbol: "LTC",
                price: 80.0,
                logoUrl: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
                algorithm: "Scrypt",
                blockReward: 12.5,
                difficulty: "Medium",
                minPayout: 0.02
            },
            {
                id: 4,
                name: "Monero",
                symbol: "XMR",
                price: 170.0,
                logoUrl: "https://cryptologos.cc/logos/monero-xmr-logo.png",
                algorithm: "RandomX",
                blockReward: 0.6,
                difficulty: "Medium",
                minPayout: 0.01
            }
        ];
        // Try to fetch from the API first
        fetch('http://localhost:8085/api/mining/cryptocurrencies')
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(cryptos => {
                console.log('Received cryptocurrencies data:', cryptos);
                displayCryptocurrencies(cryptos);
            })
            .catch(error => {
                console.error('Error loading cryptocurrencies:', error);
                // Display sample data instead
                console.log('Using sample cryptocurrency data instead');
                displayCryptocurrencies(sampleCryptos);
            });
    }
    // Function to display cryptocurrencies
    function displayCryptocurrencies(cryptos) {
        const container = document.getElementById('crypto-selection-container');
        if (!cryptos || cryptos.length === 0) {
            container.innerHTML = '<p class="text-gray-400">No cryptocurrencies available.</p>';
            return;
        }
        let html = '';
        cryptos.forEach(crypto => {
            html += `
            <div class="bg-gray-800 rounded-lg p-3 border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
                 onclick="selectCryptocurrency('${crypto.symbol}')">
                <div class="flex items-center">
                    <img src="${crypto.logoUrl}" alt="${crypto.symbol}" class="w-8 h-8 mr-2" onerror="this.src='https://via.placeholder.com/32'">
                    <div>
                        <h4 class="font-semibold">${crypto.symbol}</h4>
                        <p class="text-xs text-gray-400">${crypto.name}</p>
                    </div>
                </div>
            </div>
            `;
        });
        container.innerHTML = html;
    }
    // Function to select a cryptocurrency for mining
    function selectCryptocurrency(symbol) {
        console.log(`Selecting cryptocurrency: ${symbol}`);
        // Save the selected cryptocurrency to localStorage
        localStorage.setItem('currentMiningCrypto', symbol);
        // Try to call the API first
        fetch(`http://localhost:8085/api/mining/crypto/select/${symbol}`, {
            method: 'POST'
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received selection response:', data);
            if (data.success) {
                showNotification(`Now mining ${symbol}`, 'success');
                loadCryptoBalances(); // Refresh the balances display
                updateMiningStats(); // Refresh mining stats
            } else {
                showNotification(`Failed to select ${symbol}`, 'error');
            }
        })
        .catch(error => {
            console.error('Error selecting cryptocurrency:', error);
            // Simulate success even if the API call failed
            showNotification(`Now mining ${symbol} (simulated)`, 'success');
            // Manually update the UI with the new cryptocurrency
            document.getElementById('crypto-balances-container').querySelectorAll('.text-blue-400').forEach(el => {
                if (el.textContent.includes('Currently mining:')) {
                    el.innerHTML = `Currently mining: <span class="font-bold">${symbol}</span>`;
                }
            });
            // Update mining stats
            updateMiningStats();
        });
    }
    </script>
</body>
