import * as signalR from "@microsoft/signalr"
import { ADDRESS, MAPHUB_PATH } from "../../../utils/APIConstants"
class MapHub {

    readonly connection: signalR.HubConnection

    static instance: MapHub

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(MAPHUB_PATH, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build()
        this.connection.start()
            .catch(err => { this.connection.stop(); console.log(err); })
    }

    public static getInstance(): MapHub {
        if (!MapHub.instance)
            MapHub.instance = new MapHub()
        return MapHub.instance
    }
}

export default MapHub.getInstance