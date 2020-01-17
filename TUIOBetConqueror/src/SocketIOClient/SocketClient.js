
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

    start(socketUrl = 'ws://localhost:8080/ping') {
        this._client = new WebSocket(socketUrl)
        this._client.onopen = () => {
            console.log("IS connected to server")
            this.ready = true
            this._client.send("TOTO");
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

    handlePing() {
        console.log("Handle PING")
        if (this.ready) {
            console.log(`Received PING from WEB!`)
            this._client.send("PONG")
        }
        setTimeout(this.handlePing, 500)
    }
}

export default SocketClient
