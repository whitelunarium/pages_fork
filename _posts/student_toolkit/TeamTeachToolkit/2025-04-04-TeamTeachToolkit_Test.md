---
toc: false
layout: post
title: Sign Up Page
permalink: /student/TeamTeachToolkit/test
description: Sign up for team teach topics
---

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Team Teach Toolkit Signup</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="team-teach-section">
    <div class="container text-center text-white bg-dark py-4">
        <div class="d-flex justify-content-center gap-3 mb-3">
            <button class="btn btn-outline-light">Home</button>
            <button class="btn btn-outline-light">Grader</button>
            <button class="btn btn-outline-light">Generator</button>
            <button class="btn btn-outline-light">Review</button>
        </div>
        <p id="loggedInStudent">Fetching student info...</p>
        <div class="border border-light rounded p-4 mt-4">
            <h2>TEAM TEACH SIGNUP</h2>
            <div class="mb-3">
                <input type="text" id="name" class="form-control mb-2" placeholder="Enter Team Teach Topic">
                <input type="date" id="dueDate" class="form-control mb-3">
                <button class="btn btn-outline-light" id="addTopicBtn">Add Topic</button>
            </div>
            <div class="table-responsive">
                <table class="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Date</th>
                            <th>Signed Up</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="topicsList"></tbody>
                </table>
            </div>
        </div>
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
        let response = await fetch(`${javaURI}/api/assignments/debug`, fetchOptions);
        let topics = await response.json();

        // FILTER TO ONLY TEAMTEACH TYPE
        let filteredTopics = topics.filter(topic => topic.type === "teamteach");

        let topicsList = document.getElementById("topicsList");
        topicsList.innerHTML = "";

        filteredTopics.forEach(topic => {
            let studentsText = "None";
            if (Array.isArray(topic.students)) {
                studentsText = topic.students.map(s => `${s.name} (${s.uid})`).join(', ');
            } else if (topic.students && typeof topic.students === 'string') {
                studentsText = topic.students.split(',').join(', ');
            }

            let row = document.createElement("tr");

            let nameCell = document.createElement("td");
            nameCell.innerText = topic.name;

            let dueDateCell = document.createElement("td");
            dueDateCell.innerText = topic.dueDate;

            let studentsCell = document.createElement("td");
            studentsCell.innerText = studentsText;

            let actionsCell = document.createElement("td");
            let signUpBtn = document.createElement("button");
            signUpBtn.classList.add("btn", "btn-outline-light", "btn-sm");
            signUpBtn.setAttribute("data-topic-id", topic.id);
            signUpBtn.innerText = "Sign Up";
            signUpBtn.addEventListener("click", function () {
                signUpForTopic(topic.id);
            });
            actionsCell.appendChild(signUpBtn);

            row.appendChild(nameCell);
            row.appendChild(dueDateCell);
            row.appendChild(studentsCell);
            row.appendChild(actionsCell);

            topicsList.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching topics:", error);
    }
}



async function addTopic() {
    let name = document.getElementById("name").value;
    let dueDate = document.getElementById("dueDate").value;

    if (!name || !dueDate) {
        alert("Please fill in all fields.");
        return;
    }

    // Construct the URL with parameters
    const url = `${javaURI}/api/assignments/create?name=${encodeURIComponent(name)}&type=teamteach&description=test&points=1.0&dueDate=${encodeURIComponent(dueDate)}`;

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            document.getElementById("name").value = "";
            document.getElementById("dueDate").value = "";
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
