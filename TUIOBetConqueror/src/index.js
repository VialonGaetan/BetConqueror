/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import $ from 'jquery/dist/jquery.min'
import TUIOManager from 'tuiomanager/core/TUIOManager'
import QrCode from 'qrcode'

// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget'
import ImageWidget from './ImageWidget/ImageWidget'

//  import SocketIOClient from './SocketIOClient/SocketIOClient'
import SocketClient from './SocketIOClient/SocketClient'
/* TUIOManager start */
const tuioManager = new TUIOManager()
tuioManager.start()

/* Start SocketIO Client */
//  const socketIOClient = new SocketIOClient()
//  socketIOClient.start()

const socketClient = new SocketClient()
socketClient.start()

const SERVER_ADRESS = 'http://localhost:8080/'

/* App Code */
const buildApp = () => {
  /*
  const imageWidget = new ImageElementWidget(0, 0, 365, 289, 0, 1, 'assets/UCAlogoQhaut.png')
  imageWidget.addTo('#app')
  */
  const imageWidget = new ImageWidget(0, 0, 365, 289, 'assets/UCAlogoQhaut.png')
  $('#app').append('<canvas id="qr-code" class="canvas" canvas>')
  QrCode.toCanvas(document.getElementById('qr-code'), SERVER_ADRESS)
}

$(window).ready(() => {
  buildApp()
})
