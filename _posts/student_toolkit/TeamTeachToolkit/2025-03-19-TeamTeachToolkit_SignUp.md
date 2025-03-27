---
toc: false
layout: post
title: Sign Up Page
permalink: /student/TeamTeachToolkit/signup
description: Sign up for team teach topics
---

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Teach Signup</title>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .nav-buttons {
            margin-top: 20px;
        }
        .nav-buttons button, .tt-btn, .tt-action-btn {
            background-color: black;
            color: white;
            border: 1px solid white;
            padding: 10px 20px;
            margin: 0 10px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .tt-btn:hover, .tt-action-btn:hover {
            background-color: #333;
        }
        .tt-container {
            width: 70%;
            margin: auto;
            padding: 20px;
            border: 2px solid white;
            margin-top: 40px;
        }
        .tt-container input {
            margin: 10px;
            padding: 10px;
            width: 80%;
        }
        .tt-container table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }
        .tt-container th, .tt-container td {
            border: 1px solid white;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="nav-buttons">
        <button>Home</button>
        <button>Grader</button>
        <button>Generator</button>
        <button>Review</button>
    </div>

    <div class="tt-container">
        <h2>TEAM TEACH SIGNUP</h2>
        <input type="text" id="topicInput" placeholder="Enter Team Teach Topic">
        <input type="date" id="dateInput">
        <button class="tt-btn" id="addTopicBtn">Add Topic</button>
        <table>
            <tr>
                <th>Topic</th>
                <th>Date</th>
                <th>Signed Up</th>
                <th>Actions</th>
            </tr>
            <tbody id="topicList"></tbody>
        </table>
    </div>

<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    async function getUserId() {
        const url_persons = `${javaURI}/api/person/get`;
        await fetch(url_persons, fetchOptions)
            .then(response => response.json())
            .then(data => {
                window.loggedInUser = {
                    id: data.id,
                    name: data.name
                };
            })
            .catch(error => console.error("Java Database Error:", error));
    }

    async function addTopic() {
        const topicInput = document.getElementById("topicInput").value;
        const dateInput = document.getElementById("dateInput").value;

        if (!topicInput || !dateInput) {
            alert("Please enter both a topic and a date.");
            return;
        }

        const response = await fetch(`${javaURI}/api/topics/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topicName: topicInput, date: dateInput })
        });

        if (response.ok) {
            loadTopics();
        }
    }

    async function loadTopics() {
        const response = await fetch(`${javaURI}/api/topics/all`);
        const topics = await response.json();

        const topicList = document.getElementById("topicList");
        topicList.innerHTML = "";

        topics.forEach(topic => {
            let row = topicList.insertRow();
            row.insertCell(0).textContent = topic.topicName;
            row.insertCell(1).textContent = topic.date;
            row.insertCell(2).textContent = topic.students.join(", ") || "No signups";

            let cell4 = row.insertCell(3);
            let signupButton = document.createElement("button");
            signupButton.textContent = "Sign Up";
            signupButton.className = "tt-action-btn";
            signupButton.onclick = () => signUpForLesson(topic.topicName, topic.date);
            cell4.appendChild(signupButton);
        });
    }

    async function signUpForLesson(topic, date) {
        if (window.loggedInUser) {
            await fetch(`${javaURI}/api/topics/signup?topicName=${topic}&date=${date}&student=${window.loggedInUser.name}`, {
                method: "POST"
            });
            loadTopics();
        } else {
            alert("You must be logged in to sign up.");
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        getUserId();
        document.getElementById("addTopicBtn").addEventListener("click", addTopic);
        loadTopics();
    });
</script>

</body>
