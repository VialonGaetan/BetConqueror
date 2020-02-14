import $ from "jquery/dist/jquery.min";
import ImageWidget from "../ImageWidget/ImageWidget";
import Camp from "./Camp";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "tuiomanager/core/constants";
import Plot from "./Plot";
import GameInstance from "../models/GameInstance";
import CanvasArrow from "./CanvasArrow";

const buildBoard = () => {
  $('#app').empty();
  $('#app').append('<div id="game-container" class="game-container"> </div>');


  let gameInstance = new GameInstance();
  const canvasArrow = new CanvasArrow(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  const topLeft = new Plot(WINDOW_WIDTH / 6, WINDOW_HEIGHT / 8, WINDOW_WIDTH / 5, WINDOW_WIDTH / 5, 'assets/Island4.png', 0, canvasArrow, [1, 2, 4]);
  const downLeft = new Plot(WINDOW_WIDTH / 6, WINDOW_HEIGHT - (WINDOW_HEIGHT / 10) - WINDOW_WIDTH / 5, WINDOW_WIDTH / 5, WINDOW_WIDTH / 5, 'assets/Island2.png', 1, canvasArrow, [0, 3, 4]);
  const topRight = new Plot(WINDOW_WIDTH - (WINDOW_WIDTH / 6) - (WINDOW_WIDTH / 5), WINDOW_HEIGHT / 8, WINDOW_WIDTH / 5, WINDOW_WIDTH / 5, 'assets/Island33.png', 2, canvasArrow, [0, 3, 4]);
  const downRight = new Plot(WINDOW_WIDTH - (WINDOW_WIDTH / 6) - (WINDOW_WIDTH / 5), WINDOW_HEIGHT - (WINDOW_HEIGHT / 10) - WINDOW_WIDTH / 5, WINDOW_WIDTH / 5, WINDOW_WIDTH / 5, 'assets/Island5.png', 3, canvasArrow, [1, 2, 4]);
  const center = new Plot(WINDOW_WIDTH / 2 - WINDOW_WIDTH / 10, WINDOW_HEIGHT / 2 - WINDOW_WIDTH / 10, WINDOW_WIDTH / 5, WINDOW_WIDTH / 5, 'assets/Island1.png', 4, canvasArrow, [0, 1, 2, 3]);
  const topLeftPlot = new ImageWidget(topLeft.x, topLeft.y, topLeft.width, topRight.height, topLeft);
  const downLeftPlot = new ImageWidget(downLeft.x, downLeft.y, downLeft.width, downLeft.height, downLeft);
  const topRightPlot = new ImageWidget(topRight.x, topRight.y, topRight.width, topRight.height, topRight);
  const downRightPlot = new ImageWidget(downRight.x, downRight.y, downRight.width, downRight.height, downRight);
  const centerPlot = new ImageWidget(center.x, center.y, center.width, center.height, center);
  $('#game-container').append(topLeftPlot.domElem);
  $('#game-container').append(downLeftPlot.domElem);
  $('#game-container').append(topRightPlot.domElem);
  $('#game-container').append(downRightPlot.domElem);
  $('#game-container').append(centerPlot.domElem);

  const downCampForm = new Camp(WINDOW_WIDTH / 2, WINDOW_HEIGHT, WINDOW_WIDTH / 8, Math.PI, 0, 'assets/beach11.png', 5, canvasArrow, [1, 3, 4]);
  const topCampForm = new Camp(WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 8, 0, Math.PI, 'assets/beach4444.png', 6, canvasArrow, [0, 2, 4]);
  const leftCampForm = new Camp(0, WINDOW_HEIGHT / 2, WINDOW_WIDTH / 8, Math.PI * 1.5, Math.PI / 2, 'assets/beach333.png', 7, canvasArrow, [0, 1, 4]);
  const rightCampForm = new Camp(WINDOW_WIDTH, WINDOW_HEIGHT / 2, WINDOW_WIDTH / 8, Math.PI / 2, Math.PI * 1.5, 'assets/beach5.png', 8, canvasArrow, [2, 3, 4]);
  const lowCamp = new ImageWidget(downCampForm.getStartXEvent(), downCampForm.getStartYEvent(), downCampForm.getWidthEvent(), downCampForm.getHeightEvent(), downCampForm);
  const topCamp = new ImageWidget(topCampForm.getStartXEvent(), topCampForm.getStartYEvent(), topCampForm.getWidthEvent(), topCampForm.getHeightEvent(), topCampForm);
  const leftCamp = new ImageWidget(leftCampForm.getStartXEvent(), leftCampForm.getStartYEvent(), leftCampForm.getWidthEvent(), leftCampForm.getHeightEvent(), leftCampForm);
  const rightCamp = new ImageWidget(rightCampForm.getStartXEvent(), rightCampForm.getStartYEvent(), rightCampForm.getWidthEvent(), rightCampForm.getHeightEvent(), rightCampForm);
  $("#game-container").append(topCamp.domElem);
  $("#game-container").append(lowCamp.domElem);
  $("#game-container").append(leftCamp.domElem);
  $("#game-container").append(rightCamp.domElem);
  $("#game-container").append('<canvas id="debug_round"></canvas>');

  $("#game-container").append('<lottie-player src = "assets/sword.json"  background = "transparent"  speed = "1"  style = "width: 400px; height: 400px; position:absolute; top:0; left:0; transform:rotate(315deg); margin-left: -55px; margin-top:-75px;" />');
  $("#game-container").append('<lottie-player src = "assets/sword.json"  background = "transparent"  speed = "1"  style = "width: 400px; height: 400px; position:absolute; bottom:0; right:0;transform:rotate(135deg); margin-bottom: -70px; margin-right: -65px;" />');

  gameInstance.plotAndCamp[0] = topLeft;
  gameInstance.plotAndCamp[1] = downLeft;
  gameInstance.plotAndCamp[2] = topRight;
  gameInstance.plotAndCamp[3] = downRight;
  gameInstance.plotAndCamp[4] = center;
  gameInstance.plotAndCamp[5] = downCampForm;
  gameInstance.plotAndCamp[6] = topCampForm;
  gameInstance.plotAndCamp[7] = leftCampForm;
  gameInstance.plotAndCamp[8] = rightCampForm;
};

export default buildBoard;
