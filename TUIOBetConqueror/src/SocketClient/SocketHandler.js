
import GameInstance from "./../models/GameInstance";
import speak from './../Speaker';
import { audio } from './../index';
import buildBoard from "../views/Board";
import { getRaceValue } from "./../Race";


const gameInstance = new GameInstance();

const mySocketHandler = (e) => {
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


const onWarsStart = () => {
    let background = document.getElementById("game-container");
    background.style.backgroundImage = "url('assets/RedSea.jpg')";
    audio.src = 'assets/sword-music.mp3';
    audio.play();
    let animator = document.querySelectorAll("lottie-player");
    animator.forEach((lottie) => {
        lottie.style.visibility = "visible";
        lottie.play();
    });
    let message = "Les guerres commencent. Allez miser sur votre application pour conquerir les territoires."
    speak(message);

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


const newRoundEvent = (message) => {
    let background = document.getElementById("game-container");
    background.style.backgroundImage = "url('assets/sea.jpg')";
    let animator = document.querySelectorAll("lottie-player");
    animator.forEach((lottie) => {
        lottie.style.visibility = "hidden";
    });
    audio.src = 'assets/naval.mp3'
    audio.play();

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

export default mySocketHandler;