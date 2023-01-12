import { ChatGPTAPIBrowser } from 'chatgpt'
import express from 'express';
import cors from 'cors';
const app = express()
app.use(cors());
const port = 3001;
import * as pup from './puppeteer.js';

app.get('/', (req, res) => {
    res.send('OK')
});

let api: any;
if (process.env.USE_CHATGPT_API) {
    api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL!,
        password: process.env.OPENAI_PASSWORD!,
        debug: true,
        markdown: false,
    });
} else {
    api = pup;
}

await api.initSession();

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