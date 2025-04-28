---
toc: false
layout: post
title: Sign Up Page
permalink: /student/TeamTeachToolkit/signup
description: Sign up for team teach topics
---

<title>Team Teach Toolkit Signup</title>

<div class="flex justify-center mt-6 space-x-4">
    <button class="bg-black text-white border border-white py-2 px-4 text-lg hover:bg-gray-800 transition">Home</button>
    <button class="bg-black text-white border border-white py-2 px-4 text-lg hover:bg-gray-800 transition">Grader</button>
    <button class="bg-black text-white border border-white py-2 px-4 text-lg hover:bg-gray-800 transition">Generator</button>
    <button class="bg-black text-white border border-white py-2 px-4 text-lg hover:bg-gray-800 transition">Review</button>
</div>

<p id="loggedInStudent" class="text-center text-white mt-4">Fetching student info...</p>

<div class="w-4/5 mx-auto mt-10 p-6 border-2 border-white text-white bg-black">
    <h2 class="text-2xl font-bold mb-6">TEAM TEACH SIGNUP</h2>
    <div class="flex flex-col items-center space-y-4">
        <input type="text" id="topicName" placeholder="Enter Team Teach Topic"
            class="w-4/5 p-3 bg-black border border-white text-white placeholder-gray-400">
        <input type="date" id="topicDate"
            class="w-4/5 p-3 bg-black border border-white text-white placeholder-gray-400">
        <button id="addTopicBtn"
            class="bg-black text-white border border-white py-2 px-6 text-lg hover:bg-gray-800 transition">Add Topic</button>
    </div>
    <div class="overflow-x-auto mt-8">
        <table class="min-w-full table-auto border-collapse">
            <thead>
                <tr class="bg-gray-900">
                    <th class="border border-white px-4 py-2">Topic</th>
                    <th class="border border-white px-4 py-2">Date</th>
                    <th class="border border-white px-4 py-2">Signed Up</th>
                    <th class="border border-white px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody id="topicsList">
                <!-- Topics will be dynamically added here -->
            </tbody>
        </table>
    </div>
</div>

<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    let loggedInStudent = null;

    async function fetchLoggedInStudent() {
        try {
            const response = await fetch(`${javaURI}/api/person/get`, fetchOptions);
            const data = await response.json();

            console.log("Logged-in student data:", data);

            if (data && data.name) {
                loggedInStudent = data.name;
                document.getElementById("loggedInStudent").innerText = `Logged in as: ${loggedInStudent}`;
                fetchTopics();
            } else {
                document.getElementById("loggedInStudent").innerText = "Sign in to view page.";
            }
        } catch (error) {
            console.error("Error fetching logged-in student:", error);
            document.getElementById("loggedInStudent").innerText = "Error fetching student info.";
        }
    }

    async function fetchTopics() {
        try {
            let response = await fetch(`${javaURI}/api/topics/all`, fetchOptions);
            let topics = await response.json();

            let topicsList = document.getElementById("topicsList");
            topicsList.innerHTML = "";

            topics.forEach(topic => {
                let studentsText = "None";
                if (Array.isArray(topic.students)) {
                    studentsText = topic.students.join(', ');
                } else if (topic.students && typeof topic.students === 'string') {
                    studentsText = topic.students.split(',').join(', ');
                }

                let row = document.createElement("tr");

                let topicNameCell = document.createElement("td");
                topicNameCell.innerText = topic.topicName;
                topicNameCell.className = "border border-white px-4 py-2";

                let dateCell = document.createElement("td");
                dateCell.innerText = topic.date;
                dateCell.className = "border border-white px-4 py-2";

                let studentsCell = document.createElement("td");
                studentsCell.innerText = studentsText;
                studentsCell.className = "border border-white px-4 py-2";

                let actionsCell = document.createElement("td");
                actionsCell.className = "border border-white px-4 py-2";
                let signUpBtn = document.createElement("button");
                signUpBtn.className = "bg-black text-white border border-white py-2 px-4 text-sm hover:bg-gray-800 transition";
                signUpBtn.setAttribute("data-topic-id", topic.id);
                signUpBtn.innerText = "Sign Up";
                signUpBtn.addEventListener("click", function () {
                    signUpForTopic(topic.id);
                });
                actionsCell.appendChild(signUpBtn);

                row.appendChild(topicNameCell);
                row.appendChild(dateCell);
                row.appendChild(studentsCell);
                row.appendChild(actionsCell);

                topicsList.appendChild(row);
            });

        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    }

    async function addTopic() {
        let topicName = document.getElementById("topicName").value;
        let topicDate = document.getElementById("topicDate").value;

        if (!topicName || !topicDate) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            let response = await fetch(`${javaURI}/api/topics/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    topicName: topicName,
                    date: topicDate
                })
            });

            if (response.ok) {
                document.getElementById("topicName").value = "";
                document.getElementById("topicDate").value = "";
                fetchTopics();
            } else {
                console.error("Failed to add topic");
            }
        } catch (error) {
            console.error("Error adding topic:", error);
        }
    }

    async function signUpForTopic(topicId) {
        if (!loggedInStudent) {
            alert("Sign in to view page");
            return;
        }

        try {
            let response = await fetch(`${javaURI}/api/topics/${topicId}/signup?studentName=${encodeURIComponent(loggedInStudent)}`, {
                method: "PUT",
                headers: fetchOptions
            });

            if (response.ok) {
                fetchTopics();
            } else {
                console.error("Failed to sign up for topic");
                alert("Failed to sign up. Please try again.");
            }
        } catch (error) {
            console.error("Error signing up for topic:", error);
            alert("Error signing up. Please try again.");
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        fetchLoggedInStudent();
        document.getElementById("addTopicBtn").addEventListener("click", addTopic);
    });
</script>
