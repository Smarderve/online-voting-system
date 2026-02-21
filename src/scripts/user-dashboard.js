// ===== Dark Mode =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);

    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
}

function loadDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
}

// Call this function when the page loads
loadDarkModePreference();


// ===== Voting Timer =====//

function startVotingCountdown() {
    const totalTime = 6 * 60 * 60; // Total voting time in seconds (6 hours)
    let timeLeft = totalTime;

    const countdownEl = document.getElementById('countdown');
    const timerBar = document.getElementById('timerProgress');

    if (!countdownEl || !timerBar) {
        console.error('Countdown or Timer Progress element not found!');
        return;
    }

    const interval = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        countdownEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        const progress = (timeLeft / totalTime) * 100;
        timerBar.style.width = `${progress}%`;

        if (timeLeft < 600) {
            timerBar.style.backgroundColor = '#ef4444';
        } else if (timeLeft < 1800) {
            timerBar.style.backgroundColor = '#f59e0b';
        } else {
            timerBar.style.backgroundColor = '#10b981';
        }

        if (timeLeft <= 0) {
            clearInterval(interval);
            countdownEl.textContent = 'Voting Ended';
            timerBar.style.width = '0%';
            notifyUser('⏰ Voting period has ended!', 'info');
            disableAllVoting();
        }

        timeLeft--;
    }, 1000);
}

function notifyUser(message, type = 'info') {
    alert(message);
}

function disableAllVoting() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = '#ccc';
        button.style.cursor = 'not-allowed';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    startVotingCountdown();
});
function disableAllVoting() {
    document.querySelectorAll('.btn-vote').forEach(btn => {
        btn.disabled = true;
        btn.textContent = '🔒 Voting Closed';
        btn.style.opacity = '0.5';
    });
}
// ===== Logout =====
function logout() {
    if (confirm('Are you sure you want to logout? Your votes will be saved.')) {
        notifyUser('👋 Logged out successfully!', 'info');
        setTimeout(() => {
            alert('Redirecting to login...');
            // window.location.href = '/login.html';
        }, 1500);
    }
}

function toggleFaculty(id) {
    const all = document.getElementsByClassName("faculty-content");
    for (let content of all) {
        if (content.id !== id) {
            content.style.display = "none"; // Hide all other sections
        }
    }
    const target = document.getElementById(id);
    target.style.display = target.style.display === "block" ? "none" : "block"; // Toggle the selected section

    // Scroll to the selected faculty section
    if (target.style.display === "block") {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function openModal(name, course, origin, author, text, img) {
    document.getElementById("modalName").innerText = name;
    document.getElementById("modalCourse").innerText = course;
    document.getElementById("modalOrigin").innerText = origin;
    document.getElementById("modalAuthor").innerText = author;
    document.getElementById("modalText").innerText = text;
    document.getElementById("modalImage").src = img;
    document.getElementById("selaModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("selaModal").style.display = "none";
}
/* ===============================
   VOTING SYSTEM SELECTION FIX
================================ */

let selectedPresident = null;               // Track selected President
let selectedFacultyCandidate = null;        // Track single faculty candidate
let selectedFacultyName = null;             // Track the faculty of selected candidate

/* -------- SELECT PRESIDENT -------- */
function selectPresident(button, name) {
    if (selectedPresident && selectedPresident !== name) {
        alert("❌ You can select ONLY ONE President.");
        return;
    }

    // remove highlight from all president buttons
    document.querySelectorAll("#president .vote-btn")
        .forEach(btn => btn.classList.remove("selected"));

    // highlight clicked button
    button.classList.add("selected");
    selectedPresident = name;

    alert(`✅ President "${name}" selected successfully!`);
}

/* -------- SELECT FACULTY VOTER -------- */
function selectFaculty(button, name, faculty) {
    // check if user already selected a candidate
    if (selectedFacultyCandidate) {
        alert("❌ You have already selected a candidate in a faculty!");
        return;
    }

    // highlight the clicked button
    button.classList.add("selected");

    // store selected candidate info
    selectedFacultyCandidate = name;
    selectedFacultyName = faculty;

    alert(`✅ Candidate "${name}" selected successfully in ${faculty}!`);
}

