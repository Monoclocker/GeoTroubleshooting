import { makeAutoObservable } from "mobx";
import MessageDTO from "../../../models/Message/MessageDTO";


class ChatStore {

    messages: MessageDTO[] = []

    get Messages() {
        return this.messages
    }

    constructor() {
        makeAutoObservable(this)
    }

    async addMessage(message: MessageDTO) {
        this.messages = [message, ...this.messages]
    }

    async setMessages(messages: MessageDTO[]) {
        this.messages = messages
    }
}

export { ChatStore }