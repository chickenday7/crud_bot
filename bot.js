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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.FOLDER_OF_FILES = void 0;
const grammy_1 = require("grammy");
const files_1 = require("@grammyjs/files");
const conversations_1 = require("@grammyjs/conversations");
const main_1 = require("./composer/main");
exports.FOLDER_OF_FILES = `${__dirname}/output`;
function initial() {
    return { filename: "" };
}
// Create a bot.
exports.bot = new grammy_1.Bot("7555105440:AAFMyLTy4QFUSPN4F8aOBO-xcw5FLPfKRPA");
// Use the plugin.
exports.bot.api.config.use((0, files_1.hydrateFiles)(exports.bot.token));
exports.bot.use((0, grammy_1.session)({ initial, }));
exports.bot.use((0, conversations_1.conversations)());
exports.bot.use(main_1.main);
const keyboard = new grammy_1.Keyboard()
    .text("\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0444\u0430\u0439\u043B" /* COMMANDS.DOWNLOAD_FILE */).row()
    .text("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B" /* COMMANDS.UPLOAD_FILE */).row()
    .text("\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0438\u043C\u044F \u0444\u0430\u0439\u043B\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435" /* COMMANDS.GET_FILE_NAME */).row()
    .text("\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0444\u0430\u0439\u043B\u043E\u0432" /* COMMANDS.GET_LIST_FILES */).row()
    .text("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435" /* COMMANDS.ADD_DATA_FOR_FILE */).row();
// Handle the /start command.
exports.bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return ctx.reply(`Приветствую, ${(_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from.username}`, {
        reply_markup: keyboard
    });
}));
exports.bot.start();
