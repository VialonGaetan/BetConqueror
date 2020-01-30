import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'tuiomanager/core/constants';
import $ from 'jquery/dist/jquery.min';

class Plot {
    constructor(x, y, width, height, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        const plot = document.createElement('CANVAS');
        plot.style.left = `${this.x}px`;
        plot.style.top = `${this.y}px`;
        plot.style.width = `${this.width}px`;
        plot.style.height = `${this.height}px`;
        plot.style.position = 'absolute';
        plot.width = this.width;
        plot.height = this.height;
        this.ctx = plot.getContext('2d');
        $('#game-container').append(plot);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.ctx.lineWidth, this.ctx.lineWidth, this.width - (2*this.ctx.lineWidth), this.height - (2*this.ctx.lineWidth));
        this.ctx.stroke();
    }

    getWidthEvent() {
        return this.width;
    }

    getHeightEvent() {
        return this.height;
    }

    highLight() {
        this.ctx.clearRect(0, 0, this.getWidthEvent(), this.getHeightEvent())
        this.ctx.strokeStyle = "#FF0000";
        this.draw();
    }
}

export default Plot;
