---
layout: base
title: Solitaire Game
permalink: /solitaire/
---

<style>w
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
                <div class="score-display">
                    Score: <span id="score_value">0</span>
                </div>
                <div class="timer-display">
                    Time: <span id="timer_value">00:00</span>
                </div>
                <div class="game-buttons">
                    <button id="hint_btn">Hint</button>
                    <button id="undo_btn">Undo</button>
                    <button id="restart_btn">Restart</button>
                </div>
            </div>
            
            <div class="foundation-row">
                <div id="stock" class="card-pile stock-pile"></div>
                <div id="waste" class="card-pile waste-pile empty"></div>
                <div class="card-pile empty"></div>
                <div id="foundation_0" class="card-pile foundation"></div>
                <div id="foundation_1" class="card-pile foundation"></div>
                <div id="foundation_2" class="card-pile foundation"></div>
                <div id="foundation_3" class="card-pile foundation"></div>
            </div>
            
            <div class="game-board">
                <div id="tableau_0" class="card-pile tableau-pile"></div>
                <div id="tableau_1" class="card-pile tableau-pile"></div>
                <div id="tableau_2" class="card-pile tableau-pile"></div>
                <div id="tableau_3" class="card-pile tableau-pile"></div>
                <div id="tableau_4" class="card-pile tableau-pile"></div>
                <div id="tableau_5" class="card-pile tableau-pile"></div>
                <div id="tableau_6" class="card-pile tableau-pile"></div>
            </div>
            
            <div id="win_message" class="win-message">
                <h3>Congratulations!</h3>
                <p>You Won!</p>
                <p id="win_score"></p>
                <p id="win_time"></p>
                <button onclick="newGame()">Play Again</button>
            </div>
        </div>
    </div>
</div>

<script>
(function(){
    /* Game Variables */
    /////////////////////////////////////////////////////////////
    const SCREEN_MENU = -1, SCREEN_GAME = 0, SCREEN_GAME_OVER = 1;
    let SCREEN = SCREEN_MENU;
    
    // HTML Elements
    const screen_menu = document.getElementById("menu");
    const screen_game = document.getElementById("game_screen");
    const screen_game_over = document.getElementById("gameover");
    const ele_score = document.getElementById("score_value");
    const ele_timer = document.getElementById("timer_value");
    const button_new_game = document.getElementById("new_game");
    const button_new_game1 = document.getElementById("new_game1");
    const button_menu_return = document.getElementById("menu_return");
    const button_hint = document.getElementById("hint_btn");
    const button_undo = document.getElementById("undo_btn");
    const button_restart = document.getElementById("restart_btn");
    const win_message = document.getElementById("win_message");
    
    // Game State
    let deck = [];
    let stock = [];
    let waste = [];
    let foundations = [[], [], [], []];
    let tableau = [[], [], [], [], [], [], []];
    let score = 0;
    let moves = [];
    let startTime;
    let gameTimer;
    let draggedCard = null;
    let draggedFrom = null;
    
    // Card definitions
    const suits = ['♠', '♣', '♦', '♥'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suitColors = {'♠': 'black', '♣': 'black', '♦': 'red', '♥': 'red'};
    
    /* Display Control */
    /////////////////////////////////////////////////////////////
    let showScreen = function(screen_opt) {
        SCREEN = screen_opt;
        switch(screen_opt) {
            case SCREEN_GAME:
                screen_game.style.display = "block";
                screen_menu.style.display = "none";
                screen_game_over.style.display = "none";
                break;
            case SCREEN_GAME_OVER:
                screen_game.style.display = "block";
                screen_menu.style.display = "none";
                screen_game_over.style.display = "block";
                break;
            case SCREEN_MENU:
                screen_game.style.display = "none";
                screen_menu.style.display = "block";
                screen_game_over.style.display = "none";
                break;
        }
    };
    
    /* Card Creation and Management */
    /////////////////////////////////////////////////////////////
    function createDeck() {
        deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                deck.push({
                    suit: suit,
                    rank: rank,
                    color: suitColors[suit],
                    value: ranks.indexOf(rank) + 1,
                    faceUp: false,
                    id: `${rank}${suit}`
                });
            }
        }
        
        // Shuffle deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    
    function createCardElement(card) {
        const cardEl = document.createElement('div');
        cardEl.className = `card ${card.color}`;
        cardEl.id = `card_${card.id}`;
        
        if (!card.faceUp) {
            cardEl.classList.add('face-down');
        }
        
        cardEl.innerHTML = `
            <div class="card-top">
                <span class="rank">${card.rank}</span>
                <span class="suit">${card.suit}</span>
            </div>
            <div class="card-bottom">
                <span class="rank">${card.rank}</span>
                <span class="suit">${card.suit}</span>
            </div>
        `;
        
        // Add drag and drop events
        cardEl.draggable = true;
        cardEl.addEventListener('dragstart', handleDragStart);
        cardEl.addEventListener('dragend', handleDragEnd);
        cardEl.addEventListener('click', handleCardClick);
        
        return cardEl;
    }
    
    /* Game Logic */
    /////////////////////////////////////////////////////////////
    function dealCards() {
        // Clear all piles
        stock = [];
        waste = [];
        foundations = [[], [], [], []];
        tableau = [[], [], [], [], [], [], []];
        
        let cardIndex = 0;
        
        // Deal tableau
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row <= col; row++) {
                const card = deck[cardIndex++];
                card.faceUp = (row === col);
                tableau[col].push(card);
            }
        }
        
        // Remaining cards go to stock
        while (cardIndex < deck.length) {
            deck[cardIndex].faceUp = false;
            stock.push(deck[cardIndex++]);
        }
    }
    
    function canPlaceOnTableau(card, pile) {
        if (pile.length === 0) {
            return card.rank === 'K';
        }
        
        const topCard = pile[pile.length - 1];
        return (card.color !== topCard.color && 
                card.value === topCard.value - 1);
    }
    
    function canPlaceOnFoundation(card, foundation) {
        if (foundation.length === 0) {
            return card.rank === 'A';
        }
        
        const topCard = foundation[foundation.length - 1];
        return (card.suit === topCard.suit && 
                card.value === topCard.value + 1);
    }
    
    function moveCard(from, to, cardCount = 1) {
        const cards = from.splice(-cardCount, cardCount);
        to.push(...cards);
        
        // Turn over face-down card if tableau pile
        for (let i = 0; i < 7; i++) {
            if (from === tableau[i] && from.length > 0) {
                const topCard = from[from.length - 1];
                if (!topCard.faceUp) {
                    topCard.faceUp = true;
                    updateScore(5);
                }
            }
        }
    }
    
    function drawFromStock() {
        if (stock.length > 0) {
            const card = stock.pop();
            card.faceUp = true;
            waste.push(card);
        } else if (waste.length > 0) {
            // Reset stock from waste
            while (waste.length > 0) {
                const card = waste.pop();
                card.faceUp = false;
                stock.push(card);
            }
        }
        renderGame();
    }
    
    function updateScore(points) {
        score += points;
        ele_score.textContent = score;
    }
    
    function checkWin() {
        for (let foundation of foundations) {
            if (foundation.length !== 13) {
                return false;
            }
        }
        
        // Player won!
        clearInterval(gameTimer);
        const timeStr = ele_timer.textContent;
        document.getElementById('win_score').textContent = `Score: ${score}`;
        document.getElementById('win_time').textContent = `Time: ${timeStr}`;
        win_message.style.display = 'block';
        
        return true;
    }
    
    /* Rendering */
    /////////////////////////////////////////////////////////////
    function renderGame() {
        // Clear all card containers
        document.querySelectorAll('.card-pile').forEach(pile => {
            pile.innerHTML = '';
        });
        
        // Render stock
        const stockEl = document.getElementById('stock');
        if (stock.length > 0) {
            stockEl.appendChild(createCardElement(stock[stock.length - 1]));
            stockEl.addEventListener('click', drawFromStock);
        } else {
            stockEl.classList.add('empty');
            stockEl.addEventListener('click', drawFromStock);
        }
        
        // Render waste
        const wasteEl = document.getElementById('waste');
        if (waste.length > 0) {
            wasteEl.appendChild(createCardElement(waste[waste.length - 1]));
            wasteEl.classList.remove('empty');
        } else {
            wasteEl.classList.add('empty');
        }
        
        // Render foundations
        for (let i = 0; i < 4; i++) {
            const foundationEl = document.getElementById(`foundation_${i}`);
            if (foundations[i].length > 0) {
                foundationEl.appendChild(createCardElement(foundations[i][foundations[i].length - 1]));
            }
            
            // Add drop event listeners
            foundationEl.addEventListener('dragover', handleDragOver);
            foundationEl.addEventListener('drop', (e) => handleDrop(e, foundations[i], 'foundation'));
        }
        
        // Render tableau
        for (let i = 0; i < 7; i++) {
            const tableauEl = document.getElementById(`tableau_${i}`);
            tableau[i].forEach((card, index) => {
                const cardEl = createCardElement(card);
                cardEl.style.top = `${index * 20}px`;
                cardEl.style.zIndex = index;
                tableauEl.appendChild(cardEl);
            });
            
            // Add drop event listeners
            tableauEl.addEventListener('dragover', handleDragOver);
            tableauEl.addEventListener('drop', (e) => handleDrop(e, tableau[i], 'tableau'));
        }
    }
    
    /* Drag and Drop Handlers */
    /////////////////////////////////////////////////////////////
    function handleDragStart(e) {
        draggedCard = e.target;
        draggedFrom = findCardLocation(draggedCard.id.replace('card_', ''));
        e.dataTransfer.effectAllowed = 'move';
        e.target.classList.add('dragging');
    }
    
    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        draggedCard = null;
        draggedFrom = null;
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    function handleDrop(e, targetPile, pileType) {
        e.preventDefault();
        
        if (!draggedCard || !draggedFrom) return;
        
        const cardId = draggedCard.id.replace('card_', '');
        const card = findCard(cardId);
        
        if (!card) return;
        
        let canMove = false;
        
        if (pileType === 'foundation') {
            canMove = canPlaceOnFoundation(card, targetPile);
            if (canMove) {
                moveCard(draggedFrom.pile, targetPile, 1);
                updateScore(10);
            }
        } else if (pileType === 'tableau') {
            canMove = canPlaceOnTableau(card, targetPile);
            if (canMove) {
                // Count cards to move (card and all cards below it)
                const cardIndex = draggedFrom.pile.findIndex(c => c.id === cardId);
                const cardCount = draggedFrom.pile.length - cardIndex;
                moveCard(draggedFrom.pile, targetPile, cardCount);
                updateScore(5);
            }
        }
        
        if (canMove) {
            renderGame();
            checkWin();
        }
    }
    
    function handleCardClick(e) {
        const cardId = e.target.closest('.card').id.replace('card_', '');
        const location = findCardLocation(cardId);
        const card = findCard(cardId);
        
        if (!card || !card.faceUp) return;
        
        // Try to auto-move to foundation
        if (location.type === 'waste' || location.type === 'tableau') {
            for (let i = 0; i < 4; i++) {
                if (canPlaceOnFoundation(card, foundations[i])) {
                    moveCard(location.pile, foundations[i], 1);
                    updateScore(10);
                    renderGame();
                    checkWin();
                    return;
                }
            }
        }
    }
    
    function findCard(cardId) {
        // Search all piles for the card
        let allCards = [...stock, ...waste];
        for (let foundation of foundations) {
            allCards = allCards.concat(foundation);
        }
        for (let pile of tableau) {
            allCards = allCards.concat(pile);
        }
        
        return allCards.find(card => card.id === cardId);
    }
    
    function findCardLocation(cardId) {
        // Check waste
        if (waste.some(card => card.id === cardId)) {
            return { pile: waste, type: 'waste' };
        }
        
        // Check foundations
        for (let i = 0; i < 4; i++) {
            if (foundations[i].some(card => card.id === cardId)) {
                return { pile: foundations[i], type: 'foundation' };
            }
        }
        
        // Check tableau
        for (let i = 0; i < 7; i++) {
            if (tableau[i].some(card => card.id === cardId)) {
                return { pile: tableau[i], type: 'tableau' };
            }
        }
        
        return null;
    }
    
    /* Timer */
    /////////////////////////////////////////////////////////////
    function startTimer() {
        startTime = Date.now();
        gameTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            ele_timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    /* New Game */
    /////////////////////////////////////////////////////////////
    let newGame = function() {
        showScreen(SCREEN_GAME);
        screen_game.focus();
        
        // Reset game state
        score = 0;
        moves = [];
        ele_score.textContent = score;
        win_message.style.display = 'none';
        
        // Clear any existing timer
        if (gameTimer) {
            clearInterval(gameTimer);
        }
        
        // Create and deal new deck
        createDeck();
        dealCards();
        renderGame();
        startTimer();
    };
    
    /* Event Handlers */
    /////////////////////////////////////////////////////////////
    window.onload = function() {
        button_new_game.onclick = newGame;
        button_new_game1.onclick = newGame;
        button_menu_return.onclick = () => showScreen(SCREEN_MENU);
        button_restart.onclick = newGame;
        
        button_hint.onclick = function() {
            // Simple hint: highlight first available move
            // This is a basic implementation
            alert("Hint: Look for Aces to move to foundations, or try to uncover face-down cards!");
        };
        
        button_undo.onclick = function() {
            // Undo functionality would require storing move history
            alert("Undo feature coming soon!");
        };
        
        // Keyboard shortcuts
        window.addEventListener("keydown", function(evt) {
            if (evt.code === "Space" && SCREEN !== SCREEN_GAME) {
                newGame();
            }
        }, true);
    };
})();
</script>