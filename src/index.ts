import { ChatGPTAPIBrowser } from 'chatgpt'
import express from 'express';
import cors from 'cors';
const app = express()
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
    res.send('OK')
});
const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL!,
    password: process.env.OPENAI_PASSWORD!
});

await api.init();

app.get('/gpt/:message', async (req, res) => {
    try {
        const response = await api.sendMessage(req.params.message);
        res.json({answer: response});
    } catch (e: any) {
        res.json({error: e.toString()});
    }
});

app.listen(port, () => {
    console.log(`TalkGPT listening on port ${port}`)
});