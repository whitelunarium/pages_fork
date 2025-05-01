---
layout: finance
title: Crypto Mining Simulator 
type: issueshen i
permalink: /crypto/mining
---


<!-- ATTENTION! The following locations are where you may find different places to edit different things -->\
<!-- Any CSS or styling adjustments should be done @ {base}/assets/css/crypto.css  -->

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://unpkg.com/intro.js/minified/introjs.min.css" rel="stylesheet">
    <script src="https://unpkg.com/intro.js/minified/intro.min.js"></script>
    <link rel="stylesheet" href="{{site.baseurl}}/assets/css/crypto.css"/>
</head>
<body>
    <div id="notification" class="notification"></div>
    <div class="main-content">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<style>
/* Reset base styles */
body {
    margin: 0;
    padding: 0;
    background-color: #1a1a1a;
    min-height: 100vh;
}
/* Main content area */
.main-content {
    padding: 1rem;
    position: relative;
    z-index: 1; /* Keep all content at a lower z-index */
}
/* Title styles */
.page-title {
    color: #60A5FA;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
}
/* Tutorial button container */
.tutorial-button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
}
/* Modal and notification z-index control */
.modal-container,
.gpu-shop-modal,
.active-gpus-modal,
.tutorial-welcome,
.notification {
    z-index: 1; /* Keep all modals at a lower z-index */
}
.notification { /* This entire style, ".notification", is what makes the notification pops out from the top right! */
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000; // Ensure it appears above other elements
}
.shadow-red-glow {
    box-shadow: 0 4px 15px -3px rgba(239, 68, 68, 0.3);
}
.shadow-green-glow {
    box-shadow: 0 4px 15px -3px rgba(16, 185, 129, 0.3);
}
/* GPU Inventory Styles */
.dashboard-card {
    @apply bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700;
    transition: transform 0.2s, box-shadow 0.2s;
}
.dashboard-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.dashboard-card h2 {
    @apply text-xl font-bold mb-4 text-blue-400;
    border-bottom: 2px solid rgba(59, 130, 246, 0.2);
    padding-bottom: 0.5rem;
}
.stat-label {
    @apply text-gray-400 text-sm font-medium mb-1;
}
.stat-value {
    @apply text-2xl font-bold;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}
#gpu-inventory {
    @apply mt-4;
    min-height: 200px; /* Ensure minimum height even when empty */
}
.gpu-card {
    @apply bg-gray-800 rounded-lg p-4 shadow-lg mb-4;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
/* Updated Navigation Bar Styles */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #001f3f;
    color: #fff;
    width: 100%;
    z-index: 1; 
}
.navbar .logo {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-right: 20px; /* Add margin to separate logo from nav buttons */
}
.navbar .nav-buttons {
    display: flex;
    gap: 15px; /* Reduced gap between buttons */
    flex-wrap: nowrap; /* Prevent wrapping */
    align-items: center;
}
.navbar .nav-buttons a {
    color: #fff;
    text-decoration: none;
    font-size: 15px; /* Slightly smaller font size */
    padding: 6px 12px; /* Reduced padding */
    border-radius: 4px;
    transition: background-color 0.3s;
    white-space: nowrap; /* Prevent text wrapping */
}
.navbar .nav-buttons a:hover {
    background-color: #ff8c00;
}
.navbar .balance-display {
    background-color: #ff8c00;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    margin-left: 20px;
    color: #fff;
    font-size: 0.99em; 
}
.navbar .balance-display #user-balance {
    font-size: 0.99em;
    margin-left: 3px;
}
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
}
.dashboard {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    gap: 40px;
}
.dashboard-content {
    width: 70%;
}
.sidebar {
    width: 25%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.stock-table, .your-stocks {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.your-stocks, .stock-table {
    height: full;
}
.stock-table table, .your-stocks table {
    width: 100%;
    border-collapse: collapse;
}
.stock-table table, th, td, .your-stocks table, th, td {
    border: none;
}
.stock-table th, td, .your-stocks th, td {
    padding: 10px;
    text-align: left;
}
.stock-table th, .your-stocks th {
    background-color: #f2f2f2;
}
.welcome {
    font-size: 24px;
    font-weight: bold;
}
.summary-cards {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}
.card {
    padding: 0px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1;
    text-align: center;
    color: #fff;
    padding-bottom: -40px;
}
.card-orange {
    background-color: #FF8C00;
}
.card-purple {
    background-color: #6A0DAD;
}
.card-darkblue {
    background-color: #001f3f;
}
.card h2 {
    font-size: 20px;
}
.card p {
    font-size: 36px;
    font-weight: bold;
}
.chart-container {
    @apply bg-gray-800 rounded-lg p-6 border border-gray-700;
    height: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.chart {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #999;
    flex: 1;
}
.search-container {
    margin-bottom: 20px;
    display: flex;
}
.search-container input[type="text"] {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    outline: none;
    font-size: 16px;
}
.search-button {
    background-color: #ff8c00;
    color: #fff;
    border: none;
    border-radius: 0 4px 4px 0;
    padding: 12px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}
.search-button:hover {
    background-color: #e07b00;
}
/* ===== Mining Button Effects ===== */
#start-mining {
    background: linear-gradient(135deg, 
        rgba(147, 51, 234, 0.1) 0%,    /* Purple */
        rgba(59, 130, 246, 0.1) 50%,  /* Blue */
        rgba(239, 68, 68, 0.1) 100%   /* Red */
    );
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
        45deg,
        #9333ea,  /* Purple */
        #3b82f6,  /* Blue */
        #ef4444   /* Red */
    );
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
}
/* Hover effect with chromatic aberration */
#start-mining:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 0 25px rgba(147, 51, 234, 0.4),
                0 0 15px rgba(59, 130, 246, 0.4),
                0 0 5px rgba(239, 68, 68, 0.4);
}
/* Active state with particle effect */
#start-mining.active {
    background: linear-gradient(135deg,
        rgba(147, 51, 234, 0.2) 0%,
        rgba(59, 130, 246, 0.2) 50%,
        rgba(239, 68, 68, 0.2) 100%
    );
    box-shadow: 0 0 40px rgba(147, 51, 234, 0.6),
                inset 0 0 20px rgba(59, 130, 246, 0.4);
}
/* RGB Cyclic Animation */
@keyframes chromatic-pulse {
    0% {
        border-color: #9333ea;  /* Purple */
        box-shadow: 0 0 15px rgba(147, 51, 234, 0.4);
    }
    33% {
        border-color: #3b82f6;   /* Blue */
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
    }
    66% {
        border-color: #ef4444;  /* Red */
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
    }
    100% {
        border-color: #9333ea;  /* Purple */
        box-shadow: 0 0 15px rgba(147, 51, 234, 0.4);
    }
}
#start-mining:not(.active) {
    animation: chromatic-pulse 3s ease-in-out infinite;
}
/* Holographic overlay effect */
#start-mining::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent 25%,
        rgba(147, 51, 234, 0.1) 33%,
        rgba(59, 130, 246, 0.1) 66%,
        transparent 75%
    );
    transform: rotate(45deg);
    animation: prismatic-flow 4s infinite linear;
    mix-blend-mode: screen;
}
@keyframes prismatic-flow {
    0% { transform: translateX(-150%) rotate(45deg); }
    100% { transform: translateX(150%) rotate(45deg); }
}
/* Text glow with color transition */
#start-mining span {
    position: relative;
    z-index: 2;
    animation: text-glow 2s ease-in-out infinite alternate;
}
@keyframes text-glow {
    from {
        text-shadow: 0 0 5px rgba(147, 51, 234, 0.5),
                     0 0 10px rgba(59, 130, 246, 0.5),
                     0 0 15px rgba(239, 68, 68, 0.5);
    }
    to {
        text-shadow: 0 0 10px rgba(147, 51, 234, 0.8),
                     0 0 20px rgba(59, 130, 246, 0.8),
                     0 0 30px rgba(239, 68, 68, 0.8);
    }
}
/* GPU Shop Modal */
.gpu-shop-modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}
/* GPU Shop Content */
.gpu-shop-content {
    background-color: #1F2937;
    width: 90%;
    max-width: 900px;
    max-height: 80vh;
    border-radius: 0.5rem;
    padding: 1.5rem;
    position: relative;
}
/* GPU List Container (with scrollbar) */
.gpu-list-container {
    overflow-y: auto;
    max-height: calc(80vh - 4rem);
    padding-right: 1rem;
    scrollbar-width: thin;
    scrollbar-color: #4B5563 #1F2937;
}
/* Scrollbar Style */
.gpu-list-container::-webkit-scrollbar {
    width: 8px;
}
.gpu-list-container::-webkit-scrollbar-track {
    background: #1F2937;
}
.gpu-list-container::-webkit-scrollbar-thumb {
    background-color: #4B5563;
    border-radius: 4px;
}
/* GPU Card Base Style */
.gpu-card {
    background: rgba(26, 31, 46, 0.95);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
    backdrop-filter: blur(5px);
}
/* Different price GPU Hover Effect */
.gpu-card.starter:hover { /* Free GPU */
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
    border-color: rgba(34, 197, 94, 0.5);
}
.gpu-card.budget:hover { /* Entry-level */
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    border-color: rgba(59, 130, 246, 0.5);
}
.gpu-card.mid-range:hover { /* Mid-range */
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
    border-color: rgba(147, 51, 234, 0.5);
}
.gpu-card.high-end:hover { /* High-end */
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(251, 146, 60, 0.3);
    border-color: rgba(251, 146, 60, 0.5);
}
.gpu-card.premium:hover { /* Premium */
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
    border-color: rgba(239, 68, 68, 0.5);
}
/* difference color = different category */
.gpu-card.starter h3 { color: #22C55E; }  /* Green */
.gpu-card.budget h3 { color: #3B82F6; }   /* Blue */
.gpu-card.mid-range h3 { color: #9333EA; } /* Purple */
.gpu-card.high-end h3 { color: #FB923C; } /* Orange */
.gpu-card.premium h3 { color: #EF4444; }  /* Red */
/* Buy Button Style */
.gpu-card button {
    background: rgba(39, 39, 42, 0.9);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
}
.gpu-card button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px currentColor;
}
/* Performance Metrics Style */
.gpu-card .performance-metrics {
    color: #A1A1AA;
    font-size: 0.875rem;
}
.gpu-card .performance-metrics span {
    color: white;
    font-weight: 500;
}
/* ROI Display Style */
.gpu-card .roi-indicator {
    color: #FACC15;
    font-weight: bold;
    text-shadow: 0 0 8px rgba(250, 204, 21, 0.3);
}
/* Update the active-gpus-modal styles to match GPU Shop */
.active-gpus-modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
}
.active-gpus-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1f2937;
    border-radius: 0.5rem;
    padding: 1.5rem;
    width: 90%;
    max-width: 900px;
    max-height: 80vh;
}
#active-gpus-list {
    overflow-y: auto;
    max-height: calc(80vh - 120px);
    padding-right: 1rem;
    margin-right: -1rem;
    scrollbar-width: thin;
    scrollbar-color: #4b5563 #1f2937;
}
#active-gpus-list::-webkit-scrollbar {
    width: 8px;
}
#active-gpus-list::-webkit-scrollbar-track {
    background: #1f2937;
}
#active-gpus-list::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-radius: 4px;
}
/* Update the GPU cards style */
#active-gpus-list .gpu-card {
    background: rgba(17, 24, 39, 0.95);
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(75, 85, 99, 0.4);
    transition: all 0.2s ease-in-out;
}
#active-gpus-list .gpu-card:hover {
    transform: translateY(-2px);
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}
@keyframes rainbow-breathe {
    0% { background-position: 0% 50%; text-shadow: 0 0 10px #ff0000; }
    25% { background-position: 100% 50%; text-shadow: 0 0 10px #00ff00; }
    50% { background-position: 0% 50%; text-shadow: 0 0 10px #0000ff; }
    75% { background-position: 100% 50%; text-shadow: 0 0 10px #ff00ff; }
    100% { background-position: 0% 50%; text-shadow: 0 0 10px #ff0000; }
}
@keyframes rgb-border-breathe {
    0% { border-color: rgba(255, 0, 0, 0.7); box-shadow: 0 -4px 15px -3px rgba(255, 0, 0, 0.4); }
    33% { border-color: rgba(0, 255, 0, 0.7); box-shadow: 0 -4px 15px -3px rgba(0, 255, 0, 0.4); }
    66% { border-color: rgba(0, 0, 255, 0.7); box-shadow: 0 -4px 15px -3px rgba(0, 0, 255, 0.4); }
    100% { border-color: rgba(255, 0, 0, 0.7); box-shadow: 0 -4px 15px -3px rgba(255, 0, 0, 0.4); }
}
/* Add tutorial styles */
.introjs-tooltip {
    background-color: #1f2937;
    color: white;
    border: 1px solid #374151;
}
.introjs-tooltip-header {
    display: none !important;
}
.introjs-button {
    background-color: #3b82f6;
    color: white;
    border: none;
    text-shadow: none;
    white-space: nowrap;
    margin: 0 2px;
}
.introjs-skipbutton {
    color: #9ca3af;
    float: left !important;
    position: relative !important;
    width: auto !important;
    text-align: center;
    margin-right: 5px;
}
.introjs-skipbutton:hover {
    color: white;
}
.introjs-tooltipbuttons {
    display: flex;
    justify-content: center;
    align-items: center;
}
.introjs-helperLayer {
    background-color: rgba(59, 130, 246, 0.1);
    border: 2px solid #3b82f6;
}
.introjs-progress {
    background-color: #374151;
}
.introjs-progressbar {
    background-color: #3b82f6;
    border-radius: 2px;
}
/* Tutorial welcome modal */
.tutorial-welcome {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1f2937;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-width: 600px;
    width: 95%;
    text-align: center;
}
.tutorial-welcome h2 {
    color: #3b82f6;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
.tutorial-welcome p {
    color: #9ca3af;
    margin-bottom: 1.5rem;
}
.tutorial-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.tutorial-button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
    min-width: 120px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #374151;
    color: white;
    border: none;
    margin: 0.25rem;
}
.tutorial-button:hover {
    background-color: #4b5563;
}
.tutorial-button-primary {
    background-color: #3b82f6;
}
.tutorial-button-primary:hover {
    background-color: #2563eb;
}
.tutorial-button-tertiary {
    background-color: #1f2937;
    color: #9ca3af;
    border: 1px solid #374151;
}
.tutorial-button-tertiary:hover {
    background-color: #374151;
    color: white;
}
/* Tutorial button in the main page */
.tutorial-button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
}
.tutorial-button-container button {
    background: linear-gradient(to right, #3b82f6, #6366f1);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.85;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.tutorial-button-container button:hover {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.tutorial-button-container button span:first-child {
    font-size: 1.25rem;
}
/* Tutorial Help Button */
.tutorial-help-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
}
.tutorial-help-button button {
    font-weight: bold;
    transform: scale(1);
    transition: transform 0.2s ease;
}
.tutorial-help-button button:hover {
    transform: scale(1.1);
}
/* Custom scrollbar for crypto modal */
#crypto-balances-container::-webkit-scrollbar,
#crypto-selection-container::-webkit-scrollbar {
    width: 6px;
}
#crypto-balances-container::-webkit-scrollbar-track,
#crypto-selection-container::-webkit-scrollbar-track {
    background: #1F2937;
    border-radius: 3px;
}
#crypto-balances-container::-webkit-scrollbar-thumb,
#crypto-selection-container::-webkit-scrollbar-thumb {
    background-color: #4B5563;
    border-radius: 3px;
}
/* Smooth scrolling */
#crypto-balances-container,
#crypto-selection-container {
    scroll-behavior: smooth;
}
/* Force scrolling for the crypto modal content */
#crypto-details-modal .overflow-y-auto {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
    max-height: calc(80vh - 70px); /* Account for header */
}
/* Improved scrollbar styles */
#crypto-details-modal .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}
#crypto-details-modal .overflow-y-auto::-webkit-scrollbar-track {
    background: #1F2937;
    border-radius: 4px;
}
#crypto-details-modal .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #4B5563;
    border-radius: 4px;
    border: 2px solid #1F2937;
}
/* Prevent body scrolling when modal is open */
body.modal-open {
    overflow: hidden;
}
/* Add these new styles for the energy buttons */
.mining-button.energy-plan {
    background: linear-gradient(135deg, 
        rgba(34, 197, 94, 0.1) 0%,    /* Green */
        rgba(16, 185, 129, 0.1) 50%,  /* Emerald */
        rgba(5, 150, 105, 0.1) 100%   /* Teal */
    );
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
        45deg,
        #22c55e,  /* Green */
        #10b981,  /* Emerald */
        #059669   /* Teal */
    );
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
    text-decoration: none;
}
.mining-button.energy-store {
    background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.1) 0%,    /* Blue */
        rgba(37, 99, 235, 0.1) 50%,    /* Indigo */
        rgba(29, 78, 216, 0.1) 100%    /* Dark Blue */
    );
    border-image-source: linear-gradient(
        45deg,
        #3b82f6,  /* Blue */
        #2563eb,  /* Indigo */
        #1d4ed8   /* Dark Blue */
    );
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
    text-decoration: none;
}
/* Hover effects for energy buttons */
.mining-button.energy-plan:hover,
.mining-button.energy-store:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.4),
                0 0 15px rgba(16, 185, 129, 0.4),
                0 0 5px rgba(5, 150, 105, 0.4);
}
/* Text glow for energy buttons */
.mining-button.energy-plan span,
.mining-button.energy-store span {
    animation: text-glow-green 2s ease-in-out infinite alternate;
}
@keyframes text-glow-green {
    from {
        text-shadow: 0 0 5px rgba(34, 197, 94, 0.5),
                     0 0 10px rgba(16, 185, 129, 0.5),
                     0 0 15px rgba(5, 150, 105, 0.5);
    }
    to {
        text-shadow: 0 0 10px rgba(34, 197, 94, 0.8),
                     0 0 20px rgba(16, 185, 129, 0.8),
                     0 0 30px rgba(5, 150, 105, 0.8);
    }
}
@keyframes text-glow-blue {
    from {
        text-shadow: 0 0 5px rgba(59, 130, 246, 0.5),
                     0 0 10px rgba(37, 99, 235, 0.5),
                     0 0 15px rgba(29, 78, 216, 0.5);
    }
    to {
        text-shadow: 0 0 10px rgba(59, 130, 246, 0.8),
                     0 0 20px rgba(37, 99, 235, 0.8),
                     0 0 30px rgba(29, 78, 216, 0.8);
    }
}
@keyframes text-glow {
    from {
        text-shadow: 0 0 5px rgba(147, 51, 234, 0.5),
                     0 0 10px rgba(59, 130, 246, 0.5),
                     0 0 15px rgba(239, 68, 68, 0.5);
    }
    to {
        text-shadow: 0 0 10px rgba(147, 51, 234, 0.8),
                     0 0 20px rgba(59, 130, 246, 0.8),
                     0 0 30px rgba(239, 68, 68, 0.8);
    }
}
</style>
<body>
    <div id="notification" class="notification"></div>
    <div class="main-content">
        <!-- Page title -->
        <h1 class="page-title">Crypto Mining Simulator</h1>
        <!-- Balance Display -->
        <div class="text-right mb-4">
            <div class="inline-block bg-orange-500 px-4 py-2 rounded-lg text-white font-bold">
                Balance: $<span id="user-balance">Loading...</span>
            </div>
        </div>
        <!-- Warning messages -->
        <div class="text-center mb-4 text-yellow-400">
            *** note: If the stats number are not showing, try to stop the mining and start again... <br>
            *** note: If it says "Error loading mining state. Please try again.", please check if you are logged in or no...
        </div>

        <!-- Tutorial Help Button -->
        <div class="tutorial-help-button fixed top-6 right-6 z-50" title="Interactive Tutorial">
            <button onclick="startTutorial()" class="bg-gray-800 hover:bg-gray-700 text-green-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-green-500/30">
                <span class="text-lg font-bold">?</span>
            </button>
        </div>

        <div class="container mx-auto pt-24">

        <div class="container mx-auto">

            <!-- Core Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Wallet -->
                <div class="dashboard-card">
                    <h2>Wallet</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">Crypto Balance</div>
                            <div class="stat-value text-green-400" id="btc-balance">0.00000000</div>
                        </div>
                        <div>
                            <div class="stat-label">Pending Crypto Balance</div>
                            <div class="stat-value text-yellow-400" id="pending-balance">0.00000000</div>
                            <span class="text-sm text-blue-400 cursor-pointer hover:underline mt-1 inline-block" onclick="openCryptoDetailsModal()">View all crypto balances &rarr;</span>
                        </div>
                        <div>
                            <div class="stat-label">USD Value</div>
                            <div class="stat-value text-green-400" id="usd-value">$0.00</div>
                        </div>
                        <div>
                            <div class="stat-label" id="pool-info">Min. Payout</div>
                            <div class="stat-value text-yellow-400" id="pool-info">0.001 BTC</div>
                        </div>
                    </div>
                </div>
                <!-- Mining Stats -->
                <div class="dashboard-card">
                    <h2>Mining Stats</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">Hashrate</div>
                            <div class="stat-value text-purple-400" id="hashrate">0 MH/s</div>
                        </div>
                        <div>
                            <div class="stat-label">Shares</div>
                            <div class="stat-value text-purple-400" id="shares">0</div>
                        </div>
                    </div>
                </div>
                <!-- Hardware -->
                <div class="dashboard-card">
                    <h2>Hardware</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">Current GPU</div>
                            <div class="stat-value text-blue-400 cursor-pointer hover:text-blue-300 transition-colors" 
                                 onclick="openActiveGPUsModal()" 
                                 id="current-gpu">
                                No GPU
                            </div>
                        </div>
                        <div>
                            <div class="stat-label">GPU Temperature</div>
                            <div class="stat-value text-blue-400" id="gpu-temp">0°C</div>
                        </div>
                        <div>
                            <div class="stat-label">Power Draw</div>
                            <div class="stat-value text-blue-400" id="power-draw">0W</div>
                        </div>
                    </div>
                </div>
                <!-- Profitability -->
                <div class="dashboard-card">
                    <h2>Profitability</h2>
                    <div class="grid gap-2">
                        <div>
                            <div class="stat-label">24h Revenue</div>
                            <div class="stat-value text-red-400" id="daily-revenue">$0.00</div>
                        </div>
                        <div>
                            <div class="stat-label">Power Cost</div>
                            <div class="stat-value text-red-400" id="power-cost">$0.00</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Mining Controls -->
            <div class="flex justify-center mt-8 mb-8">
                <div class="flex justify-between items-center gap-4">
                    <a href="{{site.baseurl}}/crypto/energy" class="mining-button energy-plan">
                        <span>Energy Plan</span>
                    </a>
                    <script type="module" src="{{site.baseurl}}/assets/js/crypto/front.js"/></script>
                    <button id="start-mining" class="mining-button start-mining" onclick="toggleMining()">
                        <span>Start Mining</span>
                    </button>
                    <a href="{{site.baseurl}}/crypto/energy-store" class="mining-button energy-store">
                        <span>Energy Store</span>
                    </a>
                </div>
            </div>
            <!-- Performance Charts -->
            <div class="flex flex-col gap-4 mt-4">
                <div class="text-sm text-gray-400 text-center">
                    Drag to pan horizontally • Use mouse wheel to zoom • Double click to reset
                </div>
                <div class="chart-container">
                    <canvas id="hashrate-chart"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="profit-chart"></canvas>
                </div>
            </div>
            <!-- GPU Inventory -->
            <div class="dashboard-card mt-4 bg-gray-900 p-6 rounded-lg">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">My GPU Inventory</h2>
                    <button id="gpu-shop" 
                            class="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg 
                                   font-medium transition-colors duration-200 flex items-center gap-2">
                        <span>🛒</span>
                        GPU Shop
                    </button>
                </div>
                <div id="gpu-inventory" class="min-h-[400px]">
                </div>
            </div>
        </div>
    </div>
    <!-- Tutorial Welcome Modal -->
    <div id="tutorial-welcome" class="tutorial-welcome hidden">
        <h2>Welcome to Crypto Mining Simulator!</h2>
        <p>Would you like to take a quick tour of the mining interface?</p>
        <div class="tutorial-buttons">
            <button class="tutorial-button tutorial-button-primary" onclick="startTutorial()">Start Tour</button>
            <button class="tutorial-button tutorial-button-tertiary" onclick="skipTutorial()">SKIP</button>
            <button class="tutorial-button tutorial-button-tertiary" onclick="neverShowTutorial()">Never Show</button>
            <script src="{{site.baseurl}}/assets/js/crypto/tutorial.js"></script>
        </div>
    </div>
    <!-- GPU Shop Modal -->
    <div id="gpu-shop-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-gray-800 rounded-lg p-6 w-11/12 max-w-4xl max-h-[80vh] overflow-hidden">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">GPU Shop</h2>
                <button onclick="closeGpuShop()" class="text-gray-400 hover:text-white text-3xl">&times;</button>
            </div>
            <div class="overflow-y-auto pr-2" style="max-height: calc(80vh - 100px);">
                <div id="gpu-list" class="grid gap-4">
                    <!-- GPUs will be inserted here -->
                </div>
            </div>
            <!-- Total Cost Footer -->
            <div id="total-cost-footer" class="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-4 flex justify-between items-center"
                 style="border-top: 3px solid transparent;
                        background: rgba(17, 24, 39, 0.95);
                        animation: rgb-border-breathe 3s ease-in-out infinite;">
                <div class="text-2xl font-bold text-white">Total Cost:</div>
                <div class="flex items-center gap-4">
                    <div class="text-3xl font-bold text-white">
                        USD: <span id="shop-total-cost">0</span>
                    </div>
                    <button onclick="buySelectedGPUs()" 
                            class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                        Buy Selected GPUs
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Add this right before the closing </body> tag -->
    <div id="active-gpus-modal" class="active-gpus-modal hidden">
        <div class="active-gpus-content">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-blue-400">Active GPUs</h2>
                <button onclick="closeActiveGPUsModal()" 
                        class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div id="active-gpus-list">
                <!-- GPUs will be listed here -->
            </div>
        </div>
    </div>
    <div id="sellModal">
        <div id="sellModalContent"></div>
    </div>
    <!-- Replace the entire crypto-details-modal div with this updated version -->
    <div id="crypto-details-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
        <div class="bg-gray-900 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 class="text-2xl font-bold text-white">Your Cryptocurrency Balances</h2>
                <button onclick="closeCryptoDetailsModal()" class="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            <!-- Main content - scrollable -->
            <div class="overflow-y-auto flex-grow p-4" style="overflow-y: auto !important;">
                <div id="crypto-balances-container">
                    <!-- Crypto balances will be loaded here dynamically -->
                    <div class="animate-pulse">
                        <div class="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div class="h-24 bg-gray-800 rounded mb-4"></div>
                        <div class="h-24 bg-gray-800 rounded mb-4"></div>
                        <div class="h-24 bg-gray-800 rounded mb-4"></div>
                    </div>
                </div>
                <!-- Cryptocurrency selection -->
                <div class="mt-8 border-t border-gray-700 pt-4">
                    <h3 class="text-xl font-bold text-white mb-4">Change Mining Cryptocurrency</h3>
                    <div id="crypto-selection-container" class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <!-- Cryptocurrency options will be loaded here dynamically -->
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                        <div class="animate-pulse">
                            <div class="h-16 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="{{site.baseurl}}/assets/js/crypto/portfolio.js"></script>
    </div>
</body>
