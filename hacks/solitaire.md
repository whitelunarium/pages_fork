---
layout: opencs
title: Solitaire Game
permalink: /solitaire/
---

<style>
    body {
        font-family: Arial, sans-serif;
    }
    
    .wrap {
        margin-left: auto;
        margin-right: auto;
        max-width: 1000px;
    }

    .game-container {
        display: none;
        padding: 20px;
        background: #0f7b0f;
        border-radius: 10px;
        min-height: 600px;
    }

    .game-container:focus {
        outline: none;
    }

    /* All screens style */
    #gameover p, #menu p {
        font-size: 20px;
    }

    #gameover a, #menu a {
        font-size: 30px;
        display: block;
        margin: 10px 0;
    }

    #gameover a:hover, #menu a:hover {
        cursor: pointer;
    }

    #gameover a:hover::before, #menu a:hover::before {
        content: ">";
        margin-right: 10px;
    }

    #menu {
        display: block;
    }

    #gameover {
        display: none;
    }

    /* Game Board Styles */
    .game-board {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        margin-top: 20px;
    }

    .foundation-row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        margin-bottom: 20px;
    }

    .card-pile {
        width: 80px;
        height: 110px;
        border: 2px solid #333;
        border-radius: 8px;
        position: relative;
        background: #fff;
        cursor: pointer;
    }

    .card-pile.empty {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.3);
    }

    .card-pile.foundation {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
    }

    .card {
        width: 76px;
        height: 106px;
        border: 1px solid #000;
        border-radius: 6px;
        background: #fff;
        position: absolute;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4px;
        font-size: 12px;
        font-weight: bold;
        user-select: none;
    }

    .card.red {
        color: #d00;
    }

    .card.black {
        color: #000;
    }

    .card.face-down {
        background: #004d9f;
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,.1) 10px,
            rgba(255,255,255,.1) 20px
        );
    }

    .card.face-down * {
        display: none;
    }

    .card.dragging {
        z-index: 1000;
        transform: rotate(5deg);
    }

    .card.highlighted {
        box-shadow: 0 0 10px #ffff00;
    }

    .card-top {
        text-align: left;
    }

    .card-bottom {
        text-align: right;
        transform: rotate(180deg);
    }

    .suit {
        font-size: 16px;
    }

    .tableau-pile {
        min-height: 300px;
    }

    .stock-pile, .waste-pile {
        width: 80px;
        height: 110px;
    }

    .game-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .score-display {
        color: white;
        font-size: 18px;
        font-weight: bold;
    }

    .timer-display {
        color: white;
        font-size: 16px;
    }

    .game-buttons {
        display: flex;
        gap: 10px;
    }

    .game-buttons button {
        padding: 8px 16px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }

    .game-buttons button:hover {
        background: #45a049;
    }

    .win-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        font-size: 24px;
        z-index: 2000;
        display: none;
    }
      /* Modal Styles */
    .modal {
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.7);
    }
    
    .modal-content {
        background-color: #f8f9fa; 
        margin: 5% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 700px;
        border-radius: 10px;
        max-height: 80vh;
        overflow-y: auto;
        color: #000;
    }
    
    .close {
        color: #6c757d;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
    }
    
    .instructions-container h4 {
        margin-top: 20px;
        color: #2c3e50;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
    }
    
    .instructions-container ul {
        padding-left: 20px;
    }
    #instructions_modal, 
    #instructions_modal * {
        color: #000 !important;
    }


</style>

<h2>Solitaire</h2>
<div class="container">
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Klondike Solitaire</p>
            <p>Move all cards to the foundation piles, organized by suit from Ace to King</p>
            <a id="new_game" class="link-alert">new game</a>
            <a id="instructions" class="link-alert">how to play</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Game Over!</p>
            <p id="final_score">Final Score: 0</p>
            <p id="final_time">Time: 00:00</p>
            <a id="new_game1" class="link-alert">new game</a>
            <a id="menu_return" class="link-alert">main menu</a>
        </div>
        <!-- Game Screen -->
        <div id="game_screen" class="game-container wrap" tabindex="1">
            <div class="game-controls">
                <div class="score-display">Score: <span id="score_value">0</span></div>
                <div class="timer-display">Time: <span id="timer_value">00:00</span></div>
                <div class="game-buttons">
                    <button id="hint_btn">Hint</button>
                    <button id="undo_btn">Undo</button>
                    <button id="restart_btn">Restart</button>
                </div>
            </div>
            <div class="foundation-row">
                <div id="stock" class="card-pile stock-pile" data-pile="stock"></div>
                <div id="waste" class="card-pile waste-pile empty" data-pile="waste"></div>
                <div class="card-pile empty"></div>
                <div id="foundation_0" class="card-pile foundation" data-pile="foundation" data-index="0"></div>
                <div id="foundation_1" class="card-pile foundation" data-pile="foundation" data-index="1"></div>
                <div id="foundation_2" class="card-pile foundation" data-pile="foundation" data-index="2"></div>
                <div id="foundation_3" class="card-pile foundation" data-pile="foundation" data-index="3"></div>
            </div>
            <div class="game-board">
                <div id="tableau_0" class="card-pile tableau-pile" data-pile="tableau" data-index="0"></div>
                <div id="tableau_1" class="card-pile tableau-pile" data-pile="tableau" data-index="1"></div>
                <div id="tableau_2" class="card-pile tableau-pile" data-pile="tableau" data-index="2"></div>
                <div id="tableau_3" class="card-pile tableau-pile" data-pile="tableau" data-index="3"></div>
                <div id="tableau_4" class="card-pile tableau-pile" data-pile="tableau" data-index="4"></div>
                <div id="tableau_5" class="card-pile tableau-pile" data-pile="tableau" data-index="5"></div>
                <div id="tableau_6" class="card-pile tableau-pile" data-pile="tableau" data-index="6"></div>
            </div>
            <div id="win_message" class="win-message">
                <h3>Congratulations!</h3>
                <p>You Won!</p>
                <p id="win_score"></p>
                <p id="win_time"></p>
                <button id="play_again_btn">Play Again</button>
            </div>
        </div>
    </div>
    <div id="instructions_modal" class="modal" style="display: none;">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>How to Play Klondike Solitaire</h3>
        <div class="instructions-container">
        <h4>Objective</h4>
        <p style="background-color: #d4f7d4; padding: 5px; border-radius: 4px;">
            Move all cards to the four foundation piles, building each suit in ascending order from Ace to King.
        </p>
        <h4>Game Layout</h4>
        <ul>
            <li><strong>Tableau:</strong> Seven piles where you build descending sequences of alternating colors</li>
            <li><strong>Foundations:</strong> Four piles where you build ascending sequences by suit (Ace to King)</li>
            <li><strong>Stock:</strong> The deck of remaining cards (click to draw)</li>
            <li><strong>Waste:</strong> Where drawn cards from the stock are placed</li>
        </ul>
        <h4>Rules</h4>
        <ul>
            <li>Only Kings can be placed on empty tableau piles</li>
            <li>Build tableau piles in descending order (King to Ace) with alternating colors</li>
            <li>Build foundation piles in ascending order (Ace to King) by suit</li>
            <li>You can move face-up cards from one tableau pile to another</li>
            <li>You can move cards from the waste pile to tableau or foundation piles</li>
            <li>Click the stock pile to draw new cards</li>
            <li>When the stock is empty, you can reset it from the waste pile</li>
        </ul>
        <h4>Scoring</h4>
        <ul>
            <li>+5 points for each card moved to tableau</li>
            <li>+10 points for each card moved to foundation</li>
            <li>+5 points for turning over a face-down card in tableau</li>
        </ul>
        <h4>Controls</h4>
        <ul>
            <li><strong>Click:</strong> Select and move cards (or draw from stock)</li>
            <li><strong>Drag & Drop:</strong> Move cards between piles</li>
            <li><strong>Hint Button:</strong> Get a suggestion for a move</li>
            <li><strong>Undo Button:</strong> Reverse your last move</li>
            <li><strong>Restart Button:</strong> Start a new game</li>
        </ul>
        </div>
    </div>
    </div>
</div>

<!-- Single module entry point -->
<script type="module" src="/assets/js/solitaire/main.js"></script>
