import GameControl from './GameEngine/GameControl.js';
import Quiz from './Quiz.js';
import Inventory from "./Inventory.js";
import { defaultItems } from "./items.js";

class StatsManager {
    constructor(game) {
        this.game = game;
        this.initStatsUI();
    }

    async fetchStats(personId) {
        const endpoints = {
            balance: this.game.javaURI + '/rpg_answer/getBalance/' + personId,
            questionAccuracy: this.game.javaURI + '/rpg_answer/getQuestionAccuracy/' + personId
        };
    
        for (let [key, url] of Object.entries(endpoints)) {
            try {
                const response = await fetch(url, this.game.fetchOptions);
                const data = await response.json();
                
                if (key === "questionAccuracy") {
                    const accuracyPercent = Math.round((data ?? 0) * 100);
                    document.getElementById(key).innerHTML = `${accuracyPercent}%`;
                    localStorage.setItem(key, `${accuracyPercent}%`);
                } else {
                    document.getElementById(key).innerHTML = data ?? 0;
                    localStorage.setItem(key, data ?? 0);
                }
            } catch (err) {
                console.error(`Error fetching ${key}:`, err);
            }
        }
    }

    async createStats(stats, gname, uid) {
        try {
            const response = await fetch(`${this.game.javaURI}/createStats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gname, stats })
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error creating stats:", error);
            return "Error creating stats";
        }
    }

    async getStats(uid) {
        try {
            const response = await fetch(`${this.game.javaURI}/getStats/${uid}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error fetching stats:", error);
            return "Error fetching stats";
        }
    }

    async updateStats(stats, gname, uid) {
        try {
            const response = await fetch(`${this.game.javaURI}/updateStats`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gname, stats })
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error updating stats:", error);
            return "Error updating stats";
        }
    }

    async updateStatsMCQ(questionId, choiceId, personId) {
        try {
            const response = await fetch(this.game.javaURI + '/rpg_answer/submitMCQAnswer', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionId, personId, choiceId })
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return response;
        } catch (error) {
            console.error("Error submitting MCQ answer:", error);
            throw error;
        }
    }

    async transitionToWallstreet(personId) {
        try {
            const response = await fetch(`${this.game.javaURI}/question/transitionToWallstreet/${personId}`, this.game.fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch questions");
            const questionsAnswered = await response.json();

            return questionsAnswered >= 12;

            return questionsAnswered >=6;

        } catch (error) {
            console.error("Error transitioning to Wallstreet:", error);
            return null;
        }
    }


    initStatsUI() {
        const TOTAL_NPCS = 10;
        // Create wrapper for button and panel
        const statsWrapper = document.createElement('div');
        statsWrapper.id = 'stats-wrapper';
        Object.assign(statsWrapper.style, {
            position: 'fixed',
            top: '80px',
            right: '0',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
        });

        // Add pixel font if not present
        if (!document.getElementById('pixel-font-link')) {
            const fontLink = document.createElement('link');
            fontLink.id = 'pixel-font-link';
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
            document.head.appendChild(fontLink);
        }

        // Add pixel-art icon spritesheet if not present
        if (!document.getElementById('pixel-icon-style')) {
            const style = document.createElement('style');
            style.id = 'pixel-icon-style';
            style.innerHTML = `
                #stats-wrapper {
                    display: flex;
                    align-items: flex-start;
                }
                #stats-button {
                    width: 60px;
                    height: 70px;
                    background: url('https://www.transparenttextures.com/patterns/pw-maze-white.png'), linear-gradient(135deg, #ffe066 0%, #ffd700 100%);
                    border: 8px solid #ffb300;
                    outline: 6px solid #ff9100;
                    outline-offset: -8px;
                    box-shadow: 0 0 24px 8px #ffec80;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    image-rendering: pixelated;
                    z-index: 10001;
                    transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
                }
                #stats-button.pinned {
                    box-shadow: 0 0 32px 8px #ffd700, 0 0 0 4px #ffb300;
                    border-color: #ffd700;
                    background: linear-gradient(135deg, #fffbe6 0%, #ffe066 100%);
                }
                #stats-button img {
                    width: 38px;
                    height: 38px;
                    image-rendering: pixelated;
                }
                #stats-container {
                    position: absolute;
                    top: 80px;
                    left: auto;
                    right: 60px;
                    width: 0;
                    height: auto;
                    overflow: hidden;
                    background: url('https://www.transparenttextures.com/patterns/pw-maze-white.png'), linear-gradient(135deg, #ffe066 0%, #ffd700 100%);
                    color: #3a2c00;
                    border: 8px solid #ffb300;
                    outline: 6px solid #ff9100;
                    outline-offset: -8px;
                    box-shadow: 0 0 24px 8px #ffec80;
                    font-family: 'Press Start 2P', 'VT323', 'Courier New', Courier, monospace;
                    font-size: 15px;
                    letter-spacing: 1px;
                    text-shadow: 2px 2px 0 #fffbe6, 0 0 2px #ffb300;
                    image-rendering: pixelated;
                    min-width: 0;
                    user-select: none;
                    box-sizing: border-box;
                    padding: 0;
                    opacity: 0;
                    pointer-events: none;
                    transition: width 0.4s cubic-bezier(0.4,1.6,0.4,1), opacity 0.3s, padding 0.25s, top 0.3s cubic-bezier(0.4,1.6,0.4,1);
                    z-index: 10000;
                }
                #stats-wrapper:hover #stats-container, #stats-container:focus-within {
                    width: 320px;
                    opacity: 1;
                    pointer-events: auto;
                    padding: 18px 28px;
                    overflow: visible;
                }
                #stats-wrapper.pinned #stats-container {
                    width: 320px !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                    padding: 18px 28px !important;
                    overflow: visible !important;
                    position: fixed !important;
                    right: 0 !important;
                    left: unset !important;
                    top: 120px !important;
                    z-index: 10002 !important;
                }
                #stats-wrapper.pinned #stats-button {
                    display: none !important;
                }
                #stats-pin-btn {
                    display: block;
                    color: #888;
                    background: none;
                    border: none;
                    font-size: 22px;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                    z-index: 10002;
                    user-select: none;
                    outline: none;
                    transition: transform 0.1s, color 0.2s;
                }
                #stats-pin-btn.pinned {
                    color: #ffb300;
                    transform: rotate(-30deg);
                }
                #stats-container .pixel-title {
                    margin-bottom: 14px;
                    text-align: center;
                    font-size: 20px;
                    color: #ff9100;
                    text-shadow: 2px 2px 0 #fffbe6, 0 0 2px #ffb300;
                    letter-spacing: 2px;
                }
                .pixel-stat-box {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    background: #fffbe6;
                    border: 3px solid #ffb300;
                    border-radius: 0;
                    padding: 8px 12px;
                    box-shadow: 2px 2px 0 #ffec80;
                    transition: background 0.2s, box-shadow 0.2s, opacity 0.2s;
                    font-size: 15px;
                }
                .pixel-stat-box:last-child { margin-bottom: 0; }
                .pixel-stat-box:hover {
                    background: #ffe066;
                    box-shadow: 0 0 8px 2px #ffd700;
                }
                .pixel-icon {
                    width: 22px;
                    height: 22px;
                    margin-right: 12px;
                    image-rendering: pixelated;
                    display: inline-block;
                }
            `;
            document.head.appendChild(style);
        }

        // Get NPCs talked to count from cookies
        let npcsTalkedTo = 0;
        const cookies = document.cookie.split(';');
        const npcsCookie = cookies.find(cookie => cookie.trim().startsWith('npcsTalkedTo='));
        if (npcsCookie) {
            npcsTalkedTo = parseInt(npcsCookie.split('=')[1]) || 0;
        }

        // Pixel-art icons (free, open source)
        const coinIcon = 'https://emojicdn.elk.sh/🪙';
        const accuracyIcon = 'https://emojicdn.elk.sh/🎯';
        const npcIcon = 'https://emojicdn.elk.sh/🧑‍🎤';
        const statsIcon = 'https://emojicdn.elk.sh/🎮';

        // Create the button
        const statsButton = document.createElement('div');
        statsButton.id = 'stats-button';
        statsButton.innerHTML = `<img src="${statsIcon}" alt="Stats" title="Show Player Stats" />`;

        // Create the panel
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.tabIndex = 0;
        // Add a pin button (always visible when expanded)
        const pinButton = document.createElement('button');
        pinButton.id = 'stats-pin-btn';
        pinButton.innerText = '📌';
        pinButton.title = 'Pin/unpin';
        pinButton.style.position = 'absolute';
        pinButton.style.top = '10px';
        pinButton.style.right = '10px';
        pinButton.style.background = 'none';
        pinButton.style.border = 'none';
        pinButton.style.fontSize = '22px';
        pinButton.style.cursor = 'pointer';
        pinButton.style.zIndex = '10002';
        pinButton.style.userSelect = 'none';
        pinButton.style.outline = 'none';
        pinButton.style.transition = 'transform 0.1s, color 0.2s';
        pinButton.addEventListener('mouseenter', () => pinButton.style.transform = 'scale(1.2)');
        pinButton.addEventListener('mouseleave', () => pinButton.style.transform = '');
        pinButton.addEventListener('click', (e) => {
            e.stopPropagation();
            setPinnedState(!pinned);
        });
        statsContainer.innerHTML = `
            <div class="pixel-title" style="position: relative;">
                <span style="font-size: 22px;">▣</span> <span style="font-family: 'Press Start 2P', 'VT323', monospace;">PLAYER STATS</span> <span style="font-size: 22px;">▣</span>
            </div>
            <div class="pixel-stat-box">
                <img class="pixel-icon" src="${coinIcon}" alt="Coin" />
                <span style="color: #ffb300;">Balance:</span> <span id="balance" style="margin-left: 6px;">0</span>
            </div>
            <div class="pixel-stat-box">
                <img class="pixel-icon" src="${accuracyIcon}" alt="Accuracy" />
                <span style="color: #ffb300;">Question Accuracy:</span> <span id="questionAccuracy" style="margin-left: 6px;">0%</span>
            </div>
            <div class="pixel-stat-box">
                <img class="pixel-icon" src="${npcIcon}" alt="NPC" />
                <span style="color: #ffb300;">NPCs Talked To:</span> <span id="npcsTalkedTo" style="margin-left: 6px;">${npcsTalkedTo}</span>
            </div>
            <div id="npcs-progress-bar-container" style="width: 100%; margin-top: 6px; margin-bottom: 2px; height: 18px; background: #fffbe6; border: 2px solid #ffb300; border-radius: 4px; box-shadow: 1px 1px 0 #ffec80; position: relative; overflow: hidden;">
                <div id="npcs-progress-bar" style="height: 100%; width: ${(Math.min(npcsTalkedTo, TOTAL_NPCS) / TOTAL_NPCS) * 100}%; background: repeating-linear-gradient(135deg, #ffe066, #ffd700 8px, #ffb300 12px, #ffe066 16px); image-rendering: pixelated; transition: width 0.3s;"></div>
                <span id="npcs-progress-label" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-family: 'Press Start 2P', 'VT323', monospace; font-size: 12px; color: #3a2c00; text-shadow: 1px 1px 0 #fffbe6; pointer-events: none;">${npcsTalkedTo} / ${TOTAL_NPCS}</span>
            </div>
        `;
        statsContainer.appendChild(pinButton);

        // Add to DOM
        statsWrapper.appendChild(statsButton);
        statsWrapper.appendChild(statsContainer);
        document.body.appendChild(statsWrapper);

        // --- PINNED STATE LOGIC ---
        let pinned = false;
        function setPinnedState(isPinned) {
            pinned = isPinned;
            if (pinned) {
                statsWrapper.classList.add('pinned');
                pinButton.classList.add('pinned');
                statsButton.classList.add('pinned');
                statsButton.style.display = 'none';
                statsContainer.style.position = 'fixed';
                statsContainer.style.right = '0';
                statsContainer.style.left = '';
                statsContainer.style.width = '320px';
                statsContainer.style.opacity = '1';
                statsContainer.style.pointerEvents = 'auto';
                statsContainer.style.padding = '18px 28px';
                statsContainer.style.overflow = 'visible';
                statsContainer.style.zIndex = '10002';
            } else {
                statsWrapper.classList.remove('pinned');
                pinButton.classList.remove('pinned');
                statsButton.classList.remove('pinned');
                statsButton.style.display = '';
                statsContainer.style.position = '';
                statsContainer.style.right = '60px';
                statsContainer.style.left = 'auto';
                statsContainer.style.width = '';
                statsContainer.style.opacity = '';
                statsContainer.style.pointerEvents = '';
                statsContainer.style.padding = '';
                statsContainer.style.overflow = '';
                statsContainer.style.zIndex = '';
            }
            // Pin color/rotation
            pinButton.style.color = pinned ? '#ffb300' : '#888';
            pinButton.style.transform = pinned ? 'rotate(-30deg)' : '';
        }
        // If pinned, prevent hover from closing; if not pinned, allow hover
        statsWrapper.addEventListener('mouseleave', () => {
            if (pinned) {
                setPinnedState(true);
            }
        });
        // Optional: clicking anywhere else unpins
        document.addEventListener('click', (e) => {
            if (pinned && !statsWrapper.contains(e.target)) {
                setPinnedState(false);
            }
        });
        // --- END PINNED STATE LOGIC ---
    }

    updateNpcsTalkedToUI(count) {
        const npcsSpan = document.getElementById('npcsTalkedTo');
        if (npcsSpan) {
            npcsSpan.textContent = count;
        }
        // Update progress bar
        const bar = document.getElementById('npcs-progress-bar');
        const label = document.getElementById('npcs-progress-label');
        if (bar && label) {
            const TOTAL_NPCS = 10;
            bar.style.width = `${(Math.min(count, TOTAL_NPCS) / TOTAL_NPCS) * 100}%`;
            label.textContent = `${count} / ${TOTAL_NPCS}`;
        }
    }

    incrementNpcsTalkedTo() {
        // Get current count from cookies
        let npcsTalkedTo = 0;
        const cookies = document.cookie.split(';');
        const npcsCookie = cookies.find(cookie => cookie.trim().startsWith('npcsTalkedTo='));
        if (npcsCookie) {
            npcsTalkedTo = parseInt(npcsCookie.split('=')[1]) || 0;
        }
        npcsTalkedTo += 1;
        // Update cookie (expires in 30 days)
        document.cookie = `npcsTalkedTo=${npcsTalkedTo}; path=/; max-age=${60*60*24*30}`;
        this.updateNpcsTalkedToUI(npcsTalkedTo);
    }
}

class InventoryManager {
    constructor(game) {
        this.game = game;
        this.inventory = Inventory.getInstance();
=======
    // Static properties for tracking progress
    static npcInteractions = new Set();
    static totalNpcs = 6;
    static npcOrder = [
        { id: 'Fidelity', hint: 'Talk to Fidelity to learn about investments' },
        { id: 'Schwab', hint: 'Visit Schwab for more financial wisdom' },
        { id: 'Tech Owl', hint: 'Check the Tech Owl for market updates' },
        { id: 'Investor', hint: 'Meet the Investor to discuss trading' },
        { id: 'Market Computer', hint: 'Use the Market Computer for real-time data' },
        { id: 'Pilot', hint: 'Ready to move on! Talk to the Pilot to proceed' }
    ];
    static gameSteps = [
        { id: 'start', text: 'Start Adventure', completed: true },
        { id: 'talk_npcs', text: 'Talk to NPCs', completed: false },
        { id: 'meteor_key', text: 'Get Meteor Key', completed: false },
        { id: 'complete_quizzes', text: 'Complete Quizzes', completed: false },
        { id: 'reach_paradise', text: 'Reach Paradise', completed: false }
    ];

    static setCookie(name, value, days = 365) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    static loadProgressFromCookies() {
        // Load NPC interactions
        const npcCookie = this.getCookie('npc_interactions');
        if (npcCookie) {
            this.npcInteractions = new Set(JSON.parse(npcCookie));
        }

        // Load game steps
        const stepsCookie = this.getCookie('game_steps');
        if (stepsCookie) {
            const savedSteps = JSON.parse(stepsCookie);
            this.gameSteps.forEach((step, index) => {
                if (savedSteps[index]) {
                    step.completed = savedSteps[index].completed;
                }
            });
        }

        // Check for meteor key
        const gameKeyCookie = this.getCookie('gameKey');
        if (gameKeyCookie) {
            this.gameSteps[2].completed = true;
        }

        // Check for paradise
        const paradiseCookie = this.getCookie('paradise_reached');
        if (paradiseCookie) {
            this.gameSteps[4].completed = true;
        }

        // Update talk_npcs step based on NPC interactions
        this.gameSteps[1].completed = this.npcInteractions.size > 0;
        this.gameSteps[3].completed = this.npcInteractions.size >= this.totalNpcs;
    }

    static saveProgressToCookies() {
        // Save NPC interactions
        this.setCookie('npc_interactions', JSON.stringify([...this.npcInteractions]));

        // Save game steps
        this.setCookie('game_steps', JSON.stringify(this.gameSteps));

        // Save paradise progress if completed
        if (this.gameSteps[4].completed) {
            this.setCookie('paradise_reached', 'true');
        }
    }

    static getNextStep() {
        // If no NPCs talked to yet, direct to first NPC
        if (this.npcInteractions.size === 0) {
            return {
                type: 'npc',
                message: `Next Step: ${this.npcOrder[0].hint}`,
                target: this.npcOrder[0].id
            };
        }

        // If not all NPCs visited, find next unvisited NPC
        if (this.npcInteractions.size < this.totalNpcs - 1) { // -1 because Pilot is last
            for (let npc of this.npcOrder) {
                if (!this.npcInteractions.has(npc.id) && npc.id !== 'Pilot') {
                    return {
                        type: 'npc',
                        message: `Next Step: ${npc.hint}`,
                        target: npc.id
                    };
                }
            }
        }

        // If all NPCs except Pilot visited, direct to Pilot
        if (this.npcInteractions.size >= this.totalNpcs - 1 && !this.npcInteractions.has('Pilot')) {
            return {
                type: 'pilot',
                message: 'Next Step: You\'ve learned enough! Talk to the Pilot to continue your journey',
                target: 'Pilot'
            };
        }

        return {
            type: 'complete',
            message: 'You\'ve completed all steps in this area!',
            target: null
        };
    }

    static updateProgressUI() {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer) return;

        // Update NPC progress
        const npcProgressEl = statsContainer.querySelector('.npc-progress-fill');
        const npcCountEl = statsContainer.querySelector('.npc-count');
        if (npcProgressEl && npcCountEl) {
            const progress = (this.npcInteractions.size / this.totalNpcs) * 100;
            npcProgressEl.style.width = `${progress}%`;
            npcCountEl.textContent = `${this.npcInteractions.size}/${this.totalNpcs}`;
            console.log('Updating NPC progress:', this.npcInteractions.size, 'of', this.totalNpcs);
        }

        // Update game progress
        const completedSteps = this.gameSteps.filter(step => step.completed).length;
        const gameProgressEl = statsContainer.querySelector('.game-progress-fill');
        const gameCountEl = statsContainer.querySelector('.game-count');
        if (gameProgressEl && gameCountEl) {
            const progress = (completedSteps / this.gameSteps.length) * 100;
            gameProgressEl.style.width = `${progress}%`;
            gameCountEl.textContent = `${completedSteps}/${this.gameSteps.length}`;
        }

        // Update step indicators
        this.gameSteps.forEach((step, index) => {
            const stepEl = statsContainer.querySelector(`.game-step:nth-child(${index + 1})`);
            if (stepEl) {
                if (step.completed) {
                    stepEl.classList.add('completed');
                } else {
                    stepEl.classList.remove('completed');
                }
            }
        });

        // Force a reflow to ensure the UI updates
        statsContainer.style.display = 'none';
        statsContainer.offsetHeight; // Force reflow
        statsContainer.style.display = 'block';
    }

    static updateProgress(npcId) {
        console.log('Updating progress for NPC:', npcId);
        
        // Add NPC to interactions set if not already added
        if (!this.npcInteractions.has(npcId)) {
            this.npcInteractions.add(npcId);
            console.log('Current NPC interactions:', [...this.npcInteractions]);
            
            // Update game steps
            if (this.gameSteps) {
                const talkNpcsStep = this.gameSteps.find(step => step.id === 'talk_npcs');
                const completeQuizzesStep = this.gameSteps.find(step => step.id === 'complete_quizzes');
                
                if (talkNpcsStep) talkNpcsStep.completed = true;
                if (completeQuizzesStep) completeQuizzesStep.completed = this.npcInteractions.size >= this.totalNpcs;

                // Save progress to cookies
                this.saveProgressToCookies();

                // Update the UI
                this.updateProgressUI();

                // Show next step guidance
                this.showNextStepGuidance();
            } else {
                console.error('Game steps not properly initialized');
            }
        }
    }

    static showNextStepGuidance() {
        const nextStep = this.getNextStep();
        
        // Remove any existing guidance
        const existingGuidance = document.getElementById('next-step-guidance');
        if (existingGuidance) {
            existingGuidance.remove();
        }

        // Create new guidance element
        const guidance = document.createElement('div');
        guidance.id = 'next-step-guidance';
        guidance.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: #ffd700;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: 'Press Start 2P', monospace;
            font-size: 12px;
            border: 2px solid #ffd700;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
            z-index: 9999;
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
        `;

        // Add animation styles if not already present
        if (!document.getElementById('next-step-styles')) {
            const styles = document.createElement('style');
            styles.id = 'next-step-styles';
            styles.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 20px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(styles);
        }

        guidance.innerHTML = `
            <div style="margin-bottom: 5px; color: #fff; font-size: 10px;">NEXT OBJECTIVE</div>
            <div style="animation: pulse 2s infinite">${nextStep.message}</div>
        `;

        document.body.appendChild(guidance);

        // Remove guidance after 5 seconds
        setTimeout(() => {
            guidance.style.animation = 'fadeOut 0.5s ease-in forwards';
            setTimeout(() => guidance.remove(), 500);
        }, 5000);
    }

    static initStatsUI() {
        // Load saved progress before initializing UI
        this.loadProgressFromCookies();

        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '75px';
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';
        statsContainer.style.minWidth = '200px';
        statsContainer.style.fontFamily = "'Press Start 2P', monospace";
        statsContainer.style.fontSize = '10px';
        statsContainer.style.border = '2px solid #ffd700';
        statsContainer.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.3)';

        // Inject progress bar styles
        if (!document.getElementById('progress-bar-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'progress-bar-styles';
            styleSheet.textContent = `
                .progress-container {
                    margin: 8px 0;
                }
                .progress-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                    font-size: 8px;
                    color: #ffd700;
                }
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: #ffd700;
                    transition: width 0.3s ease;
                    border-radius: 4px;
                }
                .stats-divider {
                    height: 1px;
                    background: rgba(255, 215, 0, 0.3);
                    margin: 8px 0;
                }
                .game-step {
                    font-size: 8px;
                    color: #fff;
                    margin: 4px 0;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }
                .game-step.completed {
                    color: #ffd700;
                    opacity: 1;
                }
                .game-step:before {
                    content: '○';
                    margin-right: 5px;
                }
                .game-step.completed:before {
                    content: '●';
                    color: #ffd700;
                }
            `;
            document.head.appendChild(styleSheet);
        }

        const cookies = document.cookie.split(';');
        const gameKeyCookie = cookies.find(cookie => cookie.trim().startsWith('gameKey='));
        

        // Calculate initial progress
        if (gameKeyCookie) {
            this.gameSteps[2].completed = true;
        }

        const completedSteps = this.gameSteps.filter(step => step.completed).length;
        const npcCount = this.npcInteractions.size;

        statsContainer.innerHTML = `
            <div style="margin-bottom: 10px;">Balance: <span id="balance" style="color: #ffd700;">0</span></div>
            <div style="margin-bottom: 10px;">Accuracy: <span id="questionAccuracy" style="color: #ffd700;">0%</span></div>
            
            
            <div class="stats-divider"></div>
            
            <div class="progress-container">
                <div class="progress-label">
                    <span>NPCs Interacted</span>
                    <span class="npc-count">${npcCount}/${this.totalNpcs}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill npc-progress-fill" style="width: ${(npcCount / this.totalNpcs) * 100}%"></div>
                </div>
            </div>

            <div class="progress-container">
                <div class="progress-label">
                    <span>Game Progress</span>
                    <span class="game-count">${completedSteps}/${this.gameSteps.length}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill game-progress-fill" style="width: ${(completedSteps / this.gameSteps.length) * 100}%"></div>
                </div>
            </div>

            <div class="stats-divider"></div>
            
            ${this.gameSteps.map(step => `
                <div class="game-step ${step.completed ? 'completed' : ''}">
                    ${step.text}
                </div>
            `).join('')}
        `;

        document.body.appendChild(statsContainer);

        // Show initial guidance
        this.showNextStepGuidance();

    }

    giveItem(itemId, quantity = 1) {
        const item = defaultItems[itemId];
        if (!item) {
            console.error(`Item ${itemId} not found in defaultItems`);
            return false;
        }

        const itemToAdd = {
            ...item,
            quantity: quantity
        };

        return this.inventory.addItem(itemToAdd);
    }

    removeItem(itemId, quantity = 1) {
        return this.inventory.removeItem(itemId, quantity);
    }

    hasItem(itemId) {
        return this.inventory.items.some(item => item.id === itemId);
    }

    getItemQuantity(itemId) {
        const item = this.inventory.items.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    }

    giveStartingItems() {
        this.giveItem('stock_certificate', 5);
        this.giveItem('bond', 3);
        this.giveItem('trading_boost', 2);
        this.giveItem('speed_boost', 2);
        this.giveItem('calculator', 1);
        this.giveItem('market_scanner', 1);
        this.giveItem('rare_coin', 1);
        this.giveItem('trading_manual', 1);
        this.giveItem('roi_calculator', 1);
    }
}

class QuizManager {
    constructor(game) {
        this.game = game;
    }

    async fetchQuestionByCategory(category) {
        try {
            const personId = this.game.id;
            const response = await fetch(
                `${this.game.javaURI}/rpg_answer/getQuestion?category=${category}&personid=${personId}`, 
                this.game.fetchOptions
            );
    
            if (!response.ok) throw new Error("Failed to fetch questions");
            const questions = await response.json();
            return questions;
        } catch (error) {
            console.error("Error fetching question by category:", error);
            return null;
        }
    }
    
    async attemptQuizForNpc(npcCategory, callback = null) {
        try {
            const response = await this.fetchQuestionByCategory(npcCategory);
            const allQuestions = response?.questions || [];
    
            if (allQuestions.length === 0) {
                alert(`✅ You've already completed all of ${npcCategory}'s questions!`);
                return;
            }
    
            const quiz = new Quiz();
            quiz.initialize();
            quiz.openPanel(npcCategory, callback, allQuestions);
        } catch (error) {
            console.error("Error during NPC quiz attempt:", error);
            alert("⚠️ There was a problem loading the quiz. Please try again.");
        }
    }
}

class Game {
    constructor(environment) {
        this.environment = environment;
        this.path = environment.path;
        this.gameContainer = environment.gameContainer;
        this.gameCanvas = environment.gameCanvas;
        this.pythonURI = environment.pythonURI;
        this.javaURI = environment.javaURI;
        this.fetchOptions = environment.fetchOptions;
        this.uid = null;
        this.id = null;
        this.gname = null;

        this.statsManager = new StatsManager(this);
        this.inventoryManager = new InventoryManager(this);
        this.quizManager = new QuizManager(this);
        
        this.initUser();
        this.inventoryManager.giveStartingItems();
        
        const gameLevelClasses = environment.gameLevelClasses;
        new GameControl(this, gameLevelClasses).start();
    }

    static main(environment) {
        return new Game(environment);
    }

    initUser() {
        const pythonURL = this.pythonURI + '/api/id';
        fetch(pythonURL, this.fetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                this.uid = data.uid;

                const javaURL = this.javaURI + '/rpg_answer/person/' + this.uid;
                return fetch(javaURL, this.fetchOptions);
            })
            .then(response => {
                if (!response || !response.ok) {
                    throw new Error(`Spring server response: ${response?.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                this.id = data.id;
                this.statsManager.fetchStats(data.id);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    giveItem(itemId, quantity = 1) {
        return this.inventoryManager.giveItem(itemId, quantity);
    }

    removeItem(itemId, quantity = 1) {
        return this.inventoryManager.removeItem(itemId, quantity);
    }

    hasItem(itemId) {
        return this.inventoryManager.hasItem(itemId);
    }

    getItemQuantity(itemId) {
        return this.inventoryManager.getItemQuantity(itemId);
    }

    attemptQuizForNpc(npcCategory, callback = null) {
        return this.quizManager.attemptQuizForNpc(npcCategory, callback);
    }
}

export default Game;