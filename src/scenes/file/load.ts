import { BotContext, FOLDER_OF_FILES } from "@root/bot";
import { BotConversation } from "@scenes/type";





async function fileLoad(conversation: BotConversation, ctx: BotContext) {
    let responseMessage = ""
    await ctx.reply("Загрузите файл")
    
    try {
        ctx = await conversation.waitFor(":document")
        
        const fileName = ctx?.update?.message?.document?.file_name || "file"
        const fileExtension = fileName.split(".").pop()

        if(fileExtension !== "xlsx"){
            throw Error("Неверное расширение, только xlsx")
        }
        
        const file = await ctx.getFile();     
        
           
        await file.download(`${FOLDER_OF_FILES}/${fileName}`)
        
        
        responseMessage = `Файл ${fileName} успешно загружен!`
        conversation.session.filename = fileName;
    } catch (error) {
        if(error instanceof Error){
            responseMessage = error.message ||  "Что-то пошло не так, загрузите другой файл или обратитесь к разработчику"
        }       
        
    }
    return ctx.reply(responseMessage);
    
}

export default fileLoad;