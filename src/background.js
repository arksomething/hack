chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('Tab activated event triggered');
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab) {
        const message = `Tab activated: ${tab.url}`;
        console.log('Sending message to server:', message);

        // Send the message to your server
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
      } else {
        console.error('Failed to get tab information');
      }
    });
});