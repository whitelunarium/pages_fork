class MarketEvents {
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
        this.events = [
            {
                title: "Market Crash!",
                description: "The stock market has experienced a significant downturn. All investments are down 20%.",
                effect: () => {
                    // Reduce player's score by 20%
                    const player = this.gameEnv.gameObjects.find(obj => obj instanceof Player);
                    if (player) {
                        player.score = Math.floor(player.score * 0.8);
                        this.showEventAlert("Market Crash!", "Your score has decreased by 20%!");
                    }
                }
            },
            {
                title: "Economic Boom!",
                description: "The economy is thriving! All investments are up 15%.",
                effect: () => {
                    // Increase player's score by 15%
                    const player = this.gameEnv.gameObjects.find(obj => obj instanceof Player);
                    if (player) {
                        player.score = Math.floor(player.score * 1.15);
                        this.showEventAlert("Economic Boom!", "Your score has increased by 15%!");
                    }
                }
            },
            {
                title: "Inflation Alert!",
                description: "High inflation rates are affecting the economy. All prices are up 10%.",
                effect: () => {
                    // Increase meteor speed by 10%
                    this.gameEnv.gameObjects.forEach(obj => {
                        if (obj instanceof Meteor) {
                            obj.yVelocity *= 1.1;
                        }
                    });
                    this.showEventAlert("Inflation Alert!", "Meteors are moving 10% faster!");
                }
            },
            {
                title: "Interest Rate Hike!",
                description: "Central bank raises interest rates. Movement speed reduced by 15%.",
                effect: () => {
                    // Reduce player movement speed by 15%
                    const player = this.gameEnv.gameObjects.find(obj => obj instanceof Player);
                    if (player) {
                        player.xVelocity *= 0.85;
                        player.yVelocity *= 0.85;
                        this.showEventAlert("Interest Rate Hike!", "Your movement speed has decreased by 15%!");
                    }
                }
            },
            {
                title: "Tech Sector Boom!",
                description: "Technology companies are performing exceptionally well. Bonus points for correct answers!",
                effect: () => {
                    // Double points for correct answers temporarily
                    this.gameEnv.scoreMultiplier = 2;
                    setTimeout(() => {
                        this.gameEnv.scoreMultiplier = 1;
                        this.showEventAlert("Tech Sector Boom Ends", "Bonus points period has ended!");
                    }, 10000); // Lasts for 10 seconds
                    this.showEventAlert("Tech Sector Boom!", "Correct answers are worth double points for 10 seconds!");
                }
            }
        ];
        this.eventInterval = 30000; // Events occur every 30 seconds
        this.startEventSystem();
    }

    startEventSystem() {
        setInterval(() => {
            this.triggerRandomEvent();
        }, this.eventInterval);
    }

    triggerRandomEvent() {
        const randomEvent = this.events[Math.floor(Math.random() * this.events.length)];
        this.showEventAlert(randomEvent.title, randomEvent.description);
        randomEvent.effect();
    }

    showEventAlert(title, message) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1000;
            text-align: center;
            font-family: Arial, sans-serif;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;

        // Create title element
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.style.cssText = `
            margin: 0 0 10px 0;
            color: #ffd700;
            font-size: 18px;
        `;

        // Create message element
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.cssText = `
            margin: 0;
            font-size: 16px;
        `;

        // Add elements to alert
        alertDiv.appendChild(titleElement);
        alertDiv.appendChild(messageElement);

        // Add alert to document
        document.body.appendChild(alertDiv);

        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 500);
        }, 5000);
    }
}

export default MarketEvents; 