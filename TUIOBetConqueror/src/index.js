/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import $ from 'jquery/dist/jquery.min'
import TUIOManager from 'tuiomanager/core/TUIOManager'
import QrCode from 'qrcode'

// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget'
import ImageWidget from './ImageWidget/ImageWidget'

//  import SocketIOClient from './SocketIOClient/SocketIOClient'
import SocketClient from './SocketClient/SocketClient'
import buildBoard from './Board';
import { FRENCH_TEXT } from './constants'
import { getRaceValue } from './Race'
/* TUIOManager start */
const tuioManager = new TUIOManager()
tuioManager.start()

/* Start SocketIO Client */
//  const socketIOClient = new SocketIOClient()
//  socketIOClient.start()

const socketClient = new SocketClient()
socketClient.start()

socketClient._client.onmessage = (e) => {
  if (e.data !== undefined && JSON.parse(e.data).response !== undefined) {
    let message = JSON.parse(e.data);
    switch (message.response) {
      case "RACE_SELECTED":
        message.races.map((el) => {
          if (el.available)
            return;
          else {
            let race = getRaceValue(el.name);
            document.getElementById(race + "Text").innerText = "TOTO";
            document.getElementById(race + "Text").className = 'text-badge-taken';
            return;
          }
        });
        break;
      case "GAME_START":
        buildBoard();
        break;
      default:
    }
  }
};
const SERVER_ADRESS = "ws://10.212.109.249:8080/game";

/* App Code */
const buildApp = () => {
  /*
  const imageWidget = new ImageElementWidget(0, 0, 365, 289, 0, 1, 'assets/UCAlogoQhaut.png')
  imageWidget.addTo('#app')
  */
  //const imageWidget = new ImageWidget(0, 0, 365, 289, 'assets/UCAlogoQhaut.png')


  $.get('home.html', function (data) {
    $("#app").html(data);
    QrCode.toCanvas(document.getElementById('qr-code'), SERVER_ADRESS).then(() => {
      document.getElementById('qr-code').style.display = "flex";
      document.getElementById('qr-code').style.position = "absolute";
      document.getElementById('qr-code').style.justifyContent = "center";
      document.getElementById('qr-code').style.width = "10em";
      document.getElementById('qr-code').style.height = "10em";
    });
  });
}

$(window).ready(() => {
  buildApp();
});
