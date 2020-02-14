
import { PONG_SOCKETIO_TYPE } from './constants'

let socketClientInstance = null

class SocketClient {



    constructor() {
        if (socketClientInstance !== null) {
            return socketClientInstance
        }

        socketClientInstance = this

        this._client = null

        this.ready = false

        return socketClientInstance
    }

    static getInstance() {
        return new SocketClient()
    }

    start(socketUrl = 'ws://localhost:8080/game') {
        this._client = new WebSocket(socketUrl)
        this._client.onopen = () => {
            console.log("IS connected to server")
            let request = { request: "TABLE" }
            console.log()
            this.ready = true
            this._client.send(JSON.stringify(request));
        };

        this._client.onmessage = (e) => {
            // a message was received
            console.log("New message from serveur" + e.data);
        };

        this._client.onerror = (e) => {
            // an error occurred
            console.log(e.message);
        };

        this._client.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
        };
    }

    sendMessage(message) {
        this._client.send(JSON.stringify(message))
        console.log("MESSAGE SEND : " + JSON.stringify(message))

    }
}


export default SocketClient
