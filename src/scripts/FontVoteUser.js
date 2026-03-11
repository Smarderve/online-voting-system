// Navigation
function toggleMenu() { document.getElementById("navLinks").classList.toggle("active"); }
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => { document.getElementById("navLinks").classList.remove("active"); }));
function scrollToSection(id) {
    const sec = document.getElementById(id);
    sec.scrollIntoView({ behavior: 'smooth' });
    if (id === 'candidates') { updateCandidatesView(); }
}

// Show modal login/register
function showLoginForm() { document.getElementById('formOverlay').style.display = 'flex'; showLogin(); }
function showRegister() { document.getElementById("loginForm").classList.add("hidden"); document.getElementById("registerForm").classList.remove("hidden"); document.getElementById('formOverlay').style.display = 'flex'; }
function showLogin() { document.getElementById("registerForm").classList.add("hidden"); document.getElementById("loginForm").classList.remove("hidden"); document.getElementById('formOverlay').style.display = 'flex'; }

// Users
let users = [], currentUser = null;

// Registration
function registerUser() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const regNum = document.getElementById('regNumber').value;
    const phone = document.getElementById('phoneNumber').value;
    const pass = document.getElementById('regPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!name || !email || !regNum || !pass || !confirm) { alert("All fields required"); return; }
    if (pass !== confirm) { alert("Passwords do not match"); return; }

    users.push({ name, email, regNum, phone, pass });
    alert("Account created successfully! Please login.");
    showLogin();
}

// Login
function studentLogin() {
    const reg = document.getElementById('loginReg').value;
    const pass = document.getElementById('loginPass').value;
    const user = users.find(u => u.regNum === reg && u.pass === pass);
    if (!user) { alert("Invalid login"); return; }
    currentUser = user;
    alert("Login successful!");
    document.getElementById('formOverlay').style.display = 'none';
    updateCandidatesView();
    scrollToSection('candidates');
}

// Show candidates after login
function updateCandidatesView() {
    if (currentUser) {
        document.getElementById('candidateList').style.display = 'flex';
        document.getElementById('candidatesMessage').style.display = 'none';
    } else {
        document.getElementById('candidateList').style.display = 'none';
        document.getElementById('candidatesMessage').style.display = 'block';
    }
}

// Background slideshow
const homeSection = document.getElementById('home');
const bgImages = ['../../assets/images/kiut.1.jpeg', '../../assets/images/twiga.jpeg', '../../assets/images/affear.jpeg'];
let bgIndex = 0;
function changeBackground() { homeSection.style.backgroundImage = `url('${bgImages[bgIndex]}')`; bgIndex = (bgIndex + 1) % bgImages.length; setTimeout(changeBackground, 4000); }
changeBackground();