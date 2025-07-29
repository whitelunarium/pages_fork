---
layout: post
title: Calendar Documentation
permalink: /classrooms
author: Anusha Khobare
---
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Classroom Dashboard</title>
  <style>
    /* === CSS styles === */

    body.dashboard-page {
      font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      color: #e0e0e0; /* light text */
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
      background-color: inherit; /* keep your dark bg */
    }

    .dashboard-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      border-bottom: 2px solid #5c6bc0; /* subtle accent */
      padding-bottom: 0.5rem;
    }

    section {
      margin-bottom: 2rem;
    }

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.4rem;
      color: #9fa8da; /* lighter accent */
    }

    input[type="text"],
    input[type="number"] {
      width: 250px;
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
      border: 1px solid #4a4a6a;
      border-radius: 6px;
      background-color: #2a2a3d;
      color: #e0e0e0;
      transition: border-color 0.2s ease;
    }

    input[type="text"]:focus,
    input[type="number"]:focus {
      outline: none;
      border-color: #5c6bc0;
    }

    button {
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      border-radius: 6px;
      border: none;
      background-color: #5c6bc0;
      color: white;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background-color: #3f51b5;
    }

    .classroom-list,
    .student-list {
      list-style: none;
      padding: 0;
      margin: 1rem 0 0 0;
      border-radius: 6px;
      background-color: #222236;
      max-height: 300px;
      overflow-y: auto;
      box-shadow: 0 0 10px #151529;
    }

    .classroom-item,
    .student-item {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #3a3a5a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .classroom-item:last-child,
    .student-item:last-child {
      border-bottom: none;
    }

    .classroom-item:hover,
    .student-item:hover {
      background-color: #3a3a5a;
    }

    .classroom-item.selected {
      background-color: #5c6bc0;
      font-weight: 700;
      color: white;
      cursor: default;
    }

    .remove-student-btn {
      background-color: #e53935;
      padding: 0.3rem 0.7rem;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .remove-student-btn:hover {
      background-color: #b71c1c;
    }

    .empty-list-message {
      padding: 1rem;
      font-style: italic;
      color: #9999aa;
      text-align: center;
    }

    .student-add {
      margin-top: 1rem;
      display: flex;
      align-items: center;
    }

    @media (max-width: 500px) {
      input[type="text"],
      input[type="number"] {
        width: 100%;
        margin-bottom: 0.5rem;
      }
      .student-add {
        flex-direction: column;
        align-items: stretch;
      }
      button {
        margin-left: 0;
        width: 100%;
      }
    }
  </style>
</head>
<body class="dashboard-page">

  <header class="dashboard-header">
    <h1>Classroom Dashboard</h1>
  </header>

  <main class="dashboard-main">

    <section class="classroom-create">
      <label for="new-classroom-name">New Classroom Name</label>
      <input id="new-classroom-name" type="text" name="new-classroom-name" placeholder="Enter classroom name" />
      <button id="create-classroom-btn" type="button">Create Classroom</button>
    </section>

    <section class="classroom-list-section">
      <h2>Classrooms</h2>
      <ul id="classroom-list" class="classroom-list"></ul>
    </section>

    <section id="students-section" class="students-section" style="display:none;">
      <h3 id="selected-classroom-name">Students in Classroom</h3>
      <ul id="student-list" class="student-list"></ul>

      <div class="student-add">
        <label for="add-student-id">Add Student by ID</label>
        <input id="add-student-id" type="number" name="add-student-id" placeholder="Student ID" />
        <button id="add-student-btn" type="button">Add Student</button>
      </div>
    </section>

  </main>

  <script>
    /* === JS logic === */
    const API_BASE = "/api/classrooms";

    const classroomListEl = document.getElementById("classroom-list");
    const studentsSectionEl = document.getElementById("students-section");
    const selectedClassroomNameEl = document.getElementById("selected-classroom-name");
    const studentListEl = document.getElementById("student-list");
    const newClassroomNameInput = document.getElementById("new-classroom-name");
    const createClassroomBtn = document.getElementById("create-classroom-btn");
    const addStudentIdInput = document.getElementById("add-student-id");
    const addStudentBtn = document.getElementById("add-student-btn");

    let classrooms = [];
    let selectedClassroom = null;
    let students = [];

    function fetchClassrooms() {
      fetch(API_BASE)
        .then(res => res.json())
        .then(data => {
          classrooms = data;
          renderClassrooms();
        })
        .catch(console.error);
    }

    function renderClassrooms() {
      classroomListEl.innerHTML = "";
      classrooms.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.name} (ID: ${c.id})`;
        li.classList.add("classroom-item");
        if (selectedClassroom && selectedClassroom.id === c.id) {
          li.classList.add("selected");
        }
        li.addEventListener("click", () => selectClassroom(c));
        classroomListEl.appendChild(li);
      });
    }

    function selectClassroom(classroom) {
      selectedClassroom = classroom;
      selectedClassroomNameEl.textContent = `Students in "${classroom.name}"`;
      studentsSectionEl.style.display = "block";
      fetchStudents(classroom.id);
      renderClassrooms();
    }

    function fetchStudents(classroomId) {
      fetch(`${API_BASE}/${classroomId}/students`)
        .then(res => res.json())
        .then(data => {
          students = data;
          renderStudents();
        })
        .catch(console.error);
    }

    function renderStudents() {
      studentListEl.innerHTML = "";
      if (students.length === 0) {
        const p = document.createElement("p");
        p.textContent = "No students in this classroom.";
        p.classList.add("empty-list-message");
        studentListEl.appendChild(p);
        return;
      }
      students.forEach(s => {
        const li = document.createElement("li");
        li.classList.add("student-item");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = s.name || s.username || `ID ${s.id}`;
        li.appendChild(nameSpan);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-student-btn");
        removeBtn.addEventListener("click", () => removeStudent(s.id));
        li.appendChild(removeBtn);

        studentListEl.appendChild(li);
      });
    }

    createClassroomBtn.addEventListener("click", () => {
      const name = newClassroomNameInput.value.trim();
      if (!name) {
        alert("Please enter a classroom name.");
        return;
      }
      fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to create classroom");
          return res.json();
        })
        .then(newClassroom => {
          classrooms.push(newClassroom);
          newClassroomNameInput.value = "";
          renderClassrooms();
        })
        .catch(err => alert(err.message));
    });

    addStudentBtn.addEventListener("click", () => {
      const studentId = addStudentIdInput.value.trim();
      if (!studentId) {
        alert("Please enter a student ID.");
        return;
      }
      if (!selectedClassroom) {
        alert("No classroom selected.");
        return;
      }
      fetch(`${API_BASE}/${selectedClassroom.id}/students/${studentId}`, {
        method: "POST",
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to add student");
          return res.json();
        })
        .then(() => {
          addStudentIdInput.value = "";
          fetchStudents(selectedClassroom.id);
        })
        .catch(err => alert(err.message));
    });

    function removeStudent(studentId) {
      if (!selectedClassroom) return;
      fetch(`${API_BASE}/${selectedClassroom.id}/students/${studentId}`, {
        method: "DELETE",
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to remove student");
          return res.json();
        })
        .then(() => fetchStudents(selectedClassroom.id))
        .catch(err => alert(err.message));
    }

    // Initial load
    fetchClassrooms();
  </script>
</body>
</html>
