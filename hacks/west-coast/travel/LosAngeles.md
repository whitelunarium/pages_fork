---
layout: post
title: "Los Angeles"
description: "Submodule 1 of Analytics/Admin Mini-Quest"
permalink: /west-coast/analytics/submodule_1/
parent: "Analytics/Admin"
team: "Curators"
submodule: 1
categories: [CSP, Submodule, Analytics/Admin]
tags: [analytics, submodule, curators]
author: "Curators Team"
date: 2025-10-21
---

# Los AngEles 

## Content Coming Soon
This submodule will be developed by the Cool COllaboarters team. hello
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LA Adventure</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .game-container {
            width: 90%;
            max-width: 900px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            position: relative;
        }

        .screen {
            display: none;
            padding: 40px;
            min-height: 500px;
        }

        .screen.active {
            display: block;
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
            color: #555;
            text-align: center;
            margin-bottom: 30px;
            font-size: 1.8em;
        }

        .description {
            text-align: center;
            margin-bottom: 40px;
            font-size: 1.2em;
            color: #666;
            line-height: 1.6;
        }

        .options {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 600px;
            margin: 0 auto;
        }

        .option-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 20px 30px;
            font-size: 1.2em;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .option-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        /* Travel Animation - Simple */
        .travel-animation {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #87CEEB 0%, #98D8C8 100%);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .travel-animation.active {
            display: flex;
        }

        .simple-car {
            width: 80px;
            height: 40px;
            background: #ff2222;
            border-radius: 10px;
            position: relative;
            animation: carShake 0.3s ease-in-out infinite;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        @keyframes carShake {
            0%, 100% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
        }

        .simple-car::before {
            content: '';
            position: absolute;
            width: 35px;
            height: 25px;
            background: #6dd5ed;
            border-radius: 5px;
            top: -15px;
            left: 10px;
        }

        .simple-wheel {
            width: 18px;
            height: 18px;
            background: #333;
            border-radius: 50%;
            position: absolute;
            bottom: -5px;
            animation: wheelRotate 0.5s linear infinite;
        }

        .simple-wheel:first-of-type { left: 5px; }
        .simple-wheel:last-of-type { right: 5px; }

        @keyframes wheelRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .road-lines-simple {
            position: absolute;
            bottom: 45%;
            width: 100%;
            height: 8px;
            background: repeating-linear-gradient(
                to right,
                white 0px,
                white 40px,
                transparent 40px,
                transparent 80px
            );
            animation: lineMove 1s linear infinite;
        }

        @keyframes lineMove {
            from { transform: translateX(-80px); }
            to { transform: translateX(0); }
        }

        .travel-text {
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2em;
            color: white;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
            animation: pulse 1.5s ease-in-out infinite;
            font-weight: bold;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        /* Location Animation Container */
        .location-animation {
            width: 100%;
            height: 400px;
            position: relative;
            margin: 20px 0;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        /* Hollywood Walk of Fame */
        .hollywood-scene {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #87CEEB 0%, #B0D4E3 100%);
            position: relative;
            overflow: hidden;
        }

        /* Many store buildings */
        .store {
            position: absolute;
            bottom: 120px;
            width: 90px;
            height: 180px;
            background: linear-gradient(to bottom, #FF6B9D 0%, #C44569 100%);
            border: 4px solid #922B3E;
            border-radius: 5px 5px 0 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .store:nth-child(11) { 
            left: 2%; 
            background: linear-gradient(to bottom, #4ECDC4 0%, #44A09D 100%); 
            border-color: #2E7D7B;
            height: 160px;
        }
        .store:nth-child(12) { 
            left: 13%; 
            background: linear-gradient(to bottom, #FFD93D 0%, #FFC107 100%); 
            border-color: #E6A806;
            height: 200px;
        }
        .store:nth-child(13) { 
            left: 24%; 
            background: linear-gradient(to bottom, #A8E6CF 0%, #7BC8A4 100%); 
            border-color: #5FA883;
            height: 170px;
        }
        .store:nth-child(14) { 
            left: 35%; 
            background: linear-gradient(to bottom, #FF8C94 0%, #E65A63 100%); 
            border-color: #C24047;
            height: 190px;
        }
        .store:nth-child(15) { 
            left: 46%; 
            background: linear-gradient(to bottom, #B19CD9 0%, #9370DB 100%); 
            border-color: #6A4C93;
            height: 175px;
        }
        .store:nth-child(16) { 
            left: 57%; 
            background: linear-gradient(to bottom, #FFB347 0%, #FF8C42 100%); 
            border-color: #CC6F35;
            height: 185px;
        }
        .store:nth-child(17) { 
            left: 68%; 
            background: linear-gradient(to bottom, #77DD77 0%, #58B368 100%); 
            border-color: #3E8E51;
            height: 165px;
        }
        .store:nth-child(18) { 
            right: 13%; 
            background: linear-gradient(to bottom, #AEC6CF 0%, #87A9C4 100%); 
            border-color: #5E7D96;
            height: 195px;
        }
        .store:nth-child(19) { 
            right: 2%; 
            background: linear-gradient(to bottom, #F49AC2 0%, #E57AA8 100%); 
            border-color: #B85F85;
            height: 180px;
        }

        .store-window {
            width: 35px;
            height: 40px;
            background: linear-gradient(135deg, #87CEEB 0%, #4682B4 100%);
            border: 3px solid #2E5F8A;
            border-radius: 5px;
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: inset 0 2px 8px rgba(255,255,255,0.5);
        }

        .store-door {
            width: 30px;
            height: 50px;
            background: linear-gradient(to bottom, #8B4513 0%, #654321 100%);
            border: 3px solid #4A2511;
            border-radius: 5px 5px 0 0;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }

        .store-awning {
            width: 110px;
            height: 20px;
            background: repeating-linear-gradient(
                90deg,
                #FF6B6B 0px,
                #FF6B6B 20px,
                #FFF 20px,
                #FFF 40px
            );
            position: absolute;
            top: -5px;
            left: -5px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        }

        .sidewalk-cartoon {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 120px;
            background: linear-gradient(to bottom, #D2B48C 0%, #A0826D 100%);
            border-top: 4px solid #8B7355;
        }

        .star-cartoon {
            position: absolute;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            bottom: 30px;
            animation: slideStars 10s linear infinite;
            filter: drop-shadow(0 0 10px rgba(255,215,0,0.6));
        }

        .star-cartoon:nth-child(1) { left: -100px; animation-delay: 0s; }
        .star-cartoon:nth-child(2) { left: -100px; animation-delay: 2.5s; }
        .star-cartoon:nth-child(3) { left: -100px; animation-delay: 5s; }
        .star-cartoon:nth-child(4) { left: -100px; animation-delay: 7.5s; }

        @keyframes slideStars {
            0% { transform: translateX(0); }
            100% { transform: translateX(1100px); }
        }

        .celebrity {
            position: absolute;
            bottom: 120px;
            width: 40px;
            height: 90px;
            animation: walkPeople 8s linear infinite;
        }

        .celebrity:nth-child(1) { left: -50px; animation-delay: 0s; }
        .celebrity:nth-child(2) { left: -50px; animation-delay: 2s; }

        @keyframes walkPeople {
            0% { left: -50px; }
            100% { left: 110%; }
        }

        .celebrity-head {
            width: 35px;
            height: 35px;
            background: linear-gradient(135deg, #FFE0BD 0%, #FFCBA4 100%);
            border-radius: 50%;
            margin: 0 auto;
            border: 3px solid #CC9966;
        }

        .celebrity:nth-child(2) .celebrity-head {
            background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
            border-color: #4A2511;
        }

        .celebrity-body {
            width: 40px;
            height: 30px;
            background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
            margin: 3px auto;
            border-radius: 8px;
            border: 3px solid #2E5F8A;
        }

        .celebrity:nth-child(2) .celebrity-body {
            background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
            border-color: #922B21;
        }

        .celebrity-legs {
            width: 12px;
            height: 25px;
            background: #2C3E50;
            position: absolute;
            bottom: 0;
            border-radius: 3px;
            border: 2px solid #000;
        }

        .celebrity-legs.left { left: 12px; }
        .celebrity-legs.right { right: 12px; }

        .paparazzi {
            position: absolute;
            bottom: 120px;
            width: 35px;
            height: 75px;
            animation: walkPaparazzi 12s linear infinite;
        }

        .paparazzi:nth-child(6) { left: -50px; animation-delay: 4s; }
        .paparazzi:nth-child(7) { left: -50px; animation-delay: 7s; }

        @keyframes walkPaparazzi {
            0% { left: -50px; }
            100% { left: 110%; }
        }

        .camera-flash {
            position: absolute;
            width: 20px;
            height: 20px;
            background: #FFD700;
            border-radius: 50%;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            animation: flashBurst 1.5s ease-in-out infinite;
            box-shadow: 0 0 20px #FFD700;
        }

        .paparazzi:nth-child(7) .camera-flash {
            animation-delay: 0.5s;
        }

        @keyframes flashBurst {
            0%, 90%, 100% { opacity: 0; transform: translateX(-50%) scale(0); }
            95% { opacity: 1; transform: translateX(-50%) scale(2); }
        }

        .paparazzi-head {
            width: 28px;
            height: 28px;
            background: #FFE0BD;
            border-radius: 50%;
            margin: 0 auto;
            border: 3px solid #CC9966;
        }

        .paparazzi-body {
            width: 32px;
            height: 28px;
            background: #333;
            margin: 2px auto;
            border-radius: 6px;
            border: 2px solid #000;
        }

        .crowd-member {
            position: absolute;
            bottom: 120px;
            width: 35px;
            height: 75px;
            animation: walkCrowd 10s linear infinite;
        }

        .crowd-member:nth-child(3) { left: -50px; animation-delay: 1s; }
        .crowd-member:nth-child(4) { left: -50px; animation-delay: 3.5s; }
        .crowd-member:nth-child(5) { left: -50px; animation-delay: 5.5s; }

        @keyframes walkCrowd {
            0% { left: -50px; }
            100% { left: 110%; }
        }

        .crowd-head {
            width: 28px;
            height: 28px;
            background: #FFE0BD;
            border-radius: 50%;
            margin: 0 auto;
            border: 3px solid #CC9966;
        }

        .crowd-body {
            width: 35px;
            height: 32px;
            border-radius: 6px;
            border: 3px solid;
            margin: 2px auto;
        }

        .crowd-member:nth-child(3) .crowd-body { background: #3498DB; border-color: #2980B9; }
        .crowd-member:nth-child(4) .crowd-body { background: #2ECC71; border-color: #27AE60; }
        .crowd-member:nth-child(5) .crowd-body { background: #F39C12; border-color: #E67E22; }

        /* Griffith Observatory */
        .griffith-scene {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #0f0c29 0%, #302b63 50%, #24243e 100%);
            position: relative;
            overflow: hidden;
        }

        .planet {
            position: absolute;
            border-radius: 50%;
            animation: rotatePlanet 20s linear infinite;
        }

        .planet.mars {
            width: 50px;
            height: 50px;
            background: radial-gradient(circle at 30% 30%, #FF6B4A, #CD5C3A);
            top: 15%;
            left: 10%;
            box-shadow: 0 0 30px rgba(255,107,74,0.6);
        }

        .planet.jupiter {
            width: 70px;
            height: 70px;
            background: radial-gradient(circle at 30% 30%, #FFA726, #FF8A50);
            top: 50%;
            right: 10%;
            box-shadow: 0 0 40px rgba(255,167,38,0.6);
            animation-duration: 25s;
        }

        @keyframes rotatePlanet {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .moon {
            position: absolute;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #FFF5E1 0%, #FFE4B5 100%);
            border-radius: 50%;
            top: 25%;
            right: 15%;
            box-shadow: 0 0 40px rgba(255,245,225,0.8);
            animation: floatMoon 8s ease-in-out infinite;
        }

        @keyframes floatMoon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        .comet {
            position: absolute;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            animation: cometFly 6s linear infinite;
            box-shadow: 0 0 10px white;
        }

        .comet::after {
            content: '';
            position: absolute;
            width: 80px;
            height: 2px;
            background: linear-gradient(to right, white, transparent);
            right: 8px;
            top: 3px;
        }

        .comet:nth-child(1) { top: 20%; animation-delay: 0s; }
        .comet:nth-child(2) { top: 40%; animation-delay: 2s; }
        .comet:nth-child(3) { top: 60%; animation-delay: 4s; }

        @keyframes cometFly {
            0% { left: -100px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 110%; opacity: 0; }
        }

        .spaceship {
            position: absolute;
            width: 40px;
            height: 20px;
            background: linear-gradient(135deg, #C0C0C0, #808080);
            border-radius: 50% 50% 0 0;
            animation: spaceshipFly 8s ease-in-out infinite;
            box-shadow: 0 5px 15px rgba(192,192,192,0.5);
        }

        .spaceship::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 15px solid #FF6B4A;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            filter: blur(2px);
            opacity: 0.8;
        }

        .spaceship:nth-child(4) { bottom: 150px; left: 20%; animation-delay: 0s; }
        .spaceship:nth-child(5) { bottom: 180px; right: 25%; animation-delay: 3s; }

        @keyframes spaceshipFly {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-100px) translateX(50px); }
            50% { transform: translateY(-150px) translateX(100px); }
            75% { transform: translateY(-100px) translateX(50px); }
        }

        .observatory-cartoon {
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            width: 220px;
            height: 120px;
        }

        .observatory-dome-cartoon {
            width: 90px;
            height: 70px;
            background: linear-gradient(to bottom, #E8E8E8 0%, #C0C0C0 100%);
            border-radius: 50% 50% 0 0;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid #999;
        }

        .observatory-base-cartoon {
            width: 170px;
            height: 60px;
            background: linear-gradient(to bottom, #D3D3D3 0%, #A9A9A9 100%);
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid #808080;
            border-radius: 5px;
        }

        .telescope-cartoon {
            width: 35px;
            height: 18px;
            background: #4A4A4A;
            position: absolute;
            top: 25px;
            left: 50%;
            transform-origin: left center;
            animation: telescopeMove 4s ease-in-out infinite;
            border: 2px solid #1a1a1a;
            border-radius: 4px;
        }

        @keyframes telescopeMove {
            0%, 100% { transform: translateX(-50%) rotate(-25deg); }
            50% { transform: translateX(-50%) rotate(25deg); }
        }

        .star-twinkle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            animation: twinkle 2s ease-in-out infinite;
            box-shadow: 0 0 8px rgba(255,255,255,0.8);
        }

        .star-twinkle:nth-child(6) { top: 10%; left: 12%; animation-delay: 0s; }
        .star-twinkle:nth-child(7) { top: 18%; left: 48%; animation-delay: 0.5s; }
        .star-twinkle:nth-child(8) { top: 35%; left: 70%; animation-delay: 1s; }
        .star-twinkle:nth-child(9) { top: 55%; left: 20%; animation-delay: 1.5s; }
        .star-twinkle:nth-child(10) { top: 28%; left: 82%; animation-delay: 2s; }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(2.5); }
        }

        /* Universal Studios */
        .universal-scene {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #87CEEB 0%, #98D8C8 50%, #B0E0E6 100%);
            position: relative;
            overflow: hidden;
        }

        /* Actual roller coaster structure */
        .roller-coaster {
            position: absolute;
            bottom: 100px;
            left: 10%;
            width: 300px;
            height: 200px;
        }

        .coaster-hill {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 80px solid transparent;
            border-right: 80px solid transparent;
            border-bottom: 140px solid #8B4513;
            left: 0;
            bottom: 0;
        }

        .coaster-track-line {
            position: absolute;
            height: 6px;
            background: #555;
            border-radius: 3px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }

        .coaster-track-line:nth-child(2) {
            width: 100px;
            bottom: 140px;
            left: 20px;
            transform: rotate(-45deg);
            transform-origin: left bottom;
        }

        .coaster-track-line:nth-child(3) {
            width: 100px;
            bottom: 140px;
            left: 110px;
            transform: rotate(45deg);
            transform-origin: left bottom;
        }

        .coaster-track-line:nth-child(4) {
            width: 120px;
            bottom: 60px;
            left: 180px;
        }

        /* Roller coaster cart */
        .coaster-cart {
            position: absolute;
            width: 50px;
            height: 35px;
            background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
            border-radius: 8px;
            border: 3px solid #922B21;
            animation: cartRide 6s ease-in-out infinite;
            box-shadow: 0 5px 15px rgba(0,0,0,0.4);
        }

        @keyframes cartRide {
            0% { left: 20px; bottom: 0px; transform: rotate(0deg); }
            25% { left: 80px; bottom: 120px; transform: rotate(-25deg); }
            50% { left: 140px; bottom: 140px; transform: rotate(0deg); }
            75% { left: 200px; bottom: 80px; transform: rotate(25deg); }
            100% { left: 260px; bottom: 60px; transform: rotate(0deg); }
        }

        .cart-person {
            width: 20px;
            height: 25px;
            background: #4A90E2;
            position: absolute;
            top: -22px;
            left: 15px;
            border-radius: 50% 50% 0 0;
            border: 2px solid #2E5F8A;
        }

        .cart-person::before {
            content: '';
            width: 15px;
            height: 15px;
            background: #FFE0BD;
            border-radius: 50%;
            position: absolute;
            top: -13px;
            left: 50%;
            transform: translateX(-50%);
            border: 2px solid #CC9966;
        }

        /* Second roller coaster in background */
        .roller-coaster-bg {
            position: absolute;
            bottom: 130px;
            right: 5%;
            width: 250px;
            height: 150px;
            opacity: 0.7;
        }

        .loop-track {
            width: 120px;
            height: 120px;
            border: 5px solid #666;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 20px;
        }

        .loop-support {
            width: 8px;
            height: 80px;
            background: #8B4513;
            position: absolute;
            bottom: 0;
        }

        .loop-support:nth-child(2) { left: 40px; }
        .loop-support:nth-child(3) { right: 40px; }

        .gate-cartoon {
            position: absolute;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 180px;
            border: 6px solid #FFD700;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.2) 100%);
        }

        .gate-cartoon::before {
            content: 'UNIVERSAL';
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: #FFD700;
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 3px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
        }

        .wizard-broom {
            position: absolute;
            width: 50px;
            height: 60px;
            animation: broomFly 6s ease-in-out infinite;
        }

        @keyframes broomFly {
            0% { left: -60px; top: 60px; transform: rotate(-10deg); }
            25% { left: 25%; top: 30px; transform: rotate(5deg); }
            50% { left: 50%; top: 50px; transform: rotate(-15deg); }
            75% { left: 75%; top: 20px; transform: rotate(10deg); }
            100% { left: 110%; top: 40px; transform: rotate(-5deg); }
        }

        .wizard-head {
            width: 20px;
            height: 20px;
            background: #FFE0BD;
            border-radius: 50%;
            margin: 0 auto;
            border: 2px solid #CC9966;
            position: relative;
        }

        .wizard-head::before {
            content: '';
            position: absolute;
            width: 15px;
            height: 8px;
            background: #2C3E50;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50% 50% 0 0;
        }

        .wizard-body {
            width: 25px;
            height: 20px;
            background: #8B0000;
            margin: 2px auto;
            border-radius: 5px;
            border: 2px solid #660000;
        }

        .broom-stick {
            width: 40px;
            height: 4px;
            background: #8B4513;
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 2px;
        }

        .broom-bristles {
            width: 15px;
            height: 12px;
            background: #DAA520;
            position: absolute;
            bottom: 12px;
            right: 0;
            border-radius: 0 5px 5px 0;
        }

        .race-car {
            position: absolute;
            width: 60px;
            height: 30px;
            background: linear-gradient(135deg, #2C3E50 0%, #000 100%);
            border-radius: 8px;
            animation: raceCar 5s linear infinite;
            border: 3px solid #555;
            animation-delay: 2s;
        }

        @keyframes raceCar {
            0% { left: -70px; top: 150px; }
            100% { left: 110%; top: 150px; }
        }

        .simpsons-char {
            position: absolute;
            width: 35px;
            height: 70px;
            animation: simpsonsWalk 7s linear infinite;
            bottom: 100px;
            animation-delay: 1s;
        }

        @keyframes simpsonsWalk {
            0% { left: -50px; }
            100% { left: 110%; }
        }

        .simpsons-head {
            width: 30px;
            height: 30px;
            background: #FFD700;
            border-radius: 50%;
            margin: 0 auto;
            border: 3px solid #FFA500;
        }

        .simpsons-body {
            width: 35px;
            height: 25px;
            background: #FF6B6B;
            margin: 2px auto;
            border-radius: 6px;
            border: 2px solid #CC4444;
        }

        .firework-cartoon {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            animation: explode 2s ease-out infinite;
        }

        .firework-cartoon:nth-child(5) { top: 12%; left: 18%; animation-delay: 0s; }
        .firework-cartoon:nth-child(6) { top: 20%; left: 65%; animation-delay: 0.7s; }
        .firework-cartoon:nth-child(7) { top: 28%; left: 45%; animation-delay: 1.4s; }

        @keyframes explode {
            0% { 
                transform: scale(1); 
                opacity: 1;
                box-shadow: 0 0 0 0 #FFD700;
            }
            50% {
                transform: scale(4);
                opacity: 1;
                box-shadow: 0 0 30px 15px #FFD700, 20px 20px 35px 10px #FF6B6B;
            }
            100% { 
                transform: scale(1); 
                opacity: 0;
            }
        }

        .back-btn {
            background: #333;
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.1em;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 30px;
            transition: all 0.3s ease;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .back-btn:hover {
            background: #555;
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            h1 { font-size: 2em; }
            h2 { font-size: 1.4em; }
            .option-btn { font-size: 1em; padding: 15px 20px; }
            .location-animation { height: 300px; }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <!-- Start Screen -->
        <div id="start-screen" class="screen active">
            <h1>🌴 LA Adventure 🌴</h1>
            <p class="description">
                Welcome to Los Angeles! Choose your destination and experience the magic of LA!
            </p>
            <div class="options">
                <button class="option-btn" onclick="travelTo('hollywood')">
                    ⭐ Hollywood Walk of Fame
                </button>
                <button class="option-btn" onclick="travelTo('griffith')">
                    🔭 Griffith Observatory
                </button>
                <button class="option-btn" onclick="travelTo('universal')">
                    🎬 Universal Studios Hollywood
                </button>
            </div>
        </div>

        <!-- Hollywood Walk of Fame -->
        <div id="hollywood-screen" class="screen">
            <h2>⭐ Hollywood Walk of Fame ⭐</h2>
            <div class="location-animation">
                <div class="hollywood-scene">
                    <div class="sidewalk-cartoon">
                        <div class="star-cartoon"></div>
                        <div class="star-cartoon"></div>
                        <div class="star-cartoon"></div>
                        <div class="star-cartoon"></div>
                    </div>
                    <div class="celebrity">
                        <div class="celebrity-head"></div>
                        <div class="celebrity-body"></div>
                        <div class="celebrity-legs left"></div>
                        <div class="celebrity-legs right"></div>
                    </div>
                    <div class="paparazzi">
                        <div class="camera-flash"></div>
                        <div class="paparazzi-head"></div>
                        <div class="paparazzi-body"></div>
                    </div>
                    <div class="crowd-member">
                        <div class="crowd-head"></div>
                        <div class="crowd-body"></div>
                    </div>
                    <div class="crowd-member">
                        <div class="crowd-head"></div>
                        <div class="crowd-body"></div>
                    </div>
                </div>
            </div>
            <p class="description">
                Famous celebrities walk the boulevard while paparazzi flash their cameras and crowds cheer!
            </p>
            <button class="back-btn" onclick="goBack()">Explore Another Location</button>
        </div>

        <!-- Griffith Observatory -->
        <div id="griffith-screen" class="screen">
            <h2>🔭 Griffith Observatory 🔭</h2>
            <div class="location-animation">
                <div class="griffith-scene">
                    <div class="comet"></div>
                    <div class="comet"></div>
                    <div class="comet"></div>
                    <div class="spaceship"></div>
                    <div class="spaceship"></div>
                    <div class="star-twinkle"></div>
                    <div class="star-twinkle"></div>
                    <div class="star-twinkle"></div>
                    <div class="star-twinkle"></div>
                    <div class="star-twinkle"></div>
                    <div class="planet mars"></div>
                    <div class="planet jupiter"></div>
                    <div class="moon"></div>
                    <div class="observatory-cartoon">
                        <div class="observatory-dome-cartoon"></div>
                        <div class="telescope-cartoon"></div>
                        <div class="observatory-base-cartoon"></div>
                    </div>
                </div>
            </div>
            <p class="description">
                Watch comets streak across the sky, spaceships launch into space, and planets slowly rotate!
            </p>
            <button class="back-btn" onclick="goBack()">Explore Another Location</button>
        </div>

        <!-- Universal Studios -->
        <div id="universal-screen" class="screen">
            <h2>🎬 Universal Studios Hollywood 🎬</h2>
            <div class="location-animation">
                <div class="universal-scene">
                    <div class="roller-coaster">
                        <div class="coaster-hill"></div>
                        <div class="coaster-track-line"></div>
                        <div class="coaster-track-line"></div>
                        <div class="coaster-track-line"></div>
                        <div class="coaster-cart">
                            <div class="cart-person"></div>
                        </div>
                    </div>
                    <div class="roller-coaster-bg">
                        <div class="loop-support"></div>
                        <div class="loop-support"></div>
                        <div class="loop-track"></div>
                    </div>
                    <div class="wizard-broom">
                        <div class="wizard-head"></div>
                        <div class="wizard-body"></div>
                        <div class="broom-stick">
                            <div class="broom-bristles"></div>
                        </div>
                    </div>
                    <div class="race-car"></div>
                    <div class="simpsons-char">
                        <div class="simpsons-head"></div>
                        <div class="simpsons-body"></div>
                    </div>
                    <div class="gate-cartoon"></div>
                    <div class="firework-cartoon"></div>
                    <div class="firework-cartoon"></div>
                    <div class="firework-cartoon"></div>
                </div>
            </div>
            <p class="description">
                Harry Potter flies on his broom, race cars speed by, Simpsons characters walk around, and fireworks explode!
            </p>
            <button class="back-btn" onclick="goBack()">Explore Another Location</button>
        </div>
    </div>

    <!-- Travel Animation -->
    <div id="travel-animation" class="travel-animation">
        <div class="road-lines-simple"></div>
        <div class="simple-car">
            <div class="simple-wheel"></div>
            <div class="simple-wheel"></div>
        </div>
        <div class="travel-text">Driving to your destination...</div>
    </div>

    <script>
        function travelTo(destination) {
            const travelAnim = document.getElementById('travel-animation');
            travelAnim.classList.add('active');
            
            document.getElementById('start-screen').classList.remove('active');
            
            setTimeout(() => {
                travelAnim.classList.remove('active');
                document.getElementById(destination + '-screen').classList.add('active');
            }, 3000);
        }

        function goBack() {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            document.getElementById('start-screen').classList.add('active');
        }
    </script>
</body>
</html>
                        <div class="paparazzi-body"></div>
                    </div>
                    <div class="paparazzi">
                        <div class="camera-flash"></div>
                        <div class="paparazzi-head"></div>