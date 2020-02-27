import GameInstance from './../models/GameInstance';
import speak from './../Speaker';
import { audio } from './../index';
import buildBoard from '../views/Board';
import { getRaceValue } from './../Race';
import buildEndGame from '../views/EndGame';


const gameInstance = new GameInstance();

const mySocketHandler = (e) => {
  if (e.data !== undefined && JSON.parse(e.data).response !== undefined) {
    let message = JSON.parse(e.data);
    console.log(message);

    switch (message.response) {
      case 'RACE_SELECTED':
        onFactionSelected(message)
        break;
      case 'GAME_START':
        buildBoard();
        break;
      case 'NEW_ROUND':
        newRoundEvent(message);
        break;
      case 'MOVE':
        onMoveEvent(message);
        break;
      case 'START_WARS':
        onWarsStart();
        break;
      case 'WAR_RESULT':
        onWarsEnd(message);
        break;
      case 'GAME_END':
        buildEndGame();
        break;
      default:
    }
  }
};


const onWarsStart = () => {
  let background = document.getElementById('game-container');
  background.style.backgroundImage = 'url(\'assets/RedSea.jpg\')';
  audio.src = 'assets/sword-music.mp3';
  audio.play();
  let animator = document.querySelectorAll('lottie-player');
  animator.forEach((lottie) => {
    lottie.style.visibility = 'visible';
    console.log("lottie")
    console.log(lottie)
    lottie.goToAndPlay(1,true);
  });
  let message = 'Les guerres commencent. Allez miser sur votre application pour conquerir les territoires.'
  speak(message);
}

const onFactionSelected = (message) => {
  message.races.forEach(el => {
    if (el.available) {
      return;
    } else {
      let race = getRaceValue(el.name);
      document.getElementById(race + 'Text').innerText =
        'Pris par ' + el.username;
      document.getElementById(race + 'Text').className =
        'text-badge-taken';
      document.getElementById(race + 'Text').style.color = el.color;
    }
  });
}


const onMoveEvent = (message) => {
  gameInstance.getPlotOrCamp(gameInstance.getCurrentPlayer().position)
    .removeHighlight();
  gameInstance.removePlayerPlayed();
  if (gameInstance.currentTour.length > 0) {
    let currentPlayer = gameInstance.getCurrentPlayer();
    let newCampOrPlot = gameInstance.getPlotOrCamp(currentPlayer.position);
    newCampOrPlot.highLight(currentPlayer);

    updateCurrentPlayerText();
    //alert(JSON.stringify(campOrPlot));
    let spawn = gameInstance.getPlotOrCamp(currentPlayer.spawn);
    spawn.enableButton();
    speak(currentPlayer.faction + ', c\'est à votre tour. Jouez le pion ' + currentPlayer.tag);

    drawArrows(currentPlayer)
  }
}

const newRoundEvent = (message) => {
  if (gameInstance.tourNumber == 0) {
    setBackGroundRound();
  }
  const round = message.players;
  updateGame(round);
  const currentPlayer = gameInstance.getCurrentPlayer();
  const newCampOrPlot = gameInstance.getPlotOrCamp(currentPlayer.position);
  newCampOrPlot.highLight(currentPlayer);

  updateCurrentPlayerText();
  const spawn = gameInstance.getPlotOrCamp(currentPlayer.spawn);
  spawn.enableButton();
  speak(currentPlayer.faction + ', c\'est à votre tour. Jouez le pion ' + currentPlayer.tag);

  drawArrows(currentPlayer);
}

const updateGame = (newCurrentRound) => {
  console.log(newCurrentRound);
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
  const ctx = document.getElementById('debug_round')
    .getContext('2d');
  ctx.font = '30 serif';
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

const setReturnSpawn = (results) => {
  const winners = [];
  results.forEach(result => {
    winners.push(result.winner.unity);
  })
  const looser = [];
  gameInstance.unities.forEach(item => {
    if (!winners.some((unity) => unity != 'NONE' && item.tag === unity)) {
      looser.push(item)
    }
  })
  let newOrderPlayers = [];
  looser.forEach(el => {
    let player = {
      tag: el.tag,
      spawn: el.spawn,
      position: el.position
    };
    newOrderPlayers.push(player);
  });
  gameInstance.setCurrentTourRuturnSpawn(newOrderPlayers);
}

const onWarsEnd = (message) => {
  setBackGroundRound();
  let result = message.result;
  setReturnSpawn(result);

  drawArrowsReturnToSpawn(gameInstance.currentTourRuturnSpawn);
}

const drawArrowsReturnToSpawn = (players) => {
  let randomPlot = gameInstance.getPlotOrCamp(1);
  //draw arrows
  const arrows = [];
  players.forEach(player => {
    const currentPlayer = gameInstance.getUnityByTag(player.tag);
    const arrow = {
      startXArrow: currentPlayer.x,
      startYArrow: currentPlayer.y,
      endArrowsPoints: gameInstance.getEndArrowsPointsSpawn(currentPlayer.spawn),
      player: currentPlayer,
      arrowAnimationData: [],
    };
    arrows.push(arrow);
  });
  randomPlot.canvasArrow.drawArrow(arrows);
}

const setBackGroundRound = () => {
  let background = document.getElementById('game-container');
  background.style.backgroundImage = 'url(\'assets/sea.jpg\')';
  let animator = document.querySelectorAll('lottie-player');
  animator.forEach((lottie) => {
    lottie.style.visibility = 'hidden';
  });
  audio.src = 'assets/naval.mp3'
  audio.play();
}

export default mySocketHandler;
