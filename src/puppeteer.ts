import puppeteer, { Page } from 'puppeteer-core';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const getChromeEndpoint = async () => {
    let endpoint = process.env.CHROME_ENDPOINT_URL;
    if (process.env.MARIONETTE_URL) {
        // @ts-ignore
        const port = (await (await fetch(`${process.env.MARIONETTE_URL}/url`)).json()).port;
        endpoint = `http://52.6.235.161:${port}`;
    }
    await delay(2000);
    //@ts-ignore
    const response = await (await fetch(`${endpoint}/json/version`)).json()
    return response.webSocketDebuggerUrl;
};

let page: Page;
export async function initSession() {
    // Launch a new browser instance
    // const puppeteerArgs = [
    //     "--no-sandbox",
    //     "--disable-infobars",
    //     "--disable-dev-shm-usage",
    //     "--disable-blink-features=AutomationControlled",
    //     "--no-first-run",
    //     "--no-service-autorun",
    //     "--password-store=basic",
    //     "--system-developer-mode"
    // ];
    const endpoint = await getChromeEndpoint();
    const browser = await puppeteer.connect({ browserWSEndpoint: endpoint, ignoreHTTPSErrors: true });
    // Create a new page
    page = await browser.newPage();

    // Navigate to the login page
    await page.goto('https://chat.openai.com/auth/login');
    //await page.waitForNavigation();

    await page.waitForSelector('button.btn-primary');
    const loginButtonElement = await page.$('button.btn-primary');
    await loginButtonElement!.click();
    await page.waitForNavigation();

    const emailInput = await page.$('input#username');
    await emailInput!.type(process.env.OPENAI_EMAIL!);

    await page.waitForSelector('input#password', {timeout: 120000});
    const passwordInput = await page.$('input#password');
    await passwordInput!.type(process.env.OPENAI_PASSWORD!);

    const continueButtonElement = await page.$('button[type="submit"][value="default"]');
    await continueButtonElement!.click();

    await page.waitForNavigation();
    // await page.waitForSelector('button.btn-neutral[tabindex="0"]');
    // const nextButtonElement = await page.$('button.btn-neutral[tabindex="0"]');
    // await nextButtonElement!.click();
    // //await page.waitForTimeout(1000);
    // await page.waitForSelector('button.btn-neutral.ml-auto');
    // const nextButtonElement2 = await page.$('button.btn-neutral.ml-auto');
    // await nextButtonElement2!.click();
    // //await page.waitForTimeout(1000);
    // await page.waitForSelector('button.btn-primary');
    // const doneButtonElement = await page.$('button.btn-primary');
    // await doneButtonElement!.click();
}

export async function sendMessage(prompt: string) {
    await page.waitForSelector('textarea.m-0[tabindex="0"]');
    const textareaElement = await page.$('textarea.m-0[tabindex="0"]');
    await textareaElement!.type(prompt);
    const submitButtonElement = await page.$('button.absolute.p-1');
    await submitButtonElement!.click();

    await page.waitForSelector('button.flex.btn-neutral.gap-2', {timeout: 120000});
    const responseElement = await page.$('div.w-full.border-b:nth-last-child(2) div.markdown.prose.light');
    return responseElement?.evaluate(el => el.textContent);
}