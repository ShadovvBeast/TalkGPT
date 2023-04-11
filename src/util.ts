import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import * as openai from "./openai.js";

export async function initializeApi() {
  let api: typeof openai | ChatGPTUnofficialProxyAPI;
  if (process.env.OPENAI_API_KEY) {
    api = openai;
    await api.initSession();
    return api;
  } else if (process.env.OPENAI_ACCESS_TOKEN) {
    api = new ChatGPTUnofficialProxyAPI({
      accessToken: process.env.OPENAI_ACCESS_TOKEN,
    });
    return api;
  }
  throw new Error("OPENAI api key was not found");
}
