import $ from 'jquery/dist/jquery.min'
import ImageWidget from './ImageWidget/ImageWidget';
import Camp from './Camp';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import Plot from './Plot';
import GameInstance from './models/GameInstance';
const buildBoard = () => {
    $('#app').empty();
    $('#app').append('<div id="game-container"> </div>');

    /*
    const map = new Image();
    map.src = 'assets/map.png';
    map.onload = function() {
      ctx.drawImage(map,0,0,1920,1080);
    };
     */
    let gameInstance = new GameInstance();
    const canvasArrow= new CanvasArrow(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    const topLeft = new Plot(WINDOW_WIDTH / 5, WINDOW_HEIGHT / 5, WINDOW_WIDTH / 5, WINDOW_WIDTH / 10, 0, canvasArrow,[1,2,4]);
    const downLeft = new Plot(WINDOW_WIDTH / 5, WINDOW_HEIGHT - (WINDOW_HEIGHT / 5) - WINDOW_WIDTH / 10, WINDOW_WIDTH / 5, WINDOW_WIDTH / 10, 1, canvasArrow,[0,3,4]);
    const topRight = new Plot(WINDOW_WIDTH - (WINDOW_WIDTH / 5) - (WINDOW_WIDTH / 5), WINDOW_HEIGHT / 5, WINDOW_WIDTH / 5, WINDOW_WIDTH / 10, 2, canvasArrow,[0,3,4]);
    const downRight = new Plot(WINDOW_WIDTH - (WINDOW_WIDTH / 5) - (WINDOW_WIDTH / 5), WINDOW_HEIGHT - (WINDOW_HEIGHT / 5) - WINDOW_WIDTH / 10, WINDOW_WIDTH / 5, WINDOW_WIDTH / 10, 3, canvasArrow,[1,2,4]);
    const center = new Plot(WINDOW_WIDTH / 2 - WINDOW_WIDTH / 10, WINDOW_HEIGHT / 2 - WINDOW_WIDTH / 20, WINDOW_WIDTH / 5, WINDOW_WIDTH / 10, 4, canvasArrow,[0,1,2,3]);
    const topLeftPlot = new ImageWidget(topLeft.x, topLeft.y, topLeft.width, topRight.height, 'assets/UCAlogoQhaut.png', topLeft);
    const downLeftPlot = new ImageWidget(downLeft.x, downLeft.y, downLeft.width, downLeft.height, 'assets/UCAlogoQhaut.png', downLeft);
    const topRightPlot = new ImageWidget(topRight.x, topRight.y, topRight.width, topRight.height, 'assets/UCAlogoQhaut.png', topRight);
    const downRightPlot = new ImageWidget(downRight.x, downRight.y, downRight.width, downRight.height, 'assets/UCAlogoQhaut.png', downRight);
    const centerPlot = new ImageWidget(center.x, center.y, center.width, center.height, 'assets/UCAlogoQhaut.png', center);
    $('#game-container').append(topLeftPlot.domElem);
    $('#game-container').append(downLeftPlot.domElem);
    $('#game-container').append(topRightPlot.domElem);
    $('#game-container').append(downRightPlot.domElem);
    $('#game-container').append(centerPlot.domElem);

    const downCampForm = new Camp(WINDOW_WIDTH / 2, WINDOW_HEIGHT, WINDOW_WIDTH / 8, Math.PI, 0, 5, canvasArrow, [1,3,4]);
    const topCampForm = new Camp(WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 8, 0, Math.PI, 6, canvasArrow,[0,2,4]);
    const leftCampForm = new Camp(0, WINDOW_HEIGHT / 2, WINDOW_WIDTH / 8, Math.PI * 1.5, Math.PI / 2, 7, canvasArrow,[0,1,4]);
    const rightCampForm = new Camp(WINDOW_WIDTH, WINDOW_HEIGHT / 2, WINDOW_WIDTH / 8, Math.PI / 2, Math.PI * 1.5, 8, canvasArrow,[2,3,4]);
    const lowCamp = new ImageWidget(downCampForm.getStartXEvent(), downCampForm.getStartYEvent(), downCampForm.getWidthEvent(), downCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', downCampForm);
    const topCamp = new ImageWidget(topCampForm.getStartXEvent(), topCampForm.getStartYEvent(), topCampForm.getWidthEvent(), topCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', topCampForm);
    const leftCamp = new ImageWidget(leftCampForm.getStartXEvent(), leftCampForm.getStartYEvent(), leftCampForm.getWidthEvent(), leftCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', leftCampForm);
    const rightCamp = new ImageWidget(rightCampForm.getStartXEvent(), rightCampForm.getStartYEvent(), rightCampForm.getWidthEvent(), rightCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', rightCampForm);
    $('#game-container').append(topCamp.domElem);
    $('#game-container').append(lowCamp.domElem);
    $('#game-container').append(leftCamp.domElem);
    $('#game-container').append(rightCamp.domElem);

    gameInstance.plotAndCamp[0] = topLeft;
    gameInstance.plotAndCamp[1] = downLeft;
    gameInstance.plotAndCamp[2] = topRight;
    gameInstance.plotAndCamp[3] = downRight;
    gameInstance.plotAndCamp[4] = center;
    gameInstance.plotAndCamp[5] = downCampForm;
    gameInstance.plotAndCamp[6] = topCampForm;
    gameInstance.plotAndCamp[7] = leftCampForm;
    gameInstance.plotAndCamp[8] = rightCampForm;
}

import CanvasArrow from "./CanvasArrow";
export default buildBoard;
