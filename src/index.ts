import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import express from 'express';
import cors from 'cors';
import * as openai from './openai.js';

const app = express()
app.use(cors());
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('OK')
});

let api: any;
if (process.env.OPENAI_API_KEY)
    api = openai;
else if (process.env.OPENAI_ACCESS_TOKEN)
    api = new ChatGPTUnofficialProxyAPI ( { accessToken: process.env.OPENAI_ACCESS_TOKEN })

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