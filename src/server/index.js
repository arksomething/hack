const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



