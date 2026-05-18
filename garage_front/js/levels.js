function updateProgressCircle() {

  const circle = document.getElementById("progressCircle");
  if (!circle || !currentUser) return;
  
  const totalLevels = 8;
  const completed = currentUser.completed_levels?.length || 0;
  const percent = Math.round((completed / totalLevels) * 100);
  
  // Update the percentage text
  circle.innerHTML = `${percent}%`;
  
  // Update the conic gradient
  circle.style.background = `
    radial-gradient(
      closest-side,
      #0f172a 78%,
      transparent 80% 100%
    ),
    conic-gradient(
      #4ade80 0% ${percent}%,
      #334155 ${percent}% 100%
    )
  `;
}

window.updateProgressCircle = updateProgressCircle;