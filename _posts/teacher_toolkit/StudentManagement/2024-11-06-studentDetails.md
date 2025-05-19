---
layout: post
title: Student Info
type: issues
permalink: /teacher-toolkit/student-info
comments: false
---

<div id="details-container">
  <img id="profile-pic" src="" alt="Profile Picture">
  <div class="details-content">
    <p><strong>Username:</strong> <span id="githubUsername"></span></p>
    <p><strong>Profile URL:</strong> <a id="githubProfile" href="" target="_blank"></a></p>
    <p><strong>Issues:</strong> <span id="githubIssues"></span></p>
    <p><strong>Pull Requests:</strong> <span id="githubPulls"></span></p>
    <p><strong>Commits:</strong> <span id="githubCommits"></span></p>
    <p><strong>Public Repos:</strong> <span id="githubRepos"></span></p>
    <p><strong>Public Gists:</strong> <span id="githubGists"></span></p>
    <p><strong>Followers:</strong> <span id="githubFollowers"></span></p>
  </div>
</div>

<script type="module">
  import {javaURI} from '{{site.baseurl}}/assets/js/api/config.js';

  async function fetchStudentDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    const course = urlParams.get("course");
    const trimester = urlParams.get("trimester");
    const period = urlParams.get("period");

    const criteriaDto = {
      username: username,
      course: course,
      trimester: parseInt(trimester),
      period: parseInt(period)
    };

    try {
      // Fetch student data from your backend
      const studentResponse = await fetch(`${javaURI}/api/students/find`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(criteriaDto)
      });

      if (!studentResponse.ok) throw new Error("Student not found");

      const student = await studentResponse.json();
      const githubUsername = student.username;

      // Fetch GitHub user profile
      const githubResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
      if (!githubResponse.ok) throw new Error("GitHub profile not found");
      const githubData = await githubResponse.json();

      // Fetch GitHub user events for issues, PRs, and commits data
      const eventsResponse = await fetch(`https://api.github.com/users/${githubUsername}/events`);
      if (!eventsResponse.ok) throw new Error("GitHub events not found");
      const eventsData = await eventsResponse.json();

      // Define the start date for filtering events
      const startDate = new Date("2024-08-01T00:00:00Z");

      // Count events occurring after the start date
      const commitsCount = eventsData.filter(event => 
        event.type === "PushEvent" && new Date(event.created_at) >= startDate
      ).length;

      const prsCount = eventsData.filter(event => 
        event.type === "PullRequestEvent" && new Date(event.created_at) >= startDate
      ).length;

      const issuesCount = eventsData.filter(event => 
        event.type === "IssuesEvent" && new Date(event.created_at) >= startDate
      ).length;

      // Populate the details on the page
      document.getElementById("profile-pic").src = githubData.avatar_url;
      document.getElementById("githubUsername").innerText = githubData.login;
      document.getElementById("githubProfile").href = githubData.html_url;
      document.getElementById("githubProfile").innerText = githubData.html_url;
      document.getElementById("githubRepos").innerText = githubData.public_repos;
      document.getElementById("githubGists").innerText = githubData.public_gists;
      document.getElementById("githubFollowers").innerText = githubData.followers;

      // Display the filtered event data
      document.getElementById("githubIssues").innerText = issuesCount;
      document.getElementById("githubPulls").innerText = prsCount;
      document.getElementById("githubCommits").innerText = commitsCount;

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  }

  window.onload = fetchStudentDetails;
</script>
