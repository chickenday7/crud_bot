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
const bot_1 = require("../../bot");
function fileLoad(conversation, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        let responseMessage = "";
        yield ctx.reply("Загрузите файл");
        try {
            ctx = yield conversation.waitFor(":document");
            const fileName = ((_c = (_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.update) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.document) === null || _c === void 0 ? void 0 : _c.file_name) || "file";
            const fileExtension = fileName.split(".").pop();
            if (fileExtension !== "xlsx") {
                throw Error("Неверное расширение, только xlsx");
            }
            const file = yield ctx.getFile();
            yield file.download(`${bot_1.FOLDER_OF_FILES}/${fileName}`);
            responseMessage = `Файл ${fileName} успешно загружен!`;
            ctx.session.filename = fileName;
        }
        catch (error) {
            if (error instanceof Error) {
                responseMessage = error.message || "Что-то пошло не так, загрузите другой файл или обратитесь к разработчику";
            }
        }
        return ctx.reply(responseMessage);
    });
}
exports.default = fileLoad;
