import express from "express";
import cors from "cors";
import { AxiosError } from "axios";
import { initializeApi } from "./util.js";

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("OK");
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
    res.json({ answer: response });
  } catch (error) {
    const axiosError = error as AxiosError;
    res
      .status(axiosError.status ?? 500)
      .json({ error: axiosError.response?.data });
    }
});

app.listen(port, () => {
  console.log(`TalkGPT listening on port ${port}`);
});
