
import { Bot, Context, SessionFlavor, session, Keyboard  } from "grammy";
import { FileFlavor, hydrateFiles } from "@grammyjs/files";

import {
    type ConversationFlavor,
    conversations,
  } from "@grammyjs/conversations";
import { main } from "@composer/main";
import { normalize } from "path";
import { existsSync, mkdirSync } from "fs";


interface SessionData {
    filename: string
}

export const FOLDER_OF_FILES = normalize(`${__dirname}/output`)


export type BotContext = FileFlavor<Context> &  SessionFlavor<SessionData> & ConversationFlavor;

function initial(): SessionData {
    return { filename: "" };
  }

// Create a bot.
export const bot = new Bot<BotContext>("7555105440:AAFMyLTy4QFUSPN4F8aOBO-xcw5FLPfKRPA");

// Use the plugin.
bot.api.config.use(hydrateFiles(bot.token));
bot.use(session({ initial }));
bot.use(conversations())
bot.use(main)
  

export const keyboard = new Keyboard()
.text(COMMANDS.DOWNLOAD_FILE).row()
.text(COMMANDS.UPLOAD_FILE).row()
.text(COMMANDS.GET_FILE_NAME).row()
.text(COMMANDS.GET_LIST_FILES).row()
.text(COMMANDS.ADD_DATA_FOR_FILE).row()

// Handle the /start command.
bot.command("start", async (ctx) => {    
    if (!existsSync(FOLDER_OF_FILES)) {
      mkdirSync(FOLDER_OF_FILES, { recursive: true });
    }
    return ctx.reply(`Приветствую, ${ctx.message?.from.username}`,{
        reply_markup: keyboard
    })
});



bot.start();