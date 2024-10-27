console.log("Content script loaded!");

const k = () => {
    console.log("TESZT")
    try {
        const textContent = document.body.innerText || document.body.textContent;
        console.log("here")
        if (textContent && textContent.trim().length > 0) {
            console.log("Text content captured successfully");
            
            console.log(textContent.toString())
            fetch("http://localhost:3000/api/explainText", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: textContent })
            })
            .then(response => {
                console.log("reponse")
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("data")
                console.log(data)
                // Corrected the spelling from 'explaination' to 'explanation'
                const explanationString = data.explanation; 
                console.log(explanationString);
                console.log(data.explanation);
                console.log(data['explanation']); // This will log just the string
                fetch("http://localhost:3000/api/sendToDiscord", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message: explanationString }) // Use the extracted string here
                })
                .catch(error => {
                    console.error("Error posting to Discord:", error);
                });
            })
            .catch(error => {
                console.error("Error posting to OpenAI:", error);
            });
        } else {
            console.log("No visible text found on the page");
        }
    } catch (error) {
        console.error("Error capturing text:", error);
    }
    
}

k()

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



