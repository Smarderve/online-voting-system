
      // candidates data
      const CANDIDATES = {
        c1: {
          id: "c1",
          position: "president",
          name: "Candidate One",
          fullName: "Candidate One",
          role: "President",
          type: "gen",
          typeLabel: "President Position",
          faculty: "All Faculties",
          course: "Bachelor of Computer Science",
          year: "3rd Year",
          bio: "Committed to academic excellence and student welfare across all KIUT faculties. Advocates for improved campus facilities and stronger student representation.",
          manifesto: "My campaign is built on three pillars academic quality, student welfare, and transparent governance. I believe every student deserves access to quality learning resources, responsive administration, and a voice in university decisions. If elected, I will meet with the Dean of Students quarterly, publish monthly reports on student government activities, and advocate for improved hostel conditions and cafeteria quality.",
          slogans: "1. Monthly open forum meetings with students and administration.\n2. Establish a student emergency fund for financial hardship cases.\n3. Negotiate extended library and lab hours.\n4. Create a formal student feedback system for course quality.",
        },
        c2: {
          id: "c2",
          position: "president",
          name: "Candidate Two",
          fullName: "Candidate Two",
          role: "President",
          type: "gen",
          typeLabel: "President Position",
          faculty: "All Faculties",
          course: "Bachelor of Laws",
          year: "2nd Year",
          bio: "Focused on transparent communication and student-administration relations. Plans to establish a formal student grievance resolution committee.",
          manifesto: "Good governance starts with listening. As a Law student I understand the importance of proper channels, accountability, and documented processes. I will formalize the relationship between the student government and university administration through written agreements and measurable commitments. No more verbal promises that go unfulfilled.",
          slogans: "1. Establish a written Student Rights Charter with the university.\n2. Create a digital grievance system with 72-hour response guarantee.\n3. Introduce student representation on key university committees.\n4. Publish a monthly accountability report on all SG activities.",
        },
        m1: {
          id: "m1",
          position: "mp",
          name: "Candidate One",
          fullName: "MP One",
          role: "Member of Parliament",
          type: "fac",
          typeLabel: "Faculty Position",
          faculty: "Computing and IT",
          course: "Bachelor of Computer Science",
          year: "3rd Year",
          bio: "3rd year Computer Science student committed to improving lab resources, internet access, and industry attachment opportunities for computing students.",
          manifesto: "The Computing and IT faculty is the backbone of the digital future, yet our students face outdated equipment, unreliable internet, and limited industry exposure. I have spent two years documenting these challenges and building relationships with local tech companies who are ready to partner with us. My election means real change backed by real plans.",
          slogans: "1. Negotiate 100Mbps dedicated internet for the computing labs.\n2. Partner with 5 local tech firms for annual internship placements.\n3. Introduce weekly coding workshops led by industry professionals.\n4. Upgrade at least 30 lab computers within the first semester.",
        },
        m2: {
          id: "m2",
          position: "mp",
          name: "Candidate Two",
          fullName: "MP Two",
          role: "Member of Parliament",
          type: "fac",
          typeLabel: "Faculty Position",
          faculty: "Computing and IT",
          course: "Bachelor of IT",
          year: "2nd Year",
          bio: "2nd year IT student with student organizing experience. Focused on connecting computing students with tech companies and internship programs.",
          manifesto: "The gap between what we study and what industry needs is too wide. I have personally organized three industry visits this year and seen how much our students benefit from real-world exposure. As MP, I will make industry connection a permanent, structured part of the Computing and IT experience not just occasional trips, but sustained partnerships.",
          slogans: "1. Establish a Computing and IT alumni mentorship program.\n2. Organize a biannual Tech Career Fair exclusive to our faculty.\n3. Create a shared project repository for student portfolios.\n4. Introduce a peer tutoring program with student facilitators.",
        },
        m3: {
          id: "m3",
          position: "mp",
          name: "Candidate Three",
          fullName: "MP Three",
          role: "Member of Parliament",
          type: "fac",
          typeLabel: "Faculty Position",
          faculty: "Computing and IT",
          course: "Diploma in Computer Science",
          year: "2nd Year",
          bio: "Diploma CS student advocating for extended computer lab hours, affordable printing services, and a stronger alumni network for computing graduates.",
          manifesto: "As a Diploma student I represent the students who are often overlooked in faculty decisions that tend to favour degree programmes. My campaign is about equity within our faculty equal access to resources, equal representation in decisions, and equal opportunities for all computing students regardless of their programme level.",
          slogans: "1. Extend computing lab hours to 10pm on weekdays and open on Saturdays.\n2. Negotiate subsidized printing rates for computing assignments.\n3. Create a Diploma-to-Degree transition support programme.\n4. Form a Computing and IT WhatsApp community managed by elected reps.",
        },
        m4: {
          id: "m4",
          position: "mp",
          name: "Candidate Four",
          fullName: "MP Four",
          role: "Member of Parliament",
          type: "fac",
          typeLabel: "Faculty Position",
          faculty: "Computing and IT",
          course: "Bachelor of Computer Science",
          year: "3rd Year",
          bio: "Passionate about bridging theory and practical skills. Plans to organize monthly hackathons, coding competitions, and industry mentorship sessions.",
          manifesto: "We learn the theory. We write the code. But when we leave, do we have a portfolio? Do we have real projects? My campaign focuses on making our time at KIUT count by ensuring every student leaves with practical experience, a professional network, and projects they are proud of. Hackathons, open-source contributions, and industry partnerships will be the pillars of my tenure.",
          slogans: "1. Monthly faculty hackathon with prizes from industry sponsors.\n2. Launch a KIUT Computing open-source project on GitHub.\n3. Partner with Andela and Zindi for international exposure opportunities.\n4. Create a student-run tech help desk for the university community.",
        },
      };

      // vote state 
      const votes = { president: null, mp: null };
      let currentModalId = null;

      // initialize page state 
      window.onload = function () {
        if (PAGE_STATE === "already-voted") {
          document.getElementById("state-voted").style.display = "";
        } else if (PAGE_STATE === "results-out") {
          document.getElementById("state-voted").style.display = "";
          document.getElementById("viewResultsBtn").classList.add("show");
          // update announcement text
          document.querySelector(
            "#state-voted .results-announce span",
          ).innerHTML =
            "The election results have been announced. Click below to view the official results.";
        } else {
          document.getElementById("state-voting").style.display = "";
        }
      };

      // select candidate 
      function selectCand(position, id, card) {
        const grid = card.closest(".cand-grid");
        grid.querySelectorAll(".cand-card").forEach((c) => {
          c.classList.remove("sel");
          c.querySelector(".cand-select-btn").innerHTML =
            `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg> Vote`;
        });
        card.classList.add("sel");
        card.querySelector(".cand-select-btn").innerHTML =
          `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Voted`;
        votes[position] = id;
        if (position === "president") {
          document.getElementById("pres-cnt").textContent = "1";
          document.getElementById("val1").classList.remove("show");
        }
        if (position === "mp") {
          document.getElementById("mp-cnt").textContent = "1";
          document.getElementById("val2").classList.remove("show");
        }
        // update modal select button if open
        if (currentModalId) updateModalBtn();
      }

      // step navigation 
      function goStep(n) {
        document.querySelectorAll(".panel").forEach((p) => p.classList.remove("on"));
        document.getElementById("panel-" + n).classList.add("on");
        updateProgress(n);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function toStep2() {
        if (!votes.president) {
          document.getElementById("val1").classList.add("show");
          return;
        }
        goStep(2);
      }
      function toStep3() {
        if (!votes.mp) {
          document.getElementById("val2").classList.add("show");
          return;
        }
        buildReview();
        goStep(3);
      }

      // build review 
      function buildReview() {
        const items = [
          {
            key: "president",
            posLabel: "President",
            type: "gen",
            typeLabel: "President Position",
          },
          {
            key: "mp",
            posLabel: "MP Computing and IT",
            type: "fac",
            typeLabel: "MP Position",
          },
        ];
        document.getElementById("reviewList").innerHTML = items
          .map((item) => {
            const cd = CANDIDATES[votes[item.key]];
            return `
              <div class="review-item">
                <div class="ri-avatar"></div>
                <div class="ri-body">
                  <div class="ri-pos">${item.posLabel}</div>
                  <div class="ri-name">${cd.fullName}</div>
                </div>
                <span class="ri-type ${item.type}">${item.typeLabel}</span>
                <button class="ri-change" onclick="goStep(${item.type === "gen" ? 1 : 2})">Change</button>
              </div>`;
                  })
          .join("");
      }

      // submit 
      function submitVote() {
        const btn = document.getElementById("submitBtn");
        btn.classList.add("loading");
        btn.disabled = true;
        setTimeout(() => {
          btn.classList.remove("loading");
          buildSuccessReceipt();
          goStep(4);
          document.querySelector(".progress-bar").style.display = "none";
        }, 1600);
      }

      function buildSuccessReceipt() {
        const now = new Date();
        const ts = now.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) +
          ", " +
          now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
        document.getElementById("successReceiptContent").innerHTML = `
          <div class="r-row"><span class="r-k">Voter ID</span><span class="r-v">DCS/34231/2501/DT</span></div>
          <div class="r-row"><span class="r-k">Submitted</span><span class="r-v">${ts}</span></div>
          <div class="r-row"><span class="r-k">Positions Voted</span><span class="r-v">2 of 2</span></div>
          <div class="r-row"><span class="r-k">President</span><span class="r-v">Voted ✓</span></div>
          <div class="r-row"><span class="r-k">MP Computing and IT</span><span class="r-v">Voted ✓</span></div>`;
      }

      // progress bar 
      function updateProgress(step) {
        for (let i = 1; i <= 4; i++) {
          const c = document.getElementById("pc" + i),
            l = document.getElementById("pl" + i);
          c.classList.remove("active", "done");
          l.classList.remove("active", "done");
          if (i < step) {
            c.classList.add("done");
            l.classList.add("done");
            if (i < 4)
              c.innerHTML =
                '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
          } else if (i === step) {
            c.classList.add("active");
            l.classList.add("active");
            if (i < 4) c.textContent = i;
          } else {
            if (i < 4) c.textContent = i;
          }
        }
        for (let i = 1; i <= 3; i++) {
          document
            .getElementById("pline" + i)
            .classList.toggle("done", i < step);
        }
      }

      // candidate profile modal 
      function openProfile(id) {
        currentModalId = id;
        const cd = CANDIDATES[id];
        document.getElementById("modalName").textContent = cd.fullName;
        document.getElementById("modalRole").textContent = cd.role;
        document.getElementById("modalAbout").textContent = cd.bio;
        document.getElementById("modalFullName").textContent = cd.fullName;
        document.getElementById("modalPosition").textContent = cd.role;
        document.getElementById("modalFaculty").textContent = cd.faculty;
        document.getElementById("modalCourse").textContent = cd.course;
        document.getElementById("modalYear").textContent = cd.year;
        document.getElementById("modalManifesto").textContent = cd.manifesto;
        document.getElementById("modalPledges").textContent = cd.slogans;
        updateModalBtn();
        document.getElementById("profileModal").classList.add("open");
      }

      function updateModalBtn() {
        const cd = CANDIDATES[currentModalId];
        const isSelected = votes[cd.position] === currentModalId;
        const btn = document.getElementById("modalSelectBtn");
        btn.className = "modal-select-btn" + (isSelected ? " sel" : "");
        btn.innerHTML = isSelected
          ? '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Voted'
          : '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Vote For This Candidate';
      }

      function selectFromModal() {
        const cd = CANDIDATES[currentModalId];
        const card = document.getElementById("card-" + currentModalId);
        selectCand(cd.position, currentModalId, card);
        updateModalBtn();
      }

      function closeProfile() {
        document.getElementById("profileModal").classList.remove("open");
        currentModalId = null;
      }

      document.getElementById("profileModal").addEventListener("click", (e) => {
        if (e.target === document.getElementById("profileModal"))
          closeProfile();
      });

      // vote receipt toggle (already-voted state) 
      function toggleReceipt() {
        const receipt = document.getElementById("votedReceipt");
        const label = document.getElementById("receiptToggleLabel");
        const isOpen = receipt.classList.toggle("open");
        label.textContent = isOpen
          ? "Hide Vote Receipt"
          : "View Vote Receipt";
      }