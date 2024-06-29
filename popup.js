document.getElementById('enableAccess').addEventListener('click', function() {
  console.log('enableAccess in here');
  alert('hi');
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      alert('Access granted. You are all set!');
      stream.getTracks().forEach(track => track.stop()); // Stop using the stream
      window.close(); // Close the popup after access is granted
    })
    .catch(function(error) {
      console.error('Access denied or error:', error);
      alert('Uhoh, Access denied or error: ' + error.message);
    });
});
