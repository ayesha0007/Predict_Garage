const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://your-app.onrender.com/api";
window.API_BASE = API_BASE;

let sessionId = null;
let currentUser = null;
let currentLevel = 1;

// ================= LOGIN =================
document.getElementById('startGameBtn').addEventListener('click', async () => {

  const username = document.getElementById('usernameInput').value.trim();

  if (!username) {
    document.getElementById('loginMessage').innerHTML =
      '<span style="color:red">Please enter your name!</span>';
    return;
  }

  sessionId = 'user_' + Date.now();

  try {

    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, session_id: sessionId })
    });

    const data = await response.json();

    if (data.success) {

      currentUser = data.user_data;

      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('app').style.display = 'flex';

      updateUI();
      
      // Call loadOverview from the new file
      if (typeof window.loadOverview === 'function') {
        window.loadOverview(currentUser, currentLevel);
      }
      
      renderLevelList();

      playBackgroundMusic();
    }

  } catch (err) {

    console.error(err);

    document.getElementById('loginMessage').innerHTML =
      '<span style="color:red">Server error!</span>';
  }
});

// ================= UI UPDATE =================
function updateUI() {

  if (!currentUser) return;

  document.getElementById('userNameDisplay').textContent =
    currentUser.username;

  document.getElementById('avatarLetter').textContent =
    currentUser.username[0].toUpperCase();

  document.getElementById('xpPoints').textContent =
    currentUser.xp;

  document.getElementById('xpTotal').textContent =
    currentUser.xp;

  document.getElementById('energyCount').textContent =
    currentUser.energy;

  document.getElementById('levelNum').textContent =
    currentUser.current_level;

  const xpPercent =
    Math.min((currentUser.xp / 40) * 100, 100);

  document.getElementById('xpFillBar').style.width =
    `${xpPercent}%`;
}


// ================= LEVEL LIST =================
function renderLevelList() {

  const levelList =
    document.getElementById('levelList');

  levelList.innerHTML = '';

  for (let i = 1; i <= 8; i++) {

    const isCompleted =
      currentUser.completed_levels.includes(i);

    const isLocked =
      i > currentUser.current_level && !isCompleted;

    const div = document.createElement('div');

    div.className =
      `menu-item ${i === currentLevel ? 'active' : ''}`;

    div.innerHTML = `
      <i class="ri-${
        isCompleted
          ? 'checkbox-circle-fill'
          : isLocked
            ? 'lock-line'
            : 'star-line'
      }"></i>
      <span>Level ${i} </span>
    `;

    if (!isLocked) {
      div.onclick = () => loadLevel(i);
    }

    levelList.appendChild(div);
  }
}


// ================= LOAD LEVEL =================
async function loadLevel(level) {

  currentLevel = level;

  if (currentUser) {
    currentUser.current_level = level;
  }

  document.getElementById('levelNum').textContent =
    `Level ${level}`;

  await loadTabContent(level, 'learn');

  renderLevelList();
  updateRightPanel();
}


// ================= LOAD TAB =================
async function loadTabContent(level, tab) {

  try {

    const response = await fetch(`${API_BASE}/get_level_content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, tab })
    });

    const data = await response.json();

    const centerPanel =
      document.getElementById('centerPanel');

    centerPanel.innerHTML = `
      <div class="lesson-card">

        <h2 style="margin-bottom:10px">
          Level ${level}
        </h2>

        <div class="tabs">

          <div class="tab ${tab === 'learn' ? 'active' : ''}"
            onclick="loadTabContent(${level}, 'learn')">
            Learn
          </div>

          <div class="tab ${tab === 'example' ? 'active' : ''}"
            onclick="loadTabContent(${level}, 'example')">
            Example
          </div>

          <div class="tab ${tab === 'keypoints' ? 'active' : ''}"
            onclick="loadTabContent(${level}, 'keypoints')">
            Key Points
          </div>

          <div class="tab ${tab === 'suggestions' ? 'active' : ''}"
            onclick="loadTabContent(${level}, 'suggestions')">
            Suggestions
          </div>

        </div>

        <div class="content-text">
          ${marked.parse(data.content)}
        </div>

        <div style="margin-top: 25px;">
          <button class="btn-primary"
            onclick="startQuiz(${level})">
            📝 Take Quiz →
          </button>
        </div>

      </div>
    `;

  } catch (err) {
    console.error(err);
  }
}


// ================= RIGHT PANEL =================
function updateRightPanel() {
  const rightPanel = document.getElementById('rightPanel');
  
  // Calculate progress for the circle
  const totalLevels = 8;
  const completed = currentUser.completed_levels?.length || 0;
  const percent = Math.round((completed / totalLevels) * 100);
  
  rightPanel.innerHTML = `
    <!-- ADD THIS NEW WIDGET for Progress Circle -->
    <div class="widget">
      <h3>📊 Overall Progress</h3>
      <div style="text-align: center; padding: 15px;">
        <div id="progressCircle" style="
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: white;
          background: conic-gradient(#4ade80 0% ${percent}%, #334155 ${percent}% 100%);
        ">${percent}%</div>
        <p style="margin-top: 10px; font-size: 12px; color: #94a3b8;">
          ${completed}/8 Levels Completed
        </p>
      </div>
    </div>

    <!-- Your existing widgets -->
    <div class="widget">
      <h3>Current Mission</h3>
      <div class="mission-list">
        <div class="mission-item">
          <i class="ri-checkbox-circle-fill"></i>
          Level ${currentLevel}
        </div>
        <div class="mission-item">
          <i class="ri-flashlight-fill"></i>
          Energy: ${currentUser.energy}/5
        </div>
      </div>
    </div>

    <div class="widget">
      <h3>Badges</h3>
      <div class="badge-grid">
        ${currentUser.badges
          .map(b => `
            <div class="badge">
              <div class="badge-icon">🏆</div>
              <p>${b}</p>
            </div>
          `).join('')}
      </div>
    </div>
  `;
  
  // Now the element exists, so this will work!
  updateProgressCircle();
}


// ================= OVERVIEW =================
document.getElementById('overviewBtn')?.addEventListener('click', () => {
  if (typeof window.loadOverview === 'function') {
    window.loadOverview(currentUser, currentLevel);
  }
});

// ================= IDE =================
document.getElementById('openCompilerBtn')?.addEventListener('click', () => {

  const url =
    `/compiler.html?session_id=${sessionId || 'guest_' + Date.now()}`;

  window.open(url, '_blank');
});

// ================= QUIZ =================
function startQuiz(level) {

  if (!currentUser) return;

  if (currentUser.energy <= 0) {
    alert("⚠️ No energy left. Please wait for recovery also make a quick revesion.");
    return;
  }

  if (!window.openQuizModal) {
    alert("Quiz system not loaded");
    return;
  }

  window.openQuizModal(level);
}

// ================= MUSIC =================
function playBackgroundMusic() {

  const audio =
    new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

  audio.loop = true;
  audio.volume = 0.0;

  audio.play().catch(() => {
    console.log('Autoplay blocked');
  });
}

// expose global functions
window.loadTabContent = loadTabContent;
window.startQuiz = startQuiz;
window.loadLevel = loadLevel;
window.updateProgressCircle = updateProgressCircle;