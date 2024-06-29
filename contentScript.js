console.log('Content script loaded');

function isConferenceLink(url) {
  return url.includes('zoom.us') || url.includes('meet.google.com');
}

document.addEventListener('click', function(event) {
  let target = event.target;
  while (target && target.tagName !== 'A') {
    target = target.parentElement;
  }
  
  if (target && target.href && isConferenceLink(target.href)) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Conference link clicked:', target.href);
    chrome.runtime.sendMessage({action: 'checkDevices', url: target.href});
  }
}, true);
