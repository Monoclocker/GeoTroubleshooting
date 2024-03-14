import { makeAutoObservable } from "mobx";
import { IMessage } from "../../../vite-env";


class ChatStore {

    messages: IMessage[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addMessage(message: IMessage) {
        this.messages = [...this.messages, message]
    }

    initMessages(messages: IMessage[]) {
        this.messages = [...messages, ...this.messages]
    }
}

export { ChatStore }