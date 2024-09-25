import { BotContext, FOLDER_OF_FILES } from "@root/bot";
import { BotConversation } from "../type";
import { readdirSync } from "fs";
import { InlineKeyboard } from "grammy";





async function fileSet(conversation: BotConversation, ctx: BotContext) {
    const filesList = readdirSync(FOLDER_OF_FILES)

    if(!filesList?.length){
        return ctx.reply("Список пуст")
    }

    const buttonRow = filesList.map((file) => InlineKeyboard.text(file))
    ctx.reply("Выбери файл", {reply_markup: InlineKeyboard.from([buttonRow])})
    
    const { update } = await conversation.waitFor("callback_query:data");
    const fileName = update.callback_query.data
    conversation.session.filename = fileName;
    return ctx.reply(`Вы выбрали файл ${fileName}` )
}



export default fileSet;