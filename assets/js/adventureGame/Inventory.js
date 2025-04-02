import gameControlInstance from "./GameControl.js";

class Inventory {
    constructor() {
        if (Inventory.instance) {
            return Inventory.instance;
        }
        Inventory.instance = this;
        
        console.log("Initializing Inventory system...");
        this.items = [];
        this.maxSlots = 20;
        this.isOpen = false;
        this.injectStyles();
        this.initialize();
        
        // Add starting items first
        this.addStartingItems();
        
        // Then load any additional items from cookies
        this.loadFromCookies();
    }

    injectStyles() {
        console.log("Injecting inventory styles...");
        const style = document.createElement("style");
        style.textContent = `
            .inventory-container {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                padding: 20px;
                border-radius: 10px;
                border: 2px solid #ffd700;
                color: white;
                z-index: 1000;
                backdrop-filter: blur(5px);
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
            }

            .inventory-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #ffd700;
            }

            .inventory-header h2 {
                margin: 0;
                color: #ffd700;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            }

            .close-inventory {
                background: none;
                border: none;
                color: #ffd700;
                font-size: 24px;
                cursor: pointer;
                padding: 0 10px;
                transition: color 0.3s;
            }

            .close-inventory:hover {
                color: #ff6b6b;
            }

            .inventory-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 10px;
                max-height: 300px;
                overflow-y: auto;
                padding-right: 10px;
            }

            .inventory-grid::-webkit-scrollbar {
                width: 8px;
            }

            .inventory-grid::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
            }

            .inventory-grid::-webkit-scrollbar-thumb {
                background: #ffd700;
                border-radius: 4px;
            }

            .inventory-slot {
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid #ffd700;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                transition: all 0.3s;
            }

            .inventory-slot:hover {
                background: rgba(255, 215, 0, 0.2);
                transform: scale(1.05);
            }

            .empty-slot {
                border: 2px dashed #ffd700;
                opacity: 0.5;
            }

            .item-emoji {
                font-size: 24px;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }

            .item-count {
                position: absolute;
                bottom: 2px;
                right: 2px;
                background: rgba(0, 0, 0, 0.8);
                color: #ffd700;
                padding: 2px 4px;
                border-radius: 3px;
                font-size: 12px;
                font-weight: bold;
            }

            .item-tooltip {
                position: fixed;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 5px;
                border: 1px solid #ffd700;
                font-size: 14px;
                z-index: 1001;
                white-space: pre-line;
                pointer-events: none;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }

            .calculator-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                padding: 25px;
                border-radius: 15px;
                border: 3px solid #ffd700;
                color: white;
                z-index: 1002;
                min-width: 300px;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
                cursor: move;
                user-select: none;
            }

            .calculator-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #ffd700;
                cursor: move;
                background: rgba(255, 215, 0, 0.1);
                margin: -25px -25px 20px -25px;
                padding: 15px 25px;
                border-radius: 12px 12px 0 0;
            }

            .calculator-title {
                margin: 0;
                color: #ffd700;
                font-size: 20px;
            }

            .calculator-close {
                background: none;
                border: none;
                color: #ffd700;
                font-size: 24px;
                cursor: pointer;
                padding: 0 10px;
            }

            .calculator-form {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .calculator-input {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid #ffd700;
                border-radius: 5px;
                padding: 8px;
                color: white;
                font-size: 16px;
            }

            .calculator-input:focus {
                outline: none;
                border-color: #ff6b6b;
            }

            .calculator-result {
                margin-top: 20px;
                padding: 15px;
                background: rgba(255, 215, 0, 0.1);
                border-radius: 5px;
                text-align: center;
                font-size: 18px;
                color: #ffd700;
            }

            .calculator-button {
                background: #ffd700;
                border: none;
                border-radius: 5px;
                padding: 10px;
                color: black;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            }

            .calculator-button:hover {
                background: #ff6b6b;
                transform: scale(1.05);
            }

            .trading-tips {
                color: white;
                padding: 20px;
            }

            .trading-tips h3 {
                color: #ffd700;
                text-align: center;
                margin-bottom: 20px;
                font-size: 24px;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            }

            .tip-section {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid #ffd700;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                transition: all 0.3s;
            }

            .tip-section:hover {
                background: rgba(255, 215, 0, 0.1);
                transform: translateY(-2px);
            }

            .tip-section h4 {
                color: #ffd700;
                margin: 0 0 10px 0;
                font-size: 18px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .tip-section p {
                margin: 5px 0;
                line-height: 1.4;
                color: #fff;
            }

            .tip-section p:before {
                content: "•";
                color: #ffd700;
                margin-right: 8px;
            }
        `;
        document.head.appendChild(style);
    }

    initialize() {
        const container = document.createElement("div");
        container.className = "inventory-container";
        container.id = "inventoryContainer";
        container.style.display = "none"; // Hide inventory by default
        container.innerHTML = `
            <div class="inventory-header">
                <h2>Inventory</h2>
                <button class="close-inventory">×</button>
            </div>
            <div class="inventory-grid"></div>
        `;
        document.body.appendChild(container);

        const closeBtn = container.querySelector(".close-inventory");
        closeBtn.addEventListener("click", () => this.close());

        // Add keyboard shortcut
        document.addEventListener("keydown", (e) => {
            if (e.key === ".") {
                this.toggle();
            }
        });

        console.log("Inventory UI setup complete");
    }

    loadFromCookies() {
        console.log("Loading items from cookies...");
        const cookies = document.cookie.split(';');
        console.log("All cookies:", cookies);
        
        // Check for game keys
        const gameKeyCookie = cookies.find(cookie => cookie.trim().startsWith('gameKey='));
        if (gameKeyCookie && gameKeyCookie.includes('meteorBlasterKey') && !this.items.some(item => item.id === 'meteor_key')) {
            console.log("Found meteor key in gameKey cookie");
            this.addItem({
                id: 'meteor_key',
                name: 'Meteor Key',
                description: 'A special key earned by completing meteor challenges.',
                emoji: '🌠',
                stackable: false,
                value: 2000
            });
        }

        // Check for meteor key - try different possible cookie names
        const meteorKeyCookie = cookies.find(cookie => {
            const trimmedCookie = cookie.trim();
            return trimmedCookie.startsWith('meteorKey=') || 
                   trimmedCookie.startsWith('meteor_key=') || 
                   trimmedCookie.startsWith('meteor=');
        });
        
        console.log("Meteor key cookie found:", meteorKeyCookie);
        console.log("Current inventory items before meteor key:", this.items);
        
        if (meteorKeyCookie && !this.items.some(item => item.id === 'meteor_key')) {
            console.log("Adding meteor key to inventory");
            const meteorKeyItem = {
                id: 'meteor_key',
                name: 'Meteor Key',
                description: 'A special key earned by completing meteor challenges.',
                emoji: '🌠',
                stackable: false,
                value: 2000
            };
            console.log("Meteor key item to add:", meteorKeyItem);
            this.addItem(meteorKeyItem);
            console.log("Inventory items after adding meteor key:", this.items);
        } else {
            console.log("Meteor key not added because:", {
                cookieExists: !!meteorKeyCookie,
                cookieValue: meteorKeyCookie,
                alreadyInInventory: this.items.some(item => item.id === 'meteor_key')
            });
        }

        // Check for other achievement cookies
        const achievementCookies = cookies.filter(cookie => cookie.trim().startsWith('achievement_'));
        achievementCookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            const achievementId = name.replace('achievement_', '').trim();
            
            if (!this.items.some(item => item.id === `achievement_${achievementId}`)) {
                this.addItem({
                    id: `achievement_${achievementId}`,
                    name: achievementId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    description: `Achievement earned: ${achievementId.replace(/_/g, ' ')}`,
                    emoji: '🏆',
                    stackable: false,
                    value: 500
                });
            }
        });

        // Check for level completion cookies
        const levelCookies = cookies.filter(cookie => cookie.trim().startsWith('level_'));
        levelCookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            const levelId = name.replace('level_', '').trim();
            
            if (!this.items.some(item => item.id === `level_${levelId}`)) {
                this.addItem({
                    id: `level_${levelId}`,
                    name: `${levelId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Badge`,
                    description: `Completed ${levelId.replace(/_/g, ' ')} level`,
                    emoji: '🎖️',
                    stackable: false,
                    value: 1000
                });
            }
        });

        // Check for quiz completion cookies
        const quizCookies = cookies.filter(cookie => cookie.trim().startsWith('quiz_'));
        quizCookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            const quizId = name.replace('quiz_', '').trim();
            
            if (!this.items.some(item => item.id === `quiz_${quizId}`)) {
                this.addItem({
                    id: `quiz_${quizId}`,
                    name: `${quizId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Certificate`,
                    description: `Completed ${quizId.replace(/_/g, ' ')} quiz`,
                    emoji: '📜',
                    stackable: false,
                    value: 500
                });
            }
        });

        console.log("Finished loading items from cookies");
    }

    saveToCookies() {
        console.log("Saving items to cookies...");
        this.items.forEach(item => {
            if (item.id === 'meteor_key') {
                console.log("Saving meteor key cookie");
                document.cookie = `meteorKey=true;path=/;max-age=31536000`; // 1 year expiry
            } else if (item.id === 'game_key') {
                document.cookie = `gameKey=true;path=/;max-age=31536000`;
            } else if (item.id.startsWith('achievement_')) {
                document.cookie = `${item.id}=true;path=/;max-age=31536000`;
            } else if (item.id.startsWith('level_')) {
                document.cookie = `${item.id}=true;path=/;max-age=31536000`;
            } else if (item.id.startsWith('quiz_')) {
                document.cookie = `${item.id}=true;path=/;max-age=31536000`;
            }
        });
        console.log("Finished saving items to cookies");
    }

    addItem(item) {
        console.log("Adding item to inventory:", item);
        if (!item || !item.id) {
            console.error("Invalid item:", item);
            return false;
        }

        // Special handling for meteor key
        if (item.id === 'meteor_key') {
            console.log("Special handling for meteor key");
            // Remove any existing meteor key first
            this.items = this.items.filter(i => i.id !== 'meteor_key');
            // Add the new meteor key
            this.items.push({ ...item, quantity: 1 });
            console.log("Meteor key added successfully");
            this.saveToCookies();
            this.updateDisplay();
            return true;
        }

        const existingItem = this.items.find(i => i.id === item.id);
        console.log("Existing item found:", existingItem);
        
        if (existingItem && existingItem.stackable) {
            console.log("Updating quantity of existing item");
            existingItem.quantity += item.quantity || 1;
        } else {
            console.log("Adding new item to inventory");
            this.items.push({ ...item, quantity: item.quantity || 1 });
        }
        
        console.log("Current inventory items after add:", this.items);
        this.saveToCookies();
        this.updateDisplay();
        return true;
    }

    removeItem(itemId, amount = 1) {
        console.log("Removing item from inventory:", itemId, "amount:", amount);
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return false;

        const item = this.items[itemIndex];
        if (item.quantity > amount) {
            item.quantity -= amount;
        } else {
            this.items.splice(itemIndex, 1);
            // Remove cookie if it's a cookie-based item
            if (itemId.startsWith('game_key') || itemId.startsWith('meteor_key') || 
                itemId.startsWith('achievement_') || itemId.startsWith('level_') || 
                itemId.startsWith('quiz_')) {
                document.cookie = `${itemId}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            }
        }

        this.updateDisplay();
        this.saveToCookies();
        return true;
    }

    updateDisplay() {
        console.log("Updating inventory display...");
        const grid = document.querySelector(".inventory-grid");
        if (!grid) {
            console.error("Inventory grid not found!");
            return;
        }
        grid.innerHTML = "";

        console.log("Current items to display:", this.items);
        this.items.forEach(item => {
            console.log("Creating slot for item:", item);
            const slot = document.createElement("div");
            slot.className = "inventory-slot";
            
            const emoji = document.createElement("div");
            emoji.className = "item-emoji";
            emoji.textContent = item.emoji || "❓";
            slot.appendChild(emoji);

            if (item.quantity > 1) {
                const count = document.createElement("div");
                count.className = "item-count";
                count.textContent = item.quantity;
                slot.appendChild(count);
            }

            slot.addEventListener("click", () => {
                if (item.isCalculator) {
                    this.showCalculator(item);
                } else if (item.id === 'trading_manual') {
                    this.showTradingTips();
                }
            });

            slot.addEventListener("mouseover", (e) => {
                const tooltip = document.createElement("div");
                tooltip.className = "item-tooltip";
                tooltip.textContent = `${item.name}\n${item.description || ""}`;
                tooltip.style.left = e.pageX + 10 + "px";
                tooltip.style.top = e.pageY + 10 + "px";
                document.body.appendChild(tooltip);
            });

            slot.addEventListener("mouseout", () => {
                const tooltip = document.querySelector(".item-tooltip");
                if (tooltip) tooltip.remove();
            });

            grid.appendChild(slot);
        });

        const emptySlots = 21 - this.items.length;
        for (let i = 0; i < emptySlots; i++) {
            const slot = document.createElement("div");
            slot.className = "inventory-slot empty-slot";
            grid.appendChild(slot);
        }
    }

    makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = element.querySelector(".calculator-header");
        
        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            // Get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            // Calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    showCalculator(item) {
        const modal = document.createElement("div");
        modal.className = "calculator-modal";
        modal.innerHTML = `
            <div class="calculator-header">
                <h2 class="calculator-title">${item.name}</h2>
                <button class="calculator-close">×</button>
            </div>
            <div class="calculator-form">
                <input type="number" class="calculator-input" id="initialInvestment" placeholder="Initial Investment">
                <input type="number" class="calculator-input" id="currentValue" placeholder="Current Value">
                <button class="calculator-button">Calculate ROI</button>
                <div class="calculator-result"></div>
            </div>
        `;

        document.body.appendChild(modal);
        this.makeDraggable(modal);

        const closeBtn = modal.querySelector(".calculator-close");
        const calculateBtn = modal.querySelector(".calculator-button");
        const resultDiv = modal.querySelector(".calculator-result");

        closeBtn.addEventListener("click", () => {
            modal.remove();
        });

        calculateBtn.addEventListener("click", () => {
            const initialInvestment = parseFloat(document.getElementById("initialInvestment").value);
            const currentValue = parseFloat(document.getElementById("currentValue").value);

            if (isNaN(initialInvestment) || isNaN(currentValue)) {
                resultDiv.textContent = "Please enter valid numbers";
                return;
            }

            const roi = ((currentValue - initialInvestment) / initialInvestment) * 100;
            resultDiv.textContent = `ROI: ${roi.toFixed(2)}%`;
        });
    }

    showTradingTips() {
        const modal = document.createElement("div");
        modal.className = "calculator-modal";
        modal.innerHTML = `
            <div class="calculator-header">
                <h2 class="calculator-title">Trading Manual</h2>
                <button class="calculator-close">×</button>
            </div>
            <div class="calculator-form">
                <div class="trading-tips">
                    <h3>Essential Trading Tips</h3>
                    <div class="tip-section">
                        <h4>📈 Market Analysis</h4>
                        <p>• Study market trends before making decisions</p>
                        <p>• Use technical indicators to identify patterns</p>
                        <p>• Keep track of market news and events</p>
                    </div>
                    <div class="tip-section">
                        <h4>💰 Risk Management</h4>
                        <p>• Never invest more than you can afford to lose</p>
                        <p>• Set stop-loss orders to limit potential losses</p>
                        <p>• Diversify your portfolio across different assets</p>
                    </div>
                    <div class="tip-section">
                        <h4>⏰ Timing</h4>
                        <p>• Buy low, sell high - but don't try to time the market</p>
                        <p>• Be patient and wait for good opportunities</p>
                        <p>• Don't let emotions drive your trading decisions</p>
                    </div>
                    <div class="tip-section">
                        <h4>📊 Strategy</h4>
                        <p>• Develop and stick to a trading plan</p>
                        <p>• Keep detailed records of your trades</p>
                        <p>• Learn from both successful and failed trades</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.makeDraggable(modal);

        const closeBtn = modal.querySelector(".calculator-close");
        closeBtn.addEventListener("click", () => {
            modal.remove();
        });
    }

    toggle() {
        console.log("Toggling inventory, current state:", this.isOpen);
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        console.log("Opening inventory...");
        this.isOpen = true;
        const container = document.getElementById("inventoryContainer");
        if (!container) {
            console.error("Inventory container not found!");
            return;
        }
        container.style.display = "block";
        this.updateDisplay();
        
        // Get the game control instance from the game container
        const gameContainer = document.getElementById("gameContainer");
        if (gameContainer && gameContainer.gameControl) {
            gameContainer.gameControl.pause();
        }
    }

    close() {
        console.log("Closing inventory...");
        this.isOpen = false;
        const container = document.getElementById("inventoryContainer");
        if (!container) {
            console.error("Inventory container not found!");
            return;
        }
        container.style.display = "none";
        
        // Get the game control instance from the game container
        const gameContainer = document.getElementById("gameContainer");
        if (gameContainer && gameContainer.gameControl) {
            gameContainer.gameControl.resume();
        }
    }

    // Add static method to get instance
    static getInstance() {
        if (!Inventory.instance) {
            Inventory.instance = new Inventory();
        }
        return Inventory.instance;
    }

    addStartingItems() {
        console.log("Adding starting items...");
        // Add ROI Calculator
        this.addItem({
            id: 'roi_calculator',
            name: 'ROI Calculator',
            description: 'Calculate Return on Investment for your trades.',
            emoji: '📊',
            stackable: false,
            value: 300,
            isCalculator: true
        });

        // Add other starting items
        this.addItem({
            id: 'stock_certificate',
            name: 'Stock Certificate',
            description: 'A valuable stock certificate that can be traded for profit.',
            emoji: '📈',
            stackable: true,
            value: 1000,
            quantity: 5
        });

        this.addItem({
            id: 'bond',
            name: 'Government Bond',
            description: 'A safe investment that provides steady returns.',
            emoji: '💵',
            stackable: true,
            value: 500,
            quantity: 3
        });

        this.addItem({
            id: 'trading_boost',
            name: 'Trading Boost',
            description: 'Increases trading profits by 50% for 30 seconds.',
            emoji: '⚡',
            stackable: true,
            value: 200,
            quantity: 2
        });

        this.addItem({
            id: 'speed_boost',
            name: 'Speed Boost',
            description: 'Increases movement speed by 25% for 20 seconds.',
            emoji: '🚀',
            stackable: true,
            value: 150,
            quantity: 2
        });

        this.addItem({
            id: 'calculator',
            name: 'Financial Calculator',
            description: 'Helps calculate complex financial metrics.',
            emoji: '🧮',
            stackable: false,
            value: 1000,
            quantity: 1
        });

        this.addItem({
            id: 'market_scanner',
            name: 'Market Scanner',
            description: 'Reveals market trends and opportunities.',
            emoji: '🔍',
            stackable: false,
            value: 2000,
            quantity: 1
        });

        this.addItem({
            id: 'rare_coin',
            name: 'Rare Coin',
            description: 'A valuable collectible coin with historical significance.',
            emoji: '🪙',
            stackable: false,
            value: 5000,
            quantity: 1
        });

        this.addItem({
            id: 'trading_manual',
            name: 'Trading Manual',
            description: 'A comprehensive guide to advanced trading strategies.',
            emoji: '📚',
            stackable: false,
            value: 3000,
            quantity: 1
        });

        console.log("Starting items added successfully");
    }
}

export default Inventory; 