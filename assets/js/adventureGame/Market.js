class Market {
    constructor(initialBalance = 1000, checkIntervalMs = 5000, crashProbability = 0.05) {
      this.balance = initialBalance;
      this.crashed = false;
      this.interval = null;
      this.checkIntervalMs = checkIntervalMs;
      this.crashProbability = crashProbability;
  
      this.startMonitoring();
    }
  
    getBalance() {
      return this.balance.toFixed(2);
    }
  
    startMonitoring() {
      this.interval = setInterval(() => {
        this.checkForCrash();
      }, this.checkIntervalMs);
    }
  
    stopMonitoring() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  
    checkForCrash() {
      if (!this.crashed && Math.random() < this.crashProbability) {
        this.crashMarket();
      }
    }
  
    crashMarket() {
      this.crashed = true;
      this.balance *= 0.0085;
      console.warn("💥 The market has crashed!");
      alert(`💥 The market crashed! Your new balance is $${this.getBalance()}`);
    }
  
    addEarnings(amount) {
      this.balance += amount;
    }
  
    resetCrash() {
      this.crashed = false;
    }
  }
  
  export default Market;
  