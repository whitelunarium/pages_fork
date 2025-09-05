---
layout: post
title: Interactive Lesson System - Developer Guide
description: Learn how to add custom interactive features to the lesson system using frontmatter configuration and JavaScript blocks
type: issues
comments: true
permalink: /lesson-system-guide
---

# Interactive Lesson System - Developer Guide

## How the System Works

The lesson system is built around a base layout (`lessonbase.html`) that provides a consistent structure for all lessons. Features are activated through frontmatter configuration in individual lesson files.

### Basic Architecture

Lesson File (.md) → Frontmatter Configuration → lessonbase.html → Rendered Page

The base layout checks for specific frontmatter variables and conditionally includes features based on those settings.

## Adding Your Own Interactive Blocks

### Step 1: Create Your Feature Block

Create your feature as a conditional block in `lessonbase.html`:

{% raw %}
```html
<!-- Your Feature Block -->
{% if page.enable_your_feature %}
<div class="your-feature-container">
    <h4>{{ page.your_feature_title | default: "Default Title" }}</h4>
    <!-- Your HTML content -->
    <div id="your-feature-content">
        {{ page.your_feature_data }}
    </div>
    <button id="your-feature-button">Action Button</button>
</div>
{% endif %}
```
{% endraw %}

### Step 2: Add JavaScript Support

In `lessonbase.js`, add your feature using the IIFE pattern like existing features:

```javascript
// -------------------- YOUR FEATURE --------------------
(function () {
  const button = document.getElementById('your-feature-button');
  const content = document.getElementById('your-feature-content');
  if (!button || !content) return;

  const lessonKey = window.location.pathname.split("/").pop() || "lesson";
  
  button.addEventListener('click', () => {
    // Your feature logic here
    console.log('Feature activated for:', lessonKey);
    
    // Example: Save data to localStorage
    localStorage.setItem(`your-feature-${lessonKey}`, 'some data');
    
    // Example: Trigger badge unlock
    unlockBadge(lessonKey);
  });
})();
```

### Step 3: Add CSS Styling

In `lessonbase.css`, style your feature:

```css
.your-feature-container {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

#your-feature-content {
    background: #f9f9f9;
    padding: 0.5rem;
}
```

## Frontmatter Configuration

To use your feature in a lesson, add the configuration to the frontmatter:

```yaml
---
layout: lessonbase
title: "Your Lesson Title"

# Enable your feature
enable_your_feature: true
your_feature_title: "Custom Title"
your_feature_data: "Your data here"
---
```

## Complete Working Example

### 1. HTML Block (in lessonbase.html)
{% raw %}
```html
{% if page.enable_calculator %}
<div class="calculator-widget">
    <h4>🧮 {{ page.calculator_title | default: "Calculator" }}</h4>
    <input type="number" id="calc-input1" placeholder="First number">
    <select id="calc-operation">
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">×</option>
        <option value="divide">÷</option>
    </select>
    <input type="number" id="calc-input2" placeholder="Second number">
    <button id="calc-button">Calculate</button>
    <div id="calc-result"></div>
</div>
{% endif %}
```
{% endraw %}

### 2. JavaScript (in lessonbase.js)
```javascript
// -------------------- CALCULATOR WIDGET --------------------
(function () {
  const button = document.getElementById('calc-button');
  const result = document.getElementById('calc-result');
  if (!button || !result) return;

  const lessonKey = window.location.pathname.split("/").pop() || "lesson";

  button.addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('calc-input1').value);
    const num2 = parseFloat(document.getElementById('calc-input2').value);
    const operation = document.getElementById('calc-operation').value;
    
    let answer;
    switch(operation) {
      case 'add': answer = num1 + num2; break;
      case 'subtract': answer = num1 - num2; break;
      case 'multiply': answer = num1 * num2; break;
      case 'divide': answer = num1 / num2; break;
    }
    
    result.innerHTML = `Result: ${answer}`;
    
    // Save calculation to localStorage
    localStorage.setItem(`calc-last-${lessonKey}`, answer);
    
    // Unlock badge after first calculation
    unlockBadge(lessonKey);
  });
})();
```

### 3. CSS (in lessonbase.css)
```css
.calculator-widget {
    background: #f0f8ff;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    border: 2px solid #4a90e2;
}

.calculator-widget input, .calculator-widget select, .calculator-widget button {
    margin: 0.25rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

#calc-result {
    margin-top: 1rem;
    font-weight: bold;
    color: #2c5aa0;
}
```

### 4. Frontmatter Usage
```yaml
---
layout: lessonbase
title: "Math Lesson"

# Enable calculator
enable_calculator: true
calculator_title: "Practice Calculator"
---

# Math Concepts

Use the calculator below to practice:
```

## Existing Feature Patterns

### Simple Toggle Features
```yaml
enable_timer: true          # Shows/hides timer
enable_progress: true       # Shows/hides progress bar
enable_badges: true         # Shows/hides badge system
```

### Features with Configuration
{% raw %}
```yaml
enable_sandbox: true
sandbox_code: |             # Multi-line YAML content
  console.log("Default code");
  // Students can edit this
```
{% endraw %}

### List-based Features
```yaml
lesson_links:               # Array of objects
  - { text: "Lesson 1", url: "/lesson1" }
  - { text: "Lesson 2", url: "/lesson2" }

resources:                  # Another array example
  - { text: "MDN Docs", url: "https://developer.mozilla.org" }
  - { text: "Tutorial", url: "https://example.com" }
```

## Built-in Functions Available

The `lessonbase.js` provides several utilities you can use in your features:

### Badge System
```javascript
unlockBadge(lessonKey);  // Triggers badge popup and saves to localStorage
```

### Lesson Identification
```javascript
const lessonKey = window.location.pathname.split("/").pop() || "lesson";
```

### Data Persistence Patterns
```javascript
// Save lesson-specific data
localStorage.setItem(`feature-${lessonKey}`, data);

// Load lesson-specific data  
const saved = localStorage.getItem(`feature-${lessonKey}`);

// Save global data
localStorage.setItem('feature-global', data);
```

## Best Practices

### 1. Use IIFE Pattern
Follow the existing pattern for JavaScript features:
```javascript
// -------------------- YOUR FEATURE --------------------
(function () {
  const element = document.getElementById('your-element');
  if (!element) return; // Exit early if element doesn't exist
  
  // Your code here
})();
```

### 2. Use Conditional Blocks in HTML
Always wrap your features in conditional statements:
{% raw %}
```html
{% if page.enable_feature %}
  <!-- Feature content -->
{% endif %}
```
{% endraw %}

### 3. Provide Default Values
Use the `default` filter for optional configuration:
{% raw %}
```html
<h4>{{ page.feature_title | default: "Default Title" }}</h4>
```
{% endraw %}

### 4. Namespace Your Features
Use consistent prefixes for IDs and classes:
```html
<div class="myfeature-container">
    <button id="myfeature-button">Click</button>
</div>
```

### 5. Use Lesson-Specific Storage
Make data persistent per lesson:
```javascript
const lessonKey = window.location.pathname.split("/").pop() || "lesson";
localStorage.setItem(`feature-${lessonKey}`, data);
```

## Quick Reference

| Pattern | Usage |
|---------|--------|
| Simple toggle | `enable_feature: true` |
| Custom text | `feature_title: "My Title"` |
| Multi-line content | `feature_content: \|` (followed by indented content) |
| Arrays | Use `- { key: value }` format |
| Default values | Use `default` filter in HTML |

This system allows anyone to easily add new interactive features to lessons by following these patterns.