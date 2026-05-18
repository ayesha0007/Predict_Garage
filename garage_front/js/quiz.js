const MAX_XP = 40;

let submitLock = false;

// =============================
// OPEN QUIZ MODAL
// =============================
async function openQuizModal(level) {

  try {

    const res = await fetch(`${API_BASE}/get_quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level })
    });

    const data = await res.json();

    const modal = document.getElementById('quizModal');
    const questionsDiv = document.getElementById('quizQuestions');
    const submitBtn = document.getElementById('submitQuizBtn');

    if (!data.quiz || data.quiz.length === 0) {
      alert("No quiz available for this level.");
      return;
    }

    let selectedAnswers = new Array(data.quiz.length).fill(null);

    // =============================
    // RENDER QUESTIONS
    // =============================
    questionsDiv.innerHTML = data.quiz.map((q, qIndex) => `
      <div class="quiz-question">

        <h4>${qIndex + 1}. ${q.question}</h4>

        ${q.options.map((option, optionIndex) => `
          <div class="quiz-option"
               data-qindex="${qIndex}"
               data-optionindex="${optionIndex}">
            ${String.fromCharCode(65 + optionIndex)}. ${option}
          </div>
        `).join('')}

      </div>
    `).join('');

    // =============================
    // OPTION SELECT
    // =============================
    setTimeout(() => {

      document.querySelectorAll('.quiz-option').forEach(option => {

        option.onclick = () => {

          const qIndex = parseInt(option.dataset.qindex);
          const optionIndex = parseInt(option.dataset.optionindex);

          selectedAnswers[qIndex] = optionIndex;

          const parent = option.closest('.quiz-question');

          parent.querySelectorAll('.quiz-option')
            .forEach(el => el.classList.remove('selected'));

          option.classList.add('selected');
        };

      });

    }, 0);

    modal.style.display = 'flex';

    // =============================
    // SUBMIT QUIZ
    // =============================
    submitBtn.onclick = async () => {

      if (submitLock) return;
      submitLock = true;

      try {

        const allAnswered = selectedAnswers.every(a => a !== null);

        if (!allAnswered) {
          alert("⚠️ Answer all questions first.");
          submitLock = false;
          return;
        }

        const submitRes = await fetch(`${API_BASE}/submit_quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            level,
            answers: selectedAnswers
          })
        });

        const result = await submitRes.json();

        // =============================
        // ENERGY EMPTY STATE
        // =============================
        if (result.energy_empty) {
          alert(result.message || "Energy empty. Please wait.");

          submitLock = false;
          return;
        }

        // =============================
        // PASS
        // =============================
        if (result.success && result.passed) {

          alert(
            `🎉 Level Complete!\n\n` +
            `+${result.xp_gained} XP\n` +
            `Total XP: ${result.total_xp}/${MAX_XP}`
          );

          if (currentUser) {
            currentUser.xp = result.total_xp;
            currentUser.energy = result.energy;
            currentUser.current_level = result.current_level;
            currentUser.badges = result.badges;
            currentUser.completed_levels = result.completed_levels;
          }

          if (typeof updateUI === "function") updateUI();
          if (typeof loadLevel === "function") loadLevel(result.current_level);

          modal.style.display = 'none';
        }

        // =============================
        // FAIL
        // =============================
        else {

          alert(`❌ Failed\n\nScore: ${result.correct_count}/5`);

          if (currentUser) {
            currentUser.energy = result.energy;
          }

          if (typeof updateUI === "function") updateUI();

          if (result.energy <= 0) {
            setTimeout(() => {

              currentUser.energy = 5;
              if (typeof updateUI === "function") updateUI();

            }, 120000);
          }
        }

      } catch (err) {
        console.error("Quiz submit error:", err);
      }

      submitLock = false;
    };

  } catch (error) {
    console.error("Quiz Error:", error);
  }
}

// =============================
// OUTSIDE CLICK CLOSE MODAL
// =============================
window.addEventListener('click', (event) => {
  const modal = document.getElementById('quizModal');
  if (event.target === modal) modal.style.display = 'none';
});

// global
window.openQuizModal = openQuizModal;