const SERVER_URL = 'http://localhost:3000';
const SAVE_TEXT_URL = `${SERVER_URL}/api/saveText`;
const OPENAI_URL = `${SERVER_URL}/api/explainText`;

export const sendTextToServer = async (text) => {
    try {
        console.log('Sending text to server:', text); // Added this line
        const response = await fetch(SAVE_TEXT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            console.error('Server response:', response); // Added this line
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Server response:', data); // Added this line
        return data;
    } catch (error) {
        console.error("Error sending text to server:", error);
        throw error;
    }
};

export const getExplanationFromOpenAI = async (text) => {
    try {
        const response = await fetch(OPENAI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.explanation;
    } catch (error) {
        console.error("Error getting explanation from OpenAI:", error);
        throw error;
    }
};

export const sendExplanationToDiscord = async (explanation) => {
    try {
        const response = await fetch(`${SERVER_URL}/api/sendToDiscord`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: explanation }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Sent to Discord:', data);
        return data;
    } catch (error) {
        console.error('Error sending to Discord:', error);
        throw error;
    }
};