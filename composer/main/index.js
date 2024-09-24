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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const grammy_1 = require("grammy");
const bot_1 = require("../../bot");
const fileLoad_1 = __importDefault(require("../../scenes/fileLoad"));
const conversations_1 = require("@grammyjs/conversations");
const fs_1 = require("fs");
const node_xlsx_1 = require("node-xlsx");
exports.main = new grammy_1.Composer();
exports.main.use((0, conversations_1.createConversation)(fileLoad_1.default));
exports.main.hears("\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0444\u0430\u0439\u043B" /* COMMANDS.DOWNLOAD_FILE */, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = ctx.session.filename;
    if (!filename) {
        return ctx.reply("Нету Файла в работе");
    }
    const filePath = `${bot_1.FOLDER_OF_FILES}/${filename}`;
    ctx.replyWithDocument(new grammy_1.InputFile(filePath));
}));
exports.main.hears("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B" /* COMMANDS.UPLOAD_FILE */, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.conversation.enter("fileLoad");
    return;
}));
exports.main.hears("\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0438\u043C\u044F \u0444\u0430\u0439\u043B\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435" /* COMMANDS.GET_FILE_NAME */, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = ctx.session.filename;
    let response = "";
    if (!fileName) {
        response = "Вы не работаете ни с каким файлом, загрузите или выберите";
    }
    else {
        response = `Вы работаете с файлом ${fileName}`;
    }
    ctx.reply(response);
}));
exports.main.hears("\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0444\u0430\u0439\u043B\u043E\u0432" /* COMMANDS.GET_LIST_FILES */, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const filesList = (0, fs_1.readdirSync)(bot_1.FOLDER_OF_FILES);
    if (!(filesList === null || filesList === void 0 ? void 0 : filesList.length)) {
        return ctx.reply("Список пуст");
    }
    const buttonRow = filesList.map((file) => grammy_1.InlineKeyboard.text(file));
    return ctx.reply("Список файлов", { reply_markup: grammy_1.InlineKeyboard.from([buttonRow]) });
}));
exports.main.hears("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435" /* COMMANDS.ADD_DATA_FOR_FILE */, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = ctx.session.filename;
    if (!fileName) {
        return ctx.reply("Сначала выберите/загрузите файл для работы");
    }
    const data = (0, node_xlsx_1.parse)(`${bot_1.FOLDER_OF_FILES}/${fileName}`);
    console.log(data[0].data, 3333);
}));
