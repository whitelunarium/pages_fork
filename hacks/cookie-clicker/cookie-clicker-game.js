const shopContainer = document.getElementById("shop-container");
const autoClickerBtn = document.getElementById("autoClickerBtn");
const cookie = document.getElementById("cookie");
const cookieCountDisplay = document.getElementById("cookie-count");

const theCookie = {
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

theCookie.fetchStoredCookies();

cookie.addEventListener("click", () => {
  console.log("COOKIE");
  theCookie.addCookies(1);
  console.log(theCookie.cookies);
});
