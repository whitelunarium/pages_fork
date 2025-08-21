---
layout: post
title: Object-Oriented Programming (OOP) Concepts Through Solitaire
description: Learn fundamental OOP principles by examining a complete Klondike Solitaire implementation - from simple Card objects to complex game mechanics.
type: issues
comments: True
permalink: /solitaire/lesson/oop
---

# Object-Oriented Programming Through Solitaire

Understanding Object-Oriented Programming (OOP) becomes clearer when we examine a real, working application. This lesson uses a complete Klondike Solitaire game to demonstrate core OOP concepts in action.

## Why Solitaire for OOP?

Solitaire is an excellent example for learning OOP because it naturally maps to object-oriented thinking:
- **Cards** are individual objects with properties and behaviors
- **Piles** are collections that manage cards with specific rules
- **Game logic** coordinates all objects following established patterns
- **User interface** demonstrates separation of concerns

## Core OOP Concepts Demonstrated

### 1. Classes and Objects

**Classes** are blueprints that define what objects will look like and how they behave. **Objects** are specific instances created from those classes.

#### Card Class - The Foundation
```javascript
class Card {
    constructor(suit, rank, color, value) {
        this.suit = suit;     // '♠', '♣', '♦', '♥'
        this.rank = rank;     // 'A', '2', ... 'K'
        this.color = color;   // 'red' | 'black'
        this.value = value;   // 1..13
        this.faceUp = false;
        this.id = `${rank}${suit}`;
    }
}
```

**Key Points:**
- Cards as objects: Each playing card becomes a distinct object with its own properties
- Properties store state: suit, rank, color, value, face-up status
- Unique identity: Each card has a unique ID for tracking
- Constructor pattern: All cards created the same way with different data

**Real-world Connection:** Just like physical cards have suits and ranks, our Card objects encapsulate these same properties digitally.

#### Creating Card Objects
```javascript
// Each card is an individual object
const aceOfSpades = new Card('♠', 'A', 'black', 1);
const kingOfHearts = new Card('♥', 'K', 'red', 13);

// Multiple objects from the same class
const deck = new Deck(); // Contains 52 unique Card objects
```

### 2. Encapsulation

Encapsulation means keeping data and methods that work on that data together, while controlling access to internal details.

#### Pile Base Class
```javascript
class Pile {
    constructor(type) {
        this.type = type;
        this.cards = [];  // Internal data - array of Card objects
    }
    
    // Public methods that control access to internal data
    top() { return this.cards[this.cards.length - 1]; }
    push(card) { this.cards.push(card); }
    pop(n = 1) {
        if (n === 1) return this.cards.pop();
        return this.cards.splice(-n, n);
    }
    get isEmpty() { return this.cards.length === 0; }
}
```

**Key Points:**
- Private data: The `cards` array is internal to each pile
- Public interface: Methods like `top()`, `push()`, `pop()` provide controlled access
- Data protection: External code can't directly manipulate the cards array
- Getter methods: `isEmpty` provides computed properties

**Benefits:**
- Prevents invalid states (e.g., negative card counts)
- Makes code easier to maintain and debug
- Allows internal implementation changes without breaking external code

### 3. Inheritance

Inheritance allows classes to share common functionality while adding their own specific behaviors.

#### Specialized Pile Classes
```javascript
// Base class with common functionality
class Pile {
    constructor(type) {
        this.type = type;
        this.cards = [];
    }
    // ... common methods
}

// Foundation pile inherits from Pile and adds specific rules
class FoundationPile extends Pile {
    constructor() { 
        super('foundation');  // Call parent constructor
    }
    
    // Specific rule for foundation piles
    canAccept(card) {
        if (this.isEmpty) return card.rank === 'A';  // Must start with Ace
        const top = this.top();
        return (card.suit === top.suit && card.value === top.value + 1);
    }
}

// Tableau pile has different rules
class TableauPile extends Pile {
    constructor() { 
        super('tableau'); 
    }
    
    // Different rule for tableau piles
    canAccept(card) {
        if (this.isEmpty) return card.rank === 'K';  // Must start with King
        const top = this.top();
        return (card.color !== top.color && card.value === top.value - 1);
    }
}
```

**Key Points:**
- Code reuse: All piles share basic functionality (push, pop, top, isEmpty)
- Specialization: Each pile type adds its own specific rules
- `super()` keyword: Calls the parent class constructor
- Method overriding: Child classes can provide their own implementations

**Real-world Connection:** Different pile types in Solitaire follow different rules, but they're all still piles of cards.

### 4. Polymorphism

Polymorphism allows different objects to respond to the same method call in their own appropriate way.

#### Polymorphic Pile Behavior
```javascript
// Array containing different types of pile objects
const allPiles = [
    new FoundationPile(),  // Foundation rules: same suit, ascending
    new TableauPile(),     // Tableau rules: alternating colors, descending
    new StockPile(),       // Stock rules: specific to stock behavior
    new WastePile()        // Waste rules: specific to waste behavior
];

// Same method call works on all pile types
allPiles.forEach(pile => {
    if (pile.canAccept && pile.canAccept(selectedCard)) {
        pile.push(selectedCard);  // Each pile handles this differently
    }
});
```

**Key Points:**
- Same interface: All piles respond to `canAccept()` and `push()` methods
- Different behavior: Each pile type implements its own rules
- Runtime decision: The correct behavior is chosen at runtime based on object type
- Code flexibility: New pile types can be added without changing existing code

### 5. Abstraction

Abstraction hides complex implementation details behind simple interfaces.

#### Game Controller Abstraction
```javascript
class Game {
    // Simple public method hides complex logic
    tryMoveCardById(cardId, targetKind, targetIndex) {
        const loc = this.findCard(cardId);           // Find card location
        if (!loc || !loc.card.faceUp) return false; // Validate move
        
        const targetPile = this.getPile(targetKind, targetIndex);
        if (!targetPile) return false;
        
        // Complex logic hidden behind simple interface
        if (targetPile.canAccept(loc.card)) {
            this._moveCards(loc.pile, targetPile, 1);
            this.addScore(10);
            this._afterMove(loc.pile);
            return true;
        }
        return false;
    }
    
    // Private helper methods (abstraction)
    _moveCards(fromPile, toPile, count) { /* complex implementation */ }
    _afterMove(sourcePile) { /* complex implementation */ }
}
```

**Key Points:**
- Simple interface: `tryMoveCardById()` hides complexity behind a simple method call
- Internal complexity: Multiple validation steps, rule checking, score updates
- Private methods: Helper methods (prefixed with `_`) are implementation details
- User-friendly: External code doesn't need to know the internal complexity

### 6. Composition

Composition means building complex objects by combining simpler ones.

#### Game Class Composition
```javascript
class Game {
    constructor(ui) {
        // Game is composed of multiple other objects
        this.ui = ui;                    // User interface object
        this.stock = new StockPile();    // Stock pile object
        this.waste = new WastePile();    // Waste pile object
        
        // Array of foundation pile objects
        this.foundations = [
            new FoundationPile(), new FoundationPile(), 
            new FoundationPile(), new FoundationPile()
        ];
        
        // Array of tableau pile objects
        this.tableau = [
            new TableauPile(), new TableauPile(), new TableauPile(),
            new TableauPile(), new TableauPile(), new TableauPile(),
            new TableauPile()
        ];
        
        // Other composed objects
        this.deck = null;
        this.moves = [];
        this.timer = { start: 0, intervalId: null };
    }
}
```

**Key Points:**
- Complex from simple: Game object combines many simpler objects
- "Has-a" relationship: Game has piles, has a deck, has a UI
- Delegation: Game delegates pile-specific operations to pile objects
- Modular design: Each component can be developed and tested independently

## Advanced OOP Patterns in the Game

### Model-View-Controller (MVC) Pattern

The solitaire game demonstrates the MVC architectural pattern:

```javascript
// MODEL: Game logic and data
class Game {
    // Manages game state, rules, scoring
}

// VIEW: User interface presentation  
class UI {
    // Handles rendering, user input display
}

// CONTROLLER: Coordinates Model and View
class Controller {
    constructor(game, ui) {
        this.game = game;  // Reference to model
        this.ui = ui;      // Reference to view
    }
    
    // Handles user actions, updates model, refreshes view
    handleCardClick(cardId) {
        if (this.game.autoMoveToFoundation(cardId)) {
            this.ui.renderPiles(this.game);
        }
    }
}
```

**Benefits:**
- Separation of concerns: Each class has a single responsibility
- Maintainability: Changes to one layer don't affect others
- Testability: Each component can be tested independently
- Reusability: Components can be reused in different contexts

### Factory Pattern

The Deck class demonstrates the Factory pattern:

```javascript
class Deck {
    build() {
        this.cards = [];
        // Factory creates all card objects
        for (const s of this.suits) {
            for (const r of this.ranks) {
                this.cards.push(new Card(s, r, this.suitColors[s], this.ranks.indexOf(r) + 1));
            }
        }
    }
}
```

## Learning Exercises

### Exercise 1: Extend the Card Class
Add a method to the Card class that returns a description:
```javascript
class Card {
    // ... existing code ...
    
    describe() {
        return `${this.rank} of ${this.suit} (${this.color})`;
    }
    
    isRed() {
        return this.color === 'red';
    }
    
    canStackOn(otherCard) {
        // Implement tableau stacking rules
        return this.color !== otherCard.color && this.value === otherCard.value - 1;
    }
}
```

### Exercise 2: Create a New Pile Type
Design a new pile type with unique rules:
```javascript
class ScorePile extends Pile {
    constructor() {
        super('score');
        this.multiplier = 1;
    }
    
    canAccept(card) {
        // Only accept face cards (J, Q, K)
        return ['J', 'Q', 'K'].includes(card.rank);
    }
    
    push(card) {
        super.push(card);
        // Award bonus points for face cards
        return card.value * this.multiplier;
    }
}
```

### Exercise 3: Add Game Statistics
Extend the Game class with a statistics tracker:
```javascript
class GameStats {
    constructor() {
        this.moves = 0;
        this.undos = 0;
        this.hints = 0;
        this.startTime = Date.now();
    }
    
    recordMove(moveType) {
        this.moves++;
        // Track different types of moves
    }
}

class Game {
    constructor(ui) {
        // ... existing code ...
        this.stats = new GameStats();  // Composition
    }
}
```

## OOP Benefits Demonstrated

### 1. **Maintainability**
- Each class has a single, clear purpose
- Changes to rules affect only specific classes
- Bug fixes are localized to relevant objects

### 2. **Scalability** 
- New card games can reuse Card and Pile classes
- Additional pile types can be added without changing existing code
- Game variations can extend the base Game class

### 3. **Testability**
- Each class can be tested independently
- Mock objects can simulate complex interactions
- Unit tests can verify specific behaviors

### 4. **Code Reuse**
- Base Pile class provides common functionality
- Card class can be used in any card game
- UI patterns can be applied to other games

## Common OOP Mistakes to Avoid

### 1. **God Classes**
```javascript
// BAD: One class doing everything
class SolitaireGame {
    // 500+ lines handling cards, UI, rules, scoring, etc.
}

// GOOD: Separate responsibilities
class Game { /* game logic */ }
class UI { /* user interface */ }
class Card { /* card behavior */ }
```

### 2. **Inappropriate Inheritance**
```javascript
// BAD: Inheritance for convenience
class RedCard extends Card { /* only for red cards */ }

// GOOD: Use properties instead
class Card {
    constructor(suit, rank, color, value) {
        this.color = color;  // Property handles this better
    }
}
```

### 3. **Breaking Encapsulation**
```javascript
// BAD: Direct access to internal data
game.tableau[0].cards.push(someCard);

// GOOD: Use proper methods
game.tableau[0].push(someCard);
```

## Conclusion

The Solitaire game demonstrates that OOP isn't just academic theory—it's a practical approach to building maintainable, scalable software. By organizing code into logical objects with clear responsibilities, we create systems that are easier to understand, modify, and extend.

Key takeaways:
- **Objects model real-world entities** (cards, piles, games)
- **Classes provide reusable blueprints** for creating similar objects
- **Inheritance enables code reuse** while allowing specialization
- **Encapsulation protects data** and provides clean interfaces
- **Polymorphism allows flexible, extensible designs**
- **Composition builds complex systems** from simpler parts

Whether you're building games, web applications, or enterprise software, these OOP principles will help you write better, more maintainable code.