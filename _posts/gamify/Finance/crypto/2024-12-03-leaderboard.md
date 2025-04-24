---
layout: finance
permalink: /leaderboard/overall-leaderboard
title: Leaderboard
---

<title>Leaderboard</title>
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
  /* Leaderboard Container */
  .dashboard {
      padding: 40px;
      text-align: center;
  }
  /* Title Button Effect */
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
  /* Leaderboard Table */
  .leaderboard-table {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      border-collapse: collapse;
      background: #1f1f1f;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(255, 136, 0, 0.5);
      overflow: hidden;
  }
  th, td {
      padding: 15px 20px;
      text-align: left;
  }
  th {
      background-color: #ff9800;
      color: #000;
      font-size: 18px;
      text-transform: uppercase;
  }
  td {
      background-color: #2a2a2a;
      font-size: 16px;
      border-bottom: 1px solid #444;
      transition: background 0.3s;
  }
  tr:hover td {
      background-color: #ff22a6;
      color: #ffffff;
  }
  /* Rank, Balance & Name Effects */
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
</style>
<!-- Dashboard -->
<div class="dashboard">
  <h1 class="leaderboard-title">Top 10 Users by Balance</h1>
  <table class="leaderboard-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Balance</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody id="top-users-table">
      <!-- Leaderboard Data Populated Here -->
    </tbody>
  </table>
</div>

<script type="module">
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

async function fetchLeaderboard() {
  try {
    const response = await fetch(`${javaURI}/bank/leaderboard`, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard data: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error("Invalid data format received from API");
    }
    
    const topUsersTable = document.querySelector("#top-users-table");
    topUsersTable.innerHTML = "";
    
    result.data.forEach(entry => {
      const displayName = entry.username && entry.username !== "undefined" ? entry.username : `User ${entry.userId}`;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="rank">${entry.rank}</td>
        <td class="balance">$${Number(entry.balance).toFixed(2)}</td>
        <td class="name">${displayName}</td>
      `;
      topUsersTable.appendChild(row);
    });
    
  } catch (error) {
    console.error("Error fetching or displaying leaderboard:", error);
    document.querySelector("#top-users-table").innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; color: #ff4444;">
          Failed to load leaderboard data. Please try again later.
        </td>
      </tr>
    `;
  }
}
// Load leaderboard when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchLeaderboard);
</script>