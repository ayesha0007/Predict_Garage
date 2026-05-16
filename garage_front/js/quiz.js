// const API_BASE = 'http://localhost:5000/api';
// const API_BASE = window.API_BASE;
console.log("QUIZ JS LOADED");
// let sessionId = null;
// let currentUser = null;

// ================= OPEN QUIZ =================
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

    if (!data.quiz || data.quiz.length === 0) {
      alert("No quiz found for this level!");
      return;
    }

    let selectedAnswers = new Array(data.quiz.length).fill(null);

    // Render
    questionsDiv.innerHTML = data.quiz.map((q, idx) => `
      <div class="quiz-question" data-qidx="${idx}">
        <h4>${idx + 1}. ${q.question}</h4>

        ${q.options.map((opt, optIdx) => `
          <div class="quiz-option"
               data-qidx="${idx}"
               data-optidx="${optIdx}">
            ${String.fromCharCode(65 + optIdx)}. ${opt}
          </div>
        `).join('')}
      </div>
    `).join('');

    // IMPORTANT: wait DOM update
    setTimeout(() => {

      document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {

          const qidx = parseInt(opt.dataset.qidx);
          const optidx = parseInt(opt.dataset.optidx);

          selectedAnswers[qidx] = optidx;

          // remove selected only inside same question
          const parent = opt.closest('.quiz-question');

          parent.querySelectorAll('.quiz-option').forEach(el => {
            el.classList.remove('selected');
          });

          opt.classList.add('selected');
        });
      });

    }, 0);

    modal.style.display = 'flex';

    // submit
    document.getElementById('submitQuizBtn').onclick = async () => {

      const allAnswered = selectedAnswers.every(a => a !== null);

      if (!allAnswered) {
        alert("⚠️ Answer all questions!");
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

      if (result.passed) {
        alert(`🎉 Passed! +${result.xp_gained} XP`);

        if (currentUser) {
          currentUser.xp = result.total_xp;
          currentUser.energy = result.energy;
          currentUser.current_level = result.current_level;
          currentUser.badges = result.badges;
        }

        if (typeof updateUI === "function") updateUI();
        if (typeof loadLevel === "function") loadLevel(result.current_level);

        modal.style.display = 'none';

      } else {
        alert(`❌ ${result.correct_count}/5 correct`);

        if (currentUser) {
          currentUser.energy = result.energy;
        }

        if (typeof updateUI === "function") updateUI();

        if (result.energy <= 0) {
          setTimeout(() => {
            currentUser.energy = 5;
            updateUI();
          }, 120000);
        }
      }
    };

  } catch (err) {
    console.error("Quiz error:", err);
  }
}

// close modal click outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('quizModal');
  if (e.target === modal) modal.style.display = 'none';
});

window.openQuizModal = openQuizModal;