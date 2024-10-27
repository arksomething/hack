import axios from 'axios';
import { addMessage, getHistory } from '../services/conversationService';

export async function sendToOpenAI(userMessage) {
  try {
    // Add the user's message to the conversation history
    addMessage('user', userMessage);

    // Get the current conversation history
    const messages = getHistory();

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: messages
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content;

    // Add the AI's response to the conversation history
    addMessage('assistant', aiResponse);

    return aiResponse;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
