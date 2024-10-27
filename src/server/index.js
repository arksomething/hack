import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { explainTextWithOpenAI } from '../api/openAiApi.js';

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Replace 'YOUR_DISCORD_BOT_TOKEN' with your actual Discord bot token
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
// Replace 'YOUR_CHANNEL_ID' with the actual channel ID where you want to send messages
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

client.once('ready', () => {
  console.log('Discord bot is ready!');
});

client.login(DISCORD_BOT_TOKEN);

async function sendToDiscord(message) {
  try {
    const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
    if (channel) {
      await channel.send(message);
      console.log('Message sent to Discord successfully');
      return { success: true, message: 'Message sent to Discord' };
    } else {
      console.error('Discord channel not found');
      return { success: false, error: 'Discord channel not found' };
    }
  } catch (error) {
    console.error('Error sending message to Discord:', error);
    return { success: false, error: 'Failed to send message to Discord' };
  }
}

app.post('/api/saveText', (req, res) => {
    const { text } = req.body;
    console.log('Received text:', text);
    // Here you would typically save the text to a database or file
    res.json({ message: 'Text received successfully' });
});

app.post('/api/explainText', async (req, res) => {
    const { text } = req.body;
    try {
        const explanation = await explainTextWithOpenAI(text);
        console.log('OpenAI summarization successful:', explanation);
        res.json({ explanation });
    } catch (error) {
        console.error("Error explaining text:", error);
        res.status(500).json({ error: "Error explaining text" });
    }
});

app.post('/api/sendToDiscord', async (req, res) => {
    const { message } = req.body;
    try {
        const result = await sendToDiscord(message);
        res.json(result);
    } catch (error) {
        console.error("Error sending to Discord:", error);
        res.status(500).json({ success: false, error: "Error sending to Discord" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

