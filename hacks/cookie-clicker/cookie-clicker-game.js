const shopContainer = document.getElementById("shop-container");
const cookieButton = document.getElementById("cookie");
const cookieCountDisplay = document.getElementById("cookie-count");

const cookie = {
  cookies: 0,
  addCookies(amount) {
    this.cookies += amount;
    this.updateDisplay();
    localStorage.setItem("cookies", this.cookies);
  },
  updateDisplay() {
    cookieCountDisplay.innerHTML = this.cookies;
  },
  fetchStoredCookies() {
    const storedCookies = Number(localStorage.getItem("cookies"));
    if (storedCookies) {
      this.cookies = storedCookies;
      this.updateDisplay();
    }
  },
};

const shop = {
  forSale: [],
  updateShopDisplay() {
    shopContainer.innerHTML = "";
    const shopTitle = document.createElement("div");
    shopTitle.className = "text-xl font-bold mb-4 text-center";
    shopTitle.innerHTML = "SHOP";
    shopContainer.appendChild(shopTitle);
    for (let i = 0; i < this.forSale.length; i++) {
      const forSaleItemInfo = this.forSale[i];

      const shopButton = document.createElement("button");
      shopButton.className = `bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 mb-2`;
      shopButton.innerHTML = `${forSaleItemInfo.emoji} ${forSaleItemInfo.name} (${forSaleItemInfo.price} 🍪)`;
      shopContainer.appendChild(shopButton);

      shopButton.addEventListener("click", () => {
        if (cookie.cookies < forSaleItemInfo.price) {
          alert("Insufficient Cookies");
          return;
        }
        cookie.addCookies(-1 * forSaleItemInfo.price);

        gameLoop.addAutoClicker(
          forSaleItemInfo.name,
          forSaleItemInfo.cookiesPerSecond,
        );
        this.updateForSalePrice(
          Math.floor(forSaleItemInfo.price * forSaleItemInfo.priceIncrementer),
          i,
        );
      });
    }
  },
  addItemForSale(item) {
    this.forSale.push(item);
    this.updateShopDisplay();
  },
  updateForSalePrice(newPrice, index) {
    this.forSale[index].price = newPrice;
    this.updateShopDisplay();
  },
};

const gameLoop = {
  autoClickers: {},
  cookiesPerSecond: 0,
  intervalId: -1,
  addAutoClicker(itemName, cps) {
    if (this.autoClickers[itemName]) {
      this.autoClickers[itemName] += 1;
    } else {
      this.autoClickers[itemName] = 1;
    }
    this.cookiesPerSecond += cps;
    const savedUpgrades = localStorage.getItem("savedUpgrades");
    localStorage.setItem("savedUpgrades", JSON.stringify(this.autoClickers));
    this.runLoop();
  },
  runLoop() {
    if (this.intervalId > 0) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
    this.intervalId = setInterval(() => {
      cookie.addCookies(this.cookiesPerSecond);
    }, 1000);
  },
  fetchSavedData() {
    const data = localStorage.getItem("savedUpgrades");
    if (data) {
      const cookiePerSecondAndIndexMap = {};
      for (let i = 0; i < shop.forSale.length; i++) {
        cookiePerSecondAndIndexMap[shop.forSale[i].name] = {
          cps: shop.forSale[i].cookiesPerSecond,
          index: i,
        };
      }

      console.log(cookiePerSecondAndIndexMap);

      const autoClickersData = JSON.parse(data);
      this.autoClickers = autoClickersData;
      const keys = Object.keys(this.autoClickers);
      for (let i = 0; i < keys.length; i++) {
        const upgradeName = keys[i];
        const amount = this.autoClickers[upgradeName];
        this.cookiesPerSecond +=
          amount * cookiePerSecondAndIndexMap[upgradeName].cps;

        shop.updateForSalePrice(
          Math.floor(
            shop.forSale[cookiePerSecondAndIndexMap[upgradeName].index].price *
              Math.pow(
                shop.forSale[cookiePerSecondAndIndexMap[upgradeName].index]
                  .priceIncrementer,
                amount,
              ),
          ),
          cookiePerSecondAndIndexMap[upgradeName].index,
        );
        this.runLoop();
      }
    }
  },
};

cookie.fetchStoredCookies();
const grandma = {
  name: "Grandma",
  emoji: "👵",
  price: 69,
  priceIncrementer: 1.5,
  cookiesPerSecond: 1,
};

shop.addItemForSale(grandma);
gameLoop.fetchSavedData();
cookieButton.addEventListener("click", () => {
  console.log("COOKIE");
  cookie.addCookies(1);
  console.log(cookie.cookies);
});
