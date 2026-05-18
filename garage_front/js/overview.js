// ================= OVERVIEW FUNCTIONS =================

function loadOverview(currentUser, currentLevel) {
  if (!currentUser) return;
  
  document.getElementById('levelNum').textContent = "Overview";

  document.getElementById('centerPanel').innerHTML = `
    <div class="lesson-card">
      <h2>🎯 Overview</h2>
      <p>Welcome ${currentUser.username}! Start your learning journey step by step.</p>
      
      <div style="margin: 20px 0; padding: 15px; background: #1e293b; border-radius: 10px;">
        <h3>📊 Your Stats</h3>
        <p>✨ XP: ${currentUser.xp}/40</p>
        <p>⚡ Energy: ${currentUser.energy}/5</p>
        <p>🏆 Completed Levels: ${currentUser.completed_levels?.length || 0}/8</p>
      </div>
      
      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button class="btn-primary" onclick="window.loadLevel(${currentUser.current_level})">
          ▶ Continue Level ${currentUser.current_level}
        </button>
        
        <button class="btn-secondary" onclick="window.loadTabContent(${currentUser.current_level}, 'learn')">
          📚 Review Current Level
        </button>
      </div>
      
      <div style="margin-top: 30px;">
        <h3>🎯 Learning Path</h3>
        <div style="margin-top: 15px;">
          ${generateLearningPath(currentUser)}
        </div>
      </div>
    </div>
  `;

  if (typeof window.renderLevelList === 'function') {
    window.renderLevelList();
  }
  
  if (typeof window.updateRightPanel === 'function') {
    window.updateRightPanel();
  }
}

function generateLearningPath(currentUser) {
  const totalLevels = 8;
  let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
  
  for (let i = 1; i <= totalLevels; i++) {
    const isCompleted = currentUser.completed_levels?.includes(i);
    const isCurrent = i === currentUser.current_level;
    const isLocked = i > currentUser.current_level && !isCompleted;
    
    let statusIcon = '⭕';
    let statusColor = '#64748b';
    
    if (isCompleted) {
      statusIcon = '✅';
      statusColor = '#22c55e';
    } else if (isCurrent) {
      statusIcon = '📍';
      statusColor = '#3b82f6';
    } else if (isLocked) {
      statusIcon = '🔒';
      statusColor = '#475569';
    }
    
    html += `
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px; 
                  background: ${isCurrent ? '#1e293b' : 'transparent'}; 
                  border-radius: 8px;">
        <span style="font-size: 20px; color: ${statusColor};">${statusIcon}</span>
        <span style="flex: 1; font-weight: ${isCurrent ? 'bold' : 'normal'};">Level ${i}</span>
        ${isCompleted ? '<span style="color: #22c55e; font-size: 12px;">Completed</span>' : ''}
        ${isCurrent ? '<span style="color: #3b82f6; font-size: 12px;">Current</span>' : ''}
      </div>
    `;
  }
  
  html += '</div>';
  return html;
}

// Add a refresh function to update overview when data changes
function refreshOverview() {
  if (window.currentUser && document.getElementById('levelNum')?.textContent === "Overview") {
    loadOverview(window.currentUser, window.currentLevel);
  }
}

// Export functions to global scope
window.loadOverview = loadOverview;
window.generateLearningPath = generateLearningPath;
window.refreshOverview = refreshOverview;