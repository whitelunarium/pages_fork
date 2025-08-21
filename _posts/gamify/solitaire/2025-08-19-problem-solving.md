---
layout: post
title: Problem-Solving Through Solitaire
description: Learn systematic problem-solving strategies by examining how to build Solitaire step by step, breaking down complex challenges into manageable parts.
type: issues
comments: True
permalink: /solitaire/lesson/problem-solving
---

# Problem-Solving Through Solitaire

Programming is more than writing code — it’s about solving problems systematically. Solitaire (Klondike) is an excellent case study because it requires breaking down a complex game into smaller, solvable challenges.  

This lesson explores **problem-solving strategies** developers use while building Solitaire, from identifying subproblems to testing solutions.

---

## Why Solitaire for Problem-Solving?

- **Complex but familiar**: Rules are well-known, but coding them requires careful logic.  
- **Multiple interacting parts**: Cards, piles, moves, scoring — each introduces unique challenges.  
- **Step-by-step thinking**: You can’t solve everything at once; you must break it down.  

---

## Core Problem-Solving Strategies Demonstrated

### 1. **Decomposition** – Break Down the Problem

Large problems become manageable when split into smaller ones.  

**Example: Solitaire Decomposition**
- Cards → define properties (suit, rank, color, face-up)  
- Piles → manage groups of cards with rules  
- Moves → validate before executing  
- Game flow → deal, play, win conditions  

```javascript
// Start with the smallest piece
class Card {
  constructor(suit, rank, color, value) {
    this.suit = suit;
    this.rank = rank;
    this.color = color;
    this.value = value;
    this.faceUp = false;
  }
}
```

Key Insight: Instead of asking “How do I build Solitaire?”, ask “How do I represent a single card?” Then solve progressively larger problems.

### 2. Pattern Recognition – Spot Similarities

Looking for repeating structures helps simplify code and avoid duplication.

Example: Pile Patterns

- All piles hold cards
- All piles need push, pop, and top methods

Differences come from rules (canAccept)

```javascript
class Pile {
  constructor() {
    this.cards = [];
  }
  top() { return this.cards[this.cards.length - 1]; }
  push(card) { this.cards.push(card); }
}
```

Problem-Solving Benefit: Once you see patterns, you can create a reusable solution instead of solving the same problem multiple times.

### 3. Abstraction – Focus on the Big Picture

When rules get complicated, hide details behind simple interfaces.

Example: Move Validation

```javascript
game.tryMoveCard(cardId, targetPile) {
  const card = this.findCard(cardId);
  if (!card || !card.faceUp) return false;
  if (targetPile.canAccept(card)) {
    targetPile.push(card);
    return true;
  }
  return false;
}
```

Why it helps: You don’t need to re-check every rule every time — one clean method handles it.

### 4. Algorithmic Thinking – Design Step-by-Step Processes

Some problems require a logical sequence of actions.

Example: Dealing Cards
Shuffle the deck
For pile 1, place 1 card (face up)
For pile 2, place 2 cards (last face up)

Continue until pile 7

```javascript
function deal(deck, tableau) {
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = deck.pop();
      tableau[j].push(card);
      if (j === i) card.faceUp = true;
    }
  }
}
```

Key Idea: Algorithms give structure to otherwise messy tasks.

### 5. Debugging and Iteration – Test, Fail, Refine

No solution works perfectly the first time. Debugging means testing assumptions, finding mistakes, and improving.

Example Debugging Process

Problem: Kings aren’t stacking correctly in the tableau
Hypothesis: Rule in canAccept() is wrong
Test: Log values of top() and card
Fix: Ensure value === top.value - 1 instead of +1

```javascript
if (this.isEmpty) return card.rank === 'K';
return (card.color !== top.color && card.value === top.value - 1);
```
---
### Learning Exercises

#### Exercise 1: Break Down a New Feature

Write out the steps you would need to implement an “Undo Move” feature.
(Hint: What information do you need to save each time a move is made?)

#### Exercise 2: Spot Patterns

Look at the rules for FoundationPile and TableauPile. What similarities exist? How could you reuse code to avoid repetition?

#### Exercise 3: Debugging Challenge

Suppose cards sometimes disappear when moved between piles.

What would you check first?

How would you test if the bug comes from pop() or push()?

### Problem-Solving Benefits Demonstrated

- **Clarity** – Decomposition helps focus on one piece at a time  
- **Efficiency** – Pattern recognition reduces duplicate work  
- **Simplicity** – Abstraction hides messy details  
- **Precision** – Algorithms provide step-by-step structure  
- **Resilience** – Debugging builds persistence and adaptability  

---

### Common Mistakes to Avoid

- **Trying to solve everything at once** → Leads to confusion and messy code  
- **Copy-pasting instead of recognizing patterns** → Hard to maintain later  
- **Ignoring testing** → Bugs multiply if unchecked  
- **Overcomplicating early** → Start simple, add complexity gradually  

---

### Conclusion

Building Solitaire is a lesson in problem-solving as much as it is about programming. By applying **decomposition, pattern recognition, abstraction, algorithmic thinking, and debugging**, we learn how to tackle complex challenges systematically.

---

## Popcorn Hacks 🎉

1. **Trace the Deal**  
   Add `console.log()` statements inside your `deal()` function to print which card goes to which pile. Watch how decomposition and algorithmic thinking come together.

2. **Bug Hunt**  
   Intentionally break `canAccept()` (e.g., flip the `+1` and `-1` rule) and see how the game misbehaves. Then, use debugging steps to fix it.

3. **Undo Plan**  
   Sketch (or code) how you would implement an `undo()` feature: what data needs to be saved with each move, and how would you roll it back?

4. **Pattern Refactor**  
   Take `FoundationPile` and `TableauPile` and extract shared logic into the base `Pile` class. Notice how pattern recognition reduces duplication.

5. **Algorithm Twist**  
   Change the `deal()` function to create a “reverse Solitaire” where piles are built from right to left. How does this affect the algorithm?

6. **Debugging Drill**  
   Write a tiny test that moves a card from one pile to another. Print the length of both piles before and after. Use this to check if `pop()` and `push()` behave correctly.

7. **Stretch Hack**  
   Add a simple “hint” system: loop through all piles and log where the top card *could* legally move. This combines abstraction, algorithms, and debugging.
