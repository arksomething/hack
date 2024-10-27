const SERVER_URL = 'http://localhost:3000/api/saveText'; // Adjust this to your server's URL

export const sendTextToServer = async (text) => {
    try {
        const response = await fetch(SERVER_URL, {
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
        return data;
    } catch (error) {
        console.error("Error sending text to server:", error);
        throw error;
    }
};