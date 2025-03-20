---
layout: base
permalink: /leaderboard/team-leaderboard
title: Team Selection
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Leaderboard</title>
    <link rel="stylesheet" href="{{site.baseurl}}/assets/css/portfolio.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #121212;
            color: #ffffff;
            margin: 0;
            padding: 0;
        }
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
        .dashboard {
            padding: 40px;
            text-align: center;
        }
        .leaderboard-title {
            font-size: 32px;
            font-weight: bold;
            text-transform: uppercase;
            background: linear-gradient(90deg, #ff8c00, #ff22a6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }
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
            position: relative;
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
        .tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px;
            border-radius: 6px;
            display: none;
            font-size: 14px;
            text-align: left;
        }
    </style>
</head>
<body>
<nav class="navbar">
    <div class="nav-buttons">
        <a href="{{site.baseurl}}/leaderboard/overall-leaderboard">Leaderboard</a>
        <a href="{{site.baseurl}}/leaderboard/team-selection">Team Selection</a>
        <a href="{{site.baseurl}}/leaderboard/team-viewer">Team Viewer</a>
        <a href="{{site.baseurl}}/leaderboard/team-leaderboard">Team Leaderboard</a>
    </div>
</nav>

<div class="dashboard">
    <h1 class="leaderboard-title">Top Teams by Balance</h1>
    <table class="leaderboard-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Balance</th>
            </tr>
        </thead>
        <tbody id="team-leaderboard-table">
        </tbody>
    </table>
</div>

<script type="module">
  import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  async function fetchTeamLeaderboard() {
    try {
      const response = await fetch(`${javaURI}/api/teams/leaderboard`, fetchOptions);
      if (!response.ok) throw new Error("Failed to fetch team leaderboard");
      const data = await response.json();
      const teamTable = document.querySelector("#team-leaderboard-table");
      teamTable.innerHTML = "";

      data.forEach((team, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td class="team-name" data-members='${JSON.stringify(team.members)}'>${team.name}</td>
          <td>$${Number(team.balance).toFixed(2)}</td>
          <div class="tooltip"></div>
        `;
        teamTable.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching team leaderboard:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchTeamLeaderboard();
    document.body.addEventListener("mouseover", function(event) {
      if (event.target.classList.contains("team-name")) {
        const tooltip = document.querySelector(".tooltip");
        const members = JSON.parse(event.target.getAttribute("data-members"));
        tooltip.innerHTML = members.map(m => `${m.name}: $${Number(m.balance).toFixed(2)}`).join("<br>");
        tooltip.style.display = "block";
        tooltip.style.left = event.pageX + "px";
        tooltip.style.top = event.pageY + "px";
      }
    });
    document.body.addEventListener("mouseout", function(event) {
      if (event.target.classList.contains("team-name")) {
        document.querySelector(".tooltip").style.display = "none";
      }
    });
  });
</script>
</body>
</html>
