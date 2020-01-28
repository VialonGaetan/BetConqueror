export default class GameWebSocket {
  static myInstance = null;

  _client = undefined;

  isConnected = false;

  playerID = undefined;
  /**
   * @returns {GameWebSocket}
   */
  static getInstance() {
    if (GameWebSocket.myInstance == null) {
      GameWebSocket.myInstance = new GameWebSocket();
    }

    return this.myInstance;
  }

  sendMessage(message) {
    this._client.send(JSON.stringify(message));
  }

  onMessage(e) {
    this._client.onmessage = e;
  }

  setID(id) {
    this.playerID = id;
  }

  async start(socketUrl) {
    this._client = new WebSocket(socketUrl);
    return new Promise(resolve => {
      this._client.onerror = e => {
        alert('Error Socket please restart');
        resolve();
      };

      this._client.onclose = e => {
        // connection closed
        //alert("The connection with the server has been close");
        console.log('CONNECTION CLOSED');
        this.isConnected = false;
        resolve();
      };
      this._client.onopen = () => {
        //alert("The socket is now open");
        this.isConnected = true;
        resolve();
      };
    });
  }
}
