console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
        // Get the visible text content of the document
        const textContent = document.body.innerText || document.body.textContent;
        console.log(textContent)
        sendResponse({ text: textContent });
    } else {
        sendResponse({ error: "Unknown action" });
    }
});