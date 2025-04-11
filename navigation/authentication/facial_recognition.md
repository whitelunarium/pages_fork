---
layout: page
title: Facial Recognition Login
permalink: /facial-login
search_exclude: true
show_reading_time: false
---

<style>
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    video, canvas {
        border-radius: 10px;
        margin-top: 10px;
    }
    .capture-button, .submit-button {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 5px;
        border: none;
        transition: 0.3s;
    }
    .capture-button {
        background-color: #007bff;
        color: white;
    }
    .submit-button {
        background-color: #28a745;
        color: white;
    }
    .capture-button:hover {
        background-color: #0056b3;
    }
    .submit-button:hover {
        background-color: #1e7e34;
    }
</style>

<div class="login-container">
    <h1>Video display</h1>
    <video id="video" width="320" height="240" autoplay></video>
    <canvas id="canvas" width="320" height="240" style="display: none;"></canvas>
    <img id="capturedImage" style="display: none; margin-top: 10px; border-radius: 10px;" width="320" height="240">
    <button class="capture-button" onclick="captureImage()">Capture Image</button>
    <button class="submit-button" onclick="submitImage()" disabled>Login</button>
</div>

<style>
    video {
        transform: scaleX(-1); /* Mirror live preview */
    }
</style>

<script type="module">
import { pythonURI } from '{{ site.baseurl }}/assets/js/api/config.js';

window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const capturedImage = document.getElementById('capturedImage');
    const submitButton = document.querySelector('.submit-button');

    // Start webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Camera access denied: ", err);
        });

    function captureImage() {
        const context = canvas.getContext('2d');

        // Flip image horizontally
        context.save();
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        context.restore();

        const imageData = canvas.toDataURL('image/png');
        capturedImage.src = imageData;
        capturedImage.style.display = 'block';
        submitButton.disabled = false;
    }

    function submitImage() {
        const imageData = canvas.toDataURL('image/png');

        fetch(`${pythonURI}/facial/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Send JWT cookie
            body: JSON.stringify({ image: imageData })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Welcome back, ${data.user.name}!`);
                window.location.href = '/gamify';
            } else {
                alert('Face not recognized. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error submitting image:', error);
            alert('Something went wrong. Please try again.');
        });
    }

    // Expose functions globally for onclick attributes
    window.captureImage = captureImage;
    window.submitImage = submitImage;
});
</script>
