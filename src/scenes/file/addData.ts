import { BotContext, FOLDER_OF_FILES, keyboard} from "@root/bot";
import { BotConversation } from "@scenes/type";
import { readFile, unlinkSync } from "fs";
import { writeFile } from "fs/promises";
import { InputFile } from "grammy";
import { build, parse } from "node-xlsx"
import { normalize } from "path";





async function addFileData(conversation: BotConversation, ctx: BotContext) {
    const fileName = conversation.session.filename
    const filePath = normalize(`${FOLDER_OF_FILES}/${fileName}`)


    if(!fileName){
        return ctx.reply("Сначала выберите/загрузите файл для работы")
    }

    const [file] = parse(filePath)
    const {data, name} = file;
    const mainCells = data[0]

    if(!mainCells.length){
        ctx.reply("В файле нету столбцов с наименованием")
    }

    const newRow = []

    for await (const element of mainCells) {
        ctx.reply(`Введите данные для столбца '${element}'`)
        const newCell = await conversation.waitFor("message:text")
        if(newCell?.update?.message?.text){
            newRow.push(newCell.update.message.text)
        }    
    }

    const sheetOptions = {'!cols': [{wch: 6}, {wch: 7}, {wch: 10}, {wch: 20}]};

    const newData = data.concat([newRow])
    
    const fileBuild = build([{name, data: newData , options: sheetOptions}])

    unlinkSync(filePath)
    writeFile(`${normalize(`${FOLDER_OF_FILES}/${fileName}`)}`, fileBuild)
    
    ctx.reply(`Вы успешно добавили данные для файла ${fileName}, вы можете скачать измененный файл`, {reply_markup: keyboard})
    
}

export default addFileData;