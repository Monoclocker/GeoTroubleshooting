import * as signalR from "@microsoft/signalr"
import { CHATHUB_PATH } from "../../../utils/APIConstants"
class ChatHub {

    readonly connection: signalR.HubConnection

    static instance: ChatHub

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(CHATHUB_PATH, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                accessTokenFactory: () => { return localStorage.getItem("accessToken") as string }
            })
            .withAutomaticReconnect()
            .build()
        this.connection.start()
            .catch(err => { this.connection.stop(); console.log(err); })
    }

    public static getInstance(): ChatHub {
        if (!ChatHub.instance)
            ChatHub.instance = new ChatHub()
        return ChatHub.instance
    }
}

export default ChatHub.getInstance