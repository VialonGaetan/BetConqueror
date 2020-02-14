/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import $ from "jquery/dist/jquery.min";
import "@lottiefiles/lottie-player";
import TUIOManager from "tuiomanager/core/TUIOManager";
import QrCode from "qrcode";
import SocketClient from "./SocketClient/SocketClient";
import mySocketHandler from "./SocketClient/SocketHandler";
import speak from './Speaker'
import buildBoard from "./views/Board";

/* TUIOManager start */
const tuioManager = new TUIOManager();
tuioManager.start();


//const SERVER_ADRESS = "ws://10.212.120.221:8080/game";
const SERVER_ADRESS = "ws://192.168.1.29:8080/game";

const socketClient = new SocketClient();
socketClient.start(SERVER_ADRESS);

export const audio = new Audio();
audio.volume = 0;
audio.loop = true;


socketClient._client.onmessage = e => mySocketHandler(e)

/* App Code */
const buildApp = () => {
  $.get("home.html", function (data) {
    $("#app").html(data);
    QrCode.toCanvas(document.getElementById("qr-code"), SERVER_ADRESS).then(
      () => {
        let myQrCode = document.getElementById("qr-code")
        myQrCode.style.display = "flex";
        myQrCode.style.position = "absolute";
        myQrCode.style.justifyContent = "center";
        myQrCode.style.width = "10em";
        myQrCode.style.height = "10em";
      }
    );

    audio.src = 'assets/0267.mp3'
    audio.play();
    const welcomeMessage1 = "Bienvenue jeunes aventuriers, vous êtes ici pour une expérience formidable dans le jeu Bet Conqueror. Pour commencer une partie, veuillez vous equiper d'un smartphone avec l'application Bet conqueror mobile."
    const welcomeMessage2 = "Lancez ensuite l'application et scannez le Qrcode present devant vous. Choissisez tous une faction et la partie commencera."
    speak(welcomeMessage1);
    speak(welcomeMessage2);
  });
};

$(window).ready(() => {

  buildApp();
});
