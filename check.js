async function checkDevices() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log('Microphone is working!');

    // Check if sound is being received
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function checkAudio() {
      analyser.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      if (sum > 0) {
        console.log('Sound detected from microphone');
        alert('Sound checks out. Proceeding to meeting');
        proceedToMeeting();
      } else {
        console.log('No sound detected... looping.');
        requestAnimationFrame(checkAudio);
      }
    }

    checkAudio();
  } catch (error) {
    console.error('Device check failed:', error);
    document.body.innerText = 'There was a problem with your microphone. Please check and try again.';
  }
}

function proceedToMeeting() {
  chrome.storage.local.get('url', data => {
    if (data.url) {
      window.location.href = data.url; // Redirect to the meeting
    }
  });
}

function proceedToMeeting() {
  chrome.storage.local.get('url', data => {
    if (data.url) {
      // Check if the URL is encoded
      let decodedUrl = data.url;
      try {
        decodedUrl = decodeURIComponent(data.url);
      } catch (e) {
        console.error('Error decoding URL:', e);
      }
      window.location.href = decodedUrl; // Redirect to the meeting
    }
  });
}

checkDevices();
