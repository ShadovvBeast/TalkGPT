"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, emailInput, passwordInput, loginButton, inputElement, buttonElement, responseElement, responseText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1["default"].launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    // Navigate to the login page
                    return [4 /*yield*/, page.goto('https://beta.openai.com/login')];
                case 3:
                    // Navigate to the login page
                    _a.sent();
                    return [4 /*yield*/, page.$('input[name=email]')];
                case 4:
                    emailInput = _a.sent();
                    return [4 /*yield*/, page.$('input[name=password]')];
                case 5:
                    passwordInput = _a.sent();
                    // Enter your email and password in the input elements
                    return [4 /*yield*/, emailInput.type(process.env.OPENAI_EMAIL)];
                case 6:
                    // Enter your email and password in the input elements
                    _a.sent();
                    return [4 /*yield*/, passwordInput.type(process.env.OPENAI_PASSWORD)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.$('button[type=submit]')];
                case 8:
                    loginButton = _a.sent();
                    return [4 /*yield*/, loginButton.click()];
                case 9:
                    _a.sent();
                    // Wait for the login process to complete
                    return [4 /*yield*/, page.waitForNavigation()];
                case 10:
                    // Wait for the login process to complete
                    _a.sent();
                    // Navigate to the ChatGPT application
                    return [4 /*yield*/, page.goto('https://chat.openai.com/chat')];
                case 11:
                    // Navigate to the ChatGPT application
                    _a.sent();
                    return [4 /*yield*/, page.$('input[name=input]')];
                case 12:
                    inputElement = _a.sent();
                    // Enter your message in the input element
                    return [4 /*yield*/, inputElement.type('Hello ChatGPT!')];
                case 13:
                    // Enter your message in the input element
                    _a.sent();
                    return [4 /*yield*/, page.$('button[type=submit]')];
                case 14:
                    buttonElement = _a.sent();
                    // Click the button to send your message
                    return [4 /*yield*/, buttonElement.click()];
                case 15:
                    // Click the button to send your message
                    _a.sent();
                    // Wait for the response from ChatGPT
                    return [4 /*yield*/, page.waitForSelector('.response')];
                case 16:
                    // Wait for the response from ChatGPT
                    _a.sent();
                    return [4 /*yield*/, page.$('.response')];
                case 17:
                    responseElement = _a.sent();
                    return [4 /*yield*/, page.evaluate(function (responseElement) { return responseElement.textContent; }, responseElement)];
                case 18:
                    responseText = _a.sent();
                    console.log(responseText);
                    // Close the browser
                    return [4 /*yield*/, browser.close()];
                case 19:
                    // Close the browser
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
run();
