import { Composer, InlineKeyboard, InputFile } from "grammy";
import { BotContext, FOLDER_OF_FILES } from "../../bot";
import fileLoad from "../../scenes/fileLoad";
import { createConversation } from "@grammyjs/conversations";
import {readdirSync} from "fs"
import { parse } from "node-xlsx"

export const main = new Composer<BotContext>()


main.use(createConversation(fileLoad))
main.hears(COMMANDS.DOWNLOAD_FILE, async (ctx) => {
    const filename = ctx.session.filename
    if(!filename){
        return ctx.reply("Нету Файла в работе")
    }
    const filePath = `${FOLDER_OF_FILES}/${filename}`

    ctx.replyWithDocument(new InputFile(filePath))
})

main.hears(COMMANDS.UPLOAD_FILE, async (ctx) => {
    await ctx.conversation.enter("fileLoad")
    return;
})

main.hears(COMMANDS.GET_FILE_NAME, async (ctx) => {
    const fileName = ctx.session.filename;
   
    
    let response = ""
    if(!fileName){
        response = "Вы не работаете ни с каким файлом, загрузите или выберите"
    }else{
        response = `Вы работаете с файлом ${fileName}`
    }

    ctx.reply(response);
})

main.hears(COMMANDS.GET_LIST_FILES, async (ctx) => {
    const filesList = readdirSync(FOLDER_OF_FILES)

    if(!filesList?.length){
        return ctx.reply("Список пуст")
    }

    const buttonRow = filesList.map((file) => InlineKeyboard.text(file))
    return ctx.reply("Список файлов", {reply_markup: InlineKeyboard.from([buttonRow])})
})

main.hears(COMMANDS.ADD_DATA_FOR_FILE, async (ctx) => {
    const fileName = ctx.session.filename;

    if(!fileName){
        return ctx.reply("Сначала выберите/загрузите файл для работы")
    }

    const data = parse(`${FOLDER_OF_FILES}/${fileName}`)
    console.log(data[0].data,3333);
    

})