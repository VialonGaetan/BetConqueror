/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import $ from "jquery/dist/jquery.min";
import "@lottiefiles/lottie-player";
import TUIOManager from "tuiomanager/core/TUIOManager";
import QrCode from "qrcode";
import SocketClient from "./SocketClient/SocketClient";
import buildBoard from "./Board";
import { getRaceValue } from "./Race";
import GameInstance from "./models/GameInstance";

/* TUIOManager start */
const tuioManager = new TUIOManager();
tuioManager.start();


//const SERVER_ADRESS = "ws://10.212.120.221:8080/game";
const SERVER_ADRESS = "ws://192.168.1.3:8080/game";

const socketClient = new SocketClient();
socketClient.start(SERVER_ADRESS);


const synth = window.speechSynthesis;

const audio = new Audio();
audio.volume = 0.4;
audio.loop = true;

const gameInstance = new GameInstance();

const speak = (message) => {
  let utterThis = new SpeechSynthesisUtterance();
  utterThis.text = message;
  utterThis.volume = 10;
  utterThis.lang = "fr-FR";
  console.log(synth.getVoices())
  utterThis.voice = synth.getVoices()[9];
  synth.speak(utterThis);
}

const updateGame = (newCurrentRound) => {
  let newOrderPlayers = [];
  newCurrentRound.forEach(el => {
    let player = {
      tag: el.unity,
      spawn: el.spawn,
      position: gameInstance.getPositionByTag(el.unity)
    };
    newOrderPlayers.push(player);
  });
  gameInstance.setCurrentTour(newOrderPlayers);
}

const updateCurrentPlayerText = () => {
  const ctx = document.getElementById("debug_round").getContext("2d");
  ctx.font = "30 serif";
  ctx.clearRect(0, 0, 100, 100);
  ctx.fillText(gameInstance.getCurrentPlayer().tag, 20, 100);
}

const drawArrows = (currentPlayer) => {
  //draw arrows
  let newCampOrPlot2 = gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position);

  if (currentPlayer.x === 0 && currentPlayer.y === 0)
    newCampOrPlot2.canvasArrow.drawArrow(gameInstance.getEndArrowsOfPosition(currentPlayer.spawn).endX, gameInstance.getEndArrowsOfPosition(currentPlayer.spawn).endY, gameInstance.getEndArrowsPointsPlot(newCampOrPlot2.possibleDisplacement));
  else
    newCampOrPlot2.canvasArrow.drawArrow(currentPlayer.x, currentPlayer.y, gameInstance.getEndArrowsPointsPlot(newCampOrPlot2.possibleDisplacement));
}

const newRoundEvent = (message) => {
  let background = document.getElementById("game-container");
  background.style.backgroundImage = "url('assets/sea.jpg')";
  let animator = document.querySelectorAll("lottie-player");
  console.log(animator);
  animator.forEach((lottie) => {
    lottie.style.visibility = "hidden";
  });
  console.log(animator);

  let round = message.players;
  updateGame(round);

  let currentPlayer = gameInstance.getCurrentPlayer();
  let newCampOrPlot = gameInstance.getPlotOrCamp(currentPlayer.position);
  newCampOrPlot.highLight(currentPlayer.color);

  updateCurrentPlayerText();

  //alert(JSON.stringify(campOrPlot));
  newCampOrPlot.enableButton();
  speak(currentPlayer.faction + ", c'est à votre tour. Jouez le pion " + currentPlayer.tag);

  drawArrows(currentPlayer);


}

const onMoveEvent = (message) => {
  gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position).removeHighlight();
  gameInstance.removePlayerPlayed();
  if (gameInstance.currentTour.length > 0) {
    let currentPlayer = gameInstance.getCurrentPlayer();
    let newCampOrPlot = gameInstance.getPlotOrCamp(currentPlayer.position);
    newCampOrPlot.highLight(currentPlayer.color);

    updateCurrentPlayerText();
    //alert(JSON.stringify(campOrPlot));
    newCampOrPlot.enableButton();
    speak(currentPlayer.faction + ", c'est à votre tour. Jouez le pion " + currentPlayer.tag);

    drawArrows(currentPlayer)
  }
}

const onFactionSelected = (message) => {
  message.races.forEach(el => {
    if (el.available) {
      return;
    } else {
      let race = getRaceValue(el.name);
      document.getElementById(race + "Text").innerText =
        "Pris par " + el.username;
      document.getElementById(race + "Text").className =
        "text-badge-taken";
    }
  });
}


const onWarsStart = () => {
  let background = document.getElementById("game-container");
  background.style.backgroundImage = "url('assets/RedSea.jpg')";
  let animator = document.querySelectorAll("lottie-player");
  animator.forEach((lottie) => {
    lottie.style.visibility = "visible";
    lottie.play();
  });
  let message = "Les guerres commencent. Allez miser sur votre application pour conquerir les territoires."
  speak(message);

}


socketClient._client.onmessage = e => {
  if (e.data !== undefined && JSON.parse(e.data).response !== undefined) {
    let message = JSON.parse(e.data);
    console.log(JSON.stringify(message));

    switch (message.response) {
      case "RACE_SELECTED":
        onFactionSelected(message)
        break;
      case "GAME_START":
        buildBoard();
        break;
      case "NEW_ROUND":
        newRoundEvent(message);
        break;
      case "MOVE":
        onMoveEvent(message);
        break;
      case "START_WARS":
        onWarsStart();
        break;
      default:
    }
  }
};

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
