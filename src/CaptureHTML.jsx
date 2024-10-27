import React, { useState } from 'react';

const CaptureHTML = () => {
    const [text, setText] = useState(''); // State to hold captured text
    const [error, setError] = useState(''); // State to hold error messages

    const captureText = () => {
        // Query the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                // Send a message to the content script
                chrome.tabs.sendMessage(tabs[0].id, { action: "getText" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Runtime Error:", chrome.runtime.lastError);
                        setError("Error: Could not capture text.");
                        setText(''); // Clear text on error
                    } else if (response && response.text) {
                        setText(response.text); // Set the captured text
                        setError(''); // Clear any previous errors
                    } else {
                        setError("No text found.");
                        setText(''); // Clear text if no text found
                    }
                });
            } else {
                console.error("No active tab found.");
                setError("Error: No active tab.");
                setText(''); // Clear text on error
            }
        });
    };

    return (
        <div style={{ padding: '10px', width: '300px' }}>
            <button onClick={captureText}>Capture Text</button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '10px', border: '1px solid #ccc', padding: '5px', maxHeight: '150px', overflowY: 'auto' }}>
                {text}
            </div>
        </div>
    );
};

export default CaptureHTML;
