import Npc from "./Npc.js";

/**
 * FinancialAdvisor class - A specialized NPC that provides financial news and advice
 */
class FinancialAdvisor extends Npc {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        
        // Financial news database with current market data
        this.financialNews = [
            {
                headline: "Markets Rally on Strong Economic Data",
                details: "Stock markets reached new highs today as economic data showed stronger than expected growth. Consider diversifying your portfolio to capitalize on different sectors.",
                source: "Market Watch",
                date: this.getFormattedDate(-1) // yesterday
            },
            {
                headline: "Fed Signals Interest Rate Changes",
                details: "The Federal Reserve indicated potential interest rate adjustments. When rates rise, consider how this affects your debt and investments - bonds typically perform differently than stocks.",
                source: "Financial Times",
                date: this.getFormattedDate(0) // today
            },
            {
                headline: "Tech Sector Leads Market Gains",
                details: "Technology stocks outperformed broader markets. Remember that while tech offers growth potential, diversification remains important for long-term financial planning.",
                source: "Bloomberg",
                date: this.getFormattedDate(-2) // 2 days ago
            },
            {
                headline: "Housing Market Shows Signs of Cooling",
                details: "After months of rising prices, the housing market is showing signs of stabilization. Real estate investments should be considered as part of a balanced long-term strategy.",
                source: "CNBC",
                date: this.getFormattedDate(0) // today
            },
            {
                headline: "Crypto Markets Experience Volatility",
                details: "Cryptocurrency prices fluctuated dramatically this week. Remember that crypto assets are highly speculative - never invest more than you can afford to lose.",
                source: "CoinDesk",
                date: this.getFormattedDate(-1) // yesterday
            },
            {
                headline: "Inflation Data Released",
                details: "The latest CPI data shows inflation at 3.2%. Consider how inflation affects your purchasing power and adjust your savings and investment strategies accordingly.",
                source: "Reuters",
                date: this.getFormattedDate(0) // today
            },
            {
                headline: "Apple Announces Record Quarterly Earnings",
                details: "Apple (AAPL) reported stronger than expected earnings, driven by services growth. Remember that while individual stock performance varies, focusing on company fundamentals is key for long-term investors.",
                source: "Wall Street Journal",
                date: this.getFormattedDate(-1) // yesterday
            },
            {
                headline: "Energy Sector Faces Transition Challenges",
                details: "Traditional energy companies navigate the shift to renewables. The energy transition creates both risks and opportunities for investors focused on sustainable investing.",
                source: "Energy Insider",
                date: this.getFormattedDate(-3) // 3 days ago
            },
            {
                headline: "Small Cap Stocks Outperform Large Caps",
                details: "Smaller companies showed strong performance this quarter. Small cap stocks often behave differently than large caps, highlighting the importance of size diversification in portfolios.",
                source: "Investor's Business Daily",
                date: this.getFormattedDate(0) // today
            },
            {
                headline: "Global Supply Chain Improvements Boost Markets",
                details: "Easing supply chain constraints have helped reduce pressure on prices. Companies with strong logistics networks may benefit from improved global trade conditions.",
                source: "Financial Post",
                date: this.getFormattedDate(-2) // 2 days ago
            }
        ];
        
        // Add real-time stock data to each news item
        this.updateStockData();
        
        // Simulated refresh - update stock data every 60 seconds
        setInterval(() => this.updateStockData(), 60 * 1000);
        
        // Financial tips for beginners
        this.financialTips = [
            "Start an emergency fund before focusing on investments - aim for 3-6 months of expenses.",
            "Pay off high-interest debt before investing aggressively.",
            "Take advantage of employer 401(k) matching - it's free money!",
            "Diversification is key - spread investments across different asset classes.",
            "Dollar-cost averaging helps reduce the impact of market volatility.",
            "Compound interest works best with time - start investing early!",
            "Low-cost index funds are often better for beginners than picking individual stocks.",
            "Rebalance your portfolio periodically to maintain your target asset allocation.",
            "Tax-advantaged accounts like IRAs and 401(k)s can significantly boost long-term returns.",
            "Consider inflation in your financial planning - your money loses purchasing power over time.",
            "Review your insurance coverage to protect your financial assets.",
            "Create a will and estate plan to protect your financial legacy.",
            "Regularly check your credit score and report for errors.",
            "Use budgeting tools to track spending and identify areas for improvement.",
            "Financial goals should be specific, measurable, achievable, relevant, and time-bound (SMART)."
        ];

        // Flag to track if panel is currently open
        this.isAdvicePanelOpen = false;

        // Custom interact method
        if (!this.interact) {
            this.interact = this.provideFinancialAdvice.bind(this);
        }
    }

    /**
     * Returns a formatted date string for a given offset from today
     * @param {number} dayOffset - Number of days from today (0 = today, -1 = yesterday, etc.)
     * @returns {string} Formatted date string
     */
    getFormattedDate(dayOffset = 0) {
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    /**
     * Simulates updating real-time stock data
     */
    updateStockData() {
        const stocks = [
            { symbol: 'AAPL', name: 'Apple Inc.' },
            { symbol: 'MSFT', name: 'Microsoft Corp.' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.' },
            { symbol: 'TSLA', name: 'Tesla Inc.' }
        ];
        
        // Add simulated market data to each news item
        this.financialNews.forEach(news => {
            // Pick a random stock for this news
            const stock = stocks[Math.floor(Math.random() * stocks.length)];
            
            // Generate a random price change (-3% to +3%)
            const priceChange = (Math.random() * 6 - 3).toFixed(2);
            const direction = priceChange >= 0 ? '▲' : '▼';
            
            // Generate a random price between $100 and $500
            const price = (Math.random() * 400 + 100).toFixed(2);
            
            // Add the stock data to the news item
            news.stockData = {
                symbol: stock.symbol,
                name: stock.name,
                price: `$${price}`,
                change: `${direction} ${Math.abs(priceChange)}%`,
                updated: new Date().toLocaleTimeString()
            };
        });
        
        console.log("Updated simulated stock data");
    }

    /**
     * Creates the background dim effect
     */
    createBackgroundDim() {
        const dimDiv = document.createElement("div");
        dimDiv.id = "financial-dim";
        dimDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 9998;
        `;
        
        // Click handler to close the panel
        dimDiv.addEventListener("click", () => this.closeAdvicePanel());
        
        document.body.appendChild(dimDiv);
    }

    /**
     * Closes the financial advice panel
     */
    closeAdvicePanel() {
        const panel = document.getElementById("financial-advice-panel");
        const dim = document.getElementById("financial-dim");
        
        if (panel) {
            panel.style.opacity = "0";
            setTimeout(() => panel.remove(), 300);
        }
        
        if (dim) dim.remove();
        
        this.isAdvicePanelOpen = false;
    }

    /**
     * Provides a random financial news item and tip when player interacts
     */
    provideFinancialAdvice() {
        // Don't open multiple panels
        if (this.isAdvicePanelOpen) return;
        
        // Mark panel as open
        this.isAdvicePanelOpen = true;
        
        // Select random news and tip
        const randomNews = this.financialNews[Math.floor(Math.random() * this.financialNews.length)];
        const randomTip = this.financialTips[Math.floor(Math.random() * this.financialTips.length)];
        
        // Create background dim
        this.createBackgroundDim();
        
        // Create panel element
        const panel = document.createElement("div");
        panel.id = "financial-advice-panel";
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 20, 40, 0.95);
            color: white;
            border-radius: 10px;
            width: 60%;
            max-width: 800px;
            max-height: 80%;
            overflow-y: auto;
            z-index: 9999;
            box-shadow: 0 0 20px rgba(0, 150, 200, 0.6);
            border: 2px solid #0099cc;
            padding: 20px;
            font-family: Arial, sans-serif;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Create content for the panel
        panel.innerHTML = `
            <div style="text-align: right;">
                <button id="close-financial-panel" style="
                    background: none;
                    border: none;
                    color: #0099cc;
                    font-size: 24px;
                    cursor: pointer;
                    ">&times;</button>
            </div>
            
            <div style="margin-bottom: 20px; text-align: center;">
                <h2 style="
                    color: #0099cc;
                    margin: 0;
                    font-size: 24px;
                    border-bottom: 1px solid #0099cc;
                    padding-bottom: 10px;
                    ">📰 FINANCIAL NEWS UPDATE</h2>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="
                    margin: 0 0 10px 0;
                    color: #e6e6e6;
                    font-size: 18px;
                    ">${randomNews.headline}</h3>
                
                <p style="
                    margin: 0 0 15px 0;
                    line-height: 1.5;
                    ">${randomNews.details}</p>
                
                <div style="
                    font-size: 14px;
                    color: #cccccc;
                    font-style: italic;
                    ">
                    Published: ${randomNews.date}<br>
                    Source: ${randomNews.source}
                </div>
            </div>
            
            <div style="
                background-color: rgba(0, 80, 120, 0.3);
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border-left: 3px solid #0099cc;
                ">
                <h3 style="
                    margin: 0 0 10px 0;
                    color: #0099cc;
                    font-size: 18px;
                    ">📈 MARKET DATA</h3>
                
                <div style="font-size: 16px;">
                    <strong>${randomNews.stockData.name}</strong> (${randomNews.stockData.symbol}): 
                    ${randomNews.stockData.price} 
                    <span style="color: ${randomNews.stockData.change.includes('▲') ? '#00cc66' : '#ff6666'}; font-weight: bold;">
                        ${randomNews.stockData.change}
                    </span>
                </div>
                
                <div style="
                    font-size: 14px;
                    color: #cccccc;
                    margin-top: 5px;
                    ">
                    Last updated: ${randomNews.stockData.updated}
                </div>
            </div>
            
            <div style="
                background-color: rgba(255, 255, 200, 0.1);
                padding: 15px;
                border-radius: 5px;
                border-left: 3px solid #ffcc00;
                ">
                <h3 style="
                    margin: 0 0 10px 0;
                    color: #ffcc00;
                    font-size: 18px;
                    ">💡 FINANCIAL TIP</h3>
                
                <p style="
                    margin: 0;
                    line-height: 1.5;
                    ">${randomTip}</p>
            </div>
        `;
        
        // Append panel to the document
        document.body.appendChild(panel);
        
        // Add close button event listener
        document.getElementById("close-financial-panel").addEventListener("click", () => this.closeAdvicePanel());
        
        // Trigger animation to fade in the panel
        setTimeout(() => {
            panel.style.opacity = "1";
        }, 10);
    }
}

export default FinancialAdvisor; 