import express from "express";
import cors from "cors";
import { AxiosError } from "axios";
import { initializeApi } from "./util.js";

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

const api = await initializeApi();

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/gpt/:message", async (req, res) => {
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
