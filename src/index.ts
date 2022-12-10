import { ChatGPTAPI } from 'chatgpt'
import express from 'express';
import cors from 'cors';
const app = express()
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
    res.send('OK')
});

const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN!,
    markdown: false
})

app.get('/gpt/:message', async (req, res) => {
    try {
        // ensure the API is properly authenticated
        await api.ensureAuth();
        const response = await api.sendMessage(req.params.message);
        res.json({answer: response});
    } catch (e: any) {
        res.json({error: e.toString()});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});