/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';

import TUIOWidget from 'tuiomanager/core/TUIOWidget';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import { radToDeg } from 'tuiomanager/core/helpers';
import GameInstance from '../models/GameInstance';
import SocketClient from '../SocketClient/SocketClient';

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
class ButtonWidget extends TUIOWidget {
    /**
     * ImageWidget constructor.
     *
     * @constructor
     * @param {number} x - ImageWidget's upperleft coin abscissa.
     * @param {number} y - ImageWidget's upperleft coin ordinate.
     * @param {number} width - ImageWidget's width.
     * @param {number} height - ImageWidget's height.
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this._lastTouchesValues = {};
        this._lastTagsValues = {};
        this._domElem = $('<button>');
        this._domElem.css('background-color', `blue`);
        this._domElem.css('width', `${width}px`);
        this._domElem.css('height', `${height}px`);
        this._domElem.css('position', 'absolute');
        this._domElem.css('left', `${x}px`);
        this._domElem.css('top', `${y}px`);

    }

    /**
     * ImageWidget's domElem.
     *
     * @returns {JQuery Object} ImageWidget's domElem.
     */
    get domElem() { return this._domElem; }


    onButtonClick(tuioTouch) {
        new SocketClient().sendMessage();

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
            this.toto(tuioTouch)
        }
    }

    /**
     * Call after a TUIOTouch update.
     *
     * @method onTouchUpdate
     * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
     */
    onTouchUpdate(tuioTouch) {
    }



}

export default ButtonWidget;
