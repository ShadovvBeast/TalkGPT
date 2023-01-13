import chatGPT from 'chatgpt-io';
let bot: chatGPT;
export async function initSession() {
    bot = new chatGPT(process.env.CHATGPT_SESSION_TOKEN!)
    return bot.waitForReady();
}

export async function sendMessage(prompt: string) {
    return bot.ask(prompt);
}