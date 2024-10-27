import React, { useState } from 'react';
import { sendTextToServer } from './api/serverApi';

const CaptureHTML = () => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const captureText = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "getText" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Runtime Error:", chrome.runtime.lastError);
                        setError("Error: Could not capture text. " + chrome.runtime.lastError.message);
                        setText('');
                    } else if (response && response.success) {
                        setText(response.text);
                        setError('');
                        sendCapturedText(response.text);
                    } else {
                        setError(response.error || "Unknown error occurred");
                        setText('');
                    }
                });
            } else {
                console.error("No active tab found.");
                setError("Error: No active tab.");
                setText('');
            }
        });
    };

    const sendCapturedText = async (capturedText) => {
        try {
            await sendTextToServer(capturedText);
            console.log("Text sent to server successfully");
        } catch (error) {
            console.error("Error sending text to server:", error);
            setError("Error sending text to server: " + error.message);
        }
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