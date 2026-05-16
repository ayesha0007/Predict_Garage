// const API_BASE = 'http://localhost:5000/api';
// let sessionId = null;
// let currentUser = null;
// let currentLevelContent = null;

// // Initialize
// document.getElementById('startGameBtn').addEventListener('click', async () => {
//   const username = document.getElementById('usernameInput').value.trim();
//   if (!username) {
//     document.getElementById('loginMessage').innerHTML = '<span style="color:red">Please enter your name!</span>';
//     return;
//   }
  
//   sessionId = 'user_' + Date.now();
  
//   try {
//     const response = await fetch(`${API_BASE}/login`, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({username, session_id: sessionId})
//     });
//     const data = await response.json();
    
//     if (data.success) {
//       currentUser = data.user_data;
//       document.getElementById('loginScreen').style.display = 'none';
//       document.getElementById('app').style.display = 'flex';
//       updateUI();
//       loadLevel(currentUser.current_level);
      
//       // Play background music
//       playBackgroundMusic();
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     document.getElementById('loginMessage').innerHTML = '<span style="color:red">Server error! Make sure backend is running.</span>';
//   }
// });

// function updateUI() {
//   document.getElementById('userNameDisplay').textContent = currentUser.username;
//   document.getElementById('avatarLetter').textContent = currentUser.username[0].toUpperCase();
//   document.getElementById('xpPoints').textContent = currentUser.xp;
//   document.getElementById('xpTotal').textContent = currentUser.xp;
//   document.getElementById('energyCount').textContent = `${currentUser.energy}/5`;
//   document.getElementById('levelNum').textContent = currentUser.current_level;
  
//   const xpPercent = (currentUser.xp / 1000) * 100;
//   document.getElementById('xpFillBar').style.width = `${xpPercent}%`;
  
//   // Update level list
//   const levelList = document.getElementById('levelList');
//   levelList.innerHTML = '';
//   for (let i = 1; i <= 8; i++) {
//     const isCompleted = currentUser.completed_levels.includes(i);
//     const isLocked = i > currentUser.current_level && !isCompleted;
    
//     const levelDiv = document.createElement('div');
//     levelDiv.className = `menu-item ${currentUser.current_level === i ? 'active' : ''}`;
//     levelDiv.innerHTML = `
//       <i class="ri-${isCompleted ? 'checkbox-circle-fill' : (isLocked ? 'lock-line' : 'star-line')}"></i>
//       <span>Level ${i}</span>
//       ${isCompleted ? '<i class="ri-check-line"></i>' : ''}
//     `;
//     if (!isLocked) {
//       levelDiv.onclick = () => loadLevel(i);
//     }
//     levelList.appendChild(levelDiv);
//   }
// }

// async function loadLevel(level) {
//   currentUser.current_level = level;
//   document.getElementById('levelNum').textContent = level;
  
//   // Load default learn tab
//   await loadTabContent(level, 'learn');
//   updateRightPanel();
// }

// async function loadTabContent(level, tab) {
//   try {
//     const response = await fetch(`${API_BASE}/get_level_content`, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({level, tab})
//     });
//     const data = await response.json();
    
//     const centerPanel = document.getElementById('centerPanel');
//     centerPanel.innerHTML = `
//       <div class="lesson-card">
//         <div class="tabs">
//           <div class="tab ${tab === 'learn' ? 'active' : ''}" onclick="loadTabContent(${level}, 'learn')">Learn</div>
//           <div class="tab ${tab === 'example' ? 'active' : ''}" onclick="loadTabContent(${level}, 'example')">Example</div>
//           <div class="tab ${tab === 'keypoints' ? 'active' : ''}" onclick="loadTabContent(${level}, 'keypoints')">Key Points</div>
//         </div>
//         <div class="content-text">
//           ${marked.parse(data.content)}
//         </div>
//         <div style="margin-top: 32px;">
//           <button class="btn-primary" onclick="startQuiz(${level})">📝 Take Quiz →</button>
//         </div>
//       </div>
//     `;
//   } catch (error) {
//     console.error('Error loading content:', error);
//   }
// }

// function updateRightPanel() {
//   const rightPanel = document.getElementById('rightPanel');
//   rightPanel.innerHTML = `
//     <div class="widget">
//       <h3>Current Mission</h3>
//       <div class="mission-list">
//         <div class="mission-item">
//           <i class="ri-${currentUser.completed_levels.includes(currentUser.current_level) ? 'checkbox-circle-fill' : 'checkbox-blank-circle-line'}"></i>
//           Complete Level ${currentUser.current_level}
//         </div>
//         <div class="mission-item">
//           <i class="ri-${currentUser.energy > 0 ? 'flashlight-fill' : 'flashlight-line'}"></i>
//           Energy: ${currentUser.energy}/5
//         </div>
//       </div>
//     </div>
//     <div class="widget">
//       <h3>Badges Earned</h3>
//       <div class="badge-grid">
//         ${currentUser.badges.map(badge => `<div class="badge"><div class="badge-icon">🏆</div><p>${badge}</p></div>`).join('')}
//       </div>
//     </div>
//   `;
// }

// function startQuiz(level) {
//   openQuizModal(level);
// }

// function playBackgroundMusic() {
//   // Simple audio implementation
//   const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
//   audio.loop = true;
//   audio.volume = 0.3;
//   audio.play().catch(e => console.log('Audio play failed:', e));
// }

// // Overview button
// document.getElementById('overviewBtn')?.addEventListener('click', () => {
//   const centerPanel = document.getElementById('centerPanel');
//   centerPanel.innerHTML = `
//     <div class="lesson-card">
//       <h2>🎯 Mission Overview</h2>
//       <p>Welcome to AutoML Quest! You'll learn to build a car price prediction model step by step.</p>
//       <ul style="margin-top: 20px; color:#cbd5e1;">
//         <li>✅ Level 1: Understanding datasets</li>
//         <li>✅ Level 2: Building your dataset</li>
//         <li>✅ Level 3: Importing libraries</li>
//         <li>✅ Level 4: Exploratory Data Analysis</li>
//         <li>✅ Level 5: Preprocessing data</li>
//         <li>✅ Level 6: Training models</li>
//         <li>✅ Level 7: Understanding ML algorithms</li>
//         <li>✅ Level 8: Model evaluation</li>
//       </ul>
//       <p style="margin-top: 20px;">Complete each level's quiz to unlock the next level!</p>
//     </div>
//   `;
// });

// // Open compiler
// document.getElementById('openCompilerBtn')?.addEventListener('click', () => {
//   document.getElementById('compilerModal').style.display = 'flex';
// });

// document.getElementById('closeCompilerBtn')?.addEventListener('click', () => {
//   document.getElementById('compilerModal').style.display = 'none';
// });

// window.loadTabContent = loadTabContent;
// window.startQuiz = startQuiz;


const API_BASE = 'http://localhost:5000/api';
window.API_BASE = API_BASE;
// window.API_BASE = 'http://localhost:5000/api';

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
      loadLevel(currentUser.current_level);

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
  document.getElementById('userNameDisplay').textContent = currentUser.username;
  document.getElementById('avatarLetter').textContent =
    currentUser.username[0].toUpperCase();

  document.getElementById('xpPoints').textContent = currentUser.xp;
  document.getElementById('xpTotal').textContent = currentUser.xp;

  document.getElementById('energyCount').textContent = currentUser.energy;
  document.getElementById('levelNum').textContent = currentUser.current_level;

  const xpPercent = (currentUser.xp / 1000) * 100;
  document.getElementById('xpFillBar').style.width = `${xpPercent}%`;

  renderLevelList();
}


// ================= LEVEL LIST =================
function renderLevelList() {
  const levelList = document.getElementById('levelList');
  levelList.innerHTML = '';

  for (let i = 1; i <= 8; i++) {
    const isCompleted = currentUser.completed_levels.includes(i);
    const isLocked = i > currentUser.current_level && !isCompleted;

    const div = document.createElement('div');
    div.className = `menu-item ${i === currentUser.current_level ? 'active' : ''}`;

    div.innerHTML = `
      <i class="ri-${isCompleted ? 'checkbox-circle-fill' :
        isLocked ? 'lock-line' : 'star-line'}"></i>
      <span>Level ${i}</span>
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
  currentUser.current_level = level;

  document.getElementById('levelNum').textContent = level;

  await loadTabContent(level, 'learn');
  updateRightPanel();
}


// ================= LOAD TAB CONTENT =================
async function loadTabContent(level, tab) {
  try {
    const response = await fetch(`${API_BASE}/get_level_content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, tab })
    });

    const data = await response.json();

    const centerPanel = document.getElementById('centerPanel');

    centerPanel.innerHTML = `
      <div class="lesson-card">

        <div class="tabs">
          <div class="tab ${tab === 'learn' ? 'active' : ''}"
            onclick="loadTabContent(${level}, 'learn')">Learn</div>

          <div class="tab ${tab === 'example' ? 'active' : ''}"
            onclick="loadTabContent(${level}, 'example')">Example</div>

          <div class="tab ${tab === 'keypoints' ? 'active' : ''}"
            onclick="loadTabContent(${level}, 'keypoints')">Key Points</div>
        </div>

        <div class="content-text">
          ${marked.parse(data.content)}
        </div>

        <div style="margin-top: 25px;">
          <button class="btn-primary" onclick="startQuiz(${level})">
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

  rightPanel.innerHTML = `
    <div class="widget">
      <h3>Current Mission</h3>
      <div class="mission-list">
        <div class="mission-item">
          <i class="ri-${'checkbox-circle-fill'}"></i>
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
          .map(b => `<div class="badge"><div class="badge-icon">🏆</div><p>${b}</p></div>`)
          .join('')}
      </div>
    </div>
  `;
}


// ================= OVERVIEW =================
// ================= OVERVIEW BUTTON =================
document.getElementById('overviewBtn')?.addEventListener('click', () => {
  document.getElementById('centerPanel').innerHTML = `
    <div class="lesson-card">
      <h2>🎯 Overview</h2>
      <p>Learn ML step by step using AutoML Quest.</p>
    </div>
  `;
});


// ================= IDE OPEN =================
document.getElementById('openCompilerBtn')?.addEventListener('click', () => {
  document.getElementById('compilerModal').style.display = 'flex';
});


// ================= IDE CLOSE =================
document.getElementById('closeCompilerBtn')?.addEventListener('click', () => {
  document.getElementById('compilerModal').style.display = 'none';
});


// ================= QUIZ =================
// function startQuiz(level) {
//   openQuizModal(level);
// }
function startQuiz(level) {
    console.log("window.openQuizModal =", window.openQuizModal);

    if (!window.openQuizModal) {
        alert("quiz.js not loaded");
        return;
    }

    window.openQuizModal(level);
}


// ================= MUSIC =================
function playBackgroundMusic() {
  const audio = new Audio(
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  );

  audio.loop = true;
  audio.volume = 0.3;

  audio.play().catch(() => {
    console.log('Autoplay blocked');
  });
}


// expose global functions
window.loadTabContent = loadTabContent;
window.startQuiz = startQuiz;