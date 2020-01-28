/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import $ from "jquery/dist/jquery.min";
import TUIOManager from "tuiomanager/core/TUIOManager";
import QrCode from "qrcode";

// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget'
import ImageWidget from "./ImageWidget/ImageWidget";

//  import SocketIOClient from './SocketIOClient/SocketIOClient'
import SocketClient from "./SocketIOClient/SocketClient";
/* TUIOManager start */
const tuioManager = new TUIOManager();
tuioManager.start();

/* Start SocketIO Client */
//  const socketIOClient = new SocketIOClient()
//  socketIOClient.start()

const socketClient = new SocketClient();
socketClient.start();

socketClient._client.onmessage = e => {
  if (e.data !== undefined) {
    if (JSON.parse(e.data).response === "GAME_START") {
      alert("GAME HAS STARTED");
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
  const imageWidget = new ImageWidget(
    0,
    0,
    365,
    289,
    "assets/UCAlogoQhaut.png"
  );
  $("#app").append('<h1 class="title" id="title"> Bet Conqueror</h1>');
  $("#app").append(
    '<h2 class="description" id="description"> Scan le QrCode avec l\'application mobile Bet Conqueror pour rejoindre la partie </h2>'
  );
  $("#app").append('<canvas id="qr-code" class="canvas" canvas/>');
  QrCode.toCanvas(document.getElementById("qr-code"), SERVER_ADRESS);
};

$(window).ready(() => {
  buildApp();
});
