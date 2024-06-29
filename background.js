console.log('Background script loaded');

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install" || details.reason === "update") {
    chrome.storage.local.set({ setupComplete: false });
    
    // Reload all tabs that match our host permissions
    chrome.tabs.query({url: [
      "*://*.google.com/*",
      "*://*.zoom.us/*",
      "*://meet.google.com/*"
    ]}, (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.reload(tab.id);
      }
    });
  }
});

// Feature detection for chrome.action or chrome.browserAction
const actionApi = chrome.action || chrome.browserAction;

if (actionApi && actionApi.onClicked) {
  actionApi.onClicked.addListener((tab) => {
    chrome.storage.local.get('setupComplete', (data) => {
      if (!data.setupComplete) {
        chrome.tabs.create({ url: 'setup.html' });
      } else {
        console.log('Setup already complete');
      }
    });
  });
} else {
  console.warn('Neither chrome.action nor chrome.browserAction is available');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  if (message.action === 'setupComplete') {
    chrome.storage.local.set({ setupComplete: true });
  } else if (message.action === 'checkDevices') {
    chrome.tabs.create({ url: "check.html" }, (tab) => {
      chrome.storage.local.set({url: message.url});
    });
  }
});
