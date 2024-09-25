import { createConversation } from "@grammyjs/conversations";
import fileLoad from "./load";
import fileSet from "./set";
import addFileData from "./addData";

export const load = createConversation(fileLoad)
export const set = createConversation(fileSet)
export const addData = createConversation(addFileData)
