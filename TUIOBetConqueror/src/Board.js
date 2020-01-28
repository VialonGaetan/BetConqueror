import $ from 'jquery/dist/jquery.min'
import ImageWidget from './ImageWidget/ImageWidget';
import Camp from './Camp';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';

const buildBoard = () => {
  $('#app').empty();
  $('#app').append('<div id="game-container"> </div>');
  const lowCampForm = new Camp(WINDOW_WIDTH / 2, WINDOW_HEIGHT, WINDOW_WIDTH / 8, Math.PI, 0);
  const topCampForm = new Camp(WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 8, 0, Math.PI);
  const leftCampForm = new Camp(0, WINDOW_HEIGHT / 2, WINDOW_WIDTH / 8, Math.PI * 1.5, Math.PI / 2);
  const rightCampForm = new Camp(WINDOW_WIDTH, WINDOW_HEIGHT / 2, WINDOW_WIDTH / 8, Math.PI / 2, Math.PI * 1.5);
  /*
  const map = new Image();
  map.src = 'assets/map.png';
  map.onload = function() {
    ctx.drawImage(map,0,0,1920,1080);
  };
   */
  const lowCamp = new ImageWidget(lowCampForm.getStartXEvent(), lowCampForm.getStartYEvent(), lowCampForm.getWidthEvent(), lowCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', lowCampForm);
  const topCamp = new ImageWidget(topCampForm.getStartXEvent(), topCampForm.getStartYEvent(), topCampForm.getWidthEvent(), topCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', topCampForm);
  const leftCamp = new ImageWidget(leftCampForm.getStartXEvent(), leftCampForm.getStartYEvent(), leftCampForm.getWidthEvent(), leftCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', leftCampForm);
  const rightCamp = new ImageWidget(rightCampForm.getStartXEvent(), rightCampForm.getStartYEvent(), rightCampForm.getWidthEvent(), rightCampForm.getHeightEvent(), 'assets/UCAlogoQhaut.png', rightCampForm);
  $('#game-container').append(topCamp.domElem);
  $('#game-container').append(lowCamp.domElem);
  $('#game-container').append(leftCamp.domElem);
  $('#game-container').append(rightCamp.domElem);
}
export default buildBoard;
