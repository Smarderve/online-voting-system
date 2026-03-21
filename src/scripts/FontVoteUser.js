let users = [];
let currentUser = null;

/* Toggle mobile menu */
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

/* Show selected section */
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');

    if (sectionId === 'candidates') {
        if (currentUser === null) {
            document.getElementById('candidatesMessage').style.display = 'block';
            document.getElementById('candidateList').style.display = 'none';
        } else {
            document.getElementById('candidatesMessage').style.display = 'none';
            document.getElementById('candidateList').style.display = 'flex';
        }
    }

    document.getElementById(sectionId).style.display = 'flex';
    document.getElementById("navLinks").classList.remove("active");
}

/* Register new user */
function registerUser() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const regNum = document.getElementById('regNumber').value;
    const pass = document.getElementById('regPassword').value;

    if (!name || !email || !regNum || !pass) {
        alert("All fields are required!");
        return;
    }

    users.push({ name, email, regNum, pass });
    alert("Registration successful! Please login.");
    showSection('login');
}

/* Login existing user */
function studentLogin() {
    const reg = document.getElementById('loginReg').value;
    const pass = document.getElementById('loginPass').value;

    const user = users.find(u => u.regNum === reg && u.pass === pass);
    if (!user) {
        alert("Invalid Registration Number or Password");
        return;
    }

    currentUser = user;
    alert("Login successful! Redirecting to Candidates...");
    showSection('candidates');
}

//  BACKGROUND SLIDESHOW 
const homeSection = document.getElementById('home');
const bgImages = [
    '../../assets/images/affear.jpeg',
    '../../assets/images/kiut.1.jpeg',
    '../../assets/images/twiga.jpeg'

];
const bgTimes = [3000, 5000, 4000];
let bgIndex = 0;

function changeBackground() {
    homeSection.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
    setTimeout(() => {
        bgIndex = (bgIndex + 1) % bgImages.length;
        changeBackground();
    }, bgTimes[bgIndex]);
}

changeBackground();