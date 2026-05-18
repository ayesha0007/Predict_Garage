// const API_BASE = 'http://localhost:5000/api';
// const API_BASE = window.API_BASE;
console.log("QUIZ JS LOADED");
// let sessionId = null;
// let currentUser = null;

// ================= OPEN QUIZ =================
// async function openQuizModal(level) {
//   try {
//     const res = await fetch(`${API_BASE}/get_quiz`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ level })
//     });

//     const data = await res.json();

//     const modal = document.getElementById('quizModal');
//     const questionsDiv = document.getElementById('quizQuestions');

//     if (!data.quiz || data.quiz.length === 0) {
//       alert("No quiz found for this level!");
//       return;
//     }

//     let selectedAnswers = new Array(data.quiz.length).fill(null);

//     // Render
//     questionsDiv.innerHTML = data.quiz.map((q, idx) => `
//       <div class="quiz-question" data-qidx="${idx}">
//         <h4>${idx + 1}. ${q.question}</h4>

//         ${q.options.map((opt, optIdx) => `
//           <div class="quiz-option"
//                data-qidx="${idx}"
//                data-optidx="${optIdx}">
//             ${String.fromCharCode(65 + optIdx)}. ${opt}
//           </div>
//         `).join('')}
//       </div>
//     `).join('');

//     // IMPORTANT: wait DOM update
//     setTimeout(() => {

//       document.querySelectorAll('.quiz-option').forEach(opt => {
//         opt.addEventListener('click', () => {

//           const qidx = parseInt(opt.dataset.qidx);
//           const optidx = parseInt(opt.dataset.optidx);

//           selectedAnswers[qidx] = optidx;

//           // remove selected only inside same question
//           const parent = opt.closest('.quiz-question');

//           parent.querySelectorAll('.quiz-option').forEach(el => {
//             el.classList.remove('selected');
//           });

//           opt.classList.add('selected');
//         });
//       });

//     }, 0);

//     modal.style.display = 'flex';

//     // submit
//     document.getElementById('submitQuizBtn').onclick = async () => {

//       const allAnswered = selectedAnswers.every(a => a !== null);

//       if (!allAnswered) {
//         alert("⚠️ Answer all questions!");
//         return;
//       }

//       const submitRes = await fetch(`${API_BASE}/submit_quiz`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           session_id: sessionId,
//           level,
//           answers: selectedAnswers
//         })
//       });

//       const result = await submitRes.json();

//       if (result.passed) {
//         alert(`🎉 Passed! +${result.xp_gained} XP`);

//         if (currentUser) {
//           currentUser.xp = result.total_xp;
//           currentUser.energy = result.energy;
//           currentUser.current_level = result.current_level;
//           currentUser.badges = result.badges;
//         }

//         if (typeof updateUI === "function") updateUI();
//         if (typeof loadLevel === "function") loadLevel(result.current_level);

//         modal.style.display = 'none';

//       } else {
//         alert(`❌ ${result.correct_count}/5 correct`);

//         if (currentUser) {
//           currentUser.energy = result.energy;
//         }

//         if (typeof updateUI === "function") updateUI();

//         if (result.energy <= 0) {
//           setTimeout(() => {
//             currentUser.energy = 5;
//             updateUI();
//           }, 120000);
//         }
//       }
//     };

//   } catch (err) {
//     console.error("Quiz error:", err);
//   }
// }

// // close modal click outside
// window.addEventListener('click', (e) => {
//   const modal = document.getElementById('quizModal');
//   if (e.target === modal) modal.style.display = 'none';
// });

// window.openQuizModal = openQuizModal;



// const MAX_XP = 40;

// // =============================
// // OPEN QUIZ MODAL
// // =============================
// async function openQuizModal(level) {

//   try {

//     // get quiz
//     const res = await fetch(`${API_BASE}/get_quiz`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         level: level
//       })
//     });

//     const data = await res.json();

//     const modal =
//       document.getElementById('quizModal');

//     const questionsDiv =
//       document.getElementById('quizQuestions');

//     const submitBtn =
//       document.getElementById('submitQuizBtn');


//     if (
//       !data.quiz ||
//       data.quiz.length === 0
//     ) {

//       alert(
//         "No quiz available for this level."
//       );

//       return;
//     }

//     // selected answers
//     let selectedAnswers =
//       new Array(
//         data.quiz.length
//       ).fill(null);


//     // =============================
//     // RENDER QUESTIONS
//     // =============================
//     questionsDiv.innerHTML =
//       data.quiz.map((q, qIndex) => `

//         <div class="quiz-question">

//           <h4>
//             ${qIndex + 1}. ${q.question}
//           </h4>

//           ${q.options.map((option, optionIndex) => `

//             <div
//               class="quiz-option"
//               data-qindex="${qIndex}"
//               data-optionindex="${optionIndex}"
//             >

//               ${String.fromCharCode(
//                 65 + optionIndex
//               )}. ${option}

//             </div>

//           `).join('')}

//         </div>

//       `).join('');



//     // =============================
//     // OPTION CLICK
//     // =============================
//     setTimeout(() => {

//       const allOptions =
//         document.querySelectorAll(
//           '.quiz-option'
//         );

//       allOptions.forEach(option => {

//         option.onclick = () => {

//           const qIndex =
//             parseInt(
//               option.dataset.qindex
//             );

//           const optionIndex =
//             parseInt(
//               option.dataset.optionindex
//             );

//           // save answer
//           selectedAnswers[
//             qIndex
//           ] = optionIndex;

//           // remove old selection
//           const parent =
//             option.closest(
//               '.quiz-question'
//             );

//           parent
//             .querySelectorAll(
//               '.quiz-option'
//             )
//             .forEach(el => {
//               el.classList.remove(
//                 'selected'
//               );
//             });

//           // new select
//           option.classList.add(
//             'selected'
//           );

//         };

//       });

//     }, 0);



//     // show modal
//     modal.style.display =
//       'flex';



//     // =============================
//     // SUBMIT QUIZ
//     // =============================
//     submitBtn.onclick =
//       async () => {

//       // all answered?
//       const allAnswered =
//         selectedAnswers.every(
//           answer =>
//             answer !== null
//         );

//       if (!allAnswered) {

//         alert(
//           "⚠️ Answer all questions first."
//         );

//         return;
//       }


//       // submit answers
//       const submitRes =
//         await fetch(
//           `${API_BASE}/submit_quiz`,
//           {
//             method: 'POST',

//             headers: {
//               'Content-Type':
//                 'application/json'
//             },

//             body: JSON.stringify({

//               session_id:
//                 sessionId,

//               level:
//                 level,

//               answers:
//                 selectedAnswers

//             })

//           }
//         );


//       const result =
//         await submitRes.json();



//       // =============================
//       // PASS
//       // =============================
//       if (
//         result.success &&
//         result.passed
//       ) {

//         alert(
//           `🎉 Level Complete!\n\n+5 XP\nXP: ${result.xp}/${MAX_XP}`
//         );


//         if (currentUser) {

//           currentUser.xp =
//             result.xp;

//           currentUser.max_xp =
//             result.max_xp;

//           currentUser.xp_percent =
//             result.xp_percent;

//           currentUser.energy =
//             result.energy;

//           currentUser.current_level =
//             result.level;

//           currentUser.badges =
//             result.badges;

//           currentUser.completed_levels =
//             result.completed_levels;

//         }


//         // refresh dashboard
//         if (
//           typeof updateUI ===
//           "function"
//         ) {
//           updateUI();
//         }


//         // load next level
//         if (
//           typeof loadLevel ===
//           "function"
//         ) {

//           loadLevel(
//             result.level
//           );

//         }


//         // close modal
//         modal.style.display =
//           'none';

//       }



//       // =============================
//       // FAIL
//       // =============================
//       else {

//         alert(
//           `❌ Failed\n\nScore: ${result.correct}/5`
//         );


//         if (currentUser) {

//           currentUser.energy =
//             result.energy;

//         }


//         if (
//           typeof updateUI ===
//           "function"
//         ) {

//           updateUI();

//         }


//         // energy recovery
//         if (
//           result.energy <= 0 &&
//           currentUser
//         ) {

//           setTimeout(() => {

//             currentUser.energy =
//               5;

//             if (
//               typeof updateUI ===
//               "function"
//             ) {

//               updateUI();

//             }

//           }, 120000);

//         }

//       }

//     };

//   }

//   catch (error) {

//     console.error(
//       "Quiz Error:",
//       error
//     );

//   }

// }



// // =============================
// // CLOSE MODAL (OUTSIDE CLICK)
// // =============================
// window.addEventListener(
//   'click',
//   (event) => {

//     const modal =
//       document.getElementById(
//         'quizModal'
//       );

//     if (
//       event.target === modal
//     ) {

//       modal.style.display =
//         'none';

//     }

//   }
// );


// // global access
// window.openQuizModal =
//   openQuizModal;


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