import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Popup() {
  const [text, setText] = useState('');

  const handleExtractText = () => {
    // Query the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      // Check if tabId exists and use `executeScript` to run code in the active tab
      if (tabId) {
        chrome.scripting.executeScript(
          {
            target: { tabId },
            func: () => document.body.innerText, // Extract all text content from the page
          },
          (results) => {
            // Check if results are returned and set the text state
            if (results && results[0] && results[0].result) {
              setText(results[0].result);
            } else {
              setText("No text found or unable to access page content.");
            }
          }
        );
      }
    });
  };

  return (
    <div>
      <h2>Extract Text</h2>
      <button onClick={handleExtractText}>Extract</button>
      <textarea value={text} readOnly style={{ width: '100%', height: '200px' }} />
    </div>
  );
}


export default Popup
