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
import ButtonWidget from './ImageWidget/ButtonWidget'
import GameInstance from './models/GameInstance'
/* TUIOManager start */
const tuioManager = new TUIOManager()
tuioManager.start()

/* Start SocketIO Client */
//  const socketIOClient = new SocketIOClient()
//  socketIOClient.start()


//const SERVER_ADRESS = "ws://10.212.120.221:8080/game";
const SERVER_ADRESS = "ws://192.168.1.16:8080/game";

const socketClient = new SocketClient()
socketClient.start(SERVER_ADRESS)

socketClient._client.onmessage = (e) => {
  if (e.data !== undefined && JSON.parse(e.data).response !== undefined) {

    let message = JSON.parse(e.data);
    console.log(JSON.stringify(message));
    let gameInstance = new GameInstance();

    switch (message.response) {
      case "RACE_SELECTED":
        message.races.forEach((el) => {
          if (el.available) {
            return;
          }
          else {
            let race = getRaceValue(el.name);
            document.getElementById(race + "Text").innerText = "Pris par " + el.username;
            document.getElementById(race + "Text").className = 'text-badge-taken';
          }
        });
        break;
      case "GAME_START":
        buildBoard();
        break;
      case "NEW_ROUND":
        let round = message.players;
        //TODO remove after debug
          $('#game-container').append('<canvas id="debug_round"></canvas>');
          const ctx = document.getElementById('debug_round').getContext('2d');
          ctx.font = '20 serif';
          ctx.fillText(JSON.stringify(round), 0, 100);

        let newOrderPlayers = [];
        round.forEach((el) => {
          let player = {
            tag: el.unity,
            position: gameInstance.getPositionByTag(el.unity)
          };
          newOrderPlayers.push(player);

        });
        gameInstance.setCurrentTour(newOrderPlayers);
        let campOrPlot = gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position);
        //alert(JSON.stringify(campOrPlot));
        campOrPlot.enableButton();
        break;
      case "MOVE":
        gameInstance.removePlayerPlayed();
        if (gameInstance.currentTour.length > 0) {
          let newCampOrPlot = gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position);
          //alert(JSON.stringify(campOrPlot));
          newCampOrPlot.enableButton();
        }

        break;
      default:
    }
  }
};

/* App Code */
const buildApp = () => {
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
