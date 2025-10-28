---
layout: post
title: "Submodule 4"
description: "Submodule 4 of AI Usage Mini-Quest of Generating the Itinerary"
permalink: /west-coast/ai/submodule_4/
parent: "AI Usage"
team: "TheSprinters"
submodule: 4
categories: [CSP, Submodule, AIUsage]
tags: [ai, submodule, Generation]
author: "TheSprinters"
date: 2025-10-21
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>West Coast Trip Planner</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #e4e4e7;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.7;
            padding: 40px 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        h1 {
            color: #ffffff;
            font-size: 2.8em;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .subtitle {
            text-align: center;
            color: #f0e7ff;
            font-size: 1.2em;
            margin-bottom: 40px;
        }

        .progress-container {
            background: rgba(255, 255, 255, 0.15);
            height: 8px;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 50px;
            backdrop-filter: blur(10px);
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #34d399);
            transition: width 0.5s ease;
            width: 0%;
        }

        .step-indicator {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            flex-wrap: wrap;
            gap: 10px;
        }

        .step-dot {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .step-dot.active {
            background: #10b981;
            border-color: #ffffff;
            transform: scale(1.2);
        }

        .step-dot.completed {
            background: #34d399;
        }

        .step-section {
            background: rgba(255, 255, 255, 0.95);
            color: #1f2937;
            padding: 40px;
            border-radius: 20px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: none;
        }

        .step-section.active {
            display: block;
            animation: fadeIn 0.5s;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        h2 {
            color: #667eea;
            font-size: 2em;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .step-description {
            color: #6b7280;
            font-size: 1.1em;
            margin-bottom: 30px;
        }

        .selection-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 25px 0;
        }

        .selection-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            border: 3px solid #e5e7eb;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
        }

        .selection-card:hover {
            border-color: #667eea;
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .selection-card.selected {
            border-color: #667eea;
            background: #eef2ff;
        }

        .selection-card.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .selection-card h3 {
            color: #374151;
            font-size: 1.3em;
            margin-bottom: 8px;
        }

        .selection-card p {
            color: #6b7280;
            font-size: 0.95em;
        }

        .card-icon {
            font-size: 3em;
            margin-bottom: 15px;
        }

        .button-group {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 30px;
        }

        .btn {
            padding: 14px 35px;
            border: none;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: #e5e7eb;
            color: #374151;
        }

        .btn-secondary:hover {
            background: #d1d5db;
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .itinerary-preview {
            background: linear-gradient(135deg, #f9fafb, #eef2ff);
            padding: 30px;
            border-radius: 15px;
            margin-top: 30px;
        }

        .itinerary-preview h3 {
            color: #667eea;
            font-size: 1.5em;
            margin-bottom: 20px;
            text-align: center;
        }

        .destination-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
            border-left: 4px solid #667eea;
        }

        .destination-card h4 {
            color: #374151;
            font-size: 1.2em;
            margin-bottom: 10px;
        }

        .destination-details {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            color: #6b7280;
            font-size: 0.95em;
        }

        .detail-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .summary-section {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-top: 20px;
        }

        .summary-section h4 {
            color: #667eea;
            font-size: 1.2em;
            margin-bottom: 15px;
        }

        textarea {
            width: 100%;
            padding: 15px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-family: inherit;
            font-size: 1em;
            resize: vertical;
            min-height: 120px;
            transition: border-color 0.3s;
        }

        textarea:focus {
            outline: none;
            border-color: #667eea;
        }

        .selection-count {
            color: #667eea;
            font-size: 0.95em;
            margin-top: 10px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌴 West Coast Trip Planner</h1>
        <p class="subtitle">Plan your dream vacation step by step!</p>

        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>

        <div class="step-indicator">
            <div class="step-dot active" id="dot1">1</div>
            <div class="step-dot" id="dot2">2</div>
            <div class="step-dot" id="dot3">3</div>
            <div class="step-dot" id="dot4">4</div>
            <div class="step-dot" id="dot5">5</div>
        </div>

        <!-- Step 1: Choose Destinations -->
        <div class="step-section active" id="step1">
            <h2>Step 1: Choose Your Destinations</h2>
            <p class="step-description">Select 3 cities you want to visit on your West Coast adventure!</p>
            <p class="selection-count" id="destCount">Selected: 0/3</p>

            <div class="selection-grid">
                <div class="selection-card" data-destination="San Francisco, CA">
                    <div class="card-icon">🌉</div>
                    <h3>San Francisco</h3>
                    <p>Golden Gate Bridge, cable cars, tech hub</p>
                </div>
                <div class="selection-card" data-destination="Los Angeles, CA">
                    <div class="card-icon">🎬</div>
                    <h3>Los Angeles</h3>
                    <p>Hollywood, beaches, entertainment</p>
                </div>
                <div class="selection-card" data-destination="San Diego, CA">
                    <div class="card-icon">🏖️</div>
                    <h3>San Diego</h3>
                    <p>Perfect weather, beaches, zoo</p>
                </div>
                <div class="selection-card" data-destination="Portland, OR">
                    <div class="card-icon">🌲</div>
                    <h3>Portland</h3>
                    <p>Food scene, nature, quirky culture</p>
                </div>
                <div class="selection-card" data-destination="Seattle, WA">
                    <div class="card-icon">☕</div>
                    <h3>Seattle</h3>
                    <p>Space Needle, coffee, tech culture</p>
                </div>
                <div class="selection-card" data-destination="Las Vegas, NV">
                    <div class="card-icon">🎰</div>
                    <h3>Las Vegas</h3>
                    <p>Entertainment, shows, nightlife</p>
                </div>
            </div>

            <div class="button-group">
                <button class="btn btn-primary" id="nextFromDest" disabled>Next Step</button>
            </div>
        </div>

        <!-- Step 2: Choose Transportation -->
        <div class="step-section" id="step2">
            <h2>Step 2: Choose Your Transportation</h2>
            <p class="step-description">How do you want to travel between destinations?</p>

            <div class="selection-grid">
                <div class="selection-card" data-transport="Drive">
                    <div class="card-icon">🚗</div>
                    <h3>Drive</h3>
                    <p>Flexible, scenic routes, road trip vibes</p>
                </div>
                <div class="selection-card" data-transport="Fly">
                    <div class="card-icon">✈️</div>
                    <h3>Fly</h3>
                    <p>Fast, convenient, save time</p>
                </div>
                <div class="selection-card" data-transport="Train">
                    <div class="card-icon">🚂</div>
                    <h3>Take the Train</h3>
                    <p>Relaxing, scenic, eco-friendly</p>
                </div>
                <div class="selection-card" data-transport="Bus">
                    <div class="card-icon">🚌</div>
                    <h3>Take the Bus</h3>
                    <p>Budget-friendly, meet people</p>
                </div>
            </div>

            <div class="button-group">
                <button class="btn btn-secondary" id="backFromTransport">Back</button>
                <button class="btn btn-primary" id="nextFromTransport" disabled>Next Step</button>
            </div>
        </div>

        <!-- Step 3: Choose Accommodations -->
        <div class="step-section" id="step3">
            <h2>Step 3: Choose Your Accommodations</h2>
            <p class="step-description">Where will you stay during your trip?</p>

            <div class="selection-grid">
                <div class="selection-card" data-accommodation="Hotel">
                    <div class="card-icon">🏨</div>
                    <h3>Hotel</h3>
                    <p>Comfortable, amenities, room service</p>
                </div>
                <div class="selection-card" data-accommodation="Hostel">
                    <div class="card-icon">🛏️</div>
                    <h3>Hostel</h3>
                    <p>Budget-friendly, social, meet travelers</p>
                </div>
                <div class="selection-card" data-accommodation="Airbnb">
                    <div class="card-icon">🏠</div>
                    <h3>Airbnb</h3>
                    <p>Home away from home, local experience</p>
                </div>
                <div class="selection-card" data-accommodation="Camping">
                    <div class="card-icon">⛺</div>
                    <h3>Camping</h3>
                    <p>Adventure, nature, budget-friendly</p>
                </div>
            </div>

            <div class="button-group">
                <button class="btn btn-secondary" id="backFromAccommodation">Back</button>
                <button class="btn btn-primary" id="nextFromAccommodation" disabled>Generate Itinerary</button>
            </div>
        </div>

        <!-- Step 4: Generate Itinerary -->
        <div class="step-section" id="step4">
            <h2>Step 4: Your Custom Itinerary</h2>
            <p class="step-description">Here's your personalized West Coast trip plan!</p>

            <div id="itineraryPreview" class="itinerary-preview"></div>

            <div class="summary-section">
                <h4>💡 Trip Planning Notes</h4>
                <p style="margin-bottom: 15px; color: #6b7280;">Jot down ideas to make your trip better, save money, or be more eco-friendly:</p>
                <textarea id="tripNotes" placeholder="Example: Research free activities, bring reusable water bottles, look for local farmers markets..."></textarea>
            </div>

            <div class="button-group">
                <button class="btn btn-secondary" id="backFromItinerary">Back</button>
                <button class="btn btn-primary" id="nextFromItinerary">Share & Discuss</button>
            </div>
        </div>

        <!-- Step 5: Share Your Itinerary -->
        <div class="step-section" id="step5">
            <h2>Step 5: Share Your Itinerary</h2>
            <p class="step-description">Share your trip plan and discuss improvements with classmates!</p>

            <div class="summary-section">
                <h4>🌟 Your Trip Summary</h4>
                <div id="finalSummary"></div>
            </div>

            <div class="summary-section">
                <h4>💬 Discussion Questions</h4>
                <p style="margin-bottom: 15px; color: #6b7280;">Discuss these with your classmates:</p>
                <ul style="color: #6b7280; margin-left: 20px; line-height: 2;">
                    <li>What are some things you can do to make your trip more enjoyable?</li>
                    <li>What are some things you can do to save money?</li>
                    <li>What are some things you can do to make your trip more environmentally friendly?</li>
                    <li>How does your itinerary compare to your classmates?</li>
                </ul>
            </div>

            <div class="summary-section">
                <h4>✍️ Reflection</h4>
                <p style="margin-bottom: 15px; color: #6b7280;">After discussing with classmates, write what you learned or how you'd improve your trip:</p>
                <textarea id="reflection" placeholder="What did you learn from your classmates? What would you change about your itinerary?"></textarea>
            </div>

            <div class="button-group">
                <button class="btn btn-secondary" id="backFromShare">Back</button>
                <button class="btn btn-primary" id="restartBtn">Plan Another Trip 🎉</button>
            </div>
        </div>
    </div>

    <script>
        let currentStep = 1;
        let selectedDestinations = [];
        let selectedTransport = '';
        let selectedAccommodation = '';

        // Destination selection
        const destCards = document.querySelectorAll('[data-destination]');
        destCards.forEach(card => {
            card.addEventListener('click', function() {
                const dest = this.dataset.destination;
                
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedDestinations = selectedDestinations.filter(d => d !== dest);
                } else if (selectedDestinations.length < 3) {
                    this.classList.add('selected');
                    selectedDestinations.push(dest);
                }

                if (selectedDestinations.length === 3) {
                    destCards.forEach(c => {
                        if (!c.classList.contains('selected')) {
                            c.classList.add('disabled');
                        }
                    });
                } else {
                    destCards.forEach(c => c.classList.remove('disabled'));
                }

                document.getElementById('destCount').textContent = `Selected: ${selectedDestinations.length}/3`;
                document.getElementById('nextFromDest').disabled = selectedDestinations.length !== 3;
            });
        });

        document.getElementById('nextFromDest').addEventListener('click', () => nextStep());

        // Transportation selection
        const transportCards = document.querySelectorAll('[data-transport]');
        transportCards.forEach(card => {
            card.addEventListener('click', function() {
                transportCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                selectedTransport = this.dataset.transport;
                document.getElementById('nextFromTransport').disabled = false;
            });
        });

        document.getElementById('backFromTransport').addEventListener('click', () => previousStep());
        document.getElementById('nextFromTransport').addEventListener('click', () => nextStep());

        // Accommodation selection
        const accommodationCards = document.querySelectorAll('[data-accommodation]');
        accommodationCards.forEach(card => {
            card.addEventListener('click', function() {
                accommodationCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                selectedAccommodation = this.dataset.accommodation;
                document.getElementById('nextFromAccommodation').disabled = false;
            });
        });

        document.getElementById('backFromAccommodation').addEventListener('click', () => previousStep());
        document.getElementById('nextFromAccommodation').addEventListener('click', () => {
            generateItinerary();
            nextStep();
        });

        document.getElementById('backFromItinerary').addEventListener('click', () => previousStep());
        document.getElementById('nextFromItinerary').addEventListener('click', () => {
            generateFinalSummary();
            nextStep();
        });

        document.getElementById('backFromShare').addEventListener('click', () => previousStep());
        document.getElementById('restartBtn').addEventListener('click', () => restartPlanner());

        function nextStep() {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            document.getElementById(`dot${currentStep}`).classList.remove('active');
            document.getElementById(`dot${currentStep}`).classList.add('completed');
            
            currentStep++;
            
            document.getElementById(`step${currentStep}`).classList.add('active');
            document.getElementById(`dot${currentStep}`).classList.add('active');
            
            updateProgress();
            window.scrollTo(0, 0);
        }

        function previousStep() {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            document.getElementById(`dot${currentStep}`).classList.remove('active');
            
            currentStep--;
            
            document.getElementById(`step${currentStep}`).classList.add('active');
            document.getElementById(`dot${currentStep}`).classList.remove('completed');
            document.getElementById(`dot${currentStep}`).classList.add('active');
            
            updateProgress();
            window.scrollTo(0, 0);
        }

        function updateProgress() {
            const progress = ((currentStep - 1) / 4) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        function generateItinerary() {
            const itineraryHTML = `
                <h3>✨ Your West Coast Adventure</h3>
                ${selectedDestinations.map((dest, index) => `
                    <div class="destination-card">
                        <h4>Stop ${index + 1}: ${dest}</h4>
                        <div class="destination-details">
                            <div class="detail-item">
                                <span>🚗</span>
                                <span>Travel: ${selectedTransport}</span>
                            </div>
                            <div class="detail-item">
                                <span>🏨</span>
                                <span>Stay: ${selectedAccommodation}</span>
                            </div>
                            <div class="detail-item">
                                <span>📅</span>
                                <span>2-3 days recommended</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            `;
            
            document.getElementById('itineraryPreview').innerHTML = itineraryHTML;
        }

        function generateFinalSummary() {
            const tripNotes = document.getElementById('tripNotes').value;
            const summaryHTML = `
                <p style="color: #6b7280; line-height: 2;">
                    <strong>🌍 Destinations:</strong> ${selectedDestinations.join(' → ')}<br>
                    <strong>🚗 Transportation:</strong> ${selectedTransport}<br>
                    <strong>🏨 Accommodations:</strong> ${selectedAccommodation}<br>
                    <strong>⏱️ Total Trip Duration:</strong> ${selectedDestinations.length * 2.5} days (approx)<br>
                    ${tripNotes ? `<br><strong>📝 Your Notes:</strong><br>${tripNotes}` : ''}
                </p>
            `;
            
            document.getElementById('finalSummary').innerHTML = summaryHTML;
        }

        function restartPlanner() {
            currentStep = 1;
            selectedDestinations = [];
            selectedTransport = '';
            selectedAccommodation = '';

            // Reset all selections
            document.querySelectorAll('.selection-card').forEach(card => {
                card.classList.remove('selected', 'disabled');
            });

            // Reset steps
            for (let i = 1; i <= 5; i++) {
                document.getElementById(`step${i}`).classList.remove('active');
                document.getElementById(`dot${i}`).classList.remove('active', 'completed');
            }

            document.getElementById('step1').classList.add('active');
            document.getElementById('dot1').classList.add('active');

            // Reset buttons
            document.getElementById('nextFromDest').disabled = true;
            document.getElementById('nextFromTransport').disabled = true;
            document.getElementById('nextFromAccommodation').disabled = true;

            // Reset textareas
            document.getElementById('tripNotes').value = '';
            document.getElementById('reflection').value = '';
            document.getElementById('destCount').textContent = 'Selected: 0/3';

            updateProgress();
            window.scrollTo(0, 0);
        }
    </script>
</body>
</html>
<style>
.completion-banner {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 1000;
  animation: slideInBanner 0.5s ease-out;
}

@keyframes slideInBanner {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>



<!-- Lock/Unlock Logic -->
<script>
// Scroll-to-bottom completion tracking
document.addEventListener("DOMContentLoaded", function() {
    const storageKey = 'ai-module-c4-completed';
    
    // Check if already completed
    if (localStorage.getItem(storageKey) === 'true') {
        return;
    }
    
    let hasScrolledToBottom = false;
    
    function checkScrollPosition() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if user scrolled to within 100px of bottom
        if (scrollTop + windowHeight >= documentHeight - 100) {
            if (!hasScrolledToBottom) {
                hasScrolledToBottom = true;
                
                // Mark module as completed
                localStorage.setItem(storageKey, 'true');
                
                // Show completion banner
                const banner = document.createElement('div');
                banner.className = 'completion-banner';
                banner.innerHTML = `
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold;">🎉 Module 4 Completed!</h3>
                    <p style="margin: 5px 0 0 0; font-size: 14px;">You have finished the AI Module!!</p>
                `;
                document.body.appendChild(banner);
                
                // Remove banner after 4 seconds
                setTimeout(() => {
                    banner.style.animation = 'slideInBanner 0.5s ease-out reverse';
                    setTimeout(() => banner.remove(), 500);
                }, 4000);
                
                // Remove scroll listener
                window.removeEventListener('scroll', checkScrollPosition);
            }
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', checkScrollPosition);
    
    // Check immediately in case page is short
    checkScrollPosition();
});
</script>