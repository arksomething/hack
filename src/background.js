let periodicMessagingInterval = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'togglePeriodicMessaging') {
        if (periodicMessagingInterval) {
            clearInterval(periodicMessagingInterval);
            periodicMessagingInterval = null;
            console.log('Periodic messaging stopped in background');
        } else {
            periodicMessagingInterval = setInterval(() => {
                fetch('http://localhost:3000/api/sendToDiscord', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: `Periodic message sent at ${new Date().toLocaleString()}` }),
                });
            }, 45000);
            console.log('Periodic messaging started in background');
        }
        sendResponse({ success: true });
    }
    return true; // Keeps the message channel open for asynchronous response
});