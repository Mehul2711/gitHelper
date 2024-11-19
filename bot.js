require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const explainCommand = require("./commands"); 

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userCommand = msg.text;

  const response = explainCommand(userCommand);

  bot.sendMessage(chatId, response);
});
