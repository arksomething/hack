let isMessagingActive = false;
let isTracking = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleTracking') {
    isTracking = request.isTracking;
    console.log('Tracking ' + (isTracking ? 'enabled' : 'disabled'));
    sendResponse({ success: true, isTracking });
  }
  return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isTracking && changeInfo.status === 'complete') {
    sendTabChangeToServer('Tab updated: ' + tab.url);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (isTracking) {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      sendTabChangeToServer('Tab activated: ' + tab.url);
    });
  }
});

function sendTabChangeToServer(message) {
  fetch('http://localhost:3000/api/tabChange', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
  .then(response => response.json())
  .then(data => console.log('Server response:', data))
  .catch(error => console.error('Error sending tab change to server:', error));
}