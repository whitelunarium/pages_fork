// import uri
import { javaURI } from '../../js/api/config.js';

let assignment = null;
let currentQueue = [];

let person;

document.getElementById('addQueue').addEventListener('click', addToQueue);
document.getElementById('removeQueue').addEventListener('click', removeFromQueue);

let timerInterval;
let timerlength;
let queueUpdateInterval;

const URL = javaURI + "/api/assignments/"
console.log(URL)

function startTimer() {
    const waitingList = document.getElementById('waitingList');
    const firstInQueue = waitingList.children[0]?.textContent;

    // If person is not at the front or not part of the first group, block the timer
    if (!firstInQueue || (!firstInQueue.includes(person) && person !== firstInQueue)) {
        alert("You must be at the front of the queue to start the timer.");
        return;
    }
    
    let time = timerlength;
    const timerButton = document.getElementById('beginTimer');
    timerButton.textContent = 'End Timer';

    // Change the click behavior to END the timer
    timerButton.removeEventListener('click', startTimer);
    timerButton.addEventListener('click', endTimerEarly);
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timerDisplay').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} | Presentation Queue`;
        time--;
        if (time < 0) {
            clearInterval(timerInterval);
            moveToDoneQueue();
            alert("Timer is up! Your presentation is over.");
            resetTimerButton();
        }
    }, 1000);
}

function endTimerEarly() {
    clearInterval(timerInterval);
    moveToDoneQueue();
    alert("Timer ended early.");
    resetTimerButton();
}

function resetTimerButton() {
    const timerButton = document.getElementById('beginTimer');
    timerButton.textContent = 'Begin Timer';
    timerButton.removeEventListener('click', endTimerEarly);
    timerButton.addEventListener('click', startTimer);
    document.title = "Presentation Queue | Nighthawk Pages";
}

// ensure accessible outside of current module
window.startTimer = startTimer;

function fetchQueue() {
    fetch(URL + `getQueue/${assignment}`)
        .then(response => response.json())
        .then(data => updateQueueDisplay(data));
}

function fetchTimerLength() {
    console.log("test")
    fetch(URL + `getPresentationLength/${assignment}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            timerlength = data;
            document.getElementById('timerDisplay').textContent = `${Math.floor(timerlength / 60).toString().padStart(2, '0')}:${(timerlength % 60).toString().padStart(2, '0')}`;
        });
}

// add user to waiting
function addToQueue() {
    let list = document.getElementById("notGoneList").children;
    let names = [];
    Array.from(list).forEach(child => {
        names.push(child.textContent);
    });
    if (names.includes(person)) {
        fetch(URL + `addToWaiting/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([person])
        })
        .then(() => fetchQueue());
    } else {
        alert("ERROR: You are not in the working list.")
    }
}

// remove user from waiting
function removeFromQueue() {
    let list = document.getElementById("waitingList").children;
    let names = [];
    Array.from(list).forEach(child => {
        names.push(child.textContent);
    });
    if (names.includes(person)) {
        fetch(URL + `removeToWorking/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([person])
        })
        .then(() => fetchQueue());
    } else {
        alert("ERROR: You are not in the waiting list.")
    }
}

// move user to completed
function moveToDoneQueue() {
    const firstPerson = [currentQueue[0]];
    fetch(URL + `doneToCompleted/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firstPerson)
    })
    .then(() => fetchQueue());
}

// reset queue - todo: admin only
function resetQueue() {
    fetch(URL + `resetQueue/${assignment}`, {
        method: 'PUT'
    })
    .then(() => fetchQueue());
}

// add/remove a group from waiting list
function toggleGroupInQueue() {
    // ask for group names
    const groupName = prompt("Enter the group name to add/remove in the waiting queue:");
    if (!groupName || !groupName.trim()) {
        alert("Please enter a valid group name.");
        return;
    }
    
    const trimmedGroup = groupName.trim();
    
    // if group is in queue, remove group, else add group to queue
    const isInQueue = currentQueue.some(item => item === trimmedGroup);
    
    if (isInQueue) {        
        // Now move the group to the completed queue endpoint
        fetch(URL + `doneToCompleted/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([trimmedGroup])
        })
        .then(() => {
            alert(`Moved "${trimmedGroup}" to completed queue.`);
            fetchQueue();
        });
    } else {
        // add to queue
        fetch(URL + `addToWaiting/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([trimmedGroup])
        })
        .then(() => {
            alert(`Added "${trimmedGroup}" to waiting queue.`);
            fetchQueue();
        });
    }
}

// update display - ran periodically
function updateQueueDisplay(queue) {
    currentQueue = queue.waiting;

    const notGoneList = document.getElementById('notGoneList');
    const waitingList = document.getElementById('waitingList');
    const doneList = document.getElementById('doneList');

    const notGoneElements = queue.working.map(person => `<div class="card">${person}</div>`);
    notGoneList.innerHTML = notGoneElements.join('');
    waitingList.innerHTML = queue.waiting.map(person => `<div class="card">${person}</div>`).join('');
    doneList.innerHTML = queue.completed.map(person => `<div class="card">${person}</div>`).join('');

    // Check and update global person variable
    if (!person.includes("|")) {
        const matchingPerson = queue.working.find(p => p.includes(person));
        if (matchingPerson) {
            person = matchingPerson; // Update global person variable
        }
    }
}

document.getElementById('beginTimer').addEventListener('click', startTimer);

// Start the interval to periodically update the queue
function startQueueUpdateInterval(intervalInSeconds) {
    if (queueUpdateInterval) clearInterval(queueUpdateInterval); // Clear existing interval if any
    queueUpdateInterval = setInterval(() => {
        console.log("Updating queue...");
        fetchQueue();
        fetchTimerLength();
    }, intervalInSeconds * 1000);
}

// Stop the interval for queue updates if needed
function stopQueueUpdateInterval() {
    if (queueUpdateInterval) clearInterval(queueUpdateInterval);
}

window.addEventListener('load', () => {
    fetchQueue();
    fetchUser();
    showAssignmentModal();
});

function fetchUser() {
    fetch(javaURI + `/api/person/get`, {
        method: 'GET',
        cache: "no-cache",
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
            'X-Origin': 'client' 
        }
    })
    .then(response => response.json())
    .then(userInfo => {
        person = userInfo.name;

        console.log(typeof person);
        if (typeof person == 'undefined') {
            alert("Error: You are not logged in. Redirecting you to the login page.")
            let loc = window.location.href
            loc = loc => loc.split('/').slice(0, -2).join('/') || loc;
            window.location.href = loc + "/toolkit-login"
        }
    });
}

function showAssignmentModal() {
    const modal = document.getElementById('assignmentModal');
    const modalDropdown = document.getElementById('modalAssignmentDropdown');

    fetch(URL + 'debug')
    .then(response => response.json())
    .then(assignments => {
        modalDropdown.innerHTML = assignments.map(assignment =>
            `<option value="${assignment.id}">${assignment.name}</option>`
        ).join('');
    });

    modal.style.display = 'block';

    // Add event listener for the confirm button
    document.getElementById('confirmAssignment').addEventListener('click', () => {
        const selectedAssignment = modalDropdown.value;
        if (selectedAssignment) {
            assignment = selectedAssignment; // Set the global assignment variable
            fetchQueue();
            startQueueUpdateInterval(10);
            fetchTimerLength();
            modal.style.display = 'none';
        } else {
            alert('Please select an assignment.');
        }
    });
}

fetchAssignments();
fetchQueue();
