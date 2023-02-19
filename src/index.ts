import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors());
const port = 3001;
import * as pup from './puppeteer.js';
import * as pawan from './pawan.js';

app.get('/', (req, res) => {
    res.send('OK')
});

let api: any;
if (process.env.OPENAI_API_KEY)
    api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
else if (process.env.OPENAI_ACCESS_TOKEN)
    api = new ChatGPTUnofficialProxyAPI ( { accessToken: process.env.OPENAI_ACCESS_TOKEN })
else if (process.env.CHATGPT_SESSION_TOKEN)
    api = pawan;
else
    api = pup;

if (typeof api.initSession === 'function')
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