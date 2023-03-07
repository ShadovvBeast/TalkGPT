import { Configuration, OpenAIApi } from "openai";
let api: OpenAIApi;
export async function initSession() {
    api = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY! }));
}

export async function sendMessage(prompt: string) {
    const completion = await api.createChatCompletion({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }] });
    return completion.data.choices[0].message!.content;
}