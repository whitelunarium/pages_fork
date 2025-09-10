---
layout: lessonbase
title: OOP in Cookie Clicker
permalink: /oop/
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
