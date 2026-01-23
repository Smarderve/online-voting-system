
//==============================Sections Navigation============================
        
        /* function navigate(page) {

            //Get all page sections
            const sections = document.querySelectorAll(".page-section");

            //hide all sections

            sections.forEach(function (section) {
                section.style.display = "none";
            });

            //Show the selected section

            const targetSelection = document.getElementById(page + "-section");
            if (targetSelection) {
                targetSelection.style.display = "block";
            }

            //Initially show dashboard section

            navigate('dashboard'); 
        }*/
    
    document.addEventListener("DOMContentLoaded", function () {
        const buttons = document.querySelectorAll(".nav-links");
        const sections = document.querySelectorAll(".page-section");

        buttons.forEach(btn => {
            btn.addEventListener("click", function () {
                const target = btn.dataset.target;

                function hideAllSections() {
                    sections.forEach(sec => sec.classList.remove("active"));
                    document.getElementById(target).classList.add("active");
                }
               
                sections.forEach(sec => sec.style.display = "none");
                buttons.forEach(b => b.classList.remove("active"));

                
                document.getElementById(target).style.display = "flex";
                this.classList.add("active");

                window.onload = function () {
                    showSection("dashboard");
                }
            });
        });
    });


//=======================================Hidden Form===========================

function openCandidatesForm() {
    document.getElementById("candidates-form-box").classList.add("active");
} 

function closeCandidatesForm() {
    document.getElementById("candidates-form-box").classList.remove("active");
}

//=======================+===============Graphs================================

//chart1

const ctx = document.getElementById('votesChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Candidate1', 'Candidate2', 'Candidate3', 'Candidate4', 'Candidate5', 'Candidate6'],
      datasets: [{
        label: 'Number of Votes',
        data: [120, 190, 30, 50, 20, 30],
        backgroundColor: 'rgb(0, 129, 0)',
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

//==============================Sidebar Toggle============================

        const sidebar = document.querySelector(".sidebar");
        const toggleBtn = document.getElementById("hamburger-toogle");

        toggleBtn.addEventListener("click", function () {
            sidebar.classList.toggle("collapsed");
        });
