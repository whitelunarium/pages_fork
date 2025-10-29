---
layout: post
title: "Submodule 4"
description: "Submodule 4 of AI Usage Mini-Quest of Generating the Itinerary"
permalink: /west-coast/ai/submodule_4/
parent: "AI Usage"
team: "Ctrl-Zombies"
submodule: 4
categories: [CSP, Submodule, AIUsage]
tags: [ai, submodule, Generation]
author: "Ctrl-Zombies"
date: 2025-10-21
microblog: true
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seattle Sports API Explorer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #002244 0%, #005A8C 50%, #69BE28 100%);
            min-height: 100vh;
            padding: 20px;
            color: #fff;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            padding: 30px 0;
            background: rgba(0, 34, 68, 0.8);
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        h1 {
            font-size: 2.5em;
            color: #69BE28;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .subtitle {
            color: #A5D8FF;
            margin-top: 10px;
            font-size: 1.2em;
        }

        .learning-section {
            background: white;
            color: #000000;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .learning-section p {
            color: #000000;
            line-height: 1.6;
            margin-bottom: 10px;
            font-weight: 500;
        }

        .learning-section h2 {
            color: #000000;
            margin-bottom: 15px;
            border-bottom: 3px solid #69BE28;
            padding-bottom: 10px;
            font-weight: 700;
        }

        .code-editor {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            margin: 15px 0;
            overflow-x: auto;
            border: 2px solid #005A8C;
            white-space: pre;
        }

        .button-group {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin: 15px 0;
        }

        button {
            background: linear-gradient(135deg, #005A8C, #002244);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        button:hover {
            background: linear-gradient(135deg, #69BE28, #005A8C);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        }

        .output {
            background: #ffffff;
            border: 3px solid #005A8C;
            border-radius: 8px;
            padding: 20px;
            margin-top: 15px;
            color: #000000;
            min-height: 100px;
            font-family: monospace;
            white-space: pre-wrap;
            font-weight: 500;
        }

        .stadium-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .stadium-card {
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid transparent;
        }

        .stadium-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        .stadium-card h3 {
            margin-bottom: 10px;
            font-size: 1.5em;
        }

        .stadium-card p {
            margin: 8px 0;
            font-size: 1.1em;
        }

        .seahawks-card {
            background: linear-gradient(135deg, #002244, #69BE28);
            color: white;
            border-color: #A5ACAF;
        }

        .mariners-card {
            background: linear-gradient(135deg, #0C2C56, #005C5C);
            color: white;
            border-color: #C4CED4;
        }

        .kraken-card {
            background: linear-gradient(135deg, #001628, #99D9D9);
            color: white;
            border-color: #355464;
        }

        .huskies-card {
            background: linear-gradient(135deg, #4B2E83, #B7A57A);
            color: white;
            border-color: #85754D;
        }

        .orcas-card {
            background: linear-gradient(135deg, #1E3A8A, #10B981);
            color: white;
            border-color: #059669;
        }

        select {
            padding: 10px;
            border-radius: 6px;
            border: 2px solid #005A8C;
            font-size: 1em;
            margin: 5px;
            background: white;
            color: #000000;
            font-weight: 500;
        }

        .highlight {
            color: #69BE28;
            font-weight: bold;
        }

        .api-demo {
            background: rgba(105, 190, 40, 0.1);
            border-left: 4px solid #69BE28;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }

        .learning-section label {
            color: #000000;
            font-weight: 600;
            font-size: 1.05em;
        }

        .request-label {
            font-weight: 700;
            color: #000000;
            margin-top: 10px;
            font-size: 1.1em;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Seattle Sports Stadium Tour</h1>
            <p class="subtitle">The Coach Calls the Play (API Request), The Team Executes (API Response)</p>
        </header>

        <div class="learning-section">
            <h2>Welcome to the Seattle Sports API</h2>
            <p><strong>Understanding APIs Through Sports:</strong> Think of an API like a coach calling plays. The coach (your code) makes a request by calling a specific play, and the team (the API) executes that play and returns the result.</p>
            <p>In our Seattle sports example, when you want information about a stadium, you're like a coach calling a play. You send a request to the API, and it responds with the data you need - just like players executing the coach's call!</p>
            <p>Click on any stadium below to see how the coach calls the play (API request) and how the team responds (API response)!</p>
        </div>

        <div class="learning-section">
            <h2>Seattle's Sports Stadiums</h2>
            <div class="stadium-grid">
                <div class="stadium-card seahawks-card" onclick="showStadiumDetails('football')">
                    <h3>Lumen Field</h3>
                    <p><strong>Team:</strong> Seattle Seahawks</p>
                    <p><strong>Sport:</strong> Football (NFL)</p>
                    <p><strong>Capacity:</strong> 68,740</p>
                </div>

                <div class="stadium-card mariners-card" onclick="showStadiumDetails('baseball')">
                    <h3>T-Mobile Park</h3>
                    <p><strong>Team:</strong> Seattle Mariners</p>
                    <p><strong>Sport:</strong> Baseball (MLB)</p>
                    <p><strong>Capacity:</strong> 47,929</p>
                </div>

                <div class="stadium-card kraken-card" onclick="showStadiumDetails('hockey')">
                    <h3>Climate Pledge Arena</h3>
                    <p><strong>Team:</strong> Seattle Kraken</p>
                    <p><strong>Sport:</strong> Ice Hockey (NHL)</p>
                    <p><strong>Capacity:</strong> 17,151</p>
                </div>

                <div class="stadium-card huskies-card" onclick="showStadiumDetails('college')">
                    <h3>Husky Stadium</h3>
                    <p><strong>Team:</strong> Washington Huskies</p>
                    <p><strong>Sport:</strong> College Football</p>
                    <p><strong>Capacity:</strong> 70,138</p>
                </div>

                <div class="stadium-card orcas-card" onclick="showStadiumDetails('cricket')">
                    <h3>Marymoor Park</h3>
                    <p><strong>Team:</strong> Seattle Orcas</p>
                    <p><strong>Sport:</strong> Cricket (MLC)</p>
                    <p><strong>Capacity:</strong> 5,000</p>
                </div>
            </div>
        </div>

        <div class="learning-section">
            <h2>How APIs Work: The Coach and The Play</h2>
            <p><strong>The Coach (You):</strong> Calls a specific play by making an API request</p>
            <p><strong>The Play (API Request):</strong> A specific instruction asking for certain data</p>
            <p><strong>The Team (API):</strong> Executes the play and processes your request</p>
            <p><strong>The Execution (API Response):</strong> The result returned back to you</p>
            <p style="margin-top: 15px;">When you clicked a stadium above, you acted as the coach calling a play. Here's what happened:</p>
            
            <div class="api-demo">
                <p class="request-label">THE COACH CALLS THE PLAY (API REQUEST):</p>
                <div class="code-editor" id="apiRequest">Click a stadium above to see the coach's call</div>
                
                <p class="request-label">THE TEAM EXECUTES (API RESPONSE):</p>
                <div class="code-editor" id="apiResponse">The execution result will appear here</div>
            </div>
        </div>

        <div class="learning-section">
            <h2>Understanding Variables in APIs</h2>
            <p>APIs store data in variables. Here's how our stadium data is structured:</p>
            <div class="code-editor">const seattleData = {
  football: { 
    team: "Seahawks", 
    stadium: "Lumen Field", 
    capacity: 68740,
    coordinates: "47.5952° N, 122.3316° W",
    ticketPrice: "$85-$250"
  },
  baseball: { 
    team: "Mariners", 
    stadium: "T-Mobile Park", 
    capacity: 47929,
    coordinates: "47.5914° N, 122.3325° W",
    ticketPrice: "$15-$180"
  }
  // ... more teams
};</div>
        </div>

        <div class="learning-section">
            <h2>Conditionals: The Coach Adapts the Play</h2>
            <p>Just like a coach calls different plays based on the situation, APIs use conditionals to return different data based on your request:</p>
            <div>
                <label>Coach, what play do you want to call?</label>
                <select id="sportFilter" onchange="filterBySport()">
                    <option value="all">Show all teams</option>
                    <option value="football">Football play</option>
                    <option value="baseball">Baseball play</option>
                    <option value="hockey">Hockey play</option>
                    <option value="college">College play</option>
                    <option value="cricket">Cricket play</option>
                </select>
            </div>
            <div class="output" id="conditionalOutput"></div>
        </div>

        <div class="learning-section">
            <h2>Functions: The Coach's Playbook</h2>
            <p>Functions are like plays in a coach's playbook - reusable strategies that work every time. The coach can call the same play for different situations:</p>
            <div class="code-editor">function getStadiumInfo(sport) {
  // The coach calls this play
  const team = seattleData[sport];
  return {
    team: team.team,
    stadium: team.stadium,
    capacity: team.capacity,
    tickets: team.ticketPrice
  };
  // The team executes and returns the result
}</div>
            <div class="button-group">
                <button onclick="demonstrateFunction('football')">Call Seahawks Play</button>
                <button onclick="demonstrateFunction('baseball')">Call Mariners Play</button>
                <button onclick="demonstrateFunction('hockey')">Call Kraken Play</button>
            </div>
            <div class="output" id="functionOutput"></div>
        </div>

        <div class="learning-section">
            <h2>API Endpoints: Different Plays in the Playbook</h2>
            <p>A coach has many different plays they can call. Similarly, APIs have multiple endpoints for different types of data. Call a play below:</p>
            <div class="button-group">
                <button onclick="getSchedules()">Call Play: Get Schedules</button>
                <button onclick="getWeather()">Call Play: Get Weather</button>
                <button onclick="getTickets()">Call Play: Get Tickets</button>
                <button onclick="getAllStadiums()">Call Play: Get All Stadiums</button>
            </div>
            <div class="output" id="apiOutput"></div>
        </div>

        <div class="learning-section">
            <h2>API Documentation</h2>
            <p>Good APIs always include documentation explaining how to use them:</p>
            <div class="code-editor">/**
 * Seattle Sports API Documentation
 * Base URL: https://api.seattlesports.com
 * 
 * Endpoints:
 * 
 * GET /stadiums
 *   Returns: Array of all stadium objects
 * 
 * GET /stadiums/:sport
 *   Parameters: sport (football, baseball, hockey, college, cricket)
 *   Returns: Single stadium object
 * 
 * GET /schedules
 *   Returns: Game schedules for all teams
 * 
 * GET /weather
 *   Returns: Current weather conditions at stadiums
 * 
 * GET /tickets
 *   Returns: Current ticket price ranges
 * 
 * Example Response Format:
 * {
 *   "team": "Seahawks",
 *   "stadium": "Lumen Field",
 *   "capacity": 68740,
 *   "coordinates": "47.5952° N, 122.3316° W",
 *   "ticketPrice": "$85-$250"
 * }
 */</div>
        </div>
    </div>

    <script>
        const seattleData = {
            football: { 
                team: "Seahawks", 
                stadium: "Lumen Field", 
                capacity: 68740,
                coordinates: "47.5952° N, 122.3316° W",
                ticketPrice: "$85-$250"
            },
            baseball: { 
                team: "Mariners", 
                stadium: "T-Mobile Park", 
                capacity: 47929,
                coordinates: "47.5914° N, 122.3325° W",
                ticketPrice: "$15-$180"
            },
            hockey: { 
                team: "Kraken", 
                stadium: "Climate Pledge Arena", 
                capacity: 17151,
                coordinates: "47.6221° N, 122.3540° W",
                ticketPrice: "$50-$300"
            },
            college: { 
                team: "Huskies", 
                stadium: "Husky Stadium", 
                capacity: 70138,
                coordinates: "47.6501° N, 122.3016° W",
                ticketPrice: "$35-$150"
            },
            cricket: { 
                team: "Orcas", 
                stadium: "Marymoor Park", 
                capacity: 5000,
                coordinates: "47.6634° N, 122.1146° W",
                ticketPrice: "$10-$40"
            }
        };

        function showStadiumDetails(sport) {
            const team = seattleData[sport];
            
            // Show the API request
            const request = 'GET /api/stadiums/' + sport + '\nHost: api.seattlesports.com\nContent-Type: application/json';
            document.getElementById('apiRequest').textContent = request;
            
            // Show the API response
            const response = JSON.stringify(team, null, 2);
            document.getElementById('apiResponse').textContent = response;
        }

        function filterBySport() {
            const selected = document.getElementById('sportFilter').value;
            const output = document.getElementById('conditionalOutput');
            
            output.textContent = "The Coach's Call: GET /api/stadiums" + (selected !== 'all' ? '/' + selected : '') + "\n\n";
            
            if (selected === 'all') {
                output.textContent += "The Play Execution: if (sport === 'all') { return allStadiums; }\n\n";
                output.textContent += "Team's Response:\n";
                for (let sport in seattleData) {
                    const team = seattleData[sport];
                    output.textContent += team.team + " - " + team.stadium + " (" + team.capacity + " seats)\n";
                }
            } else {
                const team = seattleData[selected];
                if (team) {
                    output.textContent += "The Play Execution: if (sport === '" + selected + "') { return seattleData['" + selected + "']; }\n\n";
                    output.textContent += "Team's Response:\n" + JSON.stringify(team, null, 2);
                }
            }
        }

        function demonstrateFunction(sport) {
            const output = document.getElementById('functionOutput');
            const team = seattleData[sport];
            
            output.textContent = "The Coach Calls: getStadiumInfo('" + sport + "')\n\n";
            output.textContent += "The Team Executes and returns:\n";
            output.textContent += JSON.stringify({
                team: team.team,
                stadium: team.stadium,
                capacity: team.capacity,
                tickets: team.ticketPrice
            }, null, 2);
        }

        function getSchedules() {
            const output = document.getElementById('apiOutput');
            output.textContent = "The Coach's Call: GET /api/schedules\n\nThe team is executing...\n";
            
            setTimeout(() => {
                const schedules = {
                    "Seahawks": ["vs 49ers - Oct 30", "@ Rams - Nov 6", "vs Cardinals - Nov 13"],
                    "Mariners": ["Season ended - Check back March 2026"],
                    "Kraken": ["vs Canucks - Oct 29", "@ Flames - Nov 1", "vs Oilers - Nov 3"],
                    "Huskies": ["vs Oregon - Nov 2", "@ USC - Nov 9"],
                    "Orcas": ["Season ended - Check back July 2026"]
                };
                output.textContent = "Team's Response:\n\n" + JSON.stringify(schedules, null, 2);
            }, 800);
        }

        function getWeather() {
            const output = document.getElementById('apiOutput');
            output.textContent = "The Coach's Call: GET /api/weather\n\nThe team is executing...\n";
            
            setTimeout(() => {
                const weather = {
                    "location": "Seattle, WA",
                    "temperature": "54°F",
                    "conditions": "Partly Cloudy",
                    "precipitation": "20% chance of rain",
                    "wind": "10 mph NW",
                    "gameDay": "Good conditions for outdoor sports"
                };
                output.textContent = "Team's Response:\n\n" + JSON.stringify(weather, null, 2);
            }, 800);
        }

        function getTickets() {
            const output = document.getElementById('apiOutput');
            output.textContent = "The Coach's Call: GET /api/tickets\n\nThe team is executing...\n";
            
            setTimeout(() => {
                let tickets = {};
                for (let sport in seattleData) {
                    tickets[seattleData[sport].team] = seattleData[sport].ticketPrice;
                }
                output.textContent = "Team's Response:\n\n" + JSON.stringify(tickets, null, 2);
            }, 800);
        }

        function getAllStadiums() {
            const output = document.getElementById('apiOutput');
            output.textContent = "The Coach's Call: GET /api/stadiums\n\nThe team is executing...\n";
            
            setTimeout(() => {
                output.textContent = "Team's Response:\n\n" + JSON.stringify(seattleData, null, 2);
            }, 800);
        }

        // Initialize with first stadium example
        showStadiumDetails('football');
    </script>
</body>
</html>