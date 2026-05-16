document.getElementById('runCodeBtn')?.addEventListener('click', async () => {
  const code = document.getElementById('codeEditor').value;
  const outputDiv = document.getElementById('compilerOutput');
  
  outputDiv.innerHTML = '<strong>Running...</strong>';
  
  try {
    const response = await fetch(`${API_BASE}/execute_code`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code})
    });
    const result = await response.json();
    
    if (result.success) {
      outputDiv.innerHTML = `<strong>Output:</strong><br><pre style="color:#10b981">${result.output}</pre>`;
    } else {
      outputDiv.innerHTML = `<strong>Error:</strong><br><pre style="color:#ef4444">${result.error}\n${result.traceback || ''}</pre>`;
    }
  } catch (error) {
    outputDiv.innerHTML = `<strong>Error:</strong><br>${error.message}`;
  }
});

document.getElementById('clearCodeBtn')?.addEventListener('click', () => {
  document.getElementById('codeEditor').value = '';
});