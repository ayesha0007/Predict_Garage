// document.getElementById('runCodeBtn')?.addEventListener('click', async () => {
//   const code = document.getElementById('codeEditor').value;
//   const outputDiv = document.getElementById('compilerOutput');
  
//   outputDiv.innerHTML = '<strong>Running...</strong>';
  
//   try {
//     const response = await fetch(`${API_BASE}/execute_code`, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({code})
//     });
//     const result = await response.json();
    
//     if (result.success) {
//       outputDiv.innerHTML = `<strong>Output:</strong><br><pre style="color:#10b981">${result.output}</pre>`;
//     } else {
//       outputDiv.innerHTML = `<strong>Error:</strong><br><pre style="color:#ef4444">${result.error}\n${result.traceback || ''}</pre>`;
//     }
//   } catch (error) {
//     outputDiv.innerHTML = `<strong>Error:</strong><br>${error.message}`;
//   }
// });

// document.getElementById('clearCodeBtn')?.addEventListener('click', () => {
//   document.getElementById('codeEditor').value = '';
// });

// const notebookContainer = document.getElementById('notebookContainer');

// // ================= ADD NEW CELL =================
// document.getElementById('addBlockBtn')?.addEventListener('click', addNewCell);

// // ================= CLEAR ALL CELLS =================
// document.getElementById('clearAllBlocksBtn')?.addEventListener('click', () => {
//   notebookContainer.innerHTML = '';
//   addNewCell(); // always keep one default cell
// });

// // ================= RUN CELL =================
// function runCell(cell) {
//   const code = cell.querySelector('.code-editor').value;
//   const outputBox = cell.querySelector('.output-box');

//   outputBox.innerHTML = '<strong>Running...</strong>';

//   fetch(`${API_BASE}/execute_code`, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({ code })
//   })
//     .then(res => res.json())
//     .then(result => {
//       if (result.success) {
//         outputBox.innerHTML = `
//           <strong>Output:</strong><br>
//           <pre style="color:#10b981">${result.output}</pre>
//         `;
//       } else {
//         outputBox.innerHTML = `
//           <strong>Error:</strong><br>
//           <pre style="color:#ef4444">${result.error}
// ${result.traceback || ''}</pre>
//         `;
//       }
//     })
//     .catch(err => {
//       outputBox.innerHTML = `<strong>Error:</strong> ${err.message}`;
//     });
// }

// // ================= CREATE NEW CELL =================
// function addNewCell() {
//   const cellCount = document.querySelectorAll('.code-cell').length + 1;

//   const cell = document.createElement('div');
//   cell.className = 'code-cell';

//   cell.innerHTML = `
//     <div class="cell-header">
//       <span>Cell ${cellCount}</span>
//       <button class="run-cell-btn">▶ Run</button>
//     </div>

//     <textarea class="code-editor" placeholder="Write Python code here..."></textarea>

//     <div class="output-box"></div>
//   `;

//   // attach run event
//   cell.querySelector('.run-cell-btn').addEventListener('click', () => {
//     runCell(cell);
//   });

//   notebookContainer.appendChild(cell);
// }

// // ================= INIT DEFAULT CELL =================
// document.addEventListener('DOMContentLoaded', () => {
//   if (notebookContainer.children.length === 0) {
//     addNewCell();
//   }
// });


const notebookContainer = document.getElementById('notebookContainer');

if (!notebookContainer) {
  console.error("notebookContainer not found in DOM");
}

// ================= ADD CELL =================
document.getElementById('addBlockBtn')?.addEventListener('click', addNewCell);

// ================= CLEAR ALL =================
document.getElementById('clearAllBlocksBtn')?.addEventListener('click', () => {
  if (!notebookContainer) return;
  notebookContainer.innerHTML = '';
  addNewCell();
});

// ================= RUN CELL =================
function runCell(cell) {
  const code = cell.querySelector('.code-editor')?.value || '';
  const outputBox = cell.querySelector('.output-box');

  outputBox.innerHTML = '<strong>Running...</strong>';

  fetch(`${API_BASE}/execute_code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      session_id: window.sessionId || null
    })
  })
    .then(res => res.json())
    .then(result => {
      
      let html = '';

      if (result.success) {

        html += `
          <strong>Output:</strong>
          <pre style="white-space: pre; overflow-x: auto; color:#10b981">${result.output || ''}</pre>
        `;

        // ✅ IMPORTANT: plot handling
        if (result.image) {
          html += `
            <div style="margin-top:10px;">
              <strong>Plot:</strong><br>
              <img src="data:image/png;base64,${result.image}" 
                   style="max-width:100%; border-radius:8px; margin-top:8px;" />
            </div>
          `;
        }

      } else {
        html = `
          <strong>Error:</strong>
          <pre style="color:#ef4444">
${result.error || ''}
${result.traceback || ''}
          </pre>
        `;
      }

      outputBox.innerHTML = html;
    })
    .catch(err => {
      outputBox.innerHTML = `<strong>Error:</strong> ${err.message}`;
    });
}

// ================= CREATE CELL =================
function addNewCell() {
  if (!notebookContainer) return;

  const cellCount = document.querySelectorAll('.code-cell').length + 1;

  const cell = document.createElement('div');
  cell.className = 'code-cell';

  cell.innerHTML = `
    <div class="cell-header">
      <span>Cell ${cellCount}</span>
      <button class="run-cell-btn">▶ Run</button>
    </div>

    <textarea class="code-editor" placeholder="Write Python code here..."></textarea>

    <div class="output-box"></div>
  `;

  cell.querySelector('.run-cell-btn')?.addEventListener('click', () => {
    runCell(cell);
  });

  notebookContainer.appendChild(cell);
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {
  if (notebookContainer && notebookContainer.children.length === 0) {
    addNewCell();
  }
});