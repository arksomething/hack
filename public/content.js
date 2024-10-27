console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
        try {
            const textContent = document.body.innerText || document.body.textContent;
            
            if (textContent && textContent.trim().length > 0) {
                console.log("Text content captured successfully");
                sendResponse({ success: true, text: textContent });
            } else {
                console.log("No visible text found on the page");
                sendResponse({ success: false, error: "No visible text found on the page" });
            }
        } catch (error) {
            console.error("Error capturing text:", error);
            sendResponse({ success: false, error: "Error capturing text: " + error.message });
        }
    } else {
        console.log("Unknown action received");
        sendResponse({ success: false, error: "Unknown action" });
    }
    return true; // Keeps the message channel open for asynchronous response
});