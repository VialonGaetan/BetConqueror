/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import io from 'socket.io-client'

import { PING_SOCKETIO_TYPE, PONG_SOCKETIO_TYPE } from './constants'

/**
 * Manage SocketIOClient singleton class.
 *
 * @type SocketIOClient
 * @private
 */
let socketIOClientInstance = null

/**
 * Main class to manage SocketIOClient.
 *
 * @class SocketIOClient
 */
class SocketIOClient {
  /**
   * SocketIOClient constructor.
   *
   * @constructor
   */
  constructor() {
    if (socketIOClientInstance !== null) {
      return socketIOClientInstance
    }

    socketIOClientInstance = this

    this._client = null

    return socketIOClientInstance
  }

  /**
   * Init and start SocketIOClient.
   *
   * @method getInstance
   * @static
   * @returns {SocketIOClient} The SocketIOClient instance.
   */
  static getInstance() {
    return new SocketIOClient()
  }

  /**
   * Init and start SocketIOClient.
   *
   * @method start
   * @param {string} socketIOUrl - Socket IO Server's url. Default : 'http://localhost:10000/'
   */
  start(socketIOUrl = 'http://localhost:10000/') {
    this._client = io(socketIOUrl)
    this._client.on(PING_SOCKETIO_TYPE, (data) => {
      this.handlePing(data)
    })
  }

  /**
   * Handle PING Action from socket.
   *
   * @method handlePing
   * @param {JSON} socketData
   */
  handlePing(socketData) {
    console.log(`Received PING from ${socketData.id}!`)
    this._client.emit(PONG_SOCKETIO_TYPE, { id: 'Web' })
  }
}

export default SocketIOClient
