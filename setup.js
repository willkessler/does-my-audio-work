console.log('Setup script loaded');

document.getElementById('enableAccess').addEventListener('click', async function() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    document.getElementById('status').textContent = 'All set and ready to go!';
    
    chrome.runtime.sendMessage({ action: 'setupComplete' });
    
    setTimeout(() => {
      window.close();
    }, 5000);
  } catch (error) {
    console.error('Error during setup:', error);
    document.getElementById('status').textContent = 'Error: ' + error.message;
  }
});
