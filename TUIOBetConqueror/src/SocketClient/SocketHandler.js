
import GameInstance from "./../models/GameInstance";
import speak from './../Speaker';
import { audio } from './../index';
import buildBoard from "../views/Board";
import { getRaceValue } from "./../Race";
import buildEndGame from '../views/EndGame';


const gameInstance = new GameInstance();

const mySocketHandler = (e) => {
    if (e.data !== undefined && JSON.parse(e.data).response !== undefined) {
        let message = JSON.parse(e.data);
        console.log(message);

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
            case "GAME_END":
                buildEndGame();
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
        lottie.reset();
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
            document.getElementById(race + "Text").style.color = el.color;
        }
    });
}


const onMoveEvent = (message) => {
    gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position).removeHighlight();
    gameInstance.removePlayerPlayed();
    if (gameInstance.currentTour.length > 0) {
        let currentPlayer = gameInstance.getCurrentPlayer();
        let newCampOrPlot = gameInstance.getPlotOrCamp(currentPlayer.position);
        newCampOrPlot.highLight(currentPlayer);

        updateCurrentPlayerText();
        //alert(JSON.stringify(campOrPlot));
        let spawn = gameInstance.getPlotOrCamp(currentPlayer.spawn);
        spawn.enableButton();
        speak(currentPlayer.faction + ", c'est à votre tour. Jouez le pion " + currentPlayer.tag);

        drawArrows(currentPlayer)
    }
}


const newRoundEvent = (message) => {
    if(gameInstance.tourNumber==0){
        setBackGroundRound();
    }

    while(gameInstance.currentTourRuturnSpawn.length != 0){

    }
    let round = message.players;
    updateGame(round);

    let currentPlayer = gameInstance.getCurrentPlayer();
    let newCampOrPlot = gameInstance.getPlotOrCamp(currentPlayer.position);
    newCampOrPlot.highLight(currentPlayer);

    updateCurrentPlayerText();
    //alert(JSON.stringify(campOrPlot));
    let spawn = gameInstance.getPlotOrCamp(currentPlayer.spawn);
    spawn.enableButton();
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
    const arrows = [];
    let newCampOrPlot2 = gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position);
    if (currentPlayer.x === 0 && currentPlayer.y === 0) {
        const arrow = {
            startXArrow: gameInstance.getEndArrowsOfPosition(currentPlayer.spawn).endX,
            startYArrow: gameInstance.getEndArrowsOfPosition(currentPlayer.spawn).endY,
            endArrowsPoints: gameInstance.getEndArrowsPointsPlot(newCampOrPlot2.possibleDisplacement),
            player: currentPlayer,
            arrowAnimationData: [],
        };
        arrows.push(arrow);
        newCampOrPlot2.canvasArrow.drawArrow(arrows);
    } else {
        const arrow = {
            startXArrow: currentPlayer.x,
            startYArrow: currentPlayer.y,
            endArrowsPoints: gameInstance.getEndArrowsPointsPlot(newCampOrPlot2.possibleDisplacement),
            player: currentPlayer,
            arrowAnimationData: [],
        };
        arrows.push(arrow);
        newCampOrPlot2.canvasArrow.drawArrow(arrows);
    }
}

const setReturnSpawn = (newCurrentReturnSpawn) => {
    let newOrderPlayers = [];
    newCurrentReturnSpawn.forEach(el => {
        let player = {
            tag: el.unity,
            spawn: el.spawn,
            position: gameInstance.getPositionByTag(el.unity)
        };
        newOrderPlayers.push(player);
    });
    gameInstance.setCurrentTourRuturnSpawn(newOrderPlayers);
}

const onWarsEnd = (message) => {
    setBackGroundRound();
    let round = message.players;
    setReturnSpawn(round);

    drawArrowsReturnToSpawn(gameInstance.currentTourRuturnSpawn);
}

const drawArrowsReturnToSpawn = (players) => {
    let randomPlot = gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position);
    //draw arrows
    const arrows=[];
    players.forEach(player => {
        const currentPlayer = gameInstance.getPositionByTag(player.tag);
        const arrow = {
            startXArrow: currentPlayer.x,
            startYArrow: currentPlayer.y,
            endArrowsPoints: {
                endX: gameInstance.endArrowsPointsPlots[currentPlayer.spawn].endX,
                endY: gameInstance.endArrowsPointsPlots[currentPlayer.spawn].endY,
            },
            player: currentPlayer,
            arrowAnimationData: [],
        };
        arrows.push(arrow);
    });
    randomPlot.canvasArrow.drawArrow(arrows);
}

const setBackGroundRound = () =>{
    let background = document.getElementById("game-container");
    background.style.backgroundImage = "url('assets/sea.jpg')";
    let animator = document.querySelectorAll("lottie-player");
    animator.forEach((lottie) => {
        lottie.style.visibility = "hidden";
    });
    audio.src = 'assets/naval.mp3'
    audio.play();
}
export default mySocketHandler;
