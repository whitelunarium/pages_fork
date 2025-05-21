---
layout: fortunefinders
title: Bank Analytics
permalink: /gamify/bankanalytics
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
  body {
    background-color: #121212;
    color: #fff;
    font-family: 'Poppins', sans-serif;
  }
  .chart-container, .combined-chart-container {
    position: relative;
    margin-bottom: 20px;
    background-color: #1f1f1f;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .combined-chart-container { height: 500px; }
  .chart-container { height: 400px; }
  h3, .game-title { color: #ff9800; }
</style>

<div class="container my-5">
  <h1 class="text-center mb-5">Bank Analytics Dashboard</h1>
  <div class="combined-chart-container">
    <h3>Combined Game Profits</h3>
    <canvas id="combinedChart"></canvas>
  </div>
  <div class="row">
    <div class="col-md-6 chart-container">
      <h4>Poker</h4>
      <canvas id="pokerChart"></canvas>
    </div>
    <div class="col-md-6 chart-container">
      <h4>Blackjack</h4>
      <canvas id="blackjackChart"></canvas>
    </div>
    <div class="col-md-6 chart-container">
      <h4>Dice</h4>
      <canvas id="diceChart"></canvas>
    </div>
    <div class="col-md-6 chart-container">
      <h4>Mines</h4>
      <canvas id="minesChart"></canvas>
    </div>
  </div>
</div>

<script>
  const chartIds = ["poker", "blackjack", "dice", "mines"];
  const colors = ["#FF6384", "#4BC0C0", "#FFCE56", "#9966FF"];

  document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData();
    const labels = [...new Set(Object.values(data).flatMap(game => game.map(x => x.date)))].sort();

    chartIds.forEach((game, idx) => {
      const ctx = document.getElementById(`${game}Chart`).getContext('2d');
      const gameData = labels.map(label => {
        const item = data[game]?.find(x => x.date === label);
        return item ? item.amount : 0;
      });
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: game,
            data: gameData,
            borderColor: colors[idx],
            fill: false
          }]
        },
        options: { responsive: true }
      });
    });

    const combinedCtx = document.getElementById("combinedChart").getContext('2d');
    new Chart(combinedCtx, {
      type: 'line',
      data: {
        labels,
        datasets: chartIds.map((game, idx) => {
          const gameData = labels.map(label => {
            const item = data[game]?.find(x => x.date === label);
            return item ? item.amount : 0;
          });
          return {
            label: game,
            data: gameData,
            borderColor: colors[idx],
            fill: false
          };
        })
      },
      options: { responsive: true }
    });
  });

  async function fetchData() {
    try {
      const userId = new URLSearchParams(window.location.search).get("userId");
      if (!userId) throw new Error("Missing userId in URL");

      const response = await fetch(`/bank/analytics/${userId}`);
      const result = await response.json();
      if (!result.success) throw new Error("Failed to load user analytics");

      const profitMap = result.data.profitMap || {};
      const converted = {};

      Object.entries(profitMap).forEach(([key, entries]) => {
        const simplified = entries.map(([timestamp, amount]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          amount: Number(amount)
        }));

        if (key.includes("poker")) converted.poker = simplified;
        else if (key.includes("blackjack")) converted.blackjack = simplified;
        else if (key.includes("dice")) converted.dice = simplified;
        else if (key.includes("mines")) converted.mines = simplified;
      });

      return converted;
    } catch (e) {
      console.warn("Fallback: dummy data");
      return {
        poker: [ { date: "2025-01-01", amount: 100 }, { date: "2025-01-02", amount: -50 } ],
        blackjack: [ { date: "2025-01-01", amount: 40 }, { date: "2025-01-02", amount: 20 } ],
        dice: [ { date: "2025-01-01", amount: 20 }, { date: "2025-01-02", amount: -10 } ],
        mines: [ { date: "2025-01-01", amount: -20 }, { date: "2025-01-02", amount: 40 } ]
      };
    }
  }
</script>
