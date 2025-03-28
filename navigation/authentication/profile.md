---
layout: post
title: Profile Settings
permalink: /profile
search_exclude: true
show_reading_time: false
---
<style>
    .submit-button {
        width: 100%;
        padding: 1rem;
        color: black;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        padding: 1rem;
    }

    .login-card {
        margin-top: 0;
        /* remove the top margin */
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        padding: 20px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        margin-bottom: 20px;
        overflow-x: auto;
        background-color: #2c3e50;
        /* Enable horizontal scrolling */
    }

    .login-card h1 {
        margin-bottom: 20px;
    }

    .signup-card {
        margin-top: 0;
        /* remove the top margin */
        width: 45%;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        padding: 20px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        margin-bottom: 20px;
        overflow-x: auto;
        /* Enable horizontal scrolling */
    }

    .signup-card h1 {
        margin-bottom: 20px;
    }

    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }

    .form-group ion-icon {
        position: absolute;
        top: 50%;
        left: 10px;
        /* Adjust based on desired spacing */
        transform: translateY(-50%);
        font-size: 1.5rem;
        /* Adjust the size of the icon */
        color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
        /* Ensure the icon does not interfere with input focus */
    }

    .form-input {
        width: 100%;
        padding: 1rem 1rem 1rem 3rem;
        /* Add left padding to make room for the icon */
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        font-size: 1rem;
        color: white;
        transition: all 0.3s ease;
    }

    .form-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    .form-input:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
    }

    .form-input:-webkit-autofill,
    .form-input:-webkit-autofill:hover,
    .form-input:-webkit-autofill:focus,
    .form-input:-webkit-autofill:active {
        -webkit-background-clip: text;
        -webkit-text-fill-color: #ffffff;
        transition: background-color 5000s ease-in-out 0s;
        box-shadow: inset 0 0 20px 20px #23232329;

    }

    .glowOnHover {
        //this makes it actually glow
        border: none;
        outline: none;
        color: #fff;
        background: #1e1e1e;
        cursor: pointer;
        position: relative;
        z-index: 0;
        border-radius: 10px;
    }

    .glowOnHover:before {
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -2px;
        left: -2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        border-radius: 10px;
    }

    .glowOnHover:hover:before {
        opacity: 1;
    }

    .glowOnHover:after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #1e1e1e;
        left: 0;
        top: 0;
        border-radius: 10px;
    }

    @keyframes glowing {
        0% {
            background-position: 0 0;
        }

        50% {
            background-position: 400% 0;
        }

        100% {
            background-position: 0 0;
        }
    }

    .your-profile-container {
        justify-content: center;
        align-items: center'
    }
</style>

<div class='userOverview'>
    <div class='user-card'>
        <h1>User Overview</h1>
        <div class='user-info'>
            <div class='user-info-item'>
                <strong>Name:</strong> <span id='newName'></span>
            </div>
            <div class='user-info-item'>
                <strong>UID:</strong> <span id='newUid'></span>
            </div>
        </div>
    </div>
</div>

<button id="toggleProfileButton" class="submit-button" onclick="toggleProfileContainer()">Toggle Profile Settings</button>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

<script type="module">
    // Import fetchOptions from config.js
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    // Import functions from config.js
    import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";

    window.fetchName = async function () {
        const URL = pythonURI + "/api/id"; // Adjusted endpoint

        try {
            const response = await fetch(URL, fetchOptions);
            if (!response.ok) {
                throw new Error(`Failed to fetch Name: ${response.status}`);
            }

            const data = await response.json();

            // Update the DOM with the fetched name and UID
            document.getElementById('newName').textContent = data.name || 'N/A';
            document.getElementById('newUid').textContent = data.uid || 'N/A';

            console.log('Fetched Name:', data.name);
            console.log('Fetched UID:', data.uid);
        } catch (error) {
            console.error('Error fetching Name:', error.message);
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        fetchName(); // Fetch and display the user's name and UID
    });
</script>
