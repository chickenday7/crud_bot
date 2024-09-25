import { Composer, InputFile } from "grammy";
import { BotContext, FOLDER_OF_FILES } from "@root/bot";
import { addData, load, set } from "@scenes/file";

export const main = new Composer<BotContext>()
main.use(load, set, addData)


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
    await ctx.conversation.enter("fileSet")
})

main.hears(COMMANDS.ADD_DATA_FOR_FILE, async (ctx) => {
    await ctx.conversation.enter("addFileData")
})



