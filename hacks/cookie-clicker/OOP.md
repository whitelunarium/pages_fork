---
layout: lessonbase
title: OOP in Cookie Clicker
permalink: /cookie-clicker-game-docs/oop
sidebar: true
wide: true
sidebar_title: Cookie Clicker
lesson_links: [{url: /cookie-clicker-game-docs, text: 1. Introduction}, {url: /cookie-clicker-game-docs/oop, text: 2. OOP}, {url: /cookie-clicker-game-docs/class-architecture, text: 3. Classes}, {url: /cookie-clicker-game-docs/localstorage, text: 4. Localstorage},{url: /cookie-clicker-game-docs/quiz, text: 5. OOP Quiz}]
enable_progress: true
---

# Part 2 — 🧱 OOP (All object-oriented content)

### What is OOP?
- **OOP** = Object-Oriented Programming.
- **Object**: thing with **properties** (data) + **methods** (actions).
- **Class**: a **blueprint** that defines what objects look like.

### Why OOP in Cookie Clicker?
- Cookie, upgrades, shop, and player are all **objects**.
- OOP makes code **organized**, **extendable**, and **easier to maintain**.

### OOP Concepts Used
- **Class** → e.g., `Upgrade`
- **Object (Instance)** → e.g., “Golden Cursor”
- **Properties** → `name`, `cost`, `multiplier`, `owned`
- **Methods** → `canBuy()`, `buy()`
- **Encapsulation** → each object manages its own data and logic

### Example Student Tasks
1. Make an `Upgrade` class with `name`, `cost`, `multiplier`, `owned`.
2. Add `canBuy()` and `buy()` with an **if statement** to check cost.
3. Create at least **two instances** (e.g., “Metal Spoon”, “Golden Cursor”).
4. (Tie-in with Part 1) Save & load these objects with localStorage.

---

### Example of OOP in the Game

Here is an example of how we implemented OOP (Object-Oriented Programming) in Cookie Clicker.  
The `EmojiBuddy` class is responsible for creating and animating emojis that bounce around the game area whenever items are purchased.


```js
class EmojiBuddy {
  /**
   * velocity on the y axis
   * @type {number}
   */
  dy = 2;
  /**
   * velocity on the x axis
   * @type {number}
   */
  dx = 2;
  /**
   *
   * @param {string} emoji
   */
  constructor(emoji) {
    this.emojiString = emoji;
    this.animate = this.animate.bind(this);
  }
}
```

```mermaid
flowchart TD
    A[Game Start] --> B[Load Objects from localStorage]
    B -->|Exists| C[Recreate Objects from JSON]
    B -->|"No Save Found"| D[Create New Objects from Classes]

    C --> E[Objects in Memory: Upgrades, Shop, Cookie]
    D --> E

    subgraph UpgradeClass["Upgrade Class"]
        U1["Properties: name, cost, multiplier, owned"]
        U2["Method: canBuy()"]
        U3["Method: buy()"]
        U1 --> U2
        U1 --> U3
    end

    E --> F[Player Action]
    F -->|"Click Cookie"| G[Cookie Count Increases]
    F -->|"Buy Upgrade"| H{"upgrade.canBuy() ?"}   

    H -->|"No"| I[Show Message: Not Enough Cookies]
    H -->|"Yes"| J["upgrade.buy() Method Runs"]

    J --> K[Change State: cost ↑, owned ↑, power ↑]
    K --> L[Save Objects to localStorage]
    I --> L
    G --> L

    L --> E
```
