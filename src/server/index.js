import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { explainTextWithOpenAI } from '../api/openAiApi.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

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

