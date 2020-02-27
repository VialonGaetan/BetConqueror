/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import TUIOWidget from 'tuiomanager/core/TUIOWidget';
import GameInstance from '../models/GameInstance';

/**
 * Main class to manage ImageWidget.
 *
 * Note:
 * It's dummy implementation juste to give an example
 * about how to use TUIOManager framework.
 *
 * @class ImageWidget
 * @extends TUIOWidget
 */
class ImageWidget extends TUIOWidget {
  /**
   * ImageWidget constructor.
   *
   * @constructor
   * @param {number} x - ImageWidget's upperleft coin abscissa.
   * @param {number} y - ImageWidget's upperleft coin ordinate.
   * @param {number} width - ImageWidget's width.
   * @param {number} height - ImageWidget's height.
   */
  constructor(x, y, width, height, camp) {
    super(x, y, width, height);
    this.camp = camp;
    this._lastTouchesValues = {};
    this._lastTagsValues = {};
    camp.draw();
  }

  /**
   * ImageWidget's domElem.
   *
   * @returns {JQuery Object} ImageWidget's domElem.
   */
  get domElem() {
    return this._domElem;
  }

  /**
   * Call after a TUIOTouch creation.
   *
   * @method onTouchCreation
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  onTouchCreation(tuioTouch) {
    super.onTouchCreation(tuioTouch);
    if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
      this._lastTouchesValues = {
        ...this._lastTouchesValues,
        [tuioTouch.id]: {
          x: tuioTouch.x,
          y: tuioTouch.y,
        },
      };
    }
  }

  /**
   * Call after a TUIOTouch update.
   *
   * @method onTouchUpdate
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  onTouchUpdate(tuioTouch) {
    if (typeof (this._lastTouchesValues[tuioTouch.id]) !== 'undefined') {
    }
  }

  /**
   * Call after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    super.onTagCreation(tuioTag);
    if (this.isTouched(tuioTag.x, tuioTag.y)) {
      this._lastTagsValues = {
        ...this._lastTagsValues,
        [tuioTag.id]: {
          x: tuioTag.x,
          y: tuioTag.y,
        },
      };
    }
  }

  /**
   * Call after a TUIOTag update.
   *
   * @method onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagUpdate(tuioTag) {
    const gameInstance = new GameInstance();/*
    if (tuioTag === undefined || tuioTag.id === undefined || !gameInstance.unities.some((unity) => unity.tag === tuioTag.id)) {
      return
    }
*/
    const currentPlayer = gameInstance.getCurrentPlayer();
    if (currentPlayer != undefined) {
      if (currentPlayer.tag === (tuioTag.id)) {
        console.log()
        if (currentPlayer.position !== this.camp.id && gameInstance.getPlotOrCamp(currentPlayer.tempPosition).possibleDisplacement.includes(this.camp.id)) {
          gameInstance.getPlotOrCamp(currentPlayer.position).removeHighlight();
          this.camp.highLight(currentPlayer);
          const tempID = []
          tempID.push(this.camp.id);
          this.camp.canvasArrow.drawDisplacement(gameInstance.getEndArrowsPointsPlot(tempID), gameInstance.getCurrentPlayer());
          gameInstance.changePositionOfTag(tuioTag.id, this.camp.id, tuioTag.x, tuioTag.y);
        }
      }
    }
    if (gameInstance.isRuturnSpawn && gameInstance.getPositionByTag(tuioTag.id) !== this.camp.id) {
      gameInstance.removePlayerRuturnSpawn(tuioTag.id);
      gameInstance.changePositionOfTag(tuioTag.id, this.camp.id, tuioTag.x, tuioTag.y);
      this.camp.canvasArrow.drawDisplacementToSpawn(tuioTag.id);
    }
  }
}

export default ImageWidget;
