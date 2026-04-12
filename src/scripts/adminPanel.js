// manage sections titles
      const TITLES = {
        overview: 'Overview',
        elections: 'Manage Elections',
        positions: 'Manage Positions',
        candidates: 'Manage Candidates',
        results: 'Vote Results',
        voters: 'Registered Voters',
        announcements: 'Announcements',
        reports: 'Reports',
        notifications: 'Notifications',
        logs: 'System Logs',
        past: 'Past Elections',
        settings: 'Settings'
      }
      // sidebar collapse (desktop)
      function toggleSidebar() {
        const sb = document.getElementById('sidebar')
        sb.classList.toggle('collapsed')
      }
      // section navigation 
      function nav(btn) {

        if (!btn) return
        const id = btn.dataset.section
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'))
        document.querySelectorAll('.sb-item').forEach(b => b.classList.remove('active'))
        const sec = document.getElementById('sec-' + id)

        if (sec) sec.classList.add('active')
        btn.classList.add('active')
        document.getElementById('topbar-title').textContent = TITLES[id] || id
        closeAllDrops()

        if (window.innerWidth < 900)
          document.getElementById('sidebar').classList.remove('mob-open')
        window.scrollTo(0, 0)

        if (id === 'overview') initTrend()
        if (id === 'results') initResults()
      }
      // dropdowns 
      function toggleDrop(id) {
        const el = document.getElementById(id)
        const was = el.classList.contains('open')
        closeAllDrops()
        if (!was) el.classList.add('open')
      }
      function closeAllDrops() {
        document.querySelectorAll('.notif-dropdown,.profile-dropdown').forEach(d => d.classList.remove('open'))
      }
      document.addEventListener('click', e => {
        if (
          !e.target.closest('[onclick*="toggleDrop"]') &&
          !e.target.closest('.notif-dropdown') &&
          !e.target.closest('.profile-dropdown')
        )
          closeAllDrops()
      })
      // form modals
      function openModal(id) {
        document.getElementById(id).classList.add('open')
      }
      function closeModal(id) {
        document.getElementById(id).classList.remove('open')
      }
      document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', e => {
          if (e.target === o) o.classList.remove('open')
        })
      )
      // voter panel 
      function openVoterPanel() {
        document.getElementById('voterPanel').classList.add('open')
      }
      function closeVoterPanel() {
        document.getElementById('voterPanel').classList.remove('open')
      }
      // mobile drawer 
      function openDrawer() {
        document.getElementById('mobDrawer').classList.add('open')
      }
      function closeDrawer() {
        document.getElementById('mobDrawer').classList.remove('open')
      }
      // mobile bottom navbar
      function setBn(el) {
        document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('on'))
        el.classList.add('on')
      }
      // audience /users announcement filter
      function selAud(el) {
        document.querySelectorAll('.aud-pill').forEach(p => p.classList.remove('on'))
        el.classList.add('on')
      }
      // settings panels
      function switchSettings(el) {
        document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('on'))
        document.querySelectorAll('.sn-item').forEach(i => i.classList.remove('on'))
        const sp = el.dataset.sp
        document.getElementById('sp-' + sp).classList.add('on')
        el.classList.add('on')
      }
      // position type toggle
      function toggleFacSel() {
        document.getElementById('facSelGroup').style.display =
          document.getElementById('posType').value === 'f' ? '' : 'none'
      }
      // theme 
      // ========== THEME TOGGLE ==========
      (function() {
        const THEME_KEY = 'kiutso-admin-theme';
        const html = document.documentElement;

        function getStoredTheme() {
          return localStorage.getItem(THEME_KEY) || 'system';
        }

        function applyTheme(theme) {
          if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
          } else if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
          } else {
            html.removeAttribute('data-theme');
          }
        }

        function updateButtons(activeTheme) {
          document.querySelectorAll('.theme-opt').forEach(btn => {
            const btnTheme = btn.getAttribute('data-theme');
            btn.classList.toggle('on', btnTheme === activeTheme);
          });
        }

        window.setTheme = function(theme, clickedBtn) {
          localStorage.setItem(THEME_KEY, theme);
          applyTheme(theme);
          updateButtons(theme);
        };

        // Init
        const stored = getStoredTheme();
        applyTheme(stored);
        updateButtons(stored);
      })();
      // voter tabs filter
      function filterV(t, el) {
        document.querySelectorAll('.vt').forEach(b => b.classList.remove('on'))
        el.classList.add('on')
      }
      // notifications filter 
      document.querySelectorAll('.nf-btn').forEach(b =>
        b.addEventListener('click', function () {
          document.querySelectorAll('.nf-btn').forEach(x => x.classList.remove('on'))
          this.classList.add('on')
        })
      )
      // profile photo upload part
      function handlePhotoUpload(e) {
        const file = e.target.files[0]

        if (!file) return
        const reader = new FileReader()
        reader.onload = ev => {
          const src = ev.target.result

          // update settings profile preview
          const img = document.getElementById('profilePhotoImg')
          img.src = src
          img.style.display = 'block'
          document.getElementById('photoPreview').childNodes[0].textContent = ''

          // update sidebar avatar
          const sbImg = document.getElementById('sbAvatarImg')
          sbImg.src = src
          sbImg.style.display = 'block'
          document.getElementById('sbAvatar').childNodes[0].textContent = ''

          // update topbar avatar
          const tbImg = document.getElementById('topbarAvatarImg')
          tbImg.src = src
          tbImg.style.display = 'block'
          document.getElementById('topbarAvatarLetter').style.display = 'none'
        }
        reader.readAsDataURL(file)
      }
      // charts 
      let tc = null,
        rc = null
      const chartFont = { family: 'Poppins', size: 11 }
      const gridColor = 'rgba(0,0,0,.05)'
      const tickColor = '#000'

      //Votes Chart
      function initTrend() {
        if (tc) return
        const ctx = document.getElementById('trendChart')

        if (!ctx) return
        tc = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              '8am',
              '9am',
              '10am',
              '11am',
              '12pm',
              '1pm',
              '2pm',
              '3pm',
              '4pm',
              '5pm'
            ],
            datasets: [
              {
                label: 'Votes',
                data: [12, 19, 8, 25, 30, 18, 22, 15, 10, 5],
                backgroundColor: 'rgba(10,48,24,.75)',
                hoverBackgroundColor: 'rgba(5,28,14,.9)',
                borderRadius: 5,
                borderSkipped: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: gridColor },
                ticks: { font: chartFont, color: tickColor }
              },
              x: {
                grid: { display: false },
                ticks: { font: chartFont, color: tickColor }
              }
            }
          }
        })
      }
      //Results Chart
      function initResults() {
        if (rc) return
        const ctx = document.getElementById('resultsChart')

        if (!ctx) return
        rc = new Chart(ctx, {
          type: 'bar',
          indexAxis: 'y',
          data: {
            labels: [
              'Candidate One',
              'Candidate Two',
              'Candidate Three',
              'Candidate Four',
              'Candidate Five',
              'Candidate Six',
              'Candidate Seven'
            ],
            datasets: [
              {
                label: 'Votes',
                data: [55, 40, 25, 18, 12, 22, 16],
                backgroundColor: [
                  'rgba(10,48,24,.8)',
                  'rgba(10,48,24,.65)',
                  'rgba(10,48,24,.5)',
                  'rgba(16, 17, 7, 0.8)',
                  'rgba(7, 7, 7, 0.6)',
                  'rgba(121, 80, 27, 0.8)',
                  'rgba(124, 80, 5, 0.6)'
                ],
                borderRadius: 5,
                borderSkipped: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                beginAtZero: true,
                grid: { color: gridColor },
                ticks: { font: chartFont, color: tickColor }
              },
              y: {
                grid: { display: false },
                ticks: { font: chartFont, color: tickColor }
              }
            }
          }
        })
      }
      // init on load
      initTrend()