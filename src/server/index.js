import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { explainTextWithOpenAI } from '../api/openAiApi.js';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

client.once('ready', () => {
    console.log('Discord bot is ready!');
});

client.login(DISCORD_TOKEN);


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/sendToDiscord', async (req, res) => {
    const { message } = req.body;
    try {
        const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
        if (channel && channel.isTextBased()) {
            await channel.send(message);
            res.json({ message: 'Message sent to Discord successfully' });
        } else {
            console.error("Invalid channel or channel is not text-based");
            res.status(400).json({ error: 'Invalid channel or channel is not text-based' });
        }
    } catch (error) {
        console.error("Error sending message to Discord:", error);
        if (error.code === 50001) {
            res.status(403).json({ error: "Bot lacks permissions to access the channel. Please check bot permissions and ensure it's in the server." });
        } else {
            res.status(500).json({ error: "Error sending message to Discord" });
        }
    }
});

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

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

