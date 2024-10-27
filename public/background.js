let isMessagingActive = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'togglePeriodicMessaging') {
        isMessagingActive = !isMessagingActive;
        console.log('Periodic messaging ' + (isMessagingActive ? 'started' : 'stopped'));
        sendResponse({ success: true, isActive: isMessagingActive });
    }
    return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (isMessagingActive && changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, { action: "getText" });
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    if (isMessagingActive) {
        chrome.tabs.sendMessage(activeInfo.tabId, { action: "getText" });
    }
});