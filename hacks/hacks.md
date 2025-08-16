---
layout: post
tailwind: True
title: Onboarding Challenges 
description: Interactive learning and adventures 
permalink: /hacks
lxdData:
  Title: "Learning Experience Designer Home"
  Description: "Explore LxD topics and interactive games to obtain mastery in collaboration, design thinking, and coding skills."
  Prequisites:
    - title: "GitHub Setup"
      link: "/setup/github"
    - title: "VSCode Basics"
      link: "/setup/vscode"
  Topics:
    - Title: "Agile Collaboration"
      Genre: "Teamwork"
      Level: 1
      Description: "Learn how to work effectively in coding teams using Agile methods."
      Categories: ["Agile", "Collaboration", "Sprint"]
      Game: "/gamify/end"
      Lessons: "/agile"
      Image: "/images/agile.webp"
      Alt: "Agile Collaboration Game"
    - Title: "RPG Game"
      Genre: "Educational"
      Level: "Intermediate"
      Description: "Learn the basics of JS and object oriented programming as you dive deep into the world of game coding. "
      Categories: ["JavaScript", "OOP", "Game Coding", "Marine Life"]
      Game: "/rpg/latest"
      Lessons: "/lesson/rpg"
      Image: "/images/toolkit-nav-buttons/rpg.png"
      Alt: "Underwater RPG Adventure"
      Author: "Jane Smith"
      KeyPoints:
        - "JavaScript fundamentals"
        - "Object-oriented programming"
        - "Interactive gameplay"
        - "Marine life encounters"
        - "Hands-on coding practice"
    - Title: "Design Thinking"
      Genre: "Creativity"
      Level: 1
      Description: "Practice problem-solving and innovation with design thinking activities."
      Categories: ["Design", "Innovation", "Empathy"]
      Game: "/gamify/adventureGame/"
      Lessons: "/sprints/week1"
      Image: "/images/design_think.png"
      Alt: "Design Thinking"
    - Title: "Debugging Challenge"
      Genre: "Problem Solving"
      Level: 2
      Description: "Sharpen your debugging skills with real-world coding puzzles."
      Categories: ["Debugging", "Logic", "Code Review"]
      Game: "/games/debug-challenge"
      Lessons: "/lessons/debug-challenge"
---

{%- include tailwind/lxd.html -%}
