---
layout: page
title: Login
permalink: /login
search_exclude: true
show_reading_time: false
---


<style>
    .submit-button {
        width: 100%;
        transition: all 0.3s ease;
        position: relative;
    }

    .login-container {
        display: flex;
        /* Use flexbox for side-by-side layout */
        justify-content: space-between;
        /* Add space between the cards */
        align-items: flex-start;
        /* Align items to the top */
        gap: 20px;
        /* Add spacing between the cards */
        flex-wrap: nowrap;
        /* Prevent wrapping of the cards */
    }

    .login-card,
    .signup-card {
        flex: 1 1 calc(50% - 20px);
        max-width: 45%;
        box-sizing: border-box;
        background: #1e1e1e;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 20px;
        color: white;
        overflow: hidden;
    }

    .login-card h1 {
        margin-bottom: 20px;
    }

    .signup-card h1 {
        margin-bottom: 20px;
    }

    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }

    input {
        width: 100%;
        box-sizing: border-box;
    }
</style>
<br>
<div class="login-container">
    <!-- Python Login Form -->
    <div class="login-card">
        <h1 id="pythonTitle">User Login</h1>
        <hr>
        <form id="pythonForm" onsubmit="loginBoth(); return false;">
            <div class="form-group">
                <input type="text" id="uid" placeholder="GitHub ID" required>
            </div>
            <div class="form-group">
                <input type="password" id="password" placeholder="Password" required>
            </div>
            <p>
                <button type="submit" class="large primary submit-button">Login</button>
            </p>
            <p id="message" style="color: red;"></p>
        </form>
    </div>
    <div class="signup-card">
        <h1 id="signupTitle">Sign Up</h1>
        <hr>
        <form id="signupForm" onsubmit="signup(); return false;">
            <div class="form-group">
                <input type="text" id="name" placeholder="Name" required>
            </div>
            <div class="form-group">
                <input type="text" id="signupUid" placeholder="GitHub ID" required>
            </div>
            <div class="form-group">
                <input type="text" id="signupSid" placeholder="Student ID" required>
            </div>
            <div class="form-group">
                <input type="text" id="signupEmail" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="password" id="signupPassword" placeholder="Password" required>
            </div>
            <p>
                <label class="switch">
                    <span class="toggle">
                        <input type="checkbox" name="kasmNeeded" id="kasmNeeded">
                        <span class="slider"></span>
                    </span>
                    <span class="label-text">Kasm Server Needed</span>
                </label>

            </p>
            <p>
                <button type="submit" class="large primary submit-button">Sign Up</button>
            </p>
            <p id="signupMessage" style="color: green;"></p>
        </form>
    </div>
</div>
<script type="module">
    console.log("TESTING");

    import { login, pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    // Function to handle both Python and Java login simultaneously
    window.loginBoth = function () {
        console.log("STARTED LOGIN PROTCOL");
        javaLogin();  // Call Java login
        pythonLogin();
    };
    // Function to handle Python login
    window.pythonLogin = function () {
        const options = {
            URL: `${pythonURI}/api/authenticate`,
            callback: pythonDatabase,
            message: "message",
            method: "POST",
            cache: "no-cache",
            body: {
                uid: document.getElementById("uid").value,
                password: document.getElementById("password").value,
            }
        };
        login(options);
    }
    // Function to handle Java login
    window.javaLogin = function () {
        const options = {
            URL: `${javaURI}/authenticate`,
            callback: javaDatabase,
            message: "java-message",
            method: "POST",
            cache: "no-cache",
            body: {
                uid: document.getElementById("uid").value,
                password: document.getElementById("password").value,
            },
        };
        login(options);
    };

    // Function to fetch and display Python data
    function pythonDatabase() {
        const URL = `${pythonURI}/api/id`;
        fetch(URL, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Flask server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                window.location.href = '{{site.baseurl}}/profile';
            })
            .catch(error => {
                document.getElementById("message").textContent = `Error: ${error.message}`;
            });
    }
    window.signup = function () {
        const signupButton = document.querySelector(".signup-card button");
        // Disable the button and change its color
        signupButton.disabled = true;
        signupButton.classList.add("disabled");

        const signupOptionsPython = {
            URL: `${pythonURI}/api/user`,
            method: "POST",
            cache: "no-cache",
            body: {
                name: document.getElementById("name").value,
                uid: document.getElementById("signupUid").value,
                password: document.getElementById("signupPassword").value,
                kasm_server_needed: document.getElementById("kasmNeeded").checked,
            }
        };

        const signupOptionsJava = {
            URL: `${javaURI}/api/person/create`,
            method: "POST",
            cache: "no-cache",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                uid: document.getElementById("signupUid").value,
                sid: document.getElementById("signupSid").value,
                email: document.getElementById("signupEmail").value,
                dob: "11-01-2024",  // Static date for now, you can modify this
                name: document.getElementById("name").value,
                password: document.getElementById("signupPassword").value,
                kasmServerNeeded: document.getElementById("kasmNeeded").checked,
            })
        };

        fetch(signupOptionsJava.URL, signupOptionsJava)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("signupMessage").innerText = "Sign up successful!";
                } else {
                    document.getElementById("signupMessage").innerText = "Sign up failed: " + data.message;
                }
            })
            .catch(error => {
                document.getElementById("signupMessage").innerText = "Error: " + error.message;
                console.error('Error during signup:', error);
            });

        fetch(signupOptionsPython.URL, {
            method: signupOptionsPython.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupOptionsPython.body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Signup failed on one or both backends: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("signupMessage").textContent = "Signup successful!";
                // Optionally redirect to login page or handle as needed
                // window.location.href = '{{site.baseurl}}/profile';
            })
            .catch(error => {
                console.error("Signup Error:", error);
                document.getElementById("signupMessage").textContent = `Signup Error: ${error.message}`;
                // Re-enable the button if there is an error
                signupButton.disabled = false;
                signupButton.style.backgroundColor = ''; // Reset to default color
            });
    }



    // Function to fetch and display Java data
    function javaDatabase() {
        const URL = `${javaURI}/api/person/get`;
        const loginForm = document.getElementById('javaForm');
        const dataTable = document.getElementById('javaTable');
        const dataButton = document.getElementById('javaButton');
        const resultContainer = document.getElementById("javaResult");
        resultContainer.innerHTML = '';

        fetch(URL, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Spring server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Check if email ends with "@gmail.com" and prompt user to update profile
                if (data.email === `${data.uid}@gmail.com`) {
                    alert('You need to update your name and email in the profile page to complete account setup.');
                }

                loginForm.style.display = 'none';
                dataTable.style.display = 'block';
                dataButton.style.display = 'block';

                const tr = document.createElement("tr");
                const name = document.createElement("td");
                const ghid = document.createElement("td");
                const id = document.createElement("td");
                const age = document.createElement("td");
                const roles = document.createElement("td");

                name.textContent = data.name;
                ghid.textContent = data.uid;
                //store ghid in localStorage
                localStorage.setItem("ghid", data.uid);
                id.textContent = data.email;
                age.textContent = data.age;
                roles.textContent = data.roles.map(role => role.name).join(', ');

                tr.appendChild(name);
                tr.appendChild(ghid);
                tr.appendChild(id);
                tr.appendChild(age);
                tr.appendChild(roles);
                resultContainer.appendChild(tr);

                // Redirect to the student calendar after successful data fetch
                sessionStorage.setItem("loggedIn", "true");
                setTimeout(() => {
                    window.location.href = "{{ site.baseurl }}/profile";
                }, 5000);
            })
            .catch(error => {
                console.error("Java Database Error:", error);
                const errorMsg = `Java Database Error: ${error.message}`;
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.textContent = errorMsg;
                td.colSpan = 4;
                tr.appendChild(td);
                resultContainer.appendChild(tr);
            });
    }
</script>
