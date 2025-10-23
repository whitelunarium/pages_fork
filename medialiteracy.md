---
layout: post 
title: Media Literacy Plan
description: A storyboard for our Media Literacy Plan 
permalink: /medialiteracy/plan 
hide: true
---

**Media Literacy Planet – Game Plan (Simple Storyboard)**

***Goal:***
Protect your spaceship and save Media Literacy Planet from invaders spreading misinformation by completing 3 missions.

Game Setup

Main Background: Space with a glowing planet and small floating invaders
Sprites:
- Spaceship (player)
- Invaders (fake news)
- Headline boxes (used in missions)
- Vault (final goal)

Variables:
- `mission (1–3)`
- `score`
- `shieldLevel`

**Mission 1 – Awareness**

*Objective:* Learn what media literacy means and why fake news is harmful.
*Background:* Control room with screens showing different types of media.
*Story:* The planet’s news systems have been infiltrated! Build your first shield by understanding what media literacy means.

Activity:
- Click each floating media icon (TV, social media, news site, ad).
- After clicking all 4, a message pops up: “Media literacy helps you think critically about what you see and hear.”
- Shield 1 appears (one glowing ring around spaceship).

Easy to code:
Use “when this sprite clicked → hide → change shieldLevel by 1.”

**Mission 2 – Bias Detector**

*Objective:* Spot bias and framing in news headlines.
*Background:* Static-filled sky with glitchy “news” boxes.
*Story:* The invaders are twisting our signals! Calibrate your sensors by sorting headlines by bias.

Activity:
- Show news sources.
- Player drags each one to one of three boxes: Liberal, Conservative, or Neutral.
- When all are placed, show “Bias Detector Calibrated!”
- Shield 2 appears.

Easy to code:
Use “drag and drop” or simple multiple-choice clicks.

**Mission 3 – Truth Scanner**

*Objective:* Tell real from fake news.
*Background:* Space vault scene with number pad lock.
*Story:* The final attack! Separate real from fake stories to unlock the vault and save the planet.

Activity:
- Show 5 short “news snippets" displayed in a webpage (shows url and other info)
- Click “Real” or “Fake” buttons under each one.
- Each correct answer gives a number (like 4, 2, or 7).
- When all correct → player enters code → vault opens → confetti animation!

Easy to code:
- Keep a score variable.
- When all correct: “broadcast vaultUnlocked.”
- “When I receive vaultUnlocked → show win screen.”

Ending Scene
Background: Media Literacy Planet glowing and safe.
Text: “You’ve defended Media Literacy Planet! Always check your sources.”
Option: “Play again” or "Move on to next challenge”

Easy to code:
Show a “You Win!” screen sprite and hide others.

**Optional Add-Ons (continue adding to this):**
Add sound: “shield up!” noise when finishing a mission.
